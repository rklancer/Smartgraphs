// ==========================================================================
// Project:   Smartgraphs.Reaction Fixtures
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/reaction');

Smartgraphs.Reaction.FIXTURES = [

  { url: "/backend/activity/new-step/page/1/step/1/reaction/1",
    parentStep: "/backend/activity/new-step/page/1/step/1",
    index: 1,
    reactionCriterion: { 
      "equals": [ {"strip" : "value" }, "one" ] 
    },
    nextStep: "/backend/activity/new-step/page/1/step/2"
  },
  
  { url: "/backend/activity/new-step/page/1/step/1/reaction/2",
    parentStep: "/backend/activity/new-step/page/1/step/1",
    index: 2,
    reactionCriterion: { 
      "equals": [ {"strip" : "value" }, "two" ] 
    },
    nextStep: "/backend/activity/new-step/page/1/step/3"
  }
  
];
