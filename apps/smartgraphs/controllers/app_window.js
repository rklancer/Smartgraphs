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
  
  showActivityView: function () {
    this.set('nowShowing', 'Smartgraphs.activityPage.activityView');
  },
  
  showActivityLoadingView: function () {
    // show the generic loading view, with a custom message for activity loading
    this.set('nowShowing', 'Smartgraphs.mainPage.loadingView');
    this.set('loadingMessage', Smartgraphs.activityPage.getPath('activityView.loadingMessage'));
  },
  
  showActivityLoadingErrorView: function () {
    // show the particular error view associated with a activity-loading error
    this.set('nowShowing', 'Smartgraphs.activityPage.errorLoadingActivityView');
  }

}) ;
