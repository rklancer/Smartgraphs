// ==========================================================================
// Project:   Smartgraphs.GuidePage
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  A GuidePage is one 'page' in a learner Guide (which steps learners through a complicated learning activity, and 
  helps them generate various artifacts during that acitivity, such as a lab book or slide show presentation) 
  
  *OR*

  can be one page in an Author Guide (which steps an author through the process of generating a Learner Guide).

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.GuidePage = SC.Record.extend(
/** @scope Smartgraphs.GuidePage.prototype */ {

  guide: SC.Record.toOne('SC.Guide',  { inverse: 'pages' }),
  index: SC.Record.attr(Number),
  introText: SC.Record.attr(String),
  commands: SC.Record.attr(Array)

}) ;
