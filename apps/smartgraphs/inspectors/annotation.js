// ==========================================================================
// Project:   Smartgraphs.AnnotationInspector
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('inspectors/inspector');

Smartgraphs.AnnotationInspector = Smartgraphs.Inspector.extend({
  
  annotationNames: null, 
  annotations: null, 
  
  configure: function (config) {
    this.set('annotationNames', config.annotationNames);
  },
  
  inspect: function () {
    var annotations = [];
    var names = this.get('annotationNames');
    for (var i=0; i<names.length; i++) {
      annotations.push(Smartgraphs.activityObjectsController.findAnnotation(names[i]));
    };
    this.set('annotations', annotations);
    return annotations;
  },
  
  watch: function () {
  },
  
  stopWatching: function () {
  }
  
});