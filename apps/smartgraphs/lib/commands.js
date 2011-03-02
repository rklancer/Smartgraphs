// ==========================================================================
// Project:   Smartgraphs command definitions
// Copyright: ©2011 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('lib/executor');

Smartgraphs.executor.defineCommands(function (def) {
  
  def('testCommand', function (args) {
    console.log(args.message || "no message");
  });


  /** 
    Create a LineThroughPoints with the name lineName in the current session. Takes two HighlightedPoints as the 
    points through which to draw the line.
    
    The LineThroughPoints is not automatically added to a graph.
    
    This method does nothing if there is no dataset with the passed name
    
    @param args
    
    @param {String} args.firstPoint
      The name of one HighlightedPoint annotation.
    @param {String} args.secondPoint
      The name of the other HighlightedPoint annotation.      
    @param {String} args.lineName
      The name given to the LineThroughPoints annotation which will be created.
    @param {String} args.color
      The RGB color definition for the color to render the line.
  */
  def('createLineThroughPoints', function (args) {
    var p1 = Smartgraphs.activityObjectsController.findAnnotation(args.firstPoint).get('point');
    var p2 = Smartgraphs.activityObjectsController.findAnnotation(args.secondPoint).get('point');   
    var color = args.color || "#000000";
    
    // set points (a relation) using ids rather than objects, because createAnnotation works like createRecord
    // in that regard (it works on the datahash underlying the record)
    var lineThroughPoints = 
      Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.LineThroughPoints, args.lineName, { 
        point1: p1.get('id'),
        point2: p2.get('id'),
        color: color
      });
  });
  

  /** 
    Create an Arrow annotation with the name arrowName in the current session. Takes two HighlightedPoints as the
    defining points; the arrow will run from the height (y-value) of the first point vertically to the second
    point.
    
    The Arrow is not automatically added to a graph.
    
    @param args
    
    @param {String} args.firstPoint
      The name of one HighlightedPoint annotation.
    @param {String} args.secondPoint
      The name of the other HighlightedPoint annotation.      
    @param {String} args.arrowName
      The name given to the session-scoped Arrow annotation which will be created.
    @param {String} [args.color='#000000']
      The RGB color definition for the color to render the line.
    @param {String} [args.label]
      Optional label for the arrow
    @param {String} [args.isHighlighted=false]
      Whether the arrow should be highlighted      
  */
  def('createRiseArrow', function (args) {
    var p1 = Smartgraphs.activityObjectsController.findAnnotation(args.firstPoint).get('point');
    var p2 = Smartgraphs.activityObjectsController.findAnnotation(args.secondPoint).get('point');    
    var color = args.color || "#000000";
    
    // Reorder the points such that the first point is the leftmost one, i.e. the lower x-value   
    var points = p1.get('x') < p2.get('x') ? [p1, p2] : [p2, p1];
  
    var riseArrow = 
      Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.Arrow, args.arrowName, { 
        point1: points[0].get('id'),
        point2: points[1].get('id'),
        color: color,
        isVertical: YES,
        isClockwise: YES,
        isHighlighted: args.isHighlighted || NO,
        label: args.label
      });
  });

  /** 
    Create an Arrow annotation with the name arrowName in the current session. Takes two HighlightedPoints as the
    defining points; the arrow will run from the first point horizontally to the x-value of the second
    point.
    
    The Arrow is not automatically added to a graph.
    
    @param args
    
    @param {String} args.firstPoint
      The name of one HighlightedPoint annotation.
    @param {String} args.secondPoint
      The name of the other HighlightedPoint annotation.      
    @param {String} args.arrowName
      The name given to the session-scoped Arrow annotation which will be created.
    @param {String} [args.color='#000000']
      The RGB color definition for the color to render the line.
    @param {String} [args.label]
      Optional label for the arrow
    @param {String} [args.isHighlighted=false]
      Whether the arrow should be highlighted          
  */
  def('createRunArrow', function (args) {
    var p1 = Smartgraphs.activityObjectsController.findAnnotation(args.firstPoint).get('point');
    var p2 = Smartgraphs.activityObjectsController.findAnnotation(args.secondPoint).get('point');    
    var color = args.color || "#000000";
    
    // Reorder the points such that the first point is the leftmost one, i.e. the lower x-value   
    var points = p1.get('x') < p2.get('x') ? [p1, p2] : [p2, p1];
    
    var runArrow = 
      Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.Arrow, args.arrowName, { 
        point1: points[0].get('id'),
        point2: points[1].get('id'),
        color: color,
        isHorizontal: YES,
        isClockwise: YES,
        isHighlighted: args.isHighlighted || NO,        
        label: args.label
      });
  });
  
  /** 
    Create an IndicatingArrow Annotation with the name arrowName in the current session, pointing
    at a specific dataPoint.
    
    @param args
    
    @param {String} args.arrowName
      The name for this annotation
    @param {Smartgraphs.DataPoint} args.point
      The data point the arrow will indicate.
    @param {String} [args.color='#cc0000']
      The color of the arrow.
    @param {Number} [args.angle=335]
    
  */
  def('createIndicatingArrowFromDataPoint', function (args) {
    // TODO
    
    // var indicator = 
    //   Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.IndicatingArrow, args.arrowName, {
    //     dataPoint: args.point.get('id'),
    //     pointAngle: args.angle,
    //     color: args.color
    //   });
  });
  
  /** 
    Create an IndicatingArrow Annotation with the name arrowName in the current session, pointing
    at a specific HighlightedPoint.
    
    @param args
    
    @param {String} args.arrowName
      The name for this annotation
    @param {String} args.point
      The name of the HighlightedPoint annotation the arrow will indicate
    @param {String} [args.color='#cc0000']
      The color of the arrow.
    @param {Number} [args.angle=335]
    
  */
  def('createIndicatingArrowFromHighlightedPoint', function (args) {
    var hp = Smartgraphs.activityObjectsController.findAnnotation(args.point);
    var indicator = 
      Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.IndicatingArrow, args.arrowName, {
        annotation: hp.get('id'),
        pointAngle: args.angle || 335,
        color: args.color || '#cc0000',
        length: args.length || 40
      });
  });
  
  /** 
    Create an IndicatingArrow Annotation with the name arrowName in the current session, pointing
    at a specific set of coordinates.
    
    @param args
    
    @param {String} args.arrowName
      The name for this annotation
    @param {Number} args.x
      The x-coordinate of the point being indicated
    @param {Number} args.y
      The y-coordinate of the point being indicated
    @param {String} [args.color='#cc0000']
      The color of the arrow.
    @param {Number} [args.angle=335]
    @param {Number} [args.length=40]
    
  */
  def('createIndicatingArrowFromCoordinates', function (args) {
    var indicator = 
      Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.IndicatingArrow, args.arrowName, {
        specificX: args.x,
        specificY: args.y,
        pointAngle: args.angle || 335,
        color: args.color || '#cc0000',
        length: args.length || 40
      });
  });
  
  /**
    Create a BracketArc Annotation with the name bracketName in the current session, pointing at two
    specific points defined by coordinates.
    
    @param args
    
    @param {String} args.bracketName
      The name for this annotation
    @param {Number} args.startX
      The x-coordinate of the starting point of the arc
    @param {Number} args.startY
      The y-coordinate of the starting point of the arc
    @param {Number} args.endX
      The x-coordinate of the ending point of the arc
    @param {Number} args.endY
      The y-coordinate of the ending point of the arc
    @param {String} [args.color='#cc0000']
      The color in which the arc should be rendered.
  */
  def('createBracketArcFromCoordinates', function (args) {
    var arc = 
      Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.BracketArc, args.bracketName, {
        startX: args.startX,
        startY: args.startY,
        endX: args.endX,
        endY: args.endY,
        color: args.color || '#cc0000',
        isClockwise: false
      });
  });
  
  /** 
    Creates a BracketArc annotation intended to sit to the right of the data table and indicate the 
    gap between the Y coordinates of two HighlightedPoints, i.e. the "rise" of the slope between 
    those two points.
    
    @param args
    
    @param {String} args.bracketName
      The name for this annotation
    @param {String} args.point1
      The name of the HighlightedPoint where the arc should start.
    @param {String} args.point2
      The name of the HighlightedPoint where the arc should end.
    @param {String} [args.color='#cc0000']
      The color in which the arc should be rendered.
    @param {String} [args.label]
      Optional label for the bracket
    @param {String} [args.isHighlighted=false]
      Whether the bracket should be highlighted
  */
  def('createRiseBracket', function (args) {
    var hp1 = Smartgraphs.activityObjectsController.findAnnotation(args.point1),
        hp2 = Smartgraphs.activityObjectsController.findAnnotation(args.point2),
        p1 = hp1.get('point'),
        p2 = hp2.get('point'),
        dataset = p1.get('dataset'),
        points = dataset.get('points'),
        p1Index = points.indexOf(p1),
        p2Index = points.indexOf(p2);
    
    // dataset.points is automatically sorted by x-value. Therefore the rise arrow always goes from lower to higher index.
        
    if (p1.get('dataset') !== p2.get('dataset')) return "datasets didn't match";

    Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.BracketArc, args.bracketName, {
      item1Index: Math.min(p1Index, p2Index),
      item2Index: Math.max(p1Index, p2Index),
      isLeftOfColumn: NO,
      color: args.color || '#cc0000',
      isHighlighted: args.isHighlighted || NO,
      label: args.label
    });
    
  });
  
  /** 
    Creates a BracketArc annotation intended to sit to the left of the data table and indicate the 
    gap between the X coordinates of two HighlightedPoints, i.e. the "run" of the slope between 
    those two points.
    
    @param args
    
    @param {String} args.bracketName
      The name for this annotation
    @param {String} args.point1
      The name of the HighlightedPoint where the arc should start.
    @param {String} args.point2
      The name of the HighlightedPoint where the arc should end.
    @param {String} [args.color='#cc0000']
      The color in which the arc should be rendered.
    @param {String} [args.label]
      Optional label for the bracket
    @param {String} [args.isHighlighted=false]
      Whether the arrow should be highlighted           
  */
  def('createRunBracket', function (args) {
    var hp1 = Smartgraphs.activityObjectsController.findAnnotation(args.point1),
        hp2 = Smartgraphs.activityObjectsController.findAnnotation(args.point2),
        p1 = hp1.get('point'),
        p2 = hp2.get('point'),
        dataset = p1.get('dataset'),
        points = dataset.get('points'),
        p1Index = points.indexOf(p1),
        p2Index = points.indexOf(p2);

    if (p1.get('dataset') !== p2.get('dataset')) return "datasets didn't match";

    Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.BracketArc, args.bracketName, {
      item1Index: Math.min(p1Index, p2Index),
      item2Index: Math.max(p1Index, p2Index),
      isLeftOfColumn: YES,
      color: args.color || '#cc0000',
      isHighlighted: args.isHighlighted || NO,
      label: args.label
    });

  });
  
  /**
    Given a point and a label string, create a LabelAnnotation for that point.
  
  @param args
  
  @param {String} args.labelName
    The name for this annotation
  @param {String} args.point
    The point we're annotating. This could be provided as an actual Smartgraphs.DataPoint, a 
    Smartgraphs.Annotation type which has a "point" attribute (which is therefore a Smartgraphs.DataPoint),
    or the guid (url) of a Smartgraphs.DataPoint.
  @param {String} args.label
    The actual text of the label we're putting on the point.
  @param {String} [args.color='#000000']
    The color in which the arc should be rendered.
  @param {Number} [args.xOffset=0]
    How far the center of the label should be offset to the left or right of the point being labeled, in pixels.
    Negative numbers move the label to the left; positive numbers move the label to the right.
  @param {Number} [args.yOffset=-15]
    How far the center of the label should be offset vertically from the point being labeled, in pixels.
    Negative numbers move the label up, positive numbers move the label down. The default is -15, or fifteen
    pixels above the point.
  @param {Number} [args.size=15]
    The "point size" of the label type.
  */
  def('createLabelAnnotation', function (args) {
    var point;
    if (args.point.length) {
      // It's a string, is it a GUID?
      point = Smartgraphs.store.find(Smartgraphs.DataPoint, args.point);
    }
    else if (args.point.kindOf(Smartgraphs.DataPoint)) { 
      // It's a DataPoint
      point = args.point;
    }
    else if (args.point.kindOf(Smartgraphs.Annotation) && args.point.get('point')) { 
      // It's an Annotation which has a 'point' attribute we can use
      point = args.point.get('point');
    }
    if (point.kindOf(Smartgraphs.DataPoint) !== undefined) { // We should have a DataPoint by now
      // Generate the annotation
      var label =
        Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.LabelAnnotation, args.labelName, {
          point: point.get('id'),
          label: args.label,
          color: args.color ? args.color : "#000000",
          xOffset: args.xOffset ? args.xOffset : 0,
          yOffset: args.yOffset ? args.yOffset : -15,
          size: args.size ? args.size : 15
        });
      if (!label.kindOf(Smartgraphs.LabelAnnotation)) {
        // This error means the controller method to create the annotation failed.
        console.warn("Creation of the LabelAnnotation may not have worked properly.");
      }
    }
    else {
      // This error means the duck-typing of the args.point argument failed.
      console.error("Couldn't figure out which DataPoint to associate with the annotation.");
    }
  });
  
  /**
    For the named annotation, toggle the isHighlighted property. (If truthy, set to false; if falsy, set to true.)
    
    @param args
    
    @param {String} args.annotationName
      The name of the Annotation whose isHighlighted property will be toggled.
  */
  def('toggleAnnotationHighlight', function (args) {
    var annotation = Smartgraphs.activityObjectsController.findAnnotation(args.annotationName);
    annotation.toggleProperty('isHighlighted');
  });
  
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
    Set a session-scoped Variable to the value of a specific expression.
    
    @param args
    
    @param {String} args.name
      The name of the variable to be set.
    @param {String} args.expression
      The value of the variable, expressed as an expression that can be evaluated by Smartgraphs.evaluator.evaluate()
  */
  def('setVariable', function (args) {
    var val;

    if (SC.none(args.name)) {
      throw("variable name is required");
    }
    if (SC.none(args.expression)) {
      throw("variable value is required");
    }

    val = Smartgraphs.evaluator.evaluate(args.expression);
    Smartgraphs.activityObjectsController.setVariable(args.name, val); 
  });



  /**
    Creates a new session-scoped Dataset on the specified graph.
    
    @param args
    
    @param {String} args.datasetName
      The name to be given to the new Dataset.

    @param {String} args.graphName
      The graph on which the dataset will be shown when it is created. A graph with this name must be open in the 
      page when this command executes.
  */
  def('createDataset', function (args) {
    var dataset = Smartgraphs.activityObjectsController.createDataset(args.datasetName);
    if (args.graphName) {
      var controller = Smartgraphs.GraphController.controllerForName[args.graphName];
      controller.addDataset(dataset);
    }
  });
  
  /**
    Remove the specified Dataset from the specified graph. 
    
    This does not delete the Dataset; it merely removes it from the graph.
    
    @param args
    
    @param {String} args.datasetName
      The name of the dataset being displayed on the graph.

    @param {String} args.graphName
      The graph on which the dataset is being displayed. This graph must be open in the page.
  */
  def('removeDataset', function (args) {
    var controller = Smartgraphs.GraphController.controllerForName[args.graphName];
    controller.removeDataset(args.datasetName);
  });

  /**
    Create an session-scoped Annotation with the specified type and name on the specified graph.
    
    This command creates an 'empty' Annotation. Subsequent commands can reference the annotation by name in order to
    add content to it.
    
    @param args
    
    @param {String} args.type
      The name of the subclass of Annotation to be created. For example, 'Smartgraphs.HighlightedPoint'
    @param {String} args.name
      The name to be given to the Annotation object once it is created.
    @param {String} [args.graphName]
      The name of an open graph on which the Annotation should be displayed, once it is created. Optional.
  */
  def('createAnnotation', function (args) {
    var controller = Smartgraphs.GraphController.controllerForName[args.graphName];
    var annotation = Smartgraphs.activityObjectsController.createAnnotation(args.type, args.name);
    if (controller) controller.addAnnotation(annotation);
  });
  
  /**
    Add an existing Annotation with the specified name to the specified graph or table.
    
    @param args
    
    @param {String} args.name
      The name of the Annotation object.
    @param {String} args.tableName
      The name of the table (or dataset) on which the Annotation should be displayed.
  */
  def('addAnnotation', function (args) {
    var annotation = Smartgraphs.activityObjectsController.findAnnotation(args.name),
        graphController;
        
    if (!annotation) return "could not find annotation '" + args.name + "'";

    if (args.pane) {
      graphController = Smartgraphs.activityViewController.graphControllerForPane(args.pane);
    }

    if (graphController) graphController.addAnnotation(annotation);

    if (args.tableName && Smartgraphs.TableController.controllerForDataset[args.tableName]) {
      Smartgraphs.TableController.controllerForDataset[args.tableName].addAnnotation(annotation);
    }    
  });
  
  /** 
    Remove the specified Annotation from the specified graph or table.
    
    @param args
    
    @param {String} args.name
      The name of the Annotation to be removed from the graph or table.
    @param {String} args.graphName
      The name of the graph from which the Annotation should be removed. This graph must be open in the page when this
      command executes.
    @param {String} args.tableName
      The name of the table from which the Annotation should be removed. This table must be open in the page when this
      command executes. Ignored if args.graphName is defined.
  */
  def('removeAnnotation', function (args) {
    var controller;
    if (args.graphName) {
      controller = Smartgraphs.GraphController.controllerForName[args.graphName];
    }
    else if (args.tableName) {
      controller = Smartgraphs.TableController.controllerForDataset[args.tableName];
    }
    controller.removeAnnotation(args.name);
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
  
  /**
    Allow the user to interactively select the 'anchor' datapoint for some annotation, such as a HighlightedPoint or,
    in future, a label. Step submission is not allowed until the student selects a datapoint.
    
    This implementation requires specifying a dataset. It also modifies the behavior of the dataset view so that
    points are not selected in the dataset when they are clicked on; instead, they set the 'point' property of the
    desired annotation.
    
    @param args
    
    @param {String} args.annotationName
      The name of the annotation object (for now, this will be a HighlightedPoint annotation)
    @param {String} args.graphName
      The name of the graph which should contain the dataset we are choosing a data point from
    @param {String} args.datasetName
      The name of the dataset we are choosing a data point from
    @param {String} args.color
      Color of the HighlightedPoint to create. Currently used only if the HighlightedPoint did not exist before this
      command.
  */
  def('startInteractiveSelection', function (args) {
    var dataset = Smartgraphs.activityObjectsController.findDataset(args.datasetName),
        annotation = Smartgraphs.activityObjectsController.findAnnotation(args.annotationName);        
    
    // stash the info needed by the state
    Smartgraphs.interactiveSelectionController.set('annotation', annotation);
    Smartgraphs.interactiveSelectionController.set('dataset', dataset);
          
    Smartgraphs.statechart.gotoState('INTERACTIVE_SELECTION');

  });
  
  
  /** 
    Create a LineThroughPoints with the name lineName in the current session. Takes two HighlightedPoints as the 
    points through which to draw the line.
    
    The LineThroughPoints is not automatically added to a graph.
    
    This method does nothing if there is no dataset with the passed name
    
    @param args
    
    @param {String} args.firstPoint
      The name of one HighlightedPoint annotation.
    @param {String} args.secondPoint
      The name of the other HighlightedPoint annotation.      
    @param {String} args.lineName
      The name given to the LineThroughPoints annotation which will be created.
    @param {String} args.color
      The RGB color definition for the color to render the line.
  */
  def('createLineThroughPoints', function (args) {
    var p1 = Smartgraphs.activityObjectsController.findAnnotation(args.firstPoint).get('point');
    var p2 = Smartgraphs.activityObjectsController.findAnnotation(args.secondPoint).get('point');   
    var color = args.color || "#000000";
    
    // set points (a relation) using ids rather than objects, because createAnnotation works like createRecord
    // in that regard (it works on the datahash underlying the record)
    var lineThroughPoints = 
      Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.LineThroughPoints, args.lineName, { 
        point1: p1.get('id'),
        point2: p2.get('id'),
        color: color
      });
  });

  /** 
    Create an Arrow annotation with the name arrowName in the current session. Takes two HighlightedPoints as the
    defining points; the arrow will run from the height (y-value) of the first point vertically to the second
    point.
    
    The Arrow is not automatically added to a graph.
    
    @param args
    
    @param {String} args.firstPoint
      The name of one HighlightedPoint annotation.
    @param {String} args.secondPoint
      The name of the other HighlightedPoint annotation.      
    @param {String} args.arrowName
      The name given to the session-scoped Arrow annotation which will be created.
    @param {String} [args.color='#000000']
      The RGB color definition for the color to render the line.
    @param {String} [args.label]
      Optional label for the arrow
    @param {String} [args.isHighlighted=false]
      Whether the arrow should be highlighted      
  */
  def('createRiseArrow', function (args) {
    var p1 = Smartgraphs.activityObjectsController.findAnnotation(args.firstPoint).get('point');
    var p2 = Smartgraphs.activityObjectsController.findAnnotation(args.secondPoint).get('point');    
    var color = args.color || "#000000";
    
    // Reorder the points such that the first point is the leftmost one, i.e. the lower x-value   
    var points = p1.get('x') < p2.get('x') ? [p1, p2] : [p2, p1];
  
    var riseArrow = 
      Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.Arrow, args.arrowName, { 
        point1: points[0].get('id'),
        point2: points[1].get('id'),
        color: color,
        isVertical: YES,
        isClockwise: YES,
        isHighlighted: args.isHighlighted || NO,
        label: args.label
      });
  });

  /** 
    Create an Arrow annotation with the name arrowName in the current session. Takes two HighlightedPoints as the
    defining points; the arrow will run from the first point horizontally to the x-value of the second
    point.
    
    The Arrow is not automatically added to a graph.
    
    @param args
    
    @param {String} args.firstPoint
      The name of one HighlightedPoint annotation.
    @param {String} args.secondPoint
      The name of the other HighlightedPoint annotation.      
    @param {String} args.arrowName
      The name given to the session-scoped Arrow annotation which will be created.
    @param {String} [args.color='#000000']
      The RGB color definition for the color to render the line.
    @param {String} [args.label]
      Optional label for the arrow
    @param {String} [args.isHighlighted=false]
      Whether the arrow should be highlighted          
  */
  def('createRunArrow', function (args) {
    var p1 = Smartgraphs.activityObjectsController.findAnnotation(args.firstPoint).get('point');
    var p2 = Smartgraphs.activityObjectsController.findAnnotation(args.secondPoint).get('point');    
    var color = args.color || "#000000";
    
    // Reorder the points such that the first point is the leftmost one, i.e. the lower x-value   
    var points = p1.get('x') < p2.get('x') ? [p1, p2] : [p2, p1];
    
    var runArrow = 
      Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.Arrow, args.arrowName, { 
        point1: points[0].get('id'),
        point2: points[1].get('id'),
        color: color,
        isHorizontal: YES,
        isClockwise: YES,
        isHighlighted: args.isHighlighted || NO,        
        label: args.label
      });
  });
  
  /** 
    Create an IndicatingArrow Annotation with the name arrowName in the current session, pointing
    at a specific dataPoint.
    
    @param args
    
    @param {String} args.arrowName
      The name for this annotation
    @param {Smartgraphs.DataPoint} args.point
      The data point the arrow will indicate.
    @param {String} [args.color='#cc0000']
      The color of the arrow.
    @param {Number} [args.angle=335]
    
  */
  def('createIndicatingArrowFromDataPoint', function (args) {
    // TODO
    
    // var indicator = 
    //   Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.IndicatingArrow, args.arrowName, {
    //     dataPoint: args.point.get('id'),
    //     pointAngle: args.angle,
    //     color: args.color
    //   });
  });
  
  /** 
    Create an IndicatingArrow Annotation with the name arrowName in the current session, pointing
    at a specific HighlightedPoint.
    
    @param args
    
    @param {String} args.arrowName
      The name for this annotation
    @param {String} args.point
      The name of the HighlightedPoint annotation the arrow will indicate
    @param {String} [args.color='#cc0000']
      The color of the arrow.
    @param {Number} [args.angle=335]
    
  */
  def('createIndicatingArrowFromHighlightedPoint', function (args) {
    var hp = Smartgraphs.activityObjectsController.findAnnotation(args.point);
    var indicator = 
      Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.IndicatingArrow, args.arrowName, {
        annotation: hp.get('id'),
        pointAngle: args.angle || 335,
        color: args.color || '#cc0000',
        length: args.length || 40
      });
  });
  
  /** 
    Create an IndicatingArrow Annotation with the name arrowName in the current session, pointing
    at a specific set of coordinates.
    
    @param args
    
    @param {String} args.arrowName
      The name for this annotation
    @param {Number} args.x
      The x-coordinate of the point being indicated
    @param {Number} args.y
      The y-coordinate of the point being indicated
    @param {String} [args.color='#cc0000']
      The color of the arrow.
    @param {Number} [args.angle=335]
    @param {Number} [args.length=40]
    
  */
  def('createIndicatingArrowFromCoordinates', function (args) {
    var indicator = 
      Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.IndicatingArrow, args.arrowName, {
        specificX: args.x,
        specificY: args.y,
        pointAngle: args.angle || 335,
        color: args.color || '#cc0000',
        length: args.length || 40
      });
  });
  
  /**
    Create a BracketArc Annotation with the name bracketName in the current session, pointing at two
    specific points defined by coordinates.
    
    @param args
    
    @param {String} args.bracketName
      The name for this annotation
    @param {Number} args.startX
      The x-coordinate of the starting point of the arc
    @param {Number} args.startY
      The y-coordinate of the starting point of the arc
    @param {Number} args.endX
      The x-coordinate of the ending point of the arc
    @param {Number} args.endY
      The y-coordinate of the ending point of the arc
    @param {String} [args.color='#cc0000']
      The color in which the arc should be rendered.
  */
  def('createBracketArcFromCoordinates', function (args) {
    var arc = 
      Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.BracketArc, args.bracketName, {
        startX: args.startX,
        startY: args.startY,
        endX: args.endX,
        endY: args.endY,
        color: args.color || '#cc0000',
        isClockwise: false
      });
  });
  
  /** 
    Creates a BracketArc annotation intended to sit to the right of the data table and indicate the 
    gap between the Y coordinates of two HighlightedPoints, i.e. the "rise" of the slope between 
    those two points.
    
    @param args
    
    @param {String} args.bracketName
      The name for this annotation
    @param {String} args.point1
      The name of the HighlightedPoint where the arc should start.
    @param {String} args.point2
      The name of the HighlightedPoint where the arc should end.
    @param {String} [args.color='#cc0000']
      The color in which the arc should be rendered.
    @param {String} [args.label]
      Optional label for the bracket
    @param {String} [args.isHighlighted=false]
      Whether the bracket should be highlighted
  */
  def('createRiseBracket', function (args) {
    var hp1 = Smartgraphs.activityObjectsController.findAnnotation(args.point1),
        hp2 = Smartgraphs.activityObjectsController.findAnnotation(args.point2),
        p1 = hp1.get('point'),
        p2 = hp2.get('point'),
        dataset = p1.get('dataset'),
        points = dataset.get('points'),
        p1Index = points.indexOf(p1),
        p2Index = points.indexOf(p2);
    
    // dataset.points is automatically sorted by x-value. Therefore the rise arrow always goes from lower to higher index.
        
    if (p1.get('dataset') !== p2.get('dataset')) return "datasets didn't match";

    Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.BracketArc, args.bracketName, {
      item1Index: Math.min(p1Index, p2Index),
      item2Index: Math.max(p1Index, p2Index),
      isLeftOfColumn: NO,
      color: args.color || '#cc0000',
      isHighlighted: args.isHighlighted || NO,
      label: args.label
    });
    
  });
  
  /** 
    Creates a BracketArc annotation intended to sit to the left of the data table and indicate the 
    gap between the X coordinates of two HighlightedPoints, i.e. the "run" of the slope between 
    those two points.
    
    @param args
    
    @param {String} args.bracketName
      The name for this annotation
    @param {String} args.point1
      The name of the HighlightedPoint where the arc should start.
    @param {String} args.point2
      The name of the HighlightedPoint where the arc should end.
    @param {String} [args.color='#cc0000']
      The color in which the arc should be rendered.
    @param {String} [args.label]
      Optional label for the bracket
    @param {String} [args.isHighlighted=false]
      Whether the arrow should be highlighted           
  */
  def('createRunBracket', function (args) {
    var hp1 = Smartgraphs.activityObjectsController.findAnnotation(args.point1),
        hp2 = Smartgraphs.activityObjectsController.findAnnotation(args.point2),
        p1 = hp1.get('point'),
        p2 = hp2.get('point'),
        dataset = p1.get('dataset'),
        points = dataset.get('points'),
        p1Index = points.indexOf(p1),
        p2Index = points.indexOf(p2);

    if (p1.get('dataset') !== p2.get('dataset')) return "datasets didn't match";

    Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.BracketArc, args.bracketName, {
      item1Index: Math.min(p1Index, p2Index),
      item2Index: Math.max(p1Index, p2Index),
      isLeftOfColumn: YES,
      color: args.color || '#cc0000',
      isHighlighted: args.isHighlighted || NO,
      label: args.label
    });

  });
  
  /**
    Given a point and a label string, create a LabelAnnotation for that point.
  
  @param args
  
  @param {String} args.labelName
    The name for this annotation
  @param {String} args.point
    The point we're annotating. This could be provided as an actual Smartgraphs.DataPoint, a 
    Smartgraphs.Annotation type which has a "point" attribute (which is therefore a Smartgraphs.DataPoint),
    or the guid (url) of a Smartgraphs.DataPoint.
  @param {String} args.label
    The actual text of the label we're putting on the point.
  @param {String} [args.color='#000000']
    The color in which the arc should be rendered.
  @param {Number} [args.xOffset=0]
    How far the center of the label should be offset to the left or right of the point being labeled, in pixels.
    Negative numbers move the label to the left; positive numbers move the label to the right.
  @param {Number} [args.yOffset=-15]
    How far the center of the label should be offset vertically from the point being labeled, in pixels.
    Negative numbers move the label up, positive numbers move the label down. The default is -15, or fifteen
    pixels above the point.
  @param {Number} [args.size=15]
    The "point size" of the label type.
  */
  def('createLabelAnnotation', function (args) {
    var point;
    if (args.point.length) {
      // It's a string, is it a GUID?
      point = Smartgraphs.store.find(Smartgraphs.DataPoint, args.point);
    }
    else if (args.point.kindOf(Smartgraphs.DataPoint)) { 
      // It's a DataPoint
      point = args.point;
    }
    else if (args.point.kindOf(Smartgraphs.Annotation) && args.point.get('point')) { 
      // It's an Annotation which has a 'point' attribute we can use
      point = args.point.get('point');
    }
    if (point.kindOf(Smartgraphs.DataPoint) !== undefined) { // We should have a DataPoint by now
      // Generate the annotation
      var label =
        Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.LabelAnnotation, args.labelName, {
          point: point.get('id'),
          label: args.label,
          color: args.color ? args.color : "#000000",
          xOffset: args.xOffset ? args.xOffset : 0,
          yOffset: args.yOffset ? args.yOffset : -15,
          size: args.size ? args.size : 15
        });
      if (!label.kindOf(Smartgraphs.LabelAnnotation)) {
        // This error means the controller method to create the annotation failed.
        console.warn("Creation of the LabelAnnotation may not have worked properly.");
      }
    }
    else {
      // This error means the duck-typing of the args.point argument failed.
      console.error("Couldn't figure out which DataPoint to associate with the annotation.");
    }
  });
  
  /**
    For the named annotation, toggle the isHighlighted property. (If truthy, set to false; if falsy, set to true.)
    
    @param args
    
    @param {String} args.annotationName
      The name of the Annotation whose isHighlighted property will be toggled.
  */
  def('toggleAnnotationHighlight', function (args) {
    var annotation = Smartgraphs.activityObjectsController.findAnnotation(args.annotationName);
    annotation.toggleProperty('isHighlighted');
  });
  
  /**
    Set attributes (other than 'name'!) of an attribute
    
    @param args
  
    @param {String} args.name
      The name of the Annotation whose properties will be modified
  */
  def('setAnnotationAttribute', function (args) {
    var annotation = Smartgraphs.activityObjectsController.findAnnotation(args.name);
    if (!annotation) return "no annotation found with name '" + args.name +"'";

    for (var prop in args) {
      if (!args.hasOwnProperty(prop) || prop === 'name') continue;
      annotation.set(prop, args[prop]);
    }
  });
  
  /**
    Set a session-scoped Variable to the value of a specific expression.
    
    @param args
    
    @param {String} args.name
      The name of the variable to be set.
    @param {String} args.expression
      The value of the variable, expressed as an expression that can be evaluated by Smartgraphs.evaluator.evaluate()
  */
  def('setVariable', function (args) {
    var val;

    if (SC.none(args.name)) {
      throw("variable name is required");
    }
    if (SC.none(args.expression)) {
      throw("variable value is required");
    }

    val = Smartgraphs.evaluator.evaluate(args.expression);
    Smartgraphs.activityObjectsController.setVariable(args.name, val); 
  });
  
});

