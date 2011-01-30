// ==========================================================================
// Project:   Smartgraphs.TableItemView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  This is a custom ListItemView for display in Smartgraphs tables. 
  
  The addition here is support for background highlighting based on annotations.

  @extends SC.View
  @extends Smartgraphs.AnnotatableItemView
*/

sc_require('views/mixins/annotatable_item_view');

Smartgraphs.TableItemView = SC.ListItemView.extend( Smartgraphs.AnnotatableItemView, 
/** @scope Smartgraphs.TableItemView.prototype */ {

  displayProperties: ['backgroundColor'],
  
  classNames: "table-item-view",
  
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
