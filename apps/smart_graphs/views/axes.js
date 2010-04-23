// ==========================================================================
// Project:   SmartGraphs.AxesView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals SmartGraphs */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
SmartGraphs.AxesView = SC.View.extend(
/** @scope SmartGraphs.AxesView.prototype */ {
  init: function () {
    sc_super();
    console.log('init called!');
  },
  
  render: function (context, firstTime) {
    console.log('render called!');
    //console.log('AxesView.render called; firstTime is ' + firstTime + ' & parentView raphael object is: ' + this.getPath('parentView.raphaelObject')); 
  }
});
