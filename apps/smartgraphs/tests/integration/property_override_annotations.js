// ==========================================================================
// Project:   Smartgraphs property annotations Unit Test
// Copyright: ©2011 Concord Consortium
// Author:    Richard KLancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs module test ok equals same stop start setup teardown beginSession endSession */

// We'll test the targetObject/targetProperty/sourceProperty stuff more generically elsewhere (?); here we test the 
// specific implementation embodied in HighlightedPoint

var dataset1, dataset2;
var datasetViews;
var p1, p2;
var hp1;
var dataPointViews;

var pane;
var graphView, graph2View;

var N_SETUP_TESTS = 6;

module("Smartgraphs Property Annotations", {
  setup: function() {

    setup.fixtures(Smartgraphs.Graph, [
      { url: 'test-graph',
        name: 'test-graph',
        xAxis: 'x-axis',
        yAxis: 'y-axis',
        title: 'Test Graph',
        initialDatasets: []    
      },
      { url: 'test-graph-2',
        name: 'test-graph-2',
        xAxis: 'x-axis',
        yAxis: 'y-axis',
        title: 'Test Graph 2',
        initialDatasets: []    
      }
    ]);
    
    setup.fixtures(Smartgraphs.Axis, [
      { url: 'x-axis',
        min: 0,
        max: 10,
        nSteps: 10,
        label: 'x axis'
      },

      { url: 'y-axis',
        min: 0,
        max: 10,
        nSteps: 10,
        label: 'y axis'
      }
    ]);
    
    setup.fixtures(Smartgraphs.Dataset, [
      { url: 'dummy' }
    ]);
    
    setup.fixtures(Smartgraphs.DataPoint, [
      { guid: 'p1',
        x: 1,
        y: 1
      },
      
      { guid: 'p2',
        x: 2,
        y: 2
      }
    ]);

    setup.store();    
    Smartgraphs.preloadFixtures();    
    
    beginSession();
    
    Smartgraphs.firstGraphController.openGraph('test-graph');
    Smartgraphs.secondGraphController.openGraph('test-graph-2');
    
    SC.RunLoop.begin();
    pane = SC.MainPane.create({
      childViews: [
        Smartgraphs.GraphView.design({
          graphControllerBinding: 'Smartgraphs.firstGraphController',
          viewName: 'testGraphView'
        }),
        Smartgraphs.GraphView.design({
          graphControllerBinding: 'Smartgraphs.secondGraphController'
        })]
    });
    pane.append();
    SC.RunLoop.end();

    graphView = pane.get('childViews').objectAt(0);
    equals(graphView.get('graphController'), Smartgraphs.firstGraphController, "graphView should correspond to first graph");
    graph2View = pane.get('childViews').objectAt(1);
    equals(graph2View.get('graphController'), Smartgraphs.secondGraphController, "graph2View should correspond to second graph");
    
    p1 = Smartgraphs.store.find(Smartgraphs.DataPoint, 'p1');
    p2 = Smartgraphs.store.find(Smartgraphs.DataPoint, 'p2');
    
    dataset1 = Smartgraphs.activityObjectsController.createDataset('dataset1');
    dataset2 = Smartgraphs.activityObjectsController.createDataset('dataset2');    
    dataset1.get('points').pushObject(p1);
    dataset2.get('points').pushObject(p2);
    
    SC.RunLoop.begin();
    Smartgraphs.firstGraphController.addDataset(dataset1);
    Smartgraphs.firstGraphController.addDataset(dataset2);
    SC.RunLoop.end();

    datasetViews = {};
    dataPointViews = {};
    graphView.getPath('graphCanvasView.dataHolder.childViews').forEach( function (datasetView) {
      datasetViews[datasetView.getPath('item.name')] = datasetView;
      datasetView.get('childViews').forEach( function (dataPointView) {
        dataPointViews[dataPointView.getPath('content.id')] = dataPointView;
      });
    });
    
    equals(datasetViews['dataset1'].get('item'), dataset1, "datasetViews['dataset1'] should be the dataset view for dataset1");
    equals(datasetViews['dataset2'].get('item'), dataset2, "datasetViews['dataset2'] should be the dataset view for dataset2");
    equals(dataPointViews['p1'].get('content'), p1, "dataPointViews['p1'] should be the data point view for p1");
    equals(dataPointViews['p2'].get('content'), p2, "dataPointViews['p2'] should be the data point view for p2");
    
    datasetViews['dataset1'].set('overrideColor', '#000000');
    dataPointViews['p1'].set('overrideColor', '#000000');

    hp1 = Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.HighlightedPoint, 'hp1', {
      displayStyle: Smartgraphs.HighlightedPoint.HIGHLIGHT_POINT_AND_DIM_BACKGROUND_STYLE,
      point: 'p1',
      pointColor: '#badcaf',
      datasetColor: '#caffe1'
    });
  },

  teardown: function() {
    Smartgraphs.firstGraphController.clear();
    Smartgraphs.secondGraphController.clear();    
    graphView.bindings.forEach( function (b) { b.disconnect(); } );
    graph2View.bindings.forEach( function (b) { b.disconnect(); } );
    
    pane.remove();
    pane = graphView = graph2View = null;
    
    endSession();
    
    teardown.store();
  }
});


