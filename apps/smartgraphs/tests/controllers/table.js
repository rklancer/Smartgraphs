// ==========================================================================
// Project:   Smartgraphs.TableController Unit Test
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs module test ok equals same stop start newSession setupUserAndSessionFixtures restoreUserAndSessionFixtures*/

var oldStore;
var session;
var dataset;

function setupFixtures() {
  setupUserAndSessionFixtures();
  
  Smartgraphs.Graph.oldFixtures = Smartgraphs.Graph.FIXTURES;  
  Smartgraphs.Graph.FIXTURES = [
    { url: 'test',
      name: 'test-graph',
      title: 'Test Graph',
      initialDatasets: []
    },
    
    { url: 'test-2',
      name: 'test-graph-2',
      title: 'Test Graph',
      initialDatasets: []
    }
  ];
  
  oldStore = Smartgraphs.store;
  Smartgraphs.set('store', SC.Store.create().from(SC.FixturesDataSource.create()));
}

function restoreFixtures() {
  restoreUserAndSessionFixtures();
  
  Smartgraphs.Graph.FIXTURES = Smartgraphs.Graph.oldFixtures;
  Smartgraphs.set('store', oldStore);
}

module('Table controller', {
  setup: function () {
    setupFixtures();
    newSession();
    
    dataset = Smartgraphs.sessionController.createDataset('test-dataset');
  },    
  
  teardown: function () {
    Smartgraphs.firstGraphController.clear();
    Smartgraphs.secondGraphController.clear();
    Smartgraphs.firstTableController.clear();
    Smartgraphs.secondTableController.clear();
    restoreFixtures();
  }
});


test("table controller should open the named dataset on the named graph", function () {
  expect(5);
  Smartgraphs.firstGraphController.openGraph('test-graph');
  Smartgraphs.firstGraphController.addDataset(dataset);
  
  ok( !Smartgraphs.firstTableController.get('content'), "table controller content should be empty before opening dataset");
  ok( !Smartgraphs.firstTableController.get('dataset'), "table controller dataset should be empty before opening dataset");

  Smartgraphs.firstTableController.openDataset('test-graph', 'test-dataset');
  
  equals( Smartgraphs.firstTableController.get('content'), dataset.get('points'), "table controller content should be dataset points after openDataset()");
  equals( Smartgraphs.firstTableController.get('dataset'), dataset, "table controller 'dataset' property should be dataset after openDataset()");
  equals( Smartgraphs.firstTableController.get('graphController'), Smartgraphs.firstGraphController, "table controller 'graphController' property should be the correct graph controller after openDataset()");
});

test("table controller should reference the correct graph even when two graphs have the same dataset open", function () {
  expect(3);
  Smartgraphs.firstGraphController.openGraph('test-graph');
  Smartgraphs.firstGraphController.addDataset(dataset);
  Smartgraphs.secondGraphController.openGraph('test-graph-2');
  Smartgraphs.secondGraphController.addDataset(dataset);
  
  ok( !Smartgraphs.firstTableController.get('content'), "table controller content should be empty before opening dataset");
  ok( !Smartgraphs.firstTableController.get('dataset'), "table controller dataset should be empty before opening dataset");

  Smartgraphs.firstTableController.openDataset('test-graph-2', 'test-dataset');
  
  equals( Smartgraphs.firstTableController.get('graphController'), Smartgraphs.secondGraphController, "table controller 'graphController' property should be the correct graph controller after openDataset()");
});


test("table controller should wait for the graph and dataset to be opened", function () {
  expect(4);
  Smartgraphs.firstTableController.openDataset('test-graph', 'test-dataset');
  
  ok( !Smartgraphs.firstTableController.get('content'), "table controller content should be empty before dataset is also opened on the graph");
  ok( !Smartgraphs.firstTableController.get('dataset'), "table controller dataset should be empty before dataset is also opened on the graph");
  
  Smartgraphs.firstGraphController.openGraph('test-graph');
  Smartgraphs.firstGraphController.addDataset(dataset);
  
  equals( Smartgraphs.firstTableController.get('content'), dataset.get('points'), "table controller content should be dataset points after graph adds dataset");
  equals( Smartgraphs.firstTableController.get('dataset'), dataset, "table controller 'dataset' property should be dataset after graph adds dataset");
});


test("table controller should not be confused by opening and closing a graph it is not watching", function () {
  expect(6);
  Smartgraphs.firstTableController.openDataset('test-graph', 'test-dataset');
  
  ok( !Smartgraphs.firstTableController.get('content'), "table controller content should be empty before dataset is also opened on the graph");
  ok( !Smartgraphs.firstTableController.get('dataset'), "table controller dataset should be empty before dataset is also opened on the graph");

  Smartgraphs.firstGraphController.openGraph('test-graph-2');
  Smartgraphs.firstGraphController.addDataset(dataset);
  
  ok( !Smartgraphs.firstTableController.get('content'), "table controller content should be empty after dataset is opened on the wrong graph");
  ok( !Smartgraphs.firstTableController.get('dataset'), "table controller dataset should be empty after dataset is opened on the wrong graph");
  
  Smartgraphs.firstGraphController.openGraph('test-graph');
  Smartgraphs.firstGraphController.addDataset(dataset);
  
  equals( Smartgraphs.firstTableController.get('content'), dataset.get('points'), "table controller content should be dataset points after the correct graph adds dataset");
  equals( Smartgraphs.firstTableController.get('dataset'), dataset, "table controller 'dataset' property should be dataset after the correct graph adds dataset");
});


test("table controller should set the 'showTable' property according to whether data is being streamed or not", function () {
  expect(4);
  dataset.set('isStreaming', NO);
  Smartgraphs.firstGraphController.openGraph('test-graph');
  Smartgraphs.firstGraphController.addDataset(dataset); 
  Smartgraphs.firstTableController.openDataset('test-graph', 'test-dataset');
  
  equals( Smartgraphs.firstTableController.get('dataset'), dataset, "table controller 'dataset' property should be the opened dataset");
  equals( Smartgraphs.firstTableController.get('showTable'), YES, "table controller's `showTable` property should be YES if data is not being streamed");
  
  SC.RunLoop.begin();
  dataset.set('isStreaming', YES);
  SC.RunLoop.end();
  
  equals( Smartgraphs.firstTableController.get('showTable'), NO, "table controller's `showTable` property should be NO if data is being streamed");
  
  SC.RunLoop.begin();
  dataset.set('isStreaming', NO);
  SC.RunLoop.end();
  
  equals( Smartgraphs.firstTableController.get('showTable'), YES, "table controller's `showTable` property should be YES again once data is no longer being streamed");
});

test("table controller should support knowing about annotations", function () {
  expect(1);
  equals( Smartgraphs.firstTableController.get('supportsAnnotations'), YES, "The table controller's `supportsAnnotations` property is YES");
});

test("We should be able to find the table controller by dataset name", function () {
  expect(1);
  Smartgraphs.firstTableController.openDataset('test-graph', 'test-dataset');
  same( Smartgraphs.TableController.controllerForDataset['test-dataset'], Smartgraphs.firstTableController, "The Smartgraphs.TableController.controllerForDataset hash has firstTableController for this dataset.");
});
