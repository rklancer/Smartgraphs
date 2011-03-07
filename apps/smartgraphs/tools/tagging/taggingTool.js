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
  
  tagName: null,
  datasetName: null,
  
  setup: function (args) {
    this.set('tagName', args.tag);
    this.set('datasetName', args.dataset);
  },
  
  dataset: function () {
    return Smartgraphs.activityObjectsController.findDataset(this.get('datasetName')) || null;
  }.property('datasetName'),
  
  tag: function () {
    return Smartgraphs.activityObjectsController.findTag(this.get('tagName')) || null;
  }.property('tagName')
  
});