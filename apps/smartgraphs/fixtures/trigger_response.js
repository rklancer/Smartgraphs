// ==========================================================================
// Project:   Smartgraphs.TriggerResponse Fixtures
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/trigger_response');

Smartgraphs.TriggerResponse.FIXTURES = [

  { guid: 'step-1-begin',
    trigger: 'begin-step',
    step: 'page-1-step-1',  
    args: {},
    commands: [
      'step-1-single-pane', 
      'step-1-show-image',
      'step-1-finish-step'
    ]
  }
];
