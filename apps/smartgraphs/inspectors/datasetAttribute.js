// ==========================================================================
// Project:   Smartgraphs.DatasetInspector
// Copyright: ©2010 Concord Consortium
// Author:    Eric Kattwinkel
// ==========================================================================
/*globals Smartgraphs */

sc_require('inspectors/inspector');

Smartgraphs.DatasetAttributeInspector = Smartgraphs.Inspector.extend({
  datasetName: null, 
  attributePath: null,
  response: null,
  
  configure: function (config) {
    if (SC.none(config.datasetName)) {
      throw("datasetName is required for DatasetAttributeInspector config");
    }
    if (SC.none(config.attributePath)) {
      throw("attributePath is required for DatasetAttributeInspector config");
    }
  
    this.set('datasetName', config.datasetName);
    this.set('attributePath', config.attributePath);
  },
  
  inspect: function () {
    var response = Smartgraphs.activityObjectsController.findDataset(this.get('datasetName'));
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