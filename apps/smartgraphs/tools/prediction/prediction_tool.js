// ==========================================================================
// Project:   Smartgraphs.predictionTool
// Copyright: ©2011 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('tools/tool');

/** @class

  @extends Smartgraphs.Tool
*/
Smartgraphs.predictionTool = Smartgraphs.Tool.create(
/** @scope Smartgraphs.predictionTool.prototype */ {

  name: 'prediction',
  state: 'PREDICTION_TOOL',

  setup: function (args) {
    var controller = this.graphControllerForPane(args.pane);
    controller.predictionToolStartTool( { annotationName: args.annotationName, uiBehavior: args.uiBehavior });
  },

  appendSketch: function (state, sketch) {
    this.graphControllerForState(state).addAnnotation(sketch);
  },

  predictionStarting: function (state) {
    var controller = this.graphControllerForState(state);
    if (controller && controller.predictionToolPredictionStarting) controller.predictionToolPredictionStarting();
  },

  predictionFinished: function (state) {
    var controller = this.graphControllerForState(state);
    if (controller && controller.predictionToolPredictionFinished) controller.predictionToolPredictionFinished();
  }

});
