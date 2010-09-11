// ==========================================================================
// Project:   Smartgraphs.NextStep Fixtures
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/next_step');

Smartgraphs.NextStep.FIXTURES = [

  { url: "/backend/activity/new-step/page/1/step/1/next/1",
    parentStep: "/backend/activity/new-step/page/1/step/1",
    index: 1,
    responseCriterion: { 
      "equals": [ "value", { "literal": "one" } ] 
    },
    step: "/backend/activity/new-step/page/1/step/2"
  },
  
  { url: "/backend/activity/new-step/page/1/step/1/next/2",
    parentStep: "/backend/activity/new-step/page/1/step/1",
    index: 2,
    responseCriterion: { 
      "equals": [ "value", { "literal": "two" } ] 
    },
    step: "/backend/activity/new-step/page/1/step/3"
  }
  
];
