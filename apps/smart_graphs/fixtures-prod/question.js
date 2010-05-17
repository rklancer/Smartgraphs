// ==========================================================================
// Project:   SmartGraphs.Question Fixtures
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals SmartGraphs */

sc_require('models/question');

SmartGraphs.Question.FIXTURES = [

  { guid: 1,
    sequence: 'sequence-1',
    index: 1,
    shortName: "Maria Runs",
    responseType: SmartGraphs.GRAPH_ANNOTATION_RESPONSE,
    prompt: 
       "Maria ran practice laps around the track. Her coach wrote the distance she ran after each minute. " + 
       "These data are shown in the scatterplot and the table at right." + 
       "<br><br>" +
       "Click on the point in the scatterplot that shows where and when Maria first stopped to talk to her coach.",
    correctResponse: '4',
    correctResponseFeedback: "That's correct. Maria stopped at 4 minutes, after having run 800 meters.",
    incorrectResponseFeedback: 
      "That's not quite right. Remember that when Maria stops, her distance stays the same at successive time points." +
      "See if you can use that hint to find the point where Maria first stopped to talk to her coach. " +
      "(imagine this and similar feedback being displayed in animated, graphical form)"
  },
  
  { guid: 2,
    sequence: 'sequence-1',
    index: 2,
    shortName: "She get a pep talk",
    responseType: SmartGraphs.TEXT_RESPONSE,
    prompt: 'For how many minutes did Maria talk with her coach?',
    correctResponse: '2',
    correctResponseFeedback: "That's correct. Maria stopped at 4 minutes, and didn't move again until 6 minutes.",
    incorrectResponseFeedback: 
      "That's not correct. Look for the group of time points where the y value, which represents Maria's distance " +
      "remains the same. Subtract the latest time from the earliest time. " +
      "(imagine this feedback broken into component steps, each graphical in nature, that build up an visual/animated " +
      "set of annotations that can be reviewed later.)"
  }
];
