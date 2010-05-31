// ==========================================================================
// Project:   Smartgraphs.DialogTurn Fixtures
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/dialog_turn');

Smartgraphs.DialogTurn.FIXTURES = [

  { guid: 'turn-1',
    beforeText: 'For how many minutes did Maria rest?',
    responseTemplate: 'template-1',
    responseVerifier: 'verifier-1',
    afterText: '',
    nextTurnForNominalResponse: null,
    nextTurnForIncorrectResponse: null
  },
  
  { guid: 'turn-2',
    beforeText: 'Click on the point where Maria first stopped to rest.',
    responseTemplate: null,
    responseVerifier: 'verifier-2',
    afterText: '',
    nextTurnForNominalResponse: null,
    nextTurnForIncorrectResponse: null
  }
];
