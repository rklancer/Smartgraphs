// ==========================================================================
// Project:   Smartgraphs - integration test of freehand sketch input
// Copyright: ©2010 Concord Consortium
// @author:   Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs RaphaelViews module test ok equals same stop start afterPropertyChange rnd setupUserAndSessionFixtures restoreUserAndSessionFixtures newSession */

var oldStore;
var sketch;
var session;
var pane;
var graphView;
var canvasView;
var oldValidPaneFor;
var oldMakeFirstResponder;

function setupFixtures() {
  setupUserAndSessionFixtures();
  
  Smartgraphs.Graph.oldFixtures = Smartgraphs.Graph.FIXTURES;  
  Smartgraphs.Graph.FIXTURES = [
    { url: 'test',
      name: 'test',
      axes: 'test-axes',
      title: 'Test Graph',
      initialSeries: []
    }
  ];
  
  Smartgraphs.Axes.oldFixtures = Smartgraphs.Axes.FIXTURES;
  Smartgraphs.Axes.FIXTURES = [
    { url: 'test-axes',

      xMin: -5,
      xMax: 10,
      xSteps: 5,
      xLabel: 'xLabel (long)',
      xLabelAbbreviated: 'xLabel (abbrev)',

      yMin: 2,
      yMax: 8,
      ySteps: 6,
      yLabel: 'yLabel (long)',
      yLabelAbbreviated: 'yLabel (abbrev)'
    }
  ];
  
  oldStore = Smartgraphs.store;
  Smartgraphs.set('store', SC.Store.create().from(SC.FixturesDataSource.create()));
}

function restoreFixtures() {
  restoreUserAndSessionFixtures();
  
  Smartgraphs.Graph.FIXTURES = Smartgraphs.Graph.oldFixtures;
  Smartgraphs.Axes.FIXTURES = Smartgraphs.Axes.oldFixtures;
  Smartgraphs.set('store', oldStore);
}


module('Freehand input controllers and states', {
  setup: function () {
    setupFixtures();
    newSession();
    session = Smartgraphs.sessionController.get('content');
    sketch = Smartgraphs.sessionController.createAnnotation(Smartgraphs.FreehandSketch, 'test-sketch');
    
    // disable makeFirstResponder by default - tests can spy on it if they want, though
    oldMakeFirstResponder = Smartgraphs.makeFirstResponder;
    Smartgraphs.makeFirstResponder = function (state) { };
        
    Smartgraphs.firstGraphController.openGraph('test');
    Smartgraphs.secondGraphController.openGraph('test');
    
    // freehandInputController checks validPaneFor...
    
    oldValidPaneFor = Smartgraphs.activityViewController.validPaneFor;
    Smartgraphs.activityViewController.validPaneFor = function (pane) { return pane; };
  },    
  
  teardown: function () {
    Smartgraphs.firstGraphController.clear();
    Smartgraphs.secondGraphController.clear();
    Smartgraphs.activityViewController.validPaneFor = oldValidPaneFor;
    Smartgraphs.makeFirstResponder = oldMakeFirstResponder;    
    restoreFixtures();
  }
});


test('sketch should be set up correctly', function () {
  ok(sketch.get('isExample') === NO, 'test-sketch should have isExample === NO');
  equals(sketch.get('session'), session, 'test-sketch.session should be the current session');
});


