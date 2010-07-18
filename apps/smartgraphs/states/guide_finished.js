// ==========================================================================
// Project:   Smartgraphs.GUIDE_FINISHED
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  State representing that the activity guide is finished. User may want to proceed to another activity, or may want to
  view the lab book/answer sheet/student activity they they have created with the help of this Guide.
  
  @extends SC.Responder
  @version 0.1
*/
Smartgraphs.GUIDE_FINISHED = SC.Responder.create(
/** @scope Smartgraphs.GUIDE_FINISHED.prototype */ {

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
