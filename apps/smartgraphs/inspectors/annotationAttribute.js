// ==========================================================================
// Project:   Smartgraphs.AnnotationInspector
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('inspectors/inspector');

Smartgraphs.AnnotationAttributeInspector = Smartgraphs.Inspector.extend({
  annotationName: null, 
  attributePath: null,
  response: null,
  
  configure: function (config) {
    if (SC.none(config.name)) {
      throw("name is required for AnnotationAttributeInspector config");
    }
    if (SC.none(config.attributePath)) {
      throw("attributePath is required for AnnotationAttributeInspector config");
    }
  
    this.set('annotationName', config.name);
    this.set('attributePath', config.attributePath);
  },
  
  inspect: function () {
    var response = Smartgraphs.activityObjectsController.findAnnotation(this.get('annotationName'));
    var attributes = this.get('attributePath').split('.');
    for (var i=0; i<attributes.length; i++) {
      // TODO: confirm that attributes might be accessible either of these ways 
      if (typeof(response.get) == "function") {
        response = response.get(attributes[i]);
      } 
      else {
        eval("response = response." + attributes[i]);
      }
    }
    this.set('response', response);
    return response;
  },
  
  watch: function () {
  },
  
  stopWatching: function () {
  }
  
});