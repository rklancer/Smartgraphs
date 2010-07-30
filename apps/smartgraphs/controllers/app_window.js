// ==========================================================================
// Project:   Smartgraphs.appWindowController
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  The appWindow controller controls what high-level views are visible on the main screen.

  @extends SC.Object
*/
Smartgraphs.appWindowController = SC.ObjectController.create(
/** @scope Smartgraphs.appWindowController.prototype */ {

  nowShowing: null,
  
  showGuideView: function () {
    this.set('nowShowing', 'Smartgraphs.guidePage.guideView');
  },
  
  showGuideLoadingIndicator: function () {
    //TODO
  }

}) ;
