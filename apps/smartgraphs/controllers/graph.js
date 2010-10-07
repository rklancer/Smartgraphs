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
  
  seriesList: null,
  selectedSeries: null,
  annotationList: null,
  _routeEvents: NO,
  eventQueue: [],
  
  // from Protovis 'category10': http://vis.stanford.edu/protovis/docs/color.html
  colors: [
    "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"
  ],
  
  addAnnotations:function (annotations) {
    var annotation;
    for (var i = 0, arrayLength = annotations.get('length'); i < arrayLength; i++) {
      annotation = annotations.objectAt(i);
      // FIXME we probably just want to have a session-scoped list of all annotation names mapped to types
      // so the type can be assumed from the name
      this.addObjectByName(SC.objectForPropertyPath(annotation.type), annotation.name);
    }
  },

  /** follow the pattern that if object doesn't exist, create it in the db. */
  openGraph: function (graphId) {
    if (this.get('id') === graphId) return;    // nothing to do!

    var graph = Smartgraphs.store.find(Smartgraphs.Graph, graphId);

    if (!graph) {
      graph = Smartgraphs.store.createRecord(Smartgraphs.Graph, { id: graphId });
      Smartgraphs.store.commitRecords();
    }
    
    this.set('content', graph);
    this.set('seriesList', []);
    this.set('annotationList', []);
    
    // add the initial data series and annotations
    var initialSeries = this.get('initialSeries') || [];
    for (var i = 0, arrayLength = initialSeries.get('length'); i < arrayLength; i++) {
      var dataSeries = initialSeries.objectAt(i);
      this.addObjectByName(Smartgraphs.DataSeries, dataSeries);
    }
    
    var initialAnnotations = this.get('initialAnnotations') || [];
    this.addAnnotations(initialAnnotations);
  },
  
  setAxes: function (axesId) {
    var axes = Smartgraphs.store.find(Smartgraphs.Axes, axesId);
    if (!axes) {
      axes = Smartgraphs.store.createRecord(Smartgraphs.Axes, { guid: axesId });
    }
    
    this.set('axes', axes);
    Smartgraphs.store.commitRecords();
  },
  
  addSeries: function (series) {
    if (this.findSeriesByName(series.get('name'))) {
      return NO;      // don't add the series if it is already in the graph!
    }
    
    // get a color for the series
    series.set('color', this.getColorForSeries(series));
    
    this.get('seriesList').pushObject(series);
    Smartgraphs.store.commitRecords();
    return YES;
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
    // first try to get the named series or annotation from the current session
    var query = SC.Query.local(objectType, 'name={name} AND session={session}', { 
      name: objectName,
      session: Smartgraphs.sessionController.getPath('content')
    });
    var objectList = Smartgraphs.store.find(query);
    
    if (objectList.get('length') < 1) {
      // couldn't find the series or annotation,
      // so get an example series or annotation if that's what has this name
      query = SC.Query.local(objectType, 'name={name} AND isExample=YES', { 
        name: objectName
      });
      objectList = Smartgraphs.store.find(query);
      if (objectList.get('length') < 1) {
        console.warn("Failed to find a data series or annotation with objectName:",objectName);
        return NO;
      }
      
      // TODO: FIXME copy the object to the session before using it!
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
  
  /**
    Remove the named dataset from the graph.
  */
  removeSeries: function (seriesName) {
    var seriesList = this.get('seriesList');
    var series = this.findSeriesByName(seriesName);
    if (series) seriesList.removeObject(series);
  },
  
  /**
    Remove the named annotation from the graph.
  */
  removeAnnotation: function (annotationName) {
    var annotationList = this.get('annotationList');
    var annotation = this.findAnnotationByName(annotationName);
    if (annotation) annotationList.removeObject(annotation);
  },
  
  // TODO DRY up vs. findAnnotationByName
  findSeriesByName: function (seriesName) {
    var seriesList = this.get('seriesList');
    var series;

    for (var i = 0, len = seriesList.get('length'); i < len; i++) {
      series = seriesList.objectAt(i);
      if (series.get('name') === seriesName) {
        return series;
      }
    }
  },
  
  findAnnotationByName: function (annotationName) {
    var annotationList = this.get('annotationList');
    var annotation;
    for (var i = 0, len = annotationList.get('length'); i < len; i++) {
      annotation = annotationList.objectAt(i);
      if (annotation.get('name') === annotationName) {
        return annotation;
      }
    }
    return null;
  },
  
  selectSeries: function (seriesName) {
    var series = this.findSeriesByName(seriesName);
    if (series) this.set('selectedSeries', series);
  },
  
  removeAllSeries: function () {
    // TODO
  },
  
  addAnnotation: function (annotation) {
    // TODO: change from a warning or remove this logger call
    console.warn("addAnnotation called with annotation:",annotation);
    if (this.findAnnotationByName(annotation.get('name'))) {
      return NO;
    }
    this.get('annotationList').pushObject(annotation);
    return YES;
  },
  
  clear: function () {
    this.set('seriesList', []);
    this.set('annotationList', []);
    this.set('content', null);
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
}) ;
