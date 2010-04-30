// ==========================================================================
// Project:   SmartGraphs.HTMLView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals SmartGraphs */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
SmartGraphs.HTMLView = SC.View.extend(
/** @scope SmartGraphs.HTMLView.prototype */ {

  html: '',
  displayProperties: ['html'],
  
  classNames: ['html-view'],
  
  render: function (context, firstTime) {
    var html = this.get('html');
    
    // apparently it's okay, even preferred, to set the html using the context object even if it isn't firstTime.
    console.log("rendering HTMLView: this.$('.inner') = " + this.$('.inner'));
    context = context.begin('div').addClass('inner').html(html).end();
    

  },
  
  didCreateLayer: function () {
    console.log('HTMLView didCreateLayer()'); 
  }
});
