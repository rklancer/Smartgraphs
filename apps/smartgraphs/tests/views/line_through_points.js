// ==========================================================================
// Project:   Smartgraphs.LineThroughPointsView Unit Test
// Copyright: ©2010 Concord Consortium
// Author:    Parker Morse <pmorse@cantinaconsulting.com>
// ==========================================================================
/*globals Smartgraphs module test ok equals same stop start */

var xAxis, yAxis, endpoints, xMin, xMax, yMin, yMax;
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
  Smartgraphs.Axis.oldFixtures = Smartgraphs.Axis.FIXTURES;
  Smartgraphs.Axis.FIXTURES = [  
    { url: 'x-axis',
      min: 0,
      max: 15,
      nSteps: 15,
      label: 'time'
    },
    { url: 'y-axis',
      min: 0,
      max: 5,
      nSteps: 10,
      label: 'position'
    }
  ];
  
  oldStore = Smartgraphs.store;
  Smartgraphs.set('store', SC.Store.create().from(SC.FixturesDataSource.create()));
}

function restoreFixtures() {
  Smartgraphs.Axis.FIXTURES = Smartgraphs.Axis.oldFixtures;
  Smartgraphs.set('store', oldStore);
}


module("Smartgraphs.LineThroughPointsView", {
  setup: function () {
    setupFixtures();
    xAxis = Smartgraphs.store.find(Smartgraphs.Axis, "x-axis");
    yAxis = Smartgraphs.store.find(Smartgraphs.Axis, "y-axis");
    xMin = xAxis.get('min');
    xMax = xAxis.get('max');
    yMin = yAxis.get('min');
    yMax = yAxis.get('max');
    
    view = Smartgraphs.LineThroughPointsView.create();
  },
  
  teardown: function () {
    restoreFixtures();
  }
});


function testEndpointsInBorders(pair) {
  test("Given two points defining a line which " + pair.desc + ", we should get endpoints on the borders of the graph", function() {
    // expect(4);
    endpoints = view.getEndPoints(pair.point1, pair.point2, xAxis, yAxis);
    ok( ((xMin <= endpoints[0].x) && (endpoints[0].x <= xMax)), "First point is inside horizontal borders of the graph");
    ok( ((yMin <= endpoints[0].y) && (endpoints[0].y <= yMax)), "First point is inside vertical borders of the graph");
    ok( ((xMin <= endpoints[1].x) && (endpoints[1].x <= xMax)), "Second point is inside horizontal borders of the graph");
    ok( ((yMin <= endpoints[1].y) && (endpoints[1].y <= yMax)), "Second point is inside vertical borders of the graph");
  });
}

for (var i=0; i<testpoints.length; i++) {
  testEndpointsInBorders(testpoints[i]);
}

