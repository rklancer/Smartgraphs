// ==========================================================================
// Project:   Smartgraphs.Graph
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  A Graph object represents a graph. It contains a number of default settings, such as which Axes to draw the graph
  on (Axes records contain the x- and y-axis labels and ranges), the datasets and annotations to display, the title of
  the graph, etc.
  
  Graphs are referenced within the activity by the name given to them by the activity author.
  
  Currently the semantics of a Graph object are such that, when a given ActivityStep requests that the top pane
  be a graph displaying "Graph X", then the GraphController corresponding to that pane "opens" the Graph in the
  current activity which has the name "Graph X". Subsequent manipulations of that graph by the user of the activity
  are <b>transient</b>; in other words, if a dataset is added by the student, that dataset does automatically show
  up after the graph is closed and then reopened (as it would be if the same graph is referenced by name in a later 
  activity page.)
  
  Although it would be possible to use a command to add the new dataset to the reopened graph, an alternative would 
  be to create a new graph that lists the new dataset in its <code>initialDatasets</code> array.
  
  This behavior may not be optimal, and may change.

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.Graph = SC.Record.extend(
/** @scope Smartgraphs.Graph.prototype */ {

  url: SC.Record.attr(String),
  primaryKey: 'url',
  
  /**
    The activity this graph is part of.
    
    @property {Smartgraphs.Activity}
  */
  activity: SC.Record.toOne('Smartgraphs.Activity', { inverse: 'graphs', isMaster: YES} ),
  
  /**
    The name of this graph. This is exposed to authors and is used whenever the graph needs to be referenced elsewhere
    in the activity.

    @property {String}
  */
  name: SC.Record.attr(String),
  
  /**
    Optional description of the graph for authors' reference.
    
    @property {String}
  */
  description: SC.Record.attr(String),
  
  /**
    Title of the graph as seen by learners. Unlike the name (which should be constant, so that authors can
    reference the graph at different locations in the activity) the title can be changed. Authors may even ask users 
    to provide their own title.
    
    @property {String}
  */
  title: SC.Record.attr(String),
  
  /**
    The Axes record determines the x and y axis ranges and labels.
    
    @property {Smartgraphs.Axes}
  */
  axes: SC.Record.toOne('Smartgraphs.Axes'),
  
  /**
    Names of any datasets that should be shown on the graph whenever it is opened.
    
    @property {String[]} initialDatasets
  */
  initialDatasets: SC.Record.attr(Array),

  /**
    Names of any annotations that should be shown on the graph whenever it is opened. 
    
    @property {String[]} initialAnnotations
  */
  initialAnnotations: SC.Record.attr(Array)
    
}) ;
