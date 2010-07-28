// ==========================================================================
// Project:   Smartgraphs.GUIDE_STEP_DONE
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  State representing that the guide step is starting. Transitions immediately to GUIDE_STEP_WAITING
  
  @extends SC.Responder
  @version 0.1
*/
Smartgraphs.GUIDE_STEP_DONE = SC.Responder.create(
/** @scope Smartgraphs.GUIDE_STEP_DONE.prototype */ {

  /**
    The next state to check if this state does not implement the action.
  */
  nextResponder: Smartgraphs.GUIDE,
  
  didBecomeFirstResponder: function() {
    Smartgraphs.guideStepController.finish();
    
    if (Smartgraphs.guideStepController.get('isLastStep')) {
      Smartgraphs.makeFirstResponder(Smartgraphs.GUIDE_PAGE_DONE);
    }
  },
  
  willLoseFirstResponder: function() {
  },
  
  // ..........................................................
  // ACTIONS
  //
  
  openGuideStep: function (context, args) {
    var step = Smartgraphs.store.find(Smartgraphs.GuideStep, args.stepId);
    Smartgraphs.guidePageController.set('currentStep', step);
    Smartgraphs.makeFirstResponder(Smartgraphs.GUIDE_STEP_START);
    return YES;
  }
  
}) ;
