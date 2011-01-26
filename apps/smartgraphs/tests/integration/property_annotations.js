// ==========================================================================
// Project:   Smartgraphs property annotations Unit Test
// Copyright: ©2011 Concord Consortium
// Author:    Richard KLancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs module test ok equals same stop start setup teardown */

var dataset1, dataset2;
var dataset1View, dataset2View;

var p1, p2;
var p1View, p2View;

module("Smartgraphs Property Annotations", {
  setup: function() {
    setup.store();
  },

  teardown: function() {
    teardown.store();
  }
});

test("annotation types that don't have a viewClass shouldn't be drawn");

test("the relevant propert ies of the item views are written to when annotation is added to the graph/table");

test("the properties of views that represent points which are annotated, but only in a different graph, are not overwritten");

test("adding a second annotation to a point by updating the annotation's 'point' property mixes the second annotation's properties 'on top'");

test("adding a second annotation to a point by adding it to the table/dataset mixes the second annotation's properties 'on top'");

test("removing a second annotation from a point by updating the annotation's 'point' property reveals the underlying annotation's properties");

test("removing a second annotation from a point by removing it from the table/dataset reveals the underlying annotation's properties");

test("removing annotations from a point by clearing the graph remove all relevant observers");

test("changes to the annotation source property result in obervable changes to the target property of the corresponding view");
