// ==========================================================================
// Project:   Smartgraphs.GUIDE_STEP_SUBMIT
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  State representing that the Guide step considers the user input to be acceptable for submission. May transition back
  to GUIDE_STEP_WAITING if input becomes no longer submittable; or to GUIDE_STEP_START or GUIDE_PAGE_FINISHED after 
  submission.

  @extends SC.Responder
  @version 0.1
*/
Smartgraphs.GUIDE_STEP_SUBMIT = SC.Responder.create(
/** @scope Smartgraphs.GUIDE_STEP_SUBMIT.prototype */ {

  nextResponder: Smartgraphs.GUIDE,
  
  didBecomeFirstResponder: function() {
    Smartgraphs.guideStepController.set('submitButtonShouldBeEnabled', YES);
  },
  
  willLoseFirstResponder: function() {
  },
  
  // ..........................................................
  // ACTIONS
  //
  
  disableSubmission: function () {  
    Smartgraphs.makeFirstResponder(Smartgraphs.GUIDE_STEP_WAITING);
    return YES;
  },
  
  finishGuideStep: function () {
    Smartgraphs.makeFirstResponder(Smartgraphs.GUIDE_STEP_DONE);
    return YES;
  }
  
}) ;
