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
    The optional text label for the arrow.
    
    @property {String}
  */
  label: SC.Record.attr(String)
  
}) ;

// let the graph view know how to instantiate a view class to display this item
Smartgraphs.Arrow.viewClass = Smartgraphs.ArrowView;
