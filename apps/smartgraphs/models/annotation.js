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

  Each instance of an Annotation subclass represents either an 'example' annotation or a 'session-scoped' annotation.
  'Example' annotations (those with isExample == YES) are created by the activity author when the activity is
  designed. Typical uses of such annotations would be to highlight a pre-chosen portion of a graph as part of a hint
  or tutorial within an activity. 'Session-scoped' annotations, by contrast, are created during a run of the
  activity. Thus session-scoped annotations can be created from student input. Moreover, restarting an activity
  creates a new session; thus annotations can safely be referenced by name within an activity, without the worry 
  that one student's annotations will overwrite another student's annotations.
  
  Within an activity document, annotations are referenced by type (i.e., class) and name. This allows the serialized
  form of an activity to reference specific annotation objects using any human readable name the author chooses to
  think up. Although the name of an annotation should normally be unique within an activity, a session-scoped
  annotation with a given type and name, if it exists in the current session, will be used in preference to any
  example annotation with the same type and name.
  
  Typically, Smartgraph commands should use the addObjectByName method of a GraphController instance to add an
  annotation to the graph. The addObjectByName method will find the specified annotation within the current session 
  if possible, or else within the set of example annotations associated with the current activity.

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
    "Walk like a duck." All Annotation subclasses have isAnnotation == YES.
    
    @property {Boolean}
  */
  isAnnotation: YES,
  
  /**
    Whether this is an 'example' annotation (part of the authored content of the activity) or a session-scoped
    (and perhaps student-drawn) annotation.
    
    @property {Boolean}
  */
  isExample: SC.Record.attr(Boolean),
  
  /**
    Name of the annotation. This should be unique within a Session or Activity.
    
    @property {String}
  */
  name: SC.Record.attr(String),
  
  /**
    If the annotation is an example annotation, the activity this annotation is associated with. (Different activities
    are free to have example annotations with the same name; but a given activity should have only one example
    annotation with a given name.)
    
    @property {Smartgraphs.Activity}
  */
  activity: SC.Record.toOne('Smartgraphs.Activity'),
  
  /**
    If the annotation is a session-scoped annotation, the session this annotation is associated with. The name of an
    annotation should be unique within an activity. However, multiple "runs" of the same activity within a single 
    browser session (which is to say, multiple Smartgraph sessions) will naturally contain annotations that share a 
    name. The session disambiguates the Annotation records so that only the Annotation associated with the current
    "run" of the activity is called up when it is requested by name.
    
    A session-scoped annotation with a given type and name, if it exists in the current session, will be used in 
    preference to any example annotation with the same type and name.
    
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
