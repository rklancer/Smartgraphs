// ==========================================================================
// Project:   Smartgraphs.GUIDE_PAGE_START
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  State representing that the guide page is starting. Transitions to GUIDE_STEP_START
  
  @extends SC.Responder
  @version 0.1
*/
Smartgraphs.GUIDE_PAGE_START = SC.Responder.create(
/** @scope Smartgraphs.GUIDE_PAGE_START.prototype */ {

  nextResponder: Smartgraphs.GUIDE,
  
  didBecomeFirstResponder: function() {
  },
  
  willLoseFirstResponder: function() {
  },
  
  // ..........................................................
  // ACTIONS
  //
  
  beginFirstGuideStep: function () {
    Smartgraphs.guidePageController.set('currentStep', Smartgraphs.guidePageController.get('firstStep'));
    Smartgraphs.makeFirstResponder(Smartgraphs.GUIDE_STEP_START);
    return YES;
  }
  
}) ;
