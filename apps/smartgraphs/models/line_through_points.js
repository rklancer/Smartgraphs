// ==========================================================================
// Project:   Smartgraphs.LineThroughPoints
// Copyright: ©2010 Concord Consortium
// @author    Parker Morse <pmorse@cantinaconsulting.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  A line through the entire graph, passing through two given points and extending to the borders
  of the graph canvas in either direction.

  @extends Smartgraphs.Annotation
  @version 0.1
*/

sc_require('models/annotation');
sc_require('models/data_point');
sc_require('views/line_through_points');

Smartgraphs.LineThroughPoints = Smartgraphs.Annotation.extend(
/** @scope Smartgraphs.LineThroughPoints.prototype */ {

  /**
    The first of the two points which define (but do not limit) the line.
    
    @property {Smartgraphs.DataPoint}
  */
  point1: SC.Record.toOne('Smartgraphs.DataPoint'),

  /**
    The second of the two points which define (but do not limit) the line.
    
    @property {Smartgraphs.DataPoint}
  */
  point2: SC.Record.toOne('Smartgraphs.DataPoint')

}) ;

// let the graph view know how to instantiate a view class to display this item
Smartgraphs.LineThroughPoints.viewClass = Smartgraphs.LineThroughPointsView;
