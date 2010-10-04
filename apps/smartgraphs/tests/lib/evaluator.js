// ==========================================================================
// Project:   Smartgraphs - test of lib/evaluator
// Copyright: ©2010 Concord Consortium
// @author:   Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs RaphaelViews module test ok equals same stop start afterPropertyChange */

var evaluate = Smartgraphs.evaluate;
module("Smartgraphs JSON expression evaluator");

test("evaluate should interpret keyword 'value' correctly", function () {
  equals(evaluate('value', 'the-value'), 'the-value', "evaluate('value', 'the-value') should be 'the-value'");
});

test("evaluate should understand compound expressions with substituted 'value'", function () {
  // just some illustrative combinations of expressions
  var exp = { "length": {"strip": "value"} };

  equals( evaluate(exp, 'shorty   '), 6, "{ 'length': {'strip': 'value'} } where value is 'shorty   ' should be 6");  
  equals( evaluate(exp, ' a long string '), 13, "{ 'length': {'strip': 'value'} } where value is ' a long string ' should be 13");  
  equals( evaluate({'gt': [14, exp]}, ' a long string '), true, "'gt': [14, { 'length': {'strip': 'value'} }] where value is ' a long string ' should be true");
  equals( evaluate({'gt': [12, exp]}, ' a long string '), false, "'gt': [12, { 'length': {'strip': 'value'} }] where value is ' a long string ' should be false");
  
  equals( evaluate({'in': [exp, [-1, 13, 26]]}, ' a long string '), true, "'in': [{ 'length': {'strip': 'value'} }, [-1, 13, 26]] where value is ' a long string ' should be true");
  equals( evaluate({'in': [exp, [-1, 13, 26]]}, 'shorty   '), false, "'in': [{ 'length': {'strip': 'value'} }, [-1, 13, 26]] where value is 'shorty   ' should be false");  
});

test("evaluate should understand literals", function () {
  equals( evaluate(10, null), 10, "evaluate should understand numbers are literals");
  equals( evaluate('test-string', null), 'test-string', "evaluate should understand strings are literals");
  equals( evaluate(true, null), true, "evaluate should understand booleans are literals");
  same( evaluate(['a'], null), ['a'], "evaluate should understand arrays are literals");
  equals( evaluate(undefined, null), undefined, "evaluate should understand undefined is a literal.");
  equals( evaluate(null, null), null, "evaluate should understand null is a literal.");
  same( evaluate( { "literal": { "arbitrary": "object" } }, null), { "arbitrary": "object" }, "evaluate should understand objects escaped with 'literal' are literals");
});

test("evaluate should understand AND and OR", function () {
  equals( evaluate({"or": [true]}, null), true, "evaluate should evaluate consider or: true to be true");
  equals( evaluate({"or": [false]}, null), false, "evaluate should evaluate consider or: false to be false"); 
  equals( evaluate({"or": [true, true]}, null), true, "evaluate should evaluate consider or: [true, true] to be true"); 
  equals( evaluate({"or": [false, true]}, null), true, "evaluate should evaluate consider or: [false, true] to be true");   
  equals( evaluate({"or": [true, false]}, null), true, "evaluate should evaluate consider or: [true, false] to be true");
  
  equals( evaluate({"and": [true]}, null), true, "evaluate should evaluate consider and: true to be true");
  equals( evaluate({"and": [false]}, null), false, "evaluate should evaluate consider and: false to be false"); 
  equals( evaluate({"and": [true, true]}, null), true, "evaluate should evaluate consider and: [true, true] to be true"); 
  equals( evaluate({"and": [false, true]}, null), false, "evaluate should evaluate consider and: [false, true] to be false");   
  equals( evaluate({"and": [true, false]}, null), false, "evaluate should evaluate consider and: [true, false] to be false");
});

test("evaluate should understand 'equals'", function () {
  equals( evaluate({ "equals": ["test-value", "test-value"] }, null), true, "equals: ['test-value', test-value'] should be true");
  equals( evaluate({ "equals": ["test-value", "different-value"] }, null), false, "equals: ['test-value', different-value'] should be false");
});

test("evalaute should understand 'strip'", function () {
  equals( evaluate({ "strip": "   test-string "}, null), 'test-string', "strip: '   test-string ' should be 'test-string'");
  equals( evaluate({ "strip": null}, null), '', "strip: null should be ''");
});

test("evaluate should understand 'in'", function () {
  equals( evaluate({ "in": ['a', null]}, null), false, "in: ['a', null] should be false");
  equals( evaluate({ "in": ['a', []]}, null), false, "in: ['a', []] should be false");
  equals( evaluate({ "in": ['a', ['b']]}, null), false, "in: ['a', ['b']] should be false"); 
  equals( evaluate({ "in": ['a', ['a']]}, null), true, "in: ['a', ['a']] should be true");
  equals( evaluate({ "in": ['a', ['b', 'a']]}, null), true, "in: ['a', ['b', 'a']] should be true");
  equals( evaluate({ "in": ['a', ['b', 1, 'a']]}, null), true, "in: ['a', ['b', 1, 'a']] should be true");
  equals( evaluate({ "in": ['a', ['b', 1, 'c']]}, null), false, "in: ['a', ['b', 1, 'c']] should be false");  
});

test("evaluate should understand 'length'", function () {
  equals( evaluate({ "length": null }, null), 0, "length: null should be 0");
  equals( evaluate({ "length": [] }, null), 0, "length: [] should be 0");
  equals( evaluate({ "length": '' }, null), 0, "length: '' should be 0");
  equals( evaluate({ "length": 'abc' }, null), 3, "length: 'abc' should be 3");
  equals( evaluate({ "length": ['a', 'b', 'c'] }, null), 3, "length: ['a', 'b', 'c'] should be 3");
});

test("evaluate should understand 'gt'", function () {
  equals( evaluate({ "gt": [2,1] }, null), true, "gt: [2, 1] should be true");
  equals( evaluate({ "gt": [1,1] }, null), false, "gt: [1, 1] should be false");
  equals( evaluate({ "gt": [1,2] }, null), false, "gt: [1, 2] should be false");  
});

