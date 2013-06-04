// ==========================================================================
// Project:   Smartgraphs.Annotation
// Copyright: ©2010 Concord Consortium
// Author:   Richard Klancer <rpk@pobox.com>
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

    If null or undefined, the annotation is considered anonymous. Such annotations are useful when they are managed by
    a collection annotation, e.g, an arbitrary number of nameless Labels can be managed by a single LabelSet
    annotation, which is named. That way an author can allow the user to create an arbitrary number of labels in one
    step, and cause those labels to show up in a later step (by specifying the LabelSet's name) without having to
    predecide either the number of inidividual nor their individual names.

    @property {String}
  */
  name: SC.Record.attr(String),

  /**
    The activity this annotation is associated with. (Two or more different activities are free to have annotations
    that share a given name; but a given activity should have only one annotation with a given name.)

    @property {Smartgraphs.Activity}
  */
  activity: SC.Record.toOne('Smartgraphs.Activity', { aggregate: YES } ),

  /**
    Color with which to draw the annotation. Defaults to #cc0000, which is red.

    @property {String}
   */
  color: SC.Record.attr(String, { defaultValue: '#cc0000' }),

  /**
    If this annotation is highlighted.

    @property {Boolean}
  */
  isHighlighted: SC.Record.attr(Boolean, { defaultValue: false }),

  /**
    View class to instantiate to represent this anotation. Should be falsy for annotations which don't require a view
    to be instantiated (e.g., property-override annotations).

    The default value is the 'viewClass' class property of this annotation's Annotation subclass.

    @property
  */
  viewClass: function () {
    return this.constructor.viewClass;
  }.property()

}) ;

// FIXME what is the jsdoc for "class property"?

(function () {

  var types = null;
  var typeNames = null;

  function findTypes() {
    types = [];
    typeNames = [];
    for (var prop in Smartgraphs) {
      if (Smartgraphs.hasOwnProperty(prop) && Smartgraphs[prop] && Smartgraphs[prop].isClass && prop !== 'Annotation' && SC.kindOf(Smartgraphs[prop], Smartgraphs.Annotation)) {
        types.push(Smartgraphs[prop]);
        typeNames.push(prop);
      }
    }
  }

  /**
    Returns a list of all Annotation subtypes. Value is calculated the first time this function or Smartgraphs.Annotation.typeNames is is called, and cached thereafter.
  */
  Smartgraphs.Annotation.types = function () {
    if (!types) findTypes();
    return types;
  };

  /**
    Returns a list of the names of all Annotation subtypes. Value is calculated the first time this function or Smartgraphs.Annotation.types is is called, and cached thereafter.
  */
  Smartgraphs.Annotation.typeNames = function () {
    if (!typeNames) findTypes();
    return typeNames;
  };

}());
