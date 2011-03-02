// ==========================================================================
// Project:   Smartgraphs.taggingTool
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
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
  
  tag: null,
  datasetName: null,
  
  setup: function (args) {
    this.set('tag', args.tag);
    this.set('datasetName', args.dataset);
  },
  
  dataset: function () {
    return Smartgraphs.activityObjectsController.findDataset(this.get('datasetName')) || null;
  }.property('datasetName'),
  
  annotation: function () {
    return Smartgraphs.activityObjectsController.findAnnotation(this.get('tag')) || null;
  }.property('tag')
  
});