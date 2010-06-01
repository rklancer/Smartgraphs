// ==========================================================================
// Project:   Smartgraphs.DialogTurn Fixtures
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/dialog_turn');

Smartgraphs.DialogTurn.FIXTURES = [

  { guid: 'turn-1',
    beforeText: 
      "<p>Click the point in the scatter plot that shows when and where Maria might have stopped to talk to her coach.</p>",
    responseTemplate: null,
    responseVerifier: 'verifier-1',
    afterText: '',
    nextTurnForNominalResponse: 'turn-1-done',
    nextTurnForIncorrectResponse: 'turn-1a',
    isLastTurn: NO
  },
  
  { guid: 'turn-1a',
    beforeText: 
      "<p>Click the point in the scatter plot that shows when and where Maria might have stopped to talk to her coach.</p>",
    responseTemplate: null,
    responseVerifier: 'verifier-1',
    afterText: 
      "<p>Incorrect.</p>" +
      "<p>Hint 1: Look at the graph and table and find where Maria’s distance stayed the same.</p>",
    nextTurnForNominalResponse: 'turn-1-done',
    nextTurnForIncorrectResponse: 'turn-1b',
    isLastTurn: NO
  },
  
  { guid: 'turn-1b',
    beforeText: 
      "<p>Click the point in the scatter plot that shows when and where Maria might have stopped to talk to her coach.</p>",
    responseTemplate: null,
    responseVerifier: 'verifier-1',
    afterText:
      "<p>Incorrect.</p>" +
      "<p>Hint 2: In these two intervals, Maria’s distance changed as time passed.</p>" +
      "<p><i>The intervals on the left and right will be highlighted</i></p>",
    nextTurnForNominalResponse: 'turn-1-done',
    nextTurnForIncorrectResponse: 'turn-1c',
    isLastTurn: NO    
  },
  
  { guid: 'turn-1c',
    beforeText: 
      "<p>Click the point in the scatter plot that shows when and where Maria might have stopped to talk to her coach.</p>",
    responseTemplate: null,
    responseVerifier: 'verifier-1',
    afterText:
      "<p>Incorrect.</p>" +
      "<p>Hint 3: In this interval, Maria’s distance stayed the same as time passed.</p>" +
      "<p><i>The stationary interval will be highlighted</i></p>",    
    nextTurnForNominalResponse: 'turn-1-done',
    nextTurnForIncorrectResponse: 'turn-1d',
    isLastTurn: NO    
  },
  
  { guid: 'turn-1d',
    beforeText: 
      "<p>If you look carefully, you'll see that between four and six minutes, Maria did not move.</p>" +
      "<p>Therefore we say she stopped at four minutes</p>.",
    responseTemplate: null,
    responseVerifier: null,
    afterText: '',
    nextTurnForNominalResponse: null,
    nextTurnForIncorrectResponse: null,
    isLastTurn: YES    
  },
  
  { guid: 'turn-1-done',
    beforeText: 
      "<p>Correct! Four minutes into her run, Maria’s distance stayed the same compared to the next few minutes, " +
      "meaning she stopped running.",
    responseTemplate: null,
    responseVerifer: null,
    afterText: '',
    nextTurnForNominalResponse: null,
    nextTurnForIncorrectResponse: null,
    isLastTurn: YES    
  },
  
  { guid: 'turn-2',
    beforeText: 
      "<p>How many meters did Maria run before she stopped to talk to her coach?</p>",
    responseTemplate: 'template-1',
    responseVerifier: 'verifier-2',
    afterText: '',
    nextTurnForNominalResponse: 'turn-2-done',
    nextTurnForIncorrectResponse: 'turn-2a',
    isLastTurn: NO    
  },
  
  { guid: 'turn-2a',
    beforeText:
      "<p>How many meters did Maria run before she stopped to talk to her coach?</p>",
    responseTemplate: 'template-1',
    responseVerifier: 'verifier-2',
    afterText:
      "<p>Incorrect.</p>" +
      "<p>Hint 1: Look at the data and find how many minutes passed before Maria stopped.</p>",
    nextTurnForNominalResponse: 'turn-2-done',
    nextTurnForIncorrectResponse: 'turn-2b',
    isLastTurn: NO    
  },
  
  { guid: 'turn-2b',
    beforeText:
      "<p>How many meters did Maria run before she stopped to talk to her coach?</p>",
    responseTemplate: 'template-1',
    responseVerifier: 'verifier-2',
    afterText:
      "<p>Incorrect.</p>" +
      "<p>Hint 2: Here is where Maria stopped. Find her distance at this point.</p>" +
      "<p><i>The point at 4 minutes, 800 meters will be highlighted.</i></p>",
    nextTurnForNominalResponse: 'turn-2-done',
    nextTurnForIncorrectResponse: 'turn-2c',
    isLastTurn: NO    
  },
  
  { guid: 'turn-2c',
    beforeText:
      "<p>How many meters did Maria run before she stopped to talk to her coach?</p>",
    responseTemplate: 'template-1',
    responseVerifier: 'verifier-2',
    afterText:
      "<p>Incorrect.</p>" +
      "<p>Hint 3: Find Maria’s distance at this point.</p>" +
      "<p><i>A horizontal line will be drawn from the 800 meter point on the y axis to the point at " +
      "4 minutes, 800 meters.</i></p>",
    nextTurnForNominalResponse: 'turn-2-done',
    nextTurnForIncorrectResponse: 'turn-2d',
    isLastTurn: NO    
  },
  
  { guid: 'turn-2d',
    beforeText:
      "<p>Remember from the last question that Maria stopped at four minutes. " +
      "Use the graph to convince yourself that she had run 800 meters by that point.</p>",
    responseTemplate: null,
    responseVerifier: null,
    afterText: '',
    nextTurnForNominalResponse: null,
    nextTurnForIncorrectResponse: null,
    isLastTurn: YES    
  },
  
  { guid: 'turn-2-done',
    beforeText: 
      "<p>Correct. Maria had run 800 meters when she stopped at four minutes</p>",
    responseTemplate: null,
    responseVerifier: null,
    afterText: '',
    nextTurnForNominalResponse: null,
    nextTurnForIncorrectResponse: null,
    isLastTurn: YES
  }
];
