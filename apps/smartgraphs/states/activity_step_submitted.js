// ==========================================================================
// Project:   Smartgraphs.ACTIVITY_STEP_SUBMITTED
// Copyright: ©2010 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  State representing that the currently open ActivityStep has been submitted.

  In this state, the user's response is processed and evaluated, and the system may branch to a new step. (Transitions
  between steps are not allowed in other states.)

  A step's 'afterSubmissionCommands' are executed upon entry to this state, and then the activityStepController
  examines the user's response and issues a gotoStep command appropriately.

  If no step is branched to while the activityStepController processes the user's response, the 'isFinalStep' property
  is examined to determine if the current step is intended to be a terminal step. If this step is a terminal step in
  the page, the system transitions to the ACTIVITY_PAGE_DONE state. If this step is not intended to be a terminal
  step and no step has been branched to, it is considered an error.

  @extends SC.State
  @version 0.1
*/

Smartgraphs.ACTIVITY_STEP_SUBMITTED = SC.State.extend(
/** @scope Smartgraphs.ACTIVITY_STEP_SUBMITTED.prototype */ {

  enterState: function () {
    var oldStep = Smartgraphs.activityStepController.get('content');
    Smartgraphs.activityStepController.handleSubmission();

    // if we didn't change steps after submission completed, then there must be no more steps for this page.
    // note: using invokeLast allows handleSubmission execution to complete before the state change
    var newStep = Smartgraphs.activityStepController.get('content');
    if (newStep === oldStep && oldStep && oldStep.get('isFinalStep')) {
      var self = this;
      this.invokeLast(function () {
        self.gotoState('ACTIVITY_PAGE_DONE');
      });
    }
  },

  exitState: function () {
    Smartgraphs.activityStepController.cleanup();
  },

  // ..........................................................
  // ACTIONS
  //

  /**
    Branch to the specified step. Transitions to the ACTIVITY_STEP_LOADING state after setting the
    activityStepController's content to the new ActivityStep.

    Generally this command is called by the activityStepController when it processes the ResponseBranches and
    defaultBranch property of the current step.

    @param context
    @param args

    @param {String} args.stepId
      The id (url) of the ActivityStep to branch to
  */
  gotoStep: function (context, args) {
    var step = Smartgraphs.store.find(Smartgraphs.ActivityStep, args.stepId);
    Smartgraphs.activityStepController.set('content', step);
    this.gotoState('ACTIVITY_STEP');
    return YES;
  }

}) ;
