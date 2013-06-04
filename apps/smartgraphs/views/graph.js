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
  arrLegendsBinding: '*graphController.arrLegends',

  animationInfoBinding: '*graphController.animationInfo',
  showAnimationBinding: '*animationInfo.hasAnimation',
  channelWidthBinding: '*animationInfo.channelWidth',
  hideGraphBinding: '*animationInfo.hideGraph',

  inputAreaView:     SC.outlet('graphCanvasView.axesView.inputAreaView'),
  xAxisView:         SC.outlet('graphCanvasView.axesView.xAxisView'),
  yAxisView:         SC.outlet('graphCanvasView.axesView.yAxisView'),
  dataHolder:        SC.outlet('graphCanvasView.dataHolder'),
  annotationsHolder: SC.outlet('graphCanvasView.annotationsHolder'),
  overlayAnnotationsHolder: SC.outlet('graphCanvasView.overlayAnnotationsHolder'),

  // Array of label's layout.
  arrLabelsLayout: [],

  mouseOverInputArea: false,

  padding: { top: 15, right: 15, bottom: 45, left: 45 },

  childViews: 'titleView tooltipView graphCanvasView topAnnotationsHolder legendView'.w(),

  init: function () {
    sc_super();
    this.padding = SC.copy(this.padding);
    this._viewsByClassAndItem = {};
    this.set('arrLabelsLayout', []);
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

  // Replaces the Sproutcore render() in order to add/remove the 'hideGraph' class when necessary
  // See https://www.pivotaltracker.com/story/show/44392071
  render: function (context, firstTime) {
    var renderer = this.renderer;
    // This is the part which is different from sc_super()
    if (this.get('hideGraph')) {
      context.setClass('hideGraph', YES);
    } else {
      context.setClass('hideGraph', NO);
    }
    // end changes
    if (this.createRenderer && renderer) {
      if (firstTime) {
        renderer.render(context);
      } else {
        renderer.update();
      }
    } else {
      if (firstTime) this.renderChildViews(context, firstTime);
    }
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

  arrLegendElementsDidChange: function () {
    this.legendView.initialize(this.get('arrLegends'));
  }.observes('*arrLegends.[]'),

  _itemListsDidChange: function () {
    var list,
        item,
        classKey,
        itemKey,
        desiredViewsByClassAndItem = {},
        itemType,
        itemTypes = ['data', 'annotation'],
        i, j, len;

    for (j = 0; j < itemTypes.length; j++) {
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
      else if (item.get('isTopAnnotation')) {
        this.get('topAnnotationsHolder').appendChild(view);
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

  _updateAllViews: function () {
    var list,
        item,
        classKey,
        itemKey,
        itemType,
        itemTypes = ['data', 'annotation'],
        i, j, len;

    for (j = 0; j < itemTypes.length; j++) {
      itemType = itemTypes[j];
      list = this.get(itemType === 'data' ? 'graphableDataObjects' : 'annotationList');

      // add views for items (DataRepresentations or Annotations) not currently in the list of child views
      for (i = 0, len = list.get('length'); i < len; i++) {
        item = list.objectAt(i);

        if (item.get('isModifierAnnotation')) {
          continue;
        }

        classKey = SC.guidFor(item.constructor);
        itemKey = SC.guidFor(item);

        if (this._viewsByClassAndItem[classKey] && this._viewsByClassAndItem[classKey][itemKey]) {
          var view = this._viewsByClassAndItem[classKey][itemKey];
          var animatedDatadefNames = (this.getPath('animationInfo.animations') || []).concat(this.getPath('animationInfo.linkedAnimations')).getEach('datadefName');

          // remove the view from parent
          view.removeFromParent();
          // append data and annotations
          if (itemType === 'data') {
            view.set('isHiddenForAnimation', animatedDatadefNames.indexOf(item.getPath('dataRepresentation.datadef.name')) >= 0);
            this.get('dataHolder').appendChild(view);
          }
          else if (itemType === 'annotation') {
            if (item.get('isOverlayAnnotation')) {
              this.get('overlayAnnotationsHolder').appendChild(view);
            }
            else if (item.get('isTopAnnotation')) {
              this.get('topAnnotationsHolder').appendChild(view);
            }
            else {
              this.get('annotationsHolder').appendChild(view);
            }
          }
        }
      }
    }
  },

  _removeView: function (view) {
    var item     = view.get('item'),
        classKey = SC.guidFor(item.constructor),
        itemKey  = SC.guidFor(item);

    delete this._viewsByClassAndItem[classKey][itemKey];

    if (view.didRemoveFromGraphView) view.didRemoveFromGraphView();

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
    hideGraphBinding: '.parentView.hideGraph',
    valueBinding: '.parentView*graphController.title',
    classNames: 'pane-label',
    layout: { width: 400, centerX: 0, height: 20, top: 20, zIndex: 1 },
    textAlign: SC.ALIGN_CENTER,

    isVisible: function () {
      return !this.get('hideGraph');
    }.property('hideGraph').cacheable(),

    mouseDown : function (evt) {
      this.handleEvent(evt);
      return NO; // Return NO so won't get mouse events on drag.
    },

    handleEvent: function (evt) {
      evt.stopPropagation();
      // Find the element UNDER us at the location of the mouse event
      this.$().hide();
      var el = document.elementFromPoint(evt.clientX, evt.clientY);     // should work in IE!
      this.$().show();
      evt.target = el;
      // NOW let SproutCore think the event happened directly to the element below us. It will handle forwarding
      // mouseDown, mouseMoved, mouseExited, mouseEntered events to the SC.Views beneath us.
      SC.Event.handle.call(document, evt);
    }
  }),

  tooltipView: SC.View.extend({
    displayProperties: ['coords', 'mouseOverInputArea'],
    coordsBinding: '.parentView*graphController.tooltipCoords',
    mouseOverInputAreaBinding: '.parentView.mouseOverInputArea',
    pointOverrideBinding: '.parentView*graphController.toolTipVisibilityOverrideOnPointHover',

    render: function (context, firstTime) {
      var graphController = this.get("owner").graphController || null;
      var mouseOverInputArea = this.get('mouseOverInputArea');
      var pointOverride = this.get('pointOverride');
      var showTooltip = false;
      if (!graphController || !graphController.get("showToolTipCoords")) {
        return;
      }

      if (!mouseOverInputArea) {
        context.push("<div></div>");
        return;
      }

      if (pointOverride) {
        showTooltip = true;
      }
      else if (!graphController.get('toolTipVisibilityOverrideFromToolState')) {
        context.push("<div></div>");
        return;
      }
      else {
        showTooltip = true;
      }

      if (showTooltip) {
        var coords = this.get('coords');
        var strHtml = "";
        strHtml += "<div class='toolTipLabel' style='width:" + coords.width + "px; text-align:center; padding: 5px; position: absolute; top:" + (coords.top + coords.coordOffset) + "px; left: " + (coords.left + coords.coordOffset) + "px; z-index: 10000;'>" +
           coords.x + ",&nbsp;" + coords.y +
           "</div>";
        context.push(strHtml);
      }
      else {
        context.push("<div></div>");
        return;
      }
    },

    mouseMoved: function (evt) {
      var graphCanvasView = this.parentView.graphCanvasView;
      var graphController = this.parentView.graphController;

      var coords = graphCanvasView.axesView.inputAreaView.coordsForEvent(evt),
          point = this.parentView.pointForCoordinates(coords.x, coords.y);

      var bounds = graphCanvasView._getScreenBounds();

      var padding = this.parentView.get("padding");
      if ((graphController.tooltipCoords.width + coords.x) >= (bounds.xRight - padding.right)) {
        coords.x = bounds.xRight - graphController.tooltipCoords.width - padding.right;
      }
      graphController.updateToolTip(point, coords);
      return;
    }
  }),

  topAnnotationsHolder: RaphaelViews.RaphaelCanvasView.design({

    layout: { zIndex: 50 },

    graphView: SC.outlet('parentView'),
    requestedCursorStyleBinding: '.graphView.requestedCursorStyle',

    init: function () {
      sc_super();

      var cursor = SC.Cursor.create();
      cursor.bind('cursorStyle', this, 'requestedCursorStyle');
      this.set('cursor', cursor);
    },

    viewDidResize: function () {
      sc_super();
      var topAnnotationChildViews = this.get('childViews');
      for (var i = 0; i < topAnnotationChildViews.length; i++) {
        var child = topAnnotationChildViews[i];
        if (child.kindOf(Smartgraphs.LabelSetView)) {
          var childLabels = child.get('childViews');
          var noOfLabels = childLabels.length;
          for (var j = 0; j < noOfLabels; j++) {
            var label = childLabels[j];
            label.get('labelTextView').updateLayer();
          }
        }
        else if (child.kindOf(Smartgraphs.LabelView)) {
          if (child.get('isEditing')) {
            child.get('labelTextView').updateLayer();
          }
        }
      }
    },

    didCreateLayer: function () {
      sc_super();
      var self = this;
      var view = this.$();
      if (view.attr('class')) {
        view.attr('class', view.attr('class') + ' topAnnotationsHolder');
      }
      else {
        view.attr('class', 'topAnnotationsHolder');
      }
      /* "this.childNodes && evt.target === this.childNodes[0]"
       * The above condition is to check whether the events are fired on 'topAnnotationsHolder' or its children.
       * If the events are fired on 'topAnnotationsHolder', they are to be propagated to the layers beneath it.
      */
      this.$().mousemove(function (evt) {
        if (self.checkDescendent(evt.target, this)) {
          return YES;
        }
        else {
          self.handleEvent(evt);
        }
      });

      this.$().mousedown(function (evt) {
        if (self.checkDescendent(evt.target, this)) {
          var label = self.getLabelInEditMode();
          if (label) {
            var labelElementInEditMode = label.get('layer');
            if (!self.checkDescendent(evt.target, labelElementInEditMode)) {
              label.commitEditing();
            }
          }
          return YES;
        }
        else {
          self.handleEvent(evt);
        }
      });

      this.$().mouseup(function (evt) {
        if (self.checkDescendent(evt.target, this)) {
          return YES;
        }
        else {
          self.handleEvent(evt);
        }
      });
    },

    checkDescendent: function (element, descendent) {
      var arrDescendents = $(element).parentsUntil("#" + descendent.id);
      var noOfDescendents = arrDescendents.length;
      var lastDescendent = arrDescendents[noOfDescendents - 1];
      if (lastDescendent && lastDescendent.tagName !== 'HTML') {
        return true;
      }
      return false;
    },

    getLabelInArrowDragMode: function () {
      var topAnnotationsHolder = this;
      var topAnnotationChildViews = topAnnotationsHolder.get('childViews');

      for (var i = 0; i < topAnnotationChildViews.length; i++) {
        var childLabel = topAnnotationChildViews[i];
        if (childLabel.kindOf(Smartgraphs.LabelSetView)) {
          return childLabel.get('labelInArrowDragMode');
        }
        else if (childLabel.kindOf(Smartgraphs.LabelView)) {
          if (childLabel.get('isArrowDragging')) {
            return childLabel;
          }
        }
      }
    },

    getLabelInEditMode: function () {
      var topAnnotationsHolder = this;
      var topAnnotationChildViews = topAnnotationsHolder.get('childViews');

      for (var i = 0; i < topAnnotationChildViews.length; i++) {
        var childLabel = topAnnotationChildViews[i];
        if (childLabel.kindOf(Smartgraphs.LabelSetView)) {
          return childLabel.get('labelInEditMode');
        }
        else if (childLabel.kindOf(Smartgraphs.LabelView)) {
          if (childLabel.get('isEditing')) {
            return childLabel;
          }
        }
      }
    },

    handleEvent: function (evt) {
      // Stop propagation. If we let the mousemove event bubble, the SproutCore root responder will think we were the
      // "last hovered" view, which screws up its calculation of hover.
      evt.stopPropagation();

      // Find the element UNDER us at the location of the mouse event
      this.$().hide();
      var el = document.elementFromPoint(evt.clientX, evt.clientY);     // should work in IE!

      // Also hide the 'overlayAnnotationHolder' to propagate the events through it.
      if(SC.View.views[el.parentNode.id] === this.get('graphView').overlayAnnotationsHolder) {
        $(el).hide();
        var el2 = document.elementFromPoint(evt.clientX, evt.clientY);     // should work in IE!
        $(el).show();
        el = el2;
      }
      this.$().show();
      // Set the event target to be the element beneath us. Because 'event' is a jQuery-normalized event, 'target' is a
      // normal R/W property
      evt.target = el;

      // NOW let SproutCore think the event happened directly to the element below us. It will handle forwarding
      // mouseDown, mouseMoved, mouseExited, mouseEntered events to the SC.Views beneath us.
      SC.Event.handle.call(document, evt);
    }
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

    _checkInputAreaScreenBounds: function (x, y) {
      var graphAreaOffset = this.get("graphView").$().offset();
      var padding = this.get("graphView").get("padding");
      var bounds = this._getScreenBounds();

      if ((x >= graphAreaOffset.left + padding.left && x <= graphAreaOffset.left + bounds.plotWidth + padding.left) &&
          (y >= graphAreaOffset.top + padding.top  && y <= graphAreaOffset.top + bounds.plotHeight + padding.top)) {
        return true;
      }
      else {
        return false;
      }
    },

    mouseMoved: function (evt) {
      this._mouseMoved(evt);
    },

    _mouseMoved: function (evt) {
      var graphView = this.get("graphView");
      var graphController = graphView.get('graphController');
      if (this._checkInputAreaScreenBounds(evt.pageX, evt.pageY)) {
        graphView.set("mouseOverInputArea", true);
        this.get('axesView').get('inputAreaView').mouseMoved(evt);
      }
      else {
        graphView.set("mouseOverInputArea", false);
      }
    },

    mouseExited: function (evt) {
      var graphView = this.get("graphView");
      graphView.set("mouseOverInputArea", false);
    },

    touchStart: function (evt) {
      this._mouseDownOrTouchStart(evt);
    },
    mouseDown: function (evt) {
      this._mouseDownOrTouchStart(evt);
    },

    _mouseDownOrTouchStart: function (evt) {
      if (this._checkInputAreaScreenBounds(evt.pageX, evt.pageY)) {
        this.get('axesView').get('inputAreaView').mouseDown(evt);
      }
    },

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
        y = (pt[1] - logicalBounds.yMin) / (logicalBounds.yMax - logicalBounds.yMin);
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
        xFrac = (pt[0] - logicalBounds.xMin) * xScale;  // the fractional progress along x-axis
        xPercentage = xFrac * 100;

        // only insert keyframes for points to the right of the x-value we're restarting the animation at
        if (xPercentage >= startingXPercentage) {

          // rescale the percentage to account for starting in the middle (a point right at startingXPercentage should be keyframe '0%')
          scaledXPercentage = (xPercentage - startingXPercentage) / (1 - startingXFrac);
          if (scaledXPercentage >= 100) scaledXPercentage = 100;

          yFrac = (pt[1] - logicalBounds.yMin) * yScale;         // the fractional distance along y-axis at which the icon should display

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
            y               = (points[0][1] - logicalBounds.yMin) / (logicalBounds.yMax - logicalBounds.yMin),
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

      childViews: 'inputAreaView xAxisView yAxisView gridView'.w(),

      touchStart: function (evt) {
        this._mouseDownOrTouchStart(evt);
      },

      mouseDown:  function (evt) {
        this._mouseDownOrTouchStart(evt);
      },

      _mouseDownOrTouchStart: function (evt)
      {
        this.get('axesView').get('inputAreaView').mouseDown(evt);
      },

      gridView: RaphaelViews.RaphaelView.design({

        gridStroke: '#C2CCE0',
        gridStrokeWidth: 1,
        gridStrokeOpacity: 0.7,

        graphCanvasView: SC.outlet('parentView.graphCanvasView'),
        graphView: SC.outlet('parentView.graphView'),

        renderCallback: function (raphaelCanvas, attrs) {
          for (var iCounter = 0; iCounter < attrs.length; iCounter++) {
            raphaelCanvas.path(attrs[iCounter].d).attr(attrs[iCounter]);
          }
          return;
        },

        render: function (context, firstTime) {
          var graphView  = this.get('graphView');
          var xAxis      = graphView.get('xAxis');
          var yAxis      = graphView.get('yAxis');

         //return if xAxis and yAxis is undefined
          if (!xAxis || !yAxis) {
            return;
          }

          if (!(this.get("graphView").get("graphController").showGraphGrid)) {
            return;
          }

          var logicalBounds = graphView.graphCanvasView._getLogicalBounds();
          var nXSteps = xAxis.get("nSteps");
          var nYSteps = yAxis.get("nSteps");
          var attrs = [];
          var nXDifference = Math.abs((logicalBounds.xMax - logicalBounds.xMin) / nXSteps);
          var nyDifference = Math.abs((logicalBounds.yMax - logicalBounds.yMin) / nYSteps);
          var iCurrentX = logicalBounds.xMin;
          var points, i, coords, point, pathComponents = [], pathString;

          for (var iCounter = 0 ; iCounter < nXSteps; iCounter++, iCurrentX += nXDifference) {
            if (nXDifference + iCurrentX === 0) {
              continue;
            }
            points = [];
            points.push({ 'y': logicalBounds.yMin, 'x': (nXDifference + iCurrentX) });
            points.push({ 'y': logicalBounds.yMax, 'x': (nXDifference + iCurrentX) });
            pathComponents = [];
            for (i = 0; i < points.length; i++) {
              pathComponents.push(i === 0 ? 'M' : 'L');
              point = points[i];
              coords = graphView.coordinatesForPoint(point.x, point.y);
              pathComponents.push(coords.x);
              pathComponents.push(coords.y);
            }
            pathString = pathComponents.join(' ');
            attrs.push({
              'd':              pathString,
              'stroke':         this.get('gridStroke'),
              'stroke-width':   this.get('gridStrokeWidth'),
              'stroke-opacity': this.get('gridStrokeOpacity')
            });
          }

          var iCurrentY = logicalBounds.yMin;
          for (iCounter = 0 ; iCounter < nYSteps; iCounter++, iCurrentY = iCurrentY + nyDifference) {
            if (nyDifference + iCurrentY === 0) {
              continue;
            }
            points = [];
            points.push({ 'y': (nyDifference + iCurrentY), 'x': logicalBounds.xMin });
            points.push({ 'y': (nyDifference + iCurrentY), 'x': logicalBounds.xMax });
            pathComponents = [];
            for (i = 0; i < points.length; i++) {
              pathComponents.push(i === 0 ? 'M' : 'L');
              point = points[i];
              coords = graphView.coordinatesForPoint(point.x, point.y);
              pathComponents.push(coords.x);
              pathComponents.push(coords.y);
            }
            pathString = pathComponents.join(' ');
            attrs.push({
              'd':              pathString,
              'stroke':         this.get('gridStroke'),
              'stroke-width':   this.get('gridStrokeWidth'),
              'stroke-opacity': this.get('gridStrokeOpacity')
            });
          }
          context.callback(this, this.renderCallback, attrs);
        }
      }),

      inputAreaView: RaphaelViews.RaphaelView.design({

        graphCanvasView: SC.outlet('parentView.graphCanvasView'),
        graphView: SC.outlet('parentView.graphView'),
        topAnnotationsHolder: SC.outlet('graphView.topAnnotationsHolder'),

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

        touchStart: function (evt) {
          this._mouseDownOrTouchStart(evt);
        },
        mouseDown: function (evt) {
          this._mouseDownOrTouchStart(evt);
        },

        _mouseDownOrTouchStart: function (evt) {
          this._graphController = this._graphView.get('graphController');

          /*
           * In IE9, events are fired directly on inputAreaView instead of topAnnotationsHolder.
           * So the loss of focus from label's textarea is checked here.
           */
          var topAnnotationsHolder = this.getPath('topAnnotationsHolder');
          var label = topAnnotationsHolder.getLabelInEditMode();
          if (label) {
            label.commitEditing();
            return;
          }
          var coords = this.coordsForEvent(evt),
              point = this._graphView.pointForCoordinates(coords.x, coords.y);

          return this._graphController.inputAreaMouseDown(point.x, point.y);
        },

        touchesDragged: function (evt) {
          this._mouseOrTouchesDragged(evt);
        },

        mouseDragged: function (evt) {
          this._mouseOrTouchesDragged(evt);
        },

        _mouseOrTouchesDragged: function (evt) {
          var coords = this.coordsForEvent(evt),
              point = this._graphView.pointForCoordinates(coords.x, coords.y);

          return this._graphController.inputAreaMouseDragged(point.x, point.y);
        },

        mouseMoved:  function (evt) {
          this._mouseMoved(evt);
        },

        _mouseMoved: function (evt) {
          var coords = this.coordsForEvent(evt),
              point = this._graphView.pointForCoordinates(coords.x, coords.y);
          var bounds = this.get("graphView").get("graphCanvasView")._getScreenBounds();
          var graphController = this._graphView.get('graphController');

          var padding = this.get("graphView").get("padding");
          if (graphController.tooltipCoords.width + coords.x >= bounds.xRight - padding.right) {
            coords.x = bounds.xRight - graphController.tooltipCoords.width - padding.right;
          }

          var toolTipPoint = graphController.get('toolTipPoint');
          var pointOverride = graphController.get('toolTipVisibilityOverrideOnPointHover');
          if (pointOverride && toolTipPoint !== null) {
            graphController.updateToolTip(toolTipPoint, coords);
          }
          else {
            graphController.updateToolTip(point, coords);
          }
          return graphController.inputAreaMouseMove(point.x, point.y);
        },

        touchEnd: function (evt) {
          this._mouseUpOrTouchEnd(evt);
        },

        mouseUp: function (evt) {
          this._mouseUpOrTouchEnd(evt);
        },

        _mouseUpOrTouchEnd: function (evt) {
          var coords = this.coordsForEvent(evt),
              point = this._graphView.pointForCoordinates(coords.x, coords.y);

          var graphController = this._graphView.get('graphController');
          return graphController.inputAreaMouseUp(point.x, point.y);
        },


        mouseExited: function () {
          var graphController = this._graphView.get('graphController');
          this._graphView.set("mouseOverInputArea", false);
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
    // Mouse events are propagated because line annotation are above the points.
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

            yFrac = (requestedImage.y - logicalBounds.yMin) / (logicalBounds.yMax - logicalBounds.yMin);

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
              y             = (points[0][1] - logicalBounds.yMin) / (logicalBounds.yMax - logicalBounds.yMin);

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
  }),

  legendView: SC.View.extend({
      defaultValue: false,
      classNames: ['legendView'],
      tagName: 'div',
      // Currently z-index of label's text field is set to 100 by sproutcore. So to keep legend always on top, it's z-index is set to 200.
      layout: { top: 0, left: 0, width: 0, height: 0, zIndex: 200 },
      verticalElementSpacing: 5,
      topPadding: 8,
      bottomPadding: 8,
      rightPadding: 8,
      leftPadding: 8,
      backgroundColor: '#CFECBC',
      maxWidth: 0,
      maxHeight: 0,
      initialTopPos: 0,
      initialLeftPos: 0,
      arrObservers : [],

      graphController: SC.outlet('parentView.graphController'),

      childViews: 'legendHeadingView'.w(),

      init: function () {
        sc_super();
        var layout = this.parentView.layout;
        this.set('defaultValue', false);
        this.set('initialTopPos', layout.top);
        this.set('initialLeftPos', layout.left);
      },

      initialize: function (legendElements) {
        var graphControllerObject = this.get('graphController');
        var legendTitle, legendType;
        if (!(legendElements instanceof Array)) {
          legendTitle = legendElements.title;
          legendType = legendElements.type;
          legendElements = legendElements.datadefs;
        }
        var noOfElements = legendElements.length;
        var arrLegendElements = [];
        var datadef, datadefName = "";
        for (var i = 0; i < noOfElements; i++) {
          var legendElementObject = null;
          datadef = graphControllerObject.getDatadef(legendElements[i]);
          datadefName = legendElements[i];
          var datadefColor = datadef.get('color');
          if (legendType === 'name' || legendType === undefined) {
            legendElementObject = { color: datadefColor, text: legendElements[i] };
          }
          else if (legendType === 'AvgSumOfDeviation') {
            var datadefDeviationValue = datadef.get('deviationValue');
            if (datadefDeviationValue === null) {
              this.set('isVisible', false);
            }
            legendElementObject = { color: datadefColor, text: datadefDeviationValue };
            this.set('defaultValue', false);
          }
          arrLegendElements.push(legendElementObject);
        }
        legendElements = arrLegendElements;
        // to remove the legend elements
        var nLength = this.childViews.length;
        var index = 1;
        while (index > 0 && nLength !== 1) {
          this.childViews[index].removeFromParent();
          nLength--;
        }
        // Remove observer of datadef's deviationValue within Legend
        if (legendType === "AvgSumOfDeviation")
        {
          for (var p = this.arrObservers.length - 1; p >= 0; p--) {
            datadef = this.arrObservers[p].datadef;
            var textViewObject = this.arrObservers[p].textViewObject;
            datadef.removeObserver('deviationValue', textViewObject, textViewObject.updateText);
            this.arrObservers.pop();
          }
        }
        var legendHeadingHeight = this.legendHeadingView.layout.height;
        var len = legendElements.length;
        // View shouldn't be visible when there are no legends.
        if (len === 0) {
          this.set('maxHeight', 0);
          this.set('defaultValue', false);
          this.set('isVisible', NO);
          return;
        }
        else {
          if (legendType !== "AvgSumOfDeviation")
          {
            this.set('isVisible', YES);
          }
        }
        if (legendTitle !== undefined) {
          this.legendHeadingView.set('value', legendTitle);
        }
        var topOffset = legendHeadingHeight + this.topPadding;
        var newChild = null;
        for (var m = 0; m < len; m++) {
          newChild = this.legendElement.create({ color: legendElements[m].color, text: legendElements[m].text });
          newChild.set('layout', { left: this.leftPadding });
          newChild.updatePosition(topOffset);
          this.appendChild(newChild);
          topOffset += newChild.layout.height + this.verticalElementSpacing;

          // Add observer to datadef's deviationValue within Legend
          if (legendType === "AvgSumOfDeviation")
          {
            datadef = graphControllerObject.getDatadef(datadefName);
            var textView = newChild.textView;
            datadef.addObserver('deviationValue', textView, textView.updateText);
            var observerObject = { datadef: datadef, textViewObject: textView };
            this.arrObservers.push(observerObject);
          }
        }
        if (len > 0) {
          var maxHeight = topOffset - this.verticalElementSpacing + this.bottomPadding;
          this.set('maxHeight', maxHeight);
        }
      },

      updateInitialPosition: function () {
        if (this.maxHeight === 0) {
          var position = this.getLegendPosition();
          this.set('initialTopPos', position.top);
          this.set('initialLeftPos', position.left);
        }
      }.observes('maxHeight'),

      didLayoutChange: function () {
        var layout = { top: this.initialTopPos, left: this.initialLeftPos, width: this.maxWidth, height: this.maxHeight, zIndex: 200 };
        this.set('layout', layout);
        if (!this.defaultValue) {
          var position = this.getLegendPosition();
          this.set('initialTopPos', position.top);
          this.set('initialLeftPos', position.left);
          if (layout.top > position.top) {
            this.adjust('top', position.top);
          }
          if (layout.left > position.left) {
            this.adjust('left', position.left);
          }
        }
      }.observes('maxWidth', 'maxHeight'),

      getLegendPosition: function () {
        var parentFrame = this.getPath('parentView.frame');
        var topBound = parentFrame.height - this.maxHeight;
        var leftBound = parentFrame.width - this.maxWidth;
        var position = { top: topBound, left: leftBound };
        return position;
      },

      parentViewDidResize: function () {
        var position = this.getLegendPosition();
        var layout = this.layout;

        if (layout.top > position.top) {
          this.adjust('top', position.top);
        }
        if (layout.left > position.left) {
          this.adjust('left', position.left);
        }
      },

      layoutDidChangeFor: function () {
        sc_super();

        var len = this.childViews.length;
        // View shouldn't be visible when there are no legends.
        if (len <= 1) {
          return;
        }

        var legendHeadingView = this.legendHeadingView;
        var maxWidth = legendHeadingView ? legendHeadingView.layout.width : 0;
        if (isNaN(maxWidth)) {
          maxWidth = 0;
        }
        for (var i = 0; i < len; i++) {
          var legendChild = this.childViews[i];
          if (legendChild !== legendHeadingView) {
            if (maxWidth < legendChild.layout.width) {
              maxWidth = legendChild.layout.width;
            }
          }
        }

        maxWidth += this.leftPadding + this.rightPadding;

        // to align Legend Heading at center
        if (legendHeadingView) {
          var layout = legendHeadingView.layout;
          var left = (maxWidth - layout.width) / 2;
          if (!isNaN(left) && left !== layout.left) {
            layout.left = (maxWidth - layout.width) / 2;
            legendHeadingView.set('layout', layout);
          }
        }

        this.set('maxWidth', maxWidth);
      },

      mouseDragged: function (evt) {
        return this._mouseDraggedOrTouchesDragged(evt);
      },

      touchesDragged : function (evt) {
        return this._mouseDraggedOrTouchesDragged(evt);
      },

      _mouseDraggedOrTouchesDragged: function (evt) {
        this.set('defaultValue', true);
        var info = this._mouseDownInfo,
            locX, locY;

        // handle X direction
        locX = info.curX + evt.pageX;
        if (locX < 0) {
          locX = 0;
        }
        if (locX > info.widthBound) {
          locX = info.widthBound;
        }
        this.adjust('left', locX);
        this.set('initialLeftPos', locX);
        // handle Y direction
        locY = info.curY + evt.pageY;
        if (locY < 0) {
          locY = 0;
        }
        if (locY > info.heightBound) {
          locY = info.heightBound;
        }
        this.adjust('top', locY);
        this.set('initialTopPos', locY);
        return YES; // event was handled!
      },

      mouseDown: function (evt) {
        return this._mouseDownOrTouchStart(evt);
      },

      touchStart: function (evt) {
        return this._mouseDownOrTouchStart(evt);
      },

      _mouseDownOrTouchStart: function (evt) {
        var layout = this.get('layout');
        var frame = this.getPath('parentView.frame');
        this._mouseDownInfo = {
          curY: layout.top - evt.pageY,
          curX: layout.left - evt.pageX,
          widthBound: frame.width - layout.width,
          heightBound: frame.height - layout.height
        };
        return YES; // so we get other events
      },

      mouseUp: function (evt) {
        return this._mouseUpOrTouchEnd(evt);
      },

      touchEnd: function (evt) {
        return this._mouseUpOrTouchEnd(evt);
      },

      _mouseUpOrTouchEnd: function (evt) {
       // apply one more time to set final position
        this.mouseDragged(evt);
        this._mouseDownInfo = null; // cleanup info
        return YES; // handled!
      },

      legendHeadingView: SC.LabelView.design(SC.AutoResize, {
        supportsAutoResize: YES,
        shouldResizeWidth: YES,
        layout: { top: 0, height: 16 },
        textAlign: SC.ALIGN_CENTER,
        value: 'Legend',
        fontWeight:  SC.BOLD_WEIGHT,
        classNames: ['legendTitle']
      }),

      legendElement: SC.View.extend({

        color: null,
        text: null,
        iTop: 0,
        colorBoxWidth: 20,
        childElementHeight: 18,
        colorTextSpacing: 2,

        childViews: 'colorView textView'.w(),

        init: function () {
          sc_super();

          this.colorView.set('layout', {
            left: 0,
            width: this.colorBoxWidth,
            height: this.childElementHeight
          });

          this.textView.set('layout', {
            left: this.colorBoxWidth + this.colorTextSpacing,
            height: this.childElementHeight
          });
        },

        updatePosition: function (childTop) {
          if (!isNaN(childTop) && childTop !== null) {
            this.iTop = childTop;
          }
          this.set('layout', {
            left: this.layout.left,
            top: this.iTop,
            width: this.textView.layout.width + this.colorBoxWidth + this.colorTextSpacing,
            height: this.childElementHeight
          });
        },

        layoutDidChangeFor: function () {
          sc_super();

          if (this.textView) {
            this.updatePosition();
          }
        },

        colorView: SC.View.extend({
          classNames: ['legendColorBoxView'],
          backgroundColor: SC.outlet('parentView.color')
        }),

        textView: SC.LabelView.design(SC.AutoResize, {
          supportsAutoResize: YES,
          shouldResizeWidth: YES,
          textAlign: SC.ALIGN_CENTER,
          value: SC.outlet('parentView.text'),
          autoResizeText: SC.outlet('parentView.text'),

          updateText: function (datadef) {
            this.set('value', datadef.get('deviationValue'));
            var legendView = this.parentView.parentView;
            if (datadef.get('deviationValue') !== null && datadef.get('deviationValue') >= 0) {
              if (!legendView.get('isVisible')) {
                legendView.set('isVisible', true);
              }
            }
          }
        })
      })
  })
});