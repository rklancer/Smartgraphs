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


  