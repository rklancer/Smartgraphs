// ==========================================================================
// Project:   Smartgraphs.guidePageController
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

/** @class
 (Document Your Controller Here)
 @extends SC.ObjectController
 */
sc_require('models/guide_page');

Smartgraphs.guidePageController = SC.ObjectController.create(
/** @scope Smartgraphs.guidePageController.prototype */
{
    contentBinding: 'Smartgraphs.guidePageSequenceController.selectedPage',

    contentDidChange: function() {
        //console.log('Smartgraphs.guidePageController observed content');
        this.invokeOnce(this._setDialogTurn);
    }.observes('content'),

    _setDialogTurn: function() {
        console.log('_setDialogTurn');
        // display the first 'line' of dialog if user hasn't been to this page before; 
        // otherwise, leave dialog state at whatever state user saw last time they were on this page
        if (SC.none(this.get('selectedDialogTurn'))) {
            this.set('selectedDialogTurn', this.get('firstDialogTurn'));
        }
    },

    setGuidePageRecordsNow: function(guidePageRecords) {
        console.log("setGuidePageRecordsNow called:");
        try {
            console.log('guidePageRecords:', guidePageRecords);
            var length = guidePageRecords.get('length');
            console.log("guidePageRecords.get('length'):", length);
            if (length > 0) {
                try {
                    console.log('guidePageRecords.objectAt(0):', guidePageRecords.objectAt(0));
                    console.log('guidePageRecords.objectAt(0).title:', guidePageRecords.objectAt(0).title);
                    console.log('guidePageRecords.objectAt(0).title.toString():', guidePageRecords.objectAt(0).title.toString());
                } catch(warning) {
                    console.warn(warning);
                }
            }
            var sequence = Smartgraphs.guidePageSequenceController.get('sequence');
            console.log("Smartgraphs.guidePageSequenceController.get('sequence'):", sequence);
            if (!sequence) {
                sequence = Smartgraphs.GuidePageSequence.create();
                sequence.set('name', "");
                Smartgraphs.guidePageSequenceController.set('sequence');
                console.warn("Had to create Smartgraphs.GuidePageSequence sequence:", sequence);
            }
            sequence.set('pages', guidePageRecords);
        } catch(e) {
            console.error(" Failed in setGuidePageRecordsNow due to error:", e);
        }
    },

    setGuidePageRecordsLater: function(guidePageRecords) {
        console.log("setGuidePageRecordsLater called:");
        try {
            var status = guidePageRecords.get('status');
            console.log(" guidePageRecords.status", status);
            if (status === SC.Record.READY_CLEAN) {
                this.setGuidePageRecordsNow(guidePageRecords);
            }
        } catch(e) {
            console.error(" Failed in setGuidePageRecordsLater due to error:", e);
        }
    },

    setGuidePageRecords: function(guidePageRecords) {
        // If guidePageRecords status is immediately READY_CLEAN, then we are loading from fixtures,
        // so we can begin immediately. Otherwise, wait for guidePageRecords to be loaded from
        // remote data source
        if (guidePageRecords.get('status') === SC.Record.READY_CLEAN) {
            console.log("guidePageRecords status is immediately READY_CLEAN");
            this.setGuidePageRecordsNow(guidePageRecords);
        } else {
            // Register an observer of status to set this.sequence.pages when the records are READY_CLEAN
            guidePageRecords.addObserver('status', this, this.setGuidePageRecordsLater, guidePageRecords);
        }
    }

});
