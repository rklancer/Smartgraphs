// ==========================================================================
// Project:   Smartgraphs.Tool
// Copyright: ©2010 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

Smartgraphs.Tool = SC.Object.extend({

  init: function () {
    sc_super();
    Smartgraphs.Tool.register(this.get('name'), this, this.get('setup'), this.get('state'));
  },

  /**
    Stubbable method to find the appropriate graph controller to use for a given 'pane' argument

    @param {String} pane
      The pane we want the tool to operate in; generally one of 'top', 'bottom', or 'single'
    @returns {Smartgraphs.GraphController} the controller
  */
  graphControllerForPane: function (pane) {
    return Smartgraphs.activityViewController.graphControllerForPane(pane);
  },

   /**
    Stubbable method to find the appropriate table controller to use for a given 'pane' argument

    @param {String} pane
      The pane we want the tool to operate in; generally one of 'top', 'bottom', or 'single'
    @returns {Smartgraphs.TableController} the controller
  */
  tableControllerForPane: function (pane) {
    return Smartgraphs.activityViewController.tableControllerForPane(pane);
  },

  /**
    Stubbable method to retrieve the other pane for given 'pane' argument

    @param {String} pane
      The pane we want the tool to operate in; generally one of 'top', 'bottom', or 'single'
    @returns {String} other pane
  */
  otherPaneFor: function (pane) {
    return Smartgraphs.activityViewController.otherPaneFor(pane);
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

  /**
    Stubbable method retrieve the datadef object with a particular name

    @param {String} name
      The name of the datadef
    @returns {Smartgraphs.Datadef} the datadef corresponding to 'name'
  */
  getDatadef: function (name) {
    return Smartgraphs.activityObjectsController.findDatadef(name);
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
    Stubbable method to get the pane ("top", "bottom", or "single") for a given graph controller-owned (sub)state
  */
  paneForState: function (state) {
    return Smartgraphs.activityViewController.paneForController(state.getPath('statechart.owner'));
  }

});

Smartgraphs.Tool.tools = {};

Smartgraphs.Tool.register = function (name, context, setup, state) {
  Smartgraphs.Tool.tools[name] = { context: context, setup: setup, state: state };
};

Smartgraphs.Tool.start = function (name, setupArgs) {
  var tool = Smartgraphs.Tool.tools[name];

  if (!tool) throw "Could not start tool '" + name + "' (tool is not defined).";

  tool.setup.call(tool.context, setupArgs);
};
