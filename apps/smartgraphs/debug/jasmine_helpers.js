/*globals jasmine describe it expect xit xdescribe beforeEach afterEach spyOn runs waits waitsFor clickOn fillIn */

function defineJasmineHelpers() {

  jasmine.Matchers.prototype.toBeA = function (scType) {  
    return SC.kindOf(this.actual, scType);
  };
  
  jasmine.Matchers.prototype.toContainA = function (scType) {
    var contains = function (array, scType) {
      if (!array) return false;
      var el = array.shift();
      return SC.kindOf(el, scType) || contains(array, scType);
    };
    return contains(this.actual, scType);
  };
  
  window.runBeforeEach = function (fn) {
    beforeEach( function () { SC.run(fn); });
  };

  window.runAfterEach = function (fn) {
    afterEach( function () { SC.run(fn); });
  };
  
}
