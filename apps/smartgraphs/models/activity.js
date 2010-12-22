// ==========================================================================
// Project:   Smartgraphs.Activity
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  A guide, or wizard, that steps a user through some activity.

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.Activity = SC.Record.extend(
/** @scope Smartgraphs.Activity.prototype */ {

  url: SC.Record.attr(String),
  primaryKey: 'url',
  
  /** 
    The title of this Activity.
    
    @property(String)
  */
  title: SC.Record.attr(String),
  
  /** 
    The username of the user who 'owns' this Activity.
    
    @property(String)
  */
  owner: SC.Record.attr(String),
  
  /**
    The ActivityPages that make up this Activity.
    
    @property(Smartgraphs.ActivityPage[])
  */
  pages: SC.Record.toMany('Smartgraphs.ActivityPage', { inverse: 'activity', orderBy: 'index' }),
  
  /**
    Axes that are part of the activity
    
    @property(Smartgraphs.Axes[])
  */
  axes: SC.Record.toMany('Smartgraphs.Axes', { inverse: 'activity' }),
  
  /**
    Graphs that are part of th activity
    
    @property(Smartgraphs.Graph[])
  */
  graphs: SC.Record.toMany('Smartgraphs.Graph', { inverse: 'activity' }),
  
  /**
    Datasets that are part of the activity
    
    @property(Smartgraphs.Dataset[])
  */
  datasets: SC.Record.toMany('Smartgraphs.Dataset', { inverse: 'activity' }),
  
  /**
    Serialized form convertible to JSON
    
    @property {Object}
  */
  serialize: function () {
    var ret = {};
    var store = this.get('store');
    
    ret.activity = store.readDataHash(this.get('storeKey'));
    
    var pages = this.get('pages');
    ret.pages = pages.map( function (page) { return page.serialize(); } );
    var steps = pages.map( function (page) { return page.get('steps').map( function (step) { return step.serialize(); } ); } );
    ret.steps = Array.prototype.concat.apply([], steps);

    var axes = this.get('axes');
    ret.axes = axes.map( function (axes) { return axes.serialize(); } );
    var graphs = this.get('graphs');
    ret.graphs = graphs.map( function (graph) { return graph.serialize(); } );
    
    var datasets = this.get('datasets');
    ret.datasets = datasets.map( function (dataset) { return dataset.serialize(); } );
    // FIXME datasets should serialize to an array of points; at the moment, datapoint ids (just integers) are likely to collide
    var datapoints = datasets.map( function (dataset) { return dataset.get('points').map( function (point) { return point.serialize(); } ); } );
    ret.datapoints = Array.prototype.concat.apply([], datapoints);
    
    return ret;
  }.property()

}) ;
