// ==========================================================================
// Project:   Smartgraphs.INTERACTIVE_SELECTION Unit Test
// Copyright: ©2010 Concord Consortium
// @author:   Richard Klancer 
// ==========================================================================
/*globals Smartgraphs module test ok equals same stop start setup teardown beginSession endSession */

var pane, graphView, datasetView;

module("Smartgraphs.INTERACTIVE_SELECTION", {
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
    
    Smartgraphs.firstGraphController.openGraph('test-graph');
    Smartgraphs.firstGraphController.addObjectByName(Smartgraphs.Dataset, 'test-dataset');

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

    beginSession();
    
    setup.mock(Smartgraphs, 'statechart', SC.Statechart.create({
      trace: YES,
      rootState: SC.State.design({
        initialSubstate: 'ACTIVITY_STEP',
        ACTIVITY_STEP: SC.State.plugin('Smartgraphs.ACTIVITY_STEP'),
        ACTIVITY_STEP_SUBMITTED: SC.State.design()
      })
    }));
    
    // don't actually do anything when we go into ACTIVITY_STEP
    setup.mock(Smartgraphs, 'ACTIVITY_STEP', Smartgraphs.ACTIVITY_STEP.extend({
      enterState: function () {}
    }));
    
    Smartgraphs.statechart.initStatechart();
  },

  teardown: function () {
    Smartgraphs.firstGraphController.clear();
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
  equals(Smartgraphs.statechart.get('currentStates').getEach('name'), 'INTERACTIVE_SELECTION', "startInteractiveSelection should put Smartgraphs in INTERACTIVE_SELECTION state");
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
