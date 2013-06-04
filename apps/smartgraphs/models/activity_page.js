// ==========================================================================
// Project:   Smartgraphs.ActivityPage
// Copyright: ©2010 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
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
  activity: SC.Record.toOne('Smartgraphs.Activity',  { inverse: 'pages', isMaster: YES, aggregate: YES }),

  /**
    @private

    A hack to deal with the fact that SC.Record.propagateToAggregates isn't recursive.
  */
  _statusDidChange: function () {
    if (this.get('status') & SC.Record.DIRTY) this.invokeLast(this.propagateToAggregates);
  }.observes('status'),

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

  /**
    A set of name:expression pairs, which can be evaluated on demand using the expression ['get', <name>] or using
    Smartgraphs.activityPageController.getFromContext(<name>)

    @property {Array}
  */
  contextVars: SC.Record.attr(Array),

  /**
    @private
    Whether the ActivityPage is selectable or not
  */
  isSelectable: NO,

  /**
    The page number of this page. Set by the activityPagesController and only valid when this page is part of the
    "current" activity.
  */
  pageNumber: null,

  pageNumberAsString: function () {
    return (this.get('pageNumber')+1)+'';
  }.property('pageNumber'),

  /**
    @private

    The context in which local page variables are kept
  */
  context: null,

  init: function () {
    sc_super();
    this.set('context', {});
  }

}) ;
