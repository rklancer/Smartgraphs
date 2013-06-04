// ==========================================================================
// Project:   Smartgraphs operator definitions
// Copyright: ©2011 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('lib/evaluator');


Smartgraphs.evaluator.defineOperators( function (def) {

  // Returns true if the argument is a string that represents a valid, finite number (or is a valid, finite number)
  function isNumeric(val) {
    // see http://stackoverflow.com/questions/18082/validate-numbers-in-javascript-isnumeric/1830844#1830844
    return !isNaN(parseFloat(val)) && isFinite(val);
  }

  function checkNumeric() {
    for (var i = 0; i < arguments.length; i++) {
      if (typeof arguments[i] !== 'number' || isNaN(arguments[i])) {
        throw "Non-numeric argument!";
      }
    }
  }

  function veryClose(a, b, epsillon_digits) {
    var epsillon;
    if (epsillon_digits == null) epsillon_digits = 7.0;
    epsillon = 1.0 / Math.pow(10, epsillon_digits);
    return Math.abs(a - b) < epsillon;
  }

  def('+', function () {
    var ret = 0;
    for (var i = 0; i < arguments.length; i++) {
      ret += arguments[i];
    }
    return ret;
  }).minArgs(2);

  def('-', function () {
    var ret = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
      ret -= arguments[i];
    }
    return ret;
  }).minArgs(2);


  def('absDiff', function (x, y) {
    return Math.abs(x - y);
  }).args(2);


  def('=', function (x, y) {
    // don't coerce the arguments to be numbers if they're *both* strings
    if (isNumeric(x) && isNumeric(y) && !(typeof x === 'string' && typeof y === 'string') ) {
      return parseFloat(x, 10) === parseFloat(y, 10);
    }
    else {
      return x === y;
    }
  }).args(2);

  def('!=', function (x, y) {
    // as with =, don't coerce the arguments to be numbers if they're *both* strings
    if (isNumeric(x) && isNumeric(y) && !(typeof x === 'string' && typeof y === 'string') ) {
      return parseFloat(x, 10) !== parseFloat(y, 10);
    }
    return x !== y;
  }).args(2);

  def('>', function (x, y) {
    checkNumeric(x, y);
    return x > y;
  }).args(2);

  def('>=', function (x, y) {
    checkNumeric(x, y);
    return x >= y;
  }).args(2);

  def('<', function (x, y) {
    checkNumeric(x, y);
    return x < y;
  }).args(2);

  def('<=', function (x, y) {
    checkNumeric(x, y);
    return x <= y;
  }).args(2);

  def('indexInDataset', function (name) {
    var tag = Smartgraphs.activityObjectsController.findTag(name),
        datadef,
        points,
        x,
        y,
        i,
        len,
        point;

    if (!tag) throw "Tag " + name + " not found.";

    datadef = Smartgraphs.activityObjectsController.findDatadef(tag.get('datadefName'));

    if (!datadef) throw "Tag " + name + "'s datadef not found";

    points = datadef.get('points');

    if (!points) throw "Tag " + name + "'s datadef does not have a 'points' array.";

    points = points.map( function (pair) { return pair.copy(); } ).sort( function (pair1, pair2) { return pair1[0] - pair2[0]; } );

    x = tag.get('x');
    y = tag.get('y');

    for (i = 0, len = points.get('length'); i < len; i++) {
      point = points.objectAt(i);
      if (point[0] === x && point[1] === y) return i + 1;     // 1-based index
    }
    return -1;
  }).args(1);


  def('isNumeric', isNumeric).args(1);


  // get a response field using 1-based index of response fields
  def('responseField', function (index) {
    var values = Smartgraphs.responseTemplateController.get('values');
    return values[index - 1];
  }).args(1).dependsOn('Smartgraphs.responseTemplateController*values.[]');


  def('coord', function (axis, tagName) {
    var tag = Smartgraphs.activityObjectsController.findTag(tagName);

    if (axis !== 'x' && axis !== 'y') throw "x or y coordinates only!";
    if (!tag) throw "Tag " + tagName + " not found.";

    return tag.get(axis);
  }).args(2);


  def('slope', function (name1, name2) {
    var tag1 = Smartgraphs.activityObjectsController.findTag(name1),
        tag2 = Smartgraphs.activityObjectsController.findTag(name2),
        x1   = tag1.get('x'),
        y1   = tag1.get('y'),
        x2   = tag2.get('x'),
        y2   = tag2.get('y');

    return (y1 - y2) / (x1 - x2);
  }).args(2);


  def('withinAbsTolerance', function (val1, val2, tolerance) {
    return Math.abs(val1 - val2) < tolerance;
  }).args(3);


  def('slopeToolOrder', function (name1, name2) {
    var tag1 = Smartgraphs.activityObjectsController.findTag(name1),
        tag2 = Smartgraphs.activityObjectsController.findTag(name2),
        x1   = tag1.get('x'),
        x2   = tag2.get('x');

    // currently, "slope tool order" means points go from left to right
    return x1 < x2 ? [name1, name2] : [name2, name1];
  }).args(2);


  def('delta', function (axis, namePair) {
    var tag1 = Smartgraphs.activityObjectsController.findTag(namePair[0]),
        tag2 = Smartgraphs.activityObjectsController.findTag(namePair[1]);

    return tag2.get(axis) - tag1.get(axis);
  }).args(2);


  def('and', function () {
    for (var i = 0; i < arguments.length; i++) {
      if (!arguments[i]) return false;
    }
    return true;
  }).minArgs(1);


  def('or', function () {
    for (var i = 0; i < arguments.length; i++) {
      if (arguments[i]) return true;
    }
    return false;
  }).minArgs(1);


  def('not', function (val) {
    return !val;
  }).args(1);


  def('samePoint', function (name1, name2) {
    var tag1 = Smartgraphs.activityObjectsController.findTag(name1),
        tag2 = Smartgraphs.activityObjectsController.findTag(name2);

    return tag1 && tag2 && tag1.get('x') === tag2.get('x') && tag1.get('y') === tag2.get('y');
  }).args(2);


  def('coordinates=', function (name, x, y) {
    var tag = Smartgraphs.activityObjectsController.findTag(name);

    return tag && veryClose(tag.get('x'),x) && veryClose(tag.get('y'),y);
  }).args(3);

  def('coordinatesInRange', function (name, xMin, yMin, xMax, yMax) {
    var tag = Smartgraphs.activityObjectsController.findTag(name);

    var match = true;
    if (!tag) {
      match = false;
    }

    if (match && !!xMin) {
      match = tag.get('x') >= xMin;
    }

    if (match && !!yMin) {
      match = tag.get('y') >= yMin;
    }

    if (match && !!xMax) {
      match = tag.get('x') <= xMax;
    }

    if (match && !!yMax) {
      match = tag.get('y') <= yMax;
    }

    return match;
  }).args(5);


  def('pointInSegment', function (pointTagName, overlaySegmentName) {
    var tag     = Smartgraphs.activityObjectsController.findTag(pointTagName),
        segment = Smartgraphs.activityObjectsController.findAnnotation(overlaySegmentName),
        tagX    = tag && tag.get('x'),
        x1      = segment && segment.get('x1'),
        x2      = segment && segment.get('x2'),
        tmp;

    if (typeof tag === 'undefined'     || tag === null) return false;
    if (typeof segment === 'undefined' || segment === null) return false;

    if (x2 < x1) {
      tmp = x1;
      x1 = x2;
      x2 = tmp;
    }

    return x1 <= tagX && tagX <= x2;
  }).args(2);


  // note this (textLengthIsAtLeast 1 (responseField 0)) is easier to describe in an expression-authoring interface
  // than is (> 0 (strip (responseField 0)))

  def('textLengthIsAtLeast', function (minLength, text) {
    return (text || '').strip().length >= minLength;
  }).args(2);


  def('coord', function (axis, tagName) {
    var tag = Smartgraphs.activityObjectsController.findTag(tagName);
    return tag.get(axis);
  }).args(2);


  def('max', function () {
    return Math.max.apply(Math, arguments);
  }).minArgs(1);


  def('min', function () {
    return Math.min.apply(Math, arguments);
  }).minArgs(1);


  def('abs', function (val) {
    return Math.abs(val);
  }).args(1);


  // note that quantities should carry units with them, not require unit pluralization to be written into a variable
  // by the author!
  def('pluralizeUnits', function (unitId, quantity) {
    var units = Smartgraphs.store.find(Smartgraphs.Unit, unitId);
    if (!units) throw "Couldn't find units '%@'".fmt(unitId);
    return units.pluralizeFor(quantity);
  }).args(2);


  // dereference a single variable. May want to implement this in the evaluator itself, but first we need to demonstrate
  // a clear need to do so, and consistent rules;  we are NOT trying to implement Scheme in javascript
  def('get', function (name) {
    return Smartgraphs.activityPageController.getFromContext(name);
  }).args(1);

  def('annotation', function (name) {
    return Smartgraphs.activityObjectsController.findAnnotation(name);
  }).args(1);


  def('numberOfLabels', function (name) {
    var labelSet = Smartgraphs.activityObjectsController.findAnnotation(name);

    if (!SC.kindOf(labelSet, Smartgraphs.LabelSet)) throw "operator 'numberOfLabels' was not passed the name of a LabelSet";

    return labelSet.getPath('labels.length');
  }).args(1).dependsOn('Smartgraphs.activityStepController*submissibilitySubject.labels.length');


  def('/', function (x, y) {
    return x / y;
  }).args(2);


  def('listItem', function (index, list) {
    return list[index-1];
  }).args(2);

  // given a number 'numeric', return a String representation
  // with 'decimal_places' fractional digits.
  def('toFixedString', function (numeric, decimal_places) {
    return numeric.toFixed(decimal_places); // String value!
  }).args(2);


  // Returns length of the FreehandSketch's projection onto the x-axis. Returns -Infinity if there are fewer than 2
  // points in the sketch.
  def("sketchLength", function (name, length) {
    var sketch = Smartgraphs.activityObjectsController.findAnnotation(name),
        points,
        xs,
        min,
        max;

    if (!SC.kindOf(sketch, Smartgraphs.FreehandSketch)) throw "operator 'sketchLengthIsAtLeast' was not passed the name of a FreehandSketch";

    points = sketch.get('points') || [];
    if (points.get('length') < 2) return -Infinity;

    xs = points.map( function (pair) { return pair[0]; } );

    min = Math.min.apply(null, xs);
    max = Math.max.apply(null, xs);

    return max - min;
  }).args(1).dependsOn('Smartgraphs.activityStepController*submissibilitySubject.points.[]');


  def("playCount", function () {
    return Smartgraphs.animationTool.get('playCount');
  }).args(0).dependsOn('Smartgraphs.animationTool.playCount');
  
  def('lineCount', function () {
    return Smartgraphs.graphingTool.get('lineCount');
  }).dependsOn('Smartgraphs.graphingTool.lineCount');

  def('lineSlope', function (annotaionName, lineNumber) {
    var annotation = Smartgraphs.activityObjectsController.findAnnotation(annotaionName);
    var annotationPoints = annotation.get('points');
    var point1 = annotationPoints[lineNumber - 1];
    var point2 = annotationPoints[lineNumber];
    var m = (point2[1] - point1[1]) / (point2[0] - point1[0]);
    return m;
  }).args(2);

  def('yIntercept', function (annotationName, lineNumber) {
    var annotation = Smartgraphs.activityObjectsController.findAnnotation(annotationName);
    var annotationPoints = annotation.get('points');
    var point1 = annotationPoints[lineNumber - 1];
    var point2 = annotationPoints[lineNumber];
    var m = (point2[1] - point1[1]) / (point2[0] - point1[0]);
    var b = point1[1] - (m * point1[0]);
    return b;
  }).args(2);

  def('deviationValue', function (datadefName) {
    var datadef = Smartgraphs.activityObjectsController.findDatadef(datadefName);
    var deviationValue = datadef.get('deviationValue');
    return deviationValue;
  }).args(1);
  
  def('pointMoved', function (datadefName, pointNumber) {
    var graphingTool = Smartgraphs.graphingTool;
    if (graphingTool.get('pointMoved'))
    {
      var pointMovedNumber = graphingTool.get('pointMovedNumber');
      var toolDatadefName = graphingTool.get('datadefName');
      if (pointMovedNumber === (pointNumber - 1) && toolDatadefName === datadefName) {
        return true;
      }
    }
    return false;
  }).dependsOn('Smartgraphs.graphingTool.pointMoved');
});
