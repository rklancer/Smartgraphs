// ==========================================================================
// Project:   Smartgraphs.ACTIVITY_STEP_DONE
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class
  
  @extends SC.Responder
  @version 0.1
*/

sc_require('states/activity');

Smartgraphs.ACTIVITY_STEP_DONE = SC.Responder.create(
/** @scope Smartgraphs.ACTIVITY_STEP_DONE.prototype */ {

  nextResponder: Smartgraphs.ACTIVITY,
  
  didBecomeFirstResponder: function() {
    var wasLastStep = Smartgraphs.activityStepController.get('isLastStep');
    Smartgraphs.activityStepController.finish();    // finish() may change activityStepController's content
    Smartgraphs.activityStepController.cleanup();
    if (wasLastStep) Smartgraphs.makeFirstResponder(Smartgraphs.ACTIVITY_PAGE_DONE);
  },
  
  // ..........................................................
  // ACTIONS
  //
  
  openActivityStep: function (context, args) {
    var step = Smartgraphs.store.find(Smartgraphs.ActivityStep, args.stepId);
    Smartgraphs.activityPageController.set('currentStep', step);
    Smartgraphs.makeFirstResponder(Smartgraphs.ACTIVITY_LOADING_STEP);    
    return YES;
  }
  
}) ;
