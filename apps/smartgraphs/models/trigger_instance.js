// ==========================================================================
// Project:   Smartgraphs.TriggerInstance
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.TriggerInstance = SC.Record.extend(
/** @scope Smartgraphs.TriggerInstance.prototype */ {

  /**
    The Trigger to register for this particular GuideStep
  */
  trigger: SC.Record.toOne('Smartgraphs.Trigger'),
  
  /**
    The GuideStep registering this Trigger
  */
  step: SC.Record.toOne('Smartgraphs.GuideStep'),
  
  /**
    A hash of arguments to be passed when registering this trigger. Each key overrides any key of the same name
    set in the 'args' property of the Trigger record.
  */
  args: SC.Record.attr(Object)

}) ;
