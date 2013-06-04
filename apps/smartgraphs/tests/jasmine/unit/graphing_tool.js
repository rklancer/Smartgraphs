(function() {

  defineJasmineHelpers();

  describe("smartgraphs.graphingTool", function() {
    var graphingTool;
    graphingTool = void 0;
    beforeEach(function() {
      return graphingTool = Smartgraphs.graphingTool;
    });
    it("should be defined", function() {
      return expect(graphingTool).toBeDefined();
    });
    it("should be registered under the name 'graphing'", function() {
      return expect(Smartgraphs.Tool.tools["graphing"].context).toBe(graphingTool);
    });
    describe("setup method", function() {
      var controller, tableController;
      controller = tableController = void 0;
      beforeEach(function() {
        var annotation, graphView;
        controller = Smartgraphs.GraphController.create();
        tableController = Smartgraphs.TableController.create();
        annotation = new Object;
        annotation.set = function() {};
        graphView = new Object;
        graphView._updateAllViews = function() {};
        spyOn(graphingTool, "graphControllerForPane").andReturn(controller);
        spyOn(graphingTool, "tableControllerForPane").andReturn(tableController);
        spyOn(graphingTool, "otherPaneFor").andReturn("bottom");
        spyOn(controller, "graphingToolStartTool");
        spyOn(tableController, "setRoundingFunc");
        spyOn(graphingTool, "getAnnotation").andReturn(annotation);
        spyOn(graphingTool, "graphViewForPane").andReturn(graphView);
        return graphingTool.setup({
          annotationName: "freehand-sketch-1",
          shape: "SingleLine",
          data: "datadef-1",
          pane: "top"
        });
      });
      it("should translate the 'pane' parameter to a controller ", function() {
        return expect(graphingTool.graphControllerForPane).toHaveBeenCalledWith("top");
      });
      it("should call TableController's setRoundingFunc with value 'Fixed''", function() {
        return expect(tableController.setRoundingFunc).toHaveBeenCalledWith("Fixed");
      });
      return it("should ask the relevant graph controller to start the graphing tool", function() {
        return expect(controller.graphingToolStartTool).toHaveBeenCalledWith({
          annotationName: "freehand-sketch-1",
          shape: "SingleLine",
          datadefName: "datadef-1"
        });
      });
    });
    describe("appendSketch method", function() {
      var controller, sketch, state;
      state = void 0;
      sketch = void 0;
      controller = void 0;
      beforeEach(function() {
        state = SC.Object.create();
        controller = SC.Object.create({
          addAnnotation: function() {}
        });
        state = SC.Object.create({
          statechart: SC.Object.create({
            owner: controller
          })
        });
        spyOn(controller, "addAnnotation");
        return graphingTool.appendSketch(state, sketch);
      });
      return it("should call the addAnnotation method of the state's owning controller", function() {
        return expect(controller.get("addAnnotation")).toHaveBeenCalledWith(sketch);
      });
    });
    describe("graphViewForPane", function() {
      return it("should return proper graphView for the graphingTool", function() {
        return expect(graphingTool.graphViewForPane("top")).toEqual(Smartgraphs.activityPage.getPath("FirstGraphPane.graphView"));
      });
    });
    return describe("getLinePointWithinLogicalBounds ", function() {
      var c, logicalBounds, m;
      graphingTool = Smartgraphs.graphingTool;
      logicalBounds = {
        xMin: 0,
        xMax: 10,
        yMin: 0,
        yMax: 10
      };
      graphingTool.set('graphLogicalBounds', logicalBounds);
      m = 0.5;
      c = 3;
      return it("should get line points within logical bounds", function() {
        expect(graphingTool.getLinePointWithinLogicalBounds([2, -1], m, c)).toEqual([-6, 0]);
        expect(graphingTool.getLinePointWithinLogicalBounds([15, 12], m, c)).toEqual([10, 8]);
        return expect(graphingTool.getLinePointWithinLogicalBounds([6, 3], m, c)).toEqual([6, 3]);
      });
    });
  });

}).call(this);
