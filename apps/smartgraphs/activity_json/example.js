/*globals Smartgraphs */

Smartgraphs.activityDocs = Smartgraphs.activityDocs || {};
Smartgraphs.activityDocs["/shared/example"] = 
{
  "_id": "example.df5",
  "_rev": "1",
  "data_format_version": 5,
  "activity": {
    "title": "Example Activity",
    "url": "/shared/example",
    "owner": "shared",
    "pages": [   
      "/shared/example/page/1",
      "/shared/example/page/2",
      "/shared/example/page/3"
    ],
    "datasets": [
      "/shared/example/dataset/slope-data"
    ],
    "units": [

    ],
    "axes": [
      "/shared/example/axes/10s",
      "/shared/example/axes/16m"
    ],
    "graphs": [
    
    ],
    "responseTemplates": [
      "/components/response-template/open",
      "/shared/example/response-template/example-q"
    ]
  },
  "pages": [
    {
      "name": "Multiple Choice",
      "url": "/shared/example/page/1",
      "activity": "/shared/example",
      "index": 1,
      "introText": "<h1>Mutliple Choice Question</h1>",                        
      "steps": [
        "/shared/example/page/1/step/1",
        "/shared/example/page/1/step/2",
        "/shared/example/page/1/step/3"
      ],
      "firstStep": "/shared/example/page/1/step/1"
    },
    {
      "name": "Open Response",
      "url": "/shared/example/page/2",
      "activity": "/shared/example",
      "index": 2,
      "introText": "<h1>Analysis</h1><p>Please explain your answer.</p>",                    
      "steps": [
        "/shared/example/page/2/step/1"
      ],
      "firstStep": "/shared/example/page/2/step/1"
    },
    {
      "name": "Wrap-up",
      "url": "/shared/example/page/3",
      "activity": "/shared/example",
      "index": 3,
      "introText": "<h1>That's it.</h1><p>You're done.</p>",                    
      "steps": [
        "/shared/example/page/3/step/1"
      ],
      "firstStep": "/shared/example/page/3/step/1"
    }
  ],
  "steps": [
    {
      "url": "/shared/example/page/1/step/1",
      "activityPage": "/shared/example/page/1",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/example/axes/10s",
          "yAxis": "/shared/example/axes/16m",
          "datasets": ["slope-data"],
          "annotations": ["p1-highlight"]
        },
        "bottom": {
          "type": "table",
          "dataset": "slope-data",
          "annotations": ["p1-highlight"]
        }
      },
      "beforeText": "<p>What's different about the highlighted point?</p>",
      "submissibilityCriterion": ["isNumeric", ["responseField", 1]],
      "responseTemplate": "/shared/example/response-template/example-q",
      "responseBranches": [
        { "criterion": ["=", ["responseField", 1], 2],
          "step": "/shared/example/page/1/step/3"
        }
      ],
      "defaultBranch": "/shared/example/page/1/step/2",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/example/page/1/step/2",
      "activityPage": "/shared/example/page/1",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/example/axes/10s",
          "yAxis": "/shared/example/axes/16m",
          "datasets": ["slope-data"],
          "annotations": ["p1-highlight"]
        },
        "bottom": {
          "type": "table",
          "dataset": "slope-data",
          "annotations": ["p1-highlight"]
        }
      },
      "beforeText": "<p>I'm so sorry, but that's just plain wrong.</p>",
      "hideSubmitButton": true,
      "nextButtonShouldSubmit": true,
      "isFinalStep": true
    },
    {
      "url": "/shared/example/page/1/step/3",
      "activityPage": "/shared/example/page/1",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/example/axes/10s",
          "yAxis": "/shared/example/axes/16m",
          "datasets": ["slope-data"],
          "annotations": ["p1-highlight"]
        },
        "bottom": {
          "type": "table",
          "dataset": "slope-data",
          "annotations": ["p1-highlight"]
        }
      },
      "beforeText": "<p>That's right. Good job there.</p>",
      "hideSubmitButton": true,
      "nextButtonShouldSubmit": true,      
      "isFinalStep": true
    },
    
    
    
    
    
    
    
    
    
    
    
    
    
    /************ Page 2 ************/













    {
      "url": "/shared/example/page/2/step/1",
      "activityPage": "/shared/example/page/2",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/example/axes/10s",
          "yAxis": "/shared/example/axes/16m",
          "datasets": ["slope-data"],
          "annotations": ["p1-highlight"]
        },
        "bottom": {
          "type": "table",
          "dataset": "slope-data",
          "annotations": ["p1-highlight"]
        }
      },
      "beforeText": "<p>Try to explain why you made your choice. Bonus points for creative combinations of the words &quot;hermeneutic&quot;, &quot;heteroskedacity&quot;, and &quot;sesquipedalian&quot;. Failure is also an option.</p>",
      "responseTemplate": "/components/response-template/open",
      "defaultBranch": "/shared/example/page/2/step/2",
      "isFinalStep": true,
      "nextButtonShouldSubmit": true
    },
    
    
    
    
    
    
    
    
    
    
    
    
    
    /************ Page 3 ************/












    
    {
      "url": "/shared/example/page/3/step/1",
      "activityPage": "/shared/example/page/3",
      "paneConfig": "single",
      "panes": {
        "single": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/example/axes/10s",
          "yAxis": "/shared/example/axes/16m",
          "datasets": [],
          "annotations": []
        }
      },
      "beforeText": "<p>Good work.</p>",
      "hideSubmitButton": true,
      "defaultBranch": "/shared/example/page/3/step/1",
      "isFinalStep": false
    }
  ],
  "units": [

  ],
  "axes": [  
    {
      "url": "/shared/example/axes/10s",
      "units": "/builtins/units/seconds",
      "min": 0,
      "max": 10,
      "nSteps": 10,
      "label": "Time"
    },
    {
      "url": "/shared/example/axes/16m",
      "units": "/builtins/units/meters",
      "min": 0,
      "max": 16,
      "nSteps": 8,
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
      "url": "/shared/example/response-template/example-q",
      "templateString": "",
      "fieldTypes": [
        "multiplechoice"
      ],
      "fieldChoicesList": [
        [
          "It represents a transformative hermeneutic of transgressive anti-hegemonic dialectics belonging to the 1990s",
          "It's not as high.",
          "It's sagging because it's depressed about not being as well-endowed in the area of y-ness as its immediate neighbors.",
          "It is too higher! You just have to look at it right."
        ]
      ],
      "initialValues": [
        ""
      ]
    }
  ],
  "datasets": [
    {
      "url": "/shared/example/dataset/slope-data",
      "name": "slope-data",
      "activity": "/shared/example",
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
      "dataset": "/shared/example/dataset/slope-data"
    },
    {
      "x": 1,
      "y": 2,
      "guid": 2,
      "dataset": "/shared/example/dataset/slope-data"
    },
    {
      "x": 2,
      "y": 4,
      "guid": 3,
      "dataset": "/shared/example/dataset/slope-data"
    },
    {
      "x": 3,
      "y": 5,
      "guid": 4,
      "dataset": "/shared/example/dataset/slope-data"
    },
    {
      "x": 4,
      "y": 6,
      "guid": 5,
      "dataset": "/shared/example/dataset/slope-data"
    },
    {
      "x": 5,
      "y": 4,
      "guid": 6,
      "dataset": "/shared/example/dataset/slope-data"
    },
    {
      "x": 6,
      "y": 8,
      "guid": 7,
      "dataset": "/shared/example/dataset/slope-data"
    },
    {
      "x": 7,
      "y": 10,
      "guid": 8,
      "dataset": "/shared/example/dataset/slope-data"
    },
    {
      "x": 8,
      "y": 11,
      "guid": 9,
      "dataset": "/shared/example/dataset/slope-data"
    },
    {
      "x": 9,
      "y": 12,
      "guid": 10,
      "dataset": "/shared/example/dataset/slope-data"
    },
    {
      "x": 10,
      "y": 15,
      "guid": 11,
      "dataset": "/shared/example/dataset/slope-data"
    }
  ],
  "tags": [
  
  ],
  "annotations": [
    {
      "type": "HighlightedPoint",
      "records": [
        {
          "url": "/shared/example/annotation/p1-highlight",
          "name": "p1-highlight",
          "activity": "/shared/example",
          "pointRecord": 6,
          "displayStyle": "highlight-point-and-dim-background",
          "datasetColor": "#cccccc",
          "pointColor": "#ff7f0e"
        }
      ]
    }
  ]
};
