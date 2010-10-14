// ==========================================================================
// Project:   Smartgraphs.sensorController Unit Test
// Copyright: ©2010 Concord Consortium
// @author:   Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs module test ok equals same stop start afterPropertyChange setupUserAndSessionFixtures restoreUserAndSessionFixtures newSession */

var oldMFR;
var oldSA;
var oldVPF;
var oldStore;
var oldAppletPage;
var oldSC;
var oldSSLV;

var dataset;
var appletViewStartWasCalled = NO;

module("sensorController <--> SENSOR_* state interactions", {
  setup: function () {
    oldStore = Smartgraphs.store;
    Smartgraphs.set('store', SC.Store.create().from(SC.FixturesDataSource.create()));
    
    setupUserAndSessionFixtures();
    newSession();
    dataset = Smartgraphs.sessionController.createSeries('test-dataset');
    
    // mock the applet page so we don't try to append an actual applet
    oldAppletPage = Smartgraphs.appletPage;
    Smartgraphs.set('appletPage', SC.Page.design({
      sensorAppletView: SC.View.design({
        start: function () {
          appletViewStartWasCalled = YES;
        },
        stop: function () {
        }
      })
    }));
    
    // allow redefintion of startRecording and disableInput
    Smartgraphs.sensorController.oldStartRecording = Smartgraphs.sensorController.startRecording;
    Smartgraphs.sensorController.oldDisableInput = Smartgraphs.sensorController.disableInput;

    // allow redefinition of these methods
    oldMFR = Smartgraphs.makeFirstResponder;
    oldSA = Smartgraphs.sendAction;
    oldVPF = Smartgraphs.activityViewController.validPaneFor;
    oldSC = Smartgraphs.activityViewController.showControls;
    oldSSLV = Smartgraphs.activityViewController.showSensorLoadingView;
  },
  
  teardown: function () {
    restoreUserAndSessionFixtures();
    
    Smartgraphs.sensorController.startRecording = Smartgraphs.sensorController.oldStartRecording;
    delete Smartgraphs.sensorController.oldStartRecording;
    Smartgraphs.sensorController.disableInput = Smartgraphs.sensorController.oldDisableInput;
    delete Smartgraphs.sensorController.oldDisableInput;
    
    Smartgraphs.activityViewController.showControls = oldSC;    
    Smartgraphs.makeFirstResponder = oldMFR;
    Smartgraphs.sendAction = oldSA;
    Smartgraphs.activityViewController.validPaneFor = oldVPF;
    Smartgraphs.activityViewController.showSensorLoadingView = oldSSLV;
    Smartgraphs.set('appletPage', oldAppletPage);
    
    Smartgraphs.set('store', oldStore);

    // make sure the sensor controller state is ok
    Smartgraphs.sensorController.stopRecording();
    Smartgraphs.sensorController.disableInput();
  }
});

