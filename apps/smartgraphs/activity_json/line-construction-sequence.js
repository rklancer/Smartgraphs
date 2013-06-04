/*globals Smartgraphs */

Smartgraphs.activityDocs = Smartgraphs.activityDocs || {};
Smartgraphs.activityDocs["/shared/activity-with-a-line-construction-tool"] =
{
  "_id": "activity-with-a-line-construction-tool.df6",
  "_rev": 1,
  "data_format_version": 6,
  "activity": {
    "title": "Activity with a line construction tool",
    "url": "/shared/activity-with-a-line-construction-tool",
    "owner": "shared",
    "pages": [
      "/shared/activity-with-a-line-construction-tool/page/1-construct-a-line-page-1"
    ],
    "axes": [
      "/shared/activity-with-a-line-construction-tool/axes/1",
      "/shared/activity-with-a-line-construction-tool/axes/2"
    ],
    "authorName": "Noah"
  },
  "pages": [
    {
      "name": "Construct a Line: Page 1",
      "url": "/shared/activity-with-a-line-construction-tool/page/1-construct-a-line-page-1",
      "activity": "/shared/activity-with-a-line-construction-tool",
      "index": 1,
      "introText": "On this page, students will be asked to construct a line.",
      "steps": [
        "/shared/activity-with-a-line-construction-tool/page/1-construct-a-line-page-1/step/1",
        "/shared/activity-with-a-line-construction-tool/page/1-construct-a-line-page-1/step/2",
        "/shared/activity-with-a-line-construction-tool/page/1-construct-a-line-page-1/step/3",
        "/shared/activity-with-a-line-construction-tool/page/1-construct-a-line-page-1/step/4",
        "/shared/activity-with-a-line-construction-tool/page/1-construct-a-line-page-1/step/5"
      ],
      "firstStep": "/shared/activity-with-a-line-construction-tool/page/1-construct-a-line-page-1/step/1",
      "contextVars": []
    }
  ],
  "steps": [
    {
      "url": "/shared/activity-with-a-line-construction-tool/page/1-construct-a-line-page-1/step/1",
      "activityPage": "/shared/activity-with-a-line-construction-tool/page/1-construct-a-line-page-1",
      "beforeText": "Construct a line with y-interept 0.0, with slope 1.0",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Line Construction Graph Pane",
          "xAxis": "/shared/activity-with-a-line-construction-tool/axes/1",
          "yAxis": "/shared/activity-with-a-line-construction-tool/axes/2",
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
      "defaultBranch": "/shared/activity-with-a-line-construction-tool/page/1-construct-a-line-page-1/step/2",
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
              1,
              [
                "lineSlope",
                "freehand-sketch-1",
                1
              ],
              0.1
            ],
            [
              "withinAbsTolerance",
              0,
              [
                "yIntercept",
                "freehand-sketch-1",
                1
              ],
              0.1
            ]
          ],
          "step": "/shared/activity-with-a-line-construction-tool/page/1-construct-a-line-page-1/step/5"
        },
        {
          "criterion": [
            "withinAbsTolerance",
            1,
            [
              "lineSlope",
              "freehand-sketch-1",
              1
            ],
            0.1
          ],
          "step": "/shared/activity-with-a-line-construction-tool/page/1-construct-a-line-page-1/step/4"
        },
        {
          "criterion": [
            "withinAbsTolerance",
            0,
            [
              "yIntercept",
              "freehand-sketch-1",
              1
            ],
            0.1
          ],
          "step": "/shared/activity-with-a-line-construction-tool/page/1-construct-a-line-page-1/step/3"
        }
      ],
      "isFinalStep": false,
      "substitutedExpressions": []
    },
    {
      "url": "/shared/activity-with-a-line-construction-tool/page/1-construct-a-line-page-1/step/2",
      "activityPage": "/shared/activity-with-a-line-construction-tool/page/1-construct-a-line-page-1",
      "beforeText": "<b>Incorrect. Try again.</b><p>Construct a line with y-interept 0.0, with slope 1.0</p>",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Line Construction Graph Pane",
          "xAxis": "/shared/activity-with-a-line-construction-tool/axes/1",
          "yAxis": "/shared/activity-with-a-line-construction-tool/axes/2",
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
      "defaultBranch": "/shared/activity-with-a-line-construction-tool/page/1-construct-a-line-page-1/step/2",
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
              1,
              [
                "lineSlope",
                "freehand-sketch-1",
                1
              ],
              0.1
            ],
            [
              "withinAbsTolerance",
              0,
              [
                "yIntercept",
                "freehand-sketch-1",
                1
              ],
              0.1
            ]
          ],
          "step": "/shared/activity-with-a-line-construction-tool/page/1-construct-a-line-page-1/step/5"
        },
        {
          "criterion": [
            "withinAbsTolerance",
            1,
            [
              "lineSlope",
              "freehand-sketch-1",
              1
            ],
            0.1
          ],
          "step": "/shared/activity-with-a-line-construction-tool/page/1-construct-a-line-page-1/step/4"
        },
        {
          "criterion": [
            "withinAbsTolerance",
            0,
            [
              "yIntercept",
              "freehand-sketch-1",
              1
            ],
            0.1
          ],
          "step": "/shared/activity-with-a-line-construction-tool/page/1-construct-a-line-page-1/step/3"
        }
      ],
      "isFinalStep": false,
      "substitutedExpressions": []
    },
    {
      "url": "/shared/activity-with-a-line-construction-tool/page/1-construct-a-line-page-1/step/3",
      "activityPage": "/shared/activity-with-a-line-construction-tool/page/1-construct-a-line-page-1",
      "beforeText": "<b>Incorrect, your slope is wrong.</b><p>Construct a line with y-interept 0.0, with slope 1.0</p>",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Line Construction Graph Pane",
          "xAxis": "/shared/activity-with-a-line-construction-tool/axes/1",
          "yAxis": "/shared/activity-with-a-line-construction-tool/axes/2",
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
      "defaultBranch": "/shared/activity-with-a-line-construction-tool/page/1-construct-a-line-page-1/step/2",
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
              1,
              [
                "lineSlope",
                "freehand-sketch-1",
                1
              ],
              0.1
            ],
            [
              "withinAbsTolerance",
              0,
              [
                "yIntercept",
                "freehand-sketch-1",
                1
              ],
              0.1
            ]
          ],
          "step": "/shared/activity-with-a-line-construction-tool/page/1-construct-a-line-page-1/step/5"
        },
        {
          "criterion": [
            "withinAbsTolerance",
            1,
            [
              "lineSlope",
              "freehand-sketch-1",
              1
            ],
            0.1
          ],
          "step": "/shared/activity-with-a-line-construction-tool/page/1-construct-a-line-page-1/step/4"
        },
        {
          "criterion": [
            "withinAbsTolerance",
            0,
            [
              "yIntercept",
              "freehand-sketch-1",
              1
            ],
            0.1
          ],
          "step": "/shared/activity-with-a-line-construction-tool/page/1-construct-a-line-page-1/step/3"
        }
      ],
      "isFinalStep": false,
      "substitutedExpressions": []
    },
    {
      "url": "/shared/activity-with-a-line-construction-tool/page/1-construct-a-line-page-1/step/4",
      "activityPage": "/shared/activity-with-a-line-construction-tool/page/1-construct-a-line-page-1",
      "beforeText": "<b>Incorrect, your y-intercept is wrong.</b><p>Construct a line with y-interept 0.0, with slope 1.0</p>",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Line Construction Graph Pane",
          "xAxis": "/shared/activity-with-a-line-construction-tool/axes/1",
          "yAxis": "/shared/activity-with-a-line-construction-tool/axes/2",
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
      "defaultBranch": "/shared/activity-with-a-line-construction-tool/page/1-construct-a-line-page-1/step/2",
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
              1,
              [
                "lineSlope",
                "freehand-sketch-1",
                1
              ],
              0.1
            ],
            [
              "withinAbsTolerance",
              0,
              [
                "yIntercept",
                "freehand-sketch-1",
                1
              ],
              0.1
            ]
          ],
          "step": "/shared/activity-with-a-line-construction-tool/page/1-construct-a-line-page-1/step/5"
        },
        {
          "criterion": [
            "withinAbsTolerance",
            1,
            [
              "lineSlope",
              "freehand-sketch-1",
              1
            ],
            0.1
          ],
          "step": "/shared/activity-with-a-line-construction-tool/page/1-construct-a-line-page-1/step/4"
        },
        {
          "criterion": [
            "withinAbsTolerance",
            0,
            [
              "yIntercept",
              "freehand-sketch-1",
              1
            ],
            0.1
          ],
          "step": "/shared/activity-with-a-line-construction-tool/page/1-construct-a-line-page-1/step/3"
        }
      ],
      "isFinalStep": false,
      "substitutedExpressions": []
    },
    {
      "url": "/shared/activity-with-a-line-construction-tool/page/1-construct-a-line-page-1/step/5",
      "activityPage": "/shared/activity-with-a-line-construction-tool/page/1-construct-a-line-page-1",
      "beforeText": "<b>Thats Correct</b>",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Line Construction Graph Pane",
          "xAxis": "/shared/activity-with-a-line-construction-tool/axes/1",
          "yAxis": "/shared/activity-with-a-line-construction-tool/axes/2",
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
      "url": "/shared/activity-with-a-line-construction-tool/axes/1",
      "min": 0,
      "max": 10,
      "nSteps": 10,
      "label": "x"
    },
    {
      "url": "/shared/activity-with-a-line-construction-tool/axes/2",
      "min": 0,
      "max": 10,
      "nSteps": 10,
      "label": "y"
    }
  ],
  "datadefs": [
    {
      "type": "UnorderedDataPoints",
      "records": [
        {
          "url": "/shared/activity-with-a-line-construction-tool/datadefs/datadef-1",
          "name": "datadef-1",
          "activity": "/shared/activity-with-a-line-construction-tool",
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
          "url": "/shared/activity-with-a-line-construction-tool/annotations/freehand-sketch-1",
          "name": "freehand-sketch-1",
          "activity": "/shared/activity-with-a-line-construction-tool",
          "color": "#CC0000",
          "points": []
        }
      ]
    }
  ],
  "variables": [],
  "units": [
    {
      "url": "/shared/activity-with-a-line-construction-tool/units/meters",
      "activity": "/shared/activity-with-a-line-construction-tool",
      "name": "meter",
      "abbreviation": "m",
      "pluralName": "meters"
    },
    {
      "url": "/shared/activity-with-a-line-construction-tool/units/minutes",
      "activity": "/shared/activity-with-a-line-construction-tool",
      "name": "minute",
      "abbreviation": "m",
      "pluralName": "minutes"
    },
    {
      "url": "/shared/activity-with-a-line-construction-tool/units/meters per second",
      "activity": "/shared/activity-with-a-line-construction-tool",
      "name": "meters per second",
      "abbreviation": "m/s",
      "pluralName": "meters per second"
    },
    {
      "url": "/shared/activity-with-a-line-construction-tool/units/seconds",
      "activity": "/shared/activity-with-a-line-construction-tool",
      "name": "second",
      "abbreviation": "s",
      "pluralName": "seconds"
    }
  ]
};
