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
    All annotations available to the user session, indexed by name. Observable.
  */
  annotations: SC.Object.create(),
  
  /**
    All datasets avaiable to the user session, indexed by name. Observable.
  */
  datasets: SC.Object.create(),
  
  /**
    Call this when starting a session to set the list of annotations and datasets to those predefined by the activity
    document.
  */
  loadPredefinedObjects: function () {
    var datasets = SC.Object.create();
    var annotations = SC.Object.create();
    
    // FIXME it is probably more efficient to make this query a computed property of the activity
    var query = SC.Query.local(Smartgraphs.Dataset, 'activity={activity}', {
      activity: Smartgraphs.activityController.get('content')
    });
    var foundDatasets = Smartgraphs.store.find(query).refresh();
    
    if ( !(foundDatasets.get('status') & SC.Record.READY)) {
      throw "predefined dataset records are not READY!";
    }
    
    foundDatasets.forEach(function (dataset) {
      var name = dataset.get('name');
      if (datasets.get(name)) {
        throw "The activity contains multiple datasets named '%@'".fmt(name);
      }
      datasets.set(name, dataset);
    });
    
    // now, repeat the above for each annotation type...
    
    Smartgraphs.Annotation.types.forEach(function (type) {
      query = SC.Query.local(type, 'activity={activity}', {
        activity: Smartgraphs.activityController.get('content')
      });
      var foundAnnotations = Smartgraphs.store.find(query).refresh();
      
      if ( !(foundAnnotations.get('status') & SC.Record.READY)) {
        throw "predefined %@ records are not READY!".fmt(type);
      }

      foundAnnotations.forEach(function (annotation) {
        var name = annotation.get('name');
        if (annotations.get(name)) {
          throw "The activity contains multiple datasets named '%@'".fmt(name);
        }        
        annotation.set(name, annotation);
      });
    });
    
    this.set('datasets', datasets);
    this.set('annotations', annotations);
  },
  
  findDataset: function (name) {
    return this.get('datasets').get(name);
  },
  
  findAnnotation: function (name) {
    return this.get('annotations').get(name);
  },
  
  createDataset: function (name) {
    if (this.findDataset(name)) {
      throw "The activity tried to create a dataset with name %@, which is already in use.".fmt(name);
    }
    
    var dataset = Smartgraphs.store.createRecord(Smartgraphs.Dataset, { 
      activity: Smartgraphs.activityController.get('url'),
      name: name,
      points: []
    });
    dataset.set('id', Smartgraphs.getNextGuid());
    
    this.get('datasets').set(name, dataset);
    return dataset;
  },
  
  createAnnotation: function (type, name, attributes) {
    if (this.findAnnotation(name)) {
      throw "The activity tried to create an annotation with name %@, which is already in use.".fmt(name);
    }
    
    var annotation = Smartgraphs.store.createRecord(type, SC.mixin({
      activity: Smartgraphs.activityController.get('url'),
      name: name
    }, attributes));
    annotation.set('id', Smartgraphs.getNextGuid());

    this.get('annotations').set(name, annotation);
    return annotation;
  }
  
}) ;
