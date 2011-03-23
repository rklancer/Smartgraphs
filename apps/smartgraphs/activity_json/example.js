/*globals Smartgraphs */

Smartgraphs.activityDocs = Smartgraphs.activityDocs || {};
Smartgraphs.activityDocs["/shared/example"] =
{
  "_id": "example.df5",
  "_rev": "1",
  "data_format_version": 5,
  "activity": {
    "title": "Example Activity",
    "url": "/shared/example",
    "owner": "shared",
    "pages": [
      "/shared/example/page/1"
    ],
    "responseTemplates": [
      "/components/response-template/open",
      "/shared/example/response-template/example-q"
    ],
    "datasets": [],
    "units": [],
    "axes": [],
    "graphs": []
  },
  "pages": [
    {
      "name": "Questions",
      "url": "/shared/example/page/1",
      "activity": "/shared/example",
      "index": 1,
      "introText": "<h1>Questions</h1>",
      "steps": [
        "/shared/example/page/1/step/1",
        "/shared/example/page/1/step/2",
        "/shared/example/page/1/step/3"
      ],
      "firstStep": "/shared/example/page/1/step/1"
    }
  ],
  "steps": [
    /************ Page 1 ************/
    {
      "url": "/shared/example/page/1/step/1",
      "activityPage": "/shared/example/page/1",
      "paneConfig": "single",
      "panes": {
        "single": {
          "type": "image",
          "caption": "The Concord Consortium",
          "path": "http://www.concord.org/sites/all/themes/cc/img/css/bg-footer-home.png"
        }
      },
      "beforeText": "<p>What's different about the highlighted point?</p>",
      "submissibilityCriterion": ["isNumeric", ["responseField", 1]],
      "responseTemplate": "/shared/example/response-template/example-q",
      "nextButtonShouldSubmit": false,
      "defaultBranch": "/shared/example/page/1/step/2",
      "hideSubmitButton": false,
      "isFinalStep": false,
      "submitButtonTitle": "Next"
    },


    /************ Page 2 ************/
    {
      "url": "/shared/example/page/1/step/2",
      "activityPage": "/shared/example/page/1",
      "paneConfig": "single",
      "panes": {
        "single": {
          "type": "image",
          "caption": "The Concord Consortium",
          "path": "http://www.concord.org/sites/all/themes/cc/img/css/bg-footer-home.png"
        }
      },
      "beforeText": "<p>Try to explain why you made your choice. Write at least five characters. Bonus points for creative combinations of the words &quot;hermeneutic&quot;, &quot;heteroskedacity&quot;, and &quot;sesquipedalian&quot;.</p> <p>Failure is also an option.</p>",
      "responseTemplate": "/components/response-template/open",
      "submissibilityCriterion": ["textLengthIsAtLeast", 5, ["responseField", 1]],
      "defaultBranch": "/shared/example/page/1/step/3",
      "isFinalStep": false,
      "hideSubmitButton": false,
      "nextButtonShouldSubmit": false,
      "submitButtonTitle": "Next"
    },


    /************ Page 3 ************/
    {
      "url": "/shared/example/page/1/step/3",
      "activityPage": "/shared/example/page/1",
      "paneConfig": "single",
      "panes": {
        "single": {
          "type": "image",
          "caption": "The Concord Consortium",
          "path": "http://www.concord.org/sites/all/themes/cc/img/css/bg-footer-home.png"
        }
      },
      "beforeText": "<p>Congrats! You're all done!</p>",
      "responseTemplate": null,
      "hideSubmitButton": true,
      "defaultBranch": "/shared/example/page/1/step/3",
      "isFinalStep": true
    }
  ],


  /************ Continue global config ************/
  "responseTemplates": [
    {
      "url": "/components/response-template/open",
      "templateString": "",
      "fieldTypes": [
        "textarea"
      ],
      "fieldChoicesList": [
        null
      ],
      "initialValues": [
        ""
      ]
    },
    {
      "url": "/shared/example/response-template/example-q",
      "templateString": "",
      "fieldTypes": [
        "multiplechoice"
      ],
      "fieldChoicesList": [
        [
          "It represents a transformative hermeneutic of transgressive anti-hegemonic dialectics belonging to the 1990s",
          "It's not as high.",
          "It's sagging because it's depressed about not being as well-endowed in the area of y-ness as its immediate neighbors.",
          "It is too as high! You just have to look at it right."
        ]
      ],
      "initialValues": [
        ""
      ]
    }
  ],

  /************ Unused graph-related configs ************/
  "units": [],
  "axes": [],
  "graphs": [],
  "datasets": [],
  "datapoints": [],
  "tags": [],
  "annotations": []
};
