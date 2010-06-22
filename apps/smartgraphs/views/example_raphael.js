// ==========================================================================
// Project:   Smartgraphs.ExampleRaphaelView
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your View Here)

  @extends SC.View
*/

Smartgraphs.ExampleRaphaelView = SC.View.extend(
/** @scope Smartgraphs.ExampleRaphaelView.prototype */ {

  createLayer: function () {
    console.log('ExampleRaphaelView createLayer()');
    // TODO
    sc_super();
  },

  updateLayer: function () {
    // log the call, but note that we probably don't need to override this
    console.log('ExampleRaphaelView updateLayer()');
    sc_super();
  },
  
  prepareRaphaelContext: function (raphaelContext, firstTime) {
    console.log('ExampleRaphaelView prepareRaphaelContext()');       
    
    raphaelContext.id(this.get('layerId'));
    this.render(raphaelContext, firstTime);
  },

  renderCallback: function (raphael, text) {
    console.log('ExampleRaphaelView renderCallback');
    return raphael.text(100, 100, text);      // return the Raphael object you created...
  },
    
  render: function (context, firstTime) {
    console.log('ExampleRaphaelView render()');
    console.log('firstTime = ' + firstTime);
    console.log('text = ' + this.get('text'));    // 'text' is our example displayProperty

    // this is how it would work...
    
    if (firstTime) {
      context.push(this, this.renderCallback, this.get('text'));
    }
    else {
      // context may or may not be a RaphaelContext. It could be an SC.RenderContext focused on the Raphael node.
      
      var raphael = this.get('raphael');
      if (raphael) {
        raphael.attr({text: this.get('text') || ''});
      }
    }
    
    // this is what the base class (SC.View) does. Important to remember for thinking about how child views work here.
    if (firstTime) this.renderChildViews(context, firstTime);
  },
  
  renderChildViews: function (context, firstTime) {
    console.log('ExampleRaphaelView renderChildViews()');
    
    var cv = this.get('childViews');
    var view;
    
    for (var i=0, ii=cv.length; i<ii; ++i) {
      view = cv[i];
      if (!view) continue;

      context.begin();
      view.prepareRaphaelContext(context, firstTime);
      context.end();
    }

    return context;
  },
  
  mouseDown: function () {
    console.log('I was clicked!');
  },
  
  raphael: function () {
    // TODO make this work right; see note below
    var layer = this.get('layer');
    
    return layer.raphael;       // note this isn't guaranteed for group nodes we create unless we go to the trouble of caching a reference in the dom ourselves.
  }.property()
  
});
