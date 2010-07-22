// ==========================================================================
// Project:   Smartgraphs.Trigger Fixtures
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/trigger');

Smartgraphs.Trigger.FIXTURES = [

  { guid:
      'begin-step',
    
    name:
      'beginStep',
    
    description:
      'This is the list of commands that run when the guide step begins.',

    args:
      {}
  },
  
  { guid:
      'response-submitted',
    
    name:
      'responseSubmitted',
    
    description:
      'This is the list of commands that check the answer.',

    args:
      {}
  },
  
  
  { guid:
      'step-finished',
    
    name:
      'stepFinished',
    
    description:
      'This is the list of commands that run when the guide step finishes.',

    args:
      {}
  }
];
