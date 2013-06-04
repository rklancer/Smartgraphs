/*globals Smartgraphs */

/** @class

  @extends SC.Record
*/
Smartgraphs.Dataref = SC.Record.extend(
/** @scope Smartgraphs.Dataref.prototype */ {

  /**
    The primary key of a Dataref record is technically its url. However, datarefs are referenced by name within an
    activity, so that the activity can be serialized.

    @property {String}
  */
  url: SC.Record.attr(String),
  primaryKey: 'url',

  /**
    The name of this dataref. Used to reference it within an activity.

    @property {String}
  */
  name: SC.Record.attr(String),

  /**
    The activity this dataref is part of.

    @property {Smartgraphs.Activity}
  */
  activity: SC.Record.toOne('Smartgraphs.Activity', { aggregate: YES }),

  /**
    The datadefName of the datadef which is the part of this dataref.

    @property {String}
  */
  datadefName: SC.Record.attr(String),

  /**

    @property {String}
  */
  expressionForm: SC.Record.attr(String),

  /**
    The graphBounds of the graph pane.

    @property {Object}
  */
  graphBounds : {xMin: null, yMin: null, xMax: null, yMax: null},

  /**
    The stepInterval to populate points.

    @property {Number}
  */
  stepInterval : SC.Record.attr(Number),

  /**

    @property {Array}
  */
  points : SC.Record.attr(Array),

  initialise: function () {
    this.set('datadefName', this.get('datadefName'));
    this.set('points', []);
  },

  setDatadefPoints: function (datarefPoints) {
    var datadef = this.getDatadef();
    datadef.set('points', datarefPoints);
  },

  /**
    Sets the bounds of the graph pane.
  */
  setGraphBounds: function (bounds) {
    this.set('graphBounds', bounds);
  },

  /**
    Get datadef of this dataref.
  */
  getDatadef: function () {
    var datadefName = this.get('datadefName');
    return Smartgraphs.activityObjectsController.findDatadef(datadefName);
  },

  /**
    Clears all the points.
  */
  clearPoints: function () {
    this.set('points', []);
  },

  /**
    Abstract Method need to implement in inherited classes.
  */
  populatePoints: function () {
    throw "This method must be inherited as it is an abstract method.";
  },

  /** 
    Abstract Method need to implement in inherited classes.
  */
  getExpressionFunction: function () {
    throw "This method must be inherited as it is an abstract method.";
  },

  /** 
    Abstract Method need to implement in inherited classes.
  */
  getInverseExpressionFunction: function () {
    throw "This method must be inherited as it is an abstract method.";
  }
});

// FIXME this is duplicated from Smartgraphs.Datadef

(function () {

  var types = null;
  var typeNames = null;

  function findTypes() {
    types = [];
    typeNames = [];
    for (var prop in Smartgraphs) {
      if (Smartgraphs.hasOwnProperty(prop) && Smartgraphs[prop] && Smartgraphs[prop].isClass && prop !== 'Dataref' && SC.kindOf(Smartgraphs[prop], Smartgraphs.Dataref)) {
        types.push(Smartgraphs[prop]);
        typeNames.push(prop);
      }
    }
  }

  /**
    This is also duplicated from Smartgraphs.Datadef

    Returns a list of all Dataref subtypes. Value is calculated the first time this function or Smartgraphs.Dataref.typeNames is is called, and cached thereafter.
  */
  Smartgraphs.Dataref.types = function () {
    if (!types) {
      findTypes();
    }
    return types;
  };

  /**
    This is also duplicated from Smartgraphs.Datadef.

    Returns a list of the names of all Dataref subtypes. Value is calculated the first time this function or Smartgraphs.Dataref.types is is called, and cached thereafter.
  */
  Smartgraphs.Dataref.typeNames = function () {
    if (!typeNames) {
      findTypes();
    }
    return typeNames;
  };
}());
