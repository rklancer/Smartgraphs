// ==========================================================================
// Project:   Smartgraphs.ACTIVITY Unit Test
// Copyright: ©2010 Concord Consortium
// @author:   Parker Morse <pmorse@cantinaconsulting.com>
// ==========================================================================
/*globals Smartgraphs module test ok equals same stop start setup teardown setupUserAndSessionFixtures */

var pane, graphView, datasetView, tableView;

module("Smartgraphs.ACTIVITY", {
  setup: function () {
    
    setup.mock(Smartgraphs, 'statechart', SC.Statechart.create({
      trace: YES,
      rootState: SC.State.design({
        initialSubstate: 'DUMMY',
        DUMMY: SC.State.design(),
        ACTIVITY: SC.State.plugin('Smartgraphs.ACTIVITY'),
        AUTHOR: SC.State.plugin('Smartgraphs.AUTHOR')
      })
    }));

    // don't actually do anything when we go into ACTIVITY_STEP
    setup.mock(Smartgraphs, 'ACTIVITY_STEP', Smartgraphs.ACTIVITY_STEP.extend({
      enterState: function () {}
    }));
    
    setup.store();    
    Smartgraphs.statechart.initStatechart();
  },
  
  teardown: function () {
    Smartgraphs.statechart.gotoState('DUMMY');    // exit ACTIVITY state (and end session)  
    teardown.all();
  }
});

test("ACTIVITY should open the activity view", function () {
  expect(1);
  Smartgraphs.appWindowController.set('viewToShow', null);   
  Smartgraphs.statechart.gotoState('ACTIVITY');
  equals(Smartgraphs.appWindowController.get('viewToShow'), 'Smartgraphs.activityPage.activityView', "Entering ACTIVITY state should open the activity view");
});


test("openAuthorView action should transition us to AUTHOR view of the same activity, and the same activity page should be open", function () {
  expect(3);
  Smartgraphs.statechart.gotoState('ACTIVITY');
  
  var page = Smartgraphs.get('rootStore').createRecord(Smartgraphs.ActivityPage, { guid: 'page' });
  Smartgraphs.activityPageController.set('content', page);

  equals(Smartgraphs.activityPageController.get('content'), page, "Before 'openAuthorView' action is sent, page controller content should be the test page");
  
  Smartgraphs.statechart.sendAction('openAuthorView');

  same(Smartgraphs.statechart.get('currentStates').getEach('name'), ['AUTHOR'], "'openAuthorView' action sent in ACTIVITY state should transition Smartgraphs to AUTHOR state");
  equals(Smartgraphs.activityPageController.get('content'), page, "After 'openAuthorView' action is sent, page controller content should be the same test page.");
});


module("Smartgraphs.ACTIVITY: graph annotation-creating actions", {
  setup: function () {
    setup.fixtures(Smartgraphs.Graph, Smartgraphs.Graph.TEST_FIXTURES);
    setup.fixtures(Smartgraphs.Axes, Smartgraphs.Axes.TEST_FIXTURES);
    setup.fixtures(Smartgraphs.DataPoint, [
      { guid: 'p1', x: 1, y: 3 },
      { guid: 'p2', x: 4, y: 5 }
    ]);
    setupUserAndSessionFixtures();
    setup.store();
    
    // FIXME why is it necessary to do this before Axes and Graphs are visible in nested store?
    Smartgraphs.store.find(Smartgraphs.DataPoint);
    Smartgraphs.store.find(Smartgraphs.Axes);
    Smartgraphs.store.find(Smartgraphs.Graph);

    setup.mock(Smartgraphs.activityStepController, 'begin', function () {});
    setup.mock(Smartgraphs.activityStepController, 'content', Smartgraphs.store.createRecord(Smartgraphs.ActivityStep, {}));

    setup.mock(Smartgraphs, 'statechart', SC.Statechart.create({
      trace: YES,
      rootState: SC.State.design({
        initialSubstate: 'DUMMY',
        DUMMY: SC.State.design(),
        ACTIVITY: SC.State.plugin('Smartgraphs.ACTIVITY')
      })
    }));

    SC.RunLoop.begin();
    Smartgraphs.loadingActivityController.set('openAuthorViewAfterLoading', NO);
    Smartgraphs.statechart.initStatechart();
    Smartgraphs.statechart.gotoState('ACTIVITY');
    SC.RunLoop.end();
    
    var points = Smartgraphs.store.find(Smartgraphs.DataPoint);
    var dataset = Smartgraphs.activityObjectsController.createDataset('test-dataset');
    points.setEach('dataset', dataset);
    
    Smartgraphs.firstGraphController.openGraph('test-graph');
    Smartgraphs.firstGraphController.addDataset(dataset);

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
    datasetView = graphView.getPath('graphCanvasView.dataHolder.childViews').objectAt(0);
  },

  teardown: function () {
    // let graphs finish drawing before leaving ACTIVITY state (and clearing the graphs)
    SC.RunLoop.begin().end();
    Smartgraphs.statechart.gotoState('DUMMY');
    graphView.bindings.forEach( function (b) { b.disconnect(); } );
    pane.remove();
    teardown.all();
  }
});


