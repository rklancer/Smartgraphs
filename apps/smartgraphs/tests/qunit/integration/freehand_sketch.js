// ==========================================================================
// Project:   Smartgraphs - integration test of freehand sketch input
// Copyright: ©2010 Concord Consortium
// Author:   Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs RaphaelViews module test ok equals same stop start setup teardown beginSession endSession setupUserAndSessionFixtures restoreUserAndSessionFixtures */

var sketch;
var session;
var pane;
var graphView;
var canvasView;
var annotationsHolder;
var FREEHAND_INPUT, FREEHAND_INPUT_START, FREEHAND_INPUT_READY;
var gotoState, newState;

function setupFixtures() {
  setupUserAndSessionFixtures();
  
  setup.fixtures(Smartgraphs.Graph, [
    { url: 'test',
      name: 'test',
      xAxis: 'x-axis',
      yAxis: 'y-axis',
      title: 'Test Graph',
      initialDatasets: []
    }
  ]);
  
  setup.fixtures(Smartgraphs.Axis, [    
    { url: 'x-axis',
      min: -5,
      max: 10,
      nSteps: 5,
      label: 'x axis'
    },
    { url: 'y-axis',
      min: 2,
      max: 8,
      nSteps: 6,
      label: 'y axis'
    }
  ]);
}


module('Freehand input controllers and states', {
  setup: function () {
    setupFixtures();
    setup.store();
    
    beginSession();
    session = Smartgraphs.sessionController.get('content');
    sketch = Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.FreehandSketch, 'test-sketch');
    
    Smartgraphs.firstGraphController.openGraph('test');
    Smartgraphs.secondGraphController.openGraph('test');
    
    setup.mock(Smartgraphs, 'statechart', SC.Statechart.create({
      trace: YES,
      rootState: SC.State.design({
        initialSubstate: 'ACTIVITY_STEP_DEFAULT',
        ACTIVITY_STEP_DEFAULT: SC.State.design(),
        FREEHAND_INPUT: SC.State.plugin('Smartgraphs.FREEHAND_INPUT')
      })
    }));
    
    Smartgraphs.statechart.initStatechart();
    FREEHAND_INPUT = Smartgraphs.statechart.getState('FREEHAND_INPUT'); 
    
    newState = null;
    gotoState = Smartgraphs.statechart.gotoState;
    setup.mock(Smartgraphs.statechart, 'gotoState', function (state) {
      newState = state;
    });
  },
  
  teardown: function () {
    Smartgraphs.firstGraphController.clear();
    Smartgraphs.secondGraphController.clear();
    endSession();
    restoreUserAndSessionFixtures();
    teardown.all();
  }
});


test('sketch should be set up correctly', function () {
  expect(1);
  equals(sketch.get('session'), session, 'test-sketch.session should be the current session');
});


test('moving into FREEHAND_INPUT state without first registering the controller and sketch name returns us to ACTIVITY_STEP state', function () {
  expect(5);

  var ret;
  // don't do the exitState stuff, it'll throw exceptions
  var exitState = FREEHAND_INPUT.exitState;
  setup.mock(FREEHAND_INPUT, 'exitState', function () {});
  
  // do at least add the sketch to the graph before attempting to transition to FREEHAND_INPUT
  Smartgraphs.firstGraphController.addAnnotation(sketch);
  
  newState = null;
  gotoState.call(Smartgraphs.statechart, 'FREEHAND_INPUT');
  equals(newState, 'ACTIVITY_STEP_DEFAULT', 'FREEHAND_INPUT should have attempted to transition back to ACTIVITY_STEP_DEFAULT after becoming first responder with register() having been called');

  gotoState.call(Smartgraphs.statechart, 'ACTIVITY_STEP');
  // now attempt to register with an sketch name that isn't found on the graph
  ret = Smartgraphs.freehandInputController.register(Smartgraphs.firstGraphController, 'nonexistent-sketch');
  ok(ret === NO, 'freehandInputController.register() should have returned NO when an invalid sketch name was passed');

  newState = null;
  gotoState.call(Smartgraphs.statechart, 'FREEHAND_INPUT');  
  equals(newState, 'ACTIVITY_STEP_DEFAULT', 'FREEHAND_INPUT should have attempted to transition back to ACTIVITY_STEP_DEFAULT after becoming first responder with an invalid sketch name given to register()');

  ret = Smartgraphs.freehandInputController.register(Smartgraphs.firstGraphController, 'test-sketch');
  ok(ret === YES, 'freehandInputController.register() should have returned YES when a valid controller and sketch name were passed.');

  gotoState.call(Smartgraphs.statechart, 'ACTIVITY_STEP');
  newState = null;
  gotoState.call(Smartgraphs.statechart, 'FREEHAND_INPUT');
  equals(newState, 'FREEHAND_INPUT_READY', 'because a register() worked, FREEHAND_INPUT should have attempted to transition to FREEHAND_INPUT_READY upon becoming the current state');
  
  // cleanup state after FREEHAND_INPUT
  exitState.call(FREEHAND_INPUT);
});


