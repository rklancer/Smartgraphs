// ==========================================================================
// Project:   Smartgraphs.ACTIVITY_STEP_SUBMITTED
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class
  
  @extends SC.Responder
  @version 0.1
*/

sc_require('states/activity');

Smartgraphs.ACTIVITY_STEP_SUBMITTED = SC.Responder.create(
/** @scope Smartgraphs.ACTIVITY_STEP_SUBMITTED.prototype */ {

  nextResponder: Smartgraphs.ACTIVITY,
  
  didBecomeFirstResponder: function () {
    var oldStep = Smartgraphs.activityStepController.get('content');
    Smartgraphs.activityStepController.handleSubmission();
    
    // if we didn't change steps after submission completed, then there must be no more steps for this page.
    var newStep = Smartgraphs.activityStepController.get('content');
    if (newStep === oldStep && oldStep.get('isFinalStep')) {
      Smartgraphs.makeFirstResponder(Smartgraphs.ACTIVITY_PAGE_DONE);
    }
  },
   
  willLoseFirstResponder: function () {
    Smartgraphs.activityStepController.cleanup();
  },
  
  // ..........................................................
  // ACTIONS
  //
  
  gotoStep: function (context, args) {
    var step = Smartgraphs.store.find(Smartgraphs.ActivityStep, args.stepId);
    Smartgraphs.activityStepController.set('content', step);
    Smartgraphs.makeFirstResponder(Smartgraphs.ACTIVITY_STEP_LOADING);    
    return YES;
  },

  createHighlightedPointFromSelection: function (context, args) {
    var graphName = args.graphName,
    dataset = args.dataset,
    highlightedPointName = args.highlightedPointName,
    highlightedPoints = [];
    dataset.get('selection').forEach( function (selectedPoint) {
      highlightedPoints.push(Smartgraphs.store.createRecord(Smartgraphs.HighlightedPoint, { 'point': selectedPoint, 'name': highlightedPointName, 'isExample': NO, 'activity': Smartgraphs.activityController.get('content') }));
    });
    if (highlightedPoints.length == 1) {
      return highlightedPoints[0];
    } else {
      return highlightedPoints;
    }
  }
  
}) ;
