// ==========================================================================
// Project:   Smartgraphs.ResponseVerifier Fixtures
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/response_verifier');

Smartgraphs.ResponseVerifier.FIXTURES = [

  { guid: 'verifier-1',
    verifierDelegateName: 'ResponseTemplate',
    configString: 'number: 2'
  },

  { guid: 'verifier-2',
    verifierDelegateName: 'GraphSelection',
    configString: 'x: 4'
  }

];
