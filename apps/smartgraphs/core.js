// ==========================================================================
// Project:   Smartgraphs
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @namespace

  Smaht Graphs. Wicked Smaht Graphs!
  
  @extends SC.Application
*/
Smartgraphs = SC.Application.create(
  /** @scope Smartgraphs.prototype */ {

  NAMESPACE: 'Smartgraphs',
  VERSION: '0.1.0',
  
  // Only attempt to read data from JSON documents with doc.data_format_version that matches the version below
  DATA_FORMAT_VERSION: 2,
  
  // Add global constants or singleton objects here
  triggers: [],

  _nextGuid: 1000,
  getNextGuid: function () {
    return this._nextGuid++;
  },
  
  // DEBUG SETTINGS
  trace: YES,                   // whether to trace firstResponder changes and app actions
  //useMockResponses: YES,      // whether the data source should use mock responses or real XHR        
  logDataSource: YES,           // whether the data source should log
  showOutline: YES              // whether to show the outline on the left by default
  
}) ;

SC.CONTEXT_MENU_ENABLED = YES;
