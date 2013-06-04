/*globals Smartgraphs */

Smartgraphs.activityDocs = Smartgraphs.activityDocs || {};
Smartgraphs.activityDocs["/shared/line-construction-activity-sample-2"] =
{
  "_id": "line-construction-activity-sample-2.df6",
  "_rev": 1,
  "data_format_version": 6,
  "activity": {
    "title": "Line construction activity Sample 2",
    "url": "/shared/line-construction-activity-sample-2",
    "owner": "shared",
    "pages": [
      "/shared/line-construction-activity-sample-2/page/1-construct-a-line-page-1"
    ],
    "axes": [
      "/shared/line-construction-activity-sample-2/axes/1",
      "/shared/line-construction-activity-sample-2/axes/2"
    ],
    "authorName": "Noah"
  },
  "pages": [
    {
      "name": "Construct a Line: Page 1",
      "url": "/shared/line-construction-activity-sample-2/page/1-construct-a-line-page-1",
      "activity": "/shared/line-construction-activity-sample-2",
      "index": 1,
      "introText": "On this page, students will be asked to construct a line.",
      "steps": [
        "/shared/line-construction-activity-sample-2/page/1-construct-a-line-page-1/step/1",
        "/shared/line-construction-activity-sample-2/page/1-construct-a-line-page-1/step/2",
        "/shared/line-construction-activity-sample-2/page/1-construct-a-line-page-1/step/3",
        "/shared/line-construction-activity-sample-2/page/1-construct-a-line-page-1/step/4",
        "/shared/line-construction-activity-sample-2/page/1-construct-a-line-page-1/step/5"
      ],
      "firstStep": "/shared/line-construction-activity-sample-2/page/1-construct-a-line-page-1/step/1",
      "contextVars": []
    }
  ],
  "steps": [
    {
      "url": "/shared/line-construction-activity-sample-2/page/1-construct-a-line-page-1/step/1",
      "activityPage": "/shared/line-construction-activity-sample-2/page/1-construct-a-line-page-1",
      "beforeText": "Construct a line with y-interept -1.0, with slope -2.0",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Line Construction Graph Pane",
          "xAxis": "/shared/line-construction-activity-sample-2/axes/1",
          "yAxis": "/shared/line-construction-activity-sample-2/axes/2",
          "showCrossHairs": true,
          "showGraphGrid": true,
          "showToolTipCoords": true,
          "annotations": [
            "freehand-sketch-1"
          ],
          "highlightedAnnotations": [],
          "data": [
            "datadef-1"
          ],
          "activeDatadefs": [
          "datadef-1"
          ]
        },
        "bottom": {
          "type": "table",
          "data": "datadef-1",
          "annotations": [],
          "highlightedAnnotations": []
        }
      },
      "tools": [
        {
          "name": "graphing",
          "setup": {
            "pane": "top",
            "shape": "singleLine",
            "annotationName": "freehand-sketch-1",
            "data": "datadef-1"
          }
        }
      ],
      "submitButtonTitle": "Check My Answer",
      "defaultBranch": "/shared/line-construction-activity-sample-2/page/1-construct-a-line-page-1/step/2",
      "submissibilityCriterion": [
        "=",
        [
          "lineCount"
        ],
        1
      ],
      "responseBranches": [
        {
          "criterion": [
            "and",
            [
              "withinAbsTolerance",
              -2,
              [
                "lineSlope",
                "freehand-sketch-1",
                1
              ],
              0.1
            ],
            [
              "withinAbsTolerance",
              -1,
              [
                "yIntercept",
                "freehand-sketch-1",
                1
              ],
              0.1
            ]
          ],
          "step": "/shared/line-construction-activity-sample-2/page/1-construct-a-line-page-1/step/5"
        },
        {
          "criterion": [
            "withinAbsTolerance",
            -2,
            [
              "lineSlope",
              "freehand-sketch-1",
              1
            ],
            0.1
          ],
          "step": "/shared/line-construction-activity-sample-2/page/1-construct-a-line-page-1/step/4"
        },
        {
          "criterion": [
            "withinAbsTolerance",
            -1,
            [
              "yIntercept",
              "freehand-sketch-1",
              1
            ],
            0.1
          ],
          "step": "/shared/line-construction-activity-sample-2/page/1-construct-a-line-page-1/step/3"
        }
      ],
      "isFinalStep": false,
      "substitutedExpressions": []
    },
    {
      "url": "/shared/line-construction-activity-sample-2/page/1-construct-a-line-page-1/step/2",
      "activityPage": "/shared/line-construction-activity-sample-2/page/1-construct-a-line-page-1",
      "beforeText": "<b>Incorrect. Try again.</b><p>Construct a line with y-interept -1.0, with slope -2.0</p>",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Line Construction Graph Pane",
          "xAxis": "/shared/line-construction-activity-sample-2/axes/1",
          "yAxis": "/shared/line-construction-activity-sample-2/axes/2",
          "showCrossHairs": false,
          "showGraphGrid": true,
          "showToolTipCoords": true,
          "annotations": [
            "freehand-sketch-1"
          ],
          "highlightedAnnotations": [],
          "data": [
            "datadef-1"
          ],
          "activeDatadefs": [
          "datadef-1"
          ]
        },
        "bottom": {
          "type": "table",
          "data": "datadef-1",
          "annotations": [],
          "highlightedAnnotations": []
        }
      },
      "tools": [
        {
          "name": "graphing",
          "setup": {
            "pane": "top",
            "shape": "singleLine",
            "annotationName": "freehand-sketch-1",
            "data": "datadef-1"
          }
        }
      ],
      "submitButtonTitle": "Check My Answer",
      "defaultBranch": "/shared/line-construction-activity-sample-2/page/1-construct-a-line-page-1/step/2",
      "submissibilityCriterion": [
        "or",
        [
          "pointMoved",
          "datadef-1",
          1
        ],
        [
          "pointMoved",
          "datadef-1",
          2
        ]
      ],
      "responseBranches": [
        {
          "criterion": [
            "and",
            [
              "withinAbsTolerance",
              -2,
              [
                "lineSlope",
                "freehand-sketch-1",
                1
              ],
              0.1
            ],
            [
              "withinAbsTolerance",
              -1,
              [
                "yIntercept",
                "freehand-sketch-1",
                1
              ],
              0.1
            ]
          ],
          "step": "/shared/line-construction-activity-sample-2/page/1-construct-a-line-page-1/step/5"
        },
        {
          "criterion": [
            "withinAbsTolerance",
            -2,
            [
              "lineSlope",
              "freehand-sketch-1",
              1
            ],
            0.1
          ],
          "step": "/shared/line-construction-activity-sample-2/page/1-construct-a-line-page-1/step/4"
        },
        {
          "criterion": [
            "withinAbsTolerance",
            -1,
            [
              "yIntercept",
              "freehand-sketch-1",
              1
            ],
            0.1
          ],
          "step": "/shared/line-construction-activity-sample-2/page/1-construct-a-line-page-1/step/3"
        }
      ],
      "isFinalStep": false,
      "substitutedExpressions": []
    },
    {
      "url": "/shared/line-construction-activity-sample-2/page/1-construct-a-line-page-1/step/3",
      "activityPage": "/shared/line-construction-activity-sample-2/page/1-construct-a-line-page-1",
      "beforeText": "<b>Incorrect, your slope is wrong.</b><p>Construct a line with y-interept -1.0, with slope -2.0</p>",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Line Construction Graph Pane",
          "xAxis": "/shared/line-construction-activity-sample-2/axes/1",
          "yAxis": "/shared/line-construction-activity-sample-2/axes/2",
          "showCrossHairs": false,
          "showGraphGrid": true,
          "showToolTipCoords": true,
          "annotations": [
            "freehand-sketch-1"
          ],
          "highlightedAnnotations": [],
          "data": [
            "datadef-1"
          ],
          "activeDatadefs": [
          "datadef-1"
          ],
          "activeDatadefs": [
          "datadef-1"
          ]
        },
        "bottom": {
          "type": "table",
          "data": "datadef-1",
          "annotations": [],
          "highlightedAnnotations": []
        }
      },
      "tools": [
        {
          "name": "graphing",
          "setup": {
            "pane": "top",
            "shape": "singleLine",
            "annotationName": "freehand-sketch-1",
            "data": "datadef-1"
          }
        }
      ],
      "submitButtonTitle": "Check My Answer",
      "defaultBranch": "/shared/line-construction-activity-sample-2/page/1-construct-a-line-page-1/step/2",
      "submissibilityCriterion": [
        "or",
        [
          "pointMoved",
          "datadef-1",
          1
        ],
        [
          "pointMoved",
          "datadef-1",
          2
        ]
      ],
      "responseBranches": [
        {
          "criterion": [
            "and",
            [
              "withinAbsTolerance",
              -2,
              [
                "lineSlope",
                "freehand-sketch-1",
                1
              ],
              0.1
            ],
            [
              "withinAbsTolerance",
              -1,
              [
                "yIntercept",
                "freehand-sketch-1",
                1
              ],
              0.1
            ]
          ],
          "step": "/shared/line-construction-activity-sample-2/page/1-construct-a-line-page-1/step/5"
        },
        {
          "criterion": [
            "withinAbsTolerance",
            -2,
            [
              "lineSlope",
              "freehand-sketch-1",
              1
            ],
            0.1
          ],
          "step": "/shared/line-construction-activity-sample-2/page/1-construct-a-line-page-1/step/4"
        },
        {
          "criterion": [
            "withinAbsTolerance",
            -1,
            [
              "yIntercept",
              "freehand-sketch-1",
              1
            ],
            0.1
          ],
          "step": "/shared/line-construction-activity-sample-2/page/1-construct-a-line-page-1/step/3"
        }
      ],
      "isFinalStep": false,
      "substitutedExpressions": []
    },
    {
      "url": "/shared/line-construction-activity-sample-2/page/1-construct-a-line-page-1/step/4",
      "activityPage": "/shared/line-construction-activity-sample-2/page/1-construct-a-line-page-1",
      "beforeText": "<b>Incorrect, your y-intercept is wrong.</b><p>Construct a line with y-interept -1.0, with slope -2.0</p>",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Line Construction Graph Pane",
          "xAxis": "/shared/line-construction-activity-sample-2/axes/1",
          "yAxis": "/shared/line-construction-activity-sample-2/axes/2",
          "showCrossHairs": false,
          "showGraphGrid": true,
          "showToolTipCoords": true,
          "annotations": [
            "freehand-sketch-1"
          ],
          "highlightedAnnotations": [],
          "data": [
            "datadef-1"
          ],
          "activeDatadefs": [
          "datadef-1"
          ]
        },
        "bottom": {
          "type": "table",
          "data": "datadef-1",
          "annotations": [],
          "highlightedAnnotations": []
        }
      },
      "tools": [
        {
          "name": "graphing",
          "setup": {
            "pane": "top",
            "shape": "singleLine",
            "annotationName": "freehand-sketch-1",
            "data": "datadef-1"
          }
        }
      ],
      "submitButtonTitle": "Check My Answer",
      "defaultBranch": "/shared/line-construction-activity-sample-2/page/1-construct-a-line-page-1/step/2",
      "submissibilityCriterion": [
        "or",
        [
          "pointMoved",
          "datadef-1",
          1
        ],
        [
          "pointMoved",
          "datadef-1",
          2
        ]
      ],
      "responseBranches": [
        {
          "criterion": [
            "and",
            [
              "withinAbsTolerance",
              -2,
              [
                "lineSlope",
                "freehand-sketch-1",
                1
              ],
              0.1
            ],
            [
              "withinAbsTolerance",
              -1,
              [
                "yIntercept",
                "freehand-sketch-1",
                1
              ],
              0.1
            ]
          ],
          "step": "/shared/line-construction-activity-sample-2/page/1-construct-a-line-page-1/step/5"
        },
        {
          "criterion": [
            "withinAbsTolerance",
            -2,
            [
              "lineSlope",
              "freehand-sketch-1",
              1
            ],
            0.1
          ],
          "step": "/shared/line-construction-activity-sample-2/page/1-construct-a-line-page-1/step/4"
        },
        {
          "criterion": [
            "withinAbsTolerance",
            -1,
            [
              "yIntercept",
              "freehand-sketch-1",
              1
            ],
            0.1
          ],
          "step": "/shared/line-construction-activity-sample-2/page/1-construct-a-line-page-1/step/3"
        }
      ],
      "isFinalStep": false,
      "substitutedExpressions": []
    },
    {
      "url": "/shared/line-construction-activity-sample-2/page/1-construct-a-line-page-1/step/5",
      "activityPage": "/shared/line-construction-activity-sample-2/page/1-construct-a-line-page-1",
      "beforeText": "<b>Thats Correct</b>",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Line Construction Graph Pane",
          "xAxis": "/shared/line-construction-activity-sample-2/axes/1",
          "yAxis": "/shared/line-construction-activity-sample-2/axes/2",
          "showCrossHairs": false,
          "showGraphGrid": true,
          "showToolTipCoords": false,
          "annotations": [
            "freehand-sketch-1"
          ],
          "highlightedAnnotations": [],
          "data": [
            "datadef-1"
          ],
          "activeDatadefs": [
          "datadef-1"
          ]
        },
        "bottom": {
          "type": "table",
          "data": "datadef-1",
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
      "url": "/shared/line-construction-activity-sample-2/axes/1",
      "min": -5,
      "max": 5,
      "nSteps": 10,
      "label": "x"
    },
    {
      "url": "/shared/line-construction-activity-sample-2/axes/2",
      "min": -5,
      "max": 5,
      "nSteps": 10,
      "label": "y"
    }
  ],
  "datadefs": [
    {
      "type": "UnorderedDataPoints",
      "records": [
        {
          "url": "/shared/line-construction-activity-sample-2/datadefs/datadef-1",
          "name": "datadef-1",
          "activity": "/shared/line-construction-activity-sample-2",
          "xLabel": "x",
          "xShortLabel": "x",
          "yLabel": "y",
          "yShortLabel": "y",
          "points": []
        }
      ]
    }
  ],
  "tags": [],
  "annotations": [
    {
      "type": "FreehandSketch",
      "records": [
        {
          "url": "/shared/line-construction-activity-sample-2/annotations/freehand-sketch-1",
          "name": "freehand-sketch-1",
          "activity": "/shared/line-construction-activity-sample-2",
          "color": "#CC0000",
          "points": []
        }
      ]
    }
  ],
  "variables": [],
  "units": [
    {
      "url": "/shared/line-construction-activity-sample-2/units/meters",
      "activity": "/shared/line-construction-activity-sample-2",
      "name": "meter",
      "abbreviation": "m",
      "pluralName": "meters"
    },
    {
      "url": "/shared/line-construction-activity-sample-2/units/minutes",
      "activity": "/shared/line-construction-activity-sample-2",
      "name": "minute",
      "abbreviation": "m",
      "pluralName": "minutes"
    },
    {
      "url": "/shared/line-construction-activity-sample-2/units/meters per second",
      "activity": "/shared/line-construction-activity-sample-2",
      "name": "meters per second",
      "abbreviation": "m/s",
      "pluralName": "meters per second"
    },
    {
      "url": "/shared/line-construction-activity-sample-2/units/seconds",
      "activity": "/shared/line-construction-activity-sample-2",
      "name": "second",
      "abbreviation": "s",
      "pluralName": "seconds"
    }
  ]
};
