// ==========================================================================
// Project:   Smartgraphs - integration test of some state transitions
// Copyright: ©2010 Concord Consortium
// Author:   Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs RaphaelViews module test ok equals same stop start setup teardown */

var requestedPane;

module('state transition requirements', {
  setup: function () {
    setup.mock(Smartgraphs, 'statechart', SC.Statechart.create({
      trace: YES,
      rootState: SC.State.design({
        initialSubstate: 'DUMMY',
        DUMMY: SC.State.design(),
        FREEHAND_INPUT: SC.State.plugin('Smartgraphs.FREEHAND_INPUT'),
        SENSOR: SC.State.plugin('Smartgraphs.SENSOR')
      })
    }));
    Smartgraphs.statechart.initStatechart();
    
    // spy on which pane the controls are put into
    var paneRequestedInShowControls = null;
    setup.mock(Smartgraphs.activityViewController, 'showControls', function (pane) {
      console.log("MOCK CALLED! pane = %s", pane);
      requestedPane = pane;
    });
  },
  
  teardown: function () {
    teardown.all();
  }
});


test("activityViewController.showControls() should be called on the registered pane when transitioning from FREEHAND_INPUT state to FREEHAND_INPUT_READY state", function () {
  setup.mock(Smartgraphs, 'freehandInputController', SC.Object.create({
    // mock the expected registered pane String
    pane: "the-pane",
    // FREEHAND_INPUT enterState() checks if call to enableInput() returns YES, so mock enableInput()
    enableInput: function () {
      return YES;
    },
    startRecording: function () {
      return YES;
    }
  }));
  
  requestedPane = null;
  Smartgraphs.statechart.gotoState('FREEHAND_INPUT');
  
  same(Smartgraphs.statechart.get('currentStates').getEach('name'), ['FREEHAND_INPUT_READY'], "FREEHAND_INPUT should have transitioned to FREEHAND_INPUT_READY");
  equals(requestedPane, "the-pane", "activityViewController.showControls should have been called on registered pane");
});


test("activityViewController.showControls() should be called on the registered pane when transitioning from SENSOR_LOADED state to SENSOR_READY state", function () {

  setup.mock(Smartgraphs, 'sensorController', SC.Object.create({
    // mock the expected registered pane String
    pane: "the-pane",
    enableInput: function () {
      return YES;
    }
  }));
  
  requestedPane = null;  
  Smartgraphs.statechart.gotoState('SENSOR_LOADED');
  
  same(Smartgraphs.statechart.get('currentStates').getEach('name'), ['SENSOR_READY'], "SENSOR_LOADED should have transitioned immediately to SENSOR_READY");
  equals(requestedPane, "the-pane", "activityViewController.showControls should have been called on the registered pane");
});
