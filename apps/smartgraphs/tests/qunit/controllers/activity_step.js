// ==========================================================================
// Project:   Smartgraphs.activityStepController Unit Test
// Copyright: ©2010 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs module test ok equals same stop start setup teardown */

var step;

module("Smartgraphs.activityStepController", {
  setup: function () {
    
    setup.mock(Smartgraphs, 'statechart', SC.Statechart.create({
      trace: YES,
      rootState: SC.State.design({
        initialSubstate: 'ACTIVITY_STEP',
        ACTIVITY_STEP: SC.State.plugin('Smartgraphs.ACTIVITY_STEP')
      })
    }));
    
    setup.mock(Smartgraphs, 'ACTIVITY_STEP', Smartgraphs.ACTIVITY_STEP.extend({
      enterState: function () {}
    }));
    
    Smartgraphs.statechart.initStatechart();

    setup.mock(Smartgraphs.statechart, 'sendAction');
    setup.mock(Smartgraphs.activityStepController, 'executeCommands');

    step = SC.Object.create({
    });
    Smartgraphs.activityStepController.cleanup();
    Smartgraphs.activityStepController.set('content', step); 
  },
  
  teardown: function () {
    Smartgraphs.activityController.set('content', null);
    Smartgraphs.activityStepController.set('content', null);
    teardown.mocks();
  }
});


test("step should be automatically submitted if shouldFinishImmediately is YES", function () {
  var stepSubmittedSuccessfully = NO;
  
  var sendAction = Smartgraphs.statechart.sendAction;
  Smartgraphs.statechart.sendAction = function (actionName) {
    if (actionName === 'submitStep' && Smartgraphs.activityStepController.get('canSubmit')) {
      stepSubmittedSuccessfully = YES;
    }
    return sendAction.apply(Smartgraphs.statechart, arguments);
  };
  
  step.set('shouldFinishImmediately', YES);
  
  Smartgraphs.activityStepController.begin();  

  ok( stepSubmittedSuccessfully, "the activity step should have been submitted during begin()");
});


test("step should not be submissible after begin() if a start command disables submission", function () {
  step.set('startCommands', [{"name": "disableSubmission"}]);
  Smartgraphs.activityStepController.begin();
  ok( !Smartgraphs.activityStepController.get('canSubmit'), "submission should have been disabled by the start command");
});


// !OBSOLETE
// test("step should not be submissible after begin() if a submissibility inspector can be successfully instantiated, regardless of initial commands", function () {
//   var submissionEnablingCommandDidRun = NO;
//   
//   var sendAction = Smartgraphs.statechart.sendAction;
//   Smartgraphs.statechart.sendAction = function (actionName) {
//     if (actionName === 'submission-enabling-command') {
//       console.log('submission-enabling-command about to issue enableSubmission');
//       Smartgraphs.statechart.sendAction('enableSubmission');
//       submissionEnablingCommandDidRun = YES;
//       return YES;
//     }
//     return sendAction.apply(Smartgraphs.statechart, arguments);
//   };
// 
//   step.set('startCommands', [{"action": "submission-enabling-command"}]);
//   window.inspector = Smartgraphs.Inspector.extend();
//   step.set('submissibilityInspector', { type: 'window.inspector' });
//   
//   Smartgraphs.activityStepController.begin();
//   ok( submissionEnablingCommandDidRun, "submission-enabling startCommand should have run");
//   ok( !Smartgraphs.activityStepController.get('canSubmit'), "submission should have be disabled immediately after begin()");
// });


test("step should be submissible after begin() if no start commands disable submission", function () {
  Smartgraphs.activityStepController.begin();
  ok( Smartgraphs.activityStepController.get('canSubmit'), "submission should be enabled immediately after begin()");
});


