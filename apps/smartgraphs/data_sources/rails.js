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

  _jsonGet: function(url, callback, params){
    // replace the url with 'this'
    // so we can pass the params to notify
    params = SC.A(arguments).slice(1);
    params.unshift(this);
    
    var request = SC.Request.getUrl(url + '.json').header({
      'Accept': 'application/json'
    }).json();
    request.notify.apply(request, params);
    
    console.log('request.address: %s', request.address);
    console.log('request: ', request);
    request.send();
  },

  // ..........................................................
  // QUERY SUPPORT
  //
  fetch: function(store, query) {
    console.log('Smartgraphs.RailsDataSource.fetch()');
    console.log('query:', query);

    if (query === Smartgraphs.GUIDEPAGESEQUENCE_QUERY) {
      console.log('query === Smartgraphs.GUIDEPAGESEQUENCE_QUERY', query);
      this._jsonGet('/rails/guide_page_sequences', 'didFetchGuidePageSequences', store, query);
      console.log("group end");

      return YES; // return YES since you handled the query
    } else if (query === Smartgraphs.GUIDEPAGE_QUERY) {
      console.log('query === Smartgraphs.GUIDEPAGE_QUERY', query);
      this._jsonGet('/rails/guide_pages', 'didFetchGuidePageSequences', store, query);
      console.log("group end");

      return YES; // return YES since you handled the query
    }

    console.log("group end");
    return NO; // return NO since you did NOT handle the query
  },

  didFetchGuidePageSequences: function(response, store, query) {
    console.log('Smartgraphs.RailsDataSource.didFetchGuidePageSequences()');

    console.log('response.status = %d', response.get('status'));
    console.log("response: ", response);

    if (SC.ok(response)) {
      console.log('SC.ok(response) is YES; processing content');
      var content = response.get('body').content;
      console.log('response.body.content: ', content);

      console.log('store.loadRecords(Smartgraphs.GuidePageSequence, content)');
      store.loadRecords(Smartgraphs.GuidePageSequence, content);
      console.log("group end");

      console.log("store.dataSourceDidFetchQuery(query)");
      store.dataSourceDidFetchQuery(query);
      console.log("group end");
    } else store.dataSourceDidErrorQuery(query, response);

    console.log("group end");
  },

  // ..........................................................
  // RECORD SUPPORT
  //
  retrieveRecord: function(store, storeKey) {
    console.log('Smartgraphs.RailsDataSource.retrieveRecord');
    // guid will be rails url e.g. /rails/dialog_turns/1
    var guid = store.idFor(storeKey);
    
    this._jsonGet(guid, 'didRetrieveRecord', store, storeKey);
    
    return YES; // return YES if you handled the storeKey
  },
  
  didRetrieveRecord: function(response, store, storeKey) {
    console.log('Smartgraphs.RailsDataSource.didRetrieveRecord()');

    console.log('response.status = %d', response.get('status'));
    console.log("response: ", response);

    if (SC.ok(response)) {
      console.log('SC.ok(response) is YES; processing content');
      var content = response.get('body').content;
      console.log('response.body.content: ', content);

      console.log('store.dataSourceDidComplete(storeKey, content)');
      store.dataSourceDidComplete(storeKey, content);
      console.log("group end");
    } else store.dataSourceDidError(storeKey);

    console.log("group end");
  },

  createRecord: function(store, storeKey) {
    var recordType = store.recordTypeFor(storeKey);
    var modelName = recordType.modelName;
    var modelHash = {};
    modelHash[modelName] = store.readDataHash(storeKey);
    delete modelHash[modelName]['guid'];    // remove guid property before sending to rails

    console.log('Smartgraphs.RailsDataSource.createRecord()');
    SC.Request.postUrl('/rails/' + recordType.modelsName).header({
                    'Accept': 'application/json'
                }).json()

          .notify(this, this.didCreateRecord, store, storeKey)
          .send(modelHash);
    console.log("group end");
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

    } else store.dataSourceDidError(storeKey, response);
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
