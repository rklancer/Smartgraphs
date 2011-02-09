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
    @private
    
    All variables available to the activity session, indexed by name.
  */
  _variables: {},
  
  /**
    When an activity session is started, call this method to populate the registry of dataset and annotation names 
    with the names of the datasets and annotations predefined the activity document (all other datasets and 
    annotations will be removed from the registry).
    
    This method expects that Smartgraphs.store is a "clean slate"; that is, that it contains no dataset or annotation
    records which reference the current activity but that were not predefined. This is normally taken care of by the 
    sessionController just before loadPredefinedObjects is called.
  */
  loadPredefinedObjects: function () {
    var activity,
        findObjects,
        self = this;

    this._datasets = {};
    this._annotations = {};
    this._variables = {};
          
    findObjects = function (type, typeName, hash) {
      var query,
          found;
          
      query = SC.Query.local(type, 'activity={activity}', { activity: activity });
      found = Smartgraphs.store.find(query);
    
      if ( !(found.get('status') & SC.Record.READY)) {
        throw "predefined %@ records are not READY!".fmt(typeName);
      }

      found.forEach(function (rec) {
        var name = rec.get('name');
        
        if (hash[name]) {
          throw "The activity contains multiple %@ records named '%@'".fmt(typeName, name);
        }
        if (rec.get('session')) {
          throw "The predefined %@ record '%@' was incorrectly annotated with a session!".fmt(typeName, name);
        }
        hash[name] = rec;
      });
    };
    
    activity = Smartgraphs.activityController.get('content');
    if (activity) {
      findObjects(Smartgraphs.Dataset,    'dataset',    this._datasets);
      findObjects(Smartgraphs.Annotation, 'annotation', this._annotations);
      findObjects(Smartgraphs.Variable,   'variable',   this._variables);
    }
    
    this.notifyPropertyChange('datasetNames');
    this.notifyPropertyChange('annotationNames');
    this.notifyPropertyChange('variableNames');
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
    Returns the variable with the given name in the current activity session, or undefined if the specified name
    does not correspond to a variable in the current activity session.

    @param name The name of the variable.
    
    @returns {Smartgraphs.Variable|undefined}
  */
  findVariable: function (name) {
    return this._variables[name];
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
  createDataset: function (name, xUnits, yUnits) {    
    if (this._datasets[name]) {
      throw "The activity tried to create a dataset with name %@, which is already in use.".fmt(name);
    }
    
    var dataset = Smartgraphs.store.createRecord(Smartgraphs.Dataset, { 
      activity: Smartgraphs.activityController.get('id'),
      name: name,
      points: [], 
      xUnits: xUnits,
      yUnits: yUnits
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
      The name to give to the newly created annotation
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
    Create a variable in the current activity session.
    
    It is a runtime error to call this method with the name of a variable that has already been defined in the current
    session.
    
    @param name 
      The name to give to the newly created variable.

    @returns {Smartgraphs.Variable}
      The newly created variable
  */
  setVariable: function (name, value) {
    var variable = this._variables[name];
  
    if (!variable) {
      variable = Smartgraphs.store.createRecord(Smartgraphs.Variable, { 
        activity: Smartgraphs.activityController.get('id'),
        name: name,
        value: null
      });
      variable.set('id', Smartgraphs.getNextGuid());
      this.notifyPropertyChange('variableNames');
    }

    variable.set('value', value);
    this._variables[name] = variable;
    return variable;
  },
  
  /**
    Returns a Variable in the current activity session.
    
    @param name 
      The name of the desired Variable.
  */
  getVariable: function (name) {
    return this._variables[name];
  },

  /**
    Deletes an annotation in the current activity session.

    Does nothing if no annotation with the specified name has been defined.
    
    @param {String} name 
      The name of the annotation to destroy
    
    @returns {Boolean}
      YES if the annotation was found (and destroyed); NO if the annotation was not found.
  */
  deleteAnnotation: function (name) {
    var annotation = this.findAnnotation(name);
    if (!annotation) return NO;
    
    annotation.destroy();
    delete this._annotations[name];
    this.notifyPropertyChange('annotationNames');
    return YES;
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
  }.property(),
  
  /**
    @property {SC.Array} variableNames
    
    Observable list of the names of all variables defined in the current activity session. (Observers are notified 
    whenever variables are added or removed from this list.)
  */
  variableNames: function () {
    var names = [];
    for (var name in this._variables) {
      if (this._variables.hasOwnProperty(name)) names.push(name);
    }
    return names;
  }.property()
  
}) ;
