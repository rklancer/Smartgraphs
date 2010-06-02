// ==========================================================================
// Project:   Smartgraphs.DialogTurn
// Copyright: ©2010 Concord Consortium
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

  // a DialogTurn with a ResponseTemplate but no ResponseVerifier should be considered 'open response'
  responseVerifier: SC.Record.toOne('Smartgraphs.ResponseVerifier'),
  
  // e.g., instructions to highlight portions of the graph. *static* annotations do not require 'play again' buttons.
  staticAnnotationList: SC.Record.toOne('Smartgraphs.StaticAnnotationList'),   
  
  // text to display *after* the question prompt, before the buttons
  afterText: SC.Record.attr(String),      
  

  nextTurnButtonTitle: SC.Record.attr(String),
  
  // the next DialogTurn to go to if the response is 'nominal' -- if the response was correct, or if the response
  // is not to be checked and the "ok" button was hit
  nextTurnForNominalResponse: SC.Record.toOne('Smartgraphs.DialogTurn'),
  
  nextTurnForIncorrectResponse: SC.Record.toOne('Smartgraphs.DialogTurn'),
  
  // if YES, dialog is over when we hit this DialogTurn -- allow user to go to next page
  isLastTurn: SC.Record.attr(Boolean)

}) ;
