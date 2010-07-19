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
    // console.log("var theSequence = Smartgraphs.store.find(Smartgraphs.GuidePageSequence, 'sequence-1');");
    // var theSequence = Smartgraphs.store.find(Smartgraphs.GuidePageSequence, 'sequence-1');
	// SC.RunLoop.begin();
    console.log("var theSequence = Smartgraphs.store.find(Smartgraphs.GuidePageSequence, '/guide_page_sequences/1');");
    var theSequence = Smartgraphs.store.find(Smartgraphs.GuidePageSequence, '/guide_page_sequences/1');
	// SC.RunLoop.end();
    console.log("theSequence:", theSequence);
    console.log("theSequence.statusString():", theSequence.statusString());
    // 
    // the following works as desired because the guide_page_sequences RecordArray is updated by the data store when the 
    // data source calls Smartgraphs.store.loadRecords() in the XMLHttpRequest callback. The guide_page_sequencesController observes
    // this property, and updates its 'selection' property appropriately; and the guide_page_sequencesController observes that...
    // Smartgraphs.guidePageSequenceController.set('sequence', theSequence);
    //
    // TODO: Register with the proper listener in Smartgraphs.guidePageSequenceController

    console.log("group end");
    // main()
};

function main() {
    Smartgraphs.main();
}
