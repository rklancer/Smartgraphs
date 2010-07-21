// ==========================================================================
// Project:   Smartgraphs.Graph
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.Graph = SC.Record.extend(
/** @scope Smartgraphs.Graph.prototype */ {

  name: SC.Record.attr(String),
  description: SC.Record.attr(String),
  
  axes: SC.Record.toOne('Smartgraphs.Axes'),
  allSeries: SC.Record.toMany('Smartgraphs.DataSeries')

}) ;