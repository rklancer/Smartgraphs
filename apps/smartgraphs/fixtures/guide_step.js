// ==========================================================================
// Project:   Smartgraphs.GuideStep Fixtures
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/guide_step');

Smartgraphs.GuideStep.FIXTURES = [

  { guid: 
      'page-1-step-1',

    guidePage:
      'page-1',
    
    beforeText: 
      '<p>This is some before text</p>',

    responseTemplate: 
      null,
    
    afterText:
      '',
      
    buttons: 
      [],
      
    triggerResponses: [
      'step-1-begin'
    ],
    
    isLastStep: YES
  },
  
  
  { guid: 
      'page-2-step-1',

    guidePage:
      'page-2',
    
    beforeText: 
      '<p>In the top-right area, draw a graph of someone walking at a slow, steady pace from point A to point B '+
      'between 0 and 15 seconds.</p>',

    responseTemplate: 
      null,
    
    afterText:
      '',
      
    buttons: 
      [],
      
    triggerResponses: [
      'step-2-begin'
    ],
    
    isLastStep: NO
  }
];
