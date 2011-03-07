// ==========================================================================
// Project:   Smartgraphs.HighlightedPointView
// Copyright: ©2010 Concord Consortium
// Author:   Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs RaphaelViews */

/** @class

  // TODO (Document Your View Here)

  @extends SC.View
*/

Smartgraphs.HighlightedPointView = RaphaelViews.RaphaelView.extend(
/** @scope Smartgraphs.HighlightedPointView.prototype */
{

  canShowInTable: NO,
  
  // defaults
  radius: 8,
  strokeBinding: '.item.color',
  strokeWidth: 2,
  strokeOpacity: 1.0,
  fill: '#ffffff',
  fillOpacity: 0,
  displayProperties: 'item.point.x item.point.y radius stroke strokeWidth strokeOpacity fill fillOpacity'.w(),

  renderCallback: function(raphaelCanvas, attrs) {
    return raphaelCanvas.circle(attrs.x, attrs.y, attrs.r).attr(attrs);
  },

  render: function(context, firstTime) {
    var graphView = this.get('graphView');
    var annotation = this.get('item');

    var point = annotation.get('point');
    var x = point ? point.get('x') : -9999;
    var y = point ? point.get('y') : -9999;
    var coords = graphView.coordinatesForPoint(x, y);

    var attrs = {
      cx: coords.x,
      cy: coords.y,
      r: this.get('radius'),
      stroke: this.get('stroke'),
      'stroke-width': this.get('strokeWidth'),
      'stroke-opacity': this.get('strokeOpacity'),
      fill: this.get('fill'),
      'fill-opacity': this.get('fillOpacity')
    };
    
    if (firstTime) {
      context.callback(this, this.renderCallback, attrs);
    }
    else {
      var circle = context.raphael();
      circle.attr(attrs);
    }
  }

});
