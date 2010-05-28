// ==========================================================================
// Project:   Smartgraphs.QuestionSequence
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.QuestionSequence = SC.Record.extend(
/** @scope Smartgraphs.QuestionSequence.prototype */ {
  
  questions: SC.Record.toMany('Smartgraphs.Question', {
    inverse: 'sequence'
  })
}) ;
