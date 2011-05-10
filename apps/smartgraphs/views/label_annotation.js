// ==========================================================================
// Project:   Smartgraphs.LabelAnnotationView
// Copyright: ©2011 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs RaphaelViews*/


/** @class

  (Document Your View Here)

  @extends SC.View
*/
Smartgraphs.LabelAnnotationView = RaphaelViews.RaphaelView.extend(
/** @scope Smartgraphs.LabelAnnotationView.prototype */ {
  
  init: function () {
    var labelTextView = this.get('labelTextViewDesign').create();
    
    sc_super();
    
    labelTextView.set('labelView', this);
    this.set('labelTextView', labelTextView);

    if (this.get('parentView')) this.parentViewDidChange();
  },
  
  textBinding: '*item.text',
  textColor: '#333333',
  
  textDidChange: function () {
    this.get('labelTextView').updateText();
  }.observes('text', 'textColor'),
  
  shouldMarkTargetPointBinding: '*item.shouldMarkTargetPoint',
  shouldMarkTargetPointBindingDefault: SC.Binding.oneWay(),
  
  stroke: '#000000',
  fill: '#ffffff',
  
  isBodyDragging: NO,
  
  xBinding: '*item.x',
  yBinding: '*item.y',
  
  xOffsetBinding: '*item.xOffset',
  yOffsetBinding: '*item.yOffset',
  
  xCoord: function () {
    return this.get('graphView').coordinatesForPoint(this.get('x'), 0).x;
  }.property('x'),
  
  yCoord: function () {
    return this.get('graphView').coordinatesForPoint(0, this.get('y')).y;
  }.property('y'),
  
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
    
    this.set('bodyXCoord', xCoord + xOffset);
    this.set('bodyYCoord', yCoord + yOffset - height);
    this.set('anchorXCoord', xCoord + xOffset + width / 2);
    this.set('anchorYCoord', yCoord + yOffset);

    this.get('labelTextView').updateLayout();
        
  }.observes('xCoord', 'yCoord', 'xOffset', 'yOffset', 'width', 'height'),

  childViews: 'focusPointView connectingLineView labelBodyView'.w(),
  
  /**
    This is not a childView of the labelView; it's not part of the RaphaelView hierarchy. Instead, it's a normal
    HTML view that gets added to or removed from the graphView, and moved around, as needed as the labelView is moved.
  */
  labelTextViewDesign: SC.LabelView.design({
    
    // set by labelView when it inits. We can't use 'parentView' to get the label view because our parentView is
    // actually the graphView 
    labelView: null,
    
    labelBodyView: SC.outlet('labelView.labelBodyView'),
    
    // implementing any bindings to labelView properties here cause jasmine tests to choke badly once more than a few are run...
    // (so we'll use these update methods and observers instead)
    
    init: function () {
      sc_super();
      this.set('cursor', SC.Cursor.create());
    },
    
    updateText: function () {
      this.set('value', this.getPath('labelView.text'));
    },
    
    // forward drag-related events to the labelBodyView
    mouseDown: function (evt) {
      this.get('labelBodyView').startDrag(evt);
      return YES;     // returning NO means we don't get notified of mouseUp
    },
    
    mouseDragged: function (evt) {
      this.get('labelBodyView').drag(evt);
    },
    
    mouseUp: function (evt) {
      this.get('labelBodyView').endDrag(evt);
      return NO;      // returning YES means we don't get notified of doubleClick
    },
    
    doubleClick: function () {
      return YES;
    },

    updateLayout: function () {
      var labelView = this.get('labelView');
      
      this.adjust('width',  labelView.get('width')      - 20);
      this.adjust('height', labelView.get('height')     - 10);
      this.adjust('top',    labelView.get('bodyYCoord') + 5);
      this.adjust('left',   labelView.get('bodyXCoord') + 10);

      // mysteries: why don't the layout changes cause this particular view to re-render? Why doesn't updateLayer()
      // do the trick?
      this.replaceLayer();
    }
  }),
  
  /**
    Add the labelTextView (which is not a Raphael view and not part of this view hierarchy) to our graphView if we
    were added to the graph view's view hierarchy
  */
  parentViewDidChange: function () {
    sc_super();
    var labelTextView = this.get('labelTextView');
    
    sc_super();
    
    if (this.get('parentView')) {
      this.get('graphView').appendChild(labelTextView);
    }
    else {
      this.get('graphView').removeChild(labelTextView);
    }
  },
  
  render: function () {
    sc_super();
    var self = this;
    this.invokeLast( function () {
      self.beginPropertyChanges();
      self.notifyPropertyChange('xCoord');
      self.notifyPropertyChange('yCoord');
      self.endPropertyChanges();
    });
  },
  
  focusPointView: RaphaelViews.RaphaelView.design({
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
    highlightedStroke: '#6699ff',
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
    
    // How far from the focusPointView's center to start drawing the connecting line
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
    
    labelView: SC.outlet('parentView'),
    labelTextView: SC.outlet('labelView.labelTextView'),
    
    displayProperties: 'bodyXCoord bodyYCoord width height stroke strokeWidth fill cornerRadius'.w(),
    
    bodyXCoordBinding: '.labelView.bodyXCoord',
    bodyYCoordBinding: '.labelView.bodyYCoord',
    xOffsetBinding: '.labelView.xOffset',
    yOffsetBinding: '.labelView.yOffset',
    widthBinding: '.labelView.width',
    heightBinding: '.labelView.height',

    defaultStrokeBinding: '.labelView.stroke',
    highlightedStroke: '#6699ff',
    defaultStrokeWidth: 1,
    highlightedStrokeWidth: 2,
    isHighlightedBinding: '.labelView.isBodyDragging',
    
    stroke: function () {
      return this.get('isHighlighted') ? this.get('highlightedStroke') : this.get('defaultStroke');
    }.property('isHighlighted', 'highlightedStroke', 'defaultStroke').cacheable(),
    
    strokeWidth: function () {
      return this.get('isHighlighted') ? this.get('highlightedStrokeWidth') : this.get('defaultStrokeWidth');
    }.property('isHighlighted', 'highlightedStrokeWidth', 'defaultStrokeWidth').cacheable(),
    
    fillBinding: '.parentView.fill',
    cornerRadiusBinding: '.parentView.cornerRadius',
    
    renderCallback: function (raphaelCanvas, attrs) {
      return raphaelCanvas.rect().attr(attrs);
    },
    
    render: function (context, firstTime) {      
      var width        = this.get('width') || 0,
          height       = this.get('height') || 0,
          bodyXCoord   = this.get('bodyXCoord') || 0,
          bodyYCoord   = this.get('bodyYCoord') || 0,
          cornerRadius = this.get('cornerRadius') || 0,
          stroke       = this.get('stroke'),
          strokeWidth  = this.get('strokeWidth'),
          fill         = this.get('fill'),       

          attrs = {
            x: bodyXCoord,
            y: bodyYCoord,
            width: width,
            height: height,
            stroke: stroke,
            'stroke-width': strokeWidth,
            fill: fill,
            'fill-opacity': 1.0,
            r: cornerRadius
          },

          raphaelRect;
      
      if (firstTime) {
        context.callback(this, this.renderCallback, attrs);
      }
      else {
        raphaelRect = this.get('raphaelObject');
        raphaelRect.attr(attrs);
      }
    },      
    
    // Dragging. Note that dragging is 'stateless' in the sense that you can always drag a label view. So we won't hook
    // into states or the controller layer. We also assume until proven otherwise that we can modify our own cursor
    // without consequence.
    
    mouseDown: function (evt) {
      this.startDrag(evt);
    },
    
    mouseUp: function (evt) {
      this.endDrag(evt);
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
      this.setPath('labelTextView.cursor.cursorStyle', 'move');     // get the labelTextView to show the same cursor
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
      this.setPath('labelTextView.cursor.cursorStyle', 'default'); 
    }
    
  })
  
});