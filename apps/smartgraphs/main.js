// ==========================================================================
// Project:   Smartgraphs
// Copyright: ©2010 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

Smartgraphs.main = function main() {
  
  Smartgraphs.dataSource = SC.CascadeDataSource.create({
    dataSources: "couch fixtures".w(),
    
    // use fixtures data source to handle builtin object definitions, instead of hacking them into CouchDataSource
    couch: Smartgraphs.CouchDataSource.create(),
    fixtures: SC.FixturesDataSource.create()
  });
  Smartgraphs.store = SC.Store.create().from(Smartgraphs.dataSource);
  
  Smartgraphs.preloadFixtures();
  
  // make the mainPane visible on screen.
  Smartgraphs.getPath('mainPage.mainPane').append() ;

  // We're letting SC.route handle navigating to a particular Activity. It needs a runloop to sync up, so 
  // just reach in and set default window.location.hash for now.
  if (!window.location.hash) {
    window.location.hash = '/shared/calculated-velocity';      // default activity
  }
  
  // prevent unintended reload or back button; use 'onbeforeunload' syntax rather than $.bind just to be sure
  // there's only one handler (and $.bind doesn't really try to normalize this handler anyway)
  window.onbeforeunload = function () {
    return "You will lose your place in the activity if you leave this page.";
  };
  
  // and kick things off
  Smartgraphs.statechart.initStatechart();
} ;

// hack(?): Preload fixtures so that the any nested store is populated (nested store returns EMPTY record if record
// datahash was not loaded into the store when the nested store was created)

Smartgraphs.preloadFixtures = function () {
  for (var prop in Smartgraphs) {
    if (Smartgraphs.hasOwnProperty(prop) && Smartgraphs[prop] && Smartgraphs[prop].isClass && Smartgraphs[prop].FIXTURES) {
      Smartgraphs.store.find(Smartgraphs[prop]);
    }
  }
};

function main() { Smartgraphs.main(); }
