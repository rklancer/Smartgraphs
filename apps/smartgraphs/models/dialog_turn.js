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
  staticAnnotations: SC.Record.toMany('Smartgraphs.StaticAnnotation'),   
  
  // text to display *after* the question prompt, before the buttons
  afterText: SC.Record.attr(String),      
  
  nextTurnButtonTitle: SC.Record.attr(String),
  
  // the next DialogTurn to go to if the response is 'nominal' -- if the response was correct, or if the response
  // is not to be checked and the "ok" button was hit
  nextTurnForNominalResponse: SC.Record.toOne('Smartgraphs.DialogTurn'),
  
  nextTurnForIncorrectResponse: SC.Record.toOne('Smartgraphs.DialogTurn'),
  
  // if YES, dialog is over when we hit this DialogTurn -- allow user to go to next page
  isLastTurn: SC.Record.attr(Boolean),
  
  // if YES and isLastTurn is YES, immediately go to the next page on reaching this dialog turn.
  // (the text of this dialog turn will be visible if the user hits 'back', however!)
  
  shouldAutoAdvance: SC.Record.attr(Boolean),

  wasVisited: NO,             // transient; is set to YES after we switch to new turn
  // student responses, if any...
  responseArray: null

}) ;
