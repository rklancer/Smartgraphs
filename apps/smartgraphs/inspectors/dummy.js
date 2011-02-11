// ==========================================================================
// Project:   Smartgraphs.DummyInspector
// Copyright: ©2011 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('inspectors/inspector');

// Used to signify to the activityStepController and the evaluator that we don't actually care about the inspector
// value. Returns truthy value so the activityStepController knows to process the responseBranches; and the value
// is a unique object (Smartgraphs.DummyInspector.token) that signifies to the expression evaluator that it should use
// new-style expressions (which ignore the 'value' argument passed to the evaluator.)


Smartgraphs.DummyInspector = Smartgraphs.Inspector.extend({

  inspect: function () {
    return Smartgraphs.DummyInspector.token;
  }

});

Smartgraphs.DummyInspector.token = { isToken: true };