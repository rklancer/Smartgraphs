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

  isEditing:           NO,
  isAllSelected:       NO,

  fontSize:            12,
  displayProperties:   'displayText textColor x raphTextY isEditing'.w(),

  labelBodyView:       SC.outlet('parentView'),

  textBinding:         '.labelBodyView.text',
  textColorBinding:    '.labelBodyView.textColor',
  parentXBinding:      '.labelBodyView.bodyXCoord',
  parentYBinding:      '.labelBodyView.bodyYCoord',
  parentMarginBinding: '.labelBodyView.margin',
 
  // Bounds need to be calculated by Raphael:
  minHeight: 30,
  minWidth: 100,
  // width:       100,
  // height:      20,
  
  init: function () {
    sc_super();
    if (this.get('isEditable')) {
      this.beginEditing();
    }
  },

  // our parent view is going to modify our position
  // but we will modify our parents width and height
  x: function () {
    return this.get('parentX') + this.get('parentMargin');
  }.property('parentX', 'parentMargin').cacheable(),

  y: function () {
    return this.get('parentY') + this.get('parentMargin');
  }.property('parentY', 'parentMargin').cacheable(),

  raphTextY: function() {
    return this.get('y') + (this.get('height') / 2);
  }.property('y','height').cacheable(),

  acceptsFirstResponder: function () {
    return this.get('isEnabled');
  }.property('isEnabled').cacheable(),

  willLoseFirstResponder: function () {
    console.log("loosing first responder");
    this.set('isEditing', NO);
    this.set('isAllSelected', NO);
  },

  renderCallback: function (raphaelCanvas, attrs) {
    return raphaelCanvas.text().attr(attrs);
  },


  // height: function () {
  //   var raphaelText = this.get('raphaelObject'),
  //       bounds;
  //   if (SC.none(raphaelText) || SC.none(raphaelText.getBBox() || SC.none(raphaelText.getBBox().height))) {
  //     return minHeight;
  //   }
  //   return raphaelText.getBBox().height;
  // }.property('raphaelObject', 'displayText').cacheable(),

  // width: function () {
  //   var raphaelText = this.get('raphaelObject'),
  //       bounds;
  //   if (SC.none(raphaelText) || SC.none(raphaelText.getBBox() || SC.none(raphaelText.getBBox().width))) {
  //     return minWidth;
  //   }
  //   return raphaelText.getBBox().width;
  // }.property('raphaelObject', 'displayText').cacheable(),

  displayText: function () {
    var txt = this.get('text');
    if (this.get('isEditing')) { txt = txt + "_"; }
    return txt;
  }.property('text', 'isEditing').cacheable(),

  render: function (context, firstTime) {
    var attrs = {
          x:             this.get('x'),
          y:             this.get('raphTextY'),
          fill:          this.get('textColor'),
          text:          this.get('displayText'),
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
      raphaelText.attr(attrs);
      this.adjustMetrics();
    }
  },

  adjustMetrics: function () {
    var editing = this.get('isEditing'),
        raphaelText = this.get('raphaelObject'),
        bounds,
        minWidth = this.get('minWidth'),
        minHeight = this.get('minHeight'),
        width,
        height;
        
    if (raphaelText) {
      bounds = raphaelText.getBBox();
      width  = bounds.width  < minWidth  ? minWidth  : bounds.width;
      height = bounds.height < minHeight ? minHeight : bounds.height;
      
      this.beginPropertyChanges();
      this.set('width'  , width);
      this.set('height' , height);
      this.endPropertyChanges();
    }
  },

  toggle: function (paramName) {
    this.set(paramName, (! this.get(paramName)));
  },

  beginEditing: function () {
    this.toggle('isAllSelected');
    if (!this.get('isEditable')) { return NO ; }
    this.set('isEditing', YES);
    this.becomeFirstResponder();
    return YES ;
  },

  discardEditing: function () {
    return this.commitEditing();
  },

  commitEditing: function () {
    this.resignFirstResponder();
    this.set('isEditing', NO) ;
    return YES ;
  },

  updateText: function (newtext) {
    this.beginPropertyChanges();
    this.set('text',newtext);
    this.endPropertyChanges();
  },

  keyDown: function (evt) {
    var chr = null;
    if (this.interpretKeyEvents(evt)) {
      return YES;
    }
    if (evt.type === 'keypress') {
      chr = evt.getCharString();
      if (chr) {
        this.appendText(chr);
        return YES;
      }
    }
    return NO;
  },

  appendText: function (chr) {
    this.set('isAllSelected', NO);
    this.updateText(this.get('text') + chr);
    return YES;
  },

  // @see frameworks/sproutcore/frameworks/desktop/system/key_bindings.js
  insertNewline: function () {
    this.appendText("\n");
  },

  // @see frameworks/sproutcore/frameworks/desktop/system/key_bindings.js
  insertTab: function () {
    this.commitEditing();
  },

  // @see frameworks/sproutcore/frameworks/desktop/system/key_bindings.js
  cancel: function () {
    this.discardEditing();
  },

  // @see frameworks/sproutcore/frameworks/desktop/system/key_bindings.js
  selectAll: function() {
    this.set('isAllSelected', YES);
  },

  // @see frameworks/sproutcore/frameworks/desktop/system/key_bindings.js
  deleteBackward: function () {
    var t       = this.get('text'),
        newText = t.substr(0,t.length-1);

    if (this.get('isAllSelected')) {
      newText = "";
    }
    this.updateText(newText);
    return YES;
  },

  // @see frameworks/sproutcore/frameworks/desktop/system/key_bindings.js
  // only problem is that deleteForward seems bound to "."
  // deleteForward: function () {
  //   return this.deleteBackward();
  // },

  editBoxView: RaphaelViews.RaphaelView.design({
    displayProperties:    'parentsX parentsY width height isVisible isAllSelected'.w(),
    textLabelView:        SC.outlet('parentView'),
    isVisibleBinding:     '.textLabelView.isEditing',
    parentsWidthBinding:  '.textLabelView.width',
    parentsHeightBinding: '.textLabelView.height',
    parentsXBinding:      '.textLabelView.x',
    parentsYBinding:      '.textLabelView.y',
    isAllSelectedBinding: '.textLabelView.isAllSelected',
    fill:                 '#FF5',
    strokeWidth:          1,
    stroke:               '#CCC',
    editingOpacity:       0.3,
    normalOpacity:        0.05,
    margin:               3,

    twoMargin: function () {
      return this.get('margin') * 2;
    }.property().cacheable(),

    x: function () {
      return this.get('parentsX') - this.get('margin');
    }.property('parentsX').cacheable(),

    y: function () {
      return this.get('parentsY') - this.get('margin');
    }.property('parentsY').cacheable(),

    width: function () {
      return this.get('parentsWidth') + this.get('twoMargin');
    }.property('parentsWidth').cacheable(),

    height: function () {
      return this.get('parentsHeight') + this.get('twoMargin');
    }.property('parentsHeight').cacheable(),

    renderCallback: function (raphaelCanvas, attrs) {
      return raphaelCanvas.rect().attr(attrs);
    },

    render: function (context, firstTime) {
      var raphaelRect,
          opacity = this.get('isAllSelected') ? this.get('editingOpacity') : this.get('normalOpacity'),
          attrs = {
             'fill':    this.get('fill'),
             'fill-opacity': opacity,
             'stroke-width': this.get('strokeWidth'),
             'stroke':       this.get('stroke'),
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