test("creating a LineThroughPoints", function () {
  expect(3);
  var startLineCount = Smartgraphs.store.find('Smartgraphs.LineThroughPoints').get('length');
  var hp1 = Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.HighlightedPoint, 'hp1', {'point': 'p1'});
  var hp2 = Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.HighlightedPoint, 'hp2', {'point': 'p2'});
  Smartgraphs.firstGraphController.addAnnotation(hp1); // The points need to be in the graph to create the line
  Smartgraphs.firstGraphController.addAnnotation(hp2);
  var startAnnotationsCount = Smartgraphs.firstGraphController.get('annotationList').get('length');
  Smartgraphs.statechart.sendAction('createLineThroughPoints', null, {'graphName': 'test-graph', 'firstPoint': 'hp1', 'secondPoint': 'hp2', 'lineName': 'test-line', 'color': '#ff0000'});
  equals(Smartgraphs.store.find('Smartgraphs.LineThroughPoints').get('length'), startLineCount + 1, "There should be one more LineThroughPoints");
  equals(Smartgraphs.firstGraphController.get('annotationList').get('length'), startAnnotationsCount, "The new Annotation should not have been added to the controller");
  Smartgraphs.firstGraphController.addObjectByName(Smartgraphs.LineThroughPoints, 'test-line'); // Grab the annotation to examine it
  var annotation = Smartgraphs.firstGraphController.findAnnotationByName('test-line');
  ok(annotation.kindOf(Smartgraphs.LineThroughPoints), 'The Annotation is a LineThroughPoints');
});


test("creating a rise Arrow", function () {
  expect(6);
  var startLineCount = Smartgraphs.store.find('Smartgraphs.Arrow').get('length');
  var hp1 = Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.HighlightedPoint, 'hp1', {'point': 'p1'});
  var hp2 = Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.HighlightedPoint, 'hp2', {'point': 'p2'});
  Smartgraphs.firstGraphController.addAnnotation(hp1);  // The points need to be in the graph to create the arrow
  Smartgraphs.firstGraphController.addAnnotation(hp2);
  var startAnnotationsCount = Smartgraphs.firstGraphController.get('annotationList').get('length');
  Smartgraphs.statechart.sendAction('createRiseArrow', null, {'graphName': 'test-graph', 'firstPoint': 'hp1', 'secondPoint': 'hp2', 'arrowName': 'riseArrow', 'color': '#ff0000'});
  equals(Smartgraphs.store.find('Smartgraphs.Arrow').get('length'), startLineCount + 1, "There should be one more Arrow");
  equals(Smartgraphs.firstGraphController.get('annotationList').get('length'), startAnnotationsCount, "The new Annotation should not have been added to the controller");
  Smartgraphs.firstGraphController.addObjectByName(Smartgraphs.Arrow, 'riseArrow'); // Grab the annotation to examine it
  var annotation = Smartgraphs.firstGraphController.findAnnotationByName('riseArrow');
  ok(annotation.kindOf(Smartgraphs.Arrow), 'The Annotation is an Arrow');
  ok(annotation.get('isVertical'), 'The Annotation is vertical');
  ok(!annotation.get('isHorizontal'), 'The Annotation is not confusingly also horizontal');
  ok(annotation.get('isClockwise'), 'The annotation will be rendered clockwise');
});


