// ==========================================================================
// Project:   Smartgraphs.Guide
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  A guide, or wizard, that steps a user through some activity.
  
  Could be a 'learner guide' that guides a student (or other 'learner') through a learning activity. Such a guide 
  should help the learner  incrementally fill in a lab book, slide show, or answer sheet during the activity, but 
  anything that helps with learning is fair game.
  
  Alternatively, could be an 'author guide' that guides an author (who might be a learner, say in a peer-teaching
  scenario) through the process of writing a learner guide.

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.Guide = SC.Record.extend(
/** @scope Smartgraphs.Guide.prototype */ {

  title: SC.Record.attr(String),
  pages: SC.Record.toMany('Smartgraphs.GuidePage', { inverse: 'guide' })

}) ;
