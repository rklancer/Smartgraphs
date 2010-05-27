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

  // text to diplay *before* the question prompt
  beforeText: SC.Record.attr(String),                                           
  
  responseTemplate: SC.Record.toOne('Smartgraphs.ResponseTemplate'),

  correctResponse: SC.Record.toOne('Smartgraphs.CorrectResponse'),              // is 'open response' if null
  
  // e.g., instructions to highlight portions of the graph. *static* annotations do not require 'play again' buttons.
  staticAnnotationList: SC.Record.toOne('Smartgraphs.StaticAnnotationList'),   
  
  // text
  afterText: SC.Record.attr(String),      
  
  nextTurnAfterCorrectResponse: SC.Record.toOne('Smartgraphs.DialogTurn'),
  
  nextTurnAfterIncorrectReponse: SC.Record.toOne('Smartgraphs.DialogTurn')

}) ;
