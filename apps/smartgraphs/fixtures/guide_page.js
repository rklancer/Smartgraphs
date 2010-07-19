// ==========================================================================
// Project:   Smartgraphs.GuidePage Fixtures
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/guide_page');

Smartgraphs.GuidePage.FIXTURES = [

  { guid: 
      'page-1',

    guide:
      'learner-guide-1',

    name: 
      'Introductory Page',
      
    index: 
      1,
    
    introText: 
      '<b>How can you tell a story about motion without using words?</b>'+
      '<p>The picture at right communicates direction of traffic using recognizable symbols. In this activity, you '+
      'will explore how motions in two opposite directions appear on a position-time graph. By doing so, you will '+
      'learn conventional methods of motion storytelling and analysis.</p>',

    steps: 
      ['page-1-step-1'],
    
    firstStep:
      'page-1-step-1'
  }

];
