// ==========================================================================
// Project:   Smartgraphs.GraphView
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs RaphaelViews */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Smartgraphs.GraphView = SC.View.extend(
/** @scope Smartgraphs.GraphView.prototype */ {
  
  axesBinding: '*graphController.axes',
  seriesListBinding: '*graphController.seriesList',
  annotationListBinding: '*graphController.annotationList',
  
  padding: { top: 15, right: 15, bottom: 45, left: 45 },  
  
  childViews: 'titleView graphCanvasView controlsView'.w(),
  
  init: function () {
    this._viewsByClassAndId = {};
    sc_super();
  },
  
  viewDidResize: function () {
    sc_super();
    this.replaceLayer();
  },
  
  annotationListDidChange: function () {
    this._itemListsDidChange();
  }.observes('*annotationList.[]'),
  
  seriesListDidChange: function () {
    this._itemListsDidChange();
  }.observes('*seriesList.[]'),
  
  _itemListsDidChange: function () {  
    var list = this.get('seriesList').concat(this.get('annotationList'));
    var item, className, id;
    var desiredViewsByClassAndId = {};
    
    // add views for items (series or annotations) not currently in the list of child views
    for (var i = 0, ii = list.get('length'); i < ii; i++) {
      item = list.objectAt(i);
      className = item.constructor.toString();
      id = item.get('id');
      
      if (desiredViewsByClassAndId[className] === undefined) {
        desiredViewsByClassAndId[className] = {};
      }
      
      desiredViewsByClassAndId[className][id] = item;     // for our reference when we remove views
      
      if (!this._viewsByClassAndId[className] || !this._viewsByClassAndId[className][id]) {
        this._addViewForItem(item);
      }
    }
    
    // remove views for no-longer-to-be-displayed items
    var oldView;
    
    for (className in this._viewsByClassAndId) {
      if (this._viewsByClassAndId.hasOwnProperty(className)) {
        for (id in this._viewsByClassAndId[className]) {
          if (this._viewsByClassAndId[className].hasOwnProperty(id)) {
            oldView = this._viewsByClassAndId[className][id];
            
            if (!desiredViewsByClassAndId[className] || !desiredViewsByClassAndId[className][id]) {
              this._removeView(oldView);
            }
          }
        }
      }
    }
  },
  
  
  _addViewForItem: function (item) {
    var className = item.constructor.toString();

    var view = item.constructor.viewClass.design({
        graphView: this,
        item: item
    }).create();
    
    this.get('graphCanvasView').appendChild(view);
    
    if (this._viewsByClassAndId[className] === undefined) {
      this._viewsByClassAndId[className] = {};
    }    
    this._viewsByClassAndId[className][item.get('id')] = view;
  },
  
  
  _removeView: function (view) {
    var item = view.get('item');
    var className = item.constructor.toString();
    var id = item.get('id');
    
    delete this._viewsByClassAndId[className][id];
    this.get('graphCanvasView').removeChild(view);
  },  
  
  
  coordinatesForPoint: function (x, y) {
    var axes = this.get('axes');

    if (!axes) return undefined;

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
    
    var xScale = plotWidth / (xMax - xMin);
    var yScale = plotHeight / (yMax - yMin);
    
    return { 
      x: padding.left + (x - xMin) * xScale,
      y: padding.top + plotHeight - (y - yMin) * yScale
    };
  },
  
  
  pointForCoordinates: function (x, y) {
    var axes = this.get('axes');

    if (!axes) return undefined;
    
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
    
    var xScale = plotWidth / (xMax - xMin);
    var yScale = plotHeight / (yMax - yMin);
    
    return {
      x: xMin + (x - padding.left) / xScale,
      y: yMin + (padding.top + plotHeight - y) / yScale
    };
  },
  
  controlsView: SC.View.design({
    layout: { height: 0, bottom: 0 }
  }),
  
  titleView: SC.LabelView.design({
    valueBinding: '.parentView*graphController.title',
    classNames: 'pane-label',
    layout: { width: 400, centerX: 0, height: 20, top: 20, zIndex: 1 },
    textAlign: SC.ALIGN_CENTER
  }),
  
  graphCanvasView: RaphaelViews.RaphaelCanvasView.design({
    layout: { bottom: 0, zIndex: 0 },
    
    axesBinding: '.parentView.axes',
    
    displayProperties: 'axes.xMin axes.xMax axes.yMin axes.yMax'.w(),
    
    childViews: 'axesView'.w(),
      
    axesView: RaphaelViews.RaphaelView.design({
      axesBinding: '.parentView.parentView.axes',      
      paddingBinding: '.parentView.parentView.padding',
      
      childViews: 'inputArea xAxisView yAxisView'.w(),
      
      inputArea: RaphaelViews.RaphaelView.design({
        axesBinding: '.parentView.parentView.parentView*axes',
        
        didCreateLayer: function () {
          // cache these rather than lookup the jquery object (graphView.$()) per mouse event
          this._graphView = this.getPath('parentView.parentView.parentView');
          this._$graphView = this._graphView.$();
        },
        
        renderCallback: function (raphaelCanvas, xLeft, yTop, plotWidth, plotHeight) {          
          return raphaelCanvas.rect(xLeft, yTop, plotWidth, plotHeight).attr({
            fill: '#ffffff', stroke: '#ffffff', opacity: 0.7 
          });
        },
        
        render: function (context, firstTime) {
          var frame = this.getPath('parentView.parentView.frame');
          var padding = this.getPath('parentView.parentView.parentView.padding');

          var xLeft = frame.x + padding.left;
          var yTop = frame.y + padding.top;
          var plotWidth = frame.width - padding.left - padding.right;
          var plotHeight = frame.height - padding.top - padding.bottom;
          
          if (firstTime) {
            context.callback(this, this.renderCallback, xLeft, yTop, plotWidth, plotHeight);
          }
          else {       
            var rect = context.raphael();
            rect.attr({x: xLeft, y: yTop, width: plotWidth, height: plotHeight});
          }
        },
        
        coordsForEvent: function (e) {
          var graphOffset = this._$graphView.offset();
          return { x: e.pageX - graphOffset.left, y: e.pageY - graphOffset.top };
        },

        mouseDown: function (evt) {
          this._graphController = this._graphView.get('graphController');
          var coords = this.coordsForEvent(evt);
          var point = this._graphView.pointForCoordinates(coords.x, coords.y);
          return this._graphController.inputAreaMouseDown(point.x, point.y);
        },

        mouseDragged: function (evt) {
          var coords = this.coordsForEvent(evt);  
          var point = this._graphView.pointForCoordinates(coords.x, coords.y);
          return this._graphController.inputAreaMouseDragged(point.x, point.y);
        },

        mouseUp: function (evt) {
          var coords = this.coordsForEvent(evt);
          var point = this._graphView.pointForCoordinates(coords.x, coords.y);
          return this._graphController.inputAreaMouseUp(point.x, point.y);
        }
      }),
      
      xAxisView: Smartgraphs.AxisView.design({
        axesBinding: '.parentView.parentView.parentView.axes',
        type: 'x'
      }),
      
      yAxisView: Smartgraphs.AxisView.design({
        axesBinding: '.parentView.parentView.parentView.axes',
        type: 'y'
      })
    })
  })
});
