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
    @private
    a list of 'global' variables in a given Activity. These would be, for example, names of 'globally available' things
    like the labels created by the openLabelTool command.
  */
  context: {}

}) ;
