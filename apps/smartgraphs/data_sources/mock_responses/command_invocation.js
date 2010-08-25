// ==========================================================================
// Project:   Smartgraphs.CommandInvocation mock server responses
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('data_sources/mock_responses/mock_responses');

// generated on the console by running:
//   Smartgraphs.addListUrlsToSteps()
//   Smartgraphs.generateCommandInvocationMockResponses()

Smartgraphs.mockResponses["/backend/activity/1/page/1/step/1/commands"] = 
[{"url":"/backend/activity/1/page/1/step/1/response/1/command/1/single-pane","command":"/backend/command/1/show-single-pane","triggerResponse":"/backend/activity/1/page/1/step/1/response/1/step-beginning","index":1,"literalArgs":{},"substitutedArgs":{}},{"url":"/backend/activity/1/page/1/step/1/response/1/command/2/show-image","command":"/backend/command/3/show-image","triggerResponse":"/backend/activity/1/page/1/step/1/response/1/step-beginning","index":2,"literalArgs":{"path":"/static/smartgraphs/en/current/resources/arrow.jpg?1281156420"},"substitutedArgs":{}},{"url":"/backend/activity/1/page/1/step/1/response/1/command/3/finish-step","command":"/backend/command/6/finish-step","triggerResponse":"/backend/activity/1/page/1/step/1/response/1/step-beginning","index":3,"literalArgs":{},"substitutedArgs":{}}];

Smartgraphs.mockResponses["/backend/activity/1/page/2/step/1/commands"] = 
[{"url":"/backend/activity/1/page/2/step/1/response/1/command/1/split-pane","command":"/backend/command/2/show-split-pane","triggerResponse":"/backend/activity/1/page/2/step/1/response/1/step-beginning","index":1,"literalArgs":{},"substitutedArgs":{}},{"url":"/backend/activity/1/page/2/step/1/response/1/command/2/show-graph","command":"/backend/command/4/show-graph","triggerResponse":"/backend/activity/1/page/2/step/1/response/1/step-beginning","index":3,"literalArgs":{"pane":"top","graphId":"/backend/activity/1/graph/1/prediction-away"},"substitutedArgs":{}},{"url":"/backend/activity/1/page/2/step/1/response/1/command/3/predict","command":"/backend/command/7/enable-prediction-input","triggerResponse":"/backend/activity/1/page/2/step/1/response/1/step-beginning","index":3,"literalArgs":{"pane":"top","seriesName":"prediction-away","xMin":0,"xMax":15},"substitutedArgs":{}},{"url":"/backend/activity/1/page/2/step/1/response/2/command/1/goto-step-2","command":"/backend/command/8/goto-step","triggerResponse":"/backend/activity/1/page/2/step/1/response/2/step-finished","index":1,"literalArgs":{"stepId":"/backend/activity/1/page/2/step/2"},"substitutedArgs":{}}];

Smartgraphs.mockResponses["/backend/activity/1/page/2/step/2/commands"] = 
[{"url":"/backend/activity/1/page/2/step/2/response/1/command/1/show-graph","command":"/backend/command/4/show-graph","triggerResponse":"/backend/activity/1/page/2/step/2/response/1/step-beginning","index":1,"literalArgs":{"pane":"bottom","graphId":"/backend/activity/1/graph/2/prediction-toward"},"substitutedArgs":{}},{"url":"/backend/activity/1/page/2/step/2/response/1/command/2/predict","command":"/backend/command/7/enable-prediction-input","triggerResponse":"/backend/activity/1/page/2/step/2/response/1/step-beginning","index":2,"literalArgs":{"pane":"bottom","seriesName":"prediction-toward","xMin":0,"xMax":15},"substitutedArgs":{}}];

