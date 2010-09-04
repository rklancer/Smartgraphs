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
  _routeEvents: NO,
  
  // follow the pattern that if object doesn't exist, create it in the db.
  openGraph: function (graphId) {
    var graph = Smartgraphs.store.find(Smartgraphs.Graph, graphId);
    if (!graph) {
      graph = Smartgraphs.store.createRecord(Smartgraphs.Graph, { id: graphId });
      Smartgraphs.store.commitRecords();
    }
    
    this.set('content', graph);
    this.set('seriesList', []);
    
    // add the initial series
    var initial = this.get('initialSeries');
    for (var i = 0, ii = initial.get('length'); i < ii; i++) {
      this.addSeriesByName(initial.objectAt(i));
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
    if (this.findSeries(series.get('name'))) {
      return NO;
    }
    this.get('seriesList').pushObject(series);
    Smartgraphs.store.commitRecords();
    return YES;
  },
  
  addSeriesByName: function (seriesName) {
    // first try to get the named series from the current session
    var query = SC.Query.local(Smartgraphs.DataSeries, 'name={name} AND session={session}', { 
      name: seriesName,
      session: Smartgraphs.sessionController.getPath('content')
    });
    var seriesList = Smartgraphs.store.find(query);
    
    if (seriesList.get('length') < 1) {
      // get an example series if that's what has this name
      query = SC.Query.local(Smartgraphs.DataSeries, 'name={name} AND isExample=YES', { 
        name: seriesName
      });
      seriesList = Smartgraphs.store.find(query);
      if (seriesList.get('length') < 1) return NO;
    }
  
    this.addSeries(seriesList.objectAt(0));
  },
  
  removeSeries: function (seriesName) {
    var seriesList = this.get('seriesList');
    var series = this.findSeries(seriesName);
    if (series) seriesList.removeObject(series);
  },
    
  findSeries: function (seriesName) {
    var seriesList = this.get('seriesList');
    var series;

    for (var i = 0, ii = seriesList.get('length'); i < ii; i++) {
      series = seriesList.objectAt(i);
      if (series.get('name') === seriesName) {
        return series;
      }
    }
  },
  
  selectSeries: function (seriesName) {
    var series = this.findSeries(seriesName);
    if (series) this.set('selectedSeries', series);
  },
  
  removeAllSeries: function () {
    // TODO
  },
  
  clear: function () {
    this.set('seriesList', []);
    this.set('content', []);
  },
  
  inputAreaMouseDown: function (x, y) {
    if (this._routeEvents) Smartgraphs.freehandInputController.startAt(x, y);
  },
  
  inputAreaMouseDragged: function (x, y) {
    if (this._routeEvents) Smartgraphs.freehandInputController.continueAt(x, y);
  },
  
  inputAreaMouseUp: function (x, y) {
    if (this._routeEvents) Smartgraphs.freehandInputController.endAt(x, y);
  },
  
  startFreehandInput: function () {
    this._routeEvents = YES;
  },
  
  endFreehandInput: function () {
    this._routeEvents = NO;
  }
}) ;
