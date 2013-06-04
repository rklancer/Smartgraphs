// ==========================================================================
// Project:   Smartgraphs.ACTIVITY
// Copyright: ©2010 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */


/** @class

  Superstate representing that the application is running an Activity.

  @extends SC.State
  @version 0.1
*/

Smartgraphs.ACTIVITY = SC.State.extend(
  /** @scope Smartgraphs.ACTIVITY.prototype */ {

  initialSubstate: 'ACTIVITY_PAGE_START',

  enterState: function() {
    Smartgraphs.sessionController.beginSession();

    var pages = Smartgraphs.activityController.get('pages'),
        page;

    Smartgraphs.activityPagesController.set('content', pages);

    if (Smartgraphs.navigatedLocation && Smartgraphs.navigatedLocation.activityId === Smartgraphs.activityController.get('id')) {
      // go to previously-saved page and step rather than 'real' firstStep of the first page
      Smartgraphs.activityPagesController.selectPageId(Smartgraphs.navigatedLocation.pageId);
      page = Smartgraphs.activityPageController.get('content');
      if (page && Smartgraphs.navigatedLocation.stepId) {
        page.set('firstStep', Smartgraphs.store.find(Smartgraphs.ActivityStep, Smartgraphs.navigatedLocation.stepId));
      }
    }
    else {
      // default. go to first page; will enter "real" first step
      Smartgraphs.activityPagesController.selectFirstPage();
    }

    Smartgraphs.appWindowController.showActivityView();
  },

  exitState: function () {
    Smartgraphs.activityController.cleanup();
    Smartgraphs.sessionController.endSession();
  },


  ACTIVITY_PAGE_START: SC.State.design({
    enterState: function () {
      Smartgraphs.activityStepController.set('content', Smartgraphs.activityPageController.get('firstStep'));
      this.gotoState('ACTIVITY_STEP');
    }
  }),


  ACTIVITY_STEP: SC.State.plugin('Smartgraphs.ACTIVITY_STEP'),


  ACTIVITY_STEP_SUBMITTED: SC.State.plugin('Smartgraphs.ACTIVITY_STEP_SUBMITTED'),


  ACTIVITY_PAGE_DONE: SC.State.design({

    enterState: function() {
      if (Smartgraphs.activityPagesController.get('isLastPage')) {
        this.gotoState('ACTIVITY_DONE');
      }
      else {
        Smartgraphs.activityController.set('canGotoNextPage', YES);
      }
    },

    exitState: function() {
      Smartgraphs.activityController.set('canGotoNextPage', NO);
      Smartgraphs.activityPageController.cleanup();
    },

    gotoNextPage: function () {
      Smartgraphs.activityPagesController.selectNextPage();
      this.gotoState('ACTIVITY_PAGE_START');
    }
  }),


  // ..........................................................
  // ACTIONS
  //

  /**
    Open author's view of the currently running activity.
  */
  openAuthorView: function () {
    this.gotoState('AUTHOR');
    return YES;
  },

  /**
    Executes if openActivity action is sent within the ACTIVITY state. Instructs the LOADING_ACTIVITY state to switch
    back to the ACTIVITY state (rather than AUTHOR) when the new activity is loaded. Returns NO so that the main
    openActivity handler (defined in the READY state) is also called, thereby actually loading the activity.
  */
  openActivity: function () {
    Smartgraphs.loadingActivityController.set('openAuthorViewAfterLoading', NO);
    return NO;    // let READY handle the rest.
  }

}) ;
