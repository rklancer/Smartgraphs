// ==========================================================================
// Project:   Smartgraphs.ACTIVITY_PAGE_START
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  State representing that the activity page is starting.
  
  @extends SC.Responder
  @version 0.1
*/

sc_require('states/activity');

Smartgraphs.ACTIVITY_PAGE_START = SC.Responder.create(
/** @scope Smartgraphs.ACTIVITY_PAGE_START.prototype */ {

  nextResponder: Smartgraphs.ACTIVITY,
  
  // ..........................................................
  // ACTIVITY PAGE INITIALIZATION
  //
  
  // Any code that transitions to ACTIVITY_PAGE_START *should* subsequently update the activityPageController's content.
  // The code below observes the activityPageController's content and performs the 'beginActivityPage' action when the
  // content changes.

  // (Why we use this pattern: in general, code that switches to ACTIVITY_PAGE_START state might set the content of 
  // the activityPageController via some mechanism involving bindings. Therefore, if we tried to start acting on the 
  // activityPageController content during the didBecomeFirstResponder callback, we would be acting on stale content.)
  
  pageContentBinding: 'Smartgraphs.activityPageController.content',
  _pageContentDidChange: function () {
    var pageContent = this.get('pageContent');
    if (pageContent && pageContent.get('length') > 0) {      
      this.invokeOnce(this._tryToBeginActivityPage);
    }
  }.observes('pageContent'),
  
  _tryToBeginActivityPage: function () {
    // the action will only be performed if we're in ACTIVITY_PAGE_START, protecting us from accidentally starting 
    // a activity page if we've switched the activityPageController's content for some valid reason that happens
    // in some mode of operation other than "we're trying to run a new activity page"
    Smartgraphs.sendAction('beginActivityPage');
  },

  // ..........................................................
  // ACTIONS
  //
  
  /**
    Called when activityPageController's content changes
  */
  beginActivityPage: function () {
    Smartgraphs.makeFirstResponder(Smartgraphs.ACTIVITY_LOADING_STEP);
    Smartgraphs.activityPageController.set('currentStep', Smartgraphs.activityPageController.get('firstStep'));
    return YES;
  }
  
}) ;
