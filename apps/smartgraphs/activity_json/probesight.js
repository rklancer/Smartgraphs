/*globals Smartgraphs */

Smartgraphs.activityDocs = Smartgraphs.activityDocs || {};
Smartgraphs.activityDocs["/shared/probesight"] = 
{
  "_id": "example.df5",
  "_rev": "1",
  "data_format_version": 5,
  "activity": {
    "title": "Example Activity",
    "url": "/shared/probesight",
    "owner": "shared",
    "pages": [   
      "/shared/probesight/page/1",
      "/shared/probesight/page/2",
      "/shared/probesight/page/3"
    ],
    "datasets": [
      "/shared/probesight/dataset/slope-data"
    ],
    "units": [

    ],
    "axes": [
      "/shared/probesight/axes/10s",
      "/shared/probesight/axes/16m"
    ],
    "graphs": [
    
    ],
    "responseTemplates": [
      "/components/response-template/open",
      "/shared/probesight/response-template/probesight-q"
    ]
  },
  "pages": [
    {
      "name": "Multiple Choice",
      "url": "/shared/probesight/page/1",
      "activity": "/shared/probesight",
      "index": 1,
      "introText": "<h1>Mutliple Choice Question</h1>",                        
      "steps": [
        "/shared/probesight/page/1/step/1",
        "/shared/probesight/page/1/step/2",
        "/shared/probesight/page/1/step/3"
      ],
      "firstStep": "/shared/probesight/page/1/step/1"
    },
    {
      "name": "Open Response",
      "url": "/shared/probesight/page/2",
      "activity": "/shared/probesight",
      "index": 2,
      "introText": "<h1>Analysis</h1><p>Please explain your answer.</p>",                    
      "steps": [
        "/shared/probesight/page/2/step/1"
      ],
      "firstStep": "/shared/probesight/page/2/step/1"
    },
    {
      "name": "Wrap-up",
      "url": "/shared/probesight/page/3",
      "activity": "/shared/probesight",
      "index": 3,
      "introText": "<h1>That's it.</h1><p>You're done.</p>",                    
      "steps": [
        "/shared/probesight/page/3/step/1"
      ],
      "firstStep": "/shared/probesight/page/3/step/1"
    }
  ],
  "steps": [
    {
      "url": "/shared/probesight/page/1/step/1",
      "activityPage": "/shared/probesight/page/1",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/probesight/axes/10s",
          "yAxis": "/shared/probesight/axes/16m",
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
      "responseTemplate": "/shared/probesight/response-template/probesight-q",
      "responseBranches": [
        { "criterion": ["=", ["responseField", 1], 2],
          "step": "/shared/probesight/page/1/step/3"
        }
      ],
      "defaultBranch": "/shared/probesight/page/1/step/2",
      "submitButtonTitle": "OK"
    },
    {
      "url": "/shared/probesight/page/1/step/2",
      "activityPage": "/shared/probesight/page/1",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/probesight/axes/10s",
          "yAxis": "/shared/probesight/axes/16m",
          "datasets": ["slope-data"],
          "annotations": ["p1-highlight"]
        },
        "bottom": {
          "type": "table",
          "dataset": "slope-data",
          "annotations": ["p1-highlight"]
        }
      },
      "beforeText": "<p>Tragically, that's just plain wrong.</p>",
      "hideSubmitButton": true,
      "nextButtonShouldSubmit": true,
      "isFinalStep": true
    },
    {
      "url": "/shared/probesight/page/1/step/3",
      "activityPage": "/shared/probesight/page/1",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/probesight/axes/10s",
          "yAxis": "/shared/probesight/axes/16m",
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
      "url": "/shared/probesight/page/2/step/1",
      "activityPage": "/shared/probesight/page/2",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/probesight/axes/10s",
          "yAxis": "/shared/probesight/axes/16m",
          "datasets": ["slope-data"],
          "annotations": ["p1-highlight"]
        },
        "bottom": {
          "type": "table",
          "dataset": "slope-data",
          "annotations": ["p1-highlight"]
        }
      },
      "beforeText": "<p>Try to explain why you made your choice. Write at least five characters. Bonus points for creative combinations of the words &quot;hermeneutic&quot;, &quot;heteroskedacity&quot;, and &quot;sesquipedalian&quot;.</p> <p>Failure is also an option.</p>",
      "responseTemplate": "/components/response-template/open",
      "submissibilityCriterion": ["textLengthIsAtLeast", 5, ["responseField", 1]],
      "defaultBranch": "/shared/probesight/page/2/step/2",
      "isFinalStep": true,
      "nextButtonShouldSubmit": true
    },
    
    
    
    
    
    
    
    
    
    
    
    
    
    /************ Page 3 ************/












    
    {
      "url": "/shared/probesight/page/3/step/1",
      "activityPage": "/shared/probesight/page/3",
      "paneConfig": "single",
      "panes": {
        "single": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/probesight/axes/10s",
          "yAxis": "/shared/probesight/axes/16m",
          "datasets": [],
          "annotations": []
        }
      },
      "beforeText": "<p>Good work.</p>",
      "hideSubmitButton": true,
      "nextButtonShouldSubmit": false,
      "defaultBranch": "/shared/probesight/page/3/step/1",
      "isFinalStep": false
    }
  ],
  "units": [

  ],
  "axes": [  
    {
      "url": "/shared/probesight/axes/10s",
      "units": "/builtins/units/seconds",
      "min": 0,
      "max": 10,
      "nSteps": 10,
      "label": "Time"
    },
    {
      "url": "/shared/probesight/axes/16m",
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
      "url": "/shared/probesight/response-template/probesight-q",
      "templateString": "",
      "fieldTypes": [
        "multiplechoice"
      ],
      "fieldChoicesList": [
        [
          "It represents a transformative hermeneutic of transgressive anti-hegemonic dialectics belonging to the 1990s",
          "It's not as high.",
          "It's sagging because it's depressed about not being as well-endowed in the area of y-ness as its immediate neighbors.",
          "It is too as high! You just have to look at it right."
        ]
      ],
      "initialValues": [
        ""
      ]
    }
  ],
  "datasets": [
    {
      "url": "/shared/probesight/dataset/slope-data",
      "name": "slope-data",
      "activity": "/shared/probesight",
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
      "dataset": "/shared/probesight/dataset/slope-data"
    },
    {
      "x": 1,
      "y": 2,
      "guid": 2,
      "dataset": "/shared/probesight/dataset/slope-data"
    },
    {
      "x": 2,
      "y": 4,
      "guid": 3,
      "dataset": "/shared/probesight/dataset/slope-data"
    },
    {
      "x": 3,
      "y": 5,
      "guid": 4,
      "dataset": "/shared/probesight/dataset/slope-data"
    },
    {
      "x": 4,
      "y": 6,
      "guid": 5,
      "dataset": "/shared/probesight/dataset/slope-data"
    },
    {
      "x": 5,
      "y": 4,
      "guid": 6,
      "dataset": "/shared/probesight/dataset/slope-data"
    },
    {
      "x": 6,
      "y": 8,
      "guid": 7,
      "dataset": "/shared/probesight/dataset/slope-data"
    },
    {
      "x": 7,
      "y": 10,
      "guid": 8,
      "dataset": "/shared/probesight/dataset/slope-data"
    },
    {
      "x": 8,
      "y": 11,
      "guid": 9,
      "dataset": "/shared/probesight/dataset/slope-data"
    },
    {
      "x": 9,
      "y": 12,
      "guid": 10,
      "dataset": "/shared/probesight/dataset/slope-data"
    },
    {
      "x": 10,
      "y": 15,
      "guid": 11,
      "dataset": "/shared/probesight/dataset/slope-data"
    }
  ],
  "tags": [
  
  ],
  "annotations": [
    {
      "type": "HighlightedPoint",
      "records": [
        {
          "url": "/shared/probesight/annotation/p1-highlight",
          "name": "p1-highlight",
          "activity": "/shared/probesight",
          "pointRecord": 6,
          "displayStyle": "highlight-point-and-dim-background",
          "datasetColor": "#cccccc",
          "pointColor": "#ff7f0e"
        }
      ]
    }
  ]
};
