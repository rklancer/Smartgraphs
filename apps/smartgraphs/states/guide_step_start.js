// ==========================================================================
// Project:   Smartgraphs.GUIDE_STEP_START
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  State representing that the guide step is starting.
  
  @extends SC.Responder
  @version 0.1
*/
Smartgraphs.GUIDE_STEP_START = SC.Responder.create(
/** @scope Smartgraphs.GUIDE_STEP_START.prototype */ {

  nextResponder: Smartgraphs.GUIDE,
  
  didBecomeFirstResponder: function() {
    Smartgraphs.guideStepController.initStep();
  },
  
  willLoseFirstResponder: function() {
  },
  
  // ..........................................................
  // ACTIONS
  //
  
  enableSubmission: function () {
    Smartgraphs.makeFirstResponder(Smartgraphs.GUIDE_STEP_SUBMIT);
    return YES;
  },
  
  /** 
    Transition into the GUIDE_STEP_WAITING state at the start of a GuideStep (this action is not available when 
    the GuideStep is already transitioned to GUIDE_STEP_SUBMIT)
  */
  waitForInput: function () {
    Smartgraphs.makeFirstResponder(Smartgraphs.GUIDE_STEP_WAITING);
    return YES;
  },
  
  finishGuideStep: function () {
    Smartgraphs.makeFirstResponder(Smartgraphs.GUIDE_STEP_DONE);
    return YES;
  }
  
}) ;
