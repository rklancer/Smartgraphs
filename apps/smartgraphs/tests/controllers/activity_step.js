// ==========================================================================
// Project:   Smartgraphs.activityStepController Unit Test
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs module test ok equals same stop start */

var step;
var oldMI, oldSA, oldEC;

module("Smartgraphs.activityStepController", {
  setup: function () {
    step = SC.Object.create({
    });
    Smartgraphs.activityStepController.set('content', step);
    oldMI = Smartgraphs.activityStepController.makeInspector;
    oldSA = Smartgraphs.sendAction;
    oldEC = Smartgraphs.activityStepController.executeCommands;
  },
  
  teardown: function () {
    Smartgraphs.activityStepController.makeInspector = oldMI;
    Smartgraphs.sendAction = oldSA;
    Smartgraphs.activityStepController.executeCommands = oldEC;
  }
});


test("makeInspector method should return an inspector instance corresponding to the classname in the inspector info", function () {
  step.submissibilityInspector = {
    type: 'Smartgraphs.FirstResponseFieldInspector'
  };
  
  var inspector = Smartgraphs.activityStepController.makeInspector('submissibilityInspector');
  ok(SC.kindOf(inspector, Smartgraphs.FirstResponseFieldInspector), 'makeInspector should return a valid FirstResponseFieldInspector instance');
});


test("executeCommands should ignore a falsy list of commands", function () {
  var callCount = 0;
  Smartgraphs.sendAction = function () {
    callCount++;
  };
  
  Smartgraphs.activityStepController.executeCommands();
  Smartgraphs.activityStepController.executeCommands([]);
  Smartgraphs.activityStepController.executeCommands(null);
  
  equals(callCount, 0, "activityStepController.executeCommands correctly refused to call sendAction and did not error out after being passed falsy arguments.");
});


test("executeCommands should cause the appropriate actions to be sent", function () {
  var actions = [];
  var contexts = [];
  var argLists = [];
  
  Smartgraphs.sendAction = function (action, context, argList) {
    actions.push(action);
    contexts.push(context);
    argLists.push(argList);
  };
  
  var commands = [
    {
      "action": "command1",
      "literalArgs": {
        "arg1": "val1",
        "arg2": "val2"
      }
    },
    {
      "action": "command2",
      "literalArgs": {
        "arg1": "val1"
      }
    }
  ];
  Smartgraphs.activityStepController.executeCommands(commands);
  
  same(actions, ["command1", "command2"], "sendAction should have been invoked with action 'command1' then 'command2'");
  var that = Smartgraphs.activityStepController;
  same(contexts, [that, that], "sendAction should have been invoked with context == Smartgraphs.activityStepController, both times");
  same(argLists[0], { "arg1": "val1", "arg2": "val2"}, "sendAction should have been passed action args {'arg1': 'val1', 'arg2': 'val2'} in the first invocation"); 
  same(argLists[1], { "arg1": "val1" }, "sendAction should have been passed action args {'arg1': 'val1'} in the second invocation");
});


test("handleSubmission should do nothing if disableSubmission was called", function () {
  var makeInspectorWasCalled = NO;
  Smartgraphs.activityStepController.makeInspector = function () {
    makeInspectorWasCalled = YES;
  };
  
  // disable submission...
  Smartgraphs.activityStepController.disableSubmission();
  
  // and check that handleSubmission is rejected
  Smartgraphs.activityStepController.handleSubmission();
  ok(makeInspectorWasCalled === NO, "after handleSubmission preceded by disableSubmission(), makeInspector() should not have been called.");
});


test("after enableSubmission, handleSubmission should call make the appropriate inspector and ask it to inspect", function () {
  step.responseBranches = [];
  
  var makeInspectorArg = null;
  var inspectWasCalled = NO;
  Smartgraphs.activityStepController.makeInspector = function (arg) {
    makeInspectorArg = arg;
    return {
      inspect: function () {
        inspectWasCalled = YES;
      }
    };
  };
  
  // enable submission...
  Smartgraphs.activityStepController.enableSubmission();
  
  // and check that handleSubmission calls makeInspector with the correct arg...
  Smartgraphs.activityStepController.handleSubmission();
  equals(makeInspectorArg, 'responseInspector', "handleSubmission() should have called makeInspector with arg 'responseInspector'");
  
  // and check that it calls inspect() on the returned inspector object.
  ok(inspectWasCalled === YES, "handleSubmission() should have called the inspect() method of the returned inspector");
});


