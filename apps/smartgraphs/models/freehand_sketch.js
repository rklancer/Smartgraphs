// ==========================================================================
// Project:   Smartgraphs.FreehandSketch
// Copyright: ©2010 Concord Consortium
// Author:   Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/annotation');
sc_require('views/freehand_sketch');

/** @class

  A 'freehand sketch' annotation drawn on top of the graph. 
  
  Note that, unlike a standard Dataset, a sketch consists of an *ordered* list of x,y pairs; also, we don't expect
  to need to reference individual points that make up the sketch, so there's no need for a 'SketchPoints' model.

  @extends SC.Record
  @version 0.1
*/

Smartgraphs.FreehandSketch = Smartgraphs.Annotation.extend(
/** @scope Smartgraphs.FreehandSketch.prototype */ {
  
  /**
    Ordered array of {x, y} pairs that make up the sketch.
    
    @property {Smartgraphs.DataPoint[]}
  */
  points: SC.Record.attr(Array),

  /**
    Currently unused. Whether the sketch is considered 'directional'; i.e. should have an arrow.
    
    @property {Boolean}
  */
  isDirectional: SC.Record.attr(Boolean)
    
}) ;

// let the graph view know how to instantiate a view class to display this item
Smartgraphs.FreehandSketch.viewClass = Smartgraphs.FreehandSketchView;
