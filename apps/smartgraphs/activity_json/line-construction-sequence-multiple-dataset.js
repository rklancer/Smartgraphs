/*globals Smartgraphs */

Smartgraphs.activityDocs = Smartgraphs.activityDocs || {};
Smartgraphs.activityDocs["/shared/line-construction-sequence-multiple-dataset"] =
{
  "_id": "line-construction-sequence-multiple-dataset.df6",
  "_rev": 1,
  "data_format_version": 6,
  "activity": {
    "title": "line construction sequence multiple dataset",
    "url": "/shared/line-construction-sequence-multiple-dataset",
    "owner": "shared",
    "pages": [
      "/shared/line-construction-sequence-multiple-dataset/page/1-construct-a-line-page-1"
    ],
    "axes": [
      "/shared/line-construction-sequence-multiple-dataset/axes/1",
      "/shared/line-construction-sequence-multiple-dataset/axes/2"
    ],
    "authorName": "Noah"
  },
  "pages": [
    {
      "name": "Construct a Line: Page 1",
      "url": "/shared/line-construction-sequence-multiple-dataset/page/1-construct-a-line-page-1",
      "activity": "/shared/line-construction-sequence-multiple-dataset",
      "index": 1,
      "introText": "On this page, students will be asked to construct a line.",
      "steps": [
        "/shared/line-construction-sequence-multiple-dataset/page/1-construct-a-line-page-1/step/1",
        "/shared/line-construction-sequence-multiple-dataset/page/1-construct-a-line-page-1/step/2",
        "/shared/line-construction-sequence-multiple-dataset/page/1-construct-a-line-page-1/step/3",
        "/shared/line-construction-sequence-multiple-dataset/page/1-construct-a-line-page-1/step/4",
        "/shared/line-construction-sequence-multiple-dataset/page/1-construct-a-line-page-1/step/5"
      ],
      "firstStep": "/shared/line-construction-sequence-multiple-dataset/page/1-construct-a-line-page-1/step/1",
      "contextVars": []
    }
  ],
  "steps": [
    {
      "url": "/shared/line-construction-sequence-multiple-dataset/page/1-construct-a-line-page-1/step/1",
      "activityPage": "/shared/line-construction-sequence-multiple-dataset/page/1-construct-a-line-page-1",
      "beforeText": "Construct a line with y-interept 0.0, with slope 1.0",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Line Construction Graph Pane",
          "xAxis": "/shared/line-construction-sequence-multiple-dataset/axes/1",
          "yAxis": "/shared/line-construction-sequence-multiple-dataset/axes/2",
          "showCrossHairs": true,
          "showGraphGrid": true,
          "showToolTipCoords": true,
          "annotations": [
            "freehand-sketch-1"
          ],
          "highlightedAnnotations": [],
          "data": [
            "datadef-1",
            "dataSetA"
          ],
          "datarefs": [
            "dataref-1"
          ],
          "legends": [
            "datadef-1",
            "dataSetA"
          ],
          "activeDatadefs": [
            "datadef-1"
          ]
        },
        "bottom": {
          "type": "table",
          "data": "datadef-1",
          "xLabel": "x",
          "yLabel": "y",
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
      "defaultBranch": "/shared/line-construction-sequence-multiple-dataset/page/1-construct-a-line-page-1/step/2",
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
          "step": "/shared/line-construction-sequence-multiple-dataset/page/1-construct-a-line-page-1/step/5"
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
          "step": "/shared/line-construction-sequence-multiple-dataset/page/1-construct-a-line-page-1/step/4"
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
          "step": "/shared/line-construction-sequence-multiple-dataset/page/1-construct-a-line-page-1/step/3"
        }
      ],
      "isFinalStep": false,
      "substitutedExpressions": []
    },
    {
      "url": "/shared/line-construction-sequence-multiple-dataset/page/1-construct-a-line-page-1/step/2",
      "activityPage": "/shared/line-construction-sequence-multiple-dataset/page/1-construct-a-line-page-1",
      "beforeText": "<b>Incorrect. Try again.</b><p>Construct a line with y-interept 0.0, with slope 1.0</p>",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Line Construction Graph Pane",
          "xAxis": "/shared/line-construction-sequence-multiple-dataset/axes/1",
          "yAxis": "/shared/line-construction-sequence-multiple-dataset/axes/2",
          "showCrossHairs": false,
          "showGraphGrid": true,
          "showToolTipCoords": true,
          "annotations": [
            "freehand-sketch-1"
          ],
          "highlightedAnnotations": [],
          "data": [
            "datadef-1",
            "dataSetA"
          ],
          "datarefs": [
            "dataref-1"
          ],
          "legends": [
            "datadef-1",
            "dataSetA"
          ],
          "activeDatadefs": [
            "datadef-1"
          ]
        },
        "bottom": {
          "type": "table",
          "data": "datadef-1",
          "xLabel": "x",
          "yLabel": "y",
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
      "defaultBranch": "/shared/line-construction-sequence-multiple-dataset/page/1-construct-a-line-page-1/step/2",
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
          "step": "/shared/line-construction-sequence-multiple-dataset/page/1-construct-a-line-page-1/step/5"
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
          "step": "/shared/line-construction-sequence-multiple-dataset/page/1-construct-a-line-page-1/step/4"
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
          "step": "/shared/line-construction-sequence-multiple-dataset/page/1-construct-a-line-page-1/step/3"
        }
      ],
      "isFinalStep": false,
      "substitutedExpressions": []
    },
    {
      "url": "/shared/line-construction-sequence-multiple-dataset/page/1-construct-a-line-page-1/step/3",
      "activityPage": "/shared/line-construction-sequence-multiple-dataset/page/1-construct-a-line-page-1",
      "beforeText": "<b>Incorrect, your slope is wrong.</b><p>Construct a line with y-interept 0.0, with slope 1.0</p>",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Line Construction Graph Pane",
          "xAxis": "/shared/line-construction-sequence-multiple-dataset/axes/1",
          "yAxis": "/shared/line-construction-sequence-multiple-dataset/axes/2",
          "showCrossHairs": false,
          "showGraphGrid": true,
          "showToolTipCoords": true,
          "annotations": [
            "freehand-sketch-1"
          ],
          "highlightedAnnotations": [],
          "data": [
            "datadef-1",
            "dataSetA"
          ],
          "datarefs": [
            "dataref-1"
          ],
          "legends": [
            "datadef-1",
            "dataSetA"
          ],
          "activeDatadefs": [
            "datadef-1"
          ]
        },
        "bottom": {
          "type": "table",
          "data": "datadef-1",
          "xLabel": "x",
          "yLabel": "y",
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
      "defaultBranch": "/shared/line-construction-sequence-multiple-dataset/page/1-construct-a-line-page-1/step/2",
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
          "step": "/shared/line-construction-sequence-multiple-dataset/page/1-construct-a-line-page-1/step/5"
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
          "step": "/shared/line-construction-sequence-multiple-dataset/page/1-construct-a-line-page-1/step/4"
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
          "step": "/shared/line-construction-sequence-multiple-dataset/page/1-construct-a-line-page-1/step/3"
        }
      ],
      "isFinalStep": false,
      "substitutedExpressions": []
    },
    {
      "url": "/shared/line-construction-sequence-multiple-dataset/page/1-construct-a-line-page-1/step/4",
      "activityPage": "/shared/line-construction-sequence-multiple-dataset/page/1-construct-a-line-page-1",
      "beforeText": "<b>Incorrect, your y-intercept is wrong.</b><p>Construct a line with y-interept 0.0, with slope 1.0</p>",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Line Construction Graph Pane",
          "xAxis": "/shared/line-construction-sequence-multiple-dataset/axes/1",
          "yAxis": "/shared/line-construction-sequence-multiple-dataset/axes/2",
          "showCrossHairs": false,
          "showGraphGrid": true,
          "showToolTipCoords": true,
          "annotations": [
            "freehand-sketch-1"
          ],
          "highlightedAnnotations": [],
          "data": [
            "datadef-1",
            "dataSetA"
          ],
          "datarefs": [
            "dataref-1"
          ],
          "legends": [
            "datadef-1",
            "dataSetA"
          ],
          "activeDatadefs": [
            "datadef-1"
          ]
        },
        "bottom": {
          "type": "table",
          "data": "datadef-1",
          "xLabel": "x",
          "yLabel": "y",
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
      "defaultBranch": "/shared/line-construction-sequence-multiple-dataset/page/1-construct-a-line-page-1/step/2",
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
          "step": "/shared/line-construction-sequence-multiple-dataset/page/1-construct-a-line-page-1/step/5"
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
          "step": "/shared/line-construction-sequence-multiple-dataset/page/1-construct-a-line-page-1/step/4"
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
          "step": "/shared/line-construction-sequence-multiple-dataset/page/1-construct-a-line-page-1/step/3"
        }
      ],
      "isFinalStep": false,
      "substitutedExpressions": []
    },
    {
      "url": "/shared/line-construction-sequence-multiple-dataset/page/1-construct-a-line-page-1/step/5",
      "activityPage": "/shared/line-construction-sequence-multiple-dataset/page/1-construct-a-line-page-1",
      "beforeText": "<b>Thats Correct</b>",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Line Construction Graph Pane",
          "xAxis": "/shared/line-construction-sequence-multiple-dataset/axes/1",
          "yAxis": "/shared/line-construction-sequence-multiple-dataset/axes/2",
          "showCrossHairs": false,
          "showGraphGrid": true,
          "showToolTipCoords": false,
          "annotations": [
            "freehand-sketch-1"
          ],
          "highlightedAnnotations": [],
          "data": [
            "datadef-1",
            "dataSetA"
          ],
          "datarefs": [
            "dataref-1"
          ],
          "legends": [
            "datadef-1",
            "dataSetA"
          ],
          "activeDatadefs": [
            "datadef-1"
          ]
        },
        "bottom": {
          "type": "table",
          "data": "datadef-1",
          "xLabel": "x",
          "yLabel": "y",
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
      "url": "/shared/line-construction-sequence-multiple-dataset/axes/1",
      "min": 0,
      "max": 10,
      "nSteps": 10,
      "label": "x"
    },
    {
      "url": "/shared/line-construction-sequence-multiple-dataset/axes/2",
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
          "url": "/shared/line-construction-sequence-multiple-dataset/datadefs/datadef-1",
          "name": "datadef-1",
          "activity": "/shared/line-construction-sequence-multiple-dataset",
          "points": [],
          "lineSnapDistance": 0
        },
        {
          "url": "/shared/line-construction-sequence-multiple-dataset/datadefs/dataSetA",
          "name": "dataSetA",
          "activity": "/shared/line-construction-sequence-multiple-dataset",
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
          "url": "/shared/line-construction-sequence-multiple-dataset/datarefs/dataref-1",
          "name": "dataref-1",
          "activity": "/shared/line-construction-sequence-multiple-dataset",
          "datadefName": "dataSetA",
          "expressionForm": "slope-intercept",
          "xInterval": 0.5,
          "params": {
            "slope": 0.5,
            "yIntercept": 5
          }
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
          "url": "/shared/line-construction-sequence-multiple-dataset/annotations/freehand-sketch-1",
          "name": "freehand-sketch-1",
          "activity": "/shared/line-construction-sequence-multiple-dataset",
          "color": "#CC0000",
          "points": []
        }
      ]
    }
  ],
  "variables": [],
  "units": []
}
