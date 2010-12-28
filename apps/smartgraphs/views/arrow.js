// ==========================================================================
// Project:   Smartgraphs.ArrowView
// Copyright: ©2010 Concord Consortium
// @author    Parker Morse <pmorse@cantinaconsulting.com>
// ==========================================================================
/*globals Smartgraphs RaphaelViews */

sc_require('mixins/arrow_drawing');

/** @class

  Display view for the Arrow subclass of Smartgraphs.Annotation. Draws a stroke 
  between two points, with an arrowhead at the second end.
  
  @extends RaphaelViews.RaphaelView
*/
Smartgraphs.ArrowView = RaphaelViews.RaphaelView.extend( Smartgraphs.ArrowDrawing,
/** @scope Smartgraphs.ArrowView.prototype */ {

  canShowInTable: NO,
  
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
    var arrow = raphaelCanvas.set();
    arrow.push(
        raphaelCanvas.path(attrs.d).attr(attrs),
        raphaelCanvas.text(attrs.labelX, attrs.labelY, attrs.label).attr({'stroke': "#000", 'font-size': 15}).rotate(attrs.rotate, true)
      );
    return arrow;
  },

  // Called by SC (by the parent view)
  render: function(context, firstTime) {
    var graphView = this.get('graphView');
    var arrowEnds = this.getStartAndEnd(this.get('item'));
    var label = this.get('item').get('label');
    
    var startCoords = graphView.coordinatesForPoint(arrowEnds.start.x, arrowEnds.start.y);
    var endCoords =   graphView.coordinatesForPoint(arrowEnds.end.x, arrowEnds.end.y);
    var labelCoords, rotate;
    if (label && this.get('item').get('isHorizontal')) {
      labelCoords = graphView.coordinatesForPoint(((arrowEnds.start.x + arrowEnds.end.x)/2), (arrowEnds.start.y + 0.3));
      rotate = 0;
    }
    else if (label && this.get('item').get('isVertical')) {
      labelCoords = graphView.coordinatesForPoint((arrowEnds.start.x - 0.15), ((arrowEnds.start.y + arrowEnds.end.y)/2));
      rotate = -90;
    } // TODO: Need an "else" for non-vertical, non-horizontal, but not yet
    var pathString;
    if ((startCoords.x !== endCoords.x) || (startCoords.y !== endCoords.y)) {
      pathString = this.arrowPath(startCoords.x, startCoords.y, endCoords.x, endCoords.y, 10, 15);
    }
    else { // An arrow going nowhere, e.g. a rise arrow for a zero-slope line
      pathString = "";
      label = "";
    }

    var attrs = {
      d: pathString,
      stroke: this.get('stroke'),
      'stroke-width': this.get('strokeWidth'),
      'stroke-opacity': this.get('strokeOpacity'),
      'label': label,
      'labelX': labelCoords.x,
      'labelY': labelCoords.y,
      'rotate': rotate
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
    
    @params annotation {Smartgraphs.Arrow} The arrow being viewed.
  */
  getStartAndEnd: function(annotation) {
    var p1 = annotation.get('point1'),
        p2 = annotation.get('point2');

    var x1 = p1.get('x'),
        y1 = p1.get('y'),
        x2 = p2.get('x'),
        y2 = p2.get('y');
    
    var x, y, start, end;
    
    if (annotation.get('isHorizontal')) {
      y = annotation.get('isClockwise') ? y2 : y1;
      start = { x: x1, y: y };
      end =   { x: x2, y: y };
    }
    else if (annotation.get('isVertical')) {
      x = annotation.get('isClockwise') ? x1 : x2;
      start = { x: x, y: y1 };
      end =   { x: x, y: y2 };
    }
    else {
      start = { x: x1, y: y1 };
      end =   { x: x2, y: y2 };
    }
    return { 'start': start, 'end': end };
  }
  
});
