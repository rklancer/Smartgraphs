/*globals Smartgraphs */

Smartgraphs.activityDocs = Smartgraphs.activityDocs || {};
Smartgraphs.activityDocs["/shared/label-stories-label-a-point"] =
{
  "_id": "label-stories-label-a-point.df6",
  "_rev": 1,
  "data_format_version": 6,
  "activity": {
    "title": "Label Stories Label A Point",
    "url": "/shared/label-stories-label-a-point",
    "owner": "shared",
    "pages": [
      "/shared/label-stories-label-a-point/page/1-1-first-page",
      "/shared/label-stories-label-a-point/page/2-2-second-page"
    ],
    "axes": [
      "/shared/label-stories-label-a-point/axes/1",
      "/shared/label-stories-label-a-point/axes/2",
      "/shared/label-stories-label-a-point/axes/3",
      "/shared/label-stories-label-a-point/axes/4"
    ],
    "authorName": "Richard Klancer"
  },
  "pages": [
    {
      "name": "1 First Page",
      "url": "/shared/label-stories-label-a-point/page/1-1-first-page",
      "activity": "/shared/label-stories-label-a-point",
      "index": 1,
      "introText": "The following is a graph of <em>0.8 sin(x)</em>.",
      "steps": [
        "/shared/label-stories-label-a-point/page/1-1-first-page/step/1",
        "/shared/label-stories-label-a-point/page/1-1-first-page/step/2",
        "/shared/label-stories-label-a-point/page/1-1-first-page/step/3",
        "/shared/label-stories-label-a-point/page/1-1-first-page/step/4"
      ],
      "firstStep": "/shared/label-stories-label-a-point/page/1-1-first-page/step/1",
      "contextVars": []
    },
    {
      "name": "2 Second Page",
      "url": "/shared/label-stories-label-a-point/page/2-2-second-page",
      "activity": "/shared/label-stories-label-a-point",
      "index": 2,
      "introText": "The following is a graph of <em>0.8 sin(x)</em>, with the point you labeled.",
      "steps": [
        "/shared/label-stories-label-a-point/page/2-2-second-page/step/1"
      ],
      "firstStep": "/shared/label-stories-label-a-point/page/2-2-second-page/step/1",
      "contextVars": []
    }
  ],
  "steps": [
    {
      "url": "/shared/label-stories-label-a-point/page/1-1-first-page/step/1",
      "activityPage": "/shared/label-stories-label-a-point/page/1-1-first-page",
      "beforeText": "Label the <em>maximum</em> of the function",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Sinusoidal motion",
          "xAxis": "/shared/label-stories-label-a-point/axes/1",
          "yAxis": "/shared/label-stories-label-a-point/axes/2",
          "showCrossHairs": false,
          "showGraphGrid": true,
          "showToolTipCoords": false,
          "annotations": [
            "highlighted-point-1"
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
        },
        "bottom": {
          "type": "table",
          "data": "0.8 sin(x)",
          "xLabel": "Time (s)",
          "yLabel": "Distance (m)",
          "annotations": [
            "highlighted-point-1"
          ],
          "highlightedAnnotations": []
        }
      },
      "tools": [
        {
          "name": "label",
          "setup": {
            "pane": "top",
            "labelName": "labeled-point",
            "markOnDataPoints": true,
            "datadefName": "0.8 sin(x)",
            "allowCoordinatesChange": true
          }
        },
        {
          "name": "tagging",
          "setup": {
            "tag": "tag-1",
            "data": "0.8 sin(x)",
            "labelName": "labeled-point"
          }
        }
      ],
      "submitButtonTitle": "Check My Answer",
      "defaultBranch": "/shared/label-stories-label-a-point/page/1-1-first-page/step/2",
      "responseBranches": [
        {
          "criterion": [
            "coordinatesInRange",
            "tag-1",
            1.51,
            0.75,
            1.69,
            0.85
          ],
          "step": "/shared/label-stories-label-a-point/page/1-1-first-page/step/4"
        }
      ],
      "isFinalStep": false
    },
    {
      "url": "/shared/label-stories-label-a-point/page/1-1-first-page/step/2",
      "activityPage": "/shared/label-stories-label-a-point/page/1-1-first-page",
      "beforeText": "Remember that the maximum point of a function is the point on the function's graph at which the <em>y-value</em> of the function is larger than it is anywhere else.",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Sinusoidal motion",
          "xAxis": "/shared/label-stories-label-a-point/axes/1",
          "yAxis": "/shared/label-stories-label-a-point/axes/2",
          "showCrossHairs": false,
          "showGraphGrid": true,
          "showToolTipCoords": false,
          "annotations": [
            "highlighted-point-1",
            "labeled-point"
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
        },
        "bottom": {
          "type": "table",
          "data": "0.8 sin(x)",
          "xLabel": "Time (s)",
          "yLabel": "Distance (m)",
          "annotations": [
            "highlighted-point-1"
          ],
          "highlightedAnnotations": []
        }
      },
      "tools": [
        {
          "name": "label",
          "setup": {
            "pane": "top",
            "labelName": "labeled-point",
            "markOnDataPoints": true,
            "datadefName": "0.8 sin(x)",
            "allowCoordinatesChange": true
          }
        },
        {
          "name": "tagging",
          "setup": {
            "tag": "tag-1",
            "data": "0.8 sin(x)",
            "labelName": "labeled-point"
          }
        }
      ],
      "submitButtonTitle": "Check My Answer",
      "defaultBranch": "/shared/label-stories-label-a-point/page/1-1-first-page/step/3",
      "responseBranches": [
        {
          "criterion": [
            "coordinatesInRange",
            "tag-1",
            1.51,
            0.75,
            1.69,
            0.85
          ],
          "step": "/shared/label-stories-label-a-point/page/1-1-first-page/step/4"
        }
      ],
      "isFinalStep": false
    },
    {
      "url": "/shared/label-stories-label-a-point/page/1-1-first-page/step/3",
      "activityPage": "/shared/label-stories-label-a-point/page/1-1-first-page",
      "beforeText": "The maximum point of the sine function is at π/2, or 1.57, where it attains the value 1. Since we're multiplying it by 0.8, the y-value of the maximum point is 0.8.",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Sinusoidal motion",
          "xAxis": "/shared/label-stories-label-a-point/axes/1",
          "yAxis": "/shared/label-stories-label-a-point/axes/2",
          "showCrossHairs": false,
          "showGraphGrid": true,
          "showToolTipCoords": false,
          "annotations": [
            "line-to-axis-1",
            "labeled-point"
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
        },
        "bottom": {
          "type": "table",
          "data": "0.8 sin(x)",
          "xLabel": "Time (s)",
          "yLabel": "Distance (m)",
          "annotations": [],
          "highlightedAnnotations": []
        }
      },
      "isFinalStep": true,
      "nextButtonShouldSubmit": true
    },
    {
      "url": "/shared/label-stories-label-a-point/page/1-1-first-page/step/4",
      "activityPage": "/shared/label-stories-label-a-point/page/1-1-first-page",
      "beforeText": "That's correct.",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Sinusoidal motion",
          "xAxis": "/shared/label-stories-label-a-point/axes/1",
          "yAxis": "/shared/label-stories-label-a-point/axes/2",
          "showCrossHairs": false,
          "showGraphGrid": true,
          "showToolTipCoords": false,
          "annotations": [
            "labeled-point"
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
        },
        "bottom": {
          "type": "table",
          "data": "0.8 sin(x)",
          "xLabel": "Time (s)",
          "yLabel": "Distance (m)",
          "annotations": [],
          "highlightedAnnotations": []
        }
      },
      "isFinalStep": true,
      "nextButtonShouldSubmit": true
    },
    {
      "url": "/shared/label-stories-label-a-point/page/2-2-second-page/step/1",
      "activityPage": "/shared/label-stories-label-a-point/page/2-2-second-page",
      "paneConfig": "single",
      "panes": {
        "single": {
          "type": "graph",
          "title": "Sinusoidal motion",
          "xAxis": "/shared/label-stories-label-a-point/axes/3",
          "yAxis": "/shared/label-stories-label-a-point/axes/4",
          "showCrossHairs": false,
          "showGraphGrid": true,
          "showToolTipCoords": false,
          "annotations": [
            "labeled-point"
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
      "url": "/shared/label-stories-label-a-point/axes/1",
      "units": "/shared/label-stories-label-a-point/units/seconds",
      "min": -4,
      "max": 4,
      "nSteps": 16,
      "label": "Time"
    },
    {
      "url": "/shared/label-stories-label-a-point/axes/2",
      "units": "/shared/label-stories-label-a-point/units/meters",
      "min": -1,
      "max": 1,
      "nSteps": 10,
      "label": "Distance"
    },
    {
      "url": "/shared/label-stories-label-a-point/axes/3",
      "units": "/shared/label-stories-label-a-point/units/seconds",
      "min": -4,
      "max": 4,
      "nSteps": 16,
      "label": "Time"
    },
    {
      "url": "/shared/label-stories-label-a-point/axes/4",
      "units": "/shared/label-stories-label-a-point/units/meters",
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
          "url": "/shared/label-stories-label-a-point/datadefs/0.8 sin(x)",
          "name": "0.8 sin(x)",
          "activity": "/shared/label-stories-label-a-point",
          "xUnits": "/shared/label-stories-label-a-point/units/seconds",
          "yUnits": "/shared/label-stories-label-a-point/units/meters",
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
          "url": "/shared/label-stories-label-a-point/datarefs/dataref-1",
          "name": "dataref-1",
          "activity": "/shared/label-stories-label-a-point",
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
  "tags": [
    {
      "url": "/shared/label-stories-label-a-point/tags/tag-1",
      "activity": "/shared/label-stories-label-a-point",
      "name": "tag-1"
    }
  ],
  "annotations": [
    {
      "type": "HighlightedPoint",
      "records": [
        {
          "url": "/shared/label-stories-label-a-point/annotations/highlighted-point-1",
          "name": "highlighted-point-1",
          "activity": "/shared/label-stories-label-a-point",
          "datadefName": "0.8 sin(x)",
          "tag": "/shared/label-stories-label-a-point/tags/tag-1",
          "color": "#1f77b4"
        }
      ]
    },
    {
      "type": "LineToAxis",
      "records": [
        {
          "url": "/shared/label-stories-label-a-point/annotations/line-to-axis-1",
          "name": "line-to-axis-1",
          "activity": "/shared/label-stories-label-a-point",
          "datadefName": "0.8 sin(x)",
          "color": "red",
          "xRecord": 1.5708,
          "yRecord": 0.8,
          "axis": "y"
        }
      ]
    },
    {
      "type": "Label",
      "records": [
        {
          "url": "/shared/label-stories-label-a-point/annotations/labeled-point",
          "name": "labeled-point",
          "activity": "/shared/label-stories-label-a-point",
          "text": "New Label"
        }
      ]
    }
  ],
  "variables": [],
  "units": [
    {
      "url": "/shared/label-stories-label-a-point/units/Time",
      "activity": "/shared/label-stories-label-a-point",
      "name": "Time",
      "abbreviation": "s",
      "pluralName": "Time"
    },
    {
      "url": "/shared/label-stories-label-a-point/units/Distance",
      "activity": "/shared/label-stories-label-a-point",
      "name": "Distance",
      "abbreviation": "m",
      "pluralName": "Distance"
    },
    {
      "url": "/shared/label-stories-label-a-point/units/degrees Celsius",
      "activity": "/shared/label-stories-label-a-point",
      "name": "degrees Celsiu",
      "abbreviation": "deg C",
      "pluralName": "degrees Celsius"
    },
    {
      "url": "/shared/label-stories-label-a-point/units/minutes",
      "activity": "/shared/label-stories-label-a-point",
      "name": "minute",
      "abbreviation": "min.",
      "pluralName": "minutes"
    },
    {
      "url": "/shared/label-stories-label-a-point/units/meters",
      "activity": "/shared/label-stories-label-a-point",
      "name": "meter",
      "abbreviation": "m",
      "pluralName": "meters"
    },
    {
      "url": "/shared/label-stories-label-a-point/units/seconds",
      "activity": "/shared/label-stories-label-a-point",
      "name": "second",
      "abbreviation": "s",
      "pluralName": "seconds"
    },
    {
      "url": "/shared/label-stories-label-a-point/units/centimeters",
      "activity": "/shared/label-stories-label-a-point",
      "name": "centimeter",
      "abbreviation": "cm",
      "pluralName": "centimeters"
    },
    {
      "url": "/shared/label-stories-label-a-point/units/grams",
      "activity": "/shared/label-stories-label-a-point",
      "name": "gram",
      "abbreviation": "gr",
      "pluralName": "grams"
    },
    {
      "url": "/shared/label-stories-label-a-point/units/miles",
      "activity": "/shared/label-stories-label-a-point",
      "name": "mile",
      "abbreviation": "mi",
      "pluralName": "miles"
    },
    {
      "url": "/shared/label-stories-label-a-point/units/hours",
      "activity": "/shared/label-stories-label-a-point",
      "name": "hour",
      "abbreviation": "hr",
      "pluralName": "hours"
    },
    {
      "url": "/shared/label-stories-label-a-point/units/Celsius",
      "activity": "/shared/label-stories-label-a-point",
      "name": "Celsiu",
      "abbreviation": "° C.",
      "pluralName": "Celsius"
    },
    {
      "url": "/shared/label-stories-label-a-point/units/dollars",
      "activity": "/shared/label-stories-label-a-point",
      "name": "dollar",
      "abbreviation": "$",
      "pluralName": "dollars"
    },
    {
      "url": "/shared/label-stories-label-a-point/units/inches",
      "activity": "/shared/label-stories-label-a-point",
      "name": "inche",
      "abbreviation": "in",
      "pluralName": "inches"
    },
    {
      "url": "/shared/label-stories-label-a-point/units/years",
      "activity": "/shared/label-stories-label-a-point",
      "name": "year",
      "abbreviation": "yr",
      "pluralName": "years"
    },
    {
      "url": "/shared/label-stories-label-a-point/units/millimeters",
      "activity": "/shared/label-stories-label-a-point",
      "name": "millimeter",
      "abbreviation": "mm",
      "pluralName": "millimeters"
    },
    {
      "url": "/shared/label-stories-label-a-point/units/parts per million",
      "activity": "/shared/label-stories-label-a-point",
      "name": "parts per million",
      "abbreviation": "ppm",
      "pluralName": "parts per million"
    },
    {
      "url": "/shared/label-stories-label-a-point/units/meters per second",
      "activity": "/shared/label-stories-label-a-point",
      "name": "meters per second",
      "abbreviation": "m/s",
      "pluralName": "meters per second"
    }
  ]
}
