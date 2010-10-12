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
    
    oldAppletPage = Smartgraphs.appletPage;
    Smartgraphs.set('appletPage', SC.Page.design({
      sensorAppletView: SC.View.design({
        start: function () {
          appletViewStartWasCalled = YES;
        }
      })
    }));
    
    Smartgraphs.sensorController.oldStartRecording = Smartgraphs.sensorController.startRecording;
    Smartgraphs.sensorController.oldDisableInput = Smartgraphs.sensorController.disableInput;
        
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
  }
});

test('sensorController.enableInput() should wait for sensor to load', function () {
  Smartgraphs.activityViewController.validPaneFor = function (pane) {
    return (pane === 'valid-pane') ? pane : NO;
  };
  
  var actionSent = null;
  var actionArgs = null;
  Smartgraphs.sendAction = function (action, context, args) {
    actionSent = action;
    actionArgs = args;
  };

  var newState = null;
  Smartgraphs.makeFirstResponder = function (state) {
    newState = state;
  };
  
  // attempt to register an invalid pane
  var register = Smartgraphs.sensorController.register('INVALID-pane', dataset, 0, 10);
  ok( !register, "sensorController.register() should not have succeeded (returned yes) for invalid pane");  
  var enableSucceeded = Smartgraphs.sensorController.enableInput();
  ok( !enableSucceeded, "sensorController.enableInput() should not have succeeded (returned yes) after invalid register()");
  
  
  // register with a valid pane
  register = Smartgraphs.sensorController.register('valid-pane', dataset, 0, 10);
  ok( register, "sensorController.register() should have succeeded (returned yes) for valid pane");

  actionSent = null;
  enableSucceeded = Smartgraphs.sensorController.enableInput();
  ok( enableSucceeded, "sensorController.enableInput() should have succeeded (returned yes) after valid register()");
  
  equals( actionSent, 'waitForSensorToLoad', "enableInput() should have issued action 'waitForSensorToLoad'");

  enableSucceeded = Smartgraphs.sensorController.enableInput();
  ok( !enableSucceeded, "sensorController.enableInput() should have not have succeeded (returned yes) after previous valid enableInput()");
  
  // pretend the waitForSensorToLoad ran
  newState = null;
  Smartgraphs.SENSOR.waitForSensorToLoad();
  equals(newState, Smartgraphs.SENSOR_LOADING, "waitForSensorToLoad action should attempt to transition to SENSOR_LOADING state");

  // check that we show sensor loading view...
  var sensorLoadingViewRequestedInPane = null;
  Smartgraphs.activityViewController.showSensorLoadingView = function (pane) {
    sensorLoadingViewRequestedInPane = pane;
  };
  Smartgraphs.SENSOR_LOADING.didBecomeFirstResponder();
  equals(sensorLoadingViewRequestedInPane, 'valid-pane',  "after transition to SENSOR_LOADING, sensor-is-loading view should be shown in 'valid-pane'");
  
  // now check the callback the sensor uses to indicate that it's ready.
  actionSent = null;
  Smartgraphs.sensorController.sensorsReady();
  equals( actionSent, 'sensorHasLoaded', "enableInput() should have issued action 'sensorHasLoaded' after sensorsReady() callback from applet");
  
  newState = null;
  if (Smartgraphs.SENSOR_LOADING.sensorHasLoaded) {
    Smartgraphs.SENSOR_LOADING.sensorHasLoaded();
  }
  else {
    Smartgraphs.SENSOR.sensorHasLoaded();
  }
  equals(newState, Smartgraphs.SENSOR_LOADED, 'sensorHasLoaded action should transition to SENSOR_LOADED state');
  
  // now, check that SENSOR_LOADED state does sensible things
  
  var showControlsRequestedInPane = null;
  Smartgraphs.activityViewController.showControls = function (pane) {
    showControlsRequestedInPane = pane;
  };
  
  newState = null;
  Smartgraphs.SENSOR_LOADED.didBecomeFirstResponder();
  
  equals(showControlsRequestedInPane, 'valid-pane', "after transition to SENSOR_LOADED, controls should be shown in 'valid-pane'");
  equals(newState, Smartgraphs.SENSOR_READY, "system should have transitioned to SENSOR_READY immediately after SENSOR_LOADED");

  // go into SENSOR_READY and click "start"
  Smartgraphs.SENSOR_READY.didBecomeFirstResponder();  
  ok(Smartgraphs.activityViewController.get('startControlIsEnabled'), "start control should be enabled once sensor is ready");
  ok(Smartgraphs.activityViewController.get('startControlIsVisible'), "start control should be visible once sensor is ready");

  newState = null;  
  Smartgraphs.SENSOR_READY.startControlWasClicked();

  equals(newState, Smartgraphs.SENSOR_RECORDING, "clicking start button should transition to SENSOR_RECORDING");
  
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
  
  // simulate callback with data

  equals(dataset.getPath('points.length'), 0, "dataset should be empty before data received");
  Smartgraphs.sensorController.dataReceived(null, 1, [2]);
  equals(dataset.getPath('points.length'), 1, "dataset should contain one point after data received");
  equals(dataset.get('points').objectAt(0).get('x'), 0, "x value should be 0");
  equals(dataset.get('points').objectAt(0).get('y'), 2, "y value should be 2");
  
  // click "stop"
  newState = null;
  Smartgraphs.SENSOR_RECORDING.stopControlWasClicked();
  equals(newState, Smartgraphs.SENSOR_STOPPED, "clicking 'stop' control should result in transition to SENSOR_STOPPED state");
  
  Smartgraphs.SENSOR_STOPPED.didBecomeFirstResponder();
  ok( !Smartgraphs.activityViewController.get('startControlIsEnabled'), "start control should be disabled once sensor is stopped");
  ok( !Smartgraphs.activityViewController.get('stopControlIsEnabled'), "stop control should be disabled once sensor is stopped");
  ok( Smartgraphs.activityViewController.get('clearControlIsEnabled'), "clear control should be enabled once sensor is stopped");
  
  // click "clear"
  newState = null;
  Smartgraphs.SENSOR_STOPPED.clearControlWasClicked();
  equals(newState, Smartgraphs.SENSOR_READY, "clicking 'clear' control should result in transition to SENSOR_READY state");
  equals(dataset.getPath('points.length'), 0, "points should be removed from dataset after clear control is clicked");  
  
  var disableInputWasCalled = NO;
  Smartgraphs.sensorController.disableInput = function () {
    disableInputWasCalled = YES;
    this.oldDisableInput();
  };
  
  // now, let's see what happens if we try again.
  Smartgraphs.SENSOR.willLoseFirstResponder();
  ok(disableInputWasCalled, "sensorController.disableInput() should be called when we transition out of SENSOR state");
  
  // now start over -- this time, we should transition immediately to SENSOR_LOADED
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
