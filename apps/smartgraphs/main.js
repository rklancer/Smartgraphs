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

  // Instead of opening a particular Guide, we'll let SC.route handle it.
  // (uncomment the below, and optionally remove the SC.route code in READY state, to open a particular guide instead)
  
  // Smartgraphs.sendAction('openGuide', this, { id: 'learner-guide-1' });
} ;

function main() { Smartgraphs.main(); }
