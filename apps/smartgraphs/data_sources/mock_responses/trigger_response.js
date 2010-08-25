// ==========================================================================
// Project:   Smartgraphs.TriggerResponse mock server responses
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('data_sources/mock_responses/mock_responses');

// generated on the console by running:
//   Smartgraphs.addListUrlsToSteps()
//   Smartgraphs.generateTriggerResponseMockResponses()

Smartgraphs.mockResponses["/backend/activity/1/page/1/step/1/trigger_responses"] = 
[{"url":"/backend/activity/1/page/1/step/1/response/1/step-beginning","trigger":"/backend/trigger/1/step-beginning","step":"/backend/activity/1/page/1/step/1","args":{},"commands":["/backend/activity/1/page/1/step/1/response/1/command/1/single-pane","/backend/activity/1/page/1/step/1/response/1/command/2/show-image","/backend/activity/1/page/1/step/1/response/1/command/3/finish-step"]}];

Smartgraphs.mockResponses["/backend/activity/1/page/2/step/1/trigger_responses"] = 
[{"url":"/backend/activity/1/page/2/step/1/response/1/step-beginning","trigger":"/backend/trigger/1/step-beginning","step":"/backend/activity/1/page/2/step/1","args":{},"commands":["/backend/activity/1/page/2/step/1/response/1/command/1/split-pane","/backend/activity/1/page/2/step/1/response/1/command/2/show-graph","/backend/activity/1/page/2/step/1/response/1/command/3/predict"]},{"url":"/backend/activity/1/page/2/step/1/response/2/step-finished","trigger":"/backend/trigger/3/step-finished","step":"/backend/activity/1/page/2/step/1","args":{},"commands":["/backend/activity/1/page/2/step/1/response/2/command/1/goto-step-2"]}];

Smartgraphs.mockResponses["/backend/activity/1/page/2/step/2/trigger_responses"] = 
[{"url":"/backend/activity/1/page/2/step/2/response/1/step-beginning","trigger":"/backend/trigger/1/step-beginning","step":"/backend/activity/1/page/2/step/2","args":{},"commands":["/backend/activity/1/page/2/step/2/response/1/command/1/show-graph","/backend/activity/1/page/2/step/2/response/1/command/2/predict"]}];

Smartgraphs.mockResponses["/backend/activity/1/page/3/step/1/trigger_responses"] = 
[{"url":"/backend/activity/1/page/3/step/1/response/1/step-beginning","trigger":"/backend/trigger/1/step-beginning","step":"/backend/activity/1/page/3/step/1","args":{},"commands":["/backend/activity/1/page/3/step/1/response/1/command/1/show-graph","/backend/activity/1/page/3/step/1/response/1/command/2/hide-pane","/backend/activity/1/page/3/step/1/response/1/command/3/enable-submission","/backend/activity/1/page/3/step/1/response/1/command/4/start-sensor"]},{"url":"/backend/activity/1/page/3/step/1/response/2/step-finished","trigger":"/backend/trigger/3/step-finished","step":"/backend/activity/1/page/3/step/1","args":{},"commands":["/backend/activity/1/page/3/step/1/response/2/command/1/goto-step-2"]}];

Smartgraphs.mockResponses["/backend/activity/1/page/3/step/2/trigger_responses"] = 
[{"url":"/backend/activity/1/page/3/step/2/response/1/step-beginning","trigger":"/backend/trigger/1/step-beginning","step":"/backend/activity/1/page/3/step/2","args":{},"commands":["/backend/activity/1/page/3/step/2/response/1/command/1/wait-for-valid-response"]}];

Smartgraphs.mockResponses["/backend/activity/1/page/4/step/1/trigger_responses"] = 
[{"url":"/backend/activity/1/page/4/step/1/response/1/step-beginning","trigger":"/backend/trigger/1/step-beginning","step":"/backend/activity/1/page/4/step/1","args":{},"commands":["/backend/activity/1/page/4/step/1/response/1/command/1/hide-pane","/backend/activity/1/page/4/step/1/response/1/command/2/show-graph"]}];


// hand-generated for second activity

Smartgraphs.mockResponses["/backend/activity/2/page/1/step/1/response/1/step-beginning"] = 
{
  "url":       "/backend/activity/2/page/1/step/1/response/1/step-beginning",
  "trigger":   "/backend/trigger/1/step-beginning",
  "step":      "/backend/activity/2/page/1/step/1",
  "args":      {},
  "commands":  [
    "/backend/activity/2/page/1/step/1/response/1/command/1/single-pane",
    "/backend/activity/2/page/1/step/1/response/1/command/2/show-graph",
    "/backend/activity/2/page/1/step/1/response/1/command/3/predict"
  ]
};

Smartgraphs.mockResponses["/backend/activity/2/page/1/step/1/trigger_responses"] = [
  Smartgraphs.mockResponses["/backend/activity/2/page/1/step/1/response/1/step-beginning"]
];

