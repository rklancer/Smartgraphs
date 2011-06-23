/*globals Smartgraphs */

Smartgraphs.activityDocs = Smartgraphs.activityDocs || {};
Smartgraphs.activityDocs["/shared/describing-velocity"] =
{
  "_id": "describing-velocity.df6",
  "_rev": "1",
  "data_format_version": 6,
  "activity": {
    "title": "Describing Velocity",
    "url": "/shared/describing-velocity",
    "owner": "shared",
    "pages": [
      "/shared/describing-velocity/page/1",
      "/shared/describing-velocity/page/2",
      "/shared/describing-velocity/page/3",
      "/shared/describing-velocity/page/4",
      // "/shared/describing-velocity/page/5",
      // "/shared/describing-velocity/page/6",
      "/shared/describing-velocity/page/8",
      "/shared/describing-velocity/page/9"
    ],
    "axes": [
      "/shared/describing-velocity/axes/9s",
      "/shared/describing-velocity/axes/40m",
      "/shared/describing-velocity/axes/car-mps"
    ]
  },
  "pages": [
    {
      "name": "Introduction",
      "url": "/shared/describing-velocity/page/1",
      "activity": "/shared/describing-velocity",
      "index": 1,
      "introText": "<h1>Introduction</h1>",
      "steps": [
        "/shared/describing-velocity/page/1/step/1"
      ],
      "firstStep": "/shared/describing-velocity/page/1/step/1"
    },
    {
      "name": "Discovery Question",
      "url": "/shared/describing-velocity/page/2",
      "activity": "/shared/describing-velocity",
      "index": 2,
      "introText": "<h1>Discovery Question</h1>",
      "steps": [
        "/shared/describing-velocity/page/2/step/1"
      ],
      "firstStep": "/shared/describing-velocity/page/2/step/1"
    },
    {
      "name": "Label the Position-Time Graph",
      "url": "/shared/describing-velocity/page/3",
      "activity": "/shared/describing-velocity",
      "index": 3,
      "introText": "<h1>Label the Position-Time Graph</h1>",
      "steps": [
        "/shared/describing-velocity/page/3/step/1"
      ],
      "firstStep": "/shared/describing-velocity/page/3/step/1"
    },
    {
      "name": "Analyze the Position-Time Graph ",
      "url": "/shared/describing-velocity/page/4",
      "activity": "/shared/describing-velocity",
      "index": 4,
      "introText": "<h1>Analyze the Position-Time Graph</h1>",
      "steps": [
        "/shared/describing-velocity/page/4/step/1",
        "/shared/describing-velocity/page/4/step/2",
        "/shared/describing-velocity/page/4/step/3",
        "/shared/describing-velocity/page/4/step/4",
        "/shared/describing-velocity/page/4/step/5",
        "/shared/describing-velocity/page/4/step/6",
        "/shared/describing-velocity/page/4/step/7",
        "/shared/describing-velocity/page/4/step/8",
        "/shared/describing-velocity/page/4/step/9",
        "/shared/describing-velocity/page/4/step/10",
        "/shared/describing-velocity/page/4/step/11",
        "/shared/describing-velocity/page/4/step/12",
        "/shared/describing-velocity/page/4/step/13",
        "/shared/describing-velocity/page/4/step/14",
        "/shared/describing-velocity/page/4/step/15",
        "/shared/describing-velocity/page/4/step/16"
      ],
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
      "firstStep": "/shared/describing-velocity/page/4/step/1"
    },
    {
      "name": "Analyze the Position-Time Graph 2",
      "url": "/shared/describing-velocity/page/5",
      "activity": "/shared/describing-velocity",
      "index": 5,
      "introText": "<h1>Analyze the Position-Time Graph 2</h1>",
      "steps": [
        "/shared/describing-velocity/page/5/step/1",
        "/shared/describing-velocity/page/5/step/2",
        "/shared/describing-velocity/page/5/step/3",
        "/shared/describing-velocity/page/5/step/4",
        "/shared/describing-velocity/page/5/step/5",
        "/shared/describing-velocity/page/5/step/6",
        "/shared/describing-velocity/page/5/step/7",
        "/shared/describing-velocity/page/5/step/8",
        "/shared/describing-velocity/page/5/step/9",
        "/shared/describing-velocity/page/5/step/10",
        "/shared/describing-velocity/page/5/step/11",
        "/shared/describing-velocity/page/5/step/12",
        "/shared/describing-velocity/page/5/step/13",
        "/shared/describing-velocity/page/5/step/14",
        "/shared/describing-velocity/page/5/step/15",
        "/shared/describing-velocity/page/5/step/16"
      ],
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
      "firstStep": "/shared/describing-velocity/page/4/step/1"
    },
    {
      "name": "Analyze the Position-Time Graph 3",
      "url": "/shared/describing-velocity/page/6",
      "activity": "/shared/describing-velocity",
      "index": 6,
      "introText": "<h1>Analyze the Position-Time Graph 3</h1>",
      "steps": [
        "/shared/describing-velocity/page/6/step/1",
        "/shared/describing-velocity/page/6/step/2",
        "/shared/describing-velocity/page/6/step/3",
        "/shared/describing-velocity/page/6/step/4",
        "/shared/describing-velocity/page/6/step/5",
        "/shared/describing-velocity/page/6/step/6",
        "/shared/describing-velocity/page/6/step/7",
        "/shared/describing-velocity/page/6/step/8",
        "/shared/describing-velocity/page/6/step/9",
        "/shared/describing-velocity/page/6/step/10",
        "/shared/describing-velocity/page/6/step/11",
        "/shared/describing-velocity/page/6/step/12",
        "/shared/describing-velocity/page/6/step/13",
        "/shared/describing-velocity/page/6/step/14",
        "/shared/describing-velocity/page/6/step/15",
        "/shared/describing-velocity/page/6/step/16"
      ],
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
      "firstStep": "/shared/describing-velocity/page/4/step/1"
    },
    {
      "name": "Compare the Graphs",
      "url": "/shared/describing-velocity/page/8",
      "activity": "/shared/describing-velocity",
      "index": 8,
      "introText": "<h1>Compare the Graphs</h1>",
      "steps": [
        "/shared/describing-velocity/page/8/step/1",
        "/shared/describing-velocity/page/8/step/2"        
      ],
      "firstStep": "/shared/describing-velocity/page/8/step/1"
    },
    {
      "name": "Analyze the Velocity-Time Graph",
      "url": "/shared/describing-velocity/page/9",
      "activity": "/shared/describing-velocity",
      "index": 9,
      "introText": "<h1>Analyze the Velocity-Time Graph</h1>",
      "steps": [
        "/shared/describing-velocity/page/9/step/1",
        "/shared/describing-velocity/page/9/step/2",
        "/shared/describing-velocity/page/9/step/3",
        "/shared/describing-velocity/page/9/step/4",
        "/shared/describing-velocity/page/9/step/5",
        "/shared/describing-velocity/page/9/step/6"
      ],
      "firstStep": "/shared/describing-velocity/page/9/step/1"
    }

  ],
  "steps": [
    {
      "url": "/shared/describing-velocity/page/1/step/1",
      "activityPage": "/shared/describing-velocity/page/1",
      "paneConfig": "single",
      "panes": {
        "single": {
          "type": "image",
          "path": sc_static("images/NASCAR_practice.jpg"),
          //TODO shrink and copy to "path": "/static/smartgraphs/en/current/resources/images/NASCAR_practice.jpg",
          "caption": "Public domain U.S. Air Force photo by Larry McTighe"
        }
      },
      "beforeText": "<p>Imagine you are a TV sports commentator for a major international car race. What techniques could you use to <b>describe</b> the action to your audience?</p>",
      "responseTemplate": "/shared/describing-velocity/response-template/open",
      "afterText": "<p>In this activity, you will explore different ways to communicate how fast an object is moving.</p>",
      "submissibilityCriterion": ["textLengthIsAtLeast", 1, ["responseField", 1]],
      "hideSubmitButton": true,
      "nextButtonShouldSubmit": true,
      "isFinalStep": true
    },

    {
      "url": "/shared/describing-velocity/page/2/step/1",
      "activityPage": "/shared/describing-velocity/page/2",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/40m",
          "data": [
            ["position-data", { "point-type": "none", "line-type": "connected" }]
          ],
          "annotations": []
        }
      },
      "tools": [
        { "name": "animation",
          "setup": {
            "pane": "top",
            "duration": 9000, // ms
            "channelWidth": 70,
            "backgroundImage": sc_static('images/roadDashed.png'),
            "animations": [{
                "data": "position-data",
                "image": sc_static('images/carWhite.png'),
                "width":  30,
                "height": 61,
                "xOffset": 40,
                "yOffset": 0
              }]
          }
        }
      ],
      "beforeText": " <p><strong>How can you describe velocity?</strong></p>  <p>Let’s start by examining the motion of a car traveling from one point to another.</p>  <p><strong>Click</strong> the Start button to the right to watch the car’s journey. <p>In the area below, <strong>describe</strong> the motion of the car. Try to use as many key words from the word bank as possible.</p> ",
      "responseTemplate": "/shared/describing-velocity/response-template/open",
      "afterText": "<p><strong>Word bank:</strong> start, position, time, forward, backward, moving, stopping, velocity, constant, steady, changing, slow, fast, end<p>",
      "submissibilityCriterion": ["textLengthIsAtLeast", 1, ["responseField", 1]],
      "hideSubmitButton": true,
      "nextButtonShouldSubmit": true,
      "variableAssignments": [{
        "name": "student-description",
        "value": ["responseField", 1]
      }],
      "isFinalStep": true
    },

    {
      "url": "/shared/describing-velocity/page/3/step/1",
      "activityPage": "/shared/describing-velocity/page/3",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/40m",
          "data": [
            ["position-data", { "point-type": "none", "line-type": "connected" }]
          ],
          "annotations": []
        }
      },
      "beforeText": "<p>Here is your earlier description of the car's journey:</p><p>&quot;%@&quot;</p><p><b>Start</b> the animation again and <b>observe</b> the resulting position-time graph for the car's motion.</p><p>Using key words from your descriptions, <b>label</b> the motions that occurred during each segment of the position-time graph.</p><p>To add a label, <b>click</b> where you want to add a label, then <b>double click</b> inside the label and start typing.</p>",
      "substitutedExpressions": ["student-description"],
      "hideSubmitButton": true,
      "nextButtonShouldSubmit": true,
      "isFinalStep": true,
      "tools": [
        { "name": "label",
          "setup": {
            "pane": "top",
            "labelSetName": "students-segment-labels"
          }
        },
        { "name": "animation",
          "setup": {
            "pane": "top",
            "duration": 9000, // ms
            "channelWidth": 70,
            "backgroundImage": sc_static('images/roadDashed.png'),
            "animations": [{
                "data": "position-data",
                "image": sc_static('images/carWhite.png'),
                "width":  30,
                "height": 61,
                "xOffset": 40,
                "yOffset": 0
              }]
          }
        }
      ]
    },

    // handy expression for making sure the
    // ["and", [">=", ["coord", "x", "first-point-A"], 0], ["<=", ["coord", "x", "first-point-A"], 3], [">=", ["coord", "x", "second-point-A"], 0], ["<=", ["coord", "x", "second-point-A"], 3], ["not", ["=", ["coord", "x", "first-point-A"], ["coord", "x", "second-point-A"]]]]
    // or (with context vars segment-start and segment-end defined as (0, 3) or (3, 6), or (6, 9) as appropriate):
    // ["and", [">=", ["coord", "x", "first-point-A"], ["get", "segment-start"]], ["<=", ["coord", "x", "first-point-A"], ["get", "segment-end"]], [">=", ["coord", "x", "second-point-A"], ["get", "segment-start"]], ["<=", ["coord", "x", "second-point-A"], ["get", "segment-end"]], ["not", ["=", ["coord", "x", "first-point-A"], ["coord", "x", "second-point-A"]]]]
    {
      "url": "/shared/describing-velocity/page/4/step/1",
      "activityPage": "/shared/describing-velocity/page/4",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/40m",
          "data": [
            ["position-data", { "line-type": "connected" }]
          ],
          "annotations": ["students-segment-labels"]
        },
        "bottom": {
          "type": "table",
          "data": "position-data",
          "annotations": []
        }

      },
      "tools": [],
      "beforeText": "<p>Use the position-time data to <strong>answer</strong> the following questions.</p>  <p>What was the car’s velocity from 0-3 seconds?</p>",
      "responseTemplate": "/shared/describing-velocity/response-template/numeric",
      "afterText": "<p><strong>Hint:</strong> Recall that velocity is the slope of a position-time graph<p>",
      "submissibilityCriterion": ["isNumeric", ["responseField", 1]],
      "variableAssignments": [{
        "name": "student-velocity",
        "value": ["responseField", 1]
      }],
      "responseBranches": [
        {
          "criterion": ["withinAbsTolerance", ["responseField", 1], 0, 0.1],
          "step": "/shared/describing-velocity/page/4/step/16"
        }
      ],
      "defaultBranch": "/shared/describing-velocity/page/4/step/2",
      "submitButtonTitle": "Check My Answer"
    },
    {
      "url": "/shared/describing-velocity/page/4/step/2",
      "activityPage": "/shared/describing-velocity/page/4",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/40m",
          "data": ["position-data"],
          "annotations": ["p1A-highlight", "students-segment-labels"]
        },
        "bottom": {
          "type": "table",
          "data": "position-data",
          "annotations": ["p1A-highlight"]
        }
      },
      "beforeText": "<p><strong>no</strong>  <em>%@</em> is not the velocity for the first segment.</p>",
      "substitutedExpressions": [ "student-velocity" ],
      "afterText": "<p>Select a point in the first interval (between 0 and 3 seconds) on the graph. Theb click <b>OK</b></p>",
      "tools": [
        { "name": "tagging",
          "setup": {
            "tag": "first-point-A",
            "data": "position-data"
          }
        }
      ],
      "responseBranches": [
        {
          "criterion": ["and", [">=", ["coord", "x", "first-point-A"], 0], ["<=", ["coord", "x", "first-point-A"], 3]],
          "step": "/shared/describing-velocity/page/4/step/4"
        }
      ],
      "defaultBranch": "/shared/describing-velocity/page/4/step/3",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/describing-velocity/page/4/step/3",
      "activityPage": "/shared/describing-velocity/page/4",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/40m",
          "data": ["position-data"],
          "annotations": ["p1A-highlight", "p2A-highlight", "students-segment-labels"]
        },
        "bottom": {
          "type": "table",
          "data": "position-data",
          "annotations": ["p1A-highlight", "p2A-highlight"]
        }
      },
      "beforeText": "<p><b>no</b> Your point is not within the first three seconds.</p> <p>Select apoint in the <b>first interval (between 0 and 3 seconds)</b>. Then click <b>OK</b>.</p>",
      "tools": [
        { "name": "tagging",
          "setup": {
            "tag": "first-point-A",
            "data": "position-data"
          }
        }
      ],
      "responseBranches": [
        {
          "criterion": ["and", [">=", ["coord", "x", "first-point-A"], 0], ["<=", ["coord", "x", "first-point-A"], 3]],
          "step": "/shared/describing-velocity/page/4/step/4"
        }
      ],
      "defaultBranch": "/shared/describing-velocity/page/4/step/3",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/describing-velocity/page/4/step/4",
      "activityPage": "/shared/describing-velocity/page/4",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/40m",
          "data": ["position-data"],
          "annotations": ["p1A-highlight", "p2A-highlight", "students-segment-labels"]
        },
        "bottom": {
          "type": "table",
          "data": "position-data",
          "annotations": ["p1A-highlight", "p2A-highlight"]
        }
      },
      "beforeText": "<p>Select a second point in the first interval (between 0 and 3 seconds). Then click <b>OK</b>.</p>",
      "tools": [
        { "name": "tagging",
          "setup": {
            "tag": "second-point-A",
            "data": "position-data"
          }
        }
      ],
      "responseBranches": [
        {
          "criterion": ["and", [">=", ["coord", "x", "second-point-A"], 0], ["<=", ["coord", "x", "second-point-A"], 3],["!=", ["coord", "x", "first-point-A"], ["coord", "x", "second-point-A"]]],
          // "criterion": ["and", [">=", ["coord", "x", "second-point-A"], 0], ["<=", ["coord", "x", "second-point-A"], 3]],
          "step": "/shared/describing-velocity/page/4/step/6"
        }
      ],
      "defaultBranch": "/shared/describing-velocity/page/4/step/5",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/describing-velocity/page/4/step/5",
      "activityPage": "/shared/describing-velocity/page/4",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/40m",
          "data": ["position-data"],
          "annotations": ["p1A-highlight", "p2A-highlight", "students-segment-labels"]
        },
        "bottom": {
          "type": "table",
          "data": "position-data",
          "annotations": ["p1A-highlight", "p2A-highlight"]
        }
      },
      "beforeText": "<p><b>Incorrect.</b> Your second point was not within the first three seconds. </p> <p> Please Select a second point in the first interval (between 0 and 3 seconds). Then click <b>OK</b>.</p>",
      "tools": [
        { "name": "tagging",
          "setup": {
            "tag": "second-point-A",
            "data": "position-data"
          }
        }
      ],
      "responseBranches": [
        {
          "criterion": ["and", [">=", ["coord", "x", "second-point-A"], 0], ["<=", ["coord", "x", "second-point-A"], 3],["!=", ["coord", "x", "first-point-A"], ["coord", "x", "second-point-A"]]],
          "step": "/shared/describing-velocity/page/4/step/6"
        }
      ],
      "defaultBranch": "/shared/describing-velocity/page/4/step/5",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/describing-velocity/page/4/step/6",
      "activityPage": "/shared/describing-velocity/page/4",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/40m",
          "data": ["position-data"],
          "annotations": ["p1A-highlight", "p2A-highlight", "students-segment-labels", "slope-line-A"]
        },
        "bottom": {
          "type": "table",
          "data": "position-data",
          "annotations": ["p1A-highlight", "p2A-highlight"]
        }
      },
      "beforeText": "<p>Here is the line connecting the two points you selected. The velocity during this interval is the slope of this line.</p><p>What is the <b>velocity</b> between the two points, in meters per second?</p>",
      "responseTemplate": "/shared/describing-velocity/response-template/numeric",
      "responseBranches": [
        {
          "criterion": ["withinAbsTolerance", ["slope", "first-point-A", "second-point-A"], ["responseField", 1], 0.1],
          "step": "/shared/describing-velocity/page/4/step/16"
        }
      ],
      "defaultBranch": "/shared/describing-velocity/page/4/step/7",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/describing-velocity/page/4/step/7",
      "activityPage": "/shared/describing-velocity/page/4",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/40m",
          "data": ["position-data"],
          "annotations": ["p1A-highlight", "p2A-highlight", "students-segment-labels", "slope-line-A"]
        },
        "bottom": {
          "type": "table",
          "data": "position-data",
          "annotations": ["p1A-highlight", "p2A-highlight"]
        }
      },
      "beforeText": "<p>Incorrect.</p><p>What is the <b>velocity</b> between the two points, in meters per second?</p>",
      "responseTemplate": "/shared/describing-velocity/response-template/numeric",
      "afterText": "<p>Hint: Recall that velocity is the change in position divided by the change in time.</p>",
      "submissibilityCriterion": ["isNumeric", ["responseField", 1]],
      "responseBranches": [
        {
          "criterion": ["withinAbsTolerance", ["slope", "first-point-A", "second-point-A"], ["responseField", 1], 0.1],
          "step": "/shared/describing-velocity/page/4/step/16"
        }
      ],
      "defaultBranch": "/shared/describing-velocity/page/4/step/8",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/describing-velocity/page/4/step/8",
      "activityPage": "/shared/describing-velocity/page/4",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/40m",
          "data": ["position-data"],
          "annotations": ["p1A-highlight", "p2A-highlight", "students-segment-labels", "slope-line-A"],
          "highlightedAnnotations": ["rise-arrow-A"]
        },
        "bottom": {
          "type": "table",
          "data": "position-data",
          "annotations": ["p1A-highlight", "p2A-highlight"]
        }
      },
      "beforeText": "<p>Incorrect.</p><p>What is the change in position?</p>",
      "responseTemplate": "/shared/describing-velocity/response-template/numeric",
      "afterText": "<p>Hint: Look at the graph.</p>",
      "submissibilityCriterion": ["isNumeric", ["responseField", 1]],
      "responseBranches": [
        {
          "criterion": ["withinAbsTolerance", ["delta", "y", ["slopeToolOrder", "first-point-A", "second-point-A"]], ["responseField", 1], 0.1],
          "step": "/shared/describing-velocity/page/4/step/11"
        }
      ],
      "defaultBranch": "/shared/describing-velocity/page/4/step/9",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/describing-velocity/page/4/step/9",
      "activityPage": "/shared/describing-velocity/page/4",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/40m",
          "data": ["position-data"],
          "annotations": ["p1A-highlight", "p2A-highlight", "students-segment-labels", "slope-line-A"],
          "highlightedAnnotations": ["rise-arrow-A"]
        },
        "bottom": {
          "type": "table",
          "data": "position-data",
          "annotations": ["p1A-highlight", "p2A-highlight"],
          "highlightedAnnotations": ["rise-bracket-A"]
        }
      },
      "beforeText": "<p>Incorrect.</p><p>What is the change in position?</p>",
      "responseTemplate": "/shared/describing-velocity/response-template/numeric",
      "afterText": "<p>Hint: Look at the table and the graph.</p>",
      "submissibilityCriterion": ["isNumeric", ["responseField", 1]],
      "responseBranches": [
        {
          "criterion": ["withinAbsTolerance", ["delta", "y", ["slopeToolOrder", "first-point-A", "second-point-A"]], ["responseField", 1], 0.1],
          "step": "/shared/describing-velocity/page/4/step/11"
        }
      ],
      "defaultBranch": "/shared/describing-velocity/page/4/step/9",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/describing-velocity/page/4/step/9",
      "activityPage": "/shared/describing-velocity/page/4",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/40m",
          "data": ["position-data"],
          "annotations": ["p1A-highlight", "p2A-highlight", "slope-line-A"],
          "highlightedAnnotations": ["rise-arrow-A"]
        },
        "bottom": {
          "type": "table",
          "data": "position-data",
          "annotations": ["p1A-highlight", "p2A-highlight"],
          "highlightedAnnotations": ["rise-bracket-A"]
        }
      },
      "beforeText": "<p>Incorrect. The change in position is <b>%@</b> - <b>%@</b>, or <b>%@</b> %@.</p>",
      "substitutedExpressions": [
        "end-position",
        "start-position",
        "change-position",
        "change-position-units"
      ],
      "defaultBranch": "/shared/describing-velocity/page/4/step/10",
      "submitButtonTitle": "Continue"
    },
    {
      "url": "/shared/describing-velocity/page/4/step/10",
      "activityPage": "/shared/describing-velocity/page/4",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/40m",
          "data": ["position-data"],
          "annotations": ["p1A-highlight", "p2A-highlight", "slope-line-A", "rise-arrow-A"],
          "highlightedAnnotations": ["run-arrow-A"]
        },
        "bottom": {
          "type": "table",
          "data": "position-data",
          "annotations": ["rise-bracket-A", "p1A-highlight", "p2A-highlight"]
        }
      },
      "beforeText": "<p>What is the change in time? </p>",
      "responseTemplate": "/shared/describing-velocity/response-template/numeric",
      "afterText": "<p>Hint:Look at the graph.</p>",
      "submissibilityCriterion": ["isNumeric", ["responseField", 1]],
      "responseBranches": [
        {
          "criterion": ["withinAbsTolerance", ["delta", "x", ["slopeToolOrder", "first-point-A", "second-point-A"]], ["responseField", 1], 0.1],
          "step": "/shared/describing-velocity/page/4/step/14"
        }
      ],
      "defaultBranch": "/shared/describing-velocity/page/4/step/12",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/describing-velocity/page/4/step/11",
      "activityPage": "/shared/describing-velocity/page/4",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/40m",
          "data": ["position-data"],
          "annotations": ["p1A-highlight", "p2A-highlight", "slope-line-A", "rise-arrow-A"],
          "highlightedAnnotations": ["run-arrow-A"]
        },
        "bottom": {
          "type": "table",
          "data": "position-data",
          "annotations": ["rise-bracket-A", "p1A-highlight", "p2A-highlight"]
        }
      },
      "beforeText": "<p>Correct!</p><p>What is the change in time? </p>",
      "responseTemplate": "/shared/describing-velocity/response-template/numeric",
      "afterText": "<p>Hint:Look at the graph.</p>",
      "submissibilityCriterion": ["isNumeric", ["responseField", 1]],
      "responseBranches": [
        {
          "criterion": ["withinAbsTolerance", ["delta", "x", ["slopeToolOrder", "first-point-A", "second-point-A"]], ["responseField", 1], 0.1],
          "step": "/shared/describing-velocity/page/4/step/14"
        }
      ],
      "defaultBranch": "/shared/describing-velocity/page/4/step/12",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/describing-velocity/page/4/step/12",
      "activityPage": "/shared/describing-velocity/page/4",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/40m",
          "data": ["position-data"],
          "annotations": ["p1A-highlight", "p2A-highlight", "slope-line-A", "rise-arrow-A"],
          "highlightedAnnotations": ["run-arrow-A"]
        },
        "bottom": {
          "type": "table",
          "data": "position-data",
          "annotations": ["rise-bracket-A", "p1A-highlight", "p2A-highlight"],
          "highlightedAnnotations": ["run-bracket-A"]
        }
      },
      "beforeText": "<p>Incorrect.</p><p>What is the change in time?</p>",
      "responseTemplate": "/shared/describing-velocity/response-template/numeric",
      "afterText": "<p>Hint: Look at the table and the graph.</p>",
      "submissibilityCriterion": ["isNumeric", ["responseField", 1]],
      "responseBranches": [
        {
          "criterion": ["withinAbsTolerance", ["delta", "x", ["slopeToolOrder", "first-point-A", "second-point-A"]], ["responseField", 1], 0.1],
          "step": "/shared/describing-velocity/page/4/step/14"
        }
      ],
      "defaultBranch": "/shared/describing-velocity/page/4/step/13",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/describing-velocity/page/4/step/13",
      "activityPage": "/shared/describing-velocity/page/4",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/40m",
          "data": ["position-data"],
          "annotations": ["p1A-highlight", "p2A-highlight", "slope-line-A", "rise-arrow-A"],
          "highlightedAnnotations": ["run-arrow-A"]
        },
        "bottom": {
          "type": "table",
          "data": "position-data",
          "annotations": ["rise-bracket-A", "p1A-highlight", "p2A-highlight"],
          "highlightedAnnotations": ["run-bracket-A"]
        }
      },
      "beforeText": "<p>Incorrect. The change in time is <b>%@</b> - <b>%@</b>, or <b>%@</b> %@.</p>",
      "substitutedExpressions": [
        "end-time",
        "start-time",
        "change-time",
        "change-time-units"
      ],
      "defaultBranch": "/shared/describing-velocity/page/4/step/13",
      "submitButtonTitle": "Continue"
    },
    {
      "url": "/shared/describing-velocity/page/4/step/13",
      "activityPage": "/shared/describing-velocity/page/4",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/40m",
          "data": ["position-data"],
          "annotations": ["p1A-highlight", "p2A-highlight", "slope-line-A"]
        },
        "bottom": {
          "type": "table",
          "data": "position-data",
          "annotations": ["p1A-highlight", "p2A-highlight"]
        }
      },
      "beforeText": "<p>If the change in position is <b>%@</b> %@ and the change in time is <b>%@</b> %@, what is the velocity, in meters per second?</p>",
      "responseTemplate": "/shared/describing-velocity/response-template/numeric",
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
          "step": "/shared/describing-velocity/page/4/step/16"
        }
      ],
      "defaultBranch": "/shared/describing-velocity/page/4/step/14",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/describing-velocity/page/4/step/14",
      "activityPage": "/shared/describing-velocity/page/4",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/40m",
          "data": ["position-data"],
          "annotations": ["p1A-highlight", "p2A-highlight", "slope-line-A"]
        },
        "bottom": {
          "type": "table",
          "data": "position-data",
          "annotations": ["p1A-highlight", "p2A-highlight"]
        }
      },
      "beforeText": "<p>Incorrect.</p><p>If the change in position is <b>%@</b> %@ and the change in time is <b>%@</b> %@, what is the velocity, in meters per second?</p>",
      "responseTemplate": "/shared/describing-velocity/response-template/numeric",
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
          "step": "/shared/describing-velocity/page/4/step/16"
        }
      ],
      "defaultBranch": "/shared/describing-velocity/page/4/step/15",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/describing-velocity/page/4/step/15",
      "activityPage": "/shared/describing-velocity/page/4",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/40m",
          "data": ["position-data"],
          "annotations": ["p1A-highlight", "p2A-highlight", "slope-line-A"]
        },
        "bottom": {
          "type": "table",
          "data": "position-data",
          "annotations": ["p1A-highlight", "p2A-highlight"]
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
      "url": "/shared/describing-velocity/page/4/step/16",
      "activityPage": "/shared/describing-velocity/page/4",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/40m",
          "data": ["position-data"]
        },
        "bottom": {
          "type": "table",
          "data": "position-data"
        }
      },
      "beforeText": "<p>Correct!</p>",
      "afterText":  "<p>The velocity was <b>0</b> in the first segment</p>",
      "isFinalStep": true,
      "hideSubmitButton": true,
      "nextButtonShouldSubmit": true
    },
    
    {
      "url": "/shared/describing-velocity/page/8/step/1",
      "activityPage": "/shared/describing-velocity/page/8",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/40m",
          "data": [
            ["position-data", { "point-type": "none", "line-type": "connected" }]
          ],
          "annotations": []
        },
        "bottom": {
          "type": "graph",
          "title": "Velocity vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/car-mps",
          "data": [
            ["car-velocity", { "point-type": "none", "line-type": "connected" }]
          ],
          "annotations": []
        }
      },
      "tools": [
        { "name": "animation",
          "setup": {
            "pane": "top",
            "duration": 9000, // ms
            "channelWidth": 70,
            "backgroundImage": sc_static('images/roadDashed.png'),
            "animations": [{
                "data": "position-data",
                "image": sc_static('images/carWhite.png'),
                "width":  30,
                "height": 61,
                "xOffset": 40,
                "yOffset": 0
              }]
          }
        }
      ],
      "beforeText": " <p>A <i>velocity-time</i> graph shows the car's <b>velocity</b> over time.</p><p><b>Click</b> the Start button to play the animation again.</p><p>This time, the velocity-time graph of the car's motion displays below the position-time graph.</p>",
      "defaultBranch": "/shared/describing-velocity/page/8/step/2",
      "submitButtonTitle": "OK"
    },
    
    {
      "url": "/shared/describing-velocity/page/8/step/2",
      "activityPage": "/shared/describing-velocity/page/8",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/40m",
          "data": [
            ["position-data", { "point-type": "none", "line-type": "connected" }]
          ],
          "annotations": []
        },
        "bottom": {
          "type": "graph",
          "title": "Velocity vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/car-mps",
          "data": [
            ["car-velocity", { "point-type": "none", "line-type": "connected" }]
          ],
          "annotations": ["velocity-labels"]
        }
      },
      "tools": [
        { "name": "animation",
          "setup": {
            "pane": "top",
            "duration": 9000, // ms
            "channelWidth": 70,
            "backgroundImage": sc_static('images/roadDashed.png'),
            "animations": [{
                "data": "position-data",
                "image": sc_static('images/carWhite.png'),
                "width":  30,
                "height": 61,
                "xOffset": 40,
                "yOffset": 0
              }]
          }
        }
      ],
      "beforeText": " <p>Both graphs provide information about the same motion.</p><p><b>Describe</b> how constant velocity is represented on a position-time graph and on a velocity-time graph.</p><p><b>Word bank</b>: constant velocity, flat, straight, tilted, up, down, right, left, segment, horizontal, steep, slope</p>",
      "responseTemplate": "/shared/describing-velocity/response-template/open",
      "hideSubmitButton": true,
      "isFinalStep": true
    },

    {
      "url": "/shared/describing-velocity/page/9/step/1",
      "activityPage": "/shared/describing-velocity/page/9",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Velocity vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/car-mps",
          "data": [
            ["car-velocity", { "point-type": "none", "line-type": "connected" }]
          ],
          "annotations": []
        }
      },
      "responseBranches": [
        {
          "criterion": ["=", ["responseField", 1], 3],
          "step": "/shared/describing-velocity/page/9/step/6"
        }
      ],
      "defaultBranch": "/shared/describing-velocity/page/9/step/2",
      "beforeText": "<p>On a velocity-time graph, how can you tell if a car is stopped?</p>",
      "responseTemplate": "/shared/describing-velocity/response-template/velocity-time-question",
      "submitButtonTitle": "Check My Answer",
      "hideSubmitButton": false
    },
    
    {
      "url": "/shared/describing-velocity/page/9/step/2",
      "activityPage": "/shared/describing-velocity/page/9",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Velocity vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/car-mps",
          "data": [
            ["car-velocity", { "point-type": "none", "line-type": "connected" }]
          ],
          "annotations": []
        }
      },
      "responseBranches": [
        {
          "criterion": ["=", ["responseField", 1], 3],
          "step": "/shared/describing-velocity/page/9/step/6"
        }
      ],
      "defaultBranch": "/shared/describing-velocity/page/9/step/3",
      "beforeText": "<p><b>Incorrect.</b> Hint: Does the velocity change when the car is stopped? Try again:</p><p>On a velocity-time graph, how can you tell if a car is stopped?</p>",
      "responseTemplate": "/shared/describing-velocity/response-template/velocity-time-question",
      "submitButtonTitle": "Check My Answer",
      "hideSubmitButton": false
    },
    
    {
      "url": "/shared/describing-velocity/page/9/step/3",
      "activityPage": "/shared/describing-velocity/page/9",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Velocity vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/car-mps",
          "data": [
            ["car-velocity", { "point-type": "none", "line-type": "connected" }]
          ],
          "annotations": []
        }
      },
      "responseBranches": [
        {
          "criterion": ["=", ["responseField", 1], 3],
          "step": "/shared/describing-velocity/page/9/step/6"
        }
      ],
      "defaultBranch": "/shared/describing-velocity/page/9/step/4",
      "beforeText": "<p><b>Incorrect.</b> Hint: What is the velocity when the car is stopped? Try again:</p><p>On a velocity-time graph, how can you tell if a car is stopped?</p>",
      "responseTemplate": "/shared/describing-velocity/response-template/velocity-time-question",
      "submitButtonTitle": "Check My Answer",
      "hideSubmitButton": false
    },
    
    {
      "url": "/shared/describing-velocity/page/9/step/4",
      "activityPage": "/shared/describing-velocity/page/9",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Velocity vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/car-mps",
          "data": [
            ["car-velocity", { "point-type": "none", "line-type": "connected" }]
          ],
          "annotations": []
        }
      },
      "responseBranches": [
        {
          "criterion": ["=", ["responseField", 1], 3],
          "step": "/shared/describing-velocity/page/9/step/6"
        }
      ],
      "defaultBranch": "/shared/describing-velocity/page/9/step/5",
      "beforeText": "<p><b>Incorrect.</b> Hint: The velocity of the car is 0 m/s when the car is stopped. Try again:</p><p>On a velocity-time graph, how can you tell if a car is stopped?</p>",
      "responseTemplate": "/shared/describing-velocity/response-template/velocity-time-question",
      "submitButtonTitle": "Check My Answer",
      "hideSubmitButton": false
    },
    
    {
      "url": "/shared/describing-velocity/page/9/step/5",
      "activityPage": "/shared/describing-velocity/page/9",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Velocity vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/car-mps",
          "data": [
            ["car-velocity", { "point-type": "none", "line-type": "connected" }]
          ],
          "annotations": []
        }
      },
      "beforeText": "<p>Incorrect. The graph is a horizontal segment in which the velocity is 0.</p>",
      "hideSubmitButton": true,
      "isFinalStep": true
    },
    
    {
      "url": "/shared/describing-velocity/page/9/step/6",
      "activityPage": "/shared/describing-velocity/page/9",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Velocity vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/car-mps",
          "data": [
            ["car-velocity", { "point-type": "none", "line-type": "connected" }]
          ],
          "annotations": []
        }
      },
      "beforeText": "<p>Correct! The graph is a horizontal segment in which the velocity is 0.</p>",
      "hideSubmitButton": true,
      "isFinalStep": true
    }
  ],
  "units": [
  ],
  "axes": [
    {
      "url": "/shared/describing-velocity/axes/9s",
      "units": "/builtins/units/seconds",
      "min": 0,
      "max": 9,
      "nSteps": 9,
      "label": "Time"
    },
    {
      "url": "/shared/describing-velocity/axes/40m",
      "units": "/builtins/units/meters",
      "min": -2,
      "max": 40,
      "nSteps": 8,
      "label": "Position"
    },
    {
      "url": "/shared/describing-velocity/axes/car-mps",
      "units": "/builtins/units/meters-per-second",
      "min": -4,
      "max": 20,
      "nSteps": 12,
      "label": "Velocity"
    }
  ],
  "responseTemplates": [
    {
      "url": "/shared/describing-velocity/response-template/open",
      "activity": "/shared/describing-velocity/",
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
      "url": "/shared/describing-velocity/response-template/numeric",
      "activity": "/shared/describing-velocity/",
      "templateString": "",
      "fieldTypes": [
        "numeric"
      ],
      "fieldChoicesList": [
        null
      ],
      "initialValues": [

      ]
    },
    {
      "url": "/shared/describing-velocity/response-template/velocity-time-question",
      "templateString": "",
      "fieldTypes": [
        "multiplechoice"
      ],
      "fieldChoicesList": [
        [
          "The resulting segment tilts up and to the right",
          "The resulting segment tilts down and to the left",
          "The resulting segment is horizontal and the velocity is 0",
          "The resulting segment is horizontal and the velocity is positive",
          "The resulting segment is horizontal and the velocity is negative"
        ]
      ],
      "initialValues": [
        ""
      ]
    }
  ],
  "tags": [
    {
      "url": "/shared/describing-velocity/tag/first-point-A",
      "activity": "/shared/describing-velocity",
      "name": "first-point-A"
    },
    {
      "url": "/shared/describing-velocity/tag/second-point-A",
      "activity": "/shared/describing-velocity",
      "name": "second-point-A"
    },
    {
      "url": "/shared/describing-velocity/tag/first-point-B",
      "activity": "/shared/describing-velocity",
      "name": "first-point-B"
    },
    {
      "url": "/shared/describing-velocity/tag/second-point-B",
      "activity": "/shared/describing-velocity",
      "name": "second-point-B"
    }
  ],
  "variables": [
  ],
  "datadefs": [
    {
      "type": "UnorderedDataPoints",
      "records": [
        {
          "url": "/shared/describing-velocity/datadefs/position-data",
          "name": "position-data",
          "activity": "/shared/describing-velocity",
          "xUnits": "/builtins/units/seconds",
          "xLabel": "Time",
          "xShortLabel": "Time",
          "yUnits": "/builtins/units/meters",
          "yLabel": "Position",
          "yShortLabel": "Position",
          "points": [[0.00,0.00],[0.10,0.00],[0.20,0.00],[0.30,0.00],[0.40,0.00],[0.50,0.00],[0.60,0.00],[0.70,0.00],[0.80,0.00],[0.90,0.00],[1.00,0.00],[1.10,0.00],[1.20,0.00],[1.30,0.00],[1.40,0.00],[1.50,0.00],[1.60,0.00],[1.70,0.00],[1.80,0.00],[1.90,0.00],[2.00,0.00],[2.10,0.00],[2.20,0.00],[2.30,0.00],[2.40,0.00],[2.50,0.00],[2.60,0.01],[2.70,0.02],[2.80,0.05],[2.90,0.10],[3.00,0.20],[3.10,0.35],[3.20,0.52],[3.30,0.71],[3.40,0.90],[3.50,1.10],[3.60,1.30],[3.70,1.50],[3.80,1.70],[3.90,1.90],[4.00,2.10],[4.10,2.30],[4.20,2.50],[4.30,2.70],[4.40,2.90],[4.50,3.10],[4.60,3.30],[4.70,3.50],[4.80,3.70],[4.90,3.90],[5.00,4.10],[5.10,4.30],[5.20,4.50],[5.30,4.70],[5.40,4.91],[5.50,5.11],[5.60,5.33],[5.70,5.58],[5.80,5.89],[5.90,6.32],[6.00,6.92],[6.10,7.69],[6.20,8.58],[6.30,9.53],[6.40,10.51],[6.50,11.51],[6.60,12.50],[6.70,13.50],[6.80,14.50],[6.90,15.50],[7.00,16.50],[7.10,17.50],[7.20,18.50],[7.30,19.50],[7.40,20.50],[7.50,21.50],[7.60,22.50],[7.70,23.50],[7.80,24.50],[7.90,25.50],[8.00,26.50],[8.10,27.50],[8.20,28.50],[8.30,29.50],[8.40,30.50],[8.50,31.50],[8.60,32.50],[8.70,33.50],[8.80,34.50],[8.90,35.50],[9.00,36.50]]
        }
      ]
    },
    {
      "type": "FirstOrderDifference",
      "records": [
        {    
          "url": "/shared/describing-velocity/datadefs/car-velocity",
          "name": "car-velocity",
          "activity": "/shared/describing-velocity",
          "xUnits": "/builtins/units/seconds",
          "xLabel": "Time",
          "xShortLabel": "Time",
          "yUnits": "/builtins/units/meters-per-second",
          "yLabel": "Velocity",
          "yShortLabel": "Velocity",
          "source": "/shared/describing-velocity/datadefs/position-data"
        }
      ]
    }
  ],
  "annotations": [
    {
      "type": "Label",
      "records": [
        {
          "url": "/shared/describing-velocity/annotation/velocity-label-1",
          "name": "velocity-label-1",
          "activity": "/shared/calculated-velocity",
          "text": "Stopped for 3 secs.\nVelocity = 0 m/s",
          "x": 1.5,
          "y": 0,
          "xOffset": -67,
          "yOffset": -43        
        },
        {
          "url": "/shared/describing-velocity/annotation/velocity-label-2",
          "name": "velocity-label-2",
          "activity": "/shared/calculated-velocity",
          "text": "Slow, steady for 3 secs.\nVelocity = 2 m/s",
          "x": 4.5,
          "y": 2,
          "xOffset": -117,
          "yOffset": -76       
        },
        {
          "url": "/shared/describing-velocity/annotation/velocity-label-3",
          "name": "velocity-label-3",
          "activity": "/shared/calculated-velocity",
          "text": "Fast, steady for 3 secs.\nVelocity = 10 m/s",
          "x": 7.5,
          "y": 10,
          "xOffset": -105,
          "yOffset": -13                 
        }
      ]
    },
    {
      "type": "LabelSet",
      "records": [
        {
          "url": "/shared/describing-velocity/annotation/students-segment-labels",
          "name": "students-segment-labels",
          "activity": "/shared/describing-velocity"
        },
        {
          "url": "/shared/describing-velocity/annotation/velocity-labels",
          "name": "velocity-labels",
          "activity": "/shared/describing-velocity",
          "labels": ["/shared/describing-velocity/annotation/velocity-label-1", "/shared/describing-velocity/annotation/velocity-label-2", "/shared/describing-velocity/annotation/velocity-label-3"]
        }        
      ]
    },
    { "type": "LineThroughPoints",
      "records": [
        {
          "url": "/shared/describing-velocity/annotation/slope-line-A",
          "name": "slope-line-A",
          "activity": "/shared/describing-velocity",
          "p1Tag": "/shared/describing-velocity/tag/first-point-A",
          "p2Tag": "/shared/describing-velocity/tag/second-point-A",
          "color": "#1f77b4"
        }
      ]
    },
    {
      "type": "RiseArrow",
      "records": [
        {
          "url": "/shared/describing-velocity/annotation/rise-arrow-A",
          "name": "rise-arrow-A",
          "activity": "/shared/describing-velocity",
          "color": "#cccccc",
          "p1Tag": "/shared/describing-velocity/tag/first-point-A",
          "p2Tag": "/shared/describing-velocity/tag/second-point-A"
        }
      ]
    },
    {
      "type": "RunArrow",
      "records": [
        {
          "url": "/shared/describing-velocity/annotation/run-arrow-A",
          "name": "run-arrow-A",
          "activity": "/shared/describing-velocity",
          "color": "#cccccc",
          "p1Tag": "/shared/describing-velocity/tag/first-point-A",
          "p2Tag": "/shared/describing-velocity/tag/second-point-A"
        }
      ]
    },

    {
      "type": "RiseBracket",
      "records": [
        {
          "url": "/shared/describing-velocity/annotation/rise-bracket-A",
          "name": "rise-bracket-A",
          "activity": "/shared/describing-velocity",
          "color": "#cccccc",
          "datadefName": "slope-data",
          "p1Tag": "/shared/describing-velocity/tag/first-point-A",
          "p2Tag": "/shared/describing-velocity/tag/second-point-A"
        }
      ]
    },
    {
      "type": "RunBracket",
      "records": [
        {
          "url": "/shared/describing-velocity/annotation/run-bracket-A",
          "name": "run-bracket-A",
          "activity": "/shared/describing-velocity",
          "color": "#cccccc",
          "datadefName": "slope-data",          
          "p1Tag": "/shared/describing-velocity/tag/first-point-A",
          "p2Tag": "/shared/describing-velocity/tag/second-point-A"
        }
      ]
    },
    {
      "type": "HighlightedPoint",
      "records": [
        {
          "url": "/shared/describing-velocity/annotation/p1A-highlight",
          "name": "p1A-highlight",
          "activity": "/shared/describing-velocity",
          "datadefName": "position-data",
          "tag": "/shared/describing-velocity/tag/first-point-A",
          "color": "#1f77b4"
        },
        {
          "url": "/shared/describing-velocity/annotation/p2A-highliposition-dataght",
          "name": "p2A-highlight",
          "activity": "/shared/describing-velocity",
          "datadefName": "position-data",
          "tag": "/shared/describing-velocity/tag/second-point-A",
          "color": "#ff7f0e"
        },
        {
          "url": "/shared/describing-velocity/annotation/p1B-highlight",
          "name": "p1B-highlight",
          "activity": "/shared/describing-velocity",
          "datadefName": "position-data",
          "tag": "/shared/describing-velocity/tag/first-point-B",
          "color": "#1f77b4"
        },
        {
          "url": "/shared/describing-velocity/annotation/p2B-highlight",
          "name": "p2B-highlight",
          "activity": "/shared/describing-velocity",
          "datadefName": "position-data",
          "tag": "/shared/describing-velocity/tag/second-point-B",
          "color": "#ff7f0e"
        },
        {
          "url": "/shared/describing-velocity/annotation/p1A-blocker",
          "name": "p1A-blocker",
          "activity": "/shared/describing-velocity",
          "datadefName": "position-data",
          "tag": "/shared/describing-velocity/tag/first-point-A",
          "color": "#f2b3b3"
        },
        {
          "url": "/shared/describing-velocity/annotation/p2A-blocker",
          "name": "p2A-blocker",
          "activity": "/shared/describing-velocity",
          "datadefName": "position-data",
          "tag": "/shared/describing-velocity/tag/second-point-A",
          "color": "#f2b3b3"
        }
      ]
    }
  ]
};
