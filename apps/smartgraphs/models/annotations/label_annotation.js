// ==========================================================================
// Project:   Smartgraphs.LabelAnnotation
// Copyright: ©2011 Concord Consortium
// Author:    Parker Morse <pmorse@cantinaconsulting.com>
// Author:    Richard Klancer <rpk@pobox.com>
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
    The x-value of the point being labeled.
    
    @property {Number}
  */
  x: SC.Record.attr(Number),
  
  /**
    The y-value of the point being labeled.
    
    @property {Number}
  */
  y: SC.Record.attr(Number),
  
  /**
    The text of the label being applied.
    
    @property {String}
  */
  text: SC.Record.attr(String),
  
  /**
    x-position of the lower left corner of the label, relative to the point the label is annotating.
    Note that this is measured in pixels.
    
    @property {Number}    
  */
  xOffset: SC.Record.attr(Number, { defaultValue: -100 }),
  
  /**
    y-position of the lower left corner of the label, relative to the point the label is annotating.
    Note that this is measured in pixels.
  
    @property {Number}
  */
  yOffset: SC.Record.attr(Number, { defaultValue: -40})

}) ;

// let the graph view know how to instantiate a view class to display this item
Smartgraphs.LabelAnnotation.viewClass = Smartgraphs.LabelAnnotationView;
