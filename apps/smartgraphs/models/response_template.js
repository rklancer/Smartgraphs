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

Smartgraphs.TEXT_RESPONSE = 'text';
Smartgraphs.GRAPH_ANNOTATION_RESPONSE = 'annotation';

// consider:
// Smartgraphs.ResponseType = SC.Record.extend({
//   name: SC.Record.attr(String)      // each ResponseTemplate could link to a ResponseType record
// });


Smartgraphs.ResponseTemplate = SC.Record.extend(
/** @scope Smartgraphs.ResponseTemplate.prototype */ {
  
  // use this to determine what type of input to accept (and what input fields to display or not display)
  type: SC.Record.attr(String),             
  
  // could be parsed to generate input fields. (Not using this yet.)
  templateString: SC.Record.attr(String)

}) ;
