// ==========================================================================
// Project:   Smartgraphs.activityStepController
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/

Smartgraphs.activityStepController = SC.ObjectController.create(
/** @scope Smartgraphs.activityStepController.prototype */ {

  registeredTriggers: [],
  submitButtonShouldBeEnabled: NO,
  
  /**
    Initializes the ActivityStep. Called when we enter ACTIVITY_STEP_START state.
  */
  begin: function () {
    this.registerTriggerResponses();
    Smartgraphs.sendAction('fireActivityEvent', this, { eventName: 'stepBeginning' });
  },
  
  /**
    Cleans up the ActivityStep. Called when we enter ACTIVITY_STEP_DONE state.
  */
  finish: function () {
    Smartgraphs.sendAction('fireActivityEvent', this, {eventName: 'stepFinished'});
  },
  
  cleanup: function () {
    this.unregisterOldTriggers();
  },
  
  unregisterOldTriggers: function () {
    var triggers = this.get('registeredTriggers');
    for (var i = 0, ii = triggers.get('length'); i < ii; i++) {
      triggers[i].unregister();
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
  
  /**
    register observers on responseTemplate input, configure them with 'args'
  */
  configureInputValidator: function (args) {
    var registered = Smartgraphs.activityStepController.get('registeredTriggers');
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
  
  // return they context variable's value from the activityStep, activityPage, or activity context
  lookup: function (key) {
    var context = this.get('context');
    return (context.hasOwnProperty(key) ? context[key] : Smartgraphs.activityPageController.lookup(key));
  }
  
}) ;
