// ==========================================================================
// Project:   Smartgraphs.activityStepController Unit Test
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs module test ok equals same stop start */

module("Smartgraphs.activityStepController");

test("makeInspector method should return an inspector instance corresponding to the classname in the inspector info", function () {

  var step = SC.Object.create({
    submissibilityInspector: {
      type: 'Smartgraphs.FirstResponseFieldInspector'
    }
  });
  Smartgraphs.activityStepController.set('content', step);
  
  var inspector = Smartgraphs.activityStepController.makeInspector('submissibilityInspector');
  ok(SC.kindOf(inspector, Smartgraphs.FirstResponseFieldInspector), 'makeInspector should return a valid FirstResponseFieldInspector instance');
  
});