test('moving into FREEHAND_INPUT state without first registering the controller and sketch name returns us to ACTIVITY_STEP state', function () {
  var newState;
  var ret;
  
  // spy on makeFirstResponder without actually making the state transition (makeFirstResponder is restored on teardown)
  Smartgraphs.makeFirstResponder = function (state) {
    newState = state;
  };
  
  // do at least add the sketch to the graph before attempting to transition to FREEHAND_INPUT
  Smartgraphs.firstGraphController.addAnnotation(sketch);
  
  // don't actually make FREEHAND_INPUT first responder, but pretend we did...
  Smartgraphs.FREEHAND_INPUT.didBecomeFirstResponder();  
  equals(newState, Smartgraphs.ACTIVITY_STEP, 'FREEHAND_INPUT should have attempted to transition back to ACTIVITY_STEP after becoming first responder with register() having been called');
  
  // now attempt to register with an sketch name that isn't found on the graph
  ret = Smartgraphs.freehandInputController.register(Smartgraphs.firstGraphController, 'nonexistent-sketch');
  newState = null;
  
  Smartgraphs.FREEHAND_INPUT.didBecomeFirstResponder();
  ok(ret === NO, 'freehandInputController.register() should have returned NO when an invalid sketch name was passed');
  equals(newState, Smartgraphs.ACTIVITY_STEP, 'FREEHAND_INPUT should have attempted to transition back to ACTIVITY_STEP after becoming first responder with an invalid sketch name given to register()');

  ret = Smartgraphs.freehandInputController.register(Smartgraphs.firstGraphController, 'test-sketch');
  Smartgraphs.FREEHAND_INPUT.didBecomeFirstResponder();

  ok(ret === YES, 'freehandInputController.register() should have returned YES when a valid controller and sketch name were passed.');
  equals(newState, Smartgraphs.FREEHAND_INPUT_READY, 'because a register() worked, FREEHAND_INPUT should have attempted to transition to FREEHAND_INPUT_READY on becoming firsr responder');
  
  // cleanup state after FREEHAND_INPUT
  Smartgraphs.FREEHAND_INPUT.willLoseFirstResponder();
});


test('hide start and stop buttons happens when in "prediction graph" mode', function () {
  var newState;
  var ret;

  // spy on makeFirstResponder without actually making the state transition (makeFirstResponder is restored on teardown)
  Smartgraphs.makeFirstResponder = function (state) {
    newState = state;
  };

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
  Smartgraphs.FREEHAND_INPUT.didBecomeFirstResponder();

  equals(ret, YES,
    'freehandInputController.register() should have returned YES when a valid controller and sketch name were passed.');
  equals(newState, Smartgraphs.FREEHAND_INPUT_READY,
    'because a register() worked, FREEHAND_INPUT should have attempted to transition to FREEHAND_INPUT_READY on becoming firsr responder');

  // Did Smartgraphs.FREEHAND_INPUT.didBecomeFirstResponder()'s call to Smartgraphs.activityViewController.revealOnlyClearControl() happen and work?
  equals(Smartgraphs.activityViewController.get('startControlIsVisible'),  NO,
    "After registering with the freehandInputController Smartgraphs.activityViewController.startControlIsVisible should be NO.");
  equals(Smartgraphs.activityViewController.get('stopControlIsVisible'),  NO,
    "After registering with the freehandInputController Smartgraphs.activityViewController.stopControlIsVisible should be NO.");
  equals(Smartgraphs.activityViewController.get('clearControlIsVisible'),  YES,
    "After registering with the freehandInputController Smartgraphs.activityViewController.clearControlIsVisible should be YES.");

  // cleanup state after FREEHAND_INPUT
  Smartgraphs.FREEHAND_INPUT.willLoseFirstResponder();
});


test('moving into and out of FREEHAND_INPUT after registering a controller and sketch name should result in a call to graphController.enableInput and graphController.disableInput', function () {
  var startCallCount = 0;
  var oldenableInput = Smartgraphs.firstGraphController.startFreehandInput;
  Smartgraphs.firstGraphController.startFreehandInput = function () {
    startCallCount++;
  };
  
  var endCallCount = 0;
  var olddisableInput = Smartgraphs.firstGraphController.endFreehandInput;
  Smartgraphs.firstGraphController.endFreehandInput = function () {
    endCallCount++;
  };
  
  Smartgraphs.firstGraphController.addAnnotation(sketch);
  var ret = Smartgraphs.freehandInputController.register(Smartgraphs.firstGraphController, 'test-sketch');
  
  ok(ret === YES, 'freehandInputController.register() should have returned YES');
  
  equals(startCallCount, 0, 'graphController.startFreehandInput should not have been called (should have been called 0 times) before FREEHAND_INPUT state was entered');
  equals(endCallCount, 0, 'graphController.endFreehandInput should not have been called (should have been called 0 times) before FREEHAND_INPUT state was entered');
  
  Smartgraphs.FREEHAND_INPUT.didBecomeFirstResponder();
  
  equals(startCallCount, 1, 'graphController.startFreehandInput should have been called 1 time after FREEHAND_INPUT state was entered');
  equals(endCallCount, 0, 'graphController.endFreehandInput should not have been called (should have been called 0 times) after FREEHAND_INPUT state was entered but not exited');
  
  Smartgraphs.FREEHAND_INPUT.willLoseFirstResponder();
  
  equals(startCallCount, 1, 'graphController.startFreehandInput should have been called exactly 1 time after FREEHAND_INPUT state was entered and exited');
  equals(endCallCount, 1, 'graphController.endFreehandInput should have been called exactly 1 time after FREEHAND_INPUT state was entered and exited');
  
  // remove spies
  Smartgraphs.firstGraphController.startFreehandInput = oldenableInput;
  Smartgraphs.firstGraphController.endFreehandInput = olddisableInput;
});


