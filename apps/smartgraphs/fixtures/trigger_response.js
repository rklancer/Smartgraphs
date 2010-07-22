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
  },
  
  { guid: 'step-2-begin',
    trigger: 'begin-step',
    step: 'page-2-step-1',  
    args: {},
    commands: [
      'step-2-split-pane',
      'step-2-show-graph',
      'step-2-enable-submission',
      'step-2-start-input'
    ]
  },
    
    { guid: 'step-2-end',
      trigger: 'step-finished',
      step: 'page-2-step-1',  
      args: {},
      commands: [
        'step-2-goto-3'
      ]
    },
    
    { guid: 'step-3-begin',
      trigger: 'begin-step',
      step: 'page-2-step-2',  
      args: {},
      commands: [
        'step-3-show-graph',
        'step-3-enable-submission',
         'step-3-start-input'
      ]
    }
  
];
