// ==========================================================================
// Project:   Smartgraphs.SketchLengthInspector
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('inspectors/inspector');

Smartgraphs.SketchLengthInspector = Smartgraphs.Inspector.extend({
  
  value: null,
  sketch: null,
  
  configure: function (config) {
    var controller = Smartgraphs.activityViewController.graphControllerFor(Smartgraphs.freehandInputController.get('pane'));
    if ( !controller ) return;
    
    this.set('sketch', controller.findAnnotationByName(config.annotationName));
  },
  
  inspect: function () {
    var value;
    var points = this.getPath('sketch.points');
    
    if ( !points || points.get('length') === 0 ) {
      value = 0;
    }
    else {  
      var xs = points.getEach('x');
      var xMin = Math.min.apply(null, xs);
      var xMax = Math.max.apply(null, xs);
      
      value = xMax - xMin;
    }
    
    this.set('value', value);
    console.log('inspector value: ', value);
    return value;
  },
  
  watch: function () {
    var sketch = this.get('sketch');
    if (sketch) sketch.addObserver('points.[]', this, this.inspect);
  },
  
  stopWatching: function () {
    var sketch = this.get('sketch');    
    if (sketch) sketch.removeObserver('points.[]', this, this.inspect);
  }
  
});