// ==========================================================================
// Project:   Smartgraphs.Dialog
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.Dialog = SC.Record.extend(
/** @scope Smartgraphs.Dialog.prototype */ {

  steps: SC.Record.toMany('Smartgraphs.DialogTurn', {
    inverse: 'dialog'
  })

}) ;
