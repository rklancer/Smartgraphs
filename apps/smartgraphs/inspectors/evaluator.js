// ==========================================================================
// Project:   Smartgraphs.AnnotationInspector
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('inspectors/inspector');

Smartgraphs.EvaluatorInspector = Smartgraphs.Inspector.extend({

  config: null,
  response: null,
  
  configure: function (config) {
    this.set('config', config);
  },
  
  inspect: function () {
    var response  = Smartgraphs.evaluate(this.get('config'), "value");
    this.set('response', response);
    return response;
  },
  
  watch: function () {
  },
  
  stopWatching: function () {
  }
  
});