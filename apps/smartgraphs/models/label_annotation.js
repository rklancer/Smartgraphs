// ==========================================================================
// Project:   Smartgraphs.LabelAnnotation
// Copyright: ©2011 Concord Consortium
// @author    Parker Morse <pmorse@cantinaconsulting.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/annotation');
sc_require('models/data_point');
sc_require('views/label_annotation');

/** @class

  An annotation which displays a text label next to a data point. 

  @extends Smartgraphs.Annotation
  @version 0.1
*/
Smartgraphs.LabelAnnotation = Smartgraphs.Annotation.extend(
/** @scope Smartgraphs.LabelAnnotation.prototype */ {

  /**
    The point being labeled.
    
    @property {Smartgraphs.DataPoint}
  */
  point: SC.Record.toOne('Smartgraphs.DataPoint'),
  
  /**
    The text of the label being applied.
    
    @property {String}
  */
  label: SC.Record.attr(String),
  
  /** 
    The point size of the label type.
    
    @property {Number}
  */
  size: SC.Record.attr(Number)

}) ;

// let the graph view know how to instantiate a view class to display this item
Smartgraphs.LabelAnnotation.viewClass = Smartgraphs.LabelAnnotationView;
