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

sc_require('states/ready');

Smartgraphs.LOADING_GUIDE = SC.Responder.create(
/** @scope Smartgraphs.LOADING_GUIDE.prototype */ {

  nextResponder: Smartgraphs.READY,
  guideStatusBinding: 'Smartgraphs.guideController*content.status', 

  didBecomeFirstResponder: function() {
    // let guideController content sync (in case it is ever updated via a binding) and let guideStatusBinding sync
    SC.RunLoop.end();
    SC.RunLoop.begin();
    
    if (this.get('guideStatus') === SC.Record.READY_CLEAN) {
      // prefer to this.beginGuide() because the sendAction is traced for debugging
      Smartgraphs.sendAction('beginGuide');
    }
    else {
      Smartgraphs.appWindowController.showGuideLoadingView();
      // _guideStatusDidChange will handle responding to the guide status change.
    }
  },
  
  willLoseFirstResponder: function() {
  },
  
  idBeingLoaded: null,
  
  
  // ..........................................................
  // GUIDE CONTENT UPDATE
  //
  
  guideStatusBinding: 'Smartgraphs.guideController.content.status',
  _guideStatusDidChange: function () {
    var guideStatus = this.get('guideStatus');
  
    if (guideStatus === SC.Record.READY_CLEAN) {
      this.invokeOnce(this._tryToBeginGuide);
    }
    else if (guideStatus === SC.Record.ERROR) {
      Smartgraphs.makeFirstResponder(Smartgraphs.ERROR_LOADING_GUIDE);
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
  
  // Handle 're-entrance' (opening a guide while we're still waiting for another guide to load)
  openGuide: function (context, args){
    if (args.id === this.get('idBeingLoaded')) {
      // do nothing if it's a repeat request to load the same id
      return YES;
    }
    
    // otherwise, let READY handle opening the new guide, but make sure to repeat didBecomeFirstResponder
    Smartgraphs.invokeLater(Smartgraphs.resetFirstResponder);
    return NO;
  },
  
  beginGuide: function () {
    if (Smartgraphs.guidePagesController.get('length') > 0) {
      Smartgraphs.makeFirstResponder(Smartgraphs.GUIDE_PAGE_START);
      Smartgraphs.guidePagesController.selectFirstPage();
    }
    // TODO could go into some error state here if needed.
  }
  
}) ;
