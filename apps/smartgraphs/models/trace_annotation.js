// ==========================================================================
// Project:   Smartgraphs.TraceAnnotation
// Copyright: ©2010 Concord Consortium
// @author:   Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  A 'trace' annotation drawn on top of the graph. 
  
  Note that, unlike a standard DataSeries, a trace consists of an *ordered* list of x,y pairs; also, we don't expect
  to need to reference individual points that make up the trace, so there's no need for a 'TracePoints' model.

  @extends SC.Record
  @version 0.1
*/

sc_require('views/trace_annotation');

Smartgraphs.TraceAnnotation = SC.Record.extend(
/** @scope Smartgraphs.TraceAnnotation.prototype */ {

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
  isExample: SC.Record.attr(Boolean),    // might make sense as a transient property  
  
  /**
    ordered array of {x, y} pairs that make up the trace.
  */
  points: SC.Record.attr(Array),

  /**
    whether the trace is considered 'directional'; ie proceeds from beginning to end the points list and should have an arrow
  */
  isDirectional: SC.Record.attr(Boolean)
    
}) ;

// let the 
Smartgraphs.TraceAnnotation.viewClass = Smartgraphs.TraceAnnotationView;