test("property-modifying annotation types that do not require a separate annotation view shouldn't cause an annotation view to be intantiated", function () {
  expect(N_SETUP_TESTS + 7);
    
  var hp1 = Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.HighlightedPoint, 'hp1-2', {
    displayStyle: Smartgraphs.HighlightedPoint.CIRCLE_STYLE,
    point: 'p1'
  });
  
  var hp2 = Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.HighlightedPoint, 'hp2', {
    displayStyle: Smartgraphs.HighlightedPoint.HIGHLIGHT_POINT_AND_DIM_BACKGROUND_STYLE,
    point: 'p2'
  });
  
  equals(hp1.get('point'), p1, "Highlighted point #1 should point at point p1");
  equals(hp2.get('point'), p2, "Highlighted point #2 should point at point p2");

  equals(hp1.get('viewClass'), Smartgraphs.HighlightedPointView, "viewClass of 'circle-point' style HighlightedPoint should be Smartgraphs.HighlightedPointView");
  ok( !hp2.get('viewClass'), "viewClass of 'recolor-point-and-dim-dataset' style HighlightedPoint should be falsy");
  equals( hp2.get('displayStyle'), Smartgraphs.HighlightedPoint.HIGHLIGHT_POINT_AND_DIM_BACKGROUND_STYLE, "displayStyle of 'highlight-and-dim' style HighlightedPoint should be Smartgraphs.HighlightedPoint.HIGHLIGHT_POINT_AND_DIM_BACKGROUND_STYLE");
  
  var annotationsHolder = graphView.getPath('graphCanvasView.annotationsHolder');
  var startingLength = annotationsHolder.getPath('childViews.length');
  Smartgraphs.firstGraphController.addAnnotation(hp1);
  equals( annotationsHolder.getPath('childViews.length'), startingLength + 1, "Adding 'circle-point' style HighlightedPoint should increase by 1 the number of annotation views");

  Smartgraphs.firstGraphController.addAnnotation(hp2);
  // TODO 
  equals( annotationsHolder.getPath('childViews.length'), startingLength + 1, "Adding 'recolor-point-and-dim-datset' style HighlightedPoint should not increase the number of annotation views");
});


test("the relevant properties of the item views are written to when annotation is added to the graph/table", function () {  
  expect(N_SETUP_TESTS + 2);
  
  SC.RunLoop.begin();
  Smartgraphs.firstGraphController.addAnnotation(hp1);
  SC.RunLoop.end();
  
  // NOTE of course we check that the property is set on the *view*, not the *item*.
  equals( datasetViews['dataset1'].get('overrideColor'), '#caffe1', "The HighlightedPoint 'recolor' annotation should override the datasetView color");
  equals( dataPointViews['p1'].get('overrideColor'), '#badcaf', "The HighlightedPoint 'recolor' annotation should override the dataPointView color");  
});


