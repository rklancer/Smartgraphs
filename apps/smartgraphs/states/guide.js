// ==========================================================================
// Project:   Smartgraphs.GUIDE
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  Superstate representing that the application is running a LearnerGuide or AuthorGuide.
  
  Substates are GUIDE_READY, GUIDE_SUBMIT, GUIDE_END_OF_PAGE, GUIDE_FINISHED, (and SENSOR and PREDICTING?)

  @extends SC.Responder
  @version 0.1
*/
Smartgraphs.GUIDE = SC.Responder.create(
/** @scope Smartgraphs.GUIDE.prototype */ {

  /**
    The next state to check if this state does not implement the action.
  */
  nextResponder: null,
  
  didBecomeFirstResponder: function() {
    // Called when that application's firstResponder is set to this (Smartgraphs.GUIDE).
    // Opens the guide view and immediately switches to the appropriate substate
    console.log('GUIDE.didBecomeFirstResponder');
    
    Smartgraphs.appController.openGuideView();      // does it make any sense to make this an action?
    Smartgraphs.makeFirstResponder(Smartgraphs.GUIDE_READY);
  },
  
  willLoseFirstResponder: function() {
    console.log('GUIDE.willLoseFirstResponder');
  },
  
  // ..........................................................
  // EVENTS
  //
  
  // add event handlers here
  someAction: function() {
  }
  
}) ;
