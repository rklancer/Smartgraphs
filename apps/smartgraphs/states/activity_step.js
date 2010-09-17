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
    Smartgraphs.activityStepController.disableSubmission();
    Smartgraphs.responseTemplateController.set('editingShouldBeEnabled', NO);
  },
  
  // action helpers
  _graphControllerFor: function (pane) {
    if ( !Smartgraphs.activityViewController.get('paneIsSplit') || pane === 'top' ) {
      return Smartgraphs.firstGraphController;
    }
    if (pane === 'bottom') return Smartgraphs.secondGraphController;
  },
  
  _graphViewFor: function (pane) {
    if (pane === 'top' || pane === 'single') return Smartgraphs.getPath('activityPage.firstGraphView');
    if (pane === 'bottom') return Smartgraphs.getPath('activityPage.firstGraphView');
  },
  
  // ..........................................................
  // ACTIONS
  // 
  
  gotoNextPage: function () {
    this.submitStep();
    this.invokeLast(function () {
      Smartgraphs.sendAction('gotoNextPage');
    });
  },
  
  submitStep: function () {
    if (Smartgraphs.activityStepController.get('canSubmit')) {
      Smartgraphs.makeFirstResponder(Smartgraphs.ACTIVITY_STEP_SUBMITTED);
    }
    return YES;
  },

  waitForResponse: function (context, args) {
    Smartgraphs.activityStepController.waitForResponse();
    Smartgraphs.responseTemplateController.set('editingShouldBeEnabled', YES);
    return YES;
  },
  
  showSinglePane: function () {
    return Smartgraphs.activityViewController.showSinglePane();
  },
  
  showSplitPane: function () {
    return Smartgraphs.activityViewController.showSplitPane();
  },
  
  showImage: function (context, args) {
    return Smartgraphs.activityViewController.showImage(args.pane, args.path);
  },
  
  showGraph: function (context, args) {
    Smartgraphs.activityViewController.showGraph(args.pane, args.graphId);
    return YES;
  },
  
  hidePane: function (context, args) {
    Smartgraphs.activityViewController.hidePane(args.pane);
    return YES;
  },
  
  setAxes: function (context, args) {
    var controller = this._graphControllerFor(args.pane);
    controller.setAxes(args.axesId);
    return YES;
  },
  
  displaySeriesOnGraph: function (context, args) {
    var controller = this._graphControllerFor(args.pane);    
    controller.addObjectByName(Smartgraphs.DataSeries, args.seriesName);
    return YES;
  },
  
  copyExampleSeriesToGraph: function (context, args) {
    var controller = this._graphControllerFor(args.pane);
    var series = Smartgraphs.sessionController.createSeries(args.seriesName);
    Smartgraphs.sessionController.copyExampleSeries(args.exampleSeriesName, args.seriesName);
    controller.addSeries(series);
    return YES;
  },
  
  createSeriesOnGraph: function (context, args) {
    var controller = this._graphControllerFor(args.pane);
    var series = Smartgraphs.sessionController.createSeries(args.seriesName);
    controller.addSeries(series);
    return YES;
  },
  
  removeSeries: function (context, args) {
    var controller = this._graphControllerFor(args.pane);
    controller.removeSeries(args.seriesName);
    return YES;
  },
  
  removeAllSeries: function (context, args) {
    return NO;      // not handled yet.
    // var controller = this._graphControllerFor(args.pane);
    // controller.removeAllSeries();
  },
  
  selectDataSeries: function (context, args) {
    var controller = this._graphControllerFor(args.pane);
    controller.selectSeries(args.seriesName);
    return YES;
  },
  
  createAnnotation: function (context, args) {
    var controller = this._graphControllerFor(args.pane);
    var annotation = Smartgraphs.sessionController.createAnnotation(args.annotationName, args.annotationType);
    controller.addAnnotation(annotation);
    return YES;
  },
  
  startFreehandInput: function (context, args) {
    Smartgraphs.sendAction('createAnnotation', this, { 
      pane: args.pane, 
      annotationName: args.annotationName,
      annotationType: Smartgraphs.FreehandSketch
    });

    var controller = this._graphControllerFor(args.pane);
    if (Smartgraphs.freehandInputController.register(controller, args.annotationName)) {
      Smartgraphs.makeFirstResponder(Smartgraphs.FREEHAND_INPUT);
      return YES;
    }
  },
  
  startSensorInput: function (context, args) {
    Smartgraphs.sendAction('createSeriesOnGraph', this, { 
      pane: args.pane, 
      seriesName: args.seriesName
    });

    var controller = this._graphControllerFor(args.pane);        
    var series = controller.findSeriesByName(args.seriesName);
    if (series.get('isExample') === NO) {
      Smartgraphs.selectedSeriesController.set('content', series);
    }
  
    Smartgraphs.makeFirstResponder(Smartgraphs.SENSOR);
    return YES;
  }
  
}) ;
