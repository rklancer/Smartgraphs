// ==========================================================================
// Project:   Smartgraphs.RaphaelTextView
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your View Here)

  @extends Smartgraphs.RaphaelView
*/
Smartgraphs.RaphaelTextView = Smartgraphs.RaphaelView.extend(
/** @scope Smartgraphs.RaphaelTextView.prototype */ {
  
    displayProperties: ['text'],

    renderCallback: function (raphael, x, y, text) {
      return raphael.text(x, y, text).attr({'font-size': 18, 'text-anchor': 'start'});
    },
    
    render: function (context, firstTime) {
      console.log('RaphaelTextView rendering');
      if (firstTime) {
        context.callback(this, this.renderCallback, this.get('x'), this.get('y'), this.get('text'));
      }
      else { 
        var textObject = this.get('raphael');
        textObject.attr({'text': this.get('text')});
      }
    }
});
