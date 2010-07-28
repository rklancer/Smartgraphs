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
  
  // do 'beginFirstGuideStep' action, once, when guidePageController's content is updated to a new guidePage

  pageContentBinding: 'Smartgraphs.guidePageController.content',
  _pageContentDidChange: function () {
    var pageContent = this.get('pageContent');
    if (pageContent && pageContent.get('length') > 0) {      
      this.invokeOnce(this._beginFirstGuideStep);
    }
  }.observes('pageContent'),
  
  _beginFirstGuideStep: function () {
    // this action will only happen if we're in GUIDE_PAGE_START state.
    Smartgraphs.sendAction('beginFirstGuideStep');
  },

  // ..........................................................
  // ACTIONS
  //
  
  /**
    Called when guidePageController's content changes
  */
  beginFirstGuideStep: function () {
    Smartgraphs.guidePageController.set('currentStep', Smartgraphs.guidePageController.get('firstStep'));
    Smartgraphs.makeFirstResponder(Smartgraphs.GUIDE_STEP_START);
    return YES;
  }
  
}) ;
