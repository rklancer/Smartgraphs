// ==========================================================================
// Project:   Smartgraphs.RailsDataSource
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  Cribbed from
  http://wiki.sproutcore.com/Todos+07-Hooking+Up+to+the+Backend
  and
  http://github.com/knowuh/raclette

  @extends SC.DataSource
*/

sc_require('models/guide_page_sequence');
sc_require('models/guide_page');
Smartgraphs.GUIDEPAGESEQUENCE_QUERY = SC.Query.local(Smartgraphs.GuidePageSequence);
Smartgraphs.GUIDEPAGE_QUERY = SC.Query.local(Smartgraphs.GuidePage);

Smartgraphs.RailsDataSource = SC.DataSource.extend(
/** @scope Smartgraphs.RailsDataSource.prototype */
{

    _jsonGet: function(url, callback, params) {
        // replace the url with 'this'
        // so we can pass the params to notify
        params = SC.A(arguments).slice(1);
        params.unshift(this);

        var request = SC.Request.getUrl(url + '.json').header({
            'Accept': 'application/json'
        }).json();
        request.notify.apply(request, params);

        SC.Logger.log('request.address: %s', request.address);
        SC.Logger.log('request: ', request);
        request.send();
    },

    // ..........................................................
    // QUERY SUPPORT
    //
    fetch: function(store, query) {
        SC.Logger.log('Smartgraphs.RailsDataSource.fetch()');
        SC.Logger.log('query:', query);
        // if (query === Smartgraphs.GUIDEPAGESEQUENCE_QUERY) {
        if (query.containsRecordTypes(SC.Set.create([Smartgraphs.GuidePageSequence]))) {
            SC.Logger.log('query.containsRecordTypes(SC.Set.create([Smartgraphs.GuidePageSequence])) == true');
            this._jsonGet('/rails/guide_page_sequences', 'didFetchGuidePageSequences', store, query);
            SC.Logger.log("group end");

            return YES; // return YES since you handled the query
            // } else if (query === Smartgraphs.GUIDEPAGESEQUENCE_QUERY) {
        } else if (query.containsRecordTypes(SC.Set.create([Smartgraphs.GuidePage]))) {
            SC.Logger.log('query.containsRecordTypes(SC.Set.create([Smartgraphs.GuidePage])) == true');
            this._jsonGet('/rails/guide_pages', 'didFetchGuidePages', store, query);
            SC.Logger.log("group end");

            return YES; // return YES since you handled the query
        } else if (query.containsRecordTypes(SC.Set.create([Smartgraphs.DialogTurn]))) {
            SC.Logger.log('query.containsRecordTypes(SC.Set.create([Smartgraphs.DialogTurn])) == true');
            this._jsonGet('/rails/dialog_turns', 'didFetchDialogTurns', store, query);
            SC.Logger.log("group end");

            return YES; // return YES since you handled the query
        } else {
            SC.Logger.warn("NO HANDLER FOR query FOUND IN Smartgraphs.RailsDataSource.fetch(store, query) !");
            SC.Logger.log("store:", store);
            SC.Logger.log("query:", query);
        }

        SC.Logger.log("Returning NO since I did NOT handle the query");
        SC.Logger.log("group end");
        return NO; // return NO since you did NOT handle the query
    },

    didFetchGuidePageSequences: function(response, store, query) {
        SC.Logger.log('Smartgraphs.RailsDataSource.didFetchGuidePageSequences()');

        SC.Logger.log('response.status = %d', response.get('status'));
        SC.Logger.log("response: ", response);

        if (SC.ok(response)) {
            SC.Logger.log('SC.ok(response) is YES; processing content');
            var content = response.get('body').content;
            SC.Logger.log('response.body.content: ', content);

            SC.Logger.log('store.loadRecords(Smartgraphs.GuidePageSequence, content)');
            store.loadRecords(Smartgraphs.GuidePageSequence, content);
            SC.Logger.log("group end");

            SC.Logger.log("didFetchGuidePageSequences: calling store.dataSourceDidFetchQuery(query)");
            store.dataSourceDidFetchQuery(query);
            SC.Logger.log("group end");
            SC.Logger.log("group end");
        }
        else {
            store.dataSourceDidErrorQuery(query, response);
        }

        SC.Logger.log("group end");
    },

    didFetchGuidePages: function(response, store, query) {
        SC.Logger.log('Smartgraphs.RailsDataSource.didFetchGuidePages()');

        SC.Logger.log('response.status = %d', response.get('status'));
        SC.Logger.log("response: ", response);

        if (SC.ok(response)) {
            SC.Logger.log('SC.ok(response) is YES; processing content');
            var content = response.get('body').content;
            SC.Logger.log('response.body.content: ', content);
            SC.Logger.log('content.isSCArray: ', content.isSCArray);
            SC.Logger.log('content.length:', content.length);
            SC.Logger.log('content.objectAt(0):', content.objectAt(0));
            SC.Logger.log('content.objectAt(0).title:', content.objectAt(0).title);

            SC.Logger.log('store.loadRecords(Smartgraphs.GuidePage, content)');
            var resultingStoreKeysArray = store.loadRecords(Smartgraphs.GuidePage, content);
            SC.Logger.log('resultingStoreKeysArray:', resultingStoreKeysArray);
            SC.Logger.log("group end");

            SC.Logger.log("didFetchGuidePages: calling store.dataSourceDidFetchQuery(query)");
            store.dataSourceDidFetchQuery(query);
            SC.Logger.log("store.dataSourceDidFetchQuery(query) is done");
            // Setting the guide_pages array to guidePageSequenceController.sequence 
            SC.Logger.log("group end");
        }
        else {
            store.dataSourceDidErrorQuery(query, response);
        }

        SC.Logger.log("group end");
    },

    didFetchDialogTurns: function(response, store, query) {
        SC.Logger.log('Smartgraphs.RailsDataSource.didFetchDialogTurns()');

        SC.Logger.log('response.status = %d', response.get('status'));
        SC.Logger.log("response: ", response);

        if (SC.ok(response)) {
            SC.Logger.log('**************SC.ok(response) is YES; TODO: processing content');

            var content = response.get('body').content;
            SC.Logger.log('response.body.content: ', content);
            SC.Logger.log('content.isSCArray: ', content.isSCArray);
            SC.Logger.log('content.length:', content.length);
            SC.Logger.log('content.objectAt(0):', content.objectAt(0));
            SC.Logger.log('content.objectAt(0).title:', content.objectAt(0).title);
        }
        else {
            store.dataSourceDidErrorQuery(query, response);
        }

        SC.Logger.log("group end");
    },

    // ..........................................................
    // RECORD SUPPORT
    //
    retrieveRecord: function(store, storeKey) {
        SC.Logger.log('Smartgraphs.RailsDataSource.retrieveRecord');
        // guid will be rails url e.g. /rails/dialog_turns/1
        var guid = store.idFor(storeKey);
        SC.Logger.log("guid:", guid);
        SC.Logger.log("guid.toString():", guid.toString());

        this._jsonGet('rails' + guid, 'didRetrieveRecord', store, storeKey);

        return YES; // return YES if you handled the storeKey
    },

    didRetrieveRecord: function(response, store, storeKey) {
        SC.Logger.log('Smartgraphs.RailsDataSource.didRetrieveRecord(response, store, storeKey) called');
        SC.Logger.log('store:', store);
        SC.Logger.log("storeKey: ", storeKey);

        SC.Logger.log('response.status = %d', response.get('status'));
        SC.Logger.log("response: ", response);

        if (SC.ok(response)) {
            SC.Logger.log('SC.ok(response) is YES; processing content');
            var content = response.get('body').content;
            SC.Logger.log('response.body.content: ', content);

            SC.Logger.log('store.dataSourceDidComplete(storeKey, content)');
            store.dataSourceDidComplete(storeKey, content);
            SC.Logger.log("group end");
        }
        else {
            store.dataSourceDidError(storeKey);
        }

        SC.Logger.log("group end");
    },

    createRecord: function(store, storeKey) {
        var recordType = store.recordTypeFor(storeKey);
        var modelName = recordType.modelName;
        var modelHash = {};
        modelHash[modelName] = store.readDataHash(storeKey);
        delete modelHash[modelName]['guid']; // remove guid property before sending to rails
        SC.Logger.log('Smartgraphs.RailsDataSource.createRecord()');
        SC.Request.postUrl('/rails/' + recordType.modelsName).header({
            'Accept': 'application/json'
        }).json()

        .notify(this, this.didCreateRecord, store, storeKey).send(modelHash);
        SC.Logger.log("group end");
        return YES;
    },

    didCreateRecord: function(response, store, storeKey) {
        if (SC.ok(response)) {
            // Adapted from parseUri 1.2.2
            // (c) Steven Levithan <stevenlevithan.com>
            // MIT License
            var parser = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
            var url = parser.exec(response.header('Location'))[8];
            store.dataSourceDidComplete(storeKey, null, url); // update url
        }
        else {
            store.dataSourceDidError(storeKey, response);
        }
    },

    updateRecord: function(store, storeKey) {

        // TODO: Add handlers to submit modified record to the data source
        // call store.dataSourceDidComplete(storeKey) when done.
        return NO; // return YES if you handled the storeKey
    },

    destroyRecord: function(store, storeKey) {

        // TODO: Add handlers to destroy records on the data source.
        // call store.dataSourceDidDestroy(storeKey) when done
        return NO; // return YES if you handled the storeKey
    }

});

Smartgraphs.dataSource = Smartgraphs.RailsDataSource.create();
SC.Logger.log("Smartgraphs.dataSource:", Smartgraphs.dataSource);
