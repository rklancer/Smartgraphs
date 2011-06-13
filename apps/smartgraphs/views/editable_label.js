// ==========================================================================
// Project:   Smartgraphs.EditableLabelView
// Copyright: ©2011 Concord Consortium
// Author:    Noah Paessel <knowuh@gmail.com>
// ==========================================================================
/*globals Smartgraphs RaphaelViews*/

/** @class

  RaphaelView for an editable label.

  @extends SC.View
  @extends RaphaelViews.RenderSupport
  @extends SC.Editable
*/
Smartgraphs.EditableLabelView = RaphaelViews.RaphaelView.extend(SC.Editable, {
/** @scope Smartgraphs.EditableLabelView.prototype */

  isEditing: NO,
  fontSize:  12,
  displayProperties: 'text textColor bodyXCoord bodyYCoord isEditing'.w(),

  labelBodyView: SC.outlet('parentView'),
  labelView:     SC.outlet('parentView.labelView'),

  textBinding:       '.labelView.text',
  textColorBinding:  '.labelView.textColor',

  // Bounds need to be calculated by Raphael:
  boundsWidth:       null,
  boundsHeight:      null,
  boundsX:           null,
  boundsY:           null,

  // A background highlighted editing box:
  backgroundBox:     null,

  // shared attributes with our parent view:
  bodyXCoordBinding: '.labelBodyView.bodyXCoord',
  bodyYCoordBinding: '.labelBodyView.bodyYCoord',
  widthBinding:      '.labelBodyView.width',
  heightBinding:     '.labelBodyView.height',

  acceptsFirstResponder: function() {
    return this.get('isEnabled');
  }.property('isEnabled'),

  renderCallback: function (raphaelCanvas, attrs) {
    var backgroundBox = raphaelCanvas.rect(attrs);
    backgroundBox.attr('fill', '#ff0');
    backgroundBox.attr('opacity', 0.1);
    backgroundBox.hide();
    this.set('backgroundBox',backgroundBox);
    return raphaelCanvas.text().attr(attrs);
  },

  render: function (context, firstTime) {
    var height = this.get('height');
    var attrs = {
      text:          this.get('text'),
      x:             this.get('bodyXCoord') + 10,
      y:             this.get('bodyYCoord') + height/2,
      fill:          this.get('textColor'),
      'font-size':   this.get('fontSize'),
      'text-anchor': 'start'
    };

    var raphaelText;
    var bounds;
    var editing = this.get('isEditing');
    var backgroundBox;

    if (firstTime) {
      context.callback(this, this.renderCallback, attrs);
    }
    else {
      raphaelText = this.get('raphaelObject');
      if (editing) {
        raphaelText.attr('text', this.get('text') + "_");
      }
      raphaelText.attr(attrs);
      this.adjustMetrics();
      backgroundBox = this.get('backgroundBox');
      if (backgroundBox) {
        if (editing) {
          backgroundBox.attr('x', this.get('boundsX') - 2);
          backgroundBox.attr('y', this.get('boundsY') - 2);
          backgroundBox.attr('width', this.get('boundsWidth') + 4);
          backgroundBox.attr('height', this.get('boundsHeight') + 4);
          backgroundBox.show();
        }
        else {
          backgroundBox.hide();
        }
      }
    }
  },

  beginEditing: function() {
    if (!this.get('isEditable')) return NO ;
    this.beginPropertyChanges();
    this.set('isEditing', YES);
    this.becomeFirstResponder();
    this.endPropertyChanges();
    return YES ;
  },

  discardEditing: function() {
    this.commitEditing();
  },

  commitEditing: function() {
    this.beginPropertyChanges();
    this.resignFirstResponder();
    this.set('isEditing', NO) ;
    this.endPropertyChanges();
    return YES ;
  },

  updateText: function(newtext) {
    this.set('text',newtext);
  },

  adjustMetrics: function() {
    var editing = this.get('isEditing');
    raphaelText = this.get('raphaelObject');
    if (raphaelText) {
      if (editing) { raphaelText.attr('text', this.get('text') + "_"); }
      bounds  = raphaelText.getBBox();
      this.set('boundsWidth',bounds.width);
      this.set('boundsHeight',bounds.height);
      this.set('boundsX', bounds.x);
      this.set('boundsY', bounds.y);
    }
    this.updateParentBoundDimensions();
  },

  updateParentBoundDimensions: function() {
    // This will update our parrents attributes too:
    this.set('width', this.get('boundsWidth') + 30);
    this.set('height', this.get('boundsHeight') + 30);
  },

  keyDown: function(evt) {
    var chr = null;
    if (evt.type == 'keypress') {
      chr = evt.getCharString();
      if (chr) {
        this.insertText(chr);
        return YES;
      }
    }
    return this.interpretKeyEvents(evt) ? YES : NO;
  },

  insertText: function(chr, evt) {
    this.updateText(this.get('text') + chr);
    return YES;
  },

  insertNewline: function() {
    this.insertText("\n");
  },

  insertTab: function() {
    this.commitEditing();
  },

  cancel: function() {
    this.discardEditing();
  },

  deleteBackward: function() {
      var t = this.get('text');
      var newText = t.substr(0,t.length-1);
      this.updateText(newText);
    return YES;
  },

  deleteForward: function() {
      var t = this.get('text');
      var newText = t.substr(0,t.length-1);
      this.updateText(newText);
    return YES;
  }
});
