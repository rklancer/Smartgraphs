defineJasmineHelpers()
$ ->
  $("body").css "overflow", "auto"

describe "Smartgraphs.graphingTool with 'singleLine' shape option", ->
  store = controller = toolState = graphingTool = null
  beforeEach ->
    graphingTool = Smartgraphs.graphingTool
    graphingTool.set('graphLogicalBounds', { xMin: 0, yMin: 0, xMax: 10, yMax: 10 })
    store = SC.Store.create().from(SC.FixturesDataSource.create())
    controller = Smartgraphs.GraphController.create()
    controller.clear()
    statechart = controller.get("statechart")
    toolState = statechart.getState("GRAPHING_TOOL")
    do =>
      matchArraysUsing = (matcher) ->
        (pairs) ->
          return false if @actual?.length isnt pairs.length or typeof @actual isnt 'object'
          return false for a, i in @actual when not matcher( a, pairs[i] )
          true

      @addMatchers(
        toEqualPairs: matchArraysUsing (a, [x, y]) -> a[0] is x and a[1] is y
      )

  describe "GRAPHING_TOOL state", ->
    it "should exist", ->
      expect(toolState).toBeDefined()

  describe "when the graphing tool is started with shape: 'SINGLE_LINE'", ->
    datadef = rep = sketch = startState = null
    beforeEach ->
      datadef = store.createRecord(Smartgraphs.UnorderedDataPoints,
        url: "rep"
        points: []
        name: "datadef-1"
      )
      rep = {
        datadef: datadef
        getPath: (getParam) ->
          if getParam is 'datadef.name' then datadef.get('name') else null
      }
      sketch = store.createRecord(Smartgraphs.FreehandSketch,
        url: "sketch"
        points: []
      )

      spyOn(graphingTool, "getAnnotation").andReturn sketch
      spyOn(graphingTool, "getDatadef").andReturn datadef
      spyOn(graphingTool, "hideGraphTitle")
      spyOn(graphingTool, "updateGraphLogicalBounds")
      spyOn(graphingTool, "showToolTip")
      spyOn(graphingTool, "isPointOverlap").andReturn false
      controller.showCrossHairs = true
      controller.graphingToolStartTool
        annotationName: "freehand-sketch-1"
        shape: "singleLine"
        datadefName: "datadef-1"

      startState = toolState.getPath("ON.SINGLE_LINE.START")

    describe "the graph controller's statechart", ->
      it "should be in the relevant start state", ->
        expect(startState.get("isCurrentState")).toBe true

    describe "the sketch", ->
      it "should have been cleared (have no points)", ->
        expect(sketch.get("points")).toBeEmpty()

      it "should be in the graph controller's list of annotations", ->
        expect(controller.get("annotationList")).toContain sketch

    describe "the datadef", ->
      it "should have been cleared (have no points)", ->
        expect(datadef.get("points")).toBeEmpty()

      it "should be in the graph controller's list of datadefs", ->
        expect(controller.get("datadefList")).toContain datadef

    describe "the cursor style requested by the controller", ->
      it "should be 'crosshair'", ->
        expect(controller.get("requestedCursorStyle")).toEqual "crosshair"

    describe "when the controller's inputAreaMouseDown method is called with (0,1)", ->
      beforeEach ->
        controller.inputAreaMouseDown 0, 1

      describe "the datadef", ->
        it "should have points [[0, 1]]", ->
          expect(datadef.get("points")).toEqualPairs [[0, 1]]

      describe "the cursor style requested by the controller", ->
        it "should be 'crosshair'", ->
          expect(controller.get("requestedCursorStyle")).toEqual "crosshair"

    describe "when the controller's inputAreaMouseDown method is called twice with (0, 1) and (2, 3)", ->
      beforeEach ->
        controller.inputAreaMouseDown 0, 1
        controller.inputAreaMouseDown 2, 3

      describe "the sketch", ->
        it "line should be drawn with points [[0,1], [9,10]]", ->
          expect(sketch.get("points")).toEqualPairs [[0, 1], [9, 10]]

      describe "the datadef", ->
        it "should have points [[0,1], [2, 3]]", ->
          expect(datadef.get("points")).toEqualPairs [[0, 1], [2, 3]]

      describe "the cursor style requested by the controller", ->
        it "should be back to 'default'", ->
          expect(controller.get("requestedCursorStyle")).toEqual "default"

      describe "when point (0, 1) is dragged to (1, 2)", ->
        beforeEach ->
          controller.dataPointSelected rep, 0, 1
          controller.dataPointDragged rep, 1, 2
          controller.dataPointUp rep, 1, 2

        describe "the sketch", ->
          it "line should be drawn with points [[0, 1], [9, 10]]", ->
            expect(sketch.get("points")).toEqualPairs [[0, 1], [9, 10]]

        describe "the datadef", ->
          it "should have points [[1, 2], [2, 3]]", ->
            expect(datadef.get("points")).toEqualPairs [[1, 2], [2, 3]]

        describe "the cursor style requested by the controller", ->
          it "should be back to 'default'", ->
            expect(controller.get("requestedCursorStyle")).toEqual "default"