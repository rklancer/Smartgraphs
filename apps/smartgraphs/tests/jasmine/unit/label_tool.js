/*globals Smartgraphs RaphaelViews describe it expect xit xdescribe beforeEach afterEach spyOn runs waits waitsFor
 clickOn fillIn defineJasmineHelpers runBeforeEach runAfterEach */

defineJasmineHelpers();

describe("Smartgraphs.labelTool", function () {

  var labelTool;

  beforeEach( function () {
    labelTool = Smartgraphs.labelTool;
  });

  it("should be defined", function () {
    expect(labelTool).toBeDefined();
  });

  it("should be registered under the name 'label'", function () {
    expect(Smartgraphs.Tool.tools['label'].context).toBe(labelTool);
  });


  describe("its partner state", function () {

    var graphController,
        statechart,
        stateName;

    beforeEach( function () {
      graphController = Smartgraphs.GraphController.create();
      statechart = graphController.get('statechart');
      statechart.initStatechart();

      stateName = labelTool.get('state');
    });

    it("should be a state in graph controllers' statechart", function () {
      expect(statechart.doesContainState(stateName)).toEqual(true);
    });
  });


  describe("setup method", function () {

    var graphController;

    beforeEach( function () {
      graphController = Smartgraphs.GraphController.create();
      spyOn(labelTool, 'graphControllerForPane').andReturn(graphController);
      spyOn(graphController, 'labelToolStartTool');

      labelTool.setup({ labelName: 'the label name', pane: 'top', markOnDataPoints: true, datadefName: 'datadef name', maxNoOfLabels : 2, allowCoordinatesChange : true});
    });

    it("should translate the 'pane' parameter to a graph controller", function () {
      expect(labelTool.graphControllerForPane).toHaveBeenCalledWith('top');
    });

    it("should ask the relevant graph controller to start the label tool", function () {
      expect(graphController.labelToolStartTool).toHaveBeenCalledWith({ annotationName: 'the label name', markOnDataPoints: true, datadefName: 'datadef name', maxNoOfLabels : 2, allowCoordinatesChange : true, pane:'top'});
    });

  });


  describe("appendLabel method", function () {

    var label,
        state,
        controller;

    beforeEach( function () {
      label = SC.Object.create();

      controller = SC.Object.create({
        addAnnotation: function () {}
      });

      state = SC.Object.create({
        statechart: SC.Object.create({
          owner: controller
        })
      });

      spyOn(controller, 'addAnnotation');
      labelTool.appendLabel(state, label);
    });

    it("should call the addAnnotation method of the state's owning controller", function () {
      expect(controller.get('addAnnotation')).toHaveBeenCalledWith(label);
    });
  });

});
