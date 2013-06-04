// ==========================================================================
// Project:   Smartgraphs.RunBracket
// Copyright: ©2011 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document your Model here)

  @extends Smartgraphs.BracketArc
  @version 0.1
*/
Smartgraphs.RunBracket = Smartgraphs.BracketArc.extend(
/** @scope Smartgraphs.RunBracket.prototype */ {

  isLeftOfColumn: YES,

  /**
    Calculate item1Index and item2Index from (p1, p2). This uses "slope tool order" in which arrows are drawn from the
    leftmost to the rightmost point. When 'points' is rdered by x-value, this means item1Index is
    the lesser of the indices of p1 and p2 in the points array of the dataset containing p1 and p2; and item2Index is
    the greater of the indices of p1 and p2
  */
  calculateIndicesFromPoints: function (p1, p2) {
    var items = sc_super();

    return {
      item1Index: Math.min(items.item1Index, items.item2Index),
      item2Index: Math.max(items.item1Index, items.item2Index)
    };
  }

});
