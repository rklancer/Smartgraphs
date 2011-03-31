// ==========================================================================
// Project:   Smartgraphs.GraphController
// Copyright: ©2011 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('mixins/annotation_support');

/** @class

  The GraphController class defines a controller for graphs. Two instances of this controller exist in
  Smartgraphs currently: Smartgraphs.firstGraphController (which controls the graph in the top pane if the panes are
  in the 'split' configuration, and controls the graph in the only pane if the panes are not split) and
  Smartgraphs.secondGraphController (controls the graph in the bottom pane if split panes are showing).
  
  This controller operates at a 'logical' level, maintaining lists of model objects that represent the current graph.
  The corresponding GraphViews observe properties of their controller and dynamically add or
  remove views from the graph to represent the annotations and data requested by the GraphController.

  @extends SC.Object
*/

Smartgraphs.GraphController = SC.Object.extend( Smartgraphs.AnnotationSupport,
/** @scope Smartgraphs.GraphController.prototype */ {
  
  /**
    The set of dataset mark colors.
    Taken from Protovis 'category10': http://vis.stanford.edu/protovis/docs/color.html
  */
  colors: [
    "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"
  ],
  
  /**
    The GraphableObjects being shown on this graph.
  */
  graphableDataObjects: null,
  
  dataRepresentations: null,
  
  /**
    Mouse events are pushed onto this array when we are in freehand input mode.
  */
  eventQueue: [],
  
  /**
    @private
    Whether to route mouse events to the eventQueue
  */
  _routeEvents: NO,
  
  xUnits: null,
  yUnits: null,
  title: null,
  
  /**
    Clear graph state
  */
  clear: function () {
    // NB This effect can, and probably should, be achieved by swapping out a content object.
    this.set('title', null);
    this.set('xAxis', null);
    this.set('yAxis', null);
    this.set('graphableDataObjects', []);
    this.set('dataRepresentations', []);            // keep GraphView from choking, for now. TODO: remove this when obsolete.
    this.clearAnnotations();
  },
  
  /**
    Shows a new graph
  */
  setupGraph: function (config) {
    var dataSpecs = config.data || [],
        self      = this;
    
    this.clear();
  
    this.set('title', config.title);
    this.set('xAxis', Smartgraphs.store.find(Smartgraphs.Axis, config.xAxis));
    this.set('yAxis', Smartgraphs.store.find(Smartgraphs.Axis, config.yAxis));

    dataSpecs.forEach( function (dataSpec) {
      var datadef, rep;
      
      if (SC.typeOf(dataSpec) === SC.T_STRING) {
        // no options
        datadef = Smartgraphs.activityObjectsController.findDatadef(dataSpec);
        rep = datadef.getNewRepresentation();
      }
      else {
        // decode options from dataSpec hash and set the relevant options on the dataRepresentation
        // TODO
      }
      
      self.addDataRepresentation(rep);
    });
    
    this.addAnnotationsByName(config.annotations);
  },
  
  
  /**
     Add the graphable objects from the passed DataRepresentation to the graph
     
     @param {Smartgraphs.DataRepresentation} rep The DataRepresentation object to add to the graph
  */
  addDataRepresentation: function (rep) {
    var xAxisUnits = this.getPath('xAxis.units'),
        yAxisUnits = this.getPath('yAxis.units');
    
    if (xAxisUnits && xAxisUnits !== rep.get('xUnits')) {
      throw "x units of data %@ do not match x axis units (%@)".fmt(rep.get('name'), xAxisUnits.get('pluralName'));
    }
    if (yAxisUnits && yAxisUnits !== rep.get('yUnits')) {
      throw "y units of data %@ do not match y axis units (%@)".fmt(rep.get('name'), yAxisUnits.get('pluralName'));
    }
    
    // TODO: allow DataRepresentatin to handle colors itself    
    rep.set('color', this.getColorForDataRepresentation(rep));

    this.get('dataRepresentations').push(rep);
    this.get('graphableDataObjects').pushObjects(rep.get('graphableObjects'));
  },  
  

  // /**
  //   Remove the named dataset from the graph.
  //   
  //   @param {String} name The name of the dataset to remove from the graph.
  // */
  // removeDataset: function (name) {
  //   var datasetList = this.get('datasetList'),
  //       dataset = this.datasetList.findProperty('name', name);
  //       
  //   if (dataset) datasetList.removeObject(dataset);
  // },
  
  /**
    a simple implementation for now...  Later, we can use color names, handle default colors a little more
    carefully, maybe cycle through colors if we have > 10 datasets on a graph (which we would ... why?)

    @param {Smartgraphs.DatatRepresentation} rep
  */
  getColorForDataRepresentation: function (rep) {
    var defaultColor = rep.get('defaultColor'),
        used = this.get('dataRepresentations').getEach('color'),
        colors,
        i, len;
      
    if (defaultColor && !used.contains(defaultColor)) {
      return defaultColor;
    }
    
    colors = this.get('colors');
    for (i = 0, len = colors.get('length'); i < len; i++) {
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
  
});
