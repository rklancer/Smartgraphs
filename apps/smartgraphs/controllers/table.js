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
  
  /**
    A RecordArray containing the results of a query for the datasets in this session with name equal to 
    this.datasetName. This is used so that the table controller can display a dataset with a given name, even if 
    the dataset hasn't been created as of the time the table is opened.
  */
  sessionDatasets: null,
  
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
    this.removeDatasetsObserver();
    this.set('sessionDatasets', null);    
  
    this.clearAnnotations();
    this.set('content', null);
    this.set('dataset', null);
    this.set('datasetName', null);
  },
  
  /**
    Causes the table to display dataset `datasetName`, which must be opened on graph `graphName`.
    
    Waits for the specified graph to be opened by one of the graph controllers and waits for the dataset to be opened
    by that graph controller before setting our content to the set of points in the dataset.
  */
  openDataset: function (datasetName) {
    var currentDatasetName = this.get('datasetName');
    if (currentDatasetName === datasetName) return YES;  // Nothing to do - unlikely, though

    this.clear(); 

    this.set('datasetName', datasetName);
    
    if (currentDatasetName) {
      Smartgraphs.TableController.controllerForDataset.set(currentDatasetName, null);
    }
    Smartgraphs.TableController.controllerForDataset.set(datasetName, this);
    
    // FIXME sessionController should manage this kind of thing
    
    var query = SC.Query.local(Smartgraphs.Dataset, 'name={name} AND session={session}', { 
      name: datasetName,
      session: Smartgraphs.sessionController.getPath('content')
    });
    var sessionDatasets = Smartgraphs.store.find(query);
    
    if (sessionDatasets.get('length') > 0) {
      this.useDataset(sessionDatasets.firstObject());
      return;
    }
    
    // no dataset with that name is found in the session, see if there's an example dataset with that name
      
    query = SC.Query.local(Smartgraphs.Dataset, 'name={name} AND isExample=YES', { 
      name: datasetName
    });
    var exampleDatasets = Smartgraphs.store.find(query);
    
    if (exampleDatasets.get('length') > 0) {
      this.useDataset(exampleDatasets.firstObject());
      return;
    }
    
    // No example or session dataset was found with that name. Wait to see if a dataset with the requested name
    // is created during this step, and use that one when it is available.
    
    this.set('sessionDatasets', sessionDatasets);
    sessionDatasets.addObserver('length', this, this.sessionDatasetsObserver);
  },
  
  sessionDatasetsObserver: function () {
    var sessionDatasets = this.get('sessionDatasets');
    if (sessionDatasets.get('length') > 0) {
      this.useDataset(sessionDatasets.firstObject());
    }
    this.removeDatasetsObserver();
    this.set('sessionDatasets', null);
  },
  
  removeDatasetsObserver: function () {
    var sessionDatasets = this.get('sessionDatasets');
    if (sessionDatasets) sessionDatasets.removeObserver('length', this, this.sessionDatasetsObserver);
  },  
  
  useDataset: function (dataset) {
    console.log("setting dataset to id %s:", dataset.get('id'));
    this.set('dataset', dataset);
    this.set('content', dataset.get('points'));
  },

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
