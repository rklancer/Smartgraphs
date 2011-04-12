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
  
  stroke: '#000000',
  
  xBinding: '*item.x',
  yBinding: '*item.y',
    
  xCoord: function () {
    return this.get('graphView').coordinatesForPoint(this.get('x'), 0).x;
  }.property('x'),
  
  yCoord: function () {
    return this.get('graphView').coordinatesForPoint(0, this.get('y')).y;
  }.property('y'),
  
  width: 100,
  height: 70,
  
  cornerRadius: 3,
  
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
    
  }.observes('xCoord', 'yCoord'),

  childViews: 'focusPointView connectingLineView labelBodyView'.w(),
  
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
  
  labelBodyView: RaphaelViews.RaphaelView.design({
    
    displayProperties: 'bodyXCoord bodyYCoord width height stroke cornerRadius'.w(),
    
    bodyXCoordBinding: '.parentView.bodyXCoord',
    bodyYCoordBinding: '.parentView.bodyYCoord',
    widthBinding: '.parentView.width',
    heightBinding: '.parentView.height',
    strokeBinding: '.parentView.stroke',
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

          attrs = {
            x: bodyXCoord,
            y: bodyYCoord,
            width: width,
            height: height,
            stroke: stroke,
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