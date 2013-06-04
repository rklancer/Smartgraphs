// ==========================================================================
// Project:   Smartgraphs.SegmentOverlayView
// Copyright: ©2011 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs RaphaelViews */

/** @class

  @extends SC.View
*/

Smartgraphs.SegmentOverlayView = RaphaelViews.RaphaelView.extend(
/** @scope Smartgraphs.SegmentOverlayView.prototype */
{

  canShowInTable: NO,

  points: null,
  datadefName: '',
  xMin: null,
  xMax: null,

  itemColorBinding: '.item.color',
  defaultColor: '#ffff00',

  color: function () {
    return this.get('itemColor') || this.get('defaultColor');
  }.property('itemColor', 'defaultColor'),

  strokeWidth: 14,
  strokeOpacity: 0.3,

  displayProperties: 'points.[] item.datadefName item.xMin item.xMax stroke strokeWidth strokeOpacity'.w(),

  renderCallback: function(raphaelCanvas, attrs) {
    return raphaelCanvas.path(attrs.path).attr(attrs);
  },

  render: function(context, firstTime) {
    var graphView      = this.get('graphView'),
        annotation     = this.get('item'),
        points         = this.get('points'),
        datadefName    = this.get('datadefName'),
        annotationDatadefName = annotation.get('datadefName'),
        xMin           = this.get('xMin'),
        xMax           = this.get('xMax'),
        annotationXMin = annotation.get('xMin'),
        annotationXMax = annotation.get('xMax'),
        pathComponents = [],
        pathString,
        datadef,
        dataRepresentation,
        path,
        coords,
        point,
        i,
        len;

    // if our points array is undefined, or defined by a different datadef, or a different range, set the points
    // array first
    if (!points || datadefName !== annotationDatadefName || xMin !== annotationXMin || xMax !== annotationXMax) {

      datadefName = annotationDatadefName;
      this.set('datadefName', datadefName);         // remember what datadef our points come from
      xMin = annotationXMin;
      this.set('xMin', xMin);                       // remember what range our points come from
      xMax = annotationXMax;
      this.set('xMax', xMax);

      // get a new points array
      datadef = Smartgraphs.activityObjectsController.findDatadef(datadefName);
      dataRepresentation = datadef.getNewRepresentation({xMin: xMin, xMax: xMax, 'point-type': 'none'});

      points = dataRepresentation.get('points');
      this.set('points', points);
    }

    for (i = 0, len = points.get('length'); i < len; i++) {
      pathComponents.push( i === 0 ? 'M' : 'L');
      point = points.objectAt(i);
      coords = graphView.coordinatesForPoint(point[0], point[1]);
      pathComponents.push(coords.x);
      pathComponents.push(coords.y);
    }
    pathString = pathComponents.join(' ');

    var attrs = {
      'path':             pathString,
      'stroke':           this.get('color'),
      'stroke-width':     this.get('strokeWidth'),
      'stroke-opacity':   this.get('strokeOpacity'),
      'stroke-linecap':  'round',
      'stroke-linejoin': 'round'
    };

    if (firstTime) {
      context.callback(this, this.renderCallback, attrs);
    }
    else {
      path = context.raphael();
      path.attr(attrs);
    }
  }

});
