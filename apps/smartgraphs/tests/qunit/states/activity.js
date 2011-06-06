// ==========================================================================
// Project:   Smartgraphs.ACTIVITY Unit Test
// Copyright: ©2010 Concord Consortium
// Author:   Parker Morse <pmorse@cantinaconsulting.com>
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

  same(Smartgraphs.statechart.get('currentStates').getEach('name'), ['AUTHOR_DEFAULT'], "'openAuthorView' action sent in ACTIVITY state should transition Smartgraphs to AUTHOR(_DEFAULT) state");
  equals(Smartgraphs.activityPageController.get('content'), page, "After 'openAuthorView' action is sent, page controller content should be the same test page.");
});


module("Smartgraphs.ACTIVITY: graph annotation-creating actions", {
  setup: function () {
    setup.fixtures(Smartgraphs.Graph, [
      { url: 'test-graph',
        name: 'test-graph',
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
    
    setup.fixtures(Smartgraphs.DataPoint, [
      { guid: 'p1', x: 1, y: 3 },
      { guid: 'p2', x: 4, y: 5 }
    ]);
    setupUserAndSessionFixtures();
    setup.store();
    
    Smartgraphs.store.find(Smartgraphs.DataPoint);
    Smartgraphs.store.find(Smartgraphs.Axis);
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
  Smartgraphs.statechart.sendAction('createLineThroughPoints', null, {'firstPoint': 'hp1', 'secondPoint': 'hp2', 'lineName': 'test-line', 'color': '#ff0000'});
  equals(Smartgraphs.store.find('Smartgraphs.LineThroughPoints').get('length'), startLineCount + 1, "There should be one more LineThroughPoints");
  equals(Smartgraphs.firstGraphController.get('annotationList').get('length'), startAnnotationsCount, "The new Annotation should not have been added to the controller");
  Smartgraphs.firstGraphController.addObjectByName(Smartgraphs.LineThroughPoints, 'test-line'); // Grab the annotation to examine it
  var annotation = Smartgraphs.firstGraphController.findAnnotationByName('test-line');
  ok(annotation.kindOf(Smartgraphs.LineThroughPoints), 'The Annotation is a LineThroughPoints');
});


test("creating a rise Arrow", function () {
  expect(7);
  var startLineCount = Smartgraphs.store.find('Smartgraphs.Arrow').get('length');
  var hp1 = Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.HighlightedPoint, 'hp1', {'point': 'p1'});
  var hp2 = Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.HighlightedPoint, 'hp2', {'point': 'p2'});
  Smartgraphs.firstGraphController.addAnnotation(hp1);  // The points need to be in the graph to create the arrow
  Smartgraphs.firstGraphController.addAnnotation(hp2);
  var startAnnotationsCount = Smartgraphs.firstGraphController.get('annotationList').get('length');
  Smartgraphs.statechart.sendAction('createRiseArrow', null, {'firstPoint': 'hp1', 'secondPoint': 'hp2', 'arrowName': 'riseArrow', 'color': '#ff0000', 'label': 'Rise'});
  equals(Smartgraphs.store.find('Smartgraphs.Arrow').get('length'), startLineCount + 1, "There should be one more Arrow");
  equals(Smartgraphs.firstGraphController.get('annotationList').get('length'), startAnnotationsCount, "The new Annotation should not have been added to the controller");
  Smartgraphs.firstGraphController.addObjectByName(Smartgraphs.Arrow, 'riseArrow'); // Grab the annotation to examine it
  var annotation = Smartgraphs.firstGraphController.findAnnotationByName('riseArrow');
  ok(annotation.kindOf(Smartgraphs.Arrow), 'The Annotation is an Arrow');
  ok(annotation.get('isVertical'), 'The Annotation is vertical');
  ok(!annotation.get('isHorizontal'), 'The Annotation is not confusingly also horizontal');
  ok(annotation.get('isClockwise'), 'The annotation will be rendered clockwise');
  equals(annotation.get('label'), "Rise", 'The annotation should have a label reading Rise');
});


test("creating a run Arrow", function () {
  expect(6);
  var startLineCount = Smartgraphs.store.find('Smartgraphs.Arrow').get('length');
  var hp1 = Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.HighlightedPoint, 'hp1', {'point': 'p1'});
  var hp2 = Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.HighlightedPoint, 'hp2', {'point': 'p2'});
  Smartgraphs.firstGraphController.addAnnotation(hp1); // The points need to be in the graph to create the arrow
  Smartgraphs.firstGraphController.addAnnotation(hp2);
  var startAnnotationsCount = Smartgraphs.firstGraphController.get('annotationList').get('length');
  Smartgraphs.statechart.sendAction('createRunArrow', null, {'firstPoint': 'hp1', 'secondPoint': 'hp2', 'arrowName': 'runArrow', 'color': '#ff0000', 'label': 'Run'});
  equals(Smartgraphs.store.find('Smartgraphs.Arrow').get('length'), startLineCount + 1, "There should be one more Arrow");
  equals(Smartgraphs.firstGraphController.get('annotationList').get('length'), startAnnotationsCount, "The new Annotation should not have been added to the controller");
  Smartgraphs.firstGraphController.addObjectByName(Smartgraphs.Arrow, 'runArrow');
  var annotation = Smartgraphs.firstGraphController.findAnnotationByName('runArrow'); // Grab the annotation to examine it
  ok(annotation.kindOf(Smartgraphs.Arrow), 'The Annotation is an Arrow');
  ok(annotation.get('isHorizontal'), 'The Annotation is horizontal');
  ok(annotation.get('isClockwise'), 'The annotation will be rendered clockwise');
  equals(annotation.get('label'), "Run", 'The annotation should have a label reading Run');
});


