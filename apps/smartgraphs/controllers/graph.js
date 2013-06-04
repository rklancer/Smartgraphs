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
sc_require('tools/graphing/graphing_state');

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
      GRAPHING_TOOL:   Smartgraphs.GRAPHING_TOOL.design(),

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
   An array of legends which are to be displayed.
  */
  arrLegends: null,

  /**
    @property {Smartgraphs.Datadef[]}

    A list of all the Datadefs added to this graph

  */
  datadefList: null,

  /**
    @property {Smartgraphs.Dataref[]}

    A list of all the Datadefs added to this graph.

  */
  datarefList: null,

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

   @property Bool

   Whether to show the grid line or not

   */

  showGraphGrid : null,

  /**
   @property Bool

   Whether to show the tooltip  or not

  */

  showToolTipCoords : null,

  /**
   @property Bool

   Override tooltip visibility according to state of the tool

  */

  toolTipVisibilityOverrideFromToolState: true,

  /**
  @property Bool

  Override tooltip visibility according to point hover

 */
  toolTipVisibilityOverrideOnPointHover: true,
  /**
  @property Point

  Store the point value for point hover

 */
  toolTipPoint: null,
  /**

   @property Object

   Layout of the Tooltip

   */

  tooltipCoords : { x: 0, y: 0, top: 0, left: 0, coordOffset: 5, width: 100},

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
    Add a datadef to this controller

    @param {Smartgraphs.Datadef} datadef
      The datadef to be added.
  */
  addDatadef: function (datadef) {
    if (this.findDatadefByName(datadef.get('name'))) {
      return; // Nothing to be done
    }
    this.get('datadefList').pushObject(datadef);
  },

  /**
    Add a dataref to this controller.

    @param {Smartgraphs.Dataref} dataref
      The dataref to be added.
  */
  addDataref: function (dataref) {
    if (this.findDatarefByName(dataref.get('name'))) {
      return; // Nothing to be done
    }
    this.get('datarefList').pushObject(dataref);
  },


  toolTipPointDidChange: function () {
    var toolTipPoint = this.get('toolTipPoint');
    if (toolTipPoint !== null) {
      this.updateToolTip(toolTipPoint, null);
    }
  }.observes('toolTipPoint'),

  /**
    Removes all datadefs from the list. Sets the datadefList attribute to [] (therefore, also initializes the
    list if the value had previously been null).
  */
  clearDatadefs: function () {
    var self = this;
    var datadefNames = (this.get('datadefList') || []).getEach('name');

    datadefNames.forEach(function (datadefName) {
      self.removeDatadef(datadefName);
    });
    this.set('datadefList', []);
  },

  /**
    Removes all datarefs from the list. Sets the datarefList attribute to [] (therefore, also initializes the
    list if the value had previously been null).
  */
  clearDatarefs: function () {
    var self = this;
    var datarefNames = (this.get('datarefList') || []).getEach('name');

    datarefNames.forEach(function (datarefName) {
      self.removeDataref(datarefName);
    });
    this.set('datarefList', []);
  },

  /**
    Remove the datadef from this controller.

    @param {Smartgraphs.Datadef|String} datadefOrName
      The datadef, or name of the datadef, to remove.
  */
  removeDatadef: function (datadefOrName) {
    var datadef = (SC.typeOf(datadefOrName) === SC.T_STRING) ? this.findDatadefByName(datadefOrName) : datadefOrName;

    if (datadef) {
      this.get('datadefList').removeObject(datadef);
    }
  },

  /**
    Remove the dataref from this controller.

    @param {Smartgraphs.Dataref|String} datarefOrName
      The dataref, or name of the dataref, to remove.
  */
  removeDataref: function (datarefOrName) {
    var datadef = (SC.typeOf(datarefOrName) === SC.T_STRING) ? this.findDatarefByName(datarefOrName) : datarefOrName;

    if (dataref) {
      this.get('datarefList').removeObject(dataref);
    }
  },

  /**
    Given a valid datadef name, returns the named datadef. Returns null if the datadef
    is not found in this controller.

    @param {String} name
      The name under which to search for the datadef.
  */
  findDatadefByName: function (name) {
    var list = this.get('datadefList');
    return list ? list.findProperty('name', name) : null;
  },

  /**
    Given a valid dataref name, returns the named dataref. Returns null if the dataref
    is not found in this controller.

    @param {String} name
      The name under which to search for the dataref.
  */
  findDatarefByName: function (name) {
    var list = this.get('datarefList');
    return list ? list.findProperty('name', name) : null;
  },

  addDatadefsByName: function (datadefs) {
    var self = this;

    if (!datadefs) {
      return;
    }

    datadefs.forEach(function (name) {
      self.addDatadef(self.getDatadef(name));
    });
  },

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
    @private

    Stubbable method to return a datadef given its name.
  */
  getDataref: function (name) {
    return Smartgraphs.activityObjectsController.findDataref(name);
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
    this.set('showGraphGrid', null);
    this.set('showCrossHairs', null);
    this.set('showToolTipCoords', null);
    this.set('graphableDataObjects', []);
    this.set('arrLegends', []);
    this.set('dataRepresentations', []);
    this.clearAnnotations();
    this.clearDatadefs();
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
    // config.data Array contains either String or Array.
    // Depending on the content, dataset's name is fetched.

    // Giving a copy of config.data to dataspecs, so that the actual
    // config.data does not get affected while re-ordering the
    // datadefs for active datadef.
    var dataSpecs = config.data ? config.data.concat([]) : [],
        self      = this,
        datarefNames = config.datarefs || [],
        legendDetails = config.legends || undefined,
        activeDatadefs = config.activeDatadefs || [];

    if (dataSpecs.length === 1 && activeDatadefs.length === 1) {
      this.getDatadef(activeDatadefs[0]).set('isActive', true);
    }
    else {
      // datadefs are re-ordered, keeping active datadefs at the end so that they are above inactive datadefs.
      var activeDatadefLength = activeDatadefs.length;
      var tempArray = [];
      if (activeDatadefLength > 0) {
        for (var i = 0; i < dataSpecs.length; i++) {
          var datadefName = "";
          if (SC.typeOf(dataSpecs[i]) === SC.T_STRING) {
            datadefName = dataSpecs[i];
          }
          else {
            datadefName = dataSpecs[i][0];
          }
          this.getDatadef(datadefName).set('isActive', false);
          for (var j = 0; j < activeDatadefs.length; j++) {
            if (datadefName === activeDatadefs[j]) {
              this.getDatadef(datadefName).set('isActive', true);
              dataSpecs.splice(i, 1);
              i--;
              break;
            }
          }
        }
        dataSpecs = dataSpecs.concat(activeDatadefs);
      }
    }
    this.clear();

    this.set('title', config.title);
    this.set('xAxis', this.getAxis(config.xAxis));
    this.set('yAxis', this.getAxis(config.yAxis));
    this.set('showGraphGrid', config.showGraphGrid);
    this.set('showCrossHairs', config.showCrossHairs);
    this.set('showToolTipCoords', config.showToolTipCoords);

    var xMax = this.getAxis(config.xAxis).get("max");
    var yMax = this.getAxis(config.yAxis).get("max");
    var xMin = this.getAxis(config.xAxis).get("min");
    var yMin = this.getAxis(config.yAxis).get("min");
    var widthMultiplier = 15;
    var arrLegendElements = [];
    if (parseInt(yMin, 10) < 0 || parseInt(xMin, 10) < 0) {
      widthMultiplier = 21;
    }
    var iTooltipWidth = (xMax + "," + yMax).length * widthMultiplier;
    var tooltipCoords = this.get("tooltipCoords");
    this.set("tooltipCoords", { x: 0, y: 0, top: 0, left: 0, coordOffset: 5, width: iTooltipWidth});

    dataSpecs.forEach(function (dataSpec) {
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

      options.xMin = xMin;
      options.xMax = xMax;
      datadef = self.getDatadef(datadefName);
      if (options === undefined) {
        options = [];
      }
      if (options['point-type'] === undefined) {
        options['point-type'] = datadef.get('pointType');
      }
      if (options['line-type'] === undefined) {
        options['line-type'] = datadef.get('lineType');
      }
      rep = datadef.getNewRepresentation(options);
      self.addDataRepresentation(rep);
    });

    var dataReps = this.get('dataRepresentations') || [];
    for (var k = 0; k < dataReps.length; k++) {
      var rep = dataReps[k];
      rep.addObserver('graphableObjects', this, this.graphableObjectsDidChange);
    }

    if (legendDetails !== undefined) {
      var referenceDatadef = legendDetails.referenceDatadef;
      if (referenceDatadef !== undefined) {
        var len = legendDetails.datadefs.length;
        for (var m = 0; m < len; m++) {
          var datadef = legendDetails.datadefs[m];
          if (datadef !== referenceDatadef) {
            this.getDatadef(datadef).set('referenceDatadefName', referenceDatadef);
          }
        }
      }
      this.set('arrLegends', legendDetails);
    }

    if (datarefNames) {
      datarefNames.forEach(function (datarefName) {
        var dataref = self.getDataref(datarefName);
        dataref.setGraphBounds({xMin: xMin, yMin: yMin, xMax: xMax, yMax: yMax});
        dataref.initialise();
      });
    }

    this.addAnnotationsByName(config.annotations);
  },
  graphableObjectsDidChange: function (arg) {
    var temp = [];
    for (var x = 0; x < this.graphableDataObjects.length; x++) {
      var graphableDataObj = this.graphableDataObjects[x];
      temp.push(graphableDataObj);
      for (var y = 0; y < arg.graphableObjects.length; y++) {
        var repObject = arg.graphableObjects[y];
        if (repObject !== graphableDataObj) {
          temp.push(repObject);
        }
      }
    }
    this.set('graphableDataObjects', temp);
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
    var datadef = this.getDatadef(rep.get('name'));
    if (datadef) {
      var datadefColor = datadef.get('color');
      if (datadefColor) {
        return datadefColor;
      }
    }

    var defaultColor = rep.get('defaultColor'),
        used = this.get('dataRepresentations').getEach('color'),
        colors,
        i, len;

    if (defaultColor && !used.contains(defaultColor)) {
      if (datadef) {
        datadef.set('color', defaultColor);
      }
      return defaultColor;
    }

    colors = this.get('colors');
    for (i = 0, len = colors.get('length'); i < len; i++) {
      if (!used.contains(colors.objectAt(i))) {
        if (datadef) {
          datadef.set('color', colors.objectAt(i));
        }
        return colors.objectAt(i);
      }
    }

    // just default to the first color if none available
    if (datadef) {
      datadef.set('color', colors.objectAt(0));
    }
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

  updateToolTip: function (point, coords) {
    var newPoint = Smartgraphs.Point.create();
    newPoint.set('x', point.x);
    newPoint.set('y', point.y);
    var xRounded = newPoint.xRounded().toFixed(2);
    var yRounded = newPoint.yRounded().toFixed(2);

    var tooltipCoords = this.get("tooltipCoords");
    if (coords === null || coords === undefined) {
      tooltipCoords = {
          x: xRounded,
          y: yRounded,
          top: tooltipCoords.top,
          left: tooltipCoords.left,
          coordOffset: tooltipCoords.coordOffset,
          width: tooltipCoords.width
        };
    }
    else {
      tooltipCoords = {
        x: xRounded,
        y: yRounded,
        top: coords.y,
        left: coords.x,
        coordOffset: tooltipCoords.coordOffset,
        width: tooltipCoords.width
      };
    }
    this.set("tooltipCoords", tooltipCoords);
  },

  /**

    return DataRepresentation which represents the given datadefName.
  */
  getDataRepresentation: function (datadefName) {
    var dataRepresentations = this.get('dataRepresentations');
    for (var i = dataRepresentations.get('length') - 1; i >= 0; i--) {
      if (dataRepresentations[i].get('name') === datadefName) {
        return dataRepresentations[i];
      }
    }
    return null;
  },

  // Events

  sendAction: function (action, context, args) {
    var statechart = this.get('statechart');
    return statechart.sendAction.apply(statechart, arguments);
  },

  graphingToolStartTool: function (args) {
    this.sendAction('graphingToolStartTool', this, args);
  },

  graphingToolGraphingStarting: function () {
    if (this.showCrossHairs === true) {
      this.set('requestedCursorStyle', 'crosshair');
    }
  },

  graphingToolGraphingFinished: function () {
    this.set('requestedCursorStyle', 'default');
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

  labelToolStartTool: function (args) {
    this.sendAction('labelToolStartTool', this, args);
  },

  labelToolAddLabelsStarting: function () {
    this.set('requestedCursorStyle', 'pointer');
  },

  labelToolAddLabelsFinished: function () {
    this.set('requestedCursorStyle', 'default');
  },

  labelViewRemoveLabel: function (label) {
    if (Smartgraphs.statechart && Smartgraphs.statechart.get('statechartIsInitialized')) {
      Smartgraphs.statechart.sendAction('removeLabel', this, { label: label });
    }
    return !!this.sendAction('removeLabel', this, { label: label });
  },

  inputAreaMouseDown: function (x, y) {
    if (Smartgraphs.statechart && Smartgraphs.statechart.get('statechartIsInitialized')) {
      Smartgraphs.statechart.sendAction('mouseDownAtPoint', this, { x: x, y: y });
    }
    return !!this.sendAction('mouseDownAtPoint', this, {x: x, y: y});
  },

  inputAreaMouseDragged: function (x, y) {
    return !!this.sendAction('mouseDraggedToPoint', this, {x: x, y: y});
  },

  inputAreaMouseUp: function (x, y) {
    return !!this.sendAction('mouseUpAtPoint', this, {x: x, y: y});
  },

  inputAreaMouseMove: function (x, y) {
    return !!this.sendAction('mouseMoveAtPoint', this, {x: x, y: y});
  },

  dataPointSelected: function (dataRepresentation, x, y) {
    if (Smartgraphs.statechart && Smartgraphs.statechart.get('statechartIsInitialized')) {
      Smartgraphs.statechart.sendAction('dataPointSelected', this, { dataRepresentation: dataRepresentation, x: x, y: y });
    }
    this.sendAction('dataPointSelected', this, { dataRepresentation: dataRepresentation, x: x, y: y });
  },

  dataPointDown: function (dataRepresentation, x, y) {
    if (Smartgraphs.statechart && Smartgraphs.statechart.get('statechartIsInitialized')) {
      Smartgraphs.statechart.sendAction('dataPointDown', this, { dataRepresentation: dataRepresentation,  x: x, y: y });
    }
    this.sendAction('dataPointDown', this, { dataRepresentation: dataRepresentation,  x: x, y: y  });
  },

  dataPointDragged: function (dataRepresentation, x, y) {
    if (Smartgraphs.statechart && Smartgraphs.statechart.get('statechartIsInitialized')) {
      Smartgraphs.statechart.sendAction('dataPointDragged', this, { dataRepresentation: dataRepresentation,  x: x, y: y });
    }
    this.sendAction('dataPointDragged', this, { dataRepresentation: dataRepresentation,  x: x, y: y  });
  },

  dataPointUp: function (dataRepresentation, x, y) {
    if (Smartgraphs.statechart && Smartgraphs.statechart.get('statechartIsInitialized')) {
      Smartgraphs.statechart.sendAction('dataPointUp', this, { dataRepresentation: dataRepresentation,  x: x, y: y });
    }
    this.sendAction('dataPointUp', this, { dataRepresentation: dataRepresentation,  x: x, y: y  });
  }

});


Smartgraphs.GraphController.CONTROLS = 'controls';
Smartgraphs.GraphController.SENSOR_LOADING = 'sensor-loading';