Smartgraphs.mockResponses["/backend/activity/1/page/3/step/1/commands"] = 
[{"url":"/backend/activity/1/page/3/step/1/response/1/command/1/show-graph","command":"/backend/command/4/show-graph","triggerResponse":"/backend/activity/1/page/3/step/1/response/1/step-beginning","index":1,"literalArgs":{"pane":"top","graphId":"/backend/activity/1/graph/3/sensor-playing"},"substitutedArgs":{}},{"url":"/backend/activity/1/page/3/step/1/response/1/command/2/hide-pane","command":"/backend/command/10/hide-pane","triggerResponse":"/backend/activity/1/page/3/step/1/response/1/step-beginning","index":2,"literalArgs":{"pane":"bottom"},"substitutedArgs":{}},{"url":"/backend/activity/1/page/3/step/1/response/1/command/3/enable-submission","command":"/backend/command/5/enable-submission","triggerResponse":"/backend/activity/1/page/3/step/1/response/1/step-beginning","index":3,"literalArgs":{},"substitutedArgs":{}},{"url":"/backend/activity/1/page/3/step/1/response/1/command/4/start-sensor","command":"/backend/command/9/enable-sensor-input","triggerResponse":"/backend/activity/1/page/3/step/1/response/1/step-beginning","index":4,"literalArgs":{"pane":"top","seriesName":"sensor"},"substitutedArgs":{}},{"url":"/backend/activity/1/page/3/step/1/response/2/command/1/goto-step-2","command":"/backend/command/8/goto-step","triggerResponse":"/backend/activity/1/page/3/step/1/response/2/step-finished","index":1,"literalArgs":{"stepId":"/backend/activity/1/page/3/step/2"},"substitutedArgs":{}}];

Smartgraphs.mockResponses["/backend/activity/1/page/3/step/2/commands"] = 
[{"url":"/backend/activity/1/page/3/step/2/response/1/command/1/wait-for-valid-response","command":"/backend/command/11/wait-for-valid-response","triggerResponse":"/backend/activity/1/page/3/step/2/response/1/step-beginning","index":1,"literalArgs":{},"substitutedArgs":{}}];

Smartgraphs.mockResponses["/backend/activity/1/page/4/step/1/commands"] = 
[{"url":"/backend/activity/1/page/4/step/1/response/1/command/1/hide-pane","command":"/backend/command/10/hide-pane","triggerResponse":"/backend/activity/1/page/4/step/1/response/1/step-beginning","index":1,"literalArgs":{"pane":"bottom"},"substitutedArgs":{}},{"url":"/backend/activity/1/page/4/step/1/response/1/command/2/show-graph","command":"/backend/command/4/show-graph","triggerResponse":"/backend/activity/1/page/4/step/1/response/1/step-beginning","index":2,"literalArgs":{"pane":"top","graphId":"/backend/activity/1/graph/4/combined"},"substitutedArgs":{}}];



// hand-generated for second activity

var commandList = [];
var command = {
  "url":              "/backend/activity/2/page/1/step/1/response/1/command/1/single-pane",
  "command":          "/backend/command/1/show-single-pane",
  "triggerResponse":  "/backend/activity/2/page/1/step/1/response/1/step-beginning",
  "index":            1,
  "literalArgs":      {},
  "substitutedArgs":  {}
};

Smartgraphs.mockResponses["/backend/activity/2/page/1/step/1/response/1/command/1/single-pane"] = command;
commandList.push(command);

command = {
  "url":              "/backend/activity/2/page/1/step/1/response/1/command/2/show-graph",
  "command":          "/backend/command/4/show-graph",
  "triggerResponse":  "/backend/activity/2/page/1/step/1/response/1/step-beginning",
  "index":            2,
  "literalArgs":      {"pane": "single", "graphId": "/backend/activity/1/graph/1/prediction-away"},
  "substitutedArgs":{}
};

Smartgraphs.mockResponses["/backend/activity/2/page/1/step/1/response/1/command/2/show-graph"] = command;
commandList.push(command);

command = {
  "url":              "/backend/activity/2/page/1/step/1/response/1/command/3/predict",
  "command":          "/backend/command/7/enable-prediction-input",
  "triggerResponse":  "/backend/activity/2/page/1/step/1/response/1/step-beginning",
  "index":            3,
  "literalArgs":      {"pane":"single", "seriesName":"prediction-away", "xMin":0, "xMax":15},
  "substitutedArgs":  {}
};

Smartgraphs.mockResponses["/backend/activity/2/page/1/step/1/response/1/command/3/predict"]  = command;
commandList.push(command);

Smartgraphs.mockResponses["/backend/activity/2/page/1/step/1/commands"] = commandList;
