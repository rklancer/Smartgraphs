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
    
    if (firstTime) {
      context = context.begin('div').addClass('inner').end();
    }

    this.$('.inner').html(html);
  }
});
