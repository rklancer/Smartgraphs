// ==========================================================================
// Project:   Smartgraphs.FreehandSketch
// Copyright: ©2010 Concord Consortium
// @author:   Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  A 'freehand sketch' annotation drawn on top of the graph. 
  
  Note that, unlike a standard Dataset, a sketch consists of an *ordered* list of x,y pairs; also, we don't expect
  to need to reference individual points that make up the sketch, so there's no need for a 'SketchPoints' model.

  @extends SC.Record
  @version 0.1
*/

sc_require('models/annotation');
sc_require('views/freehand_sketch');

Smartgraphs.FreehandSketch = Smartgraphs.Annotation.extend(
/** @scope Smartgraphs.FreehandSketch.prototype */ {
  
  /**
    ordered array of {x, y} pairs that make up the sketch.
  */
  points: SC.Record.attr(Array),

  /**
    whether the sketch is considered 'directional'; ie proceeds from beginning to end the points list and should 
    have an arrow
  */
  isDirectional: SC.Record.attr(Boolean)
    
}) ;

// let the graph view know how to instantiate a view class to display this item
Smartgraphs.FreehandSketch.viewClass = Smartgraphs.FreehandSketchView;
