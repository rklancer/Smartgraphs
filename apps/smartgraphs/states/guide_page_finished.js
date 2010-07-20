// ==========================================================================
// Project:   Smartgraphs.GUIDE_PAGE_FINISHED
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  State representing a finished guide page. The user should be able to proceed to the next guide page from here.

  @extends SC.Responder
  @version 0.1
*/
Smartgraphs.GUIDE_PAGE_FINISHED = SC.Responder.create(
/** @scope Smartgraphs.GUIDE_PAGE_FINISHED.prototype */ {

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
