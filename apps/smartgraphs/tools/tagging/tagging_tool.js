// ==========================================================================
// Project:   Smartgraphs.taggingTool
// Copyright: ©2010 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('tools/tool');

/** @class

  @extends SC.Object
*/
Smartgraphs.taggingTool = Smartgraphs.Tool.create(
/** @scope Smartgraphs.taggingTool.prototype */ {

  name: 'tagging',
  state: 'TAGGING_TOOL',
  
  datadefName: null,
  xTagName: null,
  yTagName: null,
  
  datadef: function () {
    return Smartgraphs.activityObjectsController.findDatadef(this.get('datadefName')) || null;
  }.property('datadefName'),
  
  xTag: function () {
    return Smartgraphs.activityObjectsController.findTag(this.get('xTagName')) || null;
  }.property('xTagName'),
  
  yTag: function () {
    return Smartgraphs.activityObjectsController.findTag(this.get('yTagName')) || null;
  }.property('yTagName'),
  
  setup: function (args) {
    this.set('datadefName', args.datadef);
    this.set('xTagName', args.xTag);
    this.set('yTagName', args.yTag);
    Smartgraphs.statechart.gotoState(this.get('state'));
  },
  
  clearSetup: function () {
    this.set('tagName', null);
    this.set('datadefName', null);
  },
  
  setPoint: function (x, y) {
    this.setPath('xTag.value', x);
    this.setPath('yTag.value', y);
  },
  
  clearPoint: function () {
    this.setPath('xTag.value', null);
    this.setPath('yTag.value', null);
  }
  
});