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
    var item     = view.get('item'),
        itemType = view.get('itemType'),
        classKey = SC.guidFor(item.constructor),
        itemKey  = SC.guidFor(item);

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
    
    _startAnimationLoop: function (loopParameters, loopCallback, datadefName, dataViews, raphaelForImage) {
      console.log("**** _startAnimationLoop()");
    
      var points        = dataViews.objectAt(0).getPath('item.points') || [],
          logicalBounds = this._getLogicalBounds(),
          screenBounds  = this._getScreenBounds(),
          ms            = Smartgraphs.animationTool.get('duration'),
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
        this._calculateKeyframes(loopParameters.keyframes, points, logicalBounds, screenBounds, yOffset, 0, loopCallback);
        loopParameters.regenerateKeyframes = NO; // Should only regenerate keyframes once.
      }

      if (loopParameters.animationIsRestarting) {
        loopParameters.regenerateKeyframes   = YES;   // The next loop, we need to regenerate keyframes.
        loopParameters.animationIsRestarting = NO;
        animationTime = parseInt(ms - (raphaelForGraph.attrs['clip-rect'][2]/screenBounds.plotWidth)*ms, 10);      
      }
      else {
        // Reset raphael parameters to the "beginning".
        raphaelForGraph.attr({ "clip-rect": [screenBounds.xLeft, screenBounds.yTop, 0, screenBounds.plotHeight].join(',') });

        pt = points[0]; // [x, y]
        y = pt[1] / (logicalBounds.yMax - logicalBounds.yMin);
        raphaelForImage.attr({ y: screenBounds.yTop + (screenBounds.plotHeight*(1-y))-30+yOffset });
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
            y: screenBounds.yTop + (screenBounds.plotHeight * (1-yFrac)) - 30 + yOffset
          };
          
          if (idx+1===len) {
            keyframes[parseInt(scaledXPercentage, 10)+'%'].callback = loopCallback;
          }
        }
      }
    },
    
    _animateDataViewsFor: function (datadefName) {
      
      console.log("**** graphCanvasView._animateDataViewsFor(%s)", datadefName);
      
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
          
          loopParameters = {
            animationIsRestarting: this._animationIsPaused,
            regenerateKeyframes:   NO,
            keyframes:             {}
          },
          
          self = this,
          dataView,
          i,
          len;
          
      // If the graph is in the "reset" mode, it will not have opacity: 1.0, so set it here.          
      for (i = 0, len = dataViews.get('length'); i < len; i++) {
        dataView = dataViews.objectAt(i);
        dataView.get('layer').raphael.attr({ "opacity": 1.0 });
      }

      function startAnimationLoop() {
        self._startAnimationLoop(loopParameters, startAnimationLoop, datadefName, dataViews, raphaelForImage);
      }

      // Calculate the first set of keyframes. This takes into account any
      // progress already made on animating the graph. The keyframes will
      // be regenerated in startAnimationLoop() if we're restarting animation
      // so that the next loop has a "full" set of keyframes.
      
      this._calculateKeyframes(loopParameters.keyframes, points, logicalBounds, screenBounds, yOffset, currentXFrac, startAnimationLoop);

      // Actually start the animation loop.
      startAnimationLoop();
    },
    
    animate: function () {
      console.log("**** graphCanvasView.animate()");
      
      var animations = this.getPath('parentView.graphController.animations'),
          self = this;
      
      animations.forEach( function (animationSpec) {
        self._animateDataViewsFor(animationSpec.datadefName);
      });
    },

    stop: function () {
      console.log("**** graphCanvasView.stop()");   
            
      var animations             = this.getPath('parentView.graphController.animations'),
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

      this._animationIsPaused = YES;
    },

    reset: function () {
      console.log("**** graphCanvasView.reset()");
      
      var screenBounds  = this._getScreenBounds(),
          logicalBounds = this._getLogicalBounds(),
          
          animations             = this.getPath('parentView.graphController.animations') || [],
          dataViewsByDatadefName = this.getPath('animationView.dataViewsByDatadefName'),
          imagesByDatadefName    = this.getPath('animationView.imagesByDatadefName'),

          graphResetAttributes = {
            "clip-rect": [screenBounds.xLeft, screenBounds.yTop, screenBounds.plotWidth, screenBounds.plotHeight].join(','),
            "opacity": 0.25
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
          var raphaelForGraph = dataView.get('layer').raphael;
          raphaelForGraph.attr(graphResetAttributes);
        });
        
        if (raphaelForImage) {
          raphaelForImage.attr({
            y: screenBounds.yTop + screenBounds.plotHeight * (1-y) - 30 + yOffset
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

      isVisibleBinding:  '.parentView.parentView.showAnimation',
      animationsBinding: '.parentView.parentView*graphController.animations',    

      images: [],
      indexedImages: {},

      displayProperties: 'animations.[]',

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
            console.log('removing image');
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
          
              console.log('adjusting image');      

              imagesByDatadefName[datadefName].attr({
                src:    this._normalizeImageURL(requestedImageURLs[datadefName]),
                x:      this.get('frame').x + 10,
                y:      screenBounds.yTop + (screenBounds.plotHeight * (1-y)) - imageHeight,
                width:  imageWidth,
                height: imageHeight
              });
            }
          }
        }
        
        this.set('dataViewsByDatadefName', dataViewsByDatadefName);
        this.setIfChanged('imagesByDatadefName', imagesByDatadefName);
        this.set('animationSpecsByDatadefName', animationSpecsByDatadefName);
                
        return null;     // we don't generate a layer
      },

      render: function (context, firstTime) {
        console.log("animationView.render(firstTime = %s)", firstTime ? "YES" : "NO");
        window.animationView = this;
        if (firstTime) {
          this.set('imagesByDatadefName', {});    // need to re-render images
          context.callback(this, this._renderDataImages);
        }
        else {
          this._renderDataImages(this.getPath('parentView.raphaelCanvas'));
        }
      }
    })
  })
});
