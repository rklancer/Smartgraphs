// ==========================================================================
// Project:   Smartgraphs.GraphView
// Copyright: ©2010 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs RaphaelViews */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Smartgraphs.GraphView = SC.View.extend( 
/** @scope Smartgraphs.GraphView.prototype */ {
  
  xAxisBinding: '*graphController.xAxis',
  yAxisBinding: '*graphController.yAxis',
  graphableDataObjectsBinding: '*graphController.graphableDataObjects',
  annotationListBinding: '*graphController.annotationList',
  showAnimation: NO,
  
  inputAreaView:     SC.outlet('graphCanvasView.axesView.inputAreaView'),
  xAxisView:         SC.outlet('graphCanvasView.axesView.xAxisView'),
  yAxisView:         SC.outlet('graphCanvasView.axesView.yAxisView'),
  dataHolder:        SC.outlet('graphCanvasView.dataHolder'),
  annotationsHolder: SC.outlet('graphCanvasView.annotationsHolder'),  
  
  padding: { top: 15, right: 15, bottom: 45, left: 45 },  
  
  childViews: 'titleView graphCanvasView'.w(),
  
  init: function () {
    sc_super();
    this._viewsByClassAndItem = {};
  },
  
  animate: function() {
    this.get('graphCanvasView').animate();
  },
  
  stop: function() {
    this.get('graphCanvasView').stop();
  },
  
  reset: function() {
    this.get('graphCanvasView').reset();
  },
  
  showAnimationDidChange: function() {
    this.padding = { top: 15, right: 15, bottom: 45, left: 120 };
    this.replaceLayer();
  }.observes('showAnimation'),
  
  viewDidResize: function () {
    sc_super();
    Smartgraphs.statechart.sendAction('graphViewDidResize');
    this.replaceLayer();
  },
  
  annotationListDidChange: function () {
    this._itemListsDidChange();
  }.observes('*annotationList.[]'),
  
  graphableDataObjectsDidChange: function () {
    this._itemListsDidChange();
  }.observes('*graphableDataObjects.[]'),
  
  _itemListsDidChange: function () {  
    var list,
        item, 
        classKey, 
        itemKey,
        desiredViewsByClassAndItem = {},
        itemType,
        itemTypes = ['data', 'annotation'],        
        i, j, len;
    
    for (j = 0; j < itemTypes.length; j++ ) {
      itemType = itemTypes[j];
      list = this.get(itemType === 'data' ? 'graphableDataObjects' : 'annotationList');
      
      // add views for items (DataRepresentations or Annotations) not currently in the list of child views
      for (i = 0, len = list.get('length'); i < len; i++) {
        item = list.objectAt(i);

        // I believe this is the most cross-browser-compatible way to get a unique key representing the class of the item
        classKey = SC.guidFor(item.constructor);
        itemKey = SC.guidFor(item);
      
        if (desiredViewsByClassAndItem[classKey] === undefined) {
          desiredViewsByClassAndItem[classKey] = {};
        }
      
        desiredViewsByClassAndItem[classKey][itemKey] = item;     // for our reference when we remove views
      
        if (!this._viewsByClassAndItem[classKey] || !this._viewsByClassAndItem[classKey][itemKey]) {
          this._addViewForItem(item, itemType);
        }
      }
    }
    
    
    // remove views for no-longer-to-be-displayed items
    var oldView;
  
    for (classKey in this._viewsByClassAndItem) {
      if (this._viewsByClassAndItem.hasOwnProperty(classKey)) {
        for (itemKey in this._viewsByClassAndItem[classKey]) {
          if (this._viewsByClassAndItem[classKey].hasOwnProperty(itemKey)) {
            oldView = this._viewsByClassAndItem[classKey][itemKey];
          
            if (!desiredViewsByClassAndItem[classKey] || !desiredViewsByClassAndItem[classKey][itemKey]) {
              this._removeView(oldView);
            }
          }
        }
      }
    }
  },
  
  
  _addViewForItem: function (item, itemType) {
    var classKey  = SC.guidFor(item.constructor),
        itemKey   = SC.guidFor(item),
        
        view = item.get('viewClass').create({
          graphView: this,
          controller: this.get('graphController'),
          item: item,
          itemType: itemType
        });
    
    // append data and annotations 
    if (itemType === 'data') {
      this.get('dataHolder').appendChild(view);
      // this.graphCanvasView.invokeLast('_animate');
    }
    else if (itemType === 'annotation') {
      this.get('annotationsHolder').appendChild(view);
    }

    if (this._viewsByClassAndItem[classKey] === undefined) {
      this._viewsByClassAndItem[classKey] = {};
    }    
    this._viewsByClassAndItem[classKey][itemKey] = view;
  },
  
  
  _removeView: function (view) {
    var item = view.get('item'),
        itemType = view.get('itemType'),
        classKey = SC.guidFor(item.constructor),
        itemKey = SC.guidFor(item);
    
    delete this._viewsByClassAndItem[classKey][itemKey];
    
    if (view.willRemoveFromDataView) view.willRemoveFromDataView();
    
    if (itemType === 'data') {
      this.get('dataHolder').removeChild(view);
    }
    else if (itemType === 'annotation') {
      this.get('annotationsHolder').removeChild(view);
    }
  },  
  
  
  coordinatesForPoint: function (x, y) {
    var xAxis = this.get('xAxis');
    var yAxis = this.get('yAxis');

    if (!xAxis || !yAxis) return { x: -9999, y: -9999 };

    var xMin = xAxis.get('min'),
        xMax = xAxis.get('max'),
        yMin = yAxis.get('min'),
        yMax = yAxis.get('max');

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
    var xAxis = this.get('xAxis');
    var yAxis = this.get('yAxis');

    if (!xAxis || !yAxis) return undefined;

    var xMin = xAxis.get('min'),
        xMax = xAxis.get('max'),
        yMin = yAxis.get('min'),
        yMax = yAxis.get('max');

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
  
  titleView: SC.LabelView.design({
    valueBinding: '.parentView*graphController.title',
    classNames: 'pane-label',
    layout: { width: 400, centerX: 0, height: 20, top: 20, zIndex: 1 },
    textAlign: SC.ALIGN_CENTER
  }),
  
  graphCanvasView: RaphaelViews.RaphaelCanvasView.design({

    layout: { zIndex: 0 },
    
    xAxisBinding: '.parentView.xAxis',
    yAxisBinding: '.parentView.yAxis',
    
    displayProperties: 'xAxis.min xAxis.max yAxis.min yAxis.max'.w(),
    
    childViews: 'axesView annotationsHolder dataHolder animationView'.w(),
    
    animate: function() {
      var ms = 3000, raphaelCanvas = this.get('raphaelCanvas'),
          overlay = this.getPath('dataHolder.childViews.0.layer'),
          dataSetView = this.getPath('dataHolder.childViews.0'), item, points;
      
      if (overlay) overlay = overlay.raphael;
      if (!overlay) return;
      
      if (dataSetView) {
        item = dataSetView.get('item');
        points = item.get('points') || [];
      }
      
      var frame = this.get('frame');
      var padding = this.getPath('parentView.padding');

      var xLeft = frame.x + padding.left;
      var yTop = frame.y + padding.top;
      var plotWidth = frame.width - padding.left - padding.right;
      var plotHeight = frame.height - padding.top - padding.bottom;

      function loopOverlayAnimation() {
        overlay.attr({
          "clip-rect": [xLeft, yTop, 0, plotHeight].join(',')
        }).animate({
          "clip-rect": [xLeft, yTop, plotWidth, plotHeight].join(',')
        }, ms, loopOverlayAnimation);
      }
      overlay.attr({ "opacity": 1.0 });
      loopOverlayAnimation();
      
      var xLeftRect = frame.x + padding.left;
      var yTopRect = frame.y + padding.top;
      var plotWidthRect = 70 ;
      var plotHeightRect = frame.height - padding.top - padding.bottom;
      var rect = this.getPath('animationView.layer').raphael;
    
      var keyframes = {};
      
      function loopAnimation() {
        rect.attr({
          y: yTopRect+plotHeightRect-30
          // "clip-rect": [xLeftRect, yTopRect+plotHeightRect, plotWidthRect, 0].join(',')
        }).animate(keyframes, ms);
      }
      
      // FIXME: Scale axis appropriately.
      var xAxis = this.getPath('parentView.xAxis'),
          xMin = xAxis.get('min'), xMax = xAxis.get('max'),
          yAxis = this.getPath('parentView.yAxis'),
          yMin = yAxis.get('min'), yMax = yAxis.get('max');
      
      for (var idx=0, len=points.length; idx<len; ++idx) {
        var pt = points[idx]; // [x, y]
        var dist = (pt[0] === 0 ? 0 : pt[0]/xMax) * 100; // WIDTH
        var y = pt[1] === 0 ? 0 : pt[1]/yMax;            // HEIGHT
        keyframes[dist+'%'] = {
          y: yTopRect+(plotHeightRect*(1-y))-30
          // "clip-rect": [xLeftRect, yTopRect+(plotHeightRect*(1-y)), plotWidthRect, plotHeightRect*(y)].join(',')
        };
        if (idx+1===len) {
          keyframes[dist+'%'].callback = loopAnimation;
        }
      }
      
      loopAnimation();
    },
    
    stop: function() {
      var overlay = this.getPath('dataHolder.childViews.0.layer');
      if (overlay) overlay = overlay.raphael;
      if (!overlay) return;
      overlay.stop();
      var rect = this.getPath('animationView.layer').raphael, times = 0;
      rect.stop();
    },

    reset: function() {
      var overlay = this.getPath('dataHolder.childViews.0.layer'),
          dataSetView = this.getPath('dataHolder.childViews.0'), item, points;
      
      if (overlay) overlay = overlay.raphael;
      if (!overlay) return;
      
      if (dataSetView) {
        item = dataSetView.get('item');
        points = item.get('points') || [];
      }
      
      var frame = this.get('frame');
      var padding = this.getPath('parentView.padding');

      var xLeft = frame.x + padding.left;
      var yTop = frame.y + padding.top;
      var plotWidth = frame.width - padding.left - padding.right;
      var plotHeight = frame.height - padding.top - padding.bottom;

      overlay.attr({
        "clip-rect": [xLeft, yTop, plotWidth, plotHeight].join(','),
        "opacity": 0.5
      });

      var xLeftRect = frame.x + 10;
      var yTopRect = frame.y + padding.top;
      var plotWidthRect = 70 ;
      var plotHeightRect = frame.height - padding.top - padding.bottom;
      var rect = this.getPath('animationView.layer').raphael;

      rect.attr({
        y: yTopRect+plotHeightRect-30
        // "clip-rect": [xLeftRect, yTopRect+plotHeightRect, plotWidthRect, 0].join(',')
      });
    },

    axesView: RaphaelViews.RaphaelView.design({
      xAxisBinding: '.parentView.parentView.xAxis',
      yAxisBinding: '.parentView.parentView.yAxis',     
      paddingBinding: '.parentView.parentView.padding',
      
      childViews: 'inputAreaView xAxisView yAxisView'.w(),
      
      inputAreaView: RaphaelViews.RaphaelView.design({
        // axesBinding: '.parentView.parentView.parentView*axes',    // is this used anywhere?
        
        didCreateLayer: function () {
          // cache these rather than lookup the jquery object (graphView.$()) per mouse event
          this._graphView = this.getPath('parentView.parentView.parentView');
          this._$graphView = this._graphView.$();
        },
        
        renderCallback: function (raphaelCanvas, xLeft, yTop, plotWidth, plotHeight) {
          return raphaelCanvas.rect(xLeft, yTop, plotWidth, plotHeight).attr({
            fill: '#f7f8fa', stroke: '#f7f8fa', opacity: 1.0
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
        axisBinding: '.parentView.parentView.parentView.xAxis',
        type: 'x'
      }),
      
      yAxisView: Smartgraphs.AxisView.design({
        axisBinding: '.parentView.parentView.parentView.yAxis',
        type: 'y'
      })
    }),
    
    // Holds the annotation views. Should be earlier in the DOM (and thus "behind") the dataset views
    annotationsHolder: RaphaelViews.RaphaelView.design({
    }),

    // Holds the dataset views. Should be later in the DOM (and thus "in front of") the annotation views.
    dataHolder: RaphaelViews.RaphaelView.design({
    }),

    // Holds the animation channel. Should be later in the DOM (and thus "in front of") the annotation views.
    animationView: RaphaelViews.RaphaelView.design({
      
      isVisibleBinding: '.parentView.parentView.showAnimation',
      
      renderCallback: function (raphaelCanvas, xLeft, yTop, plotWidth, plotHeight) {
        var imageURL = Smartgraphs.animationTool.get('foregroundImageURL');
        return raphaelCanvas.image(imageURL, xLeft, yTop+plotHeight-30, plotWidth, 30);
      },
    
      render: function (context, firstTime) {
        var frame = this.getPath('parentView.frame');
        var padding = this.getPath('parentView.parentView.padding');
        if (frame.width === 0) return;

        var xLeft = frame.x + 10;
        var yTop = frame.y + padding.top;
        var plotWidth = 70 ;
        var plotHeight = frame.height - padding.top - padding.bottom;
      
        if (firstTime) {
          context.callback(this, this.renderCallback, xLeft, yTop, plotWidth, plotHeight);
        }
        else {
          var rect = context.raphael();
          rect.attr({x: xLeft, y: yTop+plotHeight-30, width: plotWidth, height: 30});
        }
      }
    })
  })
});
