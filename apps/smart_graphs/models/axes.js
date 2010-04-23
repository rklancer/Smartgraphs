// ==========================================================================
// Project:   SmartGraphs.Axes
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals SmartGraphs */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
SmartGraphs.Axes = SC.Record.extend(
/** @scope SmartGraphs.Axes.prototype */ {

  // TODO: Add your own code here.

  // obviously (?) this can be factored into two Axis objects!
  
  xMax: SC.Record.attr(Number),
  xMin: SC.Record.attr(Number),
  yMax: SC.Record.attr(Number),
  yMin: SC.Record.attr(Number),
  yScale: SC.Record.attr(Number),
  xScale: SC.Record.attr(Number)
}) ;
