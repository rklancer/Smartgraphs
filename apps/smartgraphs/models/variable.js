// ==========================================================================
// Project:   Smartgraphs.Variable
// Copyright: ©2010 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  A Variable record represents a named variable that can be used within the scope of an Activity.

  Variables are referenced by name throughout an activity, and that name should be unique within an activity.

  @extends SC.Record
  @version 0.1
*/

Smartgraphs.Variable = SC.Record.extend(
/** @scope Smartgraphs.Variable.prototype */ {

  /**
    The primary key of an Variable record is technically its url. However, variables are referenced by name within an
    activity, so that the activity can be serialized.

    @property {String}
  */
  url: SC.Record.attr(String),
  primaryKey: 'url',

  /**
    The name of this variable. Used to reference this variable within an activity.

    @property {String}
  */
  name: SC.Record.attr(String),

  /**
    The Activity this variable is part of.

    @property {Smartgraphs.Activity}
  */
  activity: SC.Record.toOne('Smartgraphs.Activity', { inverse: 'variables', isMaster: YES, aggregate: YES }),

  /**
    The value of this variable as a string.

    @property {String}
  */
  value: SC.Record.attr(String)

}) ;

