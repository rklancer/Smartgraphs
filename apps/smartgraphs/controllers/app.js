// ==========================================================================
// Project:   Smartgraphs.appController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Smartgraphs.appController = SC.ObjectController.create(
/** @scope Smartgraphs.appController.prototype */ {

  nowShowing: null,
  
  openGuideView: function () {
    this.set('nowShowing', 'Smartgraphs.guidePage.guideView');
  }

}) ;
