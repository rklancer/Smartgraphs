// ==========================================================================
// Project:   Smartgraphs.FREEHAND_INPUT_READY
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  @extends SC.Responder
  @version 0.1
*/

sc_require('states/freehand_input');

Smartgraphs.FREEHAND_INPUT_READY = SC.Responder.create(
/** @scope Smartgraphs.FREEHAND_INPUT_READY.prototype */ {

  nextResponder: Smartgraphs.FREEHAND_INPUT,
  
  didBecomeFirstResponder: function () {
    Smartgraphs.activityViewController.disableAllControls();
    Smartgraphs.freehandInputController.startRecording();
  },
  
  willLoseFirstResponder: function () {
    Smartgraphs.freehandInputController.stopRecording();    
  },
  
  // ..........................................................
  // ACTIONS
  //

  freehandSketchCompleted: function () {
    Smartgraphs.makeFirstResponder(Smartgraphs.FREEHAND_INPUT_COMPLETED);
  }
  
}) ;
