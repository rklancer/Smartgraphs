// ==========================================================================
// Project:   Smartgraphs.activityStepController
// Copyright: ©2010 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// Author:    Eric Kattwinkel
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/

Smartgraphs.activityStepController = SC.ObjectController.create(
/** @scope Smartgraphs.activityStepController.prototype */ {

  canSubmit: NO,
  showSubmitButton: NO,
  submissibilitySubject: null,

  /**
    YES iff there is content (a response template or before/after text) to put in the 'dialog text' area
  */
  dialogTextHasContent: function () {
    return this.get('beforeText') || this.get('responseTemplate') || this.get('afterText');
  }.property('beforeText', 'responseTemplate', 'afterText').cacheable(),

  /**
    Clean up any stale controller state. Called when we leave ACTIVITY_STEP_SUBMITTED and/or ACTIVITY itself
  */
  cleanup: function () {
    if (this._liveExpression) {
      this._liveExpression.die();
    }
    this.set('submissibilitySubject', null);
  },

  /**
    Initializes the ActivityStep. Called when we enter ACTIVITY_STEP state.
  */
  begin: function () {
    this.setupPanes();
    Smartgraphs.responseTemplateController.setTemplate(this.get('responseTemplate'));
    // enableSubmission *before* executing startCommands -- they might disable submission
    Smartgraphs.statechart.sendAction('enableSubmission');

    this.startTools();
    this.executeCommands(this.get('startCommands'));
    this.processSubstitutions(this.get('substitutedExpressions'));

    // Submit GA step change event:
    Smartgraphs.sendGaEvent('Step Change', "(" + this.get('url') + ")");

    // See if this is a terminal step and do last-step tasks if needed
    if (Smartgraphs.activityPagesController.isLastPage() && this.get('isTerminalStep')) { // Test for is-this-last-step
        // Submit GA activity completed event if relevant
        Smartgraphs.sendGaEvent('Activity Completed', Smartgraphs.activityController.get('title'));
        // Turn off the back/reload handler
        window.onbeforeunload = function () { return null; };
    }

    // does the step goes "straight through"?
    if (this.get('shouldFinishImmediately')) {
      Smartgraphs.statechart.sendAction('submitStep');
    }
    else {
      this.waitForResponse();
    }
  },

  setupPanes: function () {
    Smartgraphs.activityViewController.setPaneConfig(this.get('paneConfig'));

    var panes = this.get('panes');
    for (var key in panes) {
      if ( !panes.hasOwnProperty(key) ) continue;
      this.setupPane(key, panes[key]);
    }
  },

  setupPane: function (pane, config) {
    var allAnnotations = (config.annotations || []).concat(config.highlightedAnnotations || []);

    this._setAnnotationHighlights(config.annotations, config.highlightedAnnotations);

    pane = Smartgraphs.activityViewController.validPaneFor(pane);
    if (!pane) return;

    if (config === null) {
      Smartgraphs.activityViewController.hidePane(pane);
      return;
    }

    switch (config.type) {
      case 'graph':
        Smartgraphs.activityViewController.showGraph(pane, {
          title: config.title,
          xAxis: config.xAxis,
          yAxis: config.yAxis,
          data: config.data,
          datarefs: (config.datarefs === undefined) ? false : config.datarefs,
          annotations: allAnnotations,
          showCrossHairs: (config.showCrossHairs === undefined) ? false : config.showCrossHairs,
          showGraphGrid: (config.showGraphGrid === undefined) ? false : config.showGraphGrid,
          showToolTipCoords : (config.showToolTipCoords === undefined) ? false : config.showToolTipCoords,
          activeDatadefs: (config.activeDatadefs === undefined) ? [] : config.activeDatadefs,
          legends: config.legends
        });
        return;
      case 'table':
        Smartgraphs.activityViewController.showTable(pane, {
          data: config.data,
          annotations: allAnnotations,
          xLabel: config.xLabel,
          yLabel: config.yLabel
        });
        return;
      case 'image':
        Smartgraphs.activityViewController.showImage(pane, config.path, config.caption);
        return;
    }
  },

  _setAnnotationHighlights: function (annotationNames, highlightedAnnotationNames) {
    annotationNames = annotationNames || [];
    highlightedAnnotationNames = highlightedAnnotationNames || [];

    annotationNames.forEach( function (name) {
      var annotation = Smartgraphs.activityObjectsController.findAnnotation(name);
      if (annotation) annotation.set('isHighlighted', NO);
    });

    highlightedAnnotationNames.forEach( function (name) {
      var annotation = Smartgraphs.activityObjectsController.findAnnotation(name);
      if (annotation) annotation.set('isHighlighted', YES);
    });
  },

  startTools: function () {
    var tools = this.get('tools') || [];
    tools.forEach( function (toolSpec) {
      Smartgraphs.Tool.start(toolSpec.name, toolSpec.setup);
    });
  },

  executeCommands: function (commands) {
    if (!commands) return;

    commands.forEach(function (command) {
      Smartgraphs.executor.execute(command.name, command.args);
    });
  },

  /** sets variables in the global context */
  setVariables: function (assignments) {
    assignments = assignments || [];
    assignments.forEach( function (assignment) {
      var value = Smartgraphs.activityPageController.getFromContext(assignment.value);

      if (value === undefined) value = Smartgraphs.evaluator.evaluate(assignment.value);
      Smartgraphs.activityObjectsController.setVariable(assignment.name, value);
    });
  },

  processSubstitutions: function (subs) {
    var fmtArgs = [],
        self = this;

    if (!subs) return;

    // build args for call to fmt method
    subs.forEach( function (sub) {
      fmtArgs.push( Smartgraphs.activityPageController.getFromContext(sub) );
    });

    // better yet, make beforeText & afterText computed properties
    var beforeText = this.get('beforeText');
    if (beforeText) {
      this.set('beforeText', beforeText.fmt.apply(beforeText, fmtArgs));
    }

    var afterText = this.get('afterText');
    if (afterText) {
      this.set('afterText', afterText.fmt.apply(afterText, fmtArgs));
    }
  },

  enableSubmission: function () {
    this.set('canSubmit', YES);
  },

  disableSubmission: function () {
    this.set('canSubmit', NO);
  },

  waitForResponse: function () {
    var subjectExpr = this.get('submissibilityDependsOn'),
        criterion   = this.get('submissibilityCriterion');

    Smartgraphs.responseTemplateController.set('editingShouldBeEnabled', YES);

    if (subjectExpr) this.set('submissibilitySubject', Smartgraphs.evaluator.evaluate(subjectExpr));

    if (criterion) {
      var self = this;
      this._liveExpression = Smartgraphs.evaluator.evaluateLive(criterion, function (isSubmissible) {
        var canSubmit = self.get('canSubmit');
        if (isSubmissible && !canSubmit) {
          Smartgraphs.statechart.sendAction('enableSubmission');
        }
        else if (canSubmit && !isSubmissible) {
          Smartgraphs.statechart.sendAction('disableSubmission');
        }
      }).evaluate();
    }
  },

  /**
    Called when the user clicks the 'done' or 'submit' button associated with this step.

    Generally this happens in concert with a transition to ACTIVITY_STEP_SUBMITTED. Any 'goto (next) step' commands,
    or any branching to other steps based on the user-submitted response ('answer checking') should be done
    here. Step transitions are only allowed during ACTIVITY_STEP_SUBMITTED.

    Loops in order through the responseBranches associated with this step, evaluates the 'criterion' property of each
    in turn and jumps to the step associated with the first branch whose 'criterion' evaluates to YES.

    If there are no responseBranches or none have criteria that evaluate to YES, jumps to the defaultBranch, if any.

    Does nothing if no responseBranch criteria evaluate to YES and there is no defaultBranch. In this case, it is
    considered an error if the 'isFinalStep' property is NO.
  */
  handleSubmission: function () {
    if ( !this.get('canSubmit') ) return NO;

    var branches = this.get('responseBranches'),
        branch,
        i;

    this.executeCommands(this.get('afterSubmissionCommands'));
    this.setVariables(this.get('variableAssignments'));

    if (branches && branches.length > 0) {
      for (i = 0; i < branches.length; i++) {
        branch = branches[i];
        if (Smartgraphs.evaluator.evaluate(branch.criterion)) {
          Smartgraphs.statechart.sendAction('gotoStep', this, { stepId: branch.step });
          return;
        }
      }
    }

    var defaultBranch = this.get('defaultBranch');

    if (defaultBranch) {
      Smartgraphs.statechart.sendAction('gotoStep', this, { stepId: defaultBranch.get('id') });
    }
  },

  /**
    Calculates when the current step is the last step of an activity.

    Although the 'isFinalStep' attribute would seem to do this for us, it is used to activate the 'Next page'
    button immediately, so in an actual terminal step it is often left out (i.e. isFinalStep is null or undefined).
    Instead, we look for the absence of submissibilityCriterion, defaultBranch, and responseBranches - if they're
    all null, there isn't anywhere to go.
  */
  isTerminalStep: function () {
      if ((!this.get('submissibilityCriterion') || this.get('isFinalStep')) && !this.get('defaultBranch') && !this.get('responseBranches')) {
          return true;
      } else {
          return false;
      }
  }.property('submissibilityCriterion', 'defaultBranch', 'responseBranches').cacheable()

}) ;
