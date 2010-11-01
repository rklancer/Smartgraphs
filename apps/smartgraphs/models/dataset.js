// ==========================================================================
// Project:   Smartgraphs.Dataset
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
sc_require('views/dataset');

Smartgraphs.Dataset = SC.Record.extend(
/** @scope Smartgraphs.Dataset.prototype */ {

  url: SC.Record.attr(String),
  primaryKey: 'url',
  
  /**
   The name of this dataset. Used to reference this dataset within an activity definition.
  */
  name: SC.Record.attr(String),
  
  /**
    The activity this dataset is part of
  */
  activity: SC.Record.toOne('Smartgraphs.Activity'),
  
  /**
    The session this dataset is associated with, if any. (Datasets with isExample = YES are not associated with a 
    specific session.)
    
    Authors reference datasets by name, and names are scoped to sessions. Smartgraphs looks for the dataset in the 
    current session; if not found, it looks for an example dataset with that name.
  */
  session: SC.Record.toOne('Smartgraphs.Session'),

  /** 
    Whether this is an immutable "example" dataset (e.g., example data created by the activity author)
    or if it is a session-scoped dataset created or manipulated by the student.
  */
  isExample: SC.Record.attr(Boolean),
  
  /**
  
    The actual datapoints in this dataset.
  */
  points: SC.Record.toMany('Smartgraphs.DataPoint', { inverse: 'dataset' } ),

  /**
   The color to use to represent points in this dataset. Will be used when this dataset is graphed, unless another
   dataset on the same graph is already using the same color when this dataset is added to the graph.
  */
  defaultColor: SC.Record.attr(String),
  
  /**
    SelectionSet representing the current selection.
  */
  selection: null,
  
  /**
    The color used to represent points in this dataset, if it is being shown in a graph.
  */
  color: null,

  /**
    Whether data is *currently* being streamed into this dataset. Set to YES when sensor of freehand input controller
    start recording, and set back to NO when they stop. Is otherwise NO. 
    
    Expect this to change as we develop more robust graph/table/dataset/stream/annotation models.
  */
  isStreaming: NO,
  
  /**
    The controller (or other object) that is streaming data into the dataset
  */
  streamSouce: null,
  
  /**
    The most recently added data point, if streaming
  */
  latestPoint: SC.Record.toOne('Smartgraphs.DataPoint'),
  
  /*
    if nonnull, and isStreaming is YES, then this represents the expected length of the array after the currently
    streaming data is finished streaming.
  */
  expectedLength: null

}) ;

Smartgraphs.Dataset.viewClass = Smartgraphs.DatasetView;
