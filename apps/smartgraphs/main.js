// ==========================================================================
// Project:   Smartgraphs
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

Smartgraphs.main = function main() {
  
  Smartgraphs.dataSource = SC.CascadeDataSource.create({
    dataSources: "rails fixtures".w(),
    
    rails: Smartgraphs.RailsDataSource.create(),
    
    fixtures: SC.FixturesDataSource.create({
      simulateRemoteResponse: YES,
      latency: 500
    })
  });
  
  Smartgraphs.store = SC.Store.create().from(Smartgraphs.dataSource);
  
  // The code here will make the mainPane visible on screen.
  Smartgraphs.getPath('mainPage.mainPane').append() ;
  
  // go to the START state
  Smartgraphs.makeFirstResponder(Smartgraphs.START);

  
  // and open the first learner guide (should go into GUIDE_START state, open up guide window, and set guideController
  // to point to the Guide 'learner-guide-1')
  //Smartgraphs.sendAction('openGuide', this, { id: 'learner-guide-1' });
} ;

function main() { Smartgraphs.main(); }
