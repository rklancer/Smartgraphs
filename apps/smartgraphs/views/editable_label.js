// ==========================================================================
// Project:   Smartgraphs.EditableLabelView
// Copyright: ©2011 Concord Consortium
// Author:    Noah Paessel <knowuh@gmail.com>
// Author:    Richard Klancer <rpk@pobox.com> (revised to use TextFieldView, 25-Feb-2012)
// ==========================================================================
/*globals Smartgraphs, RaphaelViews */

/** @class

  RaphaelView for an editable label.

  @extends SC.View
  @extends RaphaelViews.RenderSupport
*/
Smartgraphs.EditableLabelView = RaphaelViews.RaphaelView.extend({
/** @scope Smartgraphs.EditableLabelView.prototype */

  isEditing:           NO,
  textFieldView:       null,  // defined on init
  fontSize:            12,

  prevLayer: null,
  createFreshLayer: NO,

  displayProperties:   'displayText textColor x y raphTextY isEditing width height'.w(),

  labelBodyView:       SC.outlet('parentView'),
  labelView:           SC.outlet('labelBodyView.parentLabelView'),
  graphView:           SC.outlet('labelView.graphView'),
  graphCanvasView:     SC.outlet('graphView.graphCanvasView'),

  textBinding:         '.labelBodyView.text',
  textColorBinding:    '.labelBodyView.textColor',
  itemBinding:         '.labelBodyView.item',

  parentXBinding:      '.labelBodyView.bodyXCoord',
  parentYBinding:      '.labelBodyView.bodyYCoord',
  leftMarginBinding:   '.labelBodyView.leftMargin',
  topMarginBinding:    '.labelBodyView.topMargin',

  maxTextFieldWidthBinding: '.labelView.maxTextFieldWidth',
  maxCharactersBinding: '.labelView.maxCharacters',

  calculatedTextHeightBinding: '.labelView.calculatedTextHeight',
  calculatedTextWidthBinding: '.labelView.calculatedTextWidth',

  // Bounds need to be calculated by Raphael:
  minHeight: function () {
    return this.get('isEditing') ? this.get('fontSize') * 1.2 * 3: 18;
  }.property('isEditing').cacheable(),

  minWidth: function () {
    return this.get('isEditing') ? this.get('maxTextFieldWidth') : 80;
  }.property('isEditing').cacheable(),

  // our parent view is going to modify our position
  // but we will modify our parents width and height
  x: function () {
    // in IE 8 and 9, parentX is sometimes undefined
    var parentX = this.get('parentX') || 0;
    return  parentX + this.get('leftMargin') || 0;
  }.property('parentX', 'leftMargin').cacheable(),

  y: function () {
    // in IE 8 and 9, parentX is sometimes undefined
    var parentY = this.get('parentY') || 0;
    return parentY + this.get('topMargin') || 0;
  }.property('parentY', 'topMargin').cacheable(),

  raphTextY: function () {
    // in IE 8 and 9, height is sometimes undefined
    var h = this.get('height') || 0;
    return this.get('y') + (h / 2);
  }.property('y', 'height').cacheable(),

  displayText: function () {
    // Returning the displayText as just a space so that when dragging in editing mode,
    // it won't display two text in slow browsers
    if (this.get('isEditing')) {
      return ' ';
    }
    var text = this.get('text');
    var arrWrappedText = [];

    var maxCharacters = 0;
    var raphaelText = this.get('raphaelObject');
    if (text && raphaelText) {
      var counter = 0, i = 0;
      while (i < text.length) {
        if (text.charAt(i) === '\n') {
          text = text.replace('\n', ' ');
        }

        raphaelText.attr('text', text.substring(0, i + 1));
        var bounds = raphaelText.getBBox();
        var textWidth = bounds.width;
        var textHeight = bounds.height;

        if (textWidth > (this.get('maxTextFieldWidth'))) {
          maxCharacters = i;
          var textParts = this.getTextPartsOnLineBreak(text, maxCharacters);
          
          arrWrappedText[counter] = textParts.beforeText;
          text = textParts.afterText;
          counter++;
          i = 0;
        }
        else {
          arrWrappedText[counter] = text;
        }
        i++;
      }

      text = '';
      for (var j = 0; j < arrWrappedText.length; j++) {
        if (j === arrWrappedText.length - 1) {
          text += arrWrappedText[j];
        }
        else {
          text += arrWrappedText[j] + '\n';
        }
      }
    }
    return text;
  }.property('text', 'isEditing').cacheable(),

  getTextPartsOnLineBreak: function (text, index) {
    var maxLimit = index;
    for (var pos = index, cnt = 0; text.charAt(pos) != " "; pos--, cnt++) {
      index = pos;
      if (cnt === maxLimit) {
        index = maxLimit - 1;
        break;
      }
    }
    return { beforeText : text.substring(0, index), afterText: text.substring(index, text.length) };
  },

  didCreateLayer: function () {
    sc_super();

    var prevLayer = this.get('prevLayer');
    if (prevLayer) {
      var layer = this.get('layer');
      if (layer === prevLayer) {
        this.set('createFreshLayer', YES);
      }
    }
    else {
      this.set('prevLayer', this.get('layer'));
    }
  },

  destroyLayer: function () {
    sc_super();

    this.set('prevLayer', null);
  },

  updateLayer: function () {
    if (this.get('createFreshLayer')) {
      this.set('createFreshLayer', NO);

      var raphaelContext = RaphaelViews.RaphaelContext();
      raphaelContext.isTopLevel = NO;

      this.prepareRaphaelContext(raphaelContext, YES);
      this.set('layer', raphaelContext.populateCanvas(this.get('raphaelCanvas')));

      // now notify the view and its child views..
      this._notifyDidCreateLayer();
    }
    else {
      sc_super();
    }
  },

  init: function () {
    var labelView = this;
    sc_super();
    var maxCharacters = labelView.getPath('labelView.item.maxCharacters');

    this.textFieldView = SC.TextFieldView.create({
      isTextArea: YES,
      maxLength: maxCharacters,

      continuouslyUpdatesValue: YES,

      init: function () {
        sc_super();
        this.set('maxLength', maxCharacters);
      },

      didCreateLayer : function () {
        sc_super();

        var view = this.$().find('textarea')[0];
        var self = this;
        // Handling the paste and cut events of the context menu
        // We cannot handle the delete of context menu as there isn't any event for that.
        view.onpaste = view.oncut = function () {
          // Using timer so that we get the updated text.
          setTimeout(function () {
            self.fieldValueDidChange();
            labelView.updateLayer();
          }, 1);
          return true;
        };
      },

      // For some reason, SC.TextFieldView doesn't implement touchStart and touchEnd. In this particular case,
      // the result is that the Mobile Safari keyboard does not show up in response to touches. The touchStart and
      // touchEnd implementations below seem to fix this.
      touchStart: function (evt) {
        sc_super();
        this.mouseDown(evt);
      },

      touchEnd: function (evt) {
        sc_super();
        this.mouseUp(evt);
      },

      keyDown: function (evt) {
        sc_super();
        // keyCode 13 represents 'Enter' key
        if (evt.keyCode === 13) {
          if (labelView.get('isEditing')) {
            labelView.commitEditing();
          }
        }
      },

      getTextLayout: function (textArea) {
        var h = 0, w = 0;
        var div = document.createElement('div');
        document.body.appendChild(div);

        $(div).css({
          position: 'absolute',
          display: 'none',
          height: 'auto',
          width: 'auto'
        });

        $(div).html(this.get('value'));

        var styles = ['font-size', 'font-style', 'font-weight', 'font-family', 'line-height', 'text-transform', 'letter-spacing'];
        $(styles).each(function () {
          var s = this.toString();
          $(div).css(s, $(textArea).css(s));
        });

        h = $(div).outerHeight();
        w = $(div).outerWidth();

        $(div).remove();
        return { width: w, height: h };
      },

      updateText: function (textField) {
        if (!labelView.get('isEditing')) {
          return;
        }
        labelView.set('text', '');
        var text = this.get('value');

        var maxWidth = labelView.get('maxTextFieldWidth');

        var textArea = textField.$input()[0];
        $(textArea).css('overflow', 'hidden');
        var newLayout = textField.getTextLayout(textArea);
        var calculatedTextWidth = 0;
        var calculatedTextHeight;
        if (newLayout.width > (maxWidth)) {
          calculatedTextWidth = maxWidth;
        }
        else {
          calculatedTextWidth = newLayout.width;
        }
        // noOfLines - This value will decide how many lines to show in the text-area.
        var noOfLines = Math.ceil(textArea.scrollHeight / (labelView.get('fontSize') * 1.2));
        calculatedTextHeight = noOfLines * newLayout.height;

        labelView.beginPropertyChanges();
        labelView.set('calculatedTextHeight', calculatedTextHeight);
        labelView.set('calculatedTextWidth', calculatedTextWidth);
        labelView.endPropertyChanges();
      },

      fieldValueDidChange: function () {
        sc_super();

        this.updateText(this);
      },

      willLoseFirstResponder: function () {
        labelView.textFieldViewLostFocus();
      }
    });
  },

  destroy: function () {
    this.set('isEditing', NO);
    this.bindings.forEach(function (binding) {
      binding.disconnect();
    });
    this.bindings = null;
    sc_super();
  },

  renderCallback: function (raphaelCanvas, attrs, adjustTextFieldView) {
    var ret = raphaelCanvas.text().attr(attrs);
    adjustTextFieldView(true);
    return ret;
  },

  render: function (context, firstTime) {
    var x               = this.get('x'),
        y               = this.get('y'),
        raphTextY       = this.get('raphTextY'),
        width           = this.get('width'),
        height          = this.get('height'),
        text            = this.get('displayText'),
        self = this,

        attrs = {
          x:             x,
          y:             raphTextY,
          fill:          this.get('textColor'),
          text:          text ? text : " ",     // Add a space when no text is there as IE8 shows undefined for blank text.
          'font-size':   this.get('fontSize'),
          'text-anchor': 'start'
        },

        isEditing       = this.get('isEditing'),

        graphCanvasView = this.get('graphCanvasView'),
        textFieldView   = this.get('textFieldView'),
        pane            = this.get('pane'),

        adjustTextFieldView = function (firstTime) {
          var offset;

          if (!pane) return;

          if (isEditing) {
            offset = graphCanvasView.$().offset();
            if (!firstTime || offset.left !== 0) { // Sometimes resizing gives offset values as 0 which is not valid.
              textFieldView.set('layout', {
                top:    offset.top + y,
                left:   offset.left + x,
                width:  width,
                height: height
              });
            }
            SC.run();
            pane.appendChild(textFieldView);
            textFieldView.becomeFirstResponder();

            // Perhaps because Mobile Safari won't bring up the keyboard in response to a script-initiated focus(),
            // unless the code executes in response to a touch on the textarea, TextFieldView.becomeFirstResponder
            // returns without trying to focus when running on touch browsers.
            //
            // HOWEVER, this code path only ever seems to execute in response to a user-initiated touch. Therefore,
            // go ahead and use focus() event in touch browsers. This forces the keyboard to come up.
            if (SC.platform.touch) {
              textFieldView.$().find('textarea').focus();
            }
          }
          else if (pane.get('childViews').contains(textFieldView)) {
            pane.removeChild(textFieldView);
          }
        },

        raphaelText;

    if (firstTime) {
      context.callback(this, this.renderCallback, attrs, adjustTextFieldView);
    }
    else {
      raphaelText = this.get('raphaelObject');
      raphaelText.attr(attrs);
      adjustTextFieldView(false);
    }
  },

  didRemoveFromGraphView: function () {
    var pane = this.get('pane');

    if (pane.get('childViews').contains(this.textFieldView)) {
      pane.removeChild(this.textFieldView);
      $('body').unbind('mousedown', this.mousedownHandler).unbind('touchstart', this.mousedownHandler);
      this.textFieldView.resignFirstResponder();
    }
    this.destroy();
  },

  adjustMetrics: function () {
    var raphaelText = this.get('raphaelObject'),
        minWidth    = this.get('minWidth'),
        minHeight   = this.get('minHeight'),
        bounds,
        width,
        height;

    if (raphaelText) {
      var text = this.get('displayText');
      raphaelText.attr('text', text ? text : " ");    // Add a space when no text is there as IE8 shows undefined for blank text.
      bounds = raphaelText.getBBox();
      if (this.get('isEditing')) {
        width  = this.get('calculatedTextWidth') < minWidth  ? minWidth  : this.get('calculatedTextWidth');
        height = this.get('calculatedTextHeight') < minHeight ? minHeight : this.get('calculatedTextHeight');
      }
      else {
        width  = bounds.width < minWidth  ? minWidth  : bounds.width;
        height = bounds.height < minHeight ? minHeight : bounds.height;
      }

      this.beginPropertyChanges();
      this.set('width',  width);
      this.set('height', height);
      this.endPropertyChanges();
    }
  }.observes('displayText', 'minWidth', 'minHeight', 'calculatedTextWidth', 'calculatedTextHeight'),

  beginEditing: function () {
    var self = this;

    // without the following, _mouseDownHandler will have 'this' bound to the target of the mousedown/touchstart event.
    this.mousedownHandler = this.mousedownHandler || function (evt) {
      self._mousedownHandler(evt);
    };

    if (this.get('isEditable')) {
      this.set('isEditing', YES);
      this.setPath('textFieldView.value', self.get('text'));
      $('body').bind('mousedown', this.mousedownHandler).bind('touchstart', this.mousedownHandler);
      return YES;
    }
    return NO;
  },

  /** Use this to allow user to click or tap away from the label in order to force loss of focus. */
  _mousedownHandler: function (evt) {
    var labelViewLayer = this.getPath('labelView.layer');

    if (evt.target !== this.textFieldView.$().find('textarea')[0] &&
        evt.target !== labelViewLayer &&
        !$.contains(labelViewLayer, evt.target)) {
      this.commitEditing();
      var topAnnotationsHolder = this.getPath('graphView.topAnnotationsHolder');
      var topAnnotationChildViews = topAnnotationsHolder.get('childViews');
      var stopEvent = true;

      for (var i = 0; i < topAnnotationChildViews.length; i++) {
        var childLabel = topAnnotationChildViews[i];
        if (childLabel.kindOf(Smartgraphs.LabelSetView) || childLabel.kindOf(Smartgraphs.LabelView)) {
          var view = childLabel.get('layer');
          if (view === evt.target || view.contains(evt.target)) {
            stopEvent = false;
          }
        }
        
      }
      if (stopEvent) {
        if (evt.originalEvent.stopPropagation) {
          evt.originalEvent.stopPropagation();
        }
        else {
          evt.stopPropagation();
        }
      }
    }
  },

  textFieldViewLostFocus: function () {
    if (this.get('isEditing')) this.commitEditing();
  },

  commitEditing: function () {
    $('body').unbind('mousedown', this.mousedownHandler).unbind('touchstart', this.mousedownHandler);
    this.set('isEditing', NO);
    this.set('text', this.textFieldView.get('value'));
    this.textFieldView.resignFirstResponder();
  }

});
