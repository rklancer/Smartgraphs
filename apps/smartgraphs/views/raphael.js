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
    console.log('RaphaelView createLayer()');

    if (this.get('layer')) return;          // move along, nothing to do here
    
    var raphaelContext = Smartgraphs.RaphaelContext();
    raphaelContext.isTopLevel = NO;
    
    this.prepareRaphaelContext(raphaelContext, YES);
    this.set('layer', raphaelContext.populateCanvas(this.get('raphaelCanvas')));

    // now notify the view and its child views..
    this._notifyDidCreateLayer();
  },

  raphaelCanvas: function () {
    var pv;
    
    pv = this.get('parentView');
    return pv.get('raphaelCanvas');     // recurse until you hit parent RaphaelCanvasView
  }.property(),
  
  didCreateLayer: function () {
    console.log('RaphaelView didCreateLayer()');
    // Best to keep the raphael object tightly bound to the DOM node it's responsible for
    this.set('raphael', this.get('layer').raphael);
  },
  
  updateLayer: function () {
    // eventually we'll create a RaphaelContext focused on the layer and provide update methods
    var dummyContext = {
      begin: function () {},
      end: function () {}
    };
    
    this.render(dummyContext, NO);  
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
  }
});
