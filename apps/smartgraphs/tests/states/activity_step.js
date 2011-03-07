// ==========================================================================
// Project:   Smartgraphs.ACTIVITY_STEP Unit Test
// Copyright: ©2010 Concord Consortium
// Author:   Parker Morse <pmorse@cantinaconsulting.com>
// ==========================================================================
/*globals Smartgraphs module test ok equals same stop start setup teardown setupUserAndSessionFixtures */

var pane, graphView, datasetView;

module("Smartgraphs.ACTIVITY_STEP", {
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
    Smartgraphs.store.find(Smartgraphs.Unit);

    setup.mock(Smartgraphs.activityStepController, 'begin', function () {});
    setup.mock(Smartgraphs.activityStepController, 'content', Smartgraphs.store.createRecord(Smartgraphs.ActivityStep, {}));

    setup.mock(Smartgraphs, 'SENSOR', SC.State.design());
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

test("creating a HighlightedPoint record with color param", function () {
  expect(4);
  var startingAnnotationCount = Smartgraphs.store.find('Smartgraphs.HighlightedPoint').get('length');
  var controllerAnnotationCount = Smartgraphs.firstGraphController.get('annotationList').get('length');
  // create the annotation
  var handlingState = Smartgraphs.statechart.sendAction('createAnnotation', null, {'type': Smartgraphs.HighlightedPoint, 'name': "TestHighlighted", 'graphName': 'test-graph'});
  equals( handlingState.get('name'), 'ACTIVITY_STEP', "ACTIVITY_STEP should have handled the createAnnotation action");
  equals( Smartgraphs.store.find('Smartgraphs.HighlightedPoint').get('length'), startingAnnotationCount + 1, "There should be one more HighlightedPoint annotation in the store");
  equals( Smartgraphs.firstGraphController.get('annotationList').get('length'), controllerAnnotationCount + 1, "There should be one more annotation associated with the controller");
  ok( Smartgraphs.firstGraphController.findAnnotationByName('TestHighlighted').kindOf(Smartgraphs.HighlightedPoint), "The controller can find the annotation, which is the appropriate type");
});


test("startSensorInput should create a dataset with the appropriate properties, and transition to SENSOR state", function () {
  expect(10);

  var handlingState = Smartgraphs.statechart.sendAction('startSensorInput', null, { graphName: 'test-graph', datasetName: 'sensor-data' });
  equals( handlingState.get('name'), 'ACTIVITY_STEP', "ACTIVITY_STEP should have handled the startSensorInput action");
  
  var sensorDataset = Smartgraphs.activityObjectsController.findDataset('sensor-data');
  same(Smartgraphs.statechart.get('currentStates').getEach('name'), ['SENSOR'], "startSensorInput should have transitioned to the SENSOR state");
  
  ok( SC.kindOf(sensorDataset, Smartgraphs.Dataset), "startSensorInput should have created a Dataset object");
  equals( Smartgraphs.sensorController._dataset, sensorDataset, "startSensorInput should have registered the new Dataset with the sensorController");

  var meters = Smartgraphs.store.find(Smartgraphs.Unit, '/builtins/units/meters');
  var seconds = Smartgraphs.store.find(Smartgraphs.Unit, '/builtins/units/seconds');
    
  equals( sensorDataset.get('xUnits'), seconds, "sensor dataset should have seconds on x axis");
  equals( sensorDataset.get('yUnits'), meters, "sensor dataset should have meters on y axis");
  
  equals( sensorDataset.get('xLabel'), 'Time', "sensor dataset x label should be 'Time'");
  equals( sensorDataset.get('xShortLabel'), 'Time', "sensor dataset x short label should be 'Time'");
  equals( sensorDataset.get('yLabel'), 'Position', "sensor dataset y label should be 'Position'");  
  equals( sensorDataset.get('yShortLabel'), 'Position', "sensor dataset y short label should be 'Position'");
});