// ==========================================================================
// Project:   Smartgraphs.ACTIVITY_STEP_WAITING
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  State representing that the activity step is waiting for the user's response. Transitions to ACTIVITY_STEP_SUBMIT when
  the response is in some acceptable form for submitting (e.g., checking the answer). ACTIVITY_STEP_SUBMIT may transition
  back here if the response changes back.
  
  @extends SC.Responder
  @version 0.1
*/

sc_require('states/activity');

Smartgraphs.ACTIVITY_STEP_WAITING = SC.Responder.create(
/** @scope Smartgraphs.ACTIVITY_STEP_WAITING.prototype */ {

  nextResponder: Smartgraphs.ACTIVITY,
  
  didBecomeFirstResponder: function() {
    Smartgraphs.activityStepController.set('submitButtonShouldBeEnabled', NO);
  },
  
  willLoseFirstResponder: function() {
  },
  
  // ..........................................................
  // EVENTS
  //
  
  enableSubmission: function () {
    Smartgraphs.makeFirstResponder(Smartgraphs.ACTIVITY_STEP_SUBMIT);
    return YES;
  }
  
}) ;
