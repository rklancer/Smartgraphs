// ==========================================================================
// Project:   Smartgraphs.CircledPointView
// Copyright: ©2011 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs RaphaelViews */

/** @class

  Draws a circle around the point at the specified x, y.

  @extends SC.View
*/

Smartgraphs.CircledPointView = RaphaelViews.RaphaelView.extend(
/** @scope Smartgraphs.CircledPointView.prototype */
{

  radius: 6,
  strokeBinding: '.item.color',
  strokeWidth: 2,
  strokeOpacity: 1.0,
  displayProperties: 'item.x item.y radius stroke strokeWidth strokeOpacity'.w(),

  renderCallback: function(raphaelCanvas, attrs) {
    return raphaelCanvas.circle().attr(attrs);
  },

  render: function(context, firstTime) {
    var graphView  = this.get('graphView'),
        annotation = this.get('item'),
        x          = annotation.get('x') || 0,
        y          = annotation.get('y') || 0,
        coords     = graphView.coordinatesForPoint(x, y),

        attrs = {
          cx:               coords.x,
          cy:               coords.y,
          r:                this.get('radius'),
          fill:             'none',                   // fill === 'none' to allow clicking the point under the circle
          stroke:           this.get('stroke'),
          'stroke-width':   this.get('strokeWidth'),
          'stroke-opacity': this.get('strokeOpacity')
        },

        circle;

    if (firstTime) {
      context.callback(this, this.renderCallback, attrs);
    }
    else {
      circle = context.raphael();
      circle.attr(attrs);
    }
  }

});
