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
  checkContinuosly: null,
  
  configure: function (config) {
    this.set('checkContinuously', config.check && config.check === 'continuously');
    
    var controller = Smartgraphs.activityViewController.graphControllerFor(Smartgraphs.freehandInputController.get('pane'));
    if ( !controller ) return;
    
    this.set('sketch', controller.findAnnotationByName(config.annotationName));
  },
  
  inspect: function () {
    var value;
    var points = this.getPath('sketch.points');
    
    if ( !points || points.get('length') === 0 ) {
      value = -1;
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
  
  inspectOnStateChange: function () {
    var resp = Smartgraphs.get('firstResponder');
    
    if (resp === Smartgraphs.FREEHAND_INPUT_COMPLETED || resp === Smartgraphs.FREEHAND_INPUT_READY) {
      this.inspect();
    }
  },
  
  watch: function () {
    var sketch;
    
    if (this.get('checkContinuously')) {
      sketch = this.get('sketch');
      if (sketch) sketch.addObserver('points.[]', this, this.inspect);
    }
    else {
      Smartgraphs.addObserver('firstResponder', this, this.inspectOnStateChange); 
    }
  },
  
  stopWatching: function () {
    var sketch;
    
    if (this.get('checkContinuously')) {
      sketch = this.get('sketch');
      if (sketch) sketch.removeObserver('points.[]', this, this.inspect);
    }
    else {
      Smartgraphs.removeObserver('firstResponder', this, this.inspectOnStateChange);
    }
  }
  
});