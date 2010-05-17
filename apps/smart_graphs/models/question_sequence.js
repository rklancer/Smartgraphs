// ==========================================================================
// Project:   SmartGraphs.QuestionSequence
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals SmartGraphs */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
SmartGraphs.QuestionSequence = SC.Record.extend(
/** @scope SmartGraphs.QuestionSequence.prototype */ {
  
  questions: SC.Record.toMany('SmartGraphs.Question', {
    inverse: 'sequence'
  })
}) ;
