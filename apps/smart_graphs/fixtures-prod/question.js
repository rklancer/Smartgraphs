// ==========================================================================
// Project:   SmartGraphs.Question Fixtures
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals SmartGraphs */

sc_require('models/question');

SmartGraphs.Question.FIXTURES = [

  { guid: '1',
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
      "See if you can use that hint to find the point where Maria first stopped to talk to her coach."     
  }
];
