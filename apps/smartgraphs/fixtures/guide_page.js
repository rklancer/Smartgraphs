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
      '<h1>How can you tell a story about motion without using words?</h1>'+
      '<p>The picture at right communicates direction of traffic using recognizable symbols. In this activity, you '+
      'will explore how motions in two opposite directions appear on a position-time graph. By doing so, you will '+
      'learn conventional methods of motion storytelling and analysis.</p>',

    steps: 
      ['page-1-step-1'],
    
    firstStep:
      'page-1-step-1'
  },
  
  
  { guid: 
      'page-2',

    guide:
      'learner-guide-1',

    name: 
      'Second Page',
      
    index: 
      2,
    
    introText: 
      '<p>Let’s start by demonstrating what you already know about representing motion on a graph. Imagine a '+
      'straight walking path that is 5 meters long. Point A is at the 0-meter mark. Point B is at the 4-meter mark.'+
      '</p>'+
      '<img src="'+sc_static('resources/numberline.png')+'">',

    steps: 
      ['page-2-step-1'],
    
    firstStep:
      'page-2-step-1'
  }

];
