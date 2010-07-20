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
      'page-1-step-1',
     
    button:
      null,
    
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
      'page-1-step-1',
    
    button:
      null,
    
    index:
      2,
    
    literalArgs: { 
      path: sc_static('resources/arrow.jpg')
    },
    
    substitutedArgs: 
      {}
  }
];
