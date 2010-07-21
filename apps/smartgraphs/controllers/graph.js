// ==========================================================================
// Project:   Smartgraphs.GraphController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.ObjectController
*/
Smartgraphs.GraphController = SC.ObjectController.extend(
/** @scope Smartgraphs.graphController.prototype */ {
  
  // follow the pattern that if object doesn't exist, create it in the db.
  openGraph: function (graphId) {
    console.log('openGraph(', graphId, ')');
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
    this.selectSeries(series);
  },
  
  selectSeries: function (series) {
    //TODO
  },
  
  removeSeries: function (seriesId) {
    //TODO
  },
  
  removeAllSeries: function () {
    //TODO
  }
  
}) ;