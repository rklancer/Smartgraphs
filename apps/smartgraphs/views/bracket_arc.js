// ==========================================================================
// Project:   Smartgraphs.BracketArcView
// Copyright: ©2010 Concord Consortium
// @author    Parker Morse <pmorse@cantinaconsulting.com>
// ==========================================================================
/*globals Smartgraphs RaphaelViews */

sc_require('mixins/arrow_drawing');

/** @class

  (Document Your View Here)

  @extends RaphaelViews.RaphaelView
*/
Smartgraphs.BracketArcView = RaphaelViews.RaphaelView.extend( Smartgraphs.ArrowDrawing,
/** @scope Smartgraphs.BracketArcView.prototype */ {

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
    var bracket = raphaelCanvas.set();
    bracket.push(
        raphaelCanvas.path(attrs.d).attr(attrs),
        raphaelCanvas.text(attrs.labelX, attrs.labelY, attrs.label).attr({'stroke': "#000", 'font-size': 15}).rotate(attrs.rotate, true)
      );
    return bracket;
  },

  // Called by SC (by the parent view)
  render: function(context, firstTime) {
    // var graphView = this.get('graphView');
    var annotation = this.get('item');
    var start = { 'x': annotation.get('startX'), 'y': annotation.get('startY') };
    var end = { 'x': annotation.get('endX'), 'y': annotation.get('endY') };
    
    // Figure points for the arrowheads
    var controlE, controlF, theta, baseAngleA, baseAngleB, baseAngleC, baseAngleD;
    // Label position variables
    var labelCoords, rotate;
    // Arrowhead angle, length
    var angle = 25;
    var length = 6;
    if ((annotation.get('isClockwise') && (start.y < end.y)) || 
        (!annotation.get('isClockwise') && (start.y > end.y))) {
      theta = Math.atan2((end.y-start.y),(end.x-start.x))+(Math.PI/2); // 90 degrees from line
      
      controlE = { 'x': start.x + 40, 'y': start.y }; // TODO: these are vertical, might use theta later, see below
      controlF = { 'x': end.x + 40, 'y': end.y };
      
      // These angles are biased to make the arrowheads "toe out" a bit; they look goofy otherwise
      if (start.y < end.y) {
        baseAngleA = theta + (1.5 * angle) * Math.PI/180;
        baseAngleB = theta - (0.5 * angle) * Math.PI/180;
        baseAngleC = theta + (0.5 * angle) * Math.PI/180;
        baseAngleD = theta - (1.5 * angle) * Math.PI/180;
      }
      else {
        baseAngleA = theta + (0.5 * angle) * Math.PI/180;
        baseAngleB = theta - (1.5 * angle) * Math.PI/180;
        baseAngleC = theta + (1.5 * angle) * Math.PI/180;
        baseAngleD = theta - (0.5 * angle) * Math.PI/180;
      }
      
      // Label positioning
      rotate = 90;
      labelCoords = { 'x': start.x + 10, 'y': ((start.y + end.y)/2)};
    }
    else { // Sign change
      theta = Math.atan2((end.y-start.y),(end.x-start.x))-(Math.PI/2);
      
      controlE = { 'x': start.x - 40, 'y': start.y }; // TODO: these are vertical, might use theta later, see below
      controlF = { 'x': end.x - 40, 'y': end.y };

      // These angles are biased to make the arrowheads "toe out" a bit; they look goofy otherwise
      if (start.y < end.y) {
        baseAngleA = theta + (0.5 * angle) * Math.PI/180;
        baseAngleB = theta - (1.5 * angle) * Math.PI/180;
        baseAngleC = theta + (1.5 * angle) * Math.PI/180;
        baseAngleD = theta - (0.5 * angle) * Math.PI/180;
      } 
      else {
        baseAngleA = theta + (1.5 * angle) * Math.PI/180;
        baseAngleB = theta - (0.5 * angle) * Math.PI/180;
        baseAngleC = theta + (0.5 * angle) * Math.PI/180;
        baseAngleD = theta - (1.5 * angle) * Math.PI/180;
      }

      // Label positioning
      rotate = -90;
      labelCoords = { 'x': start.x - 10, 'y': ((start.y + end.y)/2)};
    }

    var baseAX, baseAY, baseBX, baseBY, baseCX, baseCY, baseDX, baseDY;
    
    if (start.y < end.y) {
      // These points describe the arrow head at the "start" end
      baseAX = start.x - length * Math.cos(baseAngleA);
      baseAY = start.y - length * Math.sin(baseAngleA);
      baseBX = start.x - length * Math.cos(baseAngleB);
      baseBY = start.y - length * Math.sin(baseAngleB);

      // ...and these describe the arrow head at the "end" end.
      baseCX = end.x - length * Math.cos(baseAngleC);
      baseCY = end.y - length * Math.sin(baseAngleC);
      baseDX = end.x - length * Math.cos(baseAngleD);
      baseDY = end.y - length * Math.sin(baseAngleD);
    }
    else {
      // These points describe the arrow head at the "start" end
      baseAX = start.x + length * Math.cos(baseAngleA);
      baseAY = start.y + length * Math.sin(baseAngleA);
      baseBX = start.x + length * Math.cos(baseAngleB);
      baseBY = start.y + length * Math.sin(baseAngleB);

      // ...and these describe the arrow head at the "end" end.
      baseCX = end.x + length * Math.cos(baseAngleC);
      baseCY = end.y + length * Math.sin(baseAngleC);
      baseDX = end.x + length * Math.cos(baseAngleD);
      baseDY = end.y + length * Math.sin(baseAngleD);
    }
    
    // Figure out the pathString
    var pathString = "M " + start.x + " " + start.y + // Starting point
                     "L " + baseAX + " " + baseAY + // "Wing" A
                     "L " + baseBX + " " + baseBY + // Arrowhead base
                     "L " + start.x + " " + start.y + // "Wing" B
                     "C " + controlE.x + " " + controlE.y +  // Control point 1
                     " " + controlF.x + " " + controlF.y +  // Control point 2
                     " " + end.x + " " + end.y + // End point
                     "L " + baseCX + " " + baseCY + // "Wing" C
                     "L " + baseDX + " " + baseDY + // Arrowhead base
                     "L " + end.x + " " + end.y; // "Wing" D
    
    // TODO: Currently this assumes that the arc is vertical (that is, that the two points are vertically aligned) and the 
    // available width is ~40 pixels. Ultimately it's possible to use a height param to let the arc grow arbitrarily away 
    // from the line described by the two points. To remove the assumption of verticality, use theta to figure the points 
    // controlE and controlF with math similar to the baseAX, baseAB etc. calculations.
    
    // Label details: label, labelCoords (x and y), rotate value
    var label = this.get('item').get('label');
    
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
  }
});
