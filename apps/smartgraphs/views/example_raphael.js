// ==========================================================================
// Project:   Smartgraphs.ExampleRaphaelView
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your View Here)

  @extends Smartgraphs.RaphaelView
*/

sc_require('views/raphael');
sc_require('views/raphael_text');

Smartgraphs.ExampleRaphaelView = Smartgraphs.RaphaelView.extend(
/** @scope Smartgraphs.ExampleRaphaelView.prototype */ {

  displayProperties: ['rectWidth'],
  
  renderCallback: function (raphael, width) {
    // remember to return the Raphael object you created...
    var rect = raphael.rect(50, 100, width, 25, 5).attr({ fill: '#aa0000', stroke: '#aa0000' });
    if (width < 10) {
      rect.hide();        // Raphael doesn't display rounded rectangles with zero widths correctly
    }
    return rect;
  },
  
  render: function (context, firstTime) {
    // note context should always be a RaphaelContext
    
    if (firstTime) {
      context.callback(this, this.renderCallback, this.get('rectWidth'));
      this.renderChildViews(context, firstTime);      // don't forget to render child views
    }
    else {
      // TODO Actually the RaphaelContext should have the reference to the 'raphael' object and should have methods
      // for finding and updating the raphael objects
      var rect = this.get('raphael');
      var width = this.get('rectWidth');
      if (rect) {
        if (width >= 10) {
          rect.show().attr({ width: width });
        }
        else {
          rect.hide();
        } 
      }
    }
  },

  mouseDown: function () {
    alert("Thank you for clicking.");
  }
});
