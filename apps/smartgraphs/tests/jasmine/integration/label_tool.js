/*globals Smartgraphs RaphaelViews describe it expect xit xdescribe beforeEach afterEach spyOn runs waits waitsFor
 clickOn fillIn defineJasmineHelpers runBeforeEach runAfterEach */

defineJasmineHelpers();

$(function () {
  $('body').css('overflow', 'auto');
});

describe("label tool plugin to graph controller", function () {

  var store,
      controller,
      statechart,
      labelToolState,
      graphView,
      topAnnotationsHolder;

  beforeEach( function () {
    controller = Smartgraphs.GraphController.create();
    controller.clear();
    statechart = controller.get('statechart');
    labelToolState = statechart.getState('LABEL_TOOL');
    topAnnotationsHolder = { getLabelInEditMode: function () { return null }};
    graphView = {getPath: function (property) { return property === 'topAnnotationsHolder' ? topAnnotationsHolder : null }};
  });

  describe("the controller's statechart", function () {

    describe("before label tool is started", function () {

      it("should not be in a substate of the LABEL_TOOL.ON state", function () {
        expect(labelToolState.ON.get('substates').someProperty('isCurrentState')).toEqual(false);
      });
    });

    describe("after label tool is started", function () {

      beforeEach(function () {
        var args = { annotationName: "label", markOnDataPoints: false, datadefName: "datadef" };
        controller.labelToolStartTool(args);
      });

      it("should be in a substate of the LABEL_TOOL.ON state", function () {
        expect(labelToolState.ON.get('substates').someProperty('isCurrentState')).toEqual(true);
      });
    });
  });

  describe("when the label tool start method is passed the name of a Label object", function () {

    var label;

    beforeEach( function () {
      store = SC.Store.create().from(SC.FixturesDataSource.create());
      label = store.createRecord(Smartgraphs.Label, {
        url: 'label'
      });
      spyOn(Smartgraphs.labelTool, 'getAnnotation').andReturn(label);
      spyOn(Smartgraphs.labelTool, 'graphViewForPane').andReturn(graphView);
      var args = { annotationName: "the label name", markOnDataPoints: false, datadefName: "datadef", pane: "top" };
      controller.labelToolStartTool(args);
    });

    it("should set the annotation property of the label tool state to be the label", function () {
      expect(labelToolState.get('annotation')).toBe(label);
    });

    it("should request a 'pointer' cursor style", function () {
      expect(controller.get('requestedCursorStyle')).toEqual('pointer');
    });

    describe("and the dataPointSelected action is fired at (1,2)", function () {

      beforeEach( function () {
        controller.dataPointSelected(null, 1, 2);
      });

      it("should update the label's x coordinate to 1", function () {
        expect(label.get('x')).toEqual(1);
      });

      it("should update the label's y coordinate to 2", function () {
        expect(label.get('y')).toEqual(2);
      });

      it("should set the label's shouldMarkTargetPoint property to NO", function () {
        expect(label.get('shouldMarkTargetPoint')).toEqual(NO);
      });

      it("should make the label removable", function () {
        expect(label.get('isRemovalEnabled')).toBe(true);
      });

      it("should request the 'default' cursor style", function () {
        expect(controller.get('requestedCursorStyle')).toEqual('default');
      });

      describe("and the dataPointSelected action is fired at (2, 3)", function () {

        beforeEach( function () {
          controller.dataPointSelected(null, 2, 3);
        });

        it("should not update the label's x coordinate", function () {
          expect(label.get('x')).toEqual(1);
        });
      });

      describe("and the inputAreaMouseDown action is fired at (2, 3)", function () {

        beforeEach( function () {
          controller.inputAreaMouseDown(2, 3);
        });

        it("should not update the label's x coordinate", function () {
          expect(label.get('x')).toEqual(1);
        });

        it("should leave the label removable", function () {
          expect(label.get('isRemovalEnabled')).toBe(true);
        });

      });

      describe("and the graph controller is cleared", function () {

        beforeEach( function () {
          controller.clear();
        });

        it("should not affect the label's x coordinate", function () {
          expect(label.get('x')).toEqual(1);
        });

        it("should mark the label nonremovable", function () {
          expect(label.get('isRemovalEnabled')).toBe(false);
        });

      });

    });

    describe("and the inputAreaMouseDown action is fired at (3, 4)", function () {

      beforeEach( function () {
        controller.inputAreaMouseDown(3, 4);
      });

      it("should update the label's x coordinate to 3", function () {
        expect(label.get('x')).toEqual(3);
      });

      it("should update the label's y coordinate to 4", function () {
        expect(label.get('y')).toEqual(4);
      });

      it("should set the label's shouldMarkTargetPoint property to YES", function () {
        expect(label.get('shouldMarkTargetPoint')).toEqual(YES);
      });

      it("should make the label removable", function () {
        expect(label.get('isRemovalEnabled')).toBe(true);
      });

      it("should request the 'default' cursor style", function () {
        expect(controller.get('requestedCursorStyle')).toEqual('default');
      });

      describe("and the dataPointSelected action is fired at (2, 3)", function () {

        beforeEach( function () {
          controller.dataPointSelected(null, 2, 3);
        });

        it("should not update the label's x coordinate", function () {
          expect(label.get('x')).toEqual(3);
        });
      });

      describe("and the inputAreaMouseDown action is fired at (2, 3)", function () {

        beforeEach( function () {
          controller.inputAreaMouseDown(2, 3);
        });

        it("should not update the label's x coordinate", function () {
          expect(label.get('x')).toEqual(3);
        });
      });

      describe("and the graph controller is cleared", function () {

        beforeEach( function () {
          controller.clear();
        });

        it("should not affect the label's x coordinate", function () {
          expect(label.get('x')).toEqual(3);
        });

        it("should mark the label nonremovable", function () {
          expect(label.get('isRemovalEnabled')).toBe(false);
        });

        describe("the statechart", function () {

          it("should no longer be in a substate of the LABEL_TOOL.ON state", function () {
            expect(labelToolState.ON.get('substates').someProperty('isCurrentState')).toEqual(false);
          });
        });

      });
    });

  });


  describe("when the annotation is a LabelSet", function () {

    var labelset;

    beforeEach( function () {
      store = SC.Store.create().from(SC.FixturesDataSource.create());
      labelset = store.createRecord(Smartgraphs.LabelSet, {
        url: 'labelset'
      });
      spyOn(Smartgraphs.labelTool, 'getAnnotation').andReturn(labelset);
      spyOn(Smartgraphs.labelTool, 'graphViewForPane').andReturn(graphView);
      var args = { annotationName: "the label name", markOnDataPoints: false, datadefName: "datadef", pane: "top" };
      controller.labelToolStartTool(args);
    });

    it("should set the annotation property of the label tool state to be the label set", function () {
      expect(labelToolState.get('annotation')).toBe(labelset);
    });

    it("should request a 'pointer' cursor style", function () {
      expect(controller.get('requestedCursorStyle')).toEqual('pointer');
    });

    describe("and the dataPointSelected action is fired at (1,2)", function () {

      beforeEach( function () {
        controller.dataPointSelected(null, 1, 2);
      });

      it("should still request the 'pointer' cursor style", function () {
        expect(controller.get('requestedCursorStyle')).toEqual('pointer');
      });

      describe("the label set", function () {

        it("should have one label", function () {
          expect(labelset.getPath('labels.length')).toEqual(1);
        });

        describe("the new label", function () {
          var label;

          beforeEach( function () {
            label = labelset.get('labels').objectAt(0);
          });

          it("should have x coordinate == 1", function () {
            expect(label.get('x')).toEqual(1);
          });

          it("should have y coordinate == 2", function () {
            expect(label.get('y')).toEqual(2);
          });

          it("should have  shouldMarkTargetPoint == NO", function () {
            expect(label.get('shouldMarkTargetPoint')).toEqual(NO);
          });

          it("should be marked as removable", function () {
            expect(label.get('isRemovalEnabled')).toBe(true);
          });
        });

      });


      describe("and the inputAreaMouseDown action is fired at (2, 3)", function () {

        beforeEach( function () {
          controller.inputAreaMouseDown(2, 3);
        });

        it("should still request the 'pointer' cursor style", function () {
          expect(controller.get('requestedCursorStyle')).toEqual('pointer');
        });

        describe("the label set", function () {

          it("should have two labels", function () {
            expect(labelset.getPath('labels.length')).toEqual(2);
          });

          describe("the new label", function () {
            var label;

            beforeEach( function () {
              label = labelset.get('labels').objectAt(1);
            });

            it("should have x coordinate == 2", function () {
              expect(label.get('x')).toEqual(2);
            });

            it("should have y coordinate == 3", function () {
              expect(label.get('y')).toEqual(3);
            });

            it("should have shouldMarkTargetPoint == YES", function () {
              expect(label.get('shouldMarkTargetPoint')).toEqual(YES);
            });

            it("should be marked as removable", function () {
              expect(label.get('isRemovalEnabled')).toBe(true);
            });
          });

        });

        describe("and the graph is cleared", function () {

          beforeEach( function () {
            controller.clear();
          });

          it("should request the 'default' cursor style", function () {
            expect(controller.get('requestedCursorStyle')).toEqual('default');
          });

          describe("the statechart", function () {

            it("should no longer be in a substate of the LABEL_TOOL.ON state", function () {
              expect(labelToolState.ON.get('substates').someProperty('isCurrentState')).toEqual(false);
            });
          });

          describe("the label set", function () {

            it("should still have two labels", function () {
              expect(labelset.getPath('labels.length')).toEqual(2);
            });

            describe("the first label", function () {

              var label;

              beforeEach( function () {
                label = labelset.get('labels').objectAt(0);
              });

              it("should still have x coordinate == 1", function () {
                expect(label.get('x')).toEqual(1);
              });

              it("should no longer be marked as removable", function () {
                expect(label.get('isRemovalEnabled')).toBe(false);
              });
            });

            describe("the second label", function () {

              var label;

              beforeEach( function () {
                label = labelset.get('labels').objectAt(1);
              });

              it("should still have x coordinate == 2", function () {
                expect(label.get('x')).toEqual(2);
              });

              it("should no longer be marked as removable", function () {
                expect(label.get('isRemovalEnabled')).toBe(false);
              });
            });

          });
        });
      });
    });
  });

});
