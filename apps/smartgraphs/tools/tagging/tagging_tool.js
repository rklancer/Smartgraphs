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
  tagName: null,
  
  datadef: function () {
    return Smartgraphs.activityObjectsController.findDatadef(this.get('datadefName')) || null;
  }.property('datadefName'),
  
  tag: function () {
    return Smartgraphs.activityObjectsController.findTag(this.get('tagName')) || null;
  }.property('tagName'),
  
  setup: function (args) {
    this.set('datadefName', args.data);
    this.set('tagName', args.tag);
    Smartgraphs.statechart.gotoState(this.get('state'));
  },
  
  clearSetup: function () {
    this.set('tagName', null);
    this.set('datadefName', null);
  },
  
  setPoint: function (x, y) {
    this.get('tag').beginPropertyChanges();
    this.setPath('tag.x', x);
    this.setPath('tag.y', y);
    this.get('tag').endPropertyChanges();
  },
  
  clearPoint: function () {
    this.get('tag').beginPropertyChanges();
    this.setPath('tag.x', null);
    this.setPath('tag.y', null);
    this.get('tag').endPropertyChanges();    
  }
  
});