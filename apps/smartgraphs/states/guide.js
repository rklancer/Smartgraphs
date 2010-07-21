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
  
  // a helper
  _graphControllerFor: function (pane) {
    if (pane === 'first') return Smartgraphs.firstGraphController;
    if (pane === 'second') return Smartgraphs.secondGraphController;
  },
  
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
  
  setAxes: function (context, args) {
    var controller = this._graphControllerFor(args.pane);
    controller.setAxes(args.axesId);
  },
  
  addSeries: function (context, args) {
    var controller = this._graphControllerFor(args.pane);
    controller.addSeries(args.seriesId);
  },
  
  removeSeries: function (context, args) {
    var controller = this._graphControllerFor(args.pane);
    controller.removeSeries(args.seriesId);
  },
  
  removeAllSeries: function (context, args) {
    var controller = this._graphControllerFor(args.pane);
    controller.removeAllSeries();
  }
  
}) ;
