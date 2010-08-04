// ==========================================================================
// Project:   Smartgraphs.TriggerResponse Fixtures
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/trigger_response');

Smartgraphs.TriggerResponse.FIXTURES = [

  { url: '/backend/activity/1/page/1/step/1/response/1/step-beginning/',
    trigger: '/backend/trigger/1/step-beginning/',
    step: '/backend/activity/1/page/1/step/1/',  
    args: {},
    commands: [
      '/backend/activity/1/page/1/step/1/response/1/command/1/single-pane/', 
      '/backend/activity/1/page/1/step/1/response/1/command/2/show-image/',
      '/backend/activity/1/page/1/step/1/response/1/command/3/finish-step/'
    ]
  },
  
  
  { url: '/backend/activity/1/page/2/step/1/response/1/step-beginning/',
    trigger: '/backend/trigger/1/step-beginning/',
    step: '/backend/activity/1/page/2/step/1/',  
    args: {},
    commands: [
      '/backend/activity/1/page/2/step/1/response/1/command/1/split-pane/',
      '/backend/activity/1/page/2/step/1/response/1/command/2/show-graph/',
      '/backend/activity/1/page/2/step/1/response/1/command/3/predict/'
    ]
  },
  
    
  { url: '/backend/activity/1/page/2/step/1/response/2/step-finished/',
    trigger: '/backend/trigger/3/step-finished/',
    step: '/backend/activity/1/page/2/step/1/',  
    args: {},
    commands: [
      '/backend/activity/1/page/2/step/1/response/2/command/1/goto-step-2/'
    ]
  },
  
  
  { url: '/backend/activity/1/page/2/step/2/response/1/step-beginning/',
    trigger: '/backend/trigger/1/step-beginning/',
    step: '/backend/activity/1/page/2/step/2/',  
    args: {},
    commands: [
      '/backend/activity/1/page/2/step/2/response/1/command/1/show-graph/',
      '/backend/activity/1/page/2/step/2/response/1/command/2/predict/'
    ]
  },
  
  
  { url: '/backend/activity/1/page/3/step/1/response/1/step-beginning/',
    trigger: '/backend/trigger/1/step-beginning/',
    step: '/backend/activity/1/page/3/step/1/',  
    args: {},
    commands: [
      '/backend/activity/1/page/3/step/1/response/1/command/1/show-graph/',
      '/backend/activity/1/page/3/step/1/response/1/command/2/hide-pane/',
      '/backend/activity/1/page/3/step/1/response/1/command/3/enable-submission/',
      '/backend/activity/1/page/3/step/1/response/1/command/4/start-sensor/'
    ]
  },
  
  
  { url: '/backend/activity/1/page/3/step/1/response/2/step-finished/',
    trigger: '/backend/trigger/3/step-finished/',
    step: '/backend/activity/1/page/3/step/1/',
    args: {},
    commands: [
      '/backend/activity/1/page/3/step/1/response/2/command/1/goto-step-2/'
    ]
  },
  
  
  { url: '/backend/activity/1/page/3/step/2/response/1/step-beginning/',
    trigger: '/backend/trigger/1/step-beginning/',
    step: '/backend/activity/1/page/3/step/2/',  
    args: {},
    commands: [
      '/backend/activity/1/page/3/step/2/response/1/command/1/wait-for-valid-response/'
    ]
  },
  
  { url: '/backend/activity/1/page/4/step/1/response/1/step-beginning/',
    trigger: '/backend/trigger/1/step-beginning/',
    step: '/backend/activity/1/page/4/step/1/',  
    args: {},
    commands: [
      '/backend/activity/1/page/4/step/1/response/1/command/1/hide-pane/',
      '/backend/activity/1/page/4/step/1/response/1/command/2/show-graph/'      
    ]
  }
  
];
