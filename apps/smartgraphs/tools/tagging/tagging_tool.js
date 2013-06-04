// ==========================================================================
// Project:   Smartgraphs.taggingTool
// Copyright: ©2011 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('tools/tool');

/** @class

  @extends Smartgraphs.Tool
*/
Smartgraphs.taggingTool = Smartgraphs.Tool.create(
/** @scope Smartgraphs.taggingTool.prototype */ {

  name: 'tagging',
  state: 'TAGGING_TOOL',

  datadefName: null,
  tagName: null,

  tag: function () {
    return Smartgraphs.activityObjectsController.findTag(this.get('tagName')) || null;
  }.property('tagName'),

  setup: function (args) {
    this.set('datadefName', args.data);
    this.set('tagName', args.tag);
    this.set('labelName', args.labelName);

    Smartgraphs.statechart.gotoState(this.get('state'));
  },

  clearSetup: function () {
    this.set('tagName', null);
    this.set('datadefName', null);
  },

  setPoint: function (x, y) {
    var tag = this.get('tag');
    if (!tag) return;

    tag.beginPropertyChanges();
    tag.set('datadefName', this.get('datadefName'));
    tag.set('x', x);
    tag.set('y', y);
    tag.endPropertyChanges();

    Smartgraphs.statechart.sendAction('taggingToolDidUpdateTag', this, tag);
  },

  clearPoint: function () {
    var tag = this.get('tag');
    if (!tag) return;

    tag.beginPropertyChanges();
    tag.set('datadefName', null);
    tag.set('x', null);
    tag.set('y', null);
    tag.endPropertyChanges();

    Smartgraphs.statechart.sendAction('taggingToolDidUpdateTag', this, tag);
  }

});
