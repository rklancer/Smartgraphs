/*globals Smartgraphs RaphaelViews describe it expect xit xdescribe beforeEach afterEach spyOn runs waits waitsFor
 clickOn fillIn defineJasmineHelpers runBeforeEach runAfterEach */

defineJasmineHelpers();

describe("ANIMATION_TOOL state", function () {

  var statechart,
      state,
      owner,
      animationTool,
      controller;

  beforeEach( function () {

    animationTool = Smartgraphs.animationTool;
    spyOn(animationTool, 'startAnimating');
    spyOn(animationTool, 'stopAnimating');
    spyOn(animationTool, 'clearAnimation');
    spyOn(animationTool, 'clearSetup');

    animationTool.mainPane = 'animation-tool-main-pane';

    animationTool.graphPane = SC.Object.create({
      graphView: SC.Object.create({
        animate: function() { return YES; },
        stop:    function() { return YES; },
        reset:   function() { return YES; }
      })
    });

    controller = SC.Object.create({
      showControls: function () {},
      hideControls: function () {},
      revealAllControls: function () {},
      enableClearControl: function () {},
      highlightStartControl: function () {},
      highlightStopControl: function () {},
      highlightClearControl: function () {}
    });

    spyOn(controller, 'showControls').andReturn(YES);
    spyOn(controller, 'hideControls').andReturn(YES);

    statechart = SC.Statechart.create({
      rootState: SC.State.design({
        initialSubstate: 'ANIMATION_TOOL',
        ANIMATION_TOOL: SC.State.plugin('Smartgraphs.ANIMATION_TOOL')
      })
    });

    statechart.initStatechart();
    statechart.set('owner', controller);
    state = statechart.getState('ANIMATION_TOOL');
  });

  it("should exist", function () {
    expect(state).toBeDefined();
  });

  it("should start in the OFF substate", function () {
    expect(state.get('currentSubstates').getEach('name')).toEqual(['OFF']);
  });

  describe("when turned on", function () {

    beforeEach( function () {
      spyOn(animationTool, 'graphControllerForPane').andReturn(controller);
      statechart.sendAction('animationToolStartTool');
    });

    it("should be in the ANIMATION_CLEARED substate", function () {
      expect(state.get('currentSubstates').getEach('name')).toEqual(['ANIMATION_CLEARED']);
    });

    it("should ask the animation tool to clear animation", function () {
      expect(animationTool.clearAnimation).toHaveBeenCalled();
    });

    it("should ask the graph controller to show the controls", function () {
      expect(controller.showControls).toHaveBeenCalled();
    });

    describe("when turned on", function () {
      beforeEach( function () {
        statechart.sendAction('animationToolStartTool');
      });

      it("should be in the ANIMATION_CLEARED substate", function () {
        expect(state.get('currentSubstates').getEach('name')).toEqual(['ANIMATION_CLEARED']);
      });
    });

    describe("when turned off", function () {
      beforeEach( function () {
        statechart.sendAction('stopTool');
      });

      it("should be in the OFF substate", function () {
        expect(state.get('currentSubstates').getEach('name')).toEqual(['OFF']);
      });

      it("should ask the animation tool to clear its setup", function () {
        expect(animationTool.clearSetup).toHaveBeenCalled();
      });

      it("should ask the graph controller to hide the controls", function () {
        expect(controller.hideControls).toHaveBeenCalled();
      });
    });

    describe("when start control is clicked", function () {
      beforeEach( function () {
        statechart.sendAction('startControlWasClicked');
      });

      it("should be in the ANIMATION_RUNNING substate", function () {
        expect(state.get('currentSubstates').getEach('name')).toEqual(['ANIMATION_RUNNING']);
      });

      it("should ask the animation tool to start animating", function () {
        expect(animationTool.startAnimating).toHaveBeenCalled();
      });

      describe("when turned on", function () {
        beforeEach( function () {
          statechart.sendAction('animationToolStartTool');
        });

        it("should be in the ANIMATION_RUNNING substate", function () {
          expect(state.get('currentSubstates').getEach('name')).toEqual(['ANIMATION_RUNNING']);
        });
      });

      describe("when turned off", function () {
        beforeEach( function () {
          statechart.sendAction('stopTool');
        });

        it("should be in the OFF substate", function () {
          expect(state.get('currentSubstates').getEach('name')).toEqual(['OFF']);
        });
      });

      describe("when start control is clicked", function () {
        beforeEach( function () {
          statechart.sendAction('startControlWasClicked');
        });

        it("should be in the ANIMATION_RUNNING substate", function () {
          expect(state.get('currentSubstates').getEach('name')).toEqual(['ANIMATION_RUNNING']);
        });
      });

      describe("when stop control is clicked", function () {
        beforeEach( function () {
          statechart.sendAction('stopControlWasClicked');
        });

        it("should be in the ANIMATION_STOPPED substate", function () {
          expect(state.get('currentSubstates').getEach('name')).toEqual(['ANIMATION_STOPPED']);
        });

        it("should ask the animation tool to stop animating", function () {
          expect(animationTool.stopAnimating).toHaveBeenCalled();
        });

        describe("when turned on", function () {
          beforeEach( function () {
            statechart.sendAction('animationToolStartTool');
          });

          it("should be in the ANIMATION_STOPPED substate", function () {
            expect(state.get('currentSubstates').getEach('name')).toEqual(['ANIMATION_STOPPED']);
          });
        });

        describe("when turned off", function () {
          beforeEach( function () {
            statechart.sendAction('stopTool');
          });

          it("should be in the OFF substate", function () {
            expect(state.get('currentSubstates').getEach('name')).toEqual(['OFF']);
          });
        });

        describe("when start control is clicked", function () {
          beforeEach( function () {
            statechart.sendAction('startControlWasClicked');
          });

          it("should be in the ANIMATION_RUNNING substate", function () {
            expect(state.get('currentSubstates').getEach('name')).toEqual(['ANIMATION_RUNNING']);
          });
        });

        describe("when stop control is clicked", function () {
          beforeEach( function () {
            statechart.sendAction('stopControlWasClicked');
          });

          it("should be in the ANIMATION_STOPPED substate", function () {
            expect(state.get('currentSubstates').getEach('name')).toEqual(['ANIMATION_STOPPED']);
          });
        });

        describe("when clear control is clicked", function () {
          beforeEach( function () {
            statechart.sendAction('clearControlWasClicked');
          });

          it("should be in the ANIMATION_CLEARED substate", function () {
            expect(state.get('currentSubstates').getEach('name')).toEqual(['ANIMATION_CLEARED']);
          });
        });

        describe("when animation finished", function () {
          beforeEach( function () {
            statechart.sendAction('animationFinished');
          });

          it("should be in the ANIMATION_STOPPED substate", function () {
            expect(state.get('currentSubstates').getEach('name')).toEqual(['ANIMATION_STOPPED']);
          });
        });

        describe("when graph is resized", function () {
          beforeEach( function () {
            statechart.sendAction('graphViewDidResize');
          });

          it("should be in the ANIMATION_CLEARED substate", function () {
            expect(state.get('currentSubstates').getEach('name')).toEqual(['ANIMATION_CLEARED']);
          });
        });
      });

      describe("when clear control is clicked", function () {
        beforeEach( function () {
          statechart.sendAction('clearControlWasClicked');
        });

        it("should be in the ANIMATION_RUNNING substate", function () {
          expect(state.get('currentSubstates').getEach('name')).toEqual(['ANIMATION_RUNNING']);
        });
      });

      describe("when animation finished", function () {
        beforeEach( function () {
          statechart.sendAction('animationFinished');
        });

        it("should be in the ANIMATION_FINISHED substate", function () {
          expect(state.get('currentSubstates').getEach('name')).toEqual(['ANIMATION_FINISHED']);
        });

        describe("when turned off", function () {
          beforeEach( function () {
            statechart.sendAction('stopTool');
          });

          it("should be in the OFF substate", function () {
            expect(state.get('currentSubstates').getEach('name')).toEqual(['OFF']);
          });
        });

        describe("when start control is clicked", function () {
          beforeEach( function () {
            statechart.sendAction('startControlWasClicked');
          });

          it("should be in the ANIMATION_FINISHED substate", function () {
            expect(state.get('currentSubstates').getEach('name')).toEqual(['ANIMATION_FINISHED']);
          });
        });

        describe("when stop control is clicked", function () {
          beforeEach( function () {
            statechart.sendAction('stopControlWasClicked');
          });

          it("should be in the ANIMATION_FINISHED substate", function () {
            expect(state.get('currentSubstates').getEach('name')).toEqual(['ANIMATION_FINISHED']);
          });
        });

        describe("when clear control is clicked", function () {
          beforeEach( function () {
            statechart.sendAction('clearControlWasClicked');
          });

          it("should be in the ANIMATION_CLEARED substate", function () {
            expect(state.get('currentSubstates').getEach('name')).toEqual(['ANIMATION_CLEARED']);
          });
        });

        describe("when animation finished", function () {
          beforeEach( function () {
            statechart.sendAction('animationFinished');
          });

          it("should be in the ANIMATION_FINISHED substate", function () {
            expect(state.get('currentSubstates').getEach('name')).toEqual(['ANIMATION_FINISHED']);
          });
        });

        describe("when graph is resized", function () {
          beforeEach( function () {
            statechart.sendAction('graphViewDidResize');
          });

          it("should be in the ANIMATION_CLEARED substate", function () {
            expect(state.get('currentSubstates').getEach('name')).toEqual(['ANIMATION_CLEARED']);
          });
        });
      });

      describe("when graph is resized", function () {
        beforeEach( function () {
          statechart.sendAction('graphViewDidResize');
        });

        it("should be in the ANIMATION_CLEARED substate", function () {
          expect(state.get('currentSubstates').getEach('name')).toEqual(['ANIMATION_CLEARED']);
        });
      });
    });

    describe("when stop control is clicked", function () {
      beforeEach( function () {
        statechart.sendAction('stopControlWasClicked');
      });

      it("should be in the ANIMATION_CLEARED substate", function () {
        expect(state.get('currentSubstates').getEach('name')).toEqual(['ANIMATION_CLEARED']);
      });
    });

    describe("when clear control is clicked", function () {
      beforeEach( function () {
        statechart.sendAction('clearControlWasClicked');
      });

      it("should be in the ANIMATION_CLEARED substate", function () {
        expect(state.get('currentSubstates').getEach('name')).toEqual(['ANIMATION_CLEARED']);
      });
    });

    describe("when animation finished", function () {
      beforeEach( function () {
        statechart.sendAction('animationFinished');
      });

      it("should be in the ANIMATION_CLEARED substate", function () {
        expect(state.get('currentSubstates').getEach('name')).toEqual(['ANIMATION_CLEARED']);
      });
    });

    describe("when graph is resized", function () {
      beforeEach( function () {
        statechart.sendAction('graphViewDidResize');
      });

      it("should be in the ANIMATION_CLEARED substate", function () {
        expect(state.get('currentSubstates').getEach('name')).toEqual(['ANIMATION_CLEARED']);
      });
    });
  });

  describe("when turned off", function () {
    beforeEach( function () {
      statechart.sendAction('stopTool');
    });

    it("should be in the OFF substate", function () {
      expect(state.get('currentSubstates').getEach('name')).toEqual(['OFF']);
    });
  });

  describe("when start control is clicked", function () {
    beforeEach( function () {
      statechart.sendAction('startControlWasClicked');
    });

    it("should be in the OFF substate", function () {
      expect(state.get('currentSubstates').getEach('name')).toEqual(['OFF']);
    });
  });

  describe("when stop control is clicked", function () {
    beforeEach( function () {
      statechart.sendAction('stopControlWasClicked');
    });

    it("should be in the OFF substate", function () {
      expect(state.get('currentSubstates').getEach('name')).toEqual(['OFF']);
    });
  });

  describe("when clear control is clicked", function () {
    beforeEach( function () {
      statechart.sendAction('clearControlWasClicked');
    });

    it("should be in the OFF substate", function () {
      expect(state.get('currentSubstates').getEach('name')).toEqual(['OFF']);
    });
  });

  describe("when animation finished", function () {
    beforeEach( function () {
      statechart.sendAction('animationFinished');
    });

    it("should be in the OFF substate", function () {
      expect(state.get('currentSubstates').getEach('name')).toEqual(['OFF']);
    });
  });

  describe("when graph is resized", function () {
    beforeEach( function () {
      statechart.sendAction('graphViewDidResize');
    });

    it("should be in the OFF substate", function () {
      expect(state.get('currentSubstates').getEach('name')).toEqual(['OFF']);
    });
  });
});
