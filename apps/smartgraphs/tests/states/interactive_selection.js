// ==========================================================================
// Project:   Smartgraphs.TAGGING_TOOL Unit Test
// Copyright: ©2010 Concord Consortium
// Author:   Richard Klancer 
// ==========================================================================
/*globals Smartgraphs module test ok equals same stop start setup teardown setupUserAndSessionFixtures */

var pane, graphView, datasetView;
var dataset;

module("Smartgraphs.TAGGING_TOOL", {
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
    Smartgraphs.statechart.gotoState('ACTIVITY_STEP');
    SC.RunLoop.end();
    
    var points = Smartgraphs.store.find(Smartgraphs.DataPoint);
    dataset = Smartgraphs.activityObjectsController.createDataset('test-dataset');
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


function startSelection(color) {
  Smartgraphs.statechart.sendAction('startInteractiveSelection', this, {
    annotationName: 'test-annotation',
    graphName: 'test-graph',
    datasetName: 'test-dataset',
    color: color
  });
}


test("Preconditions should be met", function () { 
  expect(4);
  same(Smartgraphs.statechart.get('currentStates').getEach('name'), ['ACTIVITY_STEP_DEFAULT'], "We should start in ACTIVITY_STEP_DEFAULT state");
  ok(SC.kindOf(datasetView, Smartgraphs.DatasetView), "There should be a datasetView on the graph");
  var point = datasetView.get('childViews').objectAt(0).get('content');
  ok(SC.kindOf(point, Smartgraphs.DataPoint), "The datasetView should contain a point");
  equals(point.getPath('dataset.name'), 'test-dataset', "The point in the dataSetView should be from the test dataset");
});


test("startInteractiveSelection should create a point-centered annotation and move Smartgraphs into the INTERACTIVE_ANNOTATION state", function () {
  expect(2);
  startSelection();
  var foundAnnotation = Smartgraphs.firstGraphController.findAnnotationByName('test-annotation');

  ok( SC.kindOf(foundAnnotation, Smartgraphs.Annotation), "The annotation should have been put on the graph and should be of type Smartgraphs.Annotation");
  equals(Smartgraphs.statechart.get('currentStates').getEach('name'), 'TAGGING_TOOL', "startInteractiveSelection should put Smartgraphs in TAGGING_TOOL state");
});


test("optional 'color' argument to startInteractiveSelection should set 'color' attribute of annotation", function () {
  expect(1);
  startSelection('#badcaf');
  var annotation = Smartgraphs.firstGraphController.findAnnotationByName('test-annotation');
  equals(annotation.get('color'), '#badcaf', "After sendAction, the annotation should have the requested color '#badcaf'");
});


test("submission should be disabled after startInteractiveSelection and should be enabled when a point is clicked on", function () {
  expect(2);
  startSelection();
  ok( !Smartgraphs.activityStepController.get('canSubmit'), "Immediately after startInteractiveSelection, submission should be disabled");
  var pointLayer = datasetView.get('childViews').objectAt(0).get('layer');

  SC.Event.trigger(pointLayer, 'mousedown');
  
  ok( Smartgraphs.activityStepController.get('canSubmit'), "After simulated mouse click on datapoint, submission should be enabled");
});


test("clicking on points in the graph should change the annotation's 'point' property", function () {
  expect(3);
  var point1View = datasetView.get('childViews').objectAt(0);
  var point2View = datasetView.get('childViews').objectAt(1);
  
  startSelection();
  var annotation = Smartgraphs.firstGraphController.findAnnotationByName('test-annotation');
  
  equals( annotation.get('point'), null, "annotation 'point' property should be null before any datapoint is clicked");
  
  SC.Event.trigger(point1View.get('layer'), 'mousedown');
  equals( annotation.get('point'), point1View.get('content'), "annotation 'point' property should be datapoint 1 after datapoint 1 is clicked");
  
  SC.Event.trigger(point2View.get('layer'), 'mousedown');
  equals( annotation.get('point'), point2View.get('content'), "annotation 'point' property should be datapoint 2 after datapoint 2 is clicked");
});


test("after submission, clicking on points in the graph should not change the annotation's 'point' property", function () {
  expect(3);
  var point1View = datasetView.get('childViews').objectAt(0);
  var point2View = datasetView.get('childViews').objectAt(1);
  
  startSelection();
  var annotation = Smartgraphs.firstGraphController.findAnnotationByName('test-annotation');

  SC.Event.trigger(point1View.get('layer'), 'mousedown');
  equals( annotation.get('point'), point1View.get('content'), "annotation 'point' property should be datapoint 1 after datapoint 1 is clicked");

  Smartgraphs.statechart.sendAction('submitStep');
  equals( annotation.get('point'), point1View.get('content'), "annotation 'point' property should still be datapoint 1 after submission of step");
  
  SC.Event.trigger(point2View.get('layer'), 'mousedown');
  equals( annotation.get('point'), point1View.get('content'), "annotation 'point' property should still be datapoint 1 after clicking on datapoint 2 post-submission");  
});
