// ==========================================================================
// Project:   Smartgraphs.ACTIVITY_STEP
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
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
  
  
  SENSOR: SC.State.plugin('Smartgraphs.SENSOR'),
  
  
  FREEHAND_INPUT: SC.State.plugin('Smartgraphs.FREEHAND_INPUT'),
  
  
  INTERACTIVE_SELECTION: SC.State.plugin('Smartgraphs.INTERACTIVE_SELECTION'),
  
  
  // ..........................................................
  // ACTIONS
  // 
  
  /**
    Sets the configuration of the panes on the right-hand side. Options are "single" or "split".
    
    This configuration affects the 'pane' parameters of further commands in the following way. If the current pane
    configuration is 'single', the only valid 'pane' value is 'single'. If the pane configuration is split,
    the value of 'pane' can be 'top' or 'bottom'.
    
    @param context
    @param args
    
    @param {String} args.pane
      The desired pane configuration. If "single", a single pane will be shown on the right. If "split", the right
      side will be split into equally-sized top and bottom panes.
  */
  setPaneConfig: function (context, args) {
    Smartgraphs.activityViewController.setPaneConfig(args);
    return YES;
  },
  
  /**
    Make the referenced pane display an empty view.
    
    @param context
    @param args
    
    @param {String} args.pane
      The pane to be hidden. Valid values are 'single', 'top', or 'bottom'. 
  */
  hidePane: function (context, args) {
    Smartgraphs.activityViewController.hidePane(args);
    return YES;
  },

  /**
    Show an image in the referenced pane.
  
    @param context
    @param args
    
    @param {String} args.pane
      The pane in which to show the image. Valid values are 'single', 'top', or 'bottom'.
    
    @param {String} args.path
      The url at which to find the image.
  */
  showImage: function (context, args) {
    return Smartgraphs.activityViewController.showImage(args.pane, args.path, args.caption);
  },
  
  /**
    Show a graph in the specified pane.
    
    @param context  
    @param args
    
    @param {String} args.pane
      The pane in which to show the graph. Valid values are 'single', 'top', or 'bottom'.
    
    @param {String} args.name
      The name of the graph to show. A graph with this name must be defined elsewhere in the activity.
  */
  showGraph: function (context, args) {
    Smartgraphs.activityViewController.showGraph(args.pane, args.name);
    return YES;
  },
  
  /**
    Show a table in the specified pane corresponding to the dataset with the specified name.

    When data is streamed into the dataset (for example, from the sensor applet) the table will switch to 'numeric
    display' mode, showing the values of the latest incoming datapoint in large type. When streaming stops, it will
    automatically display the new data in a table form.
    
    @param context
    @param args
    
    @param {String} args.pane
      The pane in which to show the table. In practice, valid values are 'top', or 'bottom' because a graph must be
      open while the table is showing.
    
    @param {String} args.datasetName
      The name of the Dataset to be displayed in the table.
    @param {String[]} [args.annotations]
      Optional list of names of annotations to add to the table when it is opened
  */
  showTable: function (context, args) {
    Smartgraphs.activityViewController.showTable(args.pane, args.dataset, args.annotations);  
  },
  
  /**
    Wait for the user to enter a response before progressing to the 'submitted' state.
    
    This command enables editing of the responseTemplate, if there is one.
    
    This command executes automatically when an ActivityStep is loaded unless its 'shouldFinishImmediately' property
    is true.
  */
  waitForResponse: function (context, args) {
    Smartgraphs.activityStepController.waitForResponse();
    Smartgraphs.responseTemplateController.set('editingShouldBeEnabled', YES);
    return YES;
  },
  
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
  }
  
});
