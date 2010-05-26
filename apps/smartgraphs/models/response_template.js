// ==========================================================================
// Project:   Smartgraphs.ResponseTemplate
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.ResponseTemplate = SC.Record.extend(
/** @scope Smartgraphs.ResponseTemplate.prototype */ {
  
  type: SC.Record.attr(String),
  
  templateString: SC.Record.attr(String),
  
  correctResponse: SC.Record.toOne('Smartgraphs.CorrectResponse', {
    inverse: 'responseTemplate'
  })

}) ;
