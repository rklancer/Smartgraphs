// ==========================================================================
// Project:   Smartgraphs operator definitions
// Copyright: ©2011 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('lib/evaluator');

Smartgraphs.evaluator.defineOperators( function (def) {
  
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


  def('indexInDataset', function (name) {
    var tag = Smartgraphs.activityObjectsController.findTag(name);
    if (!tag) throw "Tag " + name + " not found.";
    return tag.getPath('point.dataset.points').indexOf(tag.get('point'));
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
  
    if (axis !== 'x' && axis !== 'y') throw "x or y coordinates only!"
    if (!tag) throw "Tag " + tagName + " not found.";

    return tag.get('point').get(axis);
  }).args(2);


  def('slope', function (name1, name2) {
    var tag1 = Smartgraphs.activityObjectsController.findTag(name1);
    var tag2 = Smartgraphs.activityObjectsController.findTag(name2);
    var p1 = tag1.get('point');
    var p2 = tag2.get('point');
  
    return (p1.get('y') - p2.get('y')) / (p1.get('x') - p2.get('x'));
  }).args(2);


  def('withinAbsTolerance', function (val1, val2, tolerance) {
    return Math.abs(val1 - val2) < tolerance;
  }).args(3);


  def('slopeToolOrder', function (name1, name2) {
    var tag1 = Smartgraphs.activityObjectsController.findTag(name1);
    var tag2 = Smartgraphs.activityObjectsController.findTag(name2);
    var p1 = tag1.get('point');
    var p2 = tag2.get('point');
  
    // currently, "slope tool order" means points go from left to right
    return p1.get('x') < p2.get('x') ? [name1, name2] : [name2, name1];
  }).args(2);


  def('delta', function (axis, namePair) {
    var tag1 = Smartgraphs.activityObjectsController.findTag(namePair[0]);
    var tag2 = Smartgraphs.activityObjectsController.findTag(namePair[1]);
    var p1 = tag1.get('point');
    var p2 = tag2.get('point');
  
    return p2.get(axis) - p1.get(axis);
  }).args(2);


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
    var tag1 = Smartgraphs.activityObjectsController.findTag(name1);
    var tag2 = Smartgraphs.activityObjectsController.findTag(name2);
    var p1 = tag1.get('point');
    var p2 = tag2.get('point');
  
    return p1 && p1 === p2;
  }).args(2);


  // note this (textLengthIsAtLeast 1 (responseField 0)) is easier to describe in an expression-authoring interface 
  // than is (> 0 (strip (responseField 0)))

  def('textLengthIsAtLeast', function (minLength, text) {
    return (text || '').strip().length >= minLength;
  }).args(2);


  def('coord', function (axis, tagName) {
    var tag = Smartgraphs.activityObjectsController.findTag(tagName),
        point = tag.get('point');
    return point.get(axis);
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
