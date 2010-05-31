// ==========================================================================
// Project:   Smartgraphs.VerifierDelegate
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

// VerifierDelegate classes know
//  (1) where in the property path to get the response (e.g., if from some annotation object on the graph, or from the responseTemplateController)
//  (2) how to interpret the 'value' parameter of the ResponseVerifier object

Smartgraphs.VerifierDelegate = SC.Object.extend({
  isVerifierDelegate: YES,
  configString: '',
  
  // implement these in each subclass
  checkResponse: null,
  responseAsString: '',
  responseIsComplete: NO,
  responseIsCorrect: NO
});