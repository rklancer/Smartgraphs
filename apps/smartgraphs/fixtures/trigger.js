// ==========================================================================
// Project:   Smartgraphs.Trigger Fixtures
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/trigger');

Smartgraphs.Trigger.FIXTURES = [

  { url:
      '/backend/trigger/1/step-beginning/',
    name:
      'stepBeginning',
    description:
      'This is the list of commands that run when the guide step begins.',
    args:
      {}
  },
  
  
  { url:
      '/backend/trigger/2/response-submitted/',
    name:
      'responseSubmitted',
    description:
      'This is the list of commands that check the answer.',
    args:
      {}
  },
  
  
  { url:
      '/backend/trigger/3/step-finished/',
    name:
      'stepFinished',
    description:
      'This is the list of commands that run when the guide step finishes.',
    args:
      {}
  }
];
