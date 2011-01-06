// ==========================================================================
// Project:   Smartgraphs.evaluator
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

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
  
  function equals(terms, value) {
    return evaluate(terms[0], value) === evaluate(terms[1], value);
  }
  
  function strip(terms, value) {
    return (evaluate(terms, value) || '').strip();
  }
  
  function isIn(terms, value) {
    var item = evaluate(terms[0], value);
    var list = evaluate(terms[1], value) || [];
    
    for (var i = 0; i < list.length; i++) {
      if (item === list[i]) return true;
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
 
  function sortedXValues(dataset) {
    var xValues = [];
    var points = dataset.get('points');
    points.forEach( function (point) {
      xValues.push(point.get('x'));
    });
    return xValues.sort(function(a,b){return a - b});
  }
  
  function intValue(terms, value) {
    return parseInt(evaluate(terms, value), 10);
  }
  
  evaluate = function (exp, value) {
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
          case 'notempty':
            return notempty(terms, value);
          case 'xvalue':
            return xvalue(terms, value);
          case 'int': 
            return intValue(terms, value);
          case 'dataPointsAreAdjacent': 
            return dataPointsAreAdjacent(terms, value);
          case 'slope': 
            return slope(terms, value);
        }
        console.error('invalid expression operator: "' + op + '"');
        return;
      }
    }
  };
  
  Smartgraphs.evaluate = evaluate;

}());