test('hide start and stop buttons happens when in "prediction graph" mode', function () {
  expect(8);
  var ret;

  // do at least add the sketch to the graph before attempting to transition to FREEHAND_INPUT
  Smartgraphs.firstGraphController.addAnnotation(sketch);

  // Set the buttons' states to the wrong visibility settings before registering with the freehandInputController
  Smartgraphs.activityViewController.set('startControlIsVisible',  YES);
  Smartgraphs.activityViewController.set('stopControlIsVisible', YES);
  Smartgraphs.activityViewController.set('clearControlIsVisible', NO);
  equals(Smartgraphs.activityViewController.get('startControlIsVisible'),  YES,
    "Before registering with the freehandInputController Smartgraphs.activityViewController.startControlIsVisible should at the wrong visibility setting given to it by this test: YES.");
  equals(Smartgraphs.activityViewController.get('stopControlIsVisible'),  YES,
    "Before registering with the freehandInputController Smartgraphs.activityViewController.stopControlIsVisible should at the wrong visibility setting given to it by this test: YES.");
  equals(Smartgraphs.activityViewController.get('clearControlIsVisible'),  NO,
    "Before registering with the freehandInputController Smartgraphs.activityViewController.clearControlIsVisible should at the wrong visibility setting given to it by this test: NO.");

  ret = Smartgraphs.freehandInputController.register(Smartgraphs.firstGraphController, 'test-sketch');
  gotoState.call(Smartgraphs.statechart, 'FREEHAND_INPUT');

  equals(ret, YES,
    'freehandInputController.register() should have returned YES when a valid controller and sketch name were passed.');
  equals(newState, 'FREEHAND_INPUT_READY',
    'because a register() worked, FREEHAND_INPUT should have attempted to transition to FREEHAND_INPUT_READY on becoming the current state');

  // Did Smartgraphs.FREEHAND_INPUT.didBecomeFirstResponder()'s call to Smartgraphs.activityViewController.revealOnlyClearControl() happen and work?
  equals(Smartgraphs.activityViewController.get('startControlIsVisible'),  NO,
    "After registering with the freehandInputController Smartgraphs.activityViewController.startControlIsVisible should be NO.");
  equals(Smartgraphs.activityViewController.get('stopControlIsVisible'),  NO,
    "After registering with the freehandInputController Smartgraphs.activityViewController.stopControlIsVisible should be NO.");
  equals(Smartgraphs.activityViewController.get('clearControlIsVisible'),  YES,
    "After registering with the freehandInputController Smartgraphs.activityViewController.clearControlIsVisible should be YES.");

  // cleanup state after FREEHAND_INPUT
  gotoState.call(Smartgraphs.statechart, 'ACTIVITY_STEP_DEFAULT');
});


