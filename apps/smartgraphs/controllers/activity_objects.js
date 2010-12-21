// ==========================================================================
// Project:   Smartgraphs.activityObjectsController
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  This controller handles creating and finding "activity objects" which are created during a user session, and which
  the various commands reference by name (where the name is chosen by and exposed to the activity author). So far this
  means datasets and annotations.
  
  This controller has some complexity because there are a number of Annotation subclasses, and there is no way to
  create a RecordArray backed by a query for all Annotations subtype instances associated with the current activity.

  @extends SC.Object
*/
Smartgraphs.activityObjectsController = SC.ObjectController.create(
/** @scope Smartgraphs.activityObjectsController.prototype */ {
  
  /**
    @private
    
    All annotations available to the user session, indexed by name.
  */
  _annotations: {},
  
  /**
    @private
    
    All datasets available to the user session, indexed by name.
  */
  _datasets: {},
  
  /**
    Sets the registry of dataset and annotation in this activity to be just those predefined in the activity document.
    (i.e., removes any datasets or annotations dynamically created in a run of the activity.
  */
  loadPredefinedObjects: function () {
    this._datasets = {};
    this._annotations = {};
      
    var query = SC.Query.local(Smartgraphs.Dataset, 'activity={activity}', {
      activity: Smartgraphs.activityController.get('activityRecordInCurrentStore')
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
    
    this.notifyPropertyChange('datasetNames');
    this.notifyPropertyChange('annotationNames');
  },
  
  findDataset: function (name) {
    return this._datasets[name];
  },
  
  findAnnotation: function (name) {
    return this._annotations[name];
  },
  
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
    Observable list of the names of all datasets available to the current activity. (Observers are notified whenever
    datasets are added or removed from this list.)
  */
  datasetNames: function () {
    var names = [];
    for (var name in this._datasets) {
      if (this._datasets.hasOwnProperty(name)) names.push(name);
    }
    return names;
  }.property(),
  
  /**
    Observable list of the names of all annotations available to the current activity. (Observers are notified 
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
