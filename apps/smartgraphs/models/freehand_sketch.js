// ==========================================================================
// Project:   Smartgraphs.FreehandSketch
// Copyright: ©2010 Concord Consortium
// @author:   Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  A 'freehand sketch' annotation drawn on top of the graph. 
  
  Note that, unlike a standard DataSeries, a sketch consists of an *ordered* list of x,y pairs; also, we don't expect
  to need to reference individual points that make up the sketch, so there's no need for a 'SketchPoints' model.

  @extends SC.Record
  @version 0.1
*/

sc_require('views/freehand_sketch');

Smartgraphs.FreehandSketch = SC.Record.extend(
/** @scope Smartgraphs.FreehandSketch.prototype */ {

  url: SC.Record.attr(String),
  primaryKey: 'url',
  
  /**
    tell the system that we are an annotation.
  */
  isAnnotation: YES,
  
  /**
    name of the annotation
  */
  name: SC.Record.attr(String),
  
  /**
    the session this annotation is associated with, if any.
  */
  session: SC.Record.toOne('Smartgraphs.Session'),
  
  /**
    Whether this is an 'example' annotation (part of the authored content of the activity) or a session-scoped,
    student-drawn annotation
  */
  isExample: SC.Record.attr(Boolean),
  
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
