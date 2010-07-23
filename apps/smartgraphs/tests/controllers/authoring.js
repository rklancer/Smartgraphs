// ==========================================================================
// Project:   Smartgraphs Unit Test
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs module test ok equals same stop start */

module("Smartgraphs.authoringController", {
    setup: function() {
        // ... perform setup code here
        SC.Logger.log("setup complete for Smartgraphs.authoringController test module");
    },

    teardown: function() {
        // ... perform teardown code here
        SC.Logger.log("teardown complete for Smartgraphs.authoringController test module");
    }
});

// .. unit tests go here
test("toggleAuthoringMode function should toggle isAuthoring boolean",
function() {
    var isAuthoring1 = Smartgraphs.authoringController.get('isAuthoring');
    var toggleAuthoringModeResult1 = Smartgraphs.authoringController.toggleAuthoringMode();
    var isAuthoring2 = Smartgraphs.authoringController.get('isAuthoring');
    var toggleAuthoringModeResult2 = Smartgraphs.authoringController.toggleAuthoringMode();
    var isAuthoring3 = Smartgraphs.authoringController.get('isAuthoring');
    equals(isAuthoring1, false, "isAuthoring should start false");
    equals(isAuthoring1, !isAuthoring2, "isAuthoring should be true after one call to toggleAuthoringMode()");
    equals(isAuthoring1, isAuthoring3, "isAuthoring should be false after two calls to toggleAuthoringMode()");
});
