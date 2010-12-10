// ==========================================================================
// Project:   Smartgraphs.AUTHOR
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */


/** @class

  The authoring mode of the application.

  @extends SC.State
  @version 0.1
*/
Smartgraphs.AUTHOR = SC.State.extend(
/** @scope Smartgraphs.AUTHOR.prototype */ {
  
  enterState: function () {
    Smartgraphs.appWindowController.showAuthorView();
    Smartgraphs.toolbarController.showRunButton();
    Smartgraphs.activityPagesController.set('shouldShowStepsInOutline', NO);
    Smartgraphs.activityOutlineController.set('shouldSelectPageInOutline', YES);
    Smartgraphs.activityOutlineController.set('isSelectable', YES);
    Smartgraphs.activityViewController.set('enableBackAndForward', YES);
  },
  
  exitState: function () {
    Smartgraphs.activityPagesController.set('shouldShowStepsInOutline', YES);
    Smartgraphs.activityOutlineController.set('shouldSelectPageInOutline', NO);
    Smartgraphs.activityOutlineController.set('isSelectable', NO);
    Smartgraphs.activityViewController.set('enableBackAndForward', NO);
  },

  // ..........................................................
  // ACTIONS
  //
  
  openActivity: function () {
    Smartgraphs.loadingActivityController.set('openAuthorViewAfterLoading', YES);
    return NO;    // let READY handle the rest.
  },
  
  runActivity: function () {
    Smartgraphs.loadingActivityController.set('openAuthorViewAfterLoading', NO);
    this.gotoState('LOADING_ACTIVITY');
    return YES;
  },
  
  gotoNextPage: function () {
    Smartgraphs.activityPagesController.selectNextPage();
  },
  
  gotoPreviousPage: function () {
    Smartgraphs.activityPagesController.selectPreviousPage();
  }

}) ;