// !OBSOLETE
// test("step should be submissible after begin() if no start commands disable submission and no submissibility inspector can be instantiated", function () {
//   window.junkInspector = {};
//   step.set('submissibilityInspector', { type: 'window.junkInspector' });
//   
//   Smartgraphs.activityStepController.begin();
//   ok( Smartgraphs.activityStepController.get('canSubmit'), "submission should be enabled immediately after begin()");
// });
//
// 
// test("makeInspector method should return an inspector instance corresponding to the classname in the inspector info", function () {
//   var submissibilityInspector = {
//     type: 'Smartgraphs.FirstResponseFieldInspector'
//   };
//   
//   var inspector = Smartgraphs.activityStepController.makeInspector(submissibilityInspector);
//   ok(SC.kindOf(inspector, Smartgraphs.FirstResponseFieldInspector), 'makeInspector should return a valid FirstResponseFieldInspector instance');
// });


// !REWRITE
// test("executeCommands should ignore a falsy list of commands", function () {
//   var callCount = 0;
//   // Replace sendAction with a stub
//   Smartgraphs.statechart.sendAction = function () {
//     callCount++;
//   };
//   
//   Smartgraphs.activityStepController.executeCommands();
//   Smartgraphs.activityStepController.executeCommands([]);
//   Smartgraphs.activityStepController.executeCommands(null);
//   
//   equals(callCount, 0, "activityStepController.executeCommands correctly refused to call sendAction and did not error out after being passed falsy arguments.");
// });


// !REWRITE
// test("executeCommands should cause the appropriate actions to be sent", function () {
//   var actions = [];
//   var contexts = [];
//   var argLists = [];
//   
//   Smartgraphs.statechart.sendAction = function (action, context, argList) {
//     actions.push(action);
//     contexts.push(context);
//     argLists.push(argList);
//   };
//   
//   var commands = [
//     {
//       "action": "command1",
//       "literalArgs": {
//         "arg1": "val1",
//         "arg2": "val2"
//       }
//     },
//     {
//       "action": "command2",
//       "literalArgs": {
//         "arg1": "val1"
//       }
//     }
//   ];
//   Smartgraphs.activityStepController.executeCommands(commands);
//   
//   same(actions, ["command1", "command2"], "sendAction should have been invoked with action 'command1' then 'command2'");
//   var that = Smartgraphs.activityStepController;
//   same(contexts, [that, that], "sendAction should have been invoked with context == Smartgraphs.activityStepController, both times");
//   same(argLists[0], { "arg1": "val1", "arg2": "val2"}, "sendAction should have been passed action args {'arg1': 'val1', 'arg2': 'val2'} in the first invocation"); 
//   same(argLists[1], { "arg1": "val1" }, "sendAction should have been passed action args {'arg1': 'val1'} in the second invocation");
// });


// !REWRITE
// test("handleSubmission should do nothing if disableSubmission was called", function () {
//   var makeInspectorWasCalled = NO;
//   Smartgraphs.activityStepController.makeInspector = function () {
//     makeInspectorWasCalled = YES;
//   };
//   
//   // disable submission...
//   Smartgraphs.activityStepController.disableSubmission();
//   
//   // and check that handleSubmission is rejected
//   Smartgraphs.activityStepController.handleSubmission();
//   ok(makeInspectorWasCalled === NO, "after handleSubmission preceded by disableSubmission(), makeInspector() should not have been called.");
// });


// !OBSOLETE
// test("after enableSubmission, handleSubmission should make the appropriate response inspector and ask it to inspect", function () {
//   step.responseBranches = [];
//   step.responseInspector = '(response inspector config hash)';
//   
//   var makeInspectorArg = null;
//   var inspectWasCalled = NO;
//   Smartgraphs.activityStepController.makeInspector = function (arg) {
//     makeInspectorArg = arg;
//     return {
//       inspect: function () {
//         inspectWasCalled = YES;
//       }
//     };
//   };
//   
//   // enable submission...
//   Smartgraphs.activityStepController.enableSubmission();
//   
//   // and check that handleSubmission calls makeInspector with the correct arg...
//   Smartgraphs.activityStepController.handleSubmission();
//   equals(makeInspectorArg, '(response inspector config hash)', "handleSubmission() should have called makeInspector with arg '(response inspector config hash)'");
//   
//   // and check that it calls inspect() on the returned inspector object.
//   ok(inspectWasCalled === YES, "handleSubmission() should have called the inspect() method of the returned inspector");
// });


