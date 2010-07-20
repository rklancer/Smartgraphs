// ==========================================================================
// Project:   Smartgraphs.GUIDE_STEP_WAITING
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  State representing that the guide step is waiting for the user's response. Transitions to GUIDE_STEP_SUBMIT when
  the response is in some acceptable form for submitting (e.g., checking the answer). GUIDE_STEP_SUBMIT may transition
  back here if the response changes back.
  
  @extends SC.Responder
  @version 0.1
*/
Smartgraphs.GUIDE_STEP_WAITING = SC.Responder.create(
/** @scope Smartgraphs.GUIDE_STEP_WAITING.prototype */ {

  /**
    The next state to check if this state does not implement the action.
  */
  nextResponder: Smartgraphs.GUIDE,
  
  didBecomeFirstResponder: function() {
    console.log('GUIDE_STEP_WAITING.didBecomeFirstResponder');
  },
  
  willLoseFirstResponder: function() {
    console.log('GUIDE_STEP_WAITING.willLoseFirstResponder');
  },
  
  // ..........................................................
  // EVENTS
  //
  
  // add event handlers here
  someAction: function() {
    
  }
  
}) ;
