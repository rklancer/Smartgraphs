// ==========================================================================
// Project:   Smartgraphs.Datadef
// Copyright: ©2011 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  This is the abstract superclass of all Datadef (data definition) types in Smartgraphs. A Datadef record is the 
  canonical definition of graphable data in Smartgraphs.
  
  For example, different classes of Datadef could be created, for handling:
    - simple datasets: unordered sets of (x, y) pairs
    - ordered sets of (x, y) pairs, for parametric or other non-functional relationships
    - mathematical functions of the form x = f(y)
    - parametric relations of the form x = f(t); y = f(t) 
    - datasets derived from datasets, such as filtered and downsampled sensor data
    - mathematical functions (such as curve fits) derived from datasets
    - sensor data, which though downsampled for display, is recorded at high resolution for better estimation of the 
      time derivative of the signal
  
  Datadefs can be derived from one or more other Datadefs, as hinted at above. Datadefs can define callbacks which
  deriving Datadefs use to update themselves when the source Datadef changes (e.g., when a parameter changes or a data
  point is added by a sensor; how this will work isn't well defined yet.)
  
  When a Datadef is to be displayed on the screen, a SampleSet object is created which requests information
  from the Datadef in order to generate a list of sample points in the window to be graphed. The SampleSet can also 
  access the update callbacks to update itself when the Datadef changes (In this respect, a SampleSet behaves
  exactly like a Datadef subclass that derives a sampled signal from the Datadef. The difference is that SampleSets
  aren't record types, are meant to be transient, and are just for managing display.)  

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.Datadef = SC.Record.extend(
/** @scope Smartgraphs.Datadef.prototype */ {
  
  /**
    The primary key of a Datadef record is technically its url. However, datadefs are referenced by name within an 
    activity, so that the activity can be serialized.
    
    @property {String}
  */
  url: SC.Record.attr(String),
  primaryKey: 'url',
  
  /**
    The name of this datadef. Used to reference it within an activity.

    @property {String}
  */
  name: SC.Record.attr(String),
  
  /**
    The Activity this datadef is part of.
    
    @property {Smartgraphs.Activity}
  */
  activity: SC.Record.toOne('Smartgraphs.Activity', { aggregate: YES } ),
  
  /**
    The unit of measure for the x values
    
    @property {Smartgraphs.Unit}
  */
  xUnits: SC.Record.toOne('Smartgraphs.Unit'),
  
  /**
    Full label for the x values
    
    @property {String}
  */
  xLabel: SC.Record.attr(String),
  
  /** 
    Abbreviated label for the x values
    
    @property {String}    
  */
  xShortLabel: SC.Record.attr(String),

  /**
    The unit of measure for the y values
    
    @property {Smartgraphs.Unit}
  */
  yUnits: SC.Record.toOne('Smartgraphs.Unit'),
  
  /**
    Full label for the y values
    
    @property {String}
  */
  yLabel: SC.Record.attr(String),
  
  /** 
    Abbreviated label for the y values
    
    @property {String}
  */
  yShortLabel: SC.Record.attr(String)

});

// FIXME this is duplicated from Smartgraphs.Annotation

(function () {
  
  var types = null;
  var typeNames = null;
  
  function findTypes() {
    types = [];
    typeNames = [];
    for (var prop in Smartgraphs) {
      if (Smartgraphs.hasOwnProperty(prop) && Smartgraphs[prop] && Smartgraphs[prop].isClass && prop !== 'Datadef' && SC.kindOf(Smartgraphs[prop], Smartgraphs.Datadef)) {
        types.push(Smartgraphs[prop]);
        typeNames.push(prop);
      }
    }
  }
  
  /**
    Returns a list of all Datadef subtypes. Value is calculated the first time this function or Smartgraphs.Datadef.typeNames is is called, and cached thereafter.
  */
  Smartgraphs.Datadef.types = function () {
    if (!types) findTypes();
    return types;
  };
  
  /**
    Returns a list of the names of all Datadef subtypes. Value is calculated the first time this function or Smartgraphs.Datadef.types is is called, and cached thereafter.
  */
  Smartgraphs.Datadef.typeNames = function () {
    if (!typeNames) findTypes();
    return typeNames;
  };
  
}());
