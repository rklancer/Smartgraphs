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
    var inputOk = Smartgraphs.freehandInputController.startInput();
    // if freehandInputController says NO, don't accept first responder
    if (!inputOk) Smartgraphs.makeFirstResponder(Smartgraphs.ACTIVITY_STEP);
  },
  
  willLoseFirstResponder: function () {
    Smartgraphs.freehandInputController.endInput();
  },
  
  // ..........................................................
  // ACTIONS
  //

  startFreehandInput: function () {
    console.error('Attempted to startFreehandInput when in FREEHAND_INPUT state');
    return YES;       // do nothing and consider that handling it!
  }
  
}) ;
