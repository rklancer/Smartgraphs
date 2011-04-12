/*globals Smartgraphs RaphaelViews describe it expect xit xdescribe beforeEach afterEach spyOn runs waits waitsFor 
 clickOn fillIn defineJasmineHelpers runBeforeEach runAfterEach */
 
defineJasmineHelpers();

var itShouldBehaveCorrectly;

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
      
      labelRecord = store.createRecord(Smartgraphs.LabelAnnotation, {
        url: 'the url of the label',
        name: 'the name of the label',
        text: 'test text',
        x: 1,
        y: 2
      });
      
      graphController.addAnnotation(labelRecord);
    });
    
    describe("the label view", function () {
      
      var labelView;
      
      beforeEach( function () {
        labelView = graphView.getPath('annotationsHolder.childViews').objectAt(0);
      });
      
      it("should be the correct class for a LabelAnnotation object", function () {
        expect(labelView).toBeA(Smartgraphs.LabelAnnotation.viewClass);
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


      // describe("after setting LabelView properties", function () {
      //   
      //   runBeforeEach( function () {
      //   });
      //   
      //   itShouldBehaveCorrectly();
      // });
      
      
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


        describe("its 'focusPoint' view", function () {

          var focusPointView;

          beforeEach( function () {
            focusPointView = labelView.get('focusPointView');
          });

          it("should be a child view of the label view", function () {
            expect(labelView.get('childViews')).toContain(focusPointView);
          });

          it("should get (xCoord, yCoord) properties from label view", function () {
            expect(focusPointView.get('xCoord')).toEqual(labelView.get('xCoord'));
            expect(focusPointView.get('yCoord')).toEqual(labelView.get('yCoord'));
          });

          describe("its layer", function () {

            var focusPointLayer;

            beforeEach( function () {
              focusPointLayer = focusPointView.get('layer');
            });

            it("should be inside the graph view's layer", function () {
              expect(focusPointLayer).toBeInside(graphView.$());
            });
          });


          describe("its raphael path", function () {
            var path,
                xCoord,
                yCoord;

            beforeEach( function () {          
              path = focusPointView.get('layer').raphael.attr().path;
              xCoord = focusPointView.get('xCoord');
              yCoord = focusPointView.get('yCoord');
            });

            it("should have 4 elements", function () {
              expect(path.length).toEqual(4);
            });

            it("should start at (xCoord-4, yCoord+4)", function () {
              expect(path[0][0]).toEqual('M');
              expect(path[0][1]).toEqual(xCoord - 4);
              expect(path[0][2]).toEqual(yCoord + 4);
            });

            it("should end at (xCoord+4, yCoord-4)", function () {
              expect(path[1][0]).toEqual('L');
              expect(path[1][1]).toEqual(xCoord + 4);
              expect(path[1][2]).toEqual(yCoord - 4);
            });

            it("should start again at (xCoord-4, yCoord-4)", function () {
              expect(path[2][0]).toEqual('M');
              expect(path[2][1]).toEqual(xCoord - 4);
              expect(path[2][2]).toEqual(yCoord - 4);            
            });

            it("should finally end at (xCoord+4, yCoord+4)", function () {
              expect(path[3][0]).toEqual('L');
              expect(path[3][1]).toEqual(xCoord + 4);
              expect(path[3][2]).toEqual(yCoord + 4);            
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
                newPath = focusPointView.get('layer').raphael.attr().path;
                newXCoord = focusPointView.get('xCoord');
                newYCoord = focusPointView.get('yCoord');
              });

              describe("newXCoord and newYCoord", function () {
                it("should be different than old xCoord and yCoord", function () {
                  expect(newXCoord).not.toEqual(xCoord);
                  expect(newYCoord).not.toEqual(yCoord);
                });
              });

              it("should still have 4 elements", function () {
                expect(newPath.length).toEqual(4);
              });

              it("should start at (newXCoord-4, newYCoord+4)", function () {
                expect(newPath[0][0]).toEqual('M');
                expect(newPath[0][1]).toEqual(newXCoord - 4);
                expect(newPath[0][2]).toEqual(newYCoord + 4);
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
            var path,
                xCoord,
                yCoord,
                anchorXCoord,
                anchorYCoord;

            beforeEach( function () {          
              path = connectingLineView.get('layer').raphael.attr().path;
              xCoord = labelView.get('xCoord');
              yCoord = labelView.get('yCoord');
              anchorXCoord = labelView.get('anchorXCoord');
              anchorYCoord = labelView.get('anchorYCoord');
            });

            it("should contain 2 elements", function () {
              expect(path.length).toEqual(2);
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

              it("should be about 9 pixels from the labeled point", function () {
                expect(Math.sqrt( (x-xCoord)*(x-xCoord) + (y-yCoord)*(y-yCoord) )).toApproximatelyEqual(9, 1);
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


        describe("its 'labelOutline' view", function () {
          
          var labelOutlineView;

          beforeEach( function () {
            labelOutlineView = labelView.get('labelOutlineView');
          });

          it("should be a child view of the label view", function () {
            expect(labelView.get('childViews')).toContain(labelOutlineView);
          });

          describe("its raphael object", function () {

            var attrs;

            beforeEach( function () {
              attrs = labelOutlineView.get('layer').raphael.attrs;
            });

            it("should start at (bodyXCoord, bodyYCoord", function () {
              expect(attrs.x).toEqual(labelView.get('bodyXCoord'));
              expect(attrs.y).toEqual(labelView.get('bodyYCoord'));
            });

            it("should have the same width and height as the width & height properties of the label view", function () {
              expect(attrs.width).toEqual(labelView.get('width'));
              expect(attrs.height).toEqual(labelView.get('height'));
            });
          });
        });
        
        
        describe("its 'labelText' view", function () {
        
          var labelTextView;
          
          beforeEach( function () {
            labelTextView = labelView.get('labelTextView');
          });
          
          it("should be a child view of the *graph* view", function () {
            expect(graphView.get('childViews')).toContain(labelTextView);
          });
          
          it("should not be a RaphaelView", function () {
            expect(labelTextView).not.toBeA(RaphaelViews.RaphaelView);
          });
          
          describe("its layout", function () {
            var layout;
            
            beforeEach( function () {
              layout = labelTextView.get('layout');
            });
            
            it("should be placed 10 pixels to the right of the bodyXCoord", function () {
              expect(layout.left).toEqual(labelView.get('bodyXCoord') + 10);
            });
            
            it("should be placed 5 pixels below bodyYCoord", function () {
              expect(layout.top).toEqual(labelView.get('bodyYCoord') + 5);
            });
            
            it("should be 20 pixels narrower than the labelView", function () {
              expect(layout.width).toEqual(labelView.get('width') - 20);
            });
            
            it("should be 10 pixels shorter than the labelView", function () {
              expect(layout.height).toEqual(labelView.get('height') - 10);
            });
          });
          
          
          describe("its layer", function () {
            
            it("should have the text specified by the label record", function () {
              expect(labelTextView.$().text()).toEqual(labelRecord.get('text'));
            });
            
            it("should be in front of the graphCanvasView", function () {
              expect(labelTextView.$().css('zIndex')).toBeGreaterThan( graphView.get('graphCanvasView').$().css('zIndex'));
            });
            
          });
          
          
          describe("when its labelView is removed from the graph view's annotations holder", function () {
            
            beforeEach( function () {
              graphView.get('annotationsHolder').removeChild(labelView);
            });
            
            it("should be removed from the graphView", function () {
              expect(graphView.get('childViews')).not.toContain(labelTextView);
            });
          });

        });
        
      }
    });
  });
});
