// ==========================================================================
// Project:   Smartgraphs
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

Smartgraphs.main = function main() {

  // The code here will make the mainPane visible on screen.
  Smartgraphs.getPath('mainPage.mainPane').append() ;
  
  // go to the GUIDE state for now.
  Smartgraphs.makeFirstResponder(Smartgraphs.GUIDE);
} ;

function main() { Smartgraphs.main(); }
