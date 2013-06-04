/*globals Smartgraphs RaphaelViews describe it expect xit xdescribe beforeEach afterEach spyOn runs waits waitsFor
 clickOn fillIn defineJasmineHelpers runBeforeEach runAfterEach */

defineJasmineHelpers();

describe("Smartgraphs.animationTool", function () {

  var animationTool;

  beforeEach( function () {
    animationTool = Smartgraphs.animationTool;
  });

  it("should be defined", function () {
    expect(animationTool).toBeDefined();
  });

  it("should be registered under the name 'animation'", function () {
    expect(Smartgraphs.Tool.tools['animation'].context).toBe(animationTool);
  });


  describe("its partner state", function () {

    var graphController,
        statechart,
        stateName;

    beforeEach( function () {
      graphController = Smartgraphs.GraphController.create();
      statechart = graphController.get('statechart');
      statechart.initStatechart();

      stateName = animationTool.get('state');
    });

    it("should be a state in graph controllers' statechart", function () {
      expect(statechart.doesContainState(stateName)).toEqual(true);
    });
  });


  describe("setup method", function () {

    var graphController,
        statechart;

    beforeEach( function () {
      graphController = Smartgraphs.GraphController.create();
      statechart = graphController.get('statechart');

      spyOn(Smartgraphs.activityViewController, 'validPaneFor').andReturn('top');
      spyOn(animationTool, 'graphControllerForPane').andReturn(graphController);
      spyOn(statechart, 'sendAction');

      animationTool.setup({ pane: 'top' });
    });

    it("should translate the 'pane' parameter to a graph controller", function () {
      expect(animationTool.graphControllerForPane).toHaveBeenCalledWith('top');
    });

    it("should ask the relevant graph controller to start the animation tool", function () {
      expect(statechart.sendAction).toHaveBeenCalledWith('animationToolStartTool');
    });

  });

  describe("graphView interactions", function () {

    var graphView = SC.Object.create({
      animate: function() {},
      stop: function () {},
      reset: function () {}
    });

    beforeEach( function () {
      spyOn(animationTool, 'graphViewForPane').andReturn(graphView);
      animationTool._mainPane = null;
      animationTool._isAnimating = NO;
    });

    describe("startAnimating method", function () {

      it("should return NO when called with no mainPane specified", function () {
        expect(animationTool.startAnimating()).toEqual(NO);
      });

      it("should return NO when there is a pane, but it's already animating", function () {
        animationTool._mainPane = SC.Object.create();
        animationTool._isAnimating = YES;
        expect(animationTool.startAnimating()).toEqual(NO);
      });

      it("should call animate() method of the graph view when there is a pane, and it's not already animating", function () {
        animationTool._mainPane = SC.Object.create();
        animationTool._isAnimating = NO;

        spyOn(graphView, 'animate');
        animationTool.startAnimating();
        expect(graphView.animate).toHaveBeenCalled();
      });

    });


    describe("stopAnimating method", function () {

      it("should return NO when called with no pane", function () {
        expect(animationTool.stopAnimating()).toEqual(NO);
      });

      it("should return NO when there is a pane, but it's not animating", function () {
        animationTool._mainPane = SC.Object.create();
        expect(animationTool.stopAnimating()).toEqual(NO);
      });

      it("should call this.graphPane.graphView.stop() when there is a pane, and it's animating", function () {
        animationTool._mainPane = SC.Object.create();
        animationTool._isAnimating = YES;

        spyOn(graphView, 'stop');
        animationTool.stopAnimating();
        expect(graphView.stop).toHaveBeenCalled();
      });

    });


    describe("clearAnimation method", function () {

      beforeEach( function () {
        animationTool._isAnimating = YES;
      });

      it("should call this.graphPane.graphView.reset()", function () {
        spyOn(graphView, 'reset');
        animationTool.clearAnimation();
        expect(graphView.reset).toHaveBeenCalled();
      });

      it("should set this._isAnimating to NO", function () {
        animationTool.clearAnimation();
        expect(animationTool._isAnimating).toEqual(NO);
      });

    });
  });

});
