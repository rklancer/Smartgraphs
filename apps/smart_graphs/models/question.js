// ==========================================================================
// Project:   SmartGraphs.Question
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals SmartGraphs */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/


SmartGraphs.TEXT_RESPONSE = 'text';
SmartGraphs.GRAPH_ANNOTATION_RESPONSE = 'annotation';

SmartGraphs.Question = SC.Record.extend(
/** @scope SmartGraphs.Question.prototype */ {

  sequence: SC.Record.toOne('SmartGraphs.QuestionSequence', {     // the QuestionSequence this is part of
    inverse: 'questions'
  }),
  index: SC.Record.attr(Number),                                       // the index in the QuestionSequence
  shortName: SC.Record.attr(String),                    // very short name suitable for use in nav buttons
  responseType: SC.Record.attr(String),
  prompt: SC.Record.attr(String),
  correctResponse: SC.Record.attr(String),
  correctResponseFeedback: SC.Record.attr(String),      // ..for now, they are simple textual feedback           
  incorrectResponseFeedback: SC.Record.attr(String),    // eventually feedbacks should be 'actions'
  
  // transient properties that could eventually migrate to a separate Response model for persistent storage
  isAnswered: false,
  feedback: null,
  textResponse: null
}) ;
