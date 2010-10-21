// ==========================================================================
// Project:   Smartgraphs
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================

/** Handy helpers to generate the mockResponse definitions for a given record type */

/*globals SC Smartgraphs */

Smartgraphs.mockResponsesForRecordType = function (recordType) {
  
  var keys = Smartgraphs.store.find(recordType).getEach('storeKey'); 
  var hash, strings = [];
  
  for (var i = 0, ii = keys.get('length'); i < ii; i++) {
    hash = Smartgraphs.store.readDataHash(keys[i]);
    strings.push('Smartgraphs.mockResponses["');
    strings.push(hash.url);
    strings.push('"] = \n');
    strings.push(SC.json.encode(hash));
    strings.push(';\n\n');
  }
  
  return strings.join('');
};

Smartgraphs.mockResponseForRecordArray = function (recordArray, url) {
  var keys = recordArray.getEach('storeKey'); 
  var hash, retArr = [];
  
  for (var i = 0, ii = keys.get('length'); i < ii; i++) {
    hash = Smartgraphs.store.readDataHash(keys[i]);
    retArr.push(hash);
  }
  
  return 'Smartgraphs.mockResponses["' + url + '"] = \n' + SC.json.encode(retArr) + ';\n\n';
};


/** specific helpers for augmenting data models */

Smartgraphs.generateStepListMockResponses = function () {
  var pages = Smartgraphs.activityController.get('pages');
  var page, listUrl, steps, strings = [];
  
  for (var i = 0, ii = pages.get('length'); i<ii; i++) {
    page = pages.objectAt(i);
    listUrl = page.get('stepListUrl');
    steps = page.get('steps');
    strings.push(Smartgraphs.mockResponseForRecordArray(steps, listUrl));
  }
  
  return strings.join('');
};


Smartgraphs.addStepListUrlsToPages = function () {
  var pages = Smartgraphs.activityController.get('pages');
  var page;
  
  for (var i = 0, ii = pages.get('length'); i<ii; i++) {
    page = pages.objectAt(i);
    page.set('stepListUrl', page.get('url')+'/steps');
  }
};


Smartgraphs.addListUrlsToSteps = function () {
  Smartgraphs.loadSteps();

  var step, steps = Smartgraphs.store.find(Smartgraphs.ActivityStep);
  
  for (var i = 0, ii = steps.get('length'); i < ii; i++) {
    step = steps.objectAt(i);
    console.log('setting triggerResponseListUrl and commandListUrl for step %s', step.get('id'));
    step.set('triggerResponseListUrl', step.get('url')+'/trigger_responses');
    step.set('commandListUrl', step.get('url')+'/commands');
  }
};


Smartgraphs.loadSteps = function () {
  var page, pages = Smartgraphs.activityController.get('pages');

  for (var i = 0, ii = pages.get('length'); i<ii; i++) {
    page = pages.objectAt(i);
    Smartgraphs.store.loadRecords(Smartgraphs.ActivityStep, Smartgraphs.mockResponses[page.get('url')+'/steps']);
    console.log('loaded steps for %s', page.get('url'));
  }
};

  
Smartgraphs.generateCommandInvocationMockResponses = function () {
  Smartgraphs.loadSteps();
  
  var step, steps = Smartgraphs.store.find(Smartgraphs.ActivityStep);
  var commands;
  var strings = [];
  var listUrl;
  
  for (var i = 0, ii = steps.get('length'); i < ii; i++) {
    step = steps.objectAt(i);
    listUrl = step.get('commandListUrl');
    commands = Smartgraphs.store.find(step.get('commandsQuery'));
    
    strings.push(Smartgraphs.mockResponseForRecordArray(commands, listUrl));
  }
  
  return strings.join('');
};

Smartgraphs.generateTriggerResponseMockResponses = function () {
  Smartgraphs.loadSteps();
  
  var step, steps = Smartgraphs.store.find(Smartgraphs.ActivityStep);
  var triggerResponses;
  var strings = [];
  var listUrl;
  
  for (var i = 0, ii = steps.get('length'); i < ii; i++) {
    step = steps.objectAt(i);
    listUrl = step.get('triggerResponseListUrl');
    triggerResponses = Smartgraphs.store.find(step.get('triggerResponsesQuery'));
    
    strings.push(Smartgraphs.mockResponseForRecordArray(triggerResponses, listUrl));
  }
  
  return strings.join('');
};


