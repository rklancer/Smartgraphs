/*globals Smartgraphs */
Smartgraphs.activityJson = Smartgraphs.activityJson || {};
Smartgraphs.activityJson['/shared/boiling-water'] = 
{
  "_rev": "34-22527fd9d5e7795fc94b780e1134a460",
  "data_format_version": 2,
  "activity": {
    "title": "Boiling Water",
    "url": "/shared/boiling-water",
    "owner": "shared",
    "pages": [
      "/shared/boiling-water/page/1",
      "/shared/boiling-water/page/2",
      "/shared/boiling-water/page/3",
      "/shared/boiling-water/page/4",
      "/shared/boiling-water/page/5",
      "/shared/boiling-water/page/6"
    ],
    "pageListUrl": "/shared/boiling-water/pages"
  },
  "pages": [
    {
      "steps": [
        "/shared/boiling-water/page/1/step/1"
      ],
      "name": "Introduction",
      "firstStep": "/shared/boiling-water/page/1/step/1",
      "introText": "<h1>SmartGraphs</h1><p>The SmartGraphs project is developing <i>open source, browser-based</i> activities that help students learn the meaning of graphs. </p><p> Activities run directly in a modern Web browser such as Firefox.  Programming is done in Javascript using the Sproutcore framework.  This demo does not use Java or Flash.</p><p>Click the <b>Next</b> button for a demo.<p>",
      "url": "/shared/boiling-water/page/1",
      "activity": "/shared/boiling-water",
      "index": 1,
      "stepListUrl": "/shared/boiling-water/page/1/steps"
    },
    {
      "steps": [
        "/shared/boiling-water/page/2/step/1"
      ],
      "name": "Boiling Point Prediction",
      "firstStep": "/shared/boiling-water/page/2/step/1",
      "introText": "<h1>Boiling Water</h1><p>Water is being heated on a stove.  A thermometer placed in the water reads 90 degrees Celsius (&deg;C).  After 5 minutes the water begins to boil and the thermometer reads 100&deg;C.  The water continues boiling for 5 more minutes.</p><p>At the top right, use your mouse to sketch a graph of the temperature for a period of 10 minutes, starting when the temperature measured 90&deg;C.</p><p>When you are done click <b>Next</b>.</p>",
      "url": "/shared/boiling-water/page/2",
      "activity": "/shared/boiling-water",
      "index": 2,
      "stepListUrl": "/shared/boiling-water/page/2/steps"
    },
    {
      "steps": [
        "/shared/boiling-water/page/3/step/1"
      ],
      "name": "Boiling Point Actual",
      "firstStep": "/shared/boiling-water/page/3/step/1",
      "introText": "<h1>Boiling Water</h1><p>The graph at the top right shows the actual temperature of the water each minute for 10 minutes.  The graph at the bottom right is your prediction.</p><p>How well does your prediction match the actual graph?</p>",
      "url": "/shared/boiling-water/page/3",
      "activity": "/shared/boiling-water",
      "index": 3,
      "stepListUrl": "/shared/boiling-water/page/3/steps"
    },
    {
      "steps": [
        "/shared/boiling-water/page/4/step/1",
        "/shared/boiling-water/page/4/step/2",
        "/shared/boiling-water/page/4/step/3",
        "/shared/boiling-water/page/4/step/4"
      ],
      "name": "Find Point",
      "firstStep": "/shared/boiling-water/page/4/step/1",
      "introText": "<h1>Boiling Water</h1><p>Click on the graph or the table, at a time one minute or more after the water had started to boil.  When you are done click <b>Check Answer</b>.</p>",
      "url": "/shared/boiling-water/page/4",
      "activity": "/shared/boiling-water",
      "index": 4,
      "stepListUrl": "/shared/boiling-water/page/4/steps"
    },
    {
      "steps": [
        "/shared/boiling-water/page/5/step/1",
        "/shared/boiling-water/page/5/step/2",
        "/shared/boiling-water/page/5/step/3",
        "/shared/boiling-water/page/5/step/4"
      ],
      "name": "Multiple Choice",
      "firstStep": "/shared/boiling-water/page/5/step/1",
      "introText": "<p>Why did the temperature remain the same from 5 minutes to 10 minutes even though the stove was still heating the pot and the water?</p>",
      "url": "/shared/boiling-water/page/5",
      "activity": "/shared/boiling-water",
      "index": 5,
      "stepListUrl": "/shared/boiling-water/page/5/steps"
    }, 
    {
      "steps": [
        "/shared/boiling-water/page/6/step/1"
      ],
      "name": "End",
      "firstStep": "/shared/boiling-water/page/6/step/1",
      "introText": "<h1>SmartGraphs</h1><p>Thank you for trying this demo.</p><p>Although much has been accomplished since we began SmartGraphs about a year ago, there is lots more development and testing to be done!</p><p>We hope you will return to the Concord Consortium's <a href=\"http://www.concord.org/projects/smartgraphs\">SmartGraphs website</a> in a few months to look at what is new.</p><p></p><p>November 2010</p>",
      "url": "/shared/boiling-water/page/6",
      "activity": "/shared/boiling-water",
      "index": 6,
      "stepListUrl": "/shared/boiling-water/page/6/steps"
    }
  ],
  "steps": [
    {
      "url": "/shared/boiling-water/page/1/step/1",
      "activityPage": "/shared/boiling-water/page/1",
      "paneConfig": "single",
      "panes": {
        "single": {
          "type": "html",
           "html": "<div style=\"width: 440px; margin: 0 auto\"><img src=\"/static/smartgraphs/en/current/resources/smart-graphs-100.png\" style=\"position: relative; top: 60px; left: 10px\"><div style=\"position: relative; top: -40px; left: 120px;\"><h1 style=\"font-size: 48px; margin: 0\">SmartGraphs</h1><p style=\"margin: 5px 2px; font-size: 18px\">A project of the Concord Consortium</p></div></div><div style=\"position: absolute; bottom: 0\"><img src=\"/static/smartgraphs/en/current/resources/nsf-flat-logo.jpg\" style=\"position: absolute; left: 10px; bottom: 20px; width: 100px; height: 100px\"><p style=\"float: right; margin: 0 10px 20px 120px; font-size: 14px; font-style: italic\">This material is based upon work supported by the National Science Foundation under Grant No. DRL-0918522. Any opinions, findings, and conclusions or recommendations expressed in this material are those of the author(s) and do not necessarily reflect the views of the National Science Foundation.</p></div>"
        }
      },
      "beforeText": "",
      "responseTemplate": null,
      "afterText": "",
      "startCommands": [

      ],
      "shouldFinishImmediately": true,
      "shouldWaitForSubmissibleResponse": false,
      "submissibilityInspector": null,
      "submissibilityCriterion": null,
      "triggeredCommands": [

      ],
      "afterSubmissionCommands": [

      ],
      "responseInspector": null,
      "responseBranches": [

      ],
      "defaultBranch": null,
      "isFinalStep": true,
      "shouldAutoAdvancePage": false,
      "hideSubmitButton": true,
      "submitButtonTitle": "",
      "nextButtonShouldSubmit": false
    },
    {
      "url": "/shared/boiling-water/page/2/step/1",
      "activityPage": "/shared/boiling-water/page/2",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "name": "freehand-boiling-point"
        },
		"bottom": null
      },
      "beforeText": "",
      "responseTemplate": null,
      "afterText": "",
      "startCommands": [
        {
          "action": "startFreehandInput",
          "literalArgs": {
            "graphName": "freehand-boiling-point",
            "annotationName": "prediction"
          }
        }
      ],
      "shouldFinishImmediately": false,
      "shouldWaitForSubmissibleResponse": true,
      "submissibilityInspector": {
        "type": "Smartgraphs.SketchLengthInspector",
        "config": {
          "annotationName": "prediction",
          "check": "continuously"
        }
      },
      "submissibilityCriterion": {
        "gt": [
          "value",
          6
        ]
      },
      "triggeredCommands": [

      ],
      "afterSubmissionCommands": [

      ],
      "responseInspector": null,
      "responseBranches": [

      ],
      "defaultBranch": null,
      "isFinalStep": true,
      "shouldAutoAdvancePage": false,
      "hideSubmitButton": false,
      "submitButtonTitle": "",
      "nextButtonShouldSubmit": true
    },
    {
      "url": "/shared/boiling-water/page/3/step/1",
      "activityPage": "/shared/boiling-water/page/3",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "name": "correct-boiling-point-with-connected-dots",
          "datasetName": "correct-boiling-point"
        },
		"bottom": {
          "type": "graph",
          "name": "predicted-boiling-point"
        }
      },
      "beforeText": "",
      "responseTemplate": "/components/response-template/open",
      "afterText": "",
      "startCommands": [ ],
      "shouldFinishImmediately": false,
      "shouldWaitForSubmissibleResponse": true,
      "submissibilityInspector": {
        "type": "Smartgraphs.FirstResponseFieldInspector"
      },
      "submissibilityCriterion": {
        "gt": [
          {
            "length": {
              "strip": "value"
            }
          },
          0
        ]
      },
      "triggeredCommands": [ ],
      "afterSubmissionCommands": [ ],
      "responseInspector": null,
      "responseBranches": [ ],
      "defaultBranch": null,
      "isFinalStep": true,
      "shouldAutoAdvancePage": false,
      "hideSubmitButton": true,
      "submitButtonTitle": "",
      "nextButtonShouldSubmit": true
    },
    {
      "url": "/shared/boiling-water/page/4/step/1",
      "activityPage": "/shared/boiling-water/page/4",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "name": "correct-boiling-point",
          "datasetName": "correct-boiling-point"
        },
        "bottom": {
          "type": "table",
          "graphName": "correct-boiling-point",
          "datasetName": "correct-boiling-point"
        }
      },
      "beforeText": "<p>(For the demonstration, try entering an incorrect answer first.)</p>",
      "responseTemplate": null,
      "afterText": "",
      "startCommands": [ ],
      "shouldFinishImmediately": false,
      "shouldWaitForSubmissibleResponse": true,
      "submissibilityInspector": {
        "type": "Smartgraphs.SelectedPointInspector",
        "config": {
          "graphName": "correct-boiling-point",
          "datasetName": "correct-boiling-point"
        }
      },
      "submissibilityCriterion": {
        "notempty": "value"
      },
      "triggeredCommands": [ ],
      "afterSubmissionCommands": [ ],
      "responseInspector": {
        "type": "Smartgraphs.SelectedPointInspector",
        "config": {
          "graphName": "correct-boiling-point",
          "datasetName": "correct-boiling-point"
        }
      },
      "responseBranches": [
        {
          "criterion": {
            "in": [
              {
                "xvalue": "value"
              },
			  [0,1,2,3,4]
            ]
          },
          "step": "/shared/boiling-water/page/4/step/2"
        },
        {
          "criterion": {
            "equals": [
              {
                "xvalue": "value"
              },
              5
            ]
          },
          "step": "/shared/boiling-water/page/4/step/3"
        }
      ],
      "defaultBranch": "/shared/boiling-water/page/4/step/4",
      "isFinalStep": false,
      "shouldAutoAdvancePage": false,
      "hideSubmitButton": false,
      "submitButtonTitle": "Check Answer",
      "nextButtonShouldSubmit": false
    },
    {
      "url": "/shared/boiling-water/page/4/step/2",
      "activityPage": "/shared/boiling-water/page/4",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "name": "correct-boiling-point",
          "datasetName": "correct-boiling-point"
        },
        "bottom": {
          "type": "table",
          "graphName": "correct-boiling-point",
          "datasetName": "correct-boiling-point"
        }
      },
      "beforeText": "<p>Incorrect. In the highlighted section of the graph the water was not yet boiling. Try again.</p>",
      "responseTemplate": null,
      "afterText": "",
      "startCommands": [
        {
          "action": "removeAnnotation",
          "literalArgs": {
            "graphName": "correct-boiling-point",
            "name": "where-boiling-began"
          }
        },
        {
          "action": "addAnnotation",
          "literalArgs": {
            "graphName": "correct-boiling-point",
            "type": "Smartgraphs.HighlightedSegment",
            "name": "before-boiling-began"
          }
        }
	  ],
      "shouldFinishImmediately": false,
      "shouldWaitForSubmissibleResponse": true,
      "submissibilityInspector": {
        "type": "Smartgraphs.SelectedPointInspector",
        "config": {
          "graphName": "correct-boiling-point",
          "datasetName": "correct-boiling-point"
        }
      },
      "submissibilityCriterion": {
        "notempty": "value"
      },
      "triggeredCommands": [ ],
      "afterSubmissionCommands": [ ],
      "responseInspector": {
        "type": "Smartgraphs.SelectedPointInspector",
        "config": {
          "graphName": "correct-boiling-point",
          "datasetName": "correct-boiling-point"
        }
      },
      "responseBranches": [
        {
          "criterion": {
            "in": [
              {
                "xvalue": "value"
              },
			  [0,1,2,3,4]
            ]
          },
          "step": "/shared/boiling-water/page/4/step/2"
        },
        {
          "criterion": {
            "equals": [
              {
                "xvalue": "value"
              },
              5
            ]
          },
          "step": "/shared/boiling-water/page/4/step/3"
        }
      ],
      "defaultBranch": "/shared/boiling-water/page/4/step/4",
      "isFinalStep": false,
      "shouldAutoAdvancePage": false,
      "hideSubmitButton": false,
      "submitButtonTitle": "Check Answer",
      "nextButtonShouldSubmit": false
    },
    {
      "url": "/shared/boiling-water/page/4/step/3",
      "activityPage": "/shared/boiling-water/page/4",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "name": "correct-boiling-point",
          "datasetName": "correct-boiling-point"
        },
        "bottom": {
          "type": "table",
          "graphName": "correct-boiling-point",
          "datasetName": "correct-boiling-point"
        }
      },
      "beforeText": "<p>Incorrect. The circled point shows where the water began to boil. Try again.</p>",
      "responseTemplate": null,
      "afterText": "",
      "startCommands": [ 
        {
          "action": "removeAnnotation",
          "literalArgs": {
            "graphName": "correct-boiling-point",
            "name": "before-boiling-began"
          }
        },
        {
          "action": "addAnnotation",
          "literalArgs": {
            "graphName": "correct-boiling-point",
            "type": "Smartgraphs.HighlightedPoint",
            "name": "where-boiling-began"
          }
        }
	  ],
      "shouldFinishImmediately": false,
      "shouldWaitForSubmissibleResponse": true,
      "submissibilityInspector": {
        "type": "Smartgraphs.SelectedPointInspector",
        "config": {
          "graphName": "correct-boiling-point",
          "datasetName": "correct-boiling-point"
        }
      },
      "submissibilityCriterion": {
        "notempty": "value"
      },
      "triggeredCommands": [ ],
      "afterSubmissionCommands": [ ],
      "responseInspector": {
        "type": "Smartgraphs.SelectedPointInspector",
        "config": {
          "graphName": "correct-boiling-point",
          "datasetName": "correct-boiling-point"
        }
      },
      "responseBranches": [
        {
          "criterion": {
            "in": [
              {
                "xvalue": "value"
              },
			  [0,1,2,3,4]
            ]
          },
          "step": "/shared/boiling-water/page/4/step/2"
        },
        {
          "criterion": {
            "equals": [
              {
                "xvalue": "value"
              },
              5
            ]
          },
          "step": "/shared/boiling-water/page/4/step/3"
        }
      ],
      "defaultBranch": "/shared/boiling-water/page/4/step/4",
      "isFinalStep": false,
      "shouldAutoAdvancePage": false,
      "hideSubmitButton": false,
      "submitButtonTitle": "Check Answer",
      "nextButtonShouldSubmit": false
    },
    {
      "url": "/shared/boiling-water/page/4/step/4",
      "activityPage": "/shared/boiling-water/page/4",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "name": "correct-boiling-point",
          "datasetName": "correct-boiling-point"
        },
        "bottom": {
          "type": "table",
          "graphName": "correct-boiling-point",
          "datasetName": "correct-boiling-point"
        }
	  },
      "beforeText": "<p>Correct! The highlighted segment represents the period one minute or more after the water had started to boil.</p><p>Click the <b>Next</b> button to go to the next page.</p>",
      "responseTemplate": null,
      "afterText": "",
      "startCommands": [ 
        {
          "action": "removeAnnotation",
          "literalArgs": {
            "graphName": "correct-boiling-point",
            "name": "before-boiling-began"
          }
        },
        {
          "action": "removeAnnotation",
          "literalArgs": {
            "graphName": "correct-boiling-point",
            "name": "where-boiling-began"
          }
        },
        {
          "action": "addAnnotation",
          "literalArgs": {
            "graphName": "correct-boiling-point",
            "type": "Smartgraphs.HighlightedSegment",
            "name": "after-boiling-began"
          }
        }
	  ],
      "shouldFinishImmediately": true,
      "shouldWaitForSubmissibleResponse": false,
      "submissibilityInspector": null,
      "submissibilityCriterion": null,
      "triggeredCommands": [ ],
      "afterSubmissionCommands": [ ],
      "responseInspector": null,
      "responseBranches": [ ],
      "defaultBranch": null,
      "isFinalStep": true,
      "shouldAutoAdvancePage": false,
      "hideSubmitButton": true,
      "submitButtonTitle": "",
      "nextButtonShouldSubmit": false
    },
    {
      "url": "/shared/boiling-water/page/5/step/1",
      "activityPage": "/shared/boiling-water/page/5",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "name": "correct-boiling-point",
          "datasetName": "correct-boiling-point"
        },
        "bottom": {
          "type": "table",
          "graphName": "correct-boiling-point",
          "datasetName": "correct-boiling-point"
        }
      },
      "beforeText": "<p>(For the demonstration, try entering an incorrect answer first.)</p>",
      "responseTemplate": "/shared/boiling-water/response-template/plateau-explanation",
      "afterText": "",
      "startCommands": [ ],
      "shouldFinishImmediately": false,
      "shouldWaitForSubmissibleResponse": true,
      "submissibilityInspector": {
        "type": "Smartgraphs.FirstResponseFieldInspector"
      },
      "submissibilityCriterion": {
        "in": [ "value", [1,2,3,4] ]
      },
      "triggeredCommands": [

      ],
      "afterSubmissionCommands": [

      ],
      "responseInspector": {
        "type": "Smartgraphs.FirstResponseFieldInspector"
      },
      "responseBranches": [
        {
          "criterion": { "in": [ "value", [1,2,4] ] },
          "step": "/shared/boiling-water/page/5/step/2"
        },
        {
          "criterion": { "equals": [ "value", 3 ]
          },
          "step": "/shared/boiling-water/page/5/step/4"
        }
      ],
      "defaultBranch": "",
      "isFinalStep": false,
      "shouldAutoAdvancePage": false,
      "hideSubmitButton": false,
      "submitButtonTitle": "OK",
      "nextButtonShouldSubmit": false
    },
    {
      "url": "/shared/boiling-water/page/5/step/2",
      "activityPage": "/shared/boiling-water/page/5",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "name": "correct-boiling-point",
          "datasetName": "correct-boiling-point"
        },
        "bottom": {
          "type": "table",
          "graphName": "correct-boiling-point",
          "datasetName": "correct-boiling-point"
        }
      },
      "beforeText": "<p>Incorrect! Try again.</p>",
      "responseTemplate": "/shared/boiling-water/response-template/plateau-explanation",
      "afterText": "",
      "startCommands": [ ],
      "shouldFinishImmediately": false,
      "shouldWaitForSubmissibleResponse": true,
      "submissibilityInspector": {
        "type": "Smartgraphs.FirstResponseFieldInspector"
      },
      "submissibilityCriterion": {
        "in": [ "value", [1,2,3,4] ]
      },
      "triggeredCommands": [

      ],
      "afterSubmissionCommands": [

      ],
      "responseInspector": {
        "type": "Smartgraphs.FirstResponseFieldInspector"
      },
      "responseBranches": [
        {
          "criterion": { "in": [ "value", [1,2,4] ] },
          "step": "/shared/boiling-water/page/5/step/3"
        },
        {
          "criterion": { "equals": [ "value", 3 ]
          },
          "step": "/shared/boiling-water/page/5/step/4"
        }
      ],
      "defaultBranch": "",
      "isFinalStep": false,
      "shouldAutoAdvancePage": false,
      "hideSubmitButton": false,
      "submitButtonTitle": "OK",
      "nextButtonShouldSubmit": false
    },
    {
      "url": "/shared/boiling-water/page/5/step/3",
      "activityPage": "/shared/boiling-water/page/5",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "name": "correct-boiling-point",
          "datasetName": "correct-boiling-point"
        },
        "bottom": {
          "type": "table",
          "graphName": "correct-boiling-point",
          "datasetName": "correct-boiling-point"
        }
      },
      "beforeText": "<p>Incorrect! Think about what happens when water boils. Try again.</p>",
      "responseTemplate": "/shared/boiling-water/response-template/plateau-explanation",
      "afterText": "",
      "startCommands": [ ],
      "shouldFinishImmediately": false,
      "shouldWaitForSubmissibleResponse": true,
      "submissibilityInspector": {
        "type": "Smartgraphs.FirstResponseFieldInspector"
      },
      "submissibilityCriterion": {
        "in": [ "value", [1,2,3,4] ]
      },
      "triggeredCommands": [

      ],
      "afterSubmissionCommands": [

      ],
      "responseInspector": {
        "type": "Smartgraphs.FirstResponseFieldInspector"
      },
      "responseBranches": [
        {
          "criterion": { "in": [ "value", [1,2,4] ] },
          "step": "/shared/boiling-water/page/5/step/3"
        },
        {
          "criterion": { "equals": [ "value", 3 ]
          },
          "step": "/shared/boiling-water/page/5/step/4"
        }
      ],
      "defaultBranch": "",
      "isFinalStep": false,
      "shouldAutoAdvancePage": false,
      "hideSubmitButton": false,
      "submitButtonTitle": "OK",
      "nextButtonShouldSubmit": false
    },
    {
      "url": "/shared/boiling-water/page/5/step/4",
      "activityPage": "/shared/boiling-water/page/5",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "name": "correct-boiling-point",
          "datasetName": "correct-boiling-point"
        },
        "bottom": {
          "type": "table",
          "graphName": "correct-boiling-point",
          "datasetName": "correct-boiling-point"
        }
      },
      "beforeText": "<p>Correct! Once a liquid reaches the boiling point its temperature does not change.</p><p>Click <b>Next</b> to continue to the last page.</p>",
      "responseTemplate": null,
      "afterText": "",
      "startCommands": [ ],
      "shouldFinishImmediately": false,
      "shouldWaitForSubmissibleResponse": true,
      "submissibilityInspector": null,
      "submissibilityCriterion": { },
      "triggeredCommands": [ ],
      "afterSubmissionCommands": [ ],
      "responseInspector": null,
      "responseBranches": [ ],
      "defaultBranch": "",
      "isFinalStep": true,
      "shouldAutoAdvancePage": false,
      "hideSubmitButton": false,
      "submitButtonTitle": "",
      "nextButtonShouldSubmit": true
    },
    {
      "url": "/shared/boiling-water/page/6/step/1",
      "activityPage": "/shared/boiling-water/page/6",
      "paneConfig": "single",
      "panes": {
        "single": {
          "type": "html",
           "html": "<div style=\"width: 370px; margin: 0 auto; padding-top: 40px\"><img src=\"/static/smartgraphs/en/current/resources/cc-logo-vertical.jpg\"><h1 style=\"margin: 25px 10px 10px 20px\">Our SmartGraphs project team includes:</h1> <ul style=\"padding-left: 10px\"> <li>Eric Kattwinkel</li> <li>Rachel Kay</li> <li>Richard Klancer</li> <li>Carolyn Staudt</li> <li>Robert Tinker</li> <li>Kofi Weusijana</li> <li>Dewi Win</li> <li>Andy Zucker</li> </ul></div>"
        }
      },
      "beforeText": "",
      "responseTemplate": null,
      "afterText": "",
      "startCommands": [ ],
      "shouldFinishImmediately": false,
      "shouldWaitForSubmissibleResponse": false,
      "submissibilityInspector": null,
      "submissibilityCriterion": null,
      "triggeredCommands": [ ],
      "afterSubmissionCommands": [ ],
      "responseInspector": null,
      "responseBranches": [ ],
      "defaultBranch": null,
      "isFinalStep": true,
      "shouldAutoAdvancePage": false,
      "hideSubmitButton": true,
      "submitButtonTitle": "",
      "nextButtonShouldSubmit": false
    }
  ],
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
      "url": "/shared/boiling-water/response-template/plateau-explanation",
      "templateString": "",
      "fieldTypes": [
        "multiplechoice"
      ],
      "fieldChoicesList": [
        [
          "The thermometer was broken.",
          "The flame was too low.",
          "After the water boiled, the added heat turned water into steam.",
          "Water is a magical substance."
        ]
      ],
      "initialValues": [
        ""
      ]
    }
  ],
  "datasets": [
    {
      "url": "/shared/boiling-water/dataset/correct-boiling-point",
      "name": "correct-boiling-point",
      "activity": "/shared/boiling-water",
      "isExample": true,
      "points": [
        100,
        101,
        102,
        103,
        104,
        105,
        106,
        107,
        108,
        109,
		110
      ],
      "session": null,
      "defaultColor": null
    }
  ],
  "datapoints": [
    {
      "x": 0,
      "y": 90,
      "guid": 100,
      "dataset": "/shared/boiling-water/dataset/correct-boiling-point"
    },
    {
      "x": 1,
      "y": 92,
      "guid": 101,
      "dataset": "/shared/boiling-water/dataset/correct-boiling-point"
    },
    {
      "x": 2,
      "y": 94,
      "guid": 102,
      "dataset": "/shared/boiling-water/dataset/correct-boiling-point"
    },
    {
      "x": 3,
      "y": 96,
      "guid": 103,
      "dataset": "/shared/boiling-water/dataset/correct-boiling-point"
    },
    {
      "x": 4,
      "y": 98,
      "guid": 104,
      "dataset": "/shared/boiling-water/dataset/correct-boiling-point"
    },
    {
      "x": 5,
      "y": 100,
      "guid": 105,
      "dataset": "/shared/boiling-water/dataset/correct-boiling-point"
    },
    {
      "x": 6,
      "y": 100,
      "guid": 106,
      "dataset": "/shared/boiling-water/dataset/correct-boiling-point"
    },
    {
      "x": 7,
      "y": 100,
      "guid": 107,
      "dataset": "/shared/boiling-water/dataset/correct-boiling-point"
    },
    {
      "x": 8,
      "y": 100,
      "guid": 108,
      "dataset": "/shared/boiling-water/dataset/correct-boiling-point"
    },
    {
      "x": 9,
      "y": 100,
      "guid": 109,
      "dataset": "/shared/boiling-water/dataset/correct-boiling-point"
    },
    {
      "x": 10,
      "y": 100,
      "guid": 110,
      "dataset": "/shared/boiling-water/dataset/correct-boiling-point"
    }
  ],
  "graphs": [
    {
      "url": "/shared/boiling-water/graph/freehand-boiling-point",
      "activity": "/shared/boiling-water",
      "name": "freehand-boiling-point",
      "description": "freehand boiling point prediciton",
      "title": "Boiling Point: Prediction",
      "axes": "/shared/boiling-water/axes/80-120d_0-10m",
      "initialDatasets": [

      ],
      "initialAnnotations": [

      ]
    },
    {
      "url": "/shared/boiling-water/graph/correct-boiling-point",
      "activity": "/shared/boiling-water",
      "name": "correct-boiling-point",
      "description": "scatterpoint graph showing correct boiling point data",
      "title": "Boiling Point: Actual",
      "axes": "/shared/boiling-water/axes/80-120d_0-10m",
      "initialDatasets": [
        "correct-boiling-point"
      ],
      "initialAnnotations": [
		
      ]
    },
    {
      "url": "/shared/boiling-water/graph/correct-boiling-point-with-connected-dots",
      "activity": "/shared/boiling-water",
      "name": "correct-boiling-point-with-connected-dots",
      "description": "scatterpoint graph showing correct boiling point data, plus annotation connecting the dots",
      "title": "Boiling Point: Actual",
      "axes": "/shared/boiling-water/axes/80-120d_0-10m",
      "initialDatasets": [
        "correct-boiling-point"
      ],
      "initialAnnotations": [
        {
          "type": "Smartgraphs.FreehandSketch",
          "name": "sketch-to-match-correct-boiling-point"
        }
      ]
    },
    {
      "url": "/shared/boiling-water/graph/predicted-boiling-point",
      "activity": "/shared/boiling-water",
      "name": "predicted-boiling-point",
      "description": "graph showing user's prediction",
      "title": "Boiling Point: Predicted",
      "axes": "/shared/boiling-water/axes/80-120d_0-10m",
      "initialDatasets": [

      ],
      "initialAnnotations": [
        {
          "type": "Smartgraphs.FreehandSketch",
          "name": "prediction"
        }
      ]
    }
  ],
  "axes": [
    {
      "url": "/shared/boiling-water/axes/80-120d_0-10m",
      "xMin": 0,
      "xMax": 10,
      "xSteps": 10,
      "xLabel": "Time (minutes)",
      "xLabelAbbreviated": "Time (m)",
      "yMin": 80,
      "yMax": 120,
      "ySteps": 8,
      "yLabel": "Temperature (Celsius)",
      "yLabelAbbreviated": "Temp. (C)"
    }
  ],
  "freehandSketches": [
    {
      "url": "/shared/boiling-water/annotation/sketch-to-match-correct-boiling-point",
      "name": "sketch-to-match-correct-boiling-point",
      "activity": "/shared/boiling-water",
      "isExample": true,
      "points": [
        {
          "x": 0,
          "y": 90
        },
        {
          "x": 5,
          "y": 100
        },
        {
          "x": 10,
          "y": 100
        }
      ],
      "session": null
    }
  ],
  "highlightedPoints": [
    {
      "url": "/shared/boiling-water/annotation/where-boiling-began",
      "name": "where-boiling-began",
      "activity": "/shared/boiling-water",
      "isExample": true,
      "session": null,
      "point": 105
    }
  ],
  "highlightedSegments": [
    {
      "url": "/shared/boiling-water/annotation/before-boiling-began",
      "name": "before-boiling-began",
      "activity": "/shared/boiling-water",
      "isExample": true,
      "session": null,
      "points": [
        100,
        104
      ]
    },
    {
      "url": "/shared/boiling-water/annotation/after-boiling-began",
      "name": "after-boiling-began",
      "activity": "/shared/boiling-water",
      "isExample": true,
      "session": null,
      "points": [
        106,
        110
      ]
    }
  ],
  "linesToAxis": [

  ]
}
;