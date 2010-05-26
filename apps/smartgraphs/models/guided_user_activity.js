// ==========================================================================
// Project:   Smartgraphs.GuidedUserActivity
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.GuidedUserActivity = SC.Record.extend(
/** @scope Smartgraphs.GuidedUserActivity.prototype */ {

  pages: SC.Record.toMany('Smartgraphs.GuidePage', {
    inverse: 'activity'
  })
}) ;
