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
  
  /** 
    Shows the activity view (i.e., the "live" activity)
  */
  showActivityView: function () {
    this.set('nowShowing', 'Smartgraphs.activityPage.activityView');
  },
  
  /**
   * shows the generic loading view, with a custom message for activity loading
   */
  showActivityLoadingView: function () {
    this.set('nowShowing', 'Smartgraphs.mainPage.loadingView');
    this.set('loadingMessage', Smartgraphs.activityPage.getPath('activityView.loadingMessage'));
  },
  
  /**
   * shows the particular error view associated with a activity-loading error
   */
  showErrorLoadingActivityView: function () {
    this.set('nowShowing', 'Smartgraphs.activityPage.errorLoadingActivityView');
  },
  
  
  /**
    Shows the author's view
  */
  showAuthorView: function () {
    this.set('nowShowing', 'Smartgraphs.authorPage.authorView');
  }
  
}) ;
