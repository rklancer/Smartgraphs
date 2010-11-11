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

  createHighlightedPointsFromSelection: function (context, args) {
    var graphName = args.graphName;
    args.dataset.get('selection').forEach( function (selectedPoint) {
      var hp = Smartgraphs.sessionController.createAnnotation(Smartgraphs.HighlightedPoint, args.highlightedPointName, {'point': selectedPoint });
    });
    return YES;
  },
  
  /**
    Create a HighlightedPoint record with name highlightedPointName in the current session. Takes the point from the
    the selected datapoint in the dataset with name datasetName, which must be open in the graph graphName.
    
    Does nothing if there is no dataset with the passed name, or it is not open in the graph with graphName, or 
    there are more or fewer than 1 datapoints selected.
    
    Arguments:
      graphName
      datasetName
      highlightedPointName
      
    A possible variant of this command would not require a graphName to be specified.
  */
  createHighlightedPointFromSelection: function (context, args) {
    // given the graphName, find the associated graph controller
    var controller = Smartgraphs.GraphController.controllerForName[args.graphName];

    // use the graph controller's findDatasetByName method to dereference datasetName to an actual Dataset record
    var dataset = controller && controller.findDatasetByName(args.datasetName);
    
    if (!dataset) return YES;   // handled, but graph controller or dataset could not be found
    
    var selection = dataset.get('selection');
    // consider the action handled -- but do nothing -- if there is <1 or there are >1 points selected.
    if (selection.get('length') !== 1) return YES;
    
    var selectedPoint = selection.firstObject();
    
    // set point (a relation) using its id rather than the object, because createAnnotation works like createRecord
    // in that regard (it works on the datahash underlying the record)
    var highlightedPoint = 
      Smartgraphs.sessionController.createAnnotation(Smartgraphs.HighlightedPoint, args.highlightedPointName, { 
        point: selectedPoint.get('id')
      });
    
    return YES;
  }
  
}) ;
