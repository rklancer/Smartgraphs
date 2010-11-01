// ==========================================================================
// Project:   Smartgraphs - test of SelectedPointInspector
// Copyright: ©2010 Concord Consortium
// @author:   Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs RaphaelViews module test ok equals same stop start afterPropertyChange newSession setupUserAndSessionFixtures restoreUserAndSessionFixtures addPoint setupDatapointFixtures restoreDatapointFixtures */

var oldStore;
var session;
var dataset;
var p1;
var p2;
var p3;
var inspector;

function setupFixtures() {
  setupUserAndSessionFixtures();
  setupDatapointFixtures();
  
  Smartgraphs.Graph.oldFixtures = Smartgraphs.Graph.FIXTURES;  
  Smartgraphs.Graph.FIXTURES = [
    { url: 'test-graph',
      name: 'test-graph',
      axes: 'test-axes',
      title: 'Test Graph',
      initialDataset: []
    }
  ];
  
  oldStore = Smartgraphs.store;
  Smartgraphs.set('store', SC.Store.create().from(SC.FixturesDataSource.create()));
}

function restoreFixtures() {
  restoreUserAndSessionFixtures();
  restoreDatapointFixtures();
  
  Smartgraphs.Graph.FIXTURES = Smartgraphs.Graph.oldFixtures;
  Smartgraphs.Axes.FIXTURES = Smartgraphs.Axes.oldFixtures;
  Smartgraphs.set('store', oldStore);
}


module('selectedPointInspector', {
  setup: function () {
    setupFixtures();
    newSession();

    dataset = Smartgraphs.sessionController.createDataset('test-dataset');
    p1 = addPoint(dataset, 1, 1);
    p2 = addPoint(dataset, 2, 2);
    p3 = addPoint(dataset, 3, 3);
    
    Smartgraphs.firstGraphController.openGraph('test-graph');
    Smartgraphs.firstGraphController.addDataset(dataset); 
    
    inspector = Smartgraphs.SelectedPointInspector.create({
      config: {
        graphName: 'test-graph',
        datasetName: 'test-dataset'
      }
    });
  },

  teardown: function () {
    Smartgraphs.firstGraphController.clear();
    restoreFixtures();
  }
});


test('SelectedPointInspector should return the selected point on the specified graph', function () {
  var selection = SC.SelectionSet.create();
  dataset.set('selection', selection);
  
  // check that the inspector returns undefined when the selection is empty
  inspector.inspect();
  equals(inspector.get('value'), undefined, "inspector value should be undefined when there is no selection");
  
  // check that the inspector returns p1 when that's all that is selected.
  selection.addObject(p1);
  inspector.inspect();
  equals(inspector.get('value'), p1, "inspector value should be p1 when p1 is selected");
  
  // check that the inspector returns undefined when the selection is ambiguous (has length > 1)
  selection.addObject(p2);
  inspector.inspect();
  equals(inspector.get('value'), undefined, "inspector value should be undefined when more than one point is selected");
  
  // check that we understand the removal of objects from the selection set
  selection.removeObject(p1);
  inspector.inspect();
  equals(inspector.get('value'), p2, "inspector value should be p2 when p1 is removed from the selection {p1, p2}");
  
  // check that the inspector does the right thing when the dataset's SelectionSet object is swapped out entirely
  selection = SC.SelectionSet.create();
  selection.addObject(p3);
  dataset.set('selection', selection);
  inspector.inspect();
  equals(inspector.get('value'), p3, "inspector value should be p3 when selection is set to a new SelectionSet containing only p3");
});


