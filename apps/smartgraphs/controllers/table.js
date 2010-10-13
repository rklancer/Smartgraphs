// ==========================================================================
// Project:   Smartgraphs.tableController
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  Initial implementation of table controller. Currently only allows displaying a single dataset, which must be open
  in a graph controller.
  
  @extends SC.Object
*/
Smartgraphs.TableController = SC.ArrayController.extend(
/** @scope Smartgraphs.tableController.prototype */ {
  
  /**
    The graph controller that has this dataset open. (Currently we require a dataset to be opened in a graph view
    before it can be viewed in a table, but this will change.)
  */
  graphController: null,
  
  /**
    The name of the graph opened by the graphController. We find the graph controller by name.
  */
  graphName: null,
  
  /**
    The name of the dataset being displayed. We find the dataset by name.
  */
  seriesName: null,

  /**
    The dataset being displayed, if any.
  */
  series: null,
  
  axesBinding: '*graphController.axes',
  selectionBinding: '*series.selection',

  // These properties will be used to communicate to the table view. (These will change as the view becomes more
  // sophisticated.)
  
  /**
    Whether to display the table at all and latest datapoint to display
  */
  showTableBinding: SC.Binding.not('*series.isStreaming'),
  latestXBinding: '*series.latestPoint.xRounded',
  latestYBinding: '*series.latestPoint.yRounded',
  
  
  clear: function () {
    this.removeObservers();
    this.set('content', null);
    this.set('series', null);
    this.set('graphController', null);
    this.set('graphName', null);
    this.set('seriesName', null);
  },
  
  /**
    Causes the table to display dataset `seriesName`, which must be opened on graph `graphName`.
    
    Waits for the specified graph to be opened by one of the graph controllers and waits for the dataset to be opened
    by that graph controller before setting our content to the set of points in the dataset.
  */
  openDataset: function (graphName, seriesName) {
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
