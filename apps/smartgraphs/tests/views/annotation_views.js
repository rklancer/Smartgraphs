// ==========================================================================
// Project:   Smartgraphs annotation view unit tests
// Copyright: ©2010 Concord Consortium
// @author:   Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs RaphaelViews module test ok equals same stop start afterPropertyChange rnd setupUserAndSessionFixtures restoreUserAndSessionFixtures newSession */

var pane;
var graphView;
var canvasView;
var childViews;
var oldStore;
var session;
var dataset;


// TODO copied straight from GraphView -- should probably be moved to debug folder? How are they different/the same?
function setupFixtures() {
  
  setupUserAndSessionFixtures();
  
  Smartgraphs.Graph.oldFixtures = Smartgraphs.Graph.FIXTURES;  
  Smartgraphs.Graph.FIXTURES = [
    { url: 'test',
      name: 'test',
      axes: 'test-axes',
      title: 'Test Graph',
      initialSeries: []
    }
  ];
  
  Smartgraphs.Axes.oldFixtures = Smartgraphs.Axes.FIXTURES;
  Smartgraphs.Axes.FIXTURES = [
    { url: 'test-axes',

      xMin: -5,
      xMax: 10,
      xSteps: 5,
      xLabel: 'xLabel (long)',
      xLabelAbbreviated: 'xLabel (abbrev)',

      yMin: 2,
      yMax: 8,
      ySteps: 6,
      yLabel: 'yLabel (long)',
      yLabelAbbreviated: 'yLabel (abbrev)'
    }
  ];
  
  // without some data in a RecordType's FIXTURES, the FixturesDataSource won't allow any records to be committed.
  Smartgraphs.DataSeries.FIXTURES = Smartgraphs.DataSeries.oldFixtures;
  Smartgraphs.DataSeries.FIXTURES = [{url: 'dummy'}];
  
  Smartgraphs.DataPoint.oldFixtures = Smartgraphs.DataPoint.FIXTURES;
  Smartgraphs.DataPoint.FIXTURES = [{url: 'dummy'}];
  
  oldStore = Smartgraphs.store;
  
  // REMINDER: 'SC.Record.fixtures' is a singleton object; using it below would result in pollution of the data store
  // with data from prior tests.
  Smartgraphs.set('store', SC.Store.create().from(SC.FixturesDataSource.create()));
}

function restoreFixtures() {
  restoreUserAndSessionFixtures();
  
  Smartgraphs.Graph.FIXTURES = Smartgraphs.Graph.oldFixtures;
  Smartgraphs.Axes.FIXTURES = Smartgraphs.Axes.oldFixtures;
  Smartgraphs.DataPoint.oldFixtures = Smartgraphs.DataPoint.FIXTURES;
  Smartgraphs.DataSeries.oldFixtures = Smartgraphs.DataSeries.FIXTURES;
  Smartgraphs.set('store', oldStore);
}


function addPoint(dataset, x, y) {    
  SC.RunLoop.begin();
  var point = Smartgraphs.store.createRecord(Smartgraphs.DataPoint, { x: x, y: y, guid: Smartgraphs.getNextGuid() });
  point.set('series', dataset);
  Smartgraphs.store.commitRecords();
  SC.RunLoop.end();
  
  return point;
}


module("Smartgraphs Annotation View instantiation", {
  setup: function() {
    setupFixtures();
    
    Smartgraphs.firstGraphController.openGraph('test');
    
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
    childViews = canvasView.get('childViews');
    
    newSession();
    session = Smartgraphs.sessionController.get('content');
    dataset = Smartgraphs.sessionController.createSeries();
    Smartgraphs.firstGraphController.addSeries(dataset);
  }, 
  
  teardown: function () {
    Smartgraphs.firstGraphController.clear();
    graphView.bindings.forEach( function (b) { b.disconnect(); } );
    pane.remove();
    restoreFixtures();
  }
});


test('HighlightedPoint location should track the point it highlights', function () {  
  var highlight = Smartgraphs.sessionController.createAnnotation(Smartgraphs.HighlightedPoint, 'test-highlight');
  var point = addPoint(dataset, 1, 5);
  highlight.set('point', point);
  Smartgraphs.firstGraphController.addAnnotation(highlight);

  var highlightView = childViews.objectAt(childViews.get('length') - 1);  
  ok(SC.kindOf(highlightView, Smartgraphs.HighlightedPointView), 'a highlightedPointView should have been added to the graph canvas');

  // let the view render
  SC.RunLoop.begin();
  SC.RunLoop.end();
  
  var r = highlightView.get('raphaelObject');
  var attr = r.attr();
  var coords = graphView.coordinatesForPoint(1, 5);
  
  equals(attr.cx, coords.x, "highlight's center-x should be x-coordinate of point (1,5)");
  equals(attr.cy, coords.y, "highlight's center-y should be y-coordinate of point (1,5)");
  
  SC.RunLoop.begin();
  point.set('x', 2);
  SC.RunLoop.end();
  
  attr = r.attr();
  coords = graphView.coordinatesForPoint(2, 5);
  equals(attr.cx, coords.x, "after update of x value highlight's center-x should be x-coordinate of point (2,5)");
  equals(attr.cy, coords.y, "after update of x value, highlighted center-y should be y-coordinate of point (2,5)");
  
  SC.RunLoop.begin();
  point.set('y', 6);
  SC.RunLoop.end();

  attr = r.attr();
  coords = graphView.coordinatesForPoint(2, 6);
  equals(attr.cx, coords.x, "after update of x value highlight's center-x should be x-coordinate of point (2,6)");
  equals(attr.cy, coords.y, "after update of x value, highlighted center-y should be y-coordinate of point (2,6)");
  
});
