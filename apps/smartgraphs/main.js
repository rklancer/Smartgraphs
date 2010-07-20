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
	//
	// This did NOT work because the record wasn't READY_CLEAN yet
    // console.log("var theSequence = Smartgraphs.store.find(Smartgraphs.GuidePageSequence, 'sequence-1');");
    // var theSequence = Smartgraphs.store.find(Smartgraphs.GuidePageSequence, 'sequence-1');
    // the following works as desired because the guide_page_sequences RecordArray is updated by the data store when the 
    // data source calls Smartgraphs.store.loadRecords() in the XMLHttpRequest callback. The guide_page_sequencesController observes
    // this property, and updates its 'selection' property appropriately; and the guide_page_sequencesController observes that...
    // Smartgraphs.guidePageSequenceController.set('sequence', theSequence);
	//
    // This only worked (because the record wasn't READY_CLEAN yet) if I handle retrieved content in the datasource's code (runloop methods didn't help)
	// and I needed to use fetch so I could query for a record with a certain name (clients shouldn't have to know the magic database id number):
    // SC.RunLoop.begin();
    // console.log("var theSequence = Smartgraphs.store.find(Smartgraphs.GuidePageSequence, '/guide_page_sequences/1');");
    // var theSequence = Smartgraphs.store.find(Smartgraphs.GuidePageSequence, '/guide_page_sequences/1');
    // SC.RunLoop.end();
    // console.log("theSequence:", theSequence);
    // console.log("theSequence.statusString():", theSequence.statusString());
    // console.log("theSequence.get('name'):", theSequence.get('name'));
	//
    // This will make your app come alive (but you still have to handle fetched records in the datasource's code)!
    var queryConditions = "name = 'sequence-1'";
    console.log('queryConditions:', queryConditions);
    var query = SC.Query.local(Smartgraphs.GuidePageSequence, queryConditions);
    console.log('query:', query);
    var fetchGuidePageSequencesSuccess = Smartgraphs.dataSource.fetch(Smartgraphs.store, query);
    try {
        console.log('fetchGuidePageSequencesSuccess:', fetchGuidePageSequencesSuccess);
    } catch(e) {
        console.warn(e);
    }
    // TODO: Register with a proper listener in Smartgraphs.guidePageSequenceController
    //
    console.log("group end");
    // main()
};

function main() {
    Smartgraphs.main();
}
