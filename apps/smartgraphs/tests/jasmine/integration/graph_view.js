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


describe("GraphView behavior", function () {

  var pane = SC.MainPane.create(),
      controller,
      view,
      layer;

  beforeEach( function () {
    this.addMatchers({

      toBeInside: function (element) {
        if (element.jquery) element = element[0];
        return $.contains(element, this.actual);
      },

      toBeAnEarlierSiblingOf: function (element) {
        var actual;

        if (element.jquery) element = element[0];
        actual = this.actual.jquery ? this.actual[0] : this.actual;

        // Use the jquery 'next siblings' selector '~' to select element if and only if it is a sibling of actual
        // and appears after actual
        return $('#' + actual.id + ' ~ #' + element.id)[0] === element;
      }
    });
  });

  runBeforeEach( function () {
    controller = Smartgraphs.GraphController.create();
    controller.clear();
    view = Smartgraphs.GraphView.create({ graphController: controller });
    pane.append();
    pane.appendChild(view);
  });

  runAfterEach( function () {
    pane.removeAllChildren();
    pane.remove();
  });


  describe("its layer", function () {

    beforeEach( function () {
      layer = view.$()[0];
    });

    it("should be found in the DOM", function () {
      expect(layer).toBeInside($('body'));
    });
  });


  describe('its title view', function () {
    var titleView;

    runBeforeEach( function () {
      titleView = view.get('titleView');
      controller.set('title', 'the graph title');
    });

    it("should reflect the title set in the controller", function () {
      expect(titleView.$().text()).toEqual('the graph title');
    });

    it("should be in front of the canvas view", function () {
      var graphCanvasView = view.get('graphCanvasView');
      expect(graphCanvasView.$().css('zIndex')).toBeLessThan(titleView.$().css('zIndex'));
    });
  });


  describe("its child graphCanvasView", function () {

    var graphCanvasView,
        annotationsLayer,
        dataLayer;

    beforeEach( function () {
      graphCanvasView  = view.get('graphCanvasView');
      annotationsLayer = graphCanvasView.getPath('annotationsHolder.layer');
      dataLayer        = graphCanvasView.getPath('dataHolder.layer');
    });

    it("should be a RaphaelCanvasView", function () {
      expect(graphCanvasView).toBeA(RaphaelViews.RaphaelCanvasView);
    });

    it("should have a layer for the annotations holder", function () {
      expect(annotationsLayer).toBeInside(graphCanvasView.get('layer'));
    });

    it("should have a layer for the data holder", function () {
      expect(dataLayer).toBeInside(graphCanvasView.get('layer'));
    });

    it("should put the data holder 'behind' (as an earlier sibling of) the annotation layer", function () {
      expect(dataLayer).toBeAnEarlierSiblingOf(annotationsLayer);
    });
  });


  describe("as graphable objects are added and removed from the controller", function () {

    var graphableDataObjects;

    beforeEach( function () {
      graphableDataObjects = controller.get('graphableDataObjects');
    });

    describe("the dataHolder", function () {

      var dataHolder,
          dataLayer,
          dataHolderChildViews,
          $dataLayerChildren;

      beforeEach( function () {
        dataHolder           = view.getPath('graphCanvasView.dataHolder');
        dataLayer            = dataHolder.get('layer');
        dataHolderChildViews = dataHolder.get('childViews');
      });

      describe("before any objects are added or removed from the controller", function () {

        it("should have no child elements in its layer", function () {
          expect(dataHolder.$().children().length).toEqual(0);
        });
      });


      describe("after a Pointset is added to the controller", function () {

        var pointset,
            pointsetViewClass;

        runBeforeEach( function () {
          pointset = Smartgraphs.Pointset.create();
          pointsetViewClass = pointset.get('viewClass');
          graphableDataObjects.pushObject(pointset);
        });

        it("should have one child view", function () {
          expect(dataHolderChildViews.get('length')).toEqual(1);
        });

        it("should have one element in its layer", function () {
          expect(dataHolder.$().children().length).toEqual(1);
        });

        describe("the child view", function () {

          it("should be the correct view class for a Pointset", function () {
            var childView = dataHolderChildViews.objectAt(0);
            expect(childView).toBeA(pointsetViewClass);
          });
        });


        describe("and the controllers' graphable object list is replaced with another, empty list", function () {

          runBeforeEach( function () {
            controller.set('graphableDataObjects', []);
          });

          it("should have no child views", function () {
            expect(dataHolderChildViews.get('length')).toEqual(0);
          });
        });


        describe("and a ConnectedLine is added to the controller", function () {

          var connectedLine,
              connectedLineViewClass;

          runBeforeEach( function () {
            connectedLine = Smartgraphs.ConnectedLine.create();
            connectedLineViewClass = connectedLine.get('viewClass');
            graphableDataObjects.pushObject(connectedLine);
          });

          it("should have two child views", function () {
            expect(dataHolderChildViews.get('length')).toEqual(2);
          });

          it("should have two elements in its layer", function () {
            expect(dataHolder.$().children().length).toEqual(2);
          });

          describe("the second child view", function () {

            it("should be the correct view class for a ConnectedLine", function () {
              var childView = dataHolderChildViews.objectAt(1);
              expect(childView).toBeA(connectedLineViewClass);
            });
          });


          describe("and the Pointset is removed from the controller", function () {

            runBeforeEach( function () {
              graphableDataObjects.removeObject(pointset);
            });

            it("should have only one child view", function () {
              expect(dataHolderChildViews.get('length')).toEqual(1);
            });

            it("should have one element in its layer", function () {
              expect(dataHolder.$().children().length).toEqual(1);
            });

            describe("the child view", function () {

              it("should be a ConnectedLine view", function () {
                var childView = dataHolderChildViews.objectAt(0);
                expect(childView).toBeA(connectedLineViewClass);
              });
            });


            describe("and the ConnectedLine is removed from the controller", function () {

              runBeforeEach( function () {
                graphableDataObjects.removeObject(connectedLine);
              });

              it("should have no child views", function () {
                expect(dataHolderChildViews.get('length')).toEqual(0);
              });

              it("should have no elements in its layer", function () {
                expect(dataHolder.$().children().length).toEqual(0);
              });
            });
          });

        });

      });
    });

  });


  xdescribe("as annotations are added and removed from the controller");


  describe("its y axis view", function () {
    //TODO
  });


  describe("its y axis view", function () {
    //TODO
  });


  describe("its 'input area' view", function () {

    var inputAreaView,
        inputAreaLayer,
        inputAreaOffset,
        inputAreaLeftEdge,
        inputAreaTopEdge;

    beforeEach( function () {
      inputAreaView     = view.get('inputAreaView');
      inputAreaLayer    = inputAreaView.get('layer');
      inputAreaOffset   = inputAreaView.$().offset();
      inputAreaLeftEdge = inputAreaOffset.left;
      inputAreaTopEdge  = inputAreaOffset.top;

      spyOn(view, 'pointForCoordinates').andReturn({x: 1, y: 2});

      spyOn(controller, 'inputAreaMouseDown').andReturn(YES);
      spyOn(controller, 'inputAreaMouseDragged').andReturn(YES);
      spyOn(controller, 'inputAreaMouseUp').andReturn(YES);
    });

    describe("when the user clicks the mouse on the input area", function () {

      beforeEach( function () {
        fireEvent(inputAreaLayer, 'mousedown', 10, 10);
      });

      it("should send the x and y coordinates of the click to pointForCoordinates", function () {
        expect(view.pointForCoordinates).toHaveBeenCalledWith(10 + inputAreaLeftEdge, 10 + inputAreaTopEdge);
      });

      it("should send an inputAreaMouseDown event with the translated coordinates to the graph controller", function () {
        expect(controller.inputAreaMouseDown).toHaveBeenCalledWith(1, 2);
      });

      describe("and the user moves the mouse on the input area", function () {

        beforeEach( function ()  {
          fireEvent(inputAreaLayer, 'mousemove', 20, 20);
        });

        it("should send the x and y coordinates of the drag to pointForCoordinates", function () {
          expect(view.pointForCoordinates).toHaveBeenCalledWith(20 + inputAreaLeftEdge, 20 + inputAreaTopEdge);
        });

        it("should send an inputAreaMouseDragged event with the translated coordinates to the graph controller", function () {
          expect(controller.inputAreaMouseDragged).toHaveBeenCalledWith(1, 2);
        });
      });

      describe("and the user releases the mouse (mouseup) on the input area", function () {

        beforeEach( function () {
          fireEvent(inputAreaLayer, 'mouseup', 30, 30);
        });

        it("should send the x and y coordinates of the mouseup to pointForCoordinates", function () {
          expect(view.pointForCoordinates).toHaveBeenCalledWith(30 + inputAreaLeftEdge, 30 + inputAreaTopEdge);
        });

        it("should send an inputAreaMouseUp event with the translated coordinates to the graph controller", function () {
          expect(controller.inputAreaMouseUp).toHaveBeenCalledWith(1, 2);
        });


        describe("and the user moves the mouse again", function () {

          beforeEach( function () {
            fireEvent(inputAreaLayer, 'mousemove', 40, 40);
          });

          it("should not send another mouseDragged event to the controller", function () {
            expect(controller.inputAreaMouseDragged).not.toHaveBeenCalled();
          });
        });
      });
    });
  });


  describe("translation between points and coordinates", function () {

    var xAxis = SC.Object.create({ min: 0, max: 1 }),
        yAxis = SC.Object.create({ min: 0, max: 10 }),
        inputAreaView,
        top,
        right,
        left,
        bottom;

    runBeforeEach( function () {
      var frame, padding, width, height;

      controller.set('xAxis', xAxis);
      controller.set('yAxis', yAxis);

      inputAreaView = view.get('inputAreaView');

      frame   = view.get('frame');
      padding = view.get('padding');

      top    = frame.y + padding.top;
      left   = frame.x + padding.left;

      width  = frame.width - padding.left - padding.right;
      height = frame.height - padding.top - padding.bottom;

      right  = left + width;
      bottom = top + height;
    });

    describe("for the lower left corner point in the graphable area", function () {

      it("pointForCoordinates should return the point (x_min, y_min)", function () {
        expect(view.pointForCoordinates(left, bottom)).toEqual({ x: 0, y: 0 });
      });

      it("coordinatesForPoint (x_min, y_min) should return the coordinate (left, bottom)", function () {
        expect(view.coordinatesForPoint(0, 0)).toEqual({x: left, y: bottom});
      });

    });

    describe("for the center point of the graphable area", function () {

      it("pointForCoordinates should return the point (x_mid, y_mid)", function () {
        expect(view.pointForCoordinates( (left+right)/2, (bottom + top)/2)).toEqual({ x: 0.5, y: 5 });
      });

      it("coordinatesForPoint (x_mid, y_mid) should return the ((top + bottom)/2, (left + right)/2) coordinate", function () {
        expect(view.coordinatesForPoint(0.5, 5)).toEqual({ x: (left + right)/2, y: (bottom + top)/2 });
      });

    });

    describe("for the upper right corner of the graphable area", function () {

      it("pointForCoordinates should return (x_max, y_max)", function () {
        expect(view.pointForCoordinates(right, top)).toEqual({ x: 1, y: 10 });
      });

      it("coordinatesForPoint (x_max, y_max) should return the (right, top) coordinate", function () {
        expect(view.coordinatesForPoint(1, 10)).toEqual({x: right, y: top});
      });

    });
  });

});
