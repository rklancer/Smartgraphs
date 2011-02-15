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
    YES iff there is content (a response template or before/after text) to put in the 'dialog text' area
  */
  dialogTextHasContent: function () {
    return this.get('beforeText') || this.get('responseTemplate') || this.get('afterText');
  }.property('beforeText', 'responseTemplate', 'afterText').cacheable(),
  
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
    
    if (this._liveExpression) {
      this._liveExpression.die();
    }
  },
  
  /**
    Initializes the ActivityStep. Called when we enter ACTIVITY_STEP state.
  */
  begin: function () {
    this.setupPanes();
    Smartgraphs.responseTemplateController.setTemplate(this.get('responseTemplate'));
    // enableSubmission *before* executing startCommands -- they might disable submission
    Smartgraphs.statechart.sendAction('enableSubmission');
    this.executeCommands(this.get('startCommands'));
    this.setupTriggers();
    this.processSubstitutions(this.get('substitutedExpressions'));
   
    // does the step goes "straight through"?
    if (this.get('shouldFinishImmediately')) {
      Smartgraphs.statechart.sendAction('submitStep');
    }
    else {
      Smartgraphs.statechart.sendAction('waitForResponse');
    }
  },
  
  setupPanes: function () {
    Smartgraphs.statechart.sendAction('setPaneConfig', this, this.get('paneConfig'));
    
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
      Smartgraphs.statechart.sendAction('hidePane', this, pane);
      return;
    }
    
    switch (config.type) {
      case 'graph': 
        Smartgraphs.statechart.sendAction('showGraph', this, { pane: pane, name: config.name });
        return;        
      case 'table':
        Smartgraphs.statechart.sendAction('showTable', this, { pane: pane, datasetName: config.datasetName } );
        return;
      case 'image':
        Smartgraphs.statechart.sendAction('showImage', this, { pane: pane, path: config.path, caption: config.caption });
        return;
    }
  },

  executeCommands: function (commands) {
    if (!commands) return;

    // TODO action 'whitelist'?
    // TODO deal with argument substitution?
    
    var self = this;
    commands.forEach(function (command) {
      Smartgraphs.statechart.sendAction(command.action, self, command.literalArgs);
    });
  },
  
  setupTriggers: function () {
      // TODO!!
  },
  
  processSubstitutions: function (subs) {
    var fmtArgs = [],
        self = this;
        
    if (!subs) return;
    
    // build args for call to fmt method
    subs.forEach( function (sub) {
      // new code path
      if (typeof sub === "string") {
        fmtArgs.push( Smartgraphs.activityObjectsController.findVariable(sub).get('value') );
      }
      else {
        // old code path        
        var inspector = self.makeInspector(sub);
        if (inspector) {
          var value = inspector.inspect();
          fmtArgs.push(value);
        }
      }
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
    var inspectorInfo = this.get('submissibilityInspector');

    if (inspectorInfo) {
      
      if (inspectorInfo.type === "Smartgraphs.DummyInspector") {
        // this will become the main code path once Inspectors are shown the door...
        
        var self = this;
        this._liveExpression = Smartgraphs.evaluator.evaluateLive(this.get('submissibilityCriterion'), function (isSubmissible) {
          var canSubmit = self.get('canSubmit');
          if (isSubmissible && !canSubmit) {
            Smartgraphs.statechart.sendAction('enableSubmission');
          }
          else if (canSubmit && !isSubmissible) {
            Smartgraphs.statechart.sendAction('disableSubmission');
          }
        }).evaluate();
      }
      else {
        // the old code path
        var inspector = this.makeInspector(inspectorInfo);

        if (inspector) {
          this.set('submissibilityInspectorInstance', inspector);
          // if (and only if) we have a valid inspector, it is its job to enable submission
          Smartgraphs.statechart.sendAction('disableSubmission');
          inspector.addObserver('value', this, this.checkSubmissibility);
          inspector.watch();
        }
        else {
          console.error('submissibilityInspector was truthy, but makeInspector could not make an inspector instance.');
        }
      }
    }
  },
  
  checkSubmissibility: function () {
    var value = this.getPath('submissibilityInspectorInstance.value');
    var valueIsValid = Smartgraphs.evaluate(this.get('submissibilityCriterion'), value);
    var canSubmit = this.get('canSubmit');
    
    //console.log('evaluating "' + value + '" to: ' + (valueIsValid ? 'VALID' : 'NOT VALID'));
    
    if (valueIsValid && !canSubmit) {
      Smartgraphs.statechart.sendAction('enableSubmission');
    }
    else if (canSubmit && !valueIsValid) {
      Smartgraphs.statechart.sendAction('disableSubmission');
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
    
    var inspector = this.makeInspector(this.get('responseInspector'));
    if (inspector) {
      var value = inspector.inspect();
      var branch, branches = this.get('responseBranches');
    
      for (var i = 0; i < branches.length; i++) {
        branch = branches[i];
        if (Smartgraphs.evaluate(branch.criterion, value)) {
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
  
  makeInspector: function (inspectorInfo) {
    if (!inspectorInfo || !inspectorInfo.type) {
      return NO;
    }
    
    var klass = SC.objectForPropertyPath(inspectorInfo.type);
        
    if (!klass || !klass.isClass || !SC.kindOf(klass, Smartgraphs.Inspector)) {
      throw "makeInspector was given an non-empty, but invalid, Inspector class name";
    }
    
    return klass.create({
      config: inspectorInfo.config
    });
  }
  
}) ;
