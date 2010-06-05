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
      "<p>In this activity, when you see the 'Next >>' button turned on, you are ready to go to the next page.</p>" +
      "<p>Go ahead and click on the Next button now to see the next page.<p>",
    responseTemplate: null,
    responseVerifier: null,
    afterText: '',
    nextTurnButtonTitle: null,
    nextTurnForNominalResponse: null,
    nextTurnForIncorrectResponse: null,
    isLastTurn: YES
  },


  // Page 2
  { guid: 'turn-2-start',
    beforeText: 
      '<p>How are your motions represented in the position versus time graph? ' +
      '(For example, what does the graph look like when you are standing still?)</p>',
    responseTemplate: 'template-open-1',
    responseVerifier: null,
    afterText: '',
    nextTurnButtonTitle: 'Submit My Response',
    nextTurnForNominalResponse: 'turn-2-done',
    nextTurnForIncorrectResponse: null,
    isLastTurn: NO
  },

  { guid: 'turn-2-done',
    beforeText: 
      "<p>Your answer has been recorded. Click Next >> when you are ready.</p>",
    responseTemplate: null,
    responseVerifier: null,
    afterText: '',
    nextTurnForNominalResponse: null,
    nextTurnForIncorrectResponse: null,
    isLastTurn: YES
  },


  // Page 3
  { guid: 'turn-3-start',
    beforeText:
      '<p>How are the two different speeds represented in the position versus time graph?</p>',
    responseTemplate: 'template-open-1',
    responseVerifier: null,
    afterText: '',
    nextTurnButtonTitle: 'Submit My Response',
    nextTurnForNominalResponse: 'turn-3-done',
    nextTurnForIncorrectResponse: null,
    isLastTurn: NO
  },

  { guid: 'turn-3-done',
    beforeText:
      "<p>Your answer has been recorded. Click Next >> when you are ready.</p>",
    responseTemplate: null,
    responseVerifier: null,
    afterText: '',
    nextTurnForNominalResponse: null,
    nextTurnForIncorrectResponse: null,
    isLastTurn: YES
  },
  
  
  // Page 4
  { guid: 'turn-4-start',
    beforeText: 
      "<p>What do you notice about the <b>steepness</b> of the three different segments during each of the motions?</p>",
    responseTemplate: 'template-open-1',
    responseVerifier: null,
    afterText: '',
    nextTurnButtonTitle: 'Submit My Response',
    nextTurnForNominalResponse: 'turn-4-done',
    nextTurnForIncorrectResponse: null,
    isLastTurn: NO
  },

  { guid: 'turn-4-done',
    beforeText: 
      "<p>Your answer has been recorded. Click Next >> when you are ready.</p>",    
    responseTemplate: null,
    responseVerifier: null,
    afterText: '',
    nextTurnForNominalResponse: null,
    nextTurnForIncorrectResponse: null,
    isLastTurn: YES
  },


  // Page 5
  { guid: 'turn-5-start',
    beforeText: 
      "<p>Click the point in the graph that shows when and where Maria might have first stopped to talk to her coach.</p>",
    responseTemplate: null,
    responseVerifier: 'verifier-1',
    afterText: '',
    nextTurnForNominalResponse: 'turn-5-correct',
    nextTurnForIncorrectResponse: 'turn-5-hint-1',
    isLastTurn: NO
  },
  
  { guid: 'turn-5-hint-1',
    beforeText:
      "<p>Incorrect.</p>" +
      "<p><b>Hint 1</b>: Look at the graph and table and find where Maria’s position <b>stayed the same.</b></p>" +
      "<p>Try again. Click the first point in the graph that shows when and where Maria might have stopped to talk " +
      "to her coach.</p>",
    responseTemplate: null,
    responseVerifier: 'verifier-1',
    afterText: '',
    nextTurnForNominalResponse: 'turn-5-correct',
    nextTurnForIncorrectResponse: 'turn-5-hint-2',
    isLastTurn: NO
  },
  
  { guid: 'turn-5-hint-2',
    beforeText: 
      "<p>Incorrect.</p>" +
      "<p><b>Hint 2</b>: In these two intervals, Maria’s position <b>changed</b> as time passed.</b></p>" +
      "<p>Try again. Click the first point in the graph that shows when and where Maria might have stopped to talk " +
      "to her coach.</p>",
    responseTemplate: null,
    responseVerifier: 'verifier-1',
    afterText: "",
    staticAnnotations: ['annotation-1', 'annotation-2'],
    nextTurnForNominalResponse: 'turn-5-correct',
    nextTurnForIncorrectResponse: 'turn-5-hint-3',
    isLastTurn: NO    
  },
  
  { guid: 'turn-5-hint-3',
    beforeText: 
      "<p><b>Hint 3</b>: In this interval, Maria’s position <b>stayed the same</b> as time passed.</b></p>" +
      "<p>Try again. Click the first point in the graph that shows when and where Maria might have stopped to talk " +
      "to her coach.</p>", 
    responseTemplate: null,
    responseVerifier: 'verifier-1',
    afterText: '',   
    staticAnnotations: ['annotation-3'],
    nextTurnForNominalResponse: 'turn-5-correct',
    nextTurnForIncorrectResponse: 'turn-5-incorrect',
    isLastTurn: NO    
  },
  
  { guid: 'turn-5-incorrect',
    beforeText:   
      "<p>If you look carefully, you’ll see that between four and six minutes, Maria’s position did not change, " +
      "meaning that she stopped at four minutes.</p>" +
      "<p>Click Next >> when you are ready.</p>",
    responseTemplate: null,
    responseVerifier: null,
    afterText: '',
    nextTurnForNominalResponse: null,
    nextTurnForIncorrectResponse: null,
    isLastTurn: YES
  },
  
  { guid: 'turn-5-correct',
    beforeText: 
      "<p>Correct! Four minutes into her run, Maria’s distance stayed the same compared to the next few minutes, " +
      "meaning she stopped running.</p>" +
      "<p>Click Next >> when you are ready.</p>",
    responseTemplate: null,
    responseVerifer: null,
    nextTurnForNominalResponse: null,
    nextTurnForIncorrectResponse: null,
    isLastTurn: YES
  },
  
  
  { guid: 'turn-6-start',
    beforeText: 
      "<p>How many meters did Maria run before she stopped to talk to her coach?</p>",
    responseTemplate: 'template-numeric-1',
    responseVerifier: 'verifier-2',
    afterText: '',
    nextTurnForNominalResponse: 'turn-6-correct',
    nextTurnForIncorrectResponse: 'turn-6-hint-1',
    isLastTurn: NO    
  },
  

  { guid: 'turn-6-hint-1',
    beforeText:
      "<p>Incorrect.</p>" +
      "<p><b>Hint 1</b>: Look at the data and find how many minutes passed <b>before</b> Maria stopped.</p>" +
      "<p>Try again. How many meters did Maria run before she stopped to talk to her coach?</p>",
    responseTemplate: 'template-numeric-1',
    responseVerifier: 'verifier-2',
    afterText: '',
    nextTurnForNominalResponse: 'turn-6-correct',
    nextTurnForIncorrectResponse: 'turn-6-hint-2',
    isLastTurn: NO    
  },
  
  { guid: 'turn-6-hint-2',
    beforeText:
      "<p>Incorrect.</p>" +
      "<p><b>Hint 2</b>: Here is where Maria stopped. Find her position from the start of the track.</p>" +
      "<p>Try again. How many meters did Maria run before she stopped to talk to her coach?</p>",
    responseTemplate: 'template-numeric-1',
    responseVerifier: 'verifier-2',
    afterText: '',
    staticAnnotations: ['annotation-4'],
    nextTurnForNominalResponse: 'turn-6-correct',
    nextTurnForIncorrectResponse: 'turn-6-hint-3',
    isLastTurn: NO    
  },

  { guid: 'turn-6-hint-3',
    beforeText:
      "<p>Incorrect.</p>" +    
      "<p><b>Hint 3</b>: Here is where Maria stopped. Find her position from the start of the track.</p>" +
      "<p>Try again. Find the y value (position) of this point?</p>",
    responseTemplate: 'template-numeric-1',
    responseVerifier: 'verifier-2',
    afterText: '',
    staticAnnotations: ['annotation-5'],    
    nextTurnForNominalResponse: 'turn-6-correct',
    nextTurnForIncorrectResponse: 'turn-6-incorrect',
    isLastTurn: NO    
  },
  
  { guid: 'turn-6-incorrect',
    beforeText:
      "<p>Four minutes into her run, Maria stopped. At that point, Maria was 800 meters away from the start line.</p>",
    responseTemplate: null,
    responseVerifier: null,
    afterText: '',
    nextTurnForNominalResponse: null,
    nextTurnForIncorrectResponse: null,
    isLastTurn: YES    
  },
  
  { guid: 'turn-6-correct',
    beforeText: 
      "<p>Correct! Four minutes into her run, Maria stopped. At that point, " +
      "Maria’s was 800 meters away from the start line.</p>",
    responseTemplate: null,
    responseVerifier: null,
    afterText: '',
    nextTurnForNominalResponse: null,
    nextTurnForIncorrectResponse: null,
    isLastTurn: YES
  },

  { guid: 'turn-7-start',
    beforeText:
      "<p>For how many minutes did Maria stop to talk to her coach?</p>",
    responseTemplate: 'template-numeric-1',
    responseVerifier: 'verifier-3',
    afterText: '',
    nextTurnForNominalResponse: 'turn-7-correct',
    nextTurnForIncorrectResponse: 'turn-7-hint-1',
    isLastTurn: NO    
  },

  { guid: 'turn-7-hint-1',
    beforeText:
      "<p>Incorrect.</p>" +  
      "<p><b>Hint 1</b>: Here is the interval when Maria’s distance stayed the same.</p>" +
      "<p>Try again. For how many minutes did Maria stop to talk to her coach?</p>",
    responseTemplate: 'template-numeric-1',
    responseVerifier: 'verifier-3',
    afterText: '',
    staticAnnotations: ['annotation-3'],
    nextTurnForNominalResponse: 'turn-7-correct',
    nextTurnForIncorrectResponse: 'turn-7-hint-2',
    isLastTurn: NO    
  },

  { guid: 'turn-7-hint-2',
    beforeText:
      "<p>Incorrect.</p>" +    
      "<p><b>Hint 2</b>: How much time elapsed during this interval?</p>" +    
      "<p>Try again. For how many minutes did Maria stop to talk to her coach?</p>",
    responseTemplate: 'template-numeric-1',
    responseVerifier: 'verifier-3',
    afterText: '',
    staticAnnotations: ['annotation-3'],    
    nextTurnForNominalResponse: 'turn-7-correct',
    nextTurnForIncorrectResponse: 'turn-7-hint-3',
    isLastTurn: NO
  },

  { guid: 'turn-7-hint-3',
    beforeText:
      "<p>Incorrect.</p>" +
      "<p><b>Hint 3</b>: After four minutes, Maria stopped and did not start moving again until six minutes. " +
      "So, how many minutes passed?</p>" +
      "<p>Try again. For how many minutes did Maria stop to talk to her coach?</p>",
    responseTemplate: 'template-numeric-1',
    responseVerifier: 'verifier-3',
    afterText: '',
    nextTurnForNominalResponse: 'turn-7-correct',
    nextTurnForIncorrectResponse: 'turn-7-incorrect',
    isLastTurn: NO    
  },

  { guid: 'turn-7-incorrect',
    beforeText:
      "<p>Maria stopped during the horizontal segment of the graph. This is when her position did not change. " +
      "As you can see, this interval lasted 2 minutes.</p>",
    responseTemplate: null,
    responseVerifier: null,
    afterText: '',
    nextTurnForNominalResponse: null,
    nextTurnForIncorrectResponse: null,
    isLastTurn: YES    
  },

  { guid: 'turn-7-correct',
    beforeText: 
      "<p>Correct! Maria stopped during the horizontal segment of the graph. " +
      "This is when her position did not change. As you can see, this interval lasted 2 minutes.</p>",
    responseTemplate: null,
    responseVerifier: null,
    afterText: '',
    nextTurnForNominalResponse: null,
    nextTurnForIncorrectResponse: null,
    isLastTurn: YES
  },
  
  { guid: 'turn-9-start',
    beforeText: 
      "<p>What other elements would make the story complete?</p>",
    responseTemplate: 'template-open-1',
    responseVerifier: null,
    afterText: '',
    nextTurnButtonTitle: 'Submit My Response',
    nextTurnForNominalResponse: 'turn-9-done',
    nextTurnForIncorrectResponse: null,
    isLastTurn: NO
  },

  { guid: 'turn-9-done',
    beforeText: 
      "<p>Your answer has been recorded. This is the end of the activity.</p>",
    responseTemplate: null,
    responseVerifier: null,
    afterText: '',
    nextTurnForNominalResponse: null,
    nextTurnForIncorrectResponse: null,
    isLastTurn: YES
  }     
];
