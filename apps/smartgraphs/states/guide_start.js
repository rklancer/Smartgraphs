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
  // ACTIONS
  //
  
  openFirstGuidePage: function () {
    if (Smartgraphs.guidePagesController.get('length') > 0) {
      Smartgraphs.guidePagesController.selectFirstPage();
      Smartgraphs.makeFirstResponder(Smartgraphs.GUIDE_PAGE_START);
    }
    // TODO could go into some error state here if needed.
  }
  
}) ;
