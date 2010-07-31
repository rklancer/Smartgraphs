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
  
  points: SC.Record.toMany('Smartgraphs.DataPoint', { inverse: 'series' } )

}) ;
