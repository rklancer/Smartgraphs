// ==========================================================================
// Project:   Smartgraphs.AnnotationInspector
// Copyright: ©2010 Concord Consortium
// Author:    Eric Kattwinkel
// ==========================================================================
/*globals Smartgraphs */

sc_require('inspectors/inspector');

Smartgraphs.VariableInspector = Smartgraphs.Inspector.extend({

  evalStatement: null, 
  variableNames: null,
  response: null,
  
  configure: function (config) {
    if (SC.none(config.evalStatement)) {
      throw("evalStatement is required for VariableInspector config");
    }
    if (SC.none(config.variableNames)) {
      throw("variableNames is required for VariableInspector config");
    }
  
    this.set('evalStatement', config.evalStatement);
    this.set('variableNames', config.variableNames);
  },
  
  inspect: function () {
    var evalStatement = this.get('evalStatement');
    var variableNames = this.get('variableNames');

    // replace [0], [1], etc. in evalStatement with variable values
    for (var ind in variableNames) {
      if ( !variableNames.hasOwnProperty(ind) ) continue;
      var variableName = variableNames[ind];
      var variable = Smartgraphs.activityObjectsController.getVariable(variableName);
      if (SC.none(variable)) {
        throw("no variable exists with name '%@'".fmt(variableName));
      }
      evalStatement = evalStatement.replace("[" + ind + "]", variable.get("value"));
    }
    var response  = eval(evalStatement);
    this.set('response', response);
    return response;
  },
  
  watch: function () {
  },
  
  stopWatching: function () {
  }
  
});