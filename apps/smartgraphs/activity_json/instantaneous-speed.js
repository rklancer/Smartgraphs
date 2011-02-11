/*globals Smartgraphs */

Smartgraphs.activityDocs = Smartgraphs.activityDocs || {};
Smartgraphs.activityDocs["/shared/instantaneous-speed"] = 
{
  "_id": "instantanous-speed.df5",
  "_rev": "10-bfcf2cf128db41df9bd9141454564e9d",
  "data_format_version": 5,
  "activity": {
    "title": "Instantaneous Speed (Slope Tool)",
    "url": "/shared/instantaneous-speed",
    "owner": "shared",
    "pages": [   
      "/shared/instantaneous-speed/page/12",
      "/shared/instantaneous-speed/page/13",
      "/shared/instantaneous-speed/page/14"
    ],
    "datasets": [
      "/shared/instantaneous-speed/dataset/slope-data"
    ],
    "units": [

    ],
    "axes": [
      "/shared/instantaneous-speed/axes/10s",
      "/shared/instantaneous-speed/axes/15s",
      "/shared/instantaneous-speed/axes/30s",
      "/shared/instantaneous-speed/axes/4.5m",
      "/shared/instantaneous-speed/axes/5m",
      "/shared/instantaneous-speed/axes/15m"
    ],
    "graphs": [
      "/shared/instantaneous-speed/graph/freehand-walking-normal",
      "/shared/instantaneous-speed/graph/prediction-walking-normal",
      "/shared/instantaneous-speed/graph/freehand-walking-slow",
      "/shared/instantaneous-speed/graph/prediction-walking-slow",
      "/shared/instantaneous-speed/graph/sensor-normal-walking",
      "/shared/instantaneous-speed/graph/sensor-result-normal-walking",
      "/shared/instantaneous-speed/graph/sensor-slow-walking",
      "/shared/instantaneous-speed/graph/sensor-result-slow-walking",
      "/shared/instantaneous-speed/graph/slope-graph",
      "/shared/instantaneous-speed/graph/slope-graph-analyze"
    ],
    "responseTemplates": [
      "/components/response-template/open",
      "/components/response-template/numeric"
    ]
  },
  "pages": [
    {
      "steps": [
        "/shared/instantaneous-speed/page/12/step/1",
        "/shared/instantaneous-speed/page/12/step/2",
        "/shared/instantaneous-speed/page/12/step/3",
        "/shared/instantaneous-speed/page/12/step/4",
        "/shared/instantaneous-speed/page/12/step/5",
        "/shared/instantaneous-speed/page/12/step/6",
        "/shared/instantaneous-speed/page/12/step/7",
        "/shared/instantaneous-speed/page/12/step/8",
        "/shared/instantaneous-speed/page/12/step/9",
        "/shared/instantaneous-speed/page/12/step/10",
        "/shared/instantaneous-speed/page/12/step/11",
        "/shared/instantaneous-speed/page/12/step/12",
        "/shared/instantaneous-speed/page/12/step/13",
        "/shared/instantaneous-speed/page/12/step/14",
        "/shared/instantaneous-speed/page/12/step/15",
        "/shared/instantaneous-speed/page/12/step/16"
      ],
      "name": "Instantaneous Speed",
      "firstStep": "/shared/instantaneous-speed/page/12/step/1",
      "introText": "<h1>Analysis</h1><p>Suppose you collected some actual position-time data while walking from 0 to 15 meters and displayed your data to the right. Let's find out how fast you walked during different time intervals.</p><p>First you will pick two points that are next to each other and find the velocity between those points. This calculation will be close to your <b>instantaneous</b> velocity. </p>",
      "url": "/shared/instantaneous-speed/page/12",
      "activity": "/shared/instantaneous-speed",
      "index": 12
    },
    {
      "steps": [
        "/shared/instantaneous-speed/page/13/step/1",
        "/shared/instantaneous-speed/page/13/step/1a",
        "/shared/instantaneous-speed/page/13/step/2",
        "/shared/instantaneous-speed/page/13/step/3",
        "/shared/instantaneous-speed/page/13/step/4",
        "/shared/instantaneous-speed/page/13/step/5",
        "/shared/instantaneous-speed/page/13/step/6",
        "/shared/instantaneous-speed/page/13/step/7",
        "/shared/instantaneous-speed/page/13/step/8",
        "/shared/instantaneous-speed/page/13/step/9",
        "/shared/instantaneous-speed/page/13/step/10",
        "/shared/instantaneous-speed/page/13/step/11",
        "/shared/instantaneous-speed/page/13/step/12",
        "/shared/instantaneous-speed/page/13/step/13",
        "/shared/instantaneous-speed/page/13/step/14",
        "/shared/instantaneous-speed/page/13/step/15",
        "/shared/instantaneous-speed/page/13/step/16"
      ],
      "name": "Instantaneous Speed",
      "firstStep": "/shared/instantaneous-speed/page/13/step/1",
      "introText": "<h1>Analysis</h1><p>Now you will pick another set of points that are next to each other and find the velocity between those points.</p>",
      "url": "/shared/instantaneous-speed/page/13",
      "activity": "/shared/instantaneous-speed",
      "index": 13
    },
    {
      "steps": [
        "/shared/instantaneous-speed/page/14/step/1"
      ],
      "name": "Instantaneous Speed III",
      "firstStep": "/shared/instantaneous-speed/page/14/step/1",
      "introText": "<h1>Analysis</h1><p>Was your velocity the same during the two different time intervals? If not, during which interval were you going faster? Explain how you know.</p>",
      "url": "/shared/instantaneous-speed/page/14",
      "activity": "/shared/instantaneous-speed",
      "index": 14
    }
  ],
  "steps": [
    {
      "url": "/shared/instantaneous-speed/page/12/step/1",
      "activityPage": "/shared/instantaneous-speed/page/12",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "name": "slope-graph"
        },
        "bottom": {
          "type": "table",
          "graphName": "slope-graph",
          "datasetName": "slope-data"
        }
      },
      "beforeText": "<p>Select a point and then click <b>OK</b>.</p>",
      "responseTemplate": "",
      "afterText": "",
      "startCommands": [
        {
          "action": "startInteractiveSelection",
          "literalArgs": {
            "annotationName": "first-point-A",
            "graphName": "slope-graph",
            "datasetName": "slope-data",
            "color": "#1f77b3"
          }
        }
      ],
      "shouldFinishImmediately": false,
      "shouldWaitForSubmissibleResponse": true,
      "submissibilityInspector": null,
      "submissibilityCriterion": null,
      "triggeredCommands": [

      ],
      "afterSubmissionCommands": [

      ],
      "responseInspector": null,
      "responseBranches": [

      ],
      "defaultBranch": "/shared/instantaneous-speed/page/12/step/2",
      "isFinalStep": false,
      "shouldAutoAdvancePage": false,
      "hideSubmitButton": false,
      "submitButtonTitle": "OK",
      "nextButtonShouldSubmit": false
    },
    {
      "url": "/shared/instantaneous-speed/page/12/step/2",
      "activityPage": "/shared/instantaneous-speed/page/12",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "name": "slope-graph"
        },
        "bottom": {
          "type": "table",
          "graphName": "slope-graph",
          "datasetName": "slope-data"
        }
      },
      "beforeText": "<p>Select a point next to to the first point. Then click <b>OK</b>.</p>",
      "responseTemplate": "",
      "afterText": "",
      "startCommands": [
        {
          "action": "startInteractiveSelection",
          "literalArgs": {
            "annotationName": "second-point-A",
            "graphName": "slope-graph",
            "datasetName": "slope-data",
            "color": "#1f77b4"
          }
        }
      ],
      "shouldFinishImmediately": false,
      "shouldWaitForSubmissibleResponse": true,
      "submissibilityInspector": null,
      "submissibilityCriterion": null,
      "triggeredCommands": [

      ],
      "afterSubmissionCommands": [

      ],
      "responseInspector": {
        "type": "Smartgraphs.DummyInspector"
      },
      
      // **** the first thing we want to change ... make dataPointsAreAdjacent work w/o an associated Inspector
      //
      // what we want is basically expressed by
      //
      // (= 1 (absDiff (indexOf first-point-A) (indexOf second-point-A)))
      //
      // translated to json:
      //
      // ["=", 1, ["absDiff", ["indexOf", "first-point-A"], ["indexOf", "second-point-A"]]]
      
      "responseBranches": [
        {
          "criterion": ["=", 1, ["absDiff", ["indexOf", "first-point-A"], ["indexOf", "second-point-A"]]],
          "step": "/shared/instantaneous-speed/page/12/step/4"
        }
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/12/step/3",
      "isFinalStep": false,
      "shouldAutoAdvancePage": false,
      "hideSubmitButton": false,
      "submitButtonTitle": "OK",
      "nextButtonShouldSubmit": false
    },
    {
      "url": "/shared/instantaneous-speed/page/12/step/3",
      "activityPage": "/shared/instantaneous-speed/page/12",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "name": "slope-graph"
        },
        "bottom": {
          "type": "table",
          "graphName": "slope-graph",
          "datasetName": "slope-data"
        }
      },
      "beforeText": "<p>To calculate velocity in a small time interval, select a point that is next to the first point. Then click <b>OK</b>.</p>",
      "responseTemplate": "",
      "afterText": "",
      "startCommands": [
        {
          "action": "startInteractiveSelection",
          "literalArgs": {
            "annotationName": "second-point-A",
            "graphName": "slope-graph",
            "datasetName": "slope-data",
            "color": "#1f77b4"
          }
        }
      ],
      "shouldFinishImmediately": false,
      "shouldWaitForSubmissibleResponse": true,
      "submissibilityInspector": null,
      "submissibilityCriterion": null,
      "triggeredCommands": [

      ],
      "afterSubmissionCommands": [

      ],
      "responseInspector": {
        "type": "Smartgraphs.AnnotationInspector",
        "config": {
          "annotationNames": [
            "first-point-A", 
            "second-point-A" 
          ]
        }
      },
      "responseBranches": [
        {
          "criterion": {
            "dataPointsAreAdjacent": []
          },
          "step": "/shared/instantaneous-speed/page/12/step/4"
        }
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/12/step/3",
      "isFinalStep": false,
      "shouldAutoAdvancePage": false,
      "hideSubmitButton": false,
      "submitButtonTitle": "OK",
      "nextButtonShouldSubmit": false
    },
    {
      "url": "/shared/instantaneous-speed/page/12/step/4",
      "activityPage": "/shared/instantaneous-speed/page/12",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "name": "slope-graph"
        },
        "bottom": {
          "type": "table",
          "graphName": "slope-graph",
          "datasetName": "slope-data"
        }
      },
      "beforeText": "<p>Here is the line connecting the two points you selected. The velocity during this interval is the slope of this line.</p><p>What is the <b>velocity</b> between the two points, in meters per second?</p>",
      "responseTemplate": "/components/response-template/numeric",
      "afterText": "",
      "startCommands": [
        {
          "action": "createLineThroughPoints",
          "literalArgs": {
            "lineName": "slope-line-A",
            "firstPoint": "first-point-A",
            "secondPoint": "second-point-A",
            "graphName": "slope-graph",
            "color": "#1f77b4"
          }
        },
        {
          "action": "addAnnotation",
          "literalArgs": {
            "name": "slope-line-A",
            "graphName": "slope-graph"
          }
        },
        {
          "action": "setVariable",
          "literalArgs": {
            "variableName": "first-point-A-time",
            "inspectorType": "Smartgraphs.AnnotationAttributeInspector",
            "config": { 
              "name": "first-point-A",
              "attributePath": "point.x"
            }
          }
        },
        {
          "action": "setVariable",
          "literalArgs": {
            "variableName": "first-point-A-position",
            "inspectorType": "Smartgraphs.AnnotationAttributeInspector",
            "config": { 
              "name": "first-point-A",
              "attributePath": "point.y"
            }
          }
        },
        {
          "action": "setVariable",
          "literalArgs": {
            "variableName": "second-point-A-time",
            "inspectorType": "Smartgraphs.AnnotationAttributeInspector",
            "config": { 
              "name": "second-point-A",
              "attributePath": "point.x"
            }
          }
        },
        {
          "action": "setVariable",
          "literalArgs": {
            "variableName": "second-point-A-position",
            "inspectorType": "Smartgraphs.AnnotationAttributeInspector",
            "config": { 
              "name": "second-point-A",
              "attributePath": "point.y"
            }
          }
        },
        {
          "action": "setVariable",
          "literalArgs": {
            "variableName": "max-position-A",
            "inspectorType": "Smartgraphs.VariableInspector",
            "config": { 
              "evalStatement": "Math.max([0],[1])",
              "variableNames": [ "first-point-A-position", "second-point-A-position" ]
            }
          }
        },
        {
          "action": "setVariable",
          "literalArgs": {
            "variableName": "min-position-A",
            "inspectorType": "Smartgraphs.VariableInspector",
            "config": { 
              "evalStatement": "Math.min([0],[1])",
              "variableNames": [ "first-point-A-position", "second-point-A-position" ]
            }
          }
        },
        {
          "action": "setVariable",
          "literalArgs": {
            "variableName": "change-position-A",
            "inspectorType": "Smartgraphs.VariableInspector",
            "config": { 
              "evalStatement": "Math.abs([0]-[1])",
              "variableNames": [ "first-point-A-position", "second-point-A-position" ]
            }
          }
        },
        {
          "action": "setVariable",
          "literalArgs": {
            "variableName": "change-position-units-A",
            "inspectorType": "Smartgraphs.VariableInspector",
            "config": { 
              "evalStatement": "[0] == 1 ? ' meter' : ' meters'",
              "variableNames": [ "change-position-A" ]
            }
          }
        },
        {
          "action": "setVariable",
          "literalArgs": {
            "variableName": "max-time-A",
            "inspectorType": "Smartgraphs.VariableInspector",
            "config": { 
              "evalStatement": "Math.max([0],[1])",
              "variableNames": [ "first-point-A-time", "second-point-A-time" ]
            }
          }
        },
        {
          "action": "setVariable",
          "literalArgs": {
            "variableName": "min-time-A",
            "inspectorType": "Smartgraphs.VariableInspector",
            "config": { 
              "evalStatement": "Math.min([0],[1])",
              "variableNames": [ "first-point-A-time", "second-point-A-time" ]
            }
          }
        },
        {
          "action": "setVariable",
          "literalArgs": {
            "variableName": "change-time-A",
            "inspectorType": "Smartgraphs.VariableInspector",
            "config": { 
              "evalStatement": "Math.abs([0]-[1])",
              "variableNames": [ "first-point-A-time", "second-point-A-time" ]
            }
          }
        },
        {
          "action": "setVariable",
          "literalArgs": {
            "variableName": "change-time-units-A",
            "inspectorType": "Smartgraphs.VariableInspector",
            "config": { 
              "evalStatement": "[0] == 1 ? ' second' : ' seconds'",
              "variableNames": [ "change-time-A" ]
            }
          }
        },
        {
          "action": "setVariable",
          "literalArgs": {
            "variableName": "velocity-A",
            "inspectorType": "Smartgraphs.VariableInspector",
            "config": { 
              "evalStatement": "[0]/[1]",
              "variableNames": [ "change-position-A", "change-time-A" ]
            }
          }
        },
        {
          "action": "setVariable",
          "literalArgs": {
            "variableName": "velocity-units-A",
            "inspectorType": "Smartgraphs.VariableInspector",
            "config": { 
              "evalStatement": "[0] == 1 ? 'meter per second' : 'meters per second'",
              "variableNames": [ "velocity-A" ]
            }
          }
        }
      ],
      "shouldFinishImmediately": false,
      "submissibilityInspector": {
        "type": "Smartgraphs.FirstResponseFieldInspector"
      },
      "submissibilityCriterion": {
        "isNumeric": { "strip": "value" }
      },
      "triggeredCommands": [
        
      ],
      "afterSubmissionCommands": [

      ],
      "responseInspector": {
        "type": "Smartgraphs.ResponseFieldAnnotationsInspector",
        "config": {
          "annotationNames": [
            "first-point-A", 
            "second-point-A" 
          ]
        }
      },
      "responseBranches": [
        {
          "criterion": {
            "slope": "value"
          },
          "step": "/shared/instantaneous-speed/page/12/step/16"
        }
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/12/step/5",
      "isFinalStep": false,
      "shouldAutoAdvancePage": false,
      "hideSubmitButton": false,
      "submitButtonTitle": "OK",
      "nextButtonShouldSubmit": false
    },
    {
      "url": "/shared/instantaneous-speed/page/12/step/5",
      "activityPage": "/shared/instantaneous-speed/page/12",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "name": "slope-graph"
        },
        "bottom": {
          "type": "table",
          "graphName": "slope-graph",
          "datasetName": "slope-data"
        }
      },
      "beforeText": "<p>Incorrect.</p><p>What is the <b>velocity</b> between the two points, in meters per second?</p>",
      "responseTemplate": "/components/response-template/numeric",
      "afterText": "<p>Hint: Recall that velocity is the change in position divided by the change in time.</p>",
      "startCommands": [

      ],
      "shouldFinishImmediately": false,
      "submissibilityInspector": {
        "type": "Smartgraphs.FirstResponseFieldInspector"
      },
      "submissibilityCriterion": {
        "isNumeric": { "strip": "value" }
      },
      "triggeredCommands": [
        
      ],
      "afterSubmissionCommands": [
 
      ],
      "responseInspector": {
        "type": "Smartgraphs.ResponseFieldAnnotationsInspector",
        "config": {
          "annotationNames": [
            "first-point-A", 
            "second-point-A" 
          ]
        }
      },
      "responseBranches": [
        {
          "criterion": {
            "slope": "value"
          },
          "step": "/shared/instantaneous-speed/page/12/step/16"
        }
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/12/step/6",
      "isFinalStep": false,
      "shouldAutoAdvancePage": false,
      "hideSubmitButton": false,
      "submitButtonTitle": "OK",
      "nextButtonShouldSubmit": false
    },
    {
      "url": "/shared/instantaneous-speed/page/12/step/6",
      "activityPage": "/shared/instantaneous-speed/page/12",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "name": "slope-graph"
        },
        "bottom": {
          "type": "table",
          "graphName": "slope-graph",
          "datasetName": "slope-data"
        }
      },
      "beforeText": "<p>Incorrect.</p><p>What is the change in position?</p>",
      "responseTemplate": "/components/response-template/numeric",
      "afterText": "<p>Hint: Look at the graph.</p>",
      "startCommands": [
        {
          "action": "createRiseArrow",
          "literalArgs": {
            "arrowName": "rise-arrow-A",
            "firstPoint": "first-point-A",
            "secondPoint": "second-point-A",
            "color": "#cccccc",
            "isHighlighted": true
          }
        },
        {
          "action": "addAnnotation",
          "literalArgs": {
            "name": "rise-arrow-A",
            "graphName": "slope-graph"
          }
        }
      ],
      "shouldFinishImmediately": false,
      "submissibilityInspector": {
        "type": "Smartgraphs.FirstResponseFieldInspector"
      },
      "submissibilityCriterion": {
        "isNumeric": { "strip": "value" }
      },
      "triggeredCommands": [
        
      ],
      "afterSubmissionCommands": [

      ],
      "responseInspector": {
        "type": "Smartgraphs.ResponseFieldAnnotationsInspector",
        "config": {
          "annotationNames": [
            "first-point-A", 
            "second-point-A" 
          ]
        }
      },
      "responseBranches": [
        {
          "criterion": {
            "delta": {
              "axis": "y",
              "respectOrder": false
            }
          },
          "step": "/shared/instantaneous-speed/page/12/step/10"
        }
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/12/step/7",
      "isFinalStep": false,
      "shouldAutoAdvancePage": false,
      "hideSubmitButton": false,
      "submitButtonTitle": "OK",
      "nextButtonShouldSubmit": false
    },
    {
      "url": "/shared/instantaneous-speed/page/12/step/7",
      "activityPage": "/shared/instantaneous-speed/page/12",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "name": "slope-graph"
        },
        "bottom": {
          "type": "table",
          "graphName": "slope-graph",
          "datasetName": "slope-data"
        }
      },
      "beforeText": "<p>Incorrect.</p><p>What is the change in position?</p>",
      "responseTemplate": "/components/response-template/numeric",
      "afterText": "<p>Hint: Look at the table and the graph.</p>",
      "startCommands": [
        {
          "action": "createRiseBracket",
          "literalArgs": {
            "bracketName": "rise-bracket-A",
            "point1": "first-point-A",
            "point2": "second-point-A",
            "datasetName": "slope-data",
            "color": "#cccccc",
            "isHighlighted": true
          }
        },
        {
          "action": "addAnnotation",
          "literalArgs": {
            "name": "rise-bracket-A",
            "tableName": "slope-data"
          }
        }
      ],
      "shouldFinishImmediately": false,
      "submissibilityInspector": {
        "type": "Smartgraphs.FirstResponseFieldInspector"
      },
      "submissibilityCriterion": {
        "isNumeric": { "strip": "value" }
      },
      "triggeredCommands": [
        
      ],
      "afterSubmissionCommands": [

      ],
      "responseInspector": {
        "type": "Smartgraphs.ResponseFieldAnnotationsInspector",
        "config": {
          "annotationNames": [
            "first-point-A", 
            "second-point-A" 
          ]
        }
      },
      "responseBranches": [
        {
          "criterion": {
            "delta": {
              "axis": "y",
              "respectOrder": false
            }
          },
          "step": "/shared/instantaneous-speed/page/12/step/10"
        }
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/12/step/8",
      "isFinalStep": false,
      "shouldAutoAdvancePage": false,
      "hideSubmitButton": false,
      "submitButtonTitle": "OK",
      "nextButtonShouldSubmit": false
    },
    {
      "url": "/shared/instantaneous-speed/page/12/step/8",
      "activityPage": "/shared/instantaneous-speed/page/12",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "name": "slope-graph"
        },
        "bottom": {
          "type": "table",
          "graphName": "slope-graph",
          "datasetName": "slope-data"
        }
      },
      "beforeText": "<p>Incorrect. The change in position is <b>%@</b> - <b>%@</b>, or <b>%@</b> %@.</p>",
      "responseTemplate": "",
      "afterText": "",
      "substitutedExpressions": [
        {
          "type": "Smartgraphs.VariableInspector",
          "config" : {
            "evalStatement": "[0]",
            "variableNames": [ "max-position-A" ]
          } 
        },
        {
          "type": "Smartgraphs.VariableInspector",
          "config" : {
            "evalStatement": "[0]",
            "variableNames": [ "min-position-A" ]
          } 
        },
        {
          "type": "Smartgraphs.VariableInspector",
          "config" : {
            "evalStatement": "[0]",
            "variableNames": [ "change-position-A" ]
          } 
        },
        {
          "type": "Smartgraphs.VariableInspector",
          "config" : {
            "evalStatement": "'[0]'",
            "variableNames": [ "change-position-units-A" ]
          } 
        }
      ],
      "startCommands": [

      ],
      "shouldFinishImmediately": false,
      "submissibilityInspector": null,
      "submissibilityCriterion": null,
      "triggeredCommands": [
        
      ],
      "afterSubmissionCommands": [
 
      ],
      "responseInspector": null,
      "responseBranches": [

      ],
      "defaultBranch": "/shared/instantaneous-speed/page/12/step/9",
      "isFinalStep": false,
      "shouldAutoAdvancePage": false,
      "hideSubmitButton": false,
      "submitButtonTitle": "Continue",
      "nextButtonShouldSubmit": false
    },
    {
      "url": "/shared/instantaneous-speed/page/12/step/9",
      "activityPage": "/shared/instantaneous-speed/page/12",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "name": "slope-graph"
        },
        "bottom": {
          "type": "table",
          "graphName": "slope-graph",
          "datasetName": "slope-data"
        }
      },
      "beforeText": "<p>What is the change in time? </p>",
      "responseTemplate": "/components/response-template/numeric",
      "afterText": "<p>Hint:Look at the graph.</p>",
      "startCommands": [
        {
          "action": "setAnnotationAttribute",
          "literalArgs": {
            "name": "rise-arrow-A",
            "isHighlighted": false
          }
        },
        {
          "action": "setAnnotationAttribute",
          "literalArgs": {
            "name": "rise-bracket-A",
            "isHighlighted": false
          }
        },
        {
          "action": "createRunArrow",
          "literalArgs": {
            "arrowName": "run-arrow-A",
            "firstPoint": "first-point-A",
            "secondPoint": "second-point-A",
            "color": "#cccccc",
            "isHighlighted": true
          }
        },
        {
          "action": "addAnnotation",
          "literalArgs": {
            "name": "run-arrow-A",
            "graphName": "slope-graph"
          }
        }
      ],
      "shouldFinishImmediately": false,
      "submissibilityInspector": {
        "type": "Smartgraphs.FirstResponseFieldInspector"
      },
      "submissibilityCriterion": {
        "isNumeric": { "strip": "value" }
      },
      "triggeredCommands": [
        
      ],
      "afterSubmissionCommands": [
 
      ],
      "responseInspector": {
        "type": "Smartgraphs.ResponseFieldAnnotationsInspector",
        "config": {
          "annotationNames": [
            "first-point-A", 
            "second-point-A" 
          ]
        }
      },
      "responseBranches": [
        {
          "criterion": {
            "delta": {
              "axis": "x", 
              "respectOrder": false
            }
          },
          "step": "/shared/instantaneous-speed/page/12/step/13"
        }
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/12/step/11",
      "isFinalStep": false,
      "shouldAutoAdvancePage": false,
      "hideSubmitButton": false,
      "submitButtonTitle": "OK",
      "nextButtonShouldSubmit": false
    },
    {
      "url": "/shared/instantaneous-speed/page/12/step/10",
      "activityPage": "/shared/instantaneous-speed/page/12",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "name": "slope-graph"
        },
        "bottom": {
          "type": "table",
          "graphName": "slope-graph",
          "datasetName": "slope-data"
        }
      },
      "beforeText": "<p>Correct!</p><p>What is the change in time? </p>",
      "responseTemplate": "/components/response-template/numeric",
      "afterText": "<p>Hint:Look at the graph.</p>",
      "startCommands": [
        {
          "action": "createRunArrow",
          "literalArgs": {
            "arrowName": "run-arrow-A",
            "firstPoint": "first-point-A",
            "secondPoint": "second-point-A",
            "color": "#cccccc",
            "isHighlighted": true
          }
        },
        {
          "action": "addAnnotation",
          "literalArgs": {
            "name": "run-arrow-A",
            "graphName": "slope-graph"
          }
        }
      ],
      "shouldFinishImmediately": false,
      "submissibilityInspector": {
        "type": "Smartgraphs.FirstResponseFieldInspector"
      },
      "submissibilityCriterion": {
        "isNumeric": { "strip": "value" }
      },
      "triggeredCommands": [
        
      ],
      "afterSubmissionCommands": [
 
      ],
      "responseInspector": {
        "type": "Smartgraphs.ResponseFieldAnnotationsInspector",
        "config": {
          "annotationNames": [
            "first-point-A", 
            "second-point-A" 
          ]
        }
      },
      "responseBranches": [
        {
          "criterion": {
            "delta": {
              "axis": "x", 
              "respectOrder": false
            }
          },
          "step": "/shared/instantaneous-speed/page/12/step/13"
        }
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/12/step/11",
      "isFinalStep": false,
      "shouldAutoAdvancePage": false,
      "hideSubmitButton": false,
      "submitButtonTitle": "OK",
      "nextButtonShouldSubmit": false
    },
    {
      "url": "/shared/instantaneous-speed/page/12/step/11",
      "activityPage": "/shared/instantaneous-speed/page/12",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "name": "slope-graph"
        },
        "bottom": {
          "type": "table",
          "graphName": "slope-graph",
          "datasetName": "slope-data"
        }
      },
      "beforeText": "<p>Incorrect.</p><p>What is the change in time?</p>",
      "responseTemplate": "/components/response-template/numeric",
      "afterText": "<p>Hint: Look at the table and the graph.</p>",
      "startCommands": [
        {
          "action": "createRunBracket",
          "literalArgs": {
            "bracketName": "run-bracket-A",
            "point1": "first-point-A",
            "point2": "second-point-A",
            "datasetName": "slope-data",
            "color": "#cccccc",
            "isHighlighted": true
          }
        },
        {
          "action": "addAnnotation",
          "literalArgs": {
            "name": "run-bracket-A",
            "tableName": "slope-data"
          }
        }
      ],
      "shouldFinishImmediately": false,
      "submissibilityInspector": {
        "type": "Smartgraphs.FirstResponseFieldInspector"
      },
      "submissibilityCriterion": {
        "isNumeric": { "strip": "value" }
      },
      "triggeredCommands": [
        
      ],
      "afterSubmissionCommands": [
 
      ],
      "responseInspector": {
        "type": "Smartgraphs.ResponseFieldAnnotationsInspector",
        "config": {
          "annotationNames": [
            "first-point-A", 
            "second-point-A" 
          ]
        }
      },
      "responseBranches": [
        {
          "criterion": {
            "delta": {
              "axis": "x", 
              "respectOrder": false
            }
          },
          "step": "/shared/instantaneous-speed/page/12/step/13"
        }
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/12/step/12",
      "isFinalStep": false,
      "shouldAutoAdvancePage": false,
      "hideSubmitButton": false,
      "submitButtonTitle": "OK",
      "nextButtonShouldSubmit": false
    },
    {
      "url": "/shared/instantaneous-speed/page/12/step/12",
      "activityPage": "/shared/instantaneous-speed/page/12",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "name": "slope-graph"
        },
        "bottom": {
          "type": "table",
          "graphName": "slope-graph",
          "datasetName": "slope-data"
        }
      },
      "beforeText": "<p>Incorrect. The change in time is <b>%@</b> - <b>%@</b>, or <b>%@</b> %@.</p>",
      "responseTemplate": "",
      "afterText": "",
      "substitutedExpressions": [
        {
          "type": "Smartgraphs.VariableInspector",
          "config" : {
            "evalStatement": "[0]",
            "variableNames": [ "max-time-A" ]
          } 
        },
        {
          "type": "Smartgraphs.VariableInspector",
          "config" : {
            "evalStatement": "[0]",
            "variableNames": [ "min-time-A" ]
          } 
        },
        {
          "type": "Smartgraphs.VariableInspector",
          "config" : {
            "evalStatement": "[0]",
            "variableNames": [ "change-time-A" ]
          } 
        },
        {
          "type": "Smartgraphs.VariableInspector",
          "config" : {
            "evalStatement": "'[0]'",
            "variableNames": [ "change-time-units-A" ]
          } 
        }
      ],
      "startCommands": [

      ],
      "shouldFinishImmediately": false,
      "submissibilityInspector": null,
      "submissibilityCriterion": null,
      "triggeredCommands": [
        
      ],
      "afterSubmissionCommands": [
 
      ],
      "responseInspector": null,
      "responseBranches": [

      ],
      "defaultBranch": "/shared/instantaneous-speed/page/12/step/13",
      "isFinalStep": false,
      "shouldAutoAdvancePage": false,
      "hideSubmitButton": false,
      "submitButtonTitle": "Continue",
      "nextButtonShouldSubmit": false
    },
    {
      "url": "/shared/instantaneous-speed/page/12/step/13",
      "activityPage": "/shared/instantaneous-speed/page/12",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "name": "slope-graph"
        },
        "bottom": {
          "type": "table",
          "graphName": "slope-graph",
          "datasetName": "slope-data"
        }
      },
      "beforeText": "<p>If the change in position is <b>%@</b> %@ and the change in time is <b>%@</b> %@, what is the velocity, in meters per second?</p>",
      "responseTemplate": "/components/response-template/numeric",
      "afterText": "",
      "substitutedExpressions": [
        {
          "type": "Smartgraphs.VariableInspector",
          "config" : {
            "evalStatement": "[0]",
            "variableNames": [ "change-position-A" ]
          } 
        },
        {
          "type": "Smartgraphs.VariableInspector",
          "config" : {
            "evalStatement": "'[0]'",
            "variableNames": [ "change-position-units-A" ]
          } 
        },
        {
          "type": "Smartgraphs.VariableInspector",
          "config" : {
            "evalStatement": "[0]",
            "variableNames": [ "change-time-A" ]
          } 
        },
        {
          "type": "Smartgraphs.VariableInspector",
          "config" : {
            "evalStatement": "'[0]'",
            "variableNames": [ "change-time-units-A" ]
          } 
        }
      ],
      "startCommands": [
        {
          "action": "removeAnnotation",
          "literalArgs": {
            "name": "run-arrow-A",
            "graphName": "slope-graph"
          }
        },
        {
          "action": "removeAnnotation",
          "literalArgs": {
            "name": "run-bracket-A",
            "tableName": "slope-data"
          }
        },
        {
          "action": "removeAnnotation",
          "literalArgs": {
            "name": "rise-arrow-A",
            "graphName": "slope-graph"
          }
        },
        {
          "action": "removeAnnotation",
          "literalArgs": {
            "name": "rise-bracket-A",
            "tableName": "slope-data"
          }
        }
      ],
      "shouldFinishImmediately": false,
      "submissibilityInspector": {
        "type": "Smartgraphs.FirstResponseFieldInspector"
      },
      "submissibilityCriterion": {
        "isNumeric": { "strip": "value" }
      },
      "triggeredCommands": [
        
      ],
      "afterSubmissionCommands": [
 
      ],
      "responseInspector": {
        "type": "Smartgraphs.ResponseFieldAnnotationsInspector",
        "config": {
          "annotationNames": [
            "first-point-A", 
            "second-point-A" 
          ]
        }
      },
      "responseBranches": [
        {
          "criterion": {
            "slope": "value"
          },
          "step": "/shared/instantaneous-speed/page/12/step/16"
        }
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/12/step/14",
      "isFinalStep": false,
      "shouldAutoAdvancePage": false,
      "hideSubmitButton": false,
      "submitButtonTitle": "OK",
      "nextButtonShouldSubmit": false
    },
    {
      "url": "/shared/instantaneous-speed/page/12/step/14",
      "activityPage": "/shared/instantaneous-speed/page/12",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "name": "slope-graph"
        },
        "bottom": {
          "type": "table",
          "graphName": "slope-graph",
          "datasetName": "slope-data"
        }
      },
      "beforeText": "<p>Incorrect.</p><p>If the change in position is <b>%@</b> %@ and the change in time is <b>%@</b> %@, what is the velocity, in meters per second?</p>",
      "responseTemplate": "/components/response-template/numeric",
      "afterText": "<p>Hint: Recall that velocity is the change in position divided by the change in time.</p>",
      "substitutedExpressions": [
        {
          "type": "Smartgraphs.VariableInspector",
          "config" : {
            "evalStatement": "[0]",
            "variableNames": [ "change-position-A" ]
          } 
        },
        {
          "type": "Smartgraphs.VariableInspector",
          "config" : {
            "evalStatement": "'[0]'",
            "variableNames": [ "change-position-units-A" ]
          } 
        },
        {
          "type": "Smartgraphs.VariableInspector",
          "config" : {
            "evalStatement": "[0]",
            "variableNames": [ "change-time-A" ]
          } 
        },
        {
          "type": "Smartgraphs.VariableInspector",
          "config" : {
            "evalStatement": "'[0]'",
            "variableNames": [ "change-time-units-A" ]
          } 
        }
      ],
      "startCommands": [

      ],
      "shouldFinishImmediately": false,
      "submissibilityInspector": {
        "type": "Smartgraphs.FirstResponseFieldInspector"
      },
      "submissibilityCriterion": {
        "isNumeric": { "strip": "value" }
      },
      "triggeredCommands": [
        
      ],
      "afterSubmissionCommands": [
 
      ],
      "responseInspector": {
        "type": "Smartgraphs.ResponseFieldAnnotationsInspector",
        "config": {
          "annotationNames": [
            "first-point-A", 
            "second-point-A" 
          ]
        }
      },
      "responseBranches": [
        {
          "criterion": {
            "slope": "value"
          },
          "step": "/shared/instantaneous-speed/page/12/step/16"
        }
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/12/step/15",
      "isFinalStep": false,
      "shouldAutoAdvancePage": false,
      "hideSubmitButton": false,
      "submitButtonTitle": "OK",
      "nextButtonShouldSubmit": false
    },
    {
      "url": "/shared/instantaneous-speed/page/12/step/15",
      "activityPage": "/shared/instantaneous-speed/page/12",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "name": "slope-graph"
        },
        "bottom": {
          "type": "table",
          "graphName": "slope-graph",
          "datasetName": "slope-data"
        }
      },
      "beforeText": "<p>Incorrect.</p><p>If the change in position is <b>%@</b> %@ and the change in time is <b>%@</b> %@, the velocity is <b>%@</b> divided by <b>%@</b>, or <b>%@</b> %@.</p>",
      "responseTemplate": "",
      "afterText": "",
      "substitutedExpressions": [
        {
          "type": "Smartgraphs.VariableInspector",
          "config" : {
            "evalStatement": "[0]",
            "variableNames": [ "change-position-A" ]
          } 
        },
        {
          "type": "Smartgraphs.VariableInspector",
          "config" : {
            "evalStatement": "'[0]'",
            "variableNames": [ "change-position-units-A" ]
          } 
        },
        {
          "type": "Smartgraphs.VariableInspector",
          "config" : {
            "evalStatement": "[0]",
            "variableNames": [ "change-time-A" ]
          } 
        },
        {
          "type": "Smartgraphs.VariableInspector",
          "config" : {
            "evalStatement": "'[0]'",
            "variableNames": [ "change-time-units-A" ]
          } 
        },
        {
          "type": "Smartgraphs.VariableInspector",
          "config" : {
            "evalStatement": "[0]",
            "variableNames": [ "change-position-A" ]
          } 
        },
        {
          "type": "Smartgraphs.VariableInspector",
          "config" : {
            "evalStatement": "[0]",
            "variableNames": [ "change-time-A" ]
          } 
        },
        {
          "type": "Smartgraphs.VariableInspector",
          "config" : {
            "evalStatement": "[0]",
            "variableNames": [ "velocity-A" ]
          } 
        },
        {
          "type": "Smartgraphs.VariableInspector",
          "config" : {
            "evalStatement": "'[0]'",
            "variableNames": [ "velocity-units-A" ]
          } 
        }
      ],
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
      "defaultBranch": "",
      "isFinalStep": true,
      "shouldAutoAdvancePage": false,
      "hideSubmitButton": true,
      "submitButtonTitle": "",
      "nextButtonShouldSubmit": false
    },
    {
      "url": "/shared/instantaneous-speed/page/12/step/16",
      "activityPage": "/shared/instantaneous-speed/page/12",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "name": "slope-graph"
        },
        "bottom": {
          "type": "table",
          "graphName": "slope-graph",
          "datasetName": "slope-data"
        }
      },
      "beforeText": "<p>Correct!</p><p>The position changed <b>%@</b> %@ in <b>%@</b> %@, so the velocity was <b>%@</b> %@.</p>",
      "responseTemplate": "",
      "afterText": "",
      "substitutedExpressions": [
        {
          "type": "Smartgraphs.VariableInspector",
          "config" : {
            "evalStatement": "[0]",
            "variableNames": [ "change-position-A" ]
          } 
        },
        {
          "type": "Smartgraphs.VariableInspector",
          "config" : {
            "evalStatement": "'[0]'",
            "variableNames": [ "change-position-units-A" ]
          } 
        },
        {
          "type": "Smartgraphs.VariableInspector",
          "config" : {
            "evalStatement": "[0]",
            "variableNames": [ "change-time-A" ]
          } 
        },
        {
          "type": "Smartgraphs.VariableInspector",
          "config" : {
            "evalStatement": "'[0]'",
            "variableNames": [ "change-time-units-A" ]
          } 
        },
        {
          "type": "Smartgraphs.VariableInspector",
          "config" : {
            "evalStatement": "[0]",
            "variableNames": [ "velocity-A" ]
          } 
        },
        {
          "type": "Smartgraphs.VariableInspector",
          "config" : {
            "evalStatement": "'[0]'",
            "variableNames": [ "velocity-units-A" ]
          } 
        }
      ],
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
      "defaultBranch": "",
      "isFinalStep": true,
      "shouldAutoAdvancePage": false,
      "hideSubmitButton": true,
      "submitButtonTitle": "",
      "nextButtonShouldSubmit": false
    },
    {
      "url": "/shared/instantaneous-speed/page/13/step/1",
      "activityPage": "/shared/instantaneous-speed/page/13",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "name": "slope-graph"
        },
        "bottom": {
          "type": "table",
          "graphName": "slope-graph",
          "datasetName": "slope-data"
        }
      },
      "beforeText": "<p>Choose a point that is different from those you selected earlier. Then click <b>OK</b>.</p>",
      "responseTemplate": "",
      "afterText": "",
      "startCommands": [
        {
          "action": "setAnnotationAttribute",
          "literalArgs": {
            "name": "first-point-A",
            "pointColor": "#f2b3b3"
          }
        },
        {
          "action": "setAnnotationAttribute",
          "literalArgs": {
            "name": "second-point-A",
            "pointColor": "#f2b3b3"
          }
        },        
        {
          "action": "addAnnotation",
          "literalArgs": {
            "name": "first-point-A",
            "graphName": "slope-graph",
            "tableName": "slope-data"
          }
        },
        {
          "action": "addAnnotation",
          "literalArgs": {
            "name": "second-point-A",
            "graphName": "slope-graph",
            "tableName": "slope-data"         
          }
        },
        {
          "action": "startInteractiveSelection",
          "literalArgs": {
            "annotationName": "first-point-B",
            "graphName": "slope-graph",
            "datasetName": "slope-data",
            "color": "#ff7f0d"
          }
        }
      ],
      "shouldFinishImmediately": false,
      "shouldWaitForSubmissibleResponse": true,
      "submissibilityInspector": null,
      "submissibilityCriterion": null,
      "triggeredCommands": [

      ],
      "afterSubmissionCommands": [

      ],
      "responseInspector": {
        "type": "Smartgraphs.AnnotationAttributeInspector",
        "config": { 
          "name": "first-point-B",
          "attributePath": "point.x"
        }
      },
      "responseBranches": [
        {
          "criterion": { 
            "in" : [
              "value",
              [
                { "int" : { "variable" : "first-point-A-time" } },
                { "int" : { "variable" : "second-point-A-time" } }
              ]
            ]
          },
          "step": "/shared/instantaneous-speed/page/13/step/1a"
        }
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/13/step/2",
      "isFinalStep": false,
      "shouldAutoAdvancePage": false,
      "hideSubmitButton": false,
      "submitButtonTitle": "OK",
      "nextButtonShouldSubmit": false
    },
    {
      "url": "/shared/instantaneous-speed/page/13/step/1a",
      "activityPage": "/shared/instantaneous-speed/page/13",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "name": "slope-graph"
        },
        "bottom": {
          "type": "table",
          "graphName": "slope-graph",
          "datasetName": "slope-data"
        }
      },
      "beforeText": "<p>Try again.</p><p>Choose a point that is <b>different</b> from those you selected earlier. Then click <b>OK</b>.</p>",
      "responseTemplate": "",
      "afterText": "",
      "startCommands": [
        {
          "action": "addAnnotation",
          "literalArgs": {
            "name": "first-point-A",
            "graphName": "slope-graph"
          }
        },
        {
          "action": "addAnnotation",
          "literalArgs": {
            "name": "second-point-A",
            "graphName": "slope-graph"
          }
        },
        {
          "action": "startInteractiveSelection",
          "literalArgs": {
            "annotationName": "first-point-B",
            "graphName": "slope-graph",
            "datasetName": "slope-data",
            "color": "#ff7f0d"
          }
        }
      ],
      "shouldFinishImmediately": false,
      "shouldWaitForSubmissibleResponse": true,
      "submissibilityInspector": null,
      "submissibilityCriterion": null,
      "triggeredCommands": [

      ],
      "afterSubmissionCommands": [

      ],
      "responseInspector": {
        "type": "Smartgraphs.AnnotationAttributeInspector",
        "config": { 
          "name": "first-point-B",
          "attributePath": "point.x"
        }
      },
      "responseBranches": [
        {
          "criterion": { 
            "in" : [
              "value",
              [
                { "int" : { "variable" : "first-point-A-time" } },
                { "int" : { "variable" : "second-point-A-time" } }
              ]
            ]
          },
          "step": "/shared/instantaneous-speed/page/13/step/1a"
        }
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/13/step/2",
      "isFinalStep": false,
      "shouldAutoAdvancePage": false,
      "hideSubmitButton": false,
      "submitButtonTitle": "OK",
      "nextButtonShouldSubmit": false
    },
    {
      "url": "/shared/instantaneous-speed/page/13/step/2",
      "activityPage": "/shared/instantaneous-speed/page/13",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "name": "slope-graph"
        },
        "bottom": {
          "type": "table",
          "graphName": "slope-graph",
          "datasetName": "slope-data"
        }
      },
      "beforeText": "<p>Select a point next to to the first point. Then click <b>OK</b>.</p>",
      "responseTemplate": "",
      "afterText": "",
      "startCommands": [
        {
          "action": "startInteractiveSelection",
          "literalArgs": {
            "annotationName": "second-point-B",
            "graphName": "slope-graph",
            "datasetName": "slope-data",
            "color": "#ff7f0c"
          }
        }
      ],
      "shouldFinishImmediately": false,
      "shouldWaitForSubmissibleResponse": true,
      "submissibilityInspector": null,
      "submissibilityCriterion": null,
      "triggeredCommands": [

      ],
      "afterSubmissionCommands": [

      ],
      "responseInspector": {
        "type": "Smartgraphs.AnnotationInspector",
        "config": {
          "annotationNames": [
            "first-point-B", 
            "second-point-B" 
          ]
        }
      },
      "responseBranches": [
        {
          "criterion": {
            "dataPointsAreAdjacent": []
          },
          "step": "/shared/instantaneous-speed/page/13/step/4"
        }
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/13/step/3",
      "isFinalStep": false,
      "shouldAutoAdvancePage": false,
      "hideSubmitButton": false,
      "submitButtonTitle": "OK",
      "nextButtonShouldSubmit": false
    },
    {
      "url": "/shared/instantaneous-speed/page/13/step/3",
      "activityPage": "/shared/instantaneous-speed/page/13",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "name": "slope-graph"
        },
        "bottom": {
          "type": "table",
          "graphName": "slope-graph",
          "datasetName": "slope-data"
        }
      },
      "beforeText": "<p>To calculate velocity in a small time interval, select a point that is next to the first point. Then click <b>OK</b>.</p>",
      "responseTemplate": "",
      "afterText": "",
      "startCommands": [
        {
          "action": "startInteractiveSelection",
          "literalArgs": {
            "annotationName": "second-point-B",
            "graphName": "slope-graph",
            "datasetName": "slope-data",
            "color": "#ff7f0c"
          }
        }
      ],
      "shouldFinishImmediately": false,
      "shouldWaitForSubmissibleResponse": true,
      "submissibilityInspector": null,
      "submissibilityCriterion": null,
      "triggeredCommands": [

      ],
      "afterSubmissionCommands": [

      ],
      "responseInspector": {
        "type": "Smartgraphs.AnnotationInspector",
        "config": {
          "annotationNames": [
            "first-point-B", 
            "second-point-B" 
          ]
        }
      },
      "responseBranches": [
        {
          "criterion": {
            "dataPointsAreAdjacent": []
          },
          "step": "/shared/instantaneous-speed/page/13/step/4"
        }
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/13/step/3",
      "isFinalStep": false,
      "shouldAutoAdvancePage": false,
      "hideSubmitButton": false,
      "submitButtonTitle": "OK",
      "nextButtonShouldSubmit": false
    },
    {
      "url": "/shared/instantaneous-speed/page/13/step/4",
      "activityPage": "/shared/instantaneous-speed/page/13",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "name": "slope-graph"
        },
        "bottom": {
          "type": "table",
          "graphName": "slope-graph",
          "datasetName": "slope-data"
        }
      },
      "beforeText": "<p>Here is the line connecting the two points you selected. The velocity during this interval is the slope of this line.</p><p>What is the <b>velocity</b> between the two points, in meters per second?</p>",
      "responseTemplate": "/components/response-template/numeric",
      "afterText": "",
      "startCommands": [
        {
          "action": "createLineThroughPoints",
          "literalArgs": {
            "lineName": "slope-line-B",
            "firstPoint": "first-point-B",
            "secondPoint": "second-point-B",
            "graphName": "slope-graph",
            "color": "#ff7f0d"
          }
        },
        {
          "action": "addAnnotation",
          "literalArgs": {
            "name": "slope-line-B",
            "graphName": "slope-graph"
          }
        },
        {
          "action": "setVariable",
          "literalArgs": {
            "variableName": "first-point-B-time",
            "inspectorType": "Smartgraphs.AnnotationAttributeInspector",
            "config": { 
              "name": "first-point-B",
              "attributePath": "point.x"
            }
          }
        },
        {
          "action": "setVariable",
          "literalArgs": {
            "variableName": "first-point-B-position",
            "inspectorType": "Smartgraphs.AnnotationAttributeInspector",
            "config": { 
              "name": "first-point-B",
              "attributePath": "point.y"
            }
          }
        },
        {
          "action": "setVariable",
          "literalArgs": {
            "variableName": "second-point-B-time",
            "inspectorType": "Smartgraphs.AnnotationAttributeInspector",
            "config": { 
              "name": "second-point-B",
              "attributePath": "point.x"
            }
          }
        },
        {
          "action": "setVariable",
          "literalArgs": {
            "variableName": "second-point-B-position",
            "inspectorType": "Smartgraphs.AnnotationAttributeInspector",
            "config": { 
              "name": "second-point-B",
              "attributePath": "point.y"
            }
          }
        },
        {
          "action": "setVariable",
          "literalArgs": {
            "variableName": "max-position-B",
            "inspectorType": "Smartgraphs.VariableInspector",
            "config": { 
              "evalStatement": "Math.max([0],[1])",
              "variableNames": [ "first-point-B-position", "second-point-B-position" ]
            }
          }
        },
        {
          "action": "setVariable",
          "literalArgs": {
            "variableName": "min-position-B",
            "inspectorType": "Smartgraphs.VariableInspector",
            "config": { 
              "evalStatement": "Math.min([0],[1])",
              "variableNames": [ "first-point-B-position", "second-point-B-position" ]
            }
          }
        },
        {
          "action": "setVariable",
          "literalArgs": {
            "variableName": "change-position-B",
            "inspectorType": "Smartgraphs.VariableInspector",
            "config": { 
              "evalStatement": "Math.abs([0]-[1])",
              "variableNames": [ "first-point-B-position", "second-point-B-position" ]
            }
          }
        },
        {
          "action": "setVariable",
          "literalArgs": {
            "variableName": "change-position-units-B",
            "inspectorType": "Smartgraphs.VariableInspector",
            "config": { 
              "evalStatement": "[0] == 1 ? ' meter' : ' meters'",
              "variableNames": [ "change-position-B" ]
            }
          }
        },
        {
          "action": "setVariable",
          "literalArgs": {
            "variableName": "max-time-B",
            "inspectorType": "Smartgraphs.VariableInspector",
            "config": { 
              "evalStatement": "Math.max([0],[1])",
              "variableNames": [ "first-point-B-time", "second-point-B-time" ]
            }
          }
        },
        {
          "action": "setVariable",
          "literalArgs": {
            "variableName": "min-time-B",
            "inspectorType": "Smartgraphs.VariableInspector",
            "config": { 
              "evalStatement": "Math.min([0],[1])",
              "variableNames": [ "first-point-B-time", "second-point-B-time" ]
            }
          }
        },
        {
          "action": "setVariable",
          "literalArgs": {
            "variableName": "change-time-B",
            "inspectorType": "Smartgraphs.VariableInspector",
            "config": { 
              "evalStatement": "Math.abs([0]-[1])",
              "variableNames": [ "first-point-B-time", "second-point-B-time" ]
            }
          }
        },
        {
          "action": "setVariable",
          "literalArgs": {
            "variableName": "change-time-units-B",
            "inspectorType": "Smartgraphs.VariableInspector",
            "config": { 
              "evalStatement": "[0] == 1 ? ' second' : ' seconds'",
              "variableNames": [ "change-time-B" ]
            }
          }
        },
        {
          "action": "setVariable",
          "literalArgs": {
            "variableName": "velocity-B",
            "inspectorType": "Smartgraphs.VariableInspector",
            "config": { 
              "evalStatement": "[0]/[1]",
              "variableNames": [ "change-position-B", "change-time-B" ]
            }
          }
        },
        {
          "action": "setVariable",
          "literalArgs": {
            "variableName": "velocity-units-B",
            "inspectorType": "Smartgraphs.VariableInspector",
            "config": { 
              "evalStatement": "[0] == 1 ? 'meter per second' : 'meters per second'",
              "variableNames": [ "velocity-B" ]
            }
          }
        }
      ],
      "shouldFinishImmediately": false,
      "submissibilityInspector": {
        "type": "Smartgraphs.FirstResponseFieldInspector"
      },
      "submissibilityCriterion": {
        "isNumeric": { "strip": "value" }
      },
      "triggeredCommands": [
        
      ],
      "afterSubmissionCommands": [

      ],
      "responseInspector": {
        "type": "Smartgraphs.ResponseFieldAnnotationsInspector",
        "config": {
          "annotationNames": [
            "first-point-B", 
            "second-point-B" 
          ]
        }
      },
      "responseBranches": [
        {
          "criterion": {
            "slope": "value"
          },
          "step": "/shared/instantaneous-speed/page/13/step/16"
        }
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/13/step/5",
      "isFinalStep": false,
      "shouldAutoAdvancePage": false,
      "hideSubmitButton": false,
      "submitButtonTitle": "OK",
      "nextButtonShouldSubmit": false
    },
    {
      "url": "/shared/instantaneous-speed/page/13/step/5",
      "activityPage": "/shared/instantaneous-speed/page/13",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "name": "slope-graph"
        },
        "bottom": {
          "type": "table",
          "graphName": "slope-graph",
          "datasetName": "slope-data"
        }
      },
      "beforeText": "<p>Incorrect.</p><p>What is the <b>velocity</b> between the two points, in meters per second?</p>",
      "responseTemplate": "/components/response-template/numeric",
      "afterText": "<p>Hint: Recall that velocity is the change in position divided by the change in time.</p>",
      "startCommands": [

      ],
      "shouldFinishImmediately": false,
      "submissibilityInspector": {
        "type": "Smartgraphs.FirstResponseFieldInspector"
      },
      "submissibilityCriterion": {
        "isNumeric": { "strip": "value" }
      },
      "triggeredCommands": [
        
      ],
      "afterSubmissionCommands": [
 
      ],
      "responseInspector": {
        "type": "Smartgraphs.ResponseFieldAnnotationsInspector",
        "config": {
          "annotationNames": [
            "first-point-B", 
            "second-point-B" 
          ]
        }
      },
      "responseBranches": [
        {
          "criterion": {
            "slope": "value"
          },
          "step": "/shared/instantaneous-speed/page/13/step/16"
        }
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/13/step/6",
      "isFinalStep": false,
      "shouldAutoAdvancePage": false,
      "hideSubmitButton": false,
      "submitButtonTitle": "OK",
      "nextButtonShouldSubmit": false
    },
    {
      "url": "/shared/instantaneous-speed/page/13/step/6",
      "activityPage": "/shared/instantaneous-speed/page/13",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "name": "slope-graph"
        },
        "bottom": {
          "type": "table",
          "graphName": "slope-graph",
          "datasetName": "slope-data"
        }
      },
      "beforeText": "<p>Incorrect.</p><p>What is the change in position?</p>",
      "responseTemplate": "/components/response-template/numeric",
      "afterText": "<p>Hint: Look at the graph.</p>",
      "startCommands": [
        {
          "action": "createRiseArrow",
          "literalArgs": {
            "arrowName": "rise-arrow-B",
            "firstPoint": "first-point-B",
            "secondPoint": "second-point-B",
            "color": "#cccccc",
            "isHighlighted": true
          }
        },
        {
          "action": "addAnnotation",
          "literalArgs": {
            "name": "rise-arrow-B",
            "graphName": "slope-graph"
          }
        }
      ],
      "shouldFinishImmediately": false,
      "submissibilityInspector": {
        "type": "Smartgraphs.FirstResponseFieldInspector"
      },
      "submissibilityCriterion": {
        "isNumeric": { "strip": "value" }
      },
      "triggeredCommands": [
        
      ],
      "afterSubmissionCommands": [

      ],
      "responseInspector": {
        "type": "Smartgraphs.ResponseFieldAnnotationsInspector",
        "config": {
          "annotationNames": [
            "first-point-B", 
            "second-point-B" 
          ]
        }
      },
      "responseBranches": [
        {
          "criterion": {
            "delta": {
              "axis": "y",
              "respectOrder": false
            }
          },
          "step": "/shared/instantaneous-speed/page/13/step/10"
        }
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/13/step/7",
      "isFinalStep": false,
      "shouldAutoAdvancePage": false,
      "hideSubmitButton": false,
      "submitButtonTitle": "OK",
      "nextButtonShouldSubmit": false
    },
    {
      "url": "/shared/instantaneous-speed/page/13/step/7",
      "activityPage": "/shared/instantaneous-speed/page/13",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "name": "slope-graph"
        },
        "bottom": {
          "type": "table",
          "graphName": "slope-graph",
          "datasetName": "slope-data"
        }
      },
      "beforeText": "<p>Incorrect.</p><p>What is the change in position?</p>",
      "responseTemplate": "/components/response-template/numeric",
      "afterText": "<p>Hint: Look at the table and the graph.</p>",
      "startCommands": [
        {
          "action": "createRiseBracket",
          "literalArgs": {
            "bracketName": "rise-bracket-B",
            "point1": "first-point-B",
            "point2": "second-point-B",
            "datasetName": "slope-data",
            "color": "#cccccc",
            "isHighlighted": true
          }
        },
        {
          "action": "addAnnotation",
          "literalArgs": {
            "name": "rise-bracket-B",
            "tableName": "slope-data"
          }
        }
      ],
      "shouldFinishImmediately": false,
      "submissibilityInspector": {
        "type": "Smartgraphs.FirstResponseFieldInspector"
      },
      "submissibilityCriterion": {
        "isNumeric": { "strip": "value" }
      },
      "triggeredCommands": [
        
      ],
      "afterSubmissionCommands": [
 
      ],
      "responseInspector": {
        "type": "Smartgraphs.ResponseFieldAnnotationsInspector",
        "config": {
          "annotationNames": [
            "first-point-B", 
            "second-point-B" 
          ]
        }
      },
      "responseBranches": [
        {
          "criterion": {
            "delta": {
              "axis": "y",
              "respectOrder": false
            }
          },
          "step": "/shared/instantaneous-speed/page/13/step/10"
        }
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/13/step/8",
      "isFinalStep": false,
      "shouldAutoAdvancePage": false,
      "hideSubmitButton": false,
      "submitButtonTitle": "OK",
      "nextButtonShouldSubmit": false
    },
    {
      "url": "/shared/instantaneous-speed/page/13/step/8",
      "activityPage": "/shared/instantaneous-speed/page/13",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "name": "slope-graph"
        },
        "bottom": {
          "type": "table",
          "graphName": "slope-graph",
          "datasetName": "slope-data"
        }
      },
      "beforeText": "<p>Incorrect. The change in position is <b>%@</b> - <b>%@</b>, or <b>%@</b> %@.</p>",
      "responseTemplate": "",
      "afterText": "",
      "substitutedExpressions": [
        {
          "type": "Smartgraphs.VariableInspector",
          "config" : {
            "evalStatement": "[0]",
            "variableNames": [ "max-position-B" ]
          } 
        },
        {
          "type": "Smartgraphs.VariableInspector",
          "config" : {
            "evalStatement": "[0]",
            "variableNames": [ "min-position-B" ]
          } 
        },
        {
          "type": "Smartgraphs.VariableInspector",
          "config" : {
            "evalStatement": "[0]",
            "variableNames": [ "change-position-B" ]
          } 
        },
        {
          "type": "Smartgraphs.VariableInspector",
          "config" : {
            "evalStatement": "'[0]'",
            "variableNames": [ "change-position-units-B" ]
          } 
        }
      ],
      "startCommands": [

      ],
      "shouldFinishImmediately": false,
      "submissibilityInspector": null,
      "submissibilityCriterion": null,
      "triggeredCommands": [
        
      ],
      "afterSubmissionCommands": [
 
      ],
      "responseInspector": null,
      "responseBranches": [

      ],
      "defaultBranch": "/shared/instantaneous-speed/page/13/step/9",
      "isFinalStep": false,
      "shouldAutoAdvancePage": false,
      "hideSubmitButton": false,
      "submitButtonTitle": "Continue",
      "nextButtonShouldSubmit": false
    },
    {
      "url": "/shared/instantaneous-speed/page/13/step/9",
      "activityPage": "/shared/instantaneous-speed/page/13",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "name": "slope-graph"
        },
        "bottom": {
          "type": "table",
          "graphName": "slope-graph",
          "datasetName": "slope-data"
        }
      },
      "beforeText": "<p>What is the change in time? </p>",
      "responseTemplate": "/components/response-template/numeric",
      "afterText": "<p>Hint:Look at the graph.</p>",
      "startCommands": [
        {
          "action": "setAnnotationAttribute",
          "literalArgs": {
            "name": "rise-arrow-B",
            "isHighlighted": false
          }
        },
        {
          "action": "setAnnotationAttribute",
          "literalArgs": {
            "name": "rise-bracket-B",
            "isHighlighted": false
          }
        },
        {
          "action": "createRunArrow",
          "literalArgs": {
            "arrowName": "run-arrow-B",
            "firstPoint": "first-point-B",
            "secondPoint": "second-point-B",
            "color": "#cccccc",
            "isHighlighted": true
          }
        },
        {
          "action": "addAnnotation",
          "literalArgs": {
            "name": "run-arrow-B",
            "graphName": "slope-graph"
          }
        }
      ],
      "shouldFinishImmediately": false,
      "submissibilityInspector": {
        "type": "Smartgraphs.FirstResponseFieldInspector"
      },
      "submissibilityCriterion": {
        "isNumeric": { "strip": "value" }
      },
      "triggeredCommands": [
        
      ],
      "afterSubmissionCommands": [
 
      ],
      "responseInspector": {
        "type": "Smartgraphs.ResponseFieldAnnotationsInspector",
        "config": {
          "annotationNames": [
            "first-point-B", 
            "second-point-B" 
          ]
        }
      },
      "responseBranches": [
        {
          "criterion": {
            "delta": {
              "axis": "x", 
              "respectOrder": false
            }
          },
          "step": "/shared/instantaneous-speed/page/13/step/13"
        }
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/13/step/11",
      "isFinalStep": false,
      "shouldAutoAdvancePage": false,
      "hideSubmitButton": false,
      "submitButtonTitle": "OK",
      "nextButtonShouldSubmit": false
    },
    {
      "url": "/shared/instantaneous-speed/page/13/step/10",
      "activityPage": "/shared/instantaneous-speed/page/13",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "name": "slope-graph"
        },
        "bottom": {
          "type": "table",
          "graphName": "slope-graph",
          "datasetName": "slope-data"
        }
      },
      "beforeText": "<p>Correct!</p><p>What is the change in time? </p>",
      "responseTemplate": "/components/response-template/numeric",
      "afterText": "<p>Hint:Look at the graph.</p>",
      "startCommands": [
        {
          "action": "setAnnotationAttribute",
          "literalArgs": {
            "name": "rise-arrow-B",
            "isHighlighted": false
          }
        },
        {
          "action": "setAnnotationAttribute",
          "literalArgs": {
            "name": "rise-bracket-B",
            "isHighlighted": false
          }
        },
        {
          "action": "createRunArrow",
          "literalArgs": {
            "arrowName": "run-arrow-B",
            "firstPoint": "first-point-B",
            "secondPoint": "second-point-B",
            "color": "#cccccc",
            "isHighlighted": true
          }
        },
        {
          "action": "addAnnotation",
          "literalArgs": {
            "name": "run-arrow-B",
            "graphName": "slope-graph"
          }
        }
      ],
      "shouldFinishImmediately": false,
      "submissibilityInspector": {
        "type": "Smartgraphs.FirstResponseFieldInspector"
      },
      "submissibilityCriterion": {
        "isNumeric": { "strip": "value" }
      },
      "triggeredCommands": [
        
      ],
      "afterSubmissionCommands": [
 
      ],
      "responseInspector": {
        "type": "Smartgraphs.ResponseFieldAnnotationsInspector",
        "config": {
          "annotationNames": [
            "first-point-B", 
            "second-point-B" 
          ]
        }
      },
      "responseBranches": [
        {
          "criterion": {
            "delta": {
              "axis": "x", 
              "respectOrder": false
            }
          },
          "step": "/shared/instantaneous-speed/page/13/step/13"
        }
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/13/step/11",
      "isFinalStep": false,
      "shouldAutoAdvancePage": false,
      "hideSubmitButton": false,
      "submitButtonTitle": "OK",
      "nextButtonShouldSubmit": false
    },
    {
      "url": "/shared/instantaneous-speed/page/13/step/11",
      "activityPage": "/shared/instantaneous-speed/page/13",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "name": "slope-graph"
        },
        "bottom": {
          "type": "table",
          "graphName": "slope-graph",
          "datasetName": "slope-data"
        }
      },
      "beforeText": "<p>Incorrect.</p><p>What is the change in time?</p>",
      "responseTemplate": "/components/response-template/numeric",
      "afterText": "<p>Hint: Look at the table and the graph.</p>",
      "startCommands": [
        {
          "action": "createRunBracket",
          "literalArgs": {
            "bracketName": "run-bracket-B",
            "point1": "first-point-B",
            "point2": "second-point-B",
            "datasetName": "slope-data",
            "color": "#cccccc",
            "isHighlighted": true
          }
        },
        {
          "action": "addAnnotation",
          "literalArgs": {
            "name": "run-bracket-B",
            "tableName": "slope-data"
          }
        }
      ],
      "shouldFinishImmediately": false,
      "submissibilityInspector": {
        "type": "Smartgraphs.FirstResponseFieldInspector"
      },
      "submissibilityCriterion": {
        "isNumeric": { "strip": "value" }
      },
      "triggeredCommands": [
        
      ],
      "afterSubmissionCommands": [
 
      ],
      "responseInspector": {
        "type": "Smartgraphs.ResponseFieldAnnotationsInspector",
        "config": {
          "annotationNames": [
            "first-point-B", 
            "second-point-B" 
          ]
        }
      },
      "responseBranches": [
        {
          "criterion": {
            "delta": {
              "axis": "x", 
              "respectOrder": false
            }
          },
          "step": "/shared/instantaneous-speed/page/13/step/13"
        }
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/13/step/12",
      "isFinalStep": false,
      "shouldAutoAdvancePage": false,
      "hideSubmitButton": false,
      "submitButtonTitle": "OK",
      "nextButtonShouldSubmit": false
    },
    {
      "url": "/shared/instantaneous-speed/page/13/step/12",
      "activityPage": "/shared/instantaneous-speed/page/13",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "name": "slope-graph"
        },
        "bottom": {
          "type": "table",
          "graphName": "slope-graph",
          "datasetName": "slope-data"
        }
      },
      "beforeText": "<p>Incorrect. The change in time is <b>%@</b> - <b>%@</b>, or <b>%@</b> %@.</p>",
      "responseTemplate": "",
      "afterText": "",
      "substitutedExpressions": [
        {
          "type": "Smartgraphs.VariableInspector",
          "config" : {
            "evalStatement": "[0]",
            "variableNames": [ "max-time-B" ]
          } 
        },
        {
          "type": "Smartgraphs.VariableInspector",
          "config" : {
            "evalStatement": "[0]",
            "variableNames": [ "min-time-B" ]
          } 
        },
        {
          "type": "Smartgraphs.VariableInspector",
          "config" : {
            "evalStatement": "[0]",
            "variableNames": [ "change-time-B" ]
          } 
        },
        {
          "type": "Smartgraphs.VariableInspector",
          "config" : {
            "evalStatement": "'[0]'",
            "variableNames": [ "change-time-units-B" ]
          } 
        }
      ],
      "startCommands": [

      ],
      "shouldFinishImmediately": false,
      "submissibilityInspector": null,
      "submissibilityCriterion": null,
      "triggeredCommands": [
        
      ],
      "afterSubmissionCommands": [
 
      ],
      "responseInspector": null,
      "responseBranches": [

      ],
      "defaultBranch": "/shared/instantaneous-speed/page/13/step/13",
      "isFinalStep": false,
      "shouldAutoAdvancePage": false,
      "hideSubmitButton": false,
      "submitButtonTitle": "Continue",
      "nextButtonShouldSubmit": false
    },
    {
      "url": "/shared/instantaneous-speed/page/13/step/13",
      "activityPage": "/shared/instantaneous-speed/page/13",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "name": "slope-graph"
        },
        "bottom": {
          "type": "table",
          "graphName": "slope-graph",
          "datasetName": "slope-data"
        }
      },
      "beforeText": "<p>If the change in position is <b>%@</b> %@ and the change in time is <b>%@</b> %@, what is the velocity, in meters per second?</p>",
      "responseTemplate": "/components/response-template/numeric",
      "afterText": "",
      "substitutedExpressions": [
        {
          "type": "Smartgraphs.VariableInspector",
          "config" : {
            "evalStatement": "[0]",
            "variableNames": [ "change-position-B" ]
          } 
        },
        {
          "type": "Smartgraphs.VariableInspector",
          "config" : {
            "evalStatement": "'[0]'",
            "variableNames": [ "change-position-units-B" ]
          } 
        },
        {
          "type": "Smartgraphs.VariableInspector",
          "config" : {
            "evalStatement": "[0]",
            "variableNames": [ "change-time-B" ]
          } 
        },
        {
          "type": "Smartgraphs.VariableInspector",
          "config" : {
            "evalStatement": "'[0]'",
            "variableNames": [ "change-time-units-B" ]
          } 
        }
      ],
      "startCommands": [
        {
          "action": "removeAnnotation",
          "literalArgs": {
            "name": "run-arrow-B",
            "graphName": "slope-graph"
          }
        },
        {
          "action": "removeAnnotation",
          "literalArgs": {
            "name": "run-bracket-B",
            "tableName": "slope-data"
          }
        },
        {
          "action": "removeAnnotation",
          "literalArgs": {
            "name": "rise-arrow-B",
            "graphName": "slope-graph"
          }
        },
        {
          "action": "removeAnnotation",
          "literalArgs": {
            "name": "rise-bracket-B",
            "tableName": "slope-data"
          }
        }
      ],
      "shouldFinishImmediately": false,
      "submissibilityInspector": {
        "type": "Smartgraphs.FirstResponseFieldInspector"
      },
      "submissibilityCriterion": {
        "isNumeric": { "strip": "value" }
      },
      "triggeredCommands": [
        
      ],
      "afterSubmissionCommands": [
 
      ],
      "responseInspector": {
        "type": "Smartgraphs.ResponseFieldAnnotationsInspector",
        "config": {
          "annotationNames": [
            "first-point-B", 
            "second-point-B" 
          ]
        }
      },
      "responseBranches": [
        {
          "criterion": {
            "slope": "value"
          },
          "step": "/shared/instantaneous-speed/page/13/step/16"
        }
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/13/step/14",
      "isFinalStep": false,
      "shouldAutoAdvancePage": false,
      "hideSubmitButton": false,
      "submitButtonTitle": "OK",
      "nextButtonShouldSubmit": false
    },
    {
      "url": "/shared/instantaneous-speed/page/13/step/14",
      "activityPage": "/shared/instantaneous-speed/page/13",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "name": "slope-graph"
        },
        "bottom": {
          "type": "table",
          "graphName": "slope-graph",
          "datasetName": "slope-data"
        }
      },
      "beforeText": "<p>Incorrect.</p><p>If the change in position is <b>%@</b> %@ and the change in time is <b>%@</b> %@, what is the velocity, in meters per second?</p>",
      "responseTemplate": "/components/response-template/numeric",
      "afterText": "<p>Hint: Recall that velocity is the change in position divided by the change in time.</p>",
      "substitutedExpressions": [
        {
          "type": "Smartgraphs.VariableInspector",
          "config" : {
            "evalStatement": "[0]",
            "variableNames": [ "change-position-B" ]
          } 
        },
        {
          "type": "Smartgraphs.VariableInspector",
          "config" : {
            "evalStatement": "'[0]'",
            "variableNames": [ "change-position-units-B" ]
          } 
        },
        {
          "type": "Smartgraphs.VariableInspector",
          "config" : {
            "evalStatement": "[0]",
            "variableNames": [ "change-time-B" ]
          } 
        },
        {
          "type": "Smartgraphs.VariableInspector",
          "config" : {
            "evalStatement": "'[0]'",
            "variableNames": [ "change-time-units-B" ]
          } 
        }
      ],
      "startCommands": [

      ],
      "shouldFinishImmediately": false,
      "submissibilityInspector": {
        "type": "Smartgraphs.FirstResponseFieldInspector"
      },
      "submissibilityCriterion": {
        "isNumeric": { "strip": "value" }
      },
      "triggeredCommands": [
        
      ],
      "afterSubmissionCommands": [
 
      ],
      "responseInspector": {
        "type": "Smartgraphs.ResponseFieldAnnotationsInspector",
        "config": {
          "annotationNames": [
            "first-point-B", 
            "second-point-B" 
          ]
        }
      },
      "responseBranches": [
        {
          "criterion": {
            "slope": "value"
          },
          "step": "/shared/instantaneous-speed/page/13/step/16"
        }
      ],
      "defaultBranch": "/shared/instantaneous-speed/page/13/step/15",
      "isFinalStep": false,
      "shouldAutoAdvancePage": false,
      "hideSubmitButton": false,
      "submitButtonTitle": "OK",
      "nextButtonShouldSubmit": false
    },
    {
      "url": "/shared/instantaneous-speed/page/13/step/15",
      "activityPage": "/shared/instantaneous-speed/page/13",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "name": "slope-graph"
        },
        "bottom": {
          "type": "table",
          "graphName": "slope-graph",
          "datasetName": "slope-data"
        }
      },
      "beforeText": "<p>Incorrect.</p><p>If the change in position is <b>%@</b> %@ and the change in time is <b>%@</b> %@, the velocity is <b>%@</b> divided by <b>%@</b>, or <b>%@</b> %@.</p>",
      "responseTemplate": "",
      "afterText": "",
      "substitutedExpressions": [
        {
          "type": "Smartgraphs.VariableInspector",
          "config" : {
            "evalStatement": "[0]",
            "variableNames": [ "change-position-B" ]
          } 
        },
        {
          "type": "Smartgraphs.VariableInspector",
          "config" : {
            "evalStatement": "'[0]'",
            "variableNames": [ "change-position-units-B" ]
          } 
        },
        {
          "type": "Smartgraphs.VariableInspector",
          "config" : {
            "evalStatement": "[0]",
            "variableNames": [ "change-time-B" ]
          } 
        },
        {
          "type": "Smartgraphs.VariableInspector",
          "config" : {
            "evalStatement": "'[0]'",
            "variableNames": [ "change-time-units-B" ]
          } 
        },
        {
          "type": "Smartgraphs.VariableInspector",
          "config" : {
            "evalStatement": "[0]",
            "variableNames": [ "change-position-B" ]
          } 
        },
        {
          "type": "Smartgraphs.VariableInspector",
          "config" : {
            "evalStatement": "[0]",
            "variableNames": [ "change-time-B" ]
          } 
        },
        {
          "type": "Smartgraphs.VariableInspector",
          "config" : {
            "evalStatement": "[0]",
            "variableNames": [ "velocity-B" ]
          } 
        },
        {
          "type": "Smartgraphs.VariableInspector",
          "config" : {
            "evalStatement": "'[0]'",
            "variableNames": [ "velocity-units-B" ]
          } 
        }
      ],
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
      "defaultBranch": "",
      "isFinalStep": true,
      "shouldAutoAdvancePage": false,
      "hideSubmitButton": true,
      "submitButtonTitle": "",
      "nextButtonShouldSubmit": false
    },
    {
      "url": "/shared/instantaneous-speed/page/13/step/16",
      "activityPage": "/shared/instantaneous-speed/page/13",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "name": "slope-graph"
        },
        "bottom": {
          "type": "table",
          "graphName": "slope-graph",
          "datasetName": "slope-data"
        }
      },
      "beforeText": "<p>Correct!</p><p>The position changed <b>%@</b> %@ in <b>%@</b> %@, so the velocity was <b>%@</b> %@.</p>",
      "responseTemplate": "",
      "afterText": "",
      "substitutedExpressions": [
        {
          "type": "Smartgraphs.VariableInspector",
          "config" : {
            "evalStatement": "[0]",
            "variableNames": [ "change-position-B" ]
          } 
        },
        {
          "type": "Smartgraphs.VariableInspector",
          "config" : {
            "evalStatement": "'[0]'",
            "variableNames": [ "change-position-units-B" ]
          } 
        },
        {
          "type": "Smartgraphs.VariableInspector",
          "config" : {
            "evalStatement": "[0]",
            "variableNames": [ "change-time-B" ]
          } 
        },
        {
          "type": "Smartgraphs.VariableInspector",
          "config" : {
            "evalStatement": "'[0]'",
            "variableNames": [ "change-time-units-B" ]
          } 
        },
        {
          "type": "Smartgraphs.VariableInspector",
          "config" : {
            "evalStatement": "[0]",
            "variableNames": [ "velocity-B" ]
          } 
        },
        {
          "type": "Smartgraphs.VariableInspector",
          "config" : {
            "evalStatement": "'[0]'",
            "variableNames": [ "velocity-units-B" ]
          } 
        }
      ],
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
      "defaultBranch": "",
      "isFinalStep": true,
      "shouldAutoAdvancePage": false,
      "hideSubmitButton": true,
      "submitButtonTitle": "",
      "nextButtonShouldSubmit": false
    },
    {
      "url": "/shared/instantaneous-speed/page/14/step/1",
      "activityPage": "/shared/instantaneous-speed/page/14",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "name": "slope-graph"
        },
        "bottom": null
      },
      "beforeText": "",
      "responseTemplate": "/components/response-template/open",
      "afterText": "",
      "startCommands": [
        {
          "action": "setAnnotationAttribute",
          "literalArgs": {
            "name": "first-point-B",
            "pointColor": "#f2b3b3"          
          }
        },
        {
          "action": "setAnnotationAttribute",
          "literalArgs": {
            "name": "second-point-B",
            "pointColor": "#f2b3b3"
          }
        },
        {
          "action": "addAnnotation",
          "literalArgs": {
            "name": "slope-line-A",
            "graphName": "slope-graph"
          }
        },
        {
          "action": "addAnnotation",
          "literalArgs": {
            "name": "first-point-A",
            "graphName": "slope-graph"
          }
        },
        {
          "action": "addAnnotation",
          "literalArgs": {
            "name": "second-point-A",
            "graphName": "slope-graph"
          }
        },
        {
          "action": "addAnnotation",
          "literalArgs": {
            "name": "slope-line-B",
            "graphName": "slope-graph"
          }
        },
        {
          "action": "addAnnotation",
          "literalArgs": {
            "name": "first-point-B",
            "graphName": "slope-graph"
          }
        },
        {
          "action": "addAnnotation",
          "literalArgs": {
            "name": "second-point-B",
            "graphName": "slope-graph"
          }
        }
      ],
      "shouldFinishImmediately": false,
      "shouldWaitForSubmissibleResponse": true,
      "submissibilityInspector": {
        "type": "Smartgraphs.FirstResponseFieldInspector"
      },
      "submissibilityCriterion": {
        "gt": [
          { "length": { "strip": "value" } },
          0
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
      "hideSubmitButton": true,
      "submitButtonTitle": "",
      "nextButtonShouldSubmit": true
    }
  ],
  "units": [

  ],
  "axes": [  
    {
      "url": "/shared/instantaneous-speed/axes/10s",
      "units": "/builtins/units/seconds",
      "min": 0,
      "max": 10,
      "nSteps": 5,
      "label": "Time"
    },
    {
      "url": "/shared/instantaneous-speed/axes/15s",
      "units": "/builtins/units/seconds",
      "min": 0,
      "max": 15,
      "nSteps": 15,
      "label": "Time"
    },
    {
      "url": "/shared/instantaneous-speed/axes/30s",
      "units": "/builtins/units/seconds",
      "min": 0,
      "max": 30,
      "nSteps": 6,
      "label": "Time"
    },
    {
      "url": "/shared/instantaneous-speed/axes/4.5m",
      "units": "/builtins/units/meters",      
      "min": 0,
      "max": 4.5,
      "nSteps": 9,
      "label": "Position"
    },

    {
      "url": "/shared/instantaneous-speed/axes/5m",
      "units": "/builtins/units/meters",      
      "min": 0,
      "max": 5,
      "nSteps": 10,
      "label": "Position"
    },
    {
      "url": "/shared/instantaneous-speed/axes/15m",
      "units": "/builtins/units/meters",
      "min": 0,
      "max": 15,
      "nSteps": 5,
      "label": "Position"
    }
  ],
  "graphs": [
    {
      "url": "/shared/instantaneous-speed/graph/freehand-walking-normal",
      "activity": "/shared/instantaneous-speed",
      "name": "freehand-walking-normal",
      "description": "freehand prediciton of normal walking velocity",
      "title": "Predicted Data (Normal)",
      "xAxis": "/shared/instantaneous-speed/axes/30s",
      "yAxis": "/shared/instantaneous-speed/axes/4.5m",
      "initialDatasets": [

      ],
      "initialAnnotations": [

      ]
    },
    {
      "url": "/shared/instantaneous-speed/graph/prediction-walking-normal",
      "activity": "/shared/instantaneous-speed",
      "name": "prediction-walking-normal",
      "description": "prediciton of normal walking velocity",
      "title": "Predicted Data (Normal)",
      "xAxis": "/shared/instantaneous-speed/axes/30s",
      "yAxis": "/shared/instantaneous-speed/axes/4.5m",
      "initialDatasets": [

      ],
      "initialAnnotations": [
        {
          "type": "Smartgraphs.FreehandSketch",
          "name": "prediction-normal"
        }
      ]
    },
    {
      "url": "/shared/instantaneous-speed/graph/freehand-walking-slow",
      "activity": "/shared/instantaneous-speed",
      "name": "freehand-walking-slow",
      "description": "freehand prediciton of slow walking velocity",
      "title": "Predicted Data (Slow)",
      "xAxis": "/shared/instantaneous-speed/axes/30s",
      "yAxis": "/shared/instantaneous-speed/axes/4.5m",
      "initialDatasets": [

      ],
      "initialAnnotations": [

      ]
    },
    {
      "url": "/shared/instantaneous-speed/graph/prediction-walking-slow",
      "activity": "/shared/instantaneous-speed",
      "name": "prediction-walking-slow",
      "description": "prediciton of slow walking velocity",
      "title": "Predicted Data (Slow)",
      "xAxis": "/shared/instantaneous-speed/axes/30s",
      "yAxis": "/shared/instantaneous-speed/axes/4.5m",
      "initialDatasets": [

      ],
      "initialAnnotations": [
        {
          "type": "Smartgraphs.FreehandSketch",
          "name": "prediction-slow"
        }
      ]
    },
    {
      "url": "/shared/instantaneous-speed/graph/sensor-normal-walking",
      "activity": "/shared/instantaneous-speed",
      "name": "sensor-normal-walking",
      "description": "using sensor to measure normal walking pace",
      "title": "Actual Data (Normal)",
      "xAxis": "/shared/instantaneous-speed/axes/30s",
      "yAxis": "/shared/instantaneous-speed/axes/4.5m",
      "initialDatasets": [

      ],
      "initialAnnotations": [

      ]
    },
    {
      "url": "/shared/instantaneous-speed/graph/sensor-result-normal-walking",
      "activity": "/shared/instantaneous-speed",
      "name": "sensor-result-normal-walking",
      "description": "sensor result from normal walking",
      "title": "Actual Data (Normal)",
      "xAxis": "/shared/instantaneous-speed/axes/30s",
      "yAxis": "/shared/instantaneous-speed/axes/4.5m",
      "initialDatasets": [
        "sensor-normal"
      ],
      "initialAnnotations": [

      ]
    },
    {
      "url": "/shared/instantaneous-speed/graph/sensor-slow-walking",
      "activity": "/shared/instantaneous-speed",
      "name": "sensor-slow-walking",
      "description": "using sensor to measure slow walking pace",
      "title": "Actual Data (Slow)",
      "xAxis": "/shared/instantaneous-speed/axes/30s",
      "yAxis": "/shared/instantaneous-speed/axes/4.5m",
      "initialDatasets": [

      ],
      "initialAnnotations": [

      ]
    },
    {
      "url": "/shared/instantaneous-speed/graph/sensor-result-slow-walking",
      "activity": "/shared/instantaneous-speed",
      "name": "sensor-result-slow-walking",
      "description": "sensor result from slow walking",
      "title": "Actual Data (Slow)",
      "xAxis": "/shared/instantaneous-speed/axes/30s",
      "yAxis": "/shared/instantaneous-speed/axes/4.5m",
      "initialDatasets": [
        "sensor-slow"
      ],
      "initialAnnotations": [

      ]
    },
    {
      "url": "/shared/instantaneous-speed/graph/slope-graph",
      "activity": "/shared/instantaneous-speed",
      "name": "slope-graph",
      "description": "graph for calculating slope",
      "title": "Position vs. Time",
      "xAxis": "/shared/instantaneous-speed/axes/10s",
      "yAxis": "/shared/instantaneous-speed/axes/15m",
      "initialDatasets": [
        "slope-data"
      ],
      "initialAnnotations": [

      ]
    },
    {
      "url": "/shared/instantaneous-speed/graph/slope-graph-analyze",
      "activity": "/shared/instantaneous-speed",
      "name": "slope-graph-analyze",
      "description": "graph for analyzing slope",
      "title": "Position vs. Time",
      "xAxis": "/shared/instantaneous-speed/axes/15s",
      "yAxis": "/shared/instantaneous-speed/axes/5m",
      "initialDatasets": [

      ],
      "initialAnnotations": [
        {
          "type": "Smartgraphs.FreehandSketch",
          "name": "slope-data-analyze-line-A"
        },
        {
          "type": "Smartgraphs.FreehandSketch",
          "name": "slope-data-analyze-line-B"
        },
        {
          "type": "Smartgraphs.FreehandSketch",
          "name": "slope-data-analyze-line-C"
        },
        {
          "type": "Smartgraphs.FreehandSketch",
          "name": "slope-data-analyze-line-D"
        }
      ]
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
      "url": "/components/response-template/numeric",
      "templateString": "",
      "fieldTypes": [
        "numeric"
      ],
      "fieldChoicesList": [
        null
      ],
      "initialValues": [

      ]
    }
  ],
  "datasets": [
    {
      "url": "/shared/instantaneous-speed/dataset/slope-data",
      "name": "slope-data",
      "activity": "/shared/instantaneous-speed",
      "xUnits": "/builtins/units/seconds",
      "xLabel": "Time",
      "xShortLabel": "Time",
      "yUnits": "/builtins/units/meters",
      "yLabel": "Position",
      "yShortLabel": "Position",
      "points": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "session": null,
      "defaultColor": null
    }
  ],
  "datapoints": [
    {
      "x": 0,
      "y": 0,
      "guid": 1,
      "dataset": "/shared/instantaneous-speed/dataset/slope-data"
    },
    {
      "x": 1,
      "y": 2,
      "guid": 2,
      "dataset": "/shared/instantaneous-speed/dataset/slope-data"
    },
    {
      "x": 2,
      "y": 4,
      "guid": 3,
      "dataset": "/shared/instantaneous-speed/dataset/slope-data"
    },
    {
      "x": 3,
      "y": 5,
      "guid": 4,
      "dataset": "/shared/instantaneous-speed/dataset/slope-data"
    },
    {
      "x": 4,
      "y": 6,
      "guid": 5,
      "dataset": "/shared/instantaneous-speed/dataset/slope-data"
    },
    {
      "x": 5,
      "y": 8,
      "guid": 6,
      "dataset": "/shared/instantaneous-speed/dataset/slope-data"
    },
    {
      "x": 6,
      "y": 8,
      "guid": 7,
      "dataset": "/shared/instantaneous-speed/dataset/slope-data"
    },
    {
      "x": 7,
      "y": 10,
      "guid": 8,
      "dataset": "/shared/instantaneous-speed/dataset/slope-data"
    },
    {
      "x": 8,
      "y": 11,
      "guid": 9,
      "dataset": "/shared/instantaneous-speed/dataset/slope-data"
    },
    {
      "x": 9,
      "y": 12,
      "guid": 10,
      "dataset": "/shared/instantaneous-speed/dataset/slope-data"
    },
    {
      "x": 10,
      "y": 15,
      "guid": 11,
      "dataset": "/shared/instantaneous-speed/dataset/slope-data"
    },
    {
      "x": 7,
      "y": 4,
      "guid": "16-A"
    },
    {
      "x": 10,
      "y": 2.9,
      "guid": "16-B"
    },
    {
      "x": 10.5,
      "y": 1.9,
      "guid": "16-C"
    },
    {
      "x": 13,
      "y": 0.9,
      "guid": "16-D"
    }
  ],
  "annotations": [
    {
      "type": "FreehandSketch",
      "records": [
        {
          "url": "/shared/instantaneous-speed/annotation/slope-data-analyze-line-A",
          "name": "slope-data-analyze-line-A",
          "activity": "/shared/instantaneous-speed",
          "points": [
            {
              "x": 0,
              "y": 0
            },
            {
              "x": 9,
              "y": 4.5
            }
          ],
          "session": null,
          "strokeColor": "#2f7f0d"
        },
        {
          "url": "/shared/instantaneous-speed/annotation/slope-data-analyze-line-B",
          "name": "slope-data-analyze-line-B",
          "activity": "/shared/instantaneous-speed",
          "points": [
            {
              "x": 0,
              "y": 0
            },
            {
              "x": 15,
              "y": 4
            }
          ],
          "session": null,
          "strokeColor": "#000000"
        },
        {
          "url": "/shared/instantaneous-speed/annotation/slope-data-analyze-line-C",
          "name": "slope-data-analyze-line-C",
          "activity": "/shared/instantaneous-speed",
          "points": [
            {
              "x": 0,
              "y": 0
            },
            {
              "x": 15,
              "y": 2.5
            }
          ],
          "session": null,
          "strokeColor": "#ff7f0d"
        },
        {
          "url": "/shared/instantaneous-speed/annotation/slope-data-analyze-line-D",
          "name": "slope-data-analyze-line-D",
          "activity": "/shared/instantaneous-speed",
          "points": [
            {
              "x": 0,
              "y": 0
            },
            {
              "x": 15,
              "y": 1
            }
          ],
          "session": null,
          "strokeColor": "#1f77b3"
        }
      ]
    },
    {
      "type": "HighlightedPoint",
      "records": [
        {
          "url": "/shared/instantaneous-speed/annotation/first-point-A",
          "name": "first-point-A",
          "activity": "/shared/instantaneous-speed",
          "session": null,
          "point": null,
          "displayStyle": "highlight-point-and-dim-background",
          "datasetColor": "#cccccc",
          "pointColor": "#1f77b4"
        },
        {
          "url": "/shared/instantaneous-speed/annotation/second-point-A",
          "name": "second-point-A",
          "activity": "/shared/instantaneous-speed",
          "session": null,
          "point": null,
          "displayStyle": "highlight-point-and-dim-background",
          "datasetColor": "#cccccc",
          "pointColor": "#ff7f0e"
        },
        {
          "url": "/shared/instantaneous-speed/annotation/first-point-B",
          "name": "first-point-B",
          "activity": "/shared/instantaneous-speed",
          "session": null,
          "point": null,
          "displayStyle": "highlight-point-and-dim-background",
          "datasetColor": "#cccccc",
          "pointColor": "#1f77b4"
        },
        {
          "url": "/shared/instantaneous-speed/annotation/second-point-B",
          "name": "second-point-B",
          "activity": "/shared/instantaneous-speed",
          "session": null,
          "point": null,
          "displayStyle": "highlight-point-and-dim-background",
          "datasetColor": "#cccccc",
          "pointColor": "#ff7f0e"
        },
        {
          "url": "/shared/instantaneous-speed/annotation/first-point-C",
          "name": "first-point-C",
          "activity": "/shared/instantaneous-speed",
          "session": null,
          "point": null,
          "displayStyle": "highlight-point-and-dim-background",
          "datasetColor": "#cccccc",
          "pointColor": "#1f77b4"
        },
        {
          "url": "/shared/instantaneous-speed/annotation/second-point-C",
          "name": "second-point-C",
          "activity": "/shared/instantaneous-speed",
          "session": null,
          "point": null,
          "displayStyle": "highlight-point-and-dim-background",
          "datasetColor": "#cccccc",
          "pointColor": "#ff7f0e"
        }
      ]
    }
  ]
};
