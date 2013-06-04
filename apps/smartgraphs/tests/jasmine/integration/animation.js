/*globals Smartgraphs RaphaelViews describe it expect xit xdescribe beforeEach afterEach spyOn runs waits waitsFor
 clickOn fillIn defineJasmineHelpers runBeforeEach runAfterEach */

defineJasmineHelpers();

$(function () {
  $('body').css('overflow', 'auto');
});

var fireEvent = function (el, eventName, x, y) {
  var offset = $(el).offset(),
      evt = SC.Event.simulateEvent(el, eventName, { pageX: offset.left + x, pageY: offset.top + y });

  SC.Event.trigger(el, eventName, evt);
};


describe("GraphView animation behavior", function () {

  var pane = SC.MainPane.create(),
      controller,
      view,
      layer;

  beforeEach( function () {
    this.addMatchers({

      toBeInside: function (element) {
        if (element.jquery) element = element[0];
        return $.contains(element, this.actual);
      }

    });
  });

  runBeforeEach( function () {
    controller = Smartgraphs.GraphController.create();
    controller.clear();
    controller.set('animationInfo', SC.Object.create({
      hasAnimation: YES,
      duration: 100,
      channelWidth: 15
    }));

    view = Smartgraphs.GraphView.create({
      graphController: controller
    });
    pane.append();
    pane.appendChild(view);

    // stub
    view.get('graphCanvasView')._getLogicalBounds = function() {
      return {
        xMin: 0, xMax: 1, yMin: 0, yMin: 1
      };
    };
  });

  runAfterEach( function () {
    pane.removeAllChildren();
    pane.remove();
  });


  describe("its configuration", function () {

    it("should be animatable", function () {
      expect(view.get('showAnimation')).toBeTruthy();
    });
  });


  describe("its layer", function () {

    beforeEach( function () {
      layer = view.$()[0];
    });

    it("should be found in the DOM", function () {
      expect(layer).toBeInside($('body'));
    });
  });


  describe('its animation view', function () {
    var animationView;

    runBeforeEach( function () {
      animationView = view.getPath('graphCanvasView.animationView');
    });

    it("should be defined", function () {
      expect(animationView).toBeDefined();
    });

    it("should be in the window", function () {
      expect(animationView.get('isVisibleInWindow')).toBeTruthy();
    });
  });


  describe("its child graphCanvasView", function () {

    var graphCanvasView,
        animationLayer;

    beforeEach( function () {
      graphCanvasView  = view.get('graphCanvasView');
      animationLayer   = graphCanvasView.getPath('animationView.layer');
    });

    it("should be a RaphaelCanvasView", function () {
      expect(graphCanvasView).toBeA(RaphaelViews.RaphaelCanvasView);
    });

    it("should have a layer for the animation view", function () {
      expect(animationLayer).toBeInside(graphCanvasView.get('layer'));
    });
  });


  describe("as animatable objects are added and removed from the controller", function () {

    var graphCanvasView,
        graphableDataObjects,
        animationTool = Smartgraphs.animationTool;

    beforeEach( function () {
      graphCanvasView  = view.get('graphCanvasView');
      graphableDataObjects = controller.get('graphableDataObjects');

      spyOn(graphCanvasView, '_startAnimationForDatadef').andCallThrough();

      // Add in an animation
      controller.setPath('animationInfo.animations', [{
        datadefName:        "foo",
        foregroundImageURL: "cross",
        xOffset:            0,
        yOffset:            0,
        width:              70,
        height:             30
      }]);
    });

    describe("the animationView", function () {

      var animationView,
          animationLayer,
          animationViewChildViews,
          $animationLayerChildren;

      beforeEach( function () {
        animationView           = view.getPath('graphCanvasView.animationView');
        animationLayer          = animationView.get('layer');
        animationViewChildViews = animationView.get('childViews');
      });

      describe("before any objects are added or removed from the controller", function () {

        it("should have no child elements in its layer", function () {
          expect(animationView.$().children().length).toEqual(0);
        });
      });


      describe("and an animatable ConnectedLine is added to the controller", function () {

        var connectedLine,
            connectedLineViewClass;

        runBeforeEach( function () {
          connectedLine = Smartgraphs.ConnectedLine.create({
            points: [[0,0], [1,1]],
            dataRepresentation: SC.Object.create({
              datadef: SC.Object.create({
                name: 'foo'
              })
            })
          });
          connectedLineViewClass = connectedLine.get('viewClass');
          graphableDataObjects.pushObject(connectedLine);
        });

        it("should have an animatable ConnectedLine view", function () {
          expect(connectedLineViewClass.prototype.isAnimatable).toBeTruthy();
        });

        describe("and the view is animated", function () {
          beforeEach( function () {
            view.animate();
          });

          it("should be animating", function () {
            expect(graphCanvasView._startAnimationForDatadef).toHaveBeenCalled();
          });

          describe("and the animated view should pause", function() {
            beforeEach( function () {
              view.stop();
            });

            it("should pause", function () {
              expect(graphCanvasView._animationIsPaused).toBeTruthy();
            });

            describe("and the paused animation view should reset", function() {
              beforeEach( function () {
                view.reset();
              });

              it("should reset", function () {
                expect(graphCanvasView._animationIsPaused).not.toBeTruthy();
              });
            });
          });
        });
      });
    });
  });


});
