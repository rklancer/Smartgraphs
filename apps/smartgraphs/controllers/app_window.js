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
  loadingMessage: null,
  
  showGuideView: function () {
    this.set('nowShowing', 'Smartgraphs.guidePage.guideView');
  },
  
  showGuideLoadingView: function () {
    // show the generic loading view, with a custom message for guide loading
    this.set('nowShowing', 'Smartgraphs.mainPage.loadingView');
    this.set('loadingMessage', Smartgraphs.guidePage.getPath('guideView.loadingMessage'));
  },
  
  showGuideLoadingErrorView: function () {
    // show the particular error view associated with a guide-loading error
    this.set('nowShowing', 'Smartgraphs.guidePage.errorLoadingGuideView');
  }

}) ;
