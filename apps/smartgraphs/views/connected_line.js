// ==========================================================================
// Project:   Smartgraphs.ConnectedLineView
// Copyright: ©2011 Concord Consortium
// Author:   Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs RaphaelViews */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Smartgraphs.ConnectedLineView = RaphaelViews.RaphaelView.extend(
/** @scope Smartgraphs.ConnectedLineView.prototype */ {

  isAnimatable: YES,

  strokeOpacity: 0.7,

  notDimmedColorBinding: '*item.color',
  dimmedColor: '#cccccc',

  notDimmedStrokeWidth: 3,
  dimmedStrokeWidth: 2,

  dataRepresentation: SC.outlet('item.dataRepresentation'),
  isDimmedBinding: '.dataRepresentation.isDimmed',
  isDimmedBindingDefault: SC.Binding.oneWay(),

  isHiddenForAnimation: NO,

  strokeWidth: function () {
    return this.get('isDimmed') ? this.get('dimmedStrokeWidth') : this.get('notDimmedStrokeWidth');
  }.property('isDimmed', 'dimmedStrokeWidth', 'notDimmedStrokeWidth'),

  color: function () {
    return this.get('isDimmed') ? this.get('dimmedColor') : this.get('notDimmedColor');
  }.property('isDimmed', 'dimmedColor', 'notDimmedColor'),

  displayProperties: 'item.points.[] color strokeWidth isHiddenForAnimation'.w(),

  renderCallback: function (raphaelCanvas, pathStr, attrs) {
    return raphaelCanvas.path(pathStr).attr(attrs);
  },

  render: function (context, firstTime) {
    var graphView = this.get('graphView'),
        xMin = graphView.get('xAxis').get('min'),
        xMax = graphView.get('xAxis').get('max'),
        yMin = graphView.get('yAxis').get('min'),
        yMax = graphView.get('yAxis').get('max'),
        line      = this.get('item'),
        points    = (line ? line.get('points') : null) || [{x: 0, y: 0}],
        str       = [],
        point,
        coords,
        i, len,
        pathStr,
        attrs,
        pathObj,
        clipMin,
        clipMax,
        clipRectStr;

    // TODO: points were x < min or x > max value of X axis have
    // been removed from the points array at this point? These must have been
    // stripped out earlier?

    // Create a clipping rectangle that contrains the drawing of the line
    clipMin = graphView.coordinatesForPoint(xMin, yMax);
    clipMax = graphView.coordinatesForPoint(xMax, yMin);
    clipRectStr = clipMin.x + ',' + clipMin.y + ',' + (clipMax.x - clipMin.x) + ',' + (clipMax.y - clipMin.y);

    for (i = 0, len = points.get('length'); i < len; i++) {
      point = points.objectAt(i);
      coords = graphView.coordinatesForPoint(point[0], point[1]) || {x: 0, y: 0};
      str.push(i === 0 ? 'M' : 'L');
      str.push(coords.x);
      str.push(' ');
      str.push(coords.y);
    }

    pathStr = str.join('') || 'M0 0';         // Raphael won't make path go away in IE if path string = ''
    attrs = {
      'clip-rect':      clipRectStr,
      'stroke':         this.get('color'),
      'stroke-width':   this.get('strokeWidth'),
      'stroke-opacity': this.get('isHiddenForAnimation') ? 0 : this.get('strokeOpacity')
    };

    if (firstTime) {
      context.callback(this, this.renderCallback, pathStr, attrs);
    }
    else {
      pathObj = context.raphael();
      pathObj.attr({d: pathStr}).attr(attrs);
    }
  }

});
