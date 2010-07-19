// ==========================================================================
// Project:   Smartgraphs.GUIDE
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  Superstate representing that the application is running a Guide or AuthorGuide.
  
  Substates are GUIDE_READY, GUIDE_SUBMIT, GUIDE_END_OF_PAGE, GUIDE_FINISHED, (and SENSOR and PREDICTING?)

  @extends SC.Responder
  @version 0.1
*/
Smartgraphs.GUIDE = SC.Responder.create(
/** @scope Smartgraphs.GUIDE.prototype */ {

  /**
    The next state to check if this state does not implement the action.
  */
  nextResponder: Smartgraphs.START,       // the default; if some other app state implements openGuide() in its own
                                          // special way, presumably that state should set itself as our nextResponder
  
  didBecomeFirstResponder: function() {
    // Called when that application's firstResponder is set to this (Smartgraphs.GUIDE).
    // Opens the guide view and immediately switches to the appropriate substate
    console.log('GUIDE.didBecomeFirstResponder');
    
    Smartgraphs.appWindowController.showGuideView();
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
