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
    The first of the two points which define (but do not limit) the line.
    
    @property {Smartgraphs.DataPoint}
  */
  p1: Smartgraphs.Tag.pointFromTag('p1Record', 'p1Tag'),

  /**
    The second of the two points which define (but do not limit) the line.
    
    @property {Smartgraphs.DataPoint}
  */
  p2: Smartgraphs.Tag.pointFromTag('p2Record', 'p2Tag'),
  
  /**
    
    @property {Smartgraphs.DataPoint}
  */
  p1Record: SC.Record.toOne('Smartgraphs.DataPoint'),
  
  /**
    
    @property {Smartgraphs.DataPoint}
  */
  p2Record: SC.Record.toOne('Smartgraphs.DataPoint'),

  /**
    Optional Tag object which can be used to indirectly specify point 1
    (TODO: change this from a HighlightedPoint to a Tag)

    @property {Smartgraphs.Tag}
  */
  p1Tag: SC.Record.toOne('Smartgraphs.Tag'),

  /**
    Optional Tag object which can be used to indirectly specify point 2
    (TODO: change this from a HighlightedPoint to a Tag)

    @property {Smartgraphs.Tag}
  */
  p2Tag: SC.Record.toOne('Smartgraphs.Tag')

}) ;

// let the graph view know how to instantiate a view class to display this item
Smartgraphs.LineThroughPoints.viewClass = Smartgraphs.LineThroughPointsView;
