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
    // if we don't set location hash, we try to load data from
    // window.authoredActivityJSON
    // window.location.hash = '/shared/gravity';      // default activity
  }

  // prevent unintended reload or back button; use 'onbeforeunload' syntax rather than $.bind just to be sure
  // there's only one handler (and $.bind doesn't really try to normalize this handler anyway)
  // This handler is removed when the activity is finished
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

//
// Send Google Analytics Data.
// TODO: The two arguments this takes are used as Action and Label; we should also
// support a Value (integer) as an optional third argument. ("key" is sent as "Action"
// and "value" is sent as "Label")
Smartgraphs.sendGaEvent = function(key,value) {
  var hash_key = "" + key + " = " + value;
  if (typeof Smartgraphs.sendGAEvent_last_hash_key === 'undefined') {
    Smartgraphs.sendGAEvent_last_hash_key = "";
  }
  // Don't send duplicate event
  if (Smartgraphs.sendGAEvent_last_hash_key === hash_key) {
    return;
  }
  Smartgraphs.sendGAEvent_last_hash_key = hash_key;
  if (!!_gaq && window.location.hostname !== 'localhost') {
    _gaq.push(["_trackEvent", "SmartGraphs Activities", key, value]);
    console.log("sent analytics %s", hash_key);
  }
  else if (window.location.hostname === 'localhost') {
    console.log("Didn't send analytics: running on localhost. Would have sent %s", hash_key);
  } else if (!_gaq) {
    console.log("Didn't send analytics: _gaq not defined. Would have sent %s", hash_key);
  } else {
    console.log("Couldn't send analytics: unsure why. Would have sent %s", hash_key);
  }
};

function main() { Smartgraphs.main(); }
