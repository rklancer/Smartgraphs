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
    Call this when starting a session to clear the annotations and datasets. (Before starting the activity, it will be
    necessary to add any datasets and annotations pre-defined in the activity.)
  */
  clear: function () {
    this.set('annotations', SC.Object.create());
    this.set('datasets', SC.Object.create());
  },
  
  findDataset: function (name) {
    return this.get('datasets').get(name);
  },
  
  findAnnotation: function (name) {
    return this.get('annotation').get(name);
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
    
    this.get('datasets').push({name: dataset});
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

    this.get('annotations').push({name: annotation});
    return annotation;
  }
  
}) ;