test('moving into and out of FREEHAND_INPUT after registering a controller and sketch name should result in a call to graphController.enableInput and graphController.disableInput', function () {
  expect(7);
  var startCallCount = 0;
  setup.mock(Smartgraphs.firstGraphController, 'startFreehandInput', function () {
    startCallCount++;
  }); 
  
  var endCallCount = 0;
  setup.mock(Smartgraphs.firstGraphController, 'endFreehandInput', function () {
    endCallCount++;
  });
  
  Smartgraphs.firstGraphController.addAnnotation(sketch);
  var ret = Smartgraphs.freehandInputController.register(Smartgraphs.firstGraphController, 'test-sketch');
  ok(ret === YES, 'freehandInputController.register() should have returned YES');
  
  equals(startCallCount, 0, 'graphController.startFreehandInput should not have been called (should have been called 0 times) before FREEHAND_INPUT state was entered');
  equals(endCallCount, 0, 'graphController.endFreehandInput should not have been called (should have been called 0 times) before FREEHAND_INPUT state was entered');
  
  gotoState.call(Smartgraphs.statechart, 'FREEHAND_INPUT');
  
  equals(startCallCount, 1, 'graphController.startFreehandInput should have been called 1 time after FREEHAND_INPUT state was entered');
  equals(endCallCount, 0, 'graphController.endFreehandInput should not have been called (should have been called 0 times) after FREEHAND_INPUT state was entered but not exited');
  
  gotoState.call(Smartgraphs.statechart, 'ACTIVITY_STEP_DEFAULT');
  
  equals(startCallCount, 1, 'graphController.startFreehandInput should have been called exactly 1 time after FREEHAND_INPUT state was entered and exited');
  equals(endCallCount, 1, 'graphController.endFreehandInput should have been called exactly 1 time after FREEHAND_INPUT state was entered and exited');
});


test('attempts to register a different controller and sketch pair should be rejected while in FREEHAND_SKETCH state but should be allowed after leaving FREEHAND_SKETCH state', function () {
  expect(11);
  var firstGraphStarts = 0;
  setup.mock(Smartgraphs.firstGraphController, 'startFreehandInput', function () {
    firstGraphStarts++;
  });
  var firstGraphEnds = 0;
  setup.mock(Smartgraphs.firstGraphController, 'endFreehandInput', function () {
    firstGraphEnds++;
  });

  var secondGraphStarts = 0;
  setup.mock(Smartgraphs.secondGraphController, 'startFreehandInput', function () {
    secondGraphStarts++;
  });
  var secondGraphEnds = 0;
  setup.mock(Smartgraphs.secondGraphController, 'endFreehandInput', function () {
    secondGraphEnds++;
  });
  
  // add the sketch to both firstGraph and secondGraph 
  Smartgraphs.firstGraphController.addAnnotation(sketch);  
  Smartgraphs.secondGraphController.addAnnotation(sketch);

  var ret = Smartgraphs.freehandInputController.register(Smartgraphs.firstGraphController, 'test-sketch');
  
  ok(ret === YES, 'freehandInputController.register() should have returned YES when firstGraphController test-sketch was opened');
  
  gotoState.call(Smartgraphs.statechart, 'FREEHAND_INPUT');
  
  equals(firstGraphStarts, 1, 'firstGraphController.startFreehandInput should have been called 1 time after FREEHAND_INPUT state was entered');
  equals(secondGraphStarts, 0, 'secondGraphController.startFreehandInput should have been called 0 times before being registered.');
  
  ret = Smartgraphs.freehandInputController.register(Smartgraphs.secondGraphController, 'test-sketch');
  
  ok(ret === NO, 'freehandInputController.register() should have retured NO when secondGraphController test-sketch were passed while in FREEHAND_INPUT');

  gotoState.call(Smartgraphs.statechart, 'ACTIVITY_STEP_DEFAULT');
  
  equals(firstGraphEnds, 1, 'firstGraphController.endFreehandInput should be called 1 time after FREEHAND_INPUT state was exited');
  equals(secondGraphEnds, 0, 'secondGraphController.endFreehandInput should not have been called despite bogus attempt to register secondGraphController');
  
  // now check that you can in fact register secondGraphController
  ret = Smartgraphs.freehandInputController.register(Smartgraphs.secondGraphController, 'test-sketch');
  
  ok(ret === YES, 'freehandInputController.register() should have retured YES when secondGraphController & test-sketch were passed after we left FREEHAND_INPUT');

  gotoState.call(Smartgraphs.statechart, 'FREEHAND_INPUT');
  
  equals(firstGraphStarts, 1, 'firstGraphController.startFreehandInput should still have been called only 1 time now that secondGraphController is registered');
  equals(secondGraphStarts, 1, 'secondGraphController.startFreehandInpt should have been called 1 time after secondGraphController was registed');
  
  gotoState.call(Smartgraphs.statechart, 'ACTIVITY_STEP_DEFAULT');
  
  equals(firstGraphEnds, 1, 'firstGraphController.endFreehandInput should be still have been called only 1 time now that secondGraphController is registered');
  equals(secondGraphEnds, 1, 'secondGraphController.endFreehandInput should have been called 1 time after secondGraphController was registered.');
});


