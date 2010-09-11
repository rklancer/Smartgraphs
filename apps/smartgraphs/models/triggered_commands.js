// ==========================================================================
// Project:   Smartgraphs.TriggeredCommands
// Copyright: ©2010 Concord Consortium
// @author:   Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.TriggeredCommands = SC.Record.extend(
/** @scope Smartgraphs.TriggeredCommands.prototype */ {

  /**
    a hash that contains:
      the class name of the Inspector that checks system state for changes
      a config hash to be passed to the inspector when created
  */
  systemInspector: SC.Record.attr(Object),
  
  /**
    JSON expression tree to be used to convert the Inspector's output to a YES or NO answer.
  */
  triggerCriterion: SC.Record.attr(Object),
  
  /**
    series of commands to run when the triggerCriterion switches from NO to YES
  */
  onCommands: SC.Record.toMany('Smartgraphs.CommandInvocation', { orderBy: 'index' }),
  
  /**
    series of commands to run when the triggerCriterion switches from YES to NO
  */
  offCommands: SC.Record.toMany('Smartgraphs.CommandInvocation', { orderBy: 'index' })

}) ;
