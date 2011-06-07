// ==========================================================================
// Project:   Smartgraphs.TableItemView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  This is a custom ListItemView for display in Smartgraphs tables. 
  
  The addition here is support for background highlighting based on annotations.

  @extends SC.View
*/

Smartgraphs.TableItemView = SC.ListItemView.extend( 
/** @scope Smartgraphs.TableItemView.prototype */ {

  displayProperties: ['backgroundColor'],
  
  classNames: ['table-item'],
  
  controllerPath: 'parentView.parentView.tableController',
  
  backgroundColor: function () {
    return this.get('overrideColor') || '';
  }.property('overrideColor').cacheable(),
  
  mouseDown: function () {
    // Borrowed from DataPointView in the graph
    Smartgraphs.statechart.sendAction('dataPointSelected', this, null);
    // 'tee' the dataPointSelected event, but don't consider the mouseDown handled; let the parent collection view
    // also handle it
    return NO;
  }
  
});
