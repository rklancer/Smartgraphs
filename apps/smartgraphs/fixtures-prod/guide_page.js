// ==========================================================================
// Project:   Smartgraphs.GuidePage Fixtures
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/guide_page');

Smartgraphs.GuidePage.FIXTURES = [

  { guid: 1,
    sequence: 'sequence-1',
    index: 1,
    title: "Maria Runs",
    introText: "<p>Maria ran practice laps around the school track. Her coach recorded the distances she ran after each " +
               "minute.</p>" + 
               "<p>These data are shown in the scatter plot and the table at right.</p>",
    firstDialogTurn: 'turn-1'
  },
  
  { guid: 2,
    sequence: 'sequence-1',
    index: 2,
    title: "She Stops to Talk",
    introText: "Well?",
    firstDialogTurn: 'turn-2'
  }  

];
