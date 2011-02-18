/*globals Smartgraphs */

Smartgraphs.activityDocs = Smartgraphs.activityDocs || {};
Smartgraphs.activityDocs["/shared/instantaneous-speed"] = 
{
  "_id": "instantanous-speed.df5",
  "_rev": "10-bfcf2cf128db41df9bd9141454564e9d",
  "data_format_version": 5,
  "activity": {
    "title": "Instantaneous Speed (Slope Tool)",
    "url": "/shared/instantaneous-speed",
    "owner": "shared",
    "pages": [   
      "/shared/instantaneous-speed/page/12",
      "/shared/instantaneous-speed/page/13",
      "/shared/instantaneous-speed/page/14"
    ],
    "datasets": [
      "/shared/instantaneous-speed/dataset/slope-data"
    ],
    "units": [

    ],
    "axes": [
      "/shared/instantaneous-speed/axes/10s",
      "/shared/instantaneous-speed/axes/15m"
    ],
    "graphs": [
    
    ],
    "responseTemplates": [
      "/components/response-template/open",
      "/components/response-template/numeric"
    ]
  },
  "pages": [
    {
      "name": "Instantaneous Speed I",
      "url": "/shared/instantaneous-speed/page/12",
      "activity": "/shared/instantaneous-speed",
      "index": 12,
      "introText": "<h1>Analysis</h1><p>Suppose you collected some actual position-time data while walking from 0 to 15 meters and displayed your data to the right. Let's find out how fast you walked during different time intervals.</p><p>First you will pick two points that are next to each other and find the velocity between those points. This calculation will be close to your <b>instantaneous</b> velocity. </p>",                        
      "steps": [
        "/shared/instantaneous-speed/page/12/step/1",
        "/shared/instantaneous-speed/page/12/step/2",
        "/shared/instantaneous-speed/page/12/step/3",
        "/shared/instantaneous-speed/page/12/step/4",
        "/shared/instantaneous-speed/page/12/step/5",
        "/shared/instantaneous-speed/page/12/step/6",
        "/shared/instantaneous-speed/page/12/step/7",
        "/shared/instantaneous-speed/page/12/step/8",
        "/shared/instantaneous-speed/page/12/step/9",
        "/shared/instantaneous-speed/page/12/step/10",
        "/shared/instantaneous-speed/page/12/step/11",
        "/shared/instantaneous-speed/page/12/step/12",
        "/shared/instantaneous-speed/page/12/step/13",
        "/shared/instantaneous-speed/page/12/step/14",
        "/shared/instantaneous-speed/page/12/step/15",
        "/shared/instantaneous-speed/page/12/step/16"
      ],
      "firstStep": "/shared/instantaneous-speed/page/12/step/1"
    },
    {
      "name": "Instantaneous Speed II",
      "url": "/shared/instantaneous-speed/page/13",
      "activity": "/shared/instantaneous-speed",
      "index": 13,
      "introText": "<h1>Analysis</h1><p>Now you will pick another set of points that are next to each other and find the velocity between those points.</p>",                    
      "steps": [
        "/shared/instantaneous-speed/page/13/step/1",
        "/shared/instantaneous-speed/page/13/step/1a",
        "/shared/instantaneous-speed/page/13/step/2",
        "/shared/instantaneous-speed/page/13/step/3",
        "/shared/instantaneous-speed/page/13/step/4",
        "/shared/instantaneous-speed/page/13/step/5",
        "/shared/instantaneous-speed/page/13/step/6",
        "/shared/instantaneous-speed/page/13/step/7",
        "/shared/instantaneous-speed/page/13/step/8",
        "/shared/instantaneous-speed/page/13/step/9",
        "/shared/instantaneous-speed/page/13/step/10",
        "/shared/instantaneous-speed/page/13/step/11",
        "/shared/instantaneous-speed/page/13/step/12",
        "/shared/instantaneous-speed/page/13/step/13",
        "/shared/instantaneous-speed/page/13/step/14",
        "/shared/instantaneous-speed/page/13/step/15",
        "/shared/instantaneous-speed/page/13/step/16"
      ],
      "firstStep": "/shared/instantaneous-speed/page/13/step/1"
    },
    {
      "name": "Instantaneous Speed III",
      "url": "/shared/instantaneous-speed/page/14",
      "activity": "/shared/instantaneous-speed",
      "index": 14,            
      "steps": [
        "/shared/instantaneous-speed/page/14/step/1"
      ],
      "firstStep": "/shared/instantaneous-speed/page/14/step/1",
      "introText": "<h1>Analysis</h1><p>Was your velocity the same during the two different time intervals? If not, during which interval were you going faster? Explain how you know.</p>"
    }
  ],  
  "steps": [
    {
      "url": "/shared/instantaneous-speed/page/12/step/1",
      "activityPage": "/shared/instantaneous-speed/page/12",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/instantaneous-speed/axes/10s",
          "yAxis": "/shared/instantaneous-speed/axes/15m",
          "datasets": ["slope-data"],
          "annotations": ["first-point-A"]
        },
        "bottom": {
          "type": "table",
          "dataset": "slope-data",
          "annotations": ["first-point-A"]
        }
      },
      "beforeText": "<p>Select a point and then click <b>OK</b>.</p>",
      "tools": [
        { "type": "interactiveSelection",
          "annotation": "first-point-A",
          "dataset": "slope-data"
        }
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/12/step/2",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/instantaneous-speed/page/12/step/2",
      "activityPage": "/shared/instantaneous-speed/page/12",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/instantaneous-speed/axes/10s",
          "yAxis": "/shared/instantaneous-speed/axes/15m",
          "datasets": ["slope-data"],
          "annotations": ["first-point-A", "second-point-A"]
        },
        "bottom": {
          "type": "table",
          "dataset": "slope-data",
          "annotations": ["first-point-A", "second-point-A"]
        }
      },
      "beforeText": "<p>Select a point next to to the first point. Then click <b>OK</b>.</p>",
      "tools": [
        { "type": "interactiveSelection",
          "annotation": "second-point-A",
          "dataset": "slope-data"
        }
      ],
      "responseBranches": [
        {
          "criterion": ["=", 1, ["absDiff", ["indexOf", "first-point-A"], ["indexOf", "second-point-A"]]],
          "step": "/shared/instantaneous-speed/page/12/step/4"
        }
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/12/step/3",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/instantaneous-speed/page/12/step/3",
      "activityPage": "/shared/instantaneous-speed/page/12",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/instantaneous-speed/axes/10s",
          "yAxis": "/shared/instantaneous-speed/axes/15m",
          "datasets": ["slope-data"],
          "annotations": ["first-point-A", "second-point-A"]
        },
        "bottom": {
          "type": "table",
          "dataset": "slope-data",
          "annotations": ["first-point-A", "second-point-A"]
        }
      },
      "beforeText": "<p>To calculate velocity in a small time interval, select a point that is next to the first point. Then click <b>OK</b>.</p>",
      "tools": [
        { "type": "interactiveSelection",
          "annotation": "second-point-A",
          "dataset": "slope-data"
        }
      ],
      "responseBranches": [
        {
          "criterion": ["=", 1, ["absDiff", ["indexOf", "first-point-A"], ["indexOf", "second-point-A"]]],
          "step": "/shared/instantaneous-speed/page/12/step/4"
        }
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/12/step/3",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/instantaneous-speed/page/12/step/4",
      "activityPage": "/shared/instantaneous-speed/page/12",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/instantaneous-speed/axes/10s",
          "yAxis": "/shared/instantaneous-speed/axes/15m",
          "datasets": ["slope-data"],
          "annotations": ["first-point-A", "second-point-A", "slope-line-A"]
        },
        "bottom": {
          "type": "table",
          "dataset": "slope-data",
          "annotations": ["first-point-A", "second-point-A"]
        }
      },
      "beforeText": "<p>Here is the line connecting the two points you selected. The velocity during this interval is the slope of this line.</p><p>What is the <b>velocity</b> between the two points, in meters per second?</p>",
      "responseTemplate": "/components/response-template/numeric",
      "contextVars": [
        { "name": "start-position",        "value": ["coord", "y", ["listItem", 1, ["slopeToolOrder", "first-point-A", "second-point-A"]]] },
        { "name": "end-position",          "value": ["coord", "y", ["listItem", 2, ["slopeToolOrder", "first-point-A", "second-point-A"]]] },
        { "name": "change-position",       "value": ["-", ["get", "end-position"], ["get", "start-position"]] },
        { "name": "change-position-units", "value": ["pluralizeUnits", "/builtins/units/meters", ["get", "change-position"]] },
        { "name": "start-time",            "value": ["coord", "x", ["listItem", 1, ["slopeToolOrder", "first-point-A", "second-point-A"]]] },
        { "name": "end-time",              "value": ["coord", "x", ["listItem", 2, ["slopeToolOrder", "first-point-A", "second-point-A"]]] },
        { "name": "change-time",           "value": ["-", ["get", "end-time"], ["get", "start-time"]] },
        { "name": "change-time-units",     "value": ["pluralizeUnits", "/builtins/units/seconds", ["get", "change-time"]] },
        { "name": "velocity",              "value": ["/", ["get", "change-position"], ["get", "change-time"]] },
        { "name": "velocity-units",        "value": ["pluralizeUnits", "/builtins/units/meters-per-second", ["get", "velocity"]] }
      ],
      "submissibilityCriterion": ["isNumeric", ["responseField", 1]],
      "responseBranches": [
        {
          "criterion": ["withinAbsTolerance", ["slope", "first-point-A", "second-point-A"], ["responseField", 1], 0.1],
          "step": "/shared/instantaneous-speed/page/12/step/16"
        }
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/12/step/5",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/instantaneous-speed/page/12/step/5",
      "activityPage": "/shared/instantaneous-speed/page/12",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/instantaneous-speed/axes/10s",
          "yAxis": "/shared/instantaneous-speed/axes/15m",
          "datasets": ["slope-data"],
          "annotations": ["first-point-A", "second-point-A", "slope-line-A"]
        },
        "bottom": {
          "type": "table",
          "dataset": "slope-data",
          "annotations": ["first-point-A", "second-point-A"]
        }
      },
      "beforeText": "<p>Incorrect.</p><p>What is the <b>velocity</b> between the two points, in meters per second?</p>",
      "responseTemplate": "/components/response-template/numeric",
      "afterText": "<p>Hint: Recall that velocity is the change in position divided by the change in time.</p>",
      "submissibilityCriterion": ["isNumeric", ["responseField", 1]],
      "responseBranches": [
        {
          "criterion": ["withinAbsTolerance", ["slope", "first-point-A", "second-point-A"], ["responseField", 1], 0.1],
          "step": "/shared/instantaneous-speed/page/12/step/16"
        }
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/12/step/6",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/instantaneous-speed/page/12/step/6",
      "activityPage": "/shared/instantaneous-speed/page/12",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/instantaneous-speed/axes/10s",
          "yAxis": "/shared/instantaneous-speed/axes/15m",
          "datasets": ["slope-data"],
          "annotations": ["first-point-A", "second-point-A", "slope-line-A"]
        },
        "bottom": {
          "type": "table",
          "dataset": "slope-data",
          "annotations": ["first-point-A", "second-point-A"]
        }
      },
      "beforeText": "<p>Incorrect.</p><p>What is the change in position?</p>",
      "responseTemplate": "/components/response-template/numeric",
      "afterText": "<p>Hint: Look at the graph.</p>",
      "startCommands": [
        {
          "action": "createRiseArrow",
          "literalArgs": {
            "arrowName": "rise-arrow-A",
            "firstPoint": "first-point-A",
            "secondPoint": "second-point-A",
            "color": "#cccccc",
            "isHighlighted": true
          }
        },
        {
          "action": "addAnnotation",
          "literalArgs": {
            "name": "rise-arrow-A",
            "pane": "top"
          }
        }
      ],
      "submissibilityCriterion": ["isNumeric", ["responseField", 1]],
      "responseBranches": [
        {
          "criterion": ["withinAbsTolerance", ["delta", "y", ["slopeToolOrder", "first-point-A", "second-point-A"]], ["responseField", 1], 0.1],
          "step": "/shared/instantaneous-speed/page/12/step/10"
        }
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/12/step/7",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/instantaneous-speed/page/12/step/7",
      "activityPage": "/shared/instantaneous-speed/page/12",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/instantaneous-speed/axes/10s",
          "yAxis": "/shared/instantaneous-speed/axes/15m",
          "datasets": ["slope-data"],
          "annotations": ["first-point-A", "second-point-A", "slope-line-A", "rise-arrow-A"]
        },
        "bottom": {
          "type": "table",
          "dataset": "slope-data",
          "annotations": ["first-point-A", "second-point-A"]
        }
      },
      "beforeText": "<p>Incorrect.</p><p>What is the change in position?</p>",
      "responseTemplate": "/components/response-template/numeric",
      "afterText": "<p>Hint: Look at the table and the graph.</p>",
      "startCommands": [
        {
          "action": "createRiseBracket",
          "literalArgs": {
            "bracketName": "rise-bracket-A",
            "point1": "first-point-A",
            "point2": "second-point-A",
            "datasetName": "slope-data",
            "color": "#cccccc",
            "isHighlighted": true
          }
        },
        {
          "action": "addAnnotation",
          "literalArgs": {
            "name": "rise-bracket-A",
            "tableName": "slope-data"
          }
        }
      ],
      "submissibilityCriterion": ["isNumeric", ["responseField", 1]],
      "responseBranches": [
        {
          "criterion": ["withinAbsTolerance", ["delta", "y", ["slopeToolOrder", "first-point-A", "second-point-A"]], ["responseField", 1], 0.1],
          "step": "/shared/instantaneous-speed/page/12/step/10"
        }
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/12/step/8",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/instantaneous-speed/page/12/step/8",
      "activityPage": "/shared/instantaneous-speed/page/12",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/instantaneous-speed/axes/10s",
          "yAxis": "/shared/instantaneous-speed/axes/15m",
          "datasets": ["slope-data"],
          "annotations": ["first-point-A", "second-point-A", "slope-line-A", "rise-arrow-A"]
        },
        "bottom": {
          "type": "table",
          "dataset": "slope-data",
          "annotations": ["first-point-A", "second-point-A", "rise-bracket-A"]
        }
      },
      "beforeText": "<p>Incorrect. The change in position is <b>%@</b> - <b>%@</b>, or <b>%@</b> %@.</p>",
      "substitutedExpressions": [
        "end-position",
        "start-position",
        "change-position",
        "change-position-units"
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/12/step/9",
      "submitButtonTitle": "Continue"
    },
    {
      "url": "/shared/instantaneous-speed/page/12/step/9",
      "activityPage": "/shared/instantaneous-speed/page/12",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/instantaneous-speed/axes/10s",
          "yAxis": "/shared/instantaneous-speed/axes/15m",
          "datasets": ["slope-data"],
          "annotations": ["first-point-A", "second-point-A", "slope-line-A", "rise-arrow-A"]
        },
        "bottom": {
          "type": "table",
          "dataset": "slope-data",
          "annotations": ["first-point-A", "second-point-A", "rise-bracket-A"]
        }
      },
      "beforeText": "<p>What is the change in time? </p>",
      "responseTemplate": "/components/response-template/numeric",
      "afterText": "<p>Hint:Look at the graph.</p>",
      "startCommands": [
        {
          "action": "setAnnotationAttribute",
          "literalArgs": {
            "name": "rise-arrow-A",
            "isHighlighted": false
          }
        },
        {
          "action": "setAnnotationAttribute",
          "literalArgs": {
            "name": "rise-bracket-A",
            "isHighlighted": false
          }
        },
        {
          "action": "createRunArrow",
          "literalArgs": {
            "arrowName": "run-arrow-A",
            "firstPoint": "first-point-A",
            "secondPoint": "second-point-A",
            "color": "#cccccc",
            "isHighlighted": true
          }
        },
        {
          "action": "addAnnotation",
          "literalArgs": {
            "name": "run-arrow-A",
            "pane": "top"
          }
        }
      ],
      "submissibilityCriterion": ["isNumeric", ["responseField", 1]],
      "responseBranches": [
        {
          "criterion": ["withinAbsTolerance", ["delta", "x", ["slopeToolOrder", "first-point-A", "second-point-A"]], ["responseField", 1], 0.1],
          "step": "/shared/instantaneous-speed/page/12/step/13"
        }
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/12/step/11",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/instantaneous-speed/page/12/step/10",
      "activityPage": "/shared/instantaneous-speed/page/12",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/instantaneous-speed/axes/10s",
          "yAxis": "/shared/instantaneous-speed/axes/15m",
          "datasets": ["slope-data"],
          "annotations": ["first-point-A", "second-point-A", "slope-line-A", "rise-arrow-A"]
        },
        "bottom": {
          "type": "table",
          "dataset": "slope-data",
          "annotations": ["first-point-A", "second-point-A", "rise-bracket-A"]
        }
      },
      "beforeText": "<p>Correct!</p><p>What is the change in time? </p>",
      "responseTemplate": "/components/response-template/numeric",
      "afterText": "<p>Hint:Look at the graph.</p>",
      "startCommands": [
        {
          "action": "createRunArrow",
          "literalArgs": {
            "arrowName": "run-arrow-A",
            "firstPoint": "first-point-A",
            "secondPoint": "second-point-A",
            "color": "#cccccc",
            "isHighlighted": true
          }
        },
        {
          "action": "addAnnotation",
          "literalArgs": {
            "name": "run-arrow-A",
            "graphName": "slope-graph"
          }
        }
      ],
      "submissibilityCriterion": ["isNumeric", ["responseField", 1]],
      "responseBranches": [
        {
          "criterion": ["withinAbsTolerance", ["delta", "x", ["slopeToolOrder", "first-point-A", "second-point-A"]], ["responseField", 1], 0.1],
          "step": "/shared/instantaneous-speed/page/12/step/13"
        }
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/12/step/11",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/instantaneous-speed/page/12/step/11",
      "activityPage": "/shared/instantaneous-speed/page/12",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/instantaneous-speed/axes/10s",
          "yAxis": "/shared/instantaneous-speed/axes/15m",
          "datasets": ["slope-data"],
          "annotations": ["first-point-A", "second-point-A", "slope-line-A", "rise-arrow-A", "run-arrow-A"]
        },
        "bottom": {
          "type": "table",
          "dataset": "slope-data",
          "annotations": ["first-point-A", "second-point-A", "rise-bracket-A"]
        }
      },
      "beforeText": "<p>Incorrect.</p><p>What is the change in time?</p>",
      "responseTemplate": "/components/response-template/numeric",
      "afterText": "<p>Hint: Look at the table and the graph.</p>",
      "startCommands": [
        {
          "action": "createRunBracket",
          "literalArgs": {
            "bracketName": "run-bracket-A",
            "point1": "first-point-A",
            "point2": "second-point-A",
            "datasetName": "slope-data",
            "color": "#cccccc",
            "isHighlighted": true
          }
        },
        {
          "action": "addAnnotation",
          "literalArgs": {
            "name": "run-bracket-A",
            "tableName": "slope-data"
          }
        }
      ],
      "submissibilityCriterion": ["isNumeric", ["responseField", 1]],
      "responseBranches": [
        {
          "criterion": ["withinAbsTolerance", ["delta", "x", ["slopeToolOrder", "first-point-A", "second-point-A"]], ["responseField", 1], 0.1],
          "step": "/shared/instantaneous-speed/page/12/step/13"
        }
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/12/step/12",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/instantaneous-speed/page/12/step/12",
      "activityPage": "/shared/instantaneous-speed/page/12",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/instantaneous-speed/axes/10s",
          "yAxis": "/shared/instantaneous-speed/axes/15m",
          "datasets": ["slope-data"],
          "annotations": ["first-point-A", "second-point-A", "slope-line-A", "rise-arrow-A", "run-arrow-A"]
        },
        "bottom": {
          "type": "table",
          "dataset": "slope-data",
          "annotations": ["first-point-A", "second-point-A", "rise-bracket-A", "run-bracket-A"]
        }
      },
      "beforeText": "<p>Incorrect. The change in time is <b>%@</b> - <b>%@</b>, or <b>%@</b> %@.</p>",
      "substitutedExpressions": [
        "end-time",
        "start-time",
        "change-time",
        "change-time-units"
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/12/step/13",
      "submitButtonTitle": "Continue"
    },
    {
      "url": "/shared/instantaneous-speed/page/12/step/13",
      "activityPage": "/shared/instantaneous-speed/page/12",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/instantaneous-speed/axes/10s",
          "yAxis": "/shared/instantaneous-speed/axes/15m",
          "datasets": ["slope-data"],
          "annotations": ["first-point-A", "second-point-A", "slope-line-A"]
        },
        "bottom": {
          "type": "table",
          "dataset": "slope-data",
          "annotations": ["first-point-A", "second-point-A"]
        }
      },
      "beforeText": "<p>If the change in position is <b>%@</b> %@ and the change in time is <b>%@</b> %@, what is the velocity, in meters per second?</p>",
      "responseTemplate": "/components/response-template/numeric",
      "substitutedExpressions": [
        "change-position",
        "change-position-units",
        "change-time",
        "change-time-units"
      ],
      "submissibilityCriterion": ["isNumeric", ["responseField", 1]],
      "responseBranches": [
        {
          "criterion": ["withinAbsTolerance", ["slope", "first-point-A", "second-point-A"], ["responseField", 1], 0.1],
          "step": "/shared/instantaneous-speed/page/12/step/16"
        }
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/12/step/14",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/instantaneous-speed/page/12/step/14",
      "activityPage": "/shared/instantaneous-speed/page/12",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/instantaneous-speed/axes/10s",
          "yAxis": "/shared/instantaneous-speed/axes/15m",
          "datasets": ["slope-data"],
          "annotations": ["first-point-A", "second-point-A", "slope-line-A"]
        },
        "bottom": {
          "type": "table",
          "dataset": "slope-data",
          "annotations": ["first-point-A", "second-point-A"]
        }
      },
      "beforeText": "<p>Incorrect.</p><p>If the change in position is <b>%@</b> %@ and the change in time is <b>%@</b> %@, what is the velocity, in meters per second?</p>",
      "responseTemplate": "/components/response-template/numeric",
      "afterText": "<p>Hint: Recall that velocity is the change in position divided by the change in time.</p>",
      "substitutedExpressions": [
        "change-position",
        "change-position-units",
        "change-time",
        "change-time-units"
      ],
      "submissibilityCriterion": ["isNumeric", ["responseField", 1]],
      "responseBranches": [
        {
          "criterion": ["withinAbsTolerance", ["slope", "first-point-A", "second-point-A"], ["responseField", 1], 0.1],
          "step": "/shared/instantaneous-speed/page/12/step/16"
        }
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/12/step/15",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/instantaneous-speed/page/12/step/15",
      "activityPage": "/shared/instantaneous-speed/page/12",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/instantaneous-speed/axes/10s",
          "yAxis": "/shared/instantaneous-speed/axes/15m",
          "datasets": ["slope-data"],
          "annotations": ["first-point-A", "second-point-A", "slope-line-A"]
        },
        "bottom": {
          "type": "table",
          "dataset": "slope-data",
          "annotations": ["first-point-A", "second-point-A"]
        }
      },
      "beforeText": "<p>Incorrect.</p><p>If the change in position is <b>%@</b> %@ and the change in time is <b>%@</b> %@, the velocity is <b>%@</b> divided by <b>%@</b>, or <b>%@</b> %@.</p>",
      "substitutedExpressions": [
        "change-position",
        "change-position-units",
        "change-time",
        "change-time-units",
        "change-position",
        "change-time",
        "velocity",
        "velocity-units"
      ],
      "shouldFinishImmediately": true,
      "isFinalStep": true,
      "hideSubmitButton": true
    },
    {
      "url": "/shared/instantaneous-speed/page/12/step/16",
      "activityPage": "/shared/instantaneous-speed/page/12",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/instantaneous-speed/axes/10s",
          "yAxis": "/shared/instantaneous-speed/axes/15m",
          "datasets": ["slope-data"],
          "annotations": ["first-point-A", "second-point-A", "slope-line-A"]
        },
        "bottom": {
          "type": "table",
          "dataset": "slope-data",
          "annotations": ["first-point-A", "second-point-A"]
        }
      },
      "beforeText": "<p>Correct!</p><p>The position changed <b>%@</b> %@ in <b>%@</b> %@, so the velocity was <b>%@</b> %@.</p>",
      "substitutedExpressions": [
        "change-position",
        "change-position-units",
        "change-time",
        "change-time-units",
        "velocity",
        "velocity-units"
      ],
      "shouldFinishImmediately": true,
      "isFinalStep": true,
      "hideSubmitButton": true
    },
    
    
    
    
    
    
    
    
    
    
    
    
    
    /************ Page 13 ************/













    {
      "url": "/shared/instantaneous-speed/page/13/step/1",
      "activityPage": "/shared/instantaneous-speed/page/13",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/instantaneous-speed/axes/10s",
          "yAxis": "/shared/instantaneous-speed/axes/15m",
          "datasets": ["slope-data"],
          "annotations": ["first-point-A", "second-point-A", "first-point-B"]
        },
        "bottom": {
          "type": "table",
          "dataset": "slope-data",
          "annotations": ["first-point-A", "second-point-A", "first-point-B"]
        }
      },
      "beforeText": "<p>Choose a point that is different from those you selected earlier. Then click <b>OK</b>.</p>",
      "tools": [
        { "type": "interactiveSelection",
          "annotation": "first-point-B",
          "dataset": "slope-data"
        }
      ],
      "startCommands": [
        {
          "action": "setAnnotationAttribute",
          "literalArgs": {
            "name": "first-point-A",
            "pointColor": "#f2b3b3"
          }
        },
        {
          "action": "setAnnotationAttribute",
          "literalArgs": {
            "name": "second-point-A",
            "pointColor": "#f2b3b3"
          }
        }
      ],
      "responseBranches": [
        {
          "criterion": ["or", ["samePoint", "first-point-B", "first-point-A"], ["samePoint", "first-point-B", "second-point-A"]],
          "step": "/shared/instantaneous-speed/page/13/step/1a"
        }
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/13/step/2",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/instantaneous-speed/page/13/step/1a",
      "activityPage": "/shared/instantaneous-speed/page/13",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/instantaneous-speed/axes/10s",
          "yAxis": "/shared/instantaneous-speed/axes/15m",
          "datasets": ["slope-data"],
          "annotations": ["first-point-A", "second-point-A", "first-point-B"]
        },
        "bottom": {
          "type": "table",
          "dataset": "slope-data",
          "annotations": ["first-point-A", "second-point-A", "first-point-B"]
        }
      },
      "beforeText": "<p>Try again.</p><p>Choose a point that is <b>different</b> from those you selected earlier. Then click <b>OK</b>.</p>",
      "tools": [
        { "type": "interactiveSelection",
          "annotation": "first-point-B",
          "dataset": "slope-data"
        }
      ],
      "responseBranches": [
        {
          "criterion": ["or", ["samePoint", "first-point-B", "first-point-A"], ["samePoint", "first-point-B", "second-point-A"]],
          "step": "/shared/instantaneous-speed/page/13/step/1a"
        }
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/13/step/2",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/instantaneous-speed/page/13/step/2",
      "activityPage": "/shared/instantaneous-speed/page/13",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/instantaneous-speed/axes/10s",
          "yAxis": "/shared/instantaneous-speed/axes/15m",
          "datasets": ["slope-data"],
          "annotations": ["first-point-A", "second-point-A", "first-point-B", "second-point-B"]
        },
        "bottom": {
          "type": "table",
          "dataset": "slope-data",
          "annotations": ["first-point-A", "second-point-A", "first-point-B", "second-point-B"]
        }
      },
      "beforeText": "<p>Select a point next to to the first point. Then click <b>OK</b>.</p>",
      "tools": [
        { "type": "interactiveSelection",
          "annotation": "second-point-B",
          "dataset": "slope-data"
        }
      ],
      "responseBranches": [
        {
          "criterion": ["=", 1, ["absDiff", ["indexOf", "first-point-B"], ["indexOf", "second-point-B"]]],
          "step": "/shared/instantaneous-speed/page/13/step/4"
        }
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/13/step/3",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/instantaneous-speed/page/13/step/3",
      "activityPage": "/shared/instantaneous-speed/page/13",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/instantaneous-speed/axes/10s",
          "yAxis": "/shared/instantaneous-speed/axes/15m",
          "datasets": ["slope-data"],
          "annotations": ["first-point-A", "second-point-A", "first-point-B", "second-point-B"]
        },
        "bottom": {
          "type": "table",
          "dataset": "slope-data",
          "annotations": ["first-point-A", "second-point-A", "first-point-B", "second-point-B"]
        }
      },
      "beforeText": "<p>To calculate velocity in a small time interval, select a point that is next to the first point. Then click <b>OK</b>.</p>",
      "tools": [
        { "type": "interactiveSelection",
          "annotation": "second-point-B",
          "dataset": "slope-data"
        }
      ],
      "responseBranches": [
        {
          "criterion": ["=", 1, ["absDiff", ["indexOf", "first-point-B"], ["indexOf", "second-point-B"]]],
          "step": "/shared/instantaneous-speed/page/13/step/4"
        }
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/13/step/3",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/instantaneous-speed/page/13/step/4",
      "activityPage": "/shared/instantaneous-speed/page/13",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/instantaneous-speed/axes/10s",
          "yAxis": "/shared/instantaneous-speed/axes/15m",
          "datasets": ["slope-data"],
          "annotations": ["first-point-A", "second-point-A", "first-point-B", "second-point-B", "slope-line-B"]
        },
        "bottom": {
          "type": "table",
          "dataset": "slope-data",
          "annotations": ["first-point-A", "second-point-A", "first-point-B", "second-point-B"]
        }
      },
      "beforeText": "<p>Here is the line connecting the two points you selected. The velocity during this interval is the slope of this line.</p><p>What is the <b>velocity</b> between the two points, in meters per second?</p>",
      "responseTemplate": "/components/response-template/numeric",
      "contextVars": [
        { "name": "start-position",        "value": ["coord", "y", ["listItem", 1, ["slopeToolOrder", "first-point-B", "second-point-B"]]] },
        { "name": "end-position",          "value": ["coord", "y", ["listItem", 2, ["slopeToolOrder", "first-point-B", "second-point-B"]]] },
        { "name": "change-position",       "value": ["-", ["get", "end-position"], ["get", "start-position"]] },
        { "name": "change-position-units", "value": ["pluralizeUnits", "/builtins/units/meters", ["get", "change-position"]] },
        { "name": "start-time",            "value": ["coord", "x", ["listItem", 1, ["slopeToolOrder", "first-point-B", "second-point-B"]]] },
        { "name": "end-time",              "value": ["coord", "x", ["listItem", 2, ["slopeToolOrder", "first-point-B", "second-point-B"]]] },
        { "name": "change-time",           "value": ["-", ["get", "end-time"], ["get", "start-time"]] },
        { "name": "change-time-units",     "value": ["pluralizeUnits", "/builtins/units/seconds", ["get", "change-time"]] },
        { "name": "velocity",              "value": ["/", ["get", "change-position"], ["get", "change-time"]] },
        { "name": "velocity-units",        "value": ["pluralizeUnits", "/builtins/units/meters-per-second", ["get", "velocity"]] }
      ],
      "submissibilityCriterion": ["isNumeric", ["responseField", 1]],
      "responseBranches": [
        {
          "criterion": ["withinAbsTolerance", ["slope", "first-point-B", "second-point-B"], ["responseField", 1], 0.1],
          "step": "/shared/instantaneous-speed/page/13/step/16"
        }
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/13/step/5",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/instantaneous-speed/page/13/step/5",
      "activityPage": "/shared/instantaneous-speed/page/13",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/instantaneous-speed/axes/10s",
          "yAxis": "/shared/instantaneous-speed/axes/15m",
          "datasets": ["slope-data"],
          "annotations": ["first-point-A", "second-point-A", "first-point-B", "second-point-B", "slope-line-B"]
        },
        "bottom": {
          "type": "table",
          "dataset": "slope-data",
          "annotations": ["first-point-A", "second-point-A", "first-point-B", "second-point-B"]
        }
      },
      "beforeText": "<p>Incorrect.</p><p>What is the <b>velocity</b> between the two points, in meters per second?</p>",
      "responseTemplate": "/components/response-template/numeric",
      "afterText": "<p>Hint: Recall that velocity is the change in position divided by the change in time.</p>",
      "submissibilityCriterion": ["isNumeric", ["responseField", 1]],
      "responseBranches": [
        {
          "criterion": ["withinAbsTolerance", ["slope", "first-point-B", "second-point-B"], ["responseField", 1], 0.1],
          "step": "/shared/instantaneous-speed/page/13/step/16"
        }
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/13/step/6",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/instantaneous-speed/page/13/step/6",
      "activityPage": "/shared/instantaneous-speed/page/13",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/instantaneous-speed/axes/10s",
          "yAxis": "/shared/instantaneous-speed/axes/15m",
          "datasets": ["slope-data"],
          "annotations": ["first-point-A", "second-point-A", "first-point-B", "second-point-B", "slope-line-B"]
        },
        "bottom": {
          "type": "table",
          "dataset": "slope-data",
          "annotations": ["first-point-A", "second-point-A", "first-point-B", "second-point-B"]
        }
      },
      "beforeText": "<p>Incorrect.</p><p>What is the change in position?</p>",
      "responseTemplate": "/components/response-template/numeric",
      "afterText": "<p>Hint: Look at the graph.</p>",
      "startCommands": [
        {
          "action": "createRiseArrow",
          "literalArgs": {
            "arrowName": "rise-arrow-B",
            "firstPoint": "first-point-B",
            "secondPoint": "second-point-B",
            "color": "#cccccc",
            "isHighlighted": true
          }
        },
        {
          "action": "addAnnotation",
          "literalArgs": {
            "name": "rise-arrow-B",
            "pane": "top"
          }
        }
      ],
      "submissibilityCriterion": ["isNumeric", ["responseField", 1]],
      "responseBranches": [
        {
          "criterion": ["withinAbsTolerance", ["delta", "y", ["slopeToolOrder", "first-point-B", "second-point-B"]], ["responseField", 1], 0.1],
          "step": "/shared/instantaneous-speed/page/13/step/10"
        }
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/13/step/7",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/instantaneous-speed/page/13/step/7",
      "activityPage": "/shared/instantaneous-speed/page/13",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/instantaneous-speed/axes/10s",
          "yAxis": "/shared/instantaneous-speed/axes/15m",
          "datasets": ["slope-data"],
          "annotations": ["first-point-A", "second-point-A", "first-point-B", "second-point-B", "slope-line-B", "rise-arrow-B"]
        },
        "bottom": {
          "type": "table",
          "dataset": "slope-data",
          "annotations": ["first-point-A", "second-point-A", "first-point-B", "second-point-B"]
        }
      },
      "beforeText": "<p>Incorrect.</p><p>What is the change in position?</p>",
      "responseTemplate": "/components/response-template/numeric",
      "afterText": "<p>Hint: Look at the table and the graph.</p>",
      "startCommands": [
        {
          "action": "createRiseBracket",
          "literalArgs": {
            "bracketName": "rise-bracket-B",
            "point1": "first-point-B",
            "point2": "second-point-B",
            "datasetName": "slope-data",
            "color": "#cccccc",
            "isHighlighted": true
          }
        },
        {
          "action": "addAnnotation",
          "literalArgs": {
            "name": "rise-bracket-B",
            "tableName": "slope-data"
          }
        }
      ],
      "submissibilityCriterion": ["isNumeric", ["responseField", 1]],
      "responseBranches": [
        {
          "criterion": ["withinAbsTolerance", ["delta", "y", ["slopeToolOrder", "first-point-B", "second-point-B"]], ["responseField", 1], 0.1],
          "step": "/shared/instantaneous-speed/page/13/step/10"
        }
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/13/step/8",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/instantaneous-speed/page/13/step/8",
      "activityPage": "/shared/instantaneous-speed/page/13",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/instantaneous-speed/axes/10s",
          "yAxis": "/shared/instantaneous-speed/axes/15m",
          "datasets": ["slope-data"],
          "annotations": ["first-point-A", "second-point-A", "first-point-B", "second-point-B", "slope-line-B", "rise-arrow-B"]
        },
        "bottom": {
          "type": "table",
          "dataset": "slope-data",
          "annotations": ["first-point-A", "second-point-A", "first-point-B", "second-point-B", "rise-bracket-B"]
        }
      },
      "beforeText": "<p>Incorrect. The change in position is <b>%@</b> - <b>%@</b>, or <b>%@</b> %@.</p>",
      "substitutedExpressions": [
        "end-position",
        "start-position",
        "change-position",
        "change-position-units"
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/13/step/9",
      "submitButtonTitle": "Continue"
    },
    {
      "url": "/shared/instantaneous-speed/page/13/step/9",
      "activityPage": "/shared/instantaneous-speed/page/13",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/instantaneous-speed/axes/10s",
          "yAxis": "/shared/instantaneous-speed/axes/15m",
          "datasets": ["slope-data"],
          "annotations": ["first-point-A", "second-point-A", "first-point-B", "second-point-B", "slope-line-B", "rise-arrow-B"]
        },
        "bottom": {
          "type": "table",
          "dataset": "slope-data",
          "annotations": ["first-point-A", "second-point-A", "first-point-B", "second-point-B", "rise-bracket-B"]
        }
      },
      "beforeText": "<p>What is the change in time? </p>",
      "responseTemplate": "/components/response-template/numeric",
      "afterText": "<p>Hint:Look at the graph.</p>",
      "startCommands": [
        {
          "action": "setAnnotationAttribute",
          "literalArgs": {
            "name": "rise-arrow-B",
            "isHighlighted": false
          }
        },
        {
          "action": "setAnnotationAttribute",
          "literalArgs": {
            "name": "rise-bracket-B",
            "isHighlighted": false
          }
        },
        {
          "action": "createRunArrow",
          "literalArgs": {
            "arrowName": "run-arrow-B",
            "firstPoint": "first-point-B",
            "secondPoint": "second-point-B",
            "color": "#cccccc",
            "isHighlighted": true
          }
        },
        {
          "action": "addAnnotation",
          "literalArgs": {
            "name": "run-arrow-B",
            "pane": "top"
          }
        }
      ],
      "submissibilityCriterion": ["isNumeric", ["responseField", 1]],
      "responseBranches": [
        {
          "criterion": ["withinAbsTolerance", ["delta", "x", ["slopeToolOrder", "first-point-B", "second-point-B"]], ["responseField", 1], 0.1],
          "step": "/shared/instantaneous-speed/page/13/step/13"
        }
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/13/step/11",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/instantaneous-speed/page/13/step/10",
      "activityPage": "/shared/instantaneous-speed/page/13",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/instantaneous-speed/axes/10s",
          "yAxis": "/shared/instantaneous-speed/axes/15m",
          "datasets": ["slope-data"],
          "annotations": ["first-point-A", "second-point-A", "first-point-B", "second-point-B", "slope-line-B", "rise-arrow-B"]
        },
        "bottom": {
          "type": "table",
          "dataset": "slope-data",
          "annotations": ["first-point-A", "second-point-A", "first-point-B", "second-point-B", "rise-bracket-B"]
        }
      },
      "beforeText": "<p>Correct!</p><p>What is the change in time? </p>",
      "responseTemplate": "/components/response-template/numeric",
      "afterText": "<p>Hint:Look at the graph.</p>",
      "startCommands": [
        {
          "action": "setAnnotationAttribute",
          "literalArgs": {
            "name": "rise-arrow-B",
            "isHighlighted": false
          }
        },
        {
          "action": "setAnnotationAttribute",
          "literalArgs": {
            "name": "rise-bracket-B",
            "isHighlighted": false
          }
        },
        {
          "action": "createRunArrow",
          "literalArgs": {
            "arrowName": "run-arrow-B",
            "firstPoint": "first-point-B",
            "secondPoint": "second-point-B",
            "color": "#cccccc",
            "isHighlighted": true
          }
        },
        {
          "action": "addAnnotation",
          "literalArgs": {
            "name": "run-arrow-B",
            "pane": "top"
          }
        }
      ],
      "submissibilityCriterion": ["isNumeric", ["responseField", 1]],
      "responseBranches": [
        {
          "criterion": ["withinAbsTolerance", ["delta", "x", ["slopeToolOrder", "first-point-B", "second-point-B"]], ["responseField", 1], 0.1],
          "step": "/shared/instantaneous-speed/page/13/step/13"
        }
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/13/step/11",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/instantaneous-speed/page/13/step/11",
      "activityPage": "/shared/instantaneous-speed/page/13",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/instantaneous-speed/axes/10s",
          "yAxis": "/shared/instantaneous-speed/axes/15m",
          "datasets": ["slope-data"],
          "annotations": ["first-point-A", "second-point-A", "first-point-B", "second-point-B", "slope-line-B", "rise-arrow-B", "run-arrow-B"]
        },
        "bottom": {
          "type": "table",
          "dataset": "slope-data",
          "annotations": ["first-point-A", "second-point-A", "first-point-B", "second-point-B", "rise-bracket-B"]
        }
      },
      "beforeText": "<p>Incorrect.</p><p>What is the change in time?</p>",
      "responseTemplate": "/components/response-template/numeric",
      "afterText": "<p>Hint: Look at the table and the graph.</p>",
      "startCommands": [
        {
          "action": "createRunBracket",
          "literalArgs": {
            "bracketName": "run-bracket-B",
            "point1": "first-point-B",
            "point2": "second-point-B",
            "datasetName": "slope-data",
            "color": "#cccccc",
            "isHighlighted": true
          }
        },
        {
          "action": "addAnnotation",
          "literalArgs": {
            "name": "run-bracket-B",
            "tableName": "slope-data"
          }
        }
      ],
      "submissibilityCriterion": ["isNumeric", ["responseField", 1]],
      "responseBranches": [
        {
          "criterion": ["withinAbsTolerance", ["delta", "x", ["slopeToolOrder", "first-point-B", "second-point-B"]], ["responseField", 1], 0.1],
          "step": "/shared/instantaneous-speed/page/13/step/13"
        }
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/13/step/12",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/instantaneous-speed/page/13/step/12",
      "activityPage": "/shared/instantaneous-speed/page/13",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/instantaneous-speed/axes/10s",
          "yAxis": "/shared/instantaneous-speed/axes/15m",
          "datasets": ["slope-data"],
          "annotations": ["first-point-A", "second-point-A", "first-point-B", "second-point-B", "slope-line-B", "rise-arrow-B", "run-arrow-B"]
        },
        "bottom": {
          "type": "table",
          "dataset": "slope-data",
          "annotations": ["first-point-A", "second-point-A", "first-point-B", "second-point-B", "rise-bracket-B", "run-bracket-B"]
        }
      },
      "beforeText": "<p>Incorrect. The change in time is <b>%@</b> - <b>%@</b>, or <b>%@</b> %@.</p>",
      "substitutedExpressions": [
        "end-time",
        "start-time",
        "change-time",
        "change-time-units"
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/13/step/13",
      "submitButtonTitle": "Continue"
    },
    {
      "url": "/shared/instantaneous-speed/page/13/step/13",
      "activityPage": "/shared/instantaneous-speed/page/13",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/instantaneous-speed/axes/10s",
          "yAxis": "/shared/instantaneous-speed/axes/15m",
          "datasets": ["slope-data"],
          "annotations": ["first-point-A", "second-point-A", "first-point-B", "second-point-B", "slope-line-B"]
        },
        "bottom": {
          "type": "table",
          "dataset": "slope-data",
          "annotations": ["first-point-A", "second-point-A", "first-point-B", "second-point-B"]
        }
      },
      "beforeText": "<p>If the change in position is <b>%@</b> %@ and the change in time is <b>%@</b> %@, what is the velocity, in meters per second?</p>",
      "responseTemplate": "/components/response-template/numeric",
      "substitutedExpressions": [
        "change-position",
        "change-position-units",
        "change-time",
        "change-time-units"
      ],
      "submissibilityCriterion": ["isNumeric", ["responseField", 1]],
      "responseBranches": [
        {
          "criterion": ["withinAbsTolerance", ["slope", "first-point-B", "second-point-B"], ["responseField", 1], 0.1],
          "step": "/shared/instantaneous-speed/page/13/step/16"
        }
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/13/step/14",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/instantaneous-speed/page/13/step/14",
      "activityPage": "/shared/instantaneous-speed/page/13",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/instantaneous-speed/axes/10s",
          "yAxis": "/shared/instantaneous-speed/axes/15m",
          "datasets": ["slope-data"],
          "annotations": ["first-point-A", "second-point-A", "first-point-B", "second-point-B", "slope-line-B"]
        },
        "bottom": {
          "type": "table",
          "dataset": "slope-data",
          "annotations": ["first-point-A", "second-point-A", "first-point-B", "second-point-B"]
        }
      },
      "beforeText": "<p>Incorrect.</p><p>If the change in position is <b>%@</b> %@ and the change in time is <b>%@</b> %@, what is the velocity, in meters per second?</p>",
      "responseTemplate": "/components/response-template/numeric",
      "afterText": "<p>Hint: Recall that velocity is the change in position divided by the change in time.</p>",
      "substitutedExpressions": [
        "change-position",
        "change-position-units",
        "change-time",
        "change-time-units"
      ],
      "submissibilityCriterion": ["isNumeric", ["responseField", 1]],
      "responseBranches": [
        {
          "criterion": ["withinAbsTolerance", ["slope", "first-point-B", "second-point-B"], ["responseField", 1], 0.1],
          "step": "/shared/instantaneous-speed/page/13/step/16"
        }
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/13/step/15",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/instantaneous-speed/page/13/step/15",
      "activityPage": "/shared/instantaneous-speed/page/13",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/instantaneous-speed/axes/10s",
          "yAxis": "/shared/instantaneous-speed/axes/15m",
          "datasets": ["slope-data"],
          "annotations": ["first-point-A", "second-point-A", "first-point-B", "second-point-B", "slope-line-B"]
        },
        "bottom": {
          "type": "table",
          "dataset": "slope-data",
          "annotations": ["first-point-A", "second-point-A", "first-point-B", "second-point-B"]
        }
      },
      "beforeText": "<p>Incorrect.</p><p>If the change in position is <b>%@</b> %@ and the change in time is <b>%@</b> %@, the velocity is <b>%@</b> divided by <b>%@</b>, or <b>%@</b> %@.</p>",
      "substitutedExpressions": [
        "change-position",
        "change-position-units",
        "change-time",
        "change-time-units",
        "change-position",
        "change-time",
        "velocity",
        "velocity-units"
      ],
      "shouldFinishImmediately": true,
      "isFinalStep": true,
      "hideSubmitButton": true
    },
    {
      "url": "/shared/instantaneous-speed/page/13/step/16",
      "activityPage": "/shared/instantaneous-speed/page/13",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/instantaneous-speed/axes/10s",
          "yAxis": "/shared/instantaneous-speed/axes/15m",
          "datasets": ["slope-data"],
          "annotations": ["first-point-A", "second-point-A", "first-point-B", "second-point-B", "slope-line-B"]
        },
        "bottom": {
          "type": "table",
          "dataset": "slope-data",
          "annotations": ["first-point-A", "second-point-A", "first-point-B", "second-point-B"]
        }
      },
      "beforeText": "<p>Correct!</p><p>The position changed <b>%@</b> %@ in <b>%@</b> %@, so the velocity was <b>%@</b> %@.</p>",
      "substitutedExpressions": [
        "change-position",
        "change-position-units",
        "change-time",
        "change-time-units",
        "velocity",
        "velocity-units"
      ],
      "shouldFinishImmediately": true,
      "isFinalStep": true,
      "hideSubmitButton": true
    },
    
    
    
    
    
    
    
    
    
    
    
    
    
    /************ Page 14 ************/













    {
      "url": "/shared/instantaneous-speed/page/14/step/1",
      "activityPage": "/shared/instantaneous-speed/page/14",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/instantaneous-speed/axes/10s",
          "yAxis": "/shared/instantaneous-speed/axes/15m",
          "datasets": ["slope-data"],
          "annotations": ["first-point-A", "second-point-A", "slope-line-A", "first-point-B", "second-point-B", "slope-line-B"]
        }
      },
      "responseTemplate": "/components/response-template/open",
      "startCommands": [
        {
          "action": "setAnnotationAttribute",
          "literalArgs": {
            "name": "first-point-B",
            "pointColor": "#f2b3b3"          
          }
        },
        {
          "action": "setAnnotationAttribute",
          "literalArgs": {
            "name": "second-point-B",
            "pointColor": "#f2b3b3"
          }
        }
      ],
      "submissibilityCriterion": ["textLengthIsAtLeast", 1, ["responseField", 1]],
      "isFinalStep": true,
      "hideSubmitButton": true,
      "nextButtonShouldSubmit": true
    }
  ],
  "units": [

  ],
  "axes": [  
    {
      "url": "/shared/instantaneous-speed/axes/10s",
      "units": "/builtins/units/seconds",
      "min": 0,
      "max": 10,
      "nSteps": 5,
      "label": "Time"
    },
    {
      "url": "/shared/instantaneous-speed/axes/15m",
      "units": "/builtins/units/meters",
      "min": 0,
      "max": 15,
      "nSteps": 5,
      "label": "Position"
    }
  ],
  "graphs": [
  
  ],
  "responseTemplates": [
    {
      "url": "/components/response-template/open",
      "templateString": "",
      "fieldTypes": [
        "textarea"
      ],
      "fieldChoicesList": [
        null
      ],
      "initialValues": [
        ""
      ]
    },
    {
      "url": "/components/response-template/numeric",
      "templateString": "",
      "fieldTypes": [
        "numeric"
      ],
      "fieldChoicesList": [
        null
      ],
      "initialValues": [

      ]
    }
  ],
  "datasets": [
    {
      "url": "/shared/instantaneous-speed/dataset/slope-data",
      "name": "slope-data",
      "activity": "/shared/instantaneous-speed",
      "xUnits": "/builtins/units/seconds",
      "xLabel": "Time",
      "xShortLabel": "Time",
      "yUnits": "/builtins/units/meters",
      "yLabel": "Position",
      "yShortLabel": "Position",
      "points": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "session": null,
      "defaultColor": null
    }
  ],
  "datapoints": [
    {
      "x": 0,
      "y": 0,
      "guid": 1,
      "dataset": "/shared/instantaneous-speed/dataset/slope-data"
    },
    {
      "x": 1,
      "y": 2,
      "guid": 2,
      "dataset": "/shared/instantaneous-speed/dataset/slope-data"
    },
    {
      "x": 2,
      "y": 4,
      "guid": 3,
      "dataset": "/shared/instantaneous-speed/dataset/slope-data"
    },
    {
      "x": 3,
      "y": 5,
      "guid": 4,
      "dataset": "/shared/instantaneous-speed/dataset/slope-data"
    },
    {
      "x": 4,
      "y": 6,
      "guid": 5,
      "dataset": "/shared/instantaneous-speed/dataset/slope-data"
    },
    {
      "x": 5,
      "y": 4,
      "guid": 6,
      "dataset": "/shared/instantaneous-speed/dataset/slope-data"
    },
    {
      "x": 6,
      "y": 8,
      "guid": 7,
      "dataset": "/shared/instantaneous-speed/dataset/slope-data"
    },
    {
      "x": 7,
      "y": 10,
      "guid": 8,
      "dataset": "/shared/instantaneous-speed/dataset/slope-data"
    },
    {
      "x": 8,
      "y": 11,
      "guid": 9,
      "dataset": "/shared/instantaneous-speed/dataset/slope-data"
    },
    {
      "x": 9,
      "y": 12,
      "guid": 10,
      "dataset": "/shared/instantaneous-speed/dataset/slope-data"
    },
    {
      "x": 10,
      "y": 15,
      "guid": 11,
      "dataset": "/shared/instantaneous-speed/dataset/slope-data"
    },
    {
      "x": 7,
      "y": 4,
      "guid": "16-A"
    },
    {
      "x": 10,
      "y": 2.9,
      "guid": "16-B"
    },
    {
      "x": 10.5,
      "y": 1.9,
      "guid": "16-C"
    },
    {
      "x": 13,
      "y": 0.9,
      "guid": "16-D"
    }
  ],
  "annotations": [
    { "type": "LineThroughPoints",
      "records": [
        {
          "url": "/shared/instantaneous-speed/annotation/slope-line-A",
          "name": "slope-line-A",
          "activity": "/shared/instantaneous-speed",
          "session": null,
          "point1": "first-point-A",
          "point2": "second-point-A",
          "color": "#1f77b4"
        },
        {
          "url": "/shared/instantaneous-speed/annotation/slope-line-B",
          "name": "slope-line-B",
          "activity": "/shared/instantaneous-speed",
          "session": null,
          "point1": "first-point-B",
          "point2": "second-point-B",
          "color": "#ff7f0d"
        }
      ]
    },
    {
      "type": "HighlightedPoint",
      "records": [
        {
          "url": "/shared/instantaneous-speed/annotation/first-point-A",
          "name": "first-point-A",
          "activity": "/shared/instantaneous-speed",
          "session": null,
          "point": null,
          "displayStyle": "highlight-point-and-dim-background",
          "datasetColor": "#cccccc",
          "pointColor": "#1f77b4"
        },
        {
          "url": "/shared/instantaneous-speed/annotation/second-point-A",
          "name": "second-point-A",
          "activity": "/shared/instantaneous-speed",
          "session": null,
          "point": null,
          "displayStyle": "highlight-point-and-dim-background",
          "datasetColor": "#cccccc",
          "pointColor": "#ff7f0e"
        },
        {
          "url": "/shared/instantaneous-speed/annotation/first-point-B",
          "name": "first-point-B",
          "activity": "/shared/instantaneous-speed",
          "session": null,
          "point": null,
          "displayStyle": "highlight-point-and-dim-background",
          "datasetColor": "#cccccc",
          "pointColor": "#1f77b4"
        },
        {
          "url": "/shared/instantaneous-speed/annotation/second-point-B",
          "name": "second-point-B",
          "activity": "/shared/instantaneous-speed",
          "session": null,
          "point": null,
          "displayStyle": "highlight-point-and-dim-background",
          "datasetColor": "#cccccc",
          "pointColor": "#ff7f0e"
        }
      ]
    }
  ]
};
