// ==========================================================================
// Project:   Smartgraphs.DialogTurn
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.DialogTurn = SC.Record.extend(
/** @scope Smartgraphs.DialogTurn.prototype */ {

  dialog: SC.Record.toOne('Smartgraphs.Dialog', {
    inverse: 'steps'
  }),
  
  beforeText: SC.Record.attr(String),
  
  responseTemplate: SC.Record.toOne('Smartgraphs.ResponseTemplate'),

  correctResponse: SC.Record.toOne('Smartgraphs.CorrectAnswer'),
  
  staticAnnotationList: SC.Record.toOne('Smartgraphs.StaticAnnotationList'),
  
  afterText: SC.Record.attr(String),
  
  nextTurn: SC.Record.toOne('Smartgraphs.DialogTurn')

}) ;
