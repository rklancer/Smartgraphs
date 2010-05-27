// ==========================================================================
// Project:   Smartgraphs.guidePageController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.ObjectController
*/
Smartgraphs.guidePageController = SC.ObjectController.create(
/** @scope Smartgraphs.guidePageController.prototype */ {

  contentBinding: 'Smartgraphs.guidePageSequenceController.selectedPage',
  
  contentDidChange: function () {
    // utter the first dialog turn if user hasn't been to this page before; 
    // otherwise, leave dialog state at whatever state user saw last time they were on this page
    if (SC.none(this.get('selectedDialogTurn'))) {
      this.set('selectedDialogTurn', this.get('firstDialogTurn'));
    }
  }.observes('content')
  
}) ;
