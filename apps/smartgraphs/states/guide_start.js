// ==========================================================================
// Project:   Smartgraphs.GUIDE_START
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  Transient start state of GUIDE set of states.

  @extends SC.Responder
  @version 0.1
*/
Smartgraphs.GUIDE_START = SC.Responder.create(
/** @scope Smartgraphs.GUIDE_START.prototype */ {

  nextResponder: Smartgraphs.GUIDE,
  
  didBecomeFirstResponder: function() {
    Smartgraphs.appWindowController.showGuideView();
  },
  
  willLoseFirstResponder: function() {
  },
  
  // ..........................................................
  // GUIDE INITIALIZATION
  //
  
  // Any code that transitions to GUIDE_START *should* simultaneously update the guideController's content. The code 
  // below observes the guideController's content and performs the 'beginGuide' action when the content changes.
  
  guideContentBinding: 'Smartgraphs.guideController.content',
  _guideContentDidChange: function () {
    if (this.get('guideContent')) {
      this.invokeOnce(this._beginGuide);
    }
  }.observes('guideContent'),
  
  _beginGuide: function () {
    Smartgraphs.sendAction('beginGuide');
  },
  
  // ..........................................................
  // ACTIONS
  //
  
  beginGuide: function () {
    if (Smartgraphs.guidePagesController.get('length') > 0) {
      Smartgraphs.guidePagesController.selectFirstPage();
      Smartgraphs.makeFirstResponder(Smartgraphs.GUIDE_PAGE_START);
    }
    // TODO could go into some error state here if needed.
  }
  
}) ;
