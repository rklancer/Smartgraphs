// ==========================================================================
// Project:   Smartgraphs.RunArrow
// Copyright: ©2011 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/annotations/arrow');

/** @class

  A slope-tool "Run Arrow". By default run arrows are drawn horizontally to the rightmost of the two points p1 and p2,
  from the x-coordinate of the leftmost point.

  This policy can be changed by revising the calculateCoordinatesFromPoints method.

  The points can be specified by indirection from the Tag objects p1 and p2 (NOTE: Until tagging is implemented,
  we use HighlightedPoint annotations. Shortly we will put the indirection semantics into 'Tag' object and turn
  INTERACTIVE_SELECTION into a 'tagging tool', separating display (HighlightedPoint) from semantics (TaggedPoint).

  @extends Smartgraphs.Arrow
  @version 0.1
*/
Smartgraphs.RunArrow = Smartgraphs.Arrow.extend(
/** @scope Smartgraphs.RunArrow.prototype */ {

  /**
    Called by the base Arrow class to recalculate the (x1, y1) and (x2, y2) coordinates of this arrow when p1 and p2
    change. Currently, a "run arrow" is drawn horizontally between the x-coordinate of the leftmost point of (p1, p2)
    to the rightmost point of the pair.
  */
  calculateCoordinatesFromPoints: function (p1x, p1y, p2x, p2y) {
    var points = (p1x < p2x) ? { left: [p1x, p1y] , right: [p2x, p2y] } : { left: [p2x, p2y], right: [p1x, p1y] };

    return {
      x1: points.left[0],
      y1: points.right[1],
      x2: points.right[0],
      y2: points.right[1]
    };
  }

}) ;
