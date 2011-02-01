// ==========================================================================
// Project:   Smartgraphs.ResponseFieldAnnotationsInspector
// Copyright: ©2010 Concord Consortium
// Author:    Eric Kattwinkel
// ==========================================================================
/*globals Smartgraphs */

sc_require('inspectors/inspector');

Smartgraphs.ResponseFieldAnnotationsInspector = Smartgraphs.Inspector.extend({
  
  annotationNames: null, 
  fieldIndex: null,
  response: null, 
  
  configure: function (config) {
    this.set('annotationNames', config.annotationNames);
    this.set('fieldIndex', config.fieldIndex);
  },
  
  inspect: function () {
    var fieldValue = Smartgraphs.responseTemplateController.get('values');

    // FIXME error check the fieldIndex value!`
    var fieldIndex = this.get('fieldIndex');
    if (!SC.none(fieldIndex)) {
      fieldValue = fieldValue[fieldIndex];
    }

    var annotations = [];
    var names = this.get('annotationNames');
    for (var i=0; i<names.length; i++) {
      annotations.push(Smartgraphs.activityObjectsController.findAnnotation(names[i]));
    };
    
    var response = {
      "annotations" : annotations,
      "fieldValue" : fieldValue
    };
    
    this.set('response', response);

    return response;
  },
  
  watch: function () {
  },
  
  stopWatching: function () {
  }
  
});