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
    @returns {Smartgraphs.GraphController} the controller      
  */
  graphControllerForPane: function (pane) {
    return Smartgraphs.activityViewController.graphControllerForPane(pane);
  },
  
  /**
    Stubbable method to get the graph controller a particular label tool state object is connected to.
    
    @param {SC.State} state
    @returns {Smartgraphs.GraphController} the controller
  */
  graphControllerForState: function (state) {
    return state.getPath('statechart.owner');
  },
  
  /**
    Stubbable method retrieve the label or label set object with a particular name
    
    @param {String} name
      The name of the Label annotation
    @returns {Smartgraphs.Annotation} the Label or LabelSet corresponding to 'name'
  */
  getAnnotation: function (name) {
    return Smartgraphs.activityObjectsController.findAnnotation(name);
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