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
    Stubbable method to create/retrieve a label annotation object with a particular name
    
    @param {String} name
      The name of the Label annotation
  */
  getAnnotation: function (name) {
    return Smartgraphs.activityObjectsController.findAnnotation(name);
  },
  
  setup: function (args) {
    var controller = this.graphControllerForPane(args.pane);
    controller.labelToolStartTool(args.labelName);
  },
  
  createLabel: function (name, x, y) {
    var label = this.getAnnotation(name);
    
    label.set('x', x);
    label.set('y', y);
    
    return label;
  },
  
  addLabelToController: function (controller, label) {
    controller.addAnnotation(label);
  }
  
});