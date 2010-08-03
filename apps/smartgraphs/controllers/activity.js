// ==========================================================================
// Project:   Smartgraphs.activityController
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  The Activity controller represents the currently open Activity.

  @extends SC.Object
*/
Smartgraphs.activityController = SC.ObjectController.create(
/** @scope Smartgraphs.activityController.prototype */ {
  
  // return the context variable's value from the activity context
  lookup: function (key) {
    var context = this.get('context');
    return (context.hasOwnProperty(key) ? context[key] : undefined);
  },
  
  // let buttons know.
  canOpenNextPage: NO,
  
  // the corresponding action that calls this should only be available in ACTIVITY_PAGE_DONE state
  openNextPage: function () {
    Smartgraphs.makeFirstResponder(Smartgraphs.ACTIVITY_PAGE_START);
    Smartgraphs.activityPagesController.selectNextPage();
  }
    
}) ;
