/*globals Smartgraphs */

Smartgraphs.activityDocs = Smartgraphs.activityDocs || {};
Smartgraphs.activityDocs["/shared/label-stories-label-sequence"] =
{
  "_id": "label-stories-label-sequence.df6",
  "_rev": 1,
  "data_format_version": 6,
  "activity": {
    "title": "Label Stories Label Sequence",
    "url": "/shared/label-stories-label-sequence",
    "owner": "shared",
    "pages": [
      "/shared/label-stories-label-sequence/page/1-1-first-page",
      "/shared/label-stories-label-sequence/page/2-2-second-page"
    ],
    "axes": [
      "/shared/label-stories-label-sequence/axes/1",
      "/shared/label-stories-label-sequence/axes/2",
      "/shared/label-stories-label-sequence/axes/3",
      "/shared/label-stories-label-sequence/axes/4"
    ],
    "authorName": "Richard Klancer"
  },
  "pages": [
    {
      "name": "1 First Page",
      "url": "/shared/label-stories-label-sequence/page/1-1-first-page",
      "activity": "/shared/label-stories-label-sequence",
      "index": 1,
      "introText": "The following is a graph of <em>0.8 sin(x)</em>.",
      "steps": [
        "/shared/label-stories-label-sequence/page/1-1-first-page/step/1"
      ],
      "firstStep": "/shared/label-stories-label-sequence/page/1-1-first-page/step/1",
      "contextVars": []
    },
    {
      "name": "2 Second Page",
      "url": "/shared/label-stories-label-sequence/page/2-2-second-page",
      "activity": "/shared/label-stories-label-sequence",
      "index": 2,
      "introText": "The following is a graph of <em>0.8 sin(x)</em>, with the zero crossings you labeled.",
      "steps": [
        "/shared/label-stories-label-sequence/page/2-2-second-page/step/1"
      ],
      "firstStep": "/shared/label-stories-label-sequence/page/2-2-second-page/step/1",
      "contextVars": []
    }
  ],
  "steps": [
    {
      "url": "/shared/label-stories-label-sequence/page/1-1-first-page/step/1",
      "activityPage": "/shared/label-stories-label-sequence/page/1-1-first-page",
      "beforeText": "<p>Label the zero crossings</p>",
      "paneConfig": "single",
      "panes": {
        "single": {
          "type": "graph",
          "title": "Sinusoidal motion",
          "xAxis": "/shared/label-stories-label-sequence/axes/1",
          "yAxis": "/shared/label-stories-label-sequence/axes/2",
          "showCrossHairs": false,
          "showGraphGrid": true,
          "showToolTipCoords": false,
          "annotations": [
            "student-labels"
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
      "tools": [
        {
          "name": "label",
          "setup": {
            "pane": "single",
            "labelSetName": "student-labels",
            "markOnDataPoints": false,
            "allowCoordinatesChange": true,
            "maxNoOfLabels": 3
          }
        }
      ],
      "submissibilityCriterion": [
        "=",
        [
          "numberOfLabels",
          "student-labels"
        ],
        3
      ],
      "submissibilityDependsOn": [
        "annotation",
        "student-labels"
      ],
      "isFinalStep": true,
      "nextButtonShouldSubmit": true
    },
    {
      "url": "/shared/label-stories-label-sequence/page/2-2-second-page/step/1",
      "activityPage": "/shared/label-stories-label-sequence/page/2-2-second-page",
      "paneConfig": "single",
      "panes": {
        "single": {
          "type": "graph",
          "title": "Sinusoidal motion",
          "xAxis": "/shared/label-stories-label-sequence/axes/3",
          "yAxis": "/shared/label-stories-label-sequence/axes/4",
          "showCrossHairs": false,
          "showGraphGrid": true,
          "showToolTipCoords": false,
          "annotations": [
            "student-labels"
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
      "url": "/shared/label-stories-label-sequence/axes/1",
      "units": "/shared/label-stories-label-sequence/units/Time",
      "min": -4,
      "max": 4,
      "nSteps": 16,
      "label": "Time"
    },
    {
      "url": "/shared/label-stories-label-sequence/axes/2",
      "units": "/shared/label-stories-label-sequence/units/meters",
      "min": -1,
      "max": 1,
      "nSteps": 10,
      "label": "Distance"
    },
    {
      "url": "/shared/label-stories-label-sequence/axes/3",
      "units": "/shared/label-stories-label-sequence/units/Time",
      "min": -4,
      "max": 4,
      "nSteps": 16,
      "label": "Time"
    },
    {
      "url": "/shared/label-stories-label-sequence/axes/4",
      "units": "/shared/label-stories-label-sequence/units/meters",
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
          "url": "/shared/label-stories-label-sequence/datadefs/0.8 sin(x)",
          "name": "0.8 sin(x)",
          "activity": "/shared/label-stories-label-sequence",
          "xUnits": "/shared/label-stories-label-sequence/units/Time",
          "yUnits": "/shared/label-stories-label-sequence/units/meters",
          "points": [],
          "pointType": "dot",
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
          "url": "/shared/label-stories-label-sequence/datarefs/dataref-1",
          "name": "dataref-1",
          "activity": "/shared/label-stories-label-sequence",
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
      "type": "LabelSet",
      "records": [
        {
          "url": "/shared/label-stories-label-sequence/annotations/student-labels",
          "name": "student-labels",
          "activity": "/shared/label-stories-label-sequence"
        }
      ]
    }
  ],
  "variables": [],
  "units": [
    {
      "url": "/shared/label-stories-label-sequence/units/Time",
      "activity": "/shared/label-stories-label-sequence",
      "name": "Time",
      "abbreviation": "s",
      "pluralName": "Time"
    },
    {
      "url": "/shared/label-stories-label-sequence/units/Distance",
      "activity": "/shared/label-stories-label-sequence",
      "name": "Distance",
      "abbreviation": "m",
      "pluralName": "Distance"
    },
    {
      "url": "/shared/label-stories-label-sequence/units/degrees Celsius",
      "activity": "/shared/label-stories-label-sequence",
      "name": "degrees Celsiu",
      "abbreviation": "deg C",
      "pluralName": "degrees Celsius"
    },
    {
      "url": "/shared/label-stories-label-sequence/units/minutes",
      "activity": "/shared/label-stories-label-sequence",
      "name": "minute",
      "abbreviation": "min.",
      "pluralName": "minutes"
    },
    {
      "url": "/shared/label-stories-label-sequence/units/meters",
      "activity": "/shared/label-stories-label-sequence",
      "name": "meter",
      "abbreviation": "m",
      "pluralName": "meters"
    },
    {
      "url": "/shared/label-stories-label-sequence/units/seconds",
      "activity": "/shared/label-stories-label-sequence",
      "name": "second",
      "abbreviation": "s",
      "pluralName": "seconds"
    },
    {
      "url": "/shared/label-stories-label-sequence/units/centimeters",
      "activity": "/shared/label-stories-label-sequence",
      "name": "centimeter",
      "abbreviation": "cm",
      "pluralName": "centimeters"
    },
    {
      "url": "/shared/label-stories-label-sequence/units/grams",
      "activity": "/shared/label-stories-label-sequence",
      "name": "gram",
      "abbreviation": "gr",
      "pluralName": "grams"
    },
    {
      "url": "/shared/label-stories-label-sequence/units/miles",
      "activity": "/shared/label-stories-label-sequence",
      "name": "mile",
      "abbreviation": "mi",
      "pluralName": "miles"
    },
    {
      "url": "/shared/label-stories-label-sequence/units/hours",
      "activity": "/shared/label-stories-label-sequence",
      "name": "hour",
      "abbreviation": "hr",
      "pluralName": "hours"
    },
    {
      "url": "/shared/label-stories-label-sequence/units/Celsius",
      "activity": "/shared/label-stories-label-sequence",
      "name": "Celsiu",
      "abbreviation": "° C.",
      "pluralName": "Celsius"
    },
    {
      "url": "/shared/label-stories-label-sequence/units/dollars",
      "activity": "/shared/label-stories-label-sequence",
      "name": "dollar",
      "abbreviation": "$",
      "pluralName": "dollars"
    },
    {
      "url": "/shared/label-stories-label-sequence/units/inches",
      "activity": "/shared/label-stories-label-sequence",
      "name": "inche",
      "abbreviation": "in",
      "pluralName": "inches"
    },
    {
      "url": "/shared/label-stories-label-sequence/units/years",
      "activity": "/shared/label-stories-label-sequence",
      "name": "year",
      "abbreviation": "yr",
      "pluralName": "years"
    },
    {
      "url": "/shared/label-stories-label-sequence/units/millimeters",
      "activity": "/shared/label-stories-label-sequence",
      "name": "millimeter",
      "abbreviation": "mm",
      "pluralName": "millimeters"
    },
    {
      "url": "/shared/label-stories-label-sequence/units/parts per million",
      "activity": "/shared/label-stories-label-sequence",
      "name": "parts per million",
      "abbreviation": "ppm",
      "pluralName": "parts per million"
    },
    {
      "url": "/shared/label-stories-label-sequence/units/meters per second",
      "activity": "/shared/label-stories-label-sequence",
      "name": "meters per second",
      "abbreviation": "m/s",
      "pluralName": "meters per second"
    }
  ]
};
