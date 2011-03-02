// ==========================================================================
// Project:   Smartgraphs.evaluator
// Copyright: ©2011 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs def */

Smartgraphs.evaluator = {
  
  operators: {},
  
  // define a single expression operator
  def: function (name, impl) {
    if (!this.operators[name]) this.operators[name] = {};       // allow redefinition
    var op = this.operators[name];
    
    if (!op.argSpec) op.argSpec = {};
    if (!op.deps) op.deps = [];
    
    op.impl = impl;
    
    op.args =      this._args;
    op.minArgs =   this._minArgs;
    op.maxArgs =   this._maxArgs;
    op.dependsOn = this._dependsOn;
    
    return op;
  },
  
  // define many expression operators, see below for usage
  defs: function (defsCallback) {
    var self = this,
        oldDef = window.def;
    
    window.def = function () {
      return self.def.apply(self, arguments);
    };    

    defsCallback();

    window.def = oldDef;
  },
  
  _args: function (nArgs) {
    this.argSpec.n = nArgs;
    return this;
  },
  
  _minArgs: function (minArgs) {
    this.argSpec.min = minArgs;
    return this;
  },

  _maxArgs: function (maxArgs) {
    this.argSpec.max = maxArgs;
    return this;
  },
  
  _dependsOn: function () {
    this.deps = Array.prototype.splice.apply(arguments);
    return this;
  },
  
  evaluate: function (exp) {

    // if 'exp' is an array, it consists of an operator followed by its operands
    if ( (typeof exp === 'object') && (exp.splice === [].splice) ) {
      if (exp.length < 1) throw "Evaluator was asked to evaluate an empty expression";
      
      if (exp[0] === "'" || exp[0] === 'quote') return exp[1];      // treat quote operator specially
 
      var op = this.operators[exp[0]];

      var nArgs = exp.length - 1;
      if (op.argSpec.n && nArgs !== op.argSpec.n) {
        throw "Evaluator expected " + op.argSpec.n + " arguments, but got " + nArgs + " arguments";
      }
      if (op.argSpec.min && nArgs < op.argSpec.min) {
        throw "Evaluator expected at least " + op.argSpec.min + " arguments, but got " + nArgs + " arguments";
      }
      if (op.argSpec.max && nArgs > op.argSpec.max) {
        throw "Evaluator expected at most " + op.argSpec.max + " arguments, but got " + nArgs + " arguments";
      }
      
      var operands = [];
      for (var i = 1; i < exp.length; i++) {
        operands[i-1] = this.evaluate(exp[i]);
      }
      
      return op.impl.apply(null, operands);
    }

    // if 'exp' is not an array, it's a literal
    return exp;
  },
  
  evaluateLive: function (exp, callback) {
    var tuples = [],
        tuple,
        deps,
        i,
        bracketIndex,
        evaluate;
    
    deps = this.collectDeps(exp);
    
    evaluate = function () {
      var val = Smartgraphs.evaluator.evaluate(exp);
      callback(val);
    };
    
    for (i = 0; i < deps.length; i++) {
      
      // tupleForPropertyPath doeesn't understand '.[]' property paths
      bracketIndex = deps[i].indexOf('.[]');
      
      if (bracketIndex > 0) {
        deps[i] = deps[i].substr(0, bracketIndex);

        if (deps[i].indexOf('*') < 0) {
          // no star observer, it's easy:
          tuple = [SC.objectForPropertyPath(deps[i]), '[]'];
        }
        else {
          tuple = SC.tupleForPropertyPath(deps[i]);
          tuple[1] = tuple[1] + '.[]';
        }
      }
      else {
        tuple = SC.tupleForPropertyPath(deps[i]);
      }
      tuple[0].addObserver(tuple[1], null, evaluate);      
      tuples.push(tuple);
    }
    
    return {
      die: function () {
        for (var i = 0; i < tuples.length; i++) {
          tuples[i][0].removeObserver(tuples[i][1], null, evaluate);
        }
      },
      
      evaluate: function () {
        evaluate();
        return this;
      }
    };
  },
  
  collectDeps: function (exp) {
    var ret;
    
    if ( (typeof exp === 'object') && (exp.splice === [].splice) ) {
      if (exp[0] === "'" || exp[0] === 'quote') return [];        // quote operator has no dependencies

      var op = this.operators[exp[0]];
      ret = op.deps.concat();
      for (var i = 1; i < exp.length; i++) {
        ret = ret.concat(this.collectDeps(exp[i]));
      }
      return ret;
    }
    return [];
  }
  
};


Smartgraphs.evaluator.defs( function () {  
  
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


  def('indexOf', function (name) {
    var annotation = Smartgraphs.activityObjectsController.findAnnotation(name);
    if (!annotation) throw "Annotation " + name + " not found.";
    return annotation.getPath('point.dataset.points').indexOf(annotation.get('point'));
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


  def('coord', function (axis, annotationName) {
    var annotation = Smartgraphs.activityObjectsController.findAnnotation(annotationName);
  
    if (axis !== 'x' && axis !== 'y') throw "x or y coordinates only!"
    if (!annotation) throw "Annotation " + annotationName + " not found.";
    if (!annotation.get('point')) throw "Annotation " + annotationName + " does not have a 'point' property";

    return annotation.get('point').get(axis);
  }).args(2);


  def('slope', function (name1, name2) {
    var anno1 = Smartgraphs.activityObjectsController.findAnnotation(name1);
    var anno2 = Smartgraphs.activityObjectsController.findAnnotation(name2);
    var p1 = anno1.get('point');
    var p2 = anno2.get('point');
  
    return (p1.get('y') - p2.get('y')) / (p1.get('x') - p2.get('x'));
  }).args(2);


  def('withinAbsTolerance', function (val1, val2, tolerance) {
    return Math.abs(val1 - val2) < tolerance;
  }).args(3);


  def('slopeToolOrder', function (name1, name2) {
    var anno1 = Smartgraphs.activityObjectsController.findAnnotation(name1);
    var anno2 = Smartgraphs.activityObjectsController.findAnnotation(name2);
    var p1 = anno1.get('point');
    var p2 = anno2.get('point');
  
    // currently, "slope tool order" means points go from left to right
    return p1.get('x') < p2.get('x') ? [name1, name2] : [name2, name1];
  }).args(2);


  def('delta', function (axis, namePair) {
    var anno1 = Smartgraphs.activityObjectsController.findAnnotation(namePair[0]);
    var anno2 = Smartgraphs.activityObjectsController.findAnnotation(namePair[1]);
    var p1 = anno1.get('point');
    var p2 = anno2.get('point');
  
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
    var anno1 = Smartgraphs.activityObjectsController.findAnnotation(name1);
    var anno2 = Smartgraphs.activityObjectsController.findAnnotation(name2);
    var p1 = anno1.get('point');
    var p2 = anno2.get('point');
  
    return p1 && p1 === p2;
  }).args(2);


  // note this (textLengthIsAtLeast 1 (responseField 0)) is easier to describe in an expression-authoring interface 
  // than is (> 0 (strip (responseField 0)))

  def('textLengthIsAtLeast', function (minLength, text) {
    return (text || '').strip().length >= minLength;
  }).args(2);


  def('coord', function (axis, annotationName) {
    var annotation = Smartgraphs.activityObjectsController.findAnnotation(annotationName),
        point = annotation.get('point');
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