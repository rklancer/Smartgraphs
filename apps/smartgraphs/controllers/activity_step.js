// ==========================================================================
// Project:   Smartgraphs.activityStepController
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
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
  
  submissibilityInspectorInstance: null,
  
  /**
    Initializes the ActivityStep. Called when we enter ACTIVITY_STEP state.
  */
  begin: function () {
    
    this.enableSubmission();
    
    // FIXME: this is a hack
    SC.RunLoop.begin();
    Smartgraphs.responseTemplateController.set('content', null);
    SC.RunLoop.end();
    Smartgraphs.responseTemplateController.set('content', this.get('responseTemplate'));
    
    // setup window pane
    this.setupPanes();
    
    this.setupTriggers();

    // do the commands
    this.executeCommands(this.get('startCommands'));
  
    // then, finish the step, or wait
    if (this.get('shouldWaitForSubmissibleResponse')) {
      Smartgraphs.sendAction('waitForResponse');
    }
    else if (this.get('shouldFinishImmediately')) {
      Smartgraphs.sendAction('submitStep');
    }
  },
  
  setupPanes: function () {
    var initialPaneConfig = this.get('initialPaneConfig');
    if (initialPaneConfig === 'single') {
      Smartgraphs.sendAction('showSinglePane');
      this.setupPane('single');
    }
    else if (initialPaneConfig === 'split') {
      Smartgraphs.sendAction('showSplitPane');
      this.setupPane('top');
      this.setupPane('bottom');
    }
  },
  
  setupPane: function (pane) {
    if (pane !== 'single' && pane !== 'top' && pane !== 'bottom') {
      console.error('setupPane: invalid pane "' + pane + '"');
      return;
    }
    
    var graph = this.get(pane + 'Graph');

    if (graph) {
      Smartgraphs.sendAction('showGraph', this, { pane: pane, graphId: graph.get('id') });
    }
    else {
      var imagePath = this.get(pane + 'Image');
      if (imagePath) {
        Smartgraphs.sendAction('showImage', this, { pane: pane, path: imagePath });
      }
    }
  },

  setupTriggers: function () {
      // TODO!!
  },
  
  
  /**
    Called when the user clicks the 'done' or 'submit' button associated with this step.
        
    Generally this happens in concert with a transition to ACTIVITY_STEP_SUBMITTED. Any 'goto (next) step' commands,
    or any branching to other steps based on the user-submitted response ('answer checking') should be done 
    here. Step transitions are only allowed during ACTIVITY_STEP_SUBMITTED.
    
    Loops in order through the responseBranches associated with this step, evaluates the 'criterion' property of each 
    in turn (passing in the return value of the responseInspector) and jumps to the step associated with the first 
    branch whose 'criterion' evaluates to YES.
    
    If there are no Reactions or none evaluate to YES, jumps to the defaultBranch, if any.
    
    Does nothing if no Reactions evaluate to YES and there is no defaultBranch. In this case, it is considered
    an error if the 'isFinalStep' property is NO.
  */
  handleSubmission: function () {
    var inspector = this.makeInspector('responseInspector');

    if (inspector) {
      var value = inspector.inspect();
    
      var branch, branches = this.get('responseBranches');
    
      for (var i = 0, ii = branches.get('length'); i < ii; i++) {
        branch = branches.objectAt(i);
        if (Smartgraphs.evaluate(branch.criterion, value)) {
          Smartgraphs.sendAction('gotoStep', this, { stepId: branch.step });
          return;
        }
      }
    }
    
    var defaultBranch = this.get('defaultBranch');
    
    if (defaultBranch) {
      Smartgraphs.sendAction('gotoStep', this, { stepId: defaultBranch.get('id') });
    }
  },
  
  /**
    Clean up any stale controller state. Called when we leave ACTIVITY_STEP_SUBMITTED and/or ACTIVITY itself
  */  
  cleanup: function () {
    console.log('cleaning up');
    var inspector = this.get('submissibilityInspectorInstance');
    if (inspector) {
      inspector.stopWatching();
      inspector.removeObserver('value', this, this.checkSubmissibility);      
      inspector.destroy();
    }
    this.set('submissibilityInspectorInstance', null);
  },
  
  waitForResponse: function () {
    if (!this.get('submissibilityInspector')) {
      this.enableSubmission();
    }
    else {
      this.disableSubmission();
      this.setupSubmissibilityInspector();
    }
  },
  
  setupSubmissibilityInspector: function () {
    if (!this.get('submissibilityInspector')) {
      this.enableSubmission();
      return;
    }
    
    var inspector = this.makeInspector('submissibilityInspector');
    
    if (!inspector) {
      console.error('setupSubmissibilityInspector was called, but makeInspector could not make an inspector instance.');
      return;
    }
    
    this.set('submissibilityInspectorInstance', inspector);
    inspector.addObserver('value', this, this.checkSubmissibility);
    inspector.watch();
  },
  
  makeInspector: function (inspectorProperty) {
    var inspectorInfo = this.get(inspectorProperty);
    
    if (!inspectorInfo) {
      return NO;
    }
    
    if (!inspectorInfo.type) {
      return NO;
    }
    
    var klass = SC.objectForPropertyPath(inspectorInfo.type);
    
    if (!klass || klass.toString() !== inspectorInfo.type) {
      return NO;
    }
    
    return klass.create({
      config: inspectorInfo.config
    });
  },
  
  checkSubmissibility: function () {
    var inspector = this.get('submissibilityInspectorInstance');
    var value = inspector.get('value');

    var valueIsValid = Smartgraphs.evaluate(this.get('submissibilityCriterion'), value);
    
    console.log('evaluating "' + value + '" to: ' + (valueIsValid ? 'VALID' : 'NOT VALID'));
    
    if (valueIsValid && !this._valueWasValid) {
      this.enableSubmission();
    }
    else if (this._valueWasValid && !valueIsValid) {
      this.disableSubmission();
    }
    
    this._valueWasValid = valueIsValid;
  },
  
  /**
  */
  executeCommands: function (commands) {
    // 'commands' is a hash, not an SC.Object
    var command;
    for (var i = 0, ii = commands.length; i < ii; i++) {
      command = commands[i];
      // TODO action 'whitelist'?
      // TODO deal with argument substitution?
      Smartgraphs.sendAction(command.action, this, command.literalArgs);
    }
  },
  
  enableSubmission: function () {
    this.set('canSubmit', YES);
  },
  
  disableSubmission: function () {
    this.set('canSubmit', NO);    
  }
  
}) ;
