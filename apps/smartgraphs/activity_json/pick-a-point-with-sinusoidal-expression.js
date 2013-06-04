/*globals Smartgraphs */

Smartgraphs.activityDocs = Smartgraphs.activityDocs || {};
Smartgraphs.activityDocs["/shared/pick-a-point-with-sinusoidal-expression"] =
{
  "_id": "pick-a-point-with-sinusoidal-expression.df6",
  "_rev": 1,
  "data_format_version": 6,
  "activity": {
    "title": "Pick A Point With Sinusoidal Expression",
    "url": "/shared/pick-a-point-with-sinusoidal-expression",
    "owner": "shared",
    "pages": [
      "/shared/pick-a-point-with-sinusoidal-expression/page/1-introduction"
    ],
    "axes": [
      "/shared/pick-a-point-with-sinusoidal-expression/axes/1",
      "/shared/pick-a-point-with-sinusoidal-expression/axes/2"
    ]
  },
  "pages": [
    {
      "name": "Introduction",
      "url": "/shared/pick-a-point-with-sinusoidal-expression/page/1-introduction",
      "activity": "/shared/pick-a-point-with-sinusoidal-expression",
      "index": 1,
      "introText": "In this activity....",
      "steps": [
        "/shared/pick-a-point-with-sinusoidal-expression/page/1-introduction/step/1",
        "/shared/pick-a-point-with-sinusoidal-expression/page/1-introduction/step/2",
        "/shared/pick-a-point-with-sinusoidal-expression/page/1-introduction/step/3",
        "/shared/pick-a-point-with-sinusoidal-expression/page/1-introduction/step/4",
        "/shared/pick-a-point-with-sinusoidal-expression/page/1-introduction/step/5"
      ],
      "firstStep": "/shared/pick-a-point-with-sinusoidal-expression/page/1-introduction/step/1",
      "contextVars": []
    }
  ],
  "steps": [
    {
      "url": "/shared/pick-a-point-with-sinusoidal-expression/page/1-introduction/step/1",
      "activityPage": "/shared/pick-a-point-with-sinusoidal-expression/page/1-introduction",
      "beforeText": "Click on the line where x is between 1 and 2",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "y = sin(2*x) + 5",
          "xAxis": "/shared/pick-a-point-with-sinusoidal-expression/axes/1",
          "yAxis": "/shared/pick-a-point-with-sinusoidal-expression/axes/2",
          "showCrossHairs": true,
          "showGraphGrid": true,
          "showToolTipCoords": false,
          "annotations": [
            "segment-overlay-1",
            "highlighted-point-1"
          ],
          "highlightedAnnotations": [],
          "data": [
            "datadef-1"
          ],
          "datarefs": [
            "dataref-1"
          ]
        },
        "bottom": {
          "type": "table",
          "data": "datadef-1",
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
            "data": "datadef-1"
          }
        }
      ],
      "submitButtonTitle": "Check My Answer",
      "defaultBranch": "/shared/pick-a-point-with-sinusoidal-expression/page/1-introduction/step/2",
      "responseBranches": [
        {
          "criterion": [
            "coordinatesInRange",
            "tag-1",
            1,
            null,
            2,
            null
          ],
          "step": "/shared/pick-a-point-with-sinusoidal-expression/page/1-introduction/step/5"
        }
      ],
      "isFinalStep": false
    },
    {
      "url": "/shared/pick-a-point-with-sinusoidal-expression/page/1-introduction/step/2",
      "activityPage": "/shared/pick-a-point-with-sinusoidal-expression/page/1-introduction",
      "beforeText": "Look at the graph...",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "y = sin(2*x) + 5",
          "xAxis": "/shared/pick-a-point-with-sinusoidal-expression/axes/1",
          "yAxis": "/shared/pick-a-point-with-sinusoidal-expression/axes/2",
          "showCrossHairs": true,
          "showGraphGrid": true,
          "showToolTipCoords": false,
          "annotations": [
            "segment-overlay-2",
            "highlighted-point-1"
          ],
          "highlightedAnnotations": [],
          "data": [
            "datadef-1"
          ],
          "datarefs": [
            "dataref-1"
          ]
        },
        "bottom": {
          "type": "table",
          "data": "datadef-1",
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
            "data": "datadef-1"
          }
        }
      ],
      "submitButtonTitle": "Check My Answer",
      "defaultBranch": "/shared/pick-a-point-with-sinusoidal-expression/page/1-introduction/step/3",
      "responseBranches": [
        {
          "criterion": [
            "coordinatesInRange",
            "tag-1",
            1,
            null,
            2,
            null
          ],
          "step": "/shared/pick-a-point-with-sinusoidal-expression/page/1-introduction/step/5"
        }
      ],
      "isFinalStep": false
    },
    {
      "url": "/shared/pick-a-point-with-sinusoidal-expression/page/1-introduction/step/3",
      "activityPage": "/shared/pick-a-point-with-sinusoidal-expression/page/1-introduction",
      "beforeText": "In these two intervals....",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "y = sin(2*x) + 5",
          "xAxis": "/shared/pick-a-point-with-sinusoidal-expression/axes/1",
          "yAxis": "/shared/pick-a-point-with-sinusoidal-expression/axes/2",
          "showCrossHairs": true,
          "showGraphGrid": true,
          "showToolTipCoords": false,
          "annotations": [
            "segment-overlay-3",
            "segment-overlay-4",
            "highlighted-point-1"
          ],
          "highlightedAnnotations": [],
          "data": [
            "datadef-1"
          ],
          "datarefs": [
            "dataref-1"
          ]
        },
        "bottom": {
          "type": "table",
          "data": "datadef-1",
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
            "data": "datadef-1"
          }
        }
      ],
      "submitButtonTitle": "Check My Answer",
      "defaultBranch": "/shared/pick-a-point-with-sinusoidal-expression/page/1-introduction/step/4",
      "responseBranches": [
        {
          "criterion": [
            "coordinatesInRange",
            "tag-1",
            1,
            null,
            2,
            null
          ],
          "step": "/shared/pick-a-point-with-sinusoidal-expression/page/1-introduction/step/5"
        }
      ],
      "isFinalStep": false
    },
    {
      "url": "/shared/pick-a-point-with-sinusoidal-expression/page/1-introduction/step/4",
      "activityPage": "/shared/pick-a-point-with-sinusoidal-expression/page/1-introduction",
      "beforeText": "If you look carefully, ....",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "y = sin(2*x) + 5",
          "xAxis": "/shared/pick-a-point-with-sinusoidal-expression/axes/1",
          "yAxis": "/shared/pick-a-point-with-sinusoidal-expression/axes/2",
          "showCrossHairs": true,
          "showGraphGrid": true,
          "showToolTipCoords": false,
          "annotations": [
            "segment-overlay-5"
          ],
          "highlightedAnnotations": [],
          "data": [
            "datadef-1"
          ],
          "datarefs": [
            "dataref-1"
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
    },
    {
      "url": "/shared/pick-a-point-with-sinusoidal-expression/page/1-introduction/step/5",
      "activityPage": "/shared/pick-a-point-with-sinusoidal-expression/page/1-introduction",
      "beforeText": "Four minutes into her run ....",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "y = sin(2*x) + 5",
          "xAxis": "/shared/pick-a-point-with-sinusoidal-expression/axes/1",
          "yAxis": "/shared/pick-a-point-with-sinusoidal-expression/axes/2",
          "showCrossHairs": true,
          "showGraphGrid": true,
          "showToolTipCoords": false,
          "annotations": [
            "segment-overlay-6"
          ],
          "highlightedAnnotations": [],
          "data": [
            "datadef-1"
          ],
          "datarefs": [
            "dataref-1"
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
      "url": "/shared/pick-a-point-with-sinusoidal-expression/axes/1",
      "min": 0,
      "max": 10,
      "nSteps": 10,
      "label": "x"
    },
    {
      "url": "/shared/pick-a-point-with-sinusoidal-expression/axes/2",
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
          "url": "/shared/pick-a-point-with-sinusoidal-expression/datadefs/datadef-1",
          "name": "datadef-1",
          "activity": "/shared/pick-a-point-with-sinusoidal-expression",
          "xLabel": "x",
          "xShortLabel": "x",
          "yLabel": "y",
          "yShortLabel": "y",
          "points": [],
          "pointType": "none",
          "lineType": "connected",
          "lineSnapDistance": 0.5
        }
      ]
    }
  ],
  "datarefs": [
    {
      "type": "SinusoidalEquation",
      "records": [
        {
          "url": "/shared/pick-a-point-with-sinusoidal-expression/datarefs/dataref-1",
          "name": "dataref-1",
          "activity": "/shared/pick-a-point-with-sinusoidal-expression",
          "datadefName": "datadef-1",
          "expressionForm": "sine-cosine",
          "angularFunction": "sine",
          "xInterval": 0.01,
          "params": {
            "amplitude": 1,
            "frequency": 2,
            "phase": 0,
            "centerAmplitude": 5
          }
        }
      ]
    }
  ],
  "tags": [
    {
      "url": "/shared/pick-a-point-with-sinusoidal-expression/tags/tag-1",
      "activity": "/shared/pick-a-point-with-sinusoidal-expression",
      "name": "tag-1"
    }
  ],
  "annotations": [
    {
      "type": "HighlightedPoint",
      "records": [
        {
          "url": "/shared/pick-a-point-with-sinusoidal-expression/annotations/highlighted-point-1",
          "name": "highlighted-point-1",
          "activity": "/shared/pick-a-point-with-sinusoidal-expression",
          "datadefName": "datadef-1",
          "tag": "/shared/pick-a-point-with-sinusoidal-expression/tags/tag-1",
          "color": "#1f77b4"
        }
      ]
    },
    {
      "type": "SegmentOverlay",
      "records": [
        {
          "url": "/shared/pick-a-point-with-sinusoidal-expression/annotations/segment-overlay-1",
          "name": "segment-overlay-1",
          "activity": "/shared/pick-a-point-with-sinusoidal-expression",
          "datadefName": "datadef-1",
          "color": "#000000",
          "x1Record": 1,
          "x2Record": 2
        },
        {
          "url": "/shared/pick-a-point-with-sinusoidal-expression/annotations/segment-overlay-2",
          "name": "segment-overlay-2",
          "activity": "/shared/pick-a-point-with-sinusoidal-expression",
          "datadefName": "datadef-1",
          "color": "#ff0000",
          "x1Record": 1,
          "x2Record": 2
        },
        {
          "url": "/shared/pick-a-point-with-sinusoidal-expression/annotations/segment-overlay-3",
          "name": "segment-overlay-3",
          "activity": "/shared/pick-a-point-with-sinusoidal-expression",
          "datadefName": "datadef-1",
          "color": "#00ff00",
          "x1Record": 3,
          "isUnboundedLeft": true
        },
        {
          "url": "/shared/pick-a-point-with-sinusoidal-expression/annotations/segment-overlay-4",
          "name": "segment-overlay-4",
          "activity": "/shared/pick-a-point-with-sinusoidal-expression",
          "datadefName": "datadef-1",
          "color": "#0000ff",
          "x1Record": 4,
          "isUnboundedRight": true
        },
        {
          "url": "/shared/pick-a-point-with-sinusoidal-expression/annotations/segment-overlay-5",
          "name": "segment-overlay-5",
          "activity": "/shared/pick-a-point-with-sinusoidal-expression",
          "datadefName": "datadef-1",
          "color": "#000000",
          "x1Record": 1,
          "x2Record": 2
        },
        {
          "url": "/shared/pick-a-point-with-sinusoidal-expression/annotations/segment-overlay-6",
          "name": "segment-overlay-6",
          "activity": "/shared/pick-a-point-with-sinusoidal-expression",
          "datadefName": "datadef-1",
          "color": "#ffffff",
          "x1Record": 1,
          "x2Record": 2
        }
      ]
    }
  ],
  "variables": [],
  "units": []
};