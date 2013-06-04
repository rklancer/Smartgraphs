// ==========================================================================
// Project:   Smartgraphs.TableItemView
// Copyright: ©2011 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
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

  controller: SC.outlet('parentView.parentView.tableController'),
  dataRepresentation: SC.outlet('controller.dataRepresentation'),

  datadefName: SC.outlet('dataRepresentation.datadef.name'),

  modifiersBinding: '.controller.modifiers',
  modifiersBindingDefault: SC.Binding.oneWay(),

  modifiersDidChange: function () {
    var modifiers = this.get('modifiers') || {},
        x = this.getPath('content.x'),
        y = this.getPath('content.y'),
        datadefName = this.get('datadefName'),
        color;

    if (modifiers[[x, y, datadefName]]) {
      this.set('overrideColor', modifiers[[x, y, datadefName]].get('color'));
    }
    else {
      this.set('overrideColor', null);
    }
  }.observes('modifiers'),

  backgroundColor: function () {
    return this.get('overrideColor') || '';
  }.property('overrideColor').cacheable(),

  mouseDown: function () {
    this.get('controller').dataPointSelected(this.get('dataRepresentation'), this.getPath('content.x'), this.getPath('content.y'));
    // 'tee' the dataPointSelected event, but don't consider the mouseDown handled; let the parent collection view
    // also handle it
    return NO;
  }

});
