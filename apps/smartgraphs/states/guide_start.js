// ==========================================================================
// Project:   Smartgraphs.GUIDE_START
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  Transient start state of GUIDE set of states.

  @extends SC.Responder
  @version 0.1
*/
Smartgraphs.GUIDE_START = SC.Responder.create(
/** @scope Smartgraphs.GUIDE_START.prototype */ {

  /**
    The next state to check if this state does not implement the action.
  */
  nextResponder: Smartgraphs.GUIDE,
  
  didBecomeFirstResponder: function() {
    console.log('GUIDE_START.didBecomeFirstResponder');
    Smartgraphs.appWindowController.showGuideView();
  },
  
  willLoseFirstResponder: function() {
    console.log('GUIDE_START.willLoseFirstResponder');
  },
  
  // ..........................................................
  // ACTIONS
  //
  
  openFirstGuidePage: function () {
    var firstPage = Smartgraphs.guidePagesController.objectAt(0);
    if (firstPage) {
      firstPage.set('isSelectable', YES);
      Smartgraphs.sendAction('openGuidePage', this, { index: 0 });
    }
    return YES;
  },
  
  openFirstGuideStep: function () {
    Smartgraphs.guidePageController.set('currentStep', Smartgraphs.guidePageController.get('firstStep'));
    Smartgraphs.makeFirstResponder(Smartgraphs.GUIDE_STEP_START);
    return YES;
  }
  
}) ;
