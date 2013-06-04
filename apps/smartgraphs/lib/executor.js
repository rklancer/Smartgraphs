// ==========================================================================
// Project:   Smartgraphs.executor
// Copyright: ©2011 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

Smartgraphs.executor = {

  commands: {},

  // Similarly to Smartgraphs.evaluator, this will allow recording metadata about the commands being defined, in
  // addition to merely defining the implementations

  // define one command
  def: function (name, impl) {
    var command;

    if (!this.commands[name]) this.commands[name] = {};

    command = this.commands[name];
    command.impl = impl;

    return command;
  },

  // define many commands
  defineCommands: function (defsCallback) {
    var def, self = this;

    def = function () {
      return self.def.apply(self, arguments);
    };
    defsCallback(def);
  },

  execute: function (name, args) {
    var command = this.commands[name],
        message;

    if (!command) throw "No such command: " + name;

    message = command.impl(args || {});

    if (message) throw "command '" + name + "' returned error message: " + message;
  }

};
