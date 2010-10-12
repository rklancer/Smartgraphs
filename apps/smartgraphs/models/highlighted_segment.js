// ==========================================================================
// Project:   Smartgraphs.HighlightedPoint
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  Highlight a particular segment of points on the graph.

  @extends Smartgraphs.Annotation
  @version 0.1
*/

sc_require('models/annotation');
sc_require('models/data_point');
sc_require('views/highlighted_segment');

Smartgraphs.HighlightedSegment = Smartgraphs.Annotation.extend(
/** @scope Smartgraphs.HighlightedSegment.prototype */
{

  /**
    ordered array of {x, y} pairs that make up the segment to be highlighted.
  */
  points: SC.Record.toMany('Smartgraphs.DataPoint',{orderBy: 'x'})

});

// let the graph view know how to instantiate a view class to display this item
Smartgraphs.HighlightedSegment.viewClass = Smartgraphs.HighlightedSegmentView;
