// ==========================================================================
// Project:   Smartgraphs.ACTIVITY_STEP_START
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  State representing that the activity step is starting.
  
  @extends SC.Responder
  @version 0.1
*/

sc_require('states/activity');

Smartgraphs.ACTIVITY_STEP_START = SC.Responder.create(
/** @scope Smartgraphs.ACTIVITY_STEP_START.prototype */ {

  nextResponder: Smartgraphs.ACTIVITY,
  
  didBecomeFirstResponder: function () {
    Smartgraphs.activityStepController.set('content', Smartgraphs.activityPageController.get('currentStep'));
    Smartgraphs.makeFirstResponder(Smartgraphs.ACTIVITY_STEP);
  }
  
  // ..........................................................
  // ACTIONS
  //
  
}) ;
