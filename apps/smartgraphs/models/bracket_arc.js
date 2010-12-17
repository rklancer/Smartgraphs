// ==========================================================================
// Project:   Smartgraphs.BracketArc
// Copyright: ©2010 Concord Consortium
// @author    Parker Morse <pmorse@cantinaconsulting.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/annotation');
sc_require('views/bracket_arc');

/** @class

  A BracketArc is an annotation which creates an arc, with arrowheads at both ends,
  between two designated points.
  
  At initial creation, the designated points are literal coordinates, either contextual
  (i.e. relative to provided axes) or literal, but the model could be expanded to extract
  the start and end from other annotations.
  
  Although the model has "start" and "end" points, the bracket itself is not directional,
  i.e. it has arrowheads at both ends.

  @extends Smartgraphs.Annotation
  @version 0.1
*/
Smartgraphs.BracketArc = Smartgraphs.Annotation.extend(
/** @scope Smartgraphs.BracketArc.prototype */ {

  /**
    The x-coordinate of the spot the bracket's path begins at.
    
    @property {Number}
  */
  startX: SC.Record.attr(Number),
  
  /**
    The y-coordinate of the spot the bracket's path begins at.
    
    @property {Number}
  */
  startY: SC.Record.attr(Number),
  
  /**
    The x-coordinate of the spot the bracket's path ends at.
    
    @property {Number}
  */
  endX: SC.Record.attr(Number),
  
  /**
    The y-coordinate of the spot the bracket's path ends at.
    
    @property {Number}
  */
  endY: SC.Record.attr(Number)

}) ;

// let the graph view know how to instantiate a view class to display this item
Smartgraphs.BracketArc.viewClass = Smartgraphs.BracketArcView;