test("the relevant properties of the item views are restored when the annotation is removed from the graph/table", function () {
  expect(N_SETUP_TESTS + 4);

  SC.RunLoop.begin();  
  Smartgraphs.firstGraphController.addAnnotation(hp1);
  SC.RunLoop.end();
  
  equals( datasetViews['dataset1'].get('overrideColor'), '#caffe1', "The HighlightedPoint 'recolor' annotation should override the datasetView color");
  equals( dataPointViews['p1'].get('overrideColor'), '#badcaf', "The HighlightedPoint 'recolor' annotation should override the dataPointView color");  
 
  SC.RunLoop.begin();  
  Smartgraphs.firstGraphController.removeAnnotation('hp1');
  SC.RunLoop.end();

  equals( datasetViews['dataset1'].get('overrideColor'), '#000000', "The datasetView color should be restored after the annotation is removed");
  equals( dataPointViews['p1'].get('overrideColor'), '#000000', "The dataPointView color should be restored after the annotation is removed");
});


test("the relevant properties of the item views are restored when the annotation is updated to point to a different item", function () {
  expect(N_SETUP_TESTS + 4);

  SC.RunLoop.begin();  
  Smartgraphs.firstGraphController.addAnnotation(hp1);
  SC.RunLoop.end();
  
  equals( datasetViews['dataset1'].get('overrideColor'), '#caffe1', "The HighlightedPoint 'recolor' annotation should override the datasetView color");
  equals( dataPointViews['p1'].get('overrideColor'), '#badcaf', "The HighlightedPoint 'recolor' annotation should override the dataPointView color");  
  
  SC.RunLoop.begin();  
  hp1.set('point', p2);
  SC.RunLoop.end();
  
  equals( datasetViews['dataset1'].get('overrideColor'), '#000000', "The datasetView color should be restored after the annotation is removed");
  equals( dataPointViews['p1'].get('overrideColor'), '#000000', "The dataPointView color should be restored after the annotation is removed");  
});


test("the properties of views that represent points which are annotated, but only in a different graph, are not overwritten", function () {
  expect(N_SETUP_TESTS + 6);

  // open dataset1 in both graphs
  SC.RunLoop.begin();
  Smartgraphs.secondGraphController.addDataset(dataset1);
  SC.RunLoop.end();
  
  var dataset1ViewInGraph2 = graph2View.getPath('graphCanvasView.dataHolder.childViews').objectAt(0);
  var p1ViewInGraph2 = dataset1ViewInGraph2.get('childViews').objectAt(0);
  
  equals( dataset1ViewInGraph2.get('item'), dataset1, "dataset1ViewInGraph2 should represent dataset 1");
  equals( p1ViewInGraph2.get('content'), p1, "p1ViewInGraph2 should represent point 1");

  dataset1ViewInGraph2.set('overrideColor', '#000000');
  p1ViewInGraph2.set('overrideColor', '#000000');

  SC.RunLoop.begin();
  Smartgraphs.firstGraphController.addAnnotation(hp1);
  SC.RunLoop.end();
  
  equals( datasetViews['dataset1'].get('overrideColor'), '#caffe1', "The HighlightedPoint 'recolor' annotation should override the datasetView color");
  equals( dataPointViews['p1'].get('overrideColor'), '#badcaf', "The HighlightedPoint 'recolor' annotation should override the dataPointView color");
  
  equals( dataset1ViewInGraph2.get('overrideColor'), '#000000', "The HighlightedPoint override of dataset 1 color on graph 1 should not affect dataset 1 on graph 2");
  equals( p1ViewInGraph2.get('overrideColor'), '#000000', "The HighlightedPoint override of point 1 color on graph 1 should not affect point 1 on graph 2");
});


