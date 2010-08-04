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
    Smartgraphs.activityStepController.finish();
    
    if (Smartgraphs.activityStepController.get('isLastStep')) {
      Smartgraphs.makeFirstResponder(Smartgraphs.ACTIVITY_PAGE_DONE);
    }
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
