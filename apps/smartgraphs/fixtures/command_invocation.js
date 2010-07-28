// ==========================================================================
// Project:   Smartgraphs.CommandInvocation Fixtures
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/command_invocation');

Smartgraphs.CommandInvocation.FIXTURES = [

  { guid: 
      'p1s1-single-pane',
    command:
      'show-single-pane',
    triggerResponse:
      'p1s1-do-step-beginning',
    index:
      1,
    literalArgs:
      {},
    substitutedArgs:
      {}
  },
  
  
  { guid: 
      'p1s1-show-image',
    command:
      'show-image',
    triggerResponse:
      'p1s1-do-step-beginning',
    index:
      2,
    literalArgs: { 
      path: sc_static('resources/arrow.jpg')
    },
    substitutedArgs: 
      {}
  },
  
  
  { guid: 
      'p1s1-finish-step',
    command:
      'finish-step',
    triggerResponse:
      'p1s1-do-step-beginning',
    index:
      3,
    literalArgs: 
      {},
    substitutedArgs: 
      {}
  },
  
  
  { guid: 
      'p2s1-split-pane',
    command:
      'show-split-pane',
    triggerResponse:
      'p2s1-do-step-beginning',
    index:
      1,
    literalArgs:
      {},
    substitutedArgs:
      {}
  },
  
  
  { guid: 
      'p2s1-show-graph',
    command:
      'show-graph',
    triggerResponse:
      'p2s1-do-step-beginning',
    index:
      2,
    literalArgs: {
      pane: 'first',
      graphId: 'prediction-away'
    },
    substitutedArgs:
      {}
  },
  
  
  { guid: 
      'p2s1-enable-submission',
    command:
      'enable-submission',
    triggerResponse:
      'p2s1-do-step-beginning',
    index:
      3,
    literalArgs: 
      {},
    substitutedArgs:
      {}
  },
  
  
  { guid: 
      'p2s1-start-input',
    command:
      'enable-prediction-graph-input',
    triggerResponse:
      'p2s1-do-step-beginning',
    index:
      4,
    literalArgs: {
      pane: 'first',
      seriesId: 'prediction-away-series',
      xMin: 0,
      xMax: 15
    },
    substitutedArgs:
      {}
  },
  
  
  { guid: 
      'p2s1-goto-p2s2',
    command:
      'goto-step',
    triggerResponse:
      'p2s1-do-step-finished',
    index:
      1,
    literalArgs: {
      stepId: 'page-2-step-2'
    },
    substitutedArgs:
      {}
  },
  
  
  { guid: 
      'p2s2-show-graph',
    command:
      'show-graph',
    triggerResponse:
      'p2s2-do-step-beginning',
    index:
      1,
    literalArgs: {
      pane: 'second',
      graphId: 'prediction-toward'
    },
    substitutedArgs:
      {}
  },
      
      
  { guid: 
      'p2s2-enable-submission',
    command:
      'enable-submission',
    triggerResponse:
      'p2s2-do-step-beginning',
    index:
      2,
    literalArgs: 
      {},
    substitutedArgs:
      {}
  },
  
  
  { guid: 
      'p2s2-start-input',
    command:
      'enable-prediction-graph-input',
    triggerResponse:
      'p2s2-do-step-beginning',
    index:
      3,
    literalArgs: {
      pane: 'second',
      seriesId: 'prediction-toward-series',
      xMin: 0,
      xMax: 15
    },
    substitutedArgs:
      {}
  },
  

  { guid: 
      'p3s1-show-graph',
    command:
      'show-graph',
    triggerResponse:
      'p3s1-do-step-beginning',
    index:
      1,
    literalArgs: {
      pane: 'first',
      graphId: 'sensor-1'
    },
    substitutedArgs:
      {}
  },
  
  
  { guid: 
      'p3s1-hide-pane',
    command:
      'hide-pane',
    triggerResponse:
      'p3s1-do-step-beginning',
    index:
      2,
    literalArgs: {
      pane: 'second'
    },
    substitutedArgs:
      {}
  },
  
  
  { guid: 
      'p3s1-enable-submission',
    command:
      'enable-submission',
    triggerResponse:
      'p3s1-do-step-beginning',
    index:
      3,
    literalArgs: 
      {},
    substitutedArgs:
      {}
  },
  
  
  { guid: 
      'p3s1-start-input',
    command:
      'enable-sensor-input',
    triggerResponse:
      'p3s1-do-step-beginning',
    index:
      4,
    literalArgs: {
      pane: 'first',
      seriesId: 'sensor-1-series'
    },
    substitutedArgs:
      {}
  },
  
  
  { guid: 
      'p3s1-goto-p3s2',
    command:
      'goto-step',
    triggerResponse:
      'p3s1-do-step-finished',
    index:
      1,
    literalArgs: {
      stepId: 'page-3-step-2'
    },
    substitutedArgs:
      {}
  },
  
  
  { guid: 
      'p3s2-wait-for-valid-response',
    command:
      'wait-for-valid-response',
    triggerResponse:
      'p3s2-do-step-begin',
    index:
      1,
    literalArgs: 
      {},
    substitutedArgs:
      {}
  }
      
];
