// ==========================================================================
// Project:   Smartgraphs.executor commands
// Copyright: ©2011 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('lib/executor');

Smartgraphs.executor.defineCommands(function (def) {
  
  def('testCommand', function (args) {
    console.log(args.message || "no message");
  });
  
});

