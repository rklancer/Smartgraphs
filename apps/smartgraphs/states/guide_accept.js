// ==========================================================================
// Project:   Smartgraphs.GUIDE_RESPONSE_READY
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  State representing that the user can check their response in order to progress to the next guide step.

  @extends SC.Responder
  @version 0.1
*/
Smartgraphs.GUIDE_RESPONSE_READY = SC.Responder.create(
/** @scope Smartgraphs.GUIDE_RESPONSE_READY.prototype */ {

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
