// ==========================================================================
// Project:   Smartgraphs.ActivityStep
// Copyright: ©2010 Concord Consortium
// @author:   Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.ActivityStep = SC.Record.extend(
/** @scope Smartgraphs.ActivityStep.prototype */ {

  url: SC.Record.attr(String),
  primaryKey: 'url',
  
  /** 
    The ActivityPage this ActivityStep is a part of.
  */
  activityPage: SC.Record.toOne('Smartgraphs.ActivityPage', { inverse: 'steps', isMaster: YES }),
  
  /**
    Whether to show a split pane or single pane (value is "split" or "single")
  */  
  paneConfig: SC.Record.toOne(String),
  
  /**
    How to configure the panes, ex:
    
    "panes": {
      "top": {
        "type": "graph",
        "name": "sensor-playing"
      },
      "bottom": {
        "type": "table",
        "graphName": "sensor-playing",
        "datasetName": "sensor-play"
      }
    }
  */
  panes: SC.Record.attr(Object),
  
  /**
    Text to display *before* the response template
  */
  beforeText: SC.Record.attr(String),                                           
  
  /** 
    The responseTemplate. If null, none is shown. If set to a ResponseTemplate, it displays an 'input form' between
    the beforeText and the afterText
  */
  responseTemplate: SC.Record.toOne('Smartgraphs.ResponseTemplate'),
  
  /**
    Text to display *after* the response template
  */
  afterText: SC.Record.attr(String),

  /** 
    The list of commands (and their arguments) to be run when this ActivityStep is loaded.
  */
  startCommands: SC.Record.attr(Array),
  
  /**
    Whether to 'submit' (aka finish) automatically as soon as the startCommands execute, or whether to wait for
    the user to click 'submit'/'done' button
  */
  shouldFinishImmediately: SC.Record.attr(Boolean),
  
  /**
    Whether to turn submissibility off at the beginning of the step and wait for submissibility to become true
    before allowing the user to click submit/done.
    (The alternative is that the user can click 'done' without taking any prior step, as we might want if the step is
    purely informative or if the users' action is optional.)
  */
  shouldWaitForSubmissibleResponse: SC.Record.attr(Boolean),
  
  /**
    a hash that contains:
      the class name of the Inspector that checks system state for submissibility
      a config hash to be passed to the inspector when created
  */
  submissibilityInspector: SC.Record.attr(Object),

  /** 
    JSON expression tree to be used to convert the Inspector's output to a YES or NO answer.
  */
  submissibilityCriterion: SC.Record.attr(Object),
  
  /**
    A list of (systemInspector, triggerCriterion, onCommands, offCommands) sets
      * the systemInspector is registered to observe the system state while the step is waiting and produce a
        value whenever the relevant state changes
      * the triggerCriterion turns the value into a boolean
      * when the boolean goes from NO to YES, the onCommands are run
      * when the boolean goes from YES to NO, the offCommands are run
      
      (Possible improvement: each systemInspector gets a *list* of (triggerCriterion, onCommand, offCommand) sets
      
      These can do things like run commands immediately when the student's graph acquires certain features
  */
  triggeredCommands: SC.Record.toMany('Smartgraphs.TriggeredCommands'),  
  
  /** 
    The list of commands (and their arguments) to be run right after this ActivityStep is submitted.
  */
  afterSubmissionCommands: SC.Record.attr(Array),
  
  /**
    a hash that contains:
      the class name of the Inspector that checks the user's submitted response, if any.
      a config hash to be passed to the inspector when created
  */
  responseInspector: SC.Record.attr(Object),
  
  /**
    An ordered list of criterion -> ActivityStep pairs
    
    After response is submitted, each criterion is evaluated in order, with the return value of the responseInspector
    as the value . The system jumps to the ActivityStep associated with the first criterion that evaluates to YES.
    
    Think of an if-else chain.
    
    If no reactionCriterion evaluates to YES, the defaultBranch is jumped to, if it exists
  */
  responseBranches: SC.Record.attr(Array),
  
  defaultBranch: SC.Record.toOne('Smartgraphs.ActivityStep'),
  
  /** 
    If, after the step is finished/submitted, we don't jump to any new step *AND* isFinalStep === NO for this step,
    we know there was an error.
  */
  isFinalStep: SC.Record.attr(Boolean),
  
  /**
    if we are the last step, whether to automatically skip to the next page when this step finishes.
    FIXME. Different from nextButtonShouldSubmit because (nominally) it leaves the submit button visible and the next
    button hidden; unsure if we want to implement both this and nextButtonShouldSubmit
  */
  shouldAutoAdvancePage: SC.Record.attr(Boolean),
  
  /**
     Whether the submit/done button needs to be hidden or not
     Might be YES for steps that submit automatically when the student's responses acquires certain characteristics
  */
  hideSubmitButton: SC.Record.attr(Boolean),

  /**
    The title of the submit/done button
  */
  submitButtonTitle: SC.Record.attr(String),
  
  /**
    Whether the 'next page' button should do double duty and also submit the step. If YES, the submit button
    will not be shown, and the 'next' button will be enabled or not depending on whether submission is enabled.
  */
  nextButtonShouldSubmit: SC.Record.attr(Boolean)

}) ;
