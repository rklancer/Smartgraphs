// ==========================================================================
// Project:   Smartgraphs.AltActivityStep
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.AltActivityStep = SC.Record.extend(
/** @scope Smartgraphs.AltActivityStep.prototype */ {

  url: SC.Record.attr(String),
  primaryKey: 'url',
  
  /** 
    The ActivityPage this ActivityStep is a part of.
  */
  activityPage: SC.Record.toOne('Smartgraphs.ActivityPage', { inverse: 'steps', isMaster: YES }),
  
  /**
    Whether to show a split pane or single pane
  */  
  initialPaneConfig: SC.Record.toOne(String),
  
  firstGraph: SC.Record.toOne('Smartgraphs.Graph'),
  secondGraph: SC.Record.toOne('Smartgraphs.Graph'),
  
  firstImage: SC.Record.attr(String),
  secondImage: SC.Record.attr(String),
  
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
    CommandInvocations represent the specific invocations of commands, to be executed in the order specified by 
    the 'index' property.
  */
  startCommands: SC.Record.toMany('Smartgraphs.CommandInvocation', { orderBy: 'index' }),
  
  
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
  submissibilityChecker: SC.Record.attr(Object),

  /** 
    JSON expression tree to be used to convert the Inspector's output to a YES or NO answer.
  */
  submissibilityCriterion: SC.Record.attr(Object),
  
  /**
    A list of (systemChecker, triggerCriterion, onCommands, offCommands) sets
      * the systemChecker is registered to observe the system state while the step is waiting and produce a
        value whenever the relevant state changes
      * the triggerCriterion turns the value into a boolean
      * when the boolean goes from NO to YES, the onCommands are run
      * when the boolean goes from YES to NO, the offCommands are run
      
      (Possible improvement: each systemChecker gets a *list* of (triggerCriterion, onCommand, offCommand) sets
      
      These can do things like run commands immediately when the student's graph acquires certain features
  */
  triggeredCommands: SC.Record.toMany('Smartgraphs.TriggeredCommands'),  
  
  /**
    a hash that contains:
      the class name of the Inspector that checks the user's submitted response, if any.
      a config hash to be passed to the inspector when created
  */
  responseChecker: SC.Record.attr(Object),
  
  /**
    An ordered list of responseCriterion -> ActivityStep pairs ('SmartgraphResponses')
    
    After response is submitted, each responseCriterion is evaluated in order. The system jumps to the
    ActivityStep associated
    
    Think of an if-else chain.
    
    If no responseCriterion evaluates to YES, the defaultNextStep is jumped to, if it exists
  */
  systemResponseOptions: SC.Record.toMany('Smartgraphs.SystemResponse', { orderBy: 'index' }),
  
  defaultNextStep: SC.Record.toOne('Smartgraphs.ActivityStep'),
  
  /** 
    If, after the step is finished/submitted, we don't jump to any new step *AND* isFinalStep === NO for this step,
    we know there was an error.
  */
  isFinalStep: SC.Record.attr(Boolean),
  
  /**
    if we are the last step, whether to automatically skip to the next page when this step finishes.
  */
  shouldAutoAdvancePage: SC.Record.attr(Boolean),
  
  /**
     Whether a submit/done button needs to be shown or not
     Might be NO for steps that submit automatically when the student's responses acquires certain characteristics
  */
  submitButtonShouldBeVisible: SC.Record.attr(Boolean),

  /**
    The title of the submit/done button
  */
  submitButtonTitle: SC.Record.attr(String)

}) ;
