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

  initMixin: function () {
    // { <targetGuid>: 
    //    { <targetPropertyName>: [ { source: <source>, sourceProperty: <sourcePropertyName> }, {...}, ... ],
    //      <targetPropertyName>: [ { source: <source>, sourceProperty: <sourcePropertyName> }, {...}, ... ]
    //      ...
    //    },
    //   <targetGuid>: {
    //    ...
    //   }
    // }
    this._propertyOverridesByTarget = {};

    //  { <sourceGuid>: 
    //      { <targetObjectName>: <target>,
    //        <targetObjectName>: <target>
    //        ...
    //      }
    //    <sourceGuid>: {...}
    //    ...
    //  }
    this._propertyOverrideTargetsBySource = {};

    this.overrideQueuesByTarget = {};
  },
  
  /** 
    Walk like a duck.
  */
  supportsAnnotations: YES,
  
  /**
    The (static) annotations for this controller.
  */
  annotationList: null,

  /**
    @private
    Stubbable method to get an annotation given its name.
  */
  getAnnotation: function (name) {
    Smartgraphs.activityObjectsController.findAnnotation(name);
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

    var self = this;    
    var overrides = annotation.get('propertyOverrides') || [];
    overrides.forEach( function (override) {
      annotation.addObserver(override.targetObject, self, self._targetObjectDidChange);
      annotation.notifyPropertyChange(override.targetObject);
    });
    
    this.get('annotationList').pushObject(annotation);
  },
  
  _targetObjectDidChange: function (source, targetObjectName) {
    var sourceGuid = SC.guidFor(source);
    if (!this._propertyOverrideTargetsBySource[sourceGuid]) this._propertyOverrideTargetsBySource[sourceGuid] = {};
    var targets = this._propertyOverrideTargetsBySource[sourceGuid];
    
    var oldTarget = targets[targetObjectName];
    if (oldTarget) this._removeSourceFromTarget(source, oldTarget, targetObjectName);

    var newTarget = source && targetObjectName && source.get(targetObjectName);
    this._addSourceToTarget(source, newTarget, targetObjectName);
    targets[targetObjectName] = newTarget;
  },
  
  _removeSourceFromTarget: function (source, target, targetObjectName) {
    if (!target) return;

    var sourceGuid = SC.guidFor(source);
    
    // this source no longer points to the target
    delete this._propertyOverrideTargetsBySource[sourceGuid][targetObjectName];
    
    var targetGuid = SC.guidFor(target);
    var queue = this.get('overrideQueuesByTarget')[targetGuid];
    
    var currentOverrides = this._propertyOverridesByTarget[targetGuid];
    var self = this;
    
    // for each targetProperty in the target, remove source[sourceProperty] as a source
    source.get('propertyOverrides').forEach( function (overrideDef) {
      
      if (overrideDef.targetObject !== targetObjectName) return;
      
      var sources = currentOverrides[overrideDef.targetProperty];
      
      for (var i = 0; i < sources.length; i++) {
        if (sources[i].source === source) {
          
          // if we're the topmost source, 'change the guard': remove observer on us, add observer to newly-uncovered source
          if (i === sources.length - 1) {
            source.removeObserver(sources[i].sourceProperty, self, self._sourcePropertyDidChange);
            if (sources.length > 1) {
              sources[i-1].source.addObserver(sources[i-1].sourceProperty, self, self._sourcePropertyDidChange);
              self._sourcePropertyDidChange(sources[i-1].source, sources[i-1].sourceProperty);
            }
          }
          
          sources.splice(i, 1);
          break;
        }
      }
      
      // restore 'baseValue' if there are no sources left
      if (sources.length === 0) {
        queue.pushObject( { property: overrideDef.targetProperty, restoreBaseValue: YES } );
      }
    });
  },
  

  _addSourceToTarget: function (source, target, targetObjectName) {
    if (!target) return;
    
    var targetGuid = SC.guidFor(target);

    if (!this._propertyOverridesByTarget[targetGuid]) this._propertyOverridesByTarget[targetGuid] = {};
    var currentOverrides = this._propertyOverridesByTarget[targetGuid];
        
    var self = this;
    
    // for each targetProperty in the target, add source[sourceProperty] as a source
    source.get('propertyOverrides').forEach( function (overrideDef) {
      
      if (overrideDef.targetObject !== targetObjectName) return;

      if (!currentOverrides[overrideDef.targetProperty]) {
        currentOverrides[overrideDef.targetProperty] = [];
      }
      
      var sources = currentOverrides[overrideDef.targetProperty];
      
      // remove the old observer
      if (sources.length > 1) {
        var oldSource = sources[sources.length - 1].source;
        var oldSourceProperty = sources[sources.length - 1].sourceProperty;
        oldSource.removeObserver(oldSourceProperty, self, self._sourcePropertyDidChange);
      }
      
      // add us to the sources
      sources.push({ source: source, sourceProperty: overrideDef.sourceProperty });
      
      // add the new observer
      source.addObserver(overrideDef.sourceProperty, self, self._sourcePropertyDidChange);
      
      // and set the value
      self._sourcePropertyDidChange(source, overrideDef.sourceProperty);
    });
  },
  
  
  _sourcePropertyDidChange: function (source, sourcePropertyName) {

    // find target and targetProperty; update *VIEW* not target object
    var queues = this.get('overrideQueuesByTarget');
    
    source.get('propertyOverrides').forEach( function (overrideDef) {
      if (overrideDef.sourceProperty !== sourcePropertyName) return;
      
      var target = source.get(overrideDef.targetObject);
      var targetGuid = SC.guidFor(target);
      
      if (!queues[targetGuid]) {
        queues[targetGuid] = [];
      }
      
      queues[targetGuid].pushObject({ property: overrideDef.targetProperty, value: source.get(sourcePropertyName)});
    });
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
    Remove the named annotation from this controller.
    
    @param {String} name
      The name of the annotation to be removed.
  */
  removeAnnotation: function (name) {
    var annotation = this.findAnnotationByName(name);
    if (annotation) {
      var self = this;
      var overrides = annotation.get('propertyOverrides') || [];
      overrides.forEach( function (overrideDef) {
        self._removeSourceFromTarget(annotation, annotation.get(overrideDef.targetObject), overrideDef.targetObject);
        annotation.removeObserver(overrideDef.targetObject, self, self._targetObjectDidChange);
      });
      this.get('annotationList').removeObject(annotation);
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
  }
  
};
