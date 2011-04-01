// ==========================================================================
// Project:   Smartgraphs.sensorController Unit Test
// Copyright: ©2010 Concord Consortium
// Author:   Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs module test ok equals same stop start afterPropertyChange setupUserAndSessionFixtures restoreUserAndSessionFixtures beginSession endSession setup teardown */

var dataset;
var appletViewStartWasCalled = NO;

module("sensorController <--> SENSOR_* state interactions", {
  setup: function () {
    setup.store();
    
    setupUserAndSessionFixtures();
    
    setup.fixtures(Smartgraphs.Dataset, [
      { url: 'test-dataset',
        name: 'test-dataset',
        xUnits: '/builtins/units/seconds',
        yUnits: '/builtins/units/meters'
      }
    ]);    
    Smartgraphs.store.find(Smartgraphs.Dataset);
    Smartgraphs.store.find(Smartgraphs.Unit);       // can't lazy load from fixtures after session sets up the nested store.  
    
    beginSession();
    dataset = Smartgraphs.store.find(Smartgraphs.Dataset, 'test-dataset');    
    
    // mock the applet page so we don't try to append an actual applet
    setup.mock(Smartgraphs, 'appletPage', SC.Page.design({
      sensorAppletView: SC.View.design({
        start: function () {
          appletViewStartWasCalled = YES;
        },
        stop: function () {
        }
      })
    }));
    
    setup.mock(Smartgraphs, 'statechart', SC.Statechart.create({
      trace: YES,
      rootState: SC.State.design({
        initialSubstate: 'NOT_SENSOR',
        SENSOR: SC.State.plugin('Smartgraphs.SENSOR'),
        NOT_SENSOR: SC.State.design()
      })
    }));

    // mock validPaneFor so that 'valid-pane' is always valid
    setup.mock(Smartgraphs.activityViewController, 'validPaneFor', function (pane) {
      return (pane === 'valid-pane') ? pane : NO;
    });

    Smartgraphs.statechart.initStatechart();
  },
  
  teardown: function () {
    endSession();
    
    teardown.all();
    restoreUserAndSessionFixtures();
    
    // make sure the sensor controller state is ok
    Smartgraphs.sensorController.stopRecording();
    Smartgraphs.sensorController.disableInput();
  }
});

