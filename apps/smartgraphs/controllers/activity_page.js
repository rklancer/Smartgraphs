// ==========================================================================
// Project:   Smartgraphs.activityPageController
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
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
    Variable objects defined by the activityObjectsController
    
    @param {String} name
  */
  getFromContext: function (name) {
    var context = this.get('context');
    return context.hasOwnProperty(name) ? context[name] : Smartgraphs.activityObjectsController.findVariable(name).get('value');
  },

  /**
    Set the specified name in the context ot the specified value
    
    @param {String} name
    @param value
  */
  setInContext: function (name, value) {
    var context = this.get('context');
    context[name] = value;
  }    
  
});
