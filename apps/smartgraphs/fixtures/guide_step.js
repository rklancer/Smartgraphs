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
      '',

    responseTemplate: 
      null,
    
    afterText:
      '',
      
    buttons: 
      [],
      
    triggers:
      [],
      
    eventResponses: [
      'step-1-begin'
    ]
  }
];
