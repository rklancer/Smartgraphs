// ==========================================================================
// Project:   Smartgraphs.Trigger
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.Trigger = SC.Record.extend(
/** @scope Smartgraphs.Trigger.prototype */ {

  /**
    The name of the event produced by this trigger. Also the name of the trigger object that implements the trigger.
  */
  name: SC.Record.attr(String),
  
  /**
    A description of this trigger for authors.
  */
  description: SC.Record.attr(String),

  /** 
    A hash of default arguments to the register method of this trigger. May be overwritten in particular 
    TriggerInstance records
  */
  args: SC.Record.attr(Object)
    
}) ;
