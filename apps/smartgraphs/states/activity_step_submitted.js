// ==========================================================================
// Project:   Smartgraphs.ACTIVITY_STEP_SUBMITTED
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class
  
  State representing that the currently open ActivityStep has been submitted.
  
  In this state, the user's response is processed and evaluated, and the system may branch to a new step. (Transitions
  between steps are not allowed in other states.) 
  
  A step's 'afterSubmissionCommands' are executed upon entry to this state, and then the activityStepController
  examines the user's response and issues a gotoStep command appropriately.
  
  If no step is branched to while the activityStepController processes the user's response, the 'isFinalStep' property
  is examined to determine if the current step is intended to be a terminal step. If this step is a terminal step in
  the page, the system transitions to the ACTIVITY_PAGE_DONE state. If this step is not intended to be a terminal 
  step and no step has been branched to, it is considered an error.

  @extends SC.State
  @version 0.1
*/

Smartgraphs.ACTIVITY_STEP_SUBMITTED = SC.State.extend(
/** @scope Smartgraphs.ACTIVITY_STEP_SUBMITTED.prototype */ {
  
  enterState: function () {
    var oldStep = Smartgraphs.activityStepController.get('content');
    Smartgraphs.activityStepController.handleSubmission();
    
    // if we didn't change steps after submission completed, then there must be no more steps for this page.
    var newStep = Smartgraphs.activityStepController.get('content');
    if (newStep === oldStep && oldStep.get('isFinalStep')) {
      this.gotoState('ACTIVITY_PAGE_DONE');
    }
  },
   
  exitState: function () {
    Smartgraphs.activityStepController.cleanup();
  },
  
  // ..........................................................
  // ACTIONS
  //
  
  /**
    Branch to the specified step. Transitions to the ACTIVITY_STEP_LOADING state after setting the
    activityStepController's content to the new ActivityStep.
    
    Generally this command is called by the activityStepController when it processes the ResponseBranches and
    defaultBranch property of the current step.
    
    @param context
    @param args
    
    @param {String} args.stepId
      The id (url) of the ActivityStep to branch to
  */
  gotoStep: function (context, args) {
    var step = Smartgraphs.store.find(Smartgraphs.ActivityStep, args.stepId);
    Smartgraphs.activityStepController.set('content', step);
    this.gotoState('ACTIVITY_STEP');
    return YES;
  },

  createHighlightedPointsFromSelection: function (context, args) {
    var graphName = args.graphName;
    args.dataset.get('selection').forEach( function (selectedPoint) {
      var hp = Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.HighlightedPoint, args.highlightedPointName, {'point': selectedPoint });
    });
    return YES;
  },
  
  /**
    Create a HighlightedPoint record with name highlightedPointName in the current session. Takes the point from the
    the selected datapoint in the dataset with name datasetName, which must be open in the graph graphName.
    
    The highlightedPoint is not automatically added to the graph.
    
    This command does nothing if there is no dataset with the passed name, or it is not open in the graph with
    graphName, or there are more or fewer than 1 datapoints selected.
    
    A possible future variant of this command would not require a graphName to be specified.
        
    @param context
    @param args
    
    @param {String} args.graphName
      The name of the graph on which the dataset with the selected point must be displayed. This graph must be open in 
      the page when this command executes.
    @param {String} args.datasetName
      The name of the dataset, which must have a single selected point.
    @param {String} args.highlightedPointName
      The name given to the session-scoped HighlightedPoint annotation which will be created.
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
      Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.HighlightedPoint, args.highlightedPointName, { 
        point: selectedPoint.get('id')
      });
    
    return YES;
  },
  
  /** 
    Create a LineThroughPoints with the name lineName in the current session. Takes as one point of the line
    a current HighlightedPoint annotation, and as the other, the selected data point in the dataset with the
    name datasetName, which must be open in the graph graphName.
    
    The LineThroughPoints is not automatically added to the graph.
    
    This method does nothing if there is no dataset with the passed name, or if it is not open in the graph
    with graphName, if there is no HighlightedPoint annotation, or if there are more or fewer than 1 data
    points selected.
    
    A possible future version of this method might accept two selected points.
    
    @param context
    @param args
    
    @param {String} args.graphName
      The name of the graph on which the dataset with the selected point must be displayed. This graph must be open in 
      the page when this command executes.
    @param {String} args.datasetName
      The name of the dataset, which must have a single selected point.
    @param {String} args.highlightedName
      The name of the HighlightedPoint annotation.
    @param {String} args.lineName
      The name given to the session-scoped LineThroughPoints annotation which will be created.
  */
  createLineThroughPointsFromHighlightedPointAndSelection: function (context, args) {
    // given the graphName, find the associated graph controller
    var controller = Smartgraphs.GraphController.controllerForName[args.graphName];
    
    // Use the graph controllers findDatasetByName method to dereference datasetName to an actual Dataset record
    var dataset = controller && controller.findDatasetByName(args.datasetName);
    
    if (!dataset) return YES; // handled, but graph controller or dataset could not be found
    
    var selection = dataset.get('selection');
    // consider the action handled -- but do nothing -- if there are < 1 or > 1 points selected.
    if (selection.get('length') !== 1) return YES;
    
    var selectedPoint = selection.firstObject();
    
    var annotation = controller.findAnnotationByName(args.highlightedName);
    
    // Color is #000000 unless the action supplies a 'color' argument
    var color = args.color ? args.color : '#000000';
    
    // set points (a relation) using ids rather than objects, because createAnnotation works like createRecord
    // in that regard (it works on the datahash underlying the record)
    var lineThroughPoints = 
      Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.LineThroughPoints, args.lineName, { 
        point1: annotation.get('point').get('id'),
        point2: selectedPoint.get('id'),
        color: color
      });
    
    return YES;
  }
  
}) ;
