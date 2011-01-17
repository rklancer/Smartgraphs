// ==========================================================================
// Project:   Smartgraphs.ResponseFieldAnnotationsInspector
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('inspectors/inspector');

Smartgraphs.ResponseFieldVariableSetter = Smartgraphs.Inspector.extend({
  
  variables: null, 
  
  configure: function (config) {
    this.set('variables', config.variables);
  },
  
  inspect: function () {
    var variables = this.get('variables');

    if (!SC.none(variables)) {
      var responseFieldValues = Smartgraphs.responseTemplateController.get('values');
      
      for (var i in variables) {
        if (!variables.hasOwnProperty(i)) continue;
        var variableName = variables[i].name;
        var fieldIndex = variables[i].fieldIndex;
        if (!SC.none(variableName) && !SC.none(fieldIndex)) {
          if (SC.none(responseFieldValues[fieldIndex])) {
            throw("No response field value found for fieldIndex %@".fmt(fieldIndex));
          }
          Smartgraphs.activityObjectsController.setVariable(variableName, responseFieldValues[fieldIndex]);
          response = YES;
        }
      }
    }

    return null;
  },
  
  watch: function () {
  },
  
  stopWatching: function () {
  }
  
});