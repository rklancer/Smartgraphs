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


function setupFixtures() {
  setupUserAndSessionFixtures();
  
  Smartgraphs.Graph.oldFixtures = Smartgraphs.Graph.FIXTURES;  
  Smartgraphs.Graph.FIXTURES = [
    { url: 'test',
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
    sketch = Smartgraphs.sessionController.createAnnotation('test-sketch', Smartgraphs.FreehandSketch);
    
    Smartgraphs.firstGraphController.openGraph('test');
    Smartgraphs.secondGraphController.openGraph('test');
  },
  
  teardown: function () {
    Smartgraphs.firstGraphController.clear();
    Smartgraphs.secondGraphController.clear();
    restoreFixtures();
  }
});


test('sketch should be set up correctly', function () {
  ok(sketch.get('isExample') === NO, 'test-sketch should have isExample === NO');
  equals(sketch.get('session'), session, 'test-sketch.session should be the current session');
});


test('moving into FREEHAND_INPUT state without first registering the controller and sketch name returns us to ACTIVITY_STEP state', function () {
  var oldMakeFirstResponder = Smartgraphs.makeFirstResponder;
  var newState;
  var callCount = 0;
  var ret;
  
  // spy on makeFirstResponder without actually making the state transition
  Smartgraphs.makeFirstResponder = function (state) {
    newState = state;
    callCount++;
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

  // now register the correct controller and sketch name
  ok(callCount > 0, 'callCount should have been correctly incremented by spy in previous tests to a number greater than 0');
  var oldCallCount = callCount;

  ret = Smartgraphs.freehandInputController.register(Smartgraphs.firstGraphController, 'test-sketch');
  Smartgraphs.FREEHAND_INPUT.didBecomeFirstResponder();

  ok(ret === YES, 'freehandInputController.register() should have returned YES when a valid controller and sketch name were passed.');
  equals(callCount, oldCallCount, 'there should not have been any more calls to makeFirstResponder because FREEHAND_INPUT should not have attempted to surrender firstResponder when a freehandInputController.register() was given a valid controller and sketch name.');
  
  // cleanup state after FREEHAND_INPUT
  Smartgraphs.FREEHAND_INPUT.willLoseFirstResponder();
  
  // remove spy.
  Smartgraphs.makeFirstResponder = oldMakeFirstResponder;
});


test('moving into and out of FREEHAND_INPUT after registering a controller and sketch name should result in a call to graphController.startInput and graphController.endInput', function () {
  var startCallCount = 0;
  var oldStartInput = Smartgraphs.firstGraphController.startFreehandInput;
  Smartgraphs.firstGraphController.startFreehandInput = function () {
    startCallCount++;
  };
  
  var endCallCount = 0;
  var oldEndInput = Smartgraphs.firstGraphController.endFreehandInput;
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
  Smartgraphs.firstGraphController.startFreehandInput = oldStartInput;
  Smartgraphs.firstGraphController.endFreehandInput = oldEndInput;
});


test('attempts to register a different controller and sketch pair should be rejected while in FREEHAND_SKETCH state but should be allowed after leaving FREEHAND_SKETCH state', function () {
  var firstGraphStarts = 0;
  var firstStartInput = Smartgraphs.firstGraphController.startFreehandInput;
  Smartgraphs.firstGraphController.startFreehandInput = function () {
    firstGraphStarts++;
  };
  var firstGraphEnds = 0;
  var firstEndInput = Smartgraphs.firstGraphController.endFreehandInput;
  Smartgraphs.firstGraphController.endFreehandInput = function () {
    firstGraphEnds++;
  };

  var secondGraphStarts = 0;
  var secondStartInput = Smartgraphs.secondGraphController.startFreehandInput;
  Smartgraphs.secondGraphController.startFreehandInput = function () {
    secondGraphStarts++;
  };
  var secondGraphEnds = 0;
  var secondEndInput = Smartgraphs.secondGraphController.endFreehandInput;
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
  Smartgraphs.firstGraphController.startFreehandInput = firstStartInput;
  Smartgraphs.secondGraphController.startFreehandInput = secondStartInput;
  Smartgraphs.firstGraphController.endFreehandInput = firstEndInput;
  Smartgraphs.secondGraphController.endFreehandInput = secondEndInput;  
});


module('Freehand sketch input', {
  setup: function () {
    setupFixtures();
    newSession();
    session = Smartgraphs.sessionController.get('content');
    sketch = Smartgraphs.sessionController.createAnnotation('test-sketch', Smartgraphs.FreehandSketch);
    
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
  },
  
  teardown: function () {
    Smartgraphs.firstGraphController.clear();
    pane.remove();
    pane = graphView = canvasView = null;
    restoreFixtures();
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


test('mouse events should result in a path string that reflects the location of the events', function () {
  // untility stuff.
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

  // everything is synced because SC wraps events in a runloop!
  
  equals(points.get('length'), 3, 'There should be 3 points in the data being rendered by FreehandSketchView');
  var pathStr = raphael.attr('path').toString().split(' ').join(',');   // .split.join normalizes path string for IE
  
  equals(pathStr, "M0,10L20,30L40,50", 'path string should represent the points clicked');
  
  // and don't forget to clean up.
  Smartgraphs.FREEHAND_INPUT.willLoseFirstResponder();
});
