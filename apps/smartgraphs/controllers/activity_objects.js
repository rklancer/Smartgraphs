// ==========================================================================
// Project:   Smartgraphs.activityObjectsController
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  This controller maintains a registry of the names of all "activity objects" associated with the current activity
  session.(Right now, "activity objects" means the datasets and annotations associated with an activity.)
  
  This controller handles:
    (a) loading the initial set of datasets and annotations (those defined in the activity document) into the session
    (b) dynamically creating new datasets or annotations and associating them with the current session
    (c) finding datasets and annotations by name in the current session
    (d) maintaining an observable list of dataset and annotation names in the current session
  
  This controller has some complexity because there are a number of Annotation subclasses, and there is no way to
  create a RecordArray backed by a query for all Annotations subtype instances associated with the current activity.

  @extends SC.Controller
*/
Smartgraphs.activityObjectsController = SC.Controller.create(
/** @scope Smartgraphs.activityObjectsController.prototype */ {
  
  /**
    @private
    
    All annotations available to the activity session, indexed by name.
  */
  _annotations: {},
  
  /**
    @private
    
    All datasets available to the activity session, indexed by name.
  */
  _datasets: {},
  
  /**
    When an activity session is started, call this method to populate the registry of dataset and annotation with
    those predefined the activity document (all other datasets and annotations will be removed from the registry).
  */
  loadPredefinedObjects: function () {
    this._datasets = {};
    this._annotations = {};
    
    var activity = Smartgraphs.activityController.get('activityRecordInCurrentStore');
    if (activity) {
      var query = SC.Query.local(Smartgraphs.Dataset, 'activity={activity}', {
        activity: activity
      });
      var foundDatasets = Smartgraphs.store.find(query);
    
      if ( !(foundDatasets.get('status') & SC.Record.READY)) {
        throw "predefined dataset records are not READY!";
      }
      var self = this;
      foundDatasets.forEach(function (dataset) {
        var name = dataset.get('name');
        if (self._datasets[name]) {
          throw "The activity contains multiple datasets named '%@'".fmt(name);
        }
        if (dataset.get('session')) {
          throw "The predefined dataset '%@' was incorrectly annotated with a session!".fmt(name);
        }
        self._datasets[name] = dataset;
      });
    
      // now, repeat the above for each annotation type...
    
      Smartgraphs.Annotation.types.forEach(function (type) {
        query = SC.Query.local(type, 'activity={activity}', {
          activity: Smartgraphs.activityController.get('activityRecordInCurrentStore')
        });
        var foundAnnotations = Smartgraphs.store.find(query);
      
        if ( !(foundAnnotations.get('status') & SC.Record.READY)) {
          throw "predefined %@ records are not READY!".fmt(type);
        }

        foundAnnotations.forEach(function (annotation) {
          var name = annotation.get('name');
          if (self._annotations[name]) {
            throw "The activity contains multiple datasets named '%@'".fmt(name);
          }
          if (annotation.get('session')) {
            throw "The predefined annotation '%@' was incorrectly annotated with a session!".fmt(name);
          }
          self._annotations[name] = annotation;
        });
      });
    }
    
    this.notifyPropertyChange('datasetNames');
    this.notifyPropertyChange('annotationNames');
  },
  
  /**
    Returns the dataset with the given name in the current activity session, or undefined if the specified name does
    not correspond to a dataset in the current activity session.

    @param name The name of the dataset.
    
    @returns {Smartgraphs.Dataset|undefined}
  */
  findDataset: function (name) {
    return this._datasets[name];
  },
  
  /**
    Returns the annotation with the given name in the current activity session, or undefined if the specified name
    does not correspond to an annotation in the current activity session.

    @param name The name of the annotation.
    
    @returns {Smartgraphs.Annotation|undefined}
  */
  findAnnotation: function (name) {
    return this._annotations[name];
  },
  
  /**
    Create a dataset in the current activity session. This is the canonical way to create a dataset.
    
    It is a runtime error to call this method with the name of a dataset that has already been defined in the current
    session.
    
    @param name 
      The name to give to the newly created dataset.

    @returns {Smartgraphs.Dataset}
      The newly created datatset
  */
  createDataset: function (name) {
    if (this._datasets[name]) {
      throw "The activity tried to create a dataset with name %@, which is already in use.".fmt(name);
    }
    
    var dataset = Smartgraphs.store.createRecord(Smartgraphs.Dataset, { 
      activity: Smartgraphs.activityController.get('id'),
      name: name,
      points: []
    });
    dataset.set('id', Smartgraphs.getNextGuid());
    
    this._datasets[name] = dataset;
    this.notifyPropertyChange('datasetNames');
    return dataset;
  },
  
  
  /**
    Create an annotation in the current activity session.
    
    It is a runtime error to call this method with the name of an annotation that has already been defined in the 
    current session.
    
    @param {SC.Annotation} type 
      Annotation subclass to create
    @param {String} name 
      The name to give to the newly  the annotation to create
    @param {Object} attributes
      Hash of attributes to pass to SC.Record.create when creating the annotation record. (This implies that related
      objects must be specified by id in the attributes hash.)
    
    @returns {Smartgraphs.Annotation}
      The newly created annotation
  */
  createAnnotation: function (type, name, attributes) {
    if (this._annotations[name]) {
      throw "The activity tried to create an annotation with name %@, which is already in use.".fmt(name);
    }
    
    var annotation = Smartgraphs.store.createRecord(type, SC.mixin({
      activity: Smartgraphs.activityController.get('id'),
      name: name
    }, attributes));
    annotation.set('id', Smartgraphs.getNextGuid());
    
    var session = Smartgraphs.sessionController.get('content');
    if (session) annotation.set('session', session);
    
    this._annotations[name] = annotation;
    this.notifyPropertyChange('annotationNames');
    return annotation;
  },
  
  /**
    @property {SC.Array} datasetNames      

    Observable list of the names of all datasets defined in the current activity session. (Observers are notified 
    whenever datasets are added or removed from this list.)
  */
  datasetNames: function () {
    var names = [];
    for (var name in this._datasets) {
      if (this._datasets.hasOwnProperty(name)) names.push(name);
    }
    return names;
  }.property(),
  
  /**
    @property {SC.Array} annotationNames
    
    Observable list of the names of all annotations defined in the current activity session. (Observers are notified 
    whenever annotations are added or removed from this list.)
  */
  annotationNames: function () {
    var names = [];
    for (var name in this._annotations) {
      if (this._annotations.hasOwnProperty(name)) names.push(name);
    }
    return names;
  }.property()
  
}) ;
