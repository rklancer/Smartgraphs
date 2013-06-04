// ==========================================================================
// Project:   Smartgraphs.LineToAxis
// Copyright: ©2010 Concord Consortium
// Author:    Dr. Baba Kofi Weusijana <kofi@edutek.net>
// ==========================================================================
/*globals Smartgraphs */


sc_require('models/annotation');
sc_require('views/line_to_axis');

/** @class

  // TODO: Finish the description of this class

 @extends Smartgraphs.HighlightedPoint
 @version 0.1
*/

Smartgraphs.LineToAxis = Smartgraphs.Annotation.extend(
  /** @scope Smartgraphs.LineToAxis.prototype */
{
  
  /**
    x-value of the data point that defines the line

    @property {Number}
  */
  x: Smartgraphs.Tag.valueFrom('pTag', 'x', 'xRecord'),

  /**
    x-value of the data point that defines the line

    @property {Number}
  */
  y: Smartgraphs.Tag.valueFrom('pTag', 'y', 'yRecord'),

  xRecord: SC.Record.attr(Number),
  yRecord: SC.Record.attr(Number),

  /**
    Optional Tag object which can be used to indirectly specify point 1

    @property {Smartgraphs.Tag}
  */
  pTag: SC.Record.toOne('Smartgraphs.Tag'),

  /**
   Whether the linePath should be hidden or not
  */
  shouldHideLinePath: SC.Record.attr(Boolean, {  defaultValue : NO }),

  /**
   Which axis to draw the linePath from the point to
  */
  axis: SC.Record.attr(String, {  defaultValue : "y" })

});

// let the graph view know how to instantiate a view class to display this item
Smartgraphs.LineToAxis.viewClass = Smartgraphs.LineToAxisView;
