// ==========================================================================
// Project:   Smartgraphs
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

Smartgraphs.main = function main() {

  // The code here will make the mainPane visible on screen.
  Smartgraphs.getPath('mainPage.mainPane').append() ;
  
  // go to the START state
  Smartgraphs.makeFirstResponder(Smartgraphs.START);
  
  // and open the first learner guide (should go into GUIDE_START state, open up guide window, and set guideController
  // to point to the Guide 'learner-guide-1')
  Smartgraphs.sendAction('openGuide', this, { id: 'learner-guide-1' });
} ;

function main() { Smartgraphs.main(); }
