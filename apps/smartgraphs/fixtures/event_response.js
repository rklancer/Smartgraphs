// ==========================================================================
// Project:   Smartgraphs.EventResponse Fixtures
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/event_response');

Smartgraphs.EventResponse.FIXTURES = [

  { guid: 'step-1-begin',
    eventName: 'beginGuideStep',
    commands: [
      'step-1-single-pane', 
      'step-1-show-image'
    ]
  }
];
