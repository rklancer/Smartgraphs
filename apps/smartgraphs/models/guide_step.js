// ==========================================================================
// Project:   Smartgraphs.GuideStep
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  A GuideStep represents a single step in a given guide page. Each Guide Page represents a recognizable 'chunk' of 
  work to be done, or one general question a user is being asked. Actually doing the work, or answering the question, 
  may take or may not take several steps.
  
  The point of breaking GuidePages down into GuideSteps is to allow GuideSteps to provide progressively more hints to 
  a learner, if they are needed, or to guide a user (author or learner) through several steps in a chunk of work, one
  at a time.
  
  (This hierarchical structure -- one Guide contains many Guide Pages, each of which contains several Guide Steps -- 
  seems to be generally useful.)
  
  I called these DialogTurns in an earlier version of Smartgraphs, but did not find that nomenclature congenial.
  
  @extends SC.Record
  @version 0.1
*/
Smartgraphs.GuideStep = SC.Record.extend(
/** @scope Smartgraphs.GuideStep.prototype */ {

  // TODO: Add your own code here.

}) ;
