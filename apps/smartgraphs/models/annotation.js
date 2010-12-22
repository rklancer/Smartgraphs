// ==========================================================================
// Project:   Smartgraphs.Annotation
// Copyright: ©2010 Concord Consortium
// @author:   Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  This is the abstract superclass of all Annotation types. The various subclasses of Annotation have a corresponding
  'viewClass' property which identifies the SC.View class which is instantiated by the GraphView in order to view
  an instance of that annotation on a graph.
  
  Within an activity document, annotations are referenced by name. (In order to create a new annotation within the
  user's session, the document must also specify the annotation type to be created.) This allows the serialized form
  of an activity to reference specific annotation objects using any human readable name the author chooses.
  
  Annotations names are unique within an activity; it is a runtime error to create two annotations with the same name
  during a single user session. The authoring tool will enforce this restriction before allowing an activity to be
  published, so that such runtime errors should not be encountered in practice.
  
  Annotations can also be associated with sessions so that it is possible to save a user's session, and to analyze
  which annotations were created within a particular session.

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.Annotation = SC.Record.extend(
/** @scope Smartgraphs.Annotation.prototype */ {

  /**
    The primary key of an Annotation record is technically its url. However, annotations are referenced by type
    and name within the serialized format of an activity.
    
    @property {String}
  */
  url: SC.Record.attr(String),
  primaryKey: 'url',
  
  /**
    "Walk like a duck." All instances of Annotation subclasses have isAnnotation == YES.
    
    @property {Boolean}
  */
  isAnnotation: YES,
  
  /**
    Name of the annotation. This should be unique within a Session or Activity.
    
    @property {String}
  */
  name: SC.Record.attr(String),
  
  /**
    The activity this annotation is associated with. (Two or more different activities are free to have annotations
    that share a given name; but a given activity should have only one annotation with a given name.)
    
    @property {Smartgraphs.Activity}
  */
  activity: SC.Record.toOne('Smartgraphs.Activity'),
  
  /**
    The session this annotation is associated with. (When a user begins running an activity, any new annotations
    created during the run of the activity, and any modifications to annotations pre-defined by the author, are 
    buffered to a nested data store. When the user's session state is saved, the new or modified annotations are
    uploaded to the server, and the buffered changes are dropped.)
    
    @property {Smartgraphs.Session}
  */
  session: SC.Record.toOne('Smartgraphs.Session'),

  /**
    Color with which to draw the annotation. Defaults to #cc0000, which is red.
    
    @property {String} 
   */
  color: SC.Record.attr(String, { defaultValue: '#cc0000' }),
  
  /**
    If this annotation is highlighted.
    
    @property {Boolean}
  */
  isHighlighted: SC.Record.attr(Boolean, { defaultValue: false })

}) ;

// FIXME what is the jsdoc for "class property"?

/**
  A list of all Annotation subtypes
*/
Smartgraphs.Annotation.types = [];

/**
  The names of all Annotation subtypes
*/
Smartgraphs.Annotation.typeNames = [];
