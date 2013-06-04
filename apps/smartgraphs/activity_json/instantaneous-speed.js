/*globals Smartgraphs */

Smartgraphs.activityDocs = Smartgraphs.activityDocs || {};
Smartgraphs.activityDocs["/shared/instantaneous-speed"] =
{
  "_id": "instantanous-speed.df6",
  "_rev": "0",
  "data_format_version": 6,
  "activity": {
    "title": "Instantaneous Speed (Slope Tool)",
    "url": "/shared/instantaneous-speed",
    "owner": "shared",
    "pages": [
      "/shared/instantaneous-speed/page/1",
      "/shared/instantaneous-speed/page/2",
      "/shared/instantaneous-speed/page/3"
    ],
    "datasets": [
      "/shared/instantaneous-speed/dataset/slope-data"
    ],
    "units": [

    ],
    "axes": [
      "/shared/instantaneous-speed/axes/10s",
      "/shared/instantaneous-speed/axes/16m"
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
      "url": "/shared/instantaneous-speed/page/1",
      "activity": "/shared/instantaneous-speed",
      "index": 1,
      "introText": "<h1>Analysis</h1><p>Suppose you collected some actual position-time data while walking from 0 to 15 meters and displayed your data to the right. Let's find out how fast you walked during different time intervals.</p><p>First you will pick two points that are next to each other and find the velocity between those points. This calculation will be close to your <b>instantaneous</b> velocity. </p>",
      "steps": [
        "/shared/instantaneous-speed/page/1/step/1",
        "/shared/instantaneous-speed/page/1/step/2",
        "/shared/instantaneous-speed/page/1/step/3",
        "/shared/instantaneous-speed/page/1/step/4",
        "/shared/instantaneous-speed/page/1/step/5",
        "/shared/instantaneous-speed/page/1/step/6",
        "/shared/instantaneous-speed/page/1/step/7",
        "/shared/instantaneous-speed/page/1/step/8",
        "/shared/instantaneous-speed/page/1/step/9",
        "/shared/instantaneous-speed/page/1/step/10",
        "/shared/instantaneous-speed/page/1/step/11",
        "/shared/instantaneous-speed/page/1/step/12",
        "/shared/instantaneous-speed/page/1/step/13",
        "/shared/instantaneous-speed/page/1/step/14",
        "/shared/instantaneous-speed/page/1/step/15",
        "/shared/instantaneous-speed/page/1/step/16"
      ],
      "firstStep": "/shared/instantaneous-speed/page/1/step/1",
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
      ]
    },
    {
      "name": "Instantaneous Speed II",
      "url": "/shared/instantaneous-speed/page/2",
      "activity": "/shared/instantaneous-speed",
      "index": 2,
      "introText": "<h1>Analysis</h1><p>Now you will pick another set of points that are next to each other and find the velocity between those points.</p>",
      "steps": [
        "/shared/instantaneous-speed/page/2/step/1",
        "/shared/instantaneous-speed/page/2/step/1a",
        "/shared/instantaneous-speed/page/2/step/2",
        "/shared/instantaneous-speed/page/2/step/3",
        "/shared/instantaneous-speed/page/2/step/4",
        "/shared/instantaneous-speed/page/2/step/5",
        "/shared/instantaneous-speed/page/2/step/6",
        "/shared/instantaneous-speed/page/2/step/7",
        "/shared/instantaneous-speed/page/2/step/8",
        "/shared/instantaneous-speed/page/2/step/9",
        "/shared/instantaneous-speed/page/2/step/10",
        "/shared/instantaneous-speed/page/2/step/11",
        "/shared/instantaneous-speed/page/2/step/12",
        "/shared/instantaneous-speed/page/2/step/13",
        "/shared/instantaneous-speed/page/2/step/14",
        "/shared/instantaneous-speed/page/2/step/15",
        "/shared/instantaneous-speed/page/2/step/16"
      ],
      "firstStep": "/shared/instantaneous-speed/page/2/step/1",
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
      ]
    },
    {
      "name": "Instantaneous Speed III",
      "url": "/shared/instantaneous-speed/page/3",
      "activity": "/shared/instantaneous-speed",
      "index": 3,
      "steps": [
        "/shared/instantaneous-speed/page/3/step/1"
      ],
      "firstStep": "/shared/instantaneous-speed/page/3/step/1",
      "introText": "<h1>Analysis</h1><p>Was your velocity the same during the two different time intervals? If not, during which interval were you going faster? Explain how you know.</p>"
    }
  ],
  "steps": [
    {
      "url": "/shared/instantaneous-speed/page/1/step/1",
      "activityPage": "/shared/instantaneous-speed/page/1",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/instantaneous-speed/axes/10s",
          "yAxis": "/shared/instantaneous-speed/axes/16m",
          "data": ["slope-data"],
          "annotations": ["p1A-highlight"],
          "activeDatadefs": ["slope-data"]
        },
        "bottom": {
          "type": "table",
          "data": "slope-data",
          "annotations": ["p1A-highlight"],
          "xLabel": "Time",
          "yLabel": "Position"
        }
      },
      "beforeText": "<p>Select a point and then click <b>OK</b>.</p>",
      "tools": [
        { "name": "tagging",
          "setup": {
            "tag": "first-point-A",
            "data": "slope-data"
          }
        }
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/1/step/2",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/instantaneous-speed/page/1/step/2",
      "activityPage": "/shared/instantaneous-speed/page/1",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/instantaneous-speed/axes/10s",
          "yAxis": "/shared/instantaneous-speed/axes/16m",
          "data": ["slope-data"],
          "annotations": ["p1A-highlight", "p2A-highlight"],
          "activeDatadefs": ["slope-data"]
        },
        "bottom": {
          "type": "table",
          "data": "slope-data",
          "annotations": ["p1A-highlight", "p2A-highlight"],
          "xLabel": "Time",
          "yLabel": "Position"
        }
      },
      "beforeText": "<p>Select a point next to to the first point. Then click <b>OK</b>.</p>",
      "tools": [
        { "name": "tagging",
          "setup": {
            "tag": "second-point-A",
            "data": "slope-data"
          }
        }
      ],
      "responseBranches": [
        {
          "criterion": ["=", 1, ["absDiff", ["indexInDataset", "first-point-A"], ["indexInDataset", "second-point-A"]]],
          "step": "/shared/instantaneous-speed/page/1/step/4"
        }
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/1/step/3",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/instantaneous-speed/page/1/step/3",
      "activityPage": "/shared/instantaneous-speed/page/1",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/instantaneous-speed/axes/10s",
          "yAxis": "/shared/instantaneous-speed/axes/16m",
          "data": ["slope-data"],
          "annotations": ["p1A-highlight", "p2A-highlight"],
          "activeDatadefs": ["slope-data"]
        },
        "bottom": {
          "type": "table",
          "data": "slope-data",
          "annotations": ["p1A-highlight", "p2A-highlight"],
          "xLabel": "Time",
          "yLabel": "Position"
        }
      },
      "beforeText": "<p>To calculate velocity in a small time interval, select a point that is next to the first point. Then click <b>OK</b>.</p>",
      "tools": [
        { "name": "tagging",
          "setup": {
            "tag": "second-point-A",
            "data": "slope-data"
          }
        }
      ],
      "responseBranches": [
        {
          "criterion": ["=", 1, ["absDiff", ["indexInDataset", "first-point-A"], ["indexInDataset", "second-point-A"]]],
          "step": "/shared/instantaneous-speed/page/1/step/4"
        }
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/1/step/3",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/instantaneous-speed/page/1/step/4",
      "activityPage": "/shared/instantaneous-speed/page/1",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/instantaneous-speed/axes/10s",
          "yAxis": "/shared/instantaneous-speed/axes/16m",
          "data": ["slope-data"],
          "annotations": ["p1A-highlight", "p2A-highlight", "slope-line-A"],
          "activeDatadefs": ["slope-data"]
        },
        "bottom": {
          "type": "table",
          "data": "slope-data",
          "annotations": ["p1A-highlight", "p2A-highlight"],
          "xLabel": "Time",
          "yLabel": "Position"
        }
      },
      "beforeText": "<p>Here is the line connecting the two points you selected. The velocity during this interval is the slope of this line.</p><p>What is the <b>velocity</b> between the two points, in meters per second?</p>",
      "responseTemplate": "/components/response-template/numeric",
      "submissibilityCriterion": ["isNumeric", ["responseField", 1]],
      "responseBranches": [
        {
          "criterion": ["withinAbsTolerance", ["slope", "first-point-A", "second-point-A"], ["responseField", 1], 0.1],
          "step": "/shared/instantaneous-speed/page/1/step/16"
        }
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/1/step/5",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/instantaneous-speed/page/1/step/5",
      "activityPage": "/shared/instantaneous-speed/page/1",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/instantaneous-speed/axes/10s",
          "yAxis": "/shared/instantaneous-speed/axes/16m",
          "data": ["slope-data"],
          "annotations": ["p1A-highlight", "p2A-highlight", "slope-line-A"],
          "activeDatadefs": ["slope-data"]
        },
        "bottom": {
          "type": "table",
          "data": "slope-data",
          "annotations": ["p1A-highlight", "p2A-highlight"],
          "xLabel": "Time",
          "yLabel": "Position"
        }
      },
      "beforeText": "<p>Incorrect.</p><p>What is the <b>velocity</b> between the two points, in meters per second?</p>",
      "responseTemplate": "/components/response-template/numeric",
      "afterText": "<p>Hint: Recall that velocity is the change in position divided by the change in time.</p>",
      "submissibilityCriterion": ["isNumeric", ["responseField", 1]],
      "responseBranches": [
        {
          "criterion": ["withinAbsTolerance", ["slope", "first-point-A", "second-point-A"], ["responseField", 1], 0.1],
          "step": "/shared/instantaneous-speed/page/1/step/16"
        }
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/1/step/6",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/instantaneous-speed/page/1/step/6",
      "activityPage": "/shared/instantaneous-speed/page/1",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/instantaneous-speed/axes/10s",
          "yAxis": "/shared/instantaneous-speed/axes/16m",
          "data": ["slope-data"],
          "annotations": ["p1A-highlight", "p2A-highlight", "slope-line-A"],
          "highlightedAnnotations": ["rise-arrow-A"],
          "activeDatadefs": ["slope-data"]
        },
        "bottom": {
          "type": "table",
          "data": "slope-data",
          "annotations": ["p1A-highlight", "p2A-highlight"],
          "xLabel": "Time",
          "yLabel": "Position"
        }
      },
      "beforeText": "<p>Incorrect.</p><p>What is the change in position?</p>",
      "responseTemplate": "/components/response-template/numeric",
      "afterText": "<p>Hint: Look at the graph.</p>",
      "submissibilityCriterion": ["isNumeric", ["responseField", 1]],
      "responseBranches": [
        {
          "criterion": ["withinAbsTolerance", ["delta", "y", ["slopeToolOrder", "first-point-A", "second-point-A"]], ["responseField", 1], 0.1],
          "step": "/shared/instantaneous-speed/page/1/step/10"
        }
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/1/step/7",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/instantaneous-speed/page/1/step/7",
      "activityPage": "/shared/instantaneous-speed/page/1",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/instantaneous-speed/axes/10s",
          "yAxis": "/shared/instantaneous-speed/axes/16m",
          "data": ["slope-data"],
          "annotations": ["p1A-highlight", "p2A-highlight", "slope-line-A"],
          "highlightedAnnotations": ["rise-arrow-A"],
          "activeDatadefs": ["slope-data"]
        },
        "bottom": {
          "type": "table",
          "data": "slope-data",
          "annotations": ["p1A-highlight", "p2A-highlight"],
          "highlightedAnnotations": ["rise-bracket-A"],
          "xLabel": "Time",
          "yLabel": "Position"
        }
      },
      "beforeText": "<p>Incorrect.</p><p>What is the change in position?</p>",
      "responseTemplate": "/components/response-template/numeric",
      "afterText": "<p>Hint: Look at the table and the graph.</p>",
      "submissibilityCriterion": ["isNumeric", ["responseField", 1]],
      "responseBranches": [
        {
          "criterion": ["withinAbsTolerance", ["delta", "y", ["slopeToolOrder", "first-point-A", "second-point-A"]], ["responseField", 1], 0.1],
          "step": "/shared/instantaneous-speed/page/1/step/10"
        }
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/1/step/8",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/instantaneous-speed/page/1/step/8",
      "activityPage": "/shared/instantaneous-speed/page/1",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/instantaneous-speed/axes/10s",
          "yAxis": "/shared/instantaneous-speed/axes/16m",
          "data": ["slope-data"],
          "annotations": ["p1A-highlight", "p2A-highlight", "slope-line-A"],
          "highlightedAnnotations": ["rise-arrow-A"],
          "activeDatadefs": ["slope-data"]
        },
        "bottom": {
          "type": "table",
          "data": "slope-data",
          "annotations": ["p1A-highlight", "p2A-highlight"],
          "highlightedAnnotations": ["rise-bracket-A"],
          "xLabel": "Time",
          "yLabel": "Position"
        }
      },
      "beforeText": "<p>Incorrect. The change in position is <b>%@</b> - <b>%@</b>, or <b>%@</b> %@.</p>",
      "substitutedExpressions": [
        "end-position",
        "start-position",
        "change-position",
        "change-position-units"
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/1/step/9",
      "submitButtonTitle": "Continue"
    },
    {
      "url": "/shared/instantaneous-speed/page/1/step/9",
      "activityPage": "/shared/instantaneous-speed/page/1",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/instantaneous-speed/axes/10s",
          "yAxis": "/shared/instantaneous-speed/axes/16m",
          "data": ["slope-data"],
          "annotations": ["p1A-highlight", "p2A-highlight", "slope-line-A", "rise-arrow-A"],
          "highlightedAnnotations": ["run-arrow-A"],
          "activeDatadefs": ["slope-data"]
        },
        "bottom": {
          "type": "table",
          "data": "slope-data",
          "annotations": ["rise-bracket-A", "p1A-highlight", "p2A-highlight"],
          "xLabel": "Time",
          "yLabel": "Position"
        }
      },
      "beforeText": "<p>What is the change in time? </p>",
      "responseTemplate": "/components/response-template/numeric",
      "afterText": "<p>Hint:Look at the graph.</p>",
      "submissibilityCriterion": ["isNumeric", ["responseField", 1]],
      "responseBranches": [
        {
          "criterion": ["withinAbsTolerance", ["delta", "x", ["slopeToolOrder", "first-point-A", "second-point-A"]], ["responseField", 1], 0.1],
          "step": "/shared/instantaneous-speed/page/1/step/13"
        }
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/1/step/11",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/instantaneous-speed/page/1/step/10",
      "activityPage": "/shared/instantaneous-speed/page/1",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/instantaneous-speed/axes/10s",
          "yAxis": "/shared/instantaneous-speed/axes/16m",
          "data": ["slope-data"],
          "annotations": ["p1A-highlight", "p2A-highlight", "slope-line-A", "rise-arrow-A"],
          "highlightedAnnotations": ["run-arrow-A"],
          "activeDatadefs": ["slope-data"]
        },
        "bottom": {
          "type": "table",
          "data": "slope-data",
          "annotations": ["rise-bracket-A", "p1A-highlight", "p2A-highlight"],
          "xLabel": "Time",
          "yLabel": "Position"
        }
      },
      "beforeText": "<p>Correct!</p><p>What is the change in time? </p>",
      "responseTemplate": "/components/response-template/numeric",
      "afterText": "<p>Hint:Look at the graph.</p>",
      "submissibilityCriterion": ["isNumeric", ["responseField", 1]],
      "responseBranches": [
        {
          "criterion": ["withinAbsTolerance", ["delta", "x", ["slopeToolOrder", "first-point-A", "second-point-A"]], ["responseField", 1], 0.1],
          "step": "/shared/instantaneous-speed/page/1/step/13"
        }
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/1/step/11",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/instantaneous-speed/page/1/step/11",
      "activityPage": "/shared/instantaneous-speed/page/1",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/instantaneous-speed/axes/10s",
          "yAxis": "/shared/instantaneous-speed/axes/16m",
          "data": ["slope-data"],
          "annotations": ["p1A-highlight", "p2A-highlight", "slope-line-A", "rise-arrow-A"],
          "highlightedAnnotations": ["run-arrow-A"],
          "activeDatadefs": ["slope-data"]
        },
        "bottom": {
          "type": "table",
          "data": "slope-data",
          "annotations": ["rise-bracket-A", "p1A-highlight", "p2A-highlight"],
          "highlightedAnnotations": ["run-bracket-A"],
          "xLabel": "Time",
          "yLabel": "Position"
        }
      },
      "beforeText": "<p>Incorrect.</p><p>What is the change in time?</p>",
      "responseTemplate": "/components/response-template/numeric",
      "afterText": "<p>Hint: Look at the table and the graph.</p>",
      "submissibilityCriterion": ["isNumeric", ["responseField", 1]],
      "responseBranches": [
        {
          "criterion": ["withinAbsTolerance", ["delta", "x", ["slopeToolOrder", "first-point-A", "second-point-A"]], ["responseField", 1], 0.1],
          "step": "/shared/instantaneous-speed/page/1/step/13"
        }
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/1/step/12",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/instantaneous-speed/page/1/step/12",
      "activityPage": "/shared/instantaneous-speed/page/1",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/instantaneous-speed/axes/10s",
          "yAxis": "/shared/instantaneous-speed/axes/16m",
          "data": ["slope-data"],
          "annotations": ["p1A-highlight", "p2A-highlight", "slope-line-A", "rise-arrow-A"],
          "highlightedAnnotations": ["run-arrow-A"],
          "activeDatadefs": ["slope-data"]
        },
        "bottom": {
          "type": "table",
          "data": "slope-data",
          "annotations": ["rise-bracket-A", "p1A-highlight", "p2A-highlight"],
          "highlightedAnnotations": ["run-bracket-A"],
          "xLabel": "Time",
          "yLabel": "Position"
        }
      },
      "beforeText": "<p>Incorrect. The change in time is <b>%@</b> - <b>%@</b>, or <b>%@</b> %@.</p>",
      "substitutedExpressions": [
        "end-time",
        "start-time",
        "change-time",
        "change-time-units"
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/1/step/13",
      "submitButtonTitle": "Continue"
    },
    {
      "url": "/shared/instantaneous-speed/page/1/step/13",
      "activityPage": "/shared/instantaneous-speed/page/1",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/instantaneous-speed/axes/10s",
          "yAxis": "/shared/instantaneous-speed/axes/16m",
          "data": ["slope-data"],
          "annotations": ["p1A-highlight", "p2A-highlight", "slope-line-A"],
          "activeDatadefs": ["slope-data"]
        },
        "bottom": {
          "type": "table",
          "data": "slope-data",
          "annotations": ["p1A-highlight", "p2A-highlight"],
          "xLabel": "Time",
          "yLabel": "Position"
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
          "step": "/shared/instantaneous-speed/page/1/step/16"
        }
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/1/step/14",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/instantaneous-speed/page/1/step/14",
      "activityPage": "/shared/instantaneous-speed/page/1",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/instantaneous-speed/axes/10s",
          "yAxis": "/shared/instantaneous-speed/axes/16m",
          "data": ["slope-data"],
          "annotations": ["p1A-highlight", "p2A-highlight", "slope-line-A"],
          "activeDatadefs": ["slope-data"]
        },
        "bottom": {
          "type": "table",
          "data": "slope-data",
          "annotations": ["p1A-highlight", "p2A-highlight"],
          "xLabel": "Time",
          "yLabel": "Position"
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
          "step": "/shared/instantaneous-speed/page/1/step/16"
        }
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/1/step/15",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/instantaneous-speed/page/1/step/15",
      "activityPage": "/shared/instantaneous-speed/page/1",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/instantaneous-speed/axes/10s",
          "yAxis": "/shared/instantaneous-speed/axes/16m",
          "data": ["slope-data"],
          "annotations": ["p1A-highlight", "p2A-highlight", "slope-line-A"],
          "activeDatadefs": ["slope-data"]
        },
        "bottom": {
          "type": "table",
          "data": "slope-data",
          "annotations": ["p1A-highlight", "p2A-highlight"],
          "xLabel": "Time",
          "yLabel": "Position"
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
      "url": "/shared/instantaneous-speed/page/1/step/16",
      "activityPage": "/shared/instantaneous-speed/page/1",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/instantaneous-speed/axes/10s",
          "yAxis": "/shared/instantaneous-speed/axes/16m",
          "data": ["slope-data"],
          "annotations": ["p1A-highlight", "p2A-highlight", "slope-line-A"],
          "activeDatadefs": ["slope-data"]
        },
        "bottom": {
          "type": "table",
          "data": "slope-data",
          "annotations": ["p1A-highlight", "p2A-highlight"],
          "xLabel": "Time",
          "yLabel": "Position"
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
      "url": "/shared/instantaneous-speed/page/2/step/1",
      "activityPage": "/shared/instantaneous-speed/page/2",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/instantaneous-speed/axes/10s",
          "yAxis": "/shared/instantaneous-speed/axes/16m",
          "data": ["slope-data"],
          "annotations": ["p1A-blocker", "p2A-blocker", "p1B-highlight"],
          "activeDatadefs": ["slope-data"]
        },
        "bottom": {
          "type": "table",
          "data": "slope-data",
          "annotations": ["p1A-blocker", "p2A-blocker", "p1B-highlight"],
          "xLabel": "Time",
          "yLabel": "Position"
        }
      },
      "beforeText": "<p>Choose a point that is different from those you selected earlier. Then click <b>OK</b>.</p>",
      "tools": [
        { "name": "tagging",
          "setup": {
            "tag": "first-point-B",
            "data": "slope-data"
          }
        }
      ],
      "responseBranches": [
        {
          "criterion": ["or", ["samePoint", "first-point-B", "first-point-A"], ["samePoint", "first-point-B", "second-point-A"]],
          "step": "/shared/instantaneous-speed/page/2/step/1a"
        }
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/2/step/2",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/instantaneous-speed/page/2/step/1a",
      "activityPage": "/shared/instantaneous-speed/page/2",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/instantaneous-speed/axes/10s",
          "yAxis": "/shared/instantaneous-speed/axes/16m",
          "data": ["slope-data"],
          "annotations": ["p1A-blocker", "p2A-blocker", "p1B-highlight"],
          "activeDatadefs": ["slope-data"]
        },
        "bottom": {
          "type": "table",
          "data": "slope-data",
          "annotations": ["p1A-blocker", "p2A-blocker", "p1B-highlight"],
          "xLabel": "Time",
          "yLabel": "Position"
        }
      },
      "beforeText": "<p>Try again.</p><p>Choose a point that is <b>different</b> from those you selected earlier. Then click <b>OK</b>.</p>",
      "tools": [
        { "name": "tagging",
          "setup": {
            "tag": "first-point-B",
            "data": "slope-data"
          }
        }
      ],
      "responseBranches": [
        {
          "criterion": ["or", ["samePoint", "first-point-B", "first-point-A"], ["samePoint", "first-point-B", "second-point-A"]],
          "step": "/shared/instantaneous-speed/page/2/step/1a"
        }
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/2/step/2",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/instantaneous-speed/page/2/step/2",
      "activityPage": "/shared/instantaneous-speed/page/2",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/instantaneous-speed/axes/10s",
          "yAxis": "/shared/instantaneous-speed/axes/16m",
          "data": ["slope-data"],
          "annotations": ["p1A-blocker", "p2A-blocker", "p1B-highlight", "p2B-highlight"],
          "activeDatadefs": ["slope-data"]
        },
        "bottom": {
          "type": "table",
          "data": "slope-data",
          "annotations": ["p1A-blocker", "p2A-blocker", "p1B-highlight", "p2B-highlight"],
          "xLabel": "Time",
          "yLabel": "Position"
        }
      },
      "beforeText": "<p>Select a point next to to the first point. Then click <b>OK</b>.</p>",
      "tools": [
        { "name": "tagging",
          "setup": {
            "tag": "second-point-B",
            "data": "slope-data"
          }
        }
      ],
      "responseBranches": [
        {
          "criterion": ["=", 1, ["absDiff", ["indexInDataset", "first-point-B"], ["indexInDataset", "second-point-B"]]],
          "step": "/shared/instantaneous-speed/page/2/step/4"
        }
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/2/step/3",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/instantaneous-speed/page/2/step/3",
      "activityPage": "/shared/instantaneous-speed/page/2",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/instantaneous-speed/axes/10s",
          "yAxis": "/shared/instantaneous-speed/axes/16m",
          "data": ["slope-data"],
          "annotations": ["p1A-blocker", "p2A-blocker", "p1B-highlight", "p2B-highlight"],
          "activeDatadefs": ["slope-data"]
        },
        "bottom": {
          "type": "table",
          "data": "slope-data",
          "annotations": ["p1A-blocker", "p2A-blocker", "p1B-highlight", "p2B-highlight"],
          "xLabel": "Time",
          "yLabel": "Position"
        }
      },
      "beforeText": "<p>To calculate velocity in a small time interval, select a point that is next to the first point. Then click <b>OK</b>.</p>",
      "tools": [
        { "name": "tagging",
          "setup": {
            "tag": "second-point-B",
            "data": "slope-data"
          }
        }
      ],
      "responseBranches": [
        {
          "criterion": ["=", 1, ["absDiff", ["indexInDataset", "first-point-B"], ["indexInDataset", "second-point-B"]]],
          "step": "/shared/instantaneous-speed/page/2/step/4"
        }
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/2/step/3",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/instantaneous-speed/page/2/step/4",
      "activityPage": "/shared/instantaneous-speed/page/2",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/instantaneous-speed/axes/10s",
          "yAxis": "/shared/instantaneous-speed/axes/16m",
          "data": ["slope-data"],
          "annotations": ["p1A-blocker", "p2A-blocker", "p1B-highlight", "p2B-highlight", "slope-line-B"],
          "activeDatadefs": ["slope-data"]
        },
        "bottom": {
          "type": "table",
          "data": "slope-data",
          "annotations": ["p1A-blocker", "p2A-blocker", "p1B-highlight", "p2B-highlight"],
          "xLabel": "Time",
          "yLabel": "Position"
        }
      },
      "beforeText": "<p>Here is the line connecting the two points you selected. The velocity during this interval is the slope of this line.</p><p>What is the <b>velocity</b> between the two points, in meters per second?</p>",
      "responseTemplate": "/components/response-template/numeric",
      "submissibilityCriterion": ["isNumeric", ["responseField", 1]],
      "responseBranches": [
        {
          "criterion": ["withinAbsTolerance", ["slope", "first-point-B", "second-point-B"], ["responseField", 1], 0.1],
          "step": "/shared/instantaneous-speed/page/2/step/16"
        }
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/2/step/5",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/instantaneous-speed/page/2/step/5",
      "activityPage": "/shared/instantaneous-speed/page/2",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/instantaneous-speed/axes/10s",
          "yAxis": "/shared/instantaneous-speed/axes/16m",
          "data": ["slope-data"],
          "annotations": ["p1A-blocker", "p2A-blocker", "p1B-highlight", "p2B-highlight", "slope-line-B"],
          "activeDatadefs": ["slope-data"]
        },
        "bottom": {
          "type": "table",
          "data": "slope-data",
          "annotations": ["p1A-blocker", "p2A-blocker", "p1B-highlight", "p2B-highlight"],
          "xLabel": "Time",
          "yLabel": "Position"
        }
      },
      "beforeText": "<p>Incorrect.</p><p>What is the <b>velocity</b> between the two points, in meters per second?</p>",
      "responseTemplate": "/components/response-template/numeric",
      "afterText": "<p>Hint: Recall that velocity is the change in position divided by the change in time.</p>",
      "submissibilityCriterion": ["isNumeric", ["responseField", 1]],
      "responseBranches": [
        {
          "criterion": ["withinAbsTolerance", ["slope", "first-point-B", "second-point-B"], ["responseField", 1], 0.1],
          "step": "/shared/instantaneous-speed/page/2/step/16"
        }
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/2/step/6",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/instantaneous-speed/page/2/step/6",
      "activityPage": "/shared/instantaneous-speed/page/2",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/instantaneous-speed/axes/10s",
          "yAxis": "/shared/instantaneous-speed/axes/16m",
          "data": ["slope-data"],
          "annotations": ["p1A-blocker", "p2A-blocker", "p1B-highlight", "p2B-highlight", "slope-line-B"],
          "highlightedAnnotations": ["rise-arrow-B"],
          "activeDatadefs": ["slope-data"]
        },
        "bottom": {
          "type": "table",
          "data": "slope-data",
          "annotations": ["p1A-blocker", "p2A-blocker", "p1B-highlight", "p2B-highlight"],
          "xLabel": "Time",
          "yLabel": "Position"
        }
      },
      "beforeText": "<p>Incorrect.</p><p>What is the change in position?</p>",
      "responseTemplate": "/components/response-template/numeric",
      "afterText": "<p>Hint: Look at the graph.</p>",
      "submissibilityCriterion": ["isNumeric", ["responseField", 1]],
      "responseBranches": [
        {
          "criterion": ["withinAbsTolerance", ["delta", "y", ["slopeToolOrder", "first-point-B", "second-point-B"]], ["responseField", 1], 0.1],
          "step": "/shared/instantaneous-speed/page/2/step/10"
        }
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/2/step/7",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/instantaneous-speed/page/2/step/7",
      "activityPage": "/shared/instantaneous-speed/page/2",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/instantaneous-speed/axes/10s",
          "yAxis": "/shared/instantaneous-speed/axes/16m",
          "data": ["slope-data"],
          "annotations": ["p1A-blocker", "p2A-blocker", "p1B-highlight", "p2B-highlight", "slope-line-B"],
          "highlightedAnnotations": ["rise-arrow-B"],
          "activeDatadefs": ["slope-data"]
        },
        "bottom": {
          "type": "table",
          "data": "slope-data",
          "annotations": ["p1A-blocker", "p2A-blocker", "p1B-highlight", "p2B-highlight"],
          "highlightedAnnotations": ["rise-bracket-B"],
          "xLabel": "Time",
          "yLabel": "Position"
        }
      },
      "beforeText": "<p>Incorrect.</p><p>What is the change in position?</p>",
      "responseTemplate": "/components/response-template/numeric",
      "afterText": "<p>Hint: Look at the table and the graph.</p>",
      "submissibilityCriterion": ["isNumeric", ["responseField", 1]],
      "responseBranches": [
        {
          "criterion": ["withinAbsTolerance", ["delta", "y", ["slopeToolOrder", "first-point-B", "second-point-B"]], ["responseField", 1], 0.1],
          "step": "/shared/instantaneous-speed/page/2/step/10"
        }
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/2/step/8",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/instantaneous-speed/page/2/step/8",
      "activityPage": "/shared/instantaneous-speed/page/2",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/instantaneous-speed/axes/10s",
          "yAxis": "/shared/instantaneous-speed/axes/16m",
          "data": ["slope-data"],
          "annotations": ["p1A-blocker", "p2A-blocker", "p1B-highlight", "p2B-highlight", "slope-line-B"],
          "highlightedAnnotations": ["rise-arrow-B"],
          "activeDatadefs": ["slope-data"]
        },
        "bottom": {
          "type": "table",
          "data": "slope-data",
          "annotations": ["p1A-blocker", "p2A-blocker", "p1B-highlight", "p2B-highlight"],
          "highlightedAnnotations": ["rise-bracket-B"],
          "xLabel": "Time",
          "yLabel": "Position"
        }
      },
      "beforeText": "<p>Incorrect. The change in position is <b>%@</b> - <b>%@</b>, or <b>%@</b> %@.</p>",
      "substitutedExpressions": [
        "end-position",
        "start-position",
        "change-position",
        "change-position-units"
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/2/step/9",
      "submitButtonTitle": "Continue"
    },
    {
      "url": "/shared/instantaneous-speed/page/2/step/9",
      "activityPage": "/shared/instantaneous-speed/page/2",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/instantaneous-speed/axes/10s",
          "yAxis": "/shared/instantaneous-speed/axes/16m",
          "data": ["slope-data"],
          "annotations": ["p1A-blocker", "p2A-blocker", "p1B-highlight", "p2B-highlight", "slope-line-B", "rise-arrow-B"],
          "highlightedAnnotations": ["run-arrow-B"],
          "activeDatadefs": ["slope-data"]
        },
        "bottom": {
          "type": "table",
          "data": "slope-data",
          "annotations": ["p1A-blocker", "p2A-blocker", "p1B-highlight", "p2B-highlight", "rise-bracket-B"],
          "xLabel": "Time",
          "yLabel": "Position"
        }
      },
      "beforeText": "<p>What is the change in time? </p>",
      "responseTemplate": "/components/response-template/numeric",
      "afterText": "<p>Hint:Look at the graph.</p>",
      "submissibilityCriterion": ["isNumeric", ["responseField", 1]],
      "responseBranches": [
        {
          "criterion": ["withinAbsTolerance", ["delta", "x", ["slopeToolOrder", "first-point-B", "second-point-B"]], ["responseField", 1], 0.1],
          "step": "/shared/instantaneous-speed/page/2/step/13"
        }
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/2/step/11",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/instantaneous-speed/page/2/step/10",
      "activityPage": "/shared/instantaneous-speed/page/2",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/instantaneous-speed/axes/10s",
          "yAxis": "/shared/instantaneous-speed/axes/16m",
          "data": ["slope-data"],
          "annotations": ["p1A-blocker", "p2A-blocker", "p1B-highlight", "p2B-highlight", "slope-line-B", "rise-arrow-B"],
          "highlightedAnnotations": ["run-arrow-B"],
          "activeDatadefs": ["slope-data"]
        },
        "bottom": {
          "type": "table",
          "data": "slope-data",
          "annotations": ["p1A-blocker", "p2A-blocker", "p1B-highlight", "p2B-highlight", "rise-bracket-B"],
          "xLabel": "Time",
          "yLabel": "Position"
        }
      },
      "beforeText": "<p>Correct!</p><p>What is the change in time? </p>",
      "responseTemplate": "/components/response-template/numeric",
      "afterText": "<p>Hint:Look at the graph.</p>",
      "submissibilityCriterion": ["isNumeric", ["responseField", 1]],
      "responseBranches": [
        {
          "criterion": ["withinAbsTolerance", ["delta", "x", ["slopeToolOrder", "first-point-B", "second-point-B"]], ["responseField", 1], 0.1],
          "step": "/shared/instantaneous-speed/page/2/step/13"
        }
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/2/step/11",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/instantaneous-speed/page/2/step/11",
      "activityPage": "/shared/instantaneous-speed/page/2",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/instantaneous-speed/axes/10s",
          "yAxis": "/shared/instantaneous-speed/axes/16m",
          "data": ["slope-data"],
          "annotations": ["p1A-blocker", "p2A-blocker", "p1B-highlight", "p2B-highlight", "slope-line-B", "rise-arrow-B"],
          "highlightedAnnotations": ["run-arrow-B"],
          "activeDatadefs": ["slope-data"]
        },
        "bottom": {
          "type": "table",
          "data": "slope-data",
          "annotations": ["p1A-blocker", "p2A-blocker", "p1B-highlight", "p2B-highlight", "rise-bracket-B"],
          "highlightedAnnotations": ["run-bracket-B"],
          "xLabel": "Time",
          "yLabel": "Position"
        }
      },
      "beforeText": "<p>Incorrect.</p><p>What is the change in time?</p>",
      "responseTemplate": "/components/response-template/numeric",
      "afterText": "<p>Hint: Look at the table and the graph.</p>",
      "submissibilityCriterion": ["isNumeric", ["responseField", 1]],
      "responseBranches": [
        {
          "criterion": ["withinAbsTolerance", ["delta", "x", ["slopeToolOrder", "first-point-B", "second-point-B"]], ["responseField", 1], 0.1],
          "step": "/shared/instantaneous-speed/page/2/step/13"
        }
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/2/step/12",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/instantaneous-speed/page/2/step/12",
      "activityPage": "/shared/instantaneous-speed/page/2",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/instantaneous-speed/axes/10s",
          "yAxis": "/shared/instantaneous-speed/axes/16m",
          "data": ["slope-data"],
          "annotations": ["p1A-blocker", "p2A-blocker", "p1B-highlight", "p2B-highlight", "slope-line-B", "rise-arrow-B"],
          "highlightedAnnotations": ["run-arrow-B"],
          "activeDatadefs": ["slope-data"]
        },
        "bottom": {
          "type": "table",
          "data": "slope-data",
          "annotations": ["p1A-blocker", "p2A-blocker", "p1B-highlight", "p2B-highlight", "rise-bracket-B"],
          "highlightedAnnotations": ["run-bracket-B"],
          "xLabel": "Time",
          "yLabel": "Position"
        }
      },
      "beforeText": "<p>Incorrect. The change in time is <b>%@</b> - <b>%@</b>, or <b>%@</b> %@.</p>",
      "substitutedExpressions": [
        "end-time",
        "start-time",
        "change-time",
        "change-time-units"
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/2/step/13",
      "submitButtonTitle": "Continue"
    },
    {
      "url": "/shared/instantaneous-speed/page/2/step/13",
      "activityPage": "/shared/instantaneous-speed/page/2",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/instantaneous-speed/axes/10s",
          "yAxis": "/shared/instantaneous-speed/axes/16m",
          "data": ["slope-data"],
          "annotations": ["p1A-blocker", "p2A-blocker", "p1B-highlight", "p2B-highlight", "slope-line-B"],
          "activeDatadefs": ["slope-data"]
        },
        "bottom": {
          "type": "table",
          "data": "slope-data",
          "annotations": ["p1A-blocker", "p2A-blocker", "p1B-highlight", "p2B-highlight"],
          "xLabel": "Time",
          "yLabel": "Position"
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
          "step": "/shared/instantaneous-speed/page/2/step/16"
        }
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/2/step/14",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/instantaneous-speed/page/2/step/14",
      "activityPage": "/shared/instantaneous-speed/page/2",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/instantaneous-speed/axes/10s",
          "yAxis": "/shared/instantaneous-speed/axes/16m",
          "data": ["slope-data"],
          "annotations": ["p1A-blocker", "p2A-blocker", "p1B-highlight", "p2B-highlight", "slope-line-B"],
          "activeDatadefs": ["slope-data"]
        },
        "bottom": {
          "type": "table",
          "data": "slope-data",
          "annotations": ["p1A-blocker", "p2A-blocker", "p1B-highlight", "p2B-highlight"],
          "xLabel": "Time",
          "yLabel": "Position"
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
          "step": "/shared/instantaneous-speed/page/2/step/16"
        }
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/2/step/15",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/instantaneous-speed/page/2/step/15",
      "activityPage": "/shared/instantaneous-speed/page/2",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/instantaneous-speed/axes/10s",
          "yAxis": "/shared/instantaneous-speed/axes/16m",
          "data": ["slope-data"],
          "annotations": ["p1A-blocker", "p2A-blocker", "p1B-highlight", "p2B-highlight", "slope-line-B"],
          "activeDatadefs": ["slope-data"]
        },
        "bottom": {
          "type": "table",
          "data": "slope-data",
          "annotations": ["p1A-blocker", "p2A-blocker", "p1B-highlight", "p2B-highlight"],
          "xLabel": "Time",
          "yLabel": "Position"
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
      "url": "/shared/instantaneous-speed/page/2/step/16",
      "activityPage": "/shared/instantaneous-speed/page/2",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/instantaneous-speed/axes/10s",
          "yAxis": "/shared/instantaneous-speed/axes/16m",
          "data": ["slope-data"],
          "annotations": ["p1A-blocker", "p2A-blocker", "p1B-highlight", "p2B-highlight", "slope-line-B"],
          "activeDatadefs": ["slope-data"]
        },
        "bottom": {
          "type": "table",
          "data": "slope-data",
          "annotations": ["p1A-blocker", "p2A-blocker", "p1B-highlight", "p2B-highlight"],
          "xLabel": "Time",
          "yLabel": "Position"
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
      "url": "/shared/instantaneous-speed/page/3/step/1",
      "activityPage": "/shared/instantaneous-speed/page/3",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/instantaneous-speed/axes/10s",
          "yAxis": "/shared/instantaneous-speed/axes/16m",
          "data": ["slope-data"],
          "annotations": ["p1A-highlight", "p2A-highlight", "slope-line-A", "p1B-highlight", "p2B-highlight", "slope-line-B"],
          "activeDatadefs": ["slope-data"]
        }
      },
      "responseTemplate": "/components/response-template/open",
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
      "nSteps": 10,
      "label": "Time"
    },
    {
      "url": "/shared/instantaneous-speed/axes/16m",
      "units": "/builtins/units/meters",
      "min": 0,
      "max": 16,
      "nSteps": 8,
      "label": "Position"
    }
  ],
  "variables": [

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
  "datadefs": [
    {
      "type": "UnorderedDataPoints",
      "records": [
        {
          "url": "/shared/instantaneous-speed/datadef/slope-data",
          "name": "slope-data",
          "activity": "/shared/instantaneous-speed",
          "xUnits": "/builtins/units/seconds",
          "xLabel": "Time",
          "xShortLabel": "Time",
          "yUnits": "/builtins/units/meters",
          "yLabel": "Position",
          "yShortLabel": "Position",
          "points": [[0,0], [1,2], [2,4], [3,5], [4,6], [5,4], [6,8], [7,10], [8,11], [9,12], [10,15]]
        }
      ]
    }
  ],
  "tags": [
    {
      "url": "/shared/instantaneous-speed/tag/first-point-A",
      "activity": "/shared/instantaneous-speed",
      "name": "first-point-A"
    },
    {
      "url": "/shared/instantaneous-speed/tag/second-point-A",
      "activity": "/shared/instantaneous-speed",
      "name": "second-point-A"
    },
    {
      "url": "/shared/instantaneous-speed/tag/first-point-B",
      "activity": "/shared/instantaneous-speed",
      "name": "first-point-B"
    },
    {
      "url": "/shared/instantaneous-speed/tag/second-point-B",
      "activity": "/shared/instantaneous-speed",
      "name": "second-point-B"
    }
  ],
  "annotations": [
    { "type": "LineThroughPoints",
      "records": [
        {
          "url": "/shared/instantaneous-speed/annotation/slope-line-A",
          "name": "slope-line-A",
          "activity": "/shared/instantaneous-speed",
          "p1Tag": "/shared/instantaneous-speed/tag/first-point-A",
          "p2Tag": "/shared/instantaneous-speed/tag/second-point-A",
          "color": "#1f77b4"
        },
        {
          "url": "/shared/instantaneous-speed/annotation/slope-line-B",
          "name": "slope-line-B",
          "activity": "/shared/instantaneous-speed",
          "p1Tag": "/shared/instantaneous-speed/tag/first-point-B",
          "p2Tag": "/shared/instantaneous-speed/tag/second-point-B",
          "color": "#ff7f0d"
        }
      ]
    },
    {
      "type": "RiseArrow",
      "records": [
        {
          "url": "/shared/instantaneous-speed/annotation/rise-arrow-A",
          "name": "rise-arrow-A",
          "activity": "/shared/instantaneous-speed",
          "color": "#cccccc",
          "p1Tag": "/shared/instantaneous-speed/tag/first-point-A",
          "p2Tag": "/shared/instantaneous-speed/tag/second-point-A"
        },
        {
          "url": "/shared/instantaneous-speed/annotation/rise-arrow-B",
          "name": "rise-arrow-B",
          "activity": "/shared/instantaneous-speed",
          "color": "#cccccc",
          "p1Tag": "/shared/instantaneous-speed/tag/first-point-B",
          "p2Tag": "/shared/instantaneous-speed/tag/second-point-B"
        }
      ]
    },
    {
      "type": "RunArrow",
      "records": [
        {
          "url": "/shared/instantaneous-speed/annotation/run-arrow-A",
          "name": "run-arrow-A",
          "activity": "/shared/instantaneous-speed",
          "color": "#cccccc",
          "p1Tag": "/shared/instantaneous-speed/tag/first-point-A",
          "p2Tag": "/shared/instantaneous-speed/tag/second-point-A"
        },
        {
          "url": "/shared/instantaneous-speed/annotation/run-arrow-B",
          "name": "run-arrow-B",
          "activity": "/shared/instantaneous-speed",
          "color": "#cccccc",
          "p1Tag": "/shared/instantaneous-speed/tag/first-point-B",
          "p2Tag": "/shared/instantaneous-speed/tag/second-point-B"
        }
      ]
    },
    {
      "type": "RiseBracket",
      "records": [
        {
          "url": "/shared/instantaneous-speed/annotation/rise-bracket-A",
          "name": "rise-bracket-A",
          "activity": "/shared/instantaneous-speed",
          "color": "#cccccc",
          "datadefName": "slope-data",
          "p1Tag": "/shared/instantaneous-speed/tag/first-point-A",
          "p2Tag": "/shared/instantaneous-speed/tag/second-point-A"
        },
        {
          "url": "/shared/instantaneous-speed/annotation/rise-bracket-B",
          "name": "rise-bracket-B",
          "activity": "/shared/instantaneous-speed",
          "color": "#cccccc",
          "datadefName": "slope-data",
          "p1Tag": "/shared/instantaneous-speed/tag/first-point-B",
          "p2Tag": "/shared/instantaneous-speed/tag/second-point-B"
        }
      ]
    },
    {
      "type": "RunBracket",
      "records": [
        {
          "url": "/shared/instantaneous-speed/annotation/run-bracket-A",
          "name": "run-bracket-A",
          "activity": "/shared/instantaneous-speed",
          "color": "#cccccc",
          "datadefName": "slope-data",
          "p1Tag": "/shared/instantaneous-speed/tag/first-point-A",
          "p2Tag": "/shared/instantaneous-speed/tag/second-point-A"
        },
        {
          "url": "/shared/instantaneous-speed/annotation/run-bracket-B",
          "name": "run-bracket-B",
          "activity": "/shared/instantaneous-speed",
          "color": "#cccccc",
          "datadefName": "slope-data",
          "p1Tag": "/shared/instantaneous-speed/tag/first-point-B",
          "p2Tag": "/shared/instantaneous-speed/tag/second-point-B"
        }
      ]
    },
    {
      "type": "HighlightedPoint",
      "records": [
        {
          "url": "/shared/instantaneous-speed/annotation/p1A-highlight",
          "name": "p1A-highlight",
          "activity": "/shared/instantaneous-speed",
          "datadefName": "slope-data",
          "tag": "/shared/instantaneous-speed/tag/first-point-A",
          "color": "#1f77b4"
        },
        {
          "url": "/shared/instantaneous-speed/annotation/p2A-highlight",
          "name": "p2A-highlight",
          "activity": "/shared/instantaneous-speed",
          "datadefName": "slope-data",
          "tag": "/shared/instantaneous-speed/tag/second-point-A",
          "color": "#ff7f0e"
        },
        {
          "url": "/shared/instantaneous-speed/annotation/p1B-highlight",
          "name": "p1B-highlight",
          "activity": "/shared/instantaneous-speed",
          "datadefName": "slope-data",
          "tag": "/shared/instantaneous-speed/tag/first-point-B",
          "color": "#1f77b4"
        },
        {
          "url": "/shared/instantaneous-speed/annotation/p2B-highlight",
          "name": "p2B-highlight",
          "activity": "/shared/instantaneous-speed",
          "datadefName": "slope-data",
          "tag": "/shared/instantaneous-speed/tag/second-point-B",
          "color": "#ff7f0e"
        },
        {
          "url": "/shared/instantaneous-speed/annotation/p1A-blocker",
          "name": "p1A-blocker",
          "activity": "/shared/instantaneous-speed",
          "datadefName": "slope-data",
          "tag": "/shared/instantaneous-speed/tag/first-point-A",
          "color": "#f2b3b3"
        },
        {
          "url": "/shared/instantaneous-speed/annotation/p2A-blocker",
          "name": "p2A-blocker",
          "activity": "/shared/instantaneous-speed",
          "datadefName": "slope-data",
          "tag": "/shared/instantaneous-speed/tag/second-point-A",
          "color": "#f2b3b3"
        }
      ]
    }
  ]
};
