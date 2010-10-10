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
*    Activity 2 (Maria's Run)
*    Page 1
****************************************************************************/

step = Smartgraphs.mockResponses["/backend/activity/2/page/1/step/1"] = 
{
  "url": "/backend/activity/2/page/1/step/1",
  "activityPage": "/backend/activity/2/page/1",
  "paneConfig": "single",
  "panes" : {
    "single": { type: "image", path: sc_static("resources/walking_path.jpg") }
  },
  "beforeText": 
    "<p>In this activity, when you see the 'Next Page >>' button turned on, you can go to the next page.</p>" +
    "<p>Go ahead and click on the Next Page button now to see the next page.<p>",
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
  "hideSubmitButton": true,
  "submitButtonTitle": "",
  "nextButtonShouldSubmit": false
};
steps.push(step);

Smartgraphs.mockResponses["/backend/activity/2/page/1/steps"] = steps;


/****************************************************************************
*    Activity 2 (Maria's Run)
*    Page 2
****************************************************************************/

steps = [];

step = Smartgraphs.mockResponses["/backend/activity/2/page/2/step/1"] = 
{
  "url": "/backend/activity/2/page/2/step/1",
  "activityPage": "/backend/activity/2/page/1",
  "paneConfig": "split",
  "panes": {
    "top":    { "type": "graph", "name": "sensor-playing" },
    "bottom": null 
  },
  "beforeText":
    "<p>How are your motions represented in the position versus time graph? " +
    "(For example, what does the graph look like when you are standing still?)</p>",
  "responseTemplate": '/backend/response-template/2/open',
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
  "defaultBranch": "",
  "isFinalStep": true,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": true,
  "submitButtonTitle": "",
  "nextButtonShouldSubmit": true
};
steps.push(step);

Smartgraphs.mockResponses["/backend/activity/2/page/2/steps"] = steps;


/****************************************************************************
*    Activity 2 (Maria's Run)
*    Page 3
****************************************************************************/

steps = [];

step = Smartgraphs.mockResponses["/backend/activity/2/page/3/step/1"] = 
{
  "url": "/backend/activity/2/page/3/step/1",
  "activityPage": "/backend/activity/2/page/3",
  "paneConfig": "split",
  "panes": {
    "top": { "type": "graph", "name": "two-speeds" },
    "bottom": null
  },
  "beforeText":
    "<p>How are the two different speeds represented in the position versus time graph?</p>",
  "responseTemplate": '/backend/response-template/2/open',
  "afterText": "",
  "startCommands": [
    { "action": "startSensorInput",
      "literalArgs": {
        "pane": "top",
        "seriesName": "two-speeds"
      }
    }
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
  "defaultBranch": "",
  "isFinalStep": true,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": true,
  "submitButtonTitle": "",
  "nextButtonShouldSubmit": true
};
steps.push(step);

Smartgraphs.mockResponses["/backend/activity/2/page/3/steps"] = steps;


/****************************************************************************
*    Activity 2 (Maria's Run)
*    Page 4
****************************************************************************/

steps = [];

step = Smartgraphs.mockResponses["/backend/activity/2/page/4/step/1"] = 
{
  "url": "/backend/activity/2/page/4/step/1",
  "activityPage": "/backend/activity/2/page/4",
  "paneConfig": "split",
  "panes": {
    "top": { "type": "graph", "name": "start-stop-start" },
    "bottom": null
  },
  "beforeText":
      "<p>What do you notice about the <b>steepness</b> of the three different segments during each of the motions?</p>",
  "responseTemplate": '/backend/response-template/2/open',
  "afterText": "",
  "startCommands": [
    { "action": "startSensorInput",
      "literalArgs": {
        "pane": "top",
        "seriesName": "start-stop-start"
      }
    }
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
  "defaultBranch": "",
  "isFinalStep": true,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": true,
  "submitButtonTitle": "",
  "nextButtonShouldSubmit": true
};
steps.push(step);

Smartgraphs.mockResponses["/backend/activity/2/page/4/steps"] = steps;

/****************************************************************************
*    Activity 2 (Maria's Run)
*    Page 5
****************************************************************************/

steps = [];

step = Smartgraphs.mockResponses["/backend/activity/2/page/5/step/1"] = 
{
  "url": "/backend/activity/2/page/5/step/1",
  "activityPage": "/backend/activity/2/page/5",
  "paneConfig": "split",
  "panes": {
    "top": { "type": "graph", "name": "maria" },
    "bottom": null
  },
  "beforeText":
      "<p>Click the point in the graph that shows when and where Maria might have first stopped to talk to her coach.</p>",
  "responseTemplate": "",
  "afterText": "",
  "startCommands": [],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": true,
  "submissibilityInspector": {
    "type": "Smartgraphs.SelectedPointInspector",
    "config": { "pane": "top", "series": "maria" }
  },
  "submissibilityCriterion": {
    "notempty": "value"
  },
  "triggeredCommands": [
  ],
  "responseInspector": {
    "type": "Smartgraphs.SelectedPointInspector",
    "config": { "pane": "top", "series": "maria" }
  },
  "responseBranches": [
    { "criterion": { 
        "equals": [{"xvalue": "value"}, 4]
      },
      "step": "/backend/activity/2/page/5/step/6"
    }
  ],
  "defaultBranch": "/backend/activity/2/page/5/step/2",
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": false
};
steps.push(step);

step = Smartgraphs.mockResponses["/backend/activity/2/page/5/step/2"] = 
{
  "url": "/backend/activity/2/page/5/step/2",
  "activityPage": "/backend/activity/2/page/5",
  "paneConfig": "split",
  "panes": {
    "top": { "type": "graph", "name": "maria" },
    "bottom": null
  },
  "beforeText":
    "<p>Incorrect.</p>" +
    "<p><b>Hint 1</b>: Look at the graph and table and find where Maria’s position <b>stayed the same.</b></p>" +
    "<p>Try again. Click the first point in the graph that shows when and where Maria might have stopped to talk " +
    "to her coach.</p>",
  "responseTemplate": "",
  "afterText": "",
  "startCommands": [],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": true,
  "submissibilityInspector": {
    "type": "Smartgraphs.SelectedPointInspector",
    "config": { "pane": "top", "series": "maria" }
  },
  "submissibilityCriterion": {
    "notempty": "value"
  },
  "triggeredCommands": [
  ],
  "responseInspector": {
    "type": "Smartgraphs.SelectedPointInspector",
    "config": { "pane": "top", "series": "maria" }
  },
  "responseBranches": [
    { "criterion": { 
        "equals": [{"xvalue": "value"}, 4]
      },
      "step": "/backend/activity/2/page/5/step/6"
    }
  ],
  "defaultBranch": "/backend/activity/2/page/5/step/3",
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": false
};
steps.push(step);

step = Smartgraphs.mockResponses["/backend/activity/2/page/5/step/3"] = 
{
  "url": "/backend/activity/2/page/5/step/3",
  "activityPage": "/backend/activity/2/page/5",
  "paneConfig": "split",
  "panes": {
    "top": { "type": "graph", "name": "maria" },
    "bottom": null
  },
  "beforeText":
    "<p>Incorrect.</p>" +
    "<p><b>Hint 2</b>: In these two intervals, Maria’s position <b>changed</b> as time passed.</b></p>" +
    "<p>Try again. Click the first point in the graph that shows when and where Maria might have stopped to talk " +
    "to her coach.</p>",
  "responseTemplate": "",
  "afterText": "",
  "startCommands": [],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": true,
  "submissibilityInspector": {
    "type": "Smartgraphs.SelectedPointInspector",
    "config": { "pane": "top", "series": "maria" }
  },
  "submissibilityCriterion": {
    "notempty": "value"
  },
  "triggeredCommands": [
  ],
  "responseInspector": {
    "type": "Smartgraphs.SelectedPointInspector",
    "config": { "pane": "top", "series": "maria" }
  },
  "responseBranches": [
    { "criterion": { 
        "equals": [{"xvalue": "value"}, 4]
      },
      "step": "/backend/activity/2/page/5/step/6"
    }
  ],
  "defaultBranch": "/backend/activity/2/page/5/step/4",
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": false
};
steps.push(step);

step = Smartgraphs.mockResponses["/backend/activity/2/page/5/step/4"] = 
{
  "url": "/backend/activity/2/page/5/step/4",
  "activityPage": "/backend/activity/2/page/5",
  "paneConfig": "split",
  "panes": {
    "top": { "type": "graph", "name": "maria" },
    "bottom": null
  },
  "beforeText":
    "<p><b>Hint 3</b>: In this interval, Maria’s position <b>stayed the same</b> as time passed.</b></p>" +
    "<p>Try again. Click the first point in the graph that shows when and where Maria might have stopped to talk " +
    "to her coach.</p>",
  "responseTemplate": "",
  "afterText": "",
  "startCommands": [],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": true,
  "submissibilityInspector": {
    "type": "Smartgraphs.SelectedPointInspector",
    "config": { "pane": "top", "series": "maria" }
  },
  "submissibilityCriterion": {
    "notempty": "value"
  },
  "triggeredCommands": [
  ],
  "responseInspector": {
    "type": "Smartgraphs.SelectedPointInspector",
    "config": { "pane": "top", "series": "maria" }
  },
  "responseBranches": [
    { "criterion": { 
        "equals": [{"xvalue": "value"}, 4]
      },
      "step": "/backend/activity/2/page/5/step/6"
    }
  ],
  "defaultBranch": "/backend/activity/2/page/5/step/5",
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": false
};
steps.push(step);

step = Smartgraphs.mockResponses["/backend/activity/2/page/5/step/5"] = 
{
  "url": "/backend/activity/2/page/5/step/5",
  "activityPage": "/backend/activity/2/page/5",
  "paneConfig": "split",
  "panes": {
    "top": { "type": "graph", "name": "maria" },
    "bottom": null
  },
  "beforeText":
    "<p>If you look carefully, you’ll see that between four and six minutes, Maria’s position did not change, " +
    "meaning that she stopped at four minutes.</p>" +
    "<p>Click Next Page >> when you are ready.</p>",
  "responseTemplate": "",
  "afterText": "",
  "startCommands": [],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": false,
  "submissibilityInspector": null,
  "submissibilityCriterion": null,
  "triggeredCommands": [
  ],
  "responseInspector": null,
  "responseBranches": [],
  "defaultBranch": "",
  "isFinalStep": true,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": true,
  "submitButtonTitle": "",
  "nextButtonShouldSubmit": true
};
steps.push(step);

step = Smartgraphs.mockResponses["/backend/activity/2/page/5/step/6"] = 
{
  "url": "/backend/activity/2/page/5/step/6",
  "activityPage": "/backend/activity/2/page/5",
  "paneConfig": "split",
  "panes": {
    "top": { "type": "graph", "name": "maria" },
    "bottom": null
  },
  "beforeText":
    "<p>Correct! Four minutes into her run, Maria’s distance stayed the same compared to the next few minutes, " +
    "meaning she stopped running.</p>" +
    "<p>Click Next Page >> when you are ready.</p>",
  "responseTemplate": "",
  "afterText": "",
  "startCommands": [],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": true,
  "submissibilityInspector": null,
  "submissibilityCriterion": null,
  "triggeredCommands": [
  ],
  "responseInspector": null,
  "responseBranches": [],
  "defaultBranch": "",
  "isFinalStep": true,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": true,
  "submitButtonTitle": "",
  "nextButtonShouldSubmit": true
};
steps.push(step);

Smartgraphs.mockResponses["/backend/activity/2/page/5/steps"] = steps;


/****************************************************************************
*    Activity 2 (Maria's Run)
*    Page 6
****************************************************************************/

steps = [];

step = Smartgraphs.mockResponses["/backend/activity/2/page/6/step/1"] = 
{
  "url": "/backend/activity/2/page/6/step/1",
  "activityPage": "/backend/activity/2/page/6",
  "paneConfig": "split",
  "panes": {
    "top": { "type": "graph", "name": "maria" },
    "bottom": null
  },
  "beforeText":
      "<p>How many meters did Maria run before she stopped to talk to her coach?</p>",
  "responseTemplate": "/backend/response-template/1/numeric",
  "afterText": "",
  "startCommands": [],
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
  "responseInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "responseBranches": [
    { "criterion": { 
        "equals": [{"int": "value"}, 800]
      },
      "step": "/backend/activity/2/page/6/step/6"
    }
  ],
  "defaultBranch": "/backend/activity/2/page/6/step/2",
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": false
};
steps.push(step);

step = Smartgraphs.mockResponses["/backend/activity/2/page/6/step/2"] = 
{
  "url": "/backend/activity/2/page/6/step/2",
  "activityPage": "/backend/activity/2/page/6",
  "paneConfig": "split",
  "panes": {
    "top": { "type": "graph", "name": "maria" },
    "bottom": null
  },
  "beforeText":
    "<p>Incorrect.</p>" +
    "<p><b>Hint 1</b>: Look at the data and find how many minutes passed <b>before</b> Maria stopped.</p>" +
    "<p>Try again. How many meters did Maria run before she stopped to talk to her coach?</p>",
  "responseTemplate": "/backend/response-template/1/numeric",
  "afterText": "",
  "startCommands": [],
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
  "responseInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "responseBranches": [
    { "criterion": { 
        "equals": [{"int": "value"}, 800]
      },
      "step": "/backend/activity/2/page/6/step/6"
    }
  ],
  "defaultBranch": "/backend/activity/2/page/6/step/3",
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": false
};
steps.push(step);

step = Smartgraphs.mockResponses["/backend/activity/2/page/6/step/3"] = 
{
  "url": "/backend/activity/2/page/6/step/3",
  "activityPage": "/backend/activity/2/page/6",
  "paneConfig": "split",
  "panes": {
    "top": { "type": "graph", "name": "maria" },
    "bottom": null
  },
  "beforeText":
    "<p>Incorrect.</p>" +
    "<p><b>Hint 2</b>: Here is where Maria stopped. Find her position from the start of the track.</p>" +
    "<p>Try again. How many meters did Maria run before she stopped to talk to her coach?</p>",
  "responseTemplate": "/backend/response-template/1/numeric",
  "afterText": "",
  "startCommands": [
    { "action": "addAnnotation",
      "literalArgs": {
        "pane": "top",
        "type": "Smartgraphs.HighlightedPoint",
        "name": "where-maria-stopped"
      }
    }
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
  "responseInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "responseBranches": [
    { "criterion": { 
        "equals": [{"int": "value"}, 800]
      },
      "step": "/backend/activity/2/page/6/step/6"
    }
  ],
  "defaultBranch": "/backend/activity/2/page/6/step/4",
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": false
};
steps.push(step);

step = Smartgraphs.mockResponses["/backend/activity/2/page/6/step/4"] = 
{
  "url": "/backend/activity/2/page/6/step/4",
  "activityPage": "/backend/activity/2/page/6",
  "paneConfig": "split",
  "panes": {
    "top": { "type": "graph", "name": "maria" },
    "bottom": null
  },
  "beforeText":
    "<p>Incorrect.</p>" +    
    "<p><b>Hint 3</b>: Here is where Maria stopped. Find her position from the start of the track.</p>" +
    "<p>Try again. Find the y value (position) of this point?</p>",
  "responseTemplate": "/backend/response-template/1/numeric",
  "afterText": "",
  "startCommands": [
    { "action": "addAnnotation",
      "literalArgs": {
        "pane": "top",
        "type": "Smartgraphs.HighlightedPoint",
        "name": "where-maria-stopped"
      }
    },
    { "action": "addAnnotation",
      "literalArgs": {
        "pane": "top",
        "type": "Smartgraphs.LineToAxis",
        "name": "where-maria-stopped-to-y-axis"
      }
    }
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
  "responseInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "responseBranches": [
    { "criterion": { 
        "equals": [{"int": "value"}, 800]
      },
      "step": "/backend/activity/2/page/6/step/6"
    }
  ],
  "defaultBranch": "/backend/activity/2/page/6/step/5",
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": false
};
steps.push(step);

step = Smartgraphs.mockResponses["/backend/activity/2/page/6/step/5"] = 
{
  "url": "/backend/activity/2/page/6/step/5",
  "activityPage": "/backend/activity/2/page/6",
  "paneConfig": "split",
  "panes": {
    "top": { "type": "graph", "name": "maria" },
    "bottom": null
  },
  "beforeText":
    "<p>Four minutes into her run, Maria stopped. At that point, Maria was 800 meters away from the start line.</p>" +
    "<p>Click Next Page >> when you are ready.</p>",
  "responseTemplate": null,
  "afterText": "",
  "startCommands": [],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": true,
  "submissibilityInspector": null,
  "submissibilityCriterion": null,
  "triggeredCommands": [
  ],
  "responseInspector": null,
  "responseBranches": [],
  "defaultBranch": "",
  "isFinalStep": true,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": true,
  "submitButtonTitle": "",
  "nextButtonShouldSubmit": true
};
steps.push(step);

step = Smartgraphs.mockResponses["/backend/activity/2/page/6/step/6"] = 
{
  "url": "/backend/activity/2/page/6/step/6",
  "activityPage": "/backend/activity/2/page/6",
  "paneConfig": "split",
  "panes": {
    "top": { "type": "graph", "name": "maria" },
    "bottom": null
  },
  "beforeText":
    "<p>Correct! Four minutes into her run, Maria stopped. At that point, " +
    "Maria’s was 800 meters away from the start line.</p>" +
    "<p>Click Next Page >> when you are ready.</p>",
  "responseTemplate": null,
  "afterText": "",
  "startCommands": [],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": true,
  "submissibilityInspector": null,
  "submissibilityCriterion": null,
  "triggeredCommands": [
  ],
  "responseInspector": null,
  "responseBranches": [],
  "defaultBranch": "",
  "isFinalStep": true,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": true,
  "submitButtonTitle": "",
  "nextButtonShouldSubmit": true
};
steps.push(step);

Smartgraphs.mockResponses["/backend/activity/2/page/6/steps"] = steps;


/****************************************************************************
*    Activity 2 (Maria's Run)
*    Page 7
****************************************************************************/

steps = [];

step = Smartgraphs.mockResponses["/backend/activity/2/page/7/step/1"] = 
{
  "url": "/backend/activity/2/page/7/step/1",
  "activityPage": "/backend/activity/2/page/7",
  "paneConfig": "split",
  "panes": {
    "top": { "type": "graph", "name": "maria" },
    "bottom": null
  },
  "beforeText":
      "<p>For how many minutes did Maria stop to talk to her coach?</p>",
  "responseTemplate": "/backend/response-template/1/numeric",
  "afterText": "",
  "startCommands": [],
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
  "responseInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "responseBranches": [
    { "criterion": { 
        "equals": [{"int": "value"}, 2]
      },
      "step": "/backend/activity/2/page/7/step/6"
    }
  ],
  "defaultBranch": "/backend/activity/2/page/7/step/2",
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": false
};
steps.push(step);

