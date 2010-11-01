// ==========================================================================
// Project:   Smartgraphs.ACTIVITY_STEP
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  State representing that an ActivityStep is currently active. Defines most of the commands available to an activity
  step.
  
  @extends SC.Responder
  @version 0.1
*/

sc_require('states/activity');

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
  
  setPaneConfig: function (context, args) {
    Smartgraphs.activityViewController.setPaneConfig(args);
    return YES;
  },
    
  hidePane: function (context, args) {
    Smartgraphs.activityViewController.hidePane(args);
    return YES;
  },

  showImage: function (context, args) {
    return Smartgraphs.activityViewController.showImage(args.pane, args.path);
  },
  
  showGraph: function (context, args) {
    Smartgraphs.activityViewController.showGraph(args.pane, args.name);
    return YES;
  },
  
  showTable: function (context, args) {
    Smartgraphs.activityViewController.showTable(args.pane, args.graphName, args.seriesName);  
  },
  
  waitForResponse: function (context, args) {
    Smartgraphs.activityStepController.waitForResponse();
    Smartgraphs.responseTemplateController.set('editingShouldBeEnabled', YES);
    return YES;
  },
  
  submitStep: function () {
    if (Smartgraphs.activityStepController.get('canSubmit')) {
      Smartgraphs.makeFirstResponder(Smartgraphs.ACTIVITY_STEP_SUBMITTED);
    }
    return YES;
  },
  
  gotoNextPage: function () {
    this.submitStep();
    this.invokeLast(function () {
      Smartgraphs.sendAction('gotoNextPage');
    });
  },

  createSeries: function (context, args) {
    var series = Smartgraphs.sessionController.createSeries(args.seriesName);
    if (args.graphName) {
      var controller = Smartgraphs.GraphController.controllerForName[args.graphName];
      controller.addSeries(series);
    }
    return YES;
  },
  
  removeSeries: function (context, args) {
    var controller = Smartgraphs.GraphController.controllerForName[args.graphName];
    controller.removeSeries(args.seriesName);
    return YES;
  },

  createAnnotation: function (context, args) {
    var controller = Smartgraphs.GraphController.controllerForName[args.graphName];
    var annotation = Smartgraphs.sessionController.createAnnotation(args.type, args.name);
    controller.addAnnotation(annotation);
    return YES;
  },
  
  addAnnotation: function (context, args) {
    var controller = Smartgraphs.GraphController.controllerForName[args.graphName];
    controller.addObjectByName(args.type, args.name);
    return YES;
  },
  
  removeAnnotation: function (context, args) {
    var controller = Smartgraphs.GraphController.controllerForName[args.graphName];
    controller.removeAnnotation(args.name);
    return YES;
  },
  
  startFreehandInput: function (context, args) {
    Smartgraphs.sendAction('createAnnotation', this, { 
      graphName: args.graphName,
      type: Smartgraphs.FreehandSketch,
      name: args.annotationName
    });

    var controller = Smartgraphs.GraphController.controllerForName[args.graphName];
    if (Smartgraphs.freehandInputController.register(controller, args.annotationName)) {
      Smartgraphs.makeFirstResponder(Smartgraphs.FREEHAND_INPUT);
      return YES;
    }
  },
  
  startSensorInput: function (context, args) {
    Smartgraphs.sendAction('createSeries', this, { 
      graphName: args.graphName, 
      seriesName: args.seriesName
    });

    var controller = Smartgraphs.GraphController.controllerForName[args.graphName];
    var series = controller && controller.findSeriesByName(args.seriesName);
    
    if ( !series ) return YES;        // handled, but invalid pane or series...
    
    // TODO let 'args' override these settings if desired
    var xMin = controller.getPath('axes.xMin');
    var xMax = controller.getPath('axes.xMax');
    var pane = Smartgraphs.activityViewController.paneForController(controller);
    
    if (Smartgraphs.sensorController.register(pane, series, xMin, xMax)) {
      Smartgraphs.makeFirstResponder(Smartgraphs.SENSOR);
      return YES;
    }
  }
  
  // NOT CURRENTLY USED
  
  // setAxes: function (context, args) {
  //   var controller = Smartgraphs.activityViewController.graphControllerForPane(args.pane);
  //   controller.setAxes(args.axesId);
  //   return YES;
  // },
  // 
  // displaySeriesOnGraph: function (context, args) {
  //   var controller = Smartgraphs.activityViewController.graphControllerForPane(args.pane);    
  //   controller.addObjectByName(Smartgraphs.Dataset, args.seriesName);
  //   return YES;
  // },
  // 
  // copyExampleSeriesToGraph: function (context, args) {
  //   var controller = Smartgraphs.activityViewController.graphControllerForPane(args.pane);
  //   var series = Smartgraphs.sessionController.createSeries(args.seriesName);
  //   Smartgraphs.sessionController.copyExampleSeries(args.exampleSeriesName, args.seriesName);
  //   controller.addSeries(series);
  //   return YES;
  // },
  // 
  // removeAllSeries: function (context, args) {
  //   return NO;      // not handled yet.
  //   // var controller = Smartgraphs.activityViewController.graphControllerForPane(args.pane);
  //   // controller.removeAllSeries();
  // },
  // 
  // selectDataset: function (context, args) {
  //   var controller = Smartgraphs.activityViewController.graphControllerForPane(args.pane);
  //   controller.selectSeries(args.seriesName);
  //   return YES;
  // }
  
}) ;
