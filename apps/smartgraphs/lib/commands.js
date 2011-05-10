// ==========================================================================
// Project:   Smartgraphs command definitions
// Copyright: ©2011 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('lib/executor');

Smartgraphs.executor.defineCommands(function (def) {

  /**
    Set attributes (other than 'name'!) of an attribute
    
    @param args
  
    @param {String} args.name
      The name of the Annotation whose properties will be modified
  */
  def('setAnnotationAttribute', function (args) {
    var annotation = Smartgraphs.activityObjectsController.findAnnotation(args.name);
    if (!annotation) return "could not find annotation '" + args.name + "'";

    for (var prop in args) {
      if (!args.hasOwnProperty(prop) || prop === 'name') continue;
      annotation.set(prop, args[prop]);
    }
  });
  
  
  /**
    Disable submission
  */
  def('disableSubmission', function () {
    Smartgraphs.statechart.sendAction('disableSubmission');
  });
  
  /**
    Begin 'freehand input' on the specified graph, for example to draw a prediction graph. The freehand input mode
    enables the user to create an arbitrary sketch on the graph and turns on the 'clear' button which allows the user
    to start their sketch over. The sketch is stored as a session-scoped FreehandSketch annotation with the specified
    name, so that it can be called up later in the activity.
    
    The system remains in the FREEHAND_INPUT state or one of its substates until the user submits the step. It is
    possible to specify a submissibility expression that only allows submission once an appropriate sketch has been 
    completed.
    
    @param args
    
    @param {String} args.annotationName
      The name to be given to the Smartgraphs.FreehandSketch annotation object which will hold the user's sketch.
    @param {String} args.graphName
      The name of the graph on which the user will draw (and on which the FreehandSketch annotation will be added.)
      This graph must be open in the page when this command executes.
  */
  def('startFreehandInput', function (args) {

    this.createAnnotation(this, { 
      graphName: args.graphName,
      type: Smartgraphs.FreehandSketch,
      name: args.annotationName
    });

    var controller = Smartgraphs.GraphController.controllerForName[args.graphName];
    if (Smartgraphs.freehandInputController.register(controller, args.annotationName)) {
      Smartgraphs.statechart.gotoState('FREEHAND_INPUT');
    }
  });
  
  /**
    Allow sensor input into a Dataset with the provided name on the specified graph. This command starts up the sensor
    applet and displays Start, Stop, and Clear buttons below the graph. (The Start button will be enabled when the
    sensor applet indicates that it has started up and is ready to accept input from a connected probe. Actual
    recording of data occurs only occurs after the user clicks the Start button.)
    
    The system remains in the SENSOR state or one of its substates until the user submits the step.
    
    @param args
    
    @param {String} args.datasetName
      The name to be given to the Dataset which will hold the sensor-recorded data.
    @param {String} args.graphName
      The name of the graph on which the data will be shown.
  */
  def('startSensorInput', function (args) {
    var dataset = Smartgraphs.activityObjectsController.createDataset(args.datasetName, '/builtins/units/seconds', '/builtins/units/meters');
    dataset.set('xLabel', "Time");
    dataset.set('xShortLabel', "Time");
    dataset.set('yLabel', "Position");
    dataset.set('yShortLabel', "Position");
    
    var controller = Smartgraphs.GraphController.controllerForName[args.graphName];
    controller.addDataset(dataset);
    
    if ( !dataset || !controller ) return "couldn't make dataset or could find graph";        // handled, but invalid graphName or dataset...
    
    // TODO let 'args' override these settings if desired
    var xMin = controller.getPath('xAxis.min');
    var xMax = controller.getPath('xAxis.max');
    var pane = Smartgraphs.activityViewController.paneForController(controller);
    
    if (Smartgraphs.sensorController.register(pane, dataset, xMin, xMax)) {
      Smartgraphs.statechart.gotoState('SENSOR');
    }
  });
  
});