// REWRITE
// test("handleSubmission should execute the 'afterSubmissionCommands' before calling the response inspector", function () {  
//   var commandsPassed = null;
//   var inspectWasCalled = "no";
//   var inspectWasCalledWhenCommandsExecuted;
//   
//   Smartgraphs.activityStepController.executeCommands = function (args) {
//     commandsPassed = args;
//     inspectWasCalledWhenCommandsExecuted = inspectWasCalled;
//   };
//   
//   Smartgraphs.activityStepController.makeInspector = function () {
//     return {
//       inspect: function () {
//         inspectWasCalled = "yes";
//       }
//     };
//   };
//   
//   var commands = [
//     {
//       "action": "command1",
//       "literalArgs": {
//         "arg1": "val1",
//         "arg2": "val2"
//       }
//     }
//   ];
//   
//   step.afterSubmissionCommands = commands;
//   step.responseBranches = [];
//   
//   Smartgraphs.activityStepController.enableSubmission();
//   Smartgraphs.activityStepController.handleSubmission();
//   
//   equals(commandsPassed, commands, "handleSubmission should result in a call to executeCommands with the 'afterSubmissionCommand' command list.");
//   equals(inspectWasCalled, "yes", "ResponseInspector.inspect() should have been called during handleSubmission");
//   equals(inspectWasCalledWhenCommandsExecuted, "no", "ResponseInspector.inspect() should not have been called when the executeCommands was called.");
// });

//!REWRITE
// test("handleSubmission should branch according to the value returned by the inspector", function () {
//   var inspectValue;
//   var sentAction = null;
//   var actionArgs = null;
//   
//   Smartgraphs.activityStepController.makeInspector = function () {
//     return {
//       inspect: function () {
//         return inspectValue;
//       }
//     };
//   };
//   
//   Smartgraphs.statechart.sendAction = function (action, context, args) {
//     sentAction = action;
//     actionArgs = args;
//   };
//   
//   step.responseBranches = [
//     { "criterion": { 
//         "equals": ["value", 1]
//       },
//       "step": "step-for-1"
//     },
//     { "criterion": { 
//         "equals": ["value", 2]
//       },
//       "step": "step-for-2"
//     }
//   ];
// 
//   Smartgraphs.activityStepController.enableSubmission();
//   
//   step.defaultBranch = null;
// 
//   // make sure we don't try to go to any step for a non-matching value and no default branch
//   inspectValue = 0;
//   Smartgraphs.activityStepController.handleSubmission();
//   equals(sentAction, null, "handleSubmission() should have not issued any command when the inspector value is 0 (matching no branch)");
//   
//   // test second branch
//   inspectValue = 2;
//   Smartgraphs.activityStepController.handleSubmission();
//   equals(sentAction, 'gotoStep', "handleSubmission should have issued a gotoStep command when the inspector value is 2 (matching the second branch)");
//   equals(actionArgs.stepId, 'step-for-2', "handleSubmission should have requested step 'step-for-2' when the inspector value is 2 (matching the second branch)");
//   
//   sentAction = null;
//   actionArgs = null;
//   
//   // test first branch
//   inspectValue = 1;
//   Smartgraphs.activityStepController.handleSubmission();
//   equals(sentAction, 'gotoStep', "handleSubmission should have issued a gotoStep command when the inspector value is 1 (matching the first branch)");
//   equals(actionArgs.stepId, 'step-for-1', "handleSubmission should have requested step 'step-for-1' when the inspector value is 1 (matching the first branch)");
//   
//   sentAction = null;
//   actionArgs = null;
//   
//   // test default branch
//   step.defaultBranch = SC.Object.create({       // defaultBranch is .toOne(Smartgraphs.ActivityStep)
//     id: 'step-for-default'
//   });
//   inspectValue = 0;
//   Smartgraphs.activityStepController.handleSubmission();
//   equals(sentAction, 'gotoStep', "handleSubmission should have issued a gotoStep command when the inspector value is 0 (matching no branch, but with a defaulBranch specified)");
//   equals(actionArgs.stepId, 'step-for-default', "handleSubmission should have requested step 'step-for-default' when the inspector value is 0 (matching no branch, but with a defaulBranch specified)");  
// });


var gotoStepArgs = null;

