// ==========================================================================
// Project:   Smartgraphs.Unit
// Copyright: ©2011 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  A Unit record represents a unit type (meters, seconds, etc.) used by Smartgraphs. Currently units are simply
  names -- If a Dataset has a unit with the name 'meter' and an axis has a unit with label 'meter', the units are
  considered to match, and it is permitted to graph the dataset on that axis.

  Unit conversions are not yet supported.

  Compound units are also not yet supported in any explicit way. For now, Unit records are for 'primary data'
  purposes. That is, if an activity needs to graph meters versus seconds, it needs records for meters and seconds;
  don't create a new 'meters per second' unit type to represent the slope between two points in a feedback. (You could
  define a unit with name 'meters per second' in order to graph meters per second versus seconds, for example; but
  there would be no explicit representation of the relationship between 'meters per second', 'meters', and 'seconds')

  @extends SC.Record
  @version 0.1
*/

Smartgraphs.Unit = SC.Record.extend(
/** @scope Smartgraphs.Unit.prototype */ {

  /**
    The primary key of an Unit record is its url.

    @property {String}
  */
  url: SC.Record.attr(String),
  primaryKey: 'url',

  /**
    The activity, if any, that defines these units.

    @property {Smartgraphs.Activity}
  */
  activity: SC.Record.toOne('Smartgraphs.Activity', { inverse: 'units', isMaster: YES, aggregate: YES }),

  /**
    The singular name of this unit type, for example 'meter'

    @property {String}
  */
  name: SC.Record.attr(String),

  /**
    The plural name of this unit type, for example 'meters'

    @property {String}
  */
  pluralName: SC.Record.attr(String),

  /**
    The abbreviation to use for this unit type, for example 'm'

    @property {String}
  */
  abbreviation: SC.Record.attr(String),

  /**
    Returns the singular or plural form based on quantity

    @argument {Number} quantity
      The quantity
    @returns {String}
      The pluralized or singular unit name appropriate for that quantity
  */
  pluralizeFor: function (quantity) {
    return Math.abs(quantity) === 1 ? this.get('name') : this.get('pluralName');
  }

}) ;
