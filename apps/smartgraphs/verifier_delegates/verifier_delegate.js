// ==========================================================================
// Project:   Smartgraphs.VerifierDelegate
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */


// thought question: should these delegates really be singletons?

// VerifierDelegate classes know
//  (1) where in the property path to get the response (e.g., if from some annotation object on the graph, or from the responseTemplateController)
//  (2) how to interpret the 'value' parameter of the ResponseVerifier object

Smartgraphs.VerifierDelegate = SC.Object.extend({
  isVerifierDelegate: YES,
  configString: '',
  
  destroy: function () {
    sc_super();
    this.get('bindings').forEach(function (binding) {
      //binding.disconnect();
    });
  },
  
  // implement these in each subclass
  checkResponse: null,
  responseAsString: '',
  responseIsIncomplete: YES,
  responseIsMalformed: NO,
  responseIsCorrect: NO
});