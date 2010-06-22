// ==========================================================================
// Project:   Smartgraphs.RaphaelContext
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

Smartgraphs.RaphaelContext = SC.Object.extend({
  
  isRaphaelContext: YES,
  
  push: function (callback) {
  },
  
  begin: function () {
    console.log('beginning raphael context');
  },
  
  end: function () {
    console.log('ending raphael context');
  },
  
  populateCanvas: function (raphael) {
    // given a raphael canvas, actually call the callbacks that will create dom nodes using raphael.
    // use our own special sauce here to insert grouping nodes with the appropriate layer ids whenever a view has child views
    
    raphael.text(100, 100, 'prepared!');
  }
});
