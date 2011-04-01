// ==========================================================================
// Project:   Smartgraphs.annotationSupport Unit Test
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs module test ok equals same stop start setup teardown */

// Because this is a mixin, we need to create an object to mix it in, in 
// order to test
Smartgraphs.AnnotationBucket = SC.Object.extend(Smartgraphs.AnnotationSupport, {
  name: null,
  clear: function () {
    this.clearAnnotations();
  }
});

module("Smartgraphs.annotationSupport", {
  setup: function() {
    setup.store();
  },
  
  teardown: function() {
    teardown.store();
  }
});

test("An object mixing in Annotation Support will respond to supportsAnnotations", function() {
  expect(1);
  var ab = Smartgraphs.AnnotationBucket.create({ 'name': "Test Bucket" });
  var expected = YES;
  var result   = ab.get("supportsAnnotations");
  equals( result, expected, "the object should return YES to supportsAnnotations");
});

test("The annotationList array can be manipulated with addAnnotation, removeAnnotation", function() {
  expect(4);
  var ab = Smartgraphs.AnnotationBucket.create({ 'name': "Bucket Two" });
  Smartgraphs.sessionController.beginSession();
  var hp = Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.HighlightedPoint, "Test Point", { "color": "#cc0000" });
  same( ab.get('annotationList'), null, "Annotation list is initially null");
  ab.clear(); // Usually called by e.g. Smartgraphs.GraphController.addGraph()
  equals( ab.get('annotationList').get('length'), 0, "Annotation list is now an empty array (not null)");
  ab.addAnnotation(hp);
  equals( ab.get('annotationList').get('length'), 1, "The annotation list is 1");
  ab.removeAnnotation("Test Point");
  equals( ab.get('annotationList').get('length'), 0, "The annotation list is empty again");
});

// findAnnotationByName() is exercised by removeAnnotation(), above.