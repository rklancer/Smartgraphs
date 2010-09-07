// ==========================================================================
// Project:   Smartgraphs.DataSeries
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.DataSeries = SC.Record.extend(
/** @scope Smartgraphs.DataSeries.prototype */ {

  url: SC.Record.attr(String),
  primaryKey: 'url',
  
  name: SC.Record.attr(String),
  session: SC.Record.toOne('Smartgraphs.Session'),
  isExample: SC.Record.attr(Boolean),    // might make sense as a transient property  
  points: SC.Record.toMany('Smartgraphs.DataPoint', { inverse: 'series' } ),
  defaultDisplayType: SC.Record.attr(Number)   // LINE_GRAPH or SCATTER_PLOT

}) ;

Smartgraphs.DataSeries.LINE_GRAPH = 1;
Smartgraphs.DataSeries.SCATTER_PLOT = 2;
