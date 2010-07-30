// ==========================================================================
// Project:   Smartgraphs.LOADING_GUIDE
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  Loading state for Guide view

  @extends SC.Responder
  @version 0.1
*/
Smartgraphs.LOADING_GUIDE = SC.Responder.create(
/** @scope Smartgraphs.LOADING_GUIDE.prototype */ {

  nextResponder: Smartgraphs.READY,
  
  didBecomeFirstResponder: function() {
    Smartgraphs.appWindowController.showGuideLoadingIndicator();
  },
  
  willLoseFirstResponder: function() {
  },
  
  // ..........................................................
  // GUIDE INITIALIZATION
  //
  
  guideStatusBinding: 'Smartgraphs.guideController.content.status',
  _guideStatusDidChange: function () {
    if (this.get('guideStatus') === SC.Record.READY_CLEAN) {
      this.invokeOnce(this._tryToBeginGuide);
    }
  }.observes('guideStatus'),
  
  _tryToBeginGuide: function () {
    // the observer that calls '_tryToBeginGuide' might fire (and thus this method might execute) while we're in 
    // some state other than LOADING_GUIDE. By sending the 'beginGuide' action, we protect against actually
    // executing beginGuide *unless* we are in the LOADING_GUIDE state
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
