/*globals Smartgraphs sc_static*/

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
      "/shared/describing-velocity/page/5",
      "/shared/describing-velocity/page/6",
      "/shared/describing-velocity/page/8",
      "/shared/describing-velocity/page/9",
      "/shared/describing-velocity/page/10",
      "/shared/describing-velocity/page/11",
      "/shared/describing-velocity/page/12",
      "/shared/describing-velocity/page/13"
    ],
    "axes": [
      "/shared/describing-velocity/axes/9s",
      "/shared/describing-velocity/axes/40m",
      "/shared/describing-velocity/axes/car-mps",
      "/shared/describing-velocity/axes/identify-the-motion-time",
      "/shared/describing-velocity/axes/identify-the-motion-velocity"
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
        { "name": "start-position_str",    "value": ["toFixedString", ["get", "start-position"], 2] },
        { "name": "end-position",          "value": ["coord", "y", ["listItem", 2, ["slopeToolOrder", "first-point-A", "second-point-A"]]] },
        { "name": "end-position_str",      "value": ["toFixedString", ["get", "end-position"], 2] },
        { "name": "change-position",       "value": ["-", ["get", "end-position"], ["get", "start-position"]] },
        { "name": "change-position_str",   "value": ["toFixedString", ["get", "change-position"], 2] },

        { "name": "start-time",            "value": ["coord", "x", ["listItem", 1, ["slopeToolOrder", "first-point-A", "second-point-A"]]] },
        { "name": "start-time_str",        "value": ["toFixedString", ["get", "start-time"], 2] },
        { "name": "end-time",              "value": ["coord", "x", ["listItem", 2, ["slopeToolOrder", "first-point-A", "second-point-A"]]] },
        { "name": "end-time_str",          "value": ["toFixedString", ["get", "end-time"], 2] },
        { "name": "change-time",           "value": ["-", ["get", "end-time"], ["get", "start-time"]] },
        { "name": "change-time_str",       "value": ["toFixedString", ["get", "change-time"], 2] },

        { "name": "velocity",              "value": ["/", ["get", "change-position"], ["get", "change-time"]] },
        { "name": "velocity_str",          "value": ["toFixedString", ["get", "velocity"], 2] },

        { "name": "change-position-units", "value": ["pluralizeUnits", "/builtins/units/meters", ["get", "change-position"]] },
        { "name": "change-time-units",     "value": ["pluralizeUnits", "/builtins/units/seconds", ["get", "change-time"]] },
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
        { "name": "start-position_str",    "value": ["toFixedString", ["get", "start-position"], 2] },
        { "name": "end-position",          "value": ["coord", "y", ["listItem", 2, ["slopeToolOrder", "first-point-A", "second-point-A"]]] },
        { "name": "end-position_str",      "value": ["toFixedString", ["get", "end-position"], 2] },
        { "name": "change-position",       "value": ["-", ["get", "end-position"], ["get", "start-position"]] },
        { "name": "change-position_str",   "value": ["toFixedString", ["get", "change-position"], 2] },

        { "name": "start-time",            "value": ["coord", "x", ["listItem", 1, ["slopeToolOrder", "first-point-A", "second-point-A"]]] },
        { "name": "start-time_str",        "value": ["toFixedString", ["get", "start-time"], 2] },
        { "name": "end-time",              "value": ["coord", "x", ["listItem", 2, ["slopeToolOrder", "first-point-A", "second-point-A"]]] },
        { "name": "end-time_str",          "value": ["toFixedString", ["get", "end-time"], 2] },
        { "name": "change-time",           "value": ["-", ["get", "end-time"], ["get", "start-time"]] },
        { "name": "change-time_str",       "value": ["toFixedString", ["get", "change-time"], 2] },

        { "name": "velocity",              "value": ["/", ["get", "change-position"], ["get", "change-time"]] },
        { "name": "velocity_str",          "value": ["toFixedString", ["get", "velocity"], 2] },

        { "name": "change-position-units", "value": ["pluralizeUnits", "/builtins/units/meters", ["get", "change-position"]] },
        { "name": "change-time-units",     "value": ["pluralizeUnits", "/builtins/units/seconds", ["get", "change-time"]] },
        { "name": "velocity-units",        "value": ["pluralizeUnits", "/builtins/units/meters-per-second", ["get", "velocity"]] }
      ],
      "firstStep": "/shared/describing-velocity/page/5/step/1"
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
        { "name": "start-position_str",    "value": ["toFixedString", ["get", "start-position"], 2] },
        { "name": "end-position",          "value": ["coord", "y", ["listItem", 2, ["slopeToolOrder", "first-point-A", "second-point-A"]]] },
        { "name": "end-position_str",      "value": ["toFixedString", ["get", "end-position"], 2] },
        { "name": "change-position",       "value": ["-", ["get", "end-position"], ["get", "start-position"]] },
        { "name": "change-position_str",   "value": ["toFixedString", ["get", "change-position"], 2] },

        { "name": "start-time",            "value": ["coord", "x", ["listItem", 1, ["slopeToolOrder", "first-point-A", "second-point-A"]]] },
        { "name": "start-time_str",        "value": ["toFixedString", ["get", "start-time"], 2] },
        { "name": "end-time",              "value": ["coord", "x", ["listItem", 2, ["slopeToolOrder", "first-point-A", "second-point-A"]]] },
        { "name": "end-time_str",          "value": ["toFixedString", ["get", "end-time"], 2] },
        { "name": "change-time",           "value": ["-", ["get", "end-time"], ["get", "start-time"]] },
        { "name": "change-time_str",       "value": ["toFixedString", ["get", "change-time"], 2] },

        { "name": "velocity",              "value": ["/", ["get", "change-position"], ["get", "change-time"]] },
        { "name": "velocity_str",          "value": ["toFixedString", ["get", "velocity"], 2] },

        { "name": "change-position-units", "value": ["pluralizeUnits", "/builtins/units/meters", ["get", "change-position"]] },
        { "name": "change-time-units",     "value": ["pluralizeUnits", "/builtins/units/seconds", ["get", "change-time"]] },
        { "name": "velocity-units",        "value": ["pluralizeUnits", "/builtins/units/meters-per-second", ["get", "velocity"]] }
      ],
      "firstStep": "/shared/describing-velocity/page/6/step/1"
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
    },
    {
      "name": "Compare Your Descriptions",
      "url": "/shared/describing-velocity/page/10",
      "activity": "/shared/describing-velocity",
      "index": 10,
      "introText": "<h1>Compare the Graphs</h1>",
      "steps": [
        "/shared/describing-velocity/page/10/step/1"       
      ],
      "firstStep": "/shared/describing-velocity/page/10/step/1"
    },
    {
      "name": "Explore Other Motions",
      "url": "/shared/describing-velocity/page/11",
      "activity": "/shared/describing-velocity",
      "index": 11,
      "introText": "<h1>Explore Other Motions</h1>",  
      "steps": [
        "/shared/describing-velocity/page/11/step/1",
        "/shared/describing-velocity/page/11/step/2",
        "/shared/describing-velocity/page/11/step/3",
        "/shared/describing-velocity/page/11/step/4",
        "/shared/describing-velocity/page/11/step/5",
        "/shared/describing-velocity/page/11/step/6",
        "/shared/describing-velocity/page/11/step/7",
        "/shared/describing-velocity/page/11/step/8",
        "/shared/describing-velocity/page/11/step/9"                
      ],
      "firstStep": "/shared/describing-velocity/page/11/step/1"
    },
    {
      "name": "Identify the Motion",
      "url": "/shared/describing-velocity/page/12",
      "activity": "/shared/describing-velocity",
      "index": 12,
      "introText": "<h1>Identify the Motion</h1>",
      "steps": [
        "/shared/describing-velocity/page/12/step/1",
        "/shared/describing-velocity/page/12/step/2",
        "/shared/describing-velocity/page/12/step/3",
        "/shared/describing-velocity/page/12/step/4",
        "/shared/describing-velocity/page/12/step/5",
        "/shared/describing-velocity/page/12/step/6",
        "/shared/describing-velocity/page/12/step/7",
        "/shared/describing-velocity/page/12/step/8",
        "/shared/describing-velocity/page/12/step/9",
        "/shared/describing-velocity/page/12/step/10",
        "/shared/describing-velocity/page/12/step/11",
        "/shared/describing-velocity/page/12/step/12",
        "/shared/describing-velocity/page/12/step/13",
        "/shared/describing-velocity/page/12/step/14",
        "/shared/describing-velocity/page/12/step/15",
        "/shared/describing-velocity/page/12/step/16",
        "/shared/describing-velocity/page/12/step/17",
        "/shared/describing-velocity/page/12/step/18"                               
      ],
      "firstStep": "/shared/describing-velocity/page/12/step/1"
    },
    {
      "name": "Conclusion",
      "url": "/shared/describing-velocity/page/13",
      "activity": "/shared/describing-velocity",
      "index": 13,
      "introText": "<h1>Conclusion</h1><p><b>How can you describe velocity?</b></p>",
      "steps": [
        "/shared/describing-velocity/page/13/step/1",
        "/shared/describing-velocity/page/13/step/2"        
      ],
      "firstStep": "/shared/describing-velocity/page/13/step/1"
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
            "staticImages": [{
                "name":  "finish",
                "image":  sc_static('images/finish.png'),
                "width":  70,
                "height": 10,
                "xOffset": 0,
                "yOffset": 5,
                "instances": [
                  { "y": 0   },
                  { "y": 35  }
                ]
            }],
            "animations": [{
                "data": "position-data",
                "image": sc_static('images/carWhite2.png'),
                "width":  30,
                "height": 61,
                "xOffset": 40,
                "yOffset": 0
              }]
          }
        }
      ],
      "beforeText": " <p><strong>How can you describe velocity?</strong></p>  <p>Let’s start by examining the motion of a car traveling from one point to another.</p>  <p><b>Click</b> the Start button to the right to watch the car’s journey. <p>In the area below, <strong>describe</strong> the motion of the car. Try to use as many key words from the word bank as possible.</p> ",
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
      "beforeText": "<p>Here is your earlier description of the car's journey:</p><p>&quot;%@&quot;</p><p><b>Start</b> the animation again and <b>observe</b> the resulting position-time graph for the car's motion.</p><p>Using key words from your descriptions, <b>label</b> the motions that occurred during each segment of the position-time graph.</p><p>To add a label, <b>click</b> where you want to add a label, then <b>double-click</b> inside the label and <b>start typing</b>.</p>",
      "substitutedExpressions": ["student-description"],
      "submissibilityDependsOn": ["annotation", "students-segment-labels"],
      "submissibilityCriterion": [">", ["numberOfLabels", "students-segment-labels"], 0],
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
            "staticImages": [{
                "name":  "finish",
                "image":  sc_static('images/finish.png'),
                "width":  70,
                "height": 10,
                "xOffset": 0,
                "yOffset": 5,
                "instances": [
                  { "y": 0 }
                ]
            }],
            "animations": [{
                "data": "position-data",
                "image": sc_static('images/carWhite2.png'),
                "width":  30,
                "height": 61,
                "xOffset": 40,
                "yOffset": 0
              }]
          }
        }
      ]
    },

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
          "data": [["position-data", { "line-type": "connected" }]],
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
          "data": [["position-data", { "line-type": "connected" }]],
          "annotations": ["p1A-highlight", "students-segment-labels"]
        },
        "bottom": {
          "type": "table",
          "data": "position-data",
          "annotations": ["p1A-highlight"]
        }
      },
      "beforeText": "<p><b>Incorrect.</b> The velocity for this segment is not <em>%@ m/s</em>.</p>",
      "substitutedExpressions": [ "student-velocity" ],
      "afterText": "<p>Select a point in the first interval (between 0 and 3 seconds) on the graph. Then <b>click OK</b></p>",
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
          "data": [["position-data", { "line-type": "connected" }]],
          "annotations": ["p1A-highlight", "students-segment-labels"]
        },
        "bottom": {
          "type": "table",
          "data": "position-data",
          "annotations": ["p1A-highlight"]
        }
      },
      "beforeText": "<p><b>Incorrect.</b> Your point is not within the first three seconds.</p> <p>Select a point in the <b>first interval (between 0 and 3 seconds)</b>. Then <b>click OK</b>.</p>",
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
          "data": [["position-data", { "line-type": "connected" }]],
          "annotations": ["p1A-highlight", "p2A-highlight", "students-segment-labels"]
        },
        "bottom": {
          "type": "table",
          "data": "position-data",
          "annotations": ["p1A-highlight", "p2A-highlight"]
        }
      },
      "beforeText": "<p>Select a second point in the first interval (between 0 and 3 seconds). Then <b>click OK</b>.</p>",
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
          "data": [["position-data", { "line-type": "connected" }]],
          "annotations": ["p1A-highlight", "p2A-highlight", "students-segment-labels"]
        },
        "bottom": {
          "type": "table",
          "data": "position-data",
          "annotations": ["p1A-highlight", "p2A-highlight"]
        }
      },
      "beforeText": "<p><b>Incorrect.</b> Your second point was not within the first three seconds. </p> <p> Select a second point in the first interval (between 0 and 3 seconds). Then <b>click OK</b>.</p>",
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
          "data": [["position-data", { "line-type": "connected" }]],
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
          "data": [["position-data", { "line-type": "connected" }]],
          "annotations": ["p1A-highlight", "p2A-highlight", "students-segment-labels", "slope-line-A"]
        },
        "bottom": {
          "type": "table",
          "data": "position-data",
          "annotations": ["p1A-highlight", "p2A-highlight"]
        }
      },
      "beforeText": "<p><b>Incorrect.</b></p><p>What is the <b>velocity</b> between the two points, in meters per second?</p>",
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
          "data": [["position-data", { "line-type": "connected" }]],
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
      "beforeText": "<p><b>Incorrect.</b></p><p>What is the change in position?</p>",
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
          "data": [["position-data", { "line-type": "connected" }]],
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
      "beforeText": "<p><b>Incorrect.</b> The change in position is <b>%@</b> - <b>%@</b>, or <b>%@</b> %@.</p>",
      "substitutedExpressions": [
        "end-position_str",
        "start-position_str",
        "change-position_str",
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
          "data": [["position-data", { "line-type": "connected" }]],
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
          "data": [["position-data", { "line-type": "connected" }]],
          "annotations": ["p1A-highlight", "p2A-highlight", "slope-line-A", "rise-arrow-A"],
          "highlightedAnnotations": ["run-arrow-A"]
        },
        "bottom": {
          "type": "table",
          "data": "position-data",
          "annotations": ["rise-bracket-A", "p1A-highlight", "p2A-highlight"]
        }
      },
      "beforeText": "<p><b>Correct!</b></p><p>What is the change in time? </p>",
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
          "data": [["position-data", { "line-type": "connected" }]],
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
      "beforeText": "<p><b>Incorrect.</b></p><p>What is the change in time?</p>",
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
          "data": [["position-data", { "line-type": "connected" }]],
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
          "data": [["position-data", { "line-type": "connected" }]],
          "annotations": ["p1A-highlight", "p2A-highlight", "slope-line-A"]
        },
        "bottom": {
          "type": "table",
          "data": "position-data",
          "annotations": ["p1A-highlight", "p2A-highlight"]
        }
      },
      "beforeText": "<p><b>Incorrect.</b></p><p>If the change in position is <b>%@</b> %@ and the change in time is <b>%@</b> %@, what is the velocity, in meters per second?</p>",
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
          "data": [["position-data", { "line-type": "connected" }]],
          "annotations": ["p1A-highlight", "p2A-highlight", "slope-line-A"]
        },
        "bottom": {
          "type": "table",
          "data": "position-data",
          "annotations": ["p1A-highlight", "p2A-highlight"]
        }
      },
      "beforeText": "<p><b>Incorrect.</b></p><p>If the change in position is <b>%@</b> %@ and the change in time is <b>%@</b> %@, the velocity is <b>%@</b> divided by <b>%@</b>, or <b>%@</b> %@.</p>",
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
          "data": [["position-data", { "line-type": "connected" }]],
          "annotations": ["students-segment-labels"]
        },
        "bottom": {
          "type": "table",
          "data": "position-data"
        }
      },
      "beforeText": "<p><b>Correct!</b></p>",
      "afterText":  "<p>The velocity was <b>0 m/s</b> in the first segment.</p>",
      "isFinalStep": true,
      "hideSubmitButton": true,
      "nextButtonShouldSubmit": true
    },
    
    {
      "url": "/shared/describing-velocity/page/5/step/1",
      "activityPage": "/shared/describing-velocity/page/5",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/40m",
          "data": [["position-data", { "line-type": "connected" }]],
          "annotations": ["students-segment-labels"]
        },
        "bottom": {
          "type": "table",
          "data": "position-data",
          "annotations": []
        }

      },
      "tools": [],
      "beforeText": "<p>Use the position-time data to <strong>answer</strong> the following questions.</p>  <p>What was the car’s velocity from 3-6 seconds?</p>",
      "responseTemplate": "/shared/describing-velocity/response-template/numeric",
      "afterText": "<p><strong>Hint:</strong> Recall that velocity is the slope of a position-time graph<p>",
      "submissibilityCriterion": ["isNumeric", ["responseField", 1]],
      "variableAssignments": [{
        "name": "student-velocity",
        "value": ["responseField", 1]
      }],
      "responseBranches": [
        {
          "criterion": ["withinAbsTolerance", ["responseField", 1], 2, 0.1],
          "step": "/shared/describing-velocity/page/5/step/16"
        }
      ],
      "defaultBranch": "/shared/describing-velocity/page/5/step/2",
      "submitButtonTitle": "Check My Answer"
    },
    {
      "url": "/shared/describing-velocity/page/5/step/2",
      "activityPage": "/shared/describing-velocity/page/5",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/40m",
          "data": [["position-data", { "line-type": "connected" }]],
          "annotations": ["p1A-highlight", "students-segment-labels"]
        },
        "bottom": {
          "type": "table",
          "data": "position-data",
          "annotations": ["p1A-highlight"]
        }
      },
      "beforeText": "<p><b>Incorrect.</b> The velocity for this segment is not <em>%@ m/s</em>.</p>",
      "substitutedExpressions": [ "student-velocity" ],
      "afterText": "<p>Select a point in the second interval (between 3 and 6 seconds) on the graph. Then <b>click OK</b></p>",
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
          "criterion": ["and", [">=", ["coord", "x", "first-point-A"], 3], ["<=", ["coord", "x", "first-point-A"], 6]],
          "step": "/shared/describing-velocity/page/5/step/4"
        }
      ],
      "defaultBranch": "/shared/describing-velocity/page/5/step/3",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/describing-velocity/page/5/step/3",
      "activityPage": "/shared/describing-velocity/page/5",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/40m",
          "data": [["position-data", { "line-type": "connected" }]],
          "annotations": ["p1A-highlight", "students-segment-labels"]
        },
        "bottom": {
          "type": "table",
          "data": "position-data",
          "annotations": ["p1A-highlight"]
        }
      },
      "beforeText": "<p><b>Incorrect.</b> Your point is not within the second three seconds.</p> <p>Select apoint in the <b>second interval (between 3 and 6 seconds)</b>. Then <b>click OK</b>.</p>",
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
          "criterion": ["and", [">=", ["coord", "x", "first-point-A"], 3], ["<=", ["coord", "x", "first-point-A"], 6]],
          "step": "/shared/describing-velocity/page/5/step/4"
        }
      ],
      "defaultBranch": "/shared/describing-velocity/page/5/step/3",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/describing-velocity/page/5/step/4",
      "activityPage": "/shared/describing-velocity/page/5",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/40m",
          "data": [["position-data", { "line-type": "connected" }]],
          "annotations": ["p1A-highlight", "p2A-highlight", "students-segment-labels"]
        },
        "bottom": {
          "type": "table",
          "data": "position-data",
          "annotations": ["p1A-highlight", "p2A-highlight"]
        }
      },
      "beforeText": "<p>Select a second point in the second interval (between 3 and 6 seconds). Then <b>click OK</b>.</p>",
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
          "criterion": ["and", [">=", ["coord", "x", "second-point-A"], 3], ["<=", ["coord", "x", "second-point-A"], 6],["!=", ["coord", "x", "first-point-A"], ["coord", "x", "second-point-A"]]],
          "step": "/shared/describing-velocity/page/5/step/6"
        }
      ],
      "defaultBranch": "/shared/describing-velocity/page/5/step/5",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/describing-velocity/page/5/step/5",
      "activityPage": "/shared/describing-velocity/page/5",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/40m",
          "data": [["position-data", { "line-type": "connected" }]],
          "annotations": ["p1A-highlight", "p2A-highlight", "students-segment-labels"]
        },
        "bottom": {
          "type": "table",
          "data": "position-data",
          "annotations": ["p1A-highlight", "p2A-highlight"]
        }
      },
      "beforeText": "<p><b>Incorrect.</b> Your second point was not within the second three seconds. </p> <p> Select a second point in the second interval (between 3 and 6 seconds). Then <b>click OK</b>.</p>",
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
          "criterion": ["and", [">=", ["coord", "x", "second-point-A"], 3], ["<=", ["coord", "x", "second-point-A"], 6],["!=", ["coord", "x", "first-point-A"], ["coord", "x", "second-point-A"]]],
          "step": "/shared/describing-velocity/page/5/step/6"
        }
      ],
      "defaultBranch": "/shared/describing-velocity/page/5/step/5",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/describing-velocity/page/5/step/6",
      "activityPage": "/shared/describing-velocity/page/5",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/40m",
          "data": [["position-data", { "line-type": "connected" }]],
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
          "step": "/shared/describing-velocity/page/5/step/16"
        }
      ],
      "defaultBranch": "/shared/describing-velocity/page/5/step/7",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/describing-velocity/page/5/step/7",
      "activityPage": "/shared/describing-velocity/page/5",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/40m",
          "data": [["position-data", { "line-type": "connected" }]],
          "annotations": ["p1A-highlight", "p2A-highlight", "students-segment-labels", "slope-line-A"]
        },
        "bottom": {
          "type": "table",
          "data": "position-data",
          "annotations": ["p1A-highlight", "p2A-highlight"]
        }
      },
      "beforeText": "<p><b>Incorrect.</b></p><p>What is the <b>velocity</b> between the two points, in meters per second?</p>",
      "responseTemplate": "/shared/describing-velocity/response-template/numeric",
      "afterText": "<p>Hint: Recall that velocity is the change in position divided by the change in time.</p>",
      "submissibilityCriterion": ["isNumeric", ["responseField", 1]],
      "responseBranches": [
        {
          "criterion": ["withinAbsTolerance", ["slope", "first-point-A", "second-point-A"], ["responseField", 1], 0.1],
          "step": "/shared/describing-velocity/page/5/step/16"
        }
      ],
      "defaultBranch": "/shared/describing-velocity/page/5/step/8",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/describing-velocity/page/5/step/8",
      "activityPage": "/shared/describing-velocity/page/5",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/40m",
          "data": [["position-data", { "line-type": "connected" }]],
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
      "beforeText": "<p><b>Incorrect.</b></p><p>What is the change in position?</p>",
      "responseTemplate": "/shared/describing-velocity/response-template/numeric",
      "afterText": "<p>Hint: Look at the graph.</p>",
      "submissibilityCriterion": ["isNumeric", ["responseField", 1]],
      "responseBranches": [
        {
          "criterion": ["withinAbsTolerance", ["delta", "y", ["slopeToolOrder", "first-point-A", "second-point-A"]], ["responseField", 1], 0.1],
          "step": "/shared/describing-velocity/page/5/step/11"
        }
      ],
      "defaultBranch": "/shared/describing-velocity/page/5/step/9",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/describing-velocity/page/5/step/9",
      "activityPage": "/shared/describing-velocity/page/5",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/40m",
          "data": [["position-data", { "line-type": "connected" }]],
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
      "beforeText": "<p><b>Incorrect.</b> The change in position is <b>%@</b> - <b>%@</b>, or <b>%@</b> %@.</p>",
      "substitutedExpressions": [
        "end-position",
        "start-position",
        "change-position",
        "change-position-units"
      ],
      "defaultBranch": "/shared/describing-velocity/page/5/step/10",
      "submitButtonTitle": "Continue"
    },
    {
      "url": "/shared/describing-velocity/page/5/step/10",
      "activityPage": "/shared/describing-velocity/page/5",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/40m",
          "data": [["position-data", { "line-type": "connected" }]],
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
          "step": "/shared/describing-velocity/page/5/step/14"
        }
      ],
      "defaultBranch": "/shared/describing-velocity/page/5/step/12",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/describing-velocity/page/5/step/11",
      "activityPage": "/shared/describing-velocity/page/5",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/40m",
          "data": [["position-data", { "line-type": "connected" }]],
          "annotations": ["p1A-highlight", "p2A-highlight", "slope-line-A", "rise-arrow-A"],
          "highlightedAnnotations": ["run-arrow-A"]
        },
        "bottom": {
          "type": "table",
          "data": "position-data",
          "annotations": ["rise-bracket-A", "p1A-highlight", "p2A-highlight"]
        }
      },
      "beforeText": "<p><b>Correct!</b></p><p>What is the change in time? </p>",
      "responseTemplate": "/shared/describing-velocity/response-template/numeric",
      "afterText": "<p>Hint:Look at the graph.</p>",
      "submissibilityCriterion": ["isNumeric", ["responseField", 1]],
      "responseBranches": [
        {
          "criterion": ["withinAbsTolerance", ["delta", "x", ["slopeToolOrder", "first-point-A", "second-point-A"]], ["responseField", 1], 0.1],
          "step": "/shared/describing-velocity/page/5/step/14"
        }
      ],
      "defaultBranch": "/shared/describing-velocity/page/5/step/12",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/describing-velocity/page/5/step/12",
      "activityPage": "/shared/describing-velocity/page/5",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/40m",
          "data": [["position-data", { "line-type": "connected" }]],
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
      "beforeText": "<p><b>Incorrect.</b></p><p>What is the change in time?</p>",
      "responseTemplate": "/shared/describing-velocity/response-template/numeric",
      "afterText": "<p>Hint: Look at the table and the graph.</p>",
      "submissibilityCriterion": ["isNumeric", ["responseField", 1]],
      "responseBranches": [
        {
          "criterion": ["withinAbsTolerance", ["delta", "x", ["slopeToolOrder", "first-point-A", "second-point-A"]], ["responseField", 1], 0.1],
          "step": "/shared/describing-velocity/page/5/step/14"
        }
      ],
      "defaultBranch": "/shared/describing-velocity/page/5/step/13",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/describing-velocity/page/5/step/13",
      "activityPage": "/shared/describing-velocity/page/5",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/40m",
          "data": [["position-data", { "line-type": "connected" }]],
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
          "step": "/shared/describing-velocity/page/5/step/16"
        }
      ],
      "defaultBranch": "/shared/describing-velocity/page/5/step/14",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/describing-velocity/page/5/step/14",
      "activityPage": "/shared/describing-velocity/page/5",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/40m",
          "data": [["position-data", { "line-type": "connected" }]],
          "annotations": ["p1A-highlight", "p2A-highlight", "slope-line-A"]
        },
        "bottom": {
          "type": "table",
          "data": "position-data",
          "annotations": ["p1A-highlight", "p2A-highlight"]
        }
      },
      "beforeText": "<p><b>Incorrect.</b></p><p>If the change in position is <b>%@</b> %@ and the change in time is <b>%@</b> %@, what is the velocity, in meters per second?</p>",
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
          "step": "/shared/describing-velocity/page/5/step/16"
        }
      ],
      "defaultBranch": "/shared/describing-velocity/page/5/step/15",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/describing-velocity/page/5/step/15",
      "activityPage": "/shared/describing-velocity/page/5",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/40m",
          "data": [["position-data", { "line-type": "connected" }]],
          "annotations": ["p1A-highlight", "p2A-highlight", "slope-line-A"]
        },
        "bottom": {
          "type": "table",
          "data": "position-data",
          "annotations": ["p1A-highlight", "p2A-highlight"]
        }
      },
      "beforeText": "<p><b>Incorrect.</b></p><p>If the change in position is <b>%@</b> %@ and the change in time is <b>%@</b> %@, the velocity is <b>%@</b> divided by <b>%@</b>, or <b>%@</b> %@.</p>",
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
      "url": "/shared/describing-velocity/page/5/step/16",
      "activityPage": "/shared/describing-velocity/page/5",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/40m",
          "data": [["position-data", { "line-type": "connected" }]],
          "annotations": ["students-segment-labels"]
        },
        "bottom": {
          "type": "table",
          "data": "position-data"
        }
      },
      "beforeText": "<p><b>Correct!</b></p>",
      "afterText":  "<p>The velocity was <b>2 m/s</b> in the second segment.</p>",
      "isFinalStep": true,
      "hideSubmitButton": true,
      "nextButtonShouldSubmit": true
    },
    
    {
      "url": "/shared/describing-velocity/page/6/step/1",
      "activityPage": "/shared/describing-velocity/page/6",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/40m",
          "data": [["position-data", { "line-type": "connected" }]],
          "annotations": ["students-segment-labels"]
        },
        "bottom": {
          "type": "table",
          "data": "position-data",
          "annotations": []
        }

      },
      "tools": [],
      "beforeText": "<p>Use the position-time data to <strong>answer</strong> the following questions.</p>  <p>What was the car’s velocity from 6-9 seconds?</p>",
      "responseTemplate": "/shared/describing-velocity/response-template/numeric",
      "afterText": "<p><strong>Hint:</strong> Recall that velocity is the slope of a position-time graph<p>",
      "submissibilityCriterion": ["isNumeric", ["responseField", 1]],
      "variableAssignments": [{
        "name": "student-velocity",
        "value": ["responseField", 1]
      }],
      "responseBranches": [
        {
          "criterion": ["withinAbsTolerance", ["responseField", 1], 10, 0.1],
          "step": "/shared/describing-velocity/page/6/step/16"
        }
      ],
      "defaultBranch": "/shared/describing-velocity/page/6/step/2",
      "submitButtonTitle": "Check My Answer"
    },
    {
      "url": "/shared/describing-velocity/page/6/step/2",
      "activityPage": "/shared/describing-velocity/page/6",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/40m",
          "data": [["position-data", { "line-type": "connected" }]],
          "annotations": ["p1A-highlight", "students-segment-labels"]
        },
        "bottom": {
          "type": "table",
          "data": "position-data",
          "annotations": ["p1A-highlight"]
        }
      },
      "beforeText": "<p><b>Incorrect.</b> The velocity for this segment is not <em>%@ m/s</em>.</p>",
      "substitutedExpressions": [ "student-velocity" ],
      "afterText": "<p>Select a point in the third interval (between 6 and 9 seconds) on the graph. Then <b>click OK</b></p>",
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
          "criterion": ["and", [">=", ["coord", "x", "first-point-A"], 6], ["<=", ["coord", "x", "first-point-A"], 9]],
          "step": "/shared/describing-velocity/page/6/step/4"
        }
      ],
      "defaultBranch": "/shared/describing-velocity/page/6/step/3",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/describing-velocity/page/6/step/3",
      "activityPage": "/shared/describing-velocity/page/6",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/40m",
          "data": [["position-data", { "line-type": "connected" }]],
          "annotations": ["p1A-highlight", "students-segment-labels"]
        },
        "bottom": {
          "type": "table",
          "data": "position-data",
          "annotations": ["p1A-highlight"]
        }
      },
      "beforeText": "<p><b>Incorrect.</b> Your point is not within the third three seconds.</p> <p>Select apoint in the <b>third interval (between 6 and 9 seconds)</b>. Then <b>click OK</b>.</p>",
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
          "criterion": ["and", [">=", ["coord", "x", "first-point-A"], 6], ["<=", ["coord", "x", "first-point-A"], 9]],
          "step": "/shared/describing-velocity/page/6/step/4"
        }
      ],
      "defaultBranch": "/shared/describing-velocity/page/6/step/3",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/describing-velocity/page/6/step/4",
      "activityPage": "/shared/describing-velocity/page/6",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/40m",
          "data": [["position-data", { "line-type": "connected" }]],
          "annotations": ["p1A-highlight", "p2A-highlight", "students-segment-labels"]
        },
        "bottom": {
          "type": "table",
          "data": "position-data",
          "annotations": ["p1A-highlight", "p2A-highlight"]
        }
      },
      "beforeText": "<p>Select a second point in the third interval (between 6 and 9 seconds). Then <b>click OK</b>.</p>",
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
          "criterion": ["and", [">=", ["coord", "x", "second-point-A"], 6], ["<=", ["coord", "x", "second-point-A"], 9],["!=", ["coord", "x", "first-point-A"], ["coord", "x", "second-point-A"]]],
          "step": "/shared/describing-velocity/page/6/step/6"
        }
      ],
      "defaultBranch": "/shared/describing-velocity/page/6/step/5",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/describing-velocity/page/6/step/5",
      "activityPage": "/shared/describing-velocity/page/6",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/40m",
          "data": [["position-data", { "line-type": "connected" }]],
          "annotations": ["p1A-highlight", "p2A-highlight", "students-segment-labels"]
        },
        "bottom": {
          "type": "table",
          "data": "position-data",
          "annotations": ["p1A-highlight", "p2A-highlight"]
        }
      },
      "beforeText": "<p><b>Incorrect.</b> Your second point was not within the third three seconds. </p> <p> Select a second point in the third interval (between 6 and 9 seconds). Then <b>click OK</b>.</p>",
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
          "criterion": ["and", [">=", ["coord", "x", "second-point-A"], 6], ["<=", ["coord", "x", "second-point-A"], 9],["!=", ["coord", "x", "first-point-A"], ["coord", "x", "second-point-A"]]],
          "step": "/shared/describing-velocity/page/6/step/6"
        }
      ],
      "defaultBranch": "/shared/describing-velocity/page/6/step/5",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/describing-velocity/page/6/step/6",
      "activityPage": "/shared/describing-velocity/page/6",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/40m",
          "data": [["position-data", { "line-type": "connected" }]],
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
          "step": "/shared/describing-velocity/page/6/step/16"
        }
      ],
      "defaultBranch": "/shared/describing-velocity/page/6/step/7",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/describing-velocity/page/6/step/7",
      "activityPage": "/shared/describing-velocity/page/6",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/40m",
          "data": [["position-data", { "line-type": "connected" }]],
          "annotations": ["p1A-highlight", "p2A-highlight", "students-segment-labels", "slope-line-A"]
        },
        "bottom": {
          "type": "table",
          "data": "position-data",
          "annotations": ["p1A-highlight", "p2A-highlight"]
        }
      },
      "beforeText": "<p><b>Incorrect.</b></p><p>What is the <b>velocity</b> between the two points, in meters per second?</p>",
      "responseTemplate": "/shared/describing-velocity/response-template/numeric",
      "afterText": "<p>Hint: Recall that velocity is the change in position divided by the change in time.</p>",
      "submissibilityCriterion": ["isNumeric", ["responseField", 1]],
      "responseBranches": [
        {
          "criterion": ["withinAbsTolerance", ["slope", "first-point-A", "second-point-A"], ["responseField", 1], 0.1],
          "step": "/shared/describing-velocity/page/6/step/16"
        }
      ],
      "defaultBranch": "/shared/describing-velocity/page/6/step/8",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/describing-velocity/page/6/step/8",
      "activityPage": "/shared/describing-velocity/page/6",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/40m",
          "data": [["position-data", { "line-type": "connected" }]],
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
      "beforeText": "<p><b>Incorrect.</b></p><p>What is the change in position?</p>",
      "responseTemplate": "/shared/describing-velocity/response-template/numeric",
      "afterText": "<p>Hint: Look at the graph.</p>",
      "submissibilityCriterion": ["isNumeric", ["responseField", 1]],
      "responseBranches": [
        {
          "criterion": ["withinAbsTolerance", ["delta", "y", ["slopeToolOrder", "first-point-A", "second-point-A"]], ["responseField", 1], 0.1],
          "step": "/shared/describing-velocity/page/6/step/11"
        }
      ],
      "defaultBranch": "/shared/describing-velocity/page/6/step/9",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/describing-velocity/page/6/step/9",
      "activityPage": "/shared/describing-velocity/page/6",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/40m",
          "data": [["position-data", { "line-type": "connected" }]],
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
      "beforeText": "<p><b>Incorrect.</b> The change in position is <b>%@</b> - <b>%@</b>, or <b>%@</b> %@.</p>",
      "substitutedExpressions": [
        "end-position",
        "start-position",
        "change-position",
        "change-position-units"
      ],
      "defaultBranch": "/shared/describing-velocity/page/6/step/10",
      "submitButtonTitle": "Continue"
    },
    {
      "url": "/shared/describing-velocity/page/6/step/10",
      "activityPage": "/shared/describing-velocity/page/6",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/40m",
          "data": [["position-data", { "line-type": "connected" }]],
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
          "step": "/shared/describing-velocity/page/6/step/14"
        }
      ],
      "defaultBranch": "/shared/describing-velocity/page/6/step/12",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/describing-velocity/page/6/step/11",
      "activityPage": "/shared/describing-velocity/page/6",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/40m",
          "data": [["position-data", { "line-type": "connected" }]],
          "annotations": ["p1A-highlight", "p2A-highlight", "slope-line-A", "rise-arrow-A"],
          "highlightedAnnotations": ["run-arrow-A"]
        },
        "bottom": {
          "type": "table",
          "data": "position-data",
          "annotations": ["rise-bracket-A", "p1A-highlight", "p2A-highlight"]
        }
      },
      "beforeText": "<p><b>Correct!</b></p><p>What is the change in time? </p>",
      "responseTemplate": "/shared/describing-velocity/response-template/numeric",
      "afterText": "<p>Hint:Look at the graph.</p>",
      "submissibilityCriterion": ["isNumeric", ["responseField", 1]],
      "responseBranches": [
        {
          "criterion": ["withinAbsTolerance", ["delta", "x", ["slopeToolOrder", "first-point-A", "second-point-A"]], ["responseField", 1], 0.1],
          "step": "/shared/describing-velocity/page/6/step/14"
        }
      ],
      "defaultBranch": "/shared/describing-velocity/page/6/step/12",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/describing-velocity/page/6/step/12",
      "activityPage": "/shared/describing-velocity/page/6",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/40m",
          "data": [["position-data", { "line-type": "connected" }]],
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
      "beforeText": "<p><b>Incorrect.</b></p><p>What is the change in time?</p>",
      "responseTemplate": "/shared/describing-velocity/response-template/numeric",
      "afterText": "<p>Hint: Look at the table and the graph.</p>",
      "submissibilityCriterion": ["isNumeric", ["responseField", 1]],
      "responseBranches": [
        {
          "criterion": ["withinAbsTolerance", ["delta", "x", ["slopeToolOrder", "first-point-A", "second-point-A"]], ["responseField", 1], 0.1],
          "step": "/shared/describing-velocity/page/6/step/14"
        }
      ],
      "defaultBranch": "/shared/describing-velocity/page/6/step/13",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/describing-velocity/page/6/step/13",
      "activityPage": "/shared/describing-velocity/page/6",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/40m",
          "data": [["position-data", { "line-type": "connected" }]],
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
          "step": "/shared/describing-velocity/page/6/step/16"
        }
      ],
      "defaultBranch": "/shared/describing-velocity/page/6/step/14",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/describing-velocity/page/6/step/14",
      "activityPage": "/shared/describing-velocity/page/6",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/40m",
          "data": [["position-data", { "line-type": "connected" }]],
          "annotations": ["p1A-highlight", "p2A-highlight", "slope-line-A"]
        },
        "bottom": {
          "type": "table",
          "data": "position-data",
          "annotations": ["p1A-highlight", "p2A-highlight"]
        }
      },
      "beforeText": "<p><b>Incorrect.</b></p><p>If the change in position is <b>%@</b> %@ and the change in time is <b>%@</b> %@, what is the velocity, in meters per second?</p>",
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
          "step": "/shared/describing-velocity/page/6/step/16"
        }
      ],
      "defaultBranch": "/shared/describing-velocity/page/6/step/15",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/describing-velocity/page/6/step/15",
      "activityPage": "/shared/describing-velocity/page/6",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/40m",
          "data": [["position-data", { "line-type": "connected" }]],
          "annotations": ["p1A-highlight", "p2A-highlight", "slope-line-A"]
        },
        "bottom": {
          "type": "table",
          "data": "position-data",
          "annotations": ["p1A-highlight", "p2A-highlight"]
        }
      },
      "beforeText": "<p><b>Incorrect.</b></p><p>If the change in position is <b>%@</b> %@ and the change in time is <b>%@</b> %@, the velocity is <b>%@</b> divided by <b>%@</b>, or <b>%@</b> %@.</p>",
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
      "url": "/shared/describing-velocity/page/6/step/16",
      "activityPage": "/shared/describing-velocity/page/6",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/40m",
          "data": [["position-data", { "line-type": "connected" }]],
          "annotations": ["students-segment-labels"]
        },
        "bottom": {
          "type": "table",
          "data": "position-data"
        }
      },
      "beforeText": "<p><b>Correct!</b></p>",
      "afterText":  "<p>The velocity was <b>10 m/s</b> in the third segment.</p>",
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
            "staticImages": [{
                "name":  "finish",
                "image":  sc_static('images/finish.png'),
                "width":  70,
                "height": 10,
                "xOffset": 0,
                "yOffset": 5,
                "instances": [
                  { "y": 0 }
                ]
            }],
            "animations": [{
              "data": "position-data",
              "image": sc_static('images/carWhite2.png'),
              "width":  30,
              "height": 61,
              "xOffset": 40,
              "yOffset": 0
            }],
            "linkedAnimations": [{
              "pane": "bottom",
              "animations": [{
                "data": "car-velocity"
              }]
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
            "staticImages": [{
                "name":  "finish",
                "image":  sc_static('images/finish.png'),
                "width":  70,
                "height": 10,
                "xOffset": 0,
                "yOffset": 5,
                "instances": [
                  {"y": 0 }
                ]
            }],
            "animations": [{
              "data": "position-data",
              "image": sc_static('images/carWhite2.png'),
              "width":  30,
              "height": 61,
              "xOffset": 40,
              "yOffset": 0
            }],
            "linkedAnimations": [{
              "pane": "bottom",
              "animations": [{
                "data": "car-velocity"
              }]
            }]
          }
        }
      ],
      "beforeText": " <p>Both graphs provide information about the same motion.</p><p><b>Describe</b> how constant velocity is represented on a position-time graph and on a velocity-time graph.</p><p><b>Word bank</b>: constant velocity, flat, straight, tilted, up, down, right, left, segment, horizontal, steep, slope</p>",
      "responseTemplate": "/shared/describing-velocity/response-template/open",
      "submissibilityCriterion": ["textLengthIsAtLeast", 1, ["responseField", 1]],
      "nextButtonShouldSubmit": true, 
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
      "beforeText": "<p><b>Incorrect.</b> The graph is a horizontal segment in which the velocity is 0.</p>",
      "nextButtonShouldSubmit": true,
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
      "beforeText": "<p><b>Correct!</b> The graph is a horizontal segment in which the velocity is 0.</p>",
      "nextButtonShouldSubmit": true, 
      "hideSubmitButton": true,
      "isFinalStep": true
    },
    
    {
      "url": "/shared/describing-velocity/page/10/step/1",
      "activityPage": "/shared/describing-velocity/page/10",
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
          "annotations": ["students-segment-labels"]
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
      "beforeText": " <p>The position-time graph of the car's motion displays in the top window and the velocity time graph displays in the bottom.</p><p>How do the labels describing the motion compare in the two graphs?</p>",
      "responseTemplate": "/shared/describing-velocity/response-template/open",
      "submissibilityCriterion": ["textLengthIsAtLeast", 1, ["responseField", 1]],
      "hideSubmitButton": true,
      "nextButtonShouldSubmit": true,
      "isFinalStep": true
    },
    
    {
      "url": "/shared/describing-velocity/page/11/step/1",
      "activityPage": "/shared/describing-velocity/page/11",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/40m",
          "data": [
            ["car-in-reverse-position", { "point-type": "none", "line-type": "connected" }]
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
            "staticImages": [{
                "name":  "finish",
                "image":  sc_static('images/finish.png'),
                "width":  70,
                "height": 10,
                "xOffset": 0,
                "yOffset": 5,
                "instances": [
                  { "y": 0 }
                ]
            }],
            "animations": [{
                "data": "car-in-reverse-position",
                "image": sc_static('images/carWhite2.png'),
                "width":  30,
                "height": 61,
                "xOffset": 40,
                "yOffset": 0
              }]
          }
        }
      ],
      "beforeText": "<p>Let's look at another type of motion that you have experienced.</p><p><b>Click</b> the Start button to watch the motion and corresponding position-time graph",
      "submitButtonTitle": "OK",
      "defaultBranch": "/shared/describing-velocity/page/11/step/2"
    },
    
    {
      "url": "/shared/describing-velocity/page/11/step/2",
      "activityPage": "/shared/describing-velocity/page/11",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/40m",
          "data": [
            ["car-in-reverse-position", { "point-type": "none", "line-type": "connected" }]
          ],
          "annotations": []
        },
        "bottom": {
          "type": "graph",
          "title": "Velocity vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/car-mps",
          "data": [
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
            "staticImages": [{
                "name":  "finish",
                "image":  sc_static('images/finish.png'),
                "width":  70,
                "height": 10,
                "xOffset": 0,
                "yOffset": 5,
                "instances": [
                  { "y": 0 }
                ]
            }],
            "animations": [{
                "data": "car-in-reverse-position",
                "image": sc_static('images/carWhite2.png'),
                "width":  30,
                "height": 61,
                "xOffset": 40,
                "yOffset": 0
              }]
          }
        }
      ],
      "beforeText": "<p>Use the position-time graph to find the car's velocity</p><p><b>Sketch</b> the velocity-time graph for the motion in the bottom area.</p>",
      "submitButtonTitle": "OK",
      "defaultBranch": "/shared/describing-velocity/page/11/step/3"      
    },
    
    {
      "url": "/shared/describing-velocity/page/11/step/3",
      "activityPage": "/shared/describing-velocity/page/11",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/40m",
          "data": [
            ["car-in-reverse-position", { "point-type": "none", "line-type": "connected" }]
          ],
          "annotations": []
        },
        "bottom": {
          "type": "graph",
          "title": "Velocity vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/car-mps",
          "data": [
            ["car-in-reverse-velocity", { "point-type": "none", "line-type": "connected" }]
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
            "staticImages": [{
                "name":  "finish",
                "image":  sc_static('images/finish.png'),
                "width":  70,
                "height": 10,
                "xOffset": 0,
                "yOffset": 5,
                "instances": [
                  { "y": 0 }
                ]
            }],
            "animations": [{
                "data": "car-in-reverse-position",
                "image": sc_static('images/carWhite2.png'),
                "width":  30,
                "height": 61,
                "xOffset": 40,
                "yOffset": 0
              }]
          }
        }
      ],
      "beforeText": "<p><b>Click</b> the Start button. <b>Observe</b> the motion and graph multiple times.</p><p>In the top area, the position-time graph displays. In the bottom area, the actual velocity-time graph displays along with your sketch.</p><p>How does your predicted velocity compare with the actual velocity?</p>",
      "responseTemplate": "/shared/describing-velocity/response-template/open",
      "submissibilityCriterion": ["textLengthIsAtLeast", 1, ["responseField", 1]],
      "submitButtonTitle": "OK",
      "defaultBranch": "/shared/describing-velocity/page/11/step/4"
    },
    
    {
      "url": "/shared/describing-velocity/page/11/step/4",
      "activityPage": "/shared/describing-velocity/page/11",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/40m",
          "data": [
            ["car-in-reverse-position", { "point-type": "none", "line-type": "connected" }]
          ],
          "annotations": []
        },
        "bottom": {
          "type": "graph",
          "title": "Velocity vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/car-mps",
          "data": [
            ["car-in-reverse-velocity", { "point-type": "none", "line-type": "connected" }]
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
            "staticImages": [{
                "name":  "finish",
                "image":  sc_static('images/finish.png'),
                "width":  70,
                "height": 10,
                "xOffset": 0,
                "yOffset": 5,
                "instances": [
                  { "y": 0 }
                ]
            }],
            "animations": [{
                "data": "car-in-reverse-position",
                "image": sc_static('images/carWhite2.png'),
                "width":  30,
                "height": 61,
                "xOffset": 40,
                "yOffset": 0
              }]
          }
        }
      ],
      "beforeText": "<p>Based on your observations, which of the following statements is true?",
      "responseTemplate": "/shared/describing-velocity/response-template/velocity-time-question-2",
      "submitButtonTitle": "Check My Answer",
      "responseBranches": [
        { 
          "criterion": ["=", ["responseField", 1], 2],
          "step": "/shared/describing-velocity/page/11/step/9"
        }
      ],
      "defaultBranch": "/shared/describing-velocity/page/11/step/5"
    },
    
    {
      "url": "/shared/describing-velocity/page/11/step/5",
      "activityPage": "/shared/describing-velocity/page/11",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/40m",
          "data": [
            ["car-in-reverse-position", { "point-type": "none", "line-type": "connected" }]
          ],
          "annotations": []
        },
        "bottom": {
          "type": "graph",
          "title": "Velocity vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/car-mps",
          "data": [
            ["car-in-reverse-velocity", { "point-type": "none", "line-type": "connected" }]
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
            "staticImages": [{
                "name":  "finish",
                "image":  sc_static('images/finish.png'),
                "width":  70,
                "height": 10,
                "xOffset": 0,
                "yOffset": 5,
                "instances": [
                  { "y": 0 }
                ]
            }],
            "animations": [{
                "data": "car-in-reverse-position",
                "image": sc_static('images/carWhite2.png'),
                "width":  30,
                "height": 61,
                "xOffset": 40,
                "yOffset": 0
              }]
          }
        }
      ],
      "beforeText": "<p><b>Incorrect.</b> Hint 1: Recall that velocity is the change in position divided by the change in time. Try again: </p><p>Based on your observations, which of the following statements is true?",
      "responseTemplate": "/shared/describing-velocity/response-template/velocity-time-question-2",
      "submitButtonTitle": "Check My Answer",
      "responseBranches": [
        { 
          "criterion": ["=", ["responseField", 1], 2],
          "step": "/shared/describing-velocity/page/11/step/9"
        }
      ],
      "defaultBranch": "/shared/describing-velocity/page/11/step/6"      
    },
    
    {
      "url": "/shared/describing-velocity/page/11/step/6",
      "activityPage": "/shared/describing-velocity/page/11",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/40m",
          "data": [
            ["car-in-reverse-position", { "point-type": "none", "line-type": "connected" }]
          ],
          "annotations": []
        },
        "bottom": {
          "type": "graph",
          "title": "Velocity vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/car-mps",
          "data": [
            ["car-in-reverse-velocity", { "point-type": "none", "line-type": "connected" }]
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
            "staticImages": [{
                "name":  "finish",
                "image":  sc_static('images/finish.png'),
                "width":  70,
                "height": 10,
                "xOffset": 0,
                "yOffset": 5,
                "instances": [
                  { "y": 0 }
                ]
            }],
            "animations": [{
                "data": "car-in-reverse-position",
                "image": sc_static('images/carWhite2.png'),
                "width":  30,
                "height": 61,
                "xOffset": 40,
                "yOffset": 0
              }]
          }
        }
      ],
      "beforeText": "<p><b>Incorrect.</b> Hint 2: The change in position is 0 m - 36 m = -36 m. The change in time is 9 s - 0 s = 9 s. Try again: </p><p>Based on your observations, which of the following statements is true?",
      "responseTemplate": "/shared/describing-velocity/response-template/velocity-time-question-2",
      "submitButtonTitle": "Check My Answer",
      "responseBranches": [
        { 
          "criterion": ["=", ["responseField", 1], 2],
          "step": "/shared/describing-velocity/page/11/step/9"
        }
      ],
      "defaultBranch": "/shared/describing-velocity/page/11/step/7"
    },
    
    {
      "url": "/shared/describing-velocity/page/11/step/7",
      "activityPage": "/shared/describing-velocity/page/11",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/40m",
          "data": [
            ["car-in-reverse-position", { "point-type": "none", "line-type": "connected" }]
          ],
          "annotations": []
        },
        "bottom": {
          "type": "graph",
          "title": "Velocity vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/car-mps",
          "data": [
            ["car-in-reverse-velocity", { "point-type": "none", "line-type": "connected" }]
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
            "staticImages": [{
                "name":  "finish",
                "image":  sc_static('images/finish.png'),
                "width":  70,
                "height": 10,
                "xOffset": 0,
                "yOffset": 5,
                "instances": [
                  { "y": 0 }
                ]
            }],
            "animations": [{
                "data": "car-in-reverse-position",
                "image": sc_static('images/carWhite2.png'),
                "width":  30,
                "height": 61,
                "xOffset": 40,
                "yOffset": 0
              }]
          }
        }
      ],
      "beforeText": "<p><b>Incorrect.</b> Hint 3: The change in the car's position between the end point and the beginning point, divided by the change in the times of the end point and beginning point, is -36 m / 9 s. Try again: </p><p>Based on your observations, which of the following statements is true?",
      "responseTemplate": "/shared/describing-velocity/response-template/velocity-time-question-2",
      "submitButtonTitle": "Check My Answer",
      "responseBranches": [
        { 
          "criterion": ["=", ["responseField", 1], 2],
          "step": "/shared/describing-velocity/page/11/step/9"
        }
      ],
      "defaultBranch": "/shared/describing-velocity/page/11/step/8"      
    },
    
    {
      "url": "/shared/describing-velocity/page/11/step/8",
      "activityPage": "/shared/describing-velocity/page/11",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/40m",
          "data": [
            ["car-in-reverse-position", { "point-type": "none", "line-type": "connected" }]
          ],
          "annotations": []
        },
        "bottom": {
          "type": "graph",
          "title": "Velocity vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/car-mps",
          "data": [
            ["car-in-reverse-velocity", { "point-type": "none", "line-type": "connected" }]
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
            "staticImages": [{
                "name":  "finish",
                "image":  sc_static('images/finish.png'),
                "width":  70,
                "height": 10,
                "xOffset": 0,
                "yOffset": 5,
                "instances": [
                  { "y": 0 }
                ]
            }],
            "animations": [{
                "data": "car-in-reverse-position",
                "image": sc_static('images/carWhite2.png'),
                "width":  30,
                "height": 61,
                "xOffset": 40,
                "yOffset": 0
              }]
          }
        }
      ],
      "beforeText": "<p><b>Incorrect.</b> Velocity = change in position / change in time = -36 m / 9 s = -4 m/s. The velocity is negative.",
      "hideSubmitButton": true,
      "isFinalStep": true
    },
    
    {
      "url": "/shared/describing-velocity/page/11/step/9",
      "activityPage": "/shared/describing-velocity/page/11",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/40m",
          "data": [
            ["car-in-reverse-position", { "point-type": "none", "line-type": "connected" }]
          ],
          "annotations": []
        },
        "bottom": {
          "type": "graph",
          "title": "Velocity vs. Time",
          "xAxis": "/shared/describing-velocity/axes/9s",
          "yAxis": "/shared/describing-velocity/axes/car-mps",
          "data": [
            ["car-in-reverse-velocity", { "point-type": "none", "line-type": "connected" }]
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
            "staticImages": [{
                "image":  sc_static('images/finish.png'),
                "width":  70,
                "height": 10,
                "xOffset": 0,
                "yOffset": 5,
                "instances": [
                  {"y": 0 }
                ]
            }],
            "animations": [{
                "data": "car-in-reverse-position",
                "image": sc_static('images/carWhite2.png'),
                "width":  30,
                "height": 61,
                "xOffset": 40,
                "yOffset": 0
              }]
          }
        }
      ],
      "beforeText": "<p><b>Correct!</b> Velocity = change in position / change in time = -36 m / 9 s = -4 m/s. The velocity is negative.",
      "hideSubmitButton": true,
      "shouldFinishImmediately": true,      
      "isFinalStep": true
    },
    
    {
      "url": "/shared/describing-velocity/page/12/step/1",
      "activityPage": "/shared/describing-velocity/page/12",
      "paneConfig": "single",
      "panes": {
        "single": {
          "type": "graph",
          "title": "Velocity vs. Time",
          "xAxis": "/shared/describing-velocity/axes/identify-the-motion-time",
          "yAxis": "/shared/describing-velocity/axes/identify-the-motion-velocity",
          "data": [
            ["identify-the-motion-data", { "line-type": "connected" }]
          ],
          "annotations": ["identify-the-motion-labels"]
        }
      },
      "beforeText": "<p>Choose the segment in the velocity-time graph that describes where the object was moving forward with a constant velocity.</p>",
      "responseTemplate": "/shared/describing-velocity/response-template/identify-the-motion-responses",
      "submitButtonTitle": "Check My Answer",
      "responseBranches": [
        {
          "criterion": ["=", ["responseField", 1], 3],
          "step": "/shared/describing-velocity/page/12/step/6"
        }
      ],
      "defaultBranch": "/shared/describing-velocity/page/12/step/2"
    },
    
    {
      "url": "/shared/describing-velocity/page/12/step/2",
      "activityPage": "/shared/describing-velocity/page/12",
      "paneConfig": "single",
      "panes": {
        "single": {
          "type": "graph",
          "title": "Velocity vs. Time",
          "xAxis": "/shared/describing-velocity/axes/identify-the-motion-time",
          "yAxis": "/shared/describing-velocity/axes/identify-the-motion-velocity",
          "data": [
            ["identify-the-motion-data", { "line-type": "connected" }]
          ],
          "annotations": ["identify-the-motion-labels"]
        }
      },
      "beforeText": "<p><b>Incorrect.</b> Hint 1: While an object is moving forward with constant velocity, does its velocity stay the same or change? Try again:</p><p>Choose the segment in the velocity-time graph that describes where the object was moving forward with a constant velocity.</p>",
      "responseTemplate": "/shared/describing-velocity/response-template/identify-the-motion-responses",
      "submitButtonTitle": "Check My Answer",
      "responseBranches": [
        {
          "criterion": ["=", ["responseField", 1], 3],
          "step": "/shared/describing-velocity/page/12/step/6"
        }
      ],
      "defaultBranch": "/shared/describing-velocity/page/12/step/3"
    },
    
    {
      "url": "/shared/describing-velocity/page/12/step/3",
      "activityPage": "/shared/describing-velocity/page/12",
      "paneConfig": "single",
      "panes": {
        "single": {
          "type": "graph",
          "title": "Velocity vs. Time",
          "xAxis": "/shared/describing-velocity/axes/identify-the-motion-time",
          "yAxis": "/shared/describing-velocity/axes/identify-the-motion-velocity",
          "data": [
            ["identify-the-motion-data", { "line-type": "connected" }]
          ],
          "annotations": ["identify-the-motion-labels"]
        }
      },
      "beforeText": "<p><b>Incorrect.</b> Hint 2: When an object is moving forward, is its velocity positive, negative, or 0? Try again:</p><p>Choose the segment in the velocity-time graph that describes where the object was moving forward with a constant velocity.</p>",
      "responseTemplate": "/shared/describing-velocity/response-template/identify-the-motion-responses",
      "submitButtonTitle": "Check My Answer",
      "responseBranches": [
        {
          "criterion": ["=", ["responseField", 1], 3],
          "step": "/shared/describing-velocity/page/12/step/6"
        }
      ],
      "defaultBranch": "/shared/describing-velocity/page/12/step/4"
    },
    
    {
      "url": "/shared/describing-velocity/page/12/step/4",
      "activityPage": "/shared/describing-velocity/page/12",
      "paneConfig": "single",
      "panes": {
        "single": {
          "type": "graph",
          "title": "Velocity vs. Time",
          "xAxis": "/shared/describing-velocity/axes/identify-the-motion-time",
          "yAxis": "/shared/describing-velocity/axes/identify-the-motion-velocity",
          "data": [
            ["identify-the-motion-data", { "line-type": "connected" }]
          ],
          "annotations": ["identify-the-motion-labels"]
        }
      },
      "beforeText": "<p><b>Incorrect.</b> Hint 3: Which segment shows a positive, constant velocity? Try again:</p><p>Choose the segment in the velocity-time graph that describes where the object was moving forward with a constant velocity.</p>",
      "responseTemplate": "/shared/describing-velocity/response-template/identify-the-motion-responses",
      "submitButtonTitle": "Check My Answer",
      "responseBranches": [
        {
          "criterion": ["=", ["responseField", 1], 3],
          "step": "/shared/describing-velocity/page/12/step/6"
        }
      ],
      "defaultBranch": "/shared/describing-velocity/page/12/step/5"      
    },
    
    {
      "url": "/shared/describing-velocity/page/12/step/5",
      "activityPage": "/shared/describing-velocity/page/12",
      "paneConfig": "single",
      "panes": {
        "single": {
          "type": "graph",
          "title": "Velocity vs. Time",
          "xAxis": "/shared/describing-velocity/axes/identify-the-motion-time",
          "yAxis": "/shared/describing-velocity/axes/identify-the-motion-velocity",
          "data": [
            ["identify-the-motion-data", { "line-type": "connected" }]
          ],
          "annotations": ["identify-the-motion-labels"]
        }
      },
      "beforeText": "<p><b>Incorrect.</b> From 5 to 11 seconds, the velocity was 3 m/s, which means that the object was moving at a steady rate forward. This corresponds to Segment C.</p>",
      "submitButtonTitle": "OK",
      "defaultBranch": "/shared/describing-velocity/page/12/step/7"
    },

    {
      "url": "/shared/describing-velocity/page/12/step/6",
      "activityPage": "/shared/describing-velocity/page/12",
      "paneConfig": "single",
      "panes": {
        "single": {
          "type": "graph",
          "title": "Velocity vs. Time",
          "xAxis": "/shared/describing-velocity/axes/identify-the-motion-time",
          "yAxis": "/shared/describing-velocity/axes/identify-the-motion-velocity",
          "data": [
            ["identify-the-motion-data", { "line-type": "connected" }]
          ],
          "annotations": ["identify-the-motion-labels"]
        }
      },
      "beforeText": "<p><b>Correct!</b> From 5 to 11 seconds, the velocity was 3 m/s, which means that the object was moving at a steady rate forward. This corresponds to Segment C.</p>",
      "submitButtonTitle": "OK",
      "defaultBranch": "/shared/describing-velocity/page/12/step/7"
    },
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    {
      "url": "/shared/describing-velocity/page/12/step/7",
      "activityPage": "/shared/describing-velocity/page/12",
      "paneConfig": "single",
      "panes": {
        "single": {
          "type": "graph",
          "title": "Velocity vs. Time",
          "xAxis": "/shared/describing-velocity/axes/identify-the-motion-time",
          "yAxis": "/shared/describing-velocity/axes/identify-the-motion-velocity",
          "data": [
            ["identify-the-motion-data", { "line-type": "connected" }]
          ],
          "annotations": ["identify-the-motion-labels"]
        }
      },
      "beforeText": "<p>Choose the segment in the velocity-time graph that describes where the object was stopped.</p>",
      "responseTemplate": "/shared/describing-velocity/response-template/identify-the-motion-responses",
      "submitButtonTitle": "Check My Answer",
      "responseBranches": [
        {
          "criterion": ["=", ["responseField", 1], 1],
          "step": "/shared/describing-velocity/page/12/step/12"
        }
      ],
      "defaultBranch": "/shared/describing-velocity/page/12/step/8"
    },
    
    {
      "url": "/shared/describing-velocity/page/12/step/8",
      "activityPage": "/shared/describing-velocity/page/12",
      "paneConfig": "single",
      "panes": {
        "single": {
          "type": "graph",
          "title": "Velocity vs. Time",
          "xAxis": "/shared/describing-velocity/axes/identify-the-motion-time",
          "yAxis": "/shared/describing-velocity/axes/identify-the-motion-velocity",
          "data": [
            ["identify-the-motion-data", { "line-type": "connected" }]
          ],
          "annotations": ["identify-the-motion-labels"]
        }
      },
      "beforeText": "<p><b>Incorrect.</b> Hint 1: While an object is stopped, does its velocity stay the same or change? Try again:</p><p>Choose the segment in the velocity-time graph that describes where the object was stopped.</p>",
      "responseTemplate": "/shared/describing-velocity/response-template/identify-the-motion-responses",
      "submitButtonTitle": "Check My Answer",
      "responseBranches": [
        {
          "criterion": ["=", ["responseField", 1], 1],
          "step": "/shared/describing-velocity/page/12/step/12"
        }
      ],
      "defaultBranch": "/shared/describing-velocity/page/12/step/9"
    },
    
    {
      "url": "/shared/describing-velocity/page/12/step/9",
      "activityPage": "/shared/describing-velocity/page/12",
      "paneConfig": "single",
      "panes": {
        "single": {
          "type": "graph",
          "title": "Velocity vs. Time",
          "xAxis": "/shared/describing-velocity/axes/identify-the-motion-time",
          "yAxis": "/shared/describing-velocity/axes/identify-the-motion-velocity",
          "data": [
            ["identify-the-motion-data", { "line-type": "connected" }]
          ],
          "annotations": ["identify-the-motion-labels"]
        }
      },
      "beforeText": "<p><b>Incorrect.</b> Hint 2: What is an object's velocity when it is not moving? Try again:</p><p>Choose the segment in the velocity-time graph that describes where the object was stopped.</p>",
      "responseTemplate": "/shared/describing-velocity/response-template/identify-the-motion-responses",
      "submitButtonTitle": "Check My Answer",
      "responseBranches": [
        {
          "criterion": ["=", ["responseField", 1], 1],
          "step": "/shared/describing-velocity/page/12/step/12"
        }
      ],
      "defaultBranch": "/shared/describing-velocity/page/12/step/10"
    },
    
    {
      "url": "/shared/describing-velocity/page/12/step/10",
      "activityPage": "/shared/describing-velocity/page/12",
      "paneConfig": "single",
      "panes": {
        "single": {
          "type": "graph",
          "title": "Velocity vs. Time",
          "xAxis": "/shared/describing-velocity/axes/identify-the-motion-time",
          "yAxis": "/shared/describing-velocity/axes/identify-the-motion-velocity",
          "data": [
            ["identify-the-motion-data", { "line-type": "connected" }]
          ],
          "annotations": ["identify-the-motion-labels"]
        }
      },
      "beforeText": "<p><b>Incorrect.</b> Hint 3: Which segment shows a velocity of 0? Try again:</p><p>Choose the segment in the velocity-time graph that describes where the object was stopped.</p>",
      "responseTemplate": "/shared/describing-velocity/response-template/identify-the-motion-responses",
      "submitButtonTitle": "Check My Answer",
      "responseBranches": [
        {
          "criterion": ["=", ["responseField", 1], 1],
          "step": "/shared/describing-velocity/page/12/step/12"
        }
      ],
      "defaultBranch": "/shared/describing-velocity/page/12/step/11"      
    },
    
    {
      "url": "/shared/describing-velocity/page/12/step/11",
      "activityPage": "/shared/describing-velocity/page/12",
      "paneConfig": "single",
      "panes": {
        "single": {
          "type": "graph",
          "title": "Velocity vs. Time",
          "xAxis": "/shared/describing-velocity/axes/identify-the-motion-time",
          "yAxis": "/shared/describing-velocity/axes/identify-the-motion-velocity",
          "data": [
            ["identify-the-motion-data", { "line-type": "connected" }]
          ],
          "annotations": ["identify-the-motion-labels"]
        }
      },
      "beforeText": "<p><b>Incorrect.</b> From 0 to 5 seconds, the velocity was 0, which means that the object was not moving. This corresponds to Segment A.</p>",
      "submitButtonTitle": "OK",
      "defaultBranch": "/shared/describing-velocity/page/12/step/13"
    },

    {
      "url": "/shared/describing-velocity/page/12/step/12",
      "activityPage": "/shared/describing-velocity/page/12",
      "paneConfig": "single",
      "panes": {
        "single": {
          "type": "graph",
          "title": "Velocity vs. Time",
          "xAxis": "/shared/describing-velocity/axes/identify-the-motion-time",
          "yAxis": "/shared/describing-velocity/axes/identify-the-motion-velocity",
          "data": [
            ["identify-the-motion-data", { "line-type": "connected" }]
          ],
          "annotations": ["identify-the-motion-labels"]
        }
      },
      "beforeText": "<p><b>Correct!</b> From 0 to 5 seconds, the velocity was 0, which means that the object was not moving. This corresponds to Segment A.</p>",
      "submitButtonTitle": "OK",
      "defaultBranch": "/shared/describing-velocity/page/12/step/13"
    },
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    {
      "url": "/shared/describing-velocity/page/12/step/13",
      "activityPage": "/shared/describing-velocity/page/12",
      "paneConfig": "single",
      "panes": {
        "single": {
          "type": "graph",
          "title": "Velocity vs. Time",
          "xAxis": "/shared/describing-velocity/axes/identify-the-motion-time",
          "yAxis": "/shared/describing-velocity/axes/identify-the-motion-velocity",
          "data": [
            ["identify-the-motion-data", { "line-type": "connected" }]
          ],
          "annotations": ["identify-the-motion-labels"]
        }
      },
      "beforeText": "<p>Choose the segment in the velocity-time graph that describes where the object was moving backward with a constant velocity.</p>",
      "responseTemplate": "/shared/describing-velocity/response-template/identify-the-motion-responses",
      "submitButtonTitle": "Check My Answer",
      "responseBranches": [
        {
          "criterion": ["=", ["responseField", 1], 5],
          "step": "/shared/describing-velocity/page/12/step/18"
        }
      ],
      "defaultBranch": "/shared/describing-velocity/page/12/step/14"
    },
    
    {
      "url": "/shared/describing-velocity/page/12/step/14",
      "activityPage": "/shared/describing-velocity/page/12",
      "paneConfig": "single",
      "panes": {
        "single": {
          "type": "graph",
          "title": "Velocity vs. Time",
          "xAxis": "/shared/describing-velocity/axes/identify-the-motion-time",
          "yAxis": "/shared/describing-velocity/axes/identify-the-motion-velocity",
          "data": [
            ["identify-the-motion-data", { "line-type": "connected" }]
          ],
          "annotations": ["identify-the-motion-labels"]
        }
      },
      "beforeText": "<p><b>Incorrect.</b> Hint 1: While an object is moving backward with constant velocity, does its velocity stay the same or change? Try again:</p><p>Choose the segment in the velocity-time graph that describes where the object was moving backward with a constant velocity.</p>",
      "responseTemplate": "/shared/describing-velocity/response-template/identify-the-motion-responses",
      "submitButtonTitle": "Check My Answer",
      "responseBranches": [
        {
          "criterion": ["=", ["responseField", 1], 5],
          "step": "/shared/describing-velocity/page/12/step/18"
        }
      ],
      "defaultBranch": "/shared/describing-velocity/page/12/step/15"
    },
    
    {
      "url": "/shared/describing-velocity/page/12/step/15",
      "activityPage": "/shared/describing-velocity/page/12",
      "paneConfig": "single",
      "panes": {
        "single": {
          "type": "graph",
          "title": "Velocity vs. Time",
          "xAxis": "/shared/describing-velocity/axes/identify-the-motion-time",
          "yAxis": "/shared/describing-velocity/axes/identify-the-motion-velocity",
          "data": [
            ["identify-the-motion-data", { "line-type": "connected" }]
          ],
          "annotations": ["identify-the-motion-labels"]
        }
      },
      "beforeText": "<p><b>Incorrect.</b> Hint 2: When an object is moving backward, is its velocity positive, negative, or 0? Try again:</p><p>Choose the segment in the velocity-time graph that describes where the object was moving backward with a constant velocity.</p>",
      "responseTemplate": "/shared/describing-velocity/response-template/identify-the-motion-responses",
      "submitButtonTitle": "Check My Answer",
      "responseBranches": [
        {
          "criterion": ["=", ["responseField", 1], 5],
          "step": "/shared/describing-velocity/page/12/step/18"
        }
      ],
      "defaultBranch": "/shared/describing-velocity/page/12/step/16"
    },
    
    {
      "url": "/shared/describing-velocity/page/12/step/16",
      "activityPage": "/shared/describing-velocity/page/12",
      "paneConfig": "single",
      "panes": {
        "single": {
          "type": "graph",
          "title": "Velocity vs. Time",
          "xAxis": "/shared/describing-velocity/axes/identify-the-motion-time",
          "yAxis": "/shared/describing-velocity/axes/identify-the-motion-velocity",
          "data": [
            ["identify-the-motion-data", { "line-type": "connected" }]
          ],
          "annotations": ["identify-the-motion-labels"]
        }
      },
      "beforeText": "<p><b>Incorrect.</b> Hint 3: Which segment shows a negative, constant velocity? Try again:</p><p>Choose the segment in the velocity-time graph that describes where the object was moving backward with a constant velocity.</p>",
      "responseTemplate": "/shared/describing-velocity/response-template/identify-the-motion-responses",
      "submitButtonTitle": "Check My Answer",
      "responseBranches": [
        {
          "criterion": ["=", ["responseField", 1], 5],
          "step": "/shared/describing-velocity/page/12/step/18"
        }
      ],
      "defaultBranch": "/shared/describing-velocity/page/12/step/17"      
    },
    
    {
      "url": "/shared/describing-velocity/page/12/step/17",
      "activityPage": "/shared/describing-velocity/page/12",
      "paneConfig": "single",
      "panes": {
        "single": {
          "type": "graph",
          "title": "Velocity vs. Time",
          "xAxis": "/shared/describing-velocity/axes/identify-the-motion-time",
          "yAxis": "/shared/describing-velocity/axes/identify-the-motion-velocity",
          "data": [
            ["identify-the-motion-data", { "line-type": "connected" }]
          ],
          "annotations": ["identify-the-motion-labels"]
        }
      },
      "beforeText": "<p><b>Incorrect.</b> From 11 to 20 seconds, the velocity was -5 m/s, which means that the object was moving at a steady rate backward. This corresponds to Segment E.</p>",
      "hideSubmitButton": true,
      "nextButtonShouldSubmit": true,
      "isFinalStep": true
    },

    {
      "url": "/shared/describing-velocity/page/12/step/18",
      "activityPage": "/shared/describing-velocity/page/12",
      "paneConfig": "single",
      "panes": {
        "single": {
          "type": "graph",
          "title": "Velocity vs. Time",
          "xAxis": "/shared/describing-velocity/axes/identify-the-motion-time",
          "yAxis": "/shared/describing-velocity/axes/identify-the-motion-velocity",
          "data": [
            ["identify-the-motion-data", { "line-type": "connected" }]
          ],
          "annotations": ["identify-the-motion-labels"]
        }
      },
      "beforeText": "<p><b>Correct!</b> From 11 to 20 seconds, the velocity was -5 m/s, which means that the object was moving at a steady rate backward. This corresponds to Segment E.</p>",
      "hideSubmitButton": true,
      "nextButtonShouldSubmit": true,      
      "isFinalStep": true
    },
    
    {
      "url": "/shared/describing-velocity/page/13/step/1",
      "activityPage": "/shared/describing-velocity/page/13",
      "paneConfig": "single",          
      "panes": {
        "single": {
          "type": "image",
          "path": sc_static("images/NASCAR_practice.jpg"),
          "caption": "Public domain U.S. Air Force photo by Larry McTighe"
        }
      },
      "beforeText": "<p>Which of these representations can you use to describe the velocity of an object? Choose the best answer.</p>",
      "responseTemplate": "/shared/describing-velocity/response-template/concluding-question-responses",
      "submitButtonTitle": "OK",
      "defaultBranch": "/shared/describing-velocity/page/13/step/2"
    },
    
    {
      "url": "/shared/describing-velocity/page/13/step/2",
      "activityPage": "/shared/describing-velocity/page/13",
      "paneConfig": "single",          
      "panes": {
        "single": {
          "type": "image",
          "path": sc_static("images/NASCAR_practice.jpg"),
          "caption": "Public domain U.S. Air Force photo by Larry McTighe"
        }
      },
      "beforeText": "<p><b>Congratulations.</b> You have finished the activity!</p>",
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
      "min": 0,
      "max": 40,
      "nSteps": 8,
      "label": "Position"
    },
    {
      "url": "/shared/describing-velocity/axes/car-mps",
      "units": "/builtins/units/meters-per-second",
      "min": -12,
      "max": 12,
      "nSteps": 12,
      "label": "Velocity"
    },
    {
      "url": "/shared/describing-velocity/axes/identify-the-motion-time",
      "units": "/builtins/units/seconds",
      "min": 0,
      "max": 20,
      "nSteps": 20,
      "label": "Time"
    },
    {
      "url": "/shared/describing-velocity/axes/identify-the-motion-velocity",
      "units": "/builtins/units/meters-per-second",
      "min": -5,
      "max": 5,
      "nSteps": 10,
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
    },
    {
      "url": "/shared/describing-velocity/response-template/velocity-time-question-2",
      "templateString": "",
      "fieldTypes": [
        "multiplechoice"
      ],
      "fieldChoicesList": [
        [
          "When the car moves toward the start line, its velocity is positive",
          "When the car moves toward the start line, its velocity is negative",
          "When the car moves toward the start line, its velocity is 0",
          "When the car moves toward the start line, the velocity is positive then becomes negative",
          "When the car moves toward the start line, the velocity is negative then becomes positive"
        ]
      ],
      "initialValues": [
        ""
      ]
    },
    {
      "url": "/shared/describing-velocity/response-template/identify-the-motion-responses",
      "templateString": "",
      "fieldTypes": [
        "multiplechoice"
      ],
      "fieldChoicesList": [
        [
          "Segment A",
          "Segment B",
          "Segment C",
          "Segment D",
          "Segment E"
        ]
      ],
      "initialValues": [
        ""
      ]
    },
    {
      "url": "/shared/describing-velocity/response-template/concluding-question-responses",
      "templateString": "",
      "fieldTypes": [
        "multiplechoice"
      ],
      "fieldChoicesList": [
        [
          "A position-time table",
          "A position-time graph",
          "A velocity-time graph",
          "Words such as constant, fast slow, stopped, forward, backward, or changing",
          "All of the above"
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
          "points": [[0,0],[0.25,0],[0.5,0],[0.75,0],[1,0],[1.25,0],[1.5,0],[1.75,0],[2,0],[2.25,0],[2.5,0],[2.75,0],[3,0],[3.25,0.5],[3.5,1],[3.75,1.5],[4,2],[4.25,2.5],[4.5,3],[4.75,3.5],[5,4],[5.25,4.5],[5.5,5],[5.75,5.5],[6,6],[6.25,8.5],[6.5,11],[6.75,13.5],[7,16],[7.25,18.5],[7.5,21],[7.75,23.5],[8,26],[8.25,28.5],[8.5,31],[8.75,33.5],[9,36]]
        },
        {
          "url": "/shared/describing-velocity/datadefs/car-in-reverse-position",
          "name": "car-in-reverse-position",
          "activity": "/shared/describing-velocity",
          "xUnits": "/builtins/units/seconds",
          "xLabel": "Time",
          "xShortLabel": "Time",
          "yUnits": "/builtins/units/meters",
          "yLabel": "Position",
          "yShortLabel": "Position",
          "points": [[0,36],[0.1,35.6],[1,32],[2,28],[3,24],[4,20],[5,16],[6,12],[7,8],[8,4],[9,0]]
        },
        {
          "url": "/shared/describing-velocity/datadefs/identify-the-motion-data",
          "name": "identify-the-motion-data",
          "activity": "/shared/describing-velocity",
          "xUnits": "/builtins/units/seconds",
          "xLabel": "Time",
          "xShortLabel": "Time",
          "yUnits": "/builtins/units/meters-per-second",
          "yLabel": "Velocity",
          "yShortLabel": "Velocity",
          "points": [[0,0],[5,0],[5,3],[11,3],[11,-3],[20,-3]]
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
        },
        {
          "url": "/shared/describing-velocity/datadefs/car-in-reverse-velocity",
          "name": "car-in-reverse-velocity",
          "activity": "/shared/describing-velocity",
          "xUnits": "/builtins/units/seconds",
          "xLabel": "Time",
          "xShortLabel": "Time",
          "yUnits": "/builtins/units/meters-per-second",
          "yLabel": "Velocity",
          "yShortLabel": "Velocity",
          "source": "/shared/describing-velocity/datadefs/car-in-reverse-position"
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
          "text": "Stopped for 3 secs.\nVelocity = 0",
          "x": 1.5,
          "y": 0,
          "xOffset": -73,
          "yOffset": -26
        },
        {
          "url": "/shared/describing-velocity/annotation/velocity-label-2",
          "name": "velocity-label-2",
          "activity": "/shared/calculated-velocity",
          "text": "Slow, steady for 3 secs.\nVelocity = 2 m/s",
          "x": 4.5,
          "y": 2,
          "xOffset": -86,
          "yOffset": 86
        },
        {
          "url": "/shared/describing-velocity/annotation/velocity-label-3",
          "name": "velocity-label-3",
          "activity": "/shared/calculated-velocity",
          "text": "Fast, steady for 3 secs.\nVelocity = 10 m/s",
          "x": 7.5,
          "y": 10,
          "xOffset": -86,
          "yOffset": 115
        },
        {
          "url": "/shared/describing-velocity/annotation/segment-a-label",
          "name": "segment-a-label",
          "activity": "/shared/calculated-velocity",
          "text": "Segment A",
          "x": 2.5,
          "y": 0,
          "xOffset": -50,
          "yOffset": 114
        },
        {
          "url": "/shared/describing-velocity/annotation/segment-b-label",
          "name": "segment-b-label",
          "activity": "/shared/calculated-velocity",
          "text": "Segment B",
          "x": 5,
          "y": 1.5,
          "xOffset": -110,
          "yOffset": -62
        },
        {
          "url": "/shared/describing-velocity/annotation/segment-c-label",
          "name": "segment-c-label",
          "activity": "/shared/calculated-velocity",
          "text": "Segment C",
          "x": 8,
          "y": 3,
          "xOffset": -53,
          "yOffset": -20        
        },
        {
          "url": "/shared/describing-velocity/annotation/segment-d-label",
          "name": "segment-d-label",
          "activity": "/shared/calculated-velocity",
          "text": "Segment D",
          "x": 11,
          "y": 0,
          "xOffset": 23,
          "yOffset": -71         
        },
        {
          "url": "/shared/describing-velocity/annotation/segment-e-label",
          "name": "segment-e-label",
          "activity": "/shared/calculated-velocity",
          "text": "Segment E",
          "x": 15.5,
          "y": -3,
          "xOffset": -51,
          "yOffset": -61      
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
        },
        {
          "url": "/shared/describing-velocity/annotation/identify-the-motion-labels",
          "name": "identify-the-motion-labels",
          "activity": "/shared/describing-velocity",
          "labels": ["/shared/describing-velocity/annotation/segment-a-label", "/shared/describing-velocity/annotation/segment-b-label", "/shared/describing-velocity/annotation/segment-c-label", "/shared/describing-velocity/annotation/segment-d-label", "/shared/describing-velocity/annotation/segment-e-label"]
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
          "datadefName": "position-data",
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
          "datadefName": "position-data",
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
          "url": "/shared/describing-velocity/annotation/p2A-highlight",
          "name": "p2A-highlight",
          "activity": "/shared/describing-velocity",
          "datadefName": "position-data",
          "tag": "/shared/describing-velocity/tag/second-point-A",
          "color": "#ff7f0e"
        }
      ]
    }
  ]
};