step = Smartgraphs.mockResponses["/backend/activity/2/page/7/step/2"] = 
{
  "url": "/backend/activity/2/page/7/step/2",
  "activityPage": "/backend/activity/2/page/7",
  "paneConfig": "split",
  "panes": {
    "top": { "type": "graph", "name": "maria" },
    "bottom": null
  },
  "beforeText":
    "<p>Incorrect.</p>" +  
    "<p><b>Hint 1</b>: Here is the interval when Maria’s distance stayed the same.</p>" +
    "<p>Try again. For how many minutes did Maria stop to talk to her coach?</p>",
  "responseTemplate": "/backend/response-template/1/numeric",
  "afterText": "",
  "startCommands": [],
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
  "responseInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "responseBranches": [
    { "criterion": { 
        "equals": [{"int": "value"}, 2]
      },
      "step": "/backend/activity/2/page/7/step/6"
    }
  ],
  "defaultBranch": "/backend/activity/2/page/7/step/3",
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": false
};
steps.push(step);

step = Smartgraphs.mockResponses["/backend/activity/2/page/7/step/3"] = 
{
  "url": "/backend/activity/2/page/7/step/3",
  "activityPage": "/backend/activity/2/page/7",
  "paneConfig": "split",
  "panes": {
    "top": { "type": "graph", "name": "maria" },
    "bottom": null
  },
  "beforeText":
    "<p>Incorrect.</p>" +    
    "<p><b>Hint 2</b>: How much time elapsed during this interval?</p>" +    
    "<p>Try again. For how many minutes did Maria stop to talk to her coach?</p>",
  "responseTemplate": "/backend/response-template/1/numeric",
  "afterText": "",
  "startCommands": [],
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
  "responseInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "responseBranches": [
    { "criterion": { 
        "equals": [{"int": "value"}, 2]
      },
      "step": "/backend/activity/2/page/7/step/6"
    }
  ],
  "defaultBranch": "/backend/activity/2/page/7/step/4",
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": false
};
steps.push(step);

