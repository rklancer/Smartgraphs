// ==========================================================================
// Project:   Smartgraphs.LineToAxis
// Copyright: ©2010 Concord Consortium
// @author    Dr. Baba Kofi Weusijana <kofi@edutek.net>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  // TODO: Finish the description of this class

  @extends Smartgraphs.HighlightedPoint
  @version 0.1
*/

sc_require('models/annotation');
sc_require('models/highlighted_point');
sc_require('views/line_to_axis');

Smartgraphs.LineToAxis = Smartgraphs.HighlightedPoint.extend(
/** @scope Smartgraphs.LineToAxis.prototype */ {
  

});

// let the graph view know how to instantiate a view class to display this item
Smartgraphs.LineToAxis.viewClass = Smartgraphs.LineToAxisView;
