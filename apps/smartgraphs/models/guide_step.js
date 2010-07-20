// ==========================================================================
// Project:   Smartgraphs.GuideStep
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  A GuideStep represents a single step in a given guide page. Each Guide Page represents a recognizable 'chunk' of 
  work to be done, or one general question a user is being asked. Actually doing the work, or answering the question, 
  may take or may not take several steps.
  
  The point of breaking GuidePages down into GuideSteps is to allow GuideSteps to provide progressively more hints to 
  a learner, if they are needed, or to guide a user (author or learner) through several steps in a chunk of work, one
  at a time.
  
  (This hierarchical structure -- one Guide contains many Guide Pages, each of which contains several Guide Steps -- 
  seems to be generally useful.)
  
  I called these DialogTurns in an earlier version of Smartgraphs, but did not find that nomenclature congenial.
  
  @extends SC.Record
  @version 0.1
*/
Smartgraphs.GuideStep = SC.Record.extend(
/** @scope Smartgraphs.GuideStep.prototype */ {

  /** 
    The GuidePage this GuideStep is a part of.
  */
  guidePage: SC.Record.toOne('Smartgraphs.GuidePage', { inverse: 'steps' }),
  
  // /** 
  //   The list of commands (and their arguments) to be run when this GuideStep is loaded.
  //   CommandInvocations represent the specific invocations of commands, to be executed in the order specified by 
  //   the 'index' property.
  // */
  // commands: SC.Record.toMany('Smartgraphs.CommandInvocation'),
  
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
    The list of Buttons to be shown on this page.
  */  
  buttons: SC.Record.toMany('Smartgraphs.Button', { inverse: 'step' }),
  
  /**
    Text to display *after* the response template
  */
  afterText: SC.Record.attr(String),

  /** 
    The set of trigger response blocks registered for this step.
  */
  triggerResponses: SC.Record.toMany('Smartgraphs.TriggerResponse', { inverse: 'step' }),
  
  /**
    @private
    variables local to this GuideStep. This would include the values from the responseTemplate. These can be
    copied to the page context after being examined by the 'check answer' code.
  */
  context: {}

  // stuff from DialogTurn that might be usefully translated to the new models:
    
  // if YES, the Guide should move into the GUIDE_PAGE_FINISHED state when we conclude this step.
  // isLastStep: SC.Record.attr(Boolean),
  
  // 
  // // if YES and isLastTurn is YES, immediately go to the next page on reaching this dialog turn.
  // // (the text of this dialog turn will be visible if the user hits 'back', however!)
  // 
  // shouldAutoAdvance: SC.Record.attr(Boolean),
  // 
  // wasVisited: NO,

}) ;
