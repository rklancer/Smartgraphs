// ==========================================================================
// Project:   Smartgraphs - integration test of some state transitions
// Copyright: ©2010 Concord Consortium
// @author:   Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs RaphaelViews module test ok equals same stop start afterPropertyChange */

var oldMakeFirstResponder;
var newState;

module('state transition requirements', {
  setup: function () {
    oldMakeFirstResponder = Smartgraphs.makeFirstResponder;
    Smartgraphs.makeFirstResponder = function (state) {
      newState = state;
    };
  },
  
  teardown: function () {
    Smartgraphs.makeFirstResponder = oldMakeFirstResponder;    
  }
});


test("activityViewController.showControls() should be called on the registered pane " +
  "when transitioning from FREEHAND_INPUT state to FREEHAND_INPUT_READY state", function () {
  // setup some mocks/spies
  var oldFreehandInputController = Smartgraphs.freehandInputController;
  var oldShowControls = Smartgraphs.activityViewController.showControls;
  
  // spy on which pane the controls are put into
  var paneRequestedInShowControls = null;
  Smartgraphs.activityViewController.showControls = function (pane) {
    paneRequestedInShowControls = pane;
  };

  Smartgraphs.freehandInputController = SC.Object.create({
    // mock the expected registered pane String
    pane: "'top' or 'bottom' String denoting which pane the controls are put into when entering FREEHAND_INPUT state",
    // Smartgraphs.FREEHAND_INPUT.didBecomeFirstResponder() checks if call to enableInput() returns YES,
    // so mock enableInput()
    enableInput: function () {
      return YES;
    }
  });
  
  newState = null; // for Smartgraphs.makeFirstResponder mock in this.setup()
  Smartgraphs.FREEHAND_INPUT.didBecomeFirstResponder();
  
  equals(newState, Smartgraphs.FREEHAND_INPUT_READY, "FREEHAND_INPUT should have transitioned to FREEHAND_INPUT_READY");
  equals(paneRequestedInShowControls,
    "'top' or 'bottom' String denoting which pane the controls are put into when entering FREEHAND_INPUT state",
    "activityViewController.showControls should have been called on registered pane");
  
  // restore mocks
  Smartgraphs.freehandInputController = oldFreehandInputController;
  Smartgraphs.activityViewController.showControls = oldShowControls;
});


test("activityViewController.showControls() should be called on the registered pane " +
  "when transitioning from SENSOR_LOADED state to SENSOR_READY state", function () {
  // setup mocks/spies 
  var oldSensorController = Smartgraphs.sensorController;
  var oldShowControls = Smartgraphs.activityViewController.showControls;
  
  // spy on which pane the controls are put into
  var paneRequestedInShowControls = null;
  Smartgraphs.activityViewController.showControls = function (pane) {
    paneRequestedInShowControls = pane;
  };
  
  Smartgraphs.sensorController = SC.Object.create({
    // mock the expected registered pane String
    pane: "'top' or 'bottom' String denoting which pane the controls are put into when entering SENSOR_READY state"
  });
  
  newState = null; // for Smartgraphs.makeFirstResponder mock in this.setup()
  Smartgraphs.SENSOR_LOADED.didBecomeFirstResponder();
  
  equals(newState, Smartgraphs.SENSOR_READY, "SENSOR_LOADED should have transitioned to SENSOR_READY");
  equals(paneRequestedInShowControls,
    "'top' or 'bottom' String denoting which pane the controls are put into when entering SENSOR_READY state",
    "activityViewController.showControls should have been called on the registered pane");
  
  // restore mocks
  Smartgraphs.sensorController = oldSensorController;
  Smartgraphs.activityViewController.showControls = oldShowControls;
});
