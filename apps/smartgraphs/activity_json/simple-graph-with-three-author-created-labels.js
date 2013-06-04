/*globals Smartgraphs */

Smartgraphs.activityDocs = Smartgraphs.activityDocs || {};
Smartgraphs.activityDocs["/shared/simple-graph-with-three-author-created-labels"] =
{
  "_id": "simple-graph-with-three-author-created-labels.df6",
  "_rev": 1,
  "data_format_version": 6,
  "activity": {
    "title": "Simple Graph with Three Author Created Labels",
    "url": "/shared/simple-graph-with-three-author-created-labels",
    "owner": "shared",
    "pages": [
      "/shared/simple-graph-with-three-author-created-labels/page/1-graph"
    ],
    "axes": [
      "/shared/simple-graph-with-three-author-created-labels/axes/1",
      "/shared/simple-graph-with-three-author-created-labels/axes/2"
    ]
  },
  "pages": [
    {
      "name": "Graph",
      "url": "/shared/simple-graph-with-three-author-created-labels/page/1-graph",
      "activity": "/shared/simple-graph-with-three-author-created-labels",
      "index": 1,
      "introText": "in this activity....",
      "steps": [
        "/shared/simple-graph-with-three-author-created-labels/page/1-graph/step/1"
      ],
      "firstStep": "/shared/simple-graph-with-three-author-created-labels/page/1-graph/step/1",
      "contextVars": []
    }
  ],
  "steps": [
    {
      "url": "/shared/simple-graph-with-three-author-created-labels/page/1-graph/step/1",
      "activityPage": "/shared/simple-graph-with-three-author-created-labels/page/1-graph",
      "paneConfig": "single",
      "panes": {
        "single": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/simple-graph-with-three-author-created-labels/axes/1",
          "yAxis": "/shared/simple-graph-with-three-author-created-labels/axes/2",
          "annotations": [
            "my-labels"
          ],
          "highlightedAnnotations": [],
          "data": [
            "datadef-1"
          ],
          "legends": {
            "title": "legend",
            "type": "name",
            "referenceDatadef": "",
            "datadefs": [
              "datadef-1"
            ]
          },
          "activeDatadefs": [
            "datadef-1"
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
      "url": "/shared/simple-graph-with-three-author-created-labels/axes/1",
      "min": 0,
      "max": 10,
      "nSteps": 10,
      "label": "Time"
    },
    {
      "url": "/shared/simple-graph-with-three-author-created-labels/axes/2",
      "min": 0,
      "max": 2000,
      "nSteps": 10,
      "label": "Position"
    }
  ],
  "datadefs": [
    {
      "type": "UnorderedDataPoints",
      "records": [
        {
          "url": "/shared/simple-graph-with-three-author-created-labels/datadefs/datadef-1",
          "name": "datadef-1",
          "activity": "/shared/simple-graph-with-three-author-created-labels",
          "points": [
            [
              1,
              200
            ],
            [
              2,
              400
            ],
            [
              3,
              600
            ]
          ],
          "lineSnapDistance": 0
        }
      ]
    }
  ],
  "tags": [],
  "annotations": [
    {
      "type": "Label",
      "records": [
        {
          "url": "/shared/simple-graph-with-three-author-created-labels/annotations/my-labels-1",
          "name": "my-labels-1",
          "activity": "/shared/simple-graph-with-three-author-created-labels",
          "text": "This is the first point.",
          "x": 1,
          "y": 200
        },
        {
          "url": "/shared/simple-graph-with-three-author-created-labels/annotations/my-labels-2",
          "name": "my-labels-2",
          "activity": "/shared/simple-graph-with-three-author-created-labels",
          "text": "This is a second label; does it overlap?.",
          "x": 1.2,
          "y": 210
        },
        {
          "url": "/shared/simple-graph-with-three-author-created-labels/annotations/my-labels-3",
          "name": "my-labels-3",
          "activity": "/shared/simple-graph-with-three-author-created-labels",
          "text": "This is a second label; does it overlap?.",
          "x": 1.3,
          "y": 220
        }
      ]
    },
    {
      "type": "LabelSet",
      "records": [
        {
          "url": "/shared/simple-graph-with-three-author-created-labels/annotations/my-labels",
          "name": "my-labels",
          "activity": "/shared/simple-graph-with-three-author-created-labels",
          "labels": [
            "/shared/simple-graph-with-three-author-created-labels/annotations/my-labels-1",
            "/shared/simple-graph-with-three-author-created-labels/annotations/my-labels-2",
            "/shared/simple-graph-with-three-author-created-labels/annotations/my-labels-3"
          ]
        }
      ]
    }
  ],
  "variables": [],
  "units": []
};
