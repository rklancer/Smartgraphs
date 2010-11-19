// ==========================================================================
// Project:   Smartgraphs.FREEHAND_INPUT_COMPLETED
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('states/freehand_input');

/** @class

  @extends SC.Responder
  @version 0.1
*/

Smartgraphs.FREEHAND_INPUT_COMPLETED = SC.Responder.create(
/** @scope Smartgraphs.FREEHAND_INPUT_COMPLETED.prototype */ {

  nextResponder: Smartgraphs.FREEHAND_INPUT,
  
  didBecomeFirstResponder: function () {
    Smartgraphs.freehandInputController.stopRecording();    
    Smartgraphs.activityViewController.highlightClearControl();
  },
  
  willLoseFirstResponder: function () {  
  },
  
  // ..........................................................
  // ACTIONS
  //
  
  clearControlWasClicked: function () {
    return this.clearFreehandSketch();
  },
  
  clearFreehandSketch: function () {
    Smartgraphs.freehandInputController.clearSketch();
    Smartgraphs.makeFirstResponder(Smartgraphs.FREEHAND_INPUT_READY);
    return YES;
  }
  
}) ;