test('attempts to register a different controller and sketch pair should be rejected while in FREEHAND_SKETCH state but should be allowed after leaving FREEHAND_SKETCH state', function () {
  var firstGraphStarts = 0;
  var firstenableInput = Smartgraphs.firstGraphController.startFreehandInput;
  Smartgraphs.firstGraphController.startFreehandInput = function () {
    firstGraphStarts++;
  };
  var firstGraphEnds = 0;
  var firstdisableInput = Smartgraphs.firstGraphController.endFreehandInput;
  Smartgraphs.firstGraphController.endFreehandInput = function () {
    firstGraphEnds++;
  };

  var secondGraphStarts = 0;
  var secondenableInput = Smartgraphs.secondGraphController.startFreehandInput;
  Smartgraphs.secondGraphController.startFreehandInput = function () {
    secondGraphStarts++;
  };
  var secondGraphEnds = 0;
  var seconddisableInput = Smartgraphs.secondGraphController.endFreehandInput;
  Smartgraphs.secondGraphController.endFreehandInput = function () {
    secondGraphEnds++;
  };
  
  // add the sketch to both firstGraph and secondGraph 
  Smartgraphs.firstGraphController.addAnnotation(sketch);  
  Smartgraphs.secondGraphController.addAnnotation(sketch);

  var ret = Smartgraphs.freehandInputController.register(Smartgraphs.firstGraphController, 'test-sketch');
  
  ok(ret === YES, 'freehandInputController.register() should have returned YES when firstGraphController test-sketch was opened');
  
  Smartgraphs.FREEHAND_INPUT.didBecomeFirstResponder();
  
  equals(firstGraphStarts, 1, 'firstGraphController.startFreehandInput should have been called 1 time after FREEHAND_INPUT state was entered');
  equals(secondGraphStarts, 0, 'secondGraphController.startFreehandInput should have been called 0 times before being registered.');
  
  ret = Smartgraphs.freehandInputController.register(Smartgraphs.secondGraphController, 'test-sketch');
  
  ok(ret === NO, 'freehandInputController.register() should have retured NO when secondGraphController test-sketch were passed while in FREEHAND_INPUT');

  Smartgraphs.FREEHAND_INPUT.willLoseFirstResponder();
  
  equals(firstGraphEnds, 1, 'firstGraphController.endFreehandInput should be called 1 time after FREEHAND_INPUT state was exited');
  equals(secondGraphEnds, 0, 'secondGraphController.endFreehandInput should not have been called despite bogus attempt to register secondGraphController');
  
  // now check that you can in fact register secondGraphController
  ret = Smartgraphs.freehandInputController.register(Smartgraphs.secondGraphController, 'test-sketch');
  
  ok(ret === YES, 'freehandInputController.register() should have retured YES when secondGraphController & test-sketch were passed after we left FREEHAND_INPUT');

  Smartgraphs.FREEHAND_INPUT.didBecomeFirstResponder();
  
  equals(firstGraphStarts, 1, 'firstGraphController.startFreehandInput should still have been called only 1 time now that secondGraphController is registered');
  equals(secondGraphStarts, 1, 'secondGraphController.startFreehandInpt should have been called 1 time after secondGraphController was registed');
  
  Smartgraphs.FREEHAND_INPUT.willLoseFirstResponder();
  
  equals(firstGraphEnds, 1, 'firstGraphController.endFreehandInput should be still have been called only 1 time now that secondGraphController is registered');
  equals(secondGraphEnds, 1, 'secondGraphController.endFreehandInput should have been called 1 time after secondGraphController was registered.');
  
  // remove spies
  Smartgraphs.firstGraphController.startFreehandInput = firstenableInput;
  Smartgraphs.secondGraphController.startFreehandInput = secondenableInput;
  Smartgraphs.firstGraphController.endFreehandInput = firstdisableInput;
  Smartgraphs.secondGraphController.endFreehandInput = seconddisableInput;  
});


