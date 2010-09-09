// ==========================================================================
// Project:   Smartgraphs.RestDataSource
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// @author    Kofi Weusijana <babakofi@gmail.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  Smartgraphs backend.

  @extends SC.DataSource
*/
Smartgraphs.RestDataSource = SC.DataSource.extend(
/** @scope Smartgraphs.RestDataSource.prototype */
{

  // latency for mock retrieval
  latency: 10,

  // ..........................................................
  // QUERY SUPPORT
  // 
  fetch: function(store, query) {

    var activity, listUrl, page, step;

    this.log('RestDataSource.fetch()');

    // this all suggests an obvious pattern for handling queries whose contents are fetched at listUrls

    // As we develop the backend, we need to mix mock requests and live requests.
    // Here we use the pattern that if the listUrl is null, then the backend doesn't yet return what is wanted
    // at that listUrl and we should make a mock request instead.
    // (and we must guess what listUrl should be based on the query)
    
    if (query.get('isPagesQuery')) {
      activity = query.get('parameters').activity;
      listUrl = activity.get('pageListUrl');

      var pagesQueryUrl = activity.get('id');
      this.log('  Query: pagesQuery for Activity %s', pagesQueryUrl);
      this.log('  URL endpoint for query: %s', listUrl);

      if (listUrl === null) {
        // guess what listUrl should be based on the query and make a mock request
        listUrl = pagesQueryUrl + "/pages";
        this.log('  Mock URL endpoint for query: %s', listUrl);
        this.invokeLater(this._mockRequestListFromServer, this.get('latency'), store, query, listUrl);
      } 
      else {
        this.requestListFromServer(store, query, listUrl);
      }
      this.log('  returning YES from fetch');
      return YES;
    }
    else if (query === Smartgraphs.ALL_COMMANDS_QUERY) {
      this.log('  Query: ALL_COMMANDS_QUERY');
      listUrl = Smartgraphs.activityController.get('commandListUrl');
      this.log('  URL endpoint for query: %s', listUrl);
      if (listUrl === null) {
        // guess what listUrl should be based on the query and make a mock request
        listUrl = "/backend/commands";
        this.log('  Mock URL endpoint for query: %s', listUrl);
        this.invokeLater(this._mockRequestListFromServer, this.get('latency'), store, query, listUrl);
      } else {
        this.requestListFromServer(store, query, listUrl);
      }
      return YES;
    }
    else if (query === Smartgraphs.ALL_TRIGGERS_QUERY) {
      this.log('  Query: ALL_TRIGGERS_QUERY');
      listUrl = Smartgraphs.activityController.get('triggerListUrl');
      this.log('  URL endpoint for query: %s', listUrl);
      if (listUrl === null) {
        // guess what listUrl should be based on the query and make a mock request
        listUrl = "/backend/triggers";
        this.log('  Mock URL endpoint for query: %s', listUrl);
        this.invokeLater(this._mockRequestListFromServer, this.get('latency'), store, query, listUrl);
      } else {
        this.requestListFromServer(store, query, listUrl);
      }
      return YES;
    }
    else if (query.get('isStepsQuery')) {
      page = query.get('parameters').page;
      var stepsQueryUrl = page.get('id');
      this.log('  Query: stepsQuery for ActivityPage %s', stepsQueryUrl);
      listUrl = page.get('stepListUrl');
      this.log('  URL endpoint for query: %s', listUrl);
      if (listUrl === null) {
        // guess what listUrl should be based on the query and make a mock request
        listUrl = stepsQueryUrl + "/steps";
        this.log('  Mock URL endpoint for query: %s', listUrl);
        this.invokeLater(this._mockRequestListFromServer, this.get('latency'), store, query, listUrl);
      } else {
        this.requestListFromServer(store, query, listUrl);
      }
      return YES;
    }
    else if (query.get('isTriggerResponsesQuery')) {
      step = query.get('parameters').step;
      this.log('  Query: triggerResponsesQuery for ActivityStep %s', step.get('id'));
      listUrl = step.get('triggerResponseListUrl');
      this.log('  URL endpoint for query: %s', listUrl);
      // Check to see if Triggers are implemented on the backend yet
      if (this.get('isTriggerResponsesOnBackend') ){
        this.requestListFromServer(store, query, listUrl);
      } else {
        this.log('  Mock URL endpoint for query: %s', listUrl);
        this.invokeLater(this._mockRequestListFromServer, this.get('latency'), store, query, listUrl);
      }
      return YES;
    }
    else if (query.get('isCommandInvocationsQuery')) {
      step = query.get('activityStep');
      this.log('  Query: commandInvocationsQuery for ActivityStep %s', step.get('id'));
      listUrl = step.get('commandListUrl');
      this.log('  URL endpoint for query: %s', listUrl);
      // Check to see if CommandInvocations are implemented on the backend yet
      if (this.get('isCommandInvocationsOnBackend') ){
        this.requestListFromServer(store, query, listUrl);
      } else {
        this.log('  Mock URL endpoint for query: %s', listUrl);
        this.invokeLater(this._mockRequestListFromServer, this.get('latency'), store, query, listUrl);
      }
      return YES;
    }

    return NO; // return YES if you handled the query
  },

  // ..........................................................
  // BULK RECORD SUPPORT
  //
  retrieveRecords: function(store, storeKeys, ids) {
    this.log('RestDataSource.retrieveRecords(storeKeys=%s)', storeKeys.toString());
    sc_super();
  },

  // ..........................................................
  // RECORD SUPPORT
  // 
  retrieveRecord: function(store, storeKey) {

    // TODO: Add handlers to retrieve an individual record's contents
    // call store.dataSourceDidComplete(storeKey) when done.
    var recordType = Smartgraphs.store.recordTypeFor(storeKey);

    this.log('RestDataSource.retrieveRecord()');
    this.log('  Record type requested = %s', recordType.toString());
    this.log('  id requested = %s', Smartgraphs.store.idFor(storeKey));

    if ((recordType === Smartgraphs.Activity) || recordType === Smartgraphs.ActivityPage) {
      this.requestRecordFromServer(store, storeKey);
      this.log('  returning YES from retrieveRecord');
      return YES;
    }

    return NO; // return YES if you handled the storeKey
  },

  createRecord: function(store, storeKey) {

    // TODO: Add handlers to submit new records to the data source.
    // call store.dataSourceDidComplete(storeKey) when done.
    this.log('RestDataSource.createRecord()');
    return NO; // return YES if you handled the storeKey
  },

  updateRecord: function(store, storeKey) {

    // TODO: Add handlers to submit modified record to the data source
    // call store.dataSourceDidComplete(storeKey) when done.
    this.log('RestDataSource.updateRecord()');
    return NO; // return YES if you handled the storeKey
  },

  destroyRecord: function(store, storeKey) {

    // TODO: Add handlers to destroy records on the data source.
    // call store.dataSourceDidDestroy(storeKey) when done
    this.log('RestDataSource.destroyRecord()');
    return NO; // return YES if you handled the storeKey
  },

  // ..........................................................
  // REQUEST AND RESPONSE - SINGLE RECORDS
  //
  requestRecordFromServer: function(store, storeKey) {
    // The url IS the id. As it should be.
    var url = store.idFor(storeKey);

    if (Smartgraphs.get('useMockResponses')) {
      this.invokeLater(this._mockRequestRecordFromServer, this.get('latency'), store, storeKey);
    }
    else {
      SC.Request.getUrl(url).notify(this, this.didRetrieveRecordFromServer, {
        store: store,
        storeKey: storeKey
      }).header('Accept', 'application/json').json().send();
    }
  },

  _mockRequestRecordFromServer: function(store, storeKey) {
    var url = store.idFor(storeKey);
    var response = Smartgraphs.mockResponses.hasOwnProperty(url) ? SC.Object.create({
      body: Smartgraphs.mockResponses[url]
    }) : SC.Error.create();

    this.didRetrieveRecordFromServer(response, {
      store: store,
      storeKey: storeKey
    });
  },

  didRetrieveRecordFromServer: function(response, params) {
    var store = params.store;
    var storeKey = params.storeKey;

    var recordType = Smartgraphs.store.recordTypeFor(storeKey);

    this.log('RestDataSource.didRetrieveRecordFromServer()');
    this.log('  Record type requested = %s', recordType.toString());
    this.log('  id requested = %s', Smartgraphs.store.idFor(storeKey));

    if (SC.ok(response)) {
      this.log('  ...SUCCESS');
      store.dataSourceDidComplete(storeKey, this.camelizeKeys(response.get('body')));
    }
    else {
      this.log('  ...FAILURE');
      store.dataSourceDidError(storeKey);
    }
  },

  // ..........................................................
  // REQUEST AND RESPONSE - MULTIPLE RECORDS
  //
  /** request multiple records from listUrl in order to satisfy query */

  requestListFromServer: function(store, query, listUrl) {
    if (Smartgraphs.get('useMockResponses')) {
      this.invokeLater(this._mockRequestListFromServer, this.get('latency'), store, query, listUrl);
    }
    else {
      SC.Request.getUrl(listUrl).notify(this, this.didRetrieveListFromServer, {
        store: store,
        query: query
      }).header('Accept', 'application/json').json().send();
    }
  },

  _mockRequestListFromServer: function(store, query, listUrl) {
    var response = Smartgraphs.mockResponses.hasOwnProperty(listUrl) ? SC.Object.create({
      body: Smartgraphs.mockResponses[listUrl]
    }) : SC.Error.create();
    this.didRetrieveListFromServer(response, {
      store: store,
      query: query
    });
  },

  didRetrieveListFromServer: function(response, params) {
    var store = params.store;
    var query = params.query;

    var recordType = query.get('recordType');
    this.log('RestDataSource.didRetrieveListFromServer()');
    this.log('  Record type requested = %s', recordType.toString());

    if (SC.ok(response)) {
      this.log('  ...SUCCESS');
      var dataHashes = response.get('body').map(function(hash) {
        return this.camelizeKeys(hash);
      },
      this);
      store.loadRecords(recordType, dataHashes);
      store.dataSourceDidFetchQuery(query);
    }
    else {
      this.log('  ...FAILURE');
      store.dataSourceDidErrorQuery(query);
    }
  },

  // ..........................................................
  // SUPPORT
  //
  /** turn snake_cased_fields from server into JS-friendly camelCasedPropertyNames */
  camelizeKeys: function(hash) {
    var ret = {};
    for (var key in hash) {
      if (hash.hasOwnProperty(key)) {
        ret[key.camelize()] = hash[key];
      }
    }
    return ret;
  },

  log: function() {
    if (Smartgraphs.get('logDataSource')) {
      console.log.apply(console, arguments);
    }
  }

});
