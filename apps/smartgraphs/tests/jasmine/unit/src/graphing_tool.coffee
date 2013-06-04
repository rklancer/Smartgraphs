defineJasmineHelpers()
describe "smartgraphs.graphingTool", ->
  graphingTool = undefined
  beforeEach ->
    graphingTool = Smartgraphs.graphingTool

  it "should be defined", ->
    expect(graphingTool).toBeDefined()

  it "should be registered under the name 'graphing'", ->
    expect(Smartgraphs.Tool.tools["graphing"].context).toBe graphingTool

  describe "setup method", ->
    controller = tableController = undefined
    beforeEach ->
      controller = Smartgraphs.GraphController.create()
      tableController = Smartgraphs.TableController.create()
      annotation = new Object
      annotation.set = ->
      graphView = new Object
      graphView._updateAllViews = ->
      spyOn(graphingTool, "graphControllerForPane").andReturn controller
      spyOn(graphingTool, "tableControllerForPane").andReturn tableController
      spyOn(graphingTool, "otherPaneFor").andReturn "bottom"
      spyOn controller, "graphingToolStartTool"
      spyOn tableController, "setRoundingFunc"
      spyOn(graphingTool, "getAnnotation").andReturn(annotation)
      spyOn(graphingTool, "graphViewForPane").andReturn(graphView)
      graphingTool.setup
        annotationName: "freehand-sketch-1"
        shape: "SingleLine"
        data: "datadef-1"
        pane: "top"

    it "should translate the 'pane' parameter to a controller ", ->
      expect(graphingTool.graphControllerForPane).toHaveBeenCalledWith "top"

    it "should call TableController's setRoundingFunc with value 'Fixed''", ->
      expect(tableController.setRoundingFunc).toHaveBeenCalledWith "Fixed"

    it "should ask the relevant graph controller to start the graphing tool", ->
      expect(controller.graphingToolStartTool).toHaveBeenCalledWith
        annotationName: "freehand-sketch-1"
        shape: "SingleLine"
        datadefName: "datadef-1"

  describe "appendSketch method", ->
    state = undefined
    sketch = undefined
    controller = undefined
    beforeEach ->
      state = SC.Object.create()
      controller = SC.Object.create(addAnnotation: ->
      )
      state = SC.Object.create(statechart: SC.Object.create(owner: controller))
      spyOn controller, "addAnnotation"
      graphingTool.appendSketch state, sketch

    it "should call the addAnnotation method of the state's owning controller", ->
      expect(controller.get("addAnnotation")).toHaveBeenCalledWith sketch

  describe "graphViewForPane", ->
    it "should return proper graphView for the graphingTool", ->
      expect(graphingTool.graphViewForPane("top")).toEqual Smartgraphs.activityPage.getPath("FirstGraphPane.graphView")

  describe "getLinePointWithinLogicalBounds ", ->
    graphingTool = Smartgraphs.graphingTool
    logicalBounds =
      xMin: 0
      xMax: 10
      yMin: 0
      yMax: 10
    graphingTool.set('graphLogicalBounds', logicalBounds)
    m = 0.5
    c = 3
    it "should get line points within logical bounds", ->
      expect(graphingTool.getLinePointWithinLogicalBounds([ 2, -1 ], m, c)).toEqual [ -6, 0 ]
      expect(graphingTool.getLinePointWithinLogicalBounds([ 15, 12 ], m, c)).toEqual [ 10, 8 ]
      expect(graphingTool.getLinePointWithinLogicalBounds([ 6, 3 ], m, c)).toEqual [ 6, 3 ]