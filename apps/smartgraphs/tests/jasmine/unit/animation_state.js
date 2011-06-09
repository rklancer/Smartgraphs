/*globals Smartgraphs RaphaelViews describe it expect xit xdescribe beforeEach afterEach spyOn runs waits waitsFor 
 clickOn fillIn defineJasmineHelpers runBeforeEach runAfterEach */

describe("ANIMATION_TOOL state", function () {
  
  var statechart,
      state,
      owner,
      animationTool;
  
  beforeEach( function () {
    animationTool = Smartgraphs.animationTool;
    animationTool.graphPane = SC.Object.create({
      graphView: SC.Object.create({
        animate: function() { return YES; },
        stop:    function() { return YES; },
        reset:   function() { return YES; }
      })
    });
    spyOn(animationTool.graphPane.graphView, 'animate');
    spyOn(animationTool.graphPane.graphView, 'stop');
    spyOn(animationTool.graphPane.graphView, 'reset');
    
    statechart = SC.Statechart.create({
      rootState: SC.State.design({
        initialSubstate: 'ANIMATION_TOOL',
        ANIMATION_TOOL: SC.State.plugin('Smartgraphs.ANIMATION_TOOL')
      })
    });
    
    statechart.initStatechart();
    owner = SC.Object.create();
    statechart.set('owner', owner);    
    state = statechart.getState('ANIMATION_TOOL');
  });
  
  it("should exist", function () {
    expect(state).toBeDefined();
  });
  
  it("should start in the ANIMATION_CLEARED substate", function () {
    expect(state.get('currentSubstates').getEach('name')).toEqual(['ANIMATION_CLEARED']);
  });
  
//   describe("its NO_LABEL substate", function () {
//     
//     beforeEach( function () {
//       state = statechart.getState('NO_LABEL');
//       spyOn(state, 'gotoState');      
//     });
//     
//     describe('mouseDownAtPoint handler', function () {
// 
//       it("should exist", function () {
//         spyOn(state, 'mouseDownAtPoint'); 
//         statechart.sendAction('mouseDownAtPoint', 'the action context', 'the action args');
//         expect(state.mouseDownAtPoint).toHaveBeenCalledWith('the action context', 'the action args');
//       });
//       
//       describe("interaction with labelTool object", function () {
// 
//         describe("when the labelTool methods return YES", function () {
// 
//           var labelAnnotation;
//         
//           beforeEach( function () {
//             labelAnnotation = SC.Object.create(); 
//           
//             spyOn(labelTool, 'createLabel').andReturn(labelAnnotation);  
//             spyOn(labelTool, 'addLabelToController').andReturn(YES);                    
//             state.mouseDownAtPoint('the action context', {x: 1, y: 2});
//           }); 
//     
//           it("should ask the labelTool to create a new label annotation with the specified name and coordinates", function () {
//             expect(labelTool.createLabel).toHaveBeenCalledWith('the label name', 1, 2);
//           });
//       
//           it("should ask the labelTool to add the label to the owner", function () {
//             expect(labelTool.addLabelToController).toHaveBeenCalledWith(owner, labelAnnotation);
//           });
//         
//           it("should set its 'label' property to the new label", function () {
//             expect(state.get('label')).toEqual(labelAnnotation);
//           });
//         
//           it("should go to to the LABEL_CREATED state", function () {
//             expect(state.gotoState).toHaveBeenCalledWith('LABEL_CREATED');
//           });
//         });
//         
//       
//         describe("when the methods return NO", function () {
//         
//           beforeEach( function () {
//             state.set('label', 'the original label object');
//           });
//         
//           describe("when the createLabel method returns NO", function () {
//         
//             beforeEach( function () {
//               spyOn(labelTool, 'createLabel').andReturn(NO);
//               state.mouseDownAtPoint('the action context', {x: 1, y: 2});
//             });
//         
//             it("should not reset its label property", function () {
//               expect(state.get('label')).toEqual('the original label object');
//             });
//         
//             it("should not go to the LABEL_CREATED state", function () {
//               expect(state.gotoState).not.toHaveBeenCalled();
//             });
// 
//           });
//         });
//       });
//     });
//   });
//   
//   describe("its LABEL_CREATED substate", function () {
//   });
  
});
