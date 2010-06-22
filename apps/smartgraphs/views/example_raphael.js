// ==========================================================================
// Project:   Smartgraphs.ExampleRaphaelView
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your View Here)

  @extends SC.View
*/

sc_require('system/raphael_context');

Smartgraphs.ExampleRaphaelView = SC.View.extend(
/** @scope Smartgraphs.ExampleRaphaelView.prototype */ {

  createLayer: function () {
    console.log('ExampleRaphaelView createLayer()');
    sc_super();
  },

  updateLayer: function () {
    // log the call, but note that we probably don't need to override this
    console.log('ExampleRaphaelView updateLayer()');
    sc_super();
  },
  
  prepareRaphaelContext: function (raphaelContext, firstTime) {
    console.log('ExampleRaphaelView prepareRaphaelContext()');
    console.log('firstTime = ' + firstTime);
    console.log('text = ' + this.get('text'));
  },
  
  renderChildViews: function () {
  },

  render: function (context, firstTime) {
    console.log('ExampleRaphaelView render()');
    console.log('firstTime = ' + firstTime);
    console.log('text = ' + this.get('text'));    
  }

});
