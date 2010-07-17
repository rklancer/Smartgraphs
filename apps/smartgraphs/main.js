// ==========================================================================
// Project:   Smartgraphs
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

Smartgraphs.main = function main() {

  // The code here will make the mainPane visible on screen.
  Smartgraphs.getPath('mainPage.mainPane').append() ;
  
  // for now...
  Smartgraphs.getPath('mainPage.mainPane.container').set('nowShowing', 'Smartgraphs.guidePage.guideView');  
} ;

function main() { Smartgraphs.main(); }
