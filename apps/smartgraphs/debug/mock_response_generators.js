// ==========================================================================
// Project:   Smartgraphs
// Copyright: ©2010 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
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
