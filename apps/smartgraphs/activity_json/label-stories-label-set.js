/*globals Smartgraphs */

Smartgraphs.activityDocs = Smartgraphs.activityDocs || {};
Smartgraphs.activityDocs["/shared/label-stories-label-set"] =
{
  "_id": "label-stories-label-set.df6",
  "_rev": 1,
  "data_format_version": 6,
  "activity": {
    "title": "Label Stories Label Set",
    "url": "/shared/label-stories-label-set",
    "owner": "shared",
    "pages": [
      "/shared/label-stories-label-set/page/1-1-first-page"
    ],
    "axes": [
      "/shared/label-stories-label-set/axes/1",
      "/shared/label-stories-label-set/axes/2"
    ],
    "authorName": "Richard Klancer"
  },
  "pages": [
    {
      "name": "1 First Page",
      "url": "/shared/label-stories-label-set/page/1-1-first-page",
      "activity": "/shared/label-stories-label-set",
      "index": 1,
      "introText": "The following is a graph of <em>0.8 sin(x)</em>.",
      "steps": [
        "/shared/label-stories-label-set/page/1-1-first-page/step/1"
      ],
      "firstStep": "/shared/label-stories-label-set/page/1-1-first-page/step/1",
      "contextVars": []
    }
  ],
  "steps": [
    {
      "url": "/shared/label-stories-label-set/page/1-1-first-page/step/1",
      "activityPage": "/shared/label-stories-label-set/page/1-1-first-page",
      "paneConfig": "single",
      "panes": {
        "single": {
          "type": "graph",
          "title": "Sinusoidal motion",
          "xAxis": "/shared/label-stories-label-set/axes/1",
          "yAxis": "/shared/label-stories-label-set/axes/2",
          "showCrossHairs": false,
          "showGraphGrid": true,
          "showToolTipCoords": false,
          "annotations": [
            "my-labels"
          ],
          "highlightedAnnotations": [],
          "data": [
            "0.8 sin(x)"
          ],
          "datarefs": [
            "dataref-1"
          ],
          "legends": {
            "title": "legend",
            "type": "name",
            "referenceDatadef": "",
            "datadefs": []
          },
          "activeDatadefs": [
            "0.8 sin(x)"
          ]
        }
      },
      "isFinalStep": true,
      "nextButtonShouldSubmit": true
    }
  ],
  "responseTemplates": [],
  "axes": [
    {
      "url": "/shared/label-stories-label-set/axes/1",
      "units": "/shared/label-stories-label-set/units/Time",
      "min": -4,
      "max": 4,
      "nSteps": 16,
      "label": "Time"
    },
    {
      "url": "/shared/label-stories-label-set/axes/2",
      "units": "/shared/label-stories-label-set/units/meters",
      "min": -1,
      "max": 1,
      "nSteps": 10,
      "label": "Distance"
    }
  ],
  "datadefs": [
    {
      "type": "UnorderedDataPoints",
      "records": [
        {
          "url": "/shared/label-stories-label-set/datadefs/0.8 sin(x)",
          "name": "0.8 sin(x)",
          "activity": "/shared/label-stories-label-set",
          "xUnits": "/shared/label-stories-label-set/units/Time",
          "yUnits": "/shared/label-stories-label-set/units/meters",
          "points": [],
          "pointType": "none",
          "lineType": "connected",
          "lineSnapDistance": 0.1
        }
      ]
    }
  ],
  "datarefs": [
    {
      "type": "SinusoidalEquation",
      "records": [
        {
          "url": "/shared/label-stories-label-set/datarefs/dataref-1",
          "name": "dataref-1",
          "activity": "/shared/label-stories-label-set",
          "datadefName": "0.8 sin(x)",
          "expressionForm": "sine-cosine",
          "angularFunction": "sine",
          "xInterval": 0.1,
          "params": {
            "amplitude": 0.8,
            "frequency": 1,
            "phase": 0,
            "centerAmplitude": 0
          }
        }
      ]
    }
  ],
  "tags": [],
  "annotations": [
    {
      "type": "Label",
      "records": [
        {
          "url": "/shared/label-stories-label-set/annotations/my-labels-1",
          "name": "my-labels-1",
          "activity": "/shared/label-stories-label-set",
          "text": "This is the zero crossing.",
          "x": 0,
          "y": 0,
          "xOffset": 100,
          "yOffset": -40
        },
        {
          "url": "/shared/label-stories-label-set/annotations/my-labels-2",
          "name": "my-labels-2",
          "activity": "/shared/label-stories-label-set",
          "text": "This is the maximum.",
          "x": 1.5707,
          "y": 0.8,
          "xOffset": 100,
          "yOffset": -40
        },
        {
          "url": "/shared/label-stories-label-set/annotations/my-labels-3",
          "name": "my-labels-3",
          "activity": "/shared/label-stories-label-set",
          "text": "This is the minimum.",
          "x": -1.5707,
          "y": -0.8,
          "xOffset": 100,
          "yOffset": -40
        }
      ]
    },
    {
      "type": "LabelSet",
      "records": [
        {
          "url": "/shared/label-stories-label-set/annotations/my-labels",
          "name": "my-labels",
          "activity": "/shared/label-stories-label-set",
          "labels": [
            "/shared/label-stories-label-set/annotations/my-labels-1",
            "/shared/label-stories-label-set/annotations/my-labels-2",
            "/shared/label-stories-label-set/annotations/my-labels-3"
          ]
        }
      ]
    }
  ],
  "variables": [],
  "units": [
    {
      "url": "/shared/label-stories-label-set/units/Time",
      "activity": "/shared/label-stories-label-set",
      "name": "Time",
      "abbreviation": "s",
      "pluralName": "Time"
    },
    {
      "url": "/shared/label-stories-label-set/units/Distance",
      "activity": "/shared/label-stories-label-set",
      "name": "Distance",
      "abbreviation": "m",
      "pluralName": "Distance"
    },
    {
      "url": "/shared/label-stories-label-set/units/degrees Celsius",
      "activity": "/shared/label-stories-label-set",
      "name": "degrees Celsiu",
      "abbreviation": "deg C",
      "pluralName": "degrees Celsius"
    },
    {
      "url": "/shared/label-stories-label-set/units/minutes",
      "activity": "/shared/label-stories-label-set",
      "name": "minute",
      "abbreviation": "min.",
      "pluralName": "minutes"
    },
    {
      "url": "/shared/label-stories-label-set/units/meters",
      "activity": "/shared/label-stories-label-set",
      "name": "meter",
      "abbreviation": "m",
      "pluralName": "meters"
    },
    {
      "url": "/shared/label-stories-label-set/units/seconds",
      "activity": "/shared/label-stories-label-set",
      "name": "second",
      "abbreviation": "s",
      "pluralName": "seconds"
    },
    {
      "url": "/shared/label-stories-label-set/units/centimeters",
      "activity": "/shared/label-stories-label-set",
      "name": "centimeter",
      "abbreviation": "cm",
      "pluralName": "centimeters"
    },
    {
      "url": "/shared/label-stories-label-set/units/grams",
      "activity": "/shared/label-stories-label-set",
      "name": "gram",
      "abbreviation": "gr",
      "pluralName": "grams"
    },
    {
      "url": "/shared/label-stories-label-set/units/miles",
      "activity": "/shared/label-stories-label-set",
      "name": "mile",
      "abbreviation": "mi",
      "pluralName": "miles"
    },
    {
      "url": "/shared/label-stories-label-set/units/hours",
      "activity": "/shared/label-stories-label-set",
      "name": "hour",
      "abbreviation": "hr",
      "pluralName": "hours"
    },
    {
      "url": "/shared/label-stories-label-set/units/Celsius",
      "activity": "/shared/label-stories-label-set",
      "name": "Celsiu",
      "abbreviation": "° C.",
      "pluralName": "Celsius"
    },
    {
      "url": "/shared/label-stories-label-set/units/dollars",
      "activity": "/shared/label-stories-label-set",
      "name": "dollar",
      "abbreviation": "$",
      "pluralName": "dollars"
    },
    {
      "url": "/shared/label-stories-label-set/units/inches",
      "activity": "/shared/label-stories-label-set",
      "name": "inche",
      "abbreviation": "in",
      "pluralName": "inches"
    },
    {
      "url": "/shared/label-stories-label-set/units/years",
      "activity": "/shared/label-stories-label-set",
      "name": "year",
      "abbreviation": "yr",
      "pluralName": "years"
    },
    {
      "url": "/shared/label-stories-label-set/units/millimeters",
      "activity": "/shared/label-stories-label-set",
      "name": "millimeter",
      "abbreviation": "mm",
      "pluralName": "millimeters"
    },
    {
      "url": "/shared/label-stories-label-set/units/parts per million",
      "activity": "/shared/label-stories-label-set",
      "name": "parts per million",
      "abbreviation": "ppm",
      "pluralName": "parts per million"
    },
    {
      "url": "/shared/label-stories-label-set/units/meters per second",
      "activity": "/shared/label-stories-label-set",
      "name": "meters per second",
      "abbreviation": "m/s",
      "pluralName": "meters per second"
    }
  ]
}