test("handleSubmission should execute the 'afterSubmissionCommands' before calling the response inspector", function () {  
  var commandsPassed = null;
  var inspectWasCalled = "no";
  var inspectWasCalledWhenCommandsExecuted;
  
  Smartgraphs.activityStepController.executeCommands = function (args) {
    commandsPassed = args;
    inspectWasCalledWhenCommandsExecuted = inspectWasCalled;
  };
  
  Smartgraphs.activityStepController.makeInspector = function () {
    return {
      inspect: function () {
        inspectWasCalled = "yes";
      }
    };
  };
  
  var commands = [
    {
      "action": "command1",
      "literalArgs": {
        "arg1": "val1",
        "arg2": "val2"
      }
    }
  ];
  
  step.afterSubmissionCommands = commands;
  step.responseBranches = [];
  
  Smartgraphs.activityStepController.enableSubmission();
  Smartgraphs.activityStepController.handleSubmission();
  
  equals(commandsPassed, commands, "handleSubmission should result in a call to executeCommands with the 'afterSubmissionCommand' command list.");
  equals(inspectWasCalled, "yes", "ResponseInspector.inspect() should have been called during handleSubmission");
  equals(inspectWasCalledWhenCommandsExecuted, "no", "ResponseInspector.inspect() should not have been called when the executeCommands was called.");
});


test("handleSubmission should branch according to the value returned by the inspector", function () {
  var inspectValue;
  var sentAction = null;
  var actionArgs = null;
  
  Smartgraphs.activityStepController.makeInspector = function () {
    return {
      inspect: function () {
        return inspectValue;
      }
    };
  };
  
  Smartgraphs.sendAction = function (action, context, args) {
    sentAction = action;
    actionArgs = args;
  };
  
  step.responseBranches = [
    { "criterion": { 
        "equals": ["value", 1]
      },
      "step": "step-for-1"
    },
    { "criterion": { 
        "equals": ["value", 2]
      },
      "step": "step-for-2"
    }
  ];

  Smartgraphs.activityStepController.enableSubmission();
  
  step.defaultBranch = null;

  // make sure we don't try to go to any step for a non-matching value and no default branch
  inspectValue = 0;
  Smartgraphs.activityStepController.handleSubmission();
  equals(sentAction, null, "handleSubmission() should have not issued any command when the inspector value is 0 (matching no branch)");
  
  // test second branch
  inspectValue = 2;
  Smartgraphs.activityStepController.handleSubmission();
  equals(sentAction, 'gotoStep', "handleSubmission should have issued a gotoStep command when the inspector value is 2 (matching the second branch)");
  equals(actionArgs.stepId, 'step-for-2', "handleSubmission should have requested step 'step-for-2' when the inspector value is 2 (matching the second branch)");
  
  sentAction = null;
  actionArgs = null;
  
  // test first branch
  inspectValue = 1;
  Smartgraphs.activityStepController.handleSubmission();
  equals(sentAction, 'gotoStep', "handleSubmission should have issued a gotoStep command when the inspector value is 1 (matching the first branch)");
  equals(actionArgs.stepId, 'step-for-1', "handleSubmission should have requested step 'step-for-1' when the inspector value is 1 (matching the first branch)");
  
  sentAction = null;
  actionArgs = null;
  
  // test default branch
  step.defaultBranch = SC.Object.create({       // defaultBranch is .toOne(Smartgraphs.ActivityStep)
    id: 'step-for-default'
  });
  inspectValue = 0;
  Smartgraphs.activityStepController.handleSubmission();
  equals(sentAction, 'gotoStep', "handleSubmission should have issued a gotoStep command when the inspector value is 0 (matching no branch, but with a defaulBranch specified)");
  equals(actionArgs.stepId, 'step-for-default', "handleSubmission should have requested step 'step-for-default' when the inspector value is 0 (matching no branch, but with a defaulBranch specified)");  
});


var oldMFR;
var oldActivityStepNR;
var oldActivityStepSubmittedNR;
var oldBegin;
var oldHS;

var gotoStepArgs = null;


