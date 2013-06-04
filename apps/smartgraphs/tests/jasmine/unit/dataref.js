(function() {

  defineJasmineHelpers();

  describe("Dataref, ", function() {
    beforeEach(function() {
      var _this = this;
      return (function() {
        var matchArraysUsing;
        matchArraysUsing = function(matcher) {
          return function(pairs) {
            var a, i, _i, _len, _ref, _ref1;
            if (((_ref = this.actual) != null ? _ref.length : void 0) !== pairs.length || typeof this.actual !== 'object') {
              return false;
            }
            _ref1 = this.actual;
            for (i = _i = 0, _len = _ref1.length; _i < _len; i = ++_i) {
              a = _ref1[i];
              if (!matcher(a, pairs[i])) {
                return false;
              }
            }
            return true;
          };
        };
        return _this.addMatchers({
          toEqualPairs: matchArraysUsing(function(a, _arg) {
            var x, y;
            x = _arg[0], y = _arg[1];
            return a[0] === x && a[1] === y;
          })
        });
      })();
    });
    describe("Smartgraphs.LinearEquation with slope-intercept expression form", function() {
      var linearEquation;
      linearEquation = Smartgraphs.LinearEquation.create();
      linearEquation.expressionForm = 'slope-intercept';
      linearEquation.graphBounds = {
        xMin: 0,
        yMin: 0,
        xMax: 2,
        yMax: 10
      };
      linearEquation.datadefName = 'datadef-1';
      describe("having slope of 2, yIntercept of 5 and xPrecision of 0.5", function() {
        beforeEach(function() {
          linearEquation.stepInterval = 0.5;
          linearEquation.params = {
            slope: 2,
            yIntercept: 5
          };
          linearEquation.points = [];
          spyOn(linearEquation, 'setDatadefPoints');
          return linearEquation.populatePoints();
        });
        return it("should generate proper dataset points", function() {
          var linePoints;
          linePoints = linearEquation.points;
          return expect(linePoints).toEqualPairs([[0, 5], [0.5, 6], [1, 7], [1.5, 8], [2, 9]]);
        });
      });
      return describe("having slope of 1 and yIntercept of 2 and xPrecision of 0.5", function() {
        beforeEach(function() {
          linearEquation.stepInterval = 0.5;
          linearEquation.params = {
            slope: 1,
            yIntercept: 2
          };
          linearEquation.points = [];
          spyOn(linearEquation, 'setDatadefPoints');
          return linearEquation.populatePoints();
        });
        return it("should generate proper dataset points", function() {
          var linePoints;
          linePoints = linearEquation.points;
          return expect(linePoints).toEqualPairs([[0, 2], [0.5, 2.5], [1, 3], [1.5, 3.5], [2, 4]]);
        });
      });
    });
    describe("Smartgraphs.Sinusoidal with sine-cosine expression form", function() {
      var sinusoidalEquation;
      sinusoidalEquation = Smartgraphs.SinusoidalEquation.create();
      sinusoidalEquation.expressionForm = 'sine-cosine';
      sinusoidalEquation.graphBounds = {
        xMin: 0,
        yMin: 0,
        xMax: 2,
        yMax: 10
      };
      sinusoidalEquation.datadefName = 'datadef-1';
      describe("having amplitude of 2, phase of 1 centerAmplitude of 2 and frequency of 1", function() {
        beforeEach(function() {
          sinusoidalEquation.stepInterval = 0.5;
          sinusoidalEquation.params = {
            amplitude: 2,
            phase: 1,
            centerAmplitude: 2,
            frequency: 1
          };
          sinusoidalEquation.angularFunction = 'sine';
          sinusoidalEquation.points = [];
          spyOn(sinusoidalEquation, 'setDatadefPoints');
          return sinusoidalEquation.populatePoints();
        });
        return it("should generate proper dataset points", function() {
          var linePoints;
          linePoints = sinusoidalEquation.points;
          return expect(linePoints).toEqualPairs([[0, 3.682941969615793], [0.5, 3.994989973208109], [1, 3.8185948536513634], [1.5, 3.196944288207913], [2, 2.2822400161197343]]);
        });
      });
      return describe("having amplitude of 1, phase of 1 centerAmplitude of 3 and frequency of 2", function() {
        beforeEach(function() {
          sinusoidalEquation.stepInterval = 0.5;
          sinusoidalEquation.params = {
            amplitude: 1,
            phase: 1,
            centerAmplitude: 3,
            frequency: 2
          };
          sinusoidalEquation.points = [];
          spyOn(sinusoidalEquation, 'setDatadefPoints');
          return sinusoidalEquation.populatePoints();
        });
        return it("should generate proper dataset points", function() {
          var linePoints;
          linePoints = sinusoidalEquation.points;
          return expect(linePoints).toEqualPairs([[0, 3.8414709848078967], [0.5, 3.909297426825682], [1, 3.1411200080598674], [1.5, 2.2431975046920716], [2, 2.0410757253368614]]);
        });
      });
    });
    return describe("Smartgraphs.CompositeEquation with y = log(x) + sin(x) expression", function() {
      var compositeEquation;
      compositeEquation = Smartgraphs.CompositeEquation.create();
      compositeEquation.graphBounds = {
        xMin: 0,
        yMin: 0,
        xMax: 2,
        yMax: 10
      };
      compositeEquation.datadefName = 'datadef-1';
      return describe("having xPrecision of 0.5", function() {
        beforeEach(function() {
          compositeEquation.expression = 'y = log(x) + sin(x)';
          compositeEquation.stepInterval = 0.5;
          compositeEquation.params = {};
          compositeEquation.points = [];
          spyOn(compositeEquation, 'setDatadefPoints');
          return compositeEquation.populatePoints();
        });
        return it("should generate proper dataset points", function() {
          var linePoints;
          linePoints = compositeEquation.points;
          return expect(linePoints).toEqualPairs([[0.5, -0.21372164195574228], [1, 0.8414709848078965], [1.5, 1.4029600947122187], [2, 1.6024446073856269], [2.5, 1.5147628759781115]]);
        });
      });
    });
  });

}).call(this);
