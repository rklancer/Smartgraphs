// ==========================================================================
// Project:   Smartgraphs.sessionController Unit Test
// Copyright: ©2010 Concord Consortium
// Author:    Parker Morse <pmorse@cantinaconsulting.com>
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs module test ok equals same stop start  setup teardown */

var activity;
var datasetName = 'dataset 1';
var annotationName =  'highlight 1';

module("Smartgraphs.sessionController", {
  setup: function () {
    
    setup.fixtures(Smartgraphs.Activity, [
      { "url": "test-activity" },
      { "url": "other-activity" }
    ]);
    
    
    setup.fixtures(Smartgraphs.Dataset, [
      { "url": "test-activity/dataset1",
        "name": "dataset 1",
        "activity": "test-activity",
        "points": ["p1"],
        "color": "#badcaf"
      }
    ]);
    
    setup.fixtures(Smartgraphs.DataPoint, [
      { "guid": "p1",
        "dataset": "test-activity/dataset1",
        "x": 0,
        "y": 0
      }
    ]);
    
    setup.fixtures(Smartgraphs.HighlightedPoint, [
      { "url": "test-activity/highlight1",
        "name": "highlight 1",
        "activity": "test-activity",
        "color": "#badcaf"
      }
    ]);

    setup.store();
    Smartgraphs.activityObjectsController._datasets = {};
    Smartgraphs.activityObjectsController._annotations = {};
    
    activity = Smartgraphs.store.find(Smartgraphs.Activity, "test-activity"); 
    Smartgraphs.activityController.set('content', activity);

    // preload the data hashes into the root store so the nested store will see them -- the fixtures data source won't
    // prepopulate the hashes into the root store automatically. This is only necessary in testing situations because
    // the CouchDB datasource automatically pushes the data hashes into the root store when an activity loads.
    Smartgraphs.store.find(Smartgraphs.Dataset, 'test-activity/dataset1');
    Smartgraphs.store.find(Smartgraphs.DataPoint, 'p1');
    Smartgraphs.store.find(Smartgraphs.HighlightedPoint, 'test-activity/highlight1');
    
    Smartgraphs.sessionController.set('content', null);
  },

  teardown: function () {
    if (Smartgraphs.sessionController.get('content')) Smartgraphs.sessionController.endSession();
    teardown.all();
  }
});


test("beginSession should create a new session", function() {
  expect(3);
  equals( Smartgraphs.sessionController.get('content'), null, "The controller's content is initially null" );
  var result = Smartgraphs.sessionController.beginSession(); // Run the method
  var session = Smartgraphs.sessionController.get('content');
  ok( session.kindOf(Smartgraphs.Session), "The controller's content is now a Smartgraphs.Session" );
  // it is easy to fail to set the session's ID if createRecord() called incorrectly
  ok( session.get('id'), "The newly-created session should have a valid identifier");
});


test("beginSession should raise an exception if it is called when a session is already open", function () {
  expect(1);
  
  Smartgraphs.sessionController.beginSession();
  
  var exceptionWasRaised = NO;
  try {
    Smartgraphs.sessionController.beginSession();
  }
  catch (e) {
    exceptionWasRaised = YES;
  }
  
  ok( exceptionWasRaised, "an exception should have been raised when beginSession was called a second time");  
});


test("endSession should clear the sessionController's content", function () {
  expect(2);
  
  Smartgraphs.sessionController.beginSession();
  Smartgraphs.sessionController.endSession();
  equals( Smartgraphs.sessionController.get('content'), null, "sessionController content should be null after endSession");
  
  Smartgraphs.sessionController.beginSession();
  ok( SC.kindOf(Smartgraphs.sessionController.get('content'), Smartgraphs.Session), "The call to beginSession after endSession should succeed and set the sessionController content to a new session");
});