module('Freehand sketch input', {
  setup: function () {
    setup.store();
    setupFixtures();
    beginSession();
    
    sketch = Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.FreehandSketch, 'test-sketch');
    Smartgraphs.store.find(Smartgraphs.Axis);
    
    // TODO this might make sense in a debug helper
    Smartgraphs.firstGraphController.openGraph('test');
    
    SC.RunLoop.begin();
    pane = SC.MainPane.create({
      childViews: [
        Smartgraphs.GraphView.design({
          graphControllerBinding: 'Smartgraphs.firstGraphController',
          viewName: 'testGraphView'
        })]
    });
    SC.RunLoop.end();
    pane.append();
    
    graphView = pane.get('childViews').objectAt(0);  
    canvasView = graphView.get('graphCanvasView');
    annotationsHolder = canvasView.get('annotationsHolder');
    
    setup.mock(Smartgraphs.activityViewController, 'validPaneFor', function (pane) { return pane; });
    
    setup.mock(Smartgraphs, 'statechart', SC.Statechart.create({
      trace: YES,
      rootState: SC.State.design({
        initialSubstate: 'ACTIVITY_STEP_DEFAULT',
        ACTIVITY_STEP_DEFAULT: SC.State.design(),
        FREEHAND_INPUT: SC.State.plugin('Smartgraphs.FREEHAND_INPUT')
      })
    }));
    
    Smartgraphs.statechart.initStatechart();
    FREEHAND_INPUT = Smartgraphs.statechart.getState('FREEHAND_INPUT');
    FREEHAND_INPUT_READY = Smartgraphs.statechart.getState('FREEHAND_INPUT_READY');
    FREEHAND_INPUT_START = Smartgraphs.statechart.getState('FREEHAND_INPUT_START');
    gotoState = Smartgraphs.statechart.gotoState; 
  },
  
  teardown: function () {
    Smartgraphs.firstGraphController.clear();
    endSession();
    
    // disconnect the graph view's bindings to the graph controller, or else the graph view from old tests will 
    // try to instantiate new child views when the annotationList or datasetList change
    graphView.bindings.forEach(function (b) { b.disconnect(); });
    
    pane.remove();    
    pane = graphView = canvasView = null;
    restoreUserAndSessionFixtures();
    teardown.all();
  }
});


test('adding test-sketch annotation via graph controller should result in addition of a FreehandSketchView as a child of GraphView', function () {
  expect(2);
  var childViews = annotationsHolder.get('childViews');
  var startLength = childViews.get('length');
  
  Smartgraphs.firstGraphController.addAnnotation(sketch);
  
  var newLength = childViews.get('length');
  equals(newLength, startLength+1, "adding the sketch to the graph controller's annotationList should increase the length of the graphCanvasView's childViews array by 1");
  var lastView = childViews.objectAt(newLength-1);
  ok(SC.kindOf(lastView, Smartgraphs.FreehandSketchView), 'a FreehandSketchView was appended to the graphCanvasView after test-sketch was pushed onto the annotationList');
});


