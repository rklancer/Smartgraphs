// ==========================================================================
// Project:   Smartgraphs.GUIDE_STEP_START
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  State representing that the guide step is starting.
  
  @extends SC.Responder
  @version 0.1
*/
Smartgraphs.GUIDE_STEP_START = SC.Responder.create(
/** @scope Smartgraphs.GUIDE_STEP_START.prototype */ {

  nextResponder: Smartgraphs.GUIDE,
  
  didBecomeFirstResponder: function() {
  },
  
  willLoseFirstResponder: function() {
  },
  
  // ..........................................................
  // GUIDE STEP INITIALIZATION
  //
  
  // Any code that transitions to GUIDE_STEP_START *should* subsequently update the guideStepController's content.
  // The code below observes the guideStepController's content and performs the 'beginGuideStep' action
  // when the content changes.
  
  // (Why we use this pattern: in general, code that switches to GUIDE_STEP_START state might set the content of 
  // the guideStepController via some mechanism involving bindings. Therefore, if we tried to start acting on the 
  // guideStepController content during the didBecomeFirstResponder callback, we would be acting on stale content.)
  
  stepContentBinding: 'Smartgraphs.guideStepController.content',
  _stepContentDidChange: function () {
    if (this.get('stepContent')) {
      this.invokeOnce(this._tryToBeginGuideStep);     // darn observers fire twice all the time...
    }
  }.observes('stepContent'),
  
  _tryToBeginGuideStep: function () {
    // the action will only be performed if we're in GUIDE_STEP_START, protecting us from accidentally starting 
    // a guide step if we've switched the guideStepController's content for some valid reason that happens
    // in some mode of operation other than "we're trying to run a new guide step"
    Smartgraphs.sendAction('beginGuideStep');
  },
  
  // ..........................................................
  // ACTIONS
  //
  
  beginGuideStep: function () {
    Smartgraphs.guideStepController.begin();
  },
  
  enableSubmission: function () {
    Smartgraphs.makeFirstResponder(Smartgraphs.GUIDE_STEP_SUBMIT);
    return YES;
  },
  
  /** 
    Transition into the GUIDE_STEP_WAITING state at the start of a GuideStep (this action is not available when 
    the GuideStep is already transitioned to GUIDE_STEP_SUBMIT)
  */
  waitForValidResponse: function (context, args) {    

    // TODO we're poking into guideStepController's business here; make this more general
    var registered = Smartgraphs.guideStepController.get('registeredTriggers');
    var trigger;
    
    if (registered.lastIndexOf('responseBecameValid') < 0) {
      trigger = Smartgraphs.triggers['responseBecameValid'];
      trigger.register(args, []);
      registered.pushObject(trigger);
    }
    if (registered.lastIndexOf('responseBecameInvalid') < 0) {
      trigger = Smartgraphs.triggers['responseBecameInvalid'];
      trigger.register({}, []);
      registered.pushObject(trigger);
    }

    Smartgraphs.makeFirstResponder(Smartgraphs.GUIDE_STEP_WAITING);
    Smartgraphs.responseTemplateController.set('editingShouldBeEnabled', YES);
    return YES;
  },
  
  finishGuideStep: function () {
    Smartgraphs.makeFirstResponder(Smartgraphs.GUIDE_STEP_DONE);
    return YES;
  }
  
}) ;
