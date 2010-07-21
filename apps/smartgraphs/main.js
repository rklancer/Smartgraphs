// ==========================================================================
// Project:   Smartgraphs
// Copyright: 2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

Smartgraphs.main = function main() {

    console.log('Smartgraphs.main()');

    // Step 1: Instantiate Your Views
    // The default code here will make the mainPane for your application visible
    // on screen.  If you app gets any level of complexity, you will probably
    // create multiple pages and panes.
    Smartgraphs.getPath('mainPage.mainPane').append();

    // Step 2. Set the content property on your primary controller.
    // This will make your app come alive!
    var queryConditions = "name = 'sequence-1'";
    console.log('queryConditions:', queryConditions);
    var query = SC.Query.local(Smartgraphs.GuidePageSequence, queryConditions);
    console.log('query:', query);
    var guidePageSequenceRecords = Smartgraphs.store.find(query);
    // If guidePageSequences status is immediately READY_CLEAN, then we are loading from fixtures,
    // so we can begin immediately. Otherwise, wait for guidePageSequences to be loaded from a
    // remote data source
    Smartgraphs.guidePageSequenceController.setFirstGuidePageSequenceRecord(guidePageSequenceRecords);

    console.log("group end");
    // main()
};

function main() {
    Smartgraphs.main();
}
