// ==========================================================================
// Project:   Smartgraphs.GraphController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.ObjectController
*/
Smartgraphs.GraphController = SC.ObjectController.extend(SC.Responder, 
/** @scope Smartgraphs.graphController.prototype */ {
  
  // follow the pattern that if object doesn't exist, create it in the db.
  openGraph: function (graphId) {
    var graph = Smartgraphs.store.find(Smartgraphs.Graph, graphId);
    if (!graph) {
      graph = Smartgraphs.store.createRecord(Smartgraphs.Graph, { id: graphId });
      Smartgraphs.store.commitRecords();
    }
    
    this.set('content', graph);
  },
  
  setAxes: function (axesId) {
    var axes = Smartgraphs.store.find(Smartgraphs.Axes, axesId);
    if (!axes) {
      axes = Smartgraphs.store.createRecord(Smartgraphs.Axes, { guid: axesId });
    }
    
    this.set('axes', axes);
    Smartgraphs.store.commitRecords();
  },
  
  addSeries: function (seriesId) {
    var series = Smartgraphs.store.find(Smartgraphs.DataSeries, seriesId);
    if (!series) {
      series = Smartgraphs.store.createRecord(Smartgraphs.DataSeries, { guid: seriesId });
    }

    this.get('allSeries').pushObject(series);
    Smartgraphs.store.commitRecords();
  },
  
  removeSeries: function (seriesId) {
    var allSeries = this.get('allSeries');
    var series;
  
    for (var i = 0, ii = allSeries.get('length'); i < ii; i++) {
      series = allSeries.objectAt(i);
      if (series.get('id') === seriesId) {
        allSeries.removeObject(series);
        break;
      }
    }
  },
  
  removeAllSeries: function () {
    // TODO
  },
  
  view: function () {
    return Smartgraphs.getPath(this.get('viewPath'));
  }.property(),
  
  startRoutingInputEvents: function () {
    var axesView = this.getPath('view.graphCanvasView.axesView');
    axesView.set('shouldNotifyController', YES);
    axesView.set('controller', this);
  },
  
  stopRoutingInputEvents: function () {
    var axesView = this.getPath('view.graphCanvasView.axesView');    
    axesView.set('shouldNotifyController', NO);
  },
  
  inputAreaMouseDown: function (x, y) {
    console.log('recorded mouseDown at %f, %f', x, y);
    Smartgraphs.sendAction('startGraphInputAt', this, { x: x, y: y });
  },
  
  inputAreaMouseDragged: function (x, y) {
    console.log('recorded mouseDragged at %f, %f', x, y);
    Smartgraphs.sendAction('continueGraphInputAt', this, { x: x, y: y });
  },
  
  inputAreaMouseUp: function (x, y) {
    console.log('recorded mouseUp at %f, %f', x, y);
    Smartgraphs.sendAction('endGraphInputAt', this, { x: x, y: y });
  }
  
  
}) ;
