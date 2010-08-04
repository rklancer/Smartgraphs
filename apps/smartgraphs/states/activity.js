// ==========================================================================
// Project:   Smartgraphs.ACTIVITY
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  Superstate representing that the application is running a Activity.
  
  Substates are ACTIVITY_START, ACTIVITY_STEP_START, ACTIVITY_STEP_WAITING, ACTIVITY_STEP_SUBMIT, ACTIVITY_PAGE_FINISHED, 
  ACTIVITY_FINISHED, (and SENSOR and PREDICTING?)

  @extends SC.Responder
  @version 0.1
*/

sc_require('states/ready');

Smartgraphs.ACTIVITY = SC.Responder.create(
/** @scope Smartgraphs.ACTIVITY_START.prototype */ {
  
  nextResponder: Smartgraphs.READY,       // the default; if some other app state implements the openActivity action in 
                                          // some way, presumably that state should set itself as our nextResponder
  
  didBecomeFirstResponder: function() {
    Smartgraphs.appWindowController.showActivityView();
  },
  
  willLoseFirstResponder: function() {
  },
  
  // ..........................................................
  // ACTIONS
  //
  
  /**
    Triggers args.eventName, which results in the corresponding triggerResponse's commands being executed by the Activity
  */
  fireActivityEvent: function (context, args) {
    if (args.eventName) {
      var trigger = Smartgraphs.triggers[args.eventName];
      if (trigger) trigger.eventWasObserved();
    }
    return YES;
  },
  
  // ..........................................................
  // actions for Activity step commands
  //
  
  // helpers
  _graphControllerFor: function (pane) {
    if (pane === 'first') return Smartgraphs.firstGraphController;
    if (pane === 'second') return Smartgraphs.secondGraphController;
  },
  
  _graphViewFor: function (pane) {
    if (pane === 'first') return Smartgraphs.getPath('activityPage.firstGraphView');
    if (pane === 'second') return Smartgraphs.getPath('activityPage.firstGraphView');
  },
  
  // TODO: many of these actions could migrate to a superstate like "ACTIVITY_WORKING" or something; no
  // need for them to be available when navigating activity pages, or the like.
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
