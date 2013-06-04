Smartgraphs.activityDocs = Smartgraphs.activityDocs || {};
Smartgraphs.activityDocs["/shared/testing-slope-tool"] =
{
  "_id": "testing-slope-tool.df6",
  "_rev": 1,
  "data_format_version": 6,
  "activity": {
    "title": "Testing Slope Tool",
    "url": "/shared/testing-slope-tool",
    "owner": "shared",
    "pages": [
      "/shared/testing-slope-tool/page/1-1-testing-slope-tool",
      "/shared/testing-slope-tool/page/2-2-just-to-show-gridlines"
    ],
    "axes": [
      "/shared/testing-slope-tool/axes/1",
      "/shared/testing-slope-tool/axes/2",
      "/shared/testing-slope-tool/axes/3",
      "/shared/testing-slope-tool/axes/4"
    ],
    "authorName": "Aaron"
  },
  "pages": [
    {
      "name": "1 Testing slope tool",
      "url": "/shared/testing-slope-tool/page/1-1-testing-slope-tool",
      "activity": "/shared/testing-slope-tool",
      "index": 1,
      "introText": "This is a test of the slope tool.",
      "steps": [
        "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/1",
        "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/2",
        "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/3",
        "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/4",
        "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/5",
        "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/6",
        "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/7",
        "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/8",
        "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/9",
        "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/10",
        "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/11",
        "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/12",
        "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/13",
        "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/14",
        "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/15",
        "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/16",
        "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/17",
        "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/18",
        "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/19"
      ],
      "firstStep": "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/1",
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
    },
    {
      "name": "2 Just to show gridlines",
      "url": "/shared/testing-slope-tool/page/2-2-just-to-show-gridlines",
      "activity": "/shared/testing-slope-tool",
      "index": 2,
      "introText": "This graph should have gridlines",
      "steps": [
        "/shared/testing-slope-tool/page/2-2-just-to-show-gridlines/step/1"
      ],
      "firstStep": "/shared/testing-slope-tool/page/2-2-just-to-show-gridlines/step/1",
      "contextVars": []
    }
  ],
  "steps": [
    {
      "url": "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/1",
      "activityPage": "/shared/testing-slope-tool/page/1-1-testing-slope-tool",
      "beforeText": "What is the slope of the straight line between x values of 2 and 4?",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Piecewise linear function",
          "xAxis": "/shared/testing-slope-tool/axes/1",
          "yAxis": "/shared/testing-slope-tool/axes/2",
          "showCrossHairs": false,
          "showGraphGrid": true,
          "showToolTipCoords": true,
          "annotations": [],
          "highlightedAnnotations": [],
          "data": [
            "Piecewise linear function",
            "Straight line"
          ],
          "datarefs": [
            "dataref-1"
          ],
          "legends": {
            "title": "legend",
            "type": "name",
            "referenceDatadef": "",
            "datadefs": [
              "Piecewise linear function",
              "Straight line"
            ]
          },
          "activeDatadefs": [
            "Piecewise linear function"
          ]
        },
        "bottom": {
          "type": "table",
          "data": "Piecewise linear function",
          "xLabel": "x",
          "yLabel": "y",
          "annotations": [],
          "highlightedAnnotations": []
        }
      },
      "submitButtonTitle": "Check My Answer",
      "defaultBranch": "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/2",
      "responseTemplate": "/shared/testing-slope-tool/response-templates/numeric-1",
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
          "step": "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/19"
        }
      ],
      "isFinalStep": false,
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
    {
      "url": "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/2",
      "activityPage": "/shared/testing-slope-tool/page/1-1-testing-slope-tool",
      "beforeText": "<p><strong>Incorrect.</strong></p>\n<p> Click on a point at \n<strong><em>one end</em></strong>  \nof the interval from\n2undefined to 4 for x-axis. </p>\n<p>Then click \"OK\". </p>",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Piecewise linear function",
          "xAxis": "/shared/testing-slope-tool/axes/1",
          "yAxis": "/shared/testing-slope-tool/axes/2",
          "showCrossHairs": false,
          "showGraphGrid": true,
          "showToolTipCoords": true,
          "annotations": [
            "highlighted-point-1"
          ],
          "highlightedAnnotations": [],
          "data": [
            "Piecewise linear function",
            "Straight line"
          ],
          "datarefs": [
            "dataref-1"
          ],
          "legends": {
            "title": "legend",
            "type": "name",
            "referenceDatadef": "",
            "datadefs": [
              "Piecewise linear function",
              "Straight line"
            ]
          },
          "activeDatadefs": [
            "Piecewise linear function"
          ]
        },
        "bottom": {
          "type": "table",
          "data": "Piecewise linear function",
          "xLabel": "x",
          "yLabel": "y",
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
            "data": "Piecewise linear function"
          }
        }
      ],
      "submitButtonTitle": "OK",
      "defaultBranch": "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/3",
      "responseBranches": [
        {
          "criterion": [
            "or",
            [
              "=",
              [
                "coord",
                "x",
                "tag-1"
              ],
              2
            ],
            [
              "=",
              [
                "coord",
                "x",
                "tag-1"
              ],
              4
            ]
          ],
          "step": "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/4"
        }
      ],
      "isFinalStep": false
    },
    {
      "url": "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/3",
      "activityPage": "/shared/testing-slope-tool/page/1-1-testing-slope-tool",
      "beforeText": "<p><strong>Incorrect.</strong></p>\n<p>The point you have selected is not \na point at \n<strong><em>one end</em></strong>  \nof the interval from\n2undefined to 4 for x-axis.\nTry again.</p>\n<p> Click on a point at \n<strong><em>one end</em></strong>  \nof the interval from\n2undefined to 4 for x-axis. </p>\n<p>Then click \"OK\". </p>",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Piecewise linear function",
          "xAxis": "/shared/testing-slope-tool/axes/1",
          "yAxis": "/shared/testing-slope-tool/axes/2",
          "showCrossHairs": false,
          "showGraphGrid": true,
          "showToolTipCoords": true,
          "annotations": [
            "highlighted-point-1"
          ],
          "highlightedAnnotations": [],
          "data": [
            "Piecewise linear function",
            "Straight line"
          ],
          "datarefs": [
            "dataref-1"
          ],
          "legends": {
            "title": "legend",
            "type": "name",
            "referenceDatadef": "",
            "datadefs": [
              "Piecewise linear function",
              "Straight line"
            ]
          },
          "activeDatadefs": [
            "Piecewise linear function"
          ]
        },
        "bottom": {
          "type": "table",
          "data": "Piecewise linear function",
          "xLabel": "x",
          "yLabel": "y",
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
            "data": "Piecewise linear function"
          }
        }
      ],
      "submitButtonTitle": "OK",
      "defaultBranch": "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/3",
      "responseBranches": [
        {
          "criterion": [
            "or",
            [
              "=",
              [
                "coord",
                "x",
                "tag-1"
              ],
              2
            ],
            [
              "=",
              [
                "coord",
                "x",
                "tag-1"
              ],
              4
            ]
          ],
          "step": "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/4"
        }
      ],
      "isFinalStep": false
    },
    {
      "url": "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/4",
      "activityPage": "/shared/testing-slope-tool/page/1-1-testing-slope-tool",
      "beforeText": "<p>Now click on\nthe point at \n<strong><em>the other end</em></strong>  \nof the interval from\n2undefined to 4 for x-axis.</p>\n<p>Then click \"OK\". </p>",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Piecewise linear function",
          "xAxis": "/shared/testing-slope-tool/axes/1",
          "yAxis": "/shared/testing-slope-tool/axes/2",
          "showCrossHairs": false,
          "showGraphGrid": true,
          "showToolTipCoords": true,
          "annotations": [
            "highlighted-point-1",
            "highlighted-point-2"
          ],
          "highlightedAnnotations": [],
          "data": [
            "Piecewise linear function",
            "Straight line"
          ],
          "datarefs": [
            "dataref-1"
          ],
          "legends": {
            "title": "legend",
            "type": "name",
            "referenceDatadef": "",
            "datadefs": [
              "Piecewise linear function",
              "Straight line"
            ]
          },
          "activeDatadefs": [
            "Piecewise linear function"
          ]
        },
        "bottom": {
          "type": "table",
          "data": "Piecewise linear function",
          "xLabel": "x",
          "yLabel": "y",
          "annotations": [
            "highlighted-point-1",
            "highlighted-point-2"
          ],
          "highlightedAnnotations": []
        }
      },
      "tools": [
        {
          "name": "tagging",
          "setup": {
            "tag": "tag-2",
            "data": "Piecewise linear function"
          }
        }
      ],
      "submitButtonTitle": "OK",
      "defaultBranch": "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/8",
      "responseBranches": [
        {
          "criterion": [
            "samePoint",
            "tag-1",
            "tag-2"
          ],
          "step": "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/6"
        },
        {
          "criterion": [
            "and",
            [
              "!=",
              [
                "coord",
                "x",
                "tag-2"
              ],
              2
            ],
            [
              "!=",
              [
                "coord",
                "x",
                "tag-2"
              ],
              4
            ]
          ],
          "step": "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/7"
        }
      ],
      "isFinalStep": false
    },
    {
      "url": "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/5",
      "activityPage": "/shared/testing-slope-tool/page/1-1-testing-slope-tool",
      "beforeText": "<p><strong>Incorrect.</strong></p>\n<p> Your points should be adjacent.</p>\n<p>Now click on\nthe point at \n<strong><em>the other end</em></strong>  \nof the interval from\n2undefined to 4 for x-axis.</p>\n<p>Then click \"OK\". </p>",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Piecewise linear function",
          "xAxis": "/shared/testing-slope-tool/axes/1",
          "yAxis": "/shared/testing-slope-tool/axes/2",
          "showCrossHairs": false,
          "showGraphGrid": true,
          "showToolTipCoords": true,
          "annotations": [
            "highlighted-point-1",
            "highlighted-point-2"
          ],
          "highlightedAnnotations": [],
          "data": [
            "Piecewise linear function",
            "Straight line"
          ],
          "datarefs": [
            "dataref-1"
          ],
          "legends": {
            "title": "legend",
            "type": "name",
            "referenceDatadef": "",
            "datadefs": [
              "Piecewise linear function",
              "Straight line"
            ]
          },
          "activeDatadefs": [
            "Piecewise linear function"
          ]
        },
        "bottom": {
          "type": "table",
          "data": "Piecewise linear function",
          "xLabel": "x",
          "yLabel": "y",
          "annotations": [
            "highlighted-point-1",
            "highlighted-point-2"
          ],
          "highlightedAnnotations": []
        }
      },
      "tools": [
        {
          "name": "tagging",
          "setup": {
            "tag": "tag-2",
            "data": "Piecewise linear function"
          }
        }
      ],
      "submitButtonTitle": "OK",
      "defaultBranch": "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/8",
      "responseBranches": [
        {
          "criterion": [
            "samePoint",
            "tag-1",
            "tag-2"
          ],
          "step": "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/6"
        },
        {
          "criterion": [
            "and",
            [
              "!=",
              [
                "coord",
                "x",
                "tag-2"
              ],
              2
            ],
            [
              "!=",
              [
                "coord",
                "x",
                "tag-2"
              ],
              4
            ]
          ],
          "step": "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/7"
        }
      ],
      "isFinalStep": false
    },
    {
      "url": "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/6",
      "activityPage": "/shared/testing-slope-tool/page/1-1-testing-slope-tool",
      "beforeText": "<p><strong>Incorrect.</strong></p>\n<p> You have selected the same point twice.</p>\n<p>Now click on\nthe point at \n<strong><em>the other end</em></strong>  \nof the interval from\n2undefined to 4 for x-axis.</p>\n<p>Then click \"OK\". </p>",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Piecewise linear function",
          "xAxis": "/shared/testing-slope-tool/axes/1",
          "yAxis": "/shared/testing-slope-tool/axes/2",
          "showCrossHairs": false,
          "showGraphGrid": true,
          "showToolTipCoords": true,
          "annotations": [
            "highlighted-point-1",
            "highlighted-point-2"
          ],
          "highlightedAnnotations": [],
          "data": [
            "Piecewise linear function",
            "Straight line"
          ],
          "datarefs": [
            "dataref-1"
          ],
          "legends": {
            "title": "legend",
            "type": "name",
            "referenceDatadef": "",
            "datadefs": [
              "Piecewise linear function",
              "Straight line"
            ]
          },
          "activeDatadefs": [
            "Piecewise linear function"
          ]
        },
        "bottom": {
          "type": "table",
          "data": "Piecewise linear function",
          "xLabel": "x",
          "yLabel": "y",
          "annotations": [
            "highlighted-point-1",
            "highlighted-point-2"
          ],
          "highlightedAnnotations": []
        }
      },
      "tools": [
        {
          "name": "tagging",
          "setup": {
            "tag": "tag-2",
            "data": "Piecewise linear function"
          }
        }
      ],
      "submitButtonTitle": "OK",
      "defaultBranch": "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/8",
      "responseBranches": [
        {
          "criterion": [
            "samePoint",
            "tag-1",
            "tag-2"
          ],
          "step": "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/6"
        },
        {
          "criterion": [
            "and",
            [
              "!=",
              [
                "coord",
                "x",
                "tag-2"
              ],
              2
            ],
            [
              "!=",
              [
                "coord",
                "x",
                "tag-2"
              ],
              4
            ]
          ],
          "step": "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/7"
        }
      ],
      "isFinalStep": false
    },
    {
      "url": "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/7",
      "activityPage": "/shared/testing-slope-tool/page/1-1-testing-slope-tool",
      "beforeText": "<p><strong>Incorrect.</strong></p>\n<p> The point you have selected is not \na point at \n<strong><em>one end</em></strong>  \nof the interval from\n2undefined to 4 for x-axis.  \nTry again.</p>\n<p>Now click on\nthe point at \n<strong><em>the other end</em></strong>  \nof the interval from\n2undefined to 4 for x-axis.</p>\n<p>Then click \"OK\". </p>",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Piecewise linear function",
          "xAxis": "/shared/testing-slope-tool/axes/1",
          "yAxis": "/shared/testing-slope-tool/axes/2",
          "showCrossHairs": false,
          "showGraphGrid": true,
          "showToolTipCoords": true,
          "annotations": [
            "highlighted-point-1",
            "highlighted-point-2"
          ],
          "highlightedAnnotations": [],
          "data": [
            "Piecewise linear function",
            "Straight line"
          ],
          "datarefs": [
            "dataref-1"
          ],
          "legends": {
            "title": "legend",
            "type": "name",
            "referenceDatadef": "",
            "datadefs": [
              "Piecewise linear function",
              "Straight line"
            ]
          },
          "activeDatadefs": [
            "Piecewise linear function"
          ]
        },
        "bottom": {
          "type": "table",
          "data": "Piecewise linear function",
          "xLabel": "x",
          "yLabel": "y",
          "annotations": [
            "highlighted-point-1",
            "highlighted-point-2"
          ],
          "highlightedAnnotations": []
        }
      },
      "tools": [
        {
          "name": "tagging",
          "setup": {
            "tag": "tag-2",
            "data": "Piecewise linear function"
          }
        }
      ],
      "submitButtonTitle": "OK",
      "defaultBranch": "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/8",
      "responseBranches": [
        {
          "criterion": [
            "samePoint",
            "tag-1",
            "tag-2"
          ],
          "step": "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/6"
        },
        {
          "criterion": [
            "and",
            [
              "!=",
              [
                "coord",
                "x",
                "tag-2"
              ],
              2
            ],
            [
              "!=",
              [
                "coord",
                "x",
                "tag-2"
              ],
              4
            ]
          ],
          "step": "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/7"
        }
      ],
      "isFinalStep": false
    },
    {
      "url": "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/8",
      "activityPage": "/shared/testing-slope-tool/page/1-1-testing-slope-tool",
      "beforeText": "<p> Here is the line connecting the two points. </p>\n<p> What is the slope of the straight line between x values of 2 and 4? </p>",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Piecewise linear function",
          "xAxis": "/shared/testing-slope-tool/axes/1",
          "yAxis": "/shared/testing-slope-tool/axes/2",
          "showCrossHairs": false,
          "showGraphGrid": true,
          "showToolTipCoords": true,
          "annotations": [
            "highlighted-point-1",
            "highlighted-point-2",
            "line-throughpoints1"
          ],
          "highlightedAnnotations": [],
          "data": [
            "Piecewise linear function",
            "Straight line"
          ],
          "datarefs": [
            "dataref-1"
          ],
          "legends": {
            "title": "legend",
            "type": "name",
            "referenceDatadef": "",
            "datadefs": [
              "Piecewise linear function",
              "Straight line"
            ]
          },
          "activeDatadefs": [
            "Piecewise linear function"
          ]
        },
        "bottom": {
          "type": "table",
          "data": "Piecewise linear function",
          "xLabel": "x",
          "yLabel": "y",
          "annotations": [
            "highlighted-point-1",
            "highlighted-point-2"
          ],
          "highlightedAnnotations": []
        }
      },
      "submitButtonTitle": "Check My Answer",
      "defaultBranch": "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/9",
      "responseTemplate": "/shared/testing-slope-tool/response-templates/numeric-1",
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
            [
              "slope",
              "tag-1",
              "tag-2"
            ],
            0.2
          ],
          "step": "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/19"
        }
      ],
      "isFinalStep": false,
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
    {
      "url": "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/9",
      "activityPage": "/shared/testing-slope-tool/page/1-1-testing-slope-tool",
      "beforeText": "<p><strong>Incorrect.</strong></p>\n<p> What is the slope of the straight line between x values of 2 and 4? </p>\n<p>Hint: Recall that the slope is \nthe change in  y-axis\ndivided by the change in x-axis.</p>",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Piecewise linear function",
          "xAxis": "/shared/testing-slope-tool/axes/1",
          "yAxis": "/shared/testing-slope-tool/axes/2",
          "showCrossHairs": false,
          "showGraphGrid": true,
          "showToolTipCoords": true,
          "annotations": [
            "highlighted-point-1",
            "highlighted-point-2",
            "line-throughpoints1"
          ],
          "highlightedAnnotations": [],
          "data": [
            "Piecewise linear function",
            "Straight line"
          ],
          "datarefs": [
            "dataref-1"
          ],
          "legends": {
            "title": "legend",
            "type": "name",
            "referenceDatadef": "",
            "datadefs": [
              "Piecewise linear function",
              "Straight line"
            ]
          },
          "activeDatadefs": [
            "Piecewise linear function"
          ]
        },
        "bottom": {
          "type": "table",
          "data": "Piecewise linear function",
          "xLabel": "x",
          "yLabel": "y",
          "annotations": [
            "highlighted-point-1",
            "highlighted-point-2"
          ],
          "highlightedAnnotations": []
        }
      },
      "submitButtonTitle": "Check My Answer",
      "defaultBranch": "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/10",
      "responseTemplate": "/shared/testing-slope-tool/response-templates/numeric-1",
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
            [
              "slope",
              "tag-1",
              "tag-2"
            ],
            0.2
          ],
          "step": "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/19"
        }
      ],
      "isFinalStep": false,
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
    {
      "url": "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/10",
      "activityPage": "/shared/testing-slope-tool/page/1-1-testing-slope-tool",
      "beforeText": "<p><strong>Incorrect.</strong></p>\n<p>What was the change in\ny-axis between the two points?</p>\n<p>Hint: Look at the graph.</p>",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Piecewise linear function",
          "xAxis": "/shared/testing-slope-tool/axes/1",
          "yAxis": "/shared/testing-slope-tool/axes/2",
          "showCrossHairs": false,
          "showGraphGrid": true,
          "showToolTipCoords": true,
          "annotations": [
            "highlighted-point-1",
            "highlighted-point-2",
            "line-throughpoints1"
          ],
          "highlightedAnnotations": [
            "rise-arrow1"
          ],
          "data": [
            "Piecewise linear function",
            "Straight line"
          ],
          "datarefs": [
            "dataref-1"
          ],
          "legends": {
            "title": "legend",
            "type": "name",
            "referenceDatadef": "",
            "datadefs": [
              "Piecewise linear function",
              "Straight line"
            ]
          },
          "activeDatadefs": [
            "Piecewise linear function"
          ]
        },
        "bottom": {
          "type": "table",
          "data": "Piecewise linear function",
          "xLabel": "x",
          "yLabel": "y",
          "annotations": [
            "highlighted-point-1",
            "highlighted-point-2"
          ],
          "highlightedAnnotations": []
        }
      },
      "submitButtonTitle": "Check My Answer",
      "defaultBranch": "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/11",
      "responseTemplate": "/shared/testing-slope-tool/response-templates/numeric-1",
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
              "delta",
              "y",
              [
                "slopeToolOrder",
                "tag-1",
                "tag-2"
              ]
            ],
            [
              "responseField",
              1
            ],
            0.2
          ],
          "step": "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/13"
        }
      ],
      "isFinalStep": false,
      "variableAssignments": [
        {
          "name": "student-response-field",
          "value": [
            "responseField",
            1
          ]
        }
      ]
    },
    {
      "url": "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/11",
      "activityPage": "/shared/testing-slope-tool/page/1-1-testing-slope-tool",
      "beforeText": "<p><strong>Incorrect.</strong></p>\n<p>What was the change in\ny-axis between the two points?</p>\n<p>Hint: Look at the table and the graph.</p>",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Piecewise linear function",
          "xAxis": "/shared/testing-slope-tool/axes/1",
          "yAxis": "/shared/testing-slope-tool/axes/2",
          "showCrossHairs": false,
          "showGraphGrid": true,
          "showToolTipCoords": true,
          "annotations": [
            "highlighted-point-1",
            "highlighted-point-2",
            "line-throughpoints1"
          ],
          "highlightedAnnotations": [
            "rise-arrow1"
          ],
          "data": [
            "Piecewise linear function",
            "Straight line"
          ],
          "datarefs": [
            "dataref-1"
          ],
          "legends": {
            "title": "legend",
            "type": "name",
            "referenceDatadef": "",
            "datadefs": [
              "Piecewise linear function",
              "Straight line"
            ]
          },
          "activeDatadefs": [
            "Piecewise linear function"
          ]
        },
        "bottom": {
          "type": "table",
          "data": "Piecewise linear function",
          "xLabel": "x",
          "yLabel": "y",
          "annotations": [
            "highlighted-point-1",
            "highlighted-point-2"
          ],
          "highlightedAnnotations": [
            "rise-bracket1"
          ]
        }
      },
      "submitButtonTitle": "Check My Answer",
      "defaultBranch": "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/12",
      "responseTemplate": "/shared/testing-slope-tool/response-templates/numeric-1",
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
              "delta",
              "y",
              [
                "slopeToolOrder",
                "tag-1",
                "tag-2"
              ]
            ],
            [
              "responseField",
              1
            ],
            0.2
          ],
          "step": "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/13"
        }
      ],
      "isFinalStep": false,
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
    {
      "url": "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/12",
      "activityPage": "/shared/testing-slope-tool/page/1-1-testing-slope-tool",
      "beforeText": "<p><strong>Incorrect.</strong></p>\n<p>The change is\n<b>%@</b> - <b>%@</b>, \nor <b>%@</b>.</p>",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Piecewise linear function",
          "xAxis": "/shared/testing-slope-tool/axes/1",
          "yAxis": "/shared/testing-slope-tool/axes/2",
          "showCrossHairs": false,
          "showGraphGrid": true,
          "showToolTipCoords": true,
          "annotations": [
            "highlighted-point-1",
            "highlighted-point-2",
            "line-throughpoints1"
          ],
          "highlightedAnnotations": [
            "rise-arrow1"
          ],
          "data": [
            "Piecewise linear function",
            "Straight line"
          ],
          "datarefs": [
            "dataref-1"
          ],
          "legends": {
            "title": "legend",
            "type": "name",
            "referenceDatadef": "",
            "datadefs": [
              "Piecewise linear function",
              "Straight line"
            ]
          },
          "activeDatadefs": [
            "Piecewise linear function"
          ]
        },
        "bottom": {
          "type": "table",
          "data": "Piecewise linear function",
          "xLabel": "x",
          "yLabel": "y",
          "annotations": [
            "highlighted-point-1",
            "highlighted-point-2"
          ],
          "highlightedAnnotations": [
            "rise-bracket1"
          ]
        }
      },
      "submitButtonTitle": "Continue",
      "defaultBranch": "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/13",
      "isFinalStep": false,
      "substitutedExpressions": [
        "end-y",
        "start-y",
        "change-y"
      ]
    },
    {
      "url": "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/13",
      "activityPage": "/shared/testing-slope-tool/page/1-1-testing-slope-tool",
      "beforeText": "<p>What was the change in\nx-axis between the two points?</p>\n<p>Hint: Look at the graph.</p>",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Piecewise linear function",
          "xAxis": "/shared/testing-slope-tool/axes/1",
          "yAxis": "/shared/testing-slope-tool/axes/2",
          "showCrossHairs": false,
          "showGraphGrid": true,
          "showToolTipCoords": true,
          "annotations": [
            "highlighted-point-1",
            "highlighted-point-2",
            "line-throughpoints1",
            "rise-arrow1"
          ],
          "highlightedAnnotations": [
            "run-arrow1"
          ],
          "data": [
            "Piecewise linear function",
            "Straight line"
          ],
          "datarefs": [
            "dataref-1"
          ],
          "legends": {
            "title": "legend",
            "type": "name",
            "referenceDatadef": "",
            "datadefs": [
              "Piecewise linear function",
              "Straight line"
            ]
          },
          "activeDatadefs": [
            "Piecewise linear function"
          ]
        },
        "bottom": {
          "type": "table",
          "data": "Piecewise linear function",
          "xLabel": "x",
          "yLabel": "y",
          "annotations": [
            "highlighted-point-1",
            "highlighted-point-2"
          ],
          "highlightedAnnotations": []
        }
      },
      "submitButtonTitle": "Check My Answer",
      "defaultBranch": "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/14",
      "responseTemplate": "/shared/testing-slope-tool/response-templates/numeric-1",
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
              "delta",
              "x",
              [
                "slopeToolOrder",
                "tag-1",
                "tag-2"
              ]
            ],
            [
              "responseField",
              1
            ],
            0.2
          ],
          "step": "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/16"
        }
      ],
      "isFinalStep": false,
      "variableAssignments": [
        {
          "name": "student-response-field",
          "value": [
            "responseField",
            1
          ]
        }
      ]
    },
    {
      "url": "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/14",
      "activityPage": "/shared/testing-slope-tool/page/1-1-testing-slope-tool",
      "beforeText": "<p><strong>Incorrect.</strong></p>\n<p>What was the change in\nx-axis between the two points?</p>\n<p>Hint: Look at the graph and the table.</p>",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Piecewise linear function",
          "xAxis": "/shared/testing-slope-tool/axes/1",
          "yAxis": "/shared/testing-slope-tool/axes/2",
          "showCrossHairs": false,
          "showGraphGrid": true,
          "showToolTipCoords": true,
          "annotations": [
            "highlighted-point-1",
            "highlighted-point-2",
            "line-throughpoints1",
            "rise-arrow1"
          ],
          "highlightedAnnotations": [
            "run-arrow1"
          ],
          "data": [
            "Piecewise linear function",
            "Straight line"
          ],
          "datarefs": [
            "dataref-1"
          ],
          "legends": {
            "title": "legend",
            "type": "name",
            "referenceDatadef": "",
            "datadefs": [
              "Piecewise linear function",
              "Straight line"
            ]
          },
          "activeDatadefs": [
            "Piecewise linear function"
          ]
        },
        "bottom": {
          "type": "table",
          "data": "Piecewise linear function",
          "xLabel": "x",
          "yLabel": "y",
          "annotations": [
            "highlighted-point-1",
            "highlighted-point-2"
          ],
          "highlightedAnnotations": [
            "run-bracket1"
          ]
        }
      },
      "submitButtonTitle": "Check My Answer",
      "defaultBranch": "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/15",
      "responseTemplate": "/shared/testing-slope-tool/response-templates/numeric-1",
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
              "delta",
              "x",
              [
                "slopeToolOrder",
                "tag-1",
                "tag-2"
              ]
            ],
            [
              "responseField",
              1
            ],
            0.2
          ],
          "step": "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/16"
        }
      ],
      "isFinalStep": false,
      "variableAssignments": [
        {
          "name": "student-response-field",
          "value": [
            "responseField",
            1
          ]
        }
      ]
    },
    {
      "url": "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/15",
      "activityPage": "/shared/testing-slope-tool/page/1-1-testing-slope-tool",
      "beforeText": "<p><strong>Incorrect.</strong></p>\n<p>The change \nbetween the points is <b>%@</b> - <b>%@</b>, \nor <b>%@</b>.</p>",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Piecewise linear function",
          "xAxis": "/shared/testing-slope-tool/axes/1",
          "yAxis": "/shared/testing-slope-tool/axes/2",
          "showCrossHairs": false,
          "showGraphGrid": true,
          "showToolTipCoords": true,
          "annotations": [
            "highlighted-point-1",
            "highlighted-point-2",
            "line-throughpoints1",
            "rise-arrow1"
          ],
          "highlightedAnnotations": [
            "run-arrow1"
          ],
          "data": [
            "Piecewise linear function",
            "Straight line"
          ],
          "datarefs": [
            "dataref-1"
          ],
          "legends": {
            "title": "legend",
            "type": "name",
            "referenceDatadef": "",
            "datadefs": [
              "Piecewise linear function",
              "Straight line"
            ]
          },
          "activeDatadefs": [
            "Piecewise linear function"
          ]
        },
        "bottom": {
          "type": "table",
          "data": "Piecewise linear function",
          "xLabel": "x",
          "yLabel": "y",
          "annotations": [
            "highlighted-point-1",
            "highlighted-point-2"
          ],
          "highlightedAnnotations": [
            "run-bracket1"
          ]
        }
      },
      "submitButtonTitle": "Continue",
      "defaultBranch": "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/16",
      "isFinalStep": false,
      "substitutedExpressions": [
        "end-x",
        "start-x",
        "change-x"
      ]
    },
    {
      "url": "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/16",
      "activityPage": "/shared/testing-slope-tool/page/1-1-testing-slope-tool",
      "beforeText": "<p>\n  If the change in y-axis is %@\n  and the change in x-axis is %@\n  then what is the slope in m/min.?\n</p>",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Piecewise linear function",
          "xAxis": "/shared/testing-slope-tool/axes/1",
          "yAxis": "/shared/testing-slope-tool/axes/2",
          "showCrossHairs": false,
          "showGraphGrid": true,
          "showToolTipCoords": true,
          "annotations": [
            "highlighted-point-1",
            "highlighted-point-2",
            "line-throughpoints1"
          ],
          "highlightedAnnotations": [],
          "data": [
            "Piecewise linear function",
            "Straight line"
          ],
          "datarefs": [
            "dataref-1"
          ],
          "legends": {
            "title": "legend",
            "type": "name",
            "referenceDatadef": "",
            "datadefs": [
              "Piecewise linear function",
              "Straight line"
            ]
          },
          "activeDatadefs": [
            "Piecewise linear function"
          ]
        },
        "bottom": {
          "type": "table",
          "data": "Piecewise linear function",
          "xLabel": "x",
          "yLabel": "y",
          "annotations": [
            "highlighted-point-1",
            "highlighted-point-2"
          ],
          "highlightedAnnotations": []
        }
      },
      "submitButtonTitle": "Check My Answer",
      "defaultBranch": "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/17",
      "responseTemplate": "/shared/testing-slope-tool/response-templates/numeric-1",
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
            [
              "slope",
              "tag-1",
              "tag-2"
            ],
            0.2
          ],
          "step": "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/19"
        }
      ],
      "isFinalStep": false,
      "variableAssignments": [
        {
          "name": "student-response-field",
          "value": [
            "responseField",
            1
          ]
        }
      ],
      "substitutedExpressions": [
        "change-y",
        "change-x"
      ]
    },
    {
      "url": "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/17",
      "activityPage": "/shared/testing-slope-tool/page/1-1-testing-slope-tool",
      "beforeText": "<p><strong>Incorrect.</strong></p>\n<p>\n  If the change in y-axis is %@\n  and the change in x-axis is %@\n  then what is the slope in m/min.?\n</p>\n<p>\n  Hint: Remember that it is \n  the change in y-axis \n  <b>divided by</b> \n  the change in x-axis.\n</p>",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Piecewise linear function",
          "xAxis": "/shared/testing-slope-tool/axes/1",
          "yAxis": "/shared/testing-slope-tool/axes/2",
          "showCrossHairs": false,
          "showGraphGrid": true,
          "showToolTipCoords": true,
          "annotations": [
            "highlighted-point-1",
            "highlighted-point-2",
            "line-throughpoints1"
          ],
          "highlightedAnnotations": [],
          "data": [
            "Piecewise linear function",
            "Straight line"
          ],
          "datarefs": [
            "dataref-1"
          ],
          "legends": {
            "title": "legend",
            "type": "name",
            "referenceDatadef": "",
            "datadefs": [
              "Piecewise linear function",
              "Straight line"
            ]
          },
          "activeDatadefs": [
            "Piecewise linear function"
          ]
        },
        "bottom": {
          "type": "table",
          "data": "Piecewise linear function",
          "xLabel": "x",
          "yLabel": "y",
          "annotations": [
            "highlighted-point-1",
            "highlighted-point-2"
          ],
          "highlightedAnnotations": []
        }
      },
      "submitButtonTitle": "Check My Answer",
      "defaultBranch": "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/18",
      "responseTemplate": "/shared/testing-slope-tool/response-templates/numeric-1",
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
            [
              "slope",
              "tag-1",
              "tag-2"
            ],
            0.2
          ],
          "step": "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/19"
        }
      ],
      "isFinalStep": false,
      "variableAssignments": [
        {
          "name": "student-response-field",
          "value": [
            "responseField",
            1
          ]
        }
      ],
      "substitutedExpressions": [
        "change-y",
        "change-x"
      ]
    },
    {
      "url": "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/18",
      "activityPage": "/shared/testing-slope-tool/page/1-1-testing-slope-tool",
      "beforeText": "<p><strong>Incorrect.</strong></p>\n<p>\nIf the change in y-axis is %@\nand the change in x-axis is %@,\nthe slope is \n<b>%@</b> divided by <b>%@</b>, \nor <b>%@</b> m/min..</p>",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Piecewise linear function",
          "xAxis": "/shared/testing-slope-tool/axes/1",
          "yAxis": "/shared/testing-slope-tool/axes/2",
          "showCrossHairs": false,
          "showGraphGrid": true,
          "showToolTipCoords": true,
          "annotations": [
            "highlighted-point-1",
            "highlighted-point-2",
            "line-throughpoints1"
          ],
          "highlightedAnnotations": [],
          "data": [
            "Piecewise linear function",
            "Straight line"
          ],
          "datarefs": [
            "dataref-1"
          ],
          "legends": {
            "title": "legend",
            "type": "name",
            "referenceDatadef": "",
            "datadefs": [
              "Piecewise linear function",
              "Straight line"
            ]
          },
          "activeDatadefs": [
            "Piecewise linear function"
          ]
        },
        "bottom": {
          "type": "table",
          "data": "Piecewise linear function",
          "xLabel": "x",
          "yLabel": "y",
          "annotations": [
            "highlighted-point-1",
            "highlighted-point-2"
          ],
          "highlightedAnnotations": []
        }
      },
      "isFinalStep": true,
      "nextButtonShouldSubmit": true,
      "substitutedExpressions": [
        "change-y",
        "change-x",
        "change-y",
        "change-x",
        "slope_str"
      ]
    },
    {
      "url": "/shared/testing-slope-tool/page/1-1-testing-slope-tool/step/19",
      "activityPage": "/shared/testing-slope-tool/page/1-1-testing-slope-tool",
      "beforeText": "<p><b>Correct!</b></p>\n<p>The slope is <b>2.00</b> m/min..</p>",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Piecewise linear function",
          "xAxis": "/shared/testing-slope-tool/axes/1",
          "yAxis": "/shared/testing-slope-tool/axes/2",
          "showCrossHairs": false,
          "showGraphGrid": true,
          "showToolTipCoords": true,
          "annotations": [
            "highlighted-point-1",
            "highlighted-point-2",
            "line-throughpoints1"
          ],
          "highlightedAnnotations": [],
          "data": [
            "Piecewise linear function",
            "Straight line"
          ],
          "datarefs": [
            "dataref-1"
          ],
          "legends": {
            "title": "legend",
            "type": "name",
            "referenceDatadef": "",
            "datadefs": [
              "Piecewise linear function",
              "Straight line"
            ]
          },
          "activeDatadefs": [
            "Piecewise linear function"
          ]
        },
        "bottom": {
          "type": "table",
          "data": "Piecewise linear function",
          "xLabel": "x",
          "yLabel": "y",
          "annotations": [],
          "highlightedAnnotations": []
        }
      },
      "isFinalStep": true,
      "nextButtonShouldSubmit": true,
      "substitutedExpressions": []
    },
    {
      "url": "/shared/testing-slope-tool/page/2-2-just-to-show-gridlines/step/1",
      "activityPage": "/shared/testing-slope-tool/page/2-2-just-to-show-gridlines",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Graph with Gridlines",
          "xAxis": "/shared/testing-slope-tool/axes/3",
          "yAxis": "/shared/testing-slope-tool/axes/4",
          "showCrossHairs": false,
          "showGraphGrid": true,
          "showToolTipCoords": true,
          "annotations": [],
          "highlightedAnnotations": [],
          "data": [
            "Piecewise linear function",
            "Straight line"
          ],
          "datarefs": [
            "dataref-1"
          ],
          "legends": {
            "title": "legend",
            "type": "name",
            "referenceDatadef": "",
            "datadefs": [
              "Piecewise linear function",
              "Straight line"
            ]
          },
          "activeDatadefs": [
            "Piecewise linear function"
          ]
        },
        "bottom": {
          "type": "table",
          "data": "Piecewise linear function",
          "xLabel": "",
          "yLabel": "",
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
      "url": "/shared/testing-slope-tool/response-templates/numeric-1",
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
      "url": "/shared/testing-slope-tool/axes/1",
      "units": "/shared/testing-slope-tool/units/minutes",
      "min": -10,
      "max": 10,
      "nSteps": 20,
      "label": "X-axis"
    },
    {
      "url": "/shared/testing-slope-tool/axes/2",
      "units": "/shared/testing-slope-tool/units/meters",
      "min": -10,
      "max": 10,
      "nSteps": 20,
      "label": "Y-axis"
    },
    {
      "url": "/shared/testing-slope-tool/axes/3",
      "units": "/shared/testing-slope-tool/units/minutes",
      "min": -10,
      "max": 10,
      "nSteps": 20,
      "label": "X"
    },
    {
      "url": "/shared/testing-slope-tool/axes/4",
      "units": "/shared/testing-slope-tool/units/meters",
      "min": -10,
      "max": 10,
      "nSteps": 20,
      "label": "Y"
    }
  ],
  "datadefs": [
    {
      "type": "UnorderedDataPoints",
      "records": [
        {
          "url": "/shared/testing-slope-tool/datadefs/Piecewise linear function",
          "name": "Piecewise linear function",
          "activity": "/shared/testing-slope-tool",
          "xUnits": "/shared/testing-slope-tool/units/minutes",
          "yUnits": "/shared/testing-slope-tool/units/meters",
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
          "pointType": "dot",
          "lineType": "connected",
          "lineSnapDistance": 0.1
        },
        {
          "url": "/shared/testing-slope-tool/datadefs/Straight line",
          "name": "Straight line",
          "activity": "/shared/testing-slope-tool",
          "xUnits": "/shared/testing-slope-tool/units/minutes",
          "yUnits": "/shared/testing-slope-tool/units/meters",
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
      "type": "LinearEquation",
      "records": [
        {
          "url": "/shared/testing-slope-tool/datarefs/dataref-1",
          "name": "dataref-1",
          "activity": "/shared/testing-slope-tool",
          "datadefName": "Straight line",
          "expressionForm": "slope-intercept",
          "xInterval": 0.1,
          "params": {
            "slope": 2,
            "yIntercept": 0
          }
        }
      ]
    }
  ],
  "tags": [
    {
      "url": "/shared/testing-slope-tool/tags/tag-1",
      "activity": "/shared/testing-slope-tool",
      "name": "tag-1",
      "x": 2,
      "y": 0
    },
    {
      "url": "/shared/testing-slope-tool/tags/tag-2",
      "activity": "/shared/testing-slope-tool",
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
          "url": "/shared/testing-slope-tool/annotations/highlighted-point-1",
          "name": "highlighted-point-1",
          "activity": "/shared/testing-slope-tool",
          "datadefName": "Piecewise linear function",
          "tag": "/shared/testing-slope-tool/tags/tag-1",
          "color": "#1f77b4"
        },
        {
          "url": "/shared/testing-slope-tool/annotations/highlighted-point-2",
          "name": "highlighted-point-2",
          "activity": "/shared/testing-slope-tool",
          "datadefName": "Piecewise linear function",
          "tag": "/shared/testing-slope-tool/tags/tag-2",
          "color": "#ff7f0e"
        }
      ]
    },
    {
      "type": "RunArrow",
      "records": [
        {
          "url": "/shared/testing-slope-tool/annotations/run-arrow1",
          "name": "run-arrow1",
          "activity": "/shared/testing-slope-tool",
          "color": "#cccccc",
          "datadefName": "Piecewise linear function",
          "p1Tag": "/shared/testing-slope-tool/tags/tag-1",
          "p2Tag": "/shared/testing-slope-tool/tags/tag-2"
        }
      ]
    },
    {
      "type": "RiseArrow",
      "records": [
        {
          "url": "/shared/testing-slope-tool/annotations/rise-arrow1",
          "name": "rise-arrow1",
          "activity": "/shared/testing-slope-tool",
          "color": "#cccccc",
          "datadefName": "Piecewise linear function",
          "p1Tag": "/shared/testing-slope-tool/tags/tag-1",
          "p2Tag": "/shared/testing-slope-tool/tags/tag-2"
        }
      ]
    },
    {
      "type": "RunBracket",
      "records": [
        {
          "url": "/shared/testing-slope-tool/annotations/run-bracket1",
          "name": "run-bracket1",
          "activity": "/shared/testing-slope-tool",
          "color": "#cccccc",
          "datadefName": "Piecewise linear function",
          "p1Tag": "/shared/testing-slope-tool/tags/tag-1",
          "p2Tag": "/shared/testing-slope-tool/tags/tag-2"
        }
      ]
    },
    {
      "type": "RiseBracket",
      "records": [
        {
          "url": "/shared/testing-slope-tool/annotations/rise-bracket1",
          "name": "rise-bracket1",
          "activity": "/shared/testing-slope-tool",
          "color": "#cccccc",
          "datadefName": "Piecewise linear function",
          "p1Tag": "/shared/testing-slope-tool/tags/tag-1",
          "p2Tag": "/shared/testing-slope-tool/tags/tag-2"
        }
      ]
    },
    {
      "type": "LineThroughPoints",
      "records": [
        {
          "url": "/shared/testing-slope-tool/annotations/line-throughpoints1",
          "name": "line-throughpoints1",
          "activity": "/shared/testing-slope-tool",
          "color": "#1f77b4",
          "datadefName": "Piecewise linear function",
          "p1Tag": "/shared/testing-slope-tool/tags/tag-1",
          "p2Tag": "/shared/testing-slope-tool/tags/tag-2"
        }
      ]
    }
  ],
  "variables": [],
  "units": [
    {
      "url": "/shared/testing-slope-tool/units/Time",
      "activity": "/shared/testing-slope-tool",
      "name": "Time",
      "abbreviation": "s",
      "pluralName": "Time"
    },
    {
      "url": "/shared/testing-slope-tool/units/Distance",
      "activity": "/shared/testing-slope-tool",
      "name": "Distance",
      "abbreviation": "m",
      "pluralName": "Distance"
    },
    {
      "url": "/shared/testing-slope-tool/units/degrees Celsius",
      "activity": "/shared/testing-slope-tool",
      "name": "degrees Celsiu",
      "abbreviation": "deg C",
      "pluralName": "degrees Celsius"
    },
    {
      "url": "/shared/testing-slope-tool/units/minutes",
      "activity": "/shared/testing-slope-tool",
      "name": "minute",
      "abbreviation": "min.",
      "pluralName": "minutes"
    },
    {
      "url": "/shared/testing-slope-tool/units/meters",
      "activity": "/shared/testing-slope-tool",
      "name": "meter",
      "abbreviation": "m",
      "pluralName": "meters"
    },
    {
      "url": "/shared/testing-slope-tool/units/seconds",
      "activity": "/shared/testing-slope-tool",
      "name": "second",
      "abbreviation": "s",
      "pluralName": "seconds"
    },
    {
      "url": "/shared/testing-slope-tool/units/centimeters",
      "activity": "/shared/testing-slope-tool",
      "name": "centimeter",
      "abbreviation": "cm",
      "pluralName": "centimeters"
    },
    {
      "url": "/shared/testing-slope-tool/units/grams",
      "activity": "/shared/testing-slope-tool",
      "name": "gram",
      "abbreviation": "gr",
      "pluralName": "grams"
    },
    {
      "url": "/shared/testing-slope-tool/units/miles",
      "activity": "/shared/testing-slope-tool",
      "name": "mile",
      "abbreviation": "mi",
      "pluralName": "miles"
    },
    {
      "url": "/shared/testing-slope-tool/units/hours",
      "activity": "/shared/testing-slope-tool",
      "name": "hour",
      "abbreviation": "hr",
      "pluralName": "hours"
    },
    {
      "url": "/shared/testing-slope-tool/units/Celsius",
      "activity": "/shared/testing-slope-tool",
      "name": "Celsiu",
      "abbreviation": "° C.",
      "pluralName": "Celsius"
    },
    {
      "url": "/shared/testing-slope-tool/units/dollars",
      "activity": "/shared/testing-slope-tool",
      "name": "dollar",
      "abbreviation": "$",
      "pluralName": "dollars"
    },
    {
      "url": "/shared/testing-slope-tool/units/inches",
      "activity": "/shared/testing-slope-tool",
      "name": "inche",
      "abbreviation": "in",
      "pluralName": "inches"
    },
    {
      "url": "/shared/testing-slope-tool/units/years",
      "activity": "/shared/testing-slope-tool",
      "name": "year",
      "abbreviation": "yr",
      "pluralName": "years"
    },
    {
      "url": "/shared/testing-slope-tool/units/millimeters",
      "activity": "/shared/testing-slope-tool",
      "name": "millimeter",
      "abbreviation": "mm",
      "pluralName": "millimeters"
    },
    {
      "url": "/shared/testing-slope-tool/units/parts per million",
      "activity": "/shared/testing-slope-tool",
      "name": "parts per million",
      "abbreviation": "ppm",
      "pluralName": "parts per million"
    }
  ]
};