test("beginSession should load predefined objects into the session", function () {
  expect(4);
  
  ok( !Smartgraphs.activityObjectsController.findDataset(datasetName), "Before beginSession, 'dataset 1' should not be findable");
  ok( !Smartgraphs.activityObjectsController.findAnnotation(annotationName), "Before beginSession, 'highlight 1' should not be findable");
  
  Smartgraphs.sessionController.beginSession();
  
  equals( Smartgraphs.activityObjectsController.findDataset(datasetName).get('name'), datasetName, "After beginSession, 'dataset 1' should be findable");
  equals( Smartgraphs.activityObjectsController.findAnnotation(annotationName).get('name'), annotationName, "After beginSession, 'highlight 1' should be findable");
});


test("endSession should throw away changes to activity objects that were made during the session", function () {
  expect(14);

  Smartgraphs.sessionController.beginSession();
  
  function findDataset() {
    return Smartgraphs.store.find(Smartgraphs.Dataset, 'test-activity/dataset1');
  }
  
  function findDatapoint() {
    return Smartgraphs.store.find(Smartgraphs.DataPoint, 'p1');
  }
  
  function findHighlight() {
    return Smartgraphs.store.find(Smartgraphs.HighlightedPoint, 'test-activity/highlight1');
  }
  
  var dataset = findDataset();
  var originalLength = dataset.get('points').get('length');
  var point2 = Smartgraphs.store.createRecord(Smartgraphs.DataPoint, {
    guid: 'p2',
    x: 2,
    y: 2
  });
  point2.set('dataset', dataset);
  ok( dataset.get('status') & SC.Record.DIRTY, "The datapoint record should now be DIRTY");
  equals( dataset.getPath('points.length'), originalLength+1, "The dataset should now have 1 more point");
  ok( point2.get('status') & SC.Record.READY_NEW, "The new datapoint record should be READY_NEW");
  
  var point = findDatapoint();
  var originalX = point.get('x');
  point.set('x', 1);
  ok( point.get('status') & SC.Record.DIRTY, "The datapoint record should be DIRTY");
  ok( point.get('x') !== originalX, "The datapoint record should have a different x value");
  
  var highlight = findHighlight();
  var originalColor = highlight.get('color');
  highlight.set('color', '#000000');

  ok( highlight.get('status') & SC.Record.DIRTY, "The highlight record should be DIRTY");
  ok( highlight.get('color') !== originalColor, "The highlight record should have a different color");  

  Smartgraphs.sessionController.endSession();

  dataset = findDataset();
  ok( dataset.get('status') & SC.Record.CLEAN, "after endSession, the dataset should be CLEAN");
  equals( dataset.getPath('points.length'), originalLength, "after endSession, the dataset's points array should have its original length");
  point2 = Smartgraphs.store.find(Smartgraphs.DataPoint, 'p2');
  // the fixtures data source won't simply return null for a record not defined in the fixtures
  ok( !Smartgraphs.store.readDataHash(point2.get('storeKey')), "after endSession, the second point should not exist in the store");
  
  point = findDatapoint();
  ok( point.get('status') & SC.Record.CLEAN, "after endSession, the highlight record should be CLEAN");
  equals( point.get('x'), originalX, "after endSession, the datapoint should have its original x value");
    
  highlight = findHighlight();
  ok( highlight.get('status') & SC.Record.CLEAN, "after endSession, The highlight record should be CLEAN");
  equals( highlight.get('color'), originalColor, "after endSession, the highlight record should have its original color");
});


test("endSession should destroy activity objects created during a session without notifying their observers", function () {
  expect(2);
  
  Smartgraphs.sessionController.beginSession();
  
  var highlight = Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.HighlightedPoint, 'highlight 2');
  
  var highlightObserverWasCalled = NO;
  var highlightObserver = function () {
    highlightObserverWasCalled = YES;
  };
  
  highlight.addObserver('*', highlightObserver);
  
  highlightObserverWasCalled = NO;
  highlight.set('color', '#000000');
  ok( highlightObserverWasCalled, "observer of highlight properties should have been called when highlight color was changed inside a session");
  
  // need to let a runloop run, otherwise the runloop in endSession will cause the observer to fire spuriously
  SC.RunLoop.begin().end();
  
  highlightObserverWasCalled = NO;
  Smartgraphs.sessionController.endSession();
  ok( !highlightObserverWasCalled, "observer of highlight properties should not have been called when session ended");
});
