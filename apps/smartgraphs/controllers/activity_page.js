// ==========================================================================
// Project:   Smartgraphs.activityPageController
// Copyright: ©2010 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Smartgraphs.activityPageController = SC.ObjectController.create(
/** @scope Smartgraphs.activityPageController.prototype */ {

  // use this instead of a binding so that a change to the page selection is reflected immediately rather than at the
  // end of a runloop.
  pageSelectionDidChange: function () {
    this.setIfChanged('content', Smartgraphs.activityPagesController.get('selection').firstObject());
  }.observes('Smartgraphs.activityPagesController.selection'),

  cleanup: function () {
    Smartgraphs.firstGraphController.clear();
    Smartgraphs.secondGraphController.clear();
    Smartgraphs.firstTableController.clear();
    Smartgraphs.secondTableController.clear();
    Smartgraphs.activityViewController.clear();
  },

  /**
    Get the specified value from the context, or else the 'global context' (which is, for now, basically just the
    Variable objects defined by the activityObjectsController.

    @param {String} name

    @returns the value from the page context or global context, or else undefined
  */
  getFromContext: function (name) {
    var context    = this.get('context'),
        expression = context.hasOwnProperty(name) && context[name],
        variable;

    if (SC.typeOf(name) !== SC.T_STRING) return;

    if (expression) {
      return Smartgraphs.evaluator.evaluate(expression);
    }
    else {
      variable = Smartgraphs.activityObjectsController.findVariable(name);
      if (variable) return variable.get('value');
    }
  },

  context: function () {
    var contextVars = this.get('contextVars') || [],
        ret = {};

    contextVars.forEach( function (varDef) {
      ret[varDef.name] = varDef.value;
    });
    return ret;
  }.property('content')

});
