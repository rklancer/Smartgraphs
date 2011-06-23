// ==========================================================================
// Project:   Smartgraphs operator definitions
// Copyright: ©2011 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('lib/evaluator');


Smartgraphs.evaluator.defineOperators( function (def) {
  
  function checkNumeric() {
    for (var i = 0; i < arguments.length; i++) {
      if (typeof arguments[i] !== 'number' || isNaN(arguments[i])) {
        throw "Non-numeric argument!";
      }
    }
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
    return x === y;
  }).args(2);
  
  def('!=', function (x, y) {
    return x != y;
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


  def('isNumeric', function (val) {
    // see http://stackoverflow.com/questions/18082/validate-numbers-in-javascript-isnumeric/1830844#1830844
    return !isNaN(parseFloat(val)) && isFinite(val);  
  }).args(1);
  
  
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


  def('/', function (x, y) {
    return x / y;
  }).args(2);


  def('listItem', function (index, list) {
    return list[index-1];
  }).args(2);

});