step = Smartgraphs.mockResponses["/backend/activity/2/page/7/step/4"] = 
{
  "url": "/backend/activity/2/page/7/step/4",
  "activityPage": "/backend/activity/2/page/7",
  "paneConfig": "split",
  "panes": {
    "top": { "type": "graph", "name": "maria" },
    "bottom": null
  },
  "beforeText":
    "<p>Incorrect.</p>" +
    "<p><b>Hint 3</b>: After four minutes, Maria stopped and did not start moving again until six minutes. " +
    "So, how many minutes passed?</p>" +
    "<p>Try again. For how many minutes did Maria stop to talk to her coach?</p>",
  "responseTemplate": "/backend/response-template/1/numeric",
  "afterText": "",
  "startCommands": [],
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
  "responseInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "responseBranches": [
    { "criterion": { 
        "equals": [{"int": "value"}, 2]
      },
      "step": "/backend/activity/2/page/7/step/6"
    }
  ],
  "defaultBranch": "/backend/activity/2/page/7/step/5",
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": false
};
steps.push(step);

step = Smartgraphs.mockResponses["/backend/activity/2/page/7/step/5"] = 
{
  "url": "/backend/activity/2/page/7/step/5",
  "activityPage": "/backend/activity/2/page/7",
  "paneConfig": "split",
  "panes": {
    "top": { "type": "graph", "name": "maria" },
    "bottom": null
  },
  "beforeText":
    "<p>Maria stopped during the horizontal segment of the graph. This is when her position did not change. " +
    "As you can see, this interval lasted 2 minutes.</p>" +
    "<p>Click Next Page >> when you are ready.</p>",
  "responseTemplate": null,
  "afterText": "",
  "startCommands": [],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": true,
  "submissibilityInspector": null,
  "submissibilityCriterion": null,
  "triggeredCommands": [
  ],
  "responseInspector": null,
  "responseBranches": [],
  "defaultBranch": "",
  "isFinalStep": true,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": true,
  "submitButtonTitle": "",
  "nextButtonShouldSubmit": true
};
steps.push(step);

