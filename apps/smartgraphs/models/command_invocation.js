// ==========================================================================
// Project:   Smartgraphs.CommandInvocation
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.CommandInvocation = SC.Record.extend(
/** @scope Smartgraphs.CommandInvocation.prototype */ {

  url: SC.Record.attr(String),
  primaryKey: 'url',

  /**
    The order of this invocation, relative to the other CommandInvocations with the same 'owner'
  */
  index: SC.Record.attr(Number),

  /**
    The name of the action to call via Smartgraphs.sendAction()
  */
  actionName: SC.Record.attr(String),

  /**
    Argument keys and values that will be passed as-is to the action.
  */
  literalArgs: SC.Record.attr(Object),
  
  /**
    Argument keys and values of arguments that will be substituted before being passed to the action.
    Any keys in this hash override keys with the same name in the literalArgs hash
  */
  substitutedArgs: SC.Record.attr(Object)
  
}) ;
