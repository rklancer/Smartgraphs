/*globals Smartgraphs */

Smartgraphs.activityDocs = Smartgraphs.activityDocs || {};
Smartgraphs.activityDocs["/shared/probesight"] = 
{
  "_id": "probesight",
  "_rev": "1",
  "data_format_version": 5,
  "activity": {
    "title": "Seeing Motion",
    "url": "/shared/probesight",
    "owner": "shared",
    "pages": [   
      "/shared/probesight/page/1",
      "/shared/probesight/page/2",
      "/shared/probesight/page/3"
    ],
    "datasets": [
    ],
    "units": [

    ],
    "axes": [
      "/shared/probesight/axes/30s",
      "/shared/probesight/axes/5m"
    ],
    "graphs": [
    
    ],
    "responseTemplates": [
    ]
  },
  "pages": [
    {
      "name": "Intro",
      "url": "/shared/probesight/page/1",
      "activity": "/shared/probesight",
      "index": 1,
      "introText": "<h1>Page 1</h1><p>Text goes here.</p>",                        
      "steps": [
        "/shared/probesight/page/1/step/1"
      ],
      "firstStep": "/shared/probesight/page/1/step/1"
    },
    {
      "name": "Sensor",
      "url": "/shared/probesight/page/2",
      "activity": "/shared/probesight",
      "index": 2,
      "introText": "<h1>Page 2</h1><p>Text goes here.</p>",                    
      "steps": [
        "/shared/probesight/page/2/step/1"
      ],
      "firstStep": "/shared/probesight/page/2/step/1"
    },
    {
      "name": "Credits",
      "url": "/shared/probesight/page/3",
      "activity": "/shared/probesight",
      "index": 3,
      "introText": "<h1>Page 3</h1><p>Text goes here.</p>",                    
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
      "paneConfig": "single",
      "panes": null,
      // {
      //   "single": {
      //     "type": "html"
      //   }
      // },
      "beforeText": null,
      "submissibilityCriterion": null,
      "responseTemplate": null,
      "responseBranches": [
      ],
      "defaultBranch": "/shared/probesight/page/1/step/2",
      "isFinalStep": true,
      "nextButtonShouldSubmit": true
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
          "xAxis": "/shared/probesight/axes/30s",
          "yAxis": "/shared/probesight/axes/5m",
          "datasets": ["sensor-data"],
          "annotations": []
        },
        "bottom": {
          "type": "table",
          "dataset": "sensor-data"
        }
      },
      "beforeText": null,
      "responseTemplate": null,
      "submissibilityCriterion": null,
      "defaultBranch": null,
      "isFinalStep": true,
      "nextButtonShouldSubmit": true
    },








    /************ Page 3 ************/








    {
      "url": "/shared/probesight/page/3/step/1",
      "activityPage": "/shared/probesight/page/3",
      "paneConfig": "single",
      "panes": null,
      // {
      //   "single": {
      //     "type": "html"
      //   }
      // },
      "beforeText": null,
      "defaultBranch": null,
      "isFinalStep": true,
      "hideSubmitButton": true,
      "nextButtonShouldSubmit": false
    }
  ],
  "units": [

  ],
  "axes": [  
    {
      "url": "/shared/probesight/axes/30s",
      "units": "/builtins/units/seconds",
      "min": 0,
      "max": 30,
      "nSteps": 6,
      "label": "Time"
    },
    {
      "url": "/shared/probesight/axes/5m",
      "units": "/builtins/units/meters",
      "min": 0,
      "max": 5,
      "nSteps": 10,
      "label": "Position"
    }
  ],
  "graphs": [
  
  ],
  "responseTemplates": [
  
  ],
  "datasets": [
    {
      "url": "/shared/probesight/dataset/sensor-data",
      "name": "sensor-data",
      "activity": "/shared/probesight",
      "xUnits": "/builtins/units/seconds",
      "xLabel": "Time",
      "xShortLabel": "Time",
      "yUnits": "/builtins/units/meters",
      "yLabel": "Position",
      "yShortLabel": "Position",
      "points": [
      ],
      "session": null,
      "defaultColor": null
    }
  ],
  "datapoints": [

  ],
  "tags": [
  
  ],
  "annotations": [

  ]
};
