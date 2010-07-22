// ==========================================================================
// Project:   Smartgraphs.CommandInvocation Fixtures
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/command_invocation');

Smartgraphs.CommandInvocation.FIXTURES = [

  { guid: 
      'step-1-single-pane',
  
    command:
      'show-single-pane',
    
    triggerResponse:
      'page-1-begin',
    
    index:
      1,
    
    literalArgs:
      {},
    
    substitutedArgs:
      {}
  },
  
  
  { guid: 
      'step-1-show-image',
  
    command:
      'show-image',
    
    triggerResponse:
      'page-1-begin',
    
    index:
      2,
    
    literalArgs: { 
      path: sc_static('resources/arrow.jpg')
    },
    
    substitutedArgs: 
      {}
  },
  
  
  { guid: 
      'step-1-finish-step',
  
    command:
      'finish-step',
    
    triggerResponse:
      'page-1-begin',
    
    index:
      3,
    
    literalArgs: 
      {},
    
    substitutedArgs: 
      {}
  },
  
  
  { guid: 
      'step-2-split-pane',
  
    command:
      'show-split-pane',
    
    triggerResponse:
      'page-2-begin',
    
    index:
      1,
    
    literalArgs:
      {},
    
    substitutedArgs:
      {}
  },
  
  
  { guid: 
      'step-2-show-graph',
  
    command:
      'show-graph',
    
    triggerResponse:
      'page-2-begin',
    
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
      'step-2-enable-submission',
  
    command:
      'enable-submission',
    
    triggerResponse:
      'page-2-begin',
    
    index:
      3,
    
    literalArgs: 
      {},
    
    substitutedArgs:
      {}
  },
  
  
  { guid: 
      'step-2-start-input',
  
    command:
      'enable-prediction-graph-input',
    
    triggerResponse:
      'page-2-begin',
    
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
      'step-2-goto-3',
  
    command:
      'goto-step',
    
    triggerResponse:
      'page-2-end',
    
    index:
      1,
    
    literalArgs: {
      stepId: 'page-2-step-2'
    },
    
    substitutedArgs:
      {}
  },
  
  
  { guid: 
      'step-3-show-graph',
  
    command:
      'show-graph',
    
    triggerResponse:
      'step-3-begin',
    
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
      'step-3-enable-submission',
  
    command:
      'enable-submission',
    
    triggerResponse:
      'page-3-begin',
    
    index:
      2,
    
    literalArgs: 
      {},
    
    substitutedArgs:
      {}
  },
  
  
  { guid: 
      'step-3-start-input',
  
    command:
      'enable-prediction-graph-input',
    
    triggerResponse:
      'page-3-begin',
    
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
      'step-4-show-graph',
  
    command:
      'show-graph',
    
    triggerResponse:
      'page-4-begin',
    
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
      'step-4-enable-sensor',
  
    command:
      'enable-sensor-input',
    
    triggerResponse:
      'page-4-begin',
    
    index:
      2,
    
    literalArgs: {
      pane: 'first',
      seriesId: 'sensor-1-series'
    },
    
    substitutedArgs:
      {}
  },
  
  
  { guid: 
      'step-4-hide-pane',
  
    command:
      'hide-pane',
    
    triggerResponse:
      'page-4-begin',
    
    index:
      3,
    
    literalArgs: {
      pane: 'second'
    },
    
    substitutedArgs:
      {}
  }
      
];
