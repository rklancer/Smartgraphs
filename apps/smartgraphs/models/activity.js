// ==========================================================================
// Project:   Smartgraphs.Activity
// Copyright: ©2010 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  A guide, or wizard, that steps a user through some activity.

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.Activity = SC.Record.extend(
/** @scope Smartgraphs.Activity.prototype */ {

  init: function () {
    this.set('annotations', []);
  },
  
  /** 
    The (relative) URL at which this Activity can be found. Also its primary key in the datastore.
  */
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
    
    @property(Smartgraphs.Axis[])
  */
  axes: SC.Record.toMany('Smartgraphs.Axis', { inverse: 'activity' }),

  /**
    Units defined in this activity.
    
    @property(Smartgraphs.Unit[])
  */
  units: SC.Record.toMany('Smartgraphs.Unit', { inverse: 'activity' }),
  
  /**
    Graphs that are part of the activity
    
    @property(Smartgraphs.Graph[])
  */
  graphs: SC.Record.toMany('Smartgraphs.Graph', { inverse: 'activity' }),
  
  /**
    Datasets that are part of the activity
    
    @property(Smartgraphs.Dataset[])
  */
  datasets: SC.Record.toMany('Smartgraphs.Dataset', { inverse: 'activity' }),
  
  /**
    Annotations defined as part of this activity. Not persisted to the database.
    
    @property(Smartgraphs.Annotation[])
  */
  annotations: null,
  
  /**
    Variables defined as part of this activity.
    
    @property(Smartgraphs.Variable[])
  */
  variables: SC.Record.toMany('Smartgraphs.Variable', { inverse: 'activity' }),
  
  /**
    ResponseTemplates used in this activity
    
    @property(Smartgraphs.ResponseTemplate[])
  */
  responseTemplates: SC.Record.toMany('Smartgraphs.ResponseTemplate', { inverse: 'activity' }),
  
  /**
    Serialized form convertible to JSON
    
    @returns {Object}
  */
  serialize: function () {
    var ret = {};
    var store = this.get('store');
    
    ret.activity = store.readDataHash(this.get('storeKey'));
    
    var pages = this.get('pages');
    ret.pages = pages.map( function (page) { return page.serialize(); } );
    var steps = pages.map( function (page) { return page.get('steps').map( function (step) { return step.serialize(); } ); } );
    ret.steps = Array.prototype.concat.apply([], steps);

    var units = this.get('units');
    ret.units = units.map( function (unit) { return unit.serialize(); } );
    
    var axes = this.get('axes');
    ret.axes = axes.map( function (axis) { return axis.serialize(); } );

    var responseTemplates = this.get('responseTemplates');
    ret.responseTemplates = responseTemplates.map( function (responseTemplate) { return responseTemplate.serialize(); });
    
    var datasets = this.get('datasets');
    ret.datasets = datasets.map( function (dataset) { return dataset.serialize(); } );
    // FIXME datasets should serialize to an array of points; at the moment, datapoint ids (just integers) are likely to collide
    var datapoints = datasets.map( function (dataset) { return dataset.get('points').map( function (point) { return point.serialize(); } ); } );
    ret.datapoints = Array.prototype.concat.apply([], datapoints);

    var variables = this.get('variables');
    ret.variables = variables.map( function (variable) { return variable.serialize(); } );
    
    var self = this;
    ret.annotations = [];
    Smartgraphs.Annotation.typeNames().forEach(function (typeName) {
      var annotationType = Smartgraphs[typeName],
          query = SC.Query.local(annotationType, 'activity={activity}', {
            activity: self
          }),
          annotations = store.find(query).filter(function (annotation) { return annotation.constructor === annotationType; });
      
      if (annotations.get('length') > 0) {
        ret.annotations.push({
          type: typeName,
          records: annotations.map( function (annotation) { return annotation.serialize(); } )
        });
      }
    });
    

    return ret;
  }

}) ;
