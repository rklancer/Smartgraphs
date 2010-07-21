// ==========================================================================
// Project:   Smartgraphs.GraphView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs RaphaelViews */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Smartgraphs.GraphView = SC.View.extend(
/** @scope Smartgraphs.GraphView.prototype */ {
  
  axesBinding: '*graph.axes',
  allSeriesBinding: '*graph.allSeries',
  
  padding: { top: 20, right: 20, bottom: 40, left: 60 },  
  
  childViews: 'graphCanvasView'.w(),
  
  // could move to a graphViewController if we had one.
  coordinatesFor: function (x, y) {
    var axes = this.get('axes');
    var xMin = axes.get('xMin'),
        xMax = axes.get('xMax'),
        yMin = axes.get('yMin'),
        yMax = axes.get('yMax');

    var frame = this.get('frame');
    var height = frame.height,
        width  = frame.width;
        
    var padding = this.get('padding');
    
    var plotWidth = width - padding.left - padding.right;
    var plotHeight = height - padding.top - padding.bottom;
    
    var xScale = plotWidth / xMax;
    var yScale = plotHeight / yMax;
    
    return { 
      x: padding.left + x * xScale,
      y: padding.top + plotHeight - (y * yScale)
    };
  },
  
  _seriesViewsById: {},
  
  _allSeriesDidChange: function () {
    var allSeries = this.get('allSeries');
    var series, id;
    var allSeriesById = {};
    var seriesToAdd = [], viewsToRemove = [];
    
    // add views for new series
    for (var i = 0, ii = allSeries.get('length'); i < ii; i++) {
      series = allSeries.objectAt(i);
      id = series.get('id');
      
      allSeriesById[id] = series;
      
      if (!this._seriesViewsById.hasOwnProperty(id)) {
        this._addViewForSeries(series);
      }
    }
    
    // remove views for no-longer-displayed series
    var oldView;

    for (id in this._seriesViewsById) {
      if (this._seriesViewsById.hasOwnProperty(id)) {
        oldView = this._seriesViewsById[id];
        
        if (!allSeriesById[id]) {
          this._removeSeriesView(oldView);
        }
      }
    }
  }.observes('*allSeries.[]'),

  _addViewForSeries: function (series) {
    console.log('**** adding view for series %s', series.get('id'));
    
    var pointsQuery = SC.Query.local(Smartgraphs.DataPoint, { 
      conditions: 'series = {series}',
      series: series,
      orderBy: 'id'
    });
    
    var view = RaphaelViews.RaphaelCollectionView.design({
      exampleView: Smartgraphs.DataPointView,
      graphView: this,
      seriesId: series.get('id'),
      content: Smartgraphs.store.find(pointsQuery),
      useFastPath: YES
    }).create();
    
    this.get('graphCanvasView').appendChild(view);
    this._seriesViewsById[series.get('id')] = view;
  },
  
  _removeSeriesView: function (view) {
    var seriesId = view.get('seriesId');
    console.log('**** removing view for series %s', seriesId);

    delete this._seriesViewsById[seriesId];
    this.get('graphCanvasView').removeChild(view);
  },
  
  graphCanvasView: RaphaelViews.RaphaelCanvasView.design({
    graphBinding: '.parentView*graph',
    axesBinding: '.parentView*axes',
    
    childViews: 'axesView'.w(),
    
    axesView: RaphaelViews.RaphaelView.design({
      axesBinding: '.parentView*axes',      

      displayProperties: 'axes.xMin axes.xMax axes.yMin axes.yMax axes.xLabel axes.yLabel'.w(),
      
      renderCallback: function (raphaelCanvas, shouldDrawAxes, xLeft, yBottom, yTop, plotWidth, plotHeight, xMax, xMin, xSteps, yMax, yMin, ySteps) {
        // TEMP. For command line access
        Smartgraphs.raphael = raphaelCanvas;

        if (shouldDrawAxes) {
          // A total hack. Just draw the axes to the screen as a side effect of creating our layer.
          
          // keep this until (a) we can get Raphael to draw the <text> elements when layer is offscreen
          // and (b) we find a way to find all the <path> and the <texts> that g.axis draws, and convince
          // RaphaelRenderSupport to group them into our layer (or (c) draw the tick marks and labels ourselves
          // -- it's not hard!)
          
          this.invokeLater(function () {
            this.drawAxes(raphaelCanvas, xLeft, yBottom, yTop, plotWidth, plotHeight, xMax, xMin, xSteps, yMax, yMin, ySteps);
          });
        }
        
        // prepareCanvas expects us to return a raphael element, so give it something fake
        return raphaelCanvas.rect(1,1,1,1).attr({opacity: 0});
      },

      drawAxes: function (raphaelCanvas, xLeft, yBottom, yTop, plotWidth, plotHeight, xMax, xMin, xSteps, yMax, yMin, ySteps) {
        console.log('************* drawAxes ***************');
        // x axis
        if (this._x) this._x.remove();
        this._x = raphaelCanvas.g.axis(xLeft, yBottom, plotWidth, xMin, xMax, xSteps, 0);
        // y axis
        if (this._y) this._y.remove();          
        this._y = raphaelCanvas.g.axis(xLeft, yBottom, plotHeight, yMin, yMax, ySteps, 1);
      },
      
      render: function (context, firstTime) {
        var shouldDrawAxes = NO;
        var xLeft, xRight, yBottom, yTop, plotWidth, plotHeight, xMax, xMin, xSteps, yMax, yMin, ySteps;
        var axes = this.get('axes');

        if (axes) {
          shouldDrawAxes = YES;
          
          xMin = axes.get('xMin');
          xMax = axes.get('xMax');
          xSteps = axes.get('xSteps');
          yMin = axes.get('yMin');
          yMax = axes.get('yMax');       
          ySteps = axes.get('ySteps');
            
          var graphView = this.getPath('parentView.parentView');
          var bottomLeft = graphView.coordinatesFor(0, 0);
          var bottomRight = graphView.coordinatesFor(xMax, 0);
          var topLeft = graphView.coordinatesFor(0, yMax);
          
          xLeft = bottomLeft.x;
          xRight = bottomRight.x;
          yBottom = bottomLeft.y;
          yTop = topLeft.y;
              
          plotWidth = xRight - xLeft;
          plotHeight = yBottom - yTop;
        }

        if (firstTime) {
          context.callback(this, this.renderCallback, shouldDrawAxes, xLeft, yBottom, yTop, plotWidth, 
            plotHeight, xMax, xMin, xSteps, yMax, yMin, ySteps);
        }
        else if (shouldDrawAxes) {
          this.drawAxes(this.get('raphaelCanvas'), xLeft, yBottom, yTop, plotWidth, plotHeight, xMax, xMin, xSteps, yMax, yMin, ySteps);
        }
        
        this.renderChildViews(context, firstTime);      // don't forget to render child views        
      }
    })
  })
});
