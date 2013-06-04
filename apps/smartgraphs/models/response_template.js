// ==========================================================================
// Project:   Smartgraphs.ResponseTemplate
// Copyright: ©2010 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  Specifies a string interspersed with text fields or other input types, to be displayed in a 'form-like' manner
  in a given ActivityStep.

  This allows learners or authors to respond to questions.

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.ResponseTemplate = SC.Record.extend(
/** @scope Smartgraphs.ResponseTemplate.prototype */ {

  url: SC.Record.attr(String),
  primaryKey: 'url',

  /**
    The Activity this ResponseTemplate belongs to.
  */
  activity: SC.Record.toOne('Smartgraphs.Activity',  { inverse: 'pages', isMaster: YES, aggregate: YES }),

  templateString: SC.Record.attr(String),
  fieldTypes: SC.Record.attr(Array),
  fieldChoicesList: SC.Record.attr(Array),            // for multiple choice
  intialValues: SC.Record.attr(Array),

  // cache the actual values entered
  values: []

}) ;