step = Smartgraphs.mockResponses["/backend/activity/2/page/7/step/6"] = 
{
  "url": "/backend/activity/2/page/7/step/6",
  "activityPage": "/backend/activity/2/page/7",
  "paneConfig": "split",
  "panes": {
    "top": { "type": "graph", "name": "maria" },
    "bottom": null
  },
  "beforeText":
    "<p>Correct! Maria stopped during the horizontal segment of the graph. " +
    "This is when her position did not change. As you can see, this interval lasted 2 minutes.</p>" +
    "<p>Click Next Page   >> when you are ready.</p>",
  "responseTemplate": null,
  "afterText": "",
  "startCommands": [],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": true,
  "submissibilityInspector": null,
  "submissibilityCriterion": null,
  "triggeredCommands": [
  ],
  "responseInspector": null,
  "responseBranches": [],
  "defaultBranch": "",
  "isFinalStep": true,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": true,
  "submitButtonTitle": "",
  "nextButtonShouldSubmit": true
};
steps.push(step);

Smartgraphs.mockResponses["/backend/activity/2/page/7/steps"] = steps;


/****************************************************************************
*    Activity 2 (Maria's Run)
*    Page 8
****************************************************************************/

steps = [];

step = Smartgraphs.mockResponses["/backend/activity/2/page/8/step/1"] = 
{
  "url": "/backend/activity/2/page/8/step/1",
  "activityPage": "/backend/activity/2/page/8",
  "paneConfig": "split",
  "panes": {
    "top": { "type": "graph", "name": "maria" },
    "bottom": null
  },
  "beforeText":
    "<p>Think back on the activities you just did.</p>" +
    "<p>Now that you have had a chance to create your own position versus time graphs, " +
    "explain what kind of details this graph can tell about motion on a straight track. " +
    "Give examples of some details that a position versus time graph cannot tell.</p>" +
    "<p>What other elements would make the story complete?</p>",
  "responseTemplate": "/backend/response-template/2/open",
  "afterText": "",
  "startCommands": [],
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
  "responseBranches": null,
  "defaultBranch": "/backend/activity/2/page/8/step/2",
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": false
};
steps.push(step);

step = Smartgraphs.mockResponses["/backend/activity/2/page/8/step/2"] = 
{
  "url": "/backend/activity/2/page/8/step/2",
  "activityPage": "/backend/activity/2/page/8",
  "paneConfig": "split",
  "panes": {
    "top": { "type": "graph", "name": "maria" },
    "bottom": null
  },
  "beforeText":
    "<p>This is the end of the activity.</p>",
  "responseTemplate": null,
  "afterText": "",
  "startCommands": [],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": false,
  "submissibilityInspector": null,
  "submissibilityCriterion": null,
  "triggeredCommands": [
  ],
  "responseInspector": null, 
  "responseBranches": null,
  "defaultBranch": null,
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": true,
  "submitButtonTitle": "",
  "nextButtonShouldSubmit": false
};
steps.push(step);
Smartgraphs.mockResponses["/backend/activity/2/page/8/steps"] = steps;



/****************************************************************************
*    Activity 1 (Moving Away and Toward)
*    Page 1
****************************************************************************/

steps = [];

step = Smartgraphs.mockResponses["/backend/activity/1/page/1/step/1"] = 
{
  "url": "/backend/activity/1/page/1/step/1",
  "activityPage": "/backend/activity/1/page/1",
  "paneConfig": "single",
  "panes": {
    "single": { "type": "image", "path": sc_static("resources/arrow.jpg") }
  },
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
  "hideSubmitButton": true,
  "submitButtonTitle": "",
  "nextButtonShouldSubmit": false
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
  "paneConfig": "split",
  "panes": {
    "top": { "type": "graph", "name": "prediction-away" },
    "bottom": null
  },
  "beforeText": 
    "<p>In the top-right area, draw a graph of someone walking at a <b>slow</b>, <b>steady pace</b> from point A to "+
    "point B between 0 and 15 seconds.</p>"+
    "<p>Click the <b>Clear</b> button if you want to try again</p>",
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
  "shouldWaitForSubmissibleResponse": true,
  "submissibilityInspector": {
    "type": "Smartgraphs.SketchLengthInspector",
    "config": {
      "annotationName": "prediction-away",
      "check": "continuously"
    }
  },
  "submissibilityCriterion": {
    "gt": ["value", -1]
  },
  "triggeredCommands": [
  ],
  "responseInspector": null,
  "responseBranches": [
  ],
  "defaultBranch": "/backend/activity/1/page/2/step/2",
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": false
};

steps.push(step);


step = Smartgraphs.mockResponses["/backend/activity/1/page/2/step/2"] =
{
  "url": "/backend/activity/1/page/2/step/2",
  "activityPage": "/backend/activity/1/page/2",
  "paneConfig": "split",
  "panes": {
    "top":    { "type": "graph", "name": "prediction-away" },
    "bottom": { "type": "graph", "name": "prediction-toward" }
  },
  "beforeText": 
     "<p>In the bottom-right area, draw a graph of someone walking at a <b>slow</b>, <b>steady pace</b> from point B "+
     "to point A between 0 and 15 seconds. Click Next when you are done.</p>",
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
  "shouldWaitForSubmissibleResponse": true,
  "submissibilityInspector": {
    "type": "Smartgraphs.SketchLengthInspector",
    "config": {
      "annotationName": "prediction-toward",
      "check": "continuously"
    }
  },
  "submissibilityCriterion": {
    "gt": ["value", -1]
  },
  "triggeredCommands": [
  ],
  "responseInspector": null,
  "responseBranches": [
  ],
  "defaultBranch": null,
  "isFinalStep": true,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "",
  "nextButtonShouldSubmit": true
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
  "paneConfig": "split",
  "panes": {
    "top": { "type": "graph", "name": "sensor-playing" },
    "bottom": null
  },
  "beforeText":
     "<p><b>Place</b> the sensor at the 0-meter mark.</p>"+
     "<p><b>Stand</b> near the sensor. When you are ready, have your partner <b>click Start</b> to record the "+
     "position and time data for your movements.</p>"+
     "<p><b>Walk</b> on the path for 15 seconds. <b>Try</b> different kinds of motions (walking fast, slow, "+
     "forward, backward\u2026)</p>"+
     "<p><b>Click Clear</b> if you want to try again.</p>",
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
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": false
};
steps.push(step);

