// ==========================================================================
// Project:   Smartgraphs.NoSelectionVerifierDelegate
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

sc_require('verifier_delegates/verifier_delegate');

Smartgraphs.NoSelectionVerifierDelegate = Smartgraphs.VerifierDelegate.create({
  isVerifierDelegate: YES,
  configString: '',
  
  checkResponse: function () {
    console.log('NoSelectionVerifierDelegate.checkResponse called');
    this.set('responseIsCorrect', true);     
  },
  responseAsString: '',
  responseIsIncomplete: NO,
  responseIsMalformed: NO,
  responseIsCorrect: YES,
  responseIsReady: YES
});
