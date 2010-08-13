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
  var page, listUrl, steps, strings = [];
  
  for (var i = 0, ii = pages.get('length'); i<ii; i++) {
    page = pages.objectAt(i);
    page.set('stepListUrl', page.get('url')+'/steps');
  }
};

  
  
  