// ==========================================================================
// Project:   SmartGraphs.RaphaelCollectionView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals SmartGraphs Raphael*/

/** @class

  (Document Your View Here)

  @extends SC.View
*/
SmartGraphs.RaphaelCollectionView = SC.CollectionView.extend(
/** @scope SmartGraphs.RaphaelCollectionView.prototype */ {

  raphaelObject: null,
  
  render: function (context, firstTime) {
    if (firstTime) {
      context = context.begin('div').addClass('graph').end();
    }
  },
  
  didCreateLayer: function () {
    var raphaelConstructor = Raphael;  // make jslint stop complaining that Raphael needs to be called with 'new' because of the initial cap
    var layout = this.get('layout');
    
    var raphaelObject = raphaelConstructor(this.$('.graph')[0], layout.width, layout.height);
    this.set('raphaelObject', raphaelObject);
  }
});
