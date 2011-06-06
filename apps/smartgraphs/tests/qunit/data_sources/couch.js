// ==========================================================================
// Project:   Smartgraphs.couchDataSource Unit Test
// Copyright: ©2010 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs module test ok equals same stop start setup teardown */

var doc = {
  "data_format_version": 5,
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
    "units": [
    ],
    "axes": [
      "/test/skeleton/axes/x-axis",
      "/test/skeleton/axes/y-axis"      
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
      "submissibilityInspector": null,
      "submissibilityCriterion": null,
      "afterSubmissionCommands": [
        
      ],
      "responseInspector": null,
      "responseBranches": [
        
      ],
      "defaultBranch": null,
      "isFinalStep": true,
      "hideSubmitButton": false,
      "submitButtonTitle": "OK",
      "nextButtonShouldSubmit": false
    }
  ],
  "units": [

  ],
  "axes": [
    {
      "url": "/test/skeleton/axes/x-axis",
      "activity": "/test/skeleton",
      "units": null,
      "min": 0,
      "max": 10,
      "nSteps": 10,
      "label": "Time"
    },
    {
      "url": "/test/skeleton/axes/y-axis",
      "activity": "/test/skeleton",
      "units": null, 
      "min": 0,
      "max": 100,
      "nSteps": 10,
      "label": "Temperature"
    }
  ],
  "graphs": [
    {
      "url": "/test/skeleton/graph1",
      "activity": "/test/skeleton",
      "name": "test graph",
      "description": "test graph",
      "title": "Temperature vs. Time",
      "xAxis": "/test/skeleton/axes/x-axis",
      "yAxis": "/test/skeleton/axes/y-axis",
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
      "xUnits": null,
      "xLabel": "Time",
      "xShortLabel": "Time",
      "yUnits": null,
      "yLabel": "Temperature",
      "yShortLabel": "Temp",
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
    this.getUrl = url;
    return this;
  };
  
  ret.putUrl = function (url) {
    this.putUrl = url;
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
  
  ret.send = function (doc) {
    this.doc = doc;
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


var decoyActivity, page, decoyPage, step, highlight;
var K = SC.Record;

module("Smartgraphs.couchDataSource helper methods", {
  setup: function () {
    setup.mock(Smartgraphs, 'dataSource', Smartgraphs.CouchDataSource.create());
    setup.mock(Smartgraphs, 'store', SC.Store.create().from(Smartgraphs.dataSource));
    
    activity = Smartgraphs.store.createRecord(Smartgraphs.Activity, {
      url: '/test/test',
      title: "Test activity",
      pages: []
    });
    
    decoyActivity = Smartgraphs.store.createRecord(Smartgraphs.Activity, {
      url: '/test/decoy',
      title: "Decoy activity",
      pages: []
    });
    
    page = Smartgraphs.store.createRecord(Smartgraphs.ActivityPage, {
      url: 'test/test/page1',
      introText: "Test page",
      steps: []
    });
    activity.get('pages').pushObject(page);
    
    decoyPage = Smartgraphs.store.createRecord(Smartgraphs.ActivityPage, {
      url: 'test/decoy/page1',
      introText: "Decoy activity page",
      steps: []
    });
    decoyActivity.get('pages').pushObject(decoyPage);
    
    step = Smartgraphs.store.createRecord(Smartgraphs.ActivityStep, {
      url: '/test/test/page1/step1',
      beforeText: "Test step"
    });
    page.get('steps').pushObject(step);
    
    highlight = Smartgraphs.store.createRecord(Smartgraphs.HighlightedPoint, {
      activity: '/test/test'
    });
    
    SC.RunLoop.begin().end();

    equals(activity.get('status'), K.READY_NEW, "The activity record should be READY_NEW to start");
    equals(page.get('activity'), activity, "The page should belong to the activity");
    equals(step.get('activityPage'), page, "The step should belong to the page");
    equals(highlight.get('activity'), activity, "The annotation should belong to the activity");
    equals(activity.getPath('pages.length'), 1, "The activity should have one page");
    equals(page.getPath('steps.length'), 1, "The page should have one step");
    
    ok( decoyPage.get('activity') !== activity, "The decoy page should not belong to the activity");
  },

  teardown: function () {
    teardown.mocks();
  }
});


test("markRecordBusy marks DIRTY records BUSY", function () {
  expect(13);
  var pageKey = page.get('storeKey');
  var highlightKey = highlight.get('storeKey');
  
  SC.RunLoop.begin();
  Smartgraphs.store.writeStatus(pageKey, K.READY_DIRTY);
  Smartgraphs.store.dataHashDidChange(pageKey, null, YES);
  Smartgraphs.store.writeStatus(highlightKey, K.DESTROYED_DIRTY);
  Smartgraphs.store.dataHashDidChange(highlightKey, null, YES);  
  SC.RunLoop.end();
  
  equals( step.get('status'), K.READY_NEW, "Step record should be READY_NEW before test");
  equals( page.get('status'), K.READY_DIRTY, "Page record should be READY_CLEAN before test");
  equals( highlight.get('status'), K.DESTROYED_DIRTY, "Highlight record should be DESTROYED_DIRTY before test");
  
  SC.RunLoop.begin();
  Smartgraphs.dataSource.markRecordBusy(Smartgraphs.store, step);
  Smartgraphs.dataSource.markRecordBusy(Smartgraphs.store, page);
  Smartgraphs.dataSource.markRecordBusy(Smartgraphs.store, highlight);  
  SC.RunLoop.end();
  
  equals( step.get('status'), K.BUSY_CREATING, "Step record should be BUSY_CREATING after markRecordBusy");
  equals( page.get('status'), K.BUSY_COMMITTING, "Page record should be BUSY_COMMITTING after markRecordBusy");
  equals( highlight.get('status'), K.BUSY_DESTROYING, "Highlight record should be BUSY_DESTROYING after markRecordBusy");
});


test("markRecordBusy should marks READY_CLEAN records BUSY", function () {
  expect(11);
  
  var pageKey = page.get('storeKey');
  var highlightKey = highlight.get('storeKey');
  
  SC.RunLoop.begin();
  Smartgraphs.store.writeStatus(pageKey, K.READY_CLEAN);
  Smartgraphs.store.dataHashDidChange(pageKey, null, YES);
  Smartgraphs.store.writeStatus(highlightKey, K.DESTROYED_CLEAN);
  Smartgraphs.store.dataHashDidChange(highlightKey, null, YES);
  SC.RunLoop.end();
  
  equals( page.get('status'), K.READY_CLEAN, "Page record should be READY_CLEAN before test");
  equals( highlight.get('status'), K.DESTROYED_CLEAN, "Highlight record should be DESTROYED_CLEAN before test");
  
  SC.RunLoop.begin();
  Smartgraphs.dataSource.markRecordBusy(Smartgraphs.store, page);
  Smartgraphs.dataSource.markRecordBusy(Smartgraphs.store, highlight);
  SC.RunLoop.end();
  
  equals( page.get('status'), K.BUSY_COMMITTING, "Page record should be BUSY_COMMITTING after markRecordBusy");
  equals( highlight.get('status'), K.DESTROYED_CLEAN, "Highlight record should still be DESTROYED_CLEAN after markRecordBusy");  
});


test("markRecordCommitted should transition BUSY records to CLEAN", function () {
  expect(13);
  var stepKey = step.get('storeKey');
  var pageKey = page.get('storeKey');
  var highlightKey = highlight.get('storeKey');
  
  SC.RunLoop.begin();
  Smartgraphs.store.writeStatus(stepKey, K.BUSY_CREATING);
  Smartgraphs.store.dataHashDidChange(stepKey, null, YES);
  Smartgraphs.store.writeStatus(pageKey, K.BUSY_COMMITTING);
  Smartgraphs.store.dataHashDidChange(pageKey, null, YES);  
  Smartgraphs.store.writeStatus(highlightKey, K.BUSY_DESTROYING);
  Smartgraphs.store.dataHashDidChange(highlightKey, null, YES);  
  SC.RunLoop.end();

  equals( step.get('status'), K.BUSY_CREATING, "Step record should be BUSY_CREATING before test");
  equals( page.get('status'), K.BUSY_COMMITTING, "Page record should be BUSY_COMMITTING before test");
  equals( highlight.get('status'), K.BUSY_DESTROYING, "Highlight record should be BUSY_DESTROYING before test");
  
  SC.RunLoop.begin();
  Smartgraphs.dataSource.markRecordCommitted(Smartgraphs.store, step);
  Smartgraphs.dataSource.markRecordCommitted(Smartgraphs.store, page);
  Smartgraphs.dataSource.markRecordCommitted(Smartgraphs.store, highlight);  
  SC.RunLoop.end();
  
  equals( step.get('status'), K.READY_CLEAN, "Step record should be READY_CLEAN after markRecordCommitted");
  equals( page.get('status'), K.READY_CLEAN, "Page record should be READY_CLEAN after markRecordCommitted");
  equals( highlight.get('status'), K.DESTROYED_CLEAN, "Highlight record should be DESTROYED_CLEAN after markRecordCommitted");
});


test("markRecordCommitted should leave CLEAN records CLEAN", function () {
  expect(13);
  var pageKey = page.get('storeKey');
  var highlightKey = highlight.get('storeKey');
  
  SC.RunLoop.begin();
  Smartgraphs.store.writeStatus(pageKey, K.READY_CLEAN);
  Smartgraphs.store.dataHashDidChange(pageKey, null, YES);  
  Smartgraphs.store.writeStatus(highlightKey, K.DESTROYED_CLEAN);
  Smartgraphs.store.dataHashDidChange(highlightKey, null, YES);  
  SC.RunLoop.end();

  equals( step.get('status'), K.READY_NEW, "Step record should be READY_NEW before test");
  equals( page.get('status'), K.READY_CLEAN, "Page record should be READY_CLEAN before test");
  equals( highlight.get('status'), K.DESTROYED_CLEAN, "Highlight record should be DESTROYED_CLEAN before test");
  
  SC.RunLoop.begin();
  Smartgraphs.dataSource.markRecordCommitted(Smartgraphs.store, step);
  Smartgraphs.dataSource.markRecordCommitted(Smartgraphs.store, page);
  Smartgraphs.dataSource.markRecordCommitted(Smartgraphs.store, highlight);  
  SC.RunLoop.end();
  
  equals( step.get('status'), K.READY_NEW, "Step record should still be READY_NEW after markRecordCommitted");
  equals( page.get('status'), K.READY_CLEAN, "Page record should still be READY_CLEAN after markRecordCommitted");
  equals( highlight.get('status'), K.DESTROYED_CLEAN, "Highlight record should still be DESTROYED_CLEAN after markRecordCommitted");
});


test("applyToChildRecords should apply the supplied method to records listing the target as aggregate", function () {
  expect(16);
  
  var calls = [];
  
  setup.mock(Smartgraphs.dataSource, 'spyMethod', function (store, record) {
    calls.push({ store: store, record: record });
  });
  
  Smartgraphs.dataSource.applyToChildRecords(Smartgraphs.store, activity, Smartgraphs.dataSource.spyMethod);
  
  equals( calls.length, 4, "applyToChildRecords should have called spyMethod three times");
  equals( calls[0].store, Smartgraphs.store, "applyToChildRecords should have passed store");
  equals( calls[0].record, activity, "applyToChildRecords should have been called on activity");
  equals( calls[1].store, Smartgraphs.store, "applyToChildRecords should have passed store");
  equals( calls[1].record, page, "applyToChildRecords should have been called on page");
  equals( calls[2].store, Smartgraphs.store, "applyToChildRecords should have passed store");
  equals( calls[2].record, step, "applyToChildRecords should have been called on step");
  equals( calls[3].store, Smartgraphs.store, "applyToChildRecords should have passed store");
  equals( calls[3].record, highlight, "applyToChildRecords should have been called on highlight annotation record");
});


test("didUpdateRecord marks BUSY activity record CLEAN", function () {
  expect(23);
  var stepKey = step.get('storeKey');
  var pageKey = page.get('storeKey');
  var activityKey = activity.get('storeKey');
  
  setup.mock(Smartgraphs.dataSource, '_ids', {});
  setup.mock(Smartgraphs.dataSource, '_revs', {});
  Smartgraphs.dataSource._ids[activityKey] = 'test.id';
  Smartgraphs.dataSource._revs[activityKey] = '1';
  
  SC.RunLoop.begin();
  var dataset = Smartgraphs.store.createRecord(Smartgraphs.Dataset, {
    url: "test/test/dataset1",
    name: "test dataset",
    points: []
  });
  activity.get('datasets').pushObject(dataset);
  var datasetKey = dataset.get('storeKey');
  SC.RunLoop.end();
  
  SC.RunLoop.begin();
  Smartgraphs.store.writeStatus(activityKey, K.READY_CLEAN);
  Smartgraphs.store.dataHashDidChange(activityKey, null, YES);
  SC.RunLoop.end();
  
  equals( activity.get('status'), K.READY_CLEAN, "Activity records should be READY_CLEAN before adding point");
  equals( dataset.get('status'), K.READY_NEW, "Dataset record should be READY_NEW before adding point");
  equals( dataset.get('activity'), activity, "Dataset record should point to the activity record");
  
  SC.RunLoop.begin();
  var point = Smartgraphs.store.createRecord(Smartgraphs.DataPoint, {
    guid: "p1",
    x: 0,
    y: 0
  });
  dataset.get('points').pushObject(point);
  SC.RunLoop.end();
  
  equals( activity.get('status'), K.READY_DIRTY, "Activity record should be READY_DIRTY after adding point");
  equals( dataset.get('status'), K.READY_NEW, "Dataset record should be READY_NEW after adding point");
  
  SC.RunLoop.begin();
  Smartgraphs.store.writeStatus(stepKey, K.DESTROYED_DIRTY);
  Smartgraphs.store.dataHashDidChange(stepKey, null, YES);  
  Smartgraphs.store.writeStatus(pageKey, K.READY_DIRTY);
  Smartgraphs.store.dataHashDidChange(pageKey, null, YES);
  SC.RunLoop.end();
  
  equals( step.get('status'), K.DESTROYED_DIRTY, "Step record should be DESTROYED_DIRTY before test");
  equals( page.get('status'), K.READY_DIRTY, "Page record should be READY_DIRTY before test");
  
  // mocks required for commitRecord()
  var mockSCRequest = newMockSCRequest();
  setup.mock(SC, 'Request', mockSCRequest);
  
  doRequestCallback = function () {
    // use empty response
    SC.RunLoop.begin();
    Smartgraphs.dataSource[mockSCRequest.methodName].call(mockSCRequest.target, SC.Response.create( { body: { _rev: '2' } }), mockSCRequest.store, mockSCRequest.storeKey);
    SC.RunLoop.end();
  };
  
  mockSCRequest.sendCalled = NO;
  SC.RunLoop.begin();
  activity.commitRecord();
  SC.RunLoop.end();
  
  ok( mockSCRequest.sendCalled, "SC.Request.send() should have been called after commitRecord()");
  equals( activity.get('status'), K.BUSY_COMMITTING, "Activity record should be BUSY_COMMITTING after commitRecord()");
  equals( dataset.get('status'), K.BUSY_CREATING, "Dataset record should be BUSY_CREATING after commitRecord()");
  equals( step.get('status'), K.BUSY_DESTROYING, "Step record should be BUSY_DESTROYING after commitRecord()");
  equals( page.get('status'), K.BUSY_COMMITTING, "Page record should be BUSY_COMMITTING after commitRecord()");
  
  doRequestCallback();
  equals( activity.get('status'), K.READY_CLEAN, "Activity record should be READY_CLEAN after request completes");
  equals( dataset.get('status'), K.READY_CLEAN, "Dataset record should be READY_CLEAN after request completes");  
  equals( step.get('status'), K.DESTROYED_CLEAN, "Step record should be DESTROYED_CLEAN after request completes");
  equals( page.get('status'), K.READY_CLEAN, "Page record should be READY_CLEAN after request completes");
});