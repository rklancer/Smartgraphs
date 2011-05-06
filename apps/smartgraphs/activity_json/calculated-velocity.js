/*globals Smartgraphs */

Smartgraphs.activityDocs = Smartgraphs.activityDocs || {};
Smartgraphs.activityDocs["/shared/calculated-velocity"] = 
{
  "_id": "calculated-velocity.df6",
  "_rev": "1",
  "data_format_version": 6,
  "activity": {
    "title": "Example of Calculated Velocity",
    "url": "/shared/calculated-velocity",
    "owner": "shared",
    "pages": [   
      "/shared/calculated-velocity/page/1"
    ],
    "axes": [
      "/shared/calculated-velocity/axes/12s",
      "/shared/calculated-velocity/axes/10m"
    ]
  },
  "pages": [
    {
      "name": "Position and Velocity Graphs",
      "url": "/shared/calculated-velocity/page/1",
      "activity": "/shared/calculated-velocity",
      "index": 1,
      "introText": "<h1>Labeling Calculated Data</h1>",                        
      "steps": [
        "/shared/calculated-velocity/page/1/step/1"
      ],
      "firstStep": "/shared/calculated-velocity/page/1/step/1"
    }
  ],
  "steps": [
    {
      "url": "/shared/calculated-velocity/page/1/step/1",
      "activityPage": "/shared/calculated-velocity/page/1",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/calculated-velocity/axes/12s",
          "yAxis": "/shared/calculated-velocity/axes/10m",
          "data": [
            ["position-data", { "point-type": "none", "line-type": "connected" }],
            ["position-data2", { "point-type": "none", "line-type": "connected" }]
          ],
          "annotations": []
        },
        "bottom": {
          "type": "graph",
          "title": "Velocity vs. Time",
          "xAxis": "/shared/calculated-velocity/axes/12s",
          "yAxis": "/shared/calculated-velocity/axes/2mps",
          "data": ["velocity-calculated"],
          "annotations": []
        }
      },
      "tools": [
        { "name": "label",
          "setup": {
            "pane": "bottom",
            "labelName": "test-label"
          }
        }
      ],
      "beforeText": "<p>Try clicking an interesting area of the velocity-time data on the left. Note that the velocity-time data are derived from the position-time data.</p>",
      "tools": [
        { "name": "animation",
          "setup": {
            "pane": "top",
            "duration": 3000, // ms
            "channelWidth": 70, // same as the default
            // "backgroundImageClassName": "road",
            "backgroundImageURL": sc_static('images/road'),
            "animation": [{
                "foregroundImageURL": sc_static('images/car'),
                "offsetX": 0,
                "offsetY": 0
              }, {
                "foregroundImageURL": "circle",
                // "foregroundImageURL": "box",
                // "foregroundImageURL": "cross",
                "offsetX": -10,
                "offsetY": 0
            }]
          }
        }
      ]
    }
  ],
  "units": [
  ],
  "axes": [  
    {
      "url": "/shared/calculated-velocity/axes/12s",
      "units": "/builtins/units/seconds",
      "min": 0,
      "max": 12,
      "nSteps": 12,
      "label": "Time"
    },
    {
      "url": "/shared/calculated-velocity/axes/10m",
      "units": "/builtins/units/meters",
      "min": 0,
      "max": 10,
      "nSteps": 10,
      "label": "Position"
    },
    {
      "url": "/shared/calculated-velocity/axes/2mps",
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
      "records": [
        {    
          "url": "/shared/calculated-velocity/datadefs/position-data",
          "name": "position-data",
          "activity": "/shared/calculated-velocity",
          "xUnits": "/builtins/units/seconds",
          "xLabel": "Time",
          "xShortLabel": "Time",
          "yUnits": "/builtins/units/meters",
          "yLabel": "Position",
          "yShortLabel": "Position",
          "points": [[0.0,0.0],[0.25,0.025],[0.5,0.05],[0.75,0.075],[1.0,0.1],[1.25,0.125],[1.5,0.15],[1.75,0.175],[2.0,0.2],[2.25,0.225],[2.5,0.25],[2.75,0.276],[3.0,0.303],[3.25,0.34],[3.5,0.404],[3.75,0.515],[4.0,0.653],[4.25,0.801],[4.5,0.95],[4.75,1.1],[5.0,1.25],[5.25,1.4],[5.5,1.55],[5.75,1.7],[6.0,1.85],[6.25,2.0],[6.5,2.15],[6.75,2.3],[7.0,2.45],[7.25,2.6],[7.5,2.75],[7.75,2.901],[8.0,3.057],[8.25,3.23],[8.5,3.459],[8.75,3.78],[9.0,4.157],[9.25,4.551],[9.5,4.95],[9.75,5.35],[10.0,5.75],[10.25,6.15],[10.5,6.55],[10.75,6.95],[11.0,7.35],[11.25,7.75],[11.5,8.15],[11.75,8.55],[12.0,8.95]]
        },
        {    
          "url": "/shared/calculated-velocity/datadefs/position-data2",
          "name": "position-data2",
          "activity": "/shared/calculated-velocity",
          "xUnits": "/builtins/units/seconds",
          "xLabel": "Time",
          "xShortLabel": "Time",
          "yUnits": "/builtins/units/meters",
          "yLabel": "Position",
          "yShortLabel": "Position",
          "points": [[0.0,5.0],[0.25,5.025],[0.5,5.05],[0.75,5.075],[1.0,5.1],[1.25,5.125],[1.5,5.15],[1.75,5.175],[2.0,5.2],[2.25,5.225],[2.5,5.25],[2.75,5.276],[3.0,5.303],[3.25,5.34],[3.5,5.404],[3.75,5.515],[4.0,5.653],[4.25,5.801],[4.5,5.95],[4.75,5.1],[5.0,5.25],[5.25,5.4],[5.5,5.55],[5.75,5.7],[6.0,5.85],[6.25,5.0],[6.5,5.15],[6.75,5.3],[7.0,5.45],[7.25,5.6],[7.5,5.75],[7.75,5.901],[8.0,5.057],[8.25,5.23],[8.5,5.459],[8.75,3.78],[9.0,4.157],[9.25,5.551],[9.5,5.95],[9.75,5.35],[10.0,5.75],[10.25,4.15],[10.5,4.55],[10.75,6.95],[11.0,3.35],[11.25,3.75],[11.5,2.15],[11.75,2.55],[12.0,1.95]]
        }
      ]
    },
    {
      "type": "FirstOrderDifference",
      "records": [
        {    
          "url": "/shared/calculated-velocity/datadefs/velocity-calculated",
          "name": "velocity-calculated",
          "activity": "/shared/calculated-velocity",
          "xUnits": "/builtins/units/seconds",
          "xLabel": "Time",
          "xShortLabel": "Time",
          "yUnits": "/builtins/units/meters-per-second",
          "yLabel": "Velocity",
          "yShortLabel": "Velocity",
          "source": "/shared/calculated-velocity/datadefs/position-data"
        }
      ]
    }  
  ],
  "annotations": [
    {
      "type": "LabelAnnotation",
      "records": [
        {
          "url": "/shared/calculated-velocity/annotation/test-label",
          "name": "test-label",
          "activity": "/shared/calculated-velocity",
          "text": "a label"
        }
      ]
    }
  ]
};
