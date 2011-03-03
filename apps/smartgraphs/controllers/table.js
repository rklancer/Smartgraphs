// ==========================================================================
// Project:   Smartgraphs.tableController
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('mixins/annotation_support');

/** @class

  Initial implementation of table controller. Currently only allows displaying a single dataset
  
  @extends SC.Object
  @extends Smartgraphs.AnnotationSupport
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
  
  selectionBinding: '*dataset.selection',
  isSelectableBinding: '*dataset.isSelectable',

  // These properties will be used to communicate to the table view. (These will change as the view becomes more
  // sophisticated.)
  
  isStreamingBinding: '*dataset.isStreaming',
  
  /**
    Whether to display the table at all and latest datapoint to display
  */
  showTable: function () {
    // SC.Binding.not() creates a single Binding object that ends up being shared by all TableController instances
    return !this.get('isStreaming');
  }.property('isStreaming').cacheable(),
  
  latestXBinding: '*dataset.latestPoint.xRounded',
  latestYBinding: '*dataset.latestPoint.yRounded',
  
  clear: function () {
    var datasetName = this.get('datasetName');
    
    if (datasetName) {
      Smartgraphs.TableController.controllerForDataset.set(datasetName, null);
    }
    
    this.clearAnnotations();
    this.set('content', null);
    this.set('dataset', null);
    this.set('datasetName', null);
  },
  
  /**
    Causes the table to display dataset `datasetName`.
    
    Waits for the specified graph to be opened by one of the graph controllers and waits for the dataset to be opened
    by that graph controller before setting our content to the set of points in the dataset.
  */
  openDataset: function (datasetName) {
    var currentDatasetName = this.get('datasetName'),
        dataset;
        
    if (currentDatasetName === datasetName) return YES;       // Nothing to do
    if (currentDatasetName) {
      // FIXME this method of handling dataset names will have problems with name collisions
      Smartgraphs.TableController.controllerForDataset.set(currentDatasetName, null);
    }
    Smartgraphs.TableController.controllerForDataset.set(datasetName, this);
    
    dataset = Smartgraphs.activityObjectsController.findDataset(datasetName);
    this.clear(); 
    this.set('datasetName', datasetName);
    this.set('dataset', dataset);
    this.set('content', dataset.get('points'));
  }

});

Smartgraphs.TableController.controllerForDataset = SC.Object.create({});
