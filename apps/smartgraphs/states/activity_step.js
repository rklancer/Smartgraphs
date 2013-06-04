// ==========================================================================
// Project:   Smartgraphs.ACTIVITY_STEP
// Copyright: ©2010 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  State representing that an ActivityStep is currently active and has not yet been submitted.

  This state defines most of the commands available to an activity author.

  @extends SC.State
  @version 0.1
*/

Smartgraphs.ACTIVITY_STEP = SC.State.extend(
/** @scope Smartgraphs.ACTIVITY_STEP.prototype */ {

  enterState: function() {
    // We haven't completed entering the state at this point, so wait until we enter the state
    this.invokeLast(this.didEnterState);
  },

  didEnterState: function () {
    Smartgraphs.activityStepController.begin();
  },

  exitState: function () {
    Smartgraphs.responseTemplateController.set('editingShouldBeEnabled', NO);
  },

  initialSubstate: 'ACTIVITY_STEP_DEFAULT',


  // Q: Is it really always necessary to enter one substate or the other?
  ACTIVITY_STEP_DEFAULT: SC.State.design(),


  SENSOR_TOOL: SC.State.plugin('Smartgraphs.SENSOR_TOOL'),


  TAGGING_TOOL: SC.State.plugin('Smartgraphs.TAGGING_TOOL'),


  // ..........................................................
  // ACTIONS
  //

  /**
    Disable submission of the ActivityStep. After this action, the submitStep action (triggered by clicking 'submit'
    or 'OK') will not succeed until the enableSubmission action is performed.
  */
  disableSubmission: function () {
    Smartgraphs.activityStepController.disableSubmission();
    return YES;
  },

  /**
    Enable submission of the ActivityStep. After this action, the submitStep action will be able to proceed.
  */
  enableSubmission: function () {
    Smartgraphs.activityStepController.enableSubmission();
    return YES;
  },

  /**
    If submission is enabled, transitions to the ACTIVITY_STEP_SUBMITTED state. Otherwise, does nothing.

    The transition to the ACTIVITY_STEP_SUBMITTED results in the execution of the 'afterSubmissionCommands' specified
    by the current ACTIVITY_STEP and then either branches to the next step or ends the ActivityPage.
  */
  submitStep: function () {
    if (Smartgraphs.activityStepController.get('canSubmit')) {
      this.gotoState('ACTIVITY_STEP_SUBMITTED');
    }
    return YES;
  },

  /**
    Submits the current ActivityStep and opens the next ActivityPage. Note that this action will fail if the current
    step is not in the submissible state.

    Once the step has been submitted, if the current step is not a terminal step (i.e., has isFinalStep == NO), the
    action will fail and the system will remain in the ACTIVITY_STEP_SUBMITTED state.
  */
  gotoNextPage: function () {
    this.submitStep();
    this.invokeLast(function () {
      Smartgraphs.statechart.sendAction('gotoNextPage');
    });
  },

  /**
    Notify the table controllers that a tag was updated so they can update their indices of recently-tagged points.
  */
  taggingToolDidUpdateTag: function (context, args) {
    Smartgraphs.sendActionToTableControllers('taggingToolDidUpdateTag', context, args);
    return YES;
  }

});