//!REWRITE after converting to 'sensor tool'
test("Correct sequence of events should occur when sensor loads and is used in the nominal fashion", function () {
  expect(34);
  // This looks like a lot of assertions for one test, but the dependencies are such that breaking them up
  // into separate tests will only introduce more code.

  // spy on sendAction
  var actionSent = null;
  var actionArgs = null;
  var sendAction = Smartgraphs.statechart.sendAction;
  setup.mock(Smartgraphs.statechart, 'sendAction', function (action, context, args) {
    actionSent = action;
    actionArgs = args;
  });

  // spy on gotoState
  var newState = null;
  var gotoState = Smartgraphs.statechart.gotoState;
  setup.mock(Smartgraphs.statechart, 'gotoState', function (state) {
    newState = state;
  });
  
  // Attempt to register an invalid pane and check that enableInput() is not successful
  var register = Smartgraphs.sensorController.register('INVALID-pane', dataset, 0, 10);
  ok( !register, "sensorController.register() should not have succeeded (returned yes) for invalid pane");  
  var enableSucceeded = Smartgraphs.sensorController.enableInput();
  ok( !enableSucceeded, "sensorController.enableInput() should not have succeeded (returned yes) after invalid register()");
  
  
  // Register with a valid pane and check that it returns YES and that enableInput() succeeds.
  register = Smartgraphs.sensorController.register('valid-pane', dataset, 0, 10);
  ok( register, "sensorController.register() should have succeeded (returned yes) for valid pane");

  actionSent = null;
  enableSucceeded = Smartgraphs.sensorController.enableInput();
  ok( enableSucceeded, "sensorController.enableInput() should have succeeded (returned yes) after valid register()");
  
  // check that waitForSensorToLoad action is immediately issued after we enableInput
  equals( actionSent, 'waitForSensorToLoad', "enableInput() should have issued action 'waitForSensorToLoad'");

  // check that calling enableInput() again is NOT allowed
  enableSucceeded = Smartgraphs.sensorController.enableInput();
  ok( !enableSucceeded, "sensorController.enableInput() should have not have succeeded (returned yes) after previous valid enableInput()");
  
  gotoState.call(Smartgraphs.statechart, 'SENSOR');
  
  // Check that the waitForSensorToLoad action transitions us to SENSOR_LOADING
  newState = null;
  sendAction.call(Smartgraphs.statechart, 'waitForSensorToLoad');
  equals(newState, 'SENSOR_LOADING', "waitForSensorToLoad action should attempt to transition to SENSOR_LOADING state");

  // Check that we show sensor loading view when we transition to SENSOR_LOADING state.
  var sensorLoadingViewRequestedInPane = null;
  setup.mock(Smartgraphs.activityViewController, 'showSensorLoadingView', function (pane) {
    sensorLoadingViewRequestedInPane = pane;
  });
  gotoState.call(Smartgraphs.statechart, 'SENSOR_LOADING');
  equals(sensorLoadingViewRequestedInPane, 'valid-pane',  "after transition to SENSOR_LOADING, sensor-is-loading view should be shown in 'valid-pane'");
  
  // Check that the applet's "sensorsReady" callback causes the sensorHasLoaded action to be issued
  actionSent = null;
  Smartgraphs.sensorController.sensorsReady();
  equals( actionSent, 'sensorHasLoaded', "enableInput() should have issued action 'sensorHasLoaded' after sensorsReady() callback from applet");
  
  // Check that the sensorHasLoaded action transitions us to SENSOR_LOADED
  newState = null;
  sendAction.call(Smartgraphs.statechart, 'sensorHasLoaded');
  equals(newState, 'SENSOR_LOADED', 'sensorHasLoaded action should transition to SENSOR_LOADED state');
  
  // Check that SENSOR_LOADED state causes the controls to be shown in the correct pane
  var showControlsRequestedInPane = null;
  setup.mock(Smartgraphs.activityViewController, 'showControls', function (pane) {
    showControlsRequestedInPane = pane;
  });
  
  newState = null;
  gotoState.call(Smartgraphs.statechart, 'SENSOR_LOADED');
  
  equals(showControlsRequestedInPane, 'valid-pane', "after transition to SENSOR_LOADED, controls should be shown in 'valid-pane'");
  same(Smartgraphs.statechart.get('currentStates').getEach('name'), ['SENSOR_READY'], "system should have transitioned to SENSOR_READY immediately after SENSOR_LOADED");

  // Go into SENSOR_READY and check that the Start control becomes enabled
  gotoState.call(Smartgraphs.statechart, 'SENSOR_READY');
  ok(Smartgraphs.activityViewController.get('startControlIsEnabled'), "start control should be enabled once sensor is ready");
  ok(Smartgraphs.activityViewController.get('startControlIsVisible'), "start control should be visible once sensor is ready");

  // check that clicking the Start control transitions us to the SENSOR_RECORDING state
  newState = null;
  sendAction.call(Smartgraphs.statechart, 'startControlWasClicked');
  equals(newState, 'SENSOR_RECORDING', "clicking start button should transition to SENSOR_RECORDING");
  
  // check that transitioning to SENSOR_RECORDING calls startRecording on sensor controller and starts the applet
  var startRecordingWasCalled = NO;
  var startRecording = Smartgraphs.sensorController.startRecording;
  setup.mock(Smartgraphs.sensorController, 'startRecording', function () {
    startRecordingWasCalled = YES;
    startRecording.call(Smartgraphs.sensorController);
  });
  appletViewStartWasCalled = NO;
  
  gotoState.call(Smartgraphs.statechart, 'SENSOR_RECORDING');
  ok(startRecordingWasCalled, "clicking start button should have resulted in a call to sensorController.startRecording()");
  ok(appletViewStartWasCalled, "clicking start should have called start method of appletview");
  
  ok( !Smartgraphs.activityViewController.get('startControlIsEnabled'), "start control should be disabled once sensor is recording");
  ok( Smartgraphs.activityViewController.get('stopControlIsEnabled'), "stop control should be enabled once sensor is recording");
  
  // Check that if the sensor calls back with data that the data gets added to the dataset.
  equals(dataset.getPath('points.length'), 0, "dataset should be empty before data received");
  Smartgraphs.sensorController.dataReceived(null, 1, [2]);
  equals(dataset.getPath('points.length'), 1, "dataset should contain one point after data received");
  equals(dataset.get('points').objectAt(0).get('x'), 0, "x value should be 0");
  equals(dataset.get('points').objectAt(0).get('y'), 2, "y value should be 2");
  
  // click "stop", check that we transition to SENSOR_STOPPED, and check that the Clear control becomes enabled
  newState = null;
  sendAction.call(Smartgraphs.statechart, 'stopControlWasClicked');
  equals(newState, 'SENSOR_STOPPED', "clicking 'stop' control should result in transition to SENSOR_STOPPED state");
  
  gotoState.call(Smartgraphs.statechart, 'SENSOR_STOPPED');
  ok( !Smartgraphs.activityViewController.get('startControlIsEnabled'), "start control should be disabled once sensor is stopped");
  ok( !Smartgraphs.activityViewController.get('stopControlIsEnabled'), "stop control should be disabled once sensor is stopped");
  ok( Smartgraphs.activityViewController.get('clearControlIsEnabled'), "clear control should be enabled once sensor is stopped");
  
  // Click "clear", check that the data is emptied, and check that we return to SENSOR_READY
  newState = null;
  sendAction.call(Smartgraphs.statechart, 'clearControlWasClicked');
  equals(newState, 'SENSOR_READY', "clicking 'clear' control should result in transition to SENSOR_READY state");
  equals(dataset.getPath('points.length'), 0, "points should be removed from dataset after clear control is clicked");  
  
  var disableInputWasCalled = NO;
  var disableInput = Smartgraphs.sensorController.disableInput;
  setup.mock(Smartgraphs.sensorController, 'disableInput', function () {
    disableInputWasCalled = YES;
    disableInput.call(Smartgraphs.sensorController);
  });
  
  // Transition out of SENSOR state and check that disableInput() is called
  gotoState.call(Smartgraphs.statechart, 'NOT_SENSOR');
  ok(disableInputWasCalled, "sensorController.disableInput() should be called when we transition out of SENSOR state");
  
  // Register again and check that we transition immediately to SENSOR_LOADED
  register = Smartgraphs.sensorController.register('valid-pane', dataset, 0, 10);
  ok( register, "sensorController.register() should have succeeded (returned yes) for valid pane");

  actionSent = null;
  var enableInput = Smartgraphs.sensorController.enableInput;
  enableSucceeded = NO;
  setup.mock(Smartgraphs.sensorController, 'enableInput', function () {
    enableSucceeded = enableInput.call(Smartgraphs.sensorController);
    return enableSucceeded;
  });
  
  // go back into SENSOR state.... should call enableInput *and* immediately issue sensorHasLoaded
  gotoState.call(Smartgraphs.statechart, 'SENSOR');
  ok( enableSucceeded, "sensorController.enableInput() should have succeeded (returned yes) after disableInput() and valid register()");
  equals( actionSent, 'sensorHasLoaded', "enableInput() should have issued action 'sensorHasLoaded' since the sensor already loaded before");

  newState = null;
  sendAction.call(Smartgraphs.statechart, 'sensorHasLoaded');     // test that we do the right thing here since we know we're in SENSOR, *not* SENSOR_LOADING state
  equals(newState, 'SENSOR_LOADED', "SENSOR should transition to SENSOR_LOADED upon receiving sensorHasLoaded action");
});


