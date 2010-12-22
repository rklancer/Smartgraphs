// ==========================================================================
// Project:   Smartgraphs.ACTIVITY_STEP_SUBMITTED Unit Test
// Copyright: ©2010 Concord Consortium
// @author:   Parker Morse <pmorse@cantinaconsulting.com>
// ==========================================================================
/*globals Smartgraphs module test ok equals same stop start setup teardown setupUserAndSessionFixtures beginSession endSession */

var dataset;

module("Smartgraphs.ACTIVITY_STEP_SUBMITTED", {
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
    
    beginSession();
    
    var points = Smartgraphs.store.find(Smartgraphs.DataPoint);
    dataset = Smartgraphs.activityObjectsController.createDataset('test-dataset');
    points.setEach('dataset', dataset);
    
    setup.mock(Smartgraphs, 'ACTIVITY_STEP_SUBMITTED', Smartgraphs.ACTIVITY_STEP_SUBMITTED.extend({
      enterState: function () {}
    }));
    
    setup.mock(Smartgraphs, 'statechart', SC.Statechart.create({
      trace: YES,
      rootState: SC.State.design({
        initialSubstate: 'ACTIVITY_STEP_SUBMITTED',
        ACTIVITY_STEP_SUBMITTED: SC.State.plugin('Smartgraphs.ACTIVITY_STEP_SUBMITTED')
      })
    }));
    
    Smartgraphs.statechart.initStatechart();
  },

  teardown: function () {
    Smartgraphs.firstGraphController.clear();
    endSession();
    teardown.all();
  }
});


test("creating a HighlightedPoint record from the selection in a dataset", function () {
  expect(5);
  var startingAnnotationCount = Smartgraphs.store.find('Smartgraphs.HighlightedPoint').get('length');

  var graphName = 'test-graph';
  Smartgraphs.firstGraphController.openGraph(graphName); // Set the graph

  // This code actually "borrowed" from the method we're testing...
  Smartgraphs.firstGraphController.addDataset(dataset);
  equals(dataset.get('selection'), null, "There is no datapoint selected yet");

  // select a point in the dataset
  dataset.set('selection', SC.SelectionSet.create());
  dataset.get('selection').addObject(dataset.get('points').firstObject());
  equals(dataset.get('selection').get('length'), 1, "The dataset has one point selected");

  // create the annotation
  var handlingState = Smartgraphs.statechart.sendAction('createHighlightedPointFromSelection', null, {'graphName': graphName, 'datasetName': 'test-dataset', 'highlightedPointName': 'FirstPointOfSlope'});
  equals( handlingState.get('name'), 'ACTIVITY_STEP_SUBMITTED', "ACTIVITY_STEP_SUBMITTED should handle the createHighlightedPointFromSelection action");
  var currentAnnotationCount = Smartgraphs.store.find('Smartgraphs.HighlightedPoint').refresh().get('length');
  equals(currentAnnotationCount, startingAnnotationCount + 1, "There is one more HighlightedPoint");
  var newHp = Smartgraphs.activityObjectsController.findAnnotation('FirstPointOfSlope');  
  equals(newHp.get('point'), dataset.get('selection').firstObject(), "The highlighted point is the first one from the dataset");
});