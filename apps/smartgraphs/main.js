// ==========================================================================
// Project:   Smartgraphs
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

Smartgraphs.main = function main() {

  // The code here will make the mainPane visible on screen.
  Smartgraphs.getPath('mainPage.mainPane').append() ;
  
  // go to the START state for now.
  Smartgraphs.makeFirstResponder(Smartgraphs.START);
  
  // and open the first learner guide (should go into GUIDE state, open up learner guide window, and set guideController
  // to point to the first LearnerGuide.
  Smartgraphs.sendAction('openLearnerGuide', this, { id: 1 });
} ;

function main() { Smartgraphs.main(); }
