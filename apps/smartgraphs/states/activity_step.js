// ==========================================================================
// Project:   Smartgraphs.ACTIVITY_STEP
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('states/activity');

/** @class

  State representing that an ActivityStep is currently active and has not yet been submitted.
  
  This state defines most of the commands available to an activity author.
  
  @extends SC.Responder
  @version 0.1
*/

Smartgraphs.ACTIVITY_STEP = SC.Responder.create(
/** @scope Smartgraphs.ACTIVITY_STEP.prototype */ {
  
  nextResponder: Smartgraphs.ACTIVITY,
  
  didBecomeFirstResponder: function() {
    Smartgraphs.activityStepController.begin();
  },
  
  willLoseFirstResponder: function () {
    Smartgraphs.responseTemplateController.set('editingShouldBeEnabled', NO);
  },
  
  // ..........................................................
  // ACTIONS
  // 
  
  /**
    Sets the configuration of the panes on the right-hand side. Options are "single" or "split".
    
    This configuration affects the 'pane' parameters of further commands in the following way. If the current pane
    configuration is 'single', the only valid 'pane' value is 'single'. If the pane configuration is split,
    the value of 'pane' can be 'top' or 'bottom'.
    
    @param context
    @param args
    
    @param {String} args.pane
      The desired pane configuration. If "single", a single pane will be shown on the right. If "split", the right
      side will be split into equally-sized top and bottom panes.
  */
  setPaneConfig: function (context, args) {
    Smartgraphs.activityViewController.setPaneConfig(args);
    return YES;
  },
  
  /**
    Make the referenced pane display an empty view.
    
    @param context
    @param args
    
    @param {String} args.pane
      The pane to be hidden. Valid values are 'single', 'top', or 'bottom'. 
  */
  hidePane: function (context, args) {
    Smartgraphs.activityViewController.hidePane(args);
    return YES;
  },

  /**
    Show an image in the referenced pane.
  
    @param context
    @param args
    
    @param {String} args.pane
      The pane in which to show the image. Valid values are 'single', 'top', or 'bottom'.
    
    @param {String} args.path
      The url at which to find the image.
  */
  showImage: function (context, args) {
    return Smartgraphs.activityViewController.showImage(args.pane, args.path);
  },
  
  /**
    Show a graph in the specified pane.
    
    @param context  
    @param args
    
    @param {String} args.pane
      The pane in which to show the graph. Valid values are 'single', 'top', or 'bottom'.
    
    @param {String} args.name
      The name of the graph to show. A graph with this name must be defined elsewhere in the activity.
  */
  showGraph: function (context, args) {
    Smartgraphs.activityViewController.showGraph(args.pane, args.name);
    return YES;
  },
  
  /**
    Show a table in the specified pane corresponding to the dataset with the specified name.
    
    This command will wait for the specified graph to be open and for the specified dataset to be opened in that graph
    before displaying the table. 
    
    In addition, when data is streamed into the dataset (for example, from the sensor applet) the table will switch to
    'numeric display' mode, showing the values of the latest incoming datapoint in large type. When streaming stops,
    it will automatically display the new data in a table form.
    
    @param context
    @param args
    
    @param {String} args.pane
      The pane in which to show the table. In practice, valid values are 'top', or 'bottom' because a graph must be
      open while the table is showing.
    
    @param {String} args.graphName
      Required. The name of a graph to which to link this table.
    
    @param {String} args.datasetName
      The name of the Dataset to be displayed in the table.
  */
  showTable: function (context, args) {
    Smartgraphs.activityViewController.showTable(args.pane, args.graphName, args.datasetName);  
  },
  
  /**
    Wait for the user to enter a response before progressing to the 'submitted' state.
    
    This command enables editing of the responseTemplate, if there is one.
    
    Moreover, If the current ActivityStep specifies a submissibilityInspector, this instantiates the inspector, which
    watches the current state of the system as manipulated by the user and disables/enables submission accordingly.

    If the current ActivityStep does not specify a submissibilityInspector, this command enables submission
    immediately.
    
    This command executes automatically when an ActivityStep which has shouldWaitForSubmissibleResponse == YES begins.
  */
  waitForResponse: function (context, args) {
    Smartgraphs.activityStepController.waitForResponse();
    Smartgraphs.responseTemplateController.set('editingShouldBeEnabled', YES);
    return YES;
  },
  
  /**
    If submission is enabled, transitions to the ACTIVITY_STEP_SUBMITTED state. Otherwise, does nothing.
    
    The transition to the ACTIVITY_STEP_SUBMITTED results in the execution of the 'afterSubmissionCommands' specified
    by the current ACTIVITY_STEP and then either branches to the next step or ends the ActivityPage.
  */
  submitStep: function () {
    if (Smartgraphs.activityStepController.get('canSubmit')) {
      Smartgraphs.makeFirstResponder(Smartgraphs.ACTIVITY_STEP_SUBMITTED);
    }
    return YES;
  },
  
  /**
    Submits the current ActivityStep and opens the next ActivityPage. Note that this action will fail if the current
    step is not in the submissible state.
    
    Once the step has been submitted, if the current step is not a terminal step (i.e., has isFinalStep == NO), the
    action will fail and the system will remain in the ACTIVITY_STEP_SUBMITTED state.
  */
  gotoNextPage: function () {
    this.submitStep();
    this.invokeLast(function () {
      Smartgraphs.sendAction('gotoNextPage');
    });
  },

  /**
    Creates a new session-scoped Dataset on the specified graph.
    
    @param context
    @param args
    
    @param {String} args.datasetName
      The name to be given to the new Dataset.

    @param {String} args.graphName
      The graph on which the dataset will be shown when it is created. A graph with this name must be open in the 
      page when this command executes.
  */
  createDataset: function (context, args) {
    var dataset = Smartgraphs.sessionController.createDataset(args.datasetName);
    if (args.graphName) {
      var controller = Smartgraphs.GraphController.controllerForName[args.graphName];
      controller.addDataset(dataset);
    }
    return YES;
  },
  
  /**
    Remove the specified Dataset from the specified graph. 
    
    This does not delete the Dataset; it merely removes it from the graph.
    
    @param context
    @param args
    
    @param {String} args.datasetName
      The name of the dataset being displayed on the graph.

    @param {String} args.graphName
      The graph on which the dataset is being displayed. This graph must be open in the page.
  */
  removeDataset: function (context, args) {
    var controller = Smartgraphs.GraphController.controllerForName[args.graphName];
    controller.removeDataset(args.datasetName);
    return YES;
  },

  /**
    Create an session-scoped Annotation with the specified type and name on the specified graph.
    
    This command creates an 'empty' Annotation. Subsequent commands can reference the annotation by name in order to
    add content to it.
    
    @param context
    @param args
    
    @param {String} args.type
      The name of the subclass of Annotation to be created. For example, 'Smartgraphs.HighlightedPoint'
    @param {String} args.name
      The name to be given to the Annotation object once it is created.
    @param {String} args.graphName
      The name of the graph on which the Annotation should be displayed, once it is created. This graph must be open
      in the page when this command executes.
  */
  createAnnotation: function (context, args) {
    var controller = Smartgraphs.GraphController.controllerForName[args.graphName];
    var annotation = Smartgraphs.sessionController.createAnnotation(args.type, args.name);
    controller.addAnnotation(annotation);
    return YES;
  },
  
  /**
    Add an existing Annotation with the specified name and type to the specified graph.
    
    If no session-scoped Annotation with the specified name and type exists, an example Annotation with the specified
    name and type is searched for and, if one is found, it is added to the graph.
    
    Note that eventually it will make sense to remove the requirement to specify the Annotation type as well as the 
    Annotation name here. However, this requirement does exist now.
    
    @param context
    @param args
    
    @param {String} args.type
      The name of the subclass of Annotation. For example, 'Smartgraphs.HighlightedPoint'
    @param {String} args.name
      The name of the Annotation object.
    @param {String} args.graphName
      The name of the graph on which the Annotation should be displayed. This graph must be open in the page when this
      command executes.
  */
  addAnnotation: function (context, args) {
    var controller = Smartgraphs.GraphController.controllerForName[args.graphName];
    controller.addObjectByName(args.type, args.name);
    return YES;
  },
  
  /** 
    Remove the specified Annotation from the specified graph.
    
    @param context
    @param args
    
    @param {String} args.name
      The name of the Annotation to be removed from the graph.
    @param {String} args.graphName
      The name of the graph from which the Annotation should be removed. This graph must be open in the page when this
      command executes.
  */
  removeAnnotation: function (context, args) {
    var controller = Smartgraphs.GraphController.controllerForName[args.graphName];
    controller.removeAnnotation(args.name);
    return YES;
  },
  
  /** 
    Create a LineThroughPoints with the name lineName in the current session. Takes two HighlightedPoints as the 
    points through which to draw the line
    
    The LineThroughPoints is not automatically added to the graph.
    
    This method does nothing if there is no dataset with the passed name, or if it is not open in the graph
    with graphName.
    
    @param context
    @param args
    
    @param {String} args.graphName
      The name of the graph on which the dataset with the selected point must be displayed. This graph must be open in 
      the page when this command executes.
    @param {String} args.firstPoint
      The name of one HighlightedPoint annotation.
    @param {String} args.secondPoint
      The name of the other HighlightedPoint annotation.      
    @param {String} args.lineName
      The name given to the session-scoped LineThroughPoints annotation which will be created.
  */
  createLineThroughPoints: function (context, args) {
    // given the graphName, find the associated graph controller
    var controller = Smartgraphs.GraphController.controllerForName[args.graphName];
  
    if (!controller) return YES;
    
    var firstAnnotation = controller.findAnnotationByName(args.firstPoint);
    var secondAnnotation = controller.findAnnotationByName(args.secondPoint);
    
    // set points (a relation) using ids rather than objects, because createAnnotation works like createRecord
    // in that regard (it works on the datahash underlying the record)
    var lineThroughPoints = 
      Smartgraphs.sessionController.createAnnotation(Smartgraphs.LineThroughPoints, args.lineName, { 
        point1: firstAnnotation.get('point').get('id'),
        point2: secondAnnotation.get('point').get('id')
      });
    
    return YES;
  },
  
  /**
    Begin 'freehand input' on the specified graph, for example to draw a prediction graph. The freehand input mode
    enables the user to create an arbitrary sketch on the graph and turns on the 'clear' button which allows the user
    to start their sketch over. The sketch is stored as a session-scoped FreehandSketch annotation with the specified
    name, so that it can be called up later in the activity.
    
    The system remains in the FREEHAND_INPUT state or one of its substates until the user submits the step. It is
    possible to specify a submissibilityInspector that only allows submission once an appropriate sketch has been 
    completed.
    
    @param context
    @param args
    
    @param {String} args.annotationName
      The name to be given to the Smartgraphs.FreehandSketch annotation object which will hold the user's sketch.
    @param {String} args.graphName
      The name of the graph on which the user will draw (and on which the FreehandSketch annotation will be added.)
      This graph must be open in the page when this command executes.
  */
  startFreehandInput: function (context, args) {
    Smartgraphs.sendAction('createAnnotation', this, { 
      graphName: args.graphName,
      type: Smartgraphs.FreehandSketch,
      name: args.annotationName
    });

    var controller = Smartgraphs.GraphController.controllerForName[args.graphName];
    if (Smartgraphs.freehandInputController.register(controller, args.annotationName)) {
      Smartgraphs.makeFirstResponder(Smartgraphs.FREEHAND_INPUT);
    }
    return YES;
  },
  
  /**
    Allow sensor input into a Dataset with the provided name on the specified graph. This command starts up the sensor
    applet and displays Start, Stop, and Clear buttons below the graph. (The Start button will be enabled when the
    sensor applet indicates that it has started up and is ready to accept input from a connected probe. Actual
    recording of data occurs only occurs after the user clicks the Start button.)
    
    The system remains in the SENSOR state or one of its substates until the user submits the step.
    
    @param context
    @param args
    
    @param {String} args.datasetName
      The name to be given to the Dataset which will hold the sensor-recorded data.
    @param {String} args.graphName
      The name of the graph on which the data will be shown.
  */
  startSensorInput: function (context, args) {
    Smartgraphs.sendAction('createDataset', this, { 
      graphName: args.graphName, 
      datasetName: args.datasetName
    });

    var controller = Smartgraphs.GraphController.controllerForName[args.graphName];
    var dataset = controller && controller.findDatasetByName(args.datasetName);
    
    if ( !dataset ) return YES;        // handled, but invalid graphName or dataset...
    
    // TODO let 'args' override these settings if desired
    var xMin = controller.getPath('axes.xMin');
    var xMax = controller.getPath('axes.xMax');
    var pane = Smartgraphs.activityViewController.paneForController(controller);
    
    if (Smartgraphs.sensorController.register(pane, dataset, xMin, xMax)) {
      Smartgraphs.makeFirstResponder(Smartgraphs.SENSOR);
    }
    return YES;
  },
  
  /**
    Allow the user to interactively select the 'anchor' datapoint for some annotation, such as a HighlightedPoint or,
    in future, a label. Step submission is not allowed until the student selects a datapoint.
    
    This implementation requires specifying a dataset. It also modifies the behavior of the dataset view so that
    points are not selected in the dataset when they are clicked on; instead, they set the 'point' property of the
    desired annotation.
    
    @param context
    @param args
    
    @param {String} args.annotationName
      The name of the annotation object (for now, this will be a HighlightedPoint annotation)
    @param {String} args.graphName
      The name of the graph which should contain the dataset we are choosing a data point from
    @param {String} args.datasetName
      The name of the dataset we are choosing a data point from.
  */
  startInteractiveSelection: function (context, args) {
    var controller = Smartgraphs.GraphController.controllerForName[args.graphName];
    var dataset = controller && controller.findDatasetByName(args.datasetName);
  
    if ( !dataset ) return YES;        // handled, but invalid graphName or dataset...
  
    var annotation = Smartgraphs.sessionController.createAnnotation(Smartgraphs.HighlightedPoint, args.annotationName);  
    controller.addAnnotation(annotation);
    
    // try a simpler paradigm .. just stash the info needed by the state, in the state
    Smartgraphs.INTERACTIVE_SELECTION.set('annotation', annotation);
    Smartgraphs.INTERACTIVE_SELECTION.set('dataset', dataset);
  
    // disable submission until a selection is made...
    Smartgraphs.activityStepController.disableSubmission();
          
    Smartgraphs.makeFirstResponder(Smartgraphs.INTERACTIVE_SELECTION);

    return YES;
  }
  
  // NOT CURRENTLY USED
  
  // setAxes: function (context, args) {
  //   var controller = Smartgraphs.activityViewController.graphControllerForPane(args.pane);
  //   controller.setAxes(args.axesId);
  //   return YES;
  // },
  // 
  // displayDatasetOnGraph: function (context, args) {
  //   var controller = Smartgraphs.activityViewController.graphControllerForPane(args.pane);    
  //   controller.addObjectByName(Smartgraphs.Dataset, args.datasetName);
  //   return YES;
  // },
  // 
  // copyExampleDatasetToGraph: function (context, args) {
  //   var controller = Smartgraphs.activityViewController.graphControllerForPane(args.pane);
  //   var dataset = Smartgraphs.sessionController.createDataset(args.datasetName);
  //   Smartgraphs.sessionController.copyExampleDataset(args.exampleDatasetName, args.datasetName);
  //   controller.addDataset(dataset);
  //   return YES;
  // },
  // 
  // removeAllDataset: function (context, args) {
  //   return NO;      // not handled yet.
  //   // var controller = Smartgraphs.activityViewController.graphControllerForPane(args.pane);
  //   // controller.removeAllDataset();
  // },
  // 
  // selectDataset: function (context, args) {
  //   var controller = Smartgraphs.activityViewController.graphControllerForPane(args.pane);
  //   controller.selectDataset(args.datasetName);
  //   return YES;
  // }
  
}) ;
