// ==========================================================================
// Project:   Smartgraphs.StaticAnnotationsViews
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Smartgraphs.StaticAnnotationsView = SC.View.extend(
/** @scope Smartgraphs.StaticAnnotationsViews.prototype */ {


  // Quick and dirty implementation for now until we build out the annotations model a little better, and fix up 
  // the raphael object rendering to hook into the Sproutcore rendering and event system a little better.
  
  displayProperties: 'annotations.[] axes.xMin axes.xMax axes.yMin axes.yMax axes.padding'.w(),
  
  _raphaelObjects: [],
  
  didCreateLayer: function () {
    this.$().css('zIndex', '-1');
  },
 
  render: function (context, firstTime) {
    console.log('rendering StaticAnnotationsView');
    console.log(this.get('annotations'));
      
    var parent = this.get('parentView');
    var raphael = parent.get('raphaelObject');

    if (!raphael) {
      console.log('raphael undefined');
      return;
    }
    
    var axes = this.get('axes');
    var annotations = this.get('annotations');

    console.log('removing objects');
    this._raphaelObjects.forEach(function (raphaelObject) {
      console.log('removing object');
      raphaelObject.remove();
    });
    this._raphaelObjects = [];    
    
    if (!annotations || !axes || (axes.get('xMin') === undefined)) {
      console.log('axes or annotations undefined or empty');
      return;
    }
    
    var points = this.get('points');
    var layout = parent.get('layout');
    
    var height = layout.height;
    var width  = layout.width;
    var padding = axes.get('padding');

    var plotWidth = width - padding.left - padding.right;
    var plotHeight = height - padding.top - padding.bottom;          
    var xMax = axes.get('xMax');
    var yMax = axes.get('yMax');
    
    this._xScale = plotWidth / xMax;
    this._yScale = plotHeight / yMax;
    this._left = padding.left;
    this._top = padding.top;
    this._plotHeight = plotHeight;
    this._raphael = raphael;
       
    for (var i = 0, ii = annotations.get('length'); i < ii; i++) {
      this._renderAnnotation(annotations.objectAt(i));
    }
  },
  
  _renderAnnotation: function (annotation, raphael, axes) {
    
    console.log('rendering annotation');
    console.log(annotation);
    
    if (annotation.get('type') === 'segment') {
      this._renderSegment(annotation);
    }
    else if (annotation.get('type') === 'point') {
      this._renderPoint(annotation);
    }
    else if (annotation.get('type')  === 'line') {
      this._renderLine(annotation);
    }
    console.log("couldn't find type");
  },
  
  _renderSegment: function (annotation) {
    console.log('rendering segment');

    var points = annotation.get('points');

    var coords, point;
    var pathComponents = ['M'];
    for (var i = 0, ii = points.get('length'); i < ii; i++) {
      point = points.objectAt(i);
      coords = this._screenCoordinatesFor(point);
      pathComponents.push(coords.x);
      pathComponents.push(coords.y);
      pathComponents.push('L');
    }
    
    pathComponents.splice(pathComponents.length);      // get rid of trailing 'L'
    var pathString = pathComponents.join(' ');
    console.log(pathString);
    
    var path = this._raphael.path(pathString).attr({
      'stroke-width': 4,
      'fill-color': '#009754',
      'stroke-opacity': 0.5,
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    });
    
    this._raphaelObjects.push(path);
  },
  
  _renderPoint: function (annotation) {
    console.log('rendering point');
    
    var point = annotation.get('points').objectAt(0);
    
    if (!point) return;
    
    var coords = this._screenCoordinatesFor(point);
    
    var highlight = this._raphael.circle(coords.x, coords.y, 6).attr({
      fill: '#009754',
      opacity: 0.5
    });
    
    this._raphaelObjects.push(highlight);
  },
  
  
  _renderLine: function (annotation) {
    console.log('rendering line');
    var point = annotation.get('points').objectAt(0);
    
    if (!point) return;
    
    var coords = this._screenCoordinatesFor(point);
    
    var pathString = 'M ' + coords.x + ' ' + coords.y + ' L ' + this._left + ' ' + coords.y;
    var path = this._raphael.path(pathString).attr({
      'stroke-width': 2,
      'fill-color': '#009754',
      'stroke-opacity': 0.7
    });
    
    this._raphaelObjects.push(path);
  },

  _screenCoordinatesFor: function (point) {
    return {
      x: this._left + (point.get('x') * this._xScale),
      y: this._top + this._plotHeight - (point.get('y') * this._yScale)
    };
  }
});
