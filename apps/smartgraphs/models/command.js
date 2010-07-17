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
  
  The command to be executed is specified by a class string and a JSON string of arguments to the command. (The
  arguments may reference context variables specified by the author.)
  
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

  // TODO: Add your own code here.

}) ;
