/*globals Smartgraphs */

Smartgraphs.activityDocs = Smartgraphs.activityDocs || {};
Smartgraphs.activityDocs["/shared/sensor-graph-activity"] =
{
  "_id": "sensor-graph-activity.df6",
  "_rev": 1,
  "data_format_version": 6,
  "activity": {
    "title": "Sensor Graph Activity",
    "url": "/shared/sensor-graph-activity",
    "owner": "shared",
    "pages": [
      "/shared/sensor-graph-activity/page/1-sensor-graph-page"
    ],
    "axes": [
      "/shared/sensor-graph-activity/axes/1",
      "/shared/sensor-graph-activity/axes/2"
    ]
  },
  "pages": [
    {
      "name": "Sensor graph page",
      "url": "/shared/sensor-graph-activity/page/1-sensor-graph-page",
      "activity": "/shared/sensor-graph-activity",
      "index": 1,
      "introText": "In this activity, you'll walk back and forth in front of the sensor.",
      "steps": [
        "/shared/sensor-graph-activity/page/1-sensor-graph-page/step/1"
      ],
      "firstStep": "/shared/sensor-graph-activity/page/1-sensor-graph-page/step/1"
    }
  ],
  "steps": [
    {
      "url": "/shared/sensor-graph-activity/page/1-sensor-graph-page/step/1",
      "activityPage": "/shared/sensor-graph-activity/page/1-sensor-graph-page",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Back and Forth",
          "xAxis": "/shared/sensor-graph-activity/axes/1",
          "yAxis": "/shared/sensor-graph-activity/axes/2",
          "annotations": [],
          "data": [
            "datadef-1"
          ]
        },
        "bottom": {
          "type": "table",
          "data": "datadef-1",
          "annotations": [],
          "xLabel": "Time",
          "yLabel": "Position"
        }
      },
      "tools": [
        {
          "name": "sensor",
          "setup": {
            "controlsPane": "top",
            "data": "datadef-1"
          }
        }
      ],
      "isFinalStep": true,
      "nextButtonShouldSubmit": true
    }
  ],
  "responseTemplates": [],
  "axes": [
    {
      "url": "/shared/sensor-graph-activity/axes/1",
      "units": "/shared/sensor-graph-activity/units/Time",
      "min": 0,
      "max": 20,
      "nSteps": 10,
      "label": "Time"
    },
    {
      "url": "/shared/sensor-graph-activity/axes/2",
      "units": "/shared/sensor-graph-activity/units/Distance",
      "min": 0,
      "max": 5,
      "nSteps": 10,
      "label": "Position"
    }
  ],
  "datadefs": [
    {
      "type": "UnorderedDataPoints",
      "records": [
        {
          "url": "/shared/sensor-graph-activity/datadefs/datadef-1",
          "name": "datadef-1",
          "activity": "/shared/sensor-graph-activity",
          "xUnits": "/shared/sensor-graph-activity/units/Time",
          "xLabel": "Time",
          "xShortLabel": "Time",
          "yUnits": "/shared/sensor-graph-activity/units/Distance",
          "yLabel": "Position",
          "yShortLabel": "Position",
          "points": []
        }
      ]
    }
  ],
  "tags": [],
  "annotations": [],
  "variables": [],
  "units": [
    {
      "url": "/shared/sensor-graph-activity/units/Time",
      "activity": "/shared/sensor-graph-activity",
      "name": "Time",
      "abbreviation": "s",
      "pluralName": "Time"
    },
    {
      "url": "/shared/sensor-graph-activity/units/Distance",
      "activity": "/shared/sensor-graph-activity",
      "name": "Distance",
      "abbreviation": "m",
      "pluralName": "Distance"
    }
  ]
};
