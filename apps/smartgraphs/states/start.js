// ==========================================================================
// Project:   Smartgraphs.START
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  The transient start state of the Smartgraphs application.

  @extends SC.Responder
  @version 0.1
*/
Smartgraphs.START = SC.Responder.create(
/** @scope Smartgraphs.START.prototype */ {

  /**
    The next state to check if this state does not implement the action.
  */
  nextResponder: null,
  
  didBecomeFirstResponder: function () {
    // with a fixtures-based, single-activity demo, we can just immediately transition to READY.
    // But eventually we will need to have LOADING, LOGIN, etc.
    Smartgraphs.makeFirstResponder(Smartgraphs.READY);
  },
  
  willLoseFirstResponder: function () {
  }
  
  // ..........................................................
  // ACTIONS
  //

}) ;
