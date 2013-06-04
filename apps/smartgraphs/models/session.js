// ==========================================================================
// Project:   Smartgraphs.Session
// Copyright: ©2010 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  A Session represents a single run of an activity.

  This allows an activity to be run multiple times within a single browser 'session'. User-created objects that are
  referenced by name (such as Datasets and Annotations) can be scoped to the current Session, so that references to
  a dataset (for example) with a given name call up data created by the current user within the current session of the
  activity.

  Sessions are created in the LOADING_ACTIVITY state (which is revisited whenever an Activity is started from the
  beginning.)

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.Session = SC.Record.extend(
/** @scope Smartgraphs.Session.prototype */ {

  /**
    The User who is logged in during the Session.

    @property {Smartgraphs.User}
  */
  user: SC.Record.toOne('Smartgraphs.User', { inverse: 'session', isMaster: YES })

}) ;
