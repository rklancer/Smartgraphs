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
      "/shared/describing-velocity/page/4"
    ],
    "axes": [
      "/shared/describing-velocity/axes/9s",
      "/shared/describing-velocity/axes/40m"
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
      "name": "Analyze the Position-Time Graph",
      "url": "/shared/describing-velocity/page/4",
      "activity": "/shared/describing-velocity",
      "index": 2,
      "introText": "<h1>Analyze the Position-Time Graph</h1>",
      "steps": [
        "/shared/describing-velocity/page/4/step/1",
        "/shared/describing-velocity/page/4/step/2",
        "/shared/describing-velocity/page/4/step/3"
      ],
      "firstStep": "/shared/describing-velocity/page/4/step/1"
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
      "beforeText": " <p><strong>How can you describe velocity?</strong></p>  <p>Let’s start by examining the motion of a car traveling from one point to another.</p>  <p><strong>Click</strong> the Play button to the right to watch the car’s journey. <p>In the area below, <strong>describe</strong> the motion of the car. Try to use as many key words from the word bank as possible.</p> ",
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
      "beforeText": "<p>Here is your earlier description of the car's journey:</p><p>&quot;%@&quot;</p><p><b>Play</b> the animation again and <b>observe</b> the resulting position-time graph for the car's motion.</p><p>Using key words from your descriptions, <b>label</b> the motions that occurred during each segment of the position-time graph.</p><p>To add a label, <b>click</b> where you want to add a label, then <b>double click</b> inside the label and start typing.</p>",
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
          "annotations": []
        },
        "bottom": {
          "type": "table",
          "data": "position-data",
          "annotations": []
        }

      },
      "tools": [],
      "beforeText": "<p>Use the position-time data to <strong>answer</strong> the following questions.</p>  <p>What was the car’s velocity from 0-3 seconds?</p>",
      "responseTemplate": "/shared/describing-velocity/response-template/open",
      "afterText": "<p><strong>Hint:</strong> Recall that velocity is the slope of a position-time graph<p>",
      "submissibilityCriterion": ["textLengthIsAtLeast", 1, ["responseField", 1]],
      "hideSubmitButton": true,
      "nextButtonShouldSubmit": true,
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
      "url": "/shared/describing-velocity/axes/2mps",
      "units": "/builtins/units/meters-per-second",
      "min": 0,
      "max": 2,
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
    }
  ],
  "tags": [  
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
          "points": [[0.00,0.00],[0.00,0.00],[0.10,0.00],[0.20,0.00],[0.30,0.00],[0.40,0.00],[0.50,0.00],[0.60,0.00],[0.70,0.00],[0.80,0.00],[0.90,0.00],[1.00,0.00],[1.10,0.00],[1.20,0.00],[1.30,0.00],[1.40,0.00],[1.50,0.00],[1.60,0.00],[1.70,0.00],[1.80,0.00],[1.90,0.00],[2.00,0.00],[2.10,0.00],[2.20,0.00],[2.30,0.00],[2.40,0.00],[2.50,0.00],[2.60,0.01],[2.70,0.02],[2.80,0.05],[2.90,0.10],[3.00,0.20],[3.10,0.35],[3.20,0.52],[3.30,0.71],[3.40,0.90],[3.50,1.10],[3.60,1.30],[3.70,1.50],[3.80,1.70],[3.90,1.90],[4.00,2.10],[4.10,2.30],[4.20,2.50],[4.30,2.70],[4.40,2.90],[4.50,3.10],[4.60,3.30],[4.70,3.50],[4.80,3.70],[4.90,3.90],[5.00,4.10],[5.10,4.30],[5.20,4.50],[5.30,4.70],[5.40,4.91],[5.50,5.11],[5.60,5.33],[5.70,5.58],[5.80,5.89],[5.90,6.32],[6.00,6.92],[6.10,7.69],[6.20,8.58],[6.30,9.53],[6.40,10.51],[6.50,11.51],[6.60,12.50],[6.70,13.50],[6.80,14.50],[6.90,15.50],[7.00,16.50],[7.10,17.50],[7.20,18.50],[7.30,19.50],[7.40,20.50],[7.50,21.50],[7.60,22.50],[7.70,23.50],[7.80,24.50],[7.90,25.50],[8.00,26.50],[8.10,27.50],[8.20,28.50],[8.30,29.50],[8.40,30.50],[8.50,31.50],[8.60,32.50],[8.70,33.50],[8.80,34.50],[8.90,35.50]]
        }
      ]
    },
    {
      "type": "FirstOrderDifference",
      "records": [
        {    
          "url": "/shared/describing-velocity/datadefs/velocity-calculated",
          "name": "velocity-calculated",
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
      "type": "LabelSet",
      "records": [
        {
          "url": "/shared/describing-velocity/annotation/students-segment-labels",
          "name": "students-segment-labels",
          "activity": "/shared/describing-velocity"
        }
      ]
    }
  ]
};
