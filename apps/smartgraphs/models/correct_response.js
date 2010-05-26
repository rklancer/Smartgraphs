// ==========================================================================
// Project:   Smartgraphs.CorrectResponse
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.CorrectResponse = SC.Record.extend(
/** @scope Smartgraphs.CorrectResponse.prototype */ {

  // this model is separate from responseTemplate to allow for some polymorphism 
  // (i.e, eventually it might not just have a single, String, 'value' parameter) 
  responseTemplate: SC.Record.toOne('Smartgraphs.ResponseTemplate', {
    inverse: 'correctResponse'
  }),
  
  value: SC.Record.attr(String)

}) ;
