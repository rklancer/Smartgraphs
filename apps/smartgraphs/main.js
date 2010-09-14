// ==========================================================================
// Project:   Smartgraphs
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

Smartgraphs.main = function main() {
  
  // cascade the Rails data source in front of the fixtures data source until everything is transferred to Rails
  Smartgraphs.dataSource = SC.CascadeDataSource.create({
    dataSources: "rest fixtures".w(),
    
    rest: Smartgraphs.RestDataSource.create(),
    
    fixtures: SC.FixturesDataSource.create({
      simulateRemoteResponse: NO,
      latency: 500
    })
  });
  
  Smartgraphs.store = SC.Store.create().from(Smartgraphs.dataSource);
  
  // make the mainPane visible on screen.
  Smartgraphs.getPath('mainPage.mainPane').append() ;

  // We're letting SC.route handle navigating to a particular Activity. It needs a runloop to sync up, so 
  // just reach in and set default window.location.hash for now.
  if (!window.location.hash) {
    window.location.hash = '/backend/activity/1';      // default activity for now
  }
  
  // ... then the START state will kick things off
  Smartgraphs.makeFirstResponder(Smartgraphs.START);
  
} ;

function main() { Smartgraphs.main(); }
