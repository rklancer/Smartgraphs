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
  
  // Any code that transitions to GUIDE_START *should* subsequently update the guideController's content. The code 
  // below observes the guideController's content and performs the 'beginGuide' action when the content changes.
  
  // (Why we use this pattern: in general, code that switches to GUIDE_START state might set the content of 
  // the guideController via some mechanism involving bindings. Therefore, if we tried to start acting on the 
  // guideController content during the didBecomeFirstResponder callback, we would be acting on stale content.)
  
  guideContentBinding: 'Smartgraphs.guideController.content',
  _guideContentDidChange: function () {
    if (this.get('guideContent')) {
      this.invokeOnce(this._tryToBeginGuide);
    }
  }.observes('guideContent'),
  
  _tryToBeginGuide: function () {
    // Because beginGuide is only implemented in GUIDE_START, we won't accidentally try to start a guide if
    // we switch the guideController content for some reason *other* than to start running a new guide.
    Smartgraphs.sendAction('beginGuide');
  },
  
  // ..........................................................
  // ACTIONS
  //
  
  beginGuide: function () {
    if (Smartgraphs.guidePagesController.get('length') > 0) {
      Smartgraphs.makeFirstResponder(Smartgraphs.GUIDE_PAGE_START);
      Smartgraphs.guidePagesController.selectFirstPage();      
    }
    // TODO could go into some error state here if needed.
  }
  
}) ;
