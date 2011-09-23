(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  defineJasmineHelpers();
  describe("Data flow from UnorderedDataPoints record to GraphableObjects", function() {
    var store, udpRecord;
    udpRecord = store = null;
    beforeEach(function() {
      console.log("making a new store and a new udpRecord");
      store = SC.Store.create().from(SC.FixturesDataSource.create());
      udpRecord = store.createRecord(Smartgraphs.UnorderedDataPoints, {
        url: "udp-record",
        points: []
      });
      return __bind(function() {
        var toMatchUsing;
        toMatchUsing = function(matcher) {
          return function(pairs) {
            var a, i, _len, _ref, _ref2;
            if (((_ref = this.actual) != null ? _ref.length : void 0) !== pairs.length || typeof this.actual !== 'object') {
              return false;
            }
            _ref2 = this.actual;
            for (i = 0, _len = _ref2.length; i < _len; i++) {
              a = _ref2[i];
              if (!matcher(a, pairs[i])) {
                return false;
              }
            }
            return true;
          };
        };
        return this.addMatchers({
          toEqualPairs: toMatchUsing(function(a, _arg) {
            var x, y;
            x = _arg[0], y = _arg[1];
            return a[0] === x && a[1] === y;
          }),
          toEqualPointsDefinedBy: toMatchUsing(function(a, _arg) {
            var x, y;
            x = _arg[0], y = _arg[1];
            return a.get('x') === x && a.get('y') === y;
          })
        });
      }, this)();
    });
    return describe("when the source UnorderedDataPoint's 'points' array is empty", function() {
      var dataRepresentation, line, pointset;
      dataRepresentation = line = pointset = null;
      beforeEach(function() {
        dataRepresentation = udpRecord.getNewRepresentation({
          "line-type": "connected"
        });
        line = dataRepresentation.get('line');
        return pointset = dataRepresentation.get('pointset');
      });
      it("should be a dataRepresentation", function() {
        return expect(dataRepresentation).toBeA(Smartgraphs.DataRepresentation);
      });
      describe("the line", function() {
        return it("should have no points", function() {
          return expect(line.get('points')).toBeEmpty();
        });
      });
      describe("the pointset", function() {
        return it("should have no points", function() {
          return expect(pointset.get('points')).toBeEmpty();
        });
      });
      return describe("and the source UnorderedDataPoints record's 'points' array is then populated with [0,1] and [2,3]", function() {
        var sourcePoints;
        sourcePoints = null;
        beforeEach(function() {
          sourcePoints = [[0, 1], [2, 3]];
          return udpRecord.set('points', sourcePoints);
        });
        describe("the line's points array", function() {
          var points;
          points = null;
          beforeEach(function() {
            return points = line.get('points');
          });
          it("should have the two pairs [0,1] and [2,3]", function() {
            expect(points).toContain([0, 1]);
            expect(points).toContain([2, 3]);
            return expect(points.length).toEqual(2);
          });
          return describe("a representative point", function() {
            var point;
            point = null;
            beforeEach(function() {
              return point = points[0];
            });
            return it("should not be the same object as any member of the source points array", function() {
              expect(point).not.toBe(sourcePoints[0]);
              return expect(point).not.toBe(sourcePoints[1]);
            });
          });
        });
        describe("the poinset's points array", function() {
          var points;
          points = null;
          beforeEach(function() {
            return points = pointset.get('points');
          });
          return it("should have the Smartgraph.Points [0,1] and [2,3]", function() {
            return expect(points).toEqualPointsDefinedBy([[0, 1], [2, 3]]);
          });
        });
        return describe("and a point (4,5) is added to the UnorderedDataPoints record's 'points' array via the addPoint method", function() {
          beforeEach(function() {
            console.log("adding point (4,5)");
            return udpRecord.addPoint(4, 5);
          });
          describe("the line's points array", function() {
            var points;
            points = null;
            beforeEach(function() {
              return points = line.get('points');
            });
            return it("should have exactly the three pairs [0,1], [2,3], and [4,5] (in that order)", function() {
              console.log("testing line's points array");
              return expect(points).toEqualPairs([[0, 1], [2, 3], [4, 5]]);
            });
          });
          return describe("the pointset's points array", function() {
            var points;
            points = null;
            beforeEach(function() {
              return points = pointset.get('points');
            });
            return it("should have exactly the Smartgraph.Points [0,1], [2,3], and [4,5] (in that order)", function() {
              console.log("testing pointset's points array");
              return expect(points).toEqualPointsDefinedBy([[0, 1], [2, 3], [4, 5]]);
            });
          });
        });
      });
    });
  });
}).call(this);
