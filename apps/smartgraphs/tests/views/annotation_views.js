// ==========================================================================
// Project:   Smartgraphs annotation view unit tests
// Copyright: ©2010 Concord Consortium
// @author:   Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs RaphaelViews module test ok equals same stop start afterPropertyChange rnd setupUserAndSessionFixtures restoreUserAndSessionFixtures setupDatapointFixtures restoreDatapointFixtures newSession addPoint */

var pane;
var graphView;
var canvasView;
var annotationViews;
var oldStore;
var session;
var dataset;


// TODO copied straight from GraphView -- should probably be moved to debug folder? How are they different/the same?
function setupFixtures() {
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
  
  setupDatapointFixtures();
  
  oldStore = Smartgraphs.store;
  
  // REMINDER: 'SC.Record.fixtures' is a singleton object; using it below would result in pollution of the data store
  // with data from prior tests.
  Smartgraphs.set('store', SC.Store.create().from(SC.FixturesDataSource.create()));
}

function restoreFixtures() {
  Smartgraphs.Graph.FIXTURES = Smartgraphs.Graph.oldFixtures;
  Smartgraphs.Axes.FIXTURES = Smartgraphs.Axes.oldFixtures;
  restoreDatapointFixtures();
  
  Smartgraphs.set('store', oldStore);
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
    annotationViews = canvasView.getPath('annotationsHolder.childViews');

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
  var highlightedPoint = Smartgraphs.sessionController.createAnnotation(Smartgraphs.HighlightedPoint, 'test-highlightedPoint');
  var point = addPoint(dataset, 1, 5);
  highlightedPoint.set('point', point);
  Smartgraphs.firstGraphController.addAnnotation(highlightedPoint);

  var highlightedPointView = annotationViews.objectAt(annotationViews.get('length') - 1);
  ok(SC.kindOf(highlightedPointView, Smartgraphs.HighlightedPointView), 'a highlightedPointView should have been added to the graph canvas');

  // let the view render
  SC.RunLoop.begin();
  SC.RunLoop.end();

  var raphaelObject = highlightedPointView.get('raphaelObject');
  var attr = raphaelObject.attr();
  var coords = graphView.coordinatesForPoint(1, 5);

  equals(attr.cx, coords.x, "highlightedPoint's center-x should be x-coordinate of point (1,5)");
  equals(attr.cy, coords.y, "highlightedPoint's center-y should be y-coordinate of point (1,5)");

  SC.RunLoop.begin();
  point.set('x', 2);
  SC.RunLoop.end();

  attr = raphaelObject.attr();
  coords = graphView.coordinatesForPoint(2, 5);
  equals(attr.cx, coords.x, "after update of x value highlightedPoint's center-x should be x-coordinate of point (2,5)");
  equals(attr.cy, coords.y, "after update of x value, highlightedPoint center-y should be y-coordinate of point (2,5)");

  SC.RunLoop.begin();
  point.set('y', 6);
  SC.RunLoop.end();

  attr = raphaelObject.attr();
  coords = graphView.coordinatesForPoint(2, 6);
  equals(attr.cx, coords.x, "after update of x value highlightedPoint's center-x should be x-coordinate of point (2,6)");
  equals(attr.cy, coords.y, "after update of x value, highlightedPoint center-y should be y-coordinate of point (2,6)");

});


test('LineToAxis location should have the expected path to the x-axis with the starting point it highlights', function () {
  var lineToXAxis = Smartgraphs.sessionController.createAnnotation(Smartgraphs.LineToAxis, 'test-lineToAxis');
  var point = addPoint(dataset, -1, -5);
  lineToXAxis.set('point', point);
  lineToXAxis.set('axis', "x");
  console.log("lineToXAxis:", lineToXAxis);
  Smartgraphs.firstGraphController.addAnnotation(lineToXAxis);

  var lineToAxisView = annotationViews.objectAt(annotationViews.get('length') - 1);
  ok(SC.kindOf(lineToAxisView, Smartgraphs.LineToAxisView),
    'a lineToAxisView should have been added to the graph canvas');

  // let the view render
  SC.RunLoop.begin();
  SC.RunLoop.end();

  var raphaelObject = lineToAxisView.get('raphaelObject');
  var attr = raphaelObject.attr();
  var startingCoords = graphView.coordinatesForPoint(point.get('x'), point.get('y'));
  var endingCoords = graphView.coordinatesForPoint(point.get('x'), 0);

  ok(!attr.shouldHideLinePath, "lineToAxis's shouldHideLinePath should be NO or undefined");
  equals(attr.path[0][1], startingCoords.x, "lineToAxis's starting-x should be " + startingCoords.x.toString() +
    " for point:" + point.toString());
  equals(attr.path[0][2], startingCoords.y, "lineToAxis's starting-y should be " + startingCoords.y.toString());
  equals(attr.path[1][1], endingCoords.x, "lineToAxis's ending-x should be " + endingCoords.x.toString());
  equals(attr.path[1][2], endingCoords.y, "lineToAxis's ending-y should be " + endingCoords.y.toString());
});


