// ==========================================================================
// Project:   Smartgraphs.HighlightedPoint
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/annotation');
sc_require('views/highlighted_point');

/** @class

  An annotation that highlights or 'calls out' a particular point on a graph. This model will eventually encompass 
  several visual styles for the highlight. Currently it displays a circle around the point.
  
  It is conceptually distinct from the highlight applied by default to the 'selected' point of a DatasetView.

  @extends Smartgraphs.Annotation
  @version 0.1
*/

Smartgraphs.HighlightedPoint = Smartgraphs.Annotation.extend(
/** @scope Smartgraphs.HighlightedPoint.prototype */
{

  /**
    The point being highlighted.
    
    @property {Smartgraphs.DataPoint}
  */
  point: SC.Record.toOne('Smartgraphs.DataPoint')

});

// let the graph view know how to instantiate a view class to display this item
Smartgraphs.HighlightedPoint.viewClass = Smartgraphs.HighlightedPointView;
