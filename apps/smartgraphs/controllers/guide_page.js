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
        SC.Logger.log('Smartgraphs.guidePageController observed content change');
        this.invokeOnce(this._setDialogTurn);
    }.observes('content'),

    _setDialogTurn: function() {
        SC.Logger.log('_setDialogTurn called');
        // display the first 'line' of dialog if user hasn't been to this page before; 
        // otherwise, leave dialog state at whatever state user saw last time they were on this page
        SC.Logger.log("this.get('selectedDialogTurn'):", this.get('selectedDialogTurn'));
        if (SC.none(this.get('selectedDialogTurn'))) {
            SC.Logger.log("this.get('firstDialogTurn')", this.get('firstDialogTurn'));
            if (SC.none(this.get('firstDialogTurn'))) {
                // Find the firstDialogTurn in the store
                var firstDialogTurn_id = this.get('firstDialogTurn_id');
                if (firstDialogTurn_id) {
                    SC.Logger.log("this.get('firstDialogTurn_id')", firstDialogTurn_id);
                    var queryConditions = "name = '" + firstDialogTurn_id + "'";
                    SC.Logger.log('queryConditions:', queryConditions);
                    var query = SC.Query.local(Smartgraphs.DialogTurn, queryConditions);
                    SC.Logger.log('query:', query);
                    var dialogTurnRecords = Smartgraphs.store.find(query);
                    SC.Logger.log("dialogTurnRecords:", dialogTurnRecords);
                    Smartgraphs.dialogTurnController.setSelectedAndFirstDialogTurnRecord(dialogTurnRecords);
                } else {
                    SC.Logger.error("this.get('firstDialogTurn_id')", firstDialogTurn_id);
                }
            } else {
                this.set('selectedDialogTurn', this.get('firstDialogTurn'));
            }
        }
    },

    setGuidePageRecordsNow: function(guidePageRecords) {
        SC.Logger.log("setGuidePageRecordsNow called:");
        try {
            SC.Logger.log('guidePageRecords:', guidePageRecords);
            var length = guidePageRecords.get('length');
            SC.Logger.log("guidePageRecords.get('length'):", length);
            if (length > 0) {
                try {
                    SC.Logger.log('guidePageRecords.objectAt(0):', guidePageRecords.objectAt(0));
                    SC.Logger.log('guidePageRecords.objectAt(0).title:', guidePageRecords.objectAt(0).title);
                    SC.Logger.log('guidePageRecords.objectAt(0).title.toString():', guidePageRecords.objectAt(0).title.toString());
                } catch(warning) {
                    SC.Logger.warn(warning);
                }
            }
            var sequence = Smartgraphs.guidePageSequenceController.get('sequence');
            SC.Logger.log("Smartgraphs.guidePageSequenceController.get('sequence'):", sequence);
            if (!sequence) {
                sequence = Smartgraphs.GuidePageSequence.create();
                sequence.set('name', "");
                Smartgraphs.guidePageSequenceController.set('sequence');
                SC.Logger.warn("Had to create Smartgraphs.GuidePageSequence sequence:", sequence);
            }
            sequence.set('pages', guidePageRecords);
            // guidePageRecords will be a SC.ManyArray while sequence.pages will be a SC.RecordArray
            // so their items must be compared to each other
            var success = guidePageRecords.isEqual(sequence.get('pages'));
            if (!success) {
                SC.Logger.warn("guidePageRecords items are NOT equal to items in sequence.get('pages'):", sequence.get('pages'));
            }
            return success; // Let the caller know if setting the sequence.pages succeeded
        } catch(e) {
            SC.Logger.error(" Failed in setGuidePageRecordsNow due to error:", e);
        }
        SC.Logger.warn("Returning NO to let the caller know that setting the sequence.pages failed.");
        return false; // Let the caller know that setting the guide pages failed
    },

    setGuidePageRecordsLater: function(guidePageRecords) {
        SC.Logger.log("setGuidePageRecordsLater called:");
        try {
            var status = guidePageRecords.get('status');
            SC.Logger.log(" guidePageRecords.status", status);
            if (status === SC.Record.READY_CLEAN) {
                if (this.setGuidePageRecordsNow(guidePageRecords)) {
                    SC.Logger.log("Setting the sequence.pages succeeded!");
                    // Remove the observer so the record won't reset if its status changes again
                    guidePageRecords.removeObserver('status', this, this.setGuidePageRecordsLater);
                } else {
                    SC.Logger.warn("setGuidePageRecordsNow(guidePageRecords) failed.");
                    SC.Logger.log("guidePageRecords:", guidePageRecords);
                }
            }
        } catch(e) {
            SC.Logger.error(" Failed in setGuidePageRecordsLater due to error:", e);
        }
    },

    setGuidePageRecords: function(guidePageRecords) {
        // If guidePageRecords status is immediately READY_CLEAN, then we are loading from fixtures,
        // so we can begin immediately. Otherwise, wait for guidePageRecords to be loaded from
        // remote data source
        if (guidePageRecords.get('status') === SC.Record.READY_CLEAN) {
            SC.Logger.log("guidePageRecords status is immediately READY_CLEAN");
            this.setGuidePageRecordsNow(guidePageRecords);
        } else {
            // Register an observer of status to set this.sequence.pages when the records are READY_CLEAN
            guidePageRecords.addObserver('status', this, this.setGuidePageRecordsLater, guidePageRecords);
        }
    }

});
