// ==========================================================================
// Project:   Smartgraphs.ResponseTemplate
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/

Smartgraphs.ResponseTemplate = SC.Record.extend(
/** @scope Smartgraphs.ResponseTemplate.prototype */ {
  
  // for future use:
  //
  // A templated string that could be parsed to generate input fields in which the user can enter his/her response.
  // It should include the minimal prompt text necessary to describe the expected response to the user (so that the 
  // same template can be reused by successive DialogTurns that offer grammatically and semantically different hints).
  //
  // e.g., 'Maria ran {number} {minutes|meters|miles per hour}"  

  templateString: SC.Record.attr(String)
  
}) ;
