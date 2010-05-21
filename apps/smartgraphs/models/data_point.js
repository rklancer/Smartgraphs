// ==========================================================================
// Project:   Smartgraphs.DataPoint
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.DataPoint = SC.Record.extend(
/** @scope Smartgraphs.DataPoint.prototype */ {
  series: SC.Record.toOne('Smartgraphs.DataSeries', {
    inverse: 'points' }),
  x: SC.Record.attr(Number),
  y: SC.Record.attr(Number)
}) ;