module("ActivityStepController <--> state interaction", {
  setup: function () {
    
    var mockResponder = SC.Responder.create({
      gotoStep: function (context, args) {
        gotoStepArgs = args;
      }
    });
        
    oldSA = Smartgraphs.sendAction;
    Smartgraphs.oldMakeFirstResponder = Smartgraphs.makeFirstResponder;
    oldBegin = Smartgraphs.activityStepController.begin;
    oldHS = Smartgraphs.activityStepController.handleSubmission;

    oldActivityStepNR = Smartgraphs.ACTIVITY_STEP.get('nextResponder');
    oldActivityStepSubmittedNR = Smartgraphs.ACTIVITY_STEP_SUBMITTED.get('nextResponder');    
    Smartgraphs.ACTIVITY_STEP.set('nextResponder', mockResponder);
    Smartgraphs.ACTIVITY_STEP_SUBMITTED.set('nextResponder', mockResponder);
  },
  
  teardown: function () {
    Smartgraphs.makeFirstResponder = Smartgraphs.oldMakeFirstResponder;
    delete Smartgraphs.oldMakeFirstResponder;
    Smartgraphs.sendAction = oldSA;
    Smartgraphs.activityStepController.begin = oldBegin;
    Smartgraphs.activityStepController.handleSubmission = oldHS;
    
    Smartgraphs.makeFirstResponder(null);
    Smartgraphs.ACTIVITY_STEP.set('nextResponder', oldActivityStepNR);
    Smartgraphs.ACTIVITY_STEP_SUBMITTED.set('nextResponder', oldActivityStepSubmittedNR);
  }
});


test("ACTIVITY_STEP should call activityStepController.begin() when it becomes first responder", function () {
  var beginWasCalled = NO;
  Smartgraphs.activityStepController.begin = function () {
    beginWasCalled = YES;
  };
  
  Smartgraphs.makeFirstResponder(Smartgraphs.ACTIVITY_STEP);
  ok(beginWasCalled, "begin() should have been called when ACTIVITY_STEP became first responder");
});


test("ACTIVITY_STEP should implement a submitStep action that can be disabled/enabled", function () {
  Smartgraphs.activityStepController.begin = function () {};
  
  var handleSubmissionWasCalled = NO;
  Smartgraphs.activityStepController.handleSubmission = function () {
    handleSubmissionWasCalled = YES;
  };
    
  Smartgraphs.makeFirstResponder(Smartgraphs.ACTIVITY_STEP);
  
  Smartgraphs.activityStepController.disableSubmission();
  Smartgraphs.sendAction('submitStep');
  
  ok(handleSubmissionWasCalled === NO, "submitStep action after disableSubmission should not have resulted in a call to handleSubmission");
  equals(Smartgraphs.get('firstResponder'), Smartgraphs.ACTIVITY_STEP, "submitStep action after disableSubmission should not have resulted in firstResponder change");
  
  Smartgraphs.activityStepController.enableSubmission();
  Smartgraphs.sendAction('submitStep');
    
  ok(handleSubmissionWasCalled === YES, "submitStep action after enableSubmission should have resulted in a call to handleSubmission");
  equals(Smartgraphs.get('firstResponder'), Smartgraphs.ACTIVITY_STEP_SUBMITTED, "submitStep action after enableSubmission should not have changed firstResponder to ACTIVITY_STEP_SUBMITTED"); 
});


test("ACTIVITY_STEP_SUBMITTED, but not ACTIVITY_STEP, should implement the gotoStep action", function () {
  // stub these since they are called by relevant states
  Smartgraphs.activityStepController.begin = function () {};
  Smartgraphs.activityStepController.handleSubmission = function () {};
  
  Smartgraphs.makeFirstResponder(Smartgraphs.ACTIVITY_STEP);
  gotoStepArgs = null;
  
  Smartgraphs.sendAction('gotoStep', null, {arg: 'test-arg'});
  equals(gotoStepArgs.arg, 'test-arg', "gotoStep should not have be handled by ACTIVITY_STEP, and so should have passed arg 'test-arg' to next responder");

  Smartgraphs.makeFirstResponder(Smartgraphs.ACTIVITY_STEP_SUBMITTED);
  gotoStepArgs = null;
  ok(gotoStepArgs === null, "gotoStep should have been handled by ACTIVITY_STEP_SUMBITTED, and so should have not resulted in handling of gotoStep by next responder");
});
