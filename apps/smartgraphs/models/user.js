// ==========================================================================
// Project:   Smartgraphs.User
// Copyright: ©2010 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.User = SC.Record.extend(
/** @scope Smartgraphs.User.prototype */ {

  userId: SC.Record.attr(String),

  primaryKey: 'userId',

  name: SC.Record.attr(String),

  sessions: SC.Record.toMany(Smartgraphs.Session, { inverse: 'user' })

}) ;
