// ==========================================================================
// Project:   Smartgraphs.CircledPoint
// Copyright: ©2011 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/annotation');
sc_require('views/circled_point');

/** @class

  An annotation that highlights or 'calls out' a particular point on a graph.

  @extends Smartgraphs.Annotation
  @version 0.1
*/

Smartgraphs.CircledPoint = Smartgraphs.Annotation.extend(
/** @scope Smartgraphs.CircledPoint.prototype */ {

  /**
    x-value of the point to highlight
  */
  x: SC.Record.attr(Number),
  
  /**
    y-value of the point to highlight
  */
  y: SC.Record.attr(Number),
  
  /**
    Color of circle around the point
  */
  color: SC.Record.attr(String)
  
});

// let the graph view know how to instantiate a view class to display this item
Smartgraphs.CircledPoint.viewClass = Smartgraphs.CircledPointView;