test("adding a second annotation to a point by adding it to the table/dataset mixes the second annotation's properties 'on top'", function () {
  expect(N_SETUP_TESTS + 6);
  
  SC.RunLoop.begin();
  Smartgraphs.firstGraphController.addAnnotation(hp1);
  SC.RunLoop.end();
  
  equals( datasetViews['dataset1'].get('overrideColor'), '#caffe1', "The HighlightedPoint 'recolor' annotation should override the datasetView color");
  equals( dataPointViews['p1'].get('overrideColor'), '#badcaf', "The HighlightedPoint 'recolor' annotation should override the dataPointView color");

  var hp2 = Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.HighlightedPoint, 'hp2', {
    displayStyle: Smartgraphs.HighlightedPoint.HIGHLIGHT_POINT_AND_DIM_BACKGROUND_STYLE,
    point: 'p1',
    pointColor: '#facdab',
    datasetColor: '#1effac'
  });
  
  SC.RunLoop.begin();
  Smartgraphs.firstGraphController.addAnnotation(hp2);
  SC.RunLoop.end();
  
  equals( datasetViews['dataset1'].get('overrideColor'), '#1effac', "The second highlighted point annotation should override the datasetView color");
  equals( dataPointViews['p1'].get('overrideColor'), '#facdab', "The second highlighted point annotation should override the dataPointView color");
  
  SC.RunLoop.begin();
  Smartgraphs.firstGraphController.removeAnnotation('hp2');
  SC.RunLoop.end();
  
  equals( datasetViews['dataset1'].get('overrideColor'), '#caffe1', "Removing the second highlighted point should reveal the first highlighted point's datasetView color");
  equals( dataPointViews['p1'].get('overrideColor'), '#badcaf', "Removing the second highlighted point should reveal the first highlighted point's dataPointView color");
});


test("adding a second annotation to a point by updating the annotation's 'point' property mixes the second annotation's properties 'on top'", function () {
  expect(N_SETUP_TESTS + 6);
    
  var hp2 = Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.HighlightedPoint, 'hp2', {
    displayStyle: Smartgraphs.HighlightedPoint.HIGHLIGHT_POINT_AND_DIM_BACKGROUND_STYLE,
    pointColor: '#facdab',
    datasetColor: '#1effac'
  });
  
  SC.RunLoop.begin();
  Smartgraphs.firstGraphController.addAnnotation(hp1);
  Smartgraphs.firstGraphController.addAnnotation(hp2);  
  SC.RunLoop.end();
  
  equals( datasetViews['dataset1'].get('overrideColor'), '#caffe1', "The HighlightedPoint 'recolor' annotation should override the datasetView color");
  equals( dataPointViews['p1'].get('overrideColor'), '#badcaf', "The HighlightedPoint 'recolor' annotation should override the dataPointView color");
  
  SC.RunLoop.begin();
  hp2.set('point', p1);
  SC.RunLoop.end();
  
  equals( datasetViews['dataset1'].get('overrideColor'), '#1effac', "The second highlighted point annotation should override the point's datasetView color after the annotation's 'point' property is updated to point at p1");
  equals( dataPointViews['p1'].get('overrideColor'), '#facdab', "The second highlighted point annotation should override the dataPointView color after the annotation's 'point' property is updated to point at p1");
  
  SC.RunLoop.begin();
  hp2.set('point', p2);
  SC.RunLoop.end();
  
  equals( datasetViews['dataset1'].get('overrideColor'), '#caffe1', "Setting the second highlighted point to point to p2 should reveal the first highlighted point's datasetView color on p1");
  equals( dataPointViews['p1'].get('overrideColor'), '#badcaf', "Setting the second highlighted point to point to p2 should reveal the first highlighted point's dataPointView color on p1");
});