module("ActivityStepController <--> state interaction", {
  setup: function () {
    
    setup.mock(Smartgraphs, 'statechart', SC.Statechart.create({
      trace: YES,
      rootState: SC.State.design({
        initialSubstate: 'DUMMY',
        DUMMY: SC.State.design(),
        ACTIVITY_STEP: SC.State.plugin('Smartgraphs.ACTIVITY_STEP'),
        ACTIVITY_STEP_SUBMITTED: SC.State.plugin('Smartgraphs.ACTIVITY_STEP_SUBMITTED'),

        gotoStep: function (context, args) {
          gotoStepArgs = args;
        }
      })
    }));
    
    setup.mock(Smartgraphs.statechart, 'sendAction');
    setup.mock(Smartgraphs.statechart, 'gotoState');
    setup.mock(Smartgraphs.activityStepController, 'begin');
    setup.mock(Smartgraphs.activityStepController, 'handleSubmission');
    
    Smartgraphs.statechart.initStatechart();
  },
  
  teardown: function () {
    SC.RunLoop.begin().end();     // clean up any pending actions sent by invokeLast in enterState
    Smartgraphs.activityController.set('content', null);
    Smartgraphs.activityStepController.set('content', null);
    teardown.mocks();
  }
});


test("ACTIVITY_STEP should call activityStepController.begin() after it is entered", function () {
  var beginWasCalled = NO;
  Smartgraphs.activityStepController.begin = function () {
    beginWasCalled = YES;
  };
  
  SC.RunLoop.begin();
  Smartgraphs.statechart.gotoState('ACTIVITY_STEP');
  SC.RunLoop.end();
  
  ok(beginWasCalled, "begin() should have been called after ACTIVITY_STEP state was entered");
});


test("ACTIVITY_STEP should implement a submitStep action that can be disabled/enabled", function () {
  Smartgraphs.activityStepController.begin = function () {};
  
  var handleSubmissionWasCalled = NO;
  Smartgraphs.activityStepController.handleSubmission = function () {
    handleSubmissionWasCalled = YES;
  };
    
  Smartgraphs.statechart.gotoState('ACTIVITY_STEP');
  
  Smartgraphs.statechart.sendAction('disableSubmission');
  Smartgraphs.statechart.sendAction('submitStep');
  
  ok(handleSubmissionWasCalled === NO, "submitStep action after disableSubmission should not have resulted in a call to handleSubmission");
  same(Smartgraphs.statechart.get('currentStates').getEach('parentState').getEach('name'), ["ACTIVITY_STEP"], "submitStep action after disableSubmission should not have caused us to leave ACTIVITY_STEP");
  
  Smartgraphs.statechart.sendAction('enableSubmission');
  Smartgraphs.statechart.sendAction('submitStep');
    
  ok(handleSubmissionWasCalled === YES, "submitStep action after enableSubmission should have resulted in a call to handleSubmission");
  same(Smartgraphs.statechart.get('currentStates').getEach('name'), ["ACTIVITY_STEP_SUBMITTED"], "submitStep action after enableSubmission should have changed firstResponder to ACTIVITY_STEP_SUBMITTED"); 
});


test("ACTIVITY_STEP_SUBMITTED, but not ACTIVITY_STEP, should implement the gotoStep action", function () {
  // stub these since they are called by relevant states
  Smartgraphs.activityStepController.begin = function () {};
  Smartgraphs.activityStepController.handleSubmission = function () {};
  
  Smartgraphs.statechart.gotoState('ACTIVITY_STEP');
  gotoStepArgs = null;
  
  Smartgraphs.statechart.sendAction('gotoStep', null, {arg: 'test-arg'});
  equals(gotoStepArgs.arg, 'test-arg', "gotoStep should not have be handled by ACTIVITY_STEP, and so should have passed arg 'test-arg' to next responder");

  Smartgraphs.statechart.gotoState('ACTIVITY_STEP_SUBMITTED');
  gotoStepArgs = null;
  ok(gotoStepArgs === null, "gotoStep should have been handled by ACTIVITY_STEP_SUMBITTED, and so should have not resulted in handling of gotoStep by next responder");
});
