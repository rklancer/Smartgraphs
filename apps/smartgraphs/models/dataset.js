// ==========================================================================
// Project:   Smartgraphs.Dataset
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('views/dataset');

/** @class

  A Dataset record represents an unordered set of DataPoint records that can be displayed on a graph or table.
  
  Datasets are  referenced by name throughout an activity, and that name should be unique within an activity.

  @extends SC.Record
  @version 0.1
*/

Smartgraphs.Dataset = SC.Record.extend(
/** @scope Smartgraphs.Dataset.prototype */ {

  /**
    The primary key of an Dataset record is technically its url. However, datasets are referenced by name within an
    activity, so that the activity can be serialized.
    
    @property {String}
  */
  url: SC.Record.attr(String),
  primaryKey: 'url',
  
  /**
    The name of this dataset. Used to reference this dataset within an activity.

    @property {String}
  */
  name: SC.Record.attr(String),
  
  /**
    The Activity this dataset is part of.
    
    @property {Smartgraphs.Activity}
  */
  activity: SC.Record.toOne('Smartgraphs.Activity'),
  
  /**
    The session this dataset is associated with. (When a user begins running an activity, any new datasets
    created during the run of the activity, and any modifications to datasets pre-defined by the author, are 
    buffered to a nested data store. When the user's session state is saved, the new or modified datasets are
    uploaded to the server, and the buffered changes are dropped.)
    
    @property {Smartgraphs.Session}
  */
  session: SC.Record.toOne('Smartgraphs.Session'),

  /**
    The (unordered) set of Datapoints in this dataset.
    
    @property {Smartgraphs.DataPoint[]}
  */
  points: SC.Record.toMany('Smartgraphs.DataPoint', { inverse: 'dataset' } ),

  /**
    The color to use to represent points in this dataset. Will be used when this dataset is graphed, unless another
    dataset on the same graph is already using the same color when this dataset is added to the graph.
    
    @property {String}
  */
  defaultColor: SC.Record.attr(String),
  
  /**
    SelectionSet representing the currently selected DataPoints, if any. May be null.
    
    @property {SC.SelectionSet}
  */
  selection: null,
  
  /**
    Whether the user can click to select points.
    
    @property {Boolean}
  */
  isSelectable: YES,
  
  /**
    The color actually being used to represent points in this dataset, if it is being shown on a graph. (Transient 
    property.)
    
    @property {String}
  */
  color: null,

  /**
    Whether data is *currently* being streamed into this dataset. Set to YES when sensor of freehand input controller
    start recording, and set back to NO when they stop. Is otherwise NO. 
    
    Expect this to change as we develop more robust graph/table/dataset/stream/annotation models.
    
    @property {Boolean}
  */
  isStreaming: NO,
  
  /**
    The controller (or other object) that is streaming data into the dataset
    
    @property {SC.Controller}
  */
  streamSouce: null,
  
  /**
    The most recently added data point, if streaming.
    
    @property {Smartgraphs.DataPoint}
  */
  latestPoint: null,
  
  /**
    If nonnull, and isStreaming is YES, then this represents the expected length of the array after the currently
    streaming data is finished streaming.
    
    @property {Number | null}
  */
  expectedLength: null

}) ;

Smartgraphs.Dataset.viewClass = Smartgraphs.DatasetView;
