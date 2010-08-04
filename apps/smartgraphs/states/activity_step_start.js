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
  
  // ..........................................................
  // ACTIVITY STEP INITIALIZATION
  //
  
  // Any code that transitions to ACTIVITY_STEP_START *should* subsequently update the activityStepController's content.
  // The code below observes the activityStepController's content and performs the 'beginActivityStep' action
  // when the content changes.
  
  // (Why we use this pattern: in general, code that switches to ACTIVITY_STEP_START state might set the content of 
  // the activityStepController via some mechanism involving bindings. Therefore, if we tried to start acting on the 
  // activityStepController content during the didBecomeFirstResponder callback, we would be acting on stale content.)
  
  stepContentBinding: 'Smartgraphs.activityStepController.content',
  _stepContentDidChange: function () {
    if (this.get('stepContent')) {
      this.invokeOnce(this._tryToBeginActivityStep);     // darn observers fire twice all the time...
    }
  }.observes('stepContent'),
  
  _tryToBeginActivityStep: function () {
    // the action will only be performed if we're in ACTIVITY_STEP_START, protecting us from accidentally starting 
    // a activity step if we've switched the activityStepController's content for some valid reason that happens
    // in some mode of operation other than "we're trying to run a new activity step"
    Smartgraphs.sendAction('beginActivityStep');
  },
  
  // ..........................................................
  // ACTIONS
  //
  
  beginActivityStep: function () {
    Smartgraphs.makeFirstResponder(Smartgraphs.ACTIVITY_STEP);
    // try this
    Smartgraphs.activityStepController.invokeLater(Smartgraphs.activityStepController.begin);
  }
  
}) ;
