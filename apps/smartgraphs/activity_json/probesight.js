/*globals Smartgraphs */

Smartgraphs.activityDocs = Smartgraphs.activityDocs || {};
Smartgraphs.activityDocs["/shared/probesight"] = 
{
  "_id": "probesight",
  "_rev": "1",
  "data_format_version": 5,
  "activity": {
    "title": "Seeing Motion",
    "url": "/shared/probesight",
    "owner": "shared",
    "pages": [   
      "/shared/probesight/page/1",
      "/shared/probesight/page/2",
      "/shared/probesight/page/3"
    ],
    "datasets": [
    ],
    "units": [

    ],
    "axes": [
      "/shared/probesight/axes/30s",
      "/shared/probesight/axes/5m"
    ],
    "graphs": [
    
    ],
    "responseTemplates": [
    ]
  },
  "pages": [
    {
      "name": "Intro",
      "url": "/shared/probesight/page/1",
      "activity": "/shared/probesight",
      "index": 1,
      "introText": "<h1>SmartGraphs</h1><p>The SmartGraphs project is developing <i>open source, browser-based</i> activities that help students learn the meaning of graphs. </p><p> Activities run directly in a modern Web browser such as Firefox.  Programming is done in Javascript using the Sproutcore framework. This demo does not use Flash.</p><p>Click the <b>Next</b> button for a demo.<p>",                     
      "steps": [
        "/shared/probesight/page/1/step/1"
      ],
      "firstStep": "/shared/probesight/page/1/step/1"
    },
    {
      "name": "Sensor",
      "url": "/shared/probesight/page/2",
      "activity": "/shared/probesight",
      "index": 2,
      "introText": "<p>You are going to try moving in different ways on a straight path while collecting data with a motion sensor.</p><p>When you are ready, click Start to record the position and time data for your movements. Walk on the path for 30 seconds. Experiment with different kinds of motions (walking fast, slow, forward, backward\u2026).</p><p>The sensor will stop after 30 seconds are up. You can click Clear to clear the graph and try again.</p>",                    
      "steps": [
        "/shared/probesight/page/2/step/1"
      ],
      "firstStep": "/shared/probesight/page/2/step/1"
    },
    {
      "name": "Credits",
      "url": "/shared/probesight/page/3",
      "activity": "/shared/probesight",
      "index": 3,
      "introText": "<h1>SmartGraphs</h1><p>Thank you for trying this demo.</p><p>We hope you will visit the Concord Consortium's <a href=\"http://www.concord.org/projects/smartgraphs\">SmartGraphs website</a>.</p>",                    
      "steps": [
        "/shared/probesight/page/3/step/1"
      ],
      "firstStep": "/shared/probesight/page/3/step/1"
    }
  ],
  "steps": [
    {
      "url": "/shared/probesight/page/1/step/1",
      "activityPage": "/shared/probesight/page/1",
      "paneConfig": "single",
      "panes": {
        "single": {
          "type": "html",
          "html": "<div style=\"width: 440px; margin: 0 auto\"><img src=\"/static/smartgraphs/en/current/resources/images/smart-graphs-100.png\" style=\"position: relative; top: 60px; left: 10px\"><div style=\"position: relative; top: -40px; left: 120px;\"><h1 style=\"font-size: 48px; margin: 0\">SmartGraphs</h1><p style=\"margin: 5px 2px; font-size: 18px\">A project of the Concord Consortium</p></div></div><div style=\"position: absolute; bottom: 0\"><img src=\"/static/smartgraphs/en/current/resources/images/nsf-flat-logo.jpg\" style=\"position: absolute; left: 10px; bottom: 20px; width: 100px; height: 100px\"><p style=\"float: right; margin: 0 10px 20px 120px; font-size: 14px; font-style: italic\">This material is based upon work supported by the National Science Foundation under Grant No. DRL-0918522. Any opinions, findings, and conclusions or recommendations expressed in this material are those of the author(s) and do not necessarily reflect the views of the National Science Foundation.</p></div>"
        }
      },
      "beforeText": null,
      "submissibilityCriterion": null,
      "responseTemplate": null,
      "responseBranches": [
      ],
      "defaultBranch": "/shared/probesight/page/1/step/2",
      "isFinalStep": true,
      "nextButtonShouldSubmit": true
    },
    
  
    
    
    
    
    
    
    
    /************ Page 2 ************/








    {
      "url": "/shared/probesight/page/2/step/1",
      "activityPage": "/shared/probesight/page/2",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/probesight/axes/30s",
          "yAxis": "/shared/probesight/axes/5m",
          "datasets": ["sensor-data"],
          "annotations": []
        },
        "bottom": {
          "type": "table",
          "dataset": "sensor-data"
        }
      },
      "beforeText": null,
      "responseTemplate": null,
      "submissibilityCriterion": null,
      "startCommands": [
        {
          "name": "startSensorInput",
          "args": {
            "pane": "top",
            "dataset": "sensor-data"
          }
        }
      ],
      "defaultBranch": null,
      "isFinalStep": true,
      "nextButtonShouldSubmit": true
    },








    /************ Page 3 ************/








    {
      "url": "/shared/probesight/page/3/step/1",
      "activityPage": "/shared/probesight/page/3",
      "paneConfig": "single",
      "panes": {
        "single": {
          "type": "html",
          "html": "<div style=\"width: 370px; margin: 0 auto; padding-top: 40px\"><img src=\"/static/smartgraphs/en/current/resources/images/cc-logo-vertical.jpg\"><h1 style=\"margin: 25px 10px 10px 20px\">Our SmartGraphs project team includes:</h1> <ul style=\"padding-left: 10px\"> <li>Stephen Bannasch</li> <li>Eric Kattwinkel</li> <li>Rachel Kay</li> <li>Richard Klancer</li> <li>Carolyn Staudt</li> <li>Robert Tinker</li> <li>Kofi Weusijana</li> <li>Dewi Win</li> <li>Andy Zucker</li> </ul></div>"
        }
      },
      "beforeText": null,
      "defaultBranch": null,
      "isFinalStep": true,
      "hideSubmitButton": true,
      "nextButtonShouldSubmit": false
    }
  ],
  "units": [

  ],
  "axes": [  
    {
      "url": "/shared/probesight/axes/30s",
      "units": "/builtins/units/seconds",
      "min": 0,
      "max": 30,
      "nSteps": 6,
      "label": "Time"
    },
    {
      "url": "/shared/probesight/axes/5m",
      "units": "/builtins/units/meters",
      "min": 0,
      "max": 5,
      "nSteps": 10,
      "label": "Position"
    }
  ],
  "graphs": [
  
  ],
  "responseTemplates": [
  
  ],
  "datasets": [
    {
      "url": "/shared/probesight/dataset/sensor-data",
      "name": "sensor-data",
      "activity": "/shared/probesight",
      "xUnits": "/builtins/units/seconds",
      "xLabel": "Time",
      "xShortLabel": "Time",
      "yUnits": "/builtins/units/meters",
      "yLabel": "Position",
      "yShortLabel": "Position",
      "points": [
      ],
      "session": null,
      "defaultColor": null
    }
  ],
  "datapoints": [

  ],
  "tags": [
  
  ],
  "annotations": [

  ]
};
