// ==========================================================================
// Project:   Smartgraphs.GraphController
// Copyright: ©2011 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs SC YES NO sc_require sc_super*/

sc_require('mixins/annotation_support');
sc_require('tools/label/label_state');
sc_require('tools/animation/animation_state');
sc_require('tools/prediction/prediction_state');

/** @class

  The GraphController class defines a controller for graphs. Two instances of this controller exist in
  Smartgraphs currently: Smartgraphs.firstGraphController (which controls the graph in the top pane if the panes are
  in the 'split' configuration, and controls the graph in the only pane if the panes are not split) and
  Smartgraphs.secondGraphController (controls the graph in the bottom pane if split panes are showing).
  
  This controller operates at a 'logical' level, maintaining lists of objects that represent the current graph.
  The corresponding GraphViews observe properties of their controller and dynamically add or
  remove views from the graph to represent the annotations and data requested by the GraphController.

  @extends SC.Object
*/

Smartgraphs.GraphController = SC.Object.extend( Smartgraphs.AnnotationSupport,
/** @scope Smartgraphs.GraphController.prototype */ {
  
  init: function () {
    sc_super();
    var statechart = this.get('statechartDef').create();
    statechart.initStatechart();
    statechart.set('owner', this);
    this.set('statechart', statechart);
  },

  statechartDef: SC.Statechart.design({
    trace: Smartgraphs.trace,
    rootState: SC.State.design({
      substatesAreConcurrent: YES,

      LABEL_TOOL:      Smartgraphs.LABEL_TOOL.design(),
      ANIMATION_TOOL:  Smartgraphs.ANIMATION_TOOL.design(),
      PREDICTION_TOOL: Smartgraphs.PREDICTION_TOOL.design(),
        
      /** forward these to the main statechart */
      startControlWasClicked: function () {
        Smartgraphs.statechart.sendAction('startControlWasClicked');
        return NO;
      },
      
      clearControlWasClicked: function () {
        Smartgraphs.statechart.sendAction('clearControlWasClicked');
        return NO;
      },
      
      stopControlWasClicked: function () {
        Smartgraphs.statechart.sendAction('stopControlWasClicked');
        return NO;
      }
    })
  }),
  
  statechart: null,
  
  /**
    @property {String[]}
    
    The set of datadef mark colors, taken from Protovis 'category10': http://vis.stanford.edu/protovis/docs/color.html
  */
  colors: [
    "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"
  ],

  /**
    @property {Smartgraphs.DataRepresentation[]}
    
    A list of all the DataRepresentations added to this graph, and whose GraphableObjects are being shown on the graph.
    Each DataRepresentation corresponds to a single Datadef via an intermediating Sampleset object. (However, each 
    Datadef can have several DataRepresentations.)
    
    Each DataRepresentation manages a set of GraphableObjects, each of which corresponds to a different view object
    in the graph view.
  */
  dataRepresentations: null,
  
  /**
    @property {Smartgraphs.GraphableObject[]}
    
    A list of all the GraphableObjects representing data be shown on this graph (annotations are handled separately.)
    
    An example GraphableObjects would be a Pointset (a set of data points corresponding to a particular representation 
    of a Datadef) or a ConnectedLine (a single line corresponding to a particular representation of a Datadef--possibly 
    the same representation as the Pointset, if the representation specifies the "points + line" style.)
    
    GraphViews maintain a set of views in 1:1 correspondence with this list of GraphableObjects.
  */
  graphableDataObjects: null,

  /**
    @property {Smartgraphs.Unit|null}
    
    The units on the x (horizontal) axis of the graph, if defined.
  */
  xUnits: null,
  
  /**
    @property {Smartgraphs.Unit|null}
    
    The units on the y (vertical) axis of the graph, if defined.
  */
  yUnits: null,
  
  /**
    @property String
    
    The title of the graph.
  */
  title: null,
  
  /**
    @property {SC.Object}
    
    A package of animation tool info
  */
  animationInfo: null,
  
  /**
    @property String
    
    Requested cursor type to show when mousing over this graph.
  */
  requestedCursorStyle: 'default',
  
  startControlIsVisible: NO,
  startControlIsEnabled: NO,
  startControlIsDefault: NO,
  
  stopControlIsVisible: NO,
  stopControlIsEnabled: NO,
  stopControlIsDefault: NO,

  clearControlIsVisible: NO,
  clearControlIsEnabled: NO,
  clearControlIsDefault: NO,
  
  /**
    @property String

    What to show in the graph controls 'panel' below the graph.
    Options are Smartgraphs.GraphController.CONTROLS (show the start/stop/reset controls) and Smartgraphs.GraphController.SENSOR_LOADING 
    (show a spinny or other message indicating that the sensor is loading) or null (don't show the panel, or don't show anything in it.)
  */
  showInControlsPanel: null,
  
  /**
    Show the graph start/stop/reset controls.
  */
  showControls: function () {  
    this.disableAllControls();
    this.set('showInControlsPanel', Smartgraphs.GraphController.CONTROLS);
  },
  
  /**
    Show the "spinny" and message that indicate the sensor is loading
  */
  showSensorLoadingView: function () {
    this.set('showInControlsPanel', Smartgraphs.GraphController.SENSOR_LOADING);
  },
  
  /**
    Hide the graph start/stop/reset controls.
  */
  hideControls: function (pane) {
    this.set('showInControlsPanel', null);
  },
  
  revealAllControls: function () {
    this.set('startControlIsVisible',  YES);    
    this.set('stopControlIsVisible',  YES);
    this.set('clearControlIsVisible',  YES);    
  },
  
  revealOnlyClearControl: function () {
    this.set('startControlIsVisible',  NO);    
    this.set('stopControlIsVisible',  NO);
    this.set('clearControlIsVisible',  YES);    
  },
  
  disableAllControls: function () {
    this.set('startControlIsEnabled',  NO);
    this.set('startControlIsDefault',  NO);

    this.set('stopControlIsEnabled',  NO);
    this.set('stopControlIsDefault',  NO);

    this.set('clearControlIsEnabled',  NO);
    this.set('clearControlIsDefault',  NO);
  },
      
  highlightStartControl: function () {
    this.set('startControlIsEnabled',  YES);
    this.set('startControlIsDefault',  YES);

    this.set('stopControlIsEnabled',  NO);
    this.set('stopControlIsDefault',  NO);

    this.set('clearControlIsEnabled',  NO);
    this.set('clearControlIsDefault',  NO);
  },
  
  highlightStopControl: function () {
    this.set('startControlIsEnabled',  NO);
    this.set('startControlIsDefault',  NO);

    this.set('stopControlIsEnabled',  YES);
    this.set('stopControlIsDefault',  YES);

    this.set('clearControlIsEnabled',  NO);
    this.set('clearControlIsDefault',  NO);
  },
  
  highlightClearControl: function () {
    this.set('startControlIsEnabled',  NO);
    this.set('startControlIsDefault',  NO);

    this.set('stopControlIsEnabled',  NO);
    this.set('stopControlIsDefault',  NO);

    this.set('clearControlIsEnabled',  YES);
    this.set('clearControlIsDefault',  YES);
  },
  
  enableClearControl: function () {
    this.set('clearControlIsEnabled',  YES);
    this.set('clearControlIsDefault',  NO);
  },
  
  /**
   @private
   
   Stubbable method to return an axis given its id.
  */
  getAxis: function (id) {
    return Smartgraphs.store.find(Smartgraphs.Axis, id);
  },
  
  /**
    @private

    Stubbable method to return a datadef given its name.
  */
  getDatadef: function (name) {
    return Smartgraphs.activityObjectsController.findDatadef(name);
  },
  
  /**
    Clears all graph state (i.e., title, units, data representations, graphable data objects, and annotations).
  */
  clear: function () {
    this.sendAction('stopTool');
    this.hideControls();

    // n.b. the following could be made to be side effects of entering DEFAULT_STATE
    this.set('title', null);
    this.set('xAxis', null);
    this.set('yAxis', null);
    this.set('graphableDataObjects', []);
    this.set('dataRepresentations', []);
    this.clearAnnotations();
  },
  
  /**
    Clears the current graph and shows a new graph according to the configuration settings in the passed config hash.
    
    A DataRepresentation is requested for each item in config.data and an Annotation is added for each item in the 
    config.annotations
    
    Right now, the DataRepresentation is assigned a color using the getColorForDataRepresentation without respect for
    any color property currently set on the DataRepresentation.
    
    @param {Object} config 
      A hash with config options
  */
  setupGraph: function (config) {
    var dataSpecs = config.data || [],
        self      = this;
    
    this.clear();
  
    this.set('title', config.title);
    this.set('xAxis', this.getAxis(config.xAxis));
    this.set('yAxis', this.getAxis(config.yAxis));

    dataSpecs.forEach( function (dataSpec) {
      var datadefName, 
          options = {},
          datadef,
          rep;
      
      if (SC.typeOf(dataSpec) === SC.T_STRING) {
        datadefName = dataSpec;
      }
      else {
        // TODO: parse these options somewhere other than in getNewRepresentation?
        // TODO: adopt a single idiom for passing options in the activity hash (we use an array here,
        //       hashes in different places, e.g, instead of using an idiom like 
        //       { type: "HighlightedPoint", "records": [..] } we could have ["HighlightedPoint", {..}, {..}]
        //       or
        //       instead of tools: ["name":..., "setup":... } we could have  tools: ["sensor", { <setup> }]
        datadefName = dataSpec[0];
        options = dataSpec[1];
      }
      
      datadef = self.getDatadef(datadefName);
      rep = datadef.getNewRepresentation(options);
      self.addDataRepresentation(rep);
    });
    
    this.addAnnotationsByName(config.annotations);
  },
  
  /**
     Adds the passed DataRepresentation to the dataRepresentations array, and adds the GraphableObjects specified by 
     the DataRepresentation to the graphableDataObjects array (so that they can be displayed by the graph view).
     
     @param {Smartgraphs.DataRepresentation} rep 
       The DataRepresentation object to add to the graph
  */
  addDataRepresentation: function (rep) {
    var xAxisUnits = this.getPath('xAxis.units'),
        yAxisUnits = this.getPath('yAxis.units'),
        repXUnits  = rep.get('xUnits'),
        repYUnits  = rep.get('yUnits');
    
    if (xAxisUnits !== repXUnits) {
      throw "x units of data %@ do not match x axis units (%@)".fmt(rep.get('name'), xAxisUnits.get('pluralName'));
    }
    if (yAxisUnits !== repYUnits) {
      throw "y units of data %@ do not match y axis units (%@)".fmt(rep.get('name'), yAxisUnits.get('pluralName'));
    }
    
    // TODO: allow DataRepresentation to handle colors itself  
    if (!rep.get('color')) rep.set('color', this.getColorForDataRepresentation(rep));

    this.get('dataRepresentations').push(rep);
    this.get('graphableDataObjects').pushObjects(rep.get('graphableObjects'));
  },

  /**
    Given a DataRepresentation to be shown on the graph, get an unused color to represent it. Right now there is a
    fixed set of 10 colors.

    @param {Smartgraphs.DatatRepresentation} rep
      The DataRepresentation we are requesting a color for
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
  
  dimRepresentation: function (name) {
    var rep = this.get('dataRepresentations').findProperty('name', name);
    
    if (rep) {
      rep.set('isDimmed', YES);
    }
  },
  
  unDimRepresentations: function () {
    this.get('dataRepresentations').setEach('isDimmed', NO);
  },
  
  // Events

  sendAction: function (action, context, args) {
    var statechart = this.get('statechart');
    return statechart.sendAction.apply(statechart, arguments);
  },
    
  predictionToolStartTool: function (args) {
    this.sendAction('predictionToolStartTool', this, args);
  },
  
  predictionToolPredictionStarting: function () {
    this.set('requestedCursorStyle', 'crosshair');
  },
  
  predictionToolPredictionFinished: function () {
    this.set('requestedCursorStyle', 'default');
  },
  
  labelToolStartTool: function (annotationName) {
    this.sendAction('labelToolStartTool', this, annotationName);
  },
  
  labelToolAddLabelsStarting: function () {
    this.set('requestedCursorStyle', 'pointer');
  },
  
  labelToolAddLabelsFinished: function () {
    this.set('requestedCursorStyle', 'default');
  },
  
  labelViewRemoveLabel: function (label) {
    return !!this.sendAction('removeLabel', this, { label: label });
  },
  
  inputAreaMouseDown: function (x, y) {
    return !!this.sendAction('mouseDownAtPoint', this, {x: x, y: y});
  },
  
  inputAreaMouseDragged: function (x, y) {
    return !!this.sendAction('mouseDraggedToPoint', this, {x: x, y: y});
  },

  inputAreaMouseUp: function (x, y) {
    return !!this.sendAction('mouseUpAtPoint', this, {x: x, y: y});
  },
  
  dataPointSelected: function (dataRepresentation, x, y) {
    if (Smartgraphs.statechart && Smartgraphs.statechart.get('statechartIsInitialized')) {
      Smartgraphs.statechart.sendAction('dataPointSelected', this, { dataRepresentation: dataRepresentation, x: x, y: y });
    }
    this.sendAction('dataPointSelected', this, { dataRepresentation: dataRepresentation, x: x, y: y });
  }
  
});


Smartgraphs.GraphController.CONTROLS = 'controls';
Smartgraphs.GraphController.SENSOR_LOADING = 'sensor-loading';
