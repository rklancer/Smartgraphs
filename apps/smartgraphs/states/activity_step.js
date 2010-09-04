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
  submissionIsEnabled: YES,
  
  didBecomeFirstResponder: function() {
    this.enableSubmission();        // enabled by default until we receive disableSubmssion or waitForInput
    Smartgraphs.activityStepController.invokeLater(Smartgraphs.activityStepController.begin);
  },
  
  willLoseFirstResponder: function () {
    Smartgraphs.activityStepController.set('submitButtonShouldBeEnabled', NO);
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
  
  finishActivityStep: function () {
    if (this.get('submissionIsEnabled')) {
      Smartgraphs.makeFirstResponder(Smartgraphs.ACTIVITY_STEP_DONE);
    }
    else {
      console.error('ACTIVITY_STEP received finishActivityStep action when submissionIsEnabled was NO');
    }
    return YES;
  },
  
  enableSubmission: function () {
    this.set('submissionIsEnabled', YES);
    Smartgraphs.activityStepController.set('submitButtonShouldBeEnabled', YES);    
  },
  
  disableSubmission: function () {
    this.set('submissionIsEnabled', NO);
    Smartgraphs.activityStepController.set('submitButtonShouldBeEnabled', NO);    
  },

  waitForInput: function (context, args) {
    Smartgraphs.activityStepController.configureInputValidator(args);
    this.disableSubmission();         // allow submission again when the response becomes valid
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
    controller.addSeriesByName(args.seriesName);
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
    var series = controller.findSeries(args.seriesName);
    if (series.get('isExample') === NO) {
      Smartgraphs.selectedSeriesController.set('content', series);
    }
    return YES;
  },
  
  enablePredictionInput: function (context, args) {
    Smartgraphs.sendAction('createSeriesOnGraph', this, { 
      pane: args.pane, 
      seriesName: args.seriesName
    });
    Smartgraphs.sendAction('selectDataSeries', this, { pane: args.pane, seriesName: args.seriesName });

    Smartgraphs.selectedSeriesController.set('xMin', args.xMin);
    Smartgraphs.selectedSeriesController.set('xMax', args.xMax);
    
    // so... at the moment, you can only focus one graph at a time for input. Design choice or design flaw?
    var controller = this._graphControllerFor(args.pane);
    Smartgraphs.inputGraphController = this._graphControllerFor(args.pane);

    Smartgraphs.GRAPH_INPUT.set('nextResponder', Smartgraphs.get('firstResponder'));
    Smartgraphs.makeFirstResponder(Smartgraphs.GRAPH_INPUT);
    return YES;
  },
  
  enableSensorInput: function (context, args) {
    Smartgraphs.sendAction('createSeriesOnGraph', this, { 
      pane: args.pane, 
      seriesName: args.seriesName
    });
    Smartgraphs.sendAction('selectDataSeries', this, { pane: args.pane, seriesName: args.seriesName });
  
    // use this pattern for the SENSOR_* states too
    Smartgraphs.SENSOR.set('nextResponder', Smartgraphs.get('firstResponder'));
    Smartgraphs.makeFirstResponder(Smartgraphs.SENSOR);
    return YES;
  }
  
}) ;
