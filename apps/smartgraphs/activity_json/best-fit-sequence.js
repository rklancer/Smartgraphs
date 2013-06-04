/*globals Smartgraphs */

Smartgraphs.activityDocs = Smartgraphs.activityDocs || {};
Smartgraphs.activityDocs["/shared/best-fit-sequence"] =
{
  "_id": "best-fit-sequence.df6",
  "_rev": 1,
  "data_format_version": 6,
  "activity": {
    "title": "Best Fit Sequence",
    "url": "/shared/best-fit-sequence",
    "owner": "shared",
    "pages": [
      "/shared/best-fit-sequence/page/1-best-fit-sequence-page-1"
    ],
    "axes": [
      "/shared/best-fit-sequence/axes/1",
      "/shared/best-fit-sequence/axes/2"
    ],
    "authorName": "Noah"
  },
  "pages": [
    {
      "name": "Best Fit Sequence Page 1",
      "url": "/shared/best-fit-sequence/page/1-best-fit-sequence-page-1",
      "activity": "/shared/best-fit-sequence",
      "index": 1,
      "introText": "On this page, students will be asked to find the line of best fit for a series of points.",
      "steps": [
        "/shared/best-fit-sequence/page/1-best-fit-sequence-page-1/step/1",
        "/shared/best-fit-sequence/page/1-best-fit-sequence-page-1/step/2",
        "/shared/best-fit-sequence/page/1-best-fit-sequence-page-1/step/3",
        "/shared/best-fit-sequence/page/1-best-fit-sequence-page-1/step/4",
        "/shared/best-fit-sequence/page/1-best-fit-sequence-page-1/step/5",
        "/shared/best-fit-sequence/page/1-best-fit-sequence-page-1/step/6",
        "/shared/best-fit-sequence/page/1-best-fit-sequence-page-1/step/7",
        "/shared/best-fit-sequence/page/1-best-fit-sequence-page-1/step/8",
        "/shared/best-fit-sequence/page/1-best-fit-sequence-page-1/step/9"
      ],
      "firstStep": "/shared/best-fit-sequence/page/1-best-fit-sequence-page-1/step/1",
      "contextVars": []
    }
  ],
  "steps": [
    {
      "url": "/shared/best-fit-sequence/page/1-best-fit-sequence-page-1/step/1",
      "activityPage": "/shared/best-fit-sequence/page/1-best-fit-sequence-page-1",
      "beforeText": "Find the line of best fit for this scatter plot.",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Line Construction Graph Pane",
          "xAxis": "/shared/best-fit-sequence/axes/1",
          "yAxis": "/shared/best-fit-sequence/axes/2",
          "showCrossHairs": true,
          "showGraphGrid": true,
          "showToolTipCoords": true,
          "annotations": [
            "freehand-sketch-1"
          ],
          "highlightedAnnotations": [],
          "data": [
            "scatter-points",
            "datadef-1"
          ],
          "legends": {
            "title": "Sum of squares",
            "type": "AvgSumOfDeviation",
            "referenceDatadef": "scatter-points",
            "datadefs": [
              "datadef-1"
            ]
          },
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
      "defaultBranch": "/shared/best-fit-sequence/page/1-best-fit-sequence-page-1/step/2",
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
            "withinAbsTolerance",
            14.827236000448883,
            [
              "deviationValue",
              "datadef-1"
            ],
            14.827236000448885
          ],
          "step": "/shared/best-fit-sequence/page/1-best-fit-sequence-page-1/step/9"
        },
        {
          "criterion": [
            "withinAbsTolerance",
            14.827236000448883,
            [
              "deviationValue",
              "datadef-1"
            ],
            29.65447200089777
          ],
          "step": "/shared/best-fit-sequence/page/1-best-fit-sequence-page-1/step/3"
        }
      ],
      "isFinalStep": false,
      "substitutedExpressions": []
    },
    {
      "url": "/shared/best-fit-sequence/page/1-best-fit-sequence-page-1/step/2",
      "activityPage": "/shared/best-fit-sequence/page/1-best-fit-sequence-page-1",
      "beforeText": "<b>Your estimate can be better; try again.</b><p>Find the line of best fit for this scatter plot.</p>",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Line Construction Graph Pane",
          "xAxis": "/shared/best-fit-sequence/axes/1",
          "yAxis": "/shared/best-fit-sequence/axes/2",
          "showCrossHairs": false,
          "showGraphGrid": true,
          "showToolTipCoords": true,
          "annotations": [
            "freehand-sketch-1"
          ],
          "highlightedAnnotations": [],
          "data": [
            "scatter-points",
            "datadef-1"
          ],
          "legends": {
            "title": "Sum of squares",
            "type": "AvgSumOfDeviation",
            "referenceDatadef": "scatter-points",
            "datadefs": [
              "datadef-1"
            ]
          },
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
      "defaultBranch": "/shared/best-fit-sequence/page/1-best-fit-sequence-page-1/step/4",
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
            "withinAbsTolerance",
            14.827236000448883,
            [
              "deviationValue",
              "datadef-1"
            ],
            14.827236000448885
          ],
          "step": "/shared/best-fit-sequence/page/1-best-fit-sequence-page-1/step/9"
        },
        {
          "criterion": [
            "withinAbsTolerance",
            14.827236000448883,
            [
              "deviationValue",
              "datadef-1"
            ],
            29.65447200089777
          ],
          "step": "/shared/best-fit-sequence/page/1-best-fit-sequence-page-1/step/5"
        }
      ],
      "isFinalStep": false,
      "substitutedExpressions": []
    },
    {
      "url": "/shared/best-fit-sequence/page/1-best-fit-sequence-page-1/step/3",
      "activityPage": "/shared/best-fit-sequence/page/1-best-fit-sequence-page-1",
      "beforeText": "<b>Your estimate is close; try again</b><p>Find the line of best fit for this scatter plot.</p>",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Line Construction Graph Pane",
          "xAxis": "/shared/best-fit-sequence/axes/1",
          "yAxis": "/shared/best-fit-sequence/axes/2",
          "showCrossHairs": false,
          "showGraphGrid": true,
          "showToolTipCoords": true,
          "annotations": [
            "freehand-sketch-1"
          ],
          "highlightedAnnotations": [],
          "data": [
            "scatter-points",
            "datadef-1"
          ],
          "legends": {
            "title": "Sum of squares",
            "type": "AvgSumOfDeviation",
            "referenceDatadef": "scatter-points",
            "datadefs": [
              "datadef-1"
            ]
          },
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
      "defaultBranch": "/shared/best-fit-sequence/page/1-best-fit-sequence-page-1/step/4",
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
            "withinAbsTolerance",
            14.827236000448883,
            [
              "deviationValue",
              "datadef-1"
            ],
            14.827236000448885
          ],
          "step": "/shared/best-fit-sequence/page/1-best-fit-sequence-page-1/step/9"
        },
        {
          "criterion": [
            "withinAbsTolerance",
            14.827236000448883,
            [
              "deviationValue",
              "datadef-1"
            ],
            29.65447200089777
          ],
          "step": "/shared/best-fit-sequence/page/1-best-fit-sequence-page-1/step/5"
        }
      ],
      "isFinalStep": false,
      "substitutedExpressions": []
    },
    {
      "url": "/shared/best-fit-sequence/page/1-best-fit-sequence-page-1/step/4",
      "activityPage": "/shared/best-fit-sequence/page/1-best-fit-sequence-page-1",
      "beforeText": "<b>Your estimate can be better; try again.</b><p>Find the line of best fit for this scatter plot.</p>",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Line Construction Graph Pane",
          "xAxis": "/shared/best-fit-sequence/axes/1",
          "yAxis": "/shared/best-fit-sequence/axes/2",
          "showCrossHairs": false,
          "showGraphGrid": true,
          "showToolTipCoords": true,
          "annotations": [
            "freehand-sketch-1"
          ],
          "highlightedAnnotations": [],
          "data": [
            "scatter-points",
            "datadef-1"
          ],
          "legends": {
            "title": "Sum of squares",
            "type": "AvgSumOfDeviation",
            "referenceDatadef": "scatter-points",
            "datadefs": [
              "datadef-1"
            ]
          },
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
      "defaultBranch": "/shared/best-fit-sequence/page/1-best-fit-sequence-page-1/step/6",
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
            "withinAbsTolerance",
            14.827236000448883,
            [
              "deviationValue",
              "datadef-1"
            ],
            14.827236000448885
          ],
          "step": "/shared/best-fit-sequence/page/1-best-fit-sequence-page-1/step/9"
        },
        {
          "criterion": [
            "withinAbsTolerance",
            14.827236000448883,
            [
              "deviationValue",
              "datadef-1"
            ],
            29.65447200089777
          ],
          "step": "/shared/best-fit-sequence/page/1-best-fit-sequence-page-1/step/7"
        }
      ],
      "isFinalStep": false,
      "substitutedExpressions": []
    },
    {
      "url": "/shared/best-fit-sequence/page/1-best-fit-sequence-page-1/step/5",
      "activityPage": "/shared/best-fit-sequence/page/1-best-fit-sequence-page-1",
      "beforeText": "<b>Your estimate is close; try again</b><p>Find the line of best fit for this scatter plot.</p>",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Line Construction Graph Pane",
          "xAxis": "/shared/best-fit-sequence/axes/1",
          "yAxis": "/shared/best-fit-sequence/axes/2",
          "showCrossHairs": false,
          "showGraphGrid": true,
          "showToolTipCoords": true,
          "annotations": [
            "freehand-sketch-1"
          ],
          "highlightedAnnotations": [],
          "data": [
            "scatter-points",
            "datadef-1"
          ],
          "legends": {
            "title": "Sum of squares",
            "type": "AvgSumOfDeviation",
            "referenceDatadef": "scatter-points",
            "datadefs": [
              "datadef-1"
            ]
          },
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
      "defaultBranch": "/shared/best-fit-sequence/page/1-best-fit-sequence-page-1/step/6",
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
            "withinAbsTolerance",
            14.827236000448883,
            [
              "deviationValue",
              "datadef-1"
            ],
            14.827236000448885
          ],
          "step": "/shared/best-fit-sequence/page/1-best-fit-sequence-page-1/step/9"
        },
        {
          "criterion": [
            "withinAbsTolerance",
            14.827236000448883,
            [
              "deviationValue",
              "datadef-1"
            ],
            29.65447200089777
          ],
          "step": "/shared/best-fit-sequence/page/1-best-fit-sequence-page-1/step/7"
        }
      ],
      "isFinalStep": false,
      "substitutedExpressions": []
    },
    {
      "url": "/shared/best-fit-sequence/page/1-best-fit-sequence-page-1/step/6",
      "activityPage": "/shared/best-fit-sequence/page/1-best-fit-sequence-page-1",
      "beforeText": "<b>Your estimate can be better; try again.</b><p>Find the line of best fit for this scatter plot.</p>",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Line Construction Graph Pane",
          "xAxis": "/shared/best-fit-sequence/axes/1",
          "yAxis": "/shared/best-fit-sequence/axes/2",
          "showCrossHairs": false,
          "showGraphGrid": true,
          "showToolTipCoords": true,
          "annotations": [
            "freehand-sketch-1"
          ],
          "highlightedAnnotations": [],
          "data": [
            "scatter-points",
            "datadef-1"
          ],
          "legends": {
            "title": "Sum of squares",
            "type": "AvgSumOfDeviation",
            "referenceDatadef": "scatter-points",
            "datadefs": [
              "datadef-1"
            ]
          },
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
      "defaultBranch": "/shared/best-fit-sequence/page/1-best-fit-sequence-page-1/step/8",
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
            "withinAbsTolerance",
            14.827236000448883,
            [
              "deviationValue",
              "datadef-1"
            ],
            14.827236000448885
          ],
          "step": "/shared/best-fit-sequence/page/1-best-fit-sequence-page-1/step/9"
        }
      ],
      "isFinalStep": false,
      "substitutedExpressions": []
    },
    {
      "url": "/shared/best-fit-sequence/page/1-best-fit-sequence-page-1/step/7",
      "activityPage": "/shared/best-fit-sequence/page/1-best-fit-sequence-page-1",
      "beforeText": "<b>Your estimate is close; try again</b><p>Find the line of best fit for this scatter plot.</p>",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Line Construction Graph Pane",
          "xAxis": "/shared/best-fit-sequence/axes/1",
          "yAxis": "/shared/best-fit-sequence/axes/2",
          "showCrossHairs": false,
          "showGraphGrid": true,
          "showToolTipCoords": true,
          "annotations": [
            "freehand-sketch-1"
          ],
          "highlightedAnnotations": [],
          "data": [
            "scatter-points",
            "datadef-1"
          ],
          "legends": {
            "title": "Sum of squares",
            "type": "AvgSumOfDeviation",
            "referenceDatadef": "scatter-points",
            "datadefs": [
              "datadef-1"
            ]
          },
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
      "defaultBranch": "/shared/best-fit-sequence/page/1-best-fit-sequence-page-1/step/8",
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
            "withinAbsTolerance",
            14.827236000448883,
            [
              "deviationValue",
              "datadef-1"
            ],
            14.827236000448885
          ],
          "step": "/shared/best-fit-sequence/page/1-best-fit-sequence-page-1/step/9"
        }
      ],
      "isFinalStep": false,
      "substitutedExpressions": []
    },
    {
      "url": "/shared/best-fit-sequence/page/1-best-fit-sequence-page-1/step/8",
      "activityPage": "/shared/best-fit-sequence/page/1-best-fit-sequence-page-1",
      "beforeText": "<b>Your estimate is incorrect.</b>",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Line Construction Graph Pane",
          "xAxis": "/shared/best-fit-sequence/axes/1",
          "yAxis": "/shared/best-fit-sequence/axes/2",
          "showCrossHairs": false,
          "showGraphGrid": true,
          "showToolTipCoords": false,
          "annotations": [
            "freehand-sketch-1"
          ],
          "highlightedAnnotations": [],
          "data": [
            "scatter-points",
            "datadef-1",
            "CorrectLine-1"
          ],
          "datarefs": [
            "dataref-1"
          ],
          "legends": {
            "title": "Sum of squares",
            "type": "AvgSumOfDeviation",
            "referenceDatadef": "scatter-points",
            "datadefs": [
              "datadef-1",
              "CorrectLine-1"
            ]
          },
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
    },
    {
      "url": "/shared/best-fit-sequence/page/1-best-fit-sequence-page-1/step/9",
      "activityPage": "/shared/best-fit-sequence/page/1-best-fit-sequence-page-1",
      "beforeText": "<b>You made an excellent estimate.</b>",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Line Construction Graph Pane",
          "xAxis": "/shared/best-fit-sequence/axes/1",
          "yAxis": "/shared/best-fit-sequence/axes/2",
          "showCrossHairs": false,
          "showGraphGrid": true,
          "showToolTipCoords": false,
          "annotations": [
            "freehand-sketch-1"
          ],
          "highlightedAnnotations": [],
          "data": [
            "scatter-points",
            "datadef-1",
            "CorrectLine-1"
          ],
          "datarefs": [
            "dataref-1"
          ],
          "legends": {
            "title": "Sum of squares",
            "type": "AvgSumOfDeviation",
            "referenceDatadef": "scatter-points",
            "datadefs": [
              "datadef-1",
              "CorrectLine-1"
            ]
          },
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
      "url": "/shared/best-fit-sequence/axes/1",
      "min": 0,
      "max": 10,
      "nSteps": 10,
      "label": "x"
    },
    {
      "url": "/shared/best-fit-sequence/axes/2",
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
          "url": "/shared/best-fit-sequence/datadefs/scatter-points",
          "name": "scatter-points",
          "activity": "/shared/best-fit-sequence",
          "points": [
            [
              0.4,
              0.5
            ],
            [
              1,
              1
            ],
            [
              1.5,
              1.5
            ],
            [
              0.6,
              2.5
            ],
            [
              2,
              2
            ],
            [
              1.2,
              3
            ],
            [
              2.4,
              3
            ],
            [
              1.6,
              3.5
            ],
            [
              3.5,
              4
            ],
            [
              2.4,
              4.5
            ],
            [
              4,
              5
            ],
            [
              3.7,
              6
            ],
            [
              3,
              5.5
            ],
            [
              2.5,
              4
            ],
            [
              5,
              6.5
            ],
            [
              5,
              7
            ],
            [
              6.5,
              7
            ],
            [
              6.5,
              8.5
            ],
            [
              8,
              8
            ]
          ],
          "pointType": "dot",
          "lineType": "none",
          "lineSnapDistance": 0,
          "color": "#17becf"
        },
        {
          "url": "/shared/best-fit-sequence/datadefs/datadef-1",
          "name": "datadef-1",
          "activity": "/shared/best-fit-sequence",
          "points": [],
          "pointType": "dot",
          "lineType": "none",
          "lineSnapDistance": 0,
          "color": "#cc0000"
        },
        {
          "url": "/shared/best-fit-sequence/datadefs/CorrectLine-1",
          "name": "CorrectLine-1",
          "activity": "/shared/best-fit-sequence",
          "points": [],
          "pointType": "none",
          "lineType": "connected",
          "lineSnapDistance": 0,
          "color": "#17becf"
        }
      ]
    }
  ],
  "datarefs": [
    {
      "type": "LinearEquation",
      "records": [
        {
          "url": "/shared/best-fit-sequence/datarefs/dataref-1",
          "name": "dataref-1",
          "activity": "/shared/best-fit-sequence",
          "datadefName": "CorrectLine-1",
          "expressionForm": "slope-intercept",
          "xInterval": 0.1,
          "params": {
            "slope": 1.0127931769722816,
            "yIntercept": 1.1274828863202777
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
          "url": "/shared/best-fit-sequence/annotations/freehand-sketch-1",
          "name": "freehand-sketch-1",
          "activity": "/shared/best-fit-sequence",
          "color": "#CC0000",
          "points": []
        }
      ]
    }
  ],
  "variables": [],
  "units": []
};