test("creating a run Arrow", function () {
  expect(5);
  var startLineCount = Smartgraphs.store.find('Smartgraphs.Arrow').get('length');
  var hp1 = Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.HighlightedPoint, 'hp1', {'point': 'p1'});
  var hp2 = Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.HighlightedPoint, 'hp2', {'point': 'p2'});
  Smartgraphs.firstGraphController.addAnnotation(hp1); // The points need to be in the graph to create the arrow
  Smartgraphs.firstGraphController.addAnnotation(hp2);
  var startAnnotationsCount = Smartgraphs.firstGraphController.get('annotationList').get('length');
  Smartgraphs.statechart.sendAction('createRunArrow', null, {'graphName': 'test-graph', 'firstPoint': 'hp1', 'secondPoint': 'hp2', 'arrowName': 'runArrow', 'color': '#ff0000'});
  equals(Smartgraphs.store.find('Smartgraphs.Arrow').get('length'), startLineCount + 1, "There should be one more Arrow");
  equals(Smartgraphs.firstGraphController.get('annotationList').get('length'), startAnnotationsCount, "The new Annotation should not have been added to the controller");
  Smartgraphs.firstGraphController.addObjectByName(Smartgraphs.Arrow, 'runArrow');
  var annotation = Smartgraphs.firstGraphController.findAnnotationByName('runArrow'); // Grab the annotation to examine it
  ok(annotation.kindOf(Smartgraphs.Arrow), 'The Annotation is an Arrow');
  ok(annotation.get('isHorizontal'), 'The Annotation is horizontal');
  ok(annotation.get('isClockwise'), 'The annotation will be rendered clockwise');
});


test("Reordering points for rise/run arrows", function () {
  expect(4);
  var hp1 = Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.HighlightedPoint, 'hp1', {'point': 'p1'});
  var hp2 = Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.HighlightedPoint, 'hp2', {'point': 'p2'});
  Smartgraphs.firstGraphController.addAnnotation(hp1); // The points need to be in the graph to create the arrow
  Smartgraphs.firstGraphController.addAnnotation(hp2);
  Smartgraphs.statechart.sendAction('createRunArrow', null, {'graphName': 'test-graph', 'firstPoint': 'hp2', 'secondPoint': 'hp1', 'arrowName': 'runArrow', 'color': '#ff0000'});
  Smartgraphs.statechart.sendAction('createRiseArrow', null, {'graphName': 'test-graph', 'firstPoint': 'hp2', 'secondPoint': 'hp1', 'arrowName': 'riseArrow', 'color': '#ff0000'});
  Smartgraphs.firstGraphController.addObjectByName(Smartgraphs.Arrow, 'runArrow');
  Smartgraphs.firstGraphController.addObjectByName(Smartgraphs.Arrow, 'riseArrow');
  var runArrow = Smartgraphs.firstGraphController.findAnnotationByName('runArrow'); // Grab the annotation to examine it
  var riseArrow = Smartgraphs.firstGraphController.findAnnotationByName('riseArrow'); // Grab the annotation to examine it
  equals( riseArrow.get('point1'), hp1.get('point'), "The first point of the rise arrow annotation should be the same as the first Highlighted Point even though it was provided as the second");
  equals( riseArrow.get('point2'), hp2.get('point'), "The second point of the rise arrow annotation should be the same as the second Highlighted Point even though it was provided as the first");
  equals( runArrow.get('point1'), hp1.get('point'), "The first point of the run arrow annotation should be the same as the first Highlighted Point even though it was provided as the second");
  equals( runArrow.get('point2'), hp2.get('point'), "The second point of the run arrow annotation should be the same as the second Highlighted Point even though it was provided as the first");
});


