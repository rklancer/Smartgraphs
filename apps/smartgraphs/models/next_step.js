// ==========================================================================
// Project:   Smartgraphs.NextStep
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.NextStep = SC.Record.extend(
/** @scope Smartgraphs.NextStep.prototype */ {

  url: SC.Record.attr(String),
  primaryKey: 'url',
  
  /**
    The parent step whose response we are evaluating
  */
  parentStep: SC.Record.toOne('Smartgraph.ActivityStep'),
  
  /**
    The order in which this criterion will be evaluated
  */
  index: SC.Record.attr(Number),
  
  /**
    JSON expression tree that converts the parent step's response Inspector value into YES or NO
  */
  responseCriterion: SC.Record.attr(Object),
  
  /**
    The step to jump to if the responseCriterion evaluates to YES
    (if the step evaluates to NO, the next criterion-step pair will be tested)
  */
  step: SC.Record.toOne('Smartgraphs.ActivityStep')

}) ;
