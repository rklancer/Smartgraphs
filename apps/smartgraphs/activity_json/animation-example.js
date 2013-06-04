/*globals Smartgraphs */

Smartgraphs.activityDocs = Smartgraphs.activityDocs || {};
Smartgraphs.activityDocs["/shared/animation-example"] =
{
  "_id": "animation-example.df6",
  "_rev": "1",
  "data_format_version": 6,
  "activity": {
    "title": "Animation Tool Example",
    "url": "/shared/animation-example",
    "owner": "shared",
    "pages": [
      "/shared/animation-example/page/1"
    ],
    "axes": [
      "/shared/animation-example/axes/12s",
      "/shared/animation-example/axes/10m"
    ]
  },
  "pages": [
    {
      "name": "Position and Velocity Graphs",
      "url": "/shared/animation-example/page/1",
      "activity": "/shared/animation-example",
      "index": 1,
      "introText": "<h1>Labeling Calculated Data</h1>",
      "steps": [
        "/shared/animation-example/page/1/step/1"
      ],
      "firstStep": "/shared/animation-example/page/1/step/1"
    }
  ],
  "steps": [
    {
      "url": "/shared/animation-example/page/1/step/1",
      "activityPage": "/shared/animation-example/page/1",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/animation-example/axes/12s",
          "yAxis": "/shared/animation-example/axes/10m",
          "data": [
            ["position-data", { "point-type": "none", "line-type": "connected" }],
            ["position-data2", { "point-type": "none", "line-type": "connected" }]
          ],
          "annotations": []
        },
        "bottom": {
          "type": "graph",
          "title": "Velocity vs. Time",
          "xAxis": "/shared/animation-example/axes/12s",
          "yAxis": "/shared/animation-example/axes/2mps",
          "data": ["velocity-calculated"],
          "annotations": [],
          "activeDatadefs": [
          "velocity-calculated"
          ]
        }
      },
      "beforeText": "<p>Click Start, Reset, and Stop to see the animation in the top graph. Note that you can also label one point bottom graph.</p>",
      "hideSubmitButton": true,
      "tools": [
        { "name": "label",
          "setup": {
            "pane": "bottom",
            "labelName": "test-label"
          }
        },
        { "name": "animation",
          "setup": {
            "pane": "top",
            "duration": 3000,   // ms
            "channelWidth": 70, // same as the default
            "backgroundImage": "road.png",
            "loop": true,
            "animations": [{
                "data": "position-data2",
                "image": "car.png",
                "width": 70,
                "height": 30,
                "xOffset": 0,
                "yOffset": 0
              }, {
                "data": "position-data",
                "image": "circle.png",
                "xOffset": -10,
                "yOffset": 0
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
      "url": "/shared/animation-example/axes/12s",
      "units": "/builtins/units/seconds",
      "min": 0,
      "max": 12,
      "nSteps": 12,
      "label": "Time"
    },
    {
      "url": "/shared/animation-example/axes/10m",
      "units": "/builtins/units/meters",
      "min": 0,
      "max": 10,
      "nSteps": 10,
      "label": "Position"
    },
    {
      "url": "/shared/animation-example/axes/2mps",
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
          "url": "/shared/animation-example/datadefs/position-data",
          "name": "position-data",
          "activity": "/shared/animation-example",
          "xUnits": "/builtins/units/seconds",
          "xLabel": "Time",
          "xShortLabel": "Time",
          "yUnits": "/builtins/units/meters",
          "yLabel": "Position",
          "yShortLabel": "Position",
          "points": [[0.0,0.0],[0.25,0.025],[0.5,0.05],[0.75,0.075],[1.0,0.1],[1.25,0.125],[1.5,0.15],[1.75,0.175],[2.0,0.2],[2.25,0.225],[2.5,0.25],[2.75,0.276],[3.0,0.303],[3.25,0.34],[3.5,0.404],[3.75,0.515],[4.0,0.653],[4.25,0.801],[4.5,0.95],[4.75,1.1],[5.0,1.25],[5.25,1.4],[5.5,1.55],[5.75,1.7],[6.0,1.85],[6.25,2.0],[6.5,2.15],[6.75,2.3],[7.0,2.45],[7.25,2.6],[7.5,2.75],[7.75,2.901],[8.0,3.057],[8.25,3.23],[8.5,3.459],[8.75,3.78],[9.0,4.157],[9.25,4.551],[9.5,4.95],[9.75,5.35],[10.0,5.75],[10.25,6.15],[10.5,6.55],[10.75,6.95],[11.0,7.35],[11.25,7.75],[11.5,8.15],[11.75,8.55],[12.0,8.95]]
        },
        {
          "url": "/shared/animation-example/datadefs/position-data2",
          "name": "position-data2",
          "activity": "/shared/animation-example",
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
          "url": "/shared/animation-example/datadefs/velocity-calculated",
          "name": "velocity-calculated",
          "activity": "/shared/animation-example",
          "xUnits": "/builtins/units/seconds",
          "xLabel": "Time",
          "xShortLabel": "Time",
          "yUnits": "/builtins/units/meters-per-second",
          "yLabel": "Velocity",
          "yShortLabel": "Velocity",
          "source": "/shared/animation-example/datadefs/position-data"
        }
      ]
    }
  ],
  "annotations": [
    {
      "type": "Label",
      "records": [
        {
          "url": "/shared/animation-example/annotation/test-label",
          "name": "test-label",
          "activity": "/shared/animation-example",
          "text": "a label"
        },
        {
          "url": "/shared/animation-example/annotation/test-label-2",
          "name": "test-label-2",
          "activity": "/shared/animation-example",
          "text": "a second label"
        }
      ]
    },
    {
      "type": "LabelSet",
      "records": [
        {
          "url": "/shared/animation-example/annotation/test-label-set",
          "name": "test-label-set",
          "activity": "/shared/animation-example"
        }
      ]
    }
  ]
};
