// ==========================================================================
// Project:   Smartgraphs.EditableLabelView
// Copyright: ©2011 Concord Consortium
// Author:    Noah Paessel <knowuh@gmail.com>
// ==========================================================================
/*globals Smartgraphs,  RaphaelViews, SC, YES, NO */
/*jslint sloppy: true, vars: true, white: true, maxerr: 50, indent: 2 */


/** @class

  RaphaelView for an editable label.
  

  @extends SC.View
  @extends RaphaelViews.RenderSupport
  @extends SC.Editable
*/
Smartgraphs.EditableLabelView = RaphaelViews.RaphaelView.extend(SC.Editable, {
/** @scope Smartgraphs.EditableLabelView.prototype */

  childViews: ['editBoxView'],

  isEditing: NO,
  fontSize:  12,
  displayProperties: 'text textColor x y isEditing'.w(),

  labelBodyView: SC.outlet('parentView'),
  labelView:     SC.outlet('parentView.labelView'),

  textBinding:       '.labelView.text',
  textColorBinding:  '.labelView.textColor',

  // Bounds need to be calculated by Raphael:
  boundsWidth:       null,
  boundsHeight:      null,
  boundsX:           null,
  boundsY:           null,


  // shared attributes with our parent view:
  bodyXCoordBinding: '.labelBodyView.bodyXCoord',
  bodyYCoordBinding: '.labelBodyView.bodyYCoord',
  widthBinding:      '.labelBodyView.width',
  heightBinding:     '.labelBodyView.height',

  acceptsFirstResponder: function () {
    return this.get('isEnabled');
  }.property('isEnabled'),

  renderCallback: function (raphaelCanvas, attrs) {
    return raphaelCanvas.text().attr(attrs);
  },

  x: function () {
    return this.get('bodyXCoord') + 10;
  }.property('bodyXCoord'),
  
  y: function () {
    return this.get('bodyYCoord') + this.get('height')/2;
  }.property('bodyYcoord'),

  render: function (context, firstTime) {
    var attrs = {
          text:          this.get('text'),
          x:             this.get('x'),
          y:             this.get('y'),
          fill:          this.get('textColor'),
          'font-size':   this.get('fontSize'),
          'text-anchor': 'start'
        },
        editing = this.get('isEditing'),
        raphaelText;

    if (firstTime) {
      context.callback(this, this.renderCallback, attrs);
      this.renderChildViews(context,firstTime);
    }
    else {
      raphaelText = this.get('raphaelObject');
      if (editing) {
        raphaelText.attr('text', this.get('text') + "_");
      }
      raphaelText.attr(attrs);
      this.adjustMetrics();
    }
  },

  beginEditing: function () {
    if (!this.get('isEditable')) { return NO ; }
    this.beginPropertyChanges();
    this.set('isEditing', YES);
    this.becomeFirstResponder();
    this.endPropertyChanges();
    return YES ;
  },

  discardEditing: function () {
    this.commitEditing();
  },

  commitEditing: function () {
    this.beginPropertyChanges();
    this.resignFirstResponder();
    this.set('isEditing', NO) ;
    this.endPropertyChanges();
    return YES ;
  },

  updateText: function (newtext) {
    this.set('text',newtext);
  },

  adjustMetrics: function () {
    var editing = this.get('isEditing'),
        raphaelText = this.get('raphaelObject'),
        bounds;

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

  // This will update our parrents attributes,
  // and might cause some bad recursion in view rendering.
  updateParentBoundDimensions: function () {
    this.set('width', this.get('boundsWidth') + 30);
    this.set('height', this.get('boundsHeight') + 30);
  },

  keyDown: function (evt) {
    var chr = null;
    if (evt.type === 'keypress') {
      chr = evt.getCharString();
      if (chr) {
        this.insertText(chr);
        return YES;
      }
    }
    return this.interpretKeyEvents(evt) ? YES : NO;
  },

  insertText: function (chr) {
    this.updateText(this.get('text') + chr);
    return YES;
  },

  insertNewline: function () {
    this.insertText("\n");
  },

  insertTab: function () {
    this.commitEditing();
  },

  cancel: function () {
    this.discardEditing();
  },

  deleteBackward: function () {
      var t       = this.get('text'),
          newText = t.substr(0,t.length-1);

      this.updateText(newText);
    return YES;
  },

  deleteForward: function () {
      var t       = this.get('text'),
          newText = t.substr(0,t.length-1);

      this.updateText(newText);
    return YES;
  },

  editBoxView: RaphaelViews.RaphaelView.design({
    displayProperties:    'x y width height isVisible'.w(),
    textLabelView:        SC.outlet('parentView'),
    isVisibleBinding:     '.textLabelView.isEditing',
    parentsWidthBinding:  '.textLabelView.boundsWidth',
    parentsHeightBinding: '.textLabelView.boundsHeight',
    parentsXBinding:      '.textLabelView.boundsX',
    parentsYBinding:      '.textLabelView.boundsY',
    fill:                 '#ff5',
    opacity:              0.2,
    margin:               2,

    twoMargin: function () {
      return this.get('margin') * 2;
    }.property().cacheable(),

    x: function () {
      return this.get('parentsX') - this.get('margin');
    }.property('parentsX'),

    y: function () {
      return this.get('parentsY') - this.get('margin');
    }.property('parentsY'),

    width: function () {
      return this.get('parentsWidth') + this.get('twoMargin');
    }.property('parentsWidth'),

    height: function () {
      return this.get('parentsHeight') + this.get('twoMargin');
    }.property('parentsHeight'),

    renderCallback: function (raphaelCanvas, attrs) {
      return raphaelCanvas.rect().attr(attrs);
    },

    render: function (context, firstTime) {
      var raphaelRect,
          attrs = {
             'fill':    this.get('fill'),
             'opacity': this.get('opacity'),
             'x':       this.get('x'),
             'y':       this.get('y'),
             'width':   this.get('width'),
             'height':  this.get('height')
          };

      if (firstTime) {
        context.callback(this, this.renderCallback, attrs);
      }
      else {
        raphaelRect = this.get('raphaelObject');
        raphaelRect.attr(attrs);
      }
    } // render

  })
});
