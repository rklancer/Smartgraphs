// ==========================================================================
// Project:   Smartgraphs.GUIDE_READY
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  State representing that the guide page is waiting for the user's response. Transitions to GUIDE_RESPONSE_READY when
  the response is in some acceptable form for checking progress.

  @extends SC.Responder
  @version 0.1
*/
Smartgraphs.GUIDE_READY = SC.Responder.create(
/** @scope Smartgraphs.GUIDE_READY.prototype */ {

  /**
    The next state to check if this state does not implement the action.
  */
  nextResponder: null,
  
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