step = Smartgraphs.mockResponses["/backend/activity/1/page/3/step/2"] = 
{
  "url": "/backend/activity/1/page/3/step/2",
  "activityPage": "/backend/activity/1/page/3",
  "paneConfig": "split",
  "panes": {
    "top": { "type": "graph", "name": "sensor-playing" },
    "bottom": null
  },
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
  "hideSubmitButton": false,
  "submitButtonTitle": "",
  "nextButtonShouldSubmit": true
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
  "paneConfig": "split",
  "panes": {
    "top":    { "type": "graph", "name": "graph-with-away-prediction" },
    "bottom": { "type": "graph", "name": "graph-with-toward-prediction" }
  },
  "beforeText": 
    "<p>First, <b>stand</b> close to the sensor, near the 0-meter mark.</p>"+
    "<p>When you are ready, have your partner <b>click Start</b> to record the position and time data for your "+
    "movements.</p>"+
    "<p><b>Walk</b> on the path at a slow, steady pace, away from the sensor, for 15 seconds.</p>",
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
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": false
};
steps.push(step);

step = Smartgraphs.mockResponses["/backend/activity/1/page/4/step/2"] = 
{
  "url": "/backend/activity/1/page/4/step/2",
  "activityPage": "/backend/activity/1/page/4",
  "paneConfig": "split",
  "panes": {
    "top":    { "type": "graph", "name": "graph-with-away-prediction" },
    "bottom": { "type": "graph", "name": "graph-with-toward-prediction" }
  },
  "beforeText": 
    "<p>To make the second graph, <b>stand</b> approximately 4 meters away from the sensor on the path.</p>"+
    "<p>When you are ready, have your partner <b>click Start</b> to record the position and time data for your "+
    "movements.</p>"+
    "<p><b>Walk</b> on the path at the same slow, steady pace, toward the sensor, for 15 seconds.</p>",
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
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": false
};
steps.push(step);

step = Smartgraphs.mockResponses["/backend/activity/1/page/4/step/3"] = 
{
  "url": "/backend/activity/1/page/4/step/3",
  "activityPage": "/backend/activity/1/page/4",
  "paneConfig": "split",
  "panes": {
    "top":    { "type": "graph", "name": "graph-with-away-prediction" },
    "bottom": { "type": "graph", "name": "graph-with-toward-prediction" }
  },
  "beforeText": 
    "<p>How closely do the graphs of your data match your original predictions?</p>",
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
  "hideSubmitButton": false,
  "submitButtonTitle": "",
  "nextButtonShouldSubmit": true
};
steps.push(step);
Smartgraphs.mockResponses["/backend/activity/1/page/4/steps"] = steps;


/****************************************************************************
*    Activity 1 (Moving Away and Toward)
*    Page 5
****************************************************************************/

steps = [];
step = Smartgraphs.mockResponses["/backend/activity/1/page/5/step/1"] = 
{
  "url": "/backend/activity/1/page/5/step/1",
  "activityPage": "/backend/activity/1/page/5",
  "paneConfig": "split",
  "panes": {
    "top":    { "type": "graph", "name": "sensor-away" },
    "bottom": { "type": "graph", "name": "sensor-toward" }
  },
  "beforeText": 
    "<p>How are the two position-time graphs <b>similar</b> to each other?</p>",
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
  "defaultBranch": "/backend/activity/1/page/5/step/2",
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": false
};
steps.push(step);

step = Smartgraphs.mockResponses["/backend/activity/1/page/5/step/2"] = 
{
  "url": "/backend/activity/1/page/5/step/2",
  "activityPage": "/backend/activity/1/page/5",
  "paneConfig": "split",
  "panes": {
    "top":    { "type": "graph", "name": "sensor-away" },
    "bottom": { "type": "graph", "name": "sensor-toward" }
  },
  "beforeText": 
    "<p>How does motion away from the sensor <b>differ</b> from motion toward the sensor on a position-time "+
    "graph?</b>",
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
  "hideSubmitButton": false,
  "submitButtonTitle": "",
  "nextButtonShouldSubmit": true
};
steps.push(step);

Smartgraphs.mockResponses["/backend/activity/1/page/5/steps"] = steps;

/****************************************************************************
*    Activity 1 (Moving Away and Toward)
*    Page 6
****************************************************************************/
steps = [];
step = Smartgraphs.mockResponses["/backend/activity/1/page/6/step/1"] = 
{
  "url": "/backend/activity/1/page/6/step/1",
  "activityPage": "/backend/activity/1/page/6",
  "paneConfig": "single",
  "panes": {
    "single": { "type": "graph", "name": "walking-example-1" }
  },
  "beforeText": 
    "<p>What happened at the red point (the y-intercept for this motion)?</p>",
  "responseTemplate": "/backend/response-template/3/walking-example-1",
  "afterText": "",
  "startCommands": [
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": true,
  "submissibilityInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "submissibilityCriterion": {
    "in": ["value", [1, 2, 3, 4]]
  },
  "triggeredCommands": [
  ],
  "responseInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "responseBranches": [
    { "criterion": { 
        "equals": ["value", 1]
      },
      "step": "/backend/activity/1/page/6/step/5"
    },
    { "criterion": { 
        "equals": ["value", 2]
      },
      "step": "/backend/activity/1/page/6/step/2"
    },
    { "criterion": { 
        "equals": ["value", 3]
      },
      "step": "/backend/activity/1/page/6/step/3"
    },
    { "criterion": { 
        "equals": ["value", 4]
      },
      "step": "/backend/activity/1/page/6/step/4"
    }
  ],
  "defaultBranch": "/backend/activity/1/page/6/step/2",
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": false
};
steps.push(step);


step = Smartgraphs.mockResponses["/backend/activity/1/page/6/step/2"] = 
{
  "url": "/backend/activity/1/page/6/step/2",
  "activityPage": "/backend/activity/1/page/6",
  "paneConfig": "single",
  "panes": {
    "single": { "type": "graph", "name": "walking-example-1" }
  },
  "beforeText":
    "<p>What happened at the red point (the y-intercept for this motion)?</p>",
  "responseTemplate": "/backend/response-template/3/walking-example-1",
  "afterText":  "<p><b>Incorrect.</b> Look at the walker's position at the red point, and select another answer.</p>",
  "startCommands": [
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": true,
  "submissibilityInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "submissibilityCriterion": {
    "in": ["value", [1, 2, 3, 4]]
  },
  "triggeredCommands": [
  ],
  "responseInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "responseBranches": [
    { "criterion": { 
        "equals": ["value", 1]
      },
      "step": "/backend/activity/1/page/6/step/5"
    },
    { "criterion": { 
        "equals": ["value", 2]
      },
      "step": "/backend/activity/1/page/6/step/2"
    },
    { "criterion": { 
        "equals": ["value", 3]
      },
      "step": "/backend/activity/1/page/6/step/3"
    },
    { "criterion": { 
        "equals": ["value", 4]
      },
      "step": "/backend/activity/1/page/6/step/4"
    }
  ],
  "defaultBranch": "/backend/activity/1/page/6/step/3",
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": false
};
steps.push(step);


