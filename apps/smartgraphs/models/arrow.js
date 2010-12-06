// ==========================================================================
// Project:   Smartgraphs.Arrow
// Copyright: ©2010 Concord Consortium
// @author    Parker Morse <pmorse@cantinaconsulting.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/annotation');
sc_require('models/data_point');
sc_require('views/arrow');

/** @class

  Arrow is an Annotation which, given two points, shows a line between those points, with an
  arrowhead on the side of the second point, and an optional text label. 

  @extends Smartgraphs.Annotation
  @version 0.1
*/
Smartgraphs.Arrow = Smartgraphs.Annotation.extend(
/** @scope Smartgraphs.Arrow.prototype */ {

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
    Should this arrow run directly from point1 to point2, or should it represent only
    a horizontal vector of that movement?
    
    If true, the arrow will be drawn from point1 horizontally to a point directly below
    point2.
    
    Default value is false.
    
    @property {Boolean}
  */
  isHorizontal: SC.Record.attr(Boolean, { defaultValue: false } ),
  
  /** 
    Should this arrow run directly from point1 to point2, or should it represent only
    a vertical vector of that movement?
    
    If true, the arrow will be drawn from a point level with point1, vertically to point2.
    
    isHorizontal and isVertical should not both be true. If the value of isHorizontal
    is true, this value will be assumed false even if it is true.
    
    Default value is false.
    
    @property {Boolean}
  */
  isVertical: SC.Record.attr(Boolean, { defaultValue: false } ),
  
  /** 
    If this arrow is horizontal or vertical, it must be drawn to a third point, the vertex shared by point1 & point2.
    But there are two vertices to choose from. This specifies which vertex. There are two possibilities: if the vertex
    is such that an arrow were drawn from point1 to the vertex, and another arrow were drawn from the vertex to point2, 
    and the resulting arrows form a clockwise figure, this setting should be YES. Otherwise it is NO (the
    counterclockwise case.)
    
    See ArrowAnnotation.png in the docs/ folder  

    @property {Boolean}
  */
  isClockwise: SC.Record.attr(Boolean, { defaultValue: false }),
  
  /**
    The optional text label for the arrow.
    
    @property {String}
  */
  label: SC.Record.attr(String)
  
}) ;

// let the graph view know how to instantiate a view class to display this item
Smartgraphs.Arrow.viewClass = Smartgraphs.ArrowView;