test("sensor controller should only write to datasets with units of meters versus seconds", function () {
  expect(6);
  
  var meters = Smartgraphs.store.find(Smartgraphs.Unit, '/builtins/units/meters');
  var seconds = Smartgraphs.store.find(Smartgraphs.Unit, '/builtins/units/seconds');
  var degrees = Smartgraphs.store.find(Smartgraphs.Unit, '/builtins/units/degrees-celsius');
  var minutes = Smartgraphs.store.find(Smartgraphs.Unit, '/builtins/units/minutes');
  
  ok( !!meters && !!seconds && !!degrees && !!minutes, "(precondition) All units required for this test should be defined.");

  dataset.set('xUnits', seconds);  
  dataset.set('yUnits', meters);
  var succeeded = Smartgraphs.sensorController.register('valid-pane', dataset, 0, 10);
  ok( succeeded, "sensorController should have allowed registering a dataset with seconds on the x axis and meters on the y axis");
  
  dataset.set('xUnits', minutes);
  dataset.set('yUnits', meters);  
  succeeded = Smartgraphs.sensorController.register('valid-pane', dataset, 0, 10);
  ok( !succeeded, "sensorController should not have allowed registering a dataset with minutes on the x axis");
  
  dataset.set('xUnits', seconds);  
  dataset.set('yUnits', degrees);
  succeeded = Smartgraphs.sensorController.register('valid-pane', dataset, 0, 10);
  ok( !succeeded, "sensorController should not have allowed registering a dataset with degrees Celsius on the y axis");

  dataset.set('xUnits', seconds);  
  dataset.set('yUnits', null);
  succeeded = Smartgraphs.sensorController.register('valid-pane', dataset, 0, 10);
  ok( !succeeded, "sensorController should not have allowed registering a dataset with no units on the y axis");

  dataset.set('xUnits', null);  
  dataset.set('yUnits', meters);
  succeeded = Smartgraphs.sensorController.register('valid-pane', dataset, 0, 10);
  ok( !succeeded, "sensorController should not have allowed registering a dataset with no units on the x axis"); 
});