step = Smartgraphs.mockResponses["/backend/activity/1/page/6/step/3"] = 
{
  "url": "/backend/activity/1/page/6/step/3",
  "activityPage": "/backend/activity/1/page/6",
  "paneConfig": "single",
  "panes": {
    "single": { "type": "graph", "name": "walking-example-1" }
  },
  "beforeText":
    "<p>What happened at the red point (the y-intercept for this motion)?</p>",
  "responseTemplate": "/backend/response-template/3/walking-example-1",
  "afterText": "<p><b>Incorrect.</b> Think about what happened to the walker's position after this point, and "+
  "select another answer.</p>", 
  "startCommands": [
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": true,
  "submissibilityInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "submissibilityCriterion": {
    "in": ["value", [1, 2, 3, 4]]
  },
  "triggeredCommands": [
  ],
  "responseInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "responseBranches": [
    { "criterion": { 
        "equals": ["value", 1]
      },
      "step": "/backend/activity/1/page/6/step/5"
    },
    { "criterion": { 
        "equals": ["value", 2]
      },
      "step": "/backend/activity/1/page/6/step/2"
    },
    { "criterion": { 
        "equals": ["value", 3]
      },
      "step": "/backend/activity/1/page/6/step/3"
    },
    { "criterion": { 
        "equals": ["value", 4]
      },
      "step": "/backend/activity/1/page/6/step/4"
    }
  ],
  "defaultBranch": "/backend/activity/1/page/6/step/4",
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": false
};
steps.push(step);


step = Smartgraphs.mockResponses["/backend/activity/1/page/6/step/4"] = 
{
  "url": "/backend/activity/1/page/6/step/4",
  "activityPage": "/backend/activity/1/page/6",
  "paneConfig": "single",
  "panes": {
    "single": { "type": "graph", "name": "walking-example-1" }
  },
  "beforeText":
    "<p>What happened at the red point (the y-intercept for this motion)?</p>",
  "responseTemplate": "/backend/response-template/3/walking-example-1",
  "afterText": "<p><b>Incorrect.</b> Look at the walker's direction after the red point, and select another answer.</p>",
  "startCommands": [
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": true,
  "submissibilityInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "submissibilityCriterion": {
    "in": ["value", [1, 2, 3, 4]]
  },
  "triggeredCommands": [
  ],
  "responseInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "responseBranches": [
    { "criterion": { 
        "equals": ["value", 1]
      },
      "step": "/backend/activity/1/page/6/step/5"
    },
    { "criterion": { 
        "equals": ["value", 2]
      },
      "step": "/backend/activity/1/page/6/step/2"
    },
    { "criterion": { 
        "equals": ["value", 3]
      },
      "step": "/backend/activity/1/page/6/step/3"
    },
    { "criterion": { 
        "equals": ["value", 4]
      },
      "step": "/backend/activity/1/page/6/step/4"
    }
  ],
  "defaultBranch": "/backend/activity/1/page/6/step/5",
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": false
};
steps.push(step);


