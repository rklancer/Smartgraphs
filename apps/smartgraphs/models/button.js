// ==========================================================================
// Project:   Smartgraphs.Button
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  Describes an instance of a button that the user can click during a guide step. Includes the commands to be executed
  on click.

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.Button = SC.Record.extend(
/** @scope Smartgraphs.Button.prototype */ {

  /**
    The name of this button
  */
  name: SC.Record.attr(String),
  
  /**
    The title users see when they click on this button
  */
  title: SC.Record.attr(String),

  /**
    A free-form description of this button and the purpose of this button. For use by authors.
  */
  description: SC.Record.attr(String),
  
  /**
    Width of this button in pixels
  */
  width: SC.Record.attr(Number),

  /**
    When this property is YES, the button will only be enabled in the GUIDE_SUBMIT state (i.e., when some inspector
    or other command has instructed the system that a response is ready.)
  */
  isSubmitButton: SC.Record.attr(Boolean)

}) ;
