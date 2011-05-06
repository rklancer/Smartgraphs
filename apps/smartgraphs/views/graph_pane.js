// ==========================================================================
// Project:   Smartgraphs.GraphPane
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs RaphaelViews */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Smartgraphs.GraphPane = SC.View.extend(
/** @scope Smartgraphs.GraphPane.prototype */ {

  childViews: 'graphView animationViewCanvas controlsContainer'.w(),
  
  graphView: Smartgraphs.GraphView.design({
    graphControllerBinding: '.parentView.graphController'
  }),

  animationViewCanvas: RaphaelViews.RaphaelCanvasView.design({
    layout: { left: 0, width: 0 },
    padding: { top: 15, right: 15, bottom: 45, left: 15 },
    
    childViews: 'animationView'.w(),
    
    viewDidResize: function () {
      sc_super();
      this.replaceLayer();
    },

    animationView: RaphaelViews.RaphaelView.design({
    
      renderCallback: function (raphaelCanvas, xLeft, yTop, plotWidth, plotHeight) {
        var rect, times = 0;
      
        function loopAnimation() {
          if (times++ > 3) return;
          rect.attr({
            "clip-rect": [xLeft, yTop+plotHeight, plotWidth, 0].join(',')
          }).animate({
            "clip-rect": [xLeft, yTop, plotWidth, plotHeight].join(',')
          }, 3000, loopAnimation);
        }
      
        rect = raphaelCanvas.rect(xLeft, yTop, plotWidth, plotHeight).attr({
          fill: '#f7f8fa', stroke: '#f7f8fa', opacity: 1.0,
          "clip-rect": [xLeft, yTop+plotHeight, plotWidth, 0].join(',')
        }).animate({
          "clip-rect": [xLeft, yTop, plotWidth, plotHeight].join(',')
        }, 3000, loopAnimation);
      
        return rect;
      },
    
      render: function (context, firstTime) {
        var frame = this.getPath('parentView.frame');
        var padding = this.getPath('parentView.padding');
        if (frame.width === 0) return;

        var xLeft = frame.x + padding.left;
        var yTop = frame.y + padding.top;
        var plotWidth = frame.width - padding.left - padding.right;
        var plotHeight = frame.height - padding.top - padding.bottom;
      
        if (firstTime) {
          context.callback(this, this.renderCallback, xLeft, yTop, plotWidth, plotHeight);
        }
        else {       
          var rect = context.raphael();
          rect.attr({x: xLeft, y: yTop, width: plotWidth, height: plotHeight});
        }
      }
    })
  }),

  controlsContainer: SC.ContainerView.design({
    layout: { bottom: 0, height: 0 }
  }),
  
  showAnimationDidChange: function () {
    var showAnimation = this.get('showAnimation');
    var left = 0,
        width = 0;
    
    if (showAnimation) {
      left = 70;
      width = 70;
    }
    
    this.get('graphView').adjust('left', left);
    this.get('graphView').set('showAnimation', showAnimation);
    this.get('controlsContainer').adjust('left', left);
    this.get('animationViewCanvas').adjust('width', width);

  }.observes('showAnimation'),
  
  controlsNowShowingDidChange: function () {
    var nowShowing = this.get('controlsNowShowing');
    var bottom = 0,
        height = 0;
    
    if (nowShowing) {
      bottom = 35;
      height = 35;
    }
    
    this.get('graphView').adjust('bottom', bottom);
    this.get('animationViewCanvas').adjust('bottom', bottom);
    this.get('controlsContainer').adjust('height', height);
    this.setPath('controlsContainer.nowShowing', nowShowing);

  }.observes('controlsNowShowing')

});
