// ==========================================================================
// Project:   Smartgraphs.GRAPH_INPUT
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  State representing graph is open for input

  @extends SC.Responder
  @version 0.1
*/
Smartgraphs.GRAPH_INPUT = SC.Responder.create(
/** @scope Smartgraphs.GRAPH_INPUT.prototype */ {

  nextResponder: null,        // will generally be set 
  
  didBecomeFirstResponder: function() {
    Smartgraphs.inputGraphController.startRoutingInputEvents();
  },
  
  willLoseFirstResponder: function() {
    Smartgraphs.inputGraphController.stopRoutingInputEvents();
  },
  
  // This state is intended to be 'pushed'. resignFirstResponder to get the old firstResponder back
  resignFirstResponder: function (evt) {
    if (Smartgraphs.get('firstResponder') === this) {
      Smartgraphs.makeFirstResponder(this.get('nextResponder'), evt);
    }
    return YES;
  },
  // ..........................................................
  // EVENTS
  //
  
  // these should be produced by the inputGraphController
  
  startGraphInputAt: function (context, args) {
    Smartgraphs.selectedPointsController.startGraphInputAt(args.x, args.y);
    return YES;
  },
  
  continueGraphInputAt: function (context, args) {
    Smartgraphs.selectedPointsController.continueGraphInputAt(args.x, args.y);
    return YES;
  },
  
  endGraphInputAt: function (context, args) {
    Smartgraphs.selectedPointsController.endGraphInputAt(args.x, args.y);
    return YES;
  },
  
  // NOTE normally you end prediction graph input by virtue of moving onto the next step
  // (thus switching first responder)
  endPredictionGraphInput: function () {
    this.resignFirstResponder();
  }
  
}) ;
