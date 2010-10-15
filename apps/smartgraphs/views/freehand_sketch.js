// ==========================================================================
// Project:   Smartgraphs.FreehandSketchView
// Copyright: ©2010 Concord Consortium
// @author:   Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs RaphaelViews */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Smartgraphs.FreehandSketchView = RaphaelViews.RaphaelView.extend(
/** @scope Smartgraphs.FreehandSketchView.prototype */ {
  
  stroke: '#000000',
  strokeWidth: 2,
  
  displayProperties: 'item.points.[]'.w(),
  
  renderCallback: function (raphaelCanvas, pathStr, stroke, strokeWidth) {
    return raphaelCanvas.path(pathStr).attr({stroke: stroke, 'stroke-width': strokeWidth});
  },

  render: function (context, firstTime) {
    var graphView = this.get('graphView');
    var sketch = this.get('item');
    var points = (sketch ? sketch.get('points') : null) || [{x: 0, y: 0}];
    
    var str = [];
    var point, coords;
    
    for (var i = 0, ii = points.get('length'); i < ii; i++) {
      point = points.objectAt(i);
      coords = graphView.coordinatesForPoint(point.x, point.y) || {x: 0, y: 0};
      str.push(i === 0 ? 'M' : 'L');
      str.push(Math.round(coords.x));
      str.push(' ');
      str.push(Math.round(coords.y));
    } 
    var pathStr = str.join('') || 'M0 0';         // Raphael won't make path go away in IE if path string = ''
    
    if (firstTime) {
      context.callback(this, this.renderCallback, pathStr, this.get('stroke'), this.get('strokeWidth'));
    }
    else {
      var path = context.raphael();
      path.attr({path: pathStr});
    }
  }

});