step = Smartgraphs.mockResponses["/backend/activity/1/page/6/step/5"] = 
{
  "url": "/backend/activity/1/page/6/step/5",
  "activityPage": "/backend/activity/1/page/6",
  "paneConfig": "single",
  "panes": {
    "single": { "type": "graph", "name": "walking-example-1" }
  },
  "beforeText":
    "<p><b>Correct!</b> At this point, the walker was 4 meters away, getting ready to walk toward the sensor.</p>",
  "responseTemplate": null,
  "afterText": "",
  "startCommands": [
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": false,
  "submissibilityInspector": null,
  "submissibilityCriterion": {
  },
  "triggeredCommands": [
  ],
  "responseInspector": null,
  "responseBranches": [
  ],
  "defaultBranch": "",
  "isFinalStep": true,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "",
  "nextButtonShouldSubmit": true
};
steps.push(step);


Smartgraphs.mockResponses["/backend/activity/1/page/6/steps"] = steps;


/****************************************************************************
*    Activity 1 (Moving Away and Toward)
*    Page 7
****************************************************************************/

steps = [];

step = Smartgraphs.mockResponses["/backend/activity/1/page/7/step/1"] = 
{
  "url": "/backend/activity/1/page/7/step/1",
  "activityPage": "/backend/activity/1/page/7",
  "paneConfig": "split",
  "panes": {
    "top": { "type": "graph", "name": "sensor-playing" },
    "bottom": null
  },
  "beforeText":
    "<p><b>Stand</b> at a starting point <i><b>other</b></i> than the 0-meter mark.</p>"+
    "<p>When you are ready, have your partner <b>click Start</b> to record the position and time data for your "+
    "movements.</p>"+
    "<p><b>Walk</b> on the path for 15 seconds, experimenting with different directions and speeds.</p>",
  "responseTemplate": null,
  "afterText": "",
  "startCommands": [
    { "action": "startSensorInput",  
      "literalArgs": {
        "pane": "top",
        "seriesName": "sensor-play-2"
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
  "defaultBranch": "/backend/activity/1/page/7/step/2",
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": false
};
steps.push(step);


step = Smartgraphs.mockResponses["/backend/activity/1/page/7/step/2"] = 
{
  "url": "/backend/activity/1/page/7/step/2",
  "activityPage": "/backend/activity/1/page/7",
  "paneConfig": "split",
  "panes": {
    "top": { "type": "graph", "name": "sensor-playing" },
    "bottom": null
  },
  "beforeText": 
     "<p>What is the significance of the y-intercept (the y-value of the point where the graph crosses the "+
     "y-axis) of the position-time graph?</p>",
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
  "defaultBranch": "/backend/activity/1/page/7/step/3",
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": false
};
steps.push(step);


step = Smartgraphs.mockResponses["/backend/activity/1/page/7/step/3"] = 
{
  "url": "/backend/activity/1/page/7/step/3",
  "activityPage": "/backend/activity/1/page/7",
  "paneConfig": "split",
  "panes": {
    "top": { "type": "graph", "name": "sensor-playing" },
    "bottom": null
  },
  "beforeText": 
     "<p>Explain how the graph conveys how fast you walked.</p>", 
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
  "defaultBranch": "/backend/activity/1/page/7/step/4",
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": false
};
steps.push(step);


step = Smartgraphs.mockResponses["/backend/activity/1/page/7/step/4"] = 
{
  "url": "/backend/activity/1/page/7/step/4",
  "activityPage": "/backend/activity/1/page/7",
  "paneConfig": "split",
  "panes": {
    "top": { "type": "graph", "name": "sensor-playing" },
    "bottom": null
  },
  "beforeText": 
     "<p>How is direction represented on the graph?</p>", 
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
  "hideSubmitButton": false,
  "submitButtonTitle": "",
  "nextButtonShouldSubmit": true
};
steps.push(step);

Smartgraphs.mockResponses["/backend/activity/1/page/7/steps"] = steps;


/****************************************************************************
*    Activity 1 (Moving Away and Toward)
*    Page 8
****************************************************************************/

steps = [];
step = Smartgraphs.mockResponses["/backend/activity/1/page/8/step/1"] = 
{
  "url": "/backend/activity/1/page/8/step/1",
  "activityPage": "/backend/activity/1/page/8",
  "paneConfig": "single",
  "panes": {
    "single": { "type": "graph", "name": "two-walkers" }
  },
  "beforeText": 
    "<p>Which of the following motion scenarios could have resulted in this graph?</p>",
  "responseTemplate": "/backend/response-template/4/two-walkers",
  "afterText": "",
  "startCommands": [
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": true,
  "submissibilityInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "submissibilityCriterion": {
    "in": ["value", [1, 2, 3, 4]]
  },
  "triggeredCommands": [
  ],
  "responseInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "responseBranches": [
    { "criterion": { 
        "equals" : ["value", 2]
      },
      "step": "/backend/activity/1/page/8/step/6"
    }
  ],
  "defaultBranch": "/backend/activity/1/page/8/step/2",
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": false
};
steps.push(step);

step = Smartgraphs.mockResponses["/backend/activity/1/page/8/step/2"] = 
{
  "url": "/backend/activity/1/page/8/step/2",
  "activityPage": "/backend/activity/1/page/8",
  "paneConfig": "single",
  "panes": {
    "single": { "type": "graph", "name": "two-walkers" }
  },
  "beforeText": 
    "<p>Which of the following motion scenarios could have resulted in this graph?</p>",
  "responseTemplate": "/backend/response-template/4/two-walkers",
  "afterText": 
    "<p><b>Incorrect.</b> Two data sets are represented on one graph. Analyze each set of data, and "+
    "select another answer.</p>",
  "startCommands": [
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": true,
  "submissibilityInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "submissibilityCriterion": {
    "in": ["value", [1, 2, 3, 4]]
  },
  "triggeredCommands": [
  ],
  "responseInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "responseBranches": [
    { "criterion": { 
        "equals" : ["value", 2]
      },
      "step": "/backend/activity/1/page/8/step/6"
    }
  ],
  "defaultBranch": "/backend/activity/1/page/8/step/3",
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": false
};
steps.push(step);

step = Smartgraphs.mockResponses["/backend/activity/1/page/8/step/3"] = 
{
  "url": "/backend/activity/1/page/8/step/3",
  "activityPage": "/backend/activity/1/page/8",
  "paneConfig": "single",
  "panes": {
    "single": { "type": "graph", "name": "two-walkers" }
  },
  "beforeText": 
    "<p>Which of the following motion scenarios could have resulted in this graph?</p>",
  "responseTemplate": "/backend/response-template/4/two-walkers",
  "afterText": "<p><b>Incorrect.</b> Figure out where each person started and ended, and select another answer.</p>",
  "startCommands": [
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": true,
  "submissibilityInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "submissibilityCriterion": {
    "in": ["value", [1, 2, 3, 4]]
  },
  "triggeredCommands": [
  ],
  "responseInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "responseBranches": [
    { "criterion": { 
        "equals" : ["value", 2]
      },
      "step": "/backend/activity/1/page/8/step/6"
    }
  ],
  "defaultBranch": "/backend/activity/1/page/8/step/4",
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": false
};
steps.push(step);


step = Smartgraphs.mockResponses["/backend/activity/1/page/8/step/4"] = 
{
  "url": "/backend/activity/1/page/8/step/4",
  "activityPage": "/backend/activity/1/page/8",
  "paneConfig": "single",
  "panes": {
    "single": { "type": "graph", "name": "two-walkers" }
  },
  "beforeText": 
    "<p>Which of the following motion scenarios could have resulted in this graph?</p>",
  "responseTemplate": "/backend/response-template/4/two-walkers",
  "afterText": 
    "<p><b>Incorrect.</b> Think about the direction each walker moved from the starting point, and select another "+
    "answer.</p>",
  "startCommands": [
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": true,
  "submissibilityInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "submissibilityCriterion": {
    "in": ["value", [1, 2, 3, 4]]
  },
  "triggeredCommands": [
  ],
  "responseInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "responseBranches": [
    { "criterion": { 
        "equals" : ["value", 2]
      },
      "step": "/backend/activity/1/page/8/step/6"
    }
  ],
  "defaultBranch": "/backend/activity/1/page/8/step/5",
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": false
};
steps.push(step);