Smartgraphs.hashesForRecordArray = function (recordArray) {
  var keys = recordArray.getEach('storeKey'); 
  var hash, ret = [];
  
  for (var i = 0, ii = keys.get('length'); i < ii; i++) {
    hash = Smartgraphs.store.readDataHash(keys[i]);
    ret.push(hash);
  }
  
  return ret;
};


Smartgraphs.hashForRecord = function (record) {
  return Smartgraphs.store.readDataHash(record.get('storeKey'));
};

// find all records with 'activityId' as the prefix of their url
// and return an array containing the hashes of each such record.

Smartgraphs.hashesForTypeAndActivity = function (recordType, activityId) {
  var ret = [];
  var recs = Smartgraphs.store.find(recordType);
  
  recs.forEach( function (record) {
    if (record.get('url').indexOf(activityId) === 0) {
      console.log('adding record: %s', record.get('url'));      
      ret.push(Smartgraphs.hashForRecord(record));       
    }
  });
  
  return ret;  
};


// generate JSON representation of all data for activity 'activityId'
// suitable for storing in CouchDB and loading in a single request

// Smartgraphs.generateJsonForActivity("/backend/activity/1") ==> (a json string)

Smartgraphs.generateJsonForActivity = function (activityId) {
  var ret = {};
  var activity = Smartgraphs.store.find(Smartgraphs.Activity, activityId);
  
  // Add the activity to the return value...
  var hash = Smartgraphs.hashForRecord(activity);
  ret.activity = hash;
  
  // add the pages...
  var pages = activity.get('pages');
  ret.pages = Smartgraphs.hashesForRecordArray(pages);
  
  // add the steps
  var steps;
  ret.steps = [];
  ret.responseTemplates = [];
  var templateHasBeenSeen = {};
  
  pages.forEach(function (page) {
    var tmp = Smartgraphs.store.find(page.get('stepsQuery'));
    steps = page.get('steps');
    ret.steps = ret.steps.concat(Smartgraphs.hashesForRecordArray(steps));
    
    // add the response templates referenced by this step
    steps.forEach(function (step) {
      var template = step.get('responseTemplate');   
      if (!template || templateHasBeenSeen[ template.get('id') ]) return;

      console.log('adding response template %s', template.get('id'));      
      ret.responseTemplates.push(Smartgraphs.hashForRecord(template));
      templateHasBeenSeen[ template.get('id') ] = YES;
    });
  });
  
  
  // get all the DataSeries (soon to be renamed 'DataSet') records associated with this activity
  ret.datasets = [];
  ret.datapoints = [];
  
  var datasets = Smartgraphs.store.find(Smartgraphs.DataSeries);
  
  datasets.forEach(function (dataset) {
    if (dataset.get('url').indexOf(activityId) === 0) {
      console.log('adding dataset: %s', dataset.get('url'));
      ret.datasets.push(Smartgraphs.hashForRecord(dataset));
    
      // get all the dataPoints referenced by this dataset
      dataset.get('points').forEach( function (point) {
         ret.datapoints.push(Smartgraphs.hashForRecord(point));
      });
    }
  });

  // get all graphs associated with the activity -- they should have an 'activity' parameter
  var graphsQuery = SC.Query.create({
    recordType: Smartgraphs.Graph,
    conditions: 'activity = {activity}',
    parameters: { activity: activity }
  });
  var graphs = Smartgraphs.store.find(graphsQuery);
  
  ret.graphs = [];
  var axesHaveBeenSeen = {};
  
  ret.axes = [];
  graphs.forEach(function (graph) {
    ret.graphs.push(Smartgraphs.hashForRecord(graph));
    
    // get the axes object referenced by the graph, too
    var axes = graph.get('axes');
    var axesId = axes.get('id');
    
    if ( axesHaveBeenSeen[axesId] ) return;
    
    ret.axes.push(Smartgraphs.hashForRecord(axes));
    console.log('adding axes %s', axesId);
    axesHaveBeenSeen[axesId] = YES;
  });
  
  // add the annotations ... need to use url prefix to know what activity they're associated with
  ret.freehandSketches = Smartgraphs.hashesForTypeAndActivity(Smartgraphs.FreehandSketch, activityId);
  ret.highlightedPoints = Smartgraphs.hashesForTypeAndActivity(Smartgraphs.HighlightedPoint, activityId);
  ret.highlightedSegments = Smartgraphs.hashesForTypeAndActivity(Smartgraphs.HighlightedSegment, activityId);
  ret.linesToAxis = Smartgraphs.hashesForTypeAndActivity(Smartgraphs.LineToAxis, activityId);
    
  // the return value is actually a json-encoded version of 'ret'
  console.log(SC.json.encode(ret));
};
