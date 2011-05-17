// ==========================================================================
// Project:   Smartgraphs.labelTool
// Copyright: ©2011 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('tools/tool');

/** @class

  @extends SC.Object
*/
Smartgraphs.labelTool = Smartgraphs.Tool.create(
/** @scope Smartgraphs.labelTool.prototype */ {

  name: 'label',
  state: 'LABEL_TOOL',
  
  /**
    Stubbable method to find the appropriate graph controller to use for a given 'pane' argument
    
    @param {String} pane
      The pane we want the label tool to operate in; generally one of 'top', 'bottom', or 'single'
  */
  graphControllerForPane: function (pane) {
    return Smartgraphs.activityViewController.graphControllerForPane(pane);
  },
  
  /**
    Stubbable method retrieve the label or label set object with a particular name
    
    @param {String} name
      The name of the Label annotation
  */
  getAnnotation: function (name) {
    return Smartgraphs.activityObjectsController.findAnnotation(name);
  },
  
  /**
    Stubbable method to get the graph controller a particular label tool state object is connected to.
    
    @param {SC.State} state
    @returns {Smartgraphs.GraphController} the controller
  */
  getControllerForState: function (state) {
    return state.getPath('statechart.owner');
  },
  
  setup: function (args) {
    var controller = this.graphControllerForPane(args.pane),
        annotationName = args.labelName || args.labelSetName;
        
    controller.labelToolStartTool(annotationName);
  },
  
  appendLabel: function (state, label) {
    this.getControllerForState(state).addAnnotation(label);
  },
  
  appendLabelSet: function (state, labelSet) {
    this.getControllerForState(state).addAnnotation(labelSet);
  },
  
  removeLabel: function (state, label) {
    this.getControllerForState(state).removeAnnotation(label);
  },
  
  addLabelsStarting: function (state) {
    var controller = this.getControllerForState(state);
    if (controller && controller.labelToolAddLabelsStarting) controller.labelToolAddLabelsStarting();
  },
  
  addLabelsFinished: function (state) {
    var controller = this.getControllerForState(state);
    if (controller && controller.labelToolAddLabelsFinished) controller.labelToolAddLabelsFinished();
  }
  
});