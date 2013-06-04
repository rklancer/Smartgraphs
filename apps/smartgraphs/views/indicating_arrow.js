// ==========================================================================
// Project:   Smartgraphs.IndicatingArrowView
// Copyright: ©2010 Concord Consortium
// Author:    Parker Morse <pmorse@cantinaconsulting.com>
// ==========================================================================
/*globals Smartgraphs RaphaelViews */

sc_require('mixins/arrow_drawing');

/** @class

Display view for the IndicatingArrow subclass of Smartgraphs.Annotation. Draws a stroke
to a specified point, with an arrowhead at that point.

@extends RaphaelViews.RaphaelView
*/
Smartgraphs.IndicatingArrowView = RaphaelViews.RaphaelView.extend( Smartgraphs.ArrowDrawing,
/** @scope Smartgraphs.IndicatingArrowView.prototype */ {

  canShowInTable: YES,

  strokeBinding: '.item.color',
  isHighlightedBinding: '.item.isHighlighted',

  strokeWidth: function () {
    return this.get('isHighlighted') ? 3 : 2;
  }.property('isHighlighted'),

  strokeOpacity: function () {
    return this.get('isHighlighted') ? 0.9 : 0.5;
  }.property('isHighlighted'),

  /**
    SproutCore will call render(context, firstTime == NO) if these properties change
  */
  displayProperties: 'point1 point2 label stroke isHighlighted strokeWidth strokeOpacity'.w(),

  /**
    We are using renderCallback in views to call non-SC render methods like
    RaphaelCanvas.segmentPath with the correct attributes.
    This is done this way because Raphael methods shouldn't be called unless
    its tags are already in the DOM.
  */
  renderCallback: function(raphaelCanvas, attrs) {
    var path = raphaelCanvas.path(attrs.d).attr(attrs);
    return path;
  },

  // Called by SC (by the parent view)
  render: function(context, firstTime) {
    var graphView = this.get('graphView');
    var arrowEnds = this.getStartAndEnd(this.get('item'));

    var startCoords = graphView ? graphView.coordinatesForPoint(arrowEnds.start.x, arrowEnds.start.y) : {'x': arrowEnds.start.x, 'y': arrowEnds.start.y };
    var endCoords =   graphView ? graphView.coordinatesForPoint(arrowEnds.end.x, arrowEnds.end.y) : {'x': arrowEnds.end.x, 'y': arrowEnds.end.y };
    var pathString = this.arrowPath(startCoords.x, startCoords.y, endCoords.x, endCoords.y, 10, 15);

    var attrs = {
      d: pathString,
      stroke: this.get('stroke'),
      'stroke-width': this.get('strokeWidth'),
      'stroke-opacity': this.get('strokeOpacity')
    };

    // boolean firstTime: Does this view start from scratch and create HTML in a context object or does it just need
    // to update properties of a context object?

    if (firstTime) {
       // Queue up the callback with will create the Raphael path object on the SVG canvas, once it is created.
       // In non-Raphael views, context is not a SC object but SC expects it (it was created by SC.Pane.append() ) This
       // call creates a tag and CSS and stores it in the context. for rendering later (by by SC.Pane.append() using
       // innerHTML()
      context.callback(this, this.renderCallback, attrs);
    }
    else {
      // get the Raphael path object from the context
      var path = context.raphael();
      // and update it
      path.attr(attrs);
    }
  },

  /**
    Given an annotation, returns the start and end points of the arrow to be drawn, relative to the graph axes. In other
    words, this adjusts for isHorizontal, isVertical and isClockwise values, as well as extracting x and y values from
    the points of the annotation.

    Returns an object containing "start" and "end" objects, each of which is a coordinate pair (i.e. "x" and "y" values).

    @params annotation {Smartgraphs.IndicatingArrow} The arrow being viewed.
  */
  getStartAndEnd: function(annotation) {
    var x2 = annotation.get('x'),
        y2 = annotation.get('y'),
        len = annotation.get('length'),
        angle = annotation.get('pointAngle');
    // console.log('Length: ' + len + ', angle: ' + angle);

    var x1, y1, start, end;

    if (angle === 0) { // Easy ones first: down from the top
      x1 = x2;
      y1 = y2 + len;
    }
    else if (angle == 180) { // up from the bottom
      x1 = x2;
      y1 = y2 - len;
    }
    else if (angle == 90) { // in from the right
      y1 = y2;
      x1 = x2 + len;
    }
    else if (angle == 270) { // in from the left
      y1 = y2;
      x1 = x2 - len;
    }
    else {
      var theta = angle * Math.PI/180;
      x1 = x2 - len * Math.cos(theta);
      y1 = y2 - len * Math.sin(theta);
    }

    start = { x: x1, y: y1 };
    end =   { x: x2, y: y2 };
    return { 'start': start, 'end': end };
  }

});
