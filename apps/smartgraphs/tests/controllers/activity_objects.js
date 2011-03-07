// ==========================================================================
// Project:   Smartgraphs.activityObjectsController Unit Test
// Copyright: ©2011 Concord Consortium
// Author:    Richard Klancer
// ==========================================================================
/*globals Smartgraphs module test ok equals same stop start setup teardown */

var activity, dataset1, point1, arrow1;
var datasetNamesObserverFired, annotationNamesObserverFired;
var datasetNamesObserver, annotationNamesObserver;

module("Smartgraphs.activityObjectsController", {
  setup: function () {
    
    setup.fixtures(Smartgraphs.Activity, [
      { "url": "test-activity" },
      { "url": "other-activity" }
    ]);
    
    setup.fixtures(Smartgraphs.Dataset, [
      { "url": "test-activity/dataset1",
        "name": "dataset 1",
        "activity": "test-activity",
        "points": ["p1"]
      }
    ]);
    
    setup.fixtures(Smartgraphs.DataPoint, [
      { "guid": "p1",
        "dataset": "test-activity/dataset1"
      }
    ]);
    
    setup.fixtures(Smartgraphs.HighlightedPoint, [
      { "url": "test-activity/point1",
        "name": "point 1",
        "activity": "test-activity"
      },
      
      { "url": "other-activity/other-point",
        "name": "other point",
        "activity": "other-activity"
      }
    ]);
    
    setup.fixtures(Smartgraphs.Arrow, [
      { "url": "test-activity/arrow1",
        "name": "arrow 1",
        "activity": "test-activity"
      },
      
      { "url": "other-activity/arrow1",
        "name": "arrow 1",                  // conflicting name, but different activity
        "activity": "other-activity"
      }
    ]);
      
    setup.store();
    
    datasetNamesObserverFired = NO;
    datasetNamesObserver = function () {
      datasetNamesObserverFired = YES;
    };
    Smartgraphs.activityObjectsController.addObserver('datasetNames', datasetNamesObserver);
    
    annotationNamesObserverFired = NO;
    annotationNamesObserver = function () {
      annotationNamesObserverFired = YES;
    };
    Smartgraphs.activityObjectsController.addObserver('annotationNames', annotationNamesObserver);
    
    activity = Smartgraphs.store.find(Smartgraphs.Activity, "test-activity"); 
    Smartgraphs.activityController.set('content', activity);
    
    dataset1 = Smartgraphs.store.find(Smartgraphs.Dataset, "test-activity/dataset1");
    point1 = Smartgraphs.store.find(Smartgraphs.HighlightedPoint, "test-activity/point1");
    arrow1 = Smartgraphs.store.find(Smartgraphs.Arrow, "test-activity/arrow1");
  },
  
  teardown: function () {
    Smartgraphs.activityObjectsController.removeObserver('datasetNames', datasetNamesObserver);
    Smartgraphs.activityObjectsController.removeObserver('annotationNames', annotationNamesObserver);        
    teardown.all();
  }
});


test("loadPredefinedObjects should register datasets from store", function () {
  expect(3);
  
  datasetNamesObserverFired = NO;
  Smartgraphs.activityObjectsController.loadPredefinedObjects();

  ok( datasetNamesObserverFired, "observers of datasetNames should have been notified");
  same(Smartgraphs.activityObjectsController.get('datasetNames'), ['dataset 1'], "datasetNames property should match dataset names defined in store");
  var ds = Smartgraphs.activityObjectsController.findDataset('dataset 1');
  equals(ds, dataset1, "findDataset should find a dataset with name 'dataset 1");
});


test("loadPredefinedObjects should register annotations from store", function () {
  expect(3);
  
  annotationNamesObserverFired = NO;
  Smartgraphs.activityObjectsController.loadPredefinedObjects();

  ok( annotationNamesObserverFired, "observers of annotationNames should have been notified");
  var names = Smartgraphs.activityObjectsController.get('annotationNames');
  ok( names.length === 2 && names.indexOf('point 1') >= 0 && names.indexOf('arrow 1') >= 0, "annotationNames property should match annotation names defined in store");
  var anno = Smartgraphs.activityObjectsController.findAnnotation('arrow 1');
  equals(anno, arrow1, "findAnnotation should find the correct 'arrow 1' annotation");
});


