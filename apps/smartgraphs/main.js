// ==========================================================================
// Project:   Smartgraphs
// Copyright: ©2010 Concord Consortium
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
    //  console.log("var theSequence = Smartgraphs.store.find(Smartgraphs.GuidePageSequence, 'sequence-1');");
    //  var theSequence = Smartgraphs.store.find(Smartgraphs.GuidePageSequence, 'sequence-1');
    //  console.log("theSequence:");
    //  console.log(theSequence);
    //    console.log('Calling var guide_page_sequences = Smartgraphs.store.find(Smartgraphs.GuidePageSequence); with Smartgraphs.GuidePageSequence:', Smartgraphs.GuidePageSequence);
    //    var guide_page_sequences = Smartgraphs.store.find(Smartgraphs.GuidePageSequence);
    // console.log("loading guide_page_sequences with dataSource:", Smartgraphs.dataSource);
    // var guide_page_sequences = Smartgraphs.dataSource.fetch(Smartgraphs.store, Smartgraphs.GUIDEPAGESEQUENCE_QUERY);
    // 
    // console.log('guide_page_sequences: ', guide_page_sequences);
    // console.log('guide_page_sequences.toString(): ', guide_page_sequences.toString());
    // console.log('guide_page_sequences.length: ', guide_page_sequences.get('length'));
    //
    // Tried using find (as in Raclette) here but it would fail to call fetch in the data source (rails,js)
    // even when using "commitRecordsAutomatically: YES" while creating the store in core.js
    // console.log("* Calling var guide_pages = store.find(Smartgraphs.GuidePage);");
    // var guide_pages = Smartgraphs.store.find(Smartgraphs.GuidePage);
    // console.log('* guide_pages:', guide_pages);
    // console.log('* guide_pages.objectAt(0):', guide_pages.objectAt(0));
    //
    // What works is explicitly calling fetch and setting the sequence on the guidePageSequenceController inside the rails datasource code
    console.log("loading guide_pages with dataSource:", Smartgraphs.dataSource);
    var fetchResult = Smartgraphs.dataSource.fetch(Smartgraphs.store, Smartgraphs.GUIDEPAGE_QUERY);
    console.log('fetchResult: ', fetchResult);

    // The following will not work as desired because 'guide_page_sequences' is not (and could not possibly be) updated with the
    // response from the server until after the XHR callback is allowed to execute. (Unless we use synchronous XHR...)
    // Therefore 'guide_page_sequences' will always be empty in the following code, and no association will be formed between
    // the 'content' property of activityController and the guide_page_sequences SC.RecordArray
    // 
    // var firstActivity = guide_page_sequences.get('length') ? guide_page_sequences.objectAt(0) : null;   // popObject() returns LAST Activity
    // console.log('firstActivity:', firstActivity);
    // console.log("Smartgraphs.activityController.set('content',firstActivity)");
    // Smartgraphs.activityController.set('content',firstActivity);
    // console.log("group end");     // controller.set('content', ...)
    // 
    // the following works as desired because the guide_page_sequences RecordArray is updated by the data store when the 
    // data source calls Smartgraphs.store.loadRecords() in the XMLHttpRequest callback. The guide_page_sequencesController observes
    // this property, and updates its 'selection' property appropriately; and the activityController observes that...
    //  Smartgraphs.guidePageSequenceController.set('sequence', theSequence);
    // Smartgraphs.guidePageSequenceController.set('sequence', guide_page_sequences);
    //
    // What works is explicitly calling fetch (above) and setting the sequence on the guidePageSequenceController inside the rails datasource code
    // instead of setting it here:
    // console.log("**** Calling Smartgraphs.guidePageSequenceController.set('sequence', guide_pages);");
    // Smartgraphs.guidePageSequenceController.set('sequence', guide_pages);
    console.log("group end"); // main()
};

function main() {
    Smartgraphs.main();
}
