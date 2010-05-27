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
  
  introText: SC.Record.attr('String'),

  firstDialogTurn: SC.Record.toOne('Smartgraphs.DialogTurn'),

  index: SC.Record.attr(Number),
  //nextStep: SC.Record.toOne('Smartgraphs.GuidePage')
  
  // *** transient properties not saved to db
  
  // keep track of the dialog turn user last saw on the current page
  selectedDialogTurn: null,

  // the 'isSelectable' property is set to YES for:
  //   * the *first* page
  //   * the *next* page once the current dialog has marked the page finished
  //   * any page you've previously visited
  
  isSelectable: NO
}) ;
