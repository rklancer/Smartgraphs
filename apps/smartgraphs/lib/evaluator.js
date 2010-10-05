// ==========================================================================
// Project:   Smartgraphs.evaluator
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

(function (undefined) {
  
  var evaluate;       // defined below; defined here to make jslint happy
  
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
        }
        console.error('invalid expression operator: "' + op + '"');
        return;
      }
    }
  };
  
  Smartgraphs.evaluate = evaluate;

}());