// ==========================================================================
// Project:   Smartgraphs.Question
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/


Smartgraphs.TEXT_RESPONSE = 'text';
Smartgraphs.GRAPH_ANNOTATION_RESPONSE = 'annotation';

Smartgraphs.Question = SC.Record.extend(
/** @scope Smartgraphs.Question.prototype */ {

  sequence: SC.Record.toOne('Smartgraphs.QuestionSequence', {     // the QuestionSequence this is part of
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
  isAnswered: false,        // set after the question has been correctly answered
  feedback: null,
  textResponse: null,
  
  // the 'isSelectable' property is set to YES for:
  //   * the *first* question
  //   * the *next* question once you've correctly answered the current question,
  //   * any question you've previously answered correctly  

  isSelectable: false
}) ;
