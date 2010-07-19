// ==========================================================================
// Project:   Smartgraphs.Command
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  A command to be executed at the beginning of a guide step, or after the user presses a button during a guide step.
  
  Authors need to be able to specify fairly arbitrary actions to take place when learners complete particular steps, 
  and these actions may vary based on the learner response, or may take elements of the users' response as
  'parameters'. (
  
  The command to be executed is specified by a class string and a hash of arguments to that command. (The
  hash is split into two; one for literal argument values, and ones for values substituted from the Guide context.)
  
  Note that we expect that we don't expect to expose commands to authors except in some kind of 'expert mode'.
  Most commands will be too 'low level' and require too much computational-mindedness for naive authors. Therefore,
  think of commands as "machine code". Authors will be provided with templates that create stereotyped guide steps
  without requiring the author to construct lists of commands; and *author* guides will help authors build 
  more-complicated parts of a learner guide.

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.Command = SC.Record.extend(
/** @scope Smartgraphs.Command.prototype */ {

  /**
   name of this command (to be shown to authors)
  */
  name: SC.Record.attr(String),

  /**
    a longer description of this command for authors
  */
  description: SC.Record.attr(String),

  /** 
    the app-level action to be performed (via Smartgraphs.sendAction())
  */
  actionName: SC.Record.attr(String),

  // these hashes define default arguments that will be passed to the action 'actionName' 
  // (the values provided in this record can be overridden in a given CommandInvocation)
  // (that authoring templates might define several commands with the same actionName but different defaultArgs)

  /**
    Argument keys and values that will be passed as-is to the action. Values set here represent defaults that can
    be overridden in particular CommandInvocations.
  */
  literalArgs: SC.Record.attr(Object),
  
  /**
    Argument keys and values of arguments that will be substituted before being passed to the action. Values set here
    represent defaults that can be overridden in particular CommandInvocations.
  */
  substitutedArgs: SC.Record.attr(Object)

}) ;
