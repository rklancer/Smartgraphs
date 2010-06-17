// ==========================================================================
// Project:   Smartgraphs.authoringController
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

/** @class
 Controls authoring mode and business logic
 @extends SC.Object
 */
sc_require('models/dialog_turn');
sc_require('models/guide_page');

Smartgraphs.authoringController = SC.ObjectController.create(
/** @scope Smartgraphs.authoringController.prototype */
{
  isAuthoring: NO,
  
  toggleAuthoring: function(){
    this.set('isAuthoring', !this.get('isAuthoring'));
  }
  
});
