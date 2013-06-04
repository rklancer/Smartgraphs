(function() {

  defineJasmineHelpers();

  describe("Smartgraphs.Point", function() {
    var point;
    point = Smartgraphs.Point.create({
      x: 3.2,
      y: 2
    });
    it("should be defined", function() {
      return expect(point).toBeDefined();
    });
    return it("should be able to return values with two decimal places", function() {
      expect(point.xFixed()).toEqual('3.20');
      return expect(point.yFixed()).toEqual('2.00');
    });
  });

}).call(this);
