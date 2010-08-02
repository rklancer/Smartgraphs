// ==========================================================================
// Project:   Smartgraphs
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

Smartgraphs.main = function main() {
  
  // cascade the Rails data source in front of the fixtures data source until everything is transferred to Rails
  Smartgraphs.dataSource = SC.CascadeDataSource.create({
    dataSources: "rails fixtures".w(),
    
    rails: Smartgraphs.RailsDataSource.create(),
    
    fixtures: SC.FixturesDataSource.create({
      simulateRemoteResponse: NO,
      latency: 500
    })
  });
  
  Smartgraphs.store = SC.Store.create().from(Smartgraphs.dataSource);
  
  // make the mainPane visible on screen.
  Smartgraphs.getPath('mainPage.mainPane').append() ;

  // go to the START state to kick things off
  Smartgraphs.makeFirstResponder(Smartgraphs.START);
  
  // Instead of opening a particular Guide, we'll let SC.route handle it.
  
  if (!SC.routes.get('location')) {
    SC.routes.set('location', '/backend/guide/1/motion-without-words/');      // default activity for now
  }
  
} ;

function main() { Smartgraphs.main(); }
