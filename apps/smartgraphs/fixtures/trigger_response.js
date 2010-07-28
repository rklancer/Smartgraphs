// ==========================================================================
// Project:   Smartgraphs.TriggerResponse Fixtures
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/trigger_response');

Smartgraphs.TriggerResponse.FIXTURES = [

  { guid: 'p1s1-do-begin-step',
    trigger: 'begin-step',
    step: 'page-1-step-1',  
    args: {},
    commands: [
      'p1s1-single-pane', 
      'p1s1-show-image',
      'p1s1-finish-step'
    ]
  },
  
  
  { guid: 'p2s1-do-begin-step',
    trigger: 'begin-step',
    step: 'page-2-step-1',  
    args: {},
    commands: [
      'p2s1-split-pane',
      'p2s1-show-graph',
      'p2s1-enable-submission',
      'p2s1-start-input'
    ]
  },
  
    
  { guid: 'p2s1-do-step-finished',
    trigger: 'step-finished',
    step: 'page-2-step-1',  
    args: {},
    commands: [
      'p2s1-goto-p2s2'
    ]
  },
  
  
  { guid: 'p2s2-do-begin-step',
    trigger: 'begin-step',
    step: 'page-2-step-2',  
    args: {},
    commands: [
      'p2s2-show-graph',
      'p2s2-enable-submission',
      'p2s2-start-input'
    ]
  },
  
  
  { guid: 'p3s1-do-begin-step',
    trigger: 'begin-step',
    step: 'page-3-step-1',  
    args: {},
    commands: [
      'p3s1-show-graph',
      'p3s1-hide-pane',
      'p3s1-enable-submission',
      'p3s1-start-input'
    ]
  },
  
  
  { guid: 'p3s1-do-step-finished',
    trigger: 'step-finished',
    step: 'page-3-step-1',
    args: {},
    commands: [
      'p3s1-goto-p3s2'
    ]
  },
  
  
  { guid: 'p3s2-do-begin-step',
    trigger: 'begin-step',
    step: 'page-3-step-2',  
    args: {},
    commands: [
    ]
  }
  
];
