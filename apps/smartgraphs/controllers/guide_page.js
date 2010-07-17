// ==========================================================================
// Project:   Smartgraphs.guidePageController
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

/** @class
 (Document Your Controller Here)
 @extends SC.ObjectController
 */
sc_require('models/guide_page');

Smartgraphs.guidePageController = SC.ObjectController.create(
/** @scope Smartgraphs.guidePageController.prototype */
{
  contentBinding: 'Smartgraphs.guidePageSequenceController.selectedPage',
  
  contentDidChange: function() {
    //console.log('Smartgraphs.guidePageController observed content');
    this.invokeOnce(this._setDialogTurn);
  }.observes('content'),
  
  _setDialogTurn: function () {
    console.log('_setDialogTurn');
    // display the first 'line' of dialog if user hasn't been to this page before; 
    // otherwise, leave dialog state at whatever state user saw last time they were on this page

    if (SC.none(this.get('selectedDialogTurn'))) {
      this.set('selectedDialogTurn', this.get('firstDialogTurn'));
    }
  }

});
