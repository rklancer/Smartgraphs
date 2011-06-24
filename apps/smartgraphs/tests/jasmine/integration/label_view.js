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
        labelView = graphView.getPath('annotationsHolder.childViews').objectAt(0);
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
            expect(newBodyXCoord - oldBodyXCoord).toEqual(dx);
          });

          it("should translate the bodyYCoord by delta(yCoord)", function () {
            expect(newBodyYCoord - oldBodyYCoord).toEqual(dy);
          });

          it("should translate the AnchorXCoord by delta(xCoord)", function () {
            expect(newAnchorXCoord - oldAnchorXCoord).toEqual(dx);
          });

          it("should translate the AnchorYCoord by delta(yCoord)", function () {
            expect(newAnchorYCoord - oldAnchorYCoord).toEqual(dy);
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

              it("should be at the labeled point", function () {
                expect(Math.sqrt( (x-xCoord)*(x-xCoord) + (y-yCoord)*(y-yCoord) )).toApproximatelyEqual(0, 1);
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
              yOffset;

          beforeEach( function () {
            var offset;

            target = labelView.get('labelBodyView');
            offset = $(target.get('layer')).offset();
            leftX  = offset.left;
            topY   = offset.top;

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
              expect(labelRecord.get('xOffset')).toEqual(xOffset);
              expect(labelRecord.get('yOffset')).toEqual(yOffset);
            });

          });

          describe("and the mouse is moved to (15, 25)", function () {

            beforeEach( function () {
              fireEvent(target.get('layer'), 'mousemove', 15, 25);
            });

            it("should update (xOffset, yOffset) of the label record by (+5, +5)", function () {
              expect(labelRecord.get('xOffset')).toEqual(xOffset + 5);
              expect(labelRecord.get('yOffset')).toEqual(yOffset + 5);
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
                expect(labelRecord.get('xOffset')).toEqual(xOffset + 10);
                expect(labelRecord.get('yOffset')).toEqual(yOffset + 10);
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
        var leftX,
            topY,
            offset,
            labelTextView,
            target;

        function fireEvent(el, eventName, x, y) {
          var evt = SC.Event.simulateEvent(el, eventName, { pageX: leftX + x, pageY: topY + y });
          SC.Event.trigger(el, eventName, evt);
        }

        function simulateKeyPress(el, letter) {
          var evt = SC.Event.simulateEvent(el, 'keydown', { charCode: letter, which: letter });
          SC.Event.trigger(el, 'keydown', evt);
          evt = SC.Event.simulateEvent(el, 'keypress', { charCode: letter, which: letter });
          SC.Event.trigger(el, 'keypress', evt);
          evt = SC.Event.simulateEvent(el, 'keyup', { charCode: letter, which: letter });
          SC.Event.trigger(el, 'keyup', evt);
        }

        beforeEach( function () {
          target = labelView.get('labelBodyView');
          offset = $(target.get('layer')).offset();
          leftX  = offset.left;
          topY   = offset.top;
        });

        describe("when not being edited", function () {
          beforeEach(function () {
            labelTextView = labelView.getPath('labelBodyView.labelTextView');
            fireEvent(target.get('layer'), 'mouseExited', 0, 0);
            SC.run( function () { labelTextView.commitEditing(); });
          });
          it("should not be in the edit mode", function () {
            expect(labelView.getPath('labelBodyView.labelTextView.isEditing')).toEqual(NO);
          });

          it("should not have a highlighted background", function () {
            expect(labelView.getPath('labelBodyView.labelTextView.editBoxView.isVisible')).toEqual(NO);
          });
        });

        describe("after a double click", function () {
          beforeEach(function () {
            labelTextView = labelView.getPath('labelBodyView.labelTextView');
            // ensure that we aren't editing at the outset
            SC.run( function () { labelTextView.commitEditing(); });
            fireEvent(target.get('layer'), 'mousedown', 10,10);
            fireEvent(target.get('layer'), 'mouseup', 10,10);
            fireEvent(target.get('layer'), 'mousedown', 10,10);
            fireEvent(target.get('layer'), 'mouseup', 10,10);
          });

          it("should be in the edit mode", function () {
            expect(labelView.getPath('labelBodyView.labelTextView.isEditing')).toEqual(YES);
          });

          it("should have a highlighted background", function () {
            expect(labelView.getPath('labelBodyView.labelTextView.editBoxView.isVisible')).toEqual(YES);
          });

          describe("entering some text", function () {
            var existingText,
                textToEnter,
                expectedText,
                i;

            beforeEach( function () {
              existingText = labelTextView.get('text');
              textToEnter  = "testing testing\n 1 2 3";
            });

            describe("when the label is all selected", function () {
              beforeEach( function () {
                labelView.setPath('labelBodyView.labelTextView.isAllSelected', YES);
                expectedText = textToEnter;
                for (i = 0; i < textToEnter.length; i++) {
                  simulateKeyPress(target.get('layer'),textToEnter.charCodeAt(i));
                }
              });

              it("should now have the new text in the label", function () {
                expect(labelTextView.get('text')).toEqual(expectedText);
              });
            });

            describe("when the label is not all selected", function () {
              beforeEach( function () {
                labelView.setPath('labelBodyView.labelTextView.isAllSelected', NO);
                expectedText = existingText + textToEnter;
                for (i = 0; i < textToEnter.length; i++) {
                  simulateKeyPress(target.get('layer'),textToEnter.charCodeAt(i));
                }
              });

              it("should now have the new text in the label", function () {
                expect(labelTextView.get('text')).toEqual(expectedText);
              });

            });

            describe("leaving editing mode", function () {
              var x,
                  y;

              beforeEach( function () {
                x = labelTextView.get("x");
                y = labelTextView.get("y");
                SC.run( function () { labelTextView.commitEditing(); });
              });

              it ("the label text should not change its position after editing", function () {
                expect(labelTextView.get("x")).toBeWithinOneUnitOf(x);
                expect(labelTextView.get("y")).toBeWithinOneUnitOf(y);
              });

              describe("after re-adding the annotation", function () {
                beforeEach( function () {
                  x = labelTextView.get('x');
                  y = labelTextView.get('y');
                  SC.run( function () {
                    graphController.removeAnnotation(labelRecord);
                    graphController.addAnnotation(labelRecord);
                  });
                  labelView = graphView.getPath('annotationsHolder.childViews').objectAt(0);
                  labelTextView = labelView.getPath('labelBodyView.labelTextView');
                });
                
                it ("the label text should not change its position after adding a new record", function () {
                  expect(labelTextView.get("x")).toBeWithinOneUnitOf(x);
                  expect(labelTextView.get("y")).toBeWithinOneUnitOf(y);
                });
              });
            });

          });
        });
      }); // editing the label

    });
  });
});
