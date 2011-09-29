(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  defineJasmineHelpers();
  $(function() {
    return $('body').css('overflow', 'auto');
  });
  describe("Data flow from UnorderedDataPoints record to GraphableObjects", function() {
    var udpRecord;
    udpRecord = null;
    beforeEach(function() {
      var store;
      store = SC.Store.create().from(SC.FixturesDataSource.create());
      udpRecord = store.createRecord(Smartgraphs.UnorderedDataPoints, {
        url: "udp-record",
        points: []
      });
      return __bind(function() {
        var matchArraysUsing;
        matchArraysUsing = function(matcher) {
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
          toEqualPairs: matchArraysUsing(function(a, _arg) {
            var x, y;
            x = _arg[0], y = _arg[1];
            return a[0] === x && a[1] === y;
          }),
          toEqualPointsDefinedBy: matchArraysUsing(function(a, _arg) {
            var x, y;
            x = _arg[0], y = _arg[1];
            return a.get('x') === x && a.get('y') === y;
          }),
          toBeTheSameObjectsAs: matchArraysUsing(function(a, b) {
            return a === b;
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
      describe("the line's points  array", function() {
        return it("should be empty", function() {
          return expect(line.get('points')).toBeEmpty();
        });
      });
      describe("the pointset's poitns array", function() {
        return it("should be empty", function() {
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
          it("should be the pairs [0,1] and [2,3]", function() {
            return expect(points).toEqualPairs([[0, 1], [2, 3]]);
          });
          it("should be strictly a copy of the objects in the UnorderedDataPoints record's points array", function() {
            return expect(points).not.toBeTheSameObjectsAs(udpRecord.get('points'));
          });
          return describe("after adding a point (4,5) to the UnorderedDataPoints record", function() {
            var pointsBeforeAdd;
            pointsBeforeAdd = null;
            beforeEach(function() {
              var p;
              pointsBeforeAdd = (function() {
                var _i, _len, _results;
                _results = [];
                for (_i = 0, _len = points.length; _i < _len; _i++) {
                  p = points[_i];
                  _results.push(p);
                }
                return _results;
              })();
              udpRecord.addPoint(4, 5);
              return points = line.get('points');
            });
            xdescribe("the first two pairs", function() {
              return it("should be exactly the same objects as before", function() {
                return expect(points.slice(0, 2)).toBeTheSameObjectsAs(pointsBeforeAdd);
              });
            });
            return describe("the new points array", function() {
              return it("should be the pairs [0,1], [2,3], and [4,5]", function() {
                return expect(points).toEqualPairs([[0, 1], [2, 3], [4, 5]]);
              });
            });
          });
        });
        return describe("the pointset's points array", function() {
          var points;
          points = null;
          beforeEach(function() {
            return points = pointset.get('points');
          });
          it("should be Smartgraph.Points for [0,1] and [2,3]", function() {
            return expect(points).toEqualPointsDefinedBy([[0, 1], [2, 3]]);
          });
          return describe("after adding a point (4,5) to the UnorderedDataPoints record", function() {
            var pointsBeforeAdd;
            pointsBeforeAdd = null;
            beforeEach(function() {
              var p;
              pointsBeforeAdd = (function() {
                var _i, _len, _results;
                _results = [];
                for (_i = 0, _len = points.length; _i < _len; _i++) {
                  p = points[_i];
                  _results.push(p);
                }
                return _results;
              })();
              udpRecord.addPoint(4, 5);
              return points = pointset.get('points');
            });
            xdescribe("the first two points", function() {
              return it("should be exactly the same objects as before", function() {
                return expect(points.slice(0, 2)).toBeTheSameObjectsAs(pointsBeforeAdd);
              });
            });
            return describe("the new points array", function() {
              return it("should be Smartgraph.Points for [0,1], [2,3], and [4,5]", function() {
                return expect(points).toEqualPointsDefinedBy([[0, 1], [2, 3], [4, 5]]);
              });
            });
          });
        });
      });
    });
  });
}).call(this);
