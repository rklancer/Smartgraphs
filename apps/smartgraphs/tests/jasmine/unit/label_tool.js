/*globals Smartgraphs describe it expect xit xdescribe beforeEach afterEach spyOn runs waits waitsFor clickOn fillIn */

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
  
});