test("changes to the annotation source property result in observable changes to the target property of the corresponding view", function () {
  expect(N_SETUP_TESTS + 4);
  
  SC.RunLoop.begin();  
  Smartgraphs.firstGraphController.addAnnotation(hp1);
  SC.RunLoop.end();

  equals( datasetViews['dataset1'].get('overrideColor'), '#caffe1', "The HighlightedPoint 'recolor' annotation should override the datasetView color");
  equals( dataPointViews['p1'].get('overrideColor'), '#badcaf', "The HighlightedPoint 'recolor' annotation should override the dataPointView color");
 
  SC.RunLoop.begin();
  hp1.set('datasetColor', '#1effac');  
  SC.RunLoop.end();

  equals( datasetViews['dataset1'].get('overrideColor'), '#1effac', "Updating the 'datasetColor' property of the annotation should update the color property of the dataset");
   
  SC.RunLoop.begin();
  hp1.set('pointColor', '#facdab');
  SC.RunLoop.end();

  equals( dataPointViews['p1'].get('overrideColor'), '#facdab', "Updating the 'pointColor' property of the annotation should update the color property of the point");
});


test("changes to the annotation source property do not affect the former target after the annotation is removed", function () {
  expect(N_SETUP_TESTS + 6);
  
  SC.RunLoop.begin();  
  Smartgraphs.firstGraphController.addAnnotation(hp1);
  SC.RunLoop.end();
  
  equals( datasetViews['dataset1'].get('overrideColor'), '#caffe1', "The HighlightedPoint 'recolor' annotation should override the datasetView color");
  equals( dataPointViews['p1'].get('overrideColor'), '#badcaf', "The HighlightedPoint 'recolor' annotation should override the dataPointView color");
 
  Smartgraphs.firstGraphController.removeAnnotation('hp1');
  
  equals( datasetViews['dataset1'].get('overrideColor'), '#000000', "Removing the highlightedPoint annotation from the graph should restore p1 color to '#000000'");
  equals( dataPointViews['p1'].get('overrideColor'), '#000000', "Removing the highlightedPoint annotation from the graph should restore dataset1 color to '#000000'");
  
  SC.RunLoop.begin();
  hp1.set('datasetColor', '#1effac');
  hp1.set('pointColor', '#facdab');
  SC.RunLoop.end();

  equals( datasetViews['dataset1'].get('overrideColor'), '#000000', "After the highlightedPoint annotation is removed from the graph, updating its datasetColor property should not affect dataset color of its target");
  equals( dataPointViews['p1'].get('overrideColor'), '#000000', "After the highlightedPoint annotation is removed from the graph, updating its pointColor property should not affect point color of its target");
});


test("changes to the annotation source property do not affect the former target after a new target is set", function () {
  expect(N_SETUP_TESTS + 8);
  
  SC.RunLoop.begin();  
  Smartgraphs.firstGraphController.addAnnotation(hp1);
  SC.RunLoop.end();
  
  equals( datasetViews['dataset1'].get('overrideColor'), '#caffe1', "The HighlightedPoint 'recolor' annotation should override the datasetView color");
  equals( dataPointViews['p1'].get('overrideColor'), '#badcaf', "The HighlightedPoint 'recolor' annotation should override the dataPointView color");
 
  hp1.set('point', p2);
  
  equals( datasetViews['dataset1'].get('overrideColor'), '#000000', "Removing the highlightedPoint annotation from p1 to p2 should restore p1 color to '#000000'");
  equals( dataPointViews['p1'].get('overrideColor'), '#000000', "Removing the highlightedPoint annotation from p1 to p2 should restore dataset1 color to '#000000'");
  
  SC.RunLoop.begin();
  hp1.set('datasetColor', '#1effac');
  SC.RunLoop.end();

  equals( datasetViews['dataset2'].get('overrideColor'), '#1effac', "Updating the 'datasetColor' property of the annotation should update the color property of the current-target dataset");   
  equals( datasetViews['dataset1'].get('overrideColor'), '#000000', "Updating the 'datasetColor' property of the annotation should not update color property of former-target dataset");

  SC.RunLoop.begin();
  hp1.set('pointColor', '#facdab');
  SC.RunLoop.end();

  equals( dataPointViews['p2'].get('overrideColor'), '#facdab', "Updating the 'pointColor' property of the annotation should update the color property of the current-target point");
  equals( dataPointViews['p1'].get('overrideColor'), '#000000', "Updating the 'pointColor' property of the annotation should not update the color property of the former-target point");
});


