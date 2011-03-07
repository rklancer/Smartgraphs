// ==========================================================================
// Project:   Smartgraphs.ArrowView Unit Test
// Copyright: ©2010 Concord Consortium
// Author:    Parker Morse <pmorse@cantinaconsulting.com>
// ==========================================================================
/*globals Smartgraphs module test ok equals same stop start setup teardown */

var view;

module("Smartgraphs.ArrowView", {
  setup: function () {
    setup.fixtures(Smartgraphs.DataPoint, [
      { guid: 'p1', x: 1, y: 3, dataset: 'test-dataset' },
      { guid: 'p2', x: 4, y: 5, dataset: 'test-dataset' }
    ]);
    setup.store();
    
    view = Smartgraphs.ArrowView.create();
  },
  
  teardown: function () {
    teardown.all();
  }
});

test("Passing coordinates to arrowPath should return a Raphael path string", function() {
  var startPoint = {'x': 1, 'y': 1};
  var endPoint = {'x': 50, 'y': 50};
  var expected = " M 1 1 L 50 50 L 45 41.33974596215562 L 41.33974596215562 45 L 50 50";
  var result   = view.arrowPath(startPoint.x, startPoint.y, endPoint.x, endPoint.y, 10, 15);
  equals(result, expected, "arrowPath should have returned a matching format string.");
});

test("Start and end coordinates should be calculated correctly", function () {
  var annotation = Smartgraphs.store.createRecord( Smartgraphs.Arrow, { 'point1': 'p1', 'point2': 'p2', 'name': 'test-arrow' } );
  // For each pair of points defining a line - and therefore, for each arrow annotation, which is a 
  // line with direction - there are five potential arrows to be drawn.
  expect(5);

  // Direct
  same( view.getStartAndEnd(annotation), { 'start': { 'x': 1, 'y': 3 }, 'end': { 'x': 4, 'y': 5 } }, "Direct arrows should have the same coordinates as the annotation points" );

  // Vertical/clockwise
  annotation.set('isVertical', YES);
  annotation.set('isClockwise', YES);
  same( view.getStartAndEnd(annotation), { 'start': { 'x': 1, 'y': 3 }, 'end': { 'x': 1, 'y': 5 } }, "Vertical, clockwise arrows should start at the first point and go up to the y of the second point" );

  // Vertical/cclockwise
  annotation.set('isClockwise', NO);
  same( view.getStartAndEnd(annotation), { 'start': { 'x': 4, 'y': 3 }, 'end': { 'x': 4, 'y': 5 } }, "Vertical, counter-clockwise arrows should start below the second point and go up to the second point" );

  // Horizontal/cclockwise
  annotation.set('isHorizontal', YES);
  annotation.set('isVertical', NO);
  same( view.getStartAndEnd(annotation), { 'start': { 'x': 1, 'y': 3 }, 'end': { 'x': 4, 'y': 3 } }, "Horizontal, counter-clockwise arrows should start at the first point and go across to the x of the second point" );
  
  // Horizontal/clockwise
  annotation.set('isClockwise', YES);
  same( view.getStartAndEnd(annotation), { 'start': { 'x': 1, 'y': 5 }, 'end': { 'x': 4, 'y': 5 } }, "Horizontal, clockwise arrows should start above the first point and go across to the second point" );
  
});