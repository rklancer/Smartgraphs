// ==========================================================================
// Project:   Smartgraphs.tableController
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('mixins/annotation_support');

/** @class

  Initial implementation of table controller. Currently only allows displaying a single dataset, which must be open
  in a graph controller.
  
  @extends SC.Object
*/
Smartgraphs.TableController = SC.ArrayController.extend( Smartgraphs.AnnotationSupport,
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
  datasetName: null,

  /**
    The dataset being displayed, if any.
  */
  dataset: null,
  
  axesBinding: '*graphController.axes',
  selectionBinding: '*dataset.selection',

  // These properties will be used to communicate to the table view. (These will change as the view becomes more
  // sophisticated.)
  
  isStreamingBinding: '*dataset.isStreaming',
  
  showLabels: function () {
    return this.get('length') > 0;
  }.property('length').cacheable(),
  
  /**
    Whether to display the table at all and latest datapoint to display
  */
  showTable: function () {
    // SC.Binding.not() creates a single Binding object that ends up being shared by all TableConrtroller instances
    return !this.get('isStreaming');
  }.property('isStreaming').cacheable(),
  
  latestXBinding: '*dataset.latestPoint.xRounded',
  latestYBinding: '*dataset.latestPoint.yRounded',
  
  clear: function () {
    this.removeObservers();
    this.clearAnnotations();
    this.set('content', null);
    this.set('dataset', null);
    this.set('graphController', null);
    this.set('graphName', null);
    this.set('datasetName', null);
  },
  
  /**
    Causes the table to display dataset `datasetName`, which must be opened on graph `graphName`.
    
    Waits for the specified graph to be opened by one of the graph controllers and waits for the dataset to be opened
    by that graph controller before setting our content to the set of points in the dataset.
  */
  openDataset: function (graphName, datasetName) {
    var currentDatasetName = this.get('datasetName');
    if (currentDatasetName === datasetName) return YES;  // Nothing to do - unlikely, though
    this.clear();
    this.removeObservers();

    this.set('graphName', graphName);
    this.set('datasetName', datasetName);  
    if (currentDatasetName) {
      Smartgraphs.TableController.controllerForDataset.set(currentDatasetName, null);
    }
    Smartgraphs.TableController.controllerForDataset.set(datasetName, this);
    // TODO: This may be unnecessary
    this.waitForController();
  },

  // TODO: Refactor to remove this method
  waitForController: function () {
    var graphName = this.get('graphName');
    var datasetName = this.get('datasetName');
    
    var graphController = Smartgraphs.GraphController.controllerForName[graphName];
    if (graphController) {
      this.removeObservers();
      this.set('graphController', graphController);
      this.waitForDataset();
    }
    else {
      Smartgraphs.GraphController.controllerForName.addObserver(graphName, this, this.waitForController);
    }
  },
  
  // TODO: Refactor to remove this method
  waitForDataset: function () {
    var graphController = this.get('graphController');
    var datasetName = this.get('datasetName');
    
    var dataset = graphController.findDatasetByName(datasetName);
    if (dataset) {
      this.removeObservers();
      if (this.get('graphName') !== graphController.get('name')) {
        this.waitForController();
        return;
      }
      this.set('content', dataset.get('points'));
      this.set('dataset', dataset);
    }
    else {
      graphController.get('datasetList').addObserver('[]', this, this.waitForDataset);
    }
  },
  
  removeObservers: function () {
    var graphName = this.get('graphName');
    
    if (graphName) {
      Smartgraphs.TableController.controllerForDataset.removeObserver(graphName, this, this.waitForController);
      var graphController = this.get('graphController');
      if (graphController) {
        graphController.get('datasetList').removeObserver('[]', this, this.waitForDataset);
      }
    }
  },

  /**
    Add an annotation to this controller.
    
    This version overrides the mixin version by adding an observer to the incoming annotation.
    
    @param {Smartgraphs.Annotation} annotation
      The annotation to be added.
  */
  addAnnotation: function (annotation) {
    if (this.findAnnotationByName(annotation.get('name'))) {
      return; // Nothing to be done
    }
    var controller = this;
    this.get('annotationList').pushObject(annotation);
    if (annotation.kindOf(Smartgraphs.HighlightedPoint)) {
      // Watch this and update colors for datapoints if the point changes
      annotation.addObserver('point', this, 'updateDataPoints');
    }
  },

  /**
    Updates a value on the dataset based on changes in the annotations.
    
    If the annotation is a HighlightedPoint and its 'point' attribute changes, we want to update the
    dataset's DataPoints with appropriate backgroundColor attributes.
  */
  updateDataPoints: function (sender, key) {
    var dataset = this.get('dataset');
    if (sender.kindOf(Smartgraphs.HighlightedPoint) && (sender.get('point') !== undefined )) {
      dataset.get('points').forEach( function (point) {
        if (point == sender.get('point')) {
          point.set('backgroundColor', sender.get('color'));
        } else if (point.get('backgroundColor') == sender.get('color')) {
          // TODO: We need to remove the old highlight
          point.set('backgroundColor', null); // FIXME: This is a problem if there are two annotations with the same color
        }
      });
    }
  }

}) ;

Smartgraphs.TableController.controllerForDataset = SC.Object.create({});
