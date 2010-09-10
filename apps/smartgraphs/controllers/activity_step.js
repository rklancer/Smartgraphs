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
    Initializes the ActivityStep. Called when we enter ACTIVITY_STEP state.
  */
  begin: function () {
    this.registerTriggerResponses();
    Smartgraphs.sendAction('fireTrigger', this, { triggerName: 'stepBeginning' });
  },

  /**
    Called when the user clicks the 'done' or 'submit' button associated with this step.

    When this method is called, the commands in the 'stepSubmitted' triggerResponse (if there is one) are executed.
        
    Generally this happens in concert with a transition to ACTIVITY_STEP_SUBMITTED. Any 'goto (next) step' commands,
    or any branching to other steps based on the user-submitted response ('answer checking') should be done 
    here, which is to say, in the stepSubmitted block. Step transitions are only allowed during ACTIVITY_STEP_SUBMITTED.
  */
  handleSubmission: function () {
    Smartgraphs.sendAction('fireTrigger', this, { triggerName: 'stepSubmitted' });
  },
  
  /**
    Clean up any stale controller state. Called when we leave ACTIVITY_STEP_SUBMITTED and/or ACTIVITY itself
  */  
  cleanup: function () {
    this.unregisterOldTriggers();
  },
  
  /** 
    'Turns off' any triggers associated with this step, and tells them to remove any observers they may have placed on
    objects in memory.
  */
  unregisterOldTriggers: function () {
    var triggers = this.get('registeredTriggers');
    for (var i = 0, ii = triggers.get('length'); i < ii; i++) {
      triggers[i].unregister();
    }
    this.set('registeredTriggers', []);
  },
  
  /**
    Finds the TriggerResponse blocks associated with this step, and tells the associated trigger objects to 'turn on'
    and to set up their observers (which observe changes in the state of the system, in order to 'fire' the trigger
    they deem that the desired criteria are met.)
    
    Passes setup args from the TriggerResponse object to the observer (so the observer's exact behavior can be
    customized to the author's liking); also passes the  ordered list of CommandInvocations that should be executed 
    when the trigger fires.
  */
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
    Registers observers on responseTemplate input, configure them with 'args'. Called by 'waitForResponse' command.
    
    Note that if the activity already specifies a triggerResponse block for the responseBecameValid and/or
    responseBecameInvalid triggers, any setup args for that trigger passed to this method will be ignored. In that
    case the setup args will be taken from the triggerResponse record.
  */
  configureInputValidator: function (args) {
    var registered = Smartgraphs.activityStepController.get('registeredTriggers');
    var trigger;
    
    // FIXME this ain't gonna work! (registeredTriggers = list of Trigger objects)
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
  
  /**
    Actually executes the list of commandInvocations in a triggerResponse block. This method is called by the
    TriggerObserver of the corresponding trigger, when the trigger 'fires'.
  */
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
