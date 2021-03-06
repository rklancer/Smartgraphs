// ==========================================================================
// Project:   Smartgraphs.GraphView
// Copyright: ©2011 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs RaphaelViews NO YES SC console sc_static sc_super*/

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

  animationInfoBinding: '*graphController.animationInfo',
  showAnimationBinding: '*animationInfo.hasAnimation',
  channelWidthBinding: '*animationInfo.channelWidth',
  
  inputAreaView:     SC.outlet('graphCanvasView.axesView.inputAreaView'),
  xAxisView:         SC.outlet('graphCanvasView.axesView.xAxisView'),
  yAxisView:         SC.outlet('graphCanvasView.axesView.yAxisView'),
  dataHolder:        SC.outlet('graphCanvasView.dataHolder'),
  annotationsHolder: SC.outlet('graphCanvasView.annotationsHolder'),
  overlayAnnotationsHolder: SC.outlet('graphCanvasView.overlayAnnotationsHolder'),

  padding: { top: 15, right: 15, bottom: 45, left: 45 },

  childViews: 'titleView graphCanvasView'.w(),

  init: function () {
    sc_super();
    this.padding = SC.copy(this.padding);
    this._viewsByClassAndItem = {};
  },

  animate: function () {
    this.get('graphCanvasView').animate();
  },

  stop: function () {
    this.get('graphCanvasView').stop();
  },

  reset: function () {
    this.get('graphCanvasView').reset();
  },

  // adjust left border depending on whether we show the animation or not.
  showAnimationDidChange: function () {
    var showAnimation = this.get('showAnimation'),
        channelWidth  = this.get('channelWidth');
    
    this.padding.left = 50 + (showAnimation ? channelWidth : 0);
    this.replaceLayer();
  }.observes('showAnimation'),

  viewDidResize: function () {
    sc_super();
    var graphController = this.get('graphController');
    if (graphController) graphController.sendAction('graphViewDidResize');
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
        }),
        
        animatedDatadefNames = (this.getPath('animationInfo.animations') || []).concat(this.getPath('animationInfo.linkedAnimations')).getEach('datadefName');

    // append data and annotations
    if (itemType === 'data') {
      view.set('isHiddenForAnimation', animatedDatadefNames.indexOf(item.getPath('dataRepresentation.datadef.name')) >= 0);
      this.get('dataHolder').appendChild(view);      
    }
    else if (itemType === 'annotation') {
      if (item.get('isOverlayAnnotation')) {
        this.get('overlayAnnotationsHolder').appendChild(view);
      }
      else {
        this.get('annotationsHolder').appendChild(view);
      }
    }

    if (this._viewsByClassAndItem[classKey] === undefined) {
      this._viewsByClassAndItem[classKey] = {};
    }
    this._viewsByClassAndItem[classKey][itemKey] = view;
  },


  _removeView: function (view) {
    var item     = view.get('item'),
        classKey = SC.guidFor(item.constructor),
        itemKey  = SC.guidFor(item);

    delete this._viewsByClassAndItem[classKey][itemKey];

    view.removeFromParent();
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

    graphView: SC.outlet('parentView'),
    
    xAxisBinding: '.graphView.xAxis',
    yAxisBinding: '.graphView.yAxis',
    requestedCursorStyleBinding: '.graphView.requestedCursorStyle',
    animationInfoBinding: '.graphView.animationInfo',

    displayProperties: 'xAxis.min xAxis.max yAxis.min yAxis.max'.w(),

    childViews: 'axesView dataHolder annotationsHolder overlayAnnotationsHolder animationView'.w(),

    _animationIsPaused: NO,
    
    _getScreenBounds: function () {
      var frame   = this.get('frame'),
          padding = this.getPath('graphView.padding');
          
      if (!padding) return null;
          
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
      var xAxis = this.getPath('graphView.xAxis'),
          yAxis = this.getPath('graphView.yAxis');
          
      if (!xAxis || !yAxis) return null;
      
      return {        
        xMin: xAxis.get('min'), 
        xMax: xAxis.get('max'),
        yMin: yAxis.get('min'),
        yMax: yAxis.get('max')
      };
    },
    
    _startAnimationLoop: function (loopParameters, datadefName, dataViews, raphaelForImage) {
      console.log("**** _startAnimationLoop()");
    
      var points        = dataViews.objectAt(0).getPath('item.points') || [],
          logicalBounds = this._getLogicalBounds(),
          screenBounds  = this._getScreenBounds(),
          ms            = this.getPath('animationInfo.duration'),
          animationSpec = this.getPath('animationView.animationSpecsByDatadefName')[datadefName],
          yOffset       = animationSpec.yOffset,
          
          raphaelForGraph, raphaelForFirstDataView, i, len, animationTime, pt, dist, y;

      // Without these two, animation will occasionally screw up.
      for (i = 0, len = dataViews.get('length'); i < len; i++) {
        raphaelForGraph = dataViews.objectAt(i).get('layer').raphael;
        raphaelForGraph.stop();
      }
      raphaelForImage.stop();
      
      console.log("**** in startAnimationLoop: regenerateKeyframes = %s", loopParameters.regenerateKeyframes ? "YES" : "NO");
      console.log("**** in startAnimationLoop: animationIsRestarting = %s", loopParameters.animationIsRestarting ? "YES" : "NO");
      
      // The keyframes on the first loop are set below. Once we've looped once,
      // when restarting a previous animation, we need to regenerate the keyframes
      // to handle the "full" animation loop. This flag is toggled, below.
      // Note: Can't move this code lower! We have to wait until the next loop
      // to regenerate the keyframes.

      if (loopParameters.regenerateKeyframes) {
        loopParameters.keyframes = {};
        this._calculateKeyframes(loopParameters.keyframes, points, logicalBounds, screenBounds, yOffset, 0, loopParameters.callback);
        loopParameters.regenerateKeyframes = NO; // Should only regenerate keyframes once.
      }

      if (loopParameters.animationIsRestarting) {
        loopParameters.regenerateKeyframes   = YES;   // The next loop, we need to regenerate keyframes.
        loopParameters.animationIsRestarting = NO;
        animationTime = parseInt(ms - (raphaelForGraph.attrs['clip-rect'][2]/screenBounds.plotWidth)*ms, 10);      
      }
      else {
        // Reset raphael parameters to the "beginning".
        for (i = 0, len = dataViews.get('length'); i < len; i++) {
          raphaelForGraph = dataViews.objectAt(i).get('layer').raphael;
          raphaelForGraph.attr({ "clip-rect": [screenBounds.xLeft, screenBounds.yTop, 0, screenBounds.plotHeight].join(',') });
        }

        pt = points[0]; // [x, y]
        y = pt[1] / (logicalBounds.yMax - logicalBounds.yMin);
        raphaelForImage.attr({ y: screenBounds.yTop + (screenBounds.plotHeight*(1-y)) + yOffset });
        animationTime = ms;
      }
      
      // and sync the animations together!
      raphaelForFirstDataView = dataViews.objectAt(0).get('layer').raphael;
      
      raphaelForFirstDataView.animate({
        "clip-rect": [screenBounds.xLeft, screenBounds.yTop, screenBounds.plotWidth, screenBounds.plotHeight].join(',')
      }, animationTime);
      
      for (i = 1, len = dataViews.get('length'); i < len; i++) {
        raphaelForGraph = dataViews.objectAt(i).get('layer').raphael;
        raphaelForGraph.animateWith(raphaelForFirstDataView, {
          "clip-rect": [screenBounds.xLeft, screenBounds.yTop, screenBounds.plotWidth, screenBounds.plotHeight].join(',')
        }, animationTime);
      }

      raphaelForImage.animateWith(raphaelForFirstDataView, loopParameters.keyframes,  animationTime);
    },
 
    _calculateKeyframes: function (keyframes, points, logicalBounds, screenBounds, yOffset, startingXFrac, loopCallback) {
      var xScale              = 1 / (logicalBounds.xMax - logicalBounds.xMin),
          yScale              = 1 / (logicalBounds.yMax - logicalBounds.yMin),
          startingXPercentage = startingXFrac * 100,        // if restarting, percentage along the x-axis to start from
          
          idx, len, pt, xPercentage, scaledXPercentage, xFrac, yFrac;

      for (idx=0, len=points.length; idx<len; ++idx) {
        pt = points[idx];
        xFrac = pt[0] * xScale;             // the fractional progress along x-axis
        xPercentage = xFrac * 100;
        
        // only insert keyframes for points to the right of the x-value we're restarting the animation at
        if (xPercentage >= startingXPercentage) { 
          
          // rescale the percentage to account for starting in the middle (a point right at startingXPercentage should be keyframe '0%')
          scaledXPercentage = (xPercentage - startingXPercentage) / (1 - startingXFrac);
          if (scaledXPercentage >= 100) scaledXPercentage = 100;
          
          yFrac = pt[1] * yScale;         // the fractional distance along y-axis at which the icon should display
          
          keyframes[parseInt(scaledXPercentage, 10)+'%'] = {
            y: screenBounds.yTop + (screenBounds.plotHeight * (1-yFrac)) + yOffset
          };
          
          if (idx+1===len) {
            keyframes[parseInt(scaledXPercentage, 10)+'%'].callback = loopCallback;
          }
        }
      }
    },
    
    _startAnimationForDatadef: function (datadefName) {
      
      console.log("**** graphCanvasView._startAnimationForDatadef(%s)", datadefName);
      
      var screenBounds           = this._getScreenBounds(),
          logicalBounds          = this._getLogicalBounds(),
          animationSpecsByDatadefName = this.getPath('animationView.animationSpecsByDatadefName') || {},          
          dataViewsByDatadefName = this.getPath('animationView.dataViewsByDatadefName'),
          
          dataViews              = dataViewsByDatadefName[datadefName] || [],
          firstDataView          = dataViews.objectAt(0),
          raphaelForDataView     = firstDataView.get('layer') && firstDataView.get('layer').raphael,
          
          points                 = firstDataView.getPath('item.points') || [],
          yOffset                = animationSpecsByDatadefName[datadefName].yOffset,
          clipRect               = raphaelForDataView.attrs['clip-rect'],
          currentX               = clipRect ? clipRect[2] : 0, // occasionally, clip-rect is undefined; deal with it gracefully
          currentXFrac           = currentX / screenBounds.plotWidth,          
          
          imagesByDatadefName    = this.getPath('animationView.imagesByDatadefName'),
          raphaelForImage        = imagesByDatadefName[datadefName],
          
          self = this,
          loopParameters;

      function gotoAnimationFinishedState() {
        SC.RunLoop.begin();
        self.getPath('parentView.graphController').sendAction('animationFinished');
        SC.RunLoop.end();
      }
      
      function startAnimationLoop() {
        self._startAnimationLoop(loopParameters, datadefName, dataViews, raphaelForImage);
      }
      
      loopParameters = {
        animationIsRestarting: this._animationIsPaused,
        regenerateKeyframes:   NO,
        keyframes:             {},
        callback:              this.getPath('animationInfo.loop') ? startAnimationLoop : gotoAnimationFinishedState
      };
      
      // Calculate the first set of keyframes. This takes into account any
      // progress already made on animating the graph. The keyframes will
      // be regenerated in startAnimationLoop() if we're restarting animation
      // so that the next loop has a "full" set of keyframes.
      this._calculateKeyframes(loopParameters.keyframes, points, logicalBounds, screenBounds, yOffset, currentXFrac, loopParameters.callback);

      dataViews.setEach('isHiddenForAnimation', NO);
      
      // Actually start the animation loop.
      startAnimationLoop();
    },
    
    _dataViewsForDatadefName: function (datadefName) {
      var ret = [],
          dataViews = this.getPath('parentView.dataHolder.childViews') || [];
          
      dataViews.forEach( function (dataView) {
        if (dataView.getPath('item.dataRepresentation.datadef.name') === datadefName) ret.push(dataView);
      });
      
      return ret;
    },
    
    _startLinkedAnimationForDatadef: function (datadefName, animationIsRestarting, loopCallback) {
      console.log("**** _startLinkedAnimationForDatadef('%s')", datadefName);
      
      var screenBounds            = this._getScreenBounds(),
          dataViews               = this._dataViewsForDatadefName(datadefName),
          firstDataView           = dataViews.objectAt(0),
          raphaelForFirstDataView = firstDataView.get('layer') && firstDataView.get('layer').raphael,
          points                  = firstDataView.getPath('item.points') || [],
          clipRect                = raphaelForFirstDataView.attrs['clip-rect'],
          currentX                = clipRect ? clipRect[2] : 0, // occasionally, clip-rect is undefined; deal with it gracefully
          currentXFrac            = currentX / screenBounds.plotWidth,
          ms                      = this.getPath('animationInfo.duration'),
          loop                    = this.getPath('animationInfo.loop'),
          self                    = this,
          callback,
          i,
          len,
          animationTime,
          raphaelForGraph;
  
      for (i = 0, len = dataViews.get('length'); i < len; i++) {
        raphaelForGraph = dataViews.objectAt(i).get('layer').raphael;
        raphaelForGraph.stop();
      }

      if (animationIsRestarting) {
        animationTime = parseInt(ms - (raphaelForGraph.attrs['clip-rect'][2]/screenBounds.plotWidth)*ms, 10);
        animationIsRestarting = NO;
      }
      else {
        // FIXME iterate over the dataViews
        raphaelForGraph.attr({ "clip-rect": [screenBounds.xLeft, screenBounds.yTop, 0, screenBounds.plotHeight].join(',') });
        animationTime = ms;
      }

      if (loop) {
        // only generate the following closure on the first loop!
        callback = loopCallback || function () {
          self._startLinkedAnimationForDatadef(datadefName, animationIsRestarting, callback);
        };
      }
      else {
        callback = null;
      }
      
      dataViews.setEach('isHiddenForAnimation', NO);
      raphaelForFirstDataView.animate({
        "clip-rect": [screenBounds.xLeft, screenBounds.yTop, screenBounds.plotWidth, screenBounds.plotHeight].join(',')
      }, animationTime, callback);

      for (i = 1, len = dataViews.get('length'); i < len; i++) {
        raphaelForGraph = dataViews.objectAt(i).get('layer').raphael;
        raphaelForGraph.animateWith(raphaelForFirstDataView, {
          "clip-rect": [screenBounds.xLeft, screenBounds.yTop, screenBounds.plotWidth, screenBounds.plotHeight].join(',')
        }, animationTime);
      }
    },
    
    animate: function () {
      console.log("**** graphCanvasView.animate()");
      
      var animations = this.getPath('animationInfo.animations')             || [],
          linkedAnimations = this.getPath('animationInfo.linkedAnimations') || [],
          self = this;
      
      animations.forEach( function (animationSpec) {
        self._startAnimationForDatadef(animationSpec.datadefName);
      });
      
      linkedAnimations.forEach( function (linkedSpec) {
        self._startLinkedAnimationForDatadef(linkedSpec.datadefName, self._animationIsPaused);
      });
    },

    stop: function () {
      console.log("**** graphCanvasView.stop()");   
            
      var animations             = this.getPath('animationInfo.animations')       || [],
          linkedAnimations       = this.getPath('animationInfo.linkedAnimations') || [],
          dataViewsByDatadefName = this.getPath('animationView.dataViewsByDatadefName'),
          imagesByDatadefName    = this.getPath('animationView.imagesByDatadefName'),
          self = this;
      
      animations.forEach( function (animationSpec) {
        var datadefName     = animationSpec.datadefName,
            dataViews       = dataViewsByDatadefName[datadefName],
            raphaelForImage = imagesByDatadefName[datadefName];
        
        dataViews.forEach( function (dataView) {
          dataView.get('layer').raphael.stop();
        });
        raphaelForImage.stop();
      });
      
      linkedAnimations.forEach( function (linkedSpec) {
        self._dataViewsForDatadefName(linkedSpec.datadefName).forEach( function (dataView) {
          dataView.get('layer').raphael.stop();
        });
      });

      this._animationIsPaused = YES;
    },

    reset: function () {
      console.log("**** graphCanvasView.reset()");
      
      var screenBounds  = this._getScreenBounds(),
          logicalBounds = this._getLogicalBounds(),
          
          animations             = this.getPath('animationInfo.animations')       || [],
          linkedAnimations       = this.getPath('animationInfo.linkedAnimations') || [],
          dataViewsByDatadefName = this.getPath('animationView.dataViewsByDatadefName'),
          imagesByDatadefName    = this.getPath('animationView.imagesByDatadefName'),

          graphResetAttributes = {
            "clip-rect": [screenBounds.xLeft, screenBounds.yTop, screenBounds.plotWidth, screenBounds.plotHeight].join(',')
          },

          self = this;
                
      animations.forEach( function (animationSpec) {
        var datadefName     = animationSpec.datadefName,
            dataViews       = dataViewsByDatadefName[datadefName],
            raphaelForImage = imagesByDatadefName[datadefName],
            firstDataView   = dataViews.objectAt(0),
            points          = firstDataView.getPath('item.points'),
            y               = points[0][1] / (logicalBounds.yMax - logicalBounds.yMin),
            yOffset         = animationSpec.yOffset || 0;

        dataViews.forEach( function (dataView) {
          dataView.set('isHiddenForAnimation', YES);
          var raphaelForGraph = dataView.get('layer').raphael;
          raphaelForGraph.attr(graphResetAttributes);
        });
        
        if (raphaelForImage) {
          raphaelForImage.attr({
            y: screenBounds.yTop + screenBounds.plotHeight * (1-y) + yOffset
          });
        }
      });
      
      linkedAnimations.forEach( function (linkedSpec) {
        self._dataViewsForDatadefName(linkedSpec.datadefName).forEach( function (dataView) {
          dataView.set('isHiddenForAnimation', YES);
          dataView.get('layer').raphael.attr(graphResetAttributes);
        });
      });

      this._animationIsPaused = NO;
    },

    axesView: RaphaelViews.RaphaelView.design({

      graphCanvasView: SC.outlet('parentView'),
      graphView: SC.outlet('graphCanvasView.graphView'),
      
      xAxisBinding: '.graphView.xAxis',
      yAxisBinding: '.graphView.yAxis',
      paddingBinding: '.graphView.padding',

      childViews: 'inputAreaView xAxisView yAxisView'.w(),

      inputAreaView: RaphaelViews.RaphaelView.design({
        
        graphCanvasView: SC.outlet('parentView.graphCanvasView'),
        graphView: SC.outlet('parentView.graphView'),
        
        didCreateLayer: function () {
          // cache these rather than lookup the jquery object (graphView.$()) per mouse event
          this._graphView = this.get('graphView');
          this._$graphView = this._graphView.$();
        },
        
        renderCallback: function (raphaelCanvas, xLeft, yTop, plotWidth, plotHeight) {
          return raphaelCanvas.rect(xLeft, yTop, plotWidth, plotHeight).attr({
            fill: '#f7f8fa', stroke: '#f7f8fa', opacity: 1.0
          });
        },

        render: function (context, firstTime) {
          var bounds = this.get('graphCanvasView')._getScreenBounds(),
              raphaelRect;

          // cache this for coordsForEvent() below
          this._screenBounds = bounds;
          
          if (firstTime) {
            context.callback(this, this.renderCallback, bounds.xLeft, bounds.yTop, bounds.plotWidth, bounds.plotHeight);
          }
          else {
            raphaelRect = context.raphael();
            raphaelRect.attr({x: bounds.xLeft, y: bounds.yTop, width: bounds.plotWidth, height: bounds.plotHeight});
          }
        },

        coordsForEvent: function (evt) {
          var graphOffset = this._$graphView.offset(),
              bounds      = this._screenBounds,
              x           = evt.pageX - graphOffset.left,
              y           = evt.pageY - graphOffset.top,
              fraction;
          
          // clip the event to the inputArea boundaries. Simple clipping seems to work fine        
          x = (x < bounds.xLeft) ? bounds.xLeft : (x > bounds.xRight)  ? bounds.xRight  : x;
          y = (y < bounds.yTop)  ? bounds.yTop  : (y > bounds.yBottom) ? bounds.yBottom : y;

          return { x: x, y: y };
        },

        mouseDown: function (evt) {
          var coords = this.coordsForEvent(evt),
              point = this._graphView.pointForCoordinates(coords.x, coords.y);          

          this._graphController = this._graphView.get('graphController');
          return this._graphController.inputAreaMouseDown(point.x, point.y);
        },

        mouseDragged: function (evt) {
          var coords = this.coordsForEvent(evt),
              point = this._graphView.pointForCoordinates(coords.x, coords.y);
              
          return this._graphController.inputAreaMouseDragged(point.x, point.y);
        },

        mouseUp: function (evt) {
          var coords = this.coordsForEvent(evt),
              point = this._graphView.pointForCoordinates(coords.x, coords.y);
              
          return this._graphController.inputAreaMouseUp(point.x, point.y);
        }
      }),

      xAxisView: Smartgraphs.AxisView.design({
        graphView: SC.outlet('parentView.graphView'),
        axisBinding:         '.graphView.xAxis',
        otherAxisBinding:    '.graphView.yAxis',
        type: 'x'
      }),

      yAxisView: Smartgraphs.AxisView.design({
        graphView: SC.outlet('parentView.graphView'),
        axisBinding:         '.graphView.yAxis',
        otherAxisBinding:    '.graphView.xAxis',
        type: 'y'
      })
    }),
    
    // Holds the data views. Should be earlier in the DOM (and thus "behind") the annotation views
    dataHolder: RaphaelViews.RaphaelView.design({
    }),
    
    // Holds the annotation views. Should be later in the DOM (and thus "in front of") the data views
    annotationsHolder: RaphaelViews.RaphaelView.design({
    }),
    
    // Holds the 'overlay annotations'; is transparent to mouse events
    overlayAnnotationsHolder: RaphaelViews.RaphaelView.design({

      // In order to be transparent to mouse events, we weant to intercept mousemove, mousedown, and mouseup events at 
      // the DOM level, so that we can trick the SproutCore root responder into thinking the events actually happened
      // on the non-overlay views beneath us (see handleEvent)
      didCreateLayer: function () {
        var self = this;

        this.$().mousemove(function (evt) {
          self.handleEvent(evt);
        });

        this.$().mousedown(function (evt) {
          self.handleEvent(evt);
        });

        this.$().mouseup(function (evt) {
          self.handleEvent(evt);
        });
      },

      handleEvent: function (evt) {
        // Stop propagation. If we let the mousemove event bubble, the SproutCore root responder will think we were the 
        // "last hovered" view, which screws up its calculation of hover (i.e., mouseEntered and mouseExited) events for
        // any views below us.
        evt.stopPropagation();

        // Find the element UNDER us at the location of the mouse event
        this.$().hide();
        var el = document.elementFromPoint(evt.clientX, evt.clientY);     // should work in IE!
        this.$().show();

        // Set the event target to be the element beneath us. Because 'event' is a jQuery-normalized event, 'target' is a 
        // normal R/W property
        evt.target = el;

        // NOW let SproutCore think the event happened directly to the element below us. It will handle forwarding 
        // mouseDown, mouseMoved, mouseExited, mouseEntered events to the SC.Views beneath us.
        SC.Event.handle.call(document, evt);
      }
      
    }),

    // Holds the animation channel. Should be later in the DOM (and thus "in front of") the annotation views.
    animationView: RaphaelViews.RaphaelView.design({

      animationInfoBinding: '.parentView.animationInfo',
      isVisibleBinding:  '*animationInfo.hasAnimation',
      animationsBinding: '*animationInfo.animations',
      staticImagesBinding: '*animationInfo.staticImages',
      dataViewsBinding: '.parentView.dataHolder.childViews',

      // used for bookkeeping when rendering data images (i.e, the moving sprites in the animation channel)
      dataViewsByDatadefName: null,
      imagesByDatadefName: null,
      animationSpecsByDatadefName: null,
      
      // used for bookkeeping when rendering static images in the animation channel (e.g., start or stop lines overlaid over the channel)
      staticImagesByURL: null,
      
      displayProperties: ['animations.[]','staticImages.[]', 'dataViews.[]'],
      
      // Handle the special shapes we allow authors to use.
      _normalizeImageURL: function (imageURL) {
        if (imageURL.indexOf('.') === -1) {
          
          var longURL = {
                circle: sc_static('images/circle'),
                box:    sc_static('images/box'),
                cross:  sc_static('images/cross')
              }[imageURL];
            
          imageURL = longURL || sc_static('images/cross');
        }
        return imageURL;
      },

      _clearImageReferences: function() {
        this.set('imagesByDatadefName',   {});
        this.set('staticImagesByURL', {});
      },

      _renderStaticImages: function (raphaelCanvas) {
        var staticImages         = this.get('staticImages') || [],
            staticImagesByURL    = this.get('staticImagesByURL'),
            requestedStaticImagesByURL = {},
            logicalBounds        = this.get('parentView')._getLogicalBounds(),
            screenBounds         = this.get('parentView')._getScreenBounds(),
            url,
            nRequested,
            nActual,
            i,
            requestedImage,
            actualImage,
            yFrac;

        if (!logicalBounds) {
          console.warn("logicalBounds is not defined.");
          return;
        }
        
        // gather up the list of requested images
        staticImages.forEach( function (staticImage) {
          url = staticImage.image;
          
          if (!url) {
            console.log("no image url for static image");
            return null; // next in forEach
          }
          
          if (!requestedStaticImagesByURL[url]) requestedStaticImagesByURL[url] = [];
          requestedStaticImagesByURL[url].push(staticImage);
        });
        
        
        for (url in staticImagesByURL) {
          if ( !staticImagesByURL.hasOwnProperty(url) ) continue;
          
          // delete all images not currently requested
          if ( !requestedStaticImagesByURL[url] ) {
            console.log("deleting all images for static image url '%s'", url);
            staticImagesByURL[url].forEach( function (staticImage) {
              staticImage.remove();
            });
            delete staticImagesByURL[url];
            continue;     // next url!
          }
        }
        
        for (url in requestedStaticImagesByURL) {
          if ( !requestedStaticImagesByURL.hasOwnProperty(url) ) continue;

          if ( !staticImagesByURL[url] ) staticImagesByURL[url] = [];
          
          nRequested = requestedStaticImagesByURL[url].length;
          nActual    = staticImagesByURL[url].length;
          
          // delete excess images
          if (nRequested  < nActual) {
            console.log("deleting %d excess images for static image url '%s'", nActual - nRequested, url);
            for (i = nRequested; i < nActual; i++) {
              staticImagesByURL[url][i].remove();
            }
            staticImagesByURL[url].removeAt(nRequested, nActual - nRequested);
          }
          
          // create needed images
          if (nActual < nRequested) {
            console.log("creating %d new images for static image url '%s'", nRequested - nActual, url);
            for (i = nActual; i < nRequested; i++) {
              staticImagesByURL[url].push(raphaelCanvas.image(url));
            }
          }
        
          // adjust images
          
          for (i = 0; i < nRequested; i++) {
            console.log("adjusting image %d for static image url '%s'", i, url);
            
            requestedImage = requestedStaticImagesByURL[url][i];
            actualImage    = staticImagesByURL[url][i];
            
            yFrac = requestedImage.y / (logicalBounds.yMax - logicalBounds.yMin);
            
            actualImage.attr({
              x: this.get('frame').x + 10  + requestedImage.xOffset,
              y: screenBounds.yTop + (screenBounds.plotHeight * (1 - yFrac)) - requestedImage.yOffset,
              width: requestedImage.width,
              height: requestedImage.height
            });
          }
        }
      },

      _renderDataImages: function (raphaelCanvas) {
        var animations             = this.get('animations') || [],
            dataViews              = this.getPath('parentView.dataHolder.childViews') || [],
            imagesByDatadefName    = this.get('imagesByDatadefName') || {},
            dataViewsByDatadefName = {},
            animationSpecsByDatadefName = {},
            requestedImageURLs     = {},
            logicalBounds          = this.get('parentView')._getLogicalBounds(),
            screenBounds           = this.get('parentView')._getScreenBounds(),
            datadefName,
            animationSpec,
            imageWidth,
            imageHeight,
            xOffset,
            yOffset,
            dataView,
            points,
            y;
        
        animations.forEach( function (animationSpec) {
          var datadefName = animationSpec.datadefName;
          dataViewsByDatadefName[datadefName] = [];
          requestedImageURLs[datadefName] = animationSpec.foregroundImageURL;
          animationSpecsByDatadefName[datadefName] = animationSpec;
        });
        
        dataViews.forEach( function (dataView) {
          var datadefName = dataView.getPath('item.dataRepresentation.datadef.name');
          
          if (dataViewsByDatadefName[datadefName] && dataView.get('isAnimatable')) {
            dataViewsByDatadefName[datadefName].push(dataView);
          }
        });
        
        for (datadefName in requestedImageURLs) {
          if (!requestedImageURLs.hasOwnProperty(datadefName)) continue;
          
          if (!imagesByDatadefName[datadefName]) {
            console.log('creating new image');
            imagesByDatadefName[datadefName] = raphaelCanvas.image(this._normalizeImageURL(requestedImageURLs[datadefName]));
          }
        }
        
        for (datadefName in imagesByDatadefName) {
          if (!imagesByDatadefName.hasOwnProperty(datadefName)) continue;
          
          // remove images for datadefs we're not animating
          if (!requestedImageURLs[datadefName]) {
            console.log('removing data image');
            imagesByDatadefName[datadefName].remove();
          }
          else {
            // finally, display the right image in the right place.
            dataView = dataViewsByDatadefName[datadefName][0];        // pick one of the data views we're animating            
            if (dataView) {
              points        = dataView.getPath('item.points');
              y             = points[0][1] / (logicalBounds.yMax - logicalBounds.yMin);

              animationSpec = animationSpecsByDatadefName[datadefName];
              imageWidth    = animationSpec.width  || 70;
              imageHeight   = animationSpec.height || 30;
              xOffset       = animationSpec.xOffset || 0;
              yOffset       = animationSpec.yOffset || 0;
          
              console.log('adjusting data image');      

              imagesByDatadefName[datadefName].attr({
                src:    this._normalizeImageURL(requestedImageURLs[datadefName]),
                x:      this.get('frame').x + 10 + xOffset,
                y:      screenBounds.yTop + (screenBounds.plotHeight * (1-y)) + yOffset,
                width:  imageWidth,
                height: imageHeight
              }).toFront();
            }
          }
        }
        
        this.set('dataViewsByDatadefName', dataViewsByDatadefName);
        this.setIfChanged('imagesByDatadefName', imagesByDatadefName);
        this.set('animationSpecsByDatadefName', animationSpecsByDatadefName);
                
        return null;     // we don't generate a layer
      },

      render: function (context, firstTime) {
        var self = this;
        console.log("animationView.render(firstTime = %s)", firstTime ? "YES" : "NO");
        if (firstTime) {
          this._clearImageReferences();
          context.callback(this, function (raphaelCanvas) {
            self._renderStaticImages(raphaelCanvas);
            self._renderDataImages(raphaelCanvas);
          });
        }
        else {
          this._renderStaticImages(this.get('raphaelCanvas'));
          this._renderDataImages(this.get('raphaelCanvas'));
        }
      }
    })
  })
});
