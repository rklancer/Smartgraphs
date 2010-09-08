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
  
  init: function () {
    sc_super();
    
    var item = this.get('item');
    var name = item ? item.get('name') : '<null>';
    
    console.log('traceAnnotationView created for annotation name = %s', name);
  },
  
  renderCallback: function (raphaelCanvas, pathStr, stroke, strokeWidth) {
    console.log('initial path: %s', pathStr);
    return raphaelCanvas.path(pathStr).attr({stroke: stroke, 'stroke-width': strokeWidth});
  },

  render: function (context, firstTime) {
    var graphView = this.getPath('parentView.parentView');
    var trace = this.get('item');
    var points = (trace ? trace.get('points') : null) || [{x: 0, y: 0}];
    
    var str = [];
    var point, coords;
    
    for (var i = 0, ii = points.get('length'); i < ii; i++) {
      point = points.objectAt(i);
      coords = graphView.coordinatesForPoint(point.x, point.y) || {x: 0, y: 0};
      str.push(i === 0 ? 'M' : 'L');
      str.push(coords.x);
      str.push(' ');
      str.push(coords.y);
    } 
    var pathStr = str.join('');
    
    if (firstTime) {
      context.callback(this, this.renderCallback, pathStr, this.get('stroke'), this.get('strokeWidth'));
    }
    else {
      var path = context.raphael();
      path.attr({path: pathStr});
    }
  }

});
