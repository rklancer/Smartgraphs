// ==========================================================================
// Project:   Smartgraphs.Activity
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  A guide, or wizard, that steps a user through some activity.

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.Activity = SC.Record.extend(
/** @scope Smartgraphs.Activity.prototype */ {

  url: SC.Record.attr(String),
  primaryKey: 'url',
  
  /** 
    The title of this Activity.
  */
  title: SC.Record.attr(String),
  
  /** 
    The username of the user who 'owns' this Activity.
  */
  owner: SC.Record.attr(String),
  
  /**
    The ActivityPages that make up this Activity.
  */
  pages: SC.Record.toMany('Smartgraphs.ActivityPage', { inverse: 'activity', orderBy: 'index' }),
  
  
  // TODO a) this would be broken -- all Activity records would share the same {};
  //      b) move all state like 'context' to session
  
  /**
  */

}) ;
