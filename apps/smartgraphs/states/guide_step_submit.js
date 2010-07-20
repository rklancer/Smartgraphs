// ==========================================================================
// Project:   Smartgraphs.GUIDE_STEP_SUBMIT
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  State representing that the Guide step considers the user input to be acceptable for submission. May transition back
  to GUIDE_STEP_WAITING if input becomes no longer submittable; or to GUIDE_STEP_START or GUIDE_PAGE_FINISHED after 
  submission.

  @extends SC.Responder
  @version 0.1
*/
Smartgraphs.GUIDE_STEP_SUBMIT = SC.Responder.create(
/** @scope Smartgraphs.GUIDE_STEP_SUBMIT.prototype */ {

  /**
    The next state to check if this state does not implement the action.
  */
  nextResponder: Smartgraphs.GUIDE,
  
  didBecomeFirstResponder: function() {
    console.log('GUIDE_STEP_SUBMIT.didBecomeFirstResponder');
  },
  
  willLoseFirstResponder: function() {
    console.log('GUIDE_STEP_SUBMIT.willLoseFirstResponder');
  },
  
  // ..........................................................
  // EVENTS
  //
  
  
}) ;
