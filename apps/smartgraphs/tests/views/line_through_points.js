// ==========================================================================
// Project:   Smartgraphs.LineThroughPointsView Unit Test
// Copyright: ©2010 Concord Consortium
// @author    Parker Morse <pmorse@cantinaconsulting.com>
// ==========================================================================
/*globals Smartgraphs module test ok equals same stop start */

var axes, endpoints, xMin, xMax, yMin, yMax;
var oldFixtures, oldStore;
var view;
var testpoints = [
  { 'desc': "is vertical", 'point1': SC.Object.create({x: 1, y: 1}), 'point2': SC.Object.create({x: 1, y: 2})},
  { 'desc': "is horizontal", 'point1': SC.Object.create({x: 1, y: 1}), 'point2': SC.Object.create({x: 2, y: 1})},
  { 'desc': "starts on the bottom and extends to the top", 'point1': SC.Object.create({x: 1, y: 1}), 'point2': SC.Object.create({x: 2, y: 4})},
  { 'desc': "starts on the bottom and extends to the right", 'point1': SC.Object.create({x: 12, y: 1}), 'point2': SC.Object.create({x: 14, y: 2})},
  { 'desc': "starts on the left and extends to the bottom", 'point1': SC.Object.create({x: 1, y: 3}), 'point2': SC.Object.create({x: 2, y: 2})},
  { 'desc': "starts on the left and extends to the right", 'point1': SC.Object.create({x: 1, y: 1}), 'point2': SC.Object.create({x: 10, y: 2})},
  { 'desc': "starts on the left and extends to the top", 'point1': SC.Object.create({x: 1, y: 3}), 'point2': SC.Object.create({x: 2, y: 4})},
  { 'desc': "starts on the top and extends to the bottom", 'point1': SC.Object.create({x: 5, y: 4}), 'point2': SC.Object.create({x: 6, y: 2})},
  { 'desc': "starts on the top and extends to the right", 'point1': SC.Object.create({x: 12, y: 4}), 'point2': SC.Object.create({x: 14, y: 3})}
];

function setupFixtures() {
  Smartgraphs.Axes.oldFixtures = Smartgraphs.Axes.FIXTURES;
  Smartgraphs.Axes.FIXTURES = [{ url: 'test-axes',

    xMin: 0,
    xMax: 15,
    xSteps: 15,
    xLabel: 'Time (seconds)',
    xLabelAbbreviated: 'Time (s)',

    yMin: 0,
    yMax: 5,
    ySteps: 10,
    yLabel: 'Position (meters)',
    yLabelAbbreviated: 'Position (m)'
  }];
  
  oldStore = Smartgraphs.store;
  Smartgraphs.set('store', SC.Store.create().from(SC.FixturesDataSource.create()));
  // Smartgraphs.store = SC.Store.create().from(SC.FixturesDataSource.create());
  debugger;
}

function restoreFixtures() {
  Smartgraphs.Axes.FIXTURES = Smartgraphs.Axes.oldFixtures;
  Smartgraphs.set('store', oldStore);
}


module("Smartgraphs.LineThroughPointsView", {
  setup: function () {
    setupFixtures();
    axes = Smartgraphs.store.find(Smartgraphs.Axes, "test-axes");
    xMin = axes.get('xMin');
    xMax = axes.get('xMax');
    yMin = axes.get('yMin');
    yMax = axes.get('yMax');
    
    view = Smartgraphs.LineThroughPointsView.create();
  },
  
  teardown: function () {
    restoreFixtures();
  }
});


function testEndpointsInBorders(pair) {
  test("Given two points defining a line which " + pair.desc + ", we should get endpoints on the borders of the graph", function() {
    // expect(4);
    endpoints = view.getEndPoints(pair.point1, pair.point2, axes);
    ok(xMin <= endpoints[0].x <= xMax, "First point is inside horizontal borders of the graph");
    ok(yMin <= endpoints[0].y <= yMax, "First point is inside vertical borders of the graph");
    ok(xMin <= endpoints[1].x <= xMax, "Second point is inside horizontal borders of the graph");
    ok(yMin <= endpoints[1].y <= yMax, "Second point is inside vertical borders of the graph");
  });
}

for (var i=0; i<testpoints.length; i++) {
  // debugger;
  testEndpointsInBorders(testpoints[i]);
}

