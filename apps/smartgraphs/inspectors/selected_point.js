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
    var controller = Smartgraphs.activityViewController.graphControllerFor(config.pane);
    if (!controller) return;
    
    this.set('dataset', controller.findSeriesByName(config.series));
  },
  
  inspect: function () {
    var dataset = this.get('dataset');
    var selection = dataset && dataset.get('selection');
    
    var value = selection ? selection.toArray().objectAt(0) : undefined;
    console.log('setting inspector value to: ', value);
    
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