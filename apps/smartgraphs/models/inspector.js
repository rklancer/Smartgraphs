// ==========================================================================
// Project:   Smartgraphs.Inspector
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  An Inspector inspects the state of the system as needed in order to help a guide respond to the state of the system,
  
  For example, an Inspector could determine whether the data in the most recently created data series contains
  10 seconds' worth of data that is linear to within +/- 10%. This reduces data to a boolean value that could be
  input to a Command which shows a "help" GuideStep if the data is not linear. (Remember that this indirection is
  needed because we are exposing these capabilities to authors who are not expected to write Javascript, and are not
  likely even to create Commands--a templating tool will often create the needed commands for them)
  
  Similarly, an Inspector could be used to determine the value of the second text field in a given ResponseTemplate,
  for use by a command that adds a caption to the learner's lab book.

  Like Commands, Inspector records are inherently polymorphic. New Inspector capabilities are created by adding 
  classes to the inspectors/ directory. Inspector records consist of the class name of the inspector and a JSON
  string of arguments, which may reference the context variables set up by the author in the GuidePage.

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.Inspector = SC.Record.extend(
/** @scope Smartgraphs.Inspector.prototype */ {

  // TODO: Add your own code here.

}) ;
