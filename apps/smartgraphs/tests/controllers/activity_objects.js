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
        "activity": "test-activity"
      }
    ]);
    
    setup.fixtures(Smartgraphs.HighlightedPoint, [
      { "url": "test-activity/point1",
        "name": "point 1",
        "activity": "test-activity"
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
  expect(2);
  Smartgraphs.activityObjectsController.loadPredefinedObjects();
  same(Smartgraphs.activityObjectsController.get('datasetNames'), ['dataset 1'], "datasetNames property should match dataset names defined in store");
  var ds = Smartgraphs.activityObjectsController.findDataset('dataset 1');
  equals(ds, dataset1, "findDataset should find a dataset with name 'dataset 1");
});

test("loadPredefinedObjects should register annotations from store", function () {
  expect(2);
  Smartgraphs.activityObjectsController.loadPredefinedObjects();
  var names = Smartgraphs.activityObjectsController.get('annotationNames');
  ok( names.length === 2 && names.indexOf('point 1') >= 0 && names.indexOf('arrow 1') >= 0, "annotationNames property should match annotation names defined in store");
  var anno = Smartgraphs.activityObjectsController.findAnnotation('arrow 1');
  equals(anno, arrow1, "findAnnotation should find the correct 'arrow 1' annotation");
});

test("loadPredefinedObjects should destroy an annotation from store", function () {
  expect(3);
  Smartgraphs.activityObjectsController.loadPredefinedObjects();
  var startingLength = Smartgraphs.activityObjectsController.get('annotationNames').length;
  
  annotationNamesObserverFired = NO;
  Smartgraphs.activityObjectsController.deleteAnnotation('arrow 1');
  
  ok( arrow1.get('status') & SC.Record.DESTROYED, "The annotation record should be destroyed");
  equals( Smartgraphs.activityObjectsController.get('annotationNames').length, startingLength - 1, "there should be one fewer name in the annotationNames property");
  ok( annotationNamesObserverFired, "observers of annotationNames should have been notified");
});

/*
loadPredefinedObjects should...

... clear predefined dataset/annotation names
...iterate over *all* Annotation types
... notify datasetNames
... notify annotationNames

createDataset should
 ... throw an error if duplicate name
 ... return the dataset
 ... notify datasetNames, add new annotation
 
createAnnotation should
  ... throw an error if duplicate name
  ... return the annotation
  ... notify annotationNames, add new annotation
  
*/

