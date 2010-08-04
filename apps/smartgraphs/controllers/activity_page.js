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
  
  // return the context variable's value from the activityPage or activity context
  lookup: function (key) {
    var context = this.get('context');
    return (context.hasOwnProperty(key) ? context[key] : Smartgraphs.activityController.lookup(key));
  }
}) ;
