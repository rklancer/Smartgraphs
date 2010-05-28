// ==========================================================================
// Project:   Smartgraphs.GuidePageSequence
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.GuidePageSequence = SC.Record.extend(
/** @scope Smartgraphs.GuidePageSequence.prototype */ {

  pages: SC.Record.toMany('Smartgraphs.GuidePage', {
    inverse: 'activity',
    orderBy: ['index']
  })
}) ;
