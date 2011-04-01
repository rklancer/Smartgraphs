// ==========================================================================
// Project:   Smartgraphs.TableController Unit Test
// Copyright: ©2010 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs module test ok equals same stop start beginSession endSession setupUserAndSessionFixtures restoreUserAndSessionFixtures setup teardown*/

var dataset;

module('Table controller', {
  setup: function () {

    setup.fixtures(Smartgraphs.Activity, [
      { url: 'test-activity' }
    ]);

    setup.fixtures(Smartgraphs.Dataset, [
      { url: 'test-dataset', name: 'test-dataset', activity: 'test-activity'}
    ]);
    
    setupUserAndSessionFixtures();
    setup.store();
    
    Smartgraphs.store.find(Smartgraphs.Dataset);
    var activity = Smartgraphs.store.find(Smartgraphs.Activity, 'test-activity');     
    Smartgraphs.activityController.set('content', activity);
    beginSession();
    
    dataset = Smartgraphs.activityObjectsController.findDataset('test-dataset');
  },    
  
  teardown: function () {
    Smartgraphs.firstTableController.clear();
    Smartgraphs.secondTableController.clear();
    Smartgraphs.activityController.set('content', null);
    endSession();
    restoreUserAndSessionFixtures();
    teardown.store();
  }
});


test("table controller should open the named dataset", function () {
  expect(4);
  
  ok( !Smartgraphs.firstTableController.get('content'), "table controller content should be empty before opening dataset");
  ok( !Smartgraphs.firstTableController.get('dataset'), "table controller dataset should be empty before opening dataset");

  Smartgraphs.firstTableController.openDataset('test-dataset');
  
  equals( Smartgraphs.firstTableController.get('content'), dataset.get('points'), "table controller content should be dataset points after openDataset()");
  equals( Smartgraphs.firstTableController.get('dataset'), dataset, "table controller 'dataset' property should be dataset after openDataset()");
});


test("table controller should set the 'showTable' property according to whether data is being streamed or not", function () {
  expect(4);
  dataset.set('isStreaming', NO);
  Smartgraphs.firstTableController.openDataset('test-dataset');
  
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
  Smartgraphs.firstTableController.openDataset('test-dataset');
  same( Smartgraphs.TableController.controllerForDataset['test-dataset'], Smartgraphs.firstTableController, "The Smartgraphs.TableController.controllerForDataset hash has firstTableController for this dataset.");
});
