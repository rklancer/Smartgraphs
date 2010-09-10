// ==========================================================================
// Project:   Smartgraphs.ActivityStep
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  A ActivityStep represents a single step in a given activity page. Each Activity Page represents a recognizable 'chunk' of 
  work to be done, or one general question a user is being asked. Actually doing the work, or answering the question, 
  may take or may not take several steps.
  
  The point of breaking ActivityPages down into ActivitySteps is to allow ActivitySteps to provide progressively more hints to 
  a learner, if they are needed, or to activity a user (author or learner) through several steps in a chunk of work, one
  at a time.
  
  (This hierarchical structure -- one Activity contains many Activity Pages, each of which contains several Activity Steps -- 
  seems to be generally useful.)
  
  I called these DialogTurns in an earlier version of Smartgraphs, but did not find that nomenclature congenial.
  
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
  
  // /** 
  //   The list of commands (and their arguments) to be run when this ActivityStep is loaded.
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
    Text to display *after* the response template
  */
  afterText: SC.Record.attr(String),

  /** 
    The set of trigger response blocks registered for this step.
  */
  triggerResponses: SC.Record.toMany('Smartgraphs.TriggerResponse', { inverse: 'step' }),
  
  // TODO this needs to migrate to session
  /**
    @private
    variables local to this ActivityStep. This would include the values from the responseTemplate. These can be
    copied to the page context after being examined by the 'check answer' code.
  */
  context: {},

  // stuff from DialogTurn that might be usefully translated to the new models:
    
  submitButtonShouldBeVisible: SC.Record.attr(Boolean),
  
  submitButtonTitle: SC.Record.attr(String),
  
  // 
  // // if YES and isLastTurn is YES, immediately go to the next page on reaching this dialog turn.
  // // (the text of this dialog turn will be visible if the user hits 'back', however!)
  // 
  // shouldAutoAdvance: SC.Record.attr(Boolean),
  // 
  // wasVisited: NO,
  
  /** 
    server endpoint for finding triggerResponses associated with this step
  */
  triggerResponseListUrl: SC.Record.attr(String),
  
  /**
    server endpoint for finding commandInvocations associated with this step.
  */
  commandListUrl: SC.Record.attr(String),

  /**
    Query that finds in the data store all TriggerResponses associated with this step.
  */
  triggerResponsesQuery: function () {
    return SC.Query.create({
      isTriggerResponsesQuery: YES,
      recordType: Smartgraphs.TriggerResponse,
      conditions: 'step = {step}',
      parameters: { step: this }
    });
  }.property().cacheable(),
  
  /**
    Query that finds in the data store all CommandInvocations associated with this step. (This means finding
    all CommandInvocations associated with TriggerResponses associated with this step.)
  */
  commandsQuery: function () {
    return SC.Query.create({
      isCommandInvocationsQuery: YES,     // fully qualify here so datasource doesn't confuse it with query for Smartgraphs.Command objects
      activityStep: this,
      recordType: Smartgraphs.CommandInvocation,
      conditions: '{triggerResponses} CONTAINS triggerResponse',
      // SC Bug? CONTAINS queries don't recognize ManyArrays, only true Arrays. Therefore turn triggerResponses into a 'real' Array.
      parameters: { triggerResponses: this.get('triggerResponses').map( function (x) { return x; }) }
    });
  }.property().cacheable(),

  triggerResponsesDidChange: function () {
    this.notifyPropertyChange('commandsQuery');
  }.observes('*triggerResponses.[]')
  
}) ;
