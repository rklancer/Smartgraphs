// ==========================================================================
// Project:   Smartgraphs.ArrowView
// Copyright: ©2010-2011 Concord Consortium
// Author:    Parker Morse <pmorse@cantinaconsulting.com>
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs RaphaelViews */

sc_require('mixins/arrow_drawing');

/** @class

  Display view for the Arrow subclass of Smartgraphs.Annotation. Draws a stroke between two points, with an arrowhead
  at the second end.

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

  displayProperties: 'item.x1 item.y1 item.x2 item.y2 label stroke isHighlighted strokeWidth strokeOpacity'.w(),

  renderCallback: function (raphaelCanvas, pathAttrs, label, labelCoords, labelRotation) {
    var labelX = labelCoords && labelCoords.x || 0;
    var labelY = labelCoords && labelCoords.y || 0;

    return raphaelCanvas.set().push(
      raphaelCanvas.path(pathAttrs.d).attr(pathAttrs),
      raphaelCanvas.text(labelX, labelY, label || '').attr({
        fill: pathAttrs.stroke,
        'font-size': 15,
        'stroke-width': 1
      }).rotate(labelRotation || 0, true)
    );
  },

  render: function (context, firstTime) {
    var graphView = this.get('graphView'),
        arrow = this.get('item'),

        label = arrow && arrow.get('label') || '',

        x1 =    arrow && arrow.get('x1') || 0,
        y1 =    arrow && arrow.get('y1') || 0,
        x2 =    arrow && arrow.get('x2') || 0,
        y2 =    arrow && arrow.get('y2') || 0,

        startCoords = graphView.coordinatesForPoint(x1, y1),
        endCoords =   graphView.coordinatesForPoint(x2, y2),

        startOverlapsEnd = (x1 === x2) && (y1 === y2),

        pathAttrs = {
          'd':              startOverlapsEnd ? '' : this.arrowPath(startCoords.x, startCoords.y, endCoords.x, endCoords.y, 10, 15),
          'stroke':         this.get('stroke'),
          'stroke-width':   this.get('strokeWidth'),
          'stroke-opacity': this.get('strokeOpacity')
        },

        labelCoords,
        labelRotation,
        raphaelObj,
        pathElement,
        textElement;

    // crudely assume is vertical iff x1 == x2
    // TODO: Need a case for non-vertical, non-horizontal; but not yet
    if (x1 === x2) {
      labelCoords = graphView.coordinatesForPoint( x1, (y1+y2)/2 );
      labelCoords.x -= 12;
      labelRotation = -90;
    }
    else {
      labelCoords = graphView.coordinatesForPoint( (x1+x2)/2, y1 );
      labelCoords.y -= 12;
      labelRotation = 0;
    }

    if (firstTime) {
      context.callback(this, this.renderCallback, pathAttrs, label, labelCoords, labelRotation);
    }
    else {
      raphaelObj = context.raphael();
      pathElement = raphaelObj.items[0];
      textElement = raphaelObj.items[1];

      pathElement.attr(pathAttrs);
      textElement.attr({
        fill: this.get('stroke')
      });
    }
  }

});
