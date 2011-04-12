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

      labelTool.setup({labelName: 'the label name', pane: 'top'});   
    });
    
    it("should translate the 'pane' parameter to a graph controller", function () {
      expect(labelTool.graphControllerForPane).toHaveBeenCalledWith('top');
    });
    
    it("should ask the relevant graph controller to start the label tool", function () {
      expect(graphController.labelToolStartTool).toHaveBeenCalledWith('the label name');
    });
    
  });
  
  
  describe("createLabel method", function () {
    
    var labelAnnotation;
    
    beforeEach( function () {
      var store = SC.Store.create().from(SC.FixturesDataSource.create());
      spyOn(labelTool, 'getAnnotation').andReturn(store.createRecord(Smartgraphs.LabelAnnotation, {
        url: 'the-annotation'
      }));
      labelAnnotation = labelTool.createLabel('the label name', 1, 2);
    });
      
    it("should return the object found by getAnnotation", function () {
      expect(labelTool.getAnnotation).toHaveBeenCalledWith('the label name');
    });
    
    describe("the annotation returned by the method", function () {
      
      it("should have an x-value equal to the passed x-value", function () {
        expect(labelAnnotation.get('x')).toEqual(1);
      });
      
      it("should have a y-value equal to the passed y-value", function () {
        expect(labelAnnotation.get('y')).toEqual(2);
      });
      
    });
  });
  
  
  describe("addLabelToController method", function () {
    
    var labelAnnotation,
        owner;
    
    beforeEach( function () {
      labelAnnotation = SC.Object.create(); 
      owner = SC.Object.create({
        addAnnotation: function () {}
      });
      
      spyOn(owner, 'addAnnotation');
      labelTool.addLabelToController(owner, labelAnnotation);
    });
    
    it("should call the addAnnotation method of the supplied owner", function () {
      expect(owner.get('addAnnotation')).toHaveBeenCalledWith(labelAnnotation);
    });
  });
  
});