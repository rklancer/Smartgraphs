// ==========================================================================
// Project:   Smartgraphs.LEARNER_HOME
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  Start state for the lab book view of a given activity.

  @extends SC.Responder
  @version 0.1
*/
Smartgraphs.LEARNER_HOME = SC.Responder.create(
/** @scope Smartgraphs.LEARNER_HOME.prototype */ {

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
