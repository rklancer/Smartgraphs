/*globals Smartgraphs */

Smartgraphs.activityDocs = Smartgraphs.activityDocs || {};
Smartgraphs.activityDocs["/shared/gravity"] = 
{
  "_id": "gravity.df6",
  "_rev": "1",
  "data_format_version": 6,
  "activity": {
    "title": "Gravity",
    "url": "/shared/gravity",
    "owner": "shared",
    "pages": [   
      "/shared/gravity/page/1"
    ],
    "axes": [
      "/shared/gravity/axes/10s",
      "/shared/gravity/axes/5m"
    ]
  },
  "pages": [
    {
      "name": "Real-Time Velocity Measurement",
      "url": "/shared/gravity/page/1",
      "activity": "/shared/gravity",
      "index": 1,
      "introText": "<h1>Real-time Velocity Measurement</h1>",                        
      "steps": [
        "/shared/gravity/page/1/step/1"
      ],
      "firstStep": "/shared/gravity/page/1/step/1"
    }
  ],
  "steps": [
    {
      "url": "/shared/gravity/page/1/step/1",
      "activityPage": "/shared/gravity/page/1",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/gravity/axes/10s",
          "yAxis": "/shared/gravity/axes/5m",
          "data": [],
          "annotations": []
        },
        "bottom": {
          "type": "graph",
          "title": "Velocity vs. Time",
          "xAxis": "/shared/gravity/axes/10s",
          "yAxis": "/shared/gravity/axes/2mps",
          "data": [],
          "annotations": []
        }
      },
      "tools": [
      ],
      "beforeText": "<p>Attach a sensor and click the Start button. Observe the velocity graph below.</p>",
      "hideSubmitButton": true
    }
  ],
  "units": [
  ],
  "axes": [  
    {
      "url": "/shared/gravity/axes/10s",
      "units": "/builtins/units/seconds",
      "min": 0,
      "max": 10,
      "nSteps": 10,
      "label": "Time"
    },
    {
      "url": "/shared/gravity/axes/5m",
      "units": "/builtins/units/meters",
      "min": 0,
      "max": 5,
      "nSteps":5,
      "label": "Position"
    },
    {
      "url": "/shared/gravity/axes/2mps",
      "units": "/builtins/units/meters-per-second",
      "min": 0,
      "max": 2,
      "nSteps": 10,
      "label": "Velocity"
    }
  ],
  "responseTemplates": [
  ],
  "tags": [  
  ],
  "variables": [
  ],
  "datadefs": [
    {
      "type": "UnorderedDataPoints",
      "records": []
    },
    {
      "type": "FirstOrderDifference",
      "records": []
    }  
  ],
  "annotations": [
  ]
};
