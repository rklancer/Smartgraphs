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
      
    triggers:
      [],
      
    triggerResponses: [
      'step-1-begin'
    ]
  }
];
