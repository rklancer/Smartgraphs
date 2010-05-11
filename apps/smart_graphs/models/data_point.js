// ==========================================================================
// Project:   SmartGraphs.DataPoint
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals SmartGraphs */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
SmartGraphs.DataPoint = SC.Record.extend(
/** @scope SmartGraphs.DataPoint.prototype */ {
  series: SC.Record.toOne('SmartGraphs.DataSeries', {
    inverse: 'points' }),
  x: SC.Record.attr(Number),
  y: SC.Record.attr(Number)
}) ;
