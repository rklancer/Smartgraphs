// ==========================================================================
// Project:   Smartgraphs.ACTIVITY_STEP_SUBMIT
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  State representing that the Activity step considers the user input to be acceptable for submission. May transition back
  to ACTIVITY_STEP_WAITING if input becomes no longer submittable; or to ACTIVITY_STEP_START or ACTIVITY_PAGE_FINISHED after 
  submission.

  @extends SC.Responder
  @version 0.1
*/

sc_require('states/activity');

Smartgraphs.ACTIVITY_STEP_SUBMIT = SC.Responder.create(
/** @scope Smartgraphs.ACTIVITY_STEP_SUBMIT.prototype */ {

  nextResponder: Smartgraphs.ACTIVITY,
  
  didBecomeFirstResponder: function() {
    Smartgraphs.activityStepController.set('submitButtonShouldBeEnabled', YES);
  },
  
  willLoseFirstResponder: function() {
    Smartgraphs.activityStepController.set('submitButtonShouldBeEnabled', NO);
  },
  
  // ..........................................................
  // ACTIONS
  //
  
  // TODO make it swap its position in the responder chain with ACTIVITY_STEP_WAITING (in case we're the
  // nextResponder of something like GRAPH_INPUT)
  
  disableSubmission: function () {  
    Smartgraphs.makeFirstResponder(Smartgraphs.ACTIVITY_STEP_WAITING);
    return YES;
  },
  
  finishActivityStep: function () {
    Smartgraphs.makeFirstResponder(Smartgraphs.ACTIVITY_STEP_DONE);
    Smartgraphs.responseTemplateController.set('editingShouldBeEnabled', NO);    
    Smartgraphs.sendAction('fireActivityEvent', this, { eventName: 'responseSubmitted' });
    return YES;
  }
  
}) ;