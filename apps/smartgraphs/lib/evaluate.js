// ==========================================================================
// Project:   Smartgraphs.evaluate ("old" evaluator currently being replaced)
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('lib/evaluator');

// support serializing expressions built using a builder like http://www.smartclient.com/?skin=Enterprise#bigFilter

(function (undefined) {
  
  var evaluate;       // defined below; declared here to make jslint happy
  
  // var example = {
  //   "or": [{ "isIn": ["value", ["one", "two"]]}]
  // };
  
  function or(terms, value) {
    for (var i = 0; i < terms.length; i++) {
      if (evaluate(terms[i], value)) return true;
    }
    return false;
  }
  
  function and(terms, value) {
    for (var i = 0; i < terms.length; i++) {
      if (!evaluate(terms[i], value)) return false;
    }
    return true;
  }
  
  function gt(terms, value) {
    return (evaluate(terms[0], value) > evaluate(terms[1], value));
  }
  
  function lt(terms, value) {
    return (evaluate(terms[0], value) < evaluate(terms[1], value));
  }
  
  function between(terms, value) {
    var a = evaluate(terms[0], value);
    var b = evaluate(terms[1], value);
    var c = evaluate(terms[2], value);
  
    return (a <= b && b <= c);
  }
  
  function difference(terms, value) {
    var number1 = evaluate(terms[0], value);
    var number2 = evaluate(terms[1], value);
    return number1 - number2;
  }
  
  function sum(terms, value) {
    var number1 = evaluate(terms[0], value);
    var number2 = evaluate(terms[1], value);
    return number1 + number2;
  }
  
  function product(terms, value) {
    var number1 = evaluate(terms[0], value);
    var number2 = evaluate(terms[1], value);
    return number1 * number2;
  }
  
  function quotient(terms, value) {
    var number1 = evaluate(terms[0], value);
    var number2 = evaluate(terms[1], value);
    return number1 / number2;
  }
  
  function round(terms, value) {
    var number = evaluate(terms[0], value);
    var decimal = evaluate(terms[1], value);
    var result = Math.round(number * Math.pow(10, decimal)) / Math.pow(10, decimal);
    return result;
  }
  
  function equals(terms, value) {
    return evaluate(terms[0], value) === evaluate(terms[1], value);
  }
  
  function strip(terms, value) {
    return (evaluate(terms, value) || '').strip();
  }
  
  function variable(terms, value) {
    var variable = Smartgraphs.activityObjectsController.getVariable(terms);
    if (variable) {
      return variable.get("value");
    }
    return null;
  }
  
  function isIn(terms, value) {
    var item = evaluate(terms[0], value);
    var list = evaluate(terms[1], value) || [];
    
    for (var i = 0; i < list.length; i++) {
      var testValue = evaluate(list[i], value);
      if (item === testValue) return true;
    }
    return false;
  }
  
  function length(terms,value) {
    return (evaluate(terms, value) || []).length;
  }
  
  function notempty(terms, value) {
    var val = evaluate(terms, value);
    return (val === 0) || !!val;
  }
  
  function xvalue(terms, value) {
    var val = evaluate(terms, value);
    return val.get && val.get('x');
  }
  
  function delta(terms, value) {
    var annotations = value.annotations;
    var fieldValue = value.fieldValue;
    var axis = terms.axis;
    var respectOrder = terms.respectOrder;

    if (annotations && annotations.length == 2 && fieldValue && axis) {
      var dataPoint1 = annotations[0].get('point');
      var dataPoint2 = annotations[1].get('point');
      var delta = dataPoint2.get(axis) - dataPoint1.get(axis);
      if (!respectOrder) {
        delta = Math.abs(delta);
      }
      return delta == fieldValue;
    }

    return false;
  }
  
  function slope(terms, value) {
    var annotations = value.annotations;
    var fieldValue = value.fieldValue;

    if (annotations && annotations.length == 2 && fieldValue) {
      var dataPoint1 = annotations[0].get('point');
      var dataPoint2 = annotations[1].get('point');

      var dataset = dataPoint1.get('dataset');
      if (dataset !=  dataPoint2.get('dataset')) {
        // TODO: log error?
        return false;
      }
    
      var dx = dataPoint2.get('x') - dataPoint1.get('x');
      var dy = dataPoint2.get('y') - dataPoint1.get('y');
      var slope = dy/dx;
      return slope == fieldValue;
    }

    return false;
  }
  
  function sortedXValues(dataset) {
    var xValues = [];
    var points = dataset.get('points');
    points.forEach( function (point) {
      xValues.push(point.get('x'));
    });
    return xValues.sort( function(a,b) { return a - b; } );
  }
  
  function dataPointsAreAdjacent(terms, value) {
    if (value.length != 2) {
      // TODO: log error?
      return false;
    }
    var dataPoint1 = value[0].get('point');
    var dataPoint2 = value[1].get('point');

    var dataset = dataPoint1.get('dataset');
    if (dataset !=  dataPoint2.get('dataset')) {
      // TODO: log error?
      return false;
    }

    var xValues = sortedXValues(dataset);
    var index1 = xValues.indexOf(dataPoint1.get('x'));
    var index2 = xValues.indexOf(dataPoint2.get('x'));
    return Math.abs(index1 - index2) == 1;
  }
  
  function intValue(terms, value) {
    return parseInt(evaluate(terms, value), 10);
  }
  
  function floatValue(terms, value) {
    return parseFloat(evaluate(terms, value), 10);
  }
  
  function isNumeric(terms, value) {
    var num = evaluate(terms, value);
    return num.length > 0 && !isNaN(num);
  }
  
  evaluate = function (exp, value) {
    if (value === Smartgraphs.DummyInspector.token) {
      return Smartgraphs.evaluator.evaluate(exp);
    }
    
    if (exp === 'value') return value;
    
    if (exp === undefined || exp === null || typeof(exp) === 'string' || typeof(exp) === 'number' || typeof(exp) === 'boolean' || exp.splice === [].splice ) { 
      return exp;
    }

    for (var op in exp) {   // iterates only to the first 'own property', then returns
      if (exp.hasOwnProperty(op)) {
        var terms = exp[op];
        
        switch (op) {
          case 'literal':
            return terms;
          case 'variable':
            return variable(terms, value);
          case 'or': 
            return or(terms, value);
          case 'and': 
            return and(terms, value);
          case 'equals':
            return equals(terms, value);
          case 'strip':
            return strip(terms, value);
          case 'in':
            return isIn(terms, value);
          case 'length':
            return length(terms, value);
          case 'gt':
            return gt(terms, value);
          case 'lt':
            return lt(terms, value);
          case 'between':
            return between(terms, value);
          case 'round':
            return round(terms, value);
          case 'notempty':
            return notempty(terms, value);
          case 'xvalue':
            return xvalue(terms, value);
          case 'int': 
            return intValue(terms, value);
          case 'float': 
            return floatValue(terms, value);
          case 'dataPointsAreAdjacent': 
            return dataPointsAreAdjacent(terms, value);
          case 'slope': 
            return slope(terms, value);
          case 'delta': 
            return delta(terms, value);
          case 'difference': 
            return difference(terms, value);
          case 'sum': 
            return sum(terms, value);
          case 'product': 
            return product(terms, value);
          case 'quotient': 
            return quotient(terms, value);
          case 'isNumeric':
            return isNumeric(terms, value);
        }
        console.error('invalid expression operator: "' + op + '"');
        return;
      }
    }
  };
  
  Smartgraphs.evaluate = evaluate;

}());