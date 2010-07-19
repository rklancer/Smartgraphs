// ==========================================================================
// Project:   Smartgraphs.EventResponse
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  Every GuideStep can define a set of EventResponse 'blocks'. These define what happens when verious events 
  occur, such as:
   * the beginning of a guide step
   * receiving a correct learner response
   * some graph property reaching a critical threshold
   * etc.
   
  GuideSteps can define 'triggers' which configure various Observer classes defined in triggers/<trigger_name>.js
  in order to receive notification when a particular property meets some threshold value.
  
  Alternatively, various Guide commands (sendGuideEvent, compareAndSendEvent?) can be used to trigger events which 
  run code. (For example, the standard template for a 'check answer' type scenario would define event responses
  that listen for the 'check answer' button to be clicked, then would run an inspector method to check the answer,
  and then would compareAndSendEvent to either send 'correctAnswerReceived' or 'incorrectAnswerReceived') 

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.EventResponse = SC.Record.extend(
/** @scope Smartgraphs.EventResponse.prototype */ {

  step: SC.Record.toOne('Smartgraphs.GuideStep', { inverse: 'eventResponses' }),
  
  eventName: SC.Record.attr(String),
  
  commands: SC.Record.toMany('Smartgraphs.CommandInvocation', { inverse: 'eventResponse' })
  
}) ;
