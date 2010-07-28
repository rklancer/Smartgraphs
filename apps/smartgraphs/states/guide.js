// ==========================================================================
// Project:   Smartgraphs.GUIDE
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  Superstate representing that the application is running a Guide.
  
  Substates are GUIDE_START, GUIDE_STEP_START, GUIDE_STEP_WAITING, GUIDE_STEP_SUBMIT, GUIDE_PAGE_FINISHED, 
  GUIDE_FINISHED, (and SENSOR and PREDICTING?)

  @extends SC.Responder
  @version 0.1
*/
Smartgraphs.GUIDE = SC.Responder.create(
/** @scope Smartgraphs.GUIDE_START.prototype */ {
  
  nextResponder: Smartgraphs.READY,       // the default; if some other app state implements the openGuide action in 
                                          // some way, presumably that state should set itself as our nextResponder
  
  didBecomeFirstResponder: function() {
    // Called when that application's firstResponder is set to this (Smartgraphs.GUIDE).
    // Opens the guide view and immediately switches to the appropriate substate
    Smartgraphs.makeFirstResponder(Smartgraphs.GUIDE_START);
  },
  
  willLoseFirstResponder: function() {
  },
  
  // ..........................................................
  // ACTIONS
  //
  
  /**
    Triggers args.eventName, which results in the corresponding triggerResponse's commands being executed by the Guide
  */
  fireGuideEvent: function (context, args) {
    if (args.eventName) {
      var trigger = Smartgraphs.triggers[args.eventName];
      if (trigger) trigger.eventWasObserved();
    }
    return YES;
  },
  
  // ..........................................................
  // actions for Guide step commands
  //
  
  // helpers
  _graphControllerFor: function (pane) {
    if (pane === 'first') return Smartgraphs.firstGraphController;
    if (pane === 'second') return Smartgraphs.secondGraphController;
  },
  
  _graphViewFor: function (pane) {
    if (pane === 'first') return Smartgraphs.getPath('guidePage.firstGraphView');
    if (pane === 'second') return Smartgraphs.getPath('guidePage.firstGraphView');
  },
  
  // TODO: many of these actions could migrate to a superstate like "GUIDE_WORKING" or something; no
  // need for them to be available when navigating guide pages, or the like.
  showSinglePane: function () {
    return Smartgraphs.guideViewController.showSinglePane();
  },
  
  showSplitPane: function () {
    return Smartgraphs.guideViewController.showSplitPane();
  },
  
  showImage: function (context, args) {
    return Smartgraphs.guideViewController.showImage(args.pane, args.path);
  },
  
  showGraph: function (context, args) {
    Smartgraphs.guideViewController.showGraph(args.pane, args.graphId);
    return YES;
  },
  
  hidePane: function (context, args) {
    Smartgraphs.guideViewController.hidePane(args.pane);
    return YES;
  },
  
  
  setAxes: function (context, args) {
    var controller = this._graphControllerFor(args.pane);
    controller.setAxes(args.axesId);
    return YES;
  },
  
  // TODO rename to addSeriesToGraph
  addSeries: function (context, args) {
    var controller = this._graphControllerFor(args.pane);
    controller.addSeries(args.seriesId);
    return YES;
  },
  
  removeSeries: function (context, args) {
    var controller = this._graphControllerFor(args.pane);
    controller.removeSeries(args.seriesId);
    return YES;
  },
  
  removeAllSeries: function (context, args) {
    return NO;      // not handled yet.
    // var controller = this._graphControllerFor(args.pane);
    // controller.removeAllSeries();
  },
  
  selectDataSeries: function (context, args) {
    var series = Smartgraphs.store.find(Smartgraphs.DataSeries, args.seriesId);
    Smartgraphs.selectedSeriesController.set('content', series);
    return YES;
  },
  
  enablePredictionGraphInput: function (context, args) {
    Smartgraphs.sendAction('addSeries', this, { pane: args.pane, seriesId: args.seriesId });
    Smartgraphs.sendAction('selectDataSeries', this, { seriesId: args.seriesId });
    
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
    Smartgraphs.sendAction('addSeries', this, { pane: args.pane, seriesId: args.seriesId });
    Smartgraphs.sendAction('selectDataSeries', this, { seriesId: args.seriesId });
  
    // use this pattern for the SENSOR_* states too
    Smartgraphs.SENSOR.set('nextResponder', Smartgraphs.get('firstResponder'));
    Smartgraphs.makeFirstResponder(Smartgraphs.SENSOR);
    return YES;
  }    
  
}) ;
