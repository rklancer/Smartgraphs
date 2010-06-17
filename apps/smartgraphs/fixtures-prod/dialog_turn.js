// ==========================================================================
// Project:   Smartgraphs.DialogTurn Fixtures
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/dialog_turn');

Smartgraphs.DialogTurn.FIXTURES = [

  // Page 1
  { guid: 'turn-1',
    beforeText: 
      "<p>Try out the prefab data here.<p>",
    responseTemplate: null,
    responseVerifier: null,
    afterText: '',
    nextTurnButtonTitle: null,
    nextTurnForNominalResponse: null,
    nextTurnForIncorrectResponse: null,
    isLastTurn: YES,
    shouldAutoAdvance: NO
  },

  // Page 2
  { guid: 'turn-2',
    beforeText:
      "<p>Try out the dynamic data here.<p>",
    responseTemplate: null,
    responseVerifier: null,
    afterText: '',
    nextTurnButtonTitle: null,
    nextTurnForNominalResponse: null,
    nextTurnForIncorrectResponse: null,
    isLastTurn: YES,
    shouldAutoAdvance: NO
  }
];
