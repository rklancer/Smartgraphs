/*globals Smartgraphs RaphaelViews describe it expect xit xdescribe beforeEach afterEach spyOn runs waits waitsFor
 clickOn fillIn defineJasmineHelpers runBeforeEach runAfterEach */

defineJasmineHelpers();

describe("Smartgraphs.GraphView keyframe methods", function() {

  var graphView,
      graphCanvasView,
      calculateKeyframes,
      loopCallback,
      logicalBounds,
      screenBounds,
      keyframes,
      points;

  beforeEach(function() {
    graphView = Smartgraphs.GraphView.create();
    graphCanvasView = graphView.get('graphCanvasView');
    calculateKeyframes = graphCanvasView._calculateKeyframes;
    loopCallback = function() {};
    logicalBounds = { xMin: 0, yMin: 0, xMax: 100, yMax: 100 };
    screenBounds = { xLeft: 200, xRight: 600, yTop: 100, yBottom: 300, plotWidth: 400, plotHeight: 200 };
    keyframes = {};

    // It's important to test 51.01 and not just 51; Raphael only allows integral keyframes.
    points = [[0,0], [51.01, 49.09], [100, 75]];
  });

  it("should exist", function () {
    expect(graphView).toBeDefined();
    expect(graphCanvasView).toBeDefined();
    expect(calculateKeyframes).toBeDefined();
  });

  it("should calculate the correct keyframes", function() {
    graphCanvasView._calculateKeyframes(keyframes, points, logicalBounds, screenBounds, 0, 0, loopCallback);
    expect(keyframes['0%']).toBeDefined();
    expect(keyframes['51%']).toBeDefined();
    expect(keyframes['100%']).toBeDefined();
  });

  it("should have the correct values in those keyframes", function() {
    graphCanvasView._calculateKeyframes(keyframes, points, logicalBounds, screenBounds, 0, 0, loopCallback);
    expect(keyframes['0%'].y).toEqual(300);
    expect(keyframes['51%'].y).toEqual(201.82);
    expect(keyframes['100%'].y).toEqual(150);
  });

  it("should have a callback on the last keyframe only", function() {
    graphCanvasView._calculateKeyframes(keyframes, points, logicalBounds, screenBounds, 0, 0, loopCallback);
    expect(keyframes['0%'].callback).not.toBeDefined();
    expect(keyframes['51%'].callback).not.toBeDefined();
    expect(keyframes['100%'].callback).toBeDefined();
    expect(keyframes['100%'].callback).toEqual(loopCallback);
  });

});
