// ==========================================================================
// Project:   Smartgraphs.GUIDE_END_OF_PAGE
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  State representing a finished guide page. The user should be able to proceed to the next guide page from here.

  @extends SC.Responder
  @version 0.1
*/
Smartgraphs.GUIDE_END_OF_PAGE = SC.Responder.create(
/** @scope Smartgraphs.GUIDE_END_OF_PAGE.prototype */ {

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
