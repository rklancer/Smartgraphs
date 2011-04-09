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
  
  graphControllerForPane: function (pane) {
    return Smartgraphs.activityViewController.graphControllerForPane(pane);
  },
  
  getAnnotation: function (name) {
    return Smartgraphs.activityObjectsController.findAnnotation(name);
  },
  
  setup: function (args) {
    var controller = this.graphControllerForPane(args.pane);
    controller.labelToolStartTool(args.labelName);
  },
  
  createLabel: function (name) {
    var label = this.getAnnotation(name);
    
    label.set('x', null);
    label.set('y', null);
    
    return label;
  },
  
  addLabelToController: function (controller, label) {
    controller.addAnnotation(label);
  }
  
});