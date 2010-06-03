// ==========================================================================
// Project:   Smartgraphs
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

Smartgraphs.main = function main() {

  Smartgraphs.getPath('mainPage.mainPane').append() ;
  
  var theSequence = Smartgraphs.store.find(Smartgraphs.GuidePageSequence, 'sequence-1');
  Smartgraphs.guidePageSequenceController.set('sequence', theSequence);
};

function main() { Smartgraphs.main(); }
