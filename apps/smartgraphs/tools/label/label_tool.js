// ==========================================================================
// Project:   Smartgraphs.labelTool
// Copyright: ©2011 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('tools/tool');

/** @class

  @extends Smartgraphs.Tool
*/
Smartgraphs.labelTool = Smartgraphs.Tool.create(
/** @scope Smartgraphs.labelTool.prototype */ {

  name: 'label',
  state: 'LABEL_TOOL',
  
  /**
    Stubbable method to get the graph controller a particular label tool state object is connected to.
    
    @param {SC.State} state
    @returns {Smartgraphs.GraphController} the controller
  */
  graphControllerForState: function (state) {
    return state.getPath('statechart.owner');
  },
  
  setup: function (args) {
    var controller = this.graphControllerForPane(args.pane),
        annotationName = args.labelName || args.labelSetName;
        
    controller.labelToolStartTool(annotationName);
  },
  
  appendLabel: function (state, label) {
    this.graphControllerForState(state).addAnnotation(label);
  },
  
  appendLabelSet: function (state, labelSet) {
    this.graphControllerForState(state).addAnnotation(labelSet);
  },
  
  removeLabel: function (state, label) {
    this.graphControllerForState(state).removeAnnotation(label);
  },
  
  addLabelsStarting: function (state) {
    var controller = this.graphControllerForState(state);
    if (controller && controller.labelToolAddLabelsStarting) controller.labelToolAddLabelsStarting();
  },
  
  addLabelsFinished: function (state) {
    var controller = this.graphControllerForState(state);
    if (controller && controller.labelToolAddLabelsFinished) controller.labelToolAddLabelsFinished();
  }
  
});