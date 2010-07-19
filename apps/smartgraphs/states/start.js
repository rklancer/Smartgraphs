// ==========================================================================
// Project:   Smartgraphs.START
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  The start state of the Smartgraphs application.

  @extends SC.Responder
  @version 0.1
*/
Smartgraphs.START = SC.Responder.create(
/** @scope Smartgraphs.START.prototype */ {

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
  // ACTIONS
  //
  
  openLearnerGuide: function (context, args) {
    // the default action, unless overridden in some later state, is just to set the current guide in the guide
    // controller and go into the GUIDE state
    
    Smartgraphs.guideController.set('content', Smartgraphs.store.find(Smartgraphs.Guide, 1));
    Smartgraphs.makeFirstResponder(Smartgraphs.GUIDE);
  }
  
  // consider this: lEARNER_HOME might override the openAuthorGuide action, either to disallow it (because a learner
  // is not an author), or to require verification as an author, or to open a special author guide mode designed
  // for 'peer learning' type situations where learners write guides for other learners.
  
}) ;
