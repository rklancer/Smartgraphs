// ==========================================================================
// Project:   Smartgraphs.FreehandSketchView
// Copyright: ©2011 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs RaphaelViews */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Smartgraphs.FreehandSketchView = RaphaelViews.RaphaelView.extend(
/** @scope Smartgraphs.FreehandSketchView.prototype */ {

  colorBinding: '.item.color',
  strokeWidth: 3,
  strokeOpacity: 0.4,

  displayProperties: 'item.points.[] color'.w(),

  renderCallback: function (raphaelCanvas, attrs) {
    return raphaelCanvas.path(attrs.path).attr(attrs);
  },

  render: function (context, firstTime) {
    var graphView = this.get('graphView'),
        sketch = this.get('item'),
        points = sketch && sketch.get('points') || [],
        str = [],
        point,
        coords,
        i,
        len,
        pathString,
        attrs,
        raphaelPath;

    for (i = 0, len = points.get('length'); i < len; i++) {
      point = points.objectAt(i);
      coords = graphView.coordinatesForPoint(point[0], point[1]);
      str.push(i === 0 ? 'M' : 'L');
      str.push(Math.round(coords.x));
      str.push(' ');
      str.push(Math.round(coords.y));
    }
    pathString = str.join('') || 'M0 0';         // Raphael won't make path go away in IE if path string = ''

    attrs = {
      'path':             pathString,
      'stroke':           this.get('color'),
      'stroke-width':     this.get('strokeWidth'),
      'stroke-opacity':   this.get('strokeOpacity'),
      'stroke-linecap':  'round',
      'stroke-linejoin': 'round'
    };

    if (firstTime) {
      context.callback(this, this.renderCallback, attrs);
    }
    else {
      raphaelPath = context.raphael();
      raphaelPath.attr(attrs);
    }
  }

});
