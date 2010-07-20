// ==========================================================================
// Project:   Smartgraphs.guideStepController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Smartgraphs.guideStepController = SC.ObjectController.create(
/** @scope Smartgraphs.guideStepController.prototype */ {

  contentBinding: 'Smartgraphs.guidePageController.currentStep',

  /**
    initialize the GuideStep. Called when we enter GUIDE_STEP_START state
  */
  initStep: function () {
    console.log('guideStepController.initStep()');
    
    //... do stuff ...
    
    // issue the 
    
    Smartgraphs.makeFirstResponder(Smartgraphs.GUIDE_STEP_WAITING);
  }
  
}) ;
