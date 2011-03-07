// ==========================================================================
// Project:   Smartgraphs.BracketArcView Unit Test
// Copyright: ©2010 Concord Consortium
// Author:    Parker Morse <pmorse@cantinaconsulting.com>
// ==========================================================================
/*globals Smartgraphs module test ok equals same stop start setup teardown */

var view;

module("Smartgraphs.BracketArcView", {
  setup: function () {
    setup.store();
    
    view = Smartgraphs.BracketArcView.create();
  }, 
  
  teardown: function () {
    teardown.all();
  }
});

// TODO: Replace with real unit test for Smartgraphs.BracketArcView
test("The view figurePath method should produce the expected SVG path", function() {
  var arc = 
    Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.BracketArc, "args.bracketName", {
      startX: 40,
      startY: 10,
      endX: 40,
      endY: 30,
      color: '#cc0000',
      isClockwise: false,
      label: 'Run'
    });
  var expected = "M 40 10C 0 10 0 30 40 30L 35.23987995825259 26.347431425947676L 34.1422239572804 31.298637683628616L 40 30";
  var result = view.figurePath(arc);
  equals(result, expected, "figurePath should have produced a matching path");
});
