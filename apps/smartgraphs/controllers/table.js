// ==========================================================================
// Project:   Smartgraphs.tableController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Smartgraphs.TableController = SC.ArrayController.extend(
/** @scope Smartgraphs.tableController.prototype */ {
  
  graphController: null,
  graphName: null,
  seriesName: null,
  series: null,
  
  clear: function () {
    this.set('content', null);
    this.set('graphController', null);
    this.set('graphName', null);
    this.set('seriesName', null);
  },
  
  setLinkedSeries: function (graphName, seriesName) {
    this.removeObservers();

    this.set('graphName', graphName);
    this.set('seriesName', seriesName);  
    this.waitForController();
  },

  waitForController: function () {
    var graphName = this.get('graphName');
    var seriesName = this.get('seriesName');
    
    var graphController = Smartgraphs.GraphController.controllerForName[graphName];
    if (graphController) {
      this.removeObservers();
      this.set('graphController', graphController);
      this.waitForSeries();
    }
    else {
      Smartgraphs.GraphController.controllerForName.addObserver(graphName, this, this.waitForController);
    }
  },
  
  waitForSeries: function () {
    var graphController = this.get('graphController');
    var seriesName = this.get('seriesName');
    
    var series = graphController.findSeriesByName(seriesName);
    if (series) {
      this.removeObservers();
      if (this.get('graphName') !== graphController.get('name')) {
        this.waitForController();
        return;
      }
      this.set('content', series.get('points'));
      this.set('series', series);
      
      if (this._selectionBinding) this._selectionBinding.disconnect();
      this._selectionBinding = this.bind('selection', series, 'selection');
    }
    else {
      graphController.get('seriesList').addObserver('[]', this, this.waitForSeries);
    }
  },
  
  removeObservers: function () {
    var graphName = this.get('graphName');
    
    if (graphName) {
      Smartgraphs.GraphController.controllerForName.removeObserver(graphName, this, this.waitForController);
      var graphController = this.get('graphController');
      if (graphController) {
        graphController.get('seriesList').removeObserver('[]', this, this.waitForSeries);
      }
    }
  }
  
}) ;
