// ==========================================================================
// Project:   Smartgraphs.activityObjectsController
// Copyright: ©2010-2011 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  This controller maintains a registry of the names of all "activity objects" associated with the current activity
  session.(Right now, "activity objects" means the datadefs and annotations associated with an activity.)

  This controller handles:
    (a) loading the initial set of datadefs and annotations (those defined in the activity document) into the session
    (b) finding datadefs and annotations by name in the current session
    (c) TODO: in authoring mode, maintaining a list of the datadefs, annotations, etc associated with the activity

  TODO: perhaps eventually this should be an actual ObjectController pointing to an ActivityObjectList associated
  with the current activity; right now, it's just a gussied-up SC.Object.

  @extends SC.Controller
*/
Smartgraphs.activityObjectsController = SC.Controller.create(
/** @scope Smartgraphs.activityObjectsController.prototype */ {

  /**
    @private

    All annotations available to the activity session, indexed by name.
  */
  _annotations: {},

  /**
    @private

    All datadefs available to the activity session, indexed by name.
  */
  _datadefs: {},

  /**
    @private

    All datarefs available to the activity session, indexed by name.
  */
  _datarefs: {},
  /**
    @private

    All variables available to the activity session, indexed by name.
  */
  _variables: {},

  /**
    @private

    All tags available to the activity session, indexed by name.
  */
  _tags: {},

  /**
    When an activity session is started, call this method to populate the registry of datadef and annotation names
    with the names of the datadefs and annotations predefined the activity document (all other datadefs and
    annotations will be removed from the registry).

    This method expects that Smartgraphs.store is a "clean slate"; that is, that it contains no datadef or annotation
    records which reference the current activity but that were not predefined. This is normally taken care of by the
    sessionController just before loadPredefinedObjects is called.
  */
  loadPredefinedObjects: function () {
    var activity,
        findObjects,
        self = this;

    this._datadefs = {};
    this._datarefs = {};
    this._annotations = {};
    this._variables = {};
    this._tags = {};

    findObjects = function (type, typeName, hash) {
      var query = SC.Query.local(type, 'activity={activity}', { activity: activity }),
          found = Smartgraphs.store.find(query);

      if ( !(found.get('status') & SC.Record.READY)) {
        throw "predefined %@ records are not READY!".fmt(typeName);
      }

      found.forEach(function (rec) {
        var name = rec.get('name');

        // don't index anonymous annotations (which must therefore be referenced by a collection annotation, e.g, a
        // LabelSet manages a set of nameless Labels)
        if (SC.none(name)) return;

        if (hash[name]) {
          throw "The activity contains multiple %@ records named '%@'".fmt(typeName, name);
        }
        hash[name] = rec;
      });
    };

    activity = Smartgraphs.activityController.get('content');
    if (activity) {
      findObjects(Smartgraphs.Datadef,    'datadef',    this._datadefs);
      findObjects(Smartgraphs.Dataref,    'dataref',    this._datarefs);
      findObjects(Smartgraphs.Annotation, 'annotation', this._annotations);
      findObjects(Smartgraphs.Variable,   'variable',   this._variables);
      findObjects(Smartgraphs.Tag,        'tag',        this._tags);
    }

    this.notifyPropertyChange('datadefNames');
    this.notifyPropertyChange('datarefNames');
    this.notifyPropertyChange('annotationNames');
    this.notifyPropertyChange('variableNames');
  },

  /**
    Returns the datadef with the given name in the current activity session, or undefined if the specified name does
    not correspond to a datadef in the current activity session.

    @param name The name of the datadef.

    @returns {Smartgraphs.Datadef|undefined}
  */
  findDatadef: function (name) {
    return this._datadefs[name];
  },

  /**
    Returns the dataref with the given name in the current activity session, or undefined if the specified name does
    not correspond to a dataref in the current activity session.

    @param name The name of the dataref.

    @returns {Smartgraphs.Datadef|undefined}
  */
  findDataref: function (name) {
    return this._datarefs[name];
  },

  /**
    Returns the annotation with the given name in the current activity session, or undefined if the specified name
    does not correspond to an annotation in the current activity session.

    @param name The name of the annotation.

    @returns {Smartgraphs.Annotation|undefined}
  */
  findAnnotation: function (name) {
    return this._annotations[name];
  },

  /**
    Returns the variable with the given name in the current activity session, or undefined if the specified name
    does not correspond to a variable in the current activity session.

    @param name The name of the variable.

    @returns {Smartgraphs.Variable|undefined}
  */
  findVariable: function (name) {
    return this._variables[name];
  },

  /**
    Set the value of a variable in the current activity session, creating one if necessary

    @param name
      The name of the variable
    @param value
      The value to set

    @returns {Smartgraphs.Variable}
      The variable instance
  */
  setVariable: function (name, value) {
    var variable = this._variables[name];

    if (!variable) {
      variable = Smartgraphs.store.createRecord(Smartgraphs.Variable, {
        activity: Smartgraphs.activityController.get('id'),
        name: name,
        value: null
      });
      variable.set('id', Smartgraphs.getNextGuid());
      this.notifyPropertyChange('variableNames');
    }

    variable.set('value', value);
    this._variables[name] = variable;
    return variable;
  },

  /**
    Returns a Variable in the current activity session.

    @param name
      The name of the desired Variable.
  */
  getVariable: function (name) {
    return this._variables[name];
  },

  /**
    Returns a Tag from the current activity session.

    @param name
      The name of the desired Variable.
  */
  findTag: function (name) {
    return this._tags[name];
  },

  /**
    @property {SC.Array} datadefNames

    Observable list of the names of all datadefs defined in the current activity session. (Observers are notified
    whenever datadefs are added or removed from this list.)
  */
  datadefNames: function () {
    var names = [];
    for (var name in this._datadefs) {
      if (this._datadefs.hasOwnProperty(name)) names.push(name);
    }
    return names;
  }.property(),

  /**
    @property {SC.Array} datarefNames

    Observable list of the names of all datarefs defined in the current activity session. (Observers are notified
    whenever datarefs are added or removed from this list.)
  */
  datarefNames: function () {
    var names = [];
    for (var name in this._datarefs) {
      if (this._datarefs.hasOwnProperty(name)) names.push(name);
    }
    return names;
  }.property(),

  /**
    @property {SC.Array} annotationNames

    Observable list of the names of all annotations defined in the current activity session. (Observers are notified
    whenever annotations are added or removed from this list.)
  */
  annotationNames: function () {
    var names = [];
    for (var name in this._annotations) {
      if (this._annotations.hasOwnProperty(name)) names.push(name);
    }
    return names;
  }.property(),

  /**
    @property {SC.Array} variableNames

    Observable list of the names of all variables defined in the current activity session. (Observers are notified
    whenever variables are added or removed from this list.)
  */
  variableNames: function () {
    var names = [];
    for (var name in this._variables) {
      if (this._variables.hasOwnProperty(name)) names.push(name);
    }
    return names;
  }.property()

}) ;
