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
  
  executeCommands: function (invocations) {
    var invocation, commandRecord, literalArgs, substitutedArgs, args, key;

    for (var i = 0, ii = invocations.get('length'); i < ii; i++) {
      invocation = invocations.objectAt(i);
      commandRecord = invocation.get('command');
      
      // mixin the literal args first -- args from the specific invocation record override defaults defined in the 
      // commandRecord (which is the 'generic' definition of the command)
      args = SC.mixin(SC.copy(commandRecord.get('literalArgs')), invocation.get('literalArgs'));
      
      // mixin the substituted args the same. Need to substitute the actual values of the keys though
      substitutedArgs = SC.mixin(SC.copy(commandRecord.get('substitutedArgs')), invocation.get('substitutedArgs'));

      // get the values from the context
      for (key in substitutedArgs) {
        if (substitutedArgs.hasOwnProperty(key)) {
          args[key] = this.lookup(substitutedArgs[key]);
        }
      }

      // ... and do the action
      Smartgraphs.sendAction(commandRecord.get('actionName'), this, args);
    }
  },
  
  // return they context variable's value from the guideStep, guidePage, or guide context
  lookup: function (key) {
    var context = this.get('context');
    return (context.hasOwnProperty(key) ? context[key] : Smartgraphs.guidePageController.lookup(key));
  }
  
}) ;
