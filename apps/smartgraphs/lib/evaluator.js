// ==========================================================================
// Project:   Smartgraphs.evaluator
// Copyright: ©2011 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

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

  // define many expression operators, see lib/operators.js for usage
  defineOperators: function (defsCallback) {
    var def, self = this;

    def = function () {
      return self.def.apply(self, arguments);
    };
    defsCallback(def);
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
    this.deps = Array.prototype.slice.call(arguments, 0);
    return this;
  },

  evaluate: function (exp) {

    // if 'exp' is an array, it consists of an operator followed by its operands
    if ( (typeof exp === 'object') && exp !== null && exp.splice === [].splice ) {
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