test("Toggling isHighlighted state for annotations", function () {
  expect(1);
  var hp1 = Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.HighlightedPoint, 'hp1', {'point': 'p1'});
  var hp2 = Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.HighlightedPoint, 'hp2', {'point': 'p2'});
  Smartgraphs.firstGraphController.addAnnotation(hp1); // The points need to be in the graph to create the arrow
  Smartgraphs.firstGraphController.addAnnotation(hp2);
  Smartgraphs.statechart.sendAction('createRunArrow', null, {'graphName': 'test-graph', 'firstPoint': 'hp2', 'secondPoint': 'hp1', 'arrowName': 'runArrow', 'color': '#ff0000'});
  Smartgraphs.firstGraphController.addObjectByName(Smartgraphs.Arrow, 'runArrow');
  var runArrow = Smartgraphs.firstGraphController.findAnnotationByName('runArrow'); // Grab the annotation to examine it
  var originalHighlighted = runArrow.get('isHighlighted');
  Smartgraphs.statechart.sendAction('toggleAnnotationHighlight', null, {'graphName': 'test-graph', 'annotationName': 'runArrow'});
  equals(runArrow.get('isHighlighted'), !originalHighlighted, "The isHighlighted property should be the inverse of its original value");
});


test("Creating IndicatingArrow from datapoint", function () {
  expect(3);
  var points = Smartgraphs.store.find('Smartgraphs.DataPoint');
  Smartgraphs.statechart.sendAction('createIndicatingArrowFromDataPoint', null, { 'arrowName': 'test-point-arrow', 'point': points.firstObject() });
  var startingAnnotationCount = Smartgraphs.firstGraphController.get('annotationList').get('length');
  Smartgraphs.firstGraphController.addObjectByName(Smartgraphs.IndicatingArrow, 'test-point-arrow');
  equals( Smartgraphs.firstGraphController.get('annotationList').get('length'), startingAnnotationCount + 1, "The annotation list is one longer");
  var indicator = Smartgraphs.firstGraphController.findAnnotationByName('test-point-arrow');
  ok( indicator.kindOf(Smartgraphs.IndicatingArrow), "The annotation is an IndicatingArrow");
  equals( indicator.get('x'), points.firstObject().get('x'), "The x-coordinate of the arrow is that of the DataPoint" );
});


test("Creating IndicatingArrow from HighlightedPoint", function () {
  expect(4);
  var hp1 = Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.HighlightedPoint, 'hp1', {'point': 'p1'});
  Smartgraphs.firstGraphController.addAnnotation(hp1); // The point needs to be in the graph to create the arrow
  Smartgraphs.statechart.sendAction('createIndicatingArrowFromHighlightedPoint', null, { 'arrowName': 'test-point-arrow', 'point': 'hp1', 'graphName': 'test-graph' });
  var startingAnnotationCount = Smartgraphs.firstGraphController.get('annotationList').get('length');
  Smartgraphs.firstGraphController.addObjectByName(Smartgraphs.IndicatingArrow, 'test-point-arrow');
  equals( Smartgraphs.firstGraphController.get('annotationList').get('length'), startingAnnotationCount + 1, "The annotation list is one longer");
  var indicator = Smartgraphs.firstGraphController.findAnnotationByName('test-point-arrow');
  ok( indicator.kindOf(Smartgraphs.IndicatingArrow), "The annotation is an IndicatingArrow");
  ok( indicator.get('annotation'), "The annotation has an Annotation attribute");
  equals( indicator.get('x'), hp1.get('point').get('x'), "The x-coordinate of the arrow is that of the HighlightedPoint's DataPoint" );
});


test("Creating IndicatingArrow from coordinates", function () {
  expect(3);
  Smartgraphs.statechart.sendAction('createIndicatingArrowFromCoordinates', null, { 'arrowName': 'test-point-arrow', 'x': 10, 'y': 15 });
  var startingAnnotationCount = Smartgraphs.firstGraphController.get('annotationList').get('length');
  Smartgraphs.firstGraphController.addObjectByName(Smartgraphs.IndicatingArrow, 'test-point-arrow');
  equals( Smartgraphs.firstGraphController.get('annotationList').get('length'), startingAnnotationCount + 1, "The annotation list is one longer");
  var indicator = Smartgraphs.firstGraphController.findAnnotationByName('test-point-arrow');
  ok( indicator.kindOf(Smartgraphs.IndicatingArrow), "The annotation is an IndicatingArrow");
  equals( indicator.get('x'), 10, "The x-coordinate of the arrow is 10" );
});