test('LineToAxis location should have the expected path to the y-axis with the starting point it highlights', function () {
  var lineToYAxis = Smartgraphs.sessionController.createAnnotation(Smartgraphs.LineToAxis, 'test-lineToAxis');
  var point = addPoint(dataset, 1, 5);
  lineToYAxis.set('point', point);
  console.warn("lineToYAxis:", lineToYAxis);
  Smartgraphs.firstGraphController.addAnnotation(lineToYAxis);

  var lineToAxisView = annotationViews.objectAt(annotationViews.get('length') - 1);
  ok(SC.kindOf(lineToAxisView, Smartgraphs.LineToAxisView),
    'a lineToAxisView should have been added to the graph canvas');

  // let the view render
  SC.RunLoop.begin();
  SC.RunLoop.end();

  var raphaelObject = lineToAxisView.get('raphaelObject');
  var attr = raphaelObject.attr();
  var startingCoords = graphView.coordinatesForPoint(point.get('x'), point.get('y'));
  var endingCoords = graphView.coordinatesForPoint(0, point.get('y'));

  ok(!attr.shouldHideLinePath, "lineToAxis's shouldHideLinePath should be NO or undefined");
  equals(attr.path[0][1], startingCoords.x, "lineToAxis's starting-x should be " + startingCoords.x.toString() +
    " for point:" + point.toString());
  equals(attr.path[0][2], startingCoords.y, "lineToAxis's starting-y should be " + startingCoords.y.toString());
  equals(attr.path[1][1], endingCoords.x, "lineToAxis's ending-x should be " + endingCoords.x.toString());
  equals(attr.path[1][2], endingCoords.y, "lineToAxis's ending-y should be " + endingCoords.y.toString());
});


test('HighlightedSegment location should have the expected path with the points it highlights', function () {
  var highlightedSegment = Smartgraphs.sessionController.createAnnotation(Smartgraphs.HighlightedSegment, 'test-highlightedSegment');
  var pointA = addPoint(dataset, 1, 5);
  var pointB = addPoint(dataset, 2, 6);
  highlightedSegment.set('points', [pointA, pointB]);
  Smartgraphs.firstGraphController.addAnnotation(highlightedSegment);

  var highlightedSegmentView = annotationViews.objectAt(annotationViews.get('length') - 1);
  ok(SC.kindOf(highlightedSegmentView, Smartgraphs.HighlightedSegmentView),
    'a highlightedSegmentView should have been added to the graph canvas');

  // let the view render
  SC.RunLoop.begin();
  SC.RunLoop.end();

  var raphaelObject = highlightedSegmentView.get('raphaelObject');
  var attr = raphaelObject.attr();
  var startingCoords = graphView.coordinatesForPoint(pointA.get('x'), pointA.get('y'));
  var endingCoords = graphView.coordinatesForPoint(pointB.get('x'), pointB.get('y'));

  equals(attr.path[0][1], startingCoords.x, "highlightedSegment's starting-x should be " + startingCoords.x.toString() +
    " for pointA:" + pointA.toString());
  equals(attr.path[0][2], startingCoords.y, "highlightedSegment's starting-y should be " + startingCoords.y.toString());
  equals(attr.path[1][1], endingCoords.x, "highlightedSegment's ending-x should be " + endingCoords.x.toString() +
    " for pointB:" + pointB.toString());
  equals(attr.path[1][2], endingCoords.y, "highlightedSegment's ending-y should be " + endingCoords.y.toString());
});