// ==========================================================================
// Project:   Smartgraphs.GuidePage
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  A GuidePage is one 'page' in a learner Guide (which steps learners through a complicated learning activity, and 
  helps them generate various artifacts during that acitivity, such as a lab book or slide show presentation) 
  
  *OR*

  It can be one page in an Author Guide (which steps an author through the process of generating a Learner Guide).

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.GuidePage = SC.Record.extend(
/** @scope Smartgraphs.GuidePage.prototype */ {

  /**
    The Guide this GuidePage belongs to.
  */
  guide: SC.Record.toOne('SC.Guide',  { inverse: 'pages' }),

  /**
    A name for this GuidePage; to be exposed to authors and, possibly, to learners as the heading of the page.
  */
  name: SC.Record.attr(String),

  /**
    The order of this GuidePage in the Guide, relative to other pages. Note that this means, at least for now,
    we're not implementing a tree or branching structure of GuidePages.
  */
  index: SC.Record.attr(Number),

  /**
    The text that sets up the problem to be solved in this page. Remains on the screen for the duration of this
    GuidePage.
  */
  introText: SC.Record.attr(String),

  /**
    All GuideSteps associated with this GuidePage.
  */
  steps: SC.Record.toMany('Smartgraphs.GuideStep', { inverse: 'guidePage' }),
  
  /**
    The one GuideStep to open first.
  */
  firstStep: SC.Record.toOne('Smartgraphs.GuideStep'),
  
  /**
    @private
    The GuidePage context (variables). This would include things like responses that were deemed acceptable at the end
    of the last GuideStep, and therefore promoted to the GuidePage context so that they can be referenced by subsequent
    GuideSteps
  */
  context: {}

}) ;
