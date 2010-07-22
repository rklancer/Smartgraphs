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
    
    isLastStep: YES,
    
    submitButtonShouldBeVisible: NO,
    
    submitButtonTitle: ''
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
      'step-2-begin',
      'step-2-end'
    ],
    
    isLastStep: NO,
    
    submitButtonShouldBeVisible: YES,

    submitButtonTitle: "Done"
  },
  
  
  { guid: 
      'page-2-step-2',

    guidePage:
      'page-2',
    
    beforeText: 
      '<p>In the bottom-right area, draw a graph of someone walking at a slow, steady pace from point B to point A '+
      'between 0 and 15 seconds. Click Next when you are ready.</p>',

    responseTemplate: 
      null,
    
    afterText:
      '',
      
    buttons: 
      [],
      
    triggerResponses: [
      'step-3-begin',
    ],
    
    isLastStep: YES,
    
    submitButtonShouldBeVisible: YES,

    submitButtonTitle: "Done"
  }
];
