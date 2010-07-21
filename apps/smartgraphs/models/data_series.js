// ==========================================================================
// Project:   Smartgraphs.DataSeries
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.DataSeries = SC.Record.extend(
/** @scope Smartgraphs.DataSeries.prototype */ {

  points: SC.Record.toMany('Smartgraphs.DataPoint', { inverse: 'series' } )

}) ;
