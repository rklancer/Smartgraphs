// ==========================================================================
// Project:   Smartgraphs.GUIDE_PAGE_START
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  State representing that the guide page is starting. Transitions to GUIDE_STEP_START
  
  @extends SC.Responder
  @version 0.1
*/
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
  
  // Any code that transitions to GUIDE_PAGE_START *should* simultaneously update the guidePageController's content.
  // The code below observes the guidePageController's content and performs the 'beginGuidePage' action when the
  // content changes.

  pageContentBinding: 'Smartgraphs.guidePageController.content',
  _pageContentDidChange: function () {
    var pageContent = this.get('pageContent');
    if (pageContent && pageContent.get('length') > 0) {      
      this.invokeOnce(this._beginGuidePage);
    }
  }.observes('pageContent'),
  
  _beginGuidePage: function () {
    // this action will only happen if we're in GUIDE_PAGE_START state.
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