module('Freehand sketch input', {
  setup: function () {
    setupFixtures();
    newSession();
    session = Smartgraphs.sessionController.get('content');
    sketch = Smartgraphs.sessionController.createAnnotation(Smartgraphs.FreehandSketch, 'test-sketch');
    
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
    pane.append();
    SC.RunLoop.end();
    
    graphView = pane.get('childViews').objectAt(0);  
    canvasView = graphView.get('graphCanvasView');
    
    // disable makeFirstResponder by default - tests can spy on it if they want, though
    oldMakeFirstResponder = Smartgraphs.makeFirstResponder;
    Smartgraphs.makeFirstResponder = function (state) { };
    
    // required to make freehandInputController.register() happy
    oldValidPaneFor = Smartgraphs.activityViewController.validPaneFor;
    Smartgraphs.activityViewController.validPaneFor = function (pane) { return pane; };
  },
  
  teardown: function () {
    Smartgraphs.firstGraphController.clear();

    // disconnect the graph view's bindings to the graph controller, or else the graph view from old tests will 
    // try to instantiate new child views when the annotationList or seriesList change
    graphView.bindings.forEach(function (b) { b.disconnect(); });
    
    pane.remove();    
    pane = graphView = canvasView = null;
    restoreFixtures();
    
    Smartgraphs.activityViewController.validPaneFor = oldValidPaneFor;
    Smartgraphs.makeFirstResponder = oldMakeFirstResponder;
  }
});


test('adding test-sketch annotation via graph controller should result in addition of a FreehandSketchView as a child of GraphView', function () {
  var childViews = canvasView.get('childViews');
  var startLength = childViews.get('length');
  
  Smartgraphs.firstGraphController.addAnnotation(sketch);
  
  var newLength = childViews.get('length');
  equals(newLength, startLength+1, "adding the sketch to the graph controller's annotationList should increase the length of the graphCanvasView's childViews array by 1");
  var lastView = childViews.objectAt(newLength-1);
  ok(SC.kindOf(lastView, Smartgraphs.FreehandSketchView), 'a FreehandSketchView was appended to the graphCanvasView after test-sketch was pushed onto the annotationList');
});


// FIXME the functionality of this test is basically duplicated in tests/integration/activity_view.js
test('Does showControl get called on the correct pane when Smartgraphs.FREEHAND_INPUT.didBecomeFirstResponder() is called?', function () {
  var oldShowControls = Smartgraphs.activityViewController.showControls;
  Smartgraphs.activityViewController.showControls = function (pane) {
    start(); // prevent the test from timing out
    ok("Smartgraphs.activityViewController.showControls() was called",
      'Smartgraphs.activityViewController.showControls() should have been called.');
    pane = this.validPaneFor(pane);
    equals(pane, 'single',
      "Smartgraphs.activityViewController.showControls should have been called for 'top' pane");
    var which = this.firstOrSecondFor(pane);

    if ( !which ) return NO;

    this.hideControls();
    this.disableAllControls();
    this.set(which+'GraphPaneControls', 'Smartgraphs.activityPage.graphControlsView');
    
    return YES;
  };

  var oldEnableInput = Smartgraphs.freehandInputController.enableInput;
  Smartgraphs.freehandInputController.enableInput = function () {
    start(); // prevent the test from timing out
    ok("Smartgraphs.freehandInputController.enableInput() was called first",
      'Smartgraphs.freehandInputController.enableInput() should have been called before Smartgraphs.activityViewController.showControls().');
    stop(1000); // Fail this test if start is not called again within the given milliseconds
    if (!this._sketch) return NO;

    this._inputIsEnabled = YES;
    this._graphController.startFreehandInput();

    this._graphController.get('eventQueue').addObserver('[]', this, this.graphObserver);
    return YES;
  };

  var childViews = canvasView.get('childViews');

  SC.RunLoop.begin();
  Smartgraphs.firstGraphController.addAnnotation(sketch);
  
  var newLength = childViews.get('length');
  var lastView = childViews.objectAt(newLength-1);
  ok(SC.kindOf(lastView, Smartgraphs.FreehandSketchView), 'a FreehandSketchView was appended to the graphCanvasView after test-sketch was pushed onto the annotationList');
  stop(1000); // Fail this test if start is not called within the given milliseconds

  // set the activity view 
  Smartgraphs.activityViewController.setPaneConfig('single');
  var ret = Smartgraphs.freehandInputController.register(Smartgraphs.firstGraphController, 'test-sketch');
  Smartgraphs.FREEHAND_INPUT.didBecomeFirstResponder();
  SC.RunLoop.end(); 
  
  // cleanup state after FREEHAND_INPUT
  Smartgraphs.FREEHAND_INPUT.willLoseFirstResponder();

  // remove spies.
  Smartgraphs.makeFirstResponder = oldMakeFirstResponder;
  Smartgraphs.activityViewController.showControls = oldShowControls;
  Smartgraphs.freehandInputController.enableInput = oldEnableInput;
});


