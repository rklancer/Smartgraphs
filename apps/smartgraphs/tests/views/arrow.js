// ==========================================================================
// Project:   Smartgraphs.ArrowView Unit Test
// Copyright: ©2010 Concord Consortium
// @author    Parker Morse <pmorse@cantinaconsulting.com>
// ==========================================================================
/*globals Smartgraphs module test ok equals same stop start */

module("Smartgraphs.ArrowView");

test("Passing coordinates to arrowPath should return a Raphael path string", function() {
  var view = Smartgraphs.ArrowView.create();
  var startPoint = {'x': 1, 'y': 1};
  var endPoint = {'x': 50, 'y': 50};
  var expected = " M 1 1 L 50 50 L 45 41.33974596215562 L 41.33974596215562 45 L 50 50";
  var result   = view.arrowPath(startPoint.x, startPoint.y, endPoint.x, endPoint.y, 10, 15);
  equals(result, expected, "arrowPath should have returned a matching format string.");
});

