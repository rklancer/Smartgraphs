// ==========================================================================
// Project:   Smartgraphs.creditsController
// Copyright: ©2011 The Concord Consortoum
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Smartgraphs.creditsController = SC.ObjectController.create(
/** @scope Smartgraphs.creditsController.prototype */ {

  showCredits: function() {
    Smartgraphs.CreditsPane.show();
  }

}) ;
