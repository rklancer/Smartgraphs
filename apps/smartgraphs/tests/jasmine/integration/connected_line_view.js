/*globals Smartgraphs RaphaelViews describe it expect xit xdescribe beforeEach afterEach spyOn runs waits waitsFor
 clickOn fillIn defineJasmineHelpers runBeforeEach runAfterEach */

defineJasmineHelpers();

describe("ConnectedLineView, when the points are (x_min, y_min), (x_mid, y_max), (x_max, y_min)", function () {

  var pane = SC.MainPane.create(),
      xAxis = SC.Object.create({ min: 0, max: 2 }),
      yAxis = SC.Object.create({ min: 0, max: 1 }),
      connectedLineObject,
      controller,
      graphView,
      layer;

  runBeforeEach( function () {
    connectedLineObject = Smartgraphs.ConnectedLine.create({
      points: [[0, 0], [1, 1], [2, 0]],
      color: '#000'
    });

    controller = Smartgraphs.GraphController.create();
    controller.clear();
    controller.set('xAxis', xAxis);
    controller.set('yAxis', yAxis);

    controller.get('graphableDataObjects').pushObject(connectedLineObject);

    graphView = Smartgraphs.GraphView.create({ graphController: controller });
    pane.append();
    pane.appendChild(graphView);
  });

  runAfterEach( function () {
    pane.removeAllChildren();
    pane.remove();
  });

  describe("graph view data holder", function () {

    var dataHolder;

    beforeEach( function () {
      dataHolder = graphView.get('dataHolder');
    });

    it("should have one child view", function () {
      expect(dataHolder.getPath('childViews.length')).toEqual(1);
    });

    describe("its child view", function () {

      var connectedLineView;

      beforeEach( function () {
        connectedLineView = dataHolder.getPath('childViews.0');
      });

      it("should be the correct view class for a connected line view", function () {
        expect(connectedLineView).toBeA(connectedLineObject.get('viewClass'));
      });

      describe("its Raphael path", function () {
        var path,
            top,
            left,
            bottom,
            right;

        beforeEach( function () {

          var frame   = graphView.get('frame'),
              padding = graphView.get('padding'),
              width   = frame.width - padding.left - padding.right,
              height  = frame.height - padding.top - padding.bottom;

          left   = frame.x + padding.left;
          top    = frame.y + padding.top;
          bottom = top + height;
          right  = left + width;

          path = connectedLineView.get('layer').raphael.attr().path;

          this.addMatchers({
            toBeWithinOneUnitOf: function (value) {
              return Math.abs(this.actual - value) <= 1;
            }
          });
        });

        it("should have 3 elements", function () {
          expect(path.length).toEqual(3);
        });

        it("should start at the lower left", function () {
          expect(path[0][0]).toEqual('M');
          expect(path[0][1]).toBeWithinOneUnitOf(left);
          expect(path[0][2]).toBeWithinOneUnitOf(bottom);
        });

        it("should continue at the middle top", function () {
          expect(path[1][0]).toEqual('L');
          expect(path[1][1]).toBeWithinOneUnitOf( (left + right)/2 );
          expect(path[1][2]).toBeWithinOneUnitOf(top);
        });

        it("should finish at the lower right", function () {
          expect(path[2][0]).toEqual('L');
          expect(path[2][1]).toBeWithinOneUnitOf(right);
          expect(path[2][2]).toBeWithinOneUnitOf(bottom);
        });
      });
    });
  });

});
