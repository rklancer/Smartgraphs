// ==========================================================================
// Project:   Smartgraphs.ACTIVITY_STEP Unit Test
// Copyright: ©2010 Concord Consortium
// @author:   Parker Morse <pmorse@cantinaconsulting.com>
// ==========================================================================
/*globals Smartgraphs module test ok equals same stop start setup teardown */

function setupFixtures() {
  setup.fixtures(Smartgraphs.Session, Smartgraphs.Session.TEST_FIXTURES);
  setup.fixtures(Smartgraphs.DataPoint, [{url: 'datapoint-1'}]);
}

module("Smartgraphs.ACTIVITY_STEP", {
  setup: function () {
    setupFixtures();
    setup.store();
  },

  teardown: function () {
    teardown.store();
  }
});

test("creating a HighlightedPoint record with color param", function () {
  expect(2);
  var startingAnnotationCount = Smartgraphs.store.find('Smartgraphs.HighlightedPoint').get('length');

  // create the annotation
  var result = Smartgraphs.sessionController.createAnnotation(Smartgraphs.HighlightedPoint, "TestHighlighted", { 'color': '#123456' });
  ok( result.kindOf(Smartgraphs.Annotation), "method returns a Smartgraphs.Annotation");
  equals( result.get("color"), "#123456", "The new Annotation has the color provided in the arguments");
});