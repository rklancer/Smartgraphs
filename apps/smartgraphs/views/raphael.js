// ==========================================================================
// Project:   Smartgraphs.RaphaelView
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Smartgraphs.RaphaelView = SC.View.extend(
/** @scope Smartgraphs.RaphaelView.prototype */ {

  createLayer: function () {
    //console.log('ExampleRaphaelView createLayer()');
    // TODO
    sc_super();
  },

  updateLayer: function () {
    this.render(null, NO);  // eventually we'll create a RaphaelContext focused on the layer and provide update methods
  },
  
  prepareRaphaelContext: function (raphaelContext, firstTime) {
    raphaelContext.id(this.get('layerId'));
    this.render(raphaelContext, firstTime);
  },
  
  renderChildViews: function (context, firstTime) {
    var cv = this.get('childViews');
    var view;
    
    for (var i=0, ii=cv.length; i<ii; ++i) {
      view = cv[i];
      if (!view) continue;

      context = context.begin();
      view.prepareRaphaelContext(context, firstTime);
      context = context.end();
    }

    return context;
  },
  
  raphael: function () {
    var layer = this.get('layer');
    return layer ? layer.raphael : null;
  }.property()
});
