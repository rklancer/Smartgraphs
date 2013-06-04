// ==========================================================================
// Project:   Smartgraphs.AnnotationSupport
// Copyright: ©2010-2011 Concord Consortium
// Author:    Parker Morse <pmorse@cantinaconsulting.com>
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  Common functionality for Smartgraphs controllers which support annotations.

*/

Smartgraphs.AnnotationSupport = {

  /**
    Walk like a duck.
  */
  supportsAnnotations: YES,

  /**
    The (static) annotations for this controller.
  */
  annotationList: null,


  /**
    Modifier annotations indexed by the (x, y, datadefName) they care about
  */
  modifiers: null,

  /**
    @private
    Stubbable method to get an annotation given its name.
  */
  getAnnotation: function (name) {
    return Smartgraphs.activityObjectsController.findAnnotation(name);
  },

  /**
    Add an annotation to this controller

    @param {Smartgraphs.Annotation} annotation
      The annotation to be added.
  */
  addAnnotation: function (annotation) {
    if (this.findAnnotationByName(annotation.get('name'))) {
      return; // Nothing to be done
    }
    this.get('annotationList').pushObject(annotation);

    if (annotation.get('isModifierAnnotation')) {
      this.didAddModifierAnnotation(annotation);
    }
  },

  /**
    Removes all annotations from the list. Sets the annotationList attribute to [] (therefore, also initializes the
    list if the value had previously been null).
  */
  clearAnnotations: function () {
    var self = this;
    var annotationNames = (this.get('annotationList') || []).getEach('name');

    annotationNames.forEach( function (annotationName) {
      self.removeAnnotation(annotationName);
    });
    this.set('annotationList', []);
  },

  /**
    Remove the annotation from this controller.

    @param {Smartgraphs.Annotation|String} annotationOrName
      The annotation, or name of the annotation, to remove.
  */
  removeAnnotation: function (annotationOrName) {
    var annotation = (SC.typeOf(annotationOrName) === SC.T_STRING) ? this.findAnnotationByName(annotationOrName) : annotationOrName;

    if (annotation) {
      this.get('annotationList').removeObject(annotation);
      if (annotation.get('isModifierAnnotation')) {
        this.didRemoveModifierAnnotation(annotation);
      }
    }
  },

  /**
    Given a valid annotation name, returns the named annotation. Returns null if the annotation
    is not found in this controller.

    @param {String} name
      The name under which to search for the annotation.
  */
  findAnnotationByName: function (name) {
    var list = this.get('annotationList');
    return list ? list.findProperty('name', name) : null;
  },

  addAnnotationsByName: function (annotations) {
    var self = this;

    if (!annotations) return;

    annotations.forEach( function (name) {
      self.addAnnotation(self.getAnnotation(name));
    });
  },

  didAddModifierAnnotation: function (annotation) {
    annotation.addObserver('x', this, this.updateModifiers);
    annotation.addObserver('y', this, this.updateModifiers);
    this.updateModifiers();
  },

  didRemoveModifierAnnotation: function (annotation) {
    annotation.removeObserver('x', this, this.updateModifiers);
    annotation.removeObserver('y', this, this.updateModifiers);
    this.updateModifiers();
  },

  updateModifiers: function () {
    var annotationList,
        modifiers = {},
        i,
        len,
        annotation,
        x,
        y,
        datadefName;

    annotationList = this.get('annotationList');

    if (this.unDimRepresentations) this.unDimRepresentations();

    for (i = 0, len = annotationList.get('length'); i < len; i++) {
      annotation = annotationList.objectAt(i);
      if (!annotation.get('isModifierAnnotation')) continue;

      x = annotation.get('x');
      y = annotation.get('y');
      datadefName = annotation.get('datadefName');

      modifiers[[x, y, datadefName]] = annotation;

      if (!SC.none(x) && !SC.none(y)) {
        if (this.dimRepresentation) this.dimRepresentation(datadefName);
      }

    }

    this.set('modifiers', modifiers);
  }

};
