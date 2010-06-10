// ==========================================================================
// Project:   Smartgraphs.StaticAnnotation
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.StaticAnnotation = SC.Record.extend(
/** @scope Smartgraphs.StaticAnnotation.prototype */ {

  type: SC.Record.attr(String),
  points: SC.Record.toMany(Smartgraphs.DataPoint)
}) ;
