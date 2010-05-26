// ==========================================================================
// Project:   Smartgraphs.GuidePage
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.GuidePage = SC.Record.extend(
/** @scope Smartgraphs.GuidePage.prototype */ {

  activity: SC.Record.toOne('Smartgraphs.GuidedUserActivity', {
    inverse: 'pages'
  }),
  
  text: SC.Record.attr('String'),
  
  dialog: SC.Record.toOne('Smartgraphs.Dialog')
  
}) ;
