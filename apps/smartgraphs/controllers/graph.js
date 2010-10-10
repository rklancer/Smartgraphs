// ==========================================================================
// Project:   Smartgraphs.GraphController
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.ObjectController
*/
Smartgraphs.GraphController = SC.ObjectController.extend(SC.Responder, 
/** @scope Smartgraphs.graphController.prototype */ {
  
  /**
    The datasets being shown on this graph.
  */
  seriesList: null,
  
  /**
    The (static) annotations being shown on this graph.
  */
  annotationList: null,

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
  
  clear: function () {
    this.set('seriesList', []);
    this.set('annotationList', []);
    this.set('content', null);
  },
  
  openGraph: function (name) {
    var currentGraphName = this.get('name');
    if (name === currentGraphName) return YES;    // nothing to do!

    var activity = Smartgraphs.activityController.get('content');
    var query = activity ?
      SC.Query.local(Smartgraphs.Graph, 'name={name} AND activity={activity}', { 
        name: name,
        activity: Smartgraphs.activityController.get('content')
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
    
    // add the initial data series and annotations
    var initial = this.get('initialSeries') || [];
    for (var i = 0, len = initial.get('length'); i < len; i++) {
      this.addObjectByName(Smartgraphs.DataSeries, initial.objectAt(i));
    }
    
    initial = this.get('initialAnnotations') || [];
    var annotation;
    for (i = 0, len = initial.get('length'); i < len; i++) {
      annotation = initial.objectAt(i);
      // FIXME we probably just want to have a session-scoped list of all annotation names mapped to types
      // so the type can be assumed from the name
      this.addObjectByName(SC.objectForPropertyPath(annotation.type), annotation.name);
    }
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
    the addSeries/addAnnotation methods.)
  */
  addObjectByName: function (objectType, objectName) {
    // first try to get the named series from the current session
    var query = SC.Query.local(objectType, 'name={name} AND session={session}', { 
      name: objectName,
      session: Smartgraphs.sessionController.getPath('content')
    });
    var objectList = Smartgraphs.store.find(query);
    
    if (objectList.get('length') < 1) {
      // get an example series if that's what has this name
      query = SC.Query.local(objectType, 'name={name} AND isExample=YES', { 
        name: objectName
      });
      objectList = Smartgraphs.store.find(query);
      if (objectList.get('length') < 1) return NO;
      
      // FIXME copy the object to the session before using it!
    }
  
    var object = objectList.objectAt(0);
    if (objectType === Smartgraphs.DataSeries) {
      this.addSeries(object);
      return YES;
    }
    if (object.get('isAnnotation')) {
      this.addAnnotation(object);
    }
  },

  addSeries: function (series) {
    if (this.findSeriesByName(series.get('name'))) {
      return;      // don't add the series if it is already in the graph!
    }
    
    // get a color for the series
    series.set('color', this.getColorForSeries(series));
    
    this.get('seriesList').pushObject(series);
    Smartgraphs.store.commitRecords();
  },

  /**
    Remove the named dataset from the graph.
  */
  removeSeries: function (name) {
    var seriesList = this.get('seriesList');
    var series = this.findSeriesByName(name);
    if (series) seriesList.removeObject(series);
  },
  
  addAnnotation: function (annotation) {
    if (this.findAnnotationByName(annotation.get('name'))) {
      return;
    }
    this.get('annotationList').pushObject(annotation);
    Smartgraphs.store.commitRecords();
  },
  
  /**
    Remove the named annotation from the graph.
  */
  removeAnnotation: function (name) {
    var annotationList = this.get('annotationList');
    var annotation = this.findAnnotationByName(name);
    if (annotation) annotationList.removeObject(annotation);
  },
  
  findSeriesByName: function (name) {
    return this.findObjectByNameIn(name, this.get('seriesList'));
  },
  
  findAnnotationByName: function (name) {
    return this.findObjectByNameIn(name, this.get('annotationList'));
  },
  
  findObjectByNameIn: function (name, list) {
    var names = list.getEach('name');
    var idx = names.indexOf(name);
    return (idx >= 0) ? list.objectAt(idx) : null;
  },
  
  /**
    a simple implementation for now...  Later, we can use color names, handle default colors a little more
    carefully, maybe cycle through colors if we have > 10 series on a graph (which we would ... why?)
  */
  getColorForSeries: function (series) {
    var defaultColor = series.get('defaultColor');
    var used = this.get('seriesList').getEach('color');
  
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

  inputAreaMouseDown: function (x, y) {
    if (this._routeEvents) {
      this._eventQueue.pushObject({
        x: x,
        y: y,
        type: Smartgraphs.freehandInputController.START
      });
    }
  },
  
  inputAreaMouseDragged: function (x, y) {
    if (this._routeEvents) {
      this._eventQueue.pushObject({
        x: x,
        y: y,
        type: Smartgraphs.freehandInputController.CONTINUE
      });
    }
  },
  
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
  //   Smartgraphs.store.commitRecords();
  // },
  // 
  // selectSeries: function (seriesName) {
  //   var series = this.findSeriesByName(seriesName);
  //   if (series) this.set('selectedSeries', series);
  // }
  
}) ;

Smartgraphs.GraphController.controllerForName = SC.Object.create({});
