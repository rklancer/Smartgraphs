// ==========================================================================
// Project:   Smartgraphs.ActivityStep mock server responses
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// @author    Dewi Win <dwin@concord.org> (activity text)
// ==========================================================================
/*globals Smartgraphs */

sc_require('data_sources/mock_responses/mock_responses');

var step, steps = [];


/****************************************************************************
*    Activity 1 (Moving Away and Toward)
*    Page 1
****************************************************************************/

step = Smartgraphs.mockResponses["/backend/activity/1/page/1/step/1"] = 
{
  "url": "/backend/activity/1/page/1/step/1",
  "activityPage": "/backend/activity/1/page/1",
  "initialPaneConfig": 'single',
  "singleGraph": null,
  "topGraph": null,
  "bottomGraph": null,
  "singleImage": sc_static("resources/arrow.jpg"),
  "topImage": null,
  "bottomImage": null,
  "beforeText": "",
  "responseTemplate": null,
  "afterText": "",
  "startCommands": [
  ],
  "shouldFinishImmediately": true,
  "shouldWaitForSubmissibleResponse": false,
  "submissibilityInspector": null,
  "submissibilityCriterion": null,
  "triggeredCommands": [
  ],
  "responseInspector": null,
  "responseBranches": [
  ],
  "defaultBranch": null,
  "isFinalStep": true,
  "shouldAutoAdvancePage": false,
  "submitButtonShouldBeVisible": false,
  "submitButtonTitle": ""
};
steps.push(step);

Smartgraphs.mockResponses["/backend/activity/1/page/1/steps"] = steps;


/****************************************************************************
*    Activity 1 (Moving Away and Toward)
*    Page 2
****************************************************************************/

steps = [];

