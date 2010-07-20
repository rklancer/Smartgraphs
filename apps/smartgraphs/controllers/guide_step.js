// ==========================================================================
// Project:   Smartgraphs.guideStepController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/

Smartgraphs.guideStepController = SC.ObjectController.create(
/** @scope Smartgraphs.guideStepController.prototype */ {

  contentBinding: 'Smartgraphs.guidePageController.currentStep',

  registeredTriggers: [],
  
  /**
    Initializes the GuideStep. Called when we enter GUIDE_STEP_START state.
  */
  initStep: function () {
    console.log('guideStepController.initStep()');
    
    this.unregisterOldTriggers();
    this.registerTriggerResponses();
    Smartgraphs.sendAction('fireGuideEvent', this, { eventName: 'beginStep' });
    Smartgraphs.makeFirstResponder(Smartgraphs.GUIDE_STEP_WAITING);
  },
  
  unregisterOldTriggers: function () {
    var registered = this.get('registeredTriggers');
    for (var i = 0, ii = registered.get('length'); i < ii; i++) {
      registered[i].unregister();
    }
    this.set('registeredTriggers', []);
  },
  
  registerTriggerResponses: function () {
    var responses = this.get('triggerResponses');
    var registered = this.get('registeredTriggers');
    var response, triggerRecord, name, trigger, args, commands;
    
    for (var i = 0, ii = responses.get('length'); i < ii; i++) {
      response = responses.objectAt(i);
      triggerRecord = response.get('trigger');

      name = triggerRecord.get('name');
      trigger = Smartgraphs.triggers[name];

      if (trigger) {
        args = SC.mixin(SC.copy(triggerRecord.get('args')), response.get('args'));
        commands = response.get('commands');
        trigger.register(args, commands);
        registered.pushObject(trigger);
      }
    }
  },
  
  executeCommands: function (commands) {
    console.log('executing commands!');
    console.log(commands);
  }
  
}) ;