test("simulated mouse events should result in rendering the appropriate path string, which a simulated 'clear' button click should clear", function () {

  // utility stuff.
  var inputArea = canvasView.getPath('axesView.inputArea.layer');
  var offset = graphView.$().offset();
  
  var fireEvent = function (el, eventName, x, y) {
    var evt = SC.Event.simulateEvent(el, eventName, { pageX: offset.left + x, pageY: offset.top + y });
    SC.Event.trigger(el, eventName, evt);
  };
  
  // add the annotation and get the sketch view...
  Smartgraphs.firstGraphController.addAnnotation(sketch);
  var childViews = canvasView.get('childViews');
  
  var sketchView = childViews.objectAt(childViews.get('length')-1);
  ok(SC.kindOf(sketchView, Smartgraphs.FreehandSketchView), 'the sketchView being tested should be a FreehandSketchView');

  // spy on sketch view's render method
  var callCount = 0;
  var valueOfFirstTime;
  var points;
  var raphael;
  
  sketchView.oldRender = sketchView.render;
  sketchView.render = function (context, firstTime) {
    callCount++;
    valueOfFirstTime = firstTime;
    raphael = context.raphael();
    points = this.getPath('item.points');
    this.oldRender(context, firstTime);
  };

  // open freehand input state
  var ret = Smartgraphs.freehandInputController.register(Smartgraphs.firstGraphController, 'test-sketch');
  ok(ret === YES, 'freehandInputController.register() should return YES when firstGraphController test-sketch was opened');

  Smartgraphs.FREEHAND_INPUT.didBecomeFirstResponder();
  Smartgraphs.FREEHAND_INPUT_READY.didBecomeFirstResponder();

  // input some events
  fireEvent(inputArea, 'mousedown', 0, 10);
  
  // IE doesn't like: 
  // fireEvent(document.body, 'mousemove', 20, 30);
  // therefore we have to fake this one
  var evt = SC.Event.simulateEvent(inputArea, 'mousemove', { pageX: offset.left + 20, pageY: offset.top + 30 });
  SC.RunLoop.begin();
  canvasView.getPath('axesView.inputArea').mouseDragged(evt);
  SC.RunLoop.end();
  
  fireEvent(inputArea, 'mouseup', 40, 50);

  equals(points.get('length'), 3, 'There should be 3 points in the data being rendered by FreehandSketchView');
  var pathStr = raphael.attr('path').toString().split(' ').join(',');   // .split.join normalizes path string for IE
  
  equals(pathStr, "M0,10L20,30L40,50", 'path string should represent the points clicked');

  // simulate the normal sequence of state transitions corresponding to finishing freehand input
  Smartgraphs.FREEHAND_INPUT_COMPLETED.didBecomeFirstResponder();

  // click 'clear' and test that it renders an empty sketch
  SC.RunLoop.begin();
  Smartgraphs.FREEHAND_INPUT_COMPLETED.clearControlWasClicked();
  SC.RunLoop.end(); 
  
  equals(points.get('length'), 0, 'There should be 0 points in the data after the sketch is cleared');
  pathStr = raphael.attr('path').toString().split(' ').join(',');   // .split.join normalizes path string for IE
  equals(pathStr, "M0,0", 'path string should be M0,0 after the sketch is cleared');

  Smartgraphs.FREEHAND_INPUT_COMPLETED.willLoseFirstResponder(); 
  Smartgraphs.FREEHAND_INPUT_READY.willLoseFirstResponder();  
  Smartgraphs.FREEHAND_INPUT.willLoseFirstResponder();
});
