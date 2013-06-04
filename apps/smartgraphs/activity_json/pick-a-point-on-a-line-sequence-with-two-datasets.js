/*globals Smartgraphs */

Smartgraphs.activityDocs = Smartgraphs.activityDocs || {};
Smartgraphs.activityDocs["/shared/pick-a-point-on-a-line-sequence-with-two-datasets"] =
{
  "_id": "pick-a-point-on-a-line-sequence-with-two-datasets.df6",
  "_rev": 1,
  "data_format_version": 6,
  "activity": {
    "title": "Pick a point on a line sequence with two datasets",
    "url": "/shared/pick-a-point-on-a-line-sequence-with-two-datasets",
    "owner": "shared",
    "pages": [
      "/shared/pick-a-point-on-a-line-sequence-with-two-datasets/page/1-first-page"
    ],
    "axes": [
      "/shared/pick-a-point-on-a-line-sequence-with-two-datasets/axes/1",
      "/shared/pick-a-point-on-a-line-sequence-with-two-datasets/axes/2"
    ]
  },
  "pages": [
    {
      "name": "First Page",
      "url": "/shared/pick-a-point-on-a-line-sequence-with-two-datasets/page/1-first-page",
      "activity": "/shared/pick-a-point-on-a-line-sequence-with-two-datasets",
      "index": 1,
      "introText": "<p>This is an example of an accelerating car and a ball rolling on a slope.</p>",
      "steps": [
        "/shared/pick-a-point-on-a-line-sequence-with-two-datasets/page/1-first-page/step/1",
        "/shared/pick-a-point-on-a-line-sequence-with-two-datasets/page/1-first-page/step/2",
        "/shared/pick-a-point-on-a-line-sequence-with-two-datasets/page/1-first-page/step/3",
        "/shared/pick-a-point-on-a-line-sequence-with-two-datasets/page/1-first-page/step/4",
        "/shared/pick-a-point-on-a-line-sequence-with-two-datasets/page/1-first-page/step/5"
      ],
      "firstStep": "/shared/pick-a-point-on-a-line-sequence-with-two-datasets/page/1-first-page/step/1",
      "contextVars": []
    }
  ],
  "steps": [
    {
      "url": "/shared/pick-a-point-on-a-line-sequence-with-two-datasets/page/1-first-page/step/1",
      "activityPage": "/shared/pick-a-point-on-a-line-sequence-with-two-datasets/page/1-first-page",
      "beforeText": "Click on the point where distance covered by the car is between 22 and 42",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "The Graph",
          "xAxis": "/shared/pick-a-point-on-a-line-sequence-with-two-datasets/axes/1",
          "yAxis": "/shared/pick-a-point-on-a-line-sequence-with-two-datasets/axes/2",
          "annotations": [
            "segment-overlay-1",
            "highlighted-point-1"
          ],
          "highlightedAnnotations": [],
          "data": [
            "RollingBall",
            "SmallCar"
          ],
          "datarefs": [
            "dataref-1"
          ],
          "legends": [
            "RollingBall",
            "SmallCar"
          ],
          "activeDatadefs": [
            "SmallCar"
          ]
        },
        "bottom": {
          "type": "table",
          "data": "SmallCar",
          "xLabel": "Seconds",
          "yLabel": "Meters",
          "annotations": [
            "highlighted-point-1"
          ],
          "highlightedAnnotations": []
        }
      },
      "tools": [
        {
          "name": "tagging",
          "setup": {
            "tag": "tag-1",
            "data": "SmallCar"
          }
        }
      ],
      "submitButtonTitle": "Check My Answer",
      "defaultBranch": "/shared/pick-a-point-on-a-line-sequence-with-two-datasets/page/1-first-page/step/2",
      "responseBranches": [
        {
          "criterion": [
            "coordinatesInRange",
            "tag-1",
            6,
            null,
            8,
            null
          ],
          "step": "/shared/pick-a-point-on-a-line-sequence-with-two-datasets/page/1-first-page/step/5"
        }
      ],
      "isFinalStep": false
    },
    {
      "url": "/shared/pick-a-point-on-a-line-sequence-with-two-datasets/page/1-first-page/step/2",
      "activityPage": "/shared/pick-a-point-on-a-line-sequence-with-two-datasets/page/1-first-page",
      "beforeText": "Look at the graph...",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "The Graph",
          "xAxis": "/shared/pick-a-point-on-a-line-sequence-with-two-datasets/axes/1",
          "yAxis": "/shared/pick-a-point-on-a-line-sequence-with-two-datasets/axes/2",
          "annotations": [
            "segment-overlay-2",
            "highlighted-point-1"
          ],
          "highlightedAnnotations": [],
          "data": [
            "RollingBall",
            "SmallCar"
          ],
          "datarefs": [
            "dataref-1"
          ],
          "legends": [
            "RollingBall",
            "SmallCar"
          ],
          "activeDatadefs": [
            "SmallCar"
          ]
        },
        "bottom": {
          "type": "table",
          "data": "SmallCar",
          "xLabel": "Seconds",
          "yLabel": "Meters",
          "annotations": [
            "highlighted-point-1"
          ],
          "highlightedAnnotations": []
        }
      },
      "tools": [
        {
          "name": "tagging",
          "setup": {
            "tag": "tag-1",
            "data": "SmallCar"
          }
        }
      ],
      "submitButtonTitle": "Check My Answer",
      "defaultBranch": "/shared/pick-a-point-on-a-line-sequence-with-two-datasets/page/1-first-page/step/3",
      "responseBranches": [
        {
          "criterion": [
            "coordinatesInRange",
            "tag-1",
            6,
            null,
            8,
            null
          ],
          "step": "/shared/pick-a-point-on-a-line-sequence-with-two-datasets/page/1-first-page/step/5"
        }
      ],
      "isFinalStep": false
    },
    {
      "url": "/shared/pick-a-point-on-a-line-sequence-with-two-datasets/page/1-first-page/step/3",
      "activityPage": "/shared/pick-a-point-on-a-line-sequence-with-two-datasets/page/1-first-page",
      "beforeText": "In these two intervals....",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "The Graph",
          "xAxis": "/shared/pick-a-point-on-a-line-sequence-with-two-datasets/axes/1",
          "yAxis": "/shared/pick-a-point-on-a-line-sequence-with-two-datasets/axes/2",
          "annotations": [
            "segment-overlay-3",
            "highlighted-point-1"
          ],
          "highlightedAnnotations": [],
          "data": [
            "RollingBall",
            "SmallCar"
          ],
          "datarefs": [
            "dataref-1"
          ],
          "legends": [
            "RollingBall",
            "SmallCar"
          ],
          "activeDatadefs": [
            "SmallCar"
          ]
        },
        "bottom": {
          "type": "table",
          "data": "SmallCar",
          "xLabel": "Seconds",
          "yLabel": "Meters",
          "annotations": [
            "highlighted-point-1"
          ],
          "highlightedAnnotations": []
        }
      },
      "tools": [
        {
          "name": "tagging",
          "setup": {
            "tag": "tag-1",
            "data": "SmallCar"
          }
        }
      ],
      "submitButtonTitle": "Check My Answer",
      "defaultBranch": "/shared/pick-a-point-on-a-line-sequence-with-two-datasets/page/1-first-page/step/4",
      "responseBranches": [
        {
          "criterion": [
            "coordinatesInRange",
            "tag-1",
            6,
            null,
            8,
            null
          ],
          "step": "/shared/pick-a-point-on-a-line-sequence-with-two-datasets/page/1-first-page/step/5"
        }
      ],
      "isFinalStep": false
    },
    {
      "url": "/shared/pick-a-point-on-a-line-sequence-with-two-datasets/page/1-first-page/step/4",
      "activityPage": "/shared/pick-a-point-on-a-line-sequence-with-two-datasets/page/1-first-page",
      "beforeText": "If you look carefully, ....",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "The Graph",
          "xAxis": "/shared/pick-a-point-on-a-line-sequence-with-two-datasets/axes/1",
          "yAxis": "/shared/pick-a-point-on-a-line-sequence-with-two-datasets/axes/2",
          "annotations": [
            "segment-overlay-4"
          ],
          "highlightedAnnotations": [],
          "data": [
            "RollingBall",
            "SmallCar"
          ],
          "datarefs": [
            "dataref-1"
          ],
          "legends": [
            "RollingBall",
            "SmallCar"
          ],
          "activeDatadefs": [
            "SmallCar"
          ]
        },
        "bottom": {
          "type": "table",
          "data": "SmallCar",
          "xLabel": "Seconds",
          "yLabel": "Meters",
          "annotations": [],
          "highlightedAnnotations": []
        }
      },
      "isFinalStep": true,
      "nextButtonShouldSubmit": true
    },
    {
      "url": "/shared/pick-a-point-on-a-line-sequence-with-two-datasets/page/1-first-page/step/5",
      "activityPage": "/shared/pick-a-point-on-a-line-sequence-with-two-datasets/page/1-first-page",
      "beforeText": "Four minutes into her run ....",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "The Graph",
          "xAxis": "/shared/pick-a-point-on-a-line-sequence-with-two-datasets/axes/1",
          "yAxis": "/shared/pick-a-point-on-a-line-sequence-with-two-datasets/axes/2",
          "annotations": [
            "segment-overlay-5"
          ],
          "highlightedAnnotations": [],
          "data": [
            "RollingBall",
            "SmallCar"
          ],
          "datarefs": [
            "dataref-1"
          ],
          "legends": [
            "RollingBall",
            "SmallCar"
          ],
          "activeDatadefs": [
            "SmallCar"
          ]
        },
        "bottom": {
          "type": "table",
          "data": "SmallCar",
          "xLabel": "Seconds",
          "yLabel": "Meters",
          "annotations": [],
          "highlightedAnnotations": []
        }
      },
      "isFinalStep": true,
      "nextButtonShouldSubmit": true
    }
  ],
  "responseTemplates": [],
  "axes": [
    {
      "url": "/shared/pick-a-point-on-a-line-sequence-with-two-datasets/axes/1",
      "units": "/shared/pick-a-point-on-a-line-sequence-with-two-datasets/units/seconds",
      "min": 0,
      "max": 10,
      "nSteps": 10,
      "label": "Time elapsed"
    },
    {
      "url": "/shared/pick-a-point-on-a-line-sequence-with-two-datasets/axes/2",
      "units": "/shared/pick-a-point-on-a-line-sequence-with-two-datasets/units/meters",
      "min": 0,
      "max": 100,
      "nSteps": 10,
      "label": "Distance covered"
    }
  ],
  "datadefs": [
    {
      "type": "UnorderedDataPoints",
      "records": [
        {
          "url": "/shared/pick-a-point-on-a-line-sequence-with-two-datasets/datadefs/RollingBall",
          "name": "RollingBall",
          "activity": "/shared/pick-a-point-on-a-line-sequence-with-two-datasets",
          "xUnits": "/shared/pick-a-point-on-a-line-sequence-with-two-datasets/units/seconds",
          "yUnits": "/shared/pick-a-point-on-a-line-sequence-with-two-datasets/units/meters",
          "points": [],
          "pointType": "none",
          "lineType": "connected",
          "lineSnapDistance": 0.5
        },
        {
          "url": "/shared/pick-a-point-on-a-line-sequence-with-two-datasets/datadefs/SmallCar",
          "name": "SmallCar",
          "activity": "/shared/pick-a-point-on-a-line-sequence-with-two-datasets",
          "xUnits": "/shared/pick-a-point-on-a-line-sequence-with-two-datasets/units/seconds",
          "yUnits": "/shared/pick-a-point-on-a-line-sequence-with-two-datasets/units/meters",
          "points": [
            [
              0,
              0
            ],
            [
              1,
              0.5
            ],
            [
              2,
              2
            ],
            [
              3,
              5
            ],
            [
              4,
              9
            ],
            [
              5,
              15
            ],
            [
              6,
              22
            ],
            [
              7,
              30
            ],
            [
              8,
              42
            ],
            [
              9,
              58
            ],
            [
              10,
              78
            ]
          ],
          "pointType": "dot",
          "lineType": "none",
          "lineSnapDistance": 0
        }
      ]
    }
  ],
  "datarefs": [
    {
      "type": "CompositeEquation",
      "records": [
        {
          "url": "/shared/pick-a-point-on-a-line-sequence-with-two-datasets/datarefs/dataref-1",
          "name": "dataref-1",
          "activity": "/shared/pick-a-point-on-a-line-sequence-with-two-datasets",
          "datadefName": "RollingBall",
          "expression": "y = 2.5 * x + x",
          "xInterval": 0.01,
          "params": {}
        }
      ]
    }
  ],
  "tags": [
    {
      "url": "/shared/pick-a-point-on-a-line-sequence-with-two-datasets/tags/tag-1",
      "activity": "/shared/pick-a-point-on-a-line-sequence-with-two-datasets",
      "name": "tag-1"
    }
  ],
  "annotations": [
    {
      "type": "HighlightedPoint",
      "records": [
        {
          "url": "/shared/pick-a-point-on-a-line-sequence-with-two-datasets/annotations/highlighted-point-1",
          "name": "highlighted-point-1",
          "activity": "/shared/pick-a-point-on-a-line-sequence-with-two-datasets",
          "datadefName": "SmallCar",
          "tag": "/shared/pick-a-point-on-a-line-sequence-with-two-datasets/tags/tag-1",
          "color": "#1f77b4"
        }
      ]
    },
    {
      "type": "SegmentOverlay",
      "records": [
        {
          "url": "/shared/pick-a-point-on-a-line-sequence-with-two-datasets/annotations/segment-overlay-1",
          "name": "segment-overlay-1",
          "activity": "/shared/pick-a-point-on-a-line-sequence-with-two-datasets",
          "datadefName": "SmallCar",
          "color": "#000000",
          "x1Record": 6,
          "x2Record": 8
        },
        {
          "url": "/shared/pick-a-point-on-a-line-sequence-with-two-datasets/annotations/segment-overlay-2",
          "name": "segment-overlay-2",
          "activity": "/shared/pick-a-point-on-a-line-sequence-with-two-datasets",
          "datadefName": "SmallCar",
          "color": "#ff0000",
          "x1Record": 6,
          "x2Record": 8
        },
        {
          "url": "/shared/pick-a-point-on-a-line-sequence-with-two-datasets/annotations/segment-overlay-3",
          "name": "segment-overlay-3",
          "activity": "/shared/pick-a-point-on-a-line-sequence-with-two-datasets",
          "datadefName": "SmallCar",
          "color": "#00ff00",
          "x1Record": 6,
          "x2Record": 8
        },
        {
          "url": "/shared/pick-a-point-on-a-line-sequence-with-two-datasets/annotations/segment-overlay-4",
          "name": "segment-overlay-4",
          "activity": "/shared/pick-a-point-on-a-line-sequence-with-two-datasets",
          "datadefName": "SmallCar",
          "color": "#000000",
          "x1Record": 6,
          "x2Record": 8
        },
        {
          "url": "/shared/pick-a-point-on-a-line-sequence-with-two-datasets/annotations/segment-overlay-5",
          "name": "segment-overlay-5",
          "activity": "/shared/pick-a-point-on-a-line-sequence-with-two-datasets",
          "datadefName": "SmallCar",
          "color": "#000000",
          "x1Record": 6,
          "x2Record": 8
        }
      ]
    }
  ],
  "variables": [],
  "units": [
    {
      "url": "/shared/pick-a-point-on-a-line-sequence-with-two-datasets/units/meters",
      "activity": "/shared/pick-a-point-on-a-line-sequence-with-two-datasets",
      "name": "meter",
      "abbreviation": "m",
      "pluralName": "meters"
    },
    {
      "url": "/shared/pick-a-point-on-a-line-sequence-with-two-datasets/units/minutes",
      "activity": "/shared/pick-a-point-on-a-line-sequence-with-two-datasets",
      "name": "minute",
      "abbreviation": "m",
      "pluralName": "minutes"
    },
    {
      "url": "/shared/pick-a-point-on-a-line-sequence-with-two-datasets/units/meters per second",
      "activity": "/shared/pick-a-point-on-a-line-sequence-with-two-datasets",
      "name": "meters per second",
      "abbreviation": "m/s",
      "pluralName": "meters per second"
    },
    {
      "url": "/shared/pick-a-point-on-a-line-sequence-with-two-datasets/units/seconds",
      "activity": "/shared/pick-a-point-on-a-line-sequence-with-two-datasets",
      "name": "second",
      "abbreviation": "s",
      "pluralName": "seconds"
    }
  ]
}
