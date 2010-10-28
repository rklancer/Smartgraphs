// ==========================================================================
// Project:   Smartgraphs.Annotation
// Copyright: ©2010 Concord Consortium
// @author:   Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  'Abstract superclass' of all Annotation types.

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.Annotation = SC.Record.extend(
/** @scope Smartgraphs.Annotation.prototype */ {

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
    The activity this annotation is part of
  */
  activity: SC.Record.toOne('Smartgraphs.Activity'),
  
  /**
    the session this annotation is associated with, if any.
  */
  session: SC.Record.toOne('Smartgraphs.Session'),
  
  /**
    Whether this is an 'example' annotation (part of the authored content of the activity) or a session-scoped,
    student-drawn annotation
  */
  isExample: SC.Record.attr(Boolean)

}) ;
