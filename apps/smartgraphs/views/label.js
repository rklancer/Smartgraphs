// ==========================================================================
// Project:   Smartgraphs.LabelView
// Copyright: ©2011 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs RaphaelViews*/


/** @class

  (Document Your View Here)

  @extends SC.View
*/
Smartgraphs.LabelView = RaphaelViews.RaphaelView.extend(
/** @scope Smartgraphs.LabelView.prototype */ {

  // The 'item', 'graphView', and 'controller' will be set for us (overwriting the below) if we are added directly
  // to the graphView. If we are the exampleView of a LabelSet collection view, on the other hand, we need to find the
  // properties as shown below. Note that these values, once set, should be cached.
  item: function () {
    return this.get('content');
  }.property().cacheable(),

  graphView: function () {
    return this.getPath('parentView.graphView');
  }.property().cacheable(),

  controller: function () {
    return this.getPath('parentView.controller');
  }.property().cacheable(),

  textBinding: '*item.text',
  textColor:   '#333333',

  shouldMarkTargetPointBinding: '*item.shouldMarkTargetPoint',
  shouldMarkTargetPointBindingDefault: SC.Binding.oneWay(),

  stroke: '#000000',
  highlightedStroke: '#6699ff',
  fill: '#ffffff',

  isBodyDragging: NO,

  xBinding: '*item.x',
  yBinding: '*item.y',

  xOffsetBinding: '*item.xOffset',
  yOffsetBinding: '*item.yOffset',

  isRemovalEnabledBinding: '*item.isRemovalEnabled',

  // graphScale isn't a real property, just a token we use to invalidate (xCoord, yCoord)
  xCoord: function () {
    return this.get('graphView').coordinatesForPoint(this.get('x'), 0).x;
  }.property('x', 'graphScale'),

  yCoord: function () {
    return this.get('graphView').coordinatesForPoint(0, this.get('y')).y;
  }.property('y', 'graphScale'),

  width: 100,
  height: 45,

  cornerRadius: 4,

  bodyXCoord: null,
  bodyYCoord: null,

  anchorXCoord: null,
  anchorYCoord: null,

  coordsDidChange: function () {
    var xCoord  = this.get('xCoord'),
        yCoord  = this.get('yCoord'),
        xOffset = this.get('xOffset'),
        yOffset = this.get('yOffset'),
        height  = this.get('height'),
        width   = this.get('width');

    // need to calculate an offset more intelligently, but for now...

    this.set('bodyXCoord',   xCoord + xOffset);
    this.set('bodyYCoord',   yCoord + yOffset - height);
    this.set('anchorXCoord', xCoord + xOffset + width / 2);
    this.set('anchorYCoord', yCoord + yOffset);

  }.observes('xCoord', 'yCoord', 'xOffset', 'yOffset', 'width', 'height'),

  didCreateLayer: function () {
    sc_super();
    this.$().css('cursor', 'default');
  },

  viewDidResize: function () {
    this.invokeLast(this.notifyGraphScaleChange);
  },

  notifyGraphScaleChange: function () {
    this.notifyPropertyChange('graphScale');
  },

  childViews: 'targetPointView connectingLineView labelBodyView'.w(),

  targetPointView: RaphaelViews.RaphaelView.design({
    displayProperties: 'xCoord yCoord stroke'.w(),

    labelView: SC.outlet('parentView'),

    xCoordBinding: '.labelView.xCoord',
    yCoordBinding: '.labelView.yCoord',
    strokeBinding: '.labelView.stroke',

    // Using a computed property for 'isVisible' here because the following locks up the jasmine test for some reason:
    // isVisibleBinding: '.labelView.shouldMarkTargetPoint',
    // isVisibleBindingDefault: SC.Binding.oneWay(),

    shouldMarkTargetPointBinding: '.labelView.shouldMarkTargetPoint',

    isVisible: function () {
      return this.get('shouldMarkTargetPoint');
    }.property('shouldMarkTargetPoint'),

    renderCallback: function(raphaelCanvas, pathString, stroke) {
      return raphaelCanvas.path(pathString).attr({ stroke: stroke });
    },

    render: function (context, firstTime) {
      var xCoord     = this.get('xCoord'),
          yCoord     = this.get('yCoord'),
          stroke     = this.get('stroke'),
          pathString = this.xPath(xCoord, yCoord),
          raphaelPath;

      if (firstTime) {
        context.callback(this, this.renderCallback, pathString, stroke);
      }
      else {
        raphaelPath = this.get('raphaelObject');
        raphaelPath.attr({
          path: pathString,
          stroke: stroke
        });
      }
    },

    xPath: function (xCoord, yCoord) {
      var elements = [],
          x = xCoord - 4,
          y = yCoord + 4;

      if (SC.none(xCoord) || SC.none(yCoord)) return "M 0 0";

      elements.push('M');
      elements.push(x);
      elements.push(y);
      elements.push('L');
      elements.push(x+8);
      elements.push(y-8);

      x = xCoord - 4;
      y = yCoord - 4;

      elements.push('M');
      elements.push(x);
      elements.push(y);
      elements.push('L');
      elements.push(x+8);
      elements.push(y+8);

      return elements.join(' ');
    }

  }),

  connectingLineView: RaphaelViews.RaphaelView.design({

    displayProperties: 'xCoord yCoord anchorXCoord anchorYCoord stroke startRadius'.w(),

    labelView: SC.outlet('parentView'),

    defaultStrokeBinding: '.labelView.stroke',
    highlightedStrokeBinding: '.labelView.highlightedStroke',
    defaultStrokeWidth: 1,
    highlightedStrokeWidth: 2,
    isHighlightedBinding: '.labelView.isBodyDragging',

    stroke: function () {
      return this.get('isHighlighted') ? this.get('highlightedStroke') : this.get('defaultStroke');
    }.property('isHighlighted', 'highlightedStroke', 'defaultStroke').cacheable(),

    strokeWidth: function () {
      return this.get('isHighlighted') ? this.get('highlightedStrokeWidth') : this.get('defaultStrokeWidth');
    }.property('isHighlighted', 'highlightedStrokeWidth', 'defaultStrokeWidth').cacheable(),

    xCoordBinding: '.labelView.xCoord',
    yCoordBinding: '.labelView.yCoord',
    anchorXCoordBinding: '.labelView.anchorXCoord',
    anchorYCoordBinding: '.labelView.anchorYCoord',

    // How far from the targetPointView's center to start drawing the connecting line
    startRadius: 9,

    renderCallback: function (raphaelCanvas, pathString, stroke, strokeWidth) {
      return raphaelCanvas.path(pathString).attr({stroke: stroke, 'stroke-width': strokeWidth});
    },

    render: function (context, firstTime) {
      var xCoord       = this.get('xCoord'),
          yCoord       = this.get('yCoord'),
          anchorXCoord = this.get('anchorXCoord'),
          anchorYCoord = this.get('anchorYCoord'),
          stroke       = this.get('stroke'),
          strokeWidth  = this.get('strokeWidth'),
          startRadius  = this.get('startRadius'),
          dx           = anchorXCoord - xCoord,
          dy           = anchorYCoord - yCoord,
          length       = Math.sqrt( dx*dx + dy*dy ), // dist. between (xCoord, yCoord) and (anchorXCoord, anchorYCoord)
          startX,
          startY,
          pathString,
          raphaelPath;

      if (SC.none(xCoord) || SC.none(yCoord) || SC.none(anchorXCoord) || SC.none(anchorYCoord)) {
        pathString = 'M 0 0';
      }
      else {
        startX       = xCoord + (startRadius / length) * dx;
        startY       = yCoord + (startRadius / length) * dy;
        pathString   = ['M', startX, startY, 'L', anchorXCoord, anchorYCoord].join(' ');
      }

      if (firstTime) {
        context.callback(this, this.renderCallback, pathString, stroke, strokeWidth);
      }
      else {
        raphaelPath = this.get('raphaelObject');
        raphaelPath.attr({ path: pathString, stroke: stroke, 'stroke-width': strokeWidth });
      }
    }

  }),

  labelBodyView: RaphaelViews.RaphaelView.design({

    childViews: 'labelTextView removeButtonView'.w(),

    labelView: SC.outlet('parentView'),

    displayProperties: 'bodyXCoord bodyYCoord width height stroke strokeWidth fill cornerRadius'.w(),

    bodyXCoordBinding:   '.labelView.bodyXCoord',
    bodyYCoordBinding:   '.labelView.bodyYCoord',
    xOffsetBinding:      '.labelView.xOffset',
    yOffsetBinding:      '.labelView.yOffset',
    widthBinding:        '.labelView.width',
    heightBinding:       '.labelView.height',

    fillBinding:         '.labelView.fill',
    cornerRadiusBinding: '.labelView.cornerRadius',

    defaultStrokeBinding:     '.labelView.stroke',
    highlightedStrokeBinding: '.labelView.highlightedStroke',
    defaultStrokeWidth:       1,
    highlightedStrokeWidth:   2,

    isHighlightedBinding:     '.labelView.isBodyDragging',

    stroke: function () {
      return this.get('isHighlighted') ? this.get('highlightedStroke') : this.get('defaultStroke');
    }.property('isHighlighted', 'highlightedStroke', 'defaultStroke').cacheable(),

    strokeWidth: function () {
      return this.get('isHighlighted') ? this.get('highlightedStrokeWidth') : this.get('defaultStrokeWidth');
    }.property('isHighlighted', 'highlightedStrokeWidth', 'defaultStrokeWidth').cacheable(),


    renderCallback: function (raphaelCanvas, attrs) {
      return raphaelCanvas.rect().attr(attrs);
    },

    render: function (context, firstTime) {
      var attrs = {
            x:              this.get('bodyXCoord') || 0,
            y:              this.get('bodyYCoord') || 0,
            width:          this.get('width') || 0,
            height:         this.get('height') || 0,
            r:              this.get('cornerRadius') || 0,
            stroke:         this.get('stroke'),
            'stroke-width': this.get('strokeWidth'),
            fill:           this.get('fill'),
            'fill-opacity': 1.0
          },

          raphaelRect;

      if (firstTime) {
        context.callback(this, this.renderCallback, attrs);
        this.renderChildViews(context, firstTime);
      }
      else {
        raphaelRect = this.get('raphaelObject');
        raphaelRect.attr(attrs);
      }
    },
    
    mouseEntered: function () { return YES; },

    mouseExited: function (evt) {
      if (evt.toElement != this.labelTextView.backgroundBox.node) {
        if (this.labelTextView.get('isEditing')) {
          this.labelTextView.commitEditing()
        }
        return YES;
      }
      return NO;
    },

    // Dragging. Note that dragging is 'stateless' in the sense that you can always drag a label view. So we won't hook
    // into states or the controller layer. We also assume until proven otherwise that we can modify our own cursor
    // without consequence.
    mouseDown: function (evt) {
      this.startDrag(evt);
    },

    mouseUp: function(evt) {
      this.endDrag(evt);
      var now = new Date().getTime();
      var interval = 202; // ms
      var maxTime = 200;  // ms
      if (typeof this.lastUp != 'undefined' && this.lastUp) {
        interval  = now - this.lastUp;
        if (interval < maxTime) {
          return this.doubleClick(evt);
        }
      }
      this.lastUp = now;
      return NO;
    },

    doubleClick: function(evt) {
      this.labelTextView.beginEditing();
      return YES;
    },

    mouseDragged: function (evt) {
      this.drag(evt);
    },

    startDrag: function (evt) {
      this.setPath('labelView.isBodyDragging', YES);

      this._isDragging = YES;
      this._dragX = evt.pageX;
      this._dragY = evt.pageY;

      // our layer doesn't respect SC.Cursor, so set the cursors manually
      this.$().css('cursor', 'move');
    },

    drag: function (evt) {
      var xOffset = this.get('xOffset'),
          yOffset = this.get('yOffset');

      if (!this._isDragging) return;

      this.set('xOffset', xOffset + evt.pageX - this._dragX);
      this.set('yOffset', yOffset + evt.pageY - this._dragY);
      this._dragX = evt.pageX;
      this._dragY = evt.pageY;
    },

    endDrag: function (evt) {
      this.drag(evt);
      this.setPath('labelView.isBodyDragging', NO);
      this._isDragging = NO;

      this.$().css('cursor', 'default');
    },




    /***********************************************************/
    labelTextView: RaphaelViews.RaphaelView.design(SC.Editable, {

      displayProperties: 'text textColor width height bodyXCoord bodyYCoord isEditable'.w(),

      labelView:     SC.outlet('parentView.labelView'),
      labelBodyView: SC.outlet('parentView'),

      textBinding:       '.labelView.text',
      textColorBinding:  '.labelView.textColor',

      // width:
      widthBinding:      '.labelBodyView.width',
      heightBinding:     '.labelBodyView.height',
      bodyXCoordBinding: '.labelBodyView.bodyXCoord',
      bodyYCoordBinding: '.labelBodyView.bodyYCoord',


      // TODO: something more reasonable with properties in parent:
      isEditable:        YES,
      isEditing:         NO,
      isEnabled:         YES,
      isKeyResponder:    YES,
      isMouseResponder:  NO,
      didLoseKeyResponderTo: function(arg) {
        this.commitEditing();
      },
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
            raphaelText.attr('text', this.get('text') + " »");
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
        if (this.get('isEditing')) return YES ;

        // begin editing
        this.beginPropertyChanges();
        this.set('isEditing', YES) ;
        this.becomeFirstResponder() ;
        this.endPropertyChanges();
        this.backgroundBox.show();
        return YES ;
      },

      discardEditing: function() {
        // if we are not editing, return YES, otherwise NO.
        this.set('isEditing', NO);
        this.backgroundBox.hide();
        return !this.get('isEditing');
      },

      commitEditing: function() {
        if (!this.get('isEditing')) return YES;
        this.backgroundBox.hide();
        this.set('isEditing', NO) ;
        this.resignFirstResponder() ;
        return YES ;
      },

      updateText: function(newtext) {
        this.set('text',newtext);
      },

      insertText: function(charst) {
        var text = this.get('text');
        text = text + charst;
        this.updateText(text);
        return YES;
      },
 
      insertNewline: function() {
        this.insertText("\n");
      },

      insertTab: function() {
        this.commitEditing();
      },

      cancel: function() {
        this.commitEditing();
      },

      keyDown: function(evt) {
        evt.preventDefault(); // disable backspace, enter,tab
        return this.interpretKeyEvents(evt) ? YES : NO;
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
      // keyPress: function(evt) {
      //   console.log(evt.charCode);
      // },

      // keyUp: function(evt) {
      //   evt.preventDefault(); // disable backspace, enter,tab
      //   // var code, actualKey;
      //   var code = evt.charCode? evt.charCode : evt.keyCode;
      //   if (code == 46 || code == 8) {
      //     this.backspace();
      //     return YES;
      //   }
      //   if (code == 13) {
      //     this.enter();
      //     return YES;
      //   }
      //   if (code == 27) {
      //     this.escape();
      //     return YES;
      //   }
      //   if (code == 9) {
      //     this.tab();
      //     return YES;
      //   }
      //   return NO;
      //   // this.handleAlpha(evt);
      // },

      // handleAlpha: function(evt) {
      //     var code, actualKey;
      //     code = evt.charCode? evt.charCode : evt.keyCode;
      //     actualkey=String.fromCharCode(code);
      //     if (! evt.shiftKey) {
      //       actualkey=actualkey.toLowerCase();
      //     }
      //     if (actualkey == "\t") { this.tab();   }
      //     else if (actualkey == "\n") { this.enter(); }
      //     else { this.insertText(actualkey); }
      // },

    }),
    /***********************************************************/




    removeButtonView: RaphaelViews.RaphaelView.design({

      displayProperties: 'bodyXCoord bodyYCoord width isHighlighted'.w(),

      labelView:     SC.outlet('parentView.labelView'),
      labelBodyView: SC.outlet('parentView'),

      widthBinding:      '.labelBodyView.width',
      bodyXCoordBinding: '.labelBodyView.bodyXCoord',
      bodyYCoordBinding: '.labelBodyView.bodyYCoord',

      isRemovalEnabledBinding: '.labelView.isRemovalEnabled',

      isVisible: function () {
        return this.get('isRemovalEnabled');
      }.property('isRemovalEnabled'),

      isHighlighted: NO,

      highlightedCircleColor:    '#999999',
      notHighlightedCircleColor: '#ffffff',
      highlightedXStroke:        '#ffffff',
      notHighlightedXStroke:     '#999999',

      circleColor: function () {
        return this.get('isHighlighted') ? this.get('highlightedCircleColor') : this.get('notHighlightedCircleColor');
      }.property('isHighlighted', 'highlightedCircleColor', 'notHighlightedCircleColor').cacheable(),

      xStroke: function () {
        return this.get('isHighlighted') ? this.get('highlightedXStroke') : this.get('notHighlightedXStroke');
      }.property('isHighlighted', 'highlightedXStroke', 'notHighlightedXStroke').cacheable(),

      renderCallback: function (raphaelCanvas, circleAttrs, xAttrs) {
        return raphaelCanvas.set().push(
          raphaelCanvas.circle().attr(circleAttrs),
          raphaelCanvas.path().attr(xAttrs)
        );
      },

      render: function (context, firstTime) {
        var centerX = this.get('bodyXCoord') + this.get('width') - 10 || 0,
            centerY = this.get('bodyYCoord') + 10 || 0,

            circleAttrs = {
              r:      6,
              cx:     centerX,
              cy:     centerY,
              stroke: this.get('circleColor'),
              fill:   this.get('circleColor')
            },

            xPath = ['M', centerX - 3, centerY - 3, 'L', centerX + 3, centerY + 3,
                     'M', centerX - 3, centerY + 3, 'L', centerX + 3, centerY - 3].join(' '),

            xAttrs = {
              path:           xPath,
              'stroke-width': 2,
              stroke:         this.get('xStroke')
            },

            raphaelObj,
            raphaelCircle,
            raphaelX;

        if (firstTime) {
          context.callback(this, this.renderCallback, circleAttrs, xAttrs);
        }
        else {
          raphaelObj    = this.get('raphaelObject');
          raphaelCircle = raphaelObj.items[0];
          raphaelX      = raphaelObj.items[1];

          raphaelCircle.attr(circleAttrs);
          raphaelX.attr(xAttrs);
        }
      },

      mouseDown: function () {
        this.get('labelView').remove();
      },

      mouseEntered: function () {
        this.set('isHighlighted', YES);
      },

      mouseExited: function () {
        this.set('isHighlighted', NO);
      }

    })


  }),

  remove: function () {
    if (this.get('isRemovalEnabled')) this.get('controller').labelViewRemoveLabel(this.get('item'));
  }

});
