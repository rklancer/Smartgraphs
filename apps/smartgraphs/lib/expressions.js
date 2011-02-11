// ==========================================================================
// Project:   Smartgraphs.evaluator expressions
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
    
    op.impl = impl;
    op.args = this.args;
    return op;
  },
  
  args: function (argSpec) {
    this.argSpec = argSpec;
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
  return annotation.getPath('point.dataset.points').indexOf(annotation.get('point'));
}).args({n: 1});
