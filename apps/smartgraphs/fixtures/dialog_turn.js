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
    nextTurnAfterCorrectResponse: null,
    nextTurnAfterIncorrectResponse: null
  },
  
  { guid: 'turn-2',
    beforeText: 'This is dialog turn 2',
    responseTemplate: null,
    responseVerifier: null,
    afterText: '',
    nextTurnAfterCorrectResponse: null,
    nextTurnAfterIncorrectResponse: null
  }
];
