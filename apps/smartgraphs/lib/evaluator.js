// ==========================================================================
// Project:   Smartgraphs.evaluator
// Copyright: ©2011 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

Smartgraphs.evaluator = {
  
  operators: {},
  
  // define an expression operator
  def: function (name, impl) {
    if (!this.operators[name]) this.operators[name] = {};       // allow redefinition
    var op = this.operators[name];
    
    if (!op.argSpec) op.argSpec = {};
    if (!op.deps) op.deps = [];
    
    op.impl = impl;
    op.args = this.args;
    op.dependsOn = this.dependsOn;
    return op;
  },
  
  args: function (argSpec) {
    this.argSpec = argSpec;
    return this;
  },
  
  dependsOn: function () {
    this.deps = Array.prototype.splice.apply(arguments);
    return this;
  },
  
  evaluate: function (exp) {

    // if 'exp' is an array, it consists of an operator followed by its operands
    if ( (typeof exp === 'object') && (exp.splice === [].splice) ) {
      if (exp.length < 1) throw "Evaluator was asked to evaluate an empty expression";
      
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
        evaluator;
    
    deps = this.collectDeps(exp);
    
    evaluator = function () {
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
      tuple[0].addObserver(tuple[1], null, evaluator);      
      tuples.push(tuple);
    }
    
    return {
      die: function () {
        for (var i = 0; i < tuples.length; i++) {
          tuples[i][0].removeObserver(tuples[i][1], null, evaluator);
        }
      },
      
      evaluate: function () {
        evaluator();
        return this;
      }
    };
  },
  
  collectDeps: function (exp) {
    var ret;
    
    if ( (typeof exp === 'object') && (exp.splice === [].splice) ) {
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


Smartgraphs.evaluator.def('+', function () {
  var ret = 0;
  for (var i = 0; i < arguments.length; i++) {
    ret += arguments[i];
  }
  return ret;
}).args({min: 2});


Smartgraphs.evaluator.def('-', function () {
  var ret = arguments[0];
  for (var i = 1; i < arguments.length; i++) {
    ret -= arguments[i];
  }
  return ret;
}).args({min: 2});


Smartgraphs.evaluator.def('absDiff', function (x, y) {
  return Math.abs(x - y); 
}).args({n: 2});


Smartgraphs.evaluator.def('=', function (x, y) {
  return x === y;
}).args({n: 2});


Smartgraphs.evaluator.def('indexOf', function (name) {
  var annotation = Smartgraphs.activityObjectsController.findAnnotation(name);
  if (!annotation) throw "Annotation " + name + " not found.";
  return annotation.getPath('point.dataset.points').indexOf(annotation.get('point'));
}).args({n: 1});


Smartgraphs.evaluator.def('isNumeric', function (val) {
  return !isNaN(parseFloat(val)) && isFinite(val);  
}).args({n: 1});


Smartgraphs.evaluator.def('responseField', function (index) {
  var values = Smartgraphs.responseTemplateController.get('values');
  return values[index];  
}).args({n: 1}).dependsOn('Smartgraphs.responseTemplateController*values.[]');


Smartgraphs.evaluator.def('coord', function (coordName, annotationName) {
  var annotation = Smartgraphs.activityObjectsController.findAnnotation(annotationName);
  
  if (!annotation) throw "Annotation " + annotationName + " not found.";
  if (!annotation.get('point')) throw "Annotation " + annotationName + " does not have a 'point' property";
  if (coordName !== 'x' && coordName !== 'y') throw "x or y coordinates only!"

  return annotation.get('point').get(coordName);
}).args({n: 2});


Smartgraphs.evaluator.def('slope', function (name1, name2) {
  var anno1 = Smartgraphs.activityObjectsController.findAnnotation(name1);
  var anno2 = Smartgraphs.activityObjectsController.findAnnotation(name2);
  var p1 = anno1.get('point');
  var p2 = anno2.get('point');
  
  return (p1.get('y') - p2.get('y')) / (p1.get('x') - p2.get('x'));
}).args({n: 2});


Smartgraphs.evaluator.def("withinAbsTolerance", function (val1, val2, tolerance) {
  return Math.abs(val1 - val2) < tolerance;
}).args({n: 3});
