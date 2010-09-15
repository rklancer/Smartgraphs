// ==========================================================================
// Project:   Smartgraphs.ACTIVITY_PAGE_DONE
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  State representing a finished activity page. The user should be able to proceed to the next activity page from here.

  @extends SC.Responder
  @version 0.1
*/

sc_require('states/activity');

Smartgraphs.ACTIVITY_PAGE_DONE = SC.Responder.create(
/** @scope Smartgraphs.ACTIVITY_PAGE_DONE.prototype */ {

  nextResponder: Smartgraphs.ACTIVITY,
  
  didBecomeFirstResponder: function() {    
    if (Smartgraphs.activityPagesController.get('isLastPage')) {
      Smartgraphs.makeFirstResponder(Smartgraphs.ACTIVITY_DONE);
    }
    else {
      Smartgraphs.activityController.set('canGotoNextPage', YES);
    }
  },
  
  willLoseFirstResponder: function() {
    Smartgraphs.activityController.set('canGotoNextPage', NO);
    Smartgraphs.activityPageController.cleanup();
  },
  
  // ..........................................................
  // ACTIONS
  //

  gotoNextPage: function () {
    Smartgraphs.activityPagesController.selectNextPage();
    Smartgraphs.activityPageController.set('content', Smartgraphs.activityPagesController.get('selection'));
    Smartgraphs.makeFirstResponder(Smartgraphs.ACTIVITY_PAGE_LOADING);
  }
  
}) ;
