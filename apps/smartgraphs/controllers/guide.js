// ==========================================================================
// Project:   Smartgraphs.guideController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  The Guide controller represents the currently open Guide.

  @extends SC.Object
*/

Smartgraphs.guideController = SC.ObjectController.create(
/** @scope Smartgraphs.guideController.prototype */ {
  
  // return the context variable's value from the guide context
  lookup: function (key) {
    var context = this.get('context');
    return (context.hasOwnProperty(key) ? context[key] : undefined);
  },
  
  // let buttons know.
  canOpenNextPage: NO,
  
  // the corresponding action that calls this should only be available in GUIDE_PAGE_DONE state
  openNextPage: function () {
    Smartgraphs.makeFirstResponder(Smartgraphs.GUIDE_PAGE_START);
    Smartgraphs.guidePagesController.selectNextPage();
  }
    
}) ;
