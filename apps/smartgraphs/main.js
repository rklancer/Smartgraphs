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
    console.log("var theSequence = Smartgraphs.store.find(Smartgraphs.GuidePageSequence, 'sequence-1');");
    var theSequence = Smartgraphs.store.find(Smartgraphs.GuidePageSequence, 'sequence-1');
    console.log("theSequence:", theSequence);
    // 
    // the following works as desired because the guide_page_sequences RecordArray is updated by the data store when the 
    // data source calls Smartgraphs.store.loadRecords() in the XMLHttpRequest callback. The guide_page_sequencesController observes
    // this property, and updates its 'selection' property appropriately; and the activityController observes that...
    if (theSequence) {
        Smartgraphs.guidePageSequenceController.set('sequence', theSequence);
    }

    console.log("group end");
    // main()
};

function main() {
    Smartgraphs.main();
}