test("Correct sequence of events should occur when sensor loads and is used in the nominal fashion", function () {
  // mock validPaneFor
  Smartgraphs.activityViewController.validPaneFor = function (pane) {
    return (pane === 'valid-pane') ? pane : NO;
  };
  
  // spy on sendAction
  var actionSent = null;
  var actionArgs = null;
  Smartgraphs.sendAction = function (action, context, args) {
    actionSent = action;
    actionArgs = args;
  };

  // spy on makeFirstResponder
  var newState = null;
  Smartgraphs.makeFirstResponder = function (state) {
    newState = state;
  };
  
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
  
  // Check that the waitForSensorToLoad action transitions us to SENSOR_LOADING
  newState = null;
  Smartgraphs.SENSOR.waitForSensorToLoad();
  equals(newState, Smartgraphs.SENSOR_LOADING, "waitForSensorToLoad action should attempt to transition to SENSOR_LOADING state");

  // Check that we show sensor loading view when we transition to SENSOR_LOADING state.
  var sensorLoadingViewRequestedInPane = null;
  Smartgraphs.activityViewController.showSensorLoadingView = function (pane) {
    sensorLoadingViewRequestedInPane = pane;
  };
  Smartgraphs.SENSOR_LOADING.didBecomeFirstResponder();
  equals(sensorLoadingViewRequestedInPane, 'valid-pane',  "after transition to SENSOR_LOADING, sensor-is-loading view should be shown in 'valid-pane'");
  
  // Check that the applet's "sensorsReady" callback causes the sensorHasLoaded action to be issued
  actionSent = null;
  Smartgraphs.sensorController.sensorsReady();
  equals( actionSent, 'sensorHasLoaded', "enableInput() should have issued action 'sensorHasLoaded' after sensorsReady() callback from applet");
  
  // Check that the sensorHasLoaded action transitions us to SENSOR_LOADED
  newState = null;
  if (Smartgraphs.SENSOR_LOADING.sensorHasLoaded) {
    Smartgraphs.SENSOR_LOADING.sensorHasLoaded();
  }
  else {
    Smartgraphs.SENSOR.sensorHasLoaded();
  }
  equals(newState, Smartgraphs.SENSOR_LOADED, 'sensorHasLoaded action should transition to SENSOR_LOADED state');
  
  // Check that SENSOR_LOADED state causes the controls to be shown in the correct pane
  var showControlsRequestedInPane = null;
  Smartgraphs.activityViewController.showControls = function (pane) {
    showControlsRequestedInPane = pane;
  };
  
  newState = null;
  Smartgraphs.SENSOR_LOADED.didBecomeFirstResponder();
  
  equals(showControlsRequestedInPane, 'valid-pane', "after transition to SENSOR_LOADED, controls should be shown in 'valid-pane'");
  equals(newState, Smartgraphs.SENSOR_READY, "system should have transitioned to SENSOR_READY immediately after SENSOR_LOADED");

  // Go into SENSOR_READY and check that the Start control becomes enabled
  Smartgraphs.SENSOR_READY.didBecomeFirstResponder();  
  ok(Smartgraphs.activityViewController.get('startControlIsEnabled'), "start control should be enabled once sensor is ready");
  ok(Smartgraphs.activityViewController.get('startControlIsVisible'), "start control should be visible once sensor is ready");

  // check that clicking the Start control transitions us to the SENSOR_RECORDING state
  newState = null;
  Smartgraphs.SENSOR_READY.startControlWasClicked();
  equals(newState, Smartgraphs.SENSOR_RECORDING, "clicking start button should transition to SENSOR_RECORDING");
  
  // check that transitioning to SENSOR_RECORDING calls startRecording on sensor controller and starts the applet
  var startRecordingWasCalled = NO;
  Smartgraphs.sensorController.startRecording = function () {
    startRecordingWasCalled = YES;
    this.oldStartRecording();
  };
  appletViewStartWasCalled = NO;
  
  Smartgraphs.SENSOR_RECORDING.didBecomeFirstResponder();
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
  Smartgraphs.SENSOR_RECORDING.stopControlWasClicked();
  equals(newState, Smartgraphs.SENSOR_STOPPED, "clicking 'stop' control should result in transition to SENSOR_STOPPED state");
  
  Smartgraphs.SENSOR_STOPPED.didBecomeFirstResponder();
  ok( !Smartgraphs.activityViewController.get('startControlIsEnabled'), "start control should be disabled once sensor is stopped");
  ok( !Smartgraphs.activityViewController.get('stopControlIsEnabled'), "stop control should be disabled once sensor is stopped");
  ok( Smartgraphs.activityViewController.get('clearControlIsEnabled'), "clear control should be enabled once sensor is stopped");
  
  // Click "clear", check that the data is emptied, and check that we return to SENSOR_READY
  newState = null;
  Smartgraphs.SENSOR_STOPPED.clearControlWasClicked();
  equals(newState, Smartgraphs.SENSOR_READY, "clicking 'clear' control should result in transition to SENSOR_READY state");
  equals(dataset.getPath('points.length'), 0, "points should be removed from dataset after clear control is clicked");  
  
  var disableInputWasCalled = NO;
  Smartgraphs.sensorController.disableInput = function () {
    disableInputWasCalled = YES;
    this.oldDisableInput();
  };
  
  // Transition out of SENSOR state and check that disableInput() is called
  Smartgraphs.SENSOR.willLoseFirstResponder();
  ok(disableInputWasCalled, "sensorController.disableInput() should be called when we transition out of SENSOR state");
  
  // Register again and check that we transition immediately to SENSOR_LOADED
  register = Smartgraphs.sensorController.register('valid-pane', dataset, 0, 10);
  ok( register, "sensorController.register() should have succeeded (returned yes) for valid pane");

  actionSent = null;
  enableSucceeded = Smartgraphs.sensorController.enableInput();
  ok( enableSucceeded, "sensorController.enableInput() should have succeeded (returned yes) after disableInput() and valid register()");
  
  equals( actionSent, 'sensorHasLoaded', "enableInput() should have issued action 'sensorHasLoaded' since the sensor already loaded before");
  
  newState = null;
  Smartgraphs.SENSOR.sensorHasLoaded();     // test that we do the right thing here since we know we're in SENSOR, *not* SENSOR_LOADING state
  equals(newState, Smartgraphs.SENSOR_LOADED, "SENSOR should transition to SENSOR_LOADED upon receiving sensorHasLoaded action");
});


test("sensor controller should properly set isStreaming and streamSource properties when it starts recording", function () {
  // mock validPaneFor
  Smartgraphs.activityViewController.validPaneFor = function (pane) {
    return (pane === 'valid-pane') ? pane : NO;
  };

  equals(dataset.get('isStreaming'), NO, "dataset's isStreaming property should be NO before registering");
  
  Smartgraphs.sensorController.register('valid-pane', dataset, 0, 10);
  Smartgraphs.SENSOR.didBecomeFirstResponder();

  equals(dataset.get('isStreaming'), NO, "dataset's isStreaming property should still be NO after entering SENSOR state");
  
  dataset.set('streamSource', null);
  
  Smartgraphs.SENSOR_RECORDING.didBecomeFirstResponder();
  
  equals(dataset.get('isStreaming'), YES, "dataset's isStreaming property should be YES after entering SENSOR_RECORDING");
  equals(dataset.get('streamSource'), Smartgraphs.sensorController, "dataset's streamSource should be the sensor controller");
  
  Smartgraphs.SENSOR_RECORDING.willLoseFirstResponder();
  
  equals(dataset.get('isStreaming'), NO, "dataset's isStreaming property should be NO after leaving SENSOR_RECORDING");
  
});