test("Reordering points for rise/run arrows", function () {
  expect(4);
  var hp1 = Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.HighlightedPoint, 'hp1', {'point': 'p1'});
  var hp2 = Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.HighlightedPoint, 'hp2', {'point': 'p2'});
  Smartgraphs.firstGraphController.addAnnotation(hp1); // The points need to be in the graph to create the arrow
  Smartgraphs.firstGraphController.addAnnotation(hp2);
  Smartgraphs.statechart.sendAction('createRunArrow', null, {'firstPoint': 'hp2', 'secondPoint': 'hp1', 'arrowName': 'runArrow', 'color': '#ff0000'});
  Smartgraphs.statechart.sendAction('createRiseArrow', null, {'firstPoint': 'hp2', 'secondPoint': 'hp1', 'arrowName': 'riseArrow', 'color': '#ff0000'});
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
  Smartgraphs.statechart.sendAction('createRunArrow', null, {'firstPoint': 'hp2', 'secondPoint': 'hp1', 'arrowName': 'runArrow', 'color': '#ff0000'});
  Smartgraphs.firstGraphController.addObjectByName(Smartgraphs.Arrow, 'runArrow');
  var runArrow = Smartgraphs.firstGraphController.findAnnotationByName('runArrow'); // Grab the annotation to examine it
  var originalHighlighted = runArrow.get('isHighlighted');
  Smartgraphs.statechart.sendAction('toggleAnnotationHighlight', null, {'annotationName': 'runArrow'});
  equals(runArrow.get('isHighlighted'), !originalHighlighted, "The isHighlighted property should be the inverse of its original value");
});


test("Creating rise BracketArc", function () {
  expect(7);
  var startBracketCount = Smartgraphs.store.find('Smartgraphs.BracketArc').get('length');
  Smartgraphs.firstTableController.openDataset('test-dataset');
  var hp1 = Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.HighlightedPoint, 'hp1', {'point': 'p1'});
  var hp2 = Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.HighlightedPoint, 'hp2', {'point': 'p2'});
  Smartgraphs.firstTableController.addAnnotation(hp1);
  Smartgraphs.firstTableController.addAnnotation(hp2);
  var startAnnotationsCount = Smartgraphs.firstTableController.get('annotationList').get('length');

  Smartgraphs.statechart.sendAction('createRiseBracket', null, {'bracketName': 'test-rise-bracket', 'datasetName': 'test-dataset', 'point1': 'hp1', 'point2': 'hp2', 'label': 'Rise'});
  equals(Smartgraphs.store.find('Smartgraphs.BracketArc').get('length'), startBracketCount + 1, "There should be one more BracketArc");
  equals(Smartgraphs.firstTableController.get('annotationList').get('length'), startAnnotationsCount, "The new Annotation should not have been added to the controller");
  
  var annotation = Smartgraphs.activityObjectsController.findAnnotation('test-rise-bracket');
  ok(annotation.kindOf(Smartgraphs.BracketArc), 'The Annotation is a BracketArc');
  ok(annotation.get('isClockwise'), 'The annotation should be rendered clockwise');
  equals(annotation.get('startX'), 230, 'The starting point should be 230');
  ok(annotation.get('endY'), 'The ending point should not be undefined');
  equals(annotation.get('label'), "Rise", 'The annotation should have a label reading Rise');
});

