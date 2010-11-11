// ==========================================================================
// Project:   Smartgraphs.sessionController Unit Test
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs module test ok equals same stop start */

var oldStore;

module("Smartgraphs.sessionController", {
  setup: function () {
    oldStore = Smartgraphs.store;
    Smartgraphs.store = SC.Store.create().from(SC.FixturesDataSource.create());
  },

  teardown: function () {
    Smartgraphs.store = oldStore;
  }

});

test("Creates a new session", function() {
  expect(3);
  equals(Smartgraphs.sessionController.get('content'), null, "The controller's content is initially null");
  var result = Smartgraphs.sessionController.newSession(); // Run the method
  equals(result, undefined, "Function returns nothing (undefined)");
  ok(Smartgraphs.sessionController.get('content').kindOf(Smartgraphs.Session), "The controller's content is now a Smartgraphs.Session");
});

test("Create a dataset", function() {
  expect(3);
  var result = Smartgraphs.sessionController.createDataset("TestDataset"); // Run the method
  ok(result.kindOf(Smartgraphs.Dataset), "The method returns a Smartgraphs.Dataset");
  equals(result.get('name'), "TestDataset", "The dataset's name is as provided in the function parameters");
  equals(result.get('points').get('length'), 0, "The dataset's data points are an empty array");
});

test("Create an annotation", function() {
  expect(3);
  var selectedPoint = Smartgraphs.store.createRecord(Smartgraphs.DataPoint, {'x': 1, 'y': 1, 'url': Smartgraphs.getNextGuid() });
  // Set up a HighlightedPoint annotation ourselves
  var expected = Smartgraphs.store.createRecord(Smartgraphs.HighlightedPoint, SC.mixin({
    'id': Smartgraphs.getNextGuid(),
    'isExample': NO,
    'session': Smartgraphs.sessionController.getPath('content.id'),
    'name': "TestAnnotation1",
    'point': selectedPoint.get('id') }) );
  // Create a similar annotation using the controller
  var result = Smartgraphs.sessionController.createAnnotation(Smartgraphs.HighlightedPoint, 'TestAnnotation1', { 'point': selectedPoint.get('id') } );
  ok(result.kindOf(Smartgraphs.HighlightedPoint), "The method returns a Smartgraphs.HighlightedPoint");
  equals(expected.get('name'), result.get('name'), "The annotations' names should match");
  equals(expected.get('point'), result.get('point'), "The annotations' points should match"); // Both null, as it happens
});

