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

  activity: SC.Record.toOne('Smartgraphs.GuidePageSequence', {
    inverse: 'pages'   // gPages?
  }),
  
  text: SC.Record.attr('String'),

  firstDialogTurn: SC.Record.toOne('Smartgraphs.DialogTurn'),

  index: SC.Record.attr(Number),
  //nextStep: SC.Record.toOne('Smartgraphs.GuidePage')
  
  // transient properties not saved to db  
  currentDialogTurn: null
}) ;
