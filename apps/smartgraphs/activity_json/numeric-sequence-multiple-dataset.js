/*globals Smartgraphs */

Smartgraphs.activityDocs = Smartgraphs.activityDocs || {};
Smartgraphs.activityDocs["/shared/numeric-sequence-multiple-dataset"] =
{
  "_id": "numeric-sequence-multiple-dataset.df6",
  "_rev": 1,
  "data_format_version": 6,
  "activity": {
    "title": "numeric sequence multiple dataset",
    "url": "/shared/numeric-sequence-multiple-dataset",
    "owner": "shared",
    "pages": [
      "/shared/numeric-sequence-multiple-dataset/page/1-introduction"
    ],
    "axes": [
      "/shared/numeric-sequence-multiple-dataset/axes/1",
      "/shared/numeric-sequence-multiple-dataset/axes/2"
    ]
  },
  "pages": [
    {
      "name": "Introduction",
      "url": "/shared/numeric-sequence-multiple-dataset/page/1-introduction",
      "activity": "/shared/numeric-sequence-multiple-dataset",
      "index": 1,
      "introText": "Three cars are moving with constant speed....",
      "steps": [
        "/shared/numeric-sequence-multiple-dataset/page/1-introduction/step/1",
        "/shared/numeric-sequence-multiple-dataset/page/1-introduction/step/2",
        "/shared/numeric-sequence-multiple-dataset/page/1-introduction/step/3",
        "/shared/numeric-sequence-multiple-dataset/page/1-introduction/step/4",
        "/shared/numeric-sequence-multiple-dataset/page/1-introduction/step/5"
      ],
      "firstStep": "/shared/numeric-sequence-multiple-dataset/page/1-introduction/step/1",
      "contextVars": []
    }
  ],
  "steps": [
    {
      "url": "/shared/numeric-sequence-multiple-dataset/page/1-introduction/step/1",
      "activityPage": "/shared/numeric-sequence-multiple-dataset/page/1-introduction",
      "beforeText": "<p>How much distance green car covers in 5 seconds?</p>",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Distance vs. Time",
          "xAxis": "/shared/numeric-sequence-multiple-dataset/axes/1",
          "yAxis": "/shared/numeric-sequence-multiple-dataset/axes/2",
          "annotations": [
            "segment-overlay-1"
          ],
          "highlightedAnnotations": [],
          "data": [
            "mercedez",
            "bmw",
            "bently"
          ],
          "datarefs": [
            "dataref-1",
            "dataref-2"
          ],
          "legends": [
            "mercedez",
            "bmw",
            "bently"
          ],
          "activeDatadefs": [
            "bmw"
          ]
        },
        "bottom": {
          "type": "table",
          "data": "bmw",
          "xLabel": "Time",
          "yLabel": "Distance",
          "annotations": [],
          "highlightedAnnotations": []
        }
      },
      "submitButtonTitle": "Check My Answer",
      "defaultBranch": "/shared/numeric-sequence-multiple-dataset/page/1-introduction/step/2",
      "responseTemplate": "/shared/numeric-sequence-multiple-dataset/response-templates/numeric-1",
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
            100,
            0.01
          ],
          "step": "/shared/numeric-sequence-multiple-dataset/page/1-introduction/step/5"
        }
      ],
      "isFinalStep": false
    },
    {
      "url": "/shared/numeric-sequence-multiple-dataset/page/1-introduction/step/2",
      "activityPage": "/shared/numeric-sequence-multiple-dataset/page/1-introduction",
      "beforeText": "<p>Hint: ask yourself, which is the y-axis and which is the x-axis?</p> <p>What is the y-coordinate of the point at the 5 second mark?</p>",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Distance vs. Time",
          "xAxis": "/shared/numeric-sequence-multiple-dataset/axes/1",
          "yAxis": "/shared/numeric-sequence-multiple-dataset/axes/2",
          "annotations": [
            "segment-overlay-2"
          ],
          "highlightedAnnotations": [],
          "data": [
            "mercedez",
            "bmw",
            "bently"
          ],
          "datarefs": [
            "dataref-1",
            "dataref-2"
          ],
          "legends": [
            "mercedez",
            "bmw",
            "bently"
          ],
          "activeDatadefs": [
            "bmw"
          ]
        },
        "bottom": {
          "type": "table",
          "data": "bmw",
          "xLabel": "Time",
          "yLabel": "Distance",
          "annotations": [],
          "highlightedAnnotations": []
        }
      },
      "submitButtonTitle": "Check My Answer",
      "defaultBranch": "/shared/numeric-sequence-multiple-dataset/page/1-introduction/step/3",
      "responseTemplate": "/shared/numeric-sequence-multiple-dataset/response-templates/numeric-1",
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
            100,
            0.01
          ],
          "step": "/shared/numeric-sequence-multiple-dataset/page/1-introduction/step/5"
        }
      ],
      "isFinalStep": false
    },
    {
      "url": "/shared/numeric-sequence-multiple-dataset/page/1-introduction/step/3",
      "activityPage": "/shared/numeric-sequence-multiple-dataset/page/1-introduction",
      "beforeText": "<p>Hint: check the y-Coordinate of Green line at 5 seconds mark</p>",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Distance vs. Time",
          "xAxis": "/shared/numeric-sequence-multiple-dataset/axes/1",
          "yAxis": "/shared/numeric-sequence-multiple-dataset/axes/2",
          "annotations": [
            "segment-overlay-3",
            "segment-overlay-4"
          ],
          "highlightedAnnotations": [],
          "data": [
            "mercedez",
            "bmw",
            "bently"
          ],
          "datarefs": [
            "dataref-1",
            "dataref-2"
          ],
          "legends": [
            "mercedez",
            "bmw",
            "bently"
          ],
          "activeDatadefs": [
            "bmw"
          ]
        },
        "bottom": {
          "type": "table",
          "data": "bmw",
          "xLabel": "Time",
          "yLabel": "Distance",
          "annotations": [],
          "highlightedAnnotations": []
        }
      },
      "submitButtonTitle": "Check My Answer",
      "defaultBranch": "/shared/numeric-sequence-multiple-dataset/page/1-introduction/step/4",
      "responseTemplate": "/shared/numeric-sequence-multiple-dataset/response-templates/numeric-1",
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
            100,
            0.01
          ],
          "step": "/shared/numeric-sequence-multiple-dataset/page/1-introduction/step/5"
        }
      ],
      "isFinalStep": false
    },
    {
      "url": "/shared/numeric-sequence-multiple-dataset/page/1-introduction/step/4",
      "activityPage": "/shared/numeric-sequence-multiple-dataset/page/1-introduction",
      "beforeText": "<p>Take a closer look, it's 100 meters of distance.</p>",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Distance vs. Time",
          "xAxis": "/shared/numeric-sequence-multiple-dataset/axes/1",
          "yAxis": "/shared/numeric-sequence-multiple-dataset/axes/2",
          "annotations": [
            "segment-overlay-5"
          ],
          "highlightedAnnotations": [],
          "data": [
            "mercedez",
            "bmw",
            "bently"
          ],
          "datarefs": [
            "dataref-1",
            "dataref-2"
          ],
          "legends": [
            "mercedez",
            "bmw",
            "bently"
          ],
          "activeDatadefs": [
            "bmw"
          ]
        },
        "bottom": {
          "type": "table",
          "data": "bmw",
          "xLabel": "Time",
          "yLabel": "Distance",
          "annotations": [],
          "highlightedAnnotations": []
        }
      },
      "isFinalStep": true,
      "nextButtonShouldSubmit": true
    },
    {
      "url": "/shared/numeric-sequence-multiple-dataset/page/1-introduction/step/5",
      "activityPage": "/shared/numeric-sequence-multiple-dataset/page/1-introduction",
      "beforeText": "<p>That's right. It is 100 meters of distance.</p>",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Distance vs. Time",
          "xAxis": "/shared/numeric-sequence-multiple-dataset/axes/1",
          "yAxis": "/shared/numeric-sequence-multiple-dataset/axes/2",
          "annotations": [
            "segment-overlay-6"
          ],
          "highlightedAnnotations": [],
          "data": [
            "mercedez",
            "bmw",
            "bently"
          ],
          "datarefs": [
            "dataref-1",
            "dataref-2"
          ],
          "legends": [
            "mercedez",
            "bmw",
            "bently"
          ],
          "activeDatadefs": [
            "bmw"
          ]
        },
        "bottom": {
          "type": "table",
          "data": "bmw",
          "xLabel": "Time",
          "yLabel": "Distance",
          "annotations": [],
          "highlightedAnnotations": []
        }
      },
      "isFinalStep": true,
      "nextButtonShouldSubmit": true
    }
  ],
  "responseTemplates": [
    {
      "url": "/shared/numeric-sequence-multiple-dataset/response-templates/numeric-1",
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
      "url": "/shared/numeric-sequence-multiple-dataset/axes/1",
      "units": "/shared/numeric-sequence-multiple-dataset/units/seconds",
      "min": 0,
      "max": 10,
      "nSteps": 10,
      "label": "Time"
    },
    {
      "url": "/shared/numeric-sequence-multiple-dataset/axes/2",
      "units": "/shared/numeric-sequence-multiple-dataset/units/meters",
      "min": 0,
      "max": 200,
      "nSteps": 10,
      "label": "Distance"
    }
  ],
  "datadefs": [
    {
      "type": "UnorderedDataPoints",
      "records": [
        {
          "url": "/shared/numeric-sequence-multiple-dataset/datadefs/mercedez",
          "name": "mercedez",
          "activity": "/shared/numeric-sequence-multiple-dataset",
          "xUnits": "/shared/numeric-sequence-multiple-dataset/units/seconds",
          "yUnits": "/shared/numeric-sequence-multiple-dataset/units/meters",
          "points": [],
          "pointType": "dot",
          "lineType": "connected",
          "lineSnapDistance": 0.5
        },
        {
          "url": "/shared/numeric-sequence-multiple-dataset/datadefs/bmw",
          "name": "bmw",
          "activity": "/shared/numeric-sequence-multiple-dataset",
          "xUnits": "/shared/numeric-sequence-multiple-dataset/units/seconds",
          "yUnits": "/shared/numeric-sequence-multiple-dataset/units/meters",
          "points": [
            [
              0,
              0
            ],
            [
              1,
              20
            ],
            [
              2,
              40
            ],
            [
              3,
              60
            ],
            [
              4,
              80
            ],
            [
              5,
              100
            ],
            [
              6,
              120
            ],
            [
              7,
              140
            ]
          ],
          "pointType": "dot",
          "lineType": "connected",
          "lineSnapDistance": 0
        },
        {
          "url": "/shared/numeric-sequence-multiple-dataset/datadefs/bently",
          "name": "bently",
          "activity": "/shared/numeric-sequence-multiple-dataset",
          "xUnits": "/shared/numeric-sequence-multiple-dataset/units/seconds",
          "yUnits": "/shared/numeric-sequence-multiple-dataset/units/meters",
          "points": [],
          "pointType": "dot",
          "lineType": "connected",
          "lineSnapDistance": 0.5
        }
      ]
    }
  ],
  "datarefs": [
    {
      "type": "LinearEquation",
      "records": [
        {
          "url": "/shared/numeric-sequence-multiple-dataset/datarefs/dataref-1",
          "name": "dataref-1",
          "activity": "/shared/numeric-sequence-multiple-dataset",
          "datadefName": "mercedez",
          "expressionForm": "slope-intercept",
          "xInterval": 0.5,
          "params": {
            "slope": 50,
            "yIntercept": 5
          }
        },
        {
          "url": "/shared/numeric-sequence-multiple-dataset/datarefs/dataref-2",
          "name": "dataref-2",
          "activity": "/shared/numeric-sequence-multiple-dataset",
          "datadefName": "bently",
          "expressionForm": "slope-intercept",
          "xInterval": 0.5,
          "params": {
            "slope": 100,
            "yIntercept": 2
          }
        }
      ]
    }
  ],
  "tags": [],
  "annotations": [
    {
      "type": "SegmentOverlay",
      "records": [
        {
          "url": "/shared/numeric-sequence-multiple-dataset/annotations/segment-overlay-1",
          "name": "segment-overlay-1",
          "activity": "/shared/numeric-sequence-multiple-dataset",
          "datadefName": "bmw",
          "color": "#000000",
          "x1Record": 1,
          "x2Record": 2
        },
        {
          "url": "/shared/numeric-sequence-multiple-dataset/annotations/segment-overlay-2",
          "name": "segment-overlay-2",
          "activity": "/shared/numeric-sequence-multiple-dataset",
          "datadefName": "bmw",
          "color": "#ff0000",
          "x1Record": 1,
          "x2Record": 3
        },
        {
          "url": "/shared/numeric-sequence-multiple-dataset/annotations/segment-overlay-3",
          "name": "segment-overlay-3",
          "activity": "/shared/numeric-sequence-multiple-dataset",
          "datadefName": "bmw",
          "color": "#00ff00",
          "x1Record": 3,
          "isUnboundedLeft": true
        },
        {
          "url": "/shared/numeric-sequence-multiple-dataset/annotations/segment-overlay-4",
          "name": "segment-overlay-4",
          "activity": "/shared/numeric-sequence-multiple-dataset",
          "datadefName": "bmw",
          "color": "#0000ff",
          "x1Record": 4,
          "isUnboundedRight": true
        },
        {
          "url": "/shared/numeric-sequence-multiple-dataset/annotations/segment-overlay-5",
          "name": "segment-overlay-5",
          "activity": "/shared/numeric-sequence-multiple-dataset",
          "datadefName": "bmw",
          "color": "#000000",
          "x1Record": 1,
          "x2Record": 2
        },
        {
          "url": "/shared/numeric-sequence-multiple-dataset/annotations/segment-overlay-6",
          "name": "segment-overlay-6",
          "activity": "/shared/numeric-sequence-multiple-dataset",
          "datadefName": "bmw",
          "color": "#ffffff",
          "x1Record": 1,
          "x2Record": 2
        }
      ]
    }
  ],
  "variables": [],
  "units": [
    {
      "url": "/shared/numeric-sequence-multiple-dataset/units/meters",
      "activity": "/shared/numeric-sequence-multiple-dataset",
      "name": "meter",
      "abbreviation": "m",
      "pluralName": "meters"
    },
    {
      "url": "/shared/numeric-sequence-multiple-dataset/units/seconds",
      "activity": "/shared/numeric-sequence-multiple-dataset",
      "name": "second",
      "abbreviation": "s",
      "pluralName": "seconds"
    }
  ]
}
