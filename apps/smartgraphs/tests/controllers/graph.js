// ==========================================================================
// Project:   Smartgraphs.graphController Unit Test
// Copyright: ©2010 Concord Consortium
// @author:   Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs module test ok equals same stop start setupUserAndSessionFixtures newSession restoreUserAndSessionFixtures */

var oldStore;
var dataset1, dataset2, dataset3;

function setupGraphFixtures() {

  // without some data in a RecordType's FIXTURES, the FixturesDataSource won't allow any records to be committed.
  Smartgraphs.Dataset.oldFixtures = Smartgraphs.Dataset.FIXTURES;
  Smartgraphs.Dataset.FIXTURES = [{url: 'dataset-1'}];
  
  Smartgraphs.Graph.oldFixtures = Smartgraphs.Graph.FIXTURES;  
  Smartgraphs.Graph.FIXTURES = [
    { url: 'test',
      name: 'test',
      title: 'Test Graph',
      initialDatasets: [dataset1.get('name')]
    }
  ];
}

function restoreGraphFixtures() {
  Smartgraphs.Graph.FIXTURES = Smartgraphs.Graph.oldFixtures;
  Smartgraphs.Dataset.FIXTURES = Smartgraphs.Dataset.oldFixtures;
}


module("Smartgraphs.graphController", {
  setup: function () {
    oldStore = Smartgraphs.store;
    Smartgraphs.set('store', SC.Store.create().from(SC.FixturesDataSource.create()));
    
    setupUserAndSessionFixtures();
    newSession();
   
    dataset1 = Smartgraphs.sessionController.createDataset('test-dataset-1');
    dataset2 = Smartgraphs.sessionController.createDataset('test-dataset-2');
    dataset3 = Smartgraphs.sessionController.createDataset('test-dataset-3');
       
    setupGraphFixtures();
  },
  
  teardown: function () { 
    restoreUserAndSessionFixtures();
    restoreGraphFixtures();
    Smartgraphs.set('store', oldStore);
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
// This test exercises most of the controller.
// TODO: include an annotation.
