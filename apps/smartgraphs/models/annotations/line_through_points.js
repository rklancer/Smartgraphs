// ==========================================================================
// Project:   Smartgraphs.LineThroughPoints
// Copyright: ©2010-2011 Concord Consortium
// Author:    Parker Morse <pmorse@cantinaconsulting.com>
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/tag');
sc_require('models/annotation');
sc_require('views/line_through_points');

/** @class

  A line through the entire graph, passing through two given points and extending to the borders
  of the graph canvas in either direction.

  @extends Smartgraphs.Annotation
  @version 0.1
*/

Smartgraphs.LineThroughPoints = Smartgraphs.Annotation.extend(
/** @scope Smartgraphs.LineThroughPoints.prototype */ {

  /**
    x-value of the first of the two points which define (but do not limit) the line.

    @property {Number}
  */
  x1: Smartgraphs.Tag.valueFrom('p1Tag', 'x', 'x1Record'),

  /**
    x-value of the first of the two points which define (but do not limit) the line.

    @property {Number}
  */
  y1: Smartgraphs.Tag.valueFrom('p1Tag', 'y', 'y1Record'),

  /**
    x-value of the first of the two points which define (but do not limit) the line.

    @property {Number}
  */
  x2: Smartgraphs.Tag.valueFrom('p2Tag', 'x', 'x2Record'),

  /**
    x-value of the first of the two points which define (but do not limit) the line.

    @property {Number}
  */
  y2: Smartgraphs.Tag.valueFrom('p2Tag', 'y', 'y2Record'),

  x1Record: SC.Record.attr(Number),
  y1Record: SC.Record.attr(Number),
  x2Record: SC.Record.attr(Number),
  y2Record: SC.Record.attr(Number),

  /**
    Optional Tag object which can be used to indirectly specify point 1

    @property {Smartgraphs.Tag}
  */
  p1Tag: SC.Record.toOne('Smartgraphs.Tag'),

  /**
    Optional Tag object which can be used to indirectly specify point 2

    @property {Smartgraphs.Tag}
  */
  p2Tag: SC.Record.toOne('Smartgraphs.Tag')

}) ;

// let the graph view know how to instantiate a view class to display this item
Smartgraphs.LineThroughPoints.viewClass = Smartgraphs.LineThroughPointsView;
