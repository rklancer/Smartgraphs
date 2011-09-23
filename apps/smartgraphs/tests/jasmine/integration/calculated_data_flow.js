(function() {
  defineJasmineHelpers();
  describe("Data flow from UnorderedDataPoints record to GraphableObjects", function() {
    var store, udpRecord;
    udpRecord = store = null;
    beforeEach(function() {
      store = SC.Store.create().from(SC.FixturesDataSource.create());
      udpRecord = store.createRecord(Smartgraphs.UnorderedDataPoints, {
        url: "udp-record"
      });
      return this.addMatchers({
        toContainPair: function(p) {
          var a, _i, _len, _ref;
          _ref = this.actual;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            a = _ref[_i];
            return true;
          }
        },
        toEqualPairs: function(ps) {
          var a, i, p, _i, _len, _ref;
          if (!(this.actual != null) || ps.length !== this.actual.length) {
            return false;
          }
          i = 0;
          _ref = this.actual;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            a = _ref[_i];
            p = ps[i++];
            if (a[0] !== p[0] || a[1] !== p[1]) {
              return false;
            }
          }
          return true;
        }
      });
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
        sourcePoints = [[0, 1], [2, 3]];
        beforeEach(function() {
          return udpRecord.set('points', sourcePoints);
        });
        describe("the line's points array", function() {
          var points;
          points = null;
          beforeEach(function() {
            return points = line.get('points');
          });
          it("should have the two pairs [0,1] and [2,3] in its points array", function() {
            expect(points).toContain([0, 1]);
            expect(points).toContain([2, 3]);
            return expect(points.length).toEqual(2);
          });
          return describe("a representative point taken from the line's points array", function() {
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
        return describe("and a point (4,5) is added to the UnorderedDataPoints record's 'points' array via the addPoint method", function() {
          beforeEach(function() {
            return udpRecord.addPoint(4, 5);
          });
          return describe("the line's points array", function() {
            var points;
            points = null;
            beforeEach(function() {
              return points = line.get('points');
            });
            return it("should have the three pairs [0,1], [2,3], and [4,5] (in order)", function() {
              return expect(points).toEqualPairs([[0, 1], [2, 3], [4, 5]]);
            });
          });
        });
      });
    });
  });
}).call(this);
