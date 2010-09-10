// ==========================================================================
// Project:   Smartgraphs.TriggerResponse
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  Every ActivityStep can define a set of TriggerResponse 'blocks'. These define what happens when verious events 
  occur, such as:
   * the beginning of a activity step
   * receiving a correct learner response
   * some graph property reaching a critical threshold
   * etc.
   
  ActivitySteps can define 'triggers' which configure various Observer classes defined in triggers/<trigger_name>.js
  in order to receive notification when a particular property meets some threshold value.
  
  Alternatively, various Activity commands (e.g., 'fireTrigger') can be used to trigger events which then run code.

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.TriggerResponse = SC.Record.extend(
/** @scope Smartgraphs.TriggerResponse.prototype */ {
  
  url: SC.Record.attr(String),
  primaryKey: 'url',
  
  /**
    The Trigger to register for this particular ActivityStep
  */
  trigger: SC.Record.toOne('Smartgraphs.Trigger'),
  
  /**
    The ActivityStep registering this TriggerResponse.
  */
  step: SC.Record.toOne('Smartgraphs.ActivityStep', { inverse: 'triggerResponses', isMaster: YES }),
  
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
