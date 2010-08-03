// ==========================================================================
// Project:   Smartgraphs.ACTIVITY_STEP_DONE
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  State representing that the activity step is starting.
  
  @extends SC.Responder
  @version 0.1
*/

sc_require('states/activity');

Smartgraphs.ACTIVITY_STEP_DONE = SC.Responder.create(
/** @scope Smartgraphs.ACTIVITY_STEP_DONE.prototype */ {

  /**
    The next state to check if this state does not implement the action.
  */
  nextResponder: Smartgraphs.ACTIVITY,
  
  didBecomeFirstResponder: function() {
    Smartgraphs.activityStepController.finish();
    
    if (Smartgraphs.activityStepController.get('isLastStep')) {
      Smartgraphs.makeFirstResponder(Smartgraphs.ACTIVITY_PAGE_DONE);
    }
  },
  
  willLoseFirstResponder: function() {
  },
  
  // ..........................................................
  // ACTIONS
  //
  
  openActivityStep: function (context, args) {
    var step = Smartgraphs.store.find(Smartgraphs.ActivityStep, args.stepId);
    Smartgraphs.makeFirstResponder(Smartgraphs.ACTIVITY_STEP_START);
    Smartgraphs.activityPageController.set('currentStep', step);
    return YES;
  }
  
}) ;
