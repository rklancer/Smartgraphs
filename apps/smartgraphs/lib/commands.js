// ==========================================================================
// Project:   Smartgraphs command definitions
// Copyright: ©2011 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('lib/executor');

Smartgraphs.executor.defineCommands(function (def) {

  /**
    Set attributes (other than 'name'!) of an attribute

    @param args

    @param {String} args.name
      The name of the Annotation whose properties will be modified
  */
  def('setAnnotationAttribute', function (args) {
    var annotation = Smartgraphs.activityObjectsController.findAnnotation(args.name);
    if (!annotation) return "could not find annotation '" + args.name + "'";

    for (var prop in args) {
      if (!args.hasOwnProperty(prop) || prop === 'name') continue;
      annotation.set(prop, args[prop]);
    }
  });


  /**
    Disable submission
  */
  def('disableSubmission', function () {
    Smartgraphs.statechart.sendAction('disableSubmission');
  });

});
