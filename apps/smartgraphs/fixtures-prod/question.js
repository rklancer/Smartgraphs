// ==========================================================================
// Project:   Smartgraphs.Question Fixtures
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/question');

Smartgraphs.Question.FIXTURES = [

  { guid: 1,
    sequence: 'sequence-1',
    index: 1,
    shortName: "Maria Runs",
    responseType: Smartgraphs.GRAPH_ANNOTATION_RESPONSE,
    prompt: 
       "<p>Maria ran practice laps around the track. Her coach wrote the distance she ran after each minute. " + 
       "These data are shown in the scatterplot and the table at right.</p>" +
       "<p>Click on the point in the scatterplot that shows where and when Maria first stopped to talk to her coach.</p>",
    correctResponse: '4',
    correctResponseFeedback: "<p>That's correct. Maria stopped at 4 minutes, after having run 800 meters.</p>",
    incorrectResponseFeedback: 
      "<p>That's not quite right. Remember that when Maria stops, her distance stays the same at successive time points.</p>" +
      "<p>See if you can use that hint to find the point where Maria first stopped to talk to her coach. </p>" +
      "<p><i>(Imagine this and similar feedback being displayed in animated, graphical form.)</i></p>"
  },
  
  { guid: 2,
    sequence: 'sequence-1',
    index: 2,
    shortName: "She Gets A Pep Talk",
    responseType: Smartgraphs.TEXT_RESPONSE,
    prompt: '<p>For how many minutes did Maria talk with her coach?</p>',
    correctResponse: '2',
    correctResponseFeedback: "<p>That's correct. Maria stopped at 4 minutes, and didn't move again until 6 minutes.</p>",
    incorrectResponseFeedback: 
      "<p>That's not correct. Look for the group of time points where the y value, which represents Maria's distance, " +
      "remains the same. Then subtract the latest time from the earliest time.</p>" +
      "<p><i>(Imagine this feedback broken into component steps, each graphical in nature, that build up a " +
      "visual/animated set of annotations that can be reviewed later.)</i></p>"
  },
  
  { guid: 3,
    sequence: 'sequence-1',
    index: 3,
    shortName: "She Runs Again",
    responseType: Smartgraphs.TEXT_RESPONSE,
    prompt:
      "<p><i>(This is a slightly trickier question that illustrates a next step towards more interesting " +
      "questions that could be posed and that could have interactive, graphical scaffolds.)</i></p>" +
      "<p>Did you notice that Maria's coach must have written down her position three times while they were talking?</p>" + 
      "<p>After the third time he wrote down her position, about how many <em>seconds</em> did Maria take to start running again?</p>",
    correctResponse: '0',
    correctResponseFeedback: "<p>That's correct. You can tell from the slope of her position versus time graph that she must have started right away.</p>",
    incorrectResponseFeedback: 
      "<p>That's not quite right... </p>" +
      "<p><i>(We could visualize the intersection of the 'chatting' line segment and last 'running' line segment, " +
      "perhaps including animated and/or interactive explorations of where that intersection would be if Maria had " +
      "waited longer to start running.)</i></p>"
      
  }
];
