// ==========================================================================
// Project:   Smartgraphs.RiseArrow
// Copyright: ©2011 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/annotations/arrow');

/** @class

  A slope-tool "Rise Arrow". By default, rise arrows are drawn vertically from the leftmost of the two points p1 and p2,
  to the y-coordinate of the rightmost point.
  
  This policy can be changed by revising the recalculateStartAndEnd method.
  
  The points can be specified by indirection from the Tag objects p1 and p2 (NOTE: Until tagging is implemented, 
  we use HighlightedPoint annotations. Shortly we will put the indirection semantics into 'Tag' object and turn
  INTERACTIVE_SELECTION into a 'tagging tool', separating display (HighlightedPoint) from semantics (TaggedPoint).

  @extends Smartgraphs.Arrow
  @version 0.1
*/
Smartgraphs.RiseArrow = Smartgraphs.Arrow.extend(
/** @scope Smartgraphs.RiseArrow.prototype */ {
  
  /**
    Called by the base Arrow class to recalculate the (x1, y1) and (x2, y2) coordinates of this arrow when p1 and p2
    change. Currently, a "rise arrow" is drawn vertically between the leftmost point of (p1, p2) and the y-coordinate 
    of the rightmost point of the pair.
    
    FIXME: This policy is reimplemented in a different context in the 'slopeToolOrder' expression in the evaluator
  */
  calculateCoordinatesFromPoints: function (p1, p2) {    
    var p1x = p1.get('x'),
        p2x = p2.get('x'),
        points = (p1x < p2x) ? { left: p1, right: p2 } : { left: p2, right: p1 };
    
    return {
      x1: points.left.get('x'),
      y1: points.left.get('y'),
      x2: points.left.get('x'),
      y2: points.right.get('y')
    };
  }
  
}) ;
