/*globals Smartgraphs */

Smartgraphs.activityDocs = Smartgraphs.activityDocs || {};
Smartgraphs.activityDocs["/shared/multiple-choice-1"] =
{
  "_id": "multiple-choice-1.df6",
  "_rev": 1,
  "data_format_version": 6,
  "activity": {
    "title": "Multiple Choice 1",
    "url": "/shared/multiple-choice-1",
    "owner": "shared",
    "pages": [
      "/shared/multiple-choice-1/page/1-first-page"
    ],
    "axes": [
      "/shared/multiple-choice-1/axes/1",
      "/shared/multiple-choice-1/axes/2"
    ]
  },
  "pages": [
    {
      "name": "First Page",
      "url": "/shared/multiple-choice-1/page/1-first-page",
      "activity": "/shared/multiple-choice-1",
      "index": 1,
      "introText": "<p>This is an example page.</p>",
      "steps": [
        "/shared/multiple-choice-1/page/1-first-page/step/1",
        "/shared/multiple-choice-1/page/1-first-page/step/2",
        "/shared/multiple-choice-1/page/1-first-page/step/3",
        "/shared/multiple-choice-1/page/1-first-page/step/4",
        "/shared/multiple-choice-1/page/1-first-page/step/5",
        "/shared/multiple-choice-1/page/1-first-page/step/6"
      ],
      "firstStep": "/shared/multiple-choice-1/page/1-first-page/step/1"
    }
  ],
  "steps": [
    {
      "url": "/shared/multiple-choice-1/page/1-first-page/step/1",
      "activityPage": "/shared/multiple-choice-1/page/1-first-page",
      "beforeText": "<p>Which of the following choices is choice \"B\"?</p>",
      "responseTemplate": "/shared/multiple-choice-1/response-templates/multiple-choice-1",
      "paneConfig": "single",
      "panes": {
        "single": {
          "type": "graph",
          "title": "The Graph",
          "xAxis": "/shared/multiple-choice-1/axes/1",
          "yAxis": "/shared/multiple-choice-1/axes/2",
          "annotations": [

          ],
          "data": [
            "datadef-1"
          ]
        }
      },
      "submitButtonTitle": "Check My Answer",
      "submissibilityCriterion": ["isNumeric", ["responseField", 1]],
      "responseBranches": [
        {
          "criterion": ["=", ["responseField", 1], 2],
          "step": "/shared/multiple-choice-1/page/1-first-page/step/6"
        }
      ],
      "defaultBranch": "/shared/multiple-choice-1/page/1-first-page/step/2",
      "isFinalStep": false
    },

    {
      "url": "/shared/multiple-choice-1/page/1-first-page/step/2",
      "activityPage": "/shared/multiple-choice-1/page/1-first-page",
      "beforeText": "<p>You can try harder than that.</p>",
      "responseTemplate": "/shared/multiple-choice-1/response-templates/multiple-choice-1",
      "paneConfig": "single",
      "panes": {
        "single": {
          "type": "graph",
          "title": "The Graph",
          "xAxis": "/shared/multiple-choice-1/axes/1",
          "yAxis": "/shared/multiple-choice-1/axes/2",
          "annotations": [

          ],
          "data": [
            "datadef-1"
          ]
        }
      },
      "submitButtonTitle": "Check My Answer",
      "submissibilityCriterion": ["isNumeric", ["responseField", 1]],
      "responseBranches": [
        {
          "criterion": ["=", ["responseField", 1], 2],
          "step": "/shared/multiple-choice-1/page/1-first-page/step/6"
        }
      ],
      "defaultBranch": "/shared/multiple-choice-1/page/1-first-page/step/3",
      "isFinalStep": false
    },

    {
      "url": "/shared/multiple-choice-1/page/1-first-page/step/3",
      "activityPage": "/shared/multiple-choice-1/page/1-first-page",
      "beforeText": "<p>I'm starting to worry about you.</p>",
      "responseTemplate": "/shared/multiple-choice-1/response-templates/multiple-choice-1",
      "paneConfig": "single",
      "panes": {
        "single": {
          "type": "graph",
          "title": "The Graph",
          "xAxis": "/shared/multiple-choice-1/axes/1",
          "yAxis": "/shared/multiple-choice-1/axes/2",
          "annotations": [

          ],
          "data": [
            "datadef-1"
          ]
        }
      },
      "submitButtonTitle": "Check My Answer",
      "submissibilityCriterion": ["isNumeric", ["responseField", 1]],
      "responseBranches": [
        {
          "criterion": ["=", ["responseField", 1], 2],
          "step": "/shared/multiple-choice-1/page/1-first-page/step/6"
        }
      ],
      "defaultBranch": "/shared/multiple-choice-1/page/1-first-page/step/4",
      "isFinalStep": false
    },

    {
      "url": "/shared/multiple-choice-1/page/1-first-page/step/4",
      "activityPage": "/shared/multiple-choice-1/page/1-first-page",
      "beforeText": "<p>C'mon, you can do it. Or so I used to think.</p>",
      "responseTemplate": "/shared/multiple-choice-1/response-templates/multiple-choice-1",
      "paneConfig": "single",
      "panes": {
        "single": {
          "type": "graph",
          "title": "The Graph",
          "xAxis": "/shared/multiple-choice-1/axes/1",
          "yAxis": "/shared/multiple-choice-1/axes/2",
          "annotations": [

          ],
          "data": [
            "datadef-1"
          ]
        }
      },
      "submitButtonTitle": "Check My Answer",
      "submissibilityCriterion": ["isNumeric", ["responseField", 1]],
      "responseBranches": [
        {
          "criterion": ["=", ["responseField", 1], 2],
          "step": "/shared/multiple-choice-1/page/1-first-page/step/6"
        }
      ],
      "defaultBranch": "/shared/multiple-choice-1/page/1-first-page/step/5",
      "isFinalStep": false
    },

    {
      "url": "/shared/multiple-choice-1/page/1-first-page/step/5",
      "activityPage": "/shared/multiple-choice-1/page/1-first-page",
      "beforeText": "<p>Incorrect. The correct choice B is choice B.</p>",
      "paneConfig": "single",
      "panes": {
        "single": {
          "type": "graph",
          "title": "The Graph",
          "xAxis": "/shared/multiple-choice-1/axes/1",
          "yAxis": "/shared/multiple-choice-1/axes/2",
          "annotations": [

          ],
          "data": [
            "datadef-1"
          ]
        }
      },
      "isFinalStep": true,
      "nextButtonShouldSubmit": true
    },

    {
      "url": "/shared/multiple-choice-1/page/1-first-page/step/6",
      "activityPage": "/shared/multiple-choice-1/page/1-first-page",
      "beforeText": "<p>That's right. I wanted choice B, you gave it to me.</p>",
      "paneConfig": "single",
      "panes": {
        "single": {
          "type": "graph",
          "title": "The Graph",
          "xAxis": "/shared/multiple-choice-1/axes/1",
          "yAxis": "/shared/multiple-choice-1/axes/2",
          "annotations": [

          ],
          "data": [
            "datadef-1"
          ]
        }
      },
      "isFinalStep": true,
      "nextButtonShouldSubmit": true
    }

  ],
  "responseTemplates": [
    {
      "url": "/shared/multiple-choice-1/response-templates/multiple-choice-1",
      "templateString": "",
      "fieldTypes": [
        "multiplechoice"
      ],
      "fieldChoicesList": [
        [
          "Choice A",
          "Choice B",
          "Choice C"
        ]
      ],
      "initialValues": [
        ""
      ]
    }
  ],
  "axes": [
    {
      "url": "/shared/multiple-choice-1/axes/1",
      "units": "/shared/multiple-choice-1/units/seconds",
      "min": 0,
      "max": 10,
      "nSteps": 10,
      "label": "Time"
    },
    {
      "url": "/shared/multiple-choice-1/axes/2",
      "units": "/shared/multiple-choice-1/units/meters",
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
          "url": "/shared/multiple-choice-1/datadefs/datadef-1",
          "name": "datadef-1",
          "activity": "/shared/multiple-choice-1",
          "xUnits": "/shared/multiple-choice-1/units/seconds",
          "xLabel": "Time",
          "xShortLabel": "Time",
          "yUnits": "/shared/multiple-choice-1/units/meters",
          "yLabel": "Distance",
          "yShortLabel": "Distance",
          "points": [
            [
              0,
              0
            ],
            [
              1,
              10
            ],
            [
              2,
              20
            ],
            [
              3,
              30
            ],
            [
              4,
              40
            ]
          ]
        }
      ]
    }
  ],
  "tags": [

  ],
  "annotations": [

  ],
  "variables": [

  ],
  "units": [
    {
      "url": "/shared/multiple-choice-1/units/seconds",
      "activity": "/shared/multiple-choice-1",
      "name": "second",
      "abbreviation": "s",
      "pluralName": "seconds"
    },
    {
      "url": "/shared/multiple-choice-1/units/meters",
      "activity": "/shared/multiple-choice-1",
      "name": "meter",
      "abbreviation": "m",
      "pluralName": "meters"
    },
    {
      "url": "/shared/multiple-choice-1/units/minutes",
      "activity": "/shared/multiple-choice-1",
      "name": "minute",
      "abbreviation": "m",
      "pluralName": "minutes"
    },
    {
      "url": "/shared/multiple-choice-1/units/meters per second",
      "activity": "/shared/multiple-choice-1",
      "name": "meters per second",
      "abbreviation": "m/s",
      "pluralName": "meters per second"
    }
  ]
};
