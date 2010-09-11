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

  submitButtonShouldBeEnabled: NO,
  
  /**
    Initializes the ActivityStep. Called when we enter ACTIVITY_STEP state.
  */
  begin: function () {

    // setup window pane
    this.setupPanes();
    
    // do the commands
    this.executeCommands(this.get('startCommands'));
    
    // 
    this.setupTriggers();
  
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
  },
  
  
  /**
    Called when the user clicks the 'done' or 'submit' button associated with this step.
        
    Generally this happens in concert with a transition to ACTIVITY_STEP_SUBMITTED. Any 'goto (next) step' commands,
    or any branching to other steps based on the user-submitted response ('answer checking') should be done 
    here, which is to say, in the stepSubmitted block. Step transitions are only allowed during ACTIVITY_STEP_SUBMITTED.
  */
  handleSubmission: function () {
    // TODO
  },
  
  /**
    Clean up any stale controller state. Called when we leave ACTIVITY_STEP_SUBMITTED and/or ACTIVITY itself
  */  
  cleanup: function () {
    console.log('cleaning up');
    var checker = this.get('submissibilityChecker');
    if (checker) checker.stopWatching();
    
    this.set('submissibilityChecker', null);
    checker.destroy();
  },
    
  /**
  */
  setupSubmissibilityChecker: function (args) {
    var checkerInfo = this.get('submissibilityChecker');
    
    if (!checkerInfo) {
      console.error('setupSubmissibilityChecker: no submissibilityChecker record.');
      return NO;
    }
    
    if (!checkerInfo.type) {
      console.error('setupSubmissibilityChecker: no type given');
      return NO;
    }
    
    var klass = SC.objectForPropertyPath(checkerInfo.type);
    
    if (!klass || klass.toString() !== checkerInfo.type) {
      console.error('setupSubmissibilityChecker: type did not resolve to a class');
      return NO;
    }

    var checker = klass.create({
      config: checkerInfo.config
    });
    
    this.set('submissibilityChecker', checker);
    checker.addObserver('value', this, this.evaluateSubmissibility);
    checker.watch();
  },
  
  evaluateSubmissibility: function () {
    var checker = this.get('submissibilityChecker');
    var value = checker.get('value');

    var valueIsValid = Smartgraphs.evaluate(this.get('submissibilityCriterion'), value);
    
    console.log('evaluating "' + value + '" to: ' + (valueIsValid ? 'VALID' : 'NOT VALID'));
    
    if (valueIsValid && !this._valueWasValid) {
      Smartgraphs.sendAction('enableSubmission');
    }
    else if (this._valueWasValid && !valueIsValid) {
      Smartgraphs.sendAction('disableSubmission');
    }
    
    this._valueWasValid = valueIsValid;
  },
  
  /**
  */
  executeCommands: function (invocations) {
    // var invocation, commandRecord, literalArgs, substitutedArgs, args, key;
    // 
    // for (var i = 0, ii = invocations.get('length'); i < ii; i++) {
    //   invocation = invocations.objectAt(i);
    //   commandRecord = invocation.get('command');
    //   
    //   // mixin the literal args first -- args from the specific invocation record override defaults defined in the 
    //   // commandRecord (which is the 'generic' definition of the command)
    //   args = SC.mixin(SC.copy(commandRecord.get('literalArgs')), invocation.get('literalArgs'));
    //   
    //   // mixin the substituted args the same. Need to substitute the actual values of the keys though
    //   substitutedArgs = SC.mixin(SC.copy(commandRecord.get('substitutedArgs')), invocation.get('substitutedArgs'));
    // 
    //   // get the values from the context
    //   for (key in substitutedArgs) {
    //     if (substitutedArgs.hasOwnProperty(key)) {
    //       args[key] = this.lookup(substitutedArgs[key]);
    //     }
    //   }
    // 
    //   // ... and do the action
    //   Smartgraphs.sendAction(commandRecord.get('actionName'), this, args);
    // }
  }
  

  // // return they context variable's value from the activityStep, activityPage, or activity context
  // lookup: function (key) {
  //   var context = this.get('context');
  //   return (context.hasOwnProperty(key) ? context[key] : Smartgraphs.activityPageController.lookup(key));
  // }
  
}) ;