step = Smartgraphs.mockResponses["/backend/activity/1/page/2/step/1"] =
{
  "url": "/backend/activity/1/page/2/step/1",
  "activityPage": "/backend/activity/1/page/2",
  "initialPaneConfig": 'split',
  "singleGraph": null,
  "topGraph": "/backend/activity/1/graph/1/prediction-away",
  "bottomGraph": null,
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText": 
    "<p>In the top-right area, draw a graph of someone walking at a slow, steady pace from point A to point B "+
    "between 0 and 15 seconds.</p>",
  "responseTemplate": null,
  "afterText": "",
  "startCommands": [
    { "action": "startFreehandInput",
      "literalArgs": {
        "pane": "top",
        "annotationName": "prediction-away"
      }
    }
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": false,
  "submissibilityInspector": null,
  "submissibilityCriterion": null,
  "triggeredCommands": [
  ],
  "responseInspector": null,
  "responseBranches": [
  ],
  "defaultBranch": "/backend/activity/1/page/2/step/2",
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "submitButtonShouldBeVisible": true,
  "submitButtonTitle": "Done"
};
steps.push(step);

step = Smartgraphs.mockResponses["/backend/activity/1/page/2/step/2"] =
{
  "url": "/backend/activity/1/page/2/step/2",
  "activityPage": "/backend/activity/1/page/2",
  "initialPaneConfig": 'split',
  "singleGraph": null,
  "topGraph": "/backend/activity/1/graph/1/prediction-away",
  "bottomGraph": "/backend/activity/1/graph/2/prediction-toward",
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText": 
     "<p>In the bottom-right area, draw a graph of someone walking at a slow, steady pace from point B to point A "+
     "between 0 and 15 seconds. Click Next when you are ready.</p>",
  "responseTemplate": null,
  "afterText": "",
  "startCommands": [
    { "action": "startFreehandInput",
      "literalArgs": {
        "pane": "bottom",
        "annotationName": "prediction-toward"
      }
    }
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": false,
  "submissibilityInspector": null,
  "submissibilityCriterion": null,
  "triggeredCommands": [
  ],
  "responseInspector": null,
  "responseBranches": [
  ],
  "defaultBranch": null,
  "isFinalStep": true,
  "shouldAutoAdvancePage": false,
  "submitButtonShouldBeVisible": true,
  "submitButtonTitle": "Done"
};
steps.push(step);

Smartgraphs.mockResponses["/backend/activity/1/page/2/steps"] = steps;


/****************************************************************************
*    Activity 1 (Moving Away and Toward)
*    Page 3
****************************************************************************/

steps = [];

step = Smartgraphs.mockResponses["/backend/activity/1/page/3/step/1"] = 
{
  "url": "/backend/activity/1/page/3/step/1",
  "activityPage": "/backend/activity/1/page/3",
  "initialPaneConfig": 'split',
  "singleGraph": null,
  "topGraph": "/backend/activity/1/graph/3/sensor-playing",
  "bottomGraph": null,
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText":
     "<p>Place the sensor at the 0-meter mark. Stand near the sensor. When you are ready, have your partner click "+
     "Start to record the position and time data for your movements. Walk on the path for 15 seconds. Experiment "+
     "with different kinds of motions (walking fast, slow, forward, backward\u2026) Click Stop after 15 seconds is "+
     "up. Click Reset to try a different movement.</p>",
  "responseTemplate": null,
  "afterText": "",
  "startCommands": [
    { "action": "startSensorInput",  
      "literalArgs": {
        "pane": "top",
        "seriesName": "sensor-play"
      }
    }
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": false,
  "submissibilityInspector": null,
  "submissibilityCriterion": null,
  "triggeredCommands": [
  ],
  "responseInspector": null,
  "responseBranches": [
  ],
  "defaultBranch": "/backend/activity/1/page/3/step/2",
  "isFinalStep": true,
  "shouldAutoAdvancePage": false,
  "submitButtonShouldBeVisible": true,
  "submitButtonTitle": "Done"
};
steps.push(step);

step = Smartgraphs.mockResponses["/backend/activity/1/page/3/step/2"] = 
{
  "url": "/backend/activity/1/page/3/step/2",
  "activityPage": "/backend/activity/1/page/3",
  "initialPaneConfig": 'split',
  "singleGraph": null,
  "topGraph": "/backend/activity/1/graph/3/sensor-playing",
  "bottomGraph": null,
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText": 
     "<p>How are different motions represented on a position-time graph? (For example, what does the graph look "+
     "like when you are standing still, walking forward ...?)</p>"+
     "<p>Try to use some of the following words: slope, flat, upward, downward, curved, straight, steep, gradual, "+
     "line, curve.",
  "responseTemplate": "/backend/response-template/2/open",
  "afterText": "",
  "startCommands": [
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": true,
  "submissibilityInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "submissibilityCriterion": {
    "gt": [{ "length" : { "strip":  "value" }}, 0]
  },
  "triggeredCommands": [
  ],
  "responseInspector": null,
  "responseBranches": [
  ],
  "defaultBranch": null,
  "isFinalStep": true,
  "shouldAutoAdvancePage": false,
  "submitButtonShouldBeVisible": true,
  "submitButtonTitle": "Submit My Answer"
};
steps.push(step);

Smartgraphs.mockResponses["/backend/activity/1/page/3/steps"] = steps;


/****************************************************************************
*    Activity 1 (Moving Away and Toward)
*    Page 4
****************************************************************************/

steps = [];

step = Smartgraphs.mockResponses["/backend/activity/1/page/4/step/1"] = 
{
  "url": "/backend/activity/1/page/4/step/1",
  "activityPage": "/backend/activity/1/page/4",
  "initialPaneConfig": 'split',
  "singleGraph": null,
  "topGraph": '/backend/activity/1/graph/4/sensor-away',
  "bottomGraph": '/backend/activity/1/graph/5/sensor-toward',
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText": 
    "<p>First, <b>stand</b> close to the sensor, near the 0-meter mark.</p>"+
    "<p>When you are ready, have your partner <b>click Start</b> to record the position and time data for your "+
    "movements. <b>Walk</b> on the path at a slow, steady pace, away from the sensor, for 15 seconds. Click "+
    "<b>Stop</b> after 15 seconds are up.",
  "responseTemplate": "",
  "afterText": "",
  "startCommands": [
    { "action": "startSensorInput",  
      "literalArgs": {
        "pane": "top",
        "seriesName": "sensor-away"
      }
    }
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": false,
  "submissibilityInspector": null,
  "submissibilityCriterion": null,
  "triggeredCommands": [
  ],
  "responseInspector": null,
  "responseBranches": [
  ],
  "defaultBranch": "/backend/activity/1/page/4/step/2",
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "submitButtonShouldBeVisible": true,
  "submitButtonTitle": "Done"
};
steps.push(step);

step = Smartgraphs.mockResponses["/backend/activity/1/page/4/step/2"] = 
{
  "url": "/backend/activity/1/page/4/step/2",
  "activityPage": "/backend/activity/1/page/4",
  "initialPaneConfig": 'split',
  "singleGraph": null,
  "topGraph": '/backend/activity/1/graph/4/sensor-away',
  "bottomGraph": '/backend/activity/1/graph/5/sensor-toward',
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText": 
    "<p>To make the second graph, <b>stand</b> approximately 4 meters away from the sensor on the path. When you "+
    "are ready, have your partner click <b>Start</b> to record the position and time data for your movements. "+
    "<b>Walk</b> on the path at the same slow, steady pace, toward the sensor, for 15 seconds. Click <b>Stop</b> "+
    "after 15 seconds are up.",
  "responseTemplate": "",
  "afterText": "",
  "startCommands": [
    { "action": "startSensorInput",  
      "literalArgs": {
        "pane": "bottom",
        "seriesName": "sensor-toward"
      }
    }
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": false,
  "submissibilityInspector": null,
  "submissibilityCriterion": null,
  "triggeredCommands": [
  ],
  "responseInspector": null,
  "responseBranches": [
  ],
  "defaultBranch": "/backend/activity/1/page/4/step/3",
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "submitButtonShouldBeVisible": true,
  "submitButtonTitle": "Done"
};
steps.push(step);

step = Smartgraphs.mockResponses["/backend/activity/1/page/4/step/3"] = 
{
  "url": "/backend/activity/1/page/4/step/3",
  "activityPage": "/backend/activity/1/page/4",
  "initialPaneConfig": 'split',
  "singleGraph": null,
  "topGraph": '/backend/activity/1/graph/4/sensor-away',
  "bottomGraph": '/backend/activity/1/graph/5/sensor-toward',
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText": 
    "<p>How closely does the graph of your data match your original sketches?</p>",
  "responseTemplate": "/backend/response-template/2/open",
  "afterText": "",
  "startCommands": [
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": true,
  "submissibilityInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "submissibilityCriterion": {
    "gt": [{ "length" : { "strip":  "value" }}, 0]
  },
  "triggeredCommands": [
  ],
  "responseInspector": null,
  "responseBranches": [
  ],
  "defaultBranch": null,
  "isFinalStep": true,
  "shouldAutoAdvancePage": false,
  "submitButtonShouldBeVisible": true,
  "submitButtonTitle": "Submit My Answer"
};
steps.push(step);
Smartgraphs.mockResponses["/backend/activity/1/page/4/steps"] = steps;



/****************************************************************************
*    Activity 2 (Demo of Activity Switching)
*    Page 1
****************************************************************************/


steps = [];

step = Smartgraphs.mockResponses["/backend/activity/2/page/1/step/1"] = 
{
  "url": "/backend/activity/2/page/1/step/1",
  "activityPage": "/backend/activity/2/page/1",
  "initialPaneConfig": 'single',
  "singleGraph": "/backend/activity/1/graph/1/prediction-away",
  "topGraph": null,
  "bottomGraph": null,
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText": 
    "<p>Try visiting the first activity by changing just the last digit of the URL from '2' to '1' and hitting "+
    "Enter.<p>"+
    "<p>Also, you can now resize the browser window without scrambling the prediction graph on the right.</p>",
  "responseTemplate": "",
  "afterText": "",
  "startCommands": [
    { "action": "startFreehandInput",
      "literalArgs": {
        "pane": "top",
        "annotationName": "prediction-away"
      }
    }
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": false,
  "submissibilityInspector": null,
  "submissibilityCriterion": null,
  "triggeredCommands": [
  ],
  "responseInspector": null,
  "responseBranches": [
  ],
  "defaultBranch": null,
  "isFinalStep": true,
  "shouldAutoAdvancePage": false,
  "submitButtonShouldBeVisible": false,
  "submitButtonTitle": ""
};
steps.push(step);

Smartgraphs.mockResponses["/backend/activity/2/page/1/steps"] = steps;


/****************************************************************************
*    Activity 'new-step' (Testbed for activity step refactoring)
*    Page 1
****************************************************************************/

steps = [];

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
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "submissibilityCriterion": {
    "in": [{ "strip":  "value" }, ["one", "two"]] 
  },
  "triggeredCommands": [
  ],
  "responseInspector": {
    "type": "Smartgraphs.ResponseFieldsInspector",
    "config": {
      "fieldIndex": 0
    }
  },
  "responseBranches": [
    { "criterion": { 
        "equals": [ {"strip" : "value" }, "one" ] 
      },
      "step": "/backend/activity/new-step/page/1/step/2"
    },
    { "criterion": { 
        "equals": [ {"strip" : "value" }, "two" ] 
      },
      "step": "/backend/activity/new-step/page/1/step/3"
    }
  ],
  "defaultBranch": null,
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
  "responseBranches": [
  ],
  "defaultBranch": null,
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
  "responseBranches": [
  ],
  "defaultBranch": null,
  "isFinalStep": true,
  "shouldAutoAdvancePage": false,
  "submitButtonShouldBeVisible": true,
  "submitButtonTitle": "I saw it!"
};
steps.push(step);

Smartgraphs.mockResponses["/backend/activity/new-step/page/1/steps"] = steps;