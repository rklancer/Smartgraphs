// ==========================================================================
// Project:   Smartgraphs.RiseRunArrows
// Copyright: ©2010 Concord Consortium
// @author    Parker Morse <pmorse@cantinaconsulting.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/annotation');
sc_require('models/data_point');
// sc_require('views/rise_run_arrows');

/** @class

  RiseRunArrows is an Annotation which, given two points, shows a vertical arrow ("rise") and
  a horizontal arrow ("run") to highlight those components of slope. 
  
  Visually, the two DataPoints of the annotation are considered to define the hypotenuse of a
  right triangle. The arrows are drawn to show the right angle of that triangle, using a vertex
  calculated from the X coordinate of one point and the Y coordinate of the other point.
  
  The arrows may appear above or below the hypotenuse, depending on the order in which the points
  are provided on annotation creation.

  @extends Smartgraphs.Annotation
  @version 0.1
*/
Smartgraphs.RiseRunArrows = Smartgraphs.Annotation.extend(
/** @scope Smartgraphs.RiseRunArrows.prototype */ {

  /**
    The first of the two points which define the hypotenuse line.
    
    @property {Smartgraphs.DataPoint}
  */
  point1: SC.Record.toOne('Smartgraphs.DataPoint'),

  /**
    The second of the two points which define the hypotenuse line.
    
    @property {Smartgraphs.DataPoint}
  */
  point2: SC.Record.toOne('Smartgraphs.DataPoint'),
  
  /** 
    The color of the vertical ("rise") line. Uses the superclass color default if no specific
    color is provided.
    
    @property {String}
  */ 
  riseColor: SC.Record.attr(String, { defaultValue: '#cc0000' }),
  
  /** 
    The color of the horizontal ("run") line. Uses the superclass color default if no specific
    color is provided.
    
    @property {String}
  */ 
  runColor: SC.Record.attr(String, { defaultValue: '#cc0000' }),

  /** 
    The third vertex of the right triangle, calculated from point1 and point2.
    Uses the "x" of point2 and the "y" of point1, so the triangle will be below the line if point1
    is to the left of point2, and above the line if point1 is to the right of point2.
    
    @property {Smartgraphs.DataPoint}
  */
  vertex: function() {
    var v = Smartgraphs.DataPoint.create();
    v.set('x', this.point2.get('x'));
    v.set('y', this.point1.get('y'));
    return v;
  }.property().cacheable()

}) ;
