// ==========================================================================
// Project:   Smartgraphs.GraphController
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('mixins/annotation_support');

/** @class

  The GraphController class defines a controller for Graph objects. Two instances of this controller exist in
  Smartgraphs currently: Smartgraphs.firstGraphController (which controls the graph in the top pane if the panes are
  in the 'split' configuration, and controls the graph in the only pane if the panes are not split) and
  Smartgraphs.secondGraphController (controls the graph in the bottom pane if split panes are showing).
  
  This controller operates at a 'logical' level, maintaining lists of model objects that represent the Graph currently
  open in the controller. The corresponding GraphViews observe properties of their controller and dynamically add or
  remove views from the graph to represent the annotations and data requested by the GraphController.

  @extends SC.ObjectController
*/
Smartgraphs.GraphController = SC.ObjectController.extend( Smartgraphs.AnnotationSupport,
/** @scope Smartgraphs.GraphController.prototype */ {
  
  /**
    The datasets being shown on this graph.
  */
  datasetList: null,
  
  /**
    Mouse events are pushed onto this array when we are in freehand input mode.
  */
  eventQueue: [],
  
  // private: whether to route mouse events to the eventQueue
  _routeEvents: NO,
  
  /**
    The set of dataset mark colors.
    Taken from Protovis 'category10': http://vis.stanford.edu/protovis/docs/color.html
  */
  colors: [
    "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"
  ],
  
  /**
  * Sets values for the current graph, dataset list, annotation list, and content to empty or null.
  */
  clear: function () {
    // remove this controller from the controllerForName hash
    var currentGraphName = this.get('name');
    if (currentGraphName) {
      Smartgraphs.GraphController.controllerForName.set(currentGraphName, null);
    }
    
    this.set('datasetList', []);
    this.clearAnnotations();
    this.set('content', null);
  },
  
  /** 
  * Opens the named graph. Does nothing if the named graph is already open.
  * @param name The name of the graph to open.
  */
  openGraph: function (name) {
    var currentGraphName = this.get('name');
    if (name === currentGraphName) return YES;    // nothing to do!

    var activity = Smartgraphs.activityController.get('content');
    var query = activity ?
      SC.Query.local(Smartgraphs.Graph, 'name={name} AND activity={activity}', { 
        name: name,
        // activityController.get('content') won't work because it is a record from a different store, thus not identical
        activity: Smartgraphs.activityController.get('activityRecordInCurrentStore')
      })
      :
      SC.Query.local(Smartgraphs.Graph, 'name={name}', {      // e.g., in testing mode
        name: name
      });
    
    var graphs = Smartgraphs.store.find(query);
    if (graphs.get('length') < 1) return NO;
    
    this.clear();
    
    if (currentGraphName) {
      Smartgraphs.GraphController.controllerForName.set(currentGraphName, null);
    }
    this.set('content', graphs.objectAt(0));      // it would be strange if there are >1
    Smartgraphs.GraphController.controllerForName.set(name, this);
    
    // add the initial dataset and annotations
    var initial = this.get('initialDatasets') || [];
    var self = this;
    initial.forEach( function (datasetName) {
      self.addDataset(Smartgraphs.activityObjectsController.findDataset(datasetName));
    });
    
    initial = this.get('initialAnnotations') || [];
    initial.forEach( function (annotation) {
      // FIXME data format can now be updated to initialAnnotations is a list of names, just like initialDatasets
      // FIXME make this lazy load in case the annotations don't exist yet!
      self.addAnnotation(Smartgraphs.activityObjectsController.findAnnotation(annotation.name));
    });
  },
  
  /**
    Tries to find the object (dataset or annotation, based on 'objectType') with name 'objectName', and adds that 
    object to the list of datasets or annotations associated with this graph. (This will cause the dataset or 
    annotation to be show in the corresponding graph view.)
    
    This is being kept for compatibility. It will be easier to use, e.g., 
    this.addAnnotation(Smartgraphs.activityObjectsController.findAnnotation(annotationName))
    
    @param objectType The type of object to open.
    @param objectName The name of the object to open.
  */
  addObjectByName: function (objectType, objectName) {
    var obj;
    objectType = SC.objectForPropertyPath(objectType);
    
    if (SC.kindOf(objectType, Smartgraphs.Annotation)) {
      obj = Smartgraphs.activityObjectsController.findAnnotation(objectName);
      if (obj) this.addAnnotation(obj);
    }
    else if (SC.kindOf(objectType, Smartgraphs.Dataset)) {
      obj = Smartgraphs.activityObjectsController.findDataset(objectName);
      if (obj) this.addDataset(obj);
    }
  },

  /**
   * @param dataset
   */
  addDataset: function (dataset) {
    if (this.findDatasetByName(dataset.get('name'))) {
      return;      // don't add the dataset if it is already in the graph!
    }
    
    // get a color for the dataset
    dataset.set('color', this.getColorForDataset(dataset));
    
    this.get('datasetList').pushObject(dataset);
  },

  /**
    Remove the named dataset from the graph.
    @param name The dataset to remove.
  */
  removeDataset: function (name) {
    var datasetList = this.get('datasetList');
    var dataset = this.findDatasetByName(name);
    if (dataset) datasetList.removeObject(dataset);
  },
  
  /**
    @param name
  */
  findDatasetByName: function (name) {
    return this.findObjectByNameIn(name, this.get('datasetList'));
  },
  
  /**
    @param name
  */
  findObjectByNameIn: function (name, list) {
    var names = list.getEach('name');
    var idx = names.indexOf(name);
    return (idx >= 0) ? list.objectAt(idx) : null;
  },
  
  /**
    a simple implementation for now...  Later, we can use color names, handle default colors a little more
    carefully, maybe cycle through colors if we have > 10 datasets on a graph (which we would ... why?)
    @param dataset
  */
  getColorForDataset: function (dataset) {
    var defaultColor = dataset.get('defaultColor');
    var used = this.get('datasetList').getEach('color');
  
    if (defaultColor && !used.contains(defaultColor)) {
      return defaultColor;
    }
    
    var colors = this.get('colors');
    
    for (var i = 0, len = colors.get('length'); i < len; i++) {
      if ( !used.contains(colors.objectAt(i)) ) return colors.objectAt(i);
    }
    
    // just default to the first color if none available
    return colors.objectAt(0);
  },

  /**
    @param x
    @param y
  */
  inputAreaMouseDown: function (x, y) {
    if (this._routeEvents) {
      this._eventQueue.pushObject({
        x: x,
        y: y,
        type: Smartgraphs.freehandInputController.START
      });
    }
  },
  
  /**
    @param x
    @param y
  */
  inputAreaMouseDragged: function (x, y) {
    if (this._routeEvents) {
      this._eventQueue.pushObject({
        x: x,
        y: y,
        type: Smartgraphs.freehandInputController.CONTINUE
      });
    }
  },
  
  /**
    @param x
    @param y
  */
  inputAreaMouseUp: function (x, y) {
    if (this._routeEvents) {
      this._eventQueue.pushObject({
        x: x,
        y: y,
        type: Smartgraphs.freehandInputController.END
      });
    }
  },
  
  startFreehandInput: function () {
    this._routeEvents = YES;
    this._eventQueue = [];
    this.set('eventQueue', this._eventQueue);
  },
  
  endFreehandInput: function () {   
    this._routeEvents = NO;
  }

  // NOT CURRENTLY USED:
  
  // setAxes: function (axesId) {
  //   var axes = Smartgraphs.store.find(Smartgraphs.Axes, axesId);
  //   if (!axes) {
  //     axes = Smartgraphs.store.createRecord(Smartgraphs.Axes, { guid: axesId });
  //   }
  //   
  //   this.set('axes', axes);
  // },
  // 
  // selectDataset: function (datasetName) {
  //   var dataset = this.findDatasetByName(datasetName);
  //   if (dataset) this.set('selectedDataset', dataset);
  // }
  
}) ;

Smartgraphs.GraphController.controllerForName = SC.Object.create({});
