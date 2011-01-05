// ==========================================================================
// Project:   Smartgraphs.SelectedPointInspector
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('inspectors/inspector');

Smartgraphs.SelectedPointInspector = Smartgraphs.Inspector.extend({
  
  value: null,
  dataset: null, 
  
  configure: function (config) {
    this.set('dataset', Smartgraphs.activityObjectsController.findDataset(config.datasetName));
  },
  
  inspect: function () {
    var dataset = this.get('dataset');
    var selection = dataset && dataset.get('selection');
    var value = selection && selection.get('length') === 1 ? selection.firstObject() : undefined;
    this.set('value', value);
    return value;
  },
  
  watch: function () {
    var dataset = this.get('dataset');
    if (dataset) dataset.addObserver('selection', this, this.inspect);
  },
  
  stopWatching: function () {
    var dataset = this.get('dataset');
    if (dataset) dataset.removeObserver('selection', this, this.inspect);
  }
  
});