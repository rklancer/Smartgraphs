// ==========================================================================
// Project:   Smartgraphs.Axes
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.Axes = SC.Record.extend(
/** @scope Smartgraphs.Axes.prototype */ {
  
  xMin: SC.Record.attr(Number),
  xMax: SC.Record.attr(Number),
  xSteps: SC.Record.attr(Number),
  xLabel: SC.Record.attr(String),
  xLabelAbbreviated: SC.Record.attr(String),  
    
  yMin: SC.Record.attr(Number),
  yMax: SC.Record.attr(Number),
  ySteps: SC.Record.attr(Number),
  yLabel: SC.Record.attr(String),
  yLabelAbbreviated: SC.Record.attr(String)

}) ;