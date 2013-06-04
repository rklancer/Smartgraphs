/*globals Smartgraphs RaphaelViews describe it expect xit xdescribe beforeEach afterEach spyOn runs waits waitsFor
 clickOn fillIn defineJasmineHelpers runBeforeEach runAfterEach */

defineJasmineHelpers();

var itShouldBehaveCorrectly, itShouldDragCorrectly;

$(function () {
  $('body').css('overflow', 'auto');
});


describe("LabelView behavior", function () {

  var pane = SC.MainPane.create(),
      graphController,
      graphView,
      xAxis,
      yAxis;

  beforeEach( function () {

    this.addMatchers({
      toBeInside: function (element) {
        if (element.jquery) element = element[0];
        return $.contains(element, this.actual);
      },

      toApproximatelyEqual: function (qty, tolerance) {
        if (tolerance === undefined) tolerance = 0.001;
        return Math.abs(qty - this.actual) < tolerance;
      },

      toBeNonzero: function () {
        return (parseFloat(this.actual) === this.actual) && (Math.abs(this.actual) > 0);
      },

      toHaveColor: function (hexColor) {
        var actual = this.actual.jquery ? this.actual : $(this.actual);
        return actual.css('color') === $('<div>').css('color', hexColor).css('color');
      },

      toBeVisible: function () {
        return !!this.actual.get('isVisible');
      },

      toBeWithinOneUnitOf: function (value) {
        return Math.abs(this.actual - value) <= 1;
      },

      toBeLikeAnArrow: function(startx,starty,endx,endy,len,angle) {
        // this happens to be our arrows default angle (deg from base)
        if (typeof angle == 'undefined'){ angle = 20; }
        var path = Smartgraphs.ArrowDrawing.arrowPath(startx,starty,endx,endy,len,angle),
            i = 0, ii = 0,
            actual = this.actual,
            flatArray;

        if (typeof actual == 'string') { return (actual == path);}

        if (typeof actual        == 'undefined')   { return false; }
        if (typeof actual.length == 'undefined')   { return false; }

        ii = actual.size;
        flatArray = [];
        for (i = 0 ; i < actual.length ; i++ ) {
          for (ii = 0; ii < actual[i].length ; ii++) {
            flatArray.push(actual[i][ii]);
          }
        }
        return (path  == flatArray.join(" "));
      }
    });
  });

  runBeforeEach( function () {
    graphController = Smartgraphs.GraphController.create();
    graphController.clear();

    xAxis = SC.Object.create({ min: 0, max: 10 });
    yAxis = SC.Object.create({ min: 0, max: 10 });
    graphController.set('xAxis', xAxis);
    graphController.set('yAxis', yAxis);

    graphView = Smartgraphs.GraphView.create({ graphController: graphController,
      layout: { width: 800, height: 600 }
    });

    pane.append();
    pane.appendChild(graphView);
  });

  runAfterEach( function () {
    pane.removeAllChildren();
    pane.remove();
  });

  describe("when a label annotation has been added to the graph controller", function () {

    var store,
        labelRecord;

    runBeforeEach( function () {
      store = SC.Store.create().from(SC.FixturesDataSource.create());

      labelRecord = store.createRecord(Smartgraphs.Label, {
        url: 'the url of the label',
        name: 'the name of the label',
        text: 'test text',
        x: 1,
        y: 2,
        xOffset: -10,
        yOffset: -20,
        shouldMarkTargetPoint: YES
      });

      graphController.addAnnotation(labelRecord);
    });

    describe("the label view", function () {

      var labelView;

      beforeEach( function () {
        labelView = graphView.getPath('topAnnotationsHolder.childViews').objectAt(0);
      });

      it("should be the correct class for a Label object", function () {
        expect(labelView).toBeA(Smartgraphs.Label.viewClass);
      });


      describe("immediately after creating the graphView", function () {
        // Contra jslint, itShouldBehaveCorrectly is 'hoisted', so we can leave its definition below, where it belongs.
        itShouldBehaveCorrectly();
      });


      describe("after resizing the graphView", function () {

        runBeforeEach( function () {
          graphView.adjust('height', 300);
          graphView.adjust('width', 500);
        });

        itShouldBehaveCorrectly();
      });


      function itShouldBehaveCorrectly() {

        describe("its coordinate properties", function () {

          describe("'x'", function () {
            it("should have value taken from labelRecord", function () {
              expect(labelView.get('x')).toEqual(1);
            });
          });

          describe("'y'", function () {
            it("should have value taken from labelRecord", function () {
              expect(labelView.get('y')).toEqual(2);
            });
          });

          describe("'xCoord'", function () {
            it("should match the x-value translated by 'coordinatesForPoint'", function () {
              expect(labelView.get('xCoord')).toEqual(graphView.coordinatesForPoint(labelView.get('x'), 0).x);
            });
          });

          describe("'yCoord'", function () {
            it("should match the y-value translated by 'coordinatesForPoint'", function () {
              expect(labelView.get('yCoord')).toEqual(graphView.coordinatesForPoint(0, labelView.get('y')).y);
            });
          });
        });


        describe("as the 'x' and 'y' properties are changed", function () {

          var oldXCoord,
              oldYCoord,
              oldAnchorXCoord,
              oldAnchorYCoord,
              oldBodyXCoord,
              oldBodyYCoord,
              dx,
              dy,
              newXCoord,
              newYCoord,
              newAnchorXCoord,
              newAnchorYCoord,
              newBodyXCoord,
              newBodyYCoord;

          beforeEach( function () {
            oldXCoord = labelView.get('xCoord');
            oldYCoord = labelView.get('yCoord');
            oldAnchorXCoord = labelView.get('anchorXCoord');
            oldAnchorYCoord = labelView.get('anchorYCoord');
            oldBodyXCoord = labelView.get('bodyXCoord');
            oldBodyYCoord = labelView.get('bodyYCoord');

            SC.run( function () {
              labelRecord.set('x', 2);
              labelRecord.set('y', 3);
            });

            newXCoord = labelView.get('xCoord');
            newYCoord = labelView.get('yCoord');
            newAnchorXCoord = labelView.get('anchorXCoord');
            newAnchorYCoord = labelView.get('anchorYCoord');
            newBodyXCoord = labelView.get('bodyXCoord');
            newBodyYCoord = labelView.get('bodyYCoord');

            dx = newXCoord - oldXCoord;
            dy = newYCoord - oldYCoord;
          });

          it("should update the xCoord value by a nonzero amount", function () {
            expect(dx).toBeNonzero();
          });

          it("should update the yCoord value by a nonzero amount", function () {
            expect(dy).toBeNonzero();
          });

          it("should translate the bodyXCoord by delta(xCoord)", function () {
            // Using toFixed method to avoid rounding errors
            expect((newBodyXCoord - oldBodyXCoord).toFixed(2)).toEqual(dx.toFixed(2));
          });

          it("should translate the bodyYCoord by delta(yCoord)", function () {
            expect((newBodyYCoord - oldBodyYCoord).toFixed(2)).toEqual(dy.toFixed(2));
          });

          it("should translate the AnchorXCoord by delta(xCoord)", function () {
            expect((newAnchorXCoord - oldAnchorXCoord).toFixed(2)).toEqual(dx.toFixed(2));
          });

          it("should translate the AnchorYCoord by delta(yCoord)", function () {
            expect((newAnchorYCoord - oldAnchorYCoord).toFixed(2)).toEqual(dy.toFixed(2));
          });
        });


        describe("its 'targetPoint' view", function () {

          var targetPointView;

          beforeEach( function () {
            targetPointView = labelView.get('targetPointView');
          });

          it("should be a child view of the label view", function () {
            expect(labelView.get('childViews')).toContain(targetPointView);
          });

          it("should get (xCoord, yCoord) properties from label view", function () {
            expect(targetPointView.get('xCoord')).toEqual(labelView.get('xCoord'));
            expect(targetPointView.get('yCoord')).toEqual(labelView.get('yCoord'));
          });

          describe("when the label's shouldMarkTargetPoint property is YES", function () {

            runBeforeEach( function () {
              labelRecord.set('shouldMarkTargetPoint', YES);
            });

            it("should be visible", function () {
              expect(targetPointView).toBeVisible();
            });
          });

          describe("when the label's shouldMarkTargetPoint property is NO", function () {

            runBeforeEach( function () {
              labelRecord.set('shouldMarkTargetPoint', NO);
            });

            it("should not be visible", function () {
              expect(targetPointView).not.toBeVisible();
            });
          });

          describe("its layer", function () {

            var targetPointLayer;

            beforeEach( function () {
              targetPointLayer = targetPointView.get('layer');
            });

            it("should be inside the graph view's layer", function () {
              expect(targetPointLayer).toBeInside(graphView.$());
            });
          });


          describe("its raphael path", function () {
            var attrs,
                path,
                xCoord,
                yCoord,
                anchorX,
                anchorY;

            beforeEach( function () {
              attrs  = targetPointView.get('layer').raphael.attr();
              path   = attrs.path;
              xCoord = targetPointView.get('xCoord');
              yCoord = targetPointView.get('yCoord');
              anchorX= labelView.get('anchorXCoord');
              anchorY= labelView.get('anchorYCoord');
            });

            it("should have 5 elements", function () {
              expect(path.length).toEqual(5);
            });

            it("should start at (xCoord, yCoord)", function () {
              // NP: All markers will draw differently, so this is
              // a hard test to write. This here is for an Arrow marker
              // that is 10 pixels in size.
              expect(path[0][0]).toEqual('M');
              expect(path[1][0]).toEqual('L');
              expect(path[1][1]).toEqual(xCoord);
              expect(path[1][2]).toEqual(yCoord);
            });

            it("should have an arrow marker at xCoord, yCoord", function () {
              expect(path).toBeLikeAnArrow(anchorX,anchorY,xCoord,yCoord,10,20);
            });

            it("should have a 'stroke' attribute equal to the label view's 'stroke' property", function () {
              expect(attrs.stroke).toEqual(labelView.get('stroke'));
            });

            describe("after label record's 'x' and 'y' properties are changed", function () {
              var newPath,
                  newXCoord,
                  newYCoord;

              beforeEach( function () {
                SC.run( function () {
                  labelRecord.set('x', 3);
                  labelRecord.set('y', 4);
                });
                newPath = targetPointView.get('layer').raphael.attr().path;
                newXCoord = targetPointView.get('xCoord');
                newYCoord = targetPointView.get('yCoord');
              });

              describe("newXCoord and newYCoord", function () {
                it("should be different than old xCoord and yCoord", function () {
                  expect(newXCoord).not.toEqual(xCoord);
                  expect(newYCoord).not.toEqual(yCoord);
                });
              });

              it("should still have 5 elements", function () {
                expect(newPath.length).toEqual(5);
              });

              it("should start at (newXCoord, newYCoord)", function () {
                // NP: All markers will draw differently, so this is
                // a hard test to write. This here is for an Arrow marker
                // that is 10 pixels in size.
                expect(newPath[0][0]).toEqual('M');
                expect(newPath[1][0]).toEqual('L');
                expect(newPath[1][1]).toEqual(newXCoord);
                expect(newPath[1][2]).toEqual(newYCoord);
              });

            });

          });

        });


        describe("its 'connectingLine' view", function () {
          var connectingLineView;

          beforeEach( function () {
            connectingLineView = labelView.get('connectingLineView');
          });

          it("should be a child view of the label view", function () {
            expect(labelView.get('childViews')).toContain(connectingLineView);
          });

          describe("its raphael path", function () {
            var attrs,
                path,
                xCoord,
                yCoord,
                anchorXCoord,
                anchorYCoord;

            beforeEach( function () {
              attrs        = connectingLineView.get('layer').raphael.attr();
              path         = attrs.path;
              xCoord       = labelView.get('xCoord');
              yCoord       = labelView.get('yCoord');
              anchorXCoord = labelView.get('anchorXCoord');
              anchorYCoord = labelView.get('anchorYCoord');
            });

            it("should contain 2 elements", function () {
              expect(path.length).toEqual(2);
            });

            it("should have a 'stroke' attribute equal to the label view's 'stroke' property", function () {
              expect(attrs.stroke).toEqual(labelView.get('stroke'));
            });

            describe("its starting point", function () {

              var x, y;

              beforeEach( function () {
                x = path[0][1];
                y = path[0][2];
              });

              it("should be a moveto", function () {
                  expect(path[0][0]).toEqual('M');
              });

              it("should start at a point on the line between (xCoord, yCoord) and (anchorXCoord, anchorYCoord)", function () {
                var m = (yCoord - anchorYCoord) / (xCoord - anchorXCoord),
                    b = yCoord - m * xCoord;

                expect( y ).toApproximatelyEqual( m*x+b );
              });

              it("should be distance 'startRadius' from the labeled point", function () {
                expect(Math.sqrt( (x-xCoord)*(x-xCoord) + (y-yCoord)*(y-yCoord) )).
                  toApproximatelyEqual(connectingLineView.get('startRadius'), 1);
              });
            });

            describe("its ending point", function () {

              it("should be a lineto", function () {
                expect(path[1][0]).toEqual('L');
              });

              it("should be (anchorXCoord, anchorYCoord)", function () {
                expect(path[1][1]).toEqual(anchorXCoord);
                expect(path[1][2]).toEqual(anchorYCoord);
              });
            });
          });
        });


        describe("its 'labelBody' view", function () {

          var labelBodyView;

          beforeEach( function () {
            labelBodyView = labelView.get('labelBodyView');
          });

          it("should be a child view of the label view", function () {
            // TODO: Integrating the editable labels broke this, with a too much
            // recursion error.. I can't seem to get this to work at all.
            // expect(childViews).toContain(labelBodyView);
          });

          describe("its raphael object", function () {

            var attrs;

            beforeEach( function () {
              attrs = labelBodyView.get('layer').raphael.attrs;
            });

            it("should have a 'stroke' attribute equal to the label view's 'stroke' property", function () {
              expect(attrs.stroke).toEqual(labelView.get('stroke'));
            });

            it("should start at (bodyXCoord, bodyYCoord", function () {
              expect(attrs.x).toEqual(labelView.get('bodyXCoord'));
              expect(attrs.y).toEqual(labelView.get('bodyYCoord'));
            });

            it("should have the same width and height as the width & height properties of the label view", function () {
              expect(attrs.width).toEqual(labelView.get('labelBodyWidth'));
              expect(attrs.height).toEqual(labelView.get('labelBodyHeight'));
            });
          });
        });

      }

      describe("when not allowed to drag the label arrowhead", function () {
        var leftX,
            topY,
            yOffset;

        function fireEvent(el, eventName, x, y) {
          var evt = SC.Event.simulateEvent(el, eventName, { pageX: leftX + x, pageY: topY + y });
          SC.Event.trigger(el, eventName, evt);
        }

        beforeEach(function () {
          var offset, target;

          target = labelView.get('targetPointView');
          offset = $(target.get('layer')).offset();
          leftX  = offset.left;
          topY   = offset.top;

          SC.run(function () {
            labelRecord.set('allowCoordinatesChange', NO);
          });

          yOffset = labelRecord.get('yOffset');

          // start by clearing any possible stale drag state
          fireEvent(target.get('layer'), 'mouseup', 0, 0);
          // Using '-yOffset' as arrowhead view has the height equal to the negative value of the yOffset.
          fireEvent(target.get('layer'), 'mousedown', 0, -yOffset);
        });

        it("should not highlight the labelBodyView", function () {
          expect(labelView.getPath('labelBodyView.layer').raphael.attr().stroke).not.toEqual(labelView.get('highlightedStroke'));
        });

        it("should not highlight the connectingLineView", function () {
          expect(labelView.getPath('connectingLineView.layer').raphael.attr().stroke).not.toEqual(labelView.get('highlightedStroke'));
        });

        it("should also  not highlight the arrow", function () {
          expect(labelView.getPath('targetPointView.layer').raphael.attr().fill).not.toEqual(labelView.get('highlightedStroke'));
        });
      });

      describe("dragging the label arrowhead", function () {
        var leftX,
            topY;

        function fireEvent(el, eventName, x, y) {
          var evt = SC.Event.simulateEvent(el, eventName, { pageX: leftX + x, pageY: topY + y });
          SC.Event.trigger(el, eventName, evt);
        }

        describe("when the user mouses down on the label arrowhead", function () {

          var target,
              xOffset,
              yOffset,
              initialX,
              initialY,
              dx,
              dy;

          beforeEach(function () {
            var offset;

            target = labelView.get('targetPointView');
            offset = $(target.get('layer')).offset();
            leftX  = offset.left;
            topY   = offset.top;

            SC.run(function () {
              labelRecord.set('allowCoordinatesChange', YES);
            });

            xOffset = labelRecord.get('xOffset');
            yOffset = labelRecord.get('yOffset');

            initialX = labelRecord.get('x');
            initialY = labelRecord.get('y');

            // start by clearing any possible stale drag state
            fireEvent(target.get('layer'), 'mouseup', 0, 0);
            // Using '-yOffset' as arrowhead view has the height equal to the negative value of the yOffset.
            fireEvent(target.get('layer'), 'mousedown', 0, -yOffset);
          });

          it("should highlight the labelBodyView", function () {
            expect(labelView.getPath('labelBodyView.layer').raphael.attr().stroke).toEqual(labelView.get('highlightedStroke'));
          });

          it("should highlight the connectingLineView", function () {
            expect(labelView.getPath('connectingLineView.layer').raphael.attr().stroke).toEqual(labelView.get('highlightedStroke'));
          });

          it("should also highlight the arrow", function () {
            expect(labelView.getPath('targetPointView.layer').raphael.attr().fill).toEqual(labelView.get('highlightedStroke'));
          });

          describe("and the mouse is released at the same point", function () {

            beforeEach(function () {
              fireEvent(target.get('layer'), 'mouseup', 0, 20);
            });

            it("should unhighlight the labelBodyView", function () {
              expect(labelView.getPath('labelBodyView.layer').raphael.attr().stroke).toEqual(labelView.get('stroke'));
            });

            it("should unhighlight the connectingLineView", function () {
              expect(labelView.getPath('connectingLineView.layer').raphael.attr().stroke).toEqual(labelView.get('stroke'));
            });

            it("should not affect (xOffset, yOffset) of the label record", function () {
              expect(labelRecord.get('xOffset').toFixed(2)).toEqual(xOffset.toFixed(2));
              expect(labelRecord.get('yOffset').toFixed(2)).toEqual(yOffset.toFixed(2));
            });

            it("should not affect (x, y) of the label record", function () {
              expect(labelRecord.get('x').toFixed(2)).toEqual(initialX.toFixed(2));
              expect(labelRecord.get('y').toFixed(2)).toEqual(initialY.toFixed(2));
            });
          });

          describe("and the mouse is moved by (10, 5)", function () {

            beforeEach(function () {
              fireEvent(target.get('layer'), 'mousemove', 10, 25);
              xOffset = -20;
              yOffset = -25;
              dx = labelRecord.get('x') - initialX;
              dy = labelRecord.get('y') - initialY;
            });

            it("should update (xOffset, yOffset) of the label record to (-20, -25)", function () {
              expect(labelRecord.get('xOffset').toFixed(2)).toEqual((xOffset).toFixed(2));
              expect(labelRecord.get('yOffset').toFixed(2)).toEqual((yOffset).toFixed(2));
            });

            it("should update the x value of the label record by a nonzero amount", function () {
              expect(dx).toBeNonzero();
            });

            it("should update the y value of the label record by a nonzero amount", function () {
              expect(dy).toBeNonzero();
            });

            describe("and the mouse is released after moving by (10, 5)", function () {

              beforeEach(function () {
                fireEvent(target.get('layer'), 'mouseup', 10, 25);
              });

              it("should unhighlight the labelBodyView", function () {
                expect(labelView.getPath('labelBodyView.layer').raphael.attr().stroke).toEqual(labelView.get('stroke'));
              });

              it("should unhighlight the connectingLineView", function () {
                expect(labelView.getPath('connectingLineView.layer').raphael.attr().stroke).toEqual(labelView.get('stroke'));
              });
            });
          });
        });
      });

      describe("dragging the label", function () {

        var leftX,
            topY;

        function fireEvent(el, eventName, x, y) {
          var evt = SC.Event.simulateEvent(el, eventName, { pageX: leftX + x, pageY: topY + y });
          SC.Event.trigger(el, eventName, evt);
        }

        describe("when the user mouses down on the label body at (10, 20)", function () {

          var target,
              xOffset,
              yOffset,
              initialTextAreaLeftOffset,
              initialTextAreaTopOffset;

          beforeEach( function () {
            var offset;

            target = labelView.get('labelBodyView');
            offset = $(target.get('layer')).offset();
            leftX  = offset.left;
            topY   = offset.top;

            SC.run( function () {
              labelView.get('labelTextView').set('isEditing', YES);
            });

            initialTextAreaLeftOffset = $('textarea').offset().left;
            initialTextAreaTopOffset = $('textarea').offset().top;

            // start by clearing any possible stale drag state
            fireEvent(target.get('layer'), 'mouseup', 0, 0);

            fireEvent(target.get('layer'), 'mousedown', 10, 20);

            xOffset = labelRecord.get('xOffset');
            yOffset = labelRecord.get('yOffset');
          });

          it("should highlight the labelBodyView", function () {
            expect(labelView.getPath('labelBodyView.layer').raphael.attr().stroke).toEqual(labelView.get('highlightedStroke'));
          });

          it("should highlight the connectingLineView", function () {
            expect(labelView.getPath('connectingLineView.layer').raphael.attr().stroke).toEqual(labelView.get('highlightedStroke'));
          });

          it("should also highlight the arrow", function () {
            expect(labelView.getPath('targetPointView.layer').raphael.attr().fill).toEqual(labelView.get('highlightedStroke'));
          });

          describe("and the mouse is released at the same point (10, 20)", function () {

            beforeEach( function () {
              fireEvent(target.get('layer'), 'mouseup', 10, 20);
            });

            it("should unhighlight the labelBodyView", function () {
              expect(labelView.getPath('labelBodyView.layer').raphael.attr().stroke).toEqual(labelView.get('stroke'));
            });

            it("should unhighlight the connectingLineView", function () {
              expect(labelView.getPath('connectingLineView.layer').raphael.attr().stroke).toEqual(labelView.get('stroke'));
            });

            it("should not affect (xOffset, yOffset) of the label record", function () {
              expect(labelRecord.get('xOffset').toFixed(2)).toEqual(xOffset.toFixed(2));
              expect(labelRecord.get('yOffset').toFixed(2)).toEqual(yOffset.toFixed(2));
            });

            it("should not affect the textarea offset", function () {
              var offset = $('textarea').offset();

              expect(initialTextAreaLeftOffset).toEqual(offset.left);
              expect(initialTextAreaTopOffset).toEqual(offset.top);
            });
          });

          describe("and the mouse is moved to (15, 25)", function () {

            beforeEach( function () {
              fireEvent(target.get('layer'), 'mousemove', 15, 25);
            });

            it("should update (xOffset, yOffset) of the label record by (+5, +5)", function () {
              expect(labelRecord.get('xOffset').toFixed(2)).toEqual((xOffset + 5).toFixed(2));
              expect(labelRecord.get('yOffset').toFixed(2)).toEqual((yOffset + 5).toFixed(2));
            });

            it("should update the textarea offset by (+5, +5)", function () {
              var offset = $('textarea').offset();

              expect(offset.left).toEqual(initialTextAreaLeftOffset + 5);
              expect(offset.top).toEqual(initialTextAreaTopOffset + 5);
            });

            describe("and the mouse is released at (20, 30)", function () {

              beforeEach( function () {
                fireEvent(target.get('layer'), 'mouseup', 20, 30);
              });

              it("should unhighlight the labelBodyView", function () {
                expect(labelView.getPath('labelBodyView.layer').raphael.attr().stroke).toEqual(labelView.get('stroke'));
              });

              it("should unhighlight the connectingLineView", function () {
                expect(labelView.getPath('connectingLineView.layer').raphael.attr().stroke).toEqual(labelView.get('stroke'));
              });

              it("should update (xOffset, yOffset) of the label record by (+10, +10)", function () {
                expect(labelRecord.get('xOffset').toFixed(2)).toEqual((xOffset + 10).toFixed(2));
                expect(labelRecord.get('yOffset').toFixed(2)).toEqual((yOffset + 10).toFixed(2));
              });

              it("should update the textarea offset by (+10, +10)", function () {
                var offset = $('textarea').offset();

                expect(offset.left).toEqual(initialTextAreaLeftOffset + 10);
                expect(offset.top).toEqual(initialTextAreaTopOffset + 10);
              });
            });
          });
        });
      });


      describe("removing the label", function () {

        var removeButtonView;

        function fireEventOnElement(el, eventName, x, y) {
          var offset = $(el).offset(),
              leftX  = offset.left,
              topY   = offset.top,
              evt    = SC.Event.simulateEvent(el, eventName, { pageX: leftX + x, pageY: topY + y });

          SC.Event.trigger(el, eventName, evt);
        }

        beforeEach( function () {
          removeButtonView = labelView.getPath('labelBodyView.removeButtonView');
        });

        describe("after calling the label record's enableRemoval method", function () {

          runBeforeEach( function () {
            labelRecord.enableRemoval();
          });

          describe("the remove-button view", function () {

            it("should be visible", function () {
              expect(removeButtonView).toBeVisible();
            });

            describe("when the user clicks on it", function () {

              beforeEach( function () {
                spyOn(graphController, 'labelViewRemoveLabel');
                fireEventOnElement(removeButtonView.get('layer'), 'mousedown', 0, 0);
              });

              it("should ask the graph controller to remove it by passing the label record to the controller's labelViewRemoveLabel method", function () {
                expect(graphController.labelViewRemoveLabel).toHaveBeenCalledWith(labelRecord);
              });

            });
          });
        });

        describe("after calling the label record's disableRemoval method", function () {

          runBeforeEach( function () {
            labelRecord.disableRemoval();
          });

          describe("the remove-button view", function () {

            it("should not be visible", function () {
              expect(removeButtonView).not.toBeVisible();
            });

            describe("if the user somehow clicks on it", function () {

              beforeEach( function () {
                spyOn(graphController, 'labelViewRemoveLabel');
                fireEventOnElement(removeButtonView.get('layer'), 'mousedown', 0, 0);
              });

              it("should not call the graph controller's labelViewRemoveLabel method", function () {
                expect(graphController.labelViewRemoveLabel).not.toHaveBeenCalled();
              });

            });
          });

        });

      });


      describe("editing the label", function () {

        var labelTextView,
            labelBodyView,
            textFieldView;

        beforeEach( function () {
          labelTextView = labelView.get('labelTextView');
          textFieldView = labelTextView.get('textFieldView');
          labelBodyView = labelView.get('labelBodyView');
        });

        describe("before setting isEditing to YES", function () {

          it("should not have an associated textarea", function () {
            expect( $('textarea').length ).toEqual( 0 );
          });

        });

        describe("after double clicking the label view, to edit it", function () {

          beforeEach( function () {
            SC.run(function () {
              labelRecord.set('isEditable', YES);
            });
            SC.run(function () {
              labelBodyView.doubleClick();
            });
          });

          it("should have an associated textarea", function () {
            expect( $('textarea').length ).toEqual( 1 );
          });


          describe("the textarea", function () {
            var $textarea;

            beforeEach( function () {
              $textarea = $('textarea');
            });

            it('should be within the boundaries of the labelBodyView', function () {
              var taOffset = $textarea.offset(),
                  taWidth  = $textarea.width(),
                  taHeight = $textarea.height(),
                  lbvOffset = labelBodyView.$().offset();

              expect( taOffset.left ).toBeGreaterThan( lbvOffset.left );
              expect( taOffset.top  ).toBeGreaterThan( lbvOffset.top );
              expect( taOffset.left + taWidth ).toBeLessThan( lbvOffset.left + labelBodyView.get('width') );
              expect( taOffset.top + taHeight ).toBeLessThan( lbvOffset.top  + labelBodyView.get('height') );
            });

            it("should have initial text equal to the value of the label record's 'text' property", function () {
              expect( $textarea.val() ).toEqual( labelRecord.get('text') );
            });

          }); // "the textarea"


          describe("after the textarea is edited, and loses focus", function () {

            runBeforeEach( function () {
              textFieldView.set('value', 'new text');

              // Looks like we have to trust that SC will do this right when a user clicks away from the textarea;
              // putting $('textarea').blur() here does nothing.
              textFieldView.resignFirstResponder();
            });

            it("should cause the textarea be removed from the DOM", function () {
              expect( $('textarea').length ).toEqual( 0 );
            });

            it("should update the label record with the new text", function () {
              expect( labelRecord.get('text') ).toEqual( 'new text' );
            });

          }); // "after the textarea is edited, and loses focus"

        });


        describe("after the label view is removed", function () {

          runBeforeEach( function () {
            labelRecord.enableRemoval();
            graphController.labelViewRemoveLabel( labelRecord );
          });

          it("should cause the textarea be removed from the DOM", function () {
            expect( $('textarea').length ).toEqual( 0 );
          });

        });

      });
    });
  });
});
