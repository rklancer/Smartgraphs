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
    The ActivityPages that make up this Activity.
  */
  pages: SC.Record.toMany('Smartgraphs.ActivityPage', { inverse: 'activity', orderBy: 'index' }),
  
  /**
    Server endpoint for getting the page records. 
  */
  pageListUrl: SC.Record.attr(String),
  
  // TODO a) this would be broken -- all Activity records would share the same {};
  //      b) move all state like 'context' to session
  
  /**
    @private
    a list of 'global' variables in a given Activity. These would be, for example, names of 'globally available' things
    like the labels created by the openLabelTool command.
  */
  context: {},

  /**
    A local SC.Query that returns all the ActivityPages associated with this activity. Used to signal the data
    source to fetch those records from the server.
  */
  pagesQuery: function () {
    // cacheable, so DataStore only ever sees one pagesQuery instance per Activity record
    return SC.Query.create({
      isPagesQuery: YES,                       // so the data source can interpret what query we are
      recordType: Smartgraphs.ActivityPage,
      conditions: 'activity = {activity}',
      parameters: { activity: this }
    });
  }.property().cacheable()

}) ;
