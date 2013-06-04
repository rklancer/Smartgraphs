// ==========================================================================
// Project:   Smartgraphs.AxisView
// Copyright: ©2011 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs RaphaelViews */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Smartgraphs.AxisView = RaphaelViews.RaphaelView.extend(
/** @scope Smartgraphs.AxisView.prototype */ {

  displayProperties: 'axis otherAxis graphView.graphCanvasView.frame'.w(),

  render: function (context, firstTime) {
    // unfortunately, Raphael can't draw text correctly when the svg element is hidden or offscreen (as it is when
    // rendering with firstTime =TRUE). Thus draw the axis only after the graph is onscreen by waiting until after
    // didCreateLayer. Note that this means the elements that make up the axis are not children of the layer...
    if (!firstTime) {
      this.drawAxis();
      this.drawLabel();
    }
  },

  didCreateLayer: function () {
    this._label = null;
    this.invokeLast(this.drawLabel);
    this.invokeLast(this.drawAxis);
  },

  drawAxis: function () {
    // the g.raphael axis this._axis has a lot of 'moving parts' so, unlike label, recreate the axis object every time
    // instead of updating it via .attr()

    if (this._axis) this._axis.remove();

    var axis            = this.get('axis'),
        min             = axis && axis.get('min'),
        max             = axis && axis.get('max'),
        nSteps          = axis && axis.get('nSteps'),
        otherAxis       = this.get('otherAxis'),
        graphView       = this.get('graphView'),
        graphCanvasView = graphView.get('graphCanvasView'),
        screenBounds    = graphCanvasView._getScreenBounds(),
        raphaelCanvas   = this.get('raphaelCanvas'),
        x,
        y;

    if (!axis) return;

    // for some reason can be display: none, which screws up label drawing
    if (raphaelCanvas.canvas.style.display !== 'block') raphaelCanvas.canvas.style.display = 'block';

    if (this.get('type') === 'y') {
      // if y=0 is within the graph bounds, draw the x axis at y = 0
      x = otherAxis.get('min') < 0 && 0 < otherAxis.get('max') ? graphView.coordinatesForPoint(0,0).x : screenBounds.xLeft;
      this._axis = raphaelCanvas.g.axis(x, screenBounds.yBottom, screenBounds.plotHeight, min, max, nSteps, 1);
    }
    else if (this.get('type') === 'x') {
      // if x=0 is within the graph bounds, draw the y axis at x = 0
      y = otherAxis.get('min') < 0 && 0 < otherAxis.get('max') ? graphView.coordinatesForPoint(0,0).y : screenBounds.yBottom;
      this._axis = raphaelCanvas.g.axis(screenBounds.xLeft, y, screenBounds.plotWidth, min, max, nSteps, 0);
    }

    this._axis.all[0].attr({stroke: '#aaa'});          // path
    this._axis.all[1].attr({fill: '#333'});            // text
  },

  drawLabel: function () {
    var graphView = this.get('graphView'),
        padding   = graphView.get('padding'),
        frame     = graphView.getPath('graphCanvasView.frame'),
        axis      = this.get('axis'),
        axisLabel = axis && axis.get('label'),
        unitName  = axis && axis.getPath('units.pluralName'),
        labelText = unitName ? "%@ (%@)".fmt(axisLabel, unitName) : axisLabel,
        raphaelCanvas,
        x,
        y,
        rotation;

    if (!axis) return;

    if (this.get('type') === 'x') {
      x = (padding.left + frame.width - padding.right) / 2;
      y = frame.height - padding.bottom + 25;
      rotation = 0;
    }
    else {
      x = padding.left - 30;
      y = (padding.top + frame.height - padding.bottom) / 2;
      rotation = 270;
    }

    if (this._label) {
      this._label.attr({text: labelText, x: x, y: y});
    }
    else {
      raphaelCanvas = this.get('raphaelCanvas');
      if (raphaelCanvas.canvas.style.display !== 'block') raphaelCanvas.canvas.style.display = 'block';
      this._label = raphaelCanvas.text(x, y, labelText).attr({font: "14px Arial, sans-serif", fill: '#333333'}).rotate(rotation);
    }
  }
});