test("sensor controller should properly set isStreaming and streamSource properties when it starts recording", function () {
  expect(6);
  
  equals(dataset.get('isStreaming'), NO, "dataset's isStreaming property should be NO before registering");
  
  Smartgraphs.sensorController.register('valid-pane', dataset, 0, 10);

  var enableInput = Smartgraphs.sensorController.enableInput;
  var enableSucceeded = NO;
  setup.mock(Smartgraphs.sensorController, 'enableInput', function () {
    enableSucceeded = enableInput.call(Smartgraphs.sensorController);
    return enableSucceeded;
  });
  
  Smartgraphs.statechart.gotoState('SENSOR');
  equals(enableSucceeded, YES, "(precondition) entering SENSOR state should have called enableInput and enableInput should have returned YES");  
  equals(dataset.get('isStreaming'), NO, "dataset's isStreaming property should still be NO after entering SENSOR state");
  
  dataset.set('streamSource', null);
  
  Smartgraphs.statechart.gotoState('SENSOR_RECORDING');
  
  equals(dataset.get('isStreaming'), YES, "dataset's isStreaming property should be YES after entering SENSOR_RECORDING");
  equals(dataset.get('streamSource'), Smartgraphs.sensorController, "dataset's streamSource should be the sensor controller");
  
  Smartgraphs.statechart.gotoState('SENSOR_STOPPED');
  
  equals(dataset.get('isStreaming'), NO, "dataset's isStreaming property should be NO after leaving SENSOR_RECORDING");
});
