// ==========================================================================
// Project:   Smartgraphs Unit Test
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs module test ok equals same stop start */

module("Smartgraphs.authoringController", {
  setup: function(){
    // ... perform setup code here
    console.log("setup complete for Smartgraphs.authoringController test module");
  },
  
  teardown: function(){
    // ... perform teardown code here
    console.log("teardown complete for Smartgraphs.authoringController test module");
  }
});

// .. unit tests go here
test("Check initial isAuthoring setting", function(){
  var expected = false; 
  var result = Smartgraphs.authoringController.get('isAuthoring');
  assrtn = equals(result, expected, "isAuthoring should start false");
  console.log("assrtn.results:");
  console.log(assrtn.results);
});

test("toggleAuthoring function should toggle isAuthoring boolean", function(){
  var isAuthoring1 = Smartgraphs.authoringController.get('isAuthoring');
  var toggleAuthoringResult1 = Smartgraphs.authoringController.toggleAuthoring();
  var isAuthoring2 = Smartgraphs.authoringController.get('isAuthoring');
  var toggleAuthoringResult2 = Smartgraphs.authoringController.toggleAuthoring();
  var isAuthoring3 = Smartgraphs.authoringController.get('isAuthoring');
  assrtn = equals(isAuthoring1, false, "isAuthoring should start false");
  assrtn = equals(isAuthoring1, !isAuthoring2, "isAuthoring should be true after one call to toggleAuthoring()");
  assrtn = equals(isAuthoring1, isAuthoring3, "isAuthoring should be false after two calls to toggleAuthoring()");
  console.log("assrtn.results:");
  console.log(assrtn.results);
});