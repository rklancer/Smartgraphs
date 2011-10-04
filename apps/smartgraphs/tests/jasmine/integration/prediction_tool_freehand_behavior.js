(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  defineJasmineHelpers();
  $(function() {
    return $('body').css('overflow', 'auto');
  });
  describe("Smartgraphs.predictionTool with 'freehand' uiBehavior option", function() {
    var controller, sketch, statechart, store, toolState;
    store = controller = statechart = toolState = sketch = null;
    beforeEach(function() {
      store = SC.Store.create().from(SC.FixturesDataSource.create());
      controller = Smartgraphs.GraphController.create();
      controller.clear();
      statechart = controller.get('statechart');
      toolState = statechart.getState("PREDICTION_TOOL");
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
          toShowDisabledResetButtonOnly: function() {
            var badProperties, goodProperties, p, _i, _j, _len, _len2;
            badProperties = ['startControlIsVisible', 'stopControlIsVisible', 'clearControlIsEnabled', 'clearControlIsDefault'];
            goodProperties = ['clearControlIsVisible'];
            for (_i = 0, _len = badProperties.length; _i < _len; _i++) {
              p = badProperties[_i];
              if (this.actual.get(p) === true) {
                return false;
              }
            }
            for (_j = 0, _len2 = goodProperties.length; _j < _len2; _j++) {
              p = goodProperties[_j];
              if (this.actual.get(p) === false) {
                return false;
              }
            }
            return true;
          },
          toShowHighlightedResetButtonOnly: function() {
            var badProperties, goodProperties, p, _i, _j, _len, _len2;
            badProperties = ['startControlIsVisible', 'stopControlIsVisible'];
            goodProperties = ['clearControlIsVisible', 'clearControlIsEnabled', 'clearControlIsDefault'];
            for (_i = 0, _len = badProperties.length; _i < _len; _i++) {
              p = badProperties[_i];
              if (this.actual.get(p) === true) {
                return false;
              }
            }
            for (_j = 0, _len2 = goodProperties.length; _j < _len2; _j++) {
              p = goodProperties[_j];
              if (this.actual.get(p) === false) {
                return false;
              }
            }
            return true;
          }
        });
      }, this)();
    });
    describe("PREDICTION_TOOL state", function() {
      return it("should exist", function() {
        return expect(toolState).toBeDefined();
      });
    });
    return describe("when the prediction tool is started with uiBehavior: 'freehand'", function() {
      var startState;
      sketch = startState = null;
      beforeEach(function() {
        sketch = store.createRecord(Smartgraphs.FreehandSketch, {
          url: 'sketch',
          points: [[1, 2]]
        });
        spyOn(Smartgraphs.predictionTool, 'getAnnotation').andReturn(sketch);
        controller.predictionToolStartTool({
          annotationName: 'sketch',
          uiBehavior: 'freehand'
        });
        return startState = toolState.getPath('ON.FREEHAND.START');
      });
      describe("the graph controller's statechart", function() {
        return it("should be in the relevant start state", function() {
          return expect(startState.get('isCurrentState')).toBe(true);
        });
      });
      describe("the sketch", function() {
        it("should be in the graph controller's list of annotations", function() {
          return expect(controller.get('annotationList')).toContain(sketch);
        });
        return it("should have been cleared (have no points)", function() {
          return expect(sketch.get('points')).toBeEmpty();
        });
      });
      describe("the buttons requested by the controller", function() {
        return it("should include only the (dimmed) reset button", function() {
          return expect(controller).toShowDisabledResetButtonOnly();
        });
      });
      describe("the cursor style requested by the controller", function() {
        return it("should be 'crosshair'", function() {
          return expect(controller.get('requestedCursorStyle')).toEqual('crosshair');
        });
      });
      return describe("when the controller's inputAreaMouseDown method is called with (0,1)", function() {
        beforeEach(function() {
          return controller.inputAreaMouseDown(0, 1);
        });
        describe("the sketch", function() {
          return it("should have points [ [0,1] ]", function() {
            return expect(sketch.get('points')).toEqualPairs([[0, 1]]);
          });
        });
        describe("the buttons requested by the controller", function() {
          return it("should include only the (dimmed) reset button", function() {
            return expect(controller).toShowDisabledResetButtonOnly();
          });
        });
        describe("the cursor style requested by the controller", function() {
          return it("should be 'crosshair'", function() {
            return expect(controller.get('requestedCursorStyle')).toEqual('crosshair');
          });
        });
        return describe("and the controller's inputAreaMouseDragged method is called with (1,2)", function() {
          beforeEach(function() {
            return controller.inputAreaMouseDragged(1, 2);
          });
          describe("the sketch", function() {
            return it("should have points [ [0,1], [1,2]]", function() {
              return expect(sketch.get('points')).toEqualPairs([[0, 1], [1, 2]]);
            });
          });
          describe("the buttons requested by the controller", function() {
            return it("should include only the (dimmed) reset button", function() {
              return expect(controller).toShowDisabledResetButtonOnly();
            });
          });
          describe("the cursor style requested by the controller", function() {
            return it("should be 'crosshair'", function() {
              return expect(controller.get('requestedCursorStyle')).toEqual('crosshair');
            });
          });
          return describe("and the controller's inputAreaMouseUp method is called with (2,3)", function() {
            beforeEach(function() {
              return controller.inputAreaMouseUp(2, 3);
            });
            describe("the sketch", function() {
              return it("should have points [ [0,1], [1,2], [2,3] ]", function() {
                return expect(sketch.get('points')).toEqualPairs([[0, 1], [1, 2], [2, 3]]);
              });
            });
            describe("the buttons requested by the controller", function() {
              return it("should include only the (now-highlighted) reset button", function() {
                return expect(controller).toShowHighlightedResetButtonOnly();
              });
            });
            describe("the cursor style requested by the controller", function() {
              return it("should be 'default'", function() {
                return expect(controller.get('requestedCursorStyle')).toEqual('default');
              });
            });
            return describe("and the clearControlWasClicked action is sent to the controller's statechart", function() {
              beforeEach(function() {
                spyOn(Smartgraphs.statechart, 'sendAction');
                return statechart.sendAction('clearControlWasClicked');
              });
              describe("the sketch", function() {
                return it("should have no points", function() {
                  return expect(sketch.get('points')).toBeEmpty();
                });
              });
              describe("the graph controller's statechart", function() {
                return it("should be in the freehand-behavior start state again", function() {
                  return expect(startState.get('isCurrentState')).toBe(true);
                });
              });
              describe("the buttons requested by the controller", function() {
                return it("should include only the (dimmed) reset button", function() {
                  return expect(controller).toShowDisabledResetButtonOnly();
                });
              });
              return describe("the cursor style requested by the controller", function() {
                return it("should be 'crosshair'", function() {
                  return expect(controller.get('requestedCursorStyle')).toEqual('crosshair');
                });
              });
            });
          });
        });
      });
    });
  });
}).call(this);
