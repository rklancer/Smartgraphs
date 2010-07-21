// ==========================================================================
// Project:   Smartgraphs.guidePageSequenceController
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Smartgraphs.guidePageSequenceController = SC.ArrayController.create(
/** @scope Smartgraphs.guidePageSequenceController.prototype */
{

    allowsEmptySelection: NO,
    allowsMultipleSelection: NO,

    // override selectObject to allow self-bindings in guidePageSequenceController to sync...
    selectObject: function(value) {
        SC.RunLoop.begin();
        sc_super();
        SC.RunLoop.end();
    },

    // useNewGuidePageSequenceStructure: function(sequence) {
    //     if (sequence.isSCArray) {
    //         var pages = sequence;
    //         this.set('content', pages);
    // 
    //         var page1 = pages.objectAt(0);
    //         if (page1) {
    //             console.log("page1", page1);
    //             console.log("page1.get('title')", page1.get('title'));
    //             page1.set('isSelectable', true);
    //             this.set('selectedPage', page1);
    //         } else {
    //             console.error("page1:", page1);
    //         }
    //     } else {
    //         console.error("sequence.isSCArray:", sequence.isSCArray);
    //     }
    // },
    // 
    sequenceDidChange: function() {
        console.log('***! Smartgraphs.guidePageSequenceController observed sequence change');
        var sequence = this.get('sequence');
        if (sequence) {
            console.log("sequence", sequence);
            if (sequence.status) {
                try {
                    console.log("sequence.statusString():", sequence.statusString());
                } catch(e) {
                    console.log(e);
                }
            }
            var name = sequence.get('name');
            if (name) {
                console.log('sequence.name:', name);
                // Retrieve the related Guide Pages based on name (which eventually sets sequence.pages)
                var relatedGuidePagesQueryConditions = "guide_page_sequence_id = '" + name + "'";
                console.log('relatedGuidePagesQueryConditions:', relatedGuidePagesQueryConditions);
                var relatedGuidePagesQuery = SC.Query.local(Smartgraphs.GuidePage, relatedGuidePagesQueryConditions);
                console.log('relatedGuidePagesQuery:', relatedGuidePagesQuery);
                var relatedGuidePageRecords = Smartgraphs.store.find(relatedGuidePagesQuery);
                Smartgraphs.guidePageController.setGuidePageRecords(relatedGuidePageRecords);
            } else {
                console.error('sequence.name:', name);
            }
            var pages = sequence.get('pages');
            if (pages) {
                // The sequence.pages Array might not have elements yet, put sequence.pages may be set later by the data source,
                // so set this controller's content to sequence.pages and this controller with notice changes to sequence.pages
                this.set('content', pages);

                var firstPage = pages.objectAt(0);
                if (firstPage) {
                    firstPage.set('isSelectable', true);
                    this.set('selectedPage', firstPage);
                } else {
                    console.log("firstPage:", firstPage);
                    // console.log("Not using old Guide Page Sequence structure because sequence is missing the attribute firstPage.");
                    // this.useNewGuidePageSequenceStructure(sequence);
                }
            } else {
                console.log("pages:", pages);
                // console.log("Not using old Guide Page Sequence structure because sequence is missing the attribute pages.");
                // this.useNewGuidePageSequenceStructure(sequence);
            }
        } else {
            console.error("sequence:", sequence);
        }
    }.observes('sequence'),

    _sequenceStatusDidChange: function() {
        console.log('***! Smartgraphs.guidePageSequenceController observed sequence.status change');
        if (this.sequence) {
            if (this.sequence.statusString()) {
                var newStatus = this.sequence.statusString();
                if (newStatus === undefined) newStatus = "";
                console.log('newStatus:', newStatus);
                // if (newStatus.indexOf('READY') > 0) {
                //     this.sequenceDidChange();
                // }
            }
        }
    }.observes('sequence.status'),

    _contentDidChange: function() {
        console.log('***! Smartgraphs.guidePageSequenceController observed a change in content:');
        console.log(this.get('content'));
    }.observes('content'),

    selectedPage: function(key, value) {
        if (value !== undefined && value.get('isSelectable')) {
            this.selectObject(value);
        }
        return this.get('selection').toArray().objectAt(0);
    }.property('selection'),

    indexOfSelectedPage: function() {
        var selection = this.get('selection');
        var indexSet = selection.indexSetForSource(this);
        var index = indexSet ? indexSet.toArray().objectAt(0) : undefined;

        return index;
    }.property('selectedPage', 'content', '[]').cacheable(),

    previousPage: function() {
        var index = this.get('indexOfSelectedPage');

        return (index > 0) ? this.objectAt(index - 1) : null;
    }.property('selectedPage', 'content', '[]').cacheable(),

    nextPage: function() {
        var index = this.get('indexOfSelectedPage');

        return (index + 1 < this.get('length')) ? this.objectAt(index + 1) : null;
    }.property('selectedPage', 'content', '[]').cacheable(),

    isFirstPage: null,
    isFirstPageBinding: SC.Binding.bool('.previousPage').not(),

    isLastPage: null,
    isLastPageBinding: SC.Binding.bool('.nextPage').not(),

    canSelectPreviousPage: null,
    canSelectPreviousPageBinding: SC.Binding.not('.isFirstPage'),

    nextPageIsSelectable: null,
    nextPageIsSelectableBinding: '*nextPage.isSelectable',

    canSelectNextPage: function() {
        return (!this.get('isLastPage') && this.get('nextPageIsSelectable'));
    }.property('isLastPage', 'nextPageIsSelectable').cacheable(),

    selectPreviousPage: function() {
        if (this.get('canSelectPreviousPage')) {
            this.selectObject(this.get('previousPage'));
        }
    },

    selectNextPage: function() {
        if (this.get('canSelectNextPage')) {
            this.selectObject(this.get('nextPage'));
        }
    },

    setFirstGuidePageSequenceRecordNow: function(guidePageSequenceRecords) {
        console.log("setFirstGuidePageSequenceRecordNow called:");
        try {
            var length = guidePageSequenceRecords.get('length');
            console.log("guidePageSequenceRecords.get('length'):", length);
            if (length > 0) {
                var firstGuidePageSequence = guidePageSequenceRecords.objectAt(0); // Expecting only one guidePageSequence
                this.set('sequence', firstGuidePageSequence);
                return (firstGuidePageSequence === this.get('sequence')); // Let the caller know if setting the sequence succeeded
            }
        } catch(e) {
            console.error(" Failed in setFirstGuidePageSequenceRecordNow due to error:", e);
        }
        console.warn("Returning NO to let the caller know that setting the sequence failed.");
        return false; // Let the caller know that setting the sequence failed
    },

    setFirstGuidePageSequenceRecordLater: function(guidePageSequenceRecords) {
        console.log("setFirstGuidePageSequenceRecordLater called:");
        try {
            var status = guidePageSequenceRecords.get('status');
            console.log(" guidePageSequenceRecords.status", status);
            if (status === SC.Record.READY_CLEAN) {
                if (this.setFirstGuidePageSequenceRecordNow(guidePageSequenceRecords)) {
                    console.log("Setting the sequence succeeded!");
                    // Remove the observer so the record won't reset if its status changes again
                    guidePageSequenceRecords.removeObserver('status', this, this.setFirstGuidePageSequenceRecordLater);
                } else {
                    console.warn("setFirstGuidePageSequenceRecordNow(guidePageSequenceRecords) failed.");
                    console.log("guidePageSequenceRecords:", guidePageSequenceRecords);
                }
            }
        } catch(e) {
            console.error(" Failed in setFirstGuidePageSequenceRecordLater due to error:", e);
        }
    },

    setFirstGuidePageSequenceRecord: function(guidePageSequenceRecords) {
        // If guidePageSequenceRecords status is immediately READY_CLEAN, then we are loading from fixtures,
        // so we can begin immediately. Otherwise, wait for guidePageSequenceRecords to be loaded from
        // remote data source
        if (guidePageSequenceRecords.get('status') === SC.Record.READY_CLEAN) {
            console.log("guidePageSequenceRecords status is immediately READY_CLEAN");
            this.setFirstGuidePageSequenceRecordNow(guidePageSequenceRecords);
        } else {
            // Register an observer of status to set this.sequence when the record is READY_CLEAN
            guidePageSequenceRecords.addObserver('status', this, this.setFirstGuidePageSequenceRecordLater, guidePageSequenceRecords);
        }
    }

});
