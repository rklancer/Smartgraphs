// ==========================================================================
// Project:   Smartgraphs.DialogTurn Fixtures
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/dialog_turn');

Smartgraphs.DialogTurn.FIXTURES = [

  { guid: 'turn-1-start',
    beforeText: 
      '<p>How are your motions represented in the position versus time graph? ' +
      '(For example, what does the graph look like when you were standing still?)</p>',
    responseTemplate: 'template-open-1',
    responseVerifier: null,
    afterText: '',
    nextTurnButtonTitle: 'Submit My Response',
    nextTurnForNominalResponse: 'turn-1-done',
    nextTurnForIncorrectResponse: null,
    isLastTurn: NO
  },

  { guid: 'turn-1-done',
    beforeText: 
      "<p>Whenever you see the 'Next>>' button activated, like you see below, you're ready to go to the next step. Go ahead and click on it now.</p>",
    responseTemplate: null,
    responseVerifier: null,
    afterText: '',
    nextTurnForNominalResponse: null,
    nextTurnForIncorrectResponse: null,
    isLastTurn: YES
  },

  { guid: 'turn-2-start',
    beforeText: 
      '<p>How are the two different speeds represented in the position versus time graph?</p>',
    responseTemplate: 'template-open-1',
    responseVerifier: null,
    afterText: '',
    nextTurnButtonTitle: 'Submit My Response',
    nextTurnForNominalResponse: 'turn-2-done',
    nextTurnForIncorrectResponse: null,
    isLastTurn: NO
  },

  { guid: 'turn-2-done',
    beforeText: '',
    responseTemplate: null,
    responseVerifier: null,
    afterText: '',
    nextTurnForNominalResponse: null,
    nextTurnForIncorrectResponse: null,
    isLastTurn: YES
  },
  
  { guid: 'turn-3-start',
    beforeText: 
      '<p>What do you notice about the steepness of the three different segments  during each of the motions?</p>',
    responseTemplate: 'template-open-1',
    responseVerifier: null,
    afterText: '',
    nextTurnButtonTitle: 'Submit My Response',
    nextTurnForNominalResponse: 'turn-3-done',
    nextTurnForIncorrectResponse: null,
    isLastTurn: NO
  },

  { guid: 'turn-3-done',
    beforeText: '',
    responseTemplate: null,
    responseVerifier: null,
    afterText: '',
    nextTurnForNominalResponse: null,
    nextTurnForIncorrectResponse: null,
    isLastTurn: YES
  },

  { guid: 'turn-4-start',
    beforeText: 
      "<p>Click the <b>first</b> point in the graph that shows when and where Maria might have stopped to talk to her coach.</p>",
    responseTemplate: null,
    responseVerifier: 'verifier-1',
    afterText: '',
    nextTurnForNominalResponse: 'turn-4-correct',
    nextTurnForIncorrectResponse: 'turn-4-hint-1',
    isLastTurn: NO
  },
  
  { guid: 'turn-4-hint-1',
    beforeText: 
      "<p>Click the first point in the graph that shows when and where Maria might have stopped to talk to her coach.</p>",
    responseTemplate: null,
    responseVerifier: 'verifier-1',
    afterText: 
      "<p>Incorrect.</p>" +
      "<p><b>Hint 1</b>: Look at the graph and table and find where Maria’s distance stayed the same.</p>" +
      "<p>Try again.</p>",
    nextTurnForNominalResponse: 'turn-4-correct',
    nextTurnForIncorrectResponse: 'turn-4-hint-2',
    isLastTurn: NO
  },
  
  { guid: 'turn-4-hint-2',
    beforeText: 
      "<p>Click the first point in the graph that shows when and where Maria might have stopped to talk to her coach.</p>",
    responseTemplate: null,
    responseVerifier: 'verifier-1',
    afterText:
      "<p>Incorrect.</p>" +
      "<p><b>Hint 2</b>: In these two intervals, Maria’s distance changed as time passed.</p>" +
      "<p>Try again.</p>" + 
      "<p><i>The 'running' intervals on the left and right will be each be connected by a line segment</i></p>",
    nextTurnForNominalResponse: 'turn-4-correct',
    nextTurnForIncorrectResponse: 'turn-4-hint-3',
    isLastTurn: NO    
  },
  
  { guid: 'turn-4-hint-3',
    beforeText: 
      "<p>Click the first point in the graph that shows when and where Maria might have stopped to talk to her coach.</p>",
    responseTemplate: null,
    responseVerifier: 'verifier-1',
    afterText:
      "<p>Incorrect.</p>" +
      "<p><b>Hint 3</b>: In this interval, Maria’s distance stayed the same as time passed.</p>" +
      "<p>Try again.</p>" +       
      "<p><i>The points in the 'stopped' interval will be connected by a line segment</i></p>",    
    nextTurnForNominalResponse: 'turn-4-correct',
    nextTurnForIncorrectResponse: 'turn-4-incorrect',
    isLastTurn: NO    
  },
  
  { guid: 'turn-4-incorrect',
    beforeText: 
      "<i><p>If you look carefully, you'll see that between four and six minutes, Maria did not move.</p>" +
      "<p>Therefore we say she stopped at four minutes.</p></i>",
    responseTemplate: null,
    responseVerifier: null,
    afterText: "(Remember to click 'Next>>' to go to the next page.)",
    nextTurnForNominalResponse: null,
    nextTurnForIncorrectResponse: null,
    isLastTurn: YES
  },
  
  { guid: 'turn-4-correct',
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
  
  
  { guid: 'turn-5-start',
    beforeText: 
      "<p>How many meters did Maria run before she stopped to talk to her coach?</p>",
    responseTemplate: 'template-numeric-1',
    responseVerifier: 'verifier-2',
    afterText: '',
    nextTurnForNominalResponse: 'turn-5-correct',
    nextTurnForIncorrectResponse: 'turn-5-hint-1',
    isLastTurn: NO    
  },
  

  { guid: 'turn-5-hint-1',
    beforeText:
      "<p>How many meters did Maria run before she stopped to talk to her coach?</p>",
    responseTemplate: 'template-numeric-1',
    responseVerifier: 'verifier-2',
    afterText:
      "<p>Incorrect.</p>" +
      "<p><b>Hint 1</b>: Look at the data and find how many minutes passed before Maria stopped.</p>" +
      "<p>Try again.</p>",
    nextTurnForNominalResponse: 'turn-5-correct',
    nextTurnForIncorrectResponse: 'turn-5-hint-2',
    isLastTurn: NO    
  },
  
  { guid: 'turn-5-hint-2',
    beforeText:
      "<p>How many meters did Maria run before she stopped to talk to her coach?</p>",
    responseTemplate: 'template-numeric-1',
    responseVerifier: 'verifier-2',
    afterText:
      "<p>Incorrect.</p>" +
      "<p><b>Hint 2</b>: Here is where Maria stopped. Find her distance at this point.</p>" +
      "<p>Try again.</p>" +      
      "<p><i>The point at 4 minutes, 800 meters will be highlighted.</i></p>",
    nextTurnForNominalResponse: 'turn-5-correct',
    nextTurnForIncorrectResponse: 'turn-5-hint-3',
    isLastTurn: NO    
  },
  
  { guid: 'turn-5-hint-3',
    beforeText:
      "<p>How many meters did Maria run before she stopped to talk to her coach?</p>",
    responseTemplate: 'template-numeric-1',
    responseVerifier: 'verifier-2',
    afterText:
      "<p>Incorrect.</p>" +
      "<p><b>Hint 3</b>: Find Maria’s distance at any of these points.</p>" +
      "<p>Try again.</p>" +       
      "<p><i>A horizontal line will be drawn from the 800 meter point on the y axis to the three 'stopped' data points.</i></p>",
    nextTurnForNominalResponse: 'turn-5-correct',
    nextTurnForIncorrectResponse: 'turn-5-incorrect',
    isLastTurn: NO    
  },
  
  { guid: 'turn-5-incorrect',
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
  
  { guid: 'turn-5-correct',
    beforeText: 
      "<p>Correct! Four minutes into her run, Maria stopped. At that point, Maria’s distance was 800 meters.</p>",
    responseTemplate: null,
    responseVerifier: null,
    afterText: '',
    nextTurnForNominalResponse: null,
    nextTurnForIncorrectResponse: null,
    isLastTurn: YES
  },
  

  { guid: 'turn-6-start',
    beforeText: 
      "<p>For how many minutes did Maria stop to talk to her coach?</p>",
    responseTemplate: 'template-numeric-1',
    responseVerifier: 'verifier-3',
    afterText: '',
    nextTurnForNominalResponse: 'turn-6-correct',
    nextTurnForIncorrectResponse: 'turn-6-hint-1',
    isLastTurn: NO    
  },
  
  { guid: 'turn-6-hint-1',
    beforeText:
      "<p>For how many minutes did Maria stop to talk to her coach?</p>",
    responseTemplate: 'template-numeric-1',
    responseVerifier: 'verifier-3',
    afterText:
      "<p>Incorrect.</p>" +
      "<p><b>Hint 1</b>: Here is the interval when Maria’s distance stayed the same.</p>" +
      "<p>Try again.</p>",
    nextTurnForNominalResponse: 'turn-6-correct',
    nextTurnForIncorrectResponse: 'turn-6-hint-2',
    isLastTurn: NO    
  },
  
  { guid: 'turn-6-hint-2',
    beforeText:
      "<p>For how many minutes did Maria stop to talk to her coach?</p>",
    responseTemplate: 'template-numeric-1',
    responseVerifier: 'verifier-3',
    afterText:
      "<p>Incorrect.</p>" +
      "<p><b>Hint 2</b>: How much time elapsed during this interval?</p>" +
      "<p>Try again.</p>",
    nextTurnForNominalResponse: 'turn-6-correct',
    nextTurnForIncorrectResponse: 'turn-6-hint-3',
    isLastTurn: NO
  },
  
  { guid: 'turn-6-hint-3',
    beforeText:
      "<p>For how many minutes did Maria stop to talk to her coach?</p>",
    responseTemplate: 'template-numeric-1',
    responseVerifier: 'verifier-3',
    afterText:
      "<p>Incorrect.</p>" +
      "<p><b>Hint 3</b>: Maria stopped between four and six minutes, so how many minutes passed?</p>" +
      "<p>Try again.</p>",      
    nextTurnForNominalResponse: 'turn-6-correct',
    nextTurnForIncorrectResponse: 'turn-6-incorrect',
    isLastTurn: NO    
  },
  
  { guid: 'turn-6-incorrect',
    beforeText:
      "<p>Remember from the last question that Maria stopped at four minutes? " +
      "Notice on the graph that see started moving again at six minutes."+
      "That means she stopped to talk for two minutes.</p>",
    responseTemplate: null,
    responseVerifier: null,
    afterText: '',
    nextTurnForNominalResponse: null,
    nextTurnForIncorrectResponse: null,
    isLastTurn: YES    
  },
  
  { guid: 'turn-6-correct',
    beforeText: 
      "<p>Correct! Maria stopped during the horizontal segment of the graph. " +
      "This is when her distance did not change. As you can see, this interval lasted 2 minutes.</p>",
    responseTemplate: null,
    responseVerifier: null,
    afterText: '',
    nextTurnForNominalResponse: null,
    nextTurnForIncorrectResponse: null,
    isLastTurn: YES
  }
];
