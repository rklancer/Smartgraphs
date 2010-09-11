// ==========================================================================
// Project:   Smartgraphs
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @namespace

  Smaht Graphs. Wicked Smaht Graphs!
  
  @extends SC.Object
*/
Smartgraphs = SC.Application.create(
  /** @scope Smartgraphs.prototype */ {

  NAMESPACE: 'Smartgraphs',
  VERSION: '0.1.0',
  
  // Add global constants or singleton objects here
  triggers: [],

  _nextGuid: 1,
  getNextGuid: function () {
    return this._nextGuid++;
  },
  
  // DEBUG SETTINGS
  trace: YES,                    // whether to trace firstResponder changes and app actions
  useMockResponses: YES,        // whether the data source should use mock responses or real XHR        
  logDataSource: NO             // whether the data source should log   
  
}) ;
