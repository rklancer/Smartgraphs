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
  }
  
});

Smartgraphs.Tool.tools = {};

Smartgraphs.Tool.register = function (name, context, setup, state) {
  if (!Smartgraphs.Tool.tools[name]) Smartgraphs.Tool.tools[name] = {};
  
  Smartgraphs.Tool.tools[name] = { context: context, setup: setup, state: state };
};

Smartgraphs.Tool.start = function (name, setupArgs) {  
  var tool = Smartgraphs.Tool.tools[name];
  
  if (!tool) throw "Could not start tool '" + name + "' (tool is not defined).";
  
  tool.setup.call(tool.context, setupArgs);
};
