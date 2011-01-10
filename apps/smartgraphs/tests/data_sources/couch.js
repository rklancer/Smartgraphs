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

var newMockSCRequest = function () {
  var ret = {};
  
  ret.getUrl = function (url) {
    this.url = url;
    return this;
  };
    
  ret.json = function () {
    return this;
  };
    
  ret.header = function () {
    return this;
  };
    
  ret.notify = function (target, methodName, store, storeKey) {
    this.target = target;
    this.methodName = methodName;
    this.store = store;
    this.storeKey = storeKey;
    return this;
  };
  
  ret.send = function () {
    this.sendCalled = YES;
    return this;
  };
  
  return ret;
};

var activity;
var mockResponse;
var doRequestCallback;


module("Smartgraphs.couchDataSource record loading", {
  setup: function () {
    setup.mock(Smartgraphs, 'dataSource', Smartgraphs.CouchDataSource.create());
    setup.mock(Smartgraphs, 'store', SC.Store.create().from(Smartgraphs.dataSource));    
    var mockSCRequest = newMockSCRequest();
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
  expect(2);
  
  activity = Smartgraphs.store.find(Smartgraphs.Activity, '/test/skeleton');
  equals( activity.get('status'), SC.Record.BUSY_LOADING, "Record should be BUSY_LOADING after find");
  SC.RunLoop.begin();
  doRequestCallback();
  SC.RunLoop.end();
  equals( activity.get('status'), SC.Record.READY_CLEAN, "Record should be READY_CLEAN after callback");
});


module("Smartgraphs.couchDataSource aggregate record handling", {
  setup: function () {
    setup.mock(Smartgraphs, 'dataSource', Smartgraphs.CouchDataSource.create());
    setup.mock(Smartgraphs, 'store', SC.Store.create().from(Smartgraphs.dataSource));    
    var mockSCRequest = newMockSCRequest();
    setup.mock(SC, 'Request', mockSCRequest);
    
    mockResponse = SC.Object.create({
      body: { rows: [ { value: doc } ] }
    });
    
    doRequestCallback = function () {
      Smartgraphs.dataSource[mockSCRequest.methodName].call(mockSCRequest.target, mockResponse, mockSCRequest.store, mockSCRequest.storeKey);
    };
    activity = Smartgraphs.store.find(Smartgraphs.Activity, '/test/skeleton');
    SC.RunLoop.begin();
    doRequestCallback();
    SC.RunLoop.end();
    
    equals( activity.get('status'), SC.Record.READY_CLEAN, "Record should be READY_CLEAN to start");
  },

  teardown: function () {
    teardown.mocks();
  }
});


test("Modifying activity pages should dirty activity record", function () {
  expect(3);
  
  var page = activity.get('pages').objectAt(0);

  SC.RunLoop.begin();  
  page.set('introText', "modified");
  SC.RunLoop.end();
  
  ok( page.get('status') & SC.Record.DIRTY, "modifying page record should dirty page record");
  ok( activity.get('status') & SC.Record.DIRTY, "modifying page record should dirty activity record");
});


test("Modifying activity steps should dirty activity record", function () {
  expect(4);
  
  var page = activity.get('pages').objectAt(0);
  var step = page.get('steps').objectAt(0);

  SC.RunLoop.begin();
  step.set('beforeText', "modified");
  SC.RunLoop.end();
  
  ok( step.get('status') & SC.Record.DIRTY, "modifying step record should dirty step record");
  ok( page.get('status') & SC.Record.DIRTY, "modifying step record should dirty page record");
  ok( activity.get('status') & SC.Record.DIRTY, "modifying step record should dirty activity record");
});


test("Modifying canned datasets should dirty activity record", function () {
  expect(3);
  
  var dataset = activity.get('datasets').objectAt(0);

  SC.RunLoop.begin();  
  dataset.set('defaultColor', "modified");
  SC.RunLoop.end();  
  
  ok( dataset.get('status') & SC.Record.DIRTY, "modifying dataset record should dirty dataset record");
  ok( activity.get('status') & SC.Record.DIRTY, "modifying dataset record should dirty activity record");
});


test("Modifying canned datapoint should dirty activity record", function () {
  expect(4);

  var dataset = activity.get('datasets').objectAt(0);
  var point = dataset.get('points').objectAt(0);
  
  SC.RunLoop.begin();
  point.set('x', -1);
  SC.RunLoop.end();
  
  ok( point.get('status') & SC.Record.DIRTY, "modifying datapoint record should dirty datapoint record");
  ok( dataset.get('status') & SC.Record.DIRTY, "modifying datapoint record should dirty dataset record");
  ok( activity.get('status') & SC.Record.DIRTY, "modifying datapoint record should dirty activity record");
});


test("Modifying canned annotation should dirty activity record", function () {
  expect(3);
  
  var highlight = Smartgraphs.store.find(Smartgraphs.HighlightedPoint, "/test/skeleton/highlight1");
  
  SC.RunLoop.begin();
  highlight.set('color', "modified");
  SC.RunLoop.end();
  
  ok( highlight.get('status') & SC.Record.DIRTY, "modifying annotation record should dirty annotation record");
  ok( activity.get('status') & SC.Record.DIRTY, "modifying annotation record should dirty activity record");
});


test("Modifying axes record should dirty activity record", function () {
  expect(3);

  var axes = activity.get('axes').objectAt(0);
  
  SC.RunLoop.begin();
  axes.set('xSteps', -1);
  SC.RunLoop.end();
  
  ok( axes.get('status') & SC.Record.DIRTY, "modifying axes record should dirty axes record");
  ok( activity.get('status') & SC.Record.DIRTY, "modifying axes record should dirty activity record");
});


test("Modifying graph record should dirty activity record", function () {
  expect(3);
  
  var graph = activity.get('graphs').objectAt(0);
  
  SC.RunLoop.begin();
  graph.set('description', 'modified');
  SC.RunLoop.end();
  
  ok( graph.get('status') & SC.Record.DIRTY, "modifying graph record should dirty graph record");
  ok( activity.get('status') & SC.Record.DIRTY, "modifying graph record should dirty activity record");
});


test("Modifying response template record should dirty activity record", function () {
  expect(3);
  
  var template = activity.get('responseTemplates').objectAt(0);
  
  SC.RunLoop.begin();
  template.set('templateString', 'modified');
  SC.RunLoop.end();
  
  ok( template.get('status') & SC.Record.DIRTY, "modifying template record should dirty template record");
  ok( activity.get('status') & SC.Record.DIRTY, "modifying template record should dirty activity record");
});


