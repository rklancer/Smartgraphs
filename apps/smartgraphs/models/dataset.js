// ==========================================================================
// Project:   Smartgraphs.Dataset
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('views/dataset');

/** @class

  A Dataset record represents an unordered set of DataPoint records that can be displayed on a graph or table.
  
  Analogously to Annotations, Datasets can be 'example' datasets, created by the activity author when the activity is
  written, or 'session-scoped' datasets, created by the student during a session with the activity. Datasets are 
  referenced by name throughout an activity, and that name should be unique within an activity or session. When a 
  dataset with a given name is requested, a 'session-scoped' dataset with that name, scoped to the current session, is
  searched for; if none is found, then an example activity corresponding to the current activity is searched for as a
  fallback.  

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
    If isExample == YES, this is an immutable "example" dataset (i.e., example data created by the activity author.)
    If isExample == NO, this is a session-scoped dataset created or manipulated by the student during the current
    activity session.
    
    @property {Boolean}
  */
  isExample: SC.Record.attr(Boolean),
  
  /**
    The Activity this dataset is part of.
    
    @property {Smartgraphs.Activity}
  */
  activity: SC.Record.toOne('Smartgraphs.Activity'),
  
  /**
    The session this dataset is associated with, if any. (Datasets with isExample = YES are not associated with a 
    specific session.)
    
    Authors reference datasets by name, and names are scoped to sessions. Smartgraphs looks for the dataset in the 
    current session; if not found, it looks for an example dataset with that name.

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
