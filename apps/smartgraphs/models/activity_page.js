// ==========================================================================
// Project:   Smartgraphs.ActivityPage
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  A ActivityPage is one 'page' in a learner Activity (which steps learners through a complicated learning activity, and 
  helps them generate various artifacts during that acitivity, such as a lab book or slide show presentation) 

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.ActivityPage = SC.Record.extend(
/** @scope Smartgraphs.ActivityPage.prototype */ {

  url: SC.Record.attr(String),
  primaryKey: 'url',
  
  /**
    The Activity this ActivityPage belongs to.
  */
  activity: SC.Record.toOne('Smartgraphs.Activity',  { inverse: 'pages', isMaster: YES }),

  /**
    A name for this ActivityPage; to be exposed to authors and, possibly, to learners as the heading of the page.
  */
  name: SC.Record.attr(String),

  /**
    The order of this ActivityPage in the Activity, relative to other pages. Note that this means, at least for now,
    we're not implementing a tree or branching structure of ActivityPages.
  */
  index: SC.Record.attr(Number),

  /**
    The text that sets up the problem to be solved in this page. Remains on the screen for the duration of this
    ActivityPage.
  */
  introText: SC.Record.attr(String),

  /**
    All ActivitySteps associated with this ActivityPage.
  */
  steps: SC.Record.toMany('Smartgraphs.ActivityStep', { inverse: 'activityPage' }),
  
  /**
    The one ActivityStep to open first.
  */
  firstStep: SC.Record.toOne('Smartgraphs.ActivityStep'),
  
  // TODO!! This needs to migrate to session
  /**
    @private
    The ActivityPage context (variables). This would include things like responses that were deemed acceptable at the end
    of the last ActivityStep, and therefore promoted to the ActivityPage context so that they can be referenced by subsequent
    ActivitySteps
  */
  context: {},
  
  /**
    @private
    Whether the ActivityPage is selectable or not
  */
  isSelectable: NO,

  /**
    server endpoint for finding associated steps
  */
  stepListUrl: SC.Record.attr(String),
  
  /**
    a local SC.Query that returns all the ActivitySteps associated with this page. Used to signal the data
    source to fetch these records from the server.
  */
  stepsQuery: function () {
    // cacheable, so DataStore only ever sees one stepsQuery instance per ActivityPage record
    return SC.Query.create({
      isStepsQuery: YES,                       // so the data source can interpret what query we are
      recordType: Smartgraphs.ActivityStep,
      conditions: 'page = {page}',
      parameters: { page: this }
    });
  }.property().cacheable(),
  
  /**
    The page number of this page. Set by the activityPagesController and only valid when this page is part of the
    "current" activity.
  */
  pageNumber: null,
  
  pageNumberAsString: function () {
    return (this.get('pageNumber')+1)+'';
  }.property('pageNumber')

}) ;
