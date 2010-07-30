// ==========================================================================
// Project:   Smartgraphs.GUIDE_PAGE_START
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  State representing that the guide page is starting. Transitions to GUIDE_STEP_START
  
  @extends SC.Responder
  @version 0.1
*/

sc_require('states/guide');

Smartgraphs.GUIDE_PAGE_START = SC.Responder.create(
/** @scope Smartgraphs.GUIDE_PAGE_START.prototype */ {

  nextResponder: Smartgraphs.GUIDE,
  
  didBecomeFirstResponder: function() {
  },
  
  willLoseFirstResponder: function() {
  },
  
  // ..........................................................
  // GUIDE PAGE INITIALIZATION
  //
  
  // Any code that transitions to GUIDE_PAGE_START *should* subsequently update the guidePageController's content.
  // The code below observes the guidePageController's content and performs the 'beginGuidePage' action when the
  // content changes.

  // (Why we use this pattern: in general, code that switches to GUIDE_PAGE_START state might set the content of 
  // the guidePageController via some mechanism involving bindings. Therefore, if we tried to start acting on the 
  // guidePageController content during the didBecomeFirstResponder callback, we would be acting on stale content.)
  
  pageContentBinding: 'Smartgraphs.guidePageController.content',
  _pageContentDidChange: function () {
    var pageContent = this.get('pageContent');
    if (pageContent && pageContent.get('length') > 0) {      
      this.invokeOnce(this._tryToBeginGuidePage);
    }
  }.observes('pageContent'),
  
  _tryToBeginGuidePage: function () {
    // the action will only be performed if we're in GUIDE_PAGE_START, protecting us from accidentally starting 
    // a guide page if we've switched the guidePageController's content for some valid reason that happens
    // in some mode of operation other than "we're trying to run a new guide page"
    Smartgraphs.sendAction('beginGuidePage');
  },

  // ..........................................................
  // ACTIONS
  //
  
  /**
    Called when guidePageController's content changes
  */
  beginGuidePage: function () {
    Smartgraphs.makeFirstResponder(Smartgraphs.GUIDE_STEP_START);
    Smartgraphs.guidePageController.set('currentStep', Smartgraphs.guidePageController.get('firstStep'));
    return YES;
  }
  
}) ;