test("loadPredefinedObjects should complain if the activity record contains multiple datasets with the same name", function () {
  expect(1);
  
  Smartgraphs.store.createRecord(Smartgraphs.Dataset, { 
    "url": "test-activity/bogus-dataset",
    "name": "dataset 1",
    "activity": "test-activity"
  });
  
  var exceptionRaised = NO;
  try {
    Smartgraphs.activityObjectsController.loadPredefinedObjects();
  }
  catch (e) {
    exceptionRaised = YES;
  }
  ok( exceptionRaised, "loadPredefinedObjects should have raised an exception because of the duplicated 'dataset 1'");
});


test("loadPredefinedObjects should complain if the activity record contains multiple annotations with the same name", function () {
  expect(1);
  
  Smartgraphs.store.createRecord(Smartgraphs.Arrow, {         // different type, but same name, as another annotation
    "url": "test-activity/bogus-annotation",
    "name": "point 1",
    "activity": "test-activity"
  });
  
  var exceptionRaised = NO;
  try {
    Smartgraphs.activityObjectsController.loadPredefinedObjects();
  }
  catch (e) {
    exceptionRaised = YES;
  }
  ok( exceptionRaised, "loadPredefinedObjects should have raised an exception because of the duplicated 'point 1'");
});


// !OBSOLETE

