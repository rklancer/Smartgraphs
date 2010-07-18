// ==========================================================================
// Project:   Smartgraphs.appWindowController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Smartgraphs.appWindowController = SC.ObjectController.create(
/** @scope Smartgraphs.appWindowController.prototype */ {

  nowShowing: null,
  
  showGuideView: function () {
    this.set('nowShowing', 'Smartgraphs.guidePage.guideView');
  }

}) ;
