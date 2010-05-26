// ==========================================================================
// Project:   Smartgraphs.DialogStep
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.DialogStep = SC.Record.extend(
/** @scope Smartgraphs.DialogStep.prototype */ {

  dialog: SC.Record.toOne('Smartgraphs.Dialog', {
    inverse: 'steps'
  }),
  
  index: SC.Record.attr(Number),
  
  beforeText: SC.Record.attr(String),
  
  responseTemplate: SC.Record.toOne('Smartgraphs.ResponseTemplate'),
  
  staticAnnotationList: SC.Record.toOne('Smartgraphs.StaticAnnotationList'),
  
  afterText: SC.Record.attr(String)

}) ;
