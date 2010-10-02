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


test('activityView.showControls() should be called on appropriate pane when entering FREEHAND_INPUT', function () {
  // setup some mocks/spies
  var oldFreehandInputController = Smartgraphs.freehandInputController;
  var oldShowControls = Smartgraphs.activityViewController.showControls;
  
  // state transition checks enableInput, so mock it
  Smartgraphs.freehandInputController = SC.Object.create({
    pane: 'thepane',
    enableInput: function () {
      return YES;
    }
  });
  
  // spy on which pane the controls are put into
  var paneRequested = null;  
  Smartgraphs.activityViewController.showControls = function (pane) {
    paneRequested = pane;
  };
  
  newState = null;        // for makeFirstResponder mock
  Smartgraphs.FREEHAND_INPUT.didBecomeFirstResponder();
  
  equals(newState, Smartgraphs.FREEHAND_INPUT_READY, "transition to FREEHAND_INPUT should have succeeded (immediately transitioning to FREEHAND_INPUT_READY)");
  equals(paneRequested, 'thepane', "activityViewController.showControls should have been called on registered pane");
  
  // restore mocks
  Smartgraphs.freehandInputController = oldFreehandInputController;
  Smartgraphs.activityViewController.showControls = oldShowControls;
});


test('SENSOR_LOADED should show graph controls and transition to SENSOR_READY', function () {
  // setup mocks/spies 
  var oldSensorController = Smartgraphs.sensorController;
  var oldShowControls = Smartgraphs.activityViewController.showControls;
  
  // spy on which pane the controls are put into
  var paneRequested = null;  
  Smartgraphs.activityViewController.showControls = function (pane) {
    paneRequested = pane;
  };
  
  Smartgraphs.sensorController = SC.Object.create({
    pane: 'xyzzy'
  });
  
  newState = null;
  Smartgraphs.SENSOR_LOADED.didBecomeFirstResponder();
  
  equals(newState, Smartgraphs.SENSOR_READY, "SENSOR_LOADED should transition to SENSOR_READY");
  equals(paneRequested, 'xyzzy', "activityViewController.showControls should have been called on the registered pane");
  
  // restore mocks
  Smartgraphs.sensorController = oldSensorController;
  Smartgraphs.activityViewController.showControls = oldShowControls;
});
