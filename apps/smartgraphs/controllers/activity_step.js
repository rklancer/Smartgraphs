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
    Clean up any stale controller state. Called when we leave ACTIVITY_STEP_SUBMITTED and/or ACTIVITY itself
  */  
  cleanup: function () {
    var inspector = this.get('submissibilityInspectorInstance');
    if (inspector) {
      inspector.stopWatching();
      inspector.removeObserver('value', this, this.checkSubmissibility);
      inspector.destroy();
    }
    this.set('submissibilityInspectorInstance', null);
  },
  
  /**
    Initializes the ActivityStep. Called when we enter ACTIVITY_STEP state.
  */
  begin: function () {
    this.setupPanes();
    Smartgraphs.responseTemplateController.setTemplate(this.get('responseTemplate'));
    // enableSubmission *before* executing startCommands -- they might disable submission
    this.enableSubmission();
    this.executeCommands(this.get('startCommands'));
    this.setupTriggers();
  
    // does the step goes "straight through"?
    if (this.get('shouldFinishImmediately')) {
      Smartgraphs.sendAction('submitStep');
    }
    else {
      Smartgraphs.sendAction('waitForResponse');
    }
  },
  
  setupPanes: function () {
    Smartgraphs.sendAction('setPaneConfig', this, this.get('paneConfig'));
    
    var panes = this.get('panes');
    for (var key in panes) {
      if ( !panes.hasOwnProperty(key) ) continue;
      this.setupPane(key, panes[key]);
    }
  },
  
  setupPane: function (pane, config) {
    pane = Smartgraphs.activityViewController.validPaneFor(pane);
    if (!pane) return;
    
    if (config === null) {
      Smartgraphs.sendAction('hidePane', this, pane);
      return;
    }
    
    switch (config.type) {
      case 'graph': 
        Smartgraphs.sendAction('showGraph', this, { pane: pane, name: config.name });
        return;        
      case 'table':
        Smartgraphs.sendAction('showTable', this, { pane: pane, datasetName: config.datasetName } );
        return;
      case 'image':
        Smartgraphs.sendAction('showImage', this, { pane: pane, path: config.path });
        return;
    }
  },

  executeCommands: function (commands) {
    if (!commands) return;

    // TODO action 'whitelist'?
    // TODO deal with argument substitution?
    
    var self = this;
    commands.forEach(function (command) {
      Smartgraphs.sendAction(command.action, self, command.literalArgs);
    });
  },
  
  setupTriggers: function () {
      // TODO!!
  },
  
  enableSubmission: function () {
    this.set('canSubmit', YES);
  },
  
  disableSubmission: function () {
    this.set('canSubmit', NO);    
  },
  
  waitForResponse: function () {
    if (this.get('submissibilityInspector')) {
      this.disableSubmission();
      this.setupSubmissibilityInspector();
    }
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
    if ( !this.get('canSubmit') ) return NO;
    
    this.executeCommands(this.get('afterSubmissionCommands'));
    
    var inspector = this.makeInspector('responseInspector');
    if (inspector) {
      var value = inspector.inspect();
      var branch, branches = this.get('responseBranches');
    
      for (var i = 0; i < branches.length; i++) {
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
  
  setupSubmissibilityInspector: function () {
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
    
    if (!inspectorInfo || !inspectorInfo.type) {
      return NO;
    }
    
    var klass = SC.objectForPropertyPath(inspectorInfo.type);
    
    if (!klass || !klass.isClass) {
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
    var canSubmit = this.get('canSubmit');
    
    //console.log('evaluating "' + value + '" to: ' + (valueIsValid ? 'VALID' : 'NOT VALID'));
    
    if (valueIsValid && !canSubmit) {
      this.enableSubmission();
    }
    else if (canSubmit && !valueIsValid) {
      this.disableSubmission();
    }
  }
  
}) ;
