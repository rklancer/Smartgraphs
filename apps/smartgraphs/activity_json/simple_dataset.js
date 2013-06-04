Smartgraphs.activityDocs = Smartgraphs.activityDocs || {};;
Smartgraphs.activityDocs["/shared/simple-dataset-activity"] =
{
  "_id": "simple-dataset-activity.df6",
  "_rev": 1,
  "data_format_version": 6,
  "activity": {
    "title": "XXXXXcopy of Simple Dataset Activity",
    "url": "/shared/simple-dataset-activity",
    "owner": "shared",
    "pages": [
      "/shared/simple-dataset-activity/page/1-1-simple-page-1"
    ],
    "axes": [
      "/shared/simple-dataset-activity/axes/1",
      "/shared/simple-dataset-activity/axes/2"
    ],
    "authorName": "admin"
  },
  "pages": [
    {
      "name": "1 Simple Page 1",
      "url": "/shared/simple-dataset-activity/page/1-1-simple-page-1",
      "activity": "/shared/simple-dataset-activity",
      "index": 1,
      "introText": "Txxxxxjhis is a test",
      "steps": [
        "/shared/simple-dataset-activity/page/1-1-simple-page-1/step/1"
      ],
      "firstStep": "/shared/simple-dataset-activity/page/1-1-simple-page-1/step/1",
      "contextVars": [
        {
          "name": "start-y",
          "value": [
            "coord",
            "y",
            [
              "listItem",
              1,
              [
                "slopeToolOrder",
                "tag-1",
                "tag-2"
              ]
            ]
          ]
        },
        {
          "name": "start-y_str",
          "value": [
            "toFixedString",
            [
              "get",
              "start-y"
            ],
            2
          ]
        },
        {
          "name": "end-y",
          "value": [
            "coord",
            "y",
            [
              "listItem",
              2,
              [
                "slopeToolOrder",
                "tag-1",
                "tag-2"
              ]
            ]
          ]
        },
        {
          "name": "end-y_str",
          "value": [
            "toFixedString",
            [
              "get",
              "end-y"
            ],
            2
          ]
        },
        {
          "name": "change-y",
          "value": [
            "-",
            [
              "get",
              "end-y"
            ],
            [
              "get",
              "start-y"
            ]
          ]
        },
        {
          "name": "change-y_str",
          "value": [
            "toFixedString",
            [
              "get",
              "change-y"
            ],
            2
          ]
        },
        {
          "name": "start-x",
          "value": [
            "coord",
            "x",
            [
              "listItem",
              1,
              [
                "slopeToolOrder",
                "tag-1",
                "tag-2"
              ]
            ]
          ]
        },
        {
          "name": "start-x_str",
          "value": [
            "toFixedString",
            [
              "get",
              "start-x"
            ],
            2
          ]
        },
        {
          "name": "end-x",
          "value": [
            "coord",
            "x",
            [
              "listItem",
              2,
              [
                "slopeToolOrder",
                "tag-1",
                "tag-2"
              ]
            ]
          ]
        },
        {
          "name": "end-x_str",
          "value": [
            "toFixedString",
            [
              "get",
              "end-x"
            ],
            2
          ]
        },
        {
          "name": "change-x",
          "value": [
            "-",
            [
              "get",
              "end-x"
            ],
            [
              "get",
              "start-x"
            ]
          ]
        },
        {
          "name": "change-x_str",
          "value": [
            "toFixedString",
            [
              "get",
              "change-x"
            ],
            2
          ]
        },
        {
          "name": "slope",
          "value": [
            "/",
            [
              "get",
              "change-y"
            ],
            [
              "get",
              "change-x"
            ]
          ]
        },
        {
          "name": "slope_str",
          "value": [
            "toFixedString",
            [
              "get",
              "slope"
            ],
            2
          ]
        }
      ]
    }
  ],
  "steps": [
    {
      "url": "/shared/simple-dataset-activity/page/1-1-simple-page-1/step/1",
      "activityPage": "/shared/simple-dataset-activity/page/1-1-simple-page-1",
      "beforeText": "Some Question",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Piecewise linear function pane",
          "xAxis": "/shared/simple-dataset-activity/axes/1",
          "yAxis": "/shared/simple-dataset-activity/axes/2",
          "showCrossHairs": false,
          "showGraphGrid": true,
          "showToolTipCoords": true,
          "annotations": [],
          "highlightedAnnotations": [],
          "data": [
            "Piecewise linear function"
          ],
          "legends": {
            "title": "legend",
            "type": "name",
            "referenceDatadef": "",
            "datadefs": [
              "Piecewise linear function"
            ]
          },
          "activeDatadefs": [
            "Piecewise linear function"
          ]
        },
        "bottom": {
          "type": "table",
          "data": "Piecewise linear function",
          "xLabel": "xstuff",
          "yLabel": "ystuff",
          "annotations": [],
          "highlightedAnnotations": []
        }
      },
      "submitButtonTitle": "Check My Answer",
      "defaultBranch": "/shared/simple-dataset-activity/page/1-1-simple-page-1/step/2",
      "responseTemplate": "/shared/simple-dataset-activity/response-templates/numeric-1",
      "submissibilityCriterion": [
        "isNumeric",
        [
          "responseField",
          1
        ]
      ],
      "responseBranches": [
        {
          "criterion": [
            "withinAbsTolerance",
            [
              "responseField",
              1
            ],
            2,
            0.2
          ],
          "step": "/shared/simple-dataset-activity/page/1-1-simple-page-1/step/19"
        }
      ],
      "isFinalStep": true,
      "variableAssignments": [
        {
          "name": "student-response-field",
          "value": [
            "responseField",
            1
          ]
        }
      ],
      "substitutedExpressions": []
    },
  ],
  "responseTemplates": [
    {
      "url": "/shared/simple-dataset-activity/response-templates/numeric-1",
      "templateString": "",
      "fieldChoicesList": [
        null
      ],
      "initialValues": [
        ""
      ],
      "fieldTypes": [
        "numeric"
      ]
    }
  ],
  "axes": [
    {
      "url": "/shared/simple-dataset-activity/axes/1",
      "units": "/shared/simple-dataset-activity/units/minutes",
      "min": -10,
      "max": 10,
      "nSteps": 1,
      "label": "X-axis"
    },
    {
      "url": "/shared/simple-dataset-activity/axes/2",
      "units": "/shared/simple-dataset-activity/units/meters",
      "min": -10,
      "max": 10,
      "nSteps": 1,
      "label": "Y-axis"
    }
  ],
  "datadefs": [
    {
      "type": "UnorderedDataPoints",
      "records": [
        {
          "url": "/shared/simple-dataset-activity/datadefs/Piecewise linear function",
          "name": "Piecewise linear function",
          "activity": "/shared/simple-dataset-activity",
          "xUnits": "/shared/simple-dataset-activity/units/minutes",
          "yUnits": "/shared/simple-dataset-activity/units/meters",
          "points": [
            [
              0,
              0
            ],
            [
              2,
              0
            ],
            [
              4,
              4
            ],
            [
              7,
              7
            ]
          ],
          "pointType": "none",
          "lineType": "none",
          "lineSnapDistance": 0.1
        }
      ]
    }
  ],
  "tags": [
    {
      "url": "/shared/simple-dataset-activity/tags/tag-1",
      "activity": "/shared/simple-dataset-activity",
      "name": "tag-1",
      "x": 2,
      "y": 0
    },
    {
      "url": "/shared/simple-dataset-activity/tags/tag-2",
      "activity": "/shared/simple-dataset-activity",
      "name": "tag-2",
      "x": 4,
      "y": 4
    }
  ],
  "annotations": [
    {
      "type": "HighlightedPoint",
      "records": [
        {
          "url": "/shared/simple-dataset-activity/annotations/highlighted-point-1",
          "name": "highlighted-point-1",
          "activity": "/shared/simple-dataset-activity",
          "datadefName": "Piecewise linear function",
          "tag": "/shared/simple-dataset-activity/tags/tag-1",
          "color": "#1f77b4"
        },
        {
          "url": "/shared/simple-dataset-activity/annotations/highlighted-point-2",
          "name": "highlighted-point-2",
          "activity": "/shared/simple-dataset-activity",
          "datadefName": "Piecewise linear function",
          "tag": "/shared/simple-dataset-activity/tags/tag-2",
          "color": "#ff7f0e"
        }
      ]
    },
    {
      "type": "RunArrow",
      "records": [
        {
          "url": "/shared/simple-dataset-activity/annotations/run-arrow1",
          "name": "run-arrow1",
          "activity": "/shared/simple-dataset-activity",
          "color": "#cccccc",
          "datadefName": "Piecewise linear function",
          "p1Tag": "/shared/simple-dataset-activity/tags/tag-1",
          "p2Tag": "/shared/simple-dataset-activity/tags/tag-2"
        }
      ]
    },
    {
      "type": "RiseArrow",
      "records": [
        {
          "url": "/shared/simple-dataset-activity/annotations/rise-arrow1",
          "name": "rise-arrow1",
          "activity": "/shared/simple-dataset-activity",
          "color": "#cccccc",
          "datadefName": "Piecewise linear function",
          "p1Tag": "/shared/simple-dataset-activity/tags/tag-1",
          "p2Tag": "/shared/simple-dataset-activity/tags/tag-2"
        }
      ]
    },
    {
      "type": "RunBracket",
      "records": [
        {
          "url": "/shared/simple-dataset-activity/annotations/run-bracket1",
          "name": "run-bracket1",
          "activity": "/shared/simple-dataset-activity",
          "color": "#cccccc",
          "datadefName": "Piecewise linear function",
          "p1Tag": "/shared/simple-dataset-activity/tags/tag-1",
          "p2Tag": "/shared/simple-dataset-activity/tags/tag-2"
        }
      ]
    },
    {
      "type": "RiseBracket",
      "records": [
        {
          "url": "/shared/simple-dataset-activity/annotations/rise-bracket1",
          "name": "rise-bracket1",
          "activity": "/shared/simple-dataset-activity",
          "color": "#cccccc",
          "datadefName": "Piecewise linear function",
          "p1Tag": "/shared/simple-dataset-activity/tags/tag-1",
          "p2Tag": "/shared/simple-dataset-activity/tags/tag-2"
        }
      ]
    },
    {
      "type": "LineThroughPoints",
      "records": [
        {
          "url": "/shared/simple-dataset-activity/annotations/line-throughpoints1",
          "name": "line-throughpoints1",
          "activity": "/shared/simple-dataset-activity",
          "color": "#1f77b4",
          "datadefName": "Piecewise linear function",
          "p1Tag": "/shared/simple-dataset-activity/tags/tag-1",
          "p2Tag": "/shared/simple-dataset-activity/tags/tag-2"
        }
      ]
    }
  ],
  "variables": [],
  "units": [
    {
      "url": "/shared/simple-dataset-activity/units/Time",
      "activity": "/shared/simple-dataset-activity",
      "name": "Time",
      "abbreviation": "s",
      "pluralName": "Time"
    },
    {
      "url": "/shared/simple-dataset-activity/units/Distance",
      "activity": "/shared/simple-dataset-activity",
      "name": "Distance",
      "abbreviation": "m",
      "pluralName": "Distance"
    },
    {
      "url": "/shared/simple-dataset-activity/units/degrees Celsius",
      "activity": "/shared/simple-dataset-activity",
      "name": "degrees Celsiu",
      "abbreviation": "deg C",
      "pluralName": "degrees Celsius"
    },
    {
      "url": "/shared/simple-dataset-activity/units/minutes",
      "activity": "/shared/simple-dataset-activity",
      "name": "minute",
      "abbreviation": "min.",
      "pluralName": "minutes"
    },
    {
      "url": "/shared/simple-dataset-activity/units/meters",
      "activity": "/shared/simple-dataset-activity",
      "name": "meter",
      "abbreviation": "m",
      "pluralName": "meters"
    },
    {
      "url": "/shared/simple-dataset-activity/units/seconds",
      "activity": "/shared/simple-dataset-activity",
      "name": "second",
      "abbreviation": "s",
      "pluralName": "seconds"
    },
    {
      "url": "/shared/simple-dataset-activity/units/centimeters",
      "activity": "/shared/simple-dataset-activity",
      "name": "centimeter",
      "abbreviation": "cm",
      "pluralName": "centimeters"
    },
    {
      "url": "/shared/simple-dataset-activity/units/grams",
      "activity": "/shared/simple-dataset-activity",
      "name": "gram",
      "abbreviation": "gr",
      "pluralName": "grams"
    },
    {
      "url": "/shared/simple-dataset-activity/units/miles",
      "activity": "/shared/simple-dataset-activity",
      "name": "mile",
      "abbreviation": "mi",
      "pluralName": "miles"
    },
    {
      "url": "/shared/simple-dataset-activity/units/hours",
      "activity": "/shared/simple-dataset-activity",
      "name": "hour",
      "abbreviation": "hr",
      "pluralName": "hours"
    },
    {
      "url": "/shared/simple-dataset-activity/units/Celsius",
      "activity": "/shared/simple-dataset-activity",
      "name": "Celsiu",
      "abbreviation": "° C.",
      "pluralName": "Celsius"
    },
    {
      "url": "/shared/simple-dataset-activity/units/dollars",
      "activity": "/shared/simple-dataset-activity",
      "name": "dollar",
      "abbreviation": "$",
      "pluralName": "dollars"
    },
    {
      "url": "/shared/simple-dataset-activity/units/inches",
      "activity": "/shared/simple-dataset-activity",
      "name": "inche",
      "abbreviation": "in",
      "pluralName": "inches"
    },
    {
      "url": "/shared/simple-dataset-activity/units/years",
      "activity": "/shared/simple-dataset-activity",
      "name": "year",
      "abbreviation": "yr",
      "pluralName": "years"
    },
    {
      "url": "/shared/simple-dataset-activity/units/millimeters",
      "activity": "/shared/simple-dataset-activity",
      "name": "millimeter",
      "abbreviation": "mm",
      "pluralName": "millimeters"
    },
    {
      "url": "/shared/simple-dataset-activity/units/parts per million",
      "activity": "/shared/simple-dataset-activity",
      "name": "parts per million",
      "abbreviation": "ppm",
      "pluralName": "parts per million"
    }
  ]
};