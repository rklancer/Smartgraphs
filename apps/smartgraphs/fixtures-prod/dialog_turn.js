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
    nextTurnForNominalResponse: 'turn-1-correct',
    nextTurnForIncorrectResponse: 'turn-1-1',
    isLastTurn: NO
  },
  
  { guid: 'turn-1-1',
    beforeText: 
      "<p>Click the point in the scatter plot that shows when and where Maria might have stopped to talk to her coach.</p>",
    responseTemplate: null,
    responseVerifier: 'verifier-1',
    afterText: 
      "<p>Incorrect.</p>" +
      "<p>Hint 1: Look at the graph and table and find where Maria’s distance stayed the same.</p>",
    nextTurnForNominalResponse: 'turn-1-correct',
    nextTurnForIncorrectResponse: 'turn-1-2',
    isLastTurn: NO
  },
  
  { guid: 'turn-1-2',
    beforeText: 
      "<p>Click the point in the scatter plot that shows when and where Maria might have stopped to talk to her coach.</p>",
    responseTemplate: null,
    responseVerifier: 'verifier-1',
    afterText:
      "<p>Incorrect.</p>" +
      "<p>Hint 2: In these two intervals, Maria’s distance changed as time passed.</p>" +
      "<p><i>The intervals on the left and right will be highlighted</i></p>",
    nextTurnForNominalResponse: 'turn-1-correct',
    nextTurnForIncorrectResponse: 'turn-1-3',
    isLastTurn: NO    
  },
  
  { guid: 'turn-1-3',
    beforeText: 
      "<p>Click the point in the scatter plot that shows when and where Maria might have stopped to talk to her coach.</p>",
    responseTemplate: null,
    responseVerifier: 'verifier-1',
    afterText:
      "<p>Incorrect.</p>" +
      "<p>Hint 3: In this interval, Maria’s distance stayed the same as time passed.</p>" +
      "<p><i>The stationary interval will be highlighted</i></p>",    
    nextTurnForNominalResponse: 'turn-1-correct',
    nextTurnForIncorrectResponse: 'turn-1-incorrect',
    isLastTurn: NO    
  },
  
  { guid: 'turn-1-incorrect',
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
  
  { guid: 'turn-1-correct',
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
    nextTurnForNominalResponse: 'turn-2-correct',
    nextTurnForIncorrectResponse: 'turn-2-1',
    isLastTurn: NO    
  },
  
  { guid: 'turn-2-1',
    beforeText:
      "<p>How many meters did Maria run before she stopped to talk to her coach?</p>",
    responseTemplate: 'template-1',
    responseVerifier: 'verifier-2',
    afterText:
      "<p>Incorrect.</p>" +
      "<p>Hint 1: Look at the data and find how many minutes passed before Maria stopped.</p>",
    nextTurnForNominalResponse: 'turn-2-correct',
    nextTurnForIncorrectResponse: 'turn-2-2',
    isLastTurn: NO    
  },
  
  { guid: 'turn-2-2',
    beforeText:
      "<p>How many meters did Maria run before she stopped to talk to her coach?</p>",
    responseTemplate: 'template-1',
    responseVerifier: 'verifier-2',
    afterText:
      "<p>Incorrect.</p>" +
      "<p>Hint 2: Here is where Maria stopped. Find her distance at this point.</p>" +
      "<p><i>The point at 4 minutes, 800 meters will be highlighted.</i></p>",
    nextTurnForNominalResponse: 'turn-2-correct',
    nextTurnForIncorrectResponse: 'turn-2-3',
    isLastTurn: NO    
  },
  
  { guid: 'turn-2-3',
    beforeText:
      "<p>How many meters did Maria run before she stopped to talk to her coach?</p>",
    responseTemplate: 'template-1',
    responseVerifier: 'verifier-2',
    afterText:
      "<p>Incorrect.</p>" +
      "<p>Hint 3: Find Maria’s distance at this point.</p>" +
      "<p><i>A horizontal line will be drawn from the 800 meter point on the y axis to the point at " +
      "4 minutes, 800 meters.</i></p>",
    nextTurnForNominalResponse: 'turn-2-correct',
    nextTurnForIncorrectResponse: 'turn-2-incorrect',
    isLastTurn: NO    
  },
  
  { guid: 'turn-2-incorrect',
    beforeText:
      "<p>Remember from the last question that Maria stopped at four minutes. " +
      "Use the graph to convince yourself that she had run 800 meters by that point.</p>",
    responseTemplate: null,
    responseVerifier: 'verifier-4',
    afterText: '',
    nextTurnForNominalResponse: 'turn-3',
    nextTurnForIncorrectResponse: 'turn-3',
    isLastTurn: NO    
  },
  
  { guid: 'turn-2-correct',
    beforeText: 
      "<p>Correct. Maria had run 800 meters when she stopped at four minutes</p>",
    responseTemplate: null,
    responseVerifier: 'verifier-4',
    afterText: '',
    nextTurnForNominalResponse: 'turn-3',
    nextTurnForIncorrectResponse: 'turn-3',
    isLastTurn: NO
  },
  
  { guid: 'turn-3',
    beforeText: 
      "<p>For <b>how many minutes</b> did Maria stop to talk to her coach?</p>"+
      "<p>'Maria stoped to talk to her coach for",
    responseTemplate: 'template-1',
    responseVerifier: 'verifier-3',
    afterText: "minutes.'",
    nextTurnForNominalResponse: 'turn-3-correct',
    nextTurnForIncorrectResponse: 'turn-3-1',
    isLastTurn: NO    
  },
  
  { guid: 'turn-3-1',
    beforeText:
      "<p>For <b>how many minutes</b> did Maria stop to talk to her coach?</p>",
    responseTemplate: 'template-1',
    responseVerifier: 'verifier-3',
    afterText:
      "<p>Incorrect.</p>" +
      "<p>Hint 1: Here is the interval when Maria’s distance stayed the same.</p>"+
      "<p><i>The stationary interval will be highlighted</i></p>",  
    nextTurnForNominalResponse: 'turn-3-correct',
    nextTurnForIncorrectResponse: 'turn-3-2',
    isLastTurn: NO    
  },
  
  { guid: 'turn-3-2',
    beforeText:
      "<p>For <b>how many minutes</b> did Maria stop to talk to her coach?</p>",
    responseTemplate: 'template-1',
    responseVerifier: 'verifier-3',
    afterText:
      "<p>Incorrect.</p>" +
      "<p>Hint 2: How much time elapsed during this interval?</p>" +
      "<p><i>The stationary interval points will be highlighted in sequence, starting on the left.</i></p>",
    nextTurnForNominalResponse: 'turn-3-correct',
    nextTurnForIncorrectResponse: 'turn-3-3',
    isLastTurn: NO    
  },
  
  { guid: 'turn-3-3',
    beforeText:
      "<p>For <b>how many minutes</b> did Maria stop to talk to her coach?</p>",
    responseTemplate: 'template-1',
    responseVerifier: 'verifier-3',
    afterText:
      "<p>Incorrect.</p>" +
      "<p>Hint 3: Maria stopped between four and six minutes, so how many minutes passed?</p>" +
      "<p><i>A horizontal line will be drawn from the 4 minute point on the x axis to the point at " +
      "6 minutes.</i></p>",
    nextTurnForNominalResponse: 'turn-3-correct',
    nextTurnForIncorrectResponse: 'turn-3-incorrect',
    isLastTurn: NO    
  },
  
  { guid: 'turn-3-incorrect',
    beforeText:
      "<p>Remember from the last question that Maria stopped at four minutes? " +
      "Notice on the graph that see started moving again at six muntes."+
      "That means she stopped to talk for two minutes.</p>",
    responseTemplate: null,
    responseVerifier: null,
    afterText: '',
    nextTurnForNominalResponse: null,
    nextTurnForIncorrectResponse: null,
    isLastTurn: YES    
  },
  
  { guid: 'turn-3-correct',
    beforeText: 
      "<p>Correct. After four minutes, Maria stopped to talk for two minutes, and started moving again at six muntes.</p>",
    responseTemplate: null,
    responseVerifier: null,
    afterText: '',
    nextTurnForNominalResponse: null,
    nextTurnForIncorrectResponse: null,
    isLastTurn: YES
  }
];
