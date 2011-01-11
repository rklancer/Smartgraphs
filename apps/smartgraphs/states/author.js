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
  
  initialSubstate: 'AUTHOR_DEFAULT',
  
  enterState: function () {
    Smartgraphs.appWindowController.showAuthorView();
    Smartgraphs.toolbarController.showRunButton();
    Smartgraphs.toolbarController.showSaveButton();
    Smartgraphs.activityPagesController.set('shouldShowStepsInOutline', NO);
    Smartgraphs.activityOutlineController.set('shouldSelectPageInOutline', YES);
    Smartgraphs.activityOutlineController.set('isSelectable', YES);
    Smartgraphs.activityViewController.set('enableBackAndForward', YES);
  },
  
  exitState: function () {
    Smartgraphs.toolbarController.hideSaveButton();    
    Smartgraphs.activityPagesController.set('shouldShowStepsInOutline', YES);
    Smartgraphs.activityOutlineController.set('shouldSelectPageInOutline', NO);
    Smartgraphs.activityOutlineController.set('isSelectable', NO);
    Smartgraphs.activityViewController.set('enableBackAndForward', NO);
  },
  
  AUTHOR_DEFAULT: SC.State.design({
  }),
  
  ERROR_SAVING_ACTIVITY: SC.State.design({
    // TODO distinguish between editing conflicts and connectivity problems; give option to retry.
    enterState: function() { 
      SC.AlertPane.error("Could not save activity", "Could not save the activity. Someone else may have edited the activity you were working on. Try reloading the page and redoing your edits.");
    }
  }),

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
    return YES;
  },
  
  gotoPreviousPage: function () {
    Smartgraphs.activityPagesController.selectPreviousPage();
    return YES;
  },
  
  saveActivity: function () {
    Smartgraphs.activityController.save();
    return YES;
  },
  
  errorSavingActivity: function () {
    this.gotoState('ERROR_SAVING_ACTIVITY');
    return YES;
  }
  
}) ;
