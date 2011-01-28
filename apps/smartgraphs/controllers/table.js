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
  
  showLabels: function () {
    return this.get('length') > 0;
  }.property('length').cacheable(),
  
  /**
    Whether to display the table at all and latest datapoint to display
  */
  showTable: function () {
    // SC.Binding.not() creates a single Binding object that ends up being shared by all TableController instances
    return !this.get('isStreaming');
  }.property('isStreaming').cacheable(),
  
  latestXBinding: '*dataset.latestPoint.xRounded',
  latestYBinding: '*dataset.latestPoint.yRounded',
  
  pendingDatasetName: null,
  datasetNamesBinding: 'Smartgraphs.activityObjectsController.datasetNames',
  datasetNamesBindingDefault: SC.Binding.oneWay(),
  
  clear: function () {
    this.set('pendingDatasetName', null);
  
    this.clearAnnotations();
    this.set('content', null);
    this.set('dataset', null);
    if (this.get('datasetName')) {
      Smartgraphs.TableController.controllerForDataset.set(this.get('datasetName'), null);
    }
    this.set('datasetName', null);
  },
  
  /**
    Causes the table to display dataset `datasetName`.
    
    Waits for the specified graph to be opened by one of the graph controllers and waits for the dataset to be opened
    by that graph controller before setting our content to the set of points in the dataset.
  */
  openDataset: function (datasetName) {
    var currentDatasetName = this.get('datasetName');
    if (currentDatasetName === datasetName) return YES;  // Nothing to do - unlikely, though

    this.clear(); 

    this.set('datasetName', datasetName);
    
    if (currentDatasetName) {
      // FIXME this method of handling dataset names will have problems with name collisions
      Smartgraphs.TableController.controllerForDataset.set(currentDatasetName, null);
    }
    Smartgraphs.TableController.controllerForDataset.set(datasetName, this);
    this.set('pendingDatasetName', datasetName);
    this.maybeUsePendingDataset();
  },
  
  // a first implementation of lazy loading of activity objects
  maybeUsePendingDataset: function () {
    var pendingDatasetName = this.get('pendingDatasetName');
    if (!pendingDatasetName) return;
    
    var datasetNames = Smartgraphs.activityObjectsController.get('datasetNames');
    
    if (datasetNames && datasetNames.indexOf(pendingDatasetName) >= 0) {
      var dataset = Smartgraphs.activityObjectsController.findDataset(pendingDatasetName);
      this.set('dataset', dataset);
      this.set('content', dataset.get('points'));
      this.set('pendingDatasetName', null);
    }
  }.observes('datasetNames'),

  /**
    Add an annotation to this controller.
    
    This version overrides the mixin version by adding an observer to the incoming annotation.
    
    @param {Smartgraphs.Annotation} annotation
      The annotation to be added.
  */
  addAnnotation: function (annotation) {
    sc_super();
    if (annotation.kindOf(Smartgraphs.HighlightedPoint)) {
      // Watch this and update colors for datapoints if the point changes
      console.log("**** TABLECONTROLLER ADDING OBSERVER");
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
        } 
        else if (point.get('backgroundColor') == sender.get('color')) {
          // We need to remove the old highlight. Use '' rather than null or undefined to make the binding sync
          point.set('backgroundColor', ''); // FIXME: This is a problem if there are two annotations with the same color
        }
      });
    }
  }

}) ;

Smartgraphs.TableController.controllerForDataset = SC.Object.create({});
