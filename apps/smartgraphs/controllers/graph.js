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
  
  // follow the pattern that if object doesn't exist, create it in the db.
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
    var initial = this.get('initialSeries') || [];
    for (var i = 0, ii = initial.get('length'); i < ii; i++) {
      this.addObjectByName(Smartgraphs.DataSeries, initial.objectAt(i));
    }
    
    initial = this.get('initialAnnotations') || [];
    var annotation;
    for (i = 0, ii = initial.get('length'); i < ii; i++) {
      annotation = initial.objectAt(i);
      // FIXME we probably just want to have a session-scoped list of all annotation names mapped to types
      // so the type can be assumed from the name
      this.addObjectByName(SC.objectForPropertyPath(annotation.type), annotation.name);
    }
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
      return NO;
    }
    this.get('seriesList').pushObject(series);
    Smartgraphs.store.commitRecords();
    return YES;
  },
  
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
  
  removeSeries: function (seriesName) {
    var seriesList = this.get('seriesList');
    var series = this.findSeriesByName(seriesName);
    if (series) seriesList.removeObject(series);
  },
  
  
  // TODO DRY up vs. findAnnotationByName
  findSeriesByName: function (seriesName) {
    var seriesList = this.get('seriesList');
    var series;

    for (var i = 0, ii = seriesList.get('length'); i < ii; i++) {
      series = seriesList.objectAt(i);
      if (series.get('name') === seriesName) {
        return series;
      }
    }
  },
  
  findAnnotationByName: function (annotationName) {
    var annotationList = this.get('annotationList');
    var annotation;
    for (var i = 0, ii = annotationList.get('length'); i < ii; i++) {
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
