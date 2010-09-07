// ==========================================================================
// Project:   Smartgraphs.TraceAnnotationView
// Copyright: ©2010 Concord Consortium
// @author:   Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs RaphaelViews */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Smartgraphs.TraceAnnotationView = RaphaelViews.RaphaelView.extend(
/** @scope Smartgraphs.TraceAnnotationView.prototype */ {
  
  stroke: '#000000',
  strokeWidth: 2,
  
  // TODO: make stroke, strokeWidth displayProperties
  
  renderCallback: function (raphaelCanvas, pathStr, stroke, strokeWidth) {
    return raphaelCanvas.path(pathStr).attr({stroke: stroke, 'stroke-width': strokeWidth});
  },

  render: function (context, firstTime) {
    var graphView = this.getPath('parentView.parentView');
    var content = this.get('content');
    var points = content ? content.get('points') : [{x: 0, y: 0}];
    
    var str = [];    
    var coords;
    
    for (var i = 0, ii = points.get('length'); i < ii; i++) {
      coords = graphView.coordinatesForPoint(points.objectAt(i));
      str.push(i === 0 ? 'M' : 'L');
      str.push(coords.x);
      str.push(' ');
      str.push(coords.y);
    } 
    var pathStr = str.join('');
    
    if (firstTime) {
      context.callback(pathStr, this.get('stroke'), this.get('strokeWidth'));
    }
    else {
      var path = context.raphael();
      path.attr({path: pathStr});
    }
  }

});
