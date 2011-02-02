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
  
  itemColorBinding: '.item.color',
  isHighlightedBinding: '.item.isHighlighted',
  strokeWidth: 2,
  strokeOpacity: 0.9,
  
  stroke: function () {
    return this.get('isHighlighted') ? '#ff0000' : this.get('itemColor');
  }.property('isHighlighted', 'itemColor'),
  
  displayProperties: 'point1 point2 label stroke isHighlighted strokeWidth strokeOpacity'.w(),

  renderCallback: function (raphaelCanvas, attrs, label, labelCoords, labelRotation) {
    var labelX = labelCoords && labelCoords.x || 0;
    var labelY = labelCoords && labelCoords.y || 0;
 
    return raphaelCanvas.set().push(
      raphaelCanvas.path(attrs.d).attr(attrs),
      raphaelCanvas.text(labelX, labelY, label || '').attr({'fill': attrs.stroke, 'font-size': 15, 'stroke-width': 1}).rotate(labelRotation || 0, true)
    );
  },

  // Called by SC (by the parent view)
  render: function(context, firstTime) {  
    var graphView = this.get('graphView');
    var arrowEnds = this.getStartAndEnd(this.get('item'));
    var label = this.getPath('item.label');

    var startCoords = graphView.coordinatesForPoint(arrowEnds.start.x, arrowEnds.start.y);
    var endCoords =   graphView.coordinatesForPoint(arrowEnds.end.x, arrowEnds.end.y);
    var labelCoords, labelRotation;
    
    if (label && this.get('item').get('isHorizontal')) {
      labelCoords = graphView.coordinatesForPoint( (arrowEnds.start.x + arrowEnds.end.x) / 2, arrowEnds.start.y);
      labelCoords.y -= 12;
      labelRotation = 0;
    }
    else if (label && this.get('item').get('isVertical')) {
      labelCoords = graphView.coordinatesForPoint(arrowEnds.start.x, (arrowEnds.start.y + arrowEnds.end.y) / 2);
      labelCoords.x -= 12;
      labelRotation = -90;
    } // TODO: Need an "else" for non-vertical, non-horizontal, but not yet

    var pathString;
    if ((startCoords.x !== endCoords.x) || (startCoords.y !== endCoords.y)) {
      pathString = this.arrowPath(startCoords.x, startCoords.y, endCoords.x, endCoords.y, 10, 15);
    }
    else { 
      // An arrow going nowhere, e.g. a rise arrow for a zero-slope line
      pathString = '';
      label = '';
    }

    var attrs = {
      d: pathString,
      stroke: this.get('stroke'),
      'stroke-width': this.get('strokeWidth'),
      'stroke-opacity': this.get('strokeOpacity')
    };

    if (firstTime) {
      context.callback(this, this.renderCallback, attrs, label, labelCoords, labelRotation);
    }
    else {      
      var arrow = context.raphael();

      // update <path> element
      arrow.items[0].attr(attrs);

      // update <text> element      
      arrow.items[1].attr({fill: this.get('stroke')});
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