test("Creating run BracketArc", function () {
  expect(7);
  var startBracketCount = Smartgraphs.store.find('Smartgraphs.BracketArc').get('length');
  Smartgraphs.firstTableController.openDataset('test-dataset');
  var hp1 = Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.HighlightedPoint, 'hp1', {'point': 'p1'});
  var hp2 = Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.HighlightedPoint, 'hp2', {'point': 'p2'});
  Smartgraphs.firstTableController.addAnnotation(hp1);
  Smartgraphs.firstTableController.addAnnotation(hp2);
  var startAnnotationsCount = Smartgraphs.firstTableController.get('annotationList').get('length');

  Smartgraphs.statechart.sendAction('createRunBracket', null, {'bracketName': 'test-run-bracket', 'datasetName': 'test-dataset', 'point1': 'hp1', 'point2': 'hp2', 'label': 'Run'});
  equals(Smartgraphs.store.find('Smartgraphs.BracketArc').get('length'), startBracketCount + 1, "There should be one more BracketArc");
  equals(Smartgraphs.firstTableController.get('annotationList').get('length'), startAnnotationsCount, "The new Annotation should not have been added to the controller");
  
  var annotation = Smartgraphs.activityObjectsController.findAnnotation('test-run-bracket');
  ok(annotation.kindOf(Smartgraphs.BracketArc), 'The Annotation is a BracketArc');
  ok(!annotation.get('isClockwise'), 'The annotation should not be rendered clockwise');
  equals(annotation.get('startX'), 40, 'The starting point should be 40');
  ok(annotation.get('endY'), 'The ending point should not be undefined');
  equals(annotation.get('label'), "Run", 'The annotation should have a label reading Run');
});

test("Creating LabelAnnotation", function () {
  expect(11);
  var startLabelCount = Smartgraphs.store.find('Smartgraphs.LabelAnnotation').get('length');

  // Test creation with point GUID
  Smartgraphs.statechart.sendAction('createLabelAnnotation', null, {"labelName": "stooge-one", "point": "p1", "label": "Larry"});
  var firstLabelCount = Smartgraphs.store.find('Smartgraphs.LabelAnnotation').get('length');
  equals ( firstLabelCount, startLabelCount + 1, "There should be one more LabelAnnotation");
  var stooge = Smartgraphs.activityObjectsController.findAnnotation('stooge-one');
  ok ( stooge.kindOf(Smartgraphs.LabelAnnotation), "We've created a LabelAnnotation using a GUID");
  equals ( stooge.get('label'), 'Larry', "The annotation's label is Larry");
  equals ( stooge.get('color'), '#000000', "The annotation's color is black");
  ok ( stooge.get('point').kindOf(Smartgraphs.DataPoint), "The annotation has a point");

  // Test creation with DataPoint
  var point = Smartgraphs.store.find('Smartgraphs.DataPoint', 'p2');
  Smartgraphs.statechart.sendAction('createLabelAnnotation', null, {"labelName": "stooge-two", "point": point, "label": "Moe"});
  var secondLabelCount = Smartgraphs.store.find('Smartgraphs.LabelAnnotation').get('length');
  equals ( secondLabelCount, firstLabelCount + 1, "There should be one more LabelAnnotation");
  stooge = Smartgraphs.activityObjectsController.findAnnotation('stooge-two');
  ok ( stooge.kindOf(Smartgraphs.LabelAnnotation), "We've created a LabelAnnotation using a DataPoint");
  ok ( stooge.get('point').kindOf(Smartgraphs.DataPoint), "The annotation has a point");

  // Test creation with HighlightedPoint
  var hp1 = Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.HighlightedPoint, 'hp1', {'point': 'p1'});
  Smartgraphs.statechart.sendAction('createLabelAnnotation', null, {"labelName": "stooge-three", "point": point, "label": "Curly"});
  var thirdLabelCount = Smartgraphs.store.find('Smartgraphs.LabelAnnotation').get('length');
  equals ( thirdLabelCount, secondLabelCount + 1, "There should be one more LabelAnnotation");
  stooge = Smartgraphs.activityObjectsController.findAnnotation('stooge-three');
  ok ( stooge.kindOf(Smartgraphs.LabelAnnotation), "We've created a LabelAnnotation using a HighlightedPoint");
  ok ( stooge.get('point').kindOf(Smartgraphs.DataPoint), "The annotation has a point");
});
