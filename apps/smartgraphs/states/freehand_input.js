// ==========================================================================
// Project:   Smartgraphs.FREEHAND_INPUT
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  @extends SC.Responder
  @version 0.1
*/

sc_require('states/activity_step');

Smartgraphs.FREEHAND_INPUT = SC.Responder.create(
/** @scope Smartgraphs.FREEHAND_INPUT.prototype */ {

  nextResponder: Smartgraphs.ACTIVITY_STEP,
  
  didBecomeFirstResponder: function () {
    var enableSucceeded = Smartgraphs.freehandInputController.enableInput();
    // if freehandInputController says NO, don't accept first responder
    if (enableSucceeded) {
      Smartgraphs.activityViewController.revealOnlyClearControl();
      Smartgraphs.activityViewController.showControls(Smartgraphs.freehandInputController.get('pane'));
      Smartgraphs.makeFirstResponder(Smartgraphs.FREEHAND_INPUT_READY);
    }
    else {
      Smartgraphs.makeFirstResponder(Smartgraphs.ACTIVITY_STEP);
    }
  },
  
  willLoseFirstResponder: function () {
    Smartgraphs.freehandInputController.disableInput();
    Smartgraphs.activityViewController.hideControls(Smartgraphs.freehandInputController.get('pane'));   
  },
  
  // ..........................................................
  // ACTIONS
  //

  startFreehandInput: function () {
    console.error('Attempted to startFreehandInput when in FREEHAND_INPUT state');
    return YES;       // do nothing and consider that handling it!
  },
  
  clearControlWasClicked: function () {
    this.clearSketch();
  },
  
  clearSketch: function () {
    Smartgraphs.freehandInputController.clearStroke();
    Smartgraphs.activityViewController.disableAllControls();    
  }
}) ;
