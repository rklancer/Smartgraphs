// ==========================================================================
// Project:   Smartgraphs.sessionController Unit Test
// Copyright: ©2010 Concord Consortium
// @author:   Parker Morse <pmorse@cantinaconsulting.com>
// ==========================================================================
/*globals Smartgraphs module test ok equals same stop start */

var oldStore;

module("Smartgraphs.sessionController", {
  setup: function () {
    oldStore = Smartgraphs.store;
    Smartgraphs.store = SC.Store.create().from(SC.FixturesDataSource.create());
    // We aren't actually using the fixtures in these tests as of 28d58e45a9e664cb2c44f04898c634b4d4cd1602
    Smartgraphs.sessionController.set('content', null);
  },

  teardown: function () {
    Smartgraphs.store = oldStore;
  }

});

test("Creates a new session", function() {
  expect(4);
  equals( Smartgraphs.sessionController.get('content'), null, "The controller's content is initially null" );
  var result = Smartgraphs.sessionController.beginSession(); // Run the method
  equals( result, undefined, "Function returns nothing (undefined)" );
  var session = Smartgraphs.sessionController.get('content');
  ok( session.kindOf(Smartgraphs.Session), "The controller's content is now a Smartgraphs.Session" );
  var pk = session.get('primaryKey');
  // it is easy to fail to set the session's ID if createRecord() called incorrectly
  ok( session.get(pk), "The newly-created session should have a valid identifier");
});

test("Create a dataset", function() {
  expect(4);
  var result = Smartgraphs.activityObjectsController.createDataset("TestDataset"); // Run the method
  ok( result.kindOf(Smartgraphs.Dataset), "The method returns a Smartgraphs.Dataset" );
  equals( result.get('name'), "TestDataset", "The dataset's name is as provided in the function parameters" );
  equals( result.get('points').get('length'), 0, "The dataset's data points are an empty array" );
  
  var pk = result.get('primaryKey');
  // it is easy to fail to set the dataset's ID if createRecord() called incorrectly
  ok( result.get(pk), "The newly-created dataset should have a valid identifier.");
});

test("Create an annotation", function() {
  expect(6);
  Smartgraphs.sessionController.newSession();
  var selectedPoint = Smartgraphs.store.createRecord(Smartgraphs.DataPoint, {'x': 1, 'y': 1, 'url': Smartgraphs.getNextGuid() });

  // Set up a HighlightedPoint annotation ourselves
  var expected = Smartgraphs.store.createRecord(Smartgraphs.HighlightedPoint, SC.mixin({
    'id': Smartgraphs.getNextGuid(),
    'isExample': NO,
    'session': Smartgraphs.sessionController.getPath('content.id'),
    'name': "TestAnnotation1",
    'point': selectedPoint.get('id'),
    'color': "#123456"
  }));

  // Create a similar annotation using the controller
  var result = Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.HighlightedPoint, 'TestAnnotation1', { 'point': selectedPoint.get('id'), 'color': "#123456" } );

  ok( result.kindOf(Smartgraphs.HighlightedPoint), "The method returns a Smartgraphs.HighlightedPoint");
  equals( expected.get('name'), result.get('name'), "The annotations' names should match");
  equals( expected.get('point'), result.get('point'), "The annotations' points should match"); // Both null, as it happens
  equals( expected.get('color'), result.get('color'), "The annotations' colors should match");
  equals( Smartgraphs.sessionController.get('content'), result.get('session'), "The annotation is associated with the current session");
  
  var pk = result.get('primaryKey');
  // it is easy to fail to set the annotation's ID if createRecord() called incorrectly
  ok( result.get(pk), "The newly-created annotation should have a valid identifier.");
});

