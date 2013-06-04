// ==========================================================================
// Project:   Smartgraphs.PointView
// Copyright: ©2010 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs RaphaelViews*/

/** @class

  (Document Your View Here)

  @extends SC.View
*/

Smartgraphs.PointView = RaphaelViews.RaphaelView.extend(
/** @scope Smartgraphs.PointView.prototype */ {

  displayProperties: 'content.x content.y isEnabled color radius'.w(),

  controllerPath: 'parentView.graphView.graphController',
  controller: SC.outlet('parentView.graphView.graphController'),

  dataRepresentation: SC.outlet('parentView.dataRepresentation'),
  datadef: SC.outlet('dataRepresentation.datadef'),
  datadefName: SC.outlet('datadef.name'),

  modifiersBinding: '.controller.modifiers',
  modifiersBindingDefault: SC.Binding.oneWay(),

  datasetColorBinding: '.parentView.color',
  overrideColor: null,

  isDimmedBinding: '.dataRepresentation.isDimmed',
  isDimmedBindingDefault: SC.Binding.oneWay(),

  dimmedColor: '#cccccc',

  hoveredRadius:    6,
  notHoveredRadius: 4, // SC.platform.touch ?  : 4,
  strokeWidth:      SC.platform.touch ? 20 : 10,

  isEnabled: YES,
  isHovered: NO,
  isMouseDown: false,
  // required by CollectionFastPath
  layerIsCacheable: YES,
  isPoolable: YES,

  color: function () {
    return this.get('overrideColor') ? this.get('overrideColor') : (this.get('isDimmed') ? this.get('dimmedColor') : this.get('datasetColor'));
  }.property('overrideColor', 'isDimmed', 'dimmedColor', 'datasetColor').cacheable(),

  radius: function () {
    return (this.get('isHovered') ? this.get('hoveredRadius') : this.get('notHoveredRadius'));
  }.property('isHovered', 'hoveredRadius', 'notHoveredRadius').cacheable(),

  modifiersDidChange: function () {
    var modifiers = this.get('modifiers') || {},
        x = this.getPath('content.x'),
        y = this.getPath('content.y'),
        datadefName = this.get('datadefName'),
        color,
        modifier;

    modifier = modifiers[[x, y, datadefName]];
    if (modifier) {
      this.set('overrideColor', modifier.get('color'));
    }
    else {
      this.set('overrideColor', null);
    }
  }.observes('modifiers'),

  // Bypassing events on inactive datasets
  handlePropogation: function (evt) {
    if (!this.dataRepresentation.datadef.isActive) {
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
  },

  didCreateLayer: function () {
    sc_super();
    var self = this;
    this.$().mousedown(function (evt) {
      self.handlePropogation(evt);
    });
    this.$().mouseup(function (evt) {
      self.handlePropogation(evt);
    });
    this.$().mouseenter(function (evt) {
      self.handlePropogation(evt);
    });
    this.$().mouseleave(function (evt) {
      self.handlePropogation(evt);
    });
    this.$().mousemove(function (evt) {
      self.handlePropogation(evt);
    });
  },

  mouseEntered: function () {
    if (!this.dataRepresentation.datadef.isActive) {
      return;
    }
    this.set('isHovered', YES);
    var graphController = this.get('controller');
    var point = Smartgraphs.Point.create({x:  this.getPath('content.x'), y:  this.getPath('content.y')});
    graphController.set("toolTipPoint", point);
    graphController.set("toolTipVisibilityOverrideOnPointHover", true);
  },

  mouseExited: function () {
    if (!this.dataRepresentation.datadef.isActive) {
      return;
    }
    this.set('isHovered', NO);
    var graphController = this.get('controller');
    var isMouseDown = this.get("isMouseDown");
    if (!isMouseDown) {
      graphController.set("toolTipPoint", null);
      graphController.set("toolTipVisibilityOverrideOnPointHover", false);
    }
  },

  mouseDown: function (evt) {
    return this._mouseDownOrTouchStart(evt);
  },

  touchStart: function (evt) {
    return this._mouseDownOrTouchStart(evt);
  },

  _mouseDownOrTouchStart: function (evt) {
    if (!this.dataRepresentation.datadef.isActive) {
      return;
    }
    this.set("isMouseDown", true);
    this.get('controller').dataPointSelected(this.get('dataRepresentation'), this.getPath('content.x'), this.getPath('content.y'));
      // 'tee' the dataPointSelected event, but don't consider the mouseDown handled; let the parent collection view
      // also handle it
    var graphView = this.getPath('parentView.graphView');
    var coords = graphView.graphCanvasView.axesView.inputAreaView.coordsForEvent(evt);
    var point = graphView.pointForCoordinates(coords.x, coords.y);
    this.get('datadef').set('dragValueX', this.getPath('content.x'));
    this.get('datadef').set('dragValueY', this.getPath('content.y'));
    this.get('controller').dataPointDown(this.get('dataRepresentation'), point.x, point.y);
    return YES;
  },

  mouseDragged: function (evt) {
    return this._mouseDragged(evt);
  },

  _mouseDragged: function (evt) {
    if (!this.dataRepresentation.datadef.isActive) {
      return;
    }
    var graphView = this.getPath('parentView.graphView');
    var coords = graphView.graphCanvasView.axesView.inputAreaView.coordsForEvent(evt);
    var point = graphView.pointForCoordinates(coords.x, coords.y);
    this.get('controller').dataPointDragged(this.get('dataRepresentation'), point.x, point.y);
    var dragX = this.get('datadef').get('dragValueX');
    var dragY = this.get('datadef').get('dragValueY');
    var pointDragged = Smartgraphs.Point.create({x: dragX, y: dragY});
    var graphController = this.get('controller');
    graphController.set("toolTipPoint", pointDragged);
    graphController.set("toolTipVisibilityOverrideOnPointHover", true);
    return YES;
  },

  mouseUp: function (evt) {
    return this._mouseUp(evt);
  },

  _mouseUp: function (evt) {
    if (!this.dataRepresentation.datadef.isActive) {
      return;
    }
    var graphView = this.getPath('parentView.graphView');
    var coords = graphView.graphCanvasView.axesView.inputAreaView.coordsForEvent(evt);
    var point = graphView.pointForCoordinates(coords.x, coords.y);
    var graphController = this.get('controller');
    var dataRepresentation = this.get('dataRepresentation');
    var datadef = this.get('datadef');
    var x = datadef.get('dragValueX');
    var y = datadef.get('dragValueY');
    this.set("isMouseDown", false);
    var isHovered = this.get('isHovered');
    var isMouseUpInGraph = graphView.graphCanvasView._checkInputAreaScreenBounds(evt.pageX, evt.pageY);
    graphController.dataPointUp(dataRepresentation, point.x, point.y);
    var coordsContent = graphView.coordinatesForPoint(x, y);
    var radius = this.get('strokeWidth'); // because we allow to start point dragging within point's strokewidth
    var distance = Math.sqrt(Math.pow(coords.x - coordsContent.x, 2) + Math.pow(coords.y - coordsContent.y, 2));
    if (radius < distance || !isHovered || !isMouseUpInGraph) {
      graphController.set("toolTipPoint", null);
      graphController.set("toolTipVisibilityOverrideOnPointHover", false);
    }
    return YES;
  },

  renderCallback: function (raphaelCanvas, x, y, radius, color, strokeWidth) {
    return raphaelCanvas.circle(x, y, radius).attr({ fill: color, 'stroke-width': strokeWidth, 'stroke-opacity': 0 });
  },

  render: function (context, firstTime) {
    var graphView = this.getPath('parentView.graphView');
    if (!graphView) {
      // apparently render may have been called after we were removed from our old parent. Redraw after add to new parent.
      this.displayDidChange();
      return;
    }

    var color = this.get('color'),
        radius = this.get('radius'),
        strokeWidth = this.get('strokeWidth');

    // get the x and y values, and translate to our coordinate system
    var x = this.getPath('content.x'),
        y = this.getPath('content.y');

    var xMin = graphView.get('xAxis').get('min'),
        xMax = graphView.get('xAxis').get('max'),
        yMin = graphView.get('yAxis').get('min'),
        yMax = graphView.get('yAxis').get('max');

    var coords = graphView.coordinatesForPoint(x, y);
    // Create a clipping rectangle that contrains the drawing of the line
    clipMin = graphView.coordinatesForPoint(xMin, yMax);
    clipMax = graphView.coordinatesForPoint(xMax, yMin);
    clipRectStr = clipMin.x + ',' + clipMin.y + ',' + (clipMax.x - clipMin.x) + ',' + (clipMax.y - clipMin.y);

    if (firstTime) {
      context.callback(this, this.renderCallback, coords.x, coords.y, radius, color, strokeWidth);
    }
    else {
      var circle = context.raphael();
      circle.attr({ cx: coords.x, cy: coords.y, r: radius, fill: color, 'stroke-width': strokeWidth, 'clip-rect': clipRectStr });
    }
  }

});
