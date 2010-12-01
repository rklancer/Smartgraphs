// ==========================================================================
// Project:   Smartgraphs.ACTIVITY
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */


sc_require('states/ready');

/** @class

  Superstate representing that the application is running a Activity.

  @extends SC.Responder
  @version 0.1
*/

Smartgraphs.ACTIVITY = SC.Responder.create(
/** @scope Smartgraphs.ACTIVITY.prototype */ {
  
  nextResponder: Smartgraphs.READY,       // the default; if some other app state implements the openActivity action in 
                                          // some way, presumably that state should set itself as our nextResponder
  
  didBecomeFirstResponder: function() {
    Smartgraphs.appWindowController.showActivityView();
  },
  
  willLoseFirstResponder: function () {
    Smartgraphs.activityController.cleanup();
  },
  
  // ..........................................................
  // ACTIONS
  //
  
  /** 
    Create a LineThroughPoints with the name lineName in the current session. Takes two HighlightedPoints as the 
    points through which to draw the line
    
    The LineThroughPoints is not automatically added to the graph.
    
    This method does nothing if there is no dataset with the passed name, or if it is not open in the graph
    with graphName.
    
    @param context
    @param args
    
    @param {String} args.graphName
      The name of the graph on which the dataset with the line must be displayed. This graph must be open in 
      the page when this command executes.
    @param {String} args.firstPoint
      The name of one HighlightedPoint annotation.
    @param {String} args.secondPoint
      The name of the other HighlightedPoint annotation.      
    @param {String} args.lineName
      The name given to the session-scoped LineThroughPoints annotation which will be created.
    @param {String} args.color
      The RGB color definition for the color to render the line.
  */
  createLineThroughPoints: function (context, args) {
    // TODO: This dependence on the controller is probably not useful long-term.
    // given the graphName, find the associated graph controller
    var controller = Smartgraphs.GraphController.controllerForName[args.graphName];
  
    if (!controller) return YES;
    
    var firstAnnotation = controller.findAnnotationByName(args.firstPoint);
    var secondAnnotation = controller.findAnnotationByName(args.secondPoint);
    var color = args.color ? args.color : "#000000";
    
    // set points (a relation) using ids rather than objects, because createAnnotation works like createRecord
    // in that regard (it works on the datahash underlying the record)
    var lineThroughPoints = 
      Smartgraphs.sessionController.createAnnotation(Smartgraphs.LineThroughPoints, args.lineName, { 
        point1: firstAnnotation.get('point').get('id'),
        point2: secondAnnotation.get('point').get('id'),
        color: color
      });
    return YES;
  },

  /** 
    Create an Arrow annotation with the name arrowName in the current session. Takes two HighlightedPoints as the
    defining points; the arrow will run from the height (y-value) of the first point vertically to the second
    point.
    
    The Arrow is not automatically added to the graph.
    
    This method does nothing if there is no graph with the passed name.
    
    @param context
    @param args
    
    @param {String} args.graphName
      The name of the graph on which the dataset with the line must be displayed. This graph must be open in 
      the page when this command executes.
    @param {String} args.firstPoint
      The name of one HighlightedPoint annotation.
    @param {String} args.secondPoint
      The name of the other HighlightedPoint annotation.      
    @param {String} args.arrowName
      The name given to the session-scoped Arrow annotation which will be created.
    @param {String} args.color
      The RGB color definition for the color to render the line.
  */
  createRiseArrow: function (context, args) {
    // TODO: This dependence on the controller is probably not useful long-term.
    // given the graphName, find the associated graph controller
    var controller = Smartgraphs.GraphController.controllerForName[args.graphName];
  
    if (!controller) return YES;
    
    var firstAnnotation = controller.findAnnotationByName(args.firstPoint);
    var secondAnnotation = controller.findAnnotationByName(args.secondPoint);
    var color = args.color ? args.color : "#000000";
    
    var riseArrow = 
      Smartgraphs.sessionController.createAnnotation(Smartgraphs.Arrow, args.arrowName, { 
        point1: firstAnnotation.get('point').get('id'),
        point2: secondAnnotation.get('point').get('id'),
        color: color,
        isVertical: YES
      });
    return YES;
  },

  /** 
    Create an Arrow annotation with the name arrowName in the current session. Takes two HighlightedPoints as the
    defining points; the arrow will run from the first point horizontally to the x-value of the second
    point.
    
    The Arrow is not automatically added to the graph.
    
    This method does nothing if there is no graph with the passed name.
    
    @param context
    @param args
    
    @param {String} args.graphName
      The name of the graph on which the dataset with the line must be displayed. This graph must be open in 
      the page when this command executes.
    @param {String} args.firstPoint
      The name of one HighlightedPoint annotation.
    @param {String} args.secondPoint
      The name of the other HighlightedPoint annotation.      
    @param {String} args.arrowName
      The name given to the session-scoped Arrow annotation which will be created.
    @param {String} args.color
      The RGB color definition for the color to render the line.
  */
  createRunArrow: function (context, args) {
    // TODO: This dependence on the controller is probably not useful long-term.
    // given the graphName, find the associated graph controller
    var controller = Smartgraphs.GraphController.controllerForName[args.graphName];
  
    if (!controller) return YES;
    
    var firstAnnotation = controller.findAnnotationByName(args.firstPoint);
    var secondAnnotation = controller.findAnnotationByName(args.secondPoint);
    var color = args.color ? args.color : "#000000";
    
    var runArrow = 
      Smartgraphs.sessionController.createAnnotation(Smartgraphs.Arrow, args.arrowName, { 
        point1: firstAnnotation.get('point').get('id'),
        point2: secondAnnotation.get('point').get('id'),
        color: color,
        isHorizontal: YES
      });
    return YES;
  }

}) ;
