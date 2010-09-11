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

  submitButtonShouldBeEnabled: NO,
  
  /**
    Initializes the ActivityStep. Called when we enter ACTIVITY_STEP state.
  */
  begin: function () {
  },

  /**
    Called when the user clicks the 'done' or 'submit' button associated with this step.

    When this method is called, the commands in the 'stepSubmitted' triggerResponse (if there is one) are executed.
        
    Generally this happens in concert with a transition to ACTIVITY_STEP_SUBMITTED. Any 'goto (next) step' commands,
    or any branching to other steps based on the user-submitted response ('answer checking') should be done 
    here, which is to say, in the stepSubmitted block. Step transitions are only allowed during ACTIVITY_STEP_SUBMITTED.
  */
  handleSubmission: function () {
    // TODO
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
  },
  
  
  /**
    Registers observers on responseTemplate input, configure them with 'args'. Called by 'waitForResponse' command.
    
    Note that if the activity already specifies a triggerResponse block for the responseBecameValid and/or
    responseBecameInvalid triggers, any setup args for that trigger passed to this method will be ignored. In that
    case the setup args will be taken from the triggerResponse record.
  */
  configureInputValidator: function (args) {
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
