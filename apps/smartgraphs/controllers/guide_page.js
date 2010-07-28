// ==========================================================================
// Project:   Smartgraphs.guidePageController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Smartgraphs.guidePageController = SC.ObjectController.create(
/** @scope Smartgraphs.guidePageController.prototype */ {

  contentBinding: 'Smartgraphs.guidePagesController.selection',
  
  // return the context variable's value from the guidePage or guide context
  lookup: function (key) {
    var context = this.get('context');
    return (context.hasOwnProperty(key) ? context[key] : Smartgraphs.guideController.lookup(key));
  }
}) ;