module("Smartgraphs.ACTIVITY: table annotation-creating actions", {
  // Setup/teardown borrowed from Smartgraphs.INTERACTIVE_SELECTION tests
  setup: function () {
    setup.fixtures(Smartgraphs.Graph, Smartgraphs.Graph.TEST_FIXTURES);
    setup.fixtures(Smartgraphs.Axes, Smartgraphs.Axes.TEST_FIXTURES);

    setup.fixtures(Smartgraphs.Dataset, [
      { url: 'test-dataset',
        name: 'test-dataset',
        isExample: YES,
        points: ['p1', 'p2']
      }
    ]);

    setup.fixtures(Smartgraphs.DataPoint, [
      { guid: 'p1', x: 1, y: 3, dataset: 'test-dataset' },
      { guid: 'p2', x: 4, y: 5, dataset: 'test-dataset' }
    ]);

    setup.fixtures(Smartgraphs.Session, Smartgraphs.Session.TEST_FIXTURES);
    setup.fixtures(Smartgraphs.User, Smartgraphs.User.TEST_FIXTURES);
    setup.store();

    Smartgraphs.firstTableController.openDataset('test-dataset');

    SC.RunLoop.begin();
    pane = SC.MainPane.create({
      childViews: [
        Smartgraphs.TableView.design({
          tableControllerBinding: 'Smartgraphs.firstTableController',
          viewName: 'testTableView'
        })]
    });
    pane.append();
    SC.RunLoop.end();

    tableView = pane.get('childViews').objectAt(0);

    beginSession();
    
    setup.mock(Smartgraphs.activityStepController, 'begin', function () {});
    setup.mock(Smartgraphs.activityStepController, 'content', Smartgraphs.store.createRecord(Smartgraphs.ActivityStep, {}));

    setup.mock(Smartgraphs, 'statechart', SC.Statechart.create({
      trace: YES,
      rootState: SC.State.design({
        initialSubstate: 'ACTIVITY',
        ACTIVITY: SC.State.plugin('Smartgraphs.ACTIVITY')
      })
    }));

    SC.RunLoop.begin();
    Smartgraphs.statechart.initStatechart();
    SC.RunLoop.end();
  },

  teardown: function () {
    Smartgraphs.firstTableController.clear();
    graphView.bindings.forEach( function (b) { b.disconnect(); } );
    pane.remove();
    teardown.all();
  }
});

test("Creating rise BracketArc", function () {
  // expect();
  // var startBracketCount = Smartgraphs.store.find('Smartgraphs.BracketArc').get('length');
  // var hp1 = Smartgraphs.sessionController.createAnnotation(Smartgraphs.HighlightedPoint, 'hp1', {'point': 'p1'});
  // var hp2 = Smartgraphs.sessionController.createAnnotation(Smartgraphs.HighlightedPoint, 'hp2', {'point': 'p2'});
  // var startAnnotationsCount = Smartgraphs.firstTableController.get('annotationList').get('length');
  // Smartgraphs.statechart.sendAction('createRiseBracket', null, {'bracketName': 'test-rise-bracket', 'tableName': 'test-graph', 'point1': 'hp1', 'point2': 'hp2', 'color': '#ff0000'});
  // equals(Smartgraphs.store.find('Smartgraphs.BracketArc').get('length'), startBracketCount + 1, "There should be one more BracketArc");
  // equals(Smartgraphs.firstTableController.get('annotationList').get('length'), startAnnotationsCount, "The new Annotation should not have been added to the controller");
  // Smartgraphs.firstTableController.addObjectByName(Smartgraphs.BracketArc, 'test-rise-bracket'); // Grab the annotation to examine it
  // var annotation = Smartgraphs.firstTableController.findAnnotationByName('test-rise-bracket');
  // ok(annotation.kindOf(Smartgraphs.BracketArc), 'The Annotation is a BracketArc');
  // ok(annotation.get('isClockwise'), 'The annotation should be rendered clockwise');
  // ok(annotation.get('startX'), 'The starting point should not be undefined');
  // ok(annotation.get('endY'), 'The ending point should not be undefined');
  ok(true);
});

test("Creating run BracketArc", function () {
  ok(true);
});
