// ==========================================================================
// Project:   Smartgraphs.BracketArc
// Copyright: ©2010-2011 Concord Consortium
// Author:    Parker Morse <pmorse@cantinaconsulting.com>
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/annotation');
sc_require('views/bracket_arc');

/** @class

  A BracketArc is an annotation which creates an arc, with arrowheads at both ends, between two designated items
  displayed on a table.
  
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
  item1Index: SC.Record.attr(Number),
  
  /**
    The index of the table item the bracket path's 
    
    @property {Number}
  */
  item2Index: SC.Record.attr(Number),

  /**
    Whether the arc is to be displayed to the left or right of the table columns it points to.
    
    @property {Boolean}
  */
  isLeftOfColumn: SC.Record.attr(Boolean)

}) ;

// let the graph view know how to instantiate a view class to display this item
Smartgraphs.BracketArc.viewClass = Smartgraphs.BracketArcView;