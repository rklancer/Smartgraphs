// ==========================================================================
// Project:   Smartgraphs.tableController
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('mixins/annotation_support');

/** @class

  Initial implementation of table controller. Currently only allows displaying a single dataset, which must be open
  in a graph controller.
  
  @extends SC.Object
  @extends Smartgraphs.AnnotationSupport
*/
Smartgraphs.TableController = SC.ArrayController.extend( Smartgraphs.AnnotationSupport,
/** @scope Smartgraphs.tableController.prototype */ {
  
  /**
    The graph controller that has this dataset open. (Currently we require a dataset to be opened in a graph view
    before it can be viewed in a table, but this will change.)
  */
  graphController: null,
  
  /**
    The name of the graph opened by the graphController. We find the graph controller by name.
  */
  graphName: null,
  
  /**
    The name of the dataset being displayed. We find the dataset by name.
  */
  datasetName: null,

  /**
    The dataset being displayed, if any.
  */
  dataset: null,
  
  axesBinding: '*graphController.axes',
  selectionBinding: '*dataset.selection',

  // These properties will be used to communicate to the table view. (These will change as the view becomes more
  // sophisticated.)
  
  isStreamingBinding: '*dataset.isStreaming',
  
  showLabels: function () {
    return this.get('length') > 0;
  }.property('length').cacheable(),
  
  /**
    Whether to display the table at all and latest datapoint to display
  */
  showTable: function () {
    // SC.Binding.not() creates a single Binding object that ends up being shared by all TableController instances
    return !this.get('isStreaming');
  }.property('isStreaming').cacheable(),
  
  latestXBinding: '*dataset.latestPoint.xRounded',
  latestYBinding: '*dataset.latestPoint.yRounded',
  
  pendingDatasetName: null,
  //datasetNamesBinding: 'Smartgraphs.activityObjectsController.datasetNames',
  //datasetNamesBindingDefault: SC.Binding.oneWay(),
  
  // a first implementation of lazy loading of activity objects
  maybeAddPendingDataset: function () {
    var pendingDatasetName = this.get('pendingDatasetName');
    if (!pendingDatasetName) return;
    
    var datasetNames = this.get('datasetNames');
    
    if (datasetNames && datasetNames.indexOf(pendingDatasetName) >= 0) {
      this.useDataset(Smartgraphs.activityObjectsController.findDataset(pendingDatasetName));
      this.set('pendingDatasetName', null);
    }
  }.observes('datasetNames'),
  
  clear: function () {
    this.set('pendingDatasetName', null);
  
    this.clearAnnotations();
    this.set('content', null);
    this.set('dataset', null);
    this.set('datasetName', null);
  },
  
  /**
    Causes the table to display dataset `datasetName`, which must be opened on graph `graphName`.
    
    Waits for the specified graph to be opened by one of the graph controllers and waits for the dataset to be opened
    by that graph controller before setting our content to the set of points in the dataset.
  */
  openDataset: function (datasetName) {
    var currentDatasetName = this.get('datasetName');
    if (currentDatasetName === datasetName) return YES;  // Nothing to do - unlikely, though

    this.clear(); 

    this.set('datasetName', datasetName);
    
    if (currentDatasetName) {
      // FIXME this method of handling dataset names will have problems with name collisions
      Smartgraphs.TableController.controllerForDataset.set(currentDatasetName, null);
    }
    Smartgraphs.TableController.controllerForDataset.set(datasetName, this);
    
    var dataset = Smartgraphs.activityObjectsController.findDataset(datasetName);
    if (dataset) {
      this.useDataset(dataset);
    }
    else {
      // wait for the dataset to be created
      this.set('pendingDatasetName', datasetName);
    }
  },
  
  useDataset: function (dataset) {
    this.set('dataset', dataset);
    this.set('content', dataset.get('points'));
  },

  /**
    Tries to find the object (dataset or annotation, based on 'objectType') with name 'objectName' in the current
    session and adds that object to the list of datasets or annotations associated with this graph. (This will
    cause the dataset or annotation to be show in the corresponding graph view.)
    
    If the object is not found in the current session, then tries to find and add an example dataset/annotation with 
    the given name. (TODO: should copy the example to the session so further manipulation doesn't affect the example
    object.)
    
    ("Example" datasets and annotations are canonical data or annotations created by the author of the activity
    rather than the user of the activity.)
    
    This is the canonical way to add an object given its name. (Once it finds the object, it adds it using
    the addDataset/addAnnotation methods.)
    
    @param objectType The type of object to open.
    @param objectName The name of the object to open.
  */
  // TODO: I don't like just copying this from GraphController, which is what I've done; it should be refactored, but
  // not into the annotation-support-mixin which is the available mixin.
  addObjectByName: function (objectType, objectName) {
    // first try to get the named dataset from the current session
    throw "why did you call me?";
    
    var query = SC.Query.local(objectType, 'name={name} AND session={session}', { 
      name: objectName,
      session: Smartgraphs.sessionController.getPath('content')
    });
    var objectList = Smartgraphs.store.find(query);
    
    if (objectList.get('length') < 1) {
      // get an example dataset if that's what has this name
      query = SC.Query.local(objectType, 'name={name} AND isExample=YES', { 
        name: objectName
      });
      objectList = Smartgraphs.store.find(query);
      if (objectList.get('length') < 1) return NO;
      
      // FIXME copy the object to the session before using it!
    }
  
    var object = objectList.objectAt(0);
    if (objectType === Smartgraphs.Dataset) {
      this.addDataset(object);
      return YES;
    }
    if (object.get('isAnnotation')) {
      this.addAnnotation(object);
    }
  },

  /**
    Add an annotation to this controller.
    
    This version overrides the mixin version by adding an observer to the incoming annotation.
    
    @param {Smartgraphs.Annotation} annotation
      The annotation to be added.
  */
  addAnnotation: function (annotation) {
    sc_super();
    if (annotation.kindOf(Smartgraphs.HighlightedPoint)) {
      // Watch this and update colors for datapoints if the point changes
      annotation.addObserver('point', this, 'updateDataPoints');
    }
  },

  /**
    Updates a value on the dataset based on changes in the annotations.
    
    If the annotation is a HighlightedPoint and its 'point' attribute changes, we want to update the
    dataset's DataPoints with appropriate backgroundColor attributes.
  */
  updateDataPoints: function (sender, key) {
    var dataset = this.get('dataset');
    if (sender.kindOf(Smartgraphs.HighlightedPoint) && (sender.get('point') !== undefined )) {
      dataset.get('points').forEach( function (point) {
        if (point == sender.get('point')) {
          point.set('backgroundColor', sender.get('color'));
        } 
        else if (point.get('backgroundColor') == sender.get('color')) {
          // We need to remove the old highlight. Use '' rather than null or undefined to make the binding sync
          point.set('backgroundColor', ''); // FIXME: This is a problem if there are two annotations with the same color
        }
      });
    }
  }

}) ;

Smartgraphs.TableController.controllerForDataset = SC.Object.create({});
