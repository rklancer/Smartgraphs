// ==========================================================================
// Project:   Smartgraphs.ResponseTemplate
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  Specifies a string interspersed with text fields or other input types, to be displayed in a 'form-like' manner
  in a given GuideStep.
  
  This allows learners or authors to respond to questions.

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.ResponseTemplate = SC.Record.extend(
/** @scope Smartgraphs.ResponseTemplate.prototype */ {

  templateString: SC.Record.attr(String),
  fieldTypes: SC.Record.attr(Array),
  fieldChoiceLists: SC.Record.attr(Array),            // for multiple choice
  intialValues: SC.Record.attr(Array),
  
  // cache the actual values entered
  values: []

}) ;
