/*globals Smartgraphs */

Smartgraphs.activityDocs = Smartgraphs.activityDocs || {};
Smartgraphs.activityDocs["/shared/multiple-choice-with-three-datasets"] =
{
  "_id": "multiple-choice-with-three-datasets.df6",
  "_rev": 1,
  "data_format_version": 6,
  "activity": {
    "title": "Multiple Choice with three datasets",
    "url": "/shared/multiple-choice-with-three-datasets",
    "owner": "shared",
    "pages": [
      "/shared/multiple-choice-with-three-datasets/page/1-first-page"
    ],
    "axes": [
      "/shared/multiple-choice-with-three-datasets/axes/1",
      "/shared/multiple-choice-with-three-datasets/axes/2"
    ]
  },
  "pages": [
    {
      "name": "First Page",
      "url": "/shared/multiple-choice-with-three-datasets/page/1-first-page",
      "activity": "/shared/multiple-choice-with-three-datasets",
      "index": 1,
      "introText": "<p>Three cars are moving with constant speeds.</p>",
      "steps": [
        "/shared/multiple-choice-with-three-datasets/page/1-first-page/step/1",
        "/shared/multiple-choice-with-three-datasets/page/1-first-page/step/2",
        "/shared/multiple-choice-with-three-datasets/page/1-first-page/step/3",
        "/shared/multiple-choice-with-three-datasets/page/1-first-page/step/4",
        "/shared/multiple-choice-with-three-datasets/page/1-first-page/step/5"
      ],
      "firstStep": "/shared/multiple-choice-with-three-datasets/page/1-first-page/step/1",
      "contextVars": []
    }
  ],
  "steps": [
    {
      "url": "/shared/multiple-choice-with-three-datasets/page/1-first-page/step/1",
      "activityPage": "/shared/multiple-choice-with-three-datasets/page/1-first-page",
      "beforeText": "<p>Which of the following three cars is moving with greater velocity?</p>",
      "paneConfig": "single",
      "panes": {
        "single": {
          "type": "graph",
          "title": "The Graph",
          "xAxis": "/shared/multiple-choice-with-three-datasets/axes/1",
          "yAxis": "/shared/multiple-choice-with-three-datasets/axes/2",
          "annotations": [],
          "highlightedAnnotations": [],
          "data": [
            "Blue",
            "Green",
            "Orange"
          ],
          "datarefs": [
            "dataref-1",
            "dataref-2",
            "dataref-3"
          ],
          "legends": [
            "Blue",
            "Green",
            "Orange"
          ],
          "activeDatadefs": [
            "Green"
          ]
        }
      },
      "submitButtonTitle": "Check My Answer",
      "defaultBranch": "/shared/multiple-choice-with-three-datasets/page/1-first-page/step/2",
      "responseTemplate": "/shared/multiple-choice-with-three-datasets/response-templates/multiple-choice-1",
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
            "=",
            [
              "responseField",
              1
            ],
            2
          ],
          "step": "/shared/multiple-choice-with-three-datasets/page/1-first-page/step/5"
        }
      ],
      "isFinalStep": false
    },
    {
      "url": "/shared/multiple-choice-with-three-datasets/page/1-first-page/step/2",
      "activityPage": "/shared/multiple-choice-with-three-datasets/page/1-first-page",
      "beforeText": "<p>Hint: Think again!</p>",
      "paneConfig": "single",
      "panes": {
        "single": {
          "type": "graph",
          "title": "The Graph",
          "xAxis": "/shared/multiple-choice-with-three-datasets/axes/1",
          "yAxis": "/shared/multiple-choice-with-three-datasets/axes/2",
          "annotations": [
            "segment-overlay-1"
          ],
          "highlightedAnnotations": [],
          "data": [
            "Blue",
            "Green",
            "Orange"
          ],
          "datarefs": [
            "dataref-1",
            "dataref-2",
            "dataref-3"
          ],
          "legends": [
            "Blue",
            "Green",
            "Orange"
          ],
          "activeDatadefs": [
            "Green"
          ]
        }
      },
      "submitButtonTitle": "Check My Answer",
      "defaultBranch": "/shared/multiple-choice-with-three-datasets/page/1-first-page/step/3",
      "responseTemplate": "/shared/multiple-choice-with-three-datasets/response-templates/multiple-choice-1",
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
            "=",
            [
              "responseField",
              1
            ],
            2
          ],
          "step": "/shared/multiple-choice-with-three-datasets/page/1-first-page/step/5"
        }
      ],
      "isFinalStep": false
    },
    {
      "url": "/shared/multiple-choice-with-three-datasets/page/1-first-page/step/3",
      "activityPage": "/shared/multiple-choice-with-three-datasets/page/1-first-page",
      "beforeText": "<p>Hint: C'mon you can do it</p>",
      "paneConfig": "single",
      "panes": {
        "single": {
          "type": "graph",
          "title": "The Graph",
          "xAxis": "/shared/multiple-choice-with-three-datasets/axes/1",
          "yAxis": "/shared/multiple-choice-with-three-datasets/axes/2",
          "annotations": [
            "segment-overlay-2",
            "segment-overlay-3"
          ],
          "highlightedAnnotations": [],
          "data": [
            "Blue",
            "Green",
            "Orange"
          ],
          "datarefs": [
            "dataref-1",
            "dataref-2",
            "dataref-3"
          ],
          "legends": [
            "Blue",
            "Green",
            "Orange"
          ],
          "activeDatadefs": [
            "Green"
          ]
        }
      },
      "submitButtonTitle": "Check My Answer",
      "defaultBranch": "/shared/multiple-choice-with-three-datasets/page/1-first-page/step/4",
      "responseTemplate": "/shared/multiple-choice-with-three-datasets/response-templates/multiple-choice-1",
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
            "=",
            [
              "responseField",
              1
            ],
            2
          ],
          "step": "/shared/multiple-choice-with-three-datasets/page/1-first-page/step/5"
        }
      ],
      "isFinalStep": false
    },
    {
      "url": "/shared/multiple-choice-with-three-datasets/page/1-first-page/step/4",
      "activityPage": "/shared/multiple-choice-with-three-datasets/page/1-first-page",
      "beforeText": "<p>Incorrect. Correct answer is 'Green'</p>",
      "paneConfig": "single",
      "panes": {
        "single": {
          "type": "graph",
          "title": "The Graph",
          "xAxis": "/shared/multiple-choice-with-three-datasets/axes/1",
          "yAxis": "/shared/multiple-choice-with-three-datasets/axes/2",
          "annotations": [
            "segment-overlay-4"
          ],
          "highlightedAnnotations": [],
          "data": [
            "Blue",
            "Green",
            "Orange"
          ],
          "datarefs": [
            "dataref-1",
            "dataref-2",
            "dataref-3"
          ],
          "legends": [
            "Blue",
            "Green",
            "Orange"
          ],
          "activeDatadefs": [
            "Green"
          ]
        }
      },
      "isFinalStep": true,
      "nextButtonShouldSubmit": true
    },
    {
      "url": "/shared/multiple-choice-with-three-datasets/page/1-first-page/step/5",
      "activityPage": "/shared/multiple-choice-with-three-datasets/page/1-first-page",
      "beforeText": "<p>That's correct.</p>",
      "paneConfig": "single",
      "panes": {
        "single": {
          "type": "graph",
          "title": "The Graph",
          "xAxis": "/shared/multiple-choice-with-three-datasets/axes/1",
          "yAxis": "/shared/multiple-choice-with-three-datasets/axes/2",
          "annotations": [
            "segment-overlay-5"
          ],
          "highlightedAnnotations": [],
          "data": [
            "Blue",
            "Green",
            "Orange"
          ],
          "datarefs": [
            "dataref-1",
            "dataref-2",
            "dataref-3"
          ],
          "legends": [
            "Blue",
            "Green",
            "Orange"
          ],
          "activeDatadefs": [
            "Green"
          ]
        }
      },
      "isFinalStep": true,
      "nextButtonShouldSubmit": true
    }
  ],
  "responseTemplates": [
    {
      "url": "/shared/multiple-choice-with-three-datasets/response-templates/multiple-choice-1",
      "templateString": "",
      "fieldChoicesList": [
        [
          "Blue",
          "Green",
          "Orange"
        ]
      ],
      "initialValues": [
        ""
      ],
      "fieldTypes": [
        "multiplechoice"
      ]
    }
  ],
  "axes": [
    {
      "url": "/shared/multiple-choice-with-three-datasets/axes/1",
      "units": "/shared/multiple-choice-with-three-datasets/units/seconds",
      "min": 0,
      "max": 10,
      "nSteps": 10,
      "label": "Time"
    },
    {
      "url": "/shared/multiple-choice-with-three-datasets/axes/2",
      "units": "/shared/multiple-choice-with-three-datasets/units/meters",
      "min": 0,
      "max": 100,
      "nSteps": 10,
      "label": "Distance"
    }
  ],
  "datadefs": [
    {
      "type": "UnorderedDataPoints",
      "records": [
        {
          "url": "/shared/multiple-choice-with-three-datasets/datadefs/Blue",
          "name": "Blue",
          "activity": "/shared/multiple-choice-with-three-datasets",
          "xUnits": "/shared/multiple-choice-with-three-datasets/units/seconds",
          "yUnits": "/shared/multiple-choice-with-three-datasets/units/meters",
          "points": [],
          "pointType": "none",
          "lineType": "connected",
          "lineSnapDistance": 0.5
        },
        {
          "url": "/shared/multiple-choice-with-three-datasets/datadefs/Green",
          "name": "Green",
          "activity": "/shared/multiple-choice-with-three-datasets",
          "xUnits": "/shared/multiple-choice-with-three-datasets/units/seconds",
          "yUnits": "/shared/multiple-choice-with-three-datasets/units/meters",
          "points": [],
          "pointType": "none",
          "lineType": "connected",
          "lineSnapDistance": 0.5
        },
        {
          "url": "/shared/multiple-choice-with-three-datasets/datadefs/Orange",
          "name": "Orange",
          "activity": "/shared/multiple-choice-with-three-datasets",
          "xUnits": "/shared/multiple-choice-with-three-datasets/units/seconds",
          "yUnits": "/shared/multiple-choice-with-three-datasets/units/meters",
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
      "type": "LinearEquation",
      "records": [
        {
          "url": "/shared/multiple-choice-with-three-datasets/datarefs/dataref-1",
          "name": "dataref-1",
          "activity": "/shared/multiple-choice-with-three-datasets",
          "datadefName": "Blue",
          "expressionForm": "slope-intercept",
          "xInterval": 0.5,
          "params": {
            "slope": 5,
            "yIntercept": 0
          }
        },
        {
          "url": "/shared/multiple-choice-with-three-datasets/datarefs/dataref-2",
          "name": "dataref-2",
          "activity": "/shared/multiple-choice-with-three-datasets",
          "datadefName": "Green",
          "expressionForm": "slope-intercept",
          "xInterval": 0.5,
          "params": {
            "slope": 10,
            "yIntercept": -5
          }
        },
        {
          "url": "/shared/multiple-choice-with-three-datasets/datarefs/dataref-3",
          "name": "dataref-3",
          "activity": "/shared/multiple-choice-with-three-datasets",
          "datadefName": "Orange",
          "expressionForm": "slope-intercept",
          "xInterval": 0.5,
          "params": {
            "slope": 6,
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
          "url": "/shared/multiple-choice-with-three-datasets/annotations/segment-overlay-1",
          "name": "segment-overlay-1",
          "activity": "/shared/multiple-choice-with-three-datasets",
          "datadefName": "Green",
          "color": "#ff0000",
          "x1Record": 1,
          "x2Record": 3
        },
        {
          "url": "/shared/multiple-choice-with-three-datasets/annotations/segment-overlay-2",
          "name": "segment-overlay-2",
          "activity": "/shared/multiple-choice-with-three-datasets",
          "datadefName": "Green",
          "color": "#00ff00",
          "x1Record": 3,
          "isUnboundedLeft": true
        },
        {
          "url": "/shared/multiple-choice-with-three-datasets/annotations/segment-overlay-3",
          "name": "segment-overlay-3",
          "activity": "/shared/multiple-choice-with-three-datasets",
          "datadefName": "Green",
          "color": "#0000ff",
          "x1Record": 4,
          "isUnboundedRight": true
        },
        {
          "url": "/shared/multiple-choice-with-three-datasets/annotations/segment-overlay-4",
          "name": "segment-overlay-4",
          "activity": "/shared/multiple-choice-with-three-datasets",
          "datadefName": "Green",
          "color": "#000000",
          "x1Record": 1,
          "x2Record": 2
        },
        {
          "url": "/shared/multiple-choice-with-three-datasets/annotations/segment-overlay-5",
          "name": "segment-overlay-5",
          "activity": "/shared/multiple-choice-with-three-datasets",
          "datadefName": "Green",
          "color": "#000000",
          "x1Record": 1,
          "x2Record": 4
        }
      ]
    }
  ],
  "variables": [],
  "units": [
    {
      "url": "/shared/multiple-choice-with-three-datasets/units/meters",
      "activity": "/shared/multiple-choice-with-three-datasets",
      "name": "meter",
      "abbreviation": "m",
      "pluralName": "meters"
    },
    {
      "url": "/shared/multiple-choice-with-three-datasets/units/minutes",
      "activity": "/shared/multiple-choice-with-three-datasets",
      "name": "minute",
      "abbreviation": "m",
      "pluralName": "minutes"
    },
    {
      "url": "/shared/multiple-choice-with-three-datasets/units/meters per second",
      "activity": "/shared/multiple-choice-with-three-datasets",
      "name": "meters per second",
      "abbreviation": "m/s",
      "pluralName": "meters per second"
    },
    {
      "url": "/shared/multiple-choice-with-three-datasets/units/seconds",
      "activity": "/shared/multiple-choice-with-three-datasets",
      "name": "second",
      "abbreviation": "s",
      "pluralName": "seconds"
    }
  ]
}
