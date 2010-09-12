// ==========================================================================
// Project:   Smartgraphs.ActivityStep mock server responses
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('data_sources/mock_responses/mock_responses');

// for activity with new activity-step structure

var step, steps = [];

step = Smartgraphs.mockResponses["/backend/activity/new-step/page/1/step/1"] = 
{
  "url": "/backend/activity/new-step/page/1/step/1",
  "activityPage": "/backend/activity/new-step/page/1",
  "initialPaneConfig": 'single',
  "singleGraph": null,
  "topGraph": null,
  "bottomGraph": null,
  "singleImage": sc_static("resources/arrow.jpg"),
  "topImage": null,
  "bottomImage": null,
  "beforeText": "<p>How many panes would you like to see on the next page? Enter 'one' or 'two': ",
  "responseTemplate": "/backend/response-template/2/open",
  "afterText": "",
  "startCommands": [
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": true,
  "submissibilityInspector": {
    "type": "Smartgraphs.ResponseFieldsInspector",
    "config": {
      "fieldIndex": 0
    }
  },
  "submissibilityCriterion": {
    "or": [{ "equals": [ "value", { "literal": "one" } ] }, 
           { "equals": [ "value", { "literal": "two" } ] }]
  },
  "triggeredCommands": [
  ],
  "responseInspector": {
    "type": "Smartgraphs.ResponseFieldsInspector",
    "config": {
      "fieldIndex": 0
    }
  },
  "reactions": [
    "/backend/activity/new-step/page/1/step/1/reaction/1", 
    "/backend/activity/new-step/page/1/step/1/reaction/2"
  ],
  "defaultNextStep": null,
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "submitButtonShouldBeVisible": true,
  "submitButtonTitle": "Show me!"
};
steps.push(step);


step = Smartgraphs.mockResponses["/backend/activity/new-step/page/1/step/2"] = 
{
  "url": "/backend/activity/new-step/page/1/step/2",
  "activityPage": "/backend/activity/new-step/page/1",
  "initialPaneConfig": 'single',
  "singleGraph": "/backend/activity/1/graph/1/prediction-away",
  "topGraph": null,
  "bottomGraph": null,
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText": "<p>Enjoy the single pane on the right!<p>",
  "responseTemplate": null,
  "afterText": "",
  "startCommands": [
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": false,
  "submissibilityInspector": null,
  "submissibilityCriterion": null,
  "triggeredCommands": [
  ],
  "responseInspector": null,
  "reactions": [
  ],
  "defaultNextStep": null,
  "isFinalStep": true,
  "shouldAutoAdvancePage": false,
  "submitButtonShouldBeVisible": true,
  "submitButtonTitle": "I saw it!"
};
steps.push(step);


step = Smartgraphs.mockResponses["/backend/activity/new-step/page/1/step/3"] = 
{
  "url": "/backend/activity/new-step/page/1/step/3",
  "activityPage": "/backend/activity/new-step/page/1",
  "initialPaneConfig": 'split',
  "singleGraph": null,
  "topGraph": "/backend/activity/1/graph/1/prediction-away",
  "bottomGraph": "/backend/activity/1/graph/2/prediction-toward",
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText": "<p>Enjoy the split pane on the right!<p>",
  "responseTemplate": null,
  "afterText": "",
  "startCommands": [
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": false,
  "submissibilityInspector": null,
  "submissibilityCriterion": null,
  "triggeredCommands": [
  ],
  "responseInspector": null,
  "reactions": [
  ],
  "defaultNextStep": null,
  "isFinalStep": true,
  "shouldAutoAdvancePage": false,
  "submitButtonShouldBeVisible": true,
  "submitButtonTitle": "I saw it!"
};
steps.push(step);

Smartgraphs.mockResponses["/backend/activity/new-step/page/1/steps"] = steps;



// ActivityStep list urls for the ActivityPages in first Activity
// generated on the console by running:
//   Smartgraphs.addStepListUrlsToPages()
//   Smartgraphs.generateStepListMockResponses()

// later:
//   Smartgraphs.addListUrlsToSteps()
//   Smartgraphs.generateStepListMockResponses()

Smartgraphs.mockResponses["/backend/activity/1/page/1/steps"] = 
[
  {
    "url": "/backend/activity/1/page/1/step/1",
    "activityPage": "/backend/activity/1/page/1",
    "beforeText": "",
    "responseTemplate": null,
    "afterText": "",
    "buttons": [
      
    ],
    "triggerResponses": [
      "/backend/activity/1/page/1/step/1/response/1/step-beginning"
    ],
    "submitButtonShouldBeVisible": false,
    "submitButtonTitle": "",
    "triggerResponseListUrl": "/backend/activity/1/page/1/step/1/trigger_responses",
    "commandListUrl": "/backend/activity/1/page/1/step/1/commands"
  }
];

Smartgraphs.mockResponses["/backend/activity/1/page/2/steps"] = 
[
  {
    "url": "/backend/activity/1/page/2/step/1",
    "activityPage": "/backend/activity/1/page/2",
    "beforeText": "<p>In the top-right area, draw a graph of someone walking at a slow, steady pace from point A to point B between 0 and 15 seconds.</p>",
    "responseTemplate": null,
    "afterText": "",
    "buttons": [
      
    ],
    "triggerResponses": [
      "/backend/activity/1/page/2/step/1/response/1/step-beginning",
      "/backend/activity/1/page/2/step/1/response/2/step-submitted"
    ],
    "submitButtonShouldBeVisible": true,
    "submitButtonTitle": "Done",
    "triggerResponseListUrl": "/backend/activity/1/page/2/step/1/trigger_responses",
    "commandListUrl": "/backend/activity/1/page/2/step/1/commands"
  },
  {
    "url": "/backend/activity/1/page/2/step/2",
    "activityPage": "/backend/activity/1/page/2",
    "beforeText": "<p>In the bottom-right area, draw a graph of someone walking at a slow, steady pace from point B to point A between 0 and 15 seconds. Click Next when you are ready.</p>",
    "responseTemplate": null,
    "afterText": "",
    "buttons": [
      
    ],
    "triggerResponses": [
      "/backend/activity/1/page/2/step/2/response/1/step-beginning"
    ],
    "submitButtonShouldBeVisible": true,
    "submitButtonTitle": "Done",
    "triggerResponseListUrl": "/backend/activity/1/page/2/step/2/trigger_responses",
    "commandListUrl": "/backend/activity/1/page/2/step/2/commands"
  }
];

Smartgraphs.mockResponses["/backend/activity/1/page/3/steps"] = 
[
  {
    "url": "/backend/activity/1/page/3/step/1",
    "activityPage": "/backend/activity/1/page/3",
    "beforeText": "<p>Place the sensor at the 0-meter mark. Stand near the sensor. When you are ready, have your partner click Start to record the position and time data for your movements. Walk on the path for 15 seconds. Experiment with different kinds of motions (walking fast, slow, forward, backward\u2026) Click Stop after 15 seconds is up. Click Reset to try a different movement.</p>",
    "responseTemplate": null,
    "afterText": "",
    "buttons": [
      
    ],
    "triggerResponses": [
      "/backend/activity/1/page/3/step/1/response/1/step-beginning",
      "/backend/activity/1/page/3/step/1/response/2/step-submitted"
    ],
    "submitButtonShouldBeVisible": true,
    "submitButtonTitle": "Done",
    "triggerResponseListUrl": "/backend/activity/1/page/3/step/1/trigger_responses",
    "commandListUrl": "/backend/activity/1/page/3/step/1/commands"
  },
  {
    "url": "/backend/activity/1/page/3/step/2",
    "activityPage": "/backend/activity/1/page/3",
    "beforeText": "<p>How are different motions represented on a position-time graph? (For example, what does the graph look like when you are standing still, walking forward ...?)</p><p>Try to use some of the following words: slope, flat, upward, downward, curved, straight, steep, gradual, line, curve.",
    "responseTemplate": "/backend/response-template/2/open",
    "afterText": "",
    "buttons": [
      
    ],
    "triggerResponses": [
      "/backend/activity/1/page/3/step/2/response/1/step-beginning"
    ],
    "submitButtonShouldBeVisible": true,
    "submitButtonTitle": "Submit My Answer",
    "triggerResponseListUrl": "/backend/activity/1/page/3/step/2/trigger_responses",
    "commandListUrl": "/backend/activity/1/page/3/step/2/commands"
  }
];

Smartgraphs.mockResponses["/backend/activity/1/page/4/steps"] = 
[
  {
    "url": "/backend/activity/1/page/4/step/1",
    "activityPage": "/backend/activity/1/page/3",
    "beforeText": "<p>At right is your prediction and your actual motion, together</p>",
    "responseTemplate": null,
    "afterText": "",
    "buttons": [
      
    ],
    "triggerResponses": [
      "/backend/activity/1/page/4/step/1/response/1/step-beginning"
    ],
    "submitButtonShouldBeVisible": false,
    "submitButtonTitle": "",
    "triggerResponseListUrl": "/backend/activity/1/page/4/step/1/trigger_responses",
    "commandListUrl": "/backend/activity/1/page/4/step/1/commands"
  }
];


// we can add individual step urls later if needed.

Smartgraphs.mockResponses["/backend/activity/2/page/1/step/1"] = 
{
  "url": "/backend/activity/2/page/1/step/1",
  "activityPage": "/backend/activity/2/page/1",
  "beforeText": "<p>Try visiting the first activity by changing just the last digit of the URL from '2' to '1' and hitting Enter.<p>" + "<p>Also, observe that you can resize the browser window without scrambling the prediction graph on the right.</p>",
  "responseTemplate": null,
  "afterText": "",
  "buttons": [
    
  ],
  "triggerResponses": [
    "/backend/activity/2/page/1/step/1/response/1/step-beginning"
  ],
  "submitButtonShouldBeVisible": false,
  "submitButtonTitle": "",
  "triggerResponseListUrl": "/backend/activity/2/page/1/step/1/trigger_responses",
  "commandListUrl": "/backend/activity/2/page/1/step/1/commands"
};

Smartgraphs.mockResponses["/backend/activity/2/page/1/steps"] = [
  Smartgraphs.mockResponses["/backend/activity/2/page/1/step/1"]
];
