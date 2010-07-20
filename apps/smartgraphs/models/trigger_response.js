// ==========================================================================
// Project:   Smartgraphs.TriggerResponse
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  Every GuideStep can define a set of TriggerResponse 'blocks'. These define what happens when verious events 
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
Smartgraphs.TriggerResponse = SC.Record.extend(
/** @scope Smartgraphs.TriggerResponse.prototype */ {
  
  /**
    The Trigger to register for this particular GuideStep
  */
  trigger: SC.Record.toOne('Smartgraphs.Trigger'),
  
  /**
    The GuideStep registering this TriggerResponse.
  */
  step: SC.Record.toOne('Smartgraphs.GuideStep', { inverse: 'triggerResponses' }),
  
  /**
    A hash of arguments to be passed when registering this trigger. Each key overrides any key of the same name
    set in the 'args' property of the Trigger record.
  */
  args: SC.Record.attr(Object),
  
  /**
    The commands to be executed when the trigger fires, ordered by theiir 'index' property.
  */
  commands: SC.Record.toMany('Smartgraphs.CommandInvocation', { inverse: 'triggerResponse', orderBy: 'index' })
  
}) ;