step = Smartgraphs.mockResponses["/backend/activity/1/page/8/step/5"] = 
{
  "url": "/backend/activity/1/page/8/step/5",
  "activityPage": "/backend/activity/1/page/8",
  "paneConfig": "single",
  "panes": {
    "single": { "type": "graph", "name": "two-walkers" }
  },
  "beforeText": 
    "<p><b>Still incorrect.</b> Both walkers started 2 meters away. Then, one walked toward the sensor for 20 seconds, "+
    "while the other walked away from the sensor during the same 20 seconds.</p>",
  "responseTemplate": null,
  "afterText": "",
  "startCommands": [
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": true,
  "submissibilityInspector": null,
  "submissibilityCriterion": {
  },
  "triggeredCommands": [
  ],
  "responseInspector": {
  },
  "responseBranches": [
  ],
  "defaultBranch": null,
  "isFinalStep": true,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": true
};
steps.push(step);


step = Smartgraphs.mockResponses["/backend/activity/1/page/8/step/6"] = 
{
  "url": "/backend/activity/1/page/8/step/6",
  "activityPage": "/backend/activity/1/page/8",
  "paneConfig": "single",
  "panes": {
    "single": { "type": "graph", "name": "two-walkers" }
  },
  "beforeText": 
    "<p><b>Correct!</b> Both walkers started 2 meters away. Then, one walked toward the sensor for 20 seconds, "+
    "while the other walked away from the sensor during the same 20 seconds.</p>",
  "responseTemplate": null,
  "afterText": "",
  "startCommands": [
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": true,
  "submissibilityInspector": null,
  "submissibilityCriterion": {
  },
  "triggeredCommands": [
  ],
  "responseInspector": {
  },
  "responseBranches": [
  ],
  "defaultBranch": null,
  "isFinalStep": true,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "",
  "nextButtonShouldSubmit": true
};
steps.push(step);

Smartgraphs.mockResponses["/backend/activity/1/page/8/steps"] = steps;

steps = [];

/****************************************************************************
*    Activity 1 (Moving Away and Toward)
*    Page 9
****************************************************************************/

steps = [];

step = Smartgraphs.mockResponses["/backend/activity/1/page/9/step/1"] = 
{
  "url": "/backend/activity/1/page/9/step/1",
  "activityPage": "/backend/activity/1/page/9",
  "paneConfig": "split",
  "panes": {
    "top": { "type": "graph", "name": "graph-to-match" },
    "bottom": null
  },
  "beforeText":
     "<p><b>Move</b> to your starting point and, when you are ready, have your partner <b>click Start</b> to record "+
     "the data for your movements. "+
     "<p><b>Walk</b> on the path for 15 seconds while trying to match the given graph.</p>",
  "responseTemplate": null,
  "afterText": "",
  "startCommands": [
    { "action": "startSensorInput",  
      "literalArgs": {
        "pane": "top",
        "seriesName": "sensor-match"
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
  "defaultBranch": "/backend/activity/1/page/9/step/2",
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": false
};
steps.push(step);


step = Smartgraphs.mockResponses["/backend/activity/1/page/9/step/2"] = 
{
  "url": "/backend/activity/1/page/9/step/2",
  "activityPage": "/backend/activity/1/page/9",
  "paneConfig": "split",
  "panes": {
    "top": { "type": "graph", "name": "graph-to-match" },
    "bottom": null
  },
  "beforeText": 
     "<p>How closely does your graph match the given graph? What could you have done to match the given graph "+
     "more closely?</p>"+
     "<p>Try to use some of the following words: fast, slow, toward, away.</p>",
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
  "hideSubmitButton": false,
  "submitButtonTitle": "",
  "nextButtonShouldSubmit": true
};
steps.push(step);

Smartgraphs.mockResponses["/backend/activity/1/page/9/steps"] = steps;


/****************************************************************************
*    Activity 1 (Moving Away and Toward)
*    Page 10
****************************************************************************/

steps = [];
step = Smartgraphs.mockResponses["/backend/activity/1/page/10/step/1"] = 
{
  "url": "/backend/activity/1/page/10/step/1",
  "activityPage": "/backend/activity/1/page/10",
  "paneConfig": "split",
  "panes": {
    "top":    { "type": "graph", "name": "graph-with-away-prediction" },
    "bottom": { "type": "graph", "name": "graph-with-toward-prediction" }
  },
  "beforeText": 
    "<p>Write down <b>3</b> things you have learned about motion since you started this activity.</p>",
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
  "defaultBranch": "/backend/activity/1/page/10/step/2",
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": false
};
steps.push(step);


step = Smartgraphs.mockResponses["/backend/activity/1/page/10/step/2"] = 
{
  "url": "/backend/activity/1/page/10/step/2",
  "activityPage": "/backend/activity/1/page/10",
  "paneConfig": "split",
  "panes": {
    "top":    { "type": "graph", "name": "graph-with-away-prediction" },
    "bottom": { "type": "graph", "name": "graph-with-toward-prediction" }
  },
  "beforeText": 
    "<p>Describe <b>1</b> type of motion you would like to try with the motion sensor.</p>",
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
  "hideSubmitButton": false,
  "submitButtonTitle": "",
  "nextButtonShouldSubmit": true
};
steps.push(step);
Smartgraphs.mockResponses["/backend/activity/1/page/10/steps"] = steps;


/****************************************************************************
*    Activity 1 (Moving Away and Toward)
*    Page 11 (end page)
****************************************************************************/

steps = [];
step = Smartgraphs.mockResponses["/backend/activity/1/page/11/step/1"] = 
{
  "url": "/backend/activity/1/page/11/step/1",
  "activityPage": "/backend/activity/1/page/11",
  "paneConfig": "single",
  "panes": {
    "single": { "type": "image", "path": sc_static("resources/arrow.jpg") }
  },
  "beforeText": "",
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
  "hideSubmitButton": true,
  "submitButtonTitle": "",
  "nextButtonShouldSubmit": false
};
steps.push(step);

Smartgraphs.mockResponses["/backend/activity/1/page/11/steps"] = steps;


/****************************************************************************
*    Activity 2 (Demo of Activity Switching)
*    Page 1
****************************************************************************/


steps = [];
step = Smartgraphs.mockResponses["/backend/activity/3/page/1/step/1"] = 
{
  "url": "/backend/activity/3/page/1/step/1",
  "activityPage": "/backend/activity/3/page/1",
  "paneConfig": "single",
  "panes": {
    "single": { "type": "graph", "name": "prediction-away" }
  },
  "beforeText": 
    "<p>Try visiting the first activity by changing just the last digit of the URL from '2' to '1' and hitting "+
    "Enter.<p>"+
    "<p>Also, you can now resize the browser window without scrambling the prediction graph on the right.</p>",
  "responseTemplate": "",
  "afterText": "",
  "startCommands": [
    { "action": "startFreehandInput",
      "literalArgs": {
        "pane": "single",
        "annotationName": "prediction-away"
      }
    }
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": true,
  "submissibilityInspector": {
    "type": "Smartgraphs.SketchLengthInspector",
    "config": {
      "annotationName": "prediction-away",
      "check": "continuously"
    }
  },
  "submissibilityCriterion": {
    "gt": ["value", 5]
  },
  "triggeredCommands": [
  ],
  "responseInspector": null,
  "responseBranches": [
  ],
  "defaultBranch": "/backend/activity/3/page/1/step/2",
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": false
};
steps.push(step);

step = Smartgraphs.mockResponses["/backend/activity/3/page/1/step/2"] = 
{
  "url": "/backend/activity/3/page/1/step/2",
  "activityPage": "/backend/activity/3/page/1",
  "paneConfig": "single",
  "panes": {
    "single": { "type": "graph", "name": "prediction-away" }
  },
  "beforeText": 
    "<p>Congratulations!</p>",
  "responseTemplate": "",
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
  "hideSubmitButton": false,
  "submitButtonTitle": "",
  "nextButtonShouldSubmit": true
};
steps.push(step);
Smartgraphs.mockResponses["/backend/activity/3/page/1/steps"] = steps;


/****************************************************************************
*    Activity 'new-step' (Testbed for activity step refactoring)
*    Page 1
****************************************************************************/

steps = [];

step = Smartgraphs.mockResponses["/backend/activity/new-step/page/1/step/1"] = 
{
  "url": "/backend/activity/new-step/page/1/step/1",
  "activityPage": "/backend/activity/new-step/page/1",
  "paneConfig": "single",
  "panes": {
    "single": { "type": "image", "path": sc_static("resources/arrow.jpg") }
  },
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
  "hideSubmitButton": false,
  "submitButtonTitle": "Show me!",
  "nextButtonShouldSubmit": false
};
steps.push(step);

step = Smartgraphs.mockResponses["/backend/activity/new-step/page/1/step/2"] = 
{
  "url": "/backend/activity/new-step/page/1/step/2",
  "activityPage": "/backend/activity/new-step/page/1",
  "paneConfig": "single",
  "panes": {
    "single": { "type": "graph", "name": "prediction-away" }
  },
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
  "hideSubmitButton": false,
  "submitButtonTitle": "I saw it!",
  "nextButtonShouldSubmit": false
};
steps.push(step);

step = Smartgraphs.mockResponses["/backend/activity/new-step/page/1/step/3"] = 
{
  "url": "/backend/activity/new-step/page/1/step/3",
  "activityPage": "/backend/activity/new-step/page/1",
  "paneConfig": "split",
  "panes": {
    "top":    { "type": "graph", "name": "prediction-away" },
    "bottom": { "type": "graph", "name": "prediction-toward" }
  },
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
  "hideSubmitButton": false,
  "submitButtonTitle": "I saw it!",
  "nextButtonShouldSubmit": false
};
steps.push(step);

Smartgraphs.mockResponses["/backend/activity/new-step/page/1/steps"] = steps;