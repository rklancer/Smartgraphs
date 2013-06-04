// ==========================================================================
// Project:   Smartgraphs.Axis
// Copyright: ©2011 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  An Axis represents the x or y axis of a graph. An axis record specifies the unit of measure for an axis; datasets
  whose units of measure do not match the axes of the graph are not allowed to be added to that graph. An Axis record
  also specifies the minimum and maximum values to be plotted on that axis, the number of tick marks, and a label for
  the axis (which, if defined, overrides the dataset label; this is useful when multiple datasets with the same units
  but slightly differing labels are to be drawn on the same axis)

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.Axis = SC.Record.extend(
/** @scope Smartgraphs.Axis.prototype */ {

  url: SC.Record.attr(String),
  primaryKey: 'url',

  /**
    The activity this axis is part of.

    @property {Smartgraphs.Activity}
  */
  activity: SC.Record.toOne('Smartgraphs.Activity', { inverse: 'axes', isMaster: YES, aggregate: YES }),

  /**
    The units of measure used by this axis. Only Datasets with matching units for the corresponding values are allowed
    to be added to a graph with this axis.

    @property {Smartgraphs.Unit}
  */
  units: SC.Record.toOne('Smartgraphs.Unit'),

  /**
    Minimum value of the axis

    @property {Number}
  */
  min: SC.Record.attr(Number),

  /**
    Maximum value of the axis

    @property {Number}
  */
  max: SC.Record.attr(Number),

  /**
    Number of steps between tick marks on the axis. Generally should be an integer, but this is not a strict
    requirement.

    @property {Number}
  */
  nSteps: SC.Record.attr(Number),

  /**
    Label for the axis. If no label is specified here,

    @property {String}
  */
  label: SC.Record.attr(String)

}) ;