test("simulated mouse events should result in rendering the appropriate path string, which a simulated 'clear' button click should clear", function () {
  expect(9);
  
  // utility stuff.
  var inputArea = canvasView.getPath('axesView.inputArea.layer');
  var offset = graphView.$().offset();
  
  var fireEvent = function (el, eventName, x, y) {
    var evt = SC.Event.simulateEvent(el, eventName, { pageX: offset.left + x, pageY: offset.top + y });
    SC.Event.trigger(el, eventName, evt);
  };
  
  // add the annotation and get the sketch view...
  Smartgraphs.firstGraphController.addAnnotation(sketch);
  var childViews = annotationsHolder.get('childViews');
  
  var sketchView = childViews.objectAt(childViews.get('length')-1);
  ok(SC.kindOf(sketchView, Smartgraphs.FreehandSketchView), 'the sketchView being tested should be a FreehandSketchView');

  // spy on sketch view's render method
  var callCount = 0;
  var valueOfFirstTime;
  var points;
  var raphael;
  var originalRender = sketchView.render;
  setup.mock(sketchView.render = function (context, firstTime) {
    callCount++;
    valueOfFirstTime = firstTime;
    raphael = context.raphael();
    points = this.getPath('item.points');
    originalRender.call(this, context, firstTime);
  });

  // interrupt the process of leaving FREEHAND_INPUT_READY on mouseup
  var freehandSketchCompletedWasCalled = NO;
  var freehandSketchCompleted = FREEHAND_INPUT_READY.freehandSketchCompleted;
  setup.mock(FREEHAND_INPUT_READY, 'freehandSketchCompleted', function () {
    freehandSketchCompletedWasCalled = YES;
  });
  
  // open freehand input state
  var ret = Smartgraphs.freehandInputController.register(Smartgraphs.firstGraphController, 'test-sketch');
  ok(ret === YES, 'freehandInputController.register() should return YES when firstGraphController test-sketch was opened');

  gotoState.call(Smartgraphs.statechart, 'FREEHAND_INPUT');
  same(Smartgraphs.statechart.get('currentStates').getEach('name'), ['FREEHAND_INPUT_READY'], "After entering FREEHAND_INPUT, we should have immediately transitioned to FREEHAND_INPUT_READY");
  
  // input some events
  fireEvent(inputArea, 'mousedown', 0, 10);
  
  // IE doesn't like: 
  // fireEvent(document.body, 'mousemove', 20, 30);
  // therefore we have to fake this one
  var evt = SC.Event.simulateEvent(inputArea, 'mousemove', { pageX: offset.left + 20, pageY: offset.top + 30 });
  SC.RunLoop.begin();
  canvasView.getPath('axesView.inputArea').mouseDragged(evt);
  SC.RunLoop.end();
  
  freehandSketchCompletedWasCalled = NO;
  fireEvent(inputArea, 'mouseup', 40, 50);
  equals( freehandSketchCompletedWasCalled, YES, "The action 'freehandSketchCompleted' should have been sent after mouseup");
  equals(points.get('length'), 3, 'There should be 3 points in the data being rendered by FreehandSketchView');
  var pathStr = raphael.attr('path').toString().split(' ').join(',');   // .split.join normalizes path string for IE
  
  equals(pathStr, "M0,10L20,30L40,50", 'path string should represent the points clicked');

  // simulate the normal sequence of state transitions corresponding to finishing freehand input
  freehandSketchCompleted.call(FREEHAND_INPUT_READY);
  same(Smartgraphs.statechart.get('currentStates').getEach('name'), ['FREEHAND_INPUT_COMPLETED'], "after 'freehandSketchCompleted' action is allowed to execute, we should be in FREEHAND_INPUT_COMPLETED");
  
  // click 'clear' and test that it renders an empty sketch
  SC.RunLoop.begin();
  Smartgraphs.statechart.sendAction('clearControlWasClicked');
  SC.RunLoop.end();
  
  equals(points.get('length'), 0, 'There should be 0 points in the data after the sketch is cleared');
  pathStr = raphael.attr('path').toString().split(' ').join(',');   // .split.join normalizes path string for IE
  equals(pathStr, "M0,0", 'path string should be M0,0 after the sketch is cleared');

  gotoState.call(Smartgraphs.statechart, 'ACTIVITY_STEP_DEFAULT');
});
