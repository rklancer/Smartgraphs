// ==========================================================================
// Project:   Smartgraphs.GUIDE_SUBMIT
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  State representing that the Guide considers the user input to be acceptable for submission. May transition back
  to GUIDE_READY if input becomes no longer submittable; or to GUIDE_READY or GUIDE_PAGE_FINISHED after submission.

  @extends SC.Responder
  @version 0.1
*/
Smartgraphs.GUIDE_SUBMIT = SC.Responder.create(
/** @scope Smartgraphs.GUIDE_SUBMIT.prototype */ {

  /**
    The next state to check if this state does not implement the action.
  */
  nextResponder: Smartgraphs.GUIDE,
  
  didBecomeFirstResponder: function() {
    // Called when this state becomes first responder
  },
  
  willLoseFirstResponder: function() {
    // Called when this state loses first responder
  },
  
  // ..........................................................
  // EVENTS
  //
  
  // add event handlers here
  someAction: function() {
    
  }
  
}) ;
