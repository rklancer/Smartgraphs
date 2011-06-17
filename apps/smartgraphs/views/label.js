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
sc_require('views/editable_label');
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

  textBinding:       '*item.text',
  textColor:         '#333333',
  stroke:            '#000000',
  highlightedStroke: '#6699ff',
  fill:              '#ffffff',

  shouldMarkTargetPointBinding: '*item.shouldMarkTargetPoint',
  shouldMarkTargetPointBindingDefault: SC.Binding.oneWay(),

  isBodyDragging: NO,

  markerStyle: 'arrow', // 'arrow', 'x', or 'none'
  markerSize:  10,

  xBinding:       '*item.x',
  yBinding:       '*item.y',

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

  defaultWidth: 100,
  defaultHeight: 45,
  
  labelBodyWidthBinding:  '.labelBodyView.width',
  labelBodyHeightBinding: '.labelBodyView.height',
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
        height  = this.get('labelBodyHeight'),
        width   = this.get('labelBodyWidth');

    // need to calculate an offset more intelligently, but for now...

    this.set('bodyXCoord',   xCoord + xOffset);
    this.set('bodyYCoord',   yCoord + yOffset - height);
    this.set('anchorXCoord', xCoord + xOffset + width / 2);
    this.set('anchorYCoord', yCoord + yOffset);

  }.observes('xCoord', 'yCoord', 'xOffset', 'yOffset', 'labelBodyWidth', 'labelBodyHeight'),

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

  targetPointView: RaphaelViews.RaphaelView.design(Smartgraphs.ArrowDrawing, {

    labelView: SC.outlet('parentView'),

    xCoordBinding:       '.labelView.xCoord',
    yCoordBinding:       '.labelView.yCoord',
    anchorXCoordBinding: '.labelView.anchorXCoord',
    anchorYCoordBinding: '.labelView.anchorYCoord',
    strokeBinding:       '.labelView.stroke',
    markerStyleBinding:  '.labelView.markerStyle',
    markerSizeBinding:   '.labelView.markerSize',

    // Using a computed property for 'isVisible' here
    // because the following locks up the jasmine test for some reason:
    // isVisibleBinding: '.labelView.shouldMarkTargetPoint',
    // isVisibleBindingDefault: SC.Binding.oneWay(),

    shouldMarkTargetPointBinding: '.labelView.shouldMarkTargetPoint',
    defaultFillBinding:           '.labelView.stroke',
    highlightedFillBinding:       '.labelView.highlightedStroke',
    isHighlightedBinding:         '.labelView.isBodyDragging',

    fill: function () {
      return this.get('isHighlighted') ? this.get('highlightedFill') : this.get('defaultFill');
    }.property('isHighlighted', 'highlightedFill', 'defaultFill').cacheable(),

    strokeWidth: function () {
      return this.get('isHighlighted') ? this.get('highlightedStrokeWidth') : this.get('defaultStrokeWidth');
    }.property('isHighlighted', 'highlightedStrokeWidth', 'defaultStrokeWidth').cacheable(),

    displayProperties: 'xCoord yCoord anchorXCoord isHighlighted anchorYCoord stroke startRadius'.w(),

    isVisible: function () {
      return this.get('shouldMarkTargetPoint');
    }.property('shouldMarkTargetPoint').cacheable(),

    renderCallback: function(raphaelCanvas, pathString, stroke) {
      return raphaelCanvas.path(pathString).attr({ stroke: stroke });
    },

    render: function (context, firstTime) {
      var xCoord     = this.get('xCoord'),
          yCoord     = this.get('yCoord'),
          fill       = this.get('fill'),
          pathString,
          raphaelPath;

      pathString = this.markPath();
      if (firstTime) {
        context.callback(this, this.renderCallback, pathString, fill);
        this.renderChildViews(context, firstTime);
      }
      else {
        raphaelPath = this.get('raphaelObject');
        raphaelPath.attr({
          path: pathString,
          fill: fill,
          stroke: fill
        });
      }
    },

    /*
    *  Render the marker at this.xCoord, this.yCoord.
    */
    markPath: function() {
      if( this.get('markerStyle') == 'arrow') {
        return this.arrowMark();
      }
      if (this.get('markerStyle') == 'x') {
        return this.xMark();
      }
      // TODO: should we note that no marker was specified?
      return this.emptyPath();
    },

    /*
    *  Render an empty path for no marker.
    */
    emptyPath: function() {
      return "M 0 0";
    },

    /*
    *  Render an arrow -> mark at  this.xCoord, this.yCoord.
    */
    arrowMark: function() {
      var startx = this.get('anchorXCoord'),
        starty   = this.get('anchorYCoord'),
        endx     = this.get('xCoord'),
        endy     = this.get('yCoord'),
        len      = this.get('markerSize'),
        angle    = 20;
      if (SC.none(startx) || SC.none(starty) || SC.none(endx) || SC.none(endy) || SC.none(angle)) {
        return this.emptyPath();
      }
      return this.arrowPath(startx,starty,endx,endy,len,angle);
    },

    /*
    *  Render an "x" mark at  this.xCoord, this.yCoord.
    */
    xMark: function () {
      var elements = [],
          xCoord   = this.get('xCoord'),
          yCoord   = this.get('yCoord'),
          diameter = this.get('markerSize'),
          radius   = diameter / 2,
          x        = xCoord - radius,
          y        = yCoord + radius;

      if (SC.none(xCoord) || SC.none(yCoord)) return this.emptyPath();
      elements.push('M', x, y);
      elements.push('L', x + diameter, y - diameter);

      x = xCoord - radius;
      y = yCoord - radius;

      elements.push('M', x , y);
      elements.push('L', x + diameter, y + diameter);
      return elements.join(' ');
    }
  }),

  connectingLineView: RaphaelViews.RaphaelView.design({

    displayProperties: 'xCoord yCoord anchorXCoord anchorYCoord stroke startRadius'.w(),

    labelView: SC.outlet('parentView'),

    defaultStrokeWidth:       1,
    highlightedStrokeWidth:   2,
    
    defaultStrokeBinding:     '.labelView.stroke',
    highlightedStrokeBinding: '.labelView.highlightedStroke',
    isHighlightedBinding:     '.labelView.isBodyDragging',
    xCoordBinding:            '.labelView.xCoord',
    yCoordBinding:            '.labelView.yCoord',
    anchorXCoordBinding:      '.labelView.anchorXCoord',
    anchorYCoordBinding:      '.labelView.anchorYCoord',

    stroke: function () {
      return this.get('isHighlighted') ? this.get('highlightedStroke') : this.get('defaultStroke');
    }.property('isHighlighted', 'highlightedStroke', 'defaultStroke').cacheable(),

    strokeWidth: function () {
      return this.get('isHighlighted') ? this.get('highlightedStrokeWidth') : this.get('defaultStrokeWidth');
    }.property('isHighlighted', 'highlightedStrokeWidth', 'defaultStrokeWidth').cacheable(),


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

          // dist. between (xCoord, yCoord) and (anchorXCoord, anchorYCoord)
          length       = Math.sqrt( dx*dx + dy*dy ),
          startX,
          startY,
          pathString,
          raphaelPath,
          arrowP;

      if (SC.none(xCoord) || SC.none(yCoord) || SC.none(anchorXCoord) || SC.none(anchorYCoord)) {
        pathString = 'M 0 0';
      }
      else {
        startX     = xCoord;// + (startRadius / length) * dx;
        startY     = yCoord;// + (startRadius / length) * dy;
        pathString = ['M', startX, startY, 'L', anchorXCoord, anchorYCoord].join(' ');
      }

      if (firstTime) {
        context.callback(this, this.renderCallback, pathString, stroke, strokeWidth);
        this.renderChildViews(context, firstTime);
      }
      else {
        raphaelPath = this.get('raphaelObject');
        raphaelPath.attr({ path: pathString, stroke: stroke, 'stroke-width': strokeWidth });
      }
    }

  }),

  labelBodyView: RaphaelViews.RaphaelView.design({

    childViews: 'labelTextView removeButtonView'.w(),

    parentLabelView: SC.outlet('parentView'),

    displayProperties:   'bodyXCoord bodyYCoord width height stroke strokeWidth fill cornerRadius'.w(),

    textBinding:         '.parentLabelView.text',
    textColorBinding:    '.parentLabelView.textColor',

    bodyXCoordBinding:   '.parentLabelView.bodyXCoord',
    bodyYCoordBinding:   '.parentLabelView.bodyYCoord',
    xOffsetBinding:      '.parentLabelView.xOffset',
    yOffsetBinding:      '.parentLabelView.yOffset',

    textWidthBinding:    '.labelTextView.width',
    textHeightBinding:   '.labelTextView.height',

    fillBinding:         '.parentLabelView.fill',
    cornerRadiusBinding: '.parentLabelView.cornerRadius',

    defaultStrokeBinding:     '.parentLabelView.stroke',
    highlightedStrokeBinding: '.parentLabelView.highlightedStroke',
    defaultStrokeWidth:       1,
    highlightedStrokeWidth:   2,
    margin:                   20,
    isHighlightedBinding:     '.parentLabelView.isBodyDragging',

    width: function () {
      var textWidth = this.get('textWidth');
      if (textWidth) {
        return this.get('textWidth') + (this.get('margin') * 2);
      }
      return 100;
    }.property('textWidth').cacheable(),

    height: function () {
      var textHeight = this.get('textHeight');
      if (textHeight) {
        return this.get('textHeight') + (this.get('margin') * 2);
      }
      return 30;
    }.property('textHeight').cacheable(),

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
            x:              this.get('bodyXCoord')   || 0,
            y:              this.get('bodyYCoord')   || 0,
            width:          this.get('width')        || 0,
            height:         this.get('height')       || 0,
            r:              this.get('cornerRadius') || 0,
            stroke:         this.get('stroke'),
            'stroke-width': this.get('strokeWidth')  || 1,
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
      if (evt.toElement != this.labelTextView) {
        if (this.labelTextView.get('isEditing')) {
          this.labelTextView.commitEditing();
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
      return YES;
    },

    mouseUp: function(evt) {
      this.endDrag(evt);
      var now      = new Date().getTime(),// ms
          interval = 202,                 // ms
          maxTime  = 200;                 // ms

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
      return YES;
    },

    startDrag: function (evt) {
      this.setPath('parentLabelView.isBodyDragging', YES);

      this._isDragging = YES;
      this._dragX = evt.pageX;
      this._dragY = evt.pageY;

      // our layer doesn't respect SC.Cursor, so set the cursors manually
      this.$().css('cursor', 'move');
      return YES;
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
      this.setPath('parentLabelView.isBodyDragging', NO);
      this._isDragging = NO;

      this.$().css('cursor', 'default');
      return YES;
    },

    labelTextView: Smartgraphs.EditableLabelView.design({
      isEditable: YES,
      fontSize: 14
    }),

    removeButtonView: RaphaelViews.RaphaelView.design({

      displayProperties: 'bodyXCoord bodyYCoord width isHighlighted'.w(),

      labelBodyView: SC.outlet('parentView'),
      labelView:     SC.outlet('parentView.parentLabelView'),

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
