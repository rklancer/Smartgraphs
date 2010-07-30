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
  idBeingLoaded: null,
  guideStatusBinding: 'Smartgraphs.guideController*content.status', 

  didBecomeFirstResponder: function() {
    console.log('LOADING_GUIDE didBecomeFirstResponder');
    
    // let guideController content sync (in case it is ever updated via a binding) and let guideStatusBinding sync
    SC.RunLoop.end();
    SC.RunLoop.begin();
    
    if (this.handlePossibleLoadCompletion() === NO) {
      Smartgraphs.appWindowController.showGuideLoadingView();
      // _handlePossibleLoadCompletion will handle guide after its status changes.
    }
  },
  
  willLoseFirstResponder: function() {
  },
  

  // ..........................................................
  // GUIDE CONTENT UPDATE
  //

  _guideStatusDidChange: function () {
    this.invokeOnce(this.handlePossibleLoadCompletion);
  }.observes('guideStatus'),
  
  handlePossibleLoadCompletion: function () {
    var guideStatus = this.get('guideStatus');
    
    if (guideStatus === SC.Record.READY_CLEAN) {
      Smartgraphs.sendAction('beginGuide');
      return YES;    // load completed
    }
    else if (guideStatus === SC.Record.ERROR) {
      Smartgraphs.sendAction('handleGuideLoadError');
      return YES;   // load completed
    }
    return NO;      // load did NOT complete
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
  },
  
  
  handleGuideLoadError: function () {
    Smartgraphs.makeFirstResponder(Smartgraphs.ERROR_LOADING_GUIDE);
  }
  
}) ;
