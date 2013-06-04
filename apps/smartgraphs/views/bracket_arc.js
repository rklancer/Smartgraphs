// ==========================================================================
// Project:   Smartgraphs.BracketArcView
// Copyright: ©2010-2011 Concord Consortium
// Author:    Parker Morse <pmorse@cantinaconsulting.com>
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs RaphaelViews */

sc_require('mixins/arrow_drawing');

/** @class

  (Document Your View Here)

  @extends RaphaelViews.RaphaelView
*/
Smartgraphs.BracketArcView = RaphaelViews.RaphaelView.extend(
/** @scope Smartgraphs.BracketArcView.prototype */ {

  canShowInTable: YES,

  itemColorBinding: '.item.color',
  isHighlightedBinding: '.item.isHighlighted',
  strokeWidth: 2,
  strokeOpacity: 0.9,

  stroke: function () {
    return this.get('isHighlighted') ? '#ff0000' : this.get('itemColor');
  }.property('isHighlighted', 'itemColor'),

  displayProperties: 'bracket.item1Index bracket.item2Index label stroke isHighlighted strokeWidth strokeOpacity'.w(),

  renderCallback: function (raphaelCanvas, attrs, label, labelX, labelY, labelRotation) {
    return raphaelCanvas.set().push(
      raphaelCanvas.path(attrs.d).attr(attrs),
      raphaelCanvas.text(labelX || 0, labelY || 0, label || '').attr({'fill': attrs.stroke, 'font-size': 15}).rotate(labelRotation || 0, true)
    );
  },

  render: function (context, firstTime) {
    var bracket =        this.get('item'),

        i1 =             bracket.get('item1Index'),
        i2 =             bracket.get('item2Index'),
        isLeftOfColumn = bracket.get('isLeftOfColumn'),

        tableView =      this.get('tableView'),
        startCoords =    tableView.coordinatesForIndex(i1),
        endCoords =      tableView.coordinatesForIndex(i2),

        startX =         isLeftOfColumn ? startCoords.left - 10 : startCoords.right + 10,
        startY =         (startCoords.top + startCoords.bottom) / 2,
        endX =           startX,
        endY =           (endCoords.top + endCoords.bottom) / 2,

        label =          bracket.get('label') || '',
        labelRotation =  isLeftOfColumn ? -90 : 90,
        labelX =         isLeftOfColumn ? startX - 10 : startX + 10,
        labelY =         (startY + endY) / 2,

        pathString =     this.figurePath(startX, startY, endX, endY, isLeftOfColumn),
        attrs =          {
                           'd': pathString,
                           'stroke': this.get('stroke'),
                           'stroke-width': this.get('strokeWidth'),
                           'stroke-opacity': this.get('strokeOpacity')
                         },
        raphaelObj,
        pathElement,
        textElement;

    if (firstTime) {
      context.callback(this, this.renderCallback, attrs, label, labelX, labelY, labelRotation);
    }
    else {
      raphaelObj = context.raphael();
      pathElement = raphaelObj.items[0];
      textElement = raphaelObj.items[1];

      pathElement.attr(attrs);
      textElement.attr({
        fill: this.get('stroke')
      });
    }
  },

  figurePath: function (startX, startY, endX, endY, isLeftOfColumn) {
    var angle = 25,       // arrowhead angle
        length = 6,       // arrowhead length
        controlE, controlF, theta,                        // Figure points for the arrowheads
        baseAngleA, baseAngleB, baseAngleC, baseAngleD,   // Figure points for the arrowheads
        baseAX, baseAY, baseBX, baseBY, baseCX, baseCY, baseDX, baseDY,
        pathString;

    if (isLeftOfColumn) {
      theta = Math.atan2((endY-startY),(endX-startX))-(Math.PI/2);

      controlE = { 'x': startX - 40, 'y': startY }; // TODO: these are vertical, might use theta later, see below
      controlF = { 'x': endX - 40, 'y': endY };

      // These angles are biased to make the arrowheads "toe out" a bit; they look goofy otherwise
      if (startY < endY) {
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
    else {
      theta = Math.atan2((endY-startY),(endX-startX))+(Math.PI/2); // 90 degrees from line

      controlE = { 'x': startX + 40, 'y': startY }; // TODO: these are vertical, might use theta later, see below
      controlF = { 'x': endX + 40, 'y': endY };

      // These angles are biased to make the arrowheads "toe out" a bit; they look goofy otherwise
      if (startY < endY) {
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

    if (startY < endY) {
      // These points describe the arrow head at the "start" end
      baseAX = startX - length * Math.cos(baseAngleA);
      baseAY = startY - length * Math.sin(baseAngleA);
      baseBX = startX - length * Math.cos(baseAngleB);
      baseBY = startY - length * Math.sin(baseAngleB);

      // ...and these describe the arrow head at the "end" end.
      baseCX = endX - length * Math.cos(baseAngleC);
      baseCY = endY - length * Math.sin(baseAngleC);
      baseDX = endX - length * Math.cos(baseAngleD);
      baseDY = endY - length * Math.sin(baseAngleD);
    }
    else {
      // These points describe the arrow head at the "start" end
      baseAX = startX + length * Math.cos(baseAngleA);
      baseAY = startY + length * Math.sin(baseAngleA);
      baseBX = startX + length * Math.cos(baseAngleB);
      baseBY = startY + length * Math.sin(baseAngleB);

      // ...and these describe the arrow head at the "end" end.
      baseCX = endX + length * Math.cos(baseAngleC);
      baseCY = endY + length * Math.sin(baseAngleC);
      baseDX = endX + length * Math.cos(baseAngleD);
      baseDY = endY + length * Math.sin(baseAngleD);
    }

    // NOTE: modified to remove 'start' arrow
    pathString = "M " + startX + " " + startY +          // Starting point
                 // "L " + baseAX + " " + baseAY +       // "Wing" A
                 // "L " + baseBX + " " + baseBY +       // Arrowhead base
                 // "L " + startX + " " + startY +       // "Wing" B
                 "C " + controlE.x + " " + controlE.y +  // Control point 1
                 " " + controlF.x + " " + controlF.y +   // Control point 2
                 " " + endX + " " + endY +               // End point
                 "L " + baseCX + " " + baseCY +          // "Wing" C
                 "L " + baseDX + " " + baseDY +          // Arrowhead base
                 "L " + endX + " " + endY;               // "Wing" D

    // TODO: Currently this assumes that the arc is vertical (that is, that the two points are vertically aligned) and the
    // available width is ~40 pixels. Ultimately it's possible to use a height param to let the arc grow arbitrarily away
    // from the line described by the two points. To remove the assumption of verticality, use theta to figure the points
    // controlE and controlF with math similar to the baseAX, baseAB etc. calculations.
    return pathString;
  }
});
