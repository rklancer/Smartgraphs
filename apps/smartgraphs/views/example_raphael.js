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

  displayProperties: ['len'],
  
  createLayer: function () {
    //console.log('ExampleRaphaelView createLayer()');
    // TODO
    sc_super();
  },

  updateLayer: function () {
    // log the call, but note that we probably don't need to override this
    //console.log('ExampleRaphaelView updateLayer()');
    sc_super();
  },
  
  prepareRaphaelContext: function (raphaelContext, firstTime) {
    //console.log('ExampleRaphaelView prepareRaphaelContext()');       
    
    raphaelContext.id(this.get('layerId'));
    this.render(raphaelContext, firstTime);
  },

  renderCallback: function (raphael, length) {
    //console.log('ExampleRaphaelView renderCallback');
    return raphael.rect(50, 100, length, 25, 5).attr({ fill: '#aa0000', stroke: '#aa0000' });      // remember to return the Raphael object you created...
  },
  
  rectWidth: function () {
    var len = this.get('len');
    if (typeof len === 'string') len = parseInt(len, 10);
    
    return ((len/2000) * (this.getPath('parentView.frame').width - 100)) || 0;
  }.property('len'),
  
  render: function (context, firstTime) {
    
    // note context is a RaphaelContext
    
    //console.log('ExampleRaphaelView render()');
    //console.log('firstTime = ' + firstTime);
    //console.log('len = ' + this.get('len'));    // 'text' is our example displayProperty

    // this is how it would work...
    
    if (firstTime) {
      context.push(this, this.renderCallback, this.get('rectLength'));
    }
    else {
      // context may or may not be a RaphaelContext. It could be an SC.RenderContext focused on the Raphael node.
      
      var raphael = this.get('raphael');
      if (raphael) {
        raphael.attr( { width: this.get('rectWidth') } );
      }
    }
    
    // this is what the base class (SC.View) does. Important to remember for thinking about how child views work here.
    if (firstTime) this.renderChildViews(context, firstTime);
  },
  
  renderChildViews: function (context, firstTime) {
    
    // note context is a RaphaelContext    
    
    //console.log('ExampleRaphaelView renderChildViews()');
    
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
  
  mouseDown: function () {
    //console.log('I was clicked!');
  },
  
  raphael: function () {
    // TODO make this work right; see note below
    var layer = this.get('layer');
    
    return layer.raphael;       // note this isn't guaranteed for group nodes we create unless we go to the trouble of caching a reference in the dom ourselves.
  }.property()
  
});
