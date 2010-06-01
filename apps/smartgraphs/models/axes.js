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

  // TODO: Add your own code here.

  // obviously (?) this can be factored into two Axis objects!
  
  xMax: SC.Record.attr(Number),
  xMin: SC.Record.attr(Number),
  yMax: SC.Record.attr(Number),
  yMin: SC.Record.attr(Number),
  ySteps: SC.Record.attr(Number),
  xSteps: SC.Record.attr(Number)
}) ;
