// ==========================================================================
// Project:   Smartgraphs.HighlightedPoint
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  Highlight a particular point on the graph. This model should eventually encompass several kinds of highlight.
  
  It is conceptually distinct from the highlight applied by default to the 'selected' point of a DatasetView;
  however, one might code a Smartgraphs step to add this annotation to a point after the user selects it.

  @extends Smartgraphs.Annotation
  @version 0.1
*/

sc_require('models/annotation');
sc_require('views/highlighted_point');

Smartgraphs.HighlightedPoint = Smartgraphs.Annotation.extend(
/** @scope Smartgraphs.HighlightedPoint.prototype */
{

  point: SC.Record.toOne('Smartgraphs.DataPoint')

});

// let the graph view know how to instantiate a view class to display this item
Smartgraphs.HighlightedPoint.viewClass = Smartgraphs.HighlightedPointView;
