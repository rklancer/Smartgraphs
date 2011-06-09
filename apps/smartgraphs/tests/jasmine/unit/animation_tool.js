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
  
    var graphController;
    
    beforeEach( function () {
      graphController = Smartgraphs.GraphController.create();
      spyOn(animationTool, 'graphControllerForPane').andReturn(graphController);
      spyOn(graphController, 'animationToolStartTool');
  
      animationTool.setup({ pane: 'top' });
    });
    
    it("should translate the 'pane' parameter to a graph controller", function () {
      expect(animationTool.graphControllerForPane).toHaveBeenCalledWith('top');
    });
    
    it("should ask the relevant graph controller to start the animation tool", function () {
      expect(graphController.animationToolStartTool).toHaveBeenCalled();
    });
    
  });
  
  
  describe("startAnimating method", function () {
    
    beforeEach( function () {
      animationTool._pane = null;
      animationTool._isAnimating = NO;
      animationTool.graphPane = null;
    });
      
    it("should return NO when called with no pane", function () {
      expect(animationTool.startAnimating()).toEqual(NO);
    });
    
    it("should return NO when there is a pane, but it's already animating", function () {
      animationTool._pane = SC.Object.create();
      animationTool._isAnimating = YES;
      expect(animationTool.startAnimating()).toEqual(NO);
    });
    
    it("should call this.graphPane.graphView.animate() when there is a pane, and it's not already animating", function () {
      animationTool._pane = SC.Object.create();
      animationTool._isAnimating = NO;
      animationTool.graphPane = SC.Object.create({
        graphView: SC.Object.create({
          animate: function() {}
        })
      });
      spyOn(animationTool.graphPane.graphView, 'animate');
      animationTool.startAnimating();
      expect(animationTool.graphPane.graphView.animate).toHaveBeenCalled();
    });
    
    it("should return the result of calling this.graphPane.graphView.animate() when there is a pane, and it's not already animating", function () {
      animationTool._pane = SC.Object.create();
      animationTool._isAnimating = NO;
      animationTool.graphPane = SC.Object.create({
        graphView: SC.Object.create({
          animate: function() { return "foo"; }
        })
      });
      expect(animationTool.startAnimating()).toEqual("foo");
    });
    
  });
  
  
  describe("stopAnimating method", function () {
    
    beforeEach( function () {
      animationTool._pane = null;
      animationTool._isAnimating = NO;
      animationTool.graphPane = null;
    });
      
    it("should return NO when called with no pane", function () {
      expect(animationTool.stopAnimating()).toEqual(NO);
    });
    
    it("should return NO when there is a pane, but it's not animating", function () {
      animationTool._pane = SC.Object.create();
      expect(animationTool.stopAnimating()).toEqual(NO);
    });
    
    it("should call this.graphPane.graphView.stop() when there is a pane, and it's animating", function () {
      animationTool._pane = SC.Object.create();
      animationTool._isAnimating = YES;
      animationTool.graphPane = SC.Object.create({
        graphView: SC.Object.create({
          stop: function() {}
        })
      });
      spyOn(animationTool.graphPane.graphView, 'stop');
      animationTool.stopAnimating();
      expect(animationTool.graphPane.graphView.stop).toHaveBeenCalled();
    });
    
    it("should return the result of calling this.graphPane.graphView.stop() when there is a pane, and it's animating", function () {
      animationTool._pane = SC.Object.create();
      animationTool._isAnimating = YES;
      animationTool.graphPane = SC.Object.create({
        graphView: SC.Object.create({
          stop: function() { return "foo"; }
        })
      });
      expect(animationTool.stopAnimating()).toEqual("foo");
    });
    
  });
  
  
  describe("clearAnimation method", function () {
    
    beforeEach( function () {
      animationTool._isAnimating = YES;
    });
    
    it("should call this.graphPane.graphView.reset()", function () {
      animationTool.graphPane = SC.Object.create({
        graphView: SC.Object.create({
          reset: function() {}
        })
      });
      spyOn(animationTool.graphPane.graphView, 'reset');
      animationTool.clearAnimation();
      expect(animationTool.graphPane.graphView.reset).toHaveBeenCalled();
    });
    
    it("should return the result of calling this.graphPane.graphView.reset()", function () {
      animationTool.graphPane = SC.Object.create({
        graphView: SC.Object.create({
          reset: function() { return "foo"; }
        })
      });
      expect(animationTool.clearAnimation()).toEqual("foo");
    });
    
    it("should set this._isAnimating to NO", function () {
      animationTool.clearAnimation();
      expect(animationTool._isAnimating).toEqual(NO);
    });
    
  });
  
});