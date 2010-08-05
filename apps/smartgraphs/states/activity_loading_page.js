// ==========================================================================
// Project:   Smartgraphs.ACTIVITY_LOADING_PAGE
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  @extends SC.Responder
  @version 0.1
*/

sc_require('states/activity');

Smartgraphs.ACTIVITY_LOADING_PAGE = SC.Responder.create(
/** @scope Smartgraphs.ACTIVITY_LOADING_PAGE.prototype */ {
  
  nextResponder: Smartgraphs.ACTIVITY,
  
  didBecomeFirstResponder: function () {
    // Make sure all the ActivitySteps associated with the current ActivityPage are loaded before proceeding
    // to ACTIVITY_PAGE_START

    this._steps = Smartgraphs.store.find(Smartgraphs.activityPageController.get('stepsQuery'));
    
    if (this.checkStatus()) {
      return;
    }
    this._steps.addObserver('status', this, this.checkStatus);
  },
  
  willLoseFirstResponder: function () {
    this._steps.removeObserver('status', this, this.checkStatus);
  },
  
  checkStatus: function () {
    if (this._steps.get('status') & SC.Record.READY) {
      Smartgraphs.makeFirstResponder(Smartgraphs.ACTIVITY_PAGE_START);      
    }
  }
  
  // ..........................................................
  // ACTIONS
  //
  
}) ;
