// ==========================================================================
// Project:   Smartgraphs.LabelAnnotation
// Copyright: ©2011 Concord Consortium
// Author:    Parker Morse <pmorse@cantinaconsulting.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/annotation');
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
    The position of the label is defined relative to the point it is associated with.
    This value (default 0) defines how far the center of the label should be offset 
    horizontally from the x-value of the associated point; negative values will move 
    the label left, and positive values will move it right.
    
    @property {String}
  */
  xOffset: SC.Record.attr(Number, { defaultValue: 0 }),
  
  /**
    The position of the label is defined relative to the point it is associated with.
    This value (default 10) defines how far the center of the label should be offset 
    vertically from the y-value of the associated point; negative values will move 
    the label up, and positive values will move it down.
    
    @property {String}
  */
  yOffset: SC.Record.attr(Number, { defaultValue: -15 }),
  
  /** 
    The pixel size of the label type.
    
    @property {Number}
  */
  size: SC.Record.attr(Number, { defaultValue: 15 })

}) ;

// let the graph view know how to instantiate a view class to display this item
Smartgraphs.LabelAnnotation.viewClass = Smartgraphs.LabelAnnotationView;
