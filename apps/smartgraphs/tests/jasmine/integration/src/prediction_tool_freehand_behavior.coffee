defineJasmineHelpers()
$ -> $('body').css('overflow', 'auto')

describe "Smartgraphs.predictionTool with 'freehand' uiBehavior option", ->

  store = controller = statechart = toolState = sketch = null

  beforeEach ->
    store      = SC.Store.create().from SC.FixturesDataSource.create()
    controller = Smartgraphs.GraphController.create()
    controller.clear()
    statechart = controller.get('statechart')
    toolState  = statechart.getState "PREDICTION_TOOL"

    do =>
      matchArraysUsing = (matcher) ->
        (pairs) ->
          return false if @actual?.length isnt pairs.length or typeof @actual isnt 'object'
          return false for a, i in @actual when not matcher( a, pairs[i] )
          true

      @addMatchers(
        toEqualPairs: matchArraysUsing (a, [x, y]) -> a[0] is x and a[1] is y

        toShowDisabledResetButtonOnly: () ->
          badProperties = [
            'startControlIsVisible'
            'stopControlIsVisible'
            'clearControlIsEnabled'
            'clearControlIsDefault'
          ]

          goodProperties = [
            'clearControlIsVisible'
          ]

          return false for p in badProperties when  @actual.get(p) is true
          return false for p in goodProperties when @actual.get(p) is false
          true

        toShowHighlightedResetButtonOnly: () ->
          badProperties = [
            'startControlIsVisible'
            'stopControlIsVisible'
          ]

          goodProperties = [
            'clearControlIsVisible'
            'clearControlIsEnabled'
            'clearControlIsDefault'
          ]

          return false for p in badProperties  when @actual.get(p) is true
          return false for p in goodProperties when @actual.get(p) is false
          true
      )

  describe "PREDICTION_TOOL state", ->
    it "should exist", ->
      expect(toolState).toBeDefined()

  describe "when the prediction tool is started with uiBehavior: 'freehand'", ->

    sketch = startState = null

    beforeEach ->
      sketch     = store.createRecord Smartgraphs.FreehandSketch,
        url:    'sketch'
        points: [[1,2]]
      spyOn(Smartgraphs.predictionTool, 'getAnnotation').andReturn sketch
      controller.predictionToolStartTool annotationName: 'sketch', uiBehavior: 'freehand'
      startState = toolState.getPath('ON.FREEHAND.START')

    describe "the graph controller's statechart", ->
      it "should be in the relevant start state", ->
        expect( startState.get('isCurrentState') ).toBe true

    describe "the sketch", ->
      it "should be in the graph controller's list of annotations", ->
        expect( controller.get('annotationList') ).toContain sketch

      it "should have been cleared (have no points)", ->
        expect( sketch.get('points') ).toBeEmpty()

    describe "the buttons requested by the controller", ->
      it "should include only the (dimmed) reset button", ->
        expect( controller ).toShowDisabledResetButtonOnly()

    describe "the cursor style requested by the controller", ->
      it "should be 'crosshair'", ->
        expect( controller.get('requestedCursorStyle') ).toEqual 'crosshair'

    describe "when the controller's inputAreaMouseDown method is called with (0,1)", ->
      beforeEach ->
        controller.inputAreaMouseDown(0,1)

      describe "the sketch", ->
        it "should have points [ [0,1] ]", ->
          expect( sketch.get('points') ).toEqualPairs [[0,1]]

      describe "the buttons requested by the controller", ->
        it "should include only the (dimmed) reset button", ->
          expect( controller ).toShowDisabledResetButtonOnly()

      describe "the cursor style requested by the controller", ->
        it "should be 'crosshair'", ->
          expect( controller.get('requestedCursorStyle') ).toEqual 'crosshair'

      describe "and the controller's inputAreaMouseDragged method is called with (1,2)", ->
        beforeEach ->
          controller.inputAreaMouseDragged(1,2)

        describe "the sketch", ->
          it "should have points [ [0,1], [1,2]]", ->
            expect( sketch.get('points') ).toEqualPairs [[0,1], [1,2]]

        describe "the buttons requested by the controller", ->
          it "should include only the (dimmed) reset button", ->
            expect( controller ).toShowDisabledResetButtonOnly()

        describe "the cursor style requested by the controller", ->
          it "should be 'crosshair'", ->
            expect( controller.get('requestedCursorStyle') ).toEqual 'crosshair'

        describe "and the controller's inputAreaMouseUp method is called with (2,3)", ->
          beforeEach ->
            controller.inputAreaMouseUp(2,3)

          describe "the sketch", ->
            it "should have points [ [0,1], [1,2], [2,3] ]", ->
              expect( sketch.get('points') ).toEqualPairs [[0,1], [1,2], [2,3]]

          describe "the buttons requested by the controller", ->
            it "should include only the (now-highlighted) reset button", ->
              expect( controller ).toShowHighlightedResetButtonOnly()

          describe "the cursor style requested by the controller", ->
            it "should be 'default'", ->
              expect( controller.get('requestedCursorStyle') ).toEqual 'default'

          describe "and the clearControlWasClicked action is sent to the controller's statechart", ->
            beforeEach ->
              # swallow the event forwarded to the (un-initialized) application statechart
              spyOn Smartgraphs.statechart, 'sendAction'
              statechart.sendAction 'clearControlWasClicked'

            describe "the sketch", ->
              it "should have no points", ->
                expect( sketch.get('points') ).toBeEmpty()

            describe "the graph controller's statechart", ->
              it "should be in the freehand-behavior start state again", ->
                expect( startState.get('isCurrentState') ).toBe true

            describe "the buttons requested by the controller", ->
              it "should include only the (dimmed) reset button", ->
                expect( controller ).toShowDisabledResetButtonOnly()

            describe "the cursor style requested by the controller", ->
              it "should be 'crosshair'", ->
                expect( controller.get('requestedCursorStyle') ).toEqual 'crosshair'

