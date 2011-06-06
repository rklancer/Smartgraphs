// ==========================================================================
// Project:   Smartgraphs.graphController Unit Test
// Copyright: ©2010 Concord Consortium
// Author:   Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs module test ok equals same stop start setup teardown setupUserAndSessionFixtures restoreUserAndSessionFixtures beginSession endSession  */

var dataset1, dataset2, dataset3;

function setupGraphFixtures() {

  setup.fixtures(Smartgraphs.Activity, [
    { url: 'test-activity' }
  ]);

  setup.fixtures(Smartgraphs.Dataset, [
    { url: 'test-dataset-1', name: 'test-dataset-1',  activity: 'test-activity'},
    { url: 'test-dataset-2', name: 'test-dataset-2',  activity: 'test-activity'},
    { url: 'test-dataset-3', name: 'test-dataset-3',  activity: 'test-activity'}
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
  
  setup.fixtures(Smartgraphs.Graph, [
    { url: 'test',
      activity: 'test-activity',
      name: 'test',
      title: 'Test Graph',
      xAxis: 'x-axis',
      yAxis: 'y-axis',
      initialDatasets: ['test-dataset-1']
    }
  ]);

}

module("Smartgraphs.graphController", {
  setup: function () {
    
    setupUserAndSessionFixtures();
    setupGraphFixtures();
    setup.store();

    var activity = Smartgraphs.store.find(Smartgraphs.Activity, 'test-activity');     
    Smartgraphs.store.find(Smartgraphs.Dataset);
    Smartgraphs.store.find(Smartgraphs.Unit);
    Smartgraphs.store.find(Smartgraphs.Axis); 
    Smartgraphs.store.find(Smartgraphs.Graph);

    Smartgraphs.activityController.set('content', activity);
    beginSession();
    
    dataset1 = Smartgraphs.activityObjectsController.findDataset('test-dataset-1');
    dataset2 = Smartgraphs.activityObjectsController.findDataset('test-dataset-2');
    dataset3 = Smartgraphs.activityObjectsController.findDataset('test-dataset-3');
  },
  
  teardown: function () {
    Smartgraphs.firstGraphController.clear();
    endSession();
    Smartgraphs.activityController.set('content', null);
    
    restoreUserAndSessionFixtures();
    teardown.all();
  }
});


test("adding dataset to a graph results in assignment of different colors to 'color' property of each dataset", function () {
  expect(8);
  var colorRE = /^#[0-9a-fA-F]{6}$/;
  Smartgraphs.firstGraphController.openGraph('test');
  
  var color1 = dataset1.get('color');
  equals(Smartgraphs.firstGraphController.getPath('datasetList.length'), 1, "firstGraphController should have 1 dataset");
  ok( colorRE.test(color1), 'dataset1 should have a valid color');
  
  var color2 = dataset2.get('color');
  ok( !color2, "dataset2's color should not be defined before it is added to a graph");
  
  Smartgraphs.firstGraphController.addDataset(dataset2);
  color2 = dataset2.get('color');
  ok( colorRE.test(color2), "dataset2 should have a valid color after it is added to the graph (via addDataset)");
  ok( color1 !== color2, "dataset1 and dataset2 should have different colors");
  
  Smartgraphs.firstGraphController.addObjectByName(Smartgraphs.Dataset, dataset3.get('name'));
  var color3 = dataset3.get('color');
  ok( colorRE.test(color3), "dataset3 should have a valid color after it is added to the graph (via addObjectByName)");
  ok( color3 !== color2, "dataset3 and dataset2 should have different colors");
  ok( color3 !== color1, "dataset3 and dataset1 should have different colors");
});


test("Graph controller refuses to add a dataset of the wrong unit type", function () {
  expect(5);
  Smartgraphs.firstGraphController.openGraph('test');
  
  var meters = Smartgraphs.store.find(Smartgraphs.Unit, '/builtins/units/meters');
  var seconds = Smartgraphs.store.find(Smartgraphs.Unit, '/builtins/units/seconds');
  var degrees = Smartgraphs.store.find(Smartgraphs.Unit, '/builtins/units/degrees-celsius');
  var minutes = Smartgraphs.store.find(Smartgraphs.Unit, '/builtins/units/minutes');
  
  var xAxis = Smartgraphs.firstGraphController.get('xAxis');
  var yAxis = Smartgraphs.firstGraphController.get('yAxis');
    
  xAxis.set('units', seconds);
  yAxis.set('units', meters);
  
  var startingLength = Smartgraphs.firstGraphController.getPath('datasetList.length');
  
  dataset2.set('xUnits', null);
  dataset2.set('yUnits', meters);
  Smartgraphs.firstGraphController.addDataset(dataset2);
  equals( Smartgraphs.firstGraphController.getPath('datasetList.length'), startingLength, "graph controller should refuse to add dataset with mismatching units null & meters");
  
  dataset2.set('xUnits', minutes);
  dataset2.set('yUnits', meters);
  Smartgraphs.firstGraphController.addDataset(dataset2);
  equals( Smartgraphs.firstGraphController.getPath('datasetList.length'), startingLength, "graph controller should refuse to add dataset with mismatching units minutes & meters");
  
  dataset2.set('xUnits', seconds);
  dataset2.set('yUnits', null);
  Smartgraphs.firstGraphController.addDataset(dataset2);
  equals( Smartgraphs.firstGraphController.getPath('datasetList.length'), startingLength, "graph controller should refuse to add dataset with mismatching units seconds & null");
  
  dataset2.set('xUnits', seconds);
  dataset2.set('yUnits', degrees);
  Smartgraphs.firstGraphController.addDataset(dataset2);
  equals( Smartgraphs.firstGraphController.getPath('datasetList.length'), startingLength, "graph controller should refuse to add dataset with mismatching units seconds & degrees C");
    
  dataset2.set('xUnits', seconds);
  dataset2.set('yUnits', meters);
  Smartgraphs.firstGraphController.addDataset(dataset2);
  equals( Smartgraphs.firstGraphController.getPath('datasetList.length'), startingLength + 1, "graph controller should add dataset when units match (seconds and meters)");
});

// This test exercises most of the controller.
// TODO: include an annotation.
