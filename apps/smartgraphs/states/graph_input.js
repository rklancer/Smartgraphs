// ==========================================================================
// Project:   Smartgraphs.GRAPH_INPUT
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  @extends SC.Responder
  @version 0.1
*/

sc_require('states/activity_step');

Smartgraphs.GRAPH_INPUT = SC.Responder.create(
/** @scope Smartgraphs.GRAPH_INPUT.prototype */ {

  nextResponder: Smartgraphs.ACTIVITY_STEP,
  
  didBecomeFirstResponder: function() {
    Smartgraphs.inputGraphController.startRoutingInputEvents();
  },
  
  willLoseFirstResponder: function() {
    Smartgraphs.inputGraphController.stopRoutingInputEvents();
    Smartgraphs.selectedSeriesController.set('content', null);
  },
  
  // ..........................................................
  // ACTIONS
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
  }
  
}) ;
