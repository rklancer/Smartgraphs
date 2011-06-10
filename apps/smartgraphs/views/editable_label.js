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
  displayProperties: 'text textColor width height bodyXCoord bodyYCoord isEditable'.w(),

  labelBodyView: SC.outlet('parentView'),
  labelView:     SC.outlet('parentView.labelView'),

  textBinding:       '.labelView.text',
  textColorBinding:  '.labelView.textColor',

  widthBinding:      '.labelBodyView.width',
  heightBinding:     '.labelBodyView.height',
  bodyXCoordBinding: '.labelBodyView.bodyXCoord',
  bodyYCoordBinding: '.labelBodyView.bodyYCoord',

  acceptsFirstResponder: function() {
    return this.get('isEnabled');
  }.property('isEnabled'),

  renderCallback: function (raphaelCanvas, attrs) {
    this.backgroundBox = raphaelCanvas.rect(attrs);
    this.backgroundBox.attr('fill', '#ff0');
    this.backgroundBox.attr('opacity', 0.1);
    this.backgroundBox.hide();
    return raphaelCanvas.text().attr(attrs);
  },

  render: function (context, firstTime) {
    var height = this.get('height');
    var attrs = {
      text:          this.get('text'),
      x:             this.get('bodyXCoord') + 10,
      y:             this.get('bodyYCoord') + height/2,
      fill:          this.get('textColor'),
      'font-size':   12,
      'text-anchor': 'start'
    };

    var raphaelText;
    var bounds;
    var editing = this.get('isEditing');
    if (firstTime) {
      context.callback(this, this.renderCallback, attrs);
    }
    else {
      raphaelText = this.get('raphaelObject');
      raphaelText.attr(attrs);
      raphaelText = this.get('raphaelObject');
      if (editing) {
        raphaelText.attr('text', this.get('text') + "_");
      }
      bounds  = raphaelText.getBBox();
      this.set('width',bounds.width + 30);
      this.set('height',bounds.height + 30);
      if (editing) {
        this.backgroundBox.attr('x', bounds.x - 2);
        this.backgroundBox.attr('y', bounds.y - 2);
        this.backgroundBox.attr('width', bounds.width + 4);
        this.backgroundBox.attr('height', bounds.height + 4);
      }
    }
  },

  beginEditing: function() {
    if (!this.get('isEditable')) return NO ;
    // this.beginPropertyChanges();
    this.set('isEditing', YES) ;
    this.becomeFirstResponder() ;
    this.backgroundBox.show();
    // this.endPropertyChanges();
    return YES ;
  },

  discardEditing: function() {
    this.commitEditing();
  },

  commitEditing: function() {
    this.beginPropertyChanges();
    this.resignFirstResponder();
    this.backgroundBox.hide();
    this.set('isEditing', NO) ;
    this.endPropertyChanges();
    return YES ;
  },

  updateText: function(newtext) {
    this.set('text',newtext);
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
