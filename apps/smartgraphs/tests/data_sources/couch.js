// ==========================================================================
// Project:   Smartgraphs.couchDataSource Unit Test
// Copyright: ©2010 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs module test ok equals same stop start setup teardown */

var doc = {
  "_id": "skeleton.df4",
  "_rev": "5-64bc869f1066f0b6f3ebf5a38e795db5",
  "data_format_version": 4,  
  "activity": {
    "title": "Skeleton Activity",
    "url": "/test/skeleton",
    "owner": "test",
    "pages": [
      "/test/skeleton/page/1"
    ],
    "datasets": [
      "/test/skeleton/dataset1"
    ],
    "axes": [
      "/test/skeleton/axes1"
    ],
    "graphs": [
      "/test/skeleton/graph1"
    ],
    "responseTemplates": [
      "/test/skeleton/response1"
    ]
  },
  "pages": [
    {
      "url": "/test/skeleton/page/1",
      "steps": [
        "/test/skeleton/page/1/step/1"
      ],
      "name": "Page Name",
      "firstStep": "/test/skeleton/page/1/step/1",
      "introText": "test text",
      "activity": "/test/skeleton",
      "index": 1
    }
  ],
  "steps": [
    {
      "url": "/test/skeleton/page/1/step/1",
      "activityPage": "/test/skeleton/page/1",
      "paneConfig": "single",
      "panes": {
        "single": {
          "type": "graph",
          "name": "test graph"
        }
      },
      "beforeText": "Step text",
      "responseTemplate": "/test/skeleton/response1",
      "afterText": "",
      "startCommands": [

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
      "defaultBranch": null,
      "isFinalStep": true,
      "shouldAutoAdvancePage": false,
      "hideSubmitButton": false,
      "submitButtonTitle": "OK",
      "nextButtonShouldSubmit": false
    }
  ],
  "axes": [
    {
      "url": "/test/skeleton/axes1",
      "activity": "/test/skeleton",
      "xMin": 0,
      "xMax": 10,
      "xSteps": 10,
      "xLabel": "Time (minutes)",
      "xLabelAbbreviated": "Time (m)",
      "yMin": 0,
      "yMax": 100,
      "ySteps": 10,
      "yLabel": "Temperature (Celsius)",
      "yLabelAbbreviated": "Temp. (C)"
    }
  ],
  "graphs": [
    {
      "url": "/test/skeleton/graph1",
      "activity": "/test/skeleton",
      "name": "test graph",
      "description": "test graph",
      "title": "Temperature vs. Time",
      "axes": "/test/skeleton/axes1",
      "initialDatasets": [
        "test dataset"
      ],
      "initialAnnotations": [
        {
          "type": "Smartgraphs.HighlightedPoint",
          "name": "test highlight"
        }
      ]
    }
  ],
  "responseTemplates": [
    {
      "url": "/test/skeleton/response1",
      "activity": "/test/skeleton",
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
    }
  ],
  "datasets": [
    {
      "url": "/test/skeleton/dataset1",
      "name": "test dataset",
      "activity": "/test/skeleton",
      "points": [
        "p1"
      ],
      "defaultColor": null
    }
  ],
  "datapoints": [
    {
      "x": 5,
      "y": 50,
      "guid": "p1",
      "dataset": "/test/skeleton/dataset1"
    }
  ],
  "annotations": [
    {
      "type": "HighlightedPoint",
      "records": [
        {
          "url": "/test/skeleton/highlight1",
          "name": "test highlight",
          "activity": "/test/skeleton",
          "point": "p1"
        }
      ]
    }
  ]
};

var mockSCRequest;
var mockResponse;
var doRequestCallback;

module("Smartgraphs.couchDataSource can back retrieveRecord", {

  setup: function () {
    
    setup.mock(Smartgraphs, 'dataSource', Smartgraphs.CouchDataSource.create());
    setup.mock(Smartgraphs, 'store', SC.Store.create().from(Smartgraphs.dataSource));
    
    mockSCRequest = {
      getUrl: function (url) {
        this.url = url;
        return this;
      },
      
      json: function () {
        return this;
      },
      
      header: function () {
        return this;
      },
      
      notify: function (target, methodName, store, storeKey) {
        this.target = target;
        this.methodName = methodName;
        this.store = store;
        this.storeKey = storeKey;
        return this;
      },
      
      send: function () {
        this.sendCalled = YES;
        return this;
      }
    };
    setup.mock(SC, 'Request', mockSCRequest);
    
    mockResponse = SC.Object.create({
      body: { rows: [ { value: doc } ] }
    });
    
    doRequestCallback = function () {
      Smartgraphs.dataSource[mockSCRequest.methodName].call(mockSCRequest.target, mockResponse, mockSCRequest.store, mockSCRequest.storeKey);
    };
  },

  teardown: function () {
    teardown.mocks();
  }
});


test("activity record loading", function () {
  var activity = Smartgraphs.store.find(Smartgraphs.Activity, '/test/skeleton');
  ok( activity.get('status') & SC.Record.BUSY, "Record should be BUSY immediately after find");
    
  SC.RunLoop.begin();
  doRequestCallback();
  SC.RunLoop.end();
  
  equals( activity.get('status'), SC.Record.READY_CLEAN, "Record should be READY_CLEAN after callback");
});


// test dirtying aggregate records
// test markRecordsBusy
// test 