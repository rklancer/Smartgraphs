// ==========================================================================
// Project:   Smartgraphs property annotations Unit Test
// Copyright: ©2011 Concord Consortium
// Author:    Richard KLancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs module test ok equals same stop start setup teardown beginSession endSession */

var dataset1, dataset2;
var dataset1View, dataset2View;

var p1, p2;
var p1View, p2View;

var pane;
var graphView;
var canvasView;
var annotationsHolder;
var dataHolder;

module("Smartgraphs Property Annotations", {
  setup: function() {

    setup.fixtures(Smartgraphs.Graph, [
      { url: 'test-graph',
        name: 'test-graph',
        xAxis: 'x-axis',
        yAxis: 'y-axis',
        title: 'Test Graph',
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

    SC.RunLoop.begin();
    pane = SC.MainPane.create({
      childViews: [
        Smartgraphs.GraphView.design({
          graphControllerBinding: 'Smartgraphs.firstGraphController',
          viewName: 'testGraphView'
        })]
    });
    pane.append();
    SC.RunLoop.end();

    graphView = pane.get('childViews').objectAt(0);  
    canvasView = graphView.get('graphCanvasView');
    annotationsHolder = canvasView.get('annotationsHolder');
    dataHolder = canvasView.get('dataHolder');

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
  },

  teardown: function() {
    Smartgraphs.firstGraphController.clear();
    graphView.bindings.forEach( function (b) { b.disconnect(); } );
    pane.remove();
    pane = graphView = null;
    
    endSession();
    
    teardown.store();
  }
});

test("annotation types that don't have a viewClass shouldn't be drawn");

test("the relevant propert ies of the item views are written to when annotation is added to the graph/table");

test("the properties of views that represent points which are annotated, but only in a different graph, are not overwritten");

test("adding a second annotation to a point by updating the annotation's 'point' property mixes the second annotation's properties 'on top'");

test("adding a second annotation to a point by adding it to the table/dataset mixes the second annotation's properties 'on top'");

test("removing a second annotation from a point by updating the annotation's 'point' property reveals the underlying annotation's properties");

test("removing a second annotation from a point by removing it from the table/dataset reveals the underlying annotation's properties");

test("removing annotations from a point by clearing the graph remove all relevant observers");

test("changes to the annotation source property result in obervable changes to the target property of the corresponding view");
