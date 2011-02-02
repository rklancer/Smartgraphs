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

  displayProperties: 'point1 point2 label stroke isHighlighted strokeWidth strokeOpacity'.w(),
  
  renderCallback: function (raphaelCanvas, attrs, label, labelX, labelY, labelRotation) {
    return raphaelCanvas.set().push(
      raphaelCanvas.path(attrs.d).attr(attrs),
      raphaelCanvas.text(labelX || 0, labelY || 0, label || '').attr({'fill': attrs.stroke, 'font-size': 15}).rotate(labelRotation || 0, true)
    );
  },

  render: function(context, firstTime) {
    var annotation = this.get('item');
    var pathString = this.figurePath(annotation);
    
    // Label details
    var label = annotation.get('label');
    var labelX, labelY, labelRotation;
    
    if ((  annotation.get('isClockwise') && (annotation.get('startY') < annotation.get('endY'))) || 
        ( !annotation.get('isClockwise') && (annotation.get('startY') > annotation.get('endY')))) {
      labelRotation = 90;
      labelX = annotation.get('startX') + 10;
      labelY = (annotation.get('startY') + annotation.get('endY')) / 2;
    }
    else {
      labelRotation = -90;
      labelX = annotation.get('startX') - 10;
      labelY = (annotation.get('startY') + annotation.get('endY')) / 2;
    } 

    var attrs = {
      d: pathString,
      stroke: this.get('stroke'),
      'stroke-width': this.get('strokeWidth'),
      'stroke-opacity': this.get('strokeOpacity')
    };

    if (firstTime) {
      context.callback(this, this.renderCallback, attrs, label, labelX, labelY, labelRotation);
    }
    else {
      var bracket = context.raphael();
      // update <path> element
      bracket.items[0].attr(attrs);
      
      // update <text> element
      bracket.items[1].attr({fill: this.get('stroke')});
    }
  },
  
  figurePath: function(annotation) {
    var start = { 'x': annotation.get('startX'), 'y': annotation.get('startY') };
    var end = { 'x': annotation.get('endX'), 'y': annotation.get('endY') };
    
    // Figure points for the arrowheads
    var controlE, controlF, theta, baseAngleA, baseAngleB, baseAngleC, baseAngleD;
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
    return pathString;
  }
});
