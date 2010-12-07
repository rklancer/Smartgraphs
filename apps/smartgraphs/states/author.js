// ==========================================================================
// Project:   Smartgraphs.AUTHOR
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('states/ready');

/** @class

  The authoring mode of the application.

  @extends SC.Responder
  @version 0.1
*/
Smartgraphs.AUTHOR = SC.Responder.create(
/** @scope Smartgraphs.START.prototype */ {

  nextResponder: Smartgraphs.READY,
  
  didBecomeFirstResponder: function () {
    Smartgraphs.appWindowController.showAuthorView();
    Smartgraphs.toolbarController.showRunButton();
    Smartgraphs.activityPagesController.set('shouldShowStepsInOutline', NO);
    Smartgraphs.activityOutlineController.set('shouldSelectPageInOutline', YES);
    Smartgraphs.activityOutlineController.set('isSelectable', YES);
    Smartgraphs.activityViewController.set('enableBackAndForward', YES);
  },
  
  willLoseFirstResponder: function () {
    Smartgraphs.activityPagesController.set('shouldShowStepsInOutline', YES);
    Smartgraphs.activityOutlineController.set('shouldSelectPageInOutline', NO);
    Smartgraphs.activityOutlineController.set('isSelectable', NO);
    Smartgraphs.activityViewController.set('enableBackAndForward', NO);
  },
  
  
  // ..........................................................
  // ACTIONS
  //
  
  openActivity: function () {
    Smartgraphs.LOADING_ACTIVITY.set('openAuthorViewAfterLoading', YES);
    return NO;    // let READY handle the rest.
  },
  
  runActivity: function () {
    Smartgraphs.LOADING_ACTIVITY.set('openAuthorViewAfterLoading', NO);
    Smartgraphs.makeFirstResponder(Smartgraphs.LOADING_ACTIVITY);
    return YES;
  },
  
  gotoNextPage: function () {
    Smartgraphs.activityPagesController.selectNextPage();
  },
  
  gotoPreviousPage: function () {
    Smartgraphs.activityPagesController.selectPreviousPage();
  }

}) ;
