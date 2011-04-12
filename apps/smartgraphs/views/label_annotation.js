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

  stroke: '#000000',
  fill: '#ffffff',
  
  xBinding: '*item.x',
  yBinding: '*item.y',
  
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
    var xCoord = this.get('xCoord'),
        yCoord = this.get('yCoord'),
        height = this.get('height'),
        width  = this.get('width');
        
    // need to calculate an offset more intelligently, but for now...
    
    this.set('bodyXCoord', xCoord);
    this.set('bodyYCoord', yCoord - 30 - height);
    this.set('anchorXCoord', xCoord + width / 2);
    this.set('anchorYCoord', yCoord - 30);

    this.get('labelTextView').updateLayout();
        
  }.observes('xCoord', 'yCoord', 'width', 'height'),

  childViews: 'focusPointView connectingLineView labelOutlineView'.w(),
  
  /**
    This is not a childView of the labelView; it's not part of the RaphaelView hierarchy. Instead, it's a normal
    HTML view that gets added to or removed from the graphView, and moved around, as needed as the labelView is moved.
  */
  labelTextViewDesign: SC.LabelView.design({
    
    // implementing any bindings to labelView properties here cause jasmine tests to choke badly once more than a few are run...
    // (so we'll use these update methods and observers instead)
    
    updateText: function () {
      this.set('value', this.getPath('labelView.text'));
    },

    updateLayout: function () {
      var labelView = this.get('labelView');
      
      this.adjust('width', labelView.get('width') - 20);
      this.adjust('height', labelView.get('height') - 10);
      this.adjust('top', labelView.get('bodyYCoord') + 5);
      this.adjust('left', labelView.get('bodyXCoord') + 10);

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

    xCoordBinding: '.parentView.xCoord',
    yCoordBinding: '.parentView.yCoord',
    strokeBinding: '.parentView.stroke',
    
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
    
    strokeBinding: '.parentView.stroke',
    xCoordBinding: '.parentView.xCoord',
    yCoordBinding: '.parentView.yCoord',
    anchorXCoordBinding: '.parentView.anchorXCoord',
    anchorYCoordBinding: '.parentView.anchorYCoord',
    
    // How far from the focusPointView's center to start drawing the connecting line
    startRadius: 9,
    
    renderCallback: function (raphaelCanvas, pathString, stroke) {
      return raphaelCanvas.path(pathString).attr({stroke: stroke});
    },
    
    render: function (context, firstTime) {
      var xCoord       = this.get('xCoord'),
          yCoord       = this.get('yCoord'),
          anchorXCoord = this.get('anchorXCoord'),
          anchorYCoord = this.get('anchorYCoord'),
          stroke       = this.get('stroke'),
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
        context.callback(this, this.renderCallback, pathString, stroke);
      }
      else {
        raphaelPath = this.get('raphaelObject');
        raphaelPath.attr({ path: pathString, stroke: stroke });
      }
    }
    
  }),
  
  labelOutlineView: RaphaelViews.RaphaelView.design({
    
    displayProperties: 'bodyXCoord bodyYCoord width height stroke fill cornerRadius'.w(),
    
    bodyXCoordBinding: '.parentView.bodyXCoord',
    bodyYCoordBinding: '.parentView.bodyYCoord',
    widthBinding: '.parentView.width',
    heightBinding: '.parentView.height',
    strokeBinding: '.parentView.stroke',
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
          fill         = this.get('fill'),       

          attrs = {
            x: bodyXCoord,
            y: bodyYCoord,
            width: width,
            height: height,
            stroke: stroke,
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
    }
  })
  
});