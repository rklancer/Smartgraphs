// ==========================================================================
// Project:   Smartgraphs.GUIDE_STEP_DONE
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  State representing that the guide step is starting.
  
  @extends SC.Responder
  @version 0.1
*/

sc_require('states/guide');

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
    Smartgraphs.makeFirstResponder(Smartgraphs.GUIDE_STEP_START);
    Smartgraphs.guidePageController.set('currentStep', step);
    return YES;
  }
  
}) ;
