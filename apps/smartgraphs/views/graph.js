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
  requestedCursorStyleBinding: '*graphController.requestedCursorStyle',

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

  // adjust left border depending on whether we show the animation or not.
  showAnimationDidChange: function() {
    var showAnimation = this.get('showAnimation'),
        channelWidth  = Smartgraphs.animationTool.get('channelWidth');
    
    this.padding.left = 50 + (showAnimation ? channelWidth : 0);
    this.replaceLayer();
  }.observes('showAnimation'),

  viewDidResize: function () {
    sc_super();
    var graphController = this.get('graphController');
    if (graphController) graphController.statechart.sendAction('graphViewDidResize');
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
        
        // skip modifier annotations (which have no view) in the calculation of which views to add or remove
        if (item.get('isModifierAnnotation')) continue;

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

    init: function () {
      sc_super();
      
      var cursor = SC.Cursor.create();
      cursor.bind('cursorStyle', this, 'requestedCursorStyle');
      this.set('cursor', cursor);      
    },
      
    layout: { zIndex: 0 },

    xAxisBinding: '.parentView.xAxis',
    yAxisBinding: '.parentView.yAxis',
    requestedCursorStyleBinding: '.parentView.requestedCursorStyle',

    displayProperties: 'xAxis.min xAxis.max yAxis.min yAxis.max'.w(),

    childViews: 'axesView dataHolder annotationsHolder animationView'.w(),

    _animationIsPaused: NO,
    
    _getScreenBounds: function () {
      var frame   = this.get('frame'),
          padding = this.getPath('parentView.padding');
          
      if (!padding) return;
          
      return {
        xLeft:      frame.x + padding.left,
        xRight:     frame.x + frame.width - padding.right,
        yTop:       frame.y + padding.top,
        yBottom:    frame.y + frame.height - padding.bottom,
        plotWidth:  frame.width - padding.left - padding.right,
        plotHeight: frame.height - padding.top - padding.bottom
      };
    },
    
    _getLogicalBounds: function () {
      var xAxis = this.getPath('parentView.xAxis'),
          yAxis = this.getPath('parentView.yAxis');
          
      if (!xAxis || !yAxis) return;
      
      return {        
        xMin: xAxis.get('min'), 
        xMax: xAxis.get('max'),
        yMin: yAxis.get('min'),
        yMax: yAxis.get('max')        
      };
    },
    
    _startAnimationLoop: function (loopParameters, loopCallback, dataSetView, index, raphaelForGraph, raphaelForImage) {
      console.log("**** _startAnimationLoop()");
    
      var points        = dataSetView.getPath('item.points') || [],
          logicalBounds = this._getLogicalBounds(),
          screenBounds  = this._getScreenBounds(),
          ms            = Smartgraphs.animationTool.get('duration'),
          animations    = Smartgraphs.animationTool.animations,
          offsetY       = animations[index].offsetY,
          
          animationTime, pt, dist, y;

      // Without these two, animation will occasionally screw up.
      raphaelForGraph.stop();
      raphaelForImage.stop();

      // The keyframes on the first loop are set below. Once we've looped once,
      // when restarting a previous animation, we need to regenerate the keyframes
      // to handle the "full" animation loop. This flag is toggled, below.
      // Note: Can't move this code lower! We have to wait until the next loop
      // to regenerate the keyframes.
      
      
      if (loopParameters.regenerateKeyframes) {
        console.log("**** in startAnimationLoop: regenerateKeyframes = YES");
        loopParameters.keyframes = {};
        this._calculateKeyframes(loopParameters.keyframes, points, logicalBounds, screenBounds, offsetY, 1, 0, loopCallback);
        loopParameters.regenerateKeyframes = NO; // Should only regenerate keyframes once.
      }
      else {
        console.log("**** in startAnimationLoop: regenerateKeyframes = NO");
      }

      if (loopParameters.animationIsRestarting) {
        console.log('**** in startAnimationLoop: animationIsRestarting = YES');
        // Use the keyframes generated below and don't modify the existing
        // raphael parameters.
        loopParameters.regenerateKeyframes   = YES;   // The next loop, we need to regenerate keyframes.
        loopParameters.animationIsRestarting = NO;
        animationTime = parseInt(ms - (raphaelForGraph.attrs['clip-rect'][2]/screenBounds.plotWidth)*ms, 10);      
      }
      else {
        console.log("**** in startAnimationLoop: animationIsRestarting = NO");
        // Reset raphael parameters to the "beginning".
        raphaelForGraph.attr({ "clip-rect": [screenBounds.xLeft, screenBounds.yTop, 0, screenBounds.plotHeight].join(',') });

        pt = points[0]; // [x, y]
        y = pt[1] === 0 ? 0 : pt[1]/(logicalBounds.yMax-logicalBounds.yMin);
        raphaelForImage.attr({ y: screenBounds.yTop + (screenBounds.plotHeight*(1-y))-30+offsetY });
        animationTime = ms;
      }

      console.log("using animationTime = %d", animationTime);
      window.keyframes = loopParameters.keyframes;
      
      raphaelForGraph.animate({
        "clip-rect": [screenBounds.xLeft, screenBounds.yTop, screenBounds.plotWidth, screenBounds.plotHeight].join(',')
      }, animationTime);

      raphaelForImage.animateWith(raphaelForGraph, loopParameters.keyframes,  animationTime);
    },
 
    _calculateKeyframes: function (keyframes, points, logicalBounds, screenBounds, offsetY, scale, progress, loopCallback) {
      var idx, len, pt, dist, scaledDist, y;

      for (idx=0, len=points.length; idx<len; ++idx) {
        pt = points[idx]; // [x, y]
        dist = (pt[0] === 0 ? 0 : pt[0] / (logicalBounds.xMax - logicalBounds.xMin)) * 100;
        scaledDist = (dist - progress) / scale ;
        if (scaledDist >= 100) scaledDist = 100;
        if (dist >= progress) {
          y = pt[1] === 0 ? 0 : pt[1] / (logicalBounds.yMax - logicalBounds.yMin);
          keyframes[parseInt(scaledDist, 10)+'%'] = {
            y: screenBounds.yTop + (screenBounds.plotHeight * (1-y)) - 30 + offsetY
          };
          console.log("keyframes[%s] = %d", parseInt(scaledDist, 10)+'%', keyframes[parseInt(scaledDist, 10)+'%'].y);
          if (idx+1===len) {
            keyframes[parseInt(scaledDist, 10)+'%'].callback = loopCallback;
          }
        }
      }
    },

    _animateDataView: function (dataSetView, index) {
      
      console.log("**** graphCanvasView._animateDataView(%s, %d)", dataSetView ? dataSetView.toString() : '(null)', index);      
      
      if (!dataSetView.get('isAnimatable')) return;
      
      var screenBounds    = this._getScreenBounds(),
          logicalBounds   = this._getLogicalBounds(),
          layer           = dataSetView.get('layer'),
          raphaelForGraph = layer && layer.raphael || null,
          images          = this.getPath('animationView.images'),
          image           = images && images[index],
          raphaelForImage = image && image.node && image.node.raphael || null,

          points          = dataSetView.getPath('item.points') || [],

          animations      = Smartgraphs.animationTool.animations,
          offsetY         = animations[index].offsetY,

          clipRect        = raphaelForGraph.attrs['clip-rect'],
          currentX        = clipRect ? clipRect[2] : 0, // occasionally, clip-rect is undefined; deal with it gracefully
          width           = currentX / screenBounds.plotWidth,
          scale           = 1 - width,
          progress        = width * 100,
          
          loopParameters = {
            animationIsRestarting: this._animationIsPaused,
            regenerateKeyframes:   NO,
            keyframes:             {}
          },
          
          self = this;

      // If the graph is in the "reset" mode, it will not have opacity: 1.0, so set
      // it here.
      raphaelForGraph.attr({ "opacity": 1.0 });

      function startAnimationLoop() {
        self._startAnimationLoop(loopParameters, startAnimationLoop, dataSetView, index, raphaelForGraph, raphaelForImage);
      }

      // Calculate the first set of keyframes. This takes into account any
      // progress already made on animating the graph. The keyframes will
      // be regenerated in startAnimationLoop() if we're restarting animation
      // so that the next loop has a "full" set of keyframes.
      
      this._calculateKeyframes(loopParameters.keyframes, points, logicalBounds, screenBounds, offsetY, scale, progress, startAnimationLoop);

      // Actually start the animation loop.
      startAnimationLoop();
    },
    
    animate: function() {
      console.log("**** graphCanvasView.animate()");
      this.getPath('dataHolder.childViews').forEach(this._animateDataView, this);
    },

    stop: function() {
      console.log("**** graphCanvasView.stop()");   
      var images = this.getPath('animationView.images') || [];

      this.getPath('dataHolder.childViews').forEach(function (dataSetView, idx) {
        var layer           = dataSetView.get('layer'),
            raphaelForGraph = layer ? layer.raphael : null,
            image           = images[idx],
            node            = image ? image.node  : null,
            raphaelForImage = node ? node.raphael : null;

        if (raphaelForGraph) raphaelForGraph.stop();
        if (raphaelForImage) raphaelForImage.stop();
      });

      this._animationIsPaused = YES;
    },

    reset: function() {
      console.log("**** graphCanvasView.reset()");
      
      var screenBounds  = this._getScreenBounds(),
          logicalBounds = this._getLogicalBounds(),
          images        = this.getPath('animationView.images') || [],          
          animations    = Smartgraphs.animationTool.animations || [],
          graphResetAttributes = {
            "clip-rect": [screenBounds.xLeft, screenBounds.yTop, screenBounds.plotWidth, screenBounds.plotHeight].join(','),
            "opacity": 0.25
          };

      this.getPath('dataHolder.childViews').forEach(function (dataSetView, idx) {
        var layer           = dataSetView.get('layer'),
            raphaelForGraph = layer ? layer.raphael : null,
            image           = images[idx],
            node            = image ? image.node : null,
            raphaelForImage = node ? node.raphael : null,
            points          = dataSetView.getPath('item.points') || [],
            y               = points[0][1] / (logicalBounds.yMax - logicalBounds.yMin),
            offsetY         = animations[idx] ? animations[idx].offsetY : 0;

        if (raphaelForGraph) raphaelForGraph.attr(graphResetAttributes);
        if (raphaelForImage) {
          raphaelForImage.attr({
            y: screenBounds.yTop + screenBounds.plotHeight * (1-y) - 30 + offsetY
          });
        }
      });

      this._animationIsPaused = NO;
    },

    axesView: RaphaelViews.RaphaelView.design({
      xAxisBinding: '.parentView.parentView.xAxis',
      yAxisBinding: '.parentView.parentView.yAxis',
      paddingBinding: '.parentView.parentView.padding',

      childViews: 'inputAreaView xAxisView yAxisView'.w(),

      inputAreaView: RaphaelViews.RaphaelView.design({
        
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
    
    // Holds the data views. Should be earlier in the DOM (and thus "behind") the annotation views
    dataHolder: RaphaelViews.RaphaelView.design({
    }),
    
    // Holds the annotation views. Should be later in the DOM (and thus "in front of") the data views
    annotationsHolder: RaphaelViews.RaphaelView.design({
    }),

    // Holds the animation channel. Should be later in the DOM (and thus "in front of") the annotation views.
    animationView: RaphaelViews.RaphaelView.design({

      isVisibleBinding: '.parentView.parentView.showAnimation',

      images: [],

      // Handle the special shapes we allow authors to use.
      _nomalizeImageURL: function(imageURL) {
        if (imageURL.indexOf('.') === -1) {
          if (imageURL === 'circle') {
            imageURL = sc_static('images/circle');
          } else if (imageURL === 'box') {
            imageURL = sc_static('images/box');
          } else if (imageURL === 'cross') {
            imageURL = sc_static('images/cross');
          } else {
            // Default to cross.
            imageURL = sc_static('images/cross');
          }
        }
        return imageURL;
      },

      // Adds the correct image to the animation channel in Raphael, the first time.
      _renderDataSetImageFirstTime: function(dataSetView, idx, images, raphaelCanvas, xLeft, yTop, plotWidth, plotHeight) {
        console.log("**** animationView._renderDataSetImageFirstTime for %s", dataSetView ? dataSetView.toString() : '(null)');
        
        var yAxis = this.getPath('parentView.parentView.yAxis'),
            yMin = yAxis ? yAxis.get('min') : 0,
            yMax = yAxis ? yAxis.get('max') : 1,
            points = dataSetView.getPath('item.points') || [],
            pt = points[0], // [x, y]
            y = pt[1] === 0 ? 0 : pt[1]/(yMax-yMin),
            animation = Smartgraphs.animationTool.animations[idx],
            imageURL = animation ? animation.foregroundImageURL : '';

        if (!dataSetView.get('isAnimatable')) {
          SC.Logger.debug('Data set is not animatable. Skipping.');
          return;
        }

        imageURL = this._nomalizeImageURL(imageURL);
        images[idx] = raphaelCanvas.image(imageURL, xLeft, yTop+(plotHeight*(1-y))-30, plotWidth, 30);
      },

      renderCallback: function (raphaelCanvas, xLeft, yTop, plotWidth, plotHeight) {
        console.log("**** animationView.renderCallback()");
        var that = this, images = [];
        
        console.log("****   in renderCallback: parentView.dataHolder.childViews.length = %d", this.getPath('parentView.dataHolder.childViews.length'));
        this.getPath('parentView.dataHolder.childViews').forEach(function(dataSetView, idx) {
          that._renderDataSetImageFirstTime(dataSetView, idx, images, raphaelCanvas, xLeft, yTop, plotWidth, plotHeight);
        });

        this.images = images;
      },

      render: function (context, firstTime) {
        var that = this,
            frame = this.getPath('parentView.frame'),
            padding = this.getPath('parentView.parentView.padding'),
            xLeft = frame.x + 10,
            yTop = frame.y + padding.top,
            plotWidth = Smartgraphs.animationTool.get('channelWidth'),
            plotHeight = frame.height - padding.top - padding.bottom,
            animations = Smartgraphs.animationTool.animations,
            offsetX = animations.length > 0 ? animations[0].offsetX : 0,
            offsetY = animations.length > 0 ? animations[0].offsetY : 0,
            yAxis = this.getPath('parentView.parentView.yAxis'),
            yMin = yAxis ? yAxis.get('min') : 0,
            yMax = yAxis ? yAxis.get('max') : 1,
            images = this.images,
            raphaelCanvas = this.get('raphaelCanvas');

        console.log("**** animationView.render(firstTime = %s)", firstTime ? 'YES' : 'NO');
        
        if (frame.width === 0) {
          console.log("****   returning because frame.width === 0");
          return;
        }

        if (firstTime) {
          context.callback(this, this.renderCallback, xLeft+offsetX, yTop+offsetY, plotWidth, plotHeight);
        } 
        else {
          this.getPath('parentView.dataHolder.childViews').forEach(function(dataSetView, idx) {
            var image = images[idx],
                points = dataSetView.getPath('item.points') || [],
                pt = points[0], // [x, y]
                y = pt[1] === 0 ? 0 : pt[1]/(yMax-yMin);

            if (!image) {
              that._renderDataSetImageFirstTime(dataSetView, idx, images, raphaelCanvas, xLeft, yTop, plotWidth, plotHeight);
            } 
            else if (dataSetView.get('isAnimatable')) {
              if (image.raphael) {
                image.raphael.attr({
                  x: xLeft+offsetX,
                  y: yTop+(plotHeight*(1-y))-30+offsetY,
                  width: plotWidth,
                  height: 30
                });
              }
            }
          });
        }
      }

    })
  })
});
