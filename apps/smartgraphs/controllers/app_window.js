// ==========================================================================
// Project:   Smartgraphs.appWindowController
// Copyright: ©2010 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  The app-window controller controls what high-level views are visible on the main screen.

  @extends SC.Object
*/
Smartgraphs.appWindowController = SC.Object.create(
/** @scope Smartgraphs.appWindowController.prototype */ {

  viewToShow: null,
  loadingMessage: null,
  shouldShowOutline: Smartgraphs.showOutline,
  shouldShowOutlineBindingDefault: SC.Binding.oneWay(),
  
  /** 
    Shows the activity view (i.e., the "live" activity) in the main window.
  */
  showActivityView: function () {
    this.set('viewToShow', 'Smartgraphs.activityPage.activityView');
  },
  
  /**
     shows the generic loading view, with a custom message for activity loading.
  */
  showActivityLoadingView: function () {
    this.set('viewToShow', 'Smartgraphs.mainPage.loadingView');
    this.set('loadingMessage', Smartgraphs.activityPage.getPath('activityView.loadingMessage'));
  },
  
  /**
    Shows the particular error view associated with an activity-loading error.
  */
  showErrorLoadingActivityView: function () {
    this.set('viewToShow', 'Smartgraphs.activityPage.errorLoadingActivityView');
  },
  
  /**
    Shows the author's view in the main window.
  */
  showAuthorView: function () {
    this.set('viewToShow', 'Smartgraphs.authorPage.authorView');
  },
  
  /**
    Shows the outline view on the left.
  */
  showOutline: function () {
    this.set('shouldShowOutline', YES);
  },
  
  /**
    Hides the outline view and the splitView divider, if showing.
  */
  hideOutline: function () {
    this.set('shouldShowOutline', NO);
  }
  
}) ;