// test("createDataset should create a dataset of the requested type in the current activity session", function () {
//   expect(8);
//   
//   Smartgraphs.activityObjectsController.loadPredefinedObjects();
//   
//   var startingLength = Smartgraphs.activityObjectsController.get('datasetNames').length;
//   datasetNamesObserverFired = NO;
//   Smartgraphs.activityObjectsController.createDataset('dataset 2');
//   
//   ok( datasetNamesObserverFired, "observers of datasetNames should have been notified");
//   ok( Smartgraphs.activityObjectsController.get('datasetNames').indexOf('dataset 2') >= 0, "The datasetNames property should list 'dataset 2'");
//   equals( Smartgraphs.activityObjectsController.get('datasetNames').length, startingLength + 1, "The datasetNames should be one item longer");
//   
//   var query = SC.Query.local(Smartgraphs.Dataset, 'name = "dataset 2"');
//   var datasets = Smartgraphs.store.find(query);
//   equals( datasets.get('length'), 1, "There should now be a dataset with the name 'dataset 2'");
//   var dataset = datasets.objectAt(0);
//   equals( Smartgraphs.activityObjectsController.findDataset('dataset 2'), dataset, "findDataset('dataset 2') should return the new dataset");  
//   ok( dataset.get('status') & SC.Record.READY, "The dataset should have status READY");
//   equals( dataset.get('activity'), activity, "The dataset should be associated with the current activity");
//   equals( dataset.getPath('points.length'), 0, "The dataset's data points should be an empty array" );
// });
// 
// 
// test("createDataset should not allow creation of a dataset with a duplicate name", function () {  
//   expect(1);
//   
//   Smartgraphs.activityObjectsController.loadPredefinedObjects();
//   
//   var exceptionRaised = NO;
//   try {
//     Smartgraphs.activityObjectsController.createDataset('dataset 1');
//   }
//   catch (e) {
//     exceptionRaised = YES;
//   }
//   
//   ok( exceptionRaised, "createDataset should have raised an exception when attempting to create duplicate dataset name 'dataset 1'");
// });
// 
// 
// test("createAnnotation should create an annotation of the requested type in the current activity session", function () {
//   expect(9);
//   Smartgraphs.activityObjectsController.loadPredefinedObjects();
//   
//   var startingLength = Smartgraphs.activityObjectsController.get('annotationNames').length;
//   annotationNamesObserverFired = NO;
//   Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.HighlightedPoint, 'point 2', {
//     point: dataset1.get('points').objectAt(0).get('id'),
//     color: '#badcaf'
//   });
//   
//   ok( annotationNamesObserverFired, "observers of annotationNames should have been notified");
//   ok( Smartgraphs.activityObjectsController.get('annotationNames').indexOf('point 2') >= 0, "The annotationNames property should list 'point 2'");
//   equals( Smartgraphs.activityObjectsController.get('annotationNames').length, startingLength + 1, "The annotationNames should be one item longer");
//   
//   var query = SC.Query.local(Smartgraphs.HighlightedPoint, 'name = "point 2"');
//   var annotations = Smartgraphs.store.find(query);
//   
//   equals( annotations.get('length'), 1, "There should now be a HighlightedPoint annotation with the name 'point 2'");
//   var hp = annotations.objectAt(0);
//   equals( Smartgraphs.activityObjectsController.findAnnotation('point 2'), hp, "findAnnotation('point 2') should return the new point");
//   ok( hp.get('status') & SC.Record.READY, "The annotation should have status READY");
//   equals( hp.get('activity'), activity, "The annotation should be associated with the current activity");
//   
//   equals( hp.get('point'), dataset1.get('points').objectAt(0), "The id passed as the 'point' property should be converted to a model object reference");
//   equals( hp.get('color'), "#badcaf", "The string passed as the 'color' property should be left intact");
//   
// });
// 
// 
// test("createAnnotation should not allow creation of an annotation with a duplicate name", function () {
//   expect(1);
//   
//   Smartgraphs.activityObjectsController.loadPredefinedObjects();
//   
//   var exceptionRaised = NO;
//   try {
//     Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.Arrow, 'point 1', {});
//   }
//   catch (e) {
//     exceptionRaised = YES;
//   }
//   
//   ok( exceptionRaised, "createDataset should have raised an exception when attempting to create duplicate annotation name 'point 1'");
// });
// 
// 
// test("deleteAnnotation should destroy an annotation that is in the session", function () {
//   expect(4);
//   Smartgraphs.activityObjectsController.loadPredefinedObjects();
// 
//   var startingLength = Smartgraphs.activityObjectsController.get('annotationNames').length;
//   annotationNamesObserverFired = NO;
//   var ret = Smartgraphs.activityObjectsController.deleteAnnotation('arrow 1');
//   
//   ok( ret, "deleteAnnotation should return YES");
//   ok( arrow1.get('status') & SC.Record.DESTROYED, "The annotation record should be destroyed");
//   equals( Smartgraphs.activityObjectsController.get('annotationNames').length, startingLength - 1, "there should be one fewer name in the annotationNames property");
//   ok( annotationNamesObserverFired, "observers of annotationNames should have been notified");
// });
// 
// 
// test("deleteAnnotation should return NO and do nothing if the supplied name is not in the session", function () {
//   expect(4);
//   Smartgraphs.activityObjectsController.loadPredefinedObjects();
//   
//   var pointFromOtherActivity = Smartgraphs.store.find(Smartgraphs.HighlightedPoint, "other-activity/other-point");
//   
//   var startingLength = Smartgraphs.activityObjectsController.get('annotationNames').length;
//   annotationNamesObserverFired = NO;
//   var ret = Smartgraphs.activityObjectsController.deleteAnnotation(pointFromOtherActivity.get('name'));    // a bogus name -- it's not from this activity
//   
//   ok( !ret, "deleteAnnotation should return NO");
//   ok( !annotationNamesObserverFired, "observers of annotationNames should NOT have been notified");
//   equals( Smartgraphs.activityObjectsController.get('annotationNames').length, startingLength, "the annotationNames property should be the same length");
//   ok( pointFromOtherActivity.get('status') & SC.Record.READY, "The status of the annotation with the same name from a different activity should be unchanged (READY)");
// });
