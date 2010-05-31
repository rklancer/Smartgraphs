// ==========================================================================
// Project:   Smartgraphs.ResponseVerifier Fixtures
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/response_verifier');

Smartgraphs.ResponseVerifier.FIXTURES = [

  { guid: 'verifier-1',
    verifierDelegateClassName: 'ResponseTemplateVerifierDelegate',
    configString: 'number: 2'
  },

  { guid: 'verifier-2',
    verifierDelegateClassName: 'GraphSelectionVerifierDelegate',
    configString: 'x: 4'
  }

];