test("removing annotations from a point by clearing annotations resets target properties and unbinds annotation and target properties", function () {
  expect(N_SETUP_TESTS + 6);

  SC.RunLoop.begin();  
  Smartgraphs.firstGraphController.addAnnotation(hp1);
  SC.RunLoop.end();
  
  equals( datasetViews['dataset1'].get('overrideColor'), '#caffe1', "The HighlightedPoint 'recolor' annotation should override the datasetView color");
  equals( dataPointViews['p1'].get('overrideColor'), '#badcaf', "The HighlightedPoint 'recolor' annotation should override the dataPointView color");

  Smartgraphs.firstGraphController.clearAnnotations();
  
  equals( datasetViews['dataset1'].get('overrideColor'), '#000000', "The datasetView color should be restored after clearAnnotations()");
  equals( dataPointViews['p1'].get('overrideColor'), '#000000', "The dataPointView color should be restored after clearAnnotations()");
  
  datasetViews['dataset2'].set('overrideColor', '#000000');
  dataPointViews['p2'].set('overrideColor', '#000000');
  
  SC.RunLoop.begin();
  hp1.set('point', p2);
  SC.RunLoop.end();
  
  equals( datasetViews['dataset2'].get('overrideColor'), '#000000', "After clearAnnotations(), the datasetView color of dataset2 should not be affected by making p2/dataset2 the target of hp1");
  equals( dataPointViews['p2'].get('overrideColor'), '#000000', "After clearAnnotations(), the dataPointView color of p2 should not be affected by making p2 the target of hp1");    
});


test("After a view is removed from a graph, it must not block new views representing the same items from receiving property change notifications", function () {
  expect(N_SETUP_TESTS + 8);
  
  SC.RunLoop.begin();  
  Smartgraphs.firstGraphController.addAnnotation(hp1);
  SC.RunLoop.end();
  
  equals( datasetViews['dataset1'].get('overrideColor'), '#caffe1', "The HighlightedPoint 'recolor' annotation should override the datasetView color");
  equals( dataPointViews['p1'].get('overrideColor'), '#badcaf', "The HighlightedPoint 'recolor' annotation should override the dataPointView color");
  
  SC.RunLoop.begin();
  Smartgraphs.firstGraphController.removeDataset('dataset1');
  SC.RunLoop.end();
  
  SC.RunLoop.begin();
  Smartgraphs.firstGraphController.addDataset(dataset1);
  SC.RunLoop.end();
  
  var newDatasetView = graphView.getPath('graphCanvasView.dataHolder.childViews').objectAt(1);
  var newPointView = newDatasetView.get('childViews').objectAt(0);
  
  ok( newDatasetView !== datasetViews['dataset1'], "After removing and re-adding dataset1 from the graph, the new dataset view should be a different object");
  equals( newDatasetView.get('item'), dataset1, "...but the new dataset view should represent dataset1");
  ok( newPointView !== dataPointViews['p1'], "After removing and re-adding dataset1 from the graph, the new datapoint view should be a different object");
  equals( newPointView.get('content'), p1, "...but the new datapoint view should represent p1");
  
  SC.RunLoop.begin();
  hp1.set('datasetColor', '#1effac');
  hp1.set('pointColor', '#facdab');
  SC.RunLoop.end();
  
  equals(newDatasetView.get('overrideColor'), '#1effac', "The new dataset view should update itself after the annotation's datasetColor property is set to '#1effac'");
  equals(newPointView.get('overrideColor'), '#facdab', "The new datapoint view should update itself after the annotation's pointColor property is set to '#facdab'");
});

