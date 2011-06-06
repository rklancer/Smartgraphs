// ==========================================================================
// Project:   Smartgraphs.HighlightedPoint
// Copyright: ©2010 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/annotation');
sc_require('views/highlighted_segment');

/** @class

  Highlight a segment (set of consecutive points) on the graph.

  @extends Smartgraphs.Annotation
  @version 0.1
*/

Smartgraphs.HighlightedSegment = Smartgraphs.Annotation.extend(
/** @scope Smartgraphs.HighlightedSegment.prototype */
{

  /**
    ManyArray of {x, y} pairs that make up the segment to be highlighted, automatically ordered by 'x' property.
    
    @property {Smartgraphs.DataPoint}
  */
  points: SC.Record.toMany('Smartgraphs.DataPoint', { orderBy: 'x'})

});

// let the graph view know how to instantiate a view class to display this item
Smartgraphs.HighlightedSegment.viewClass = Smartgraphs.HighlightedSegmentView;
