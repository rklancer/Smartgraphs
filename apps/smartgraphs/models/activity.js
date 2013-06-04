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
    Datadefs that are part of the activity.

    @property(Smartgraphs.Datadef[])
  */
  datadefs: function () {
    this._datadefsQuery = this._datadefsQuery || SC.Query.local(Smartgraphs.Datadef, 'activity={activity}', { activity: this });
    return this.get('store').find(this._datadefsQuery);
  }.property(),     // note that find() returns a cached copy of the recordarray (whose contents update live)

  /**
    Datarefs that are part of the activity.

    @property(Smartgraphs.Dataref[])
  */
  datarefs: function () {
    this._datarefsQuery = this._datarefsQuery || SC.Query.local(Smartgraphs.Dataref, 'activity={activity}', { activity: this });
    return this.get('store').find(this._datarefsQuery);
  }.property(),     // note that find() returns a cached copy of the recordarray (whose contents update live)

  /**
    Annotations defined as part of this activity.

    @property(Smartgraphs.Annotation[])
  */
  annotations: function () {
    this._annotationsQuery = this._annotationsQuery || SC.Query.local(Smartgraphs.Annotation, 'activity={activity}', { activity: this });
    return this.get('store').find(this._annotationsQuery);
  }.property(),

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

    var variables = this.get('variables');
    ret.variables = variables.map( function (variable) { return variable.serialize(); } );

    var self = this;

    // Serialize both Datadefs and Annotations as [ { type: blah, records: [ {<one record}, ...] }, { type: } ]

    var serializeSubclasses = function (parentClass) {
      var ret = [];
      parentClass.typeNames().forEach(function (typeName) {
        var subclassType    = Smartgraphs[typeName],
            query           = SC.Query.local(subclassType, 'activity={activity}', { activity: self }),
            subclassObjects = store.find(query).filter(function (obj) { return obj.constructor === subclassType; });

        if (subclassObjects.get('length') > 0) {
          ret.push({
            type: typeName,
            records: subclassObjects.map( function (obj) { return obj.serialize(); } )
          });
        }
      });
      return ret;
    };

    ret.datadefs = serializeSubclasses(Smartgraphs.Datadef);
    ret.datarefs = serializeSubclasses(Smartgraphs.Dataref);
    ret.annotations = serializeSubclasses(Smartgraphs.Annotation);

    return ret;
  }

}) ;
