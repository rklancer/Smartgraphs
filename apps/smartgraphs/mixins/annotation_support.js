// ==========================================================================
// Project:   Smartgraphs.AnnotationSupport
// Copyright: ©2010 Concord Consortium
// @author    Parker Morse <pmorse@cantinaconsulting.com>
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
    Add an annotation to this controller
    
    @param {Smartgraphs.Annotation} annotation
      The annotation to be added.
  */
  addAnnotation: function (annotation) {
    if (this.findAnnotationByName(annotation.get('name'))) {
      return; // Nothing to be done
    }
    this.get('annotationList').pushObject(annotation);
  },
  
  /** 
    Removes all annotations from the list. Sets the annotationList attribute to [] (therefore, also initializes the
    list if the value had previously been null).
  */
  clearAnnotations: function () {
    this.set('annotationList', []);
  },
  
  /**
    Remove the named annotation from this controller.
    
    @param {String} name
      The name of the annotation to be removed.
  */
  removeAnnotation: function (name) {
    var annotationList = this.get('annotationList');
    var annotation = this.findAnnotationByName(name);
    if (annotation) annotationList.removeObject(annotation);
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
  }

};
