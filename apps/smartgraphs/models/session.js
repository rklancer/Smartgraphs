// ==========================================================================
// Project:   Smartgraphs.Session
// Copyright: ©2010 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.Session = SC.Record.extend(
/** @scope Smartgraphs.Session.prototype */ {

  user: SC.Record.toOne('Smartgraphs.User', { inverse: 'session', isMaster: YES }),
  
  steps: SC.Record.toMany('Smartgraphs.  SessionStep', { inverse: 'session' })

}) ;
