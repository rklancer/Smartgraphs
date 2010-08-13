// ==========================================================================
// Project:   Smartgraphs.RailsDataSource
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  Smartgraphs backend.

  @extends SC.DataSource
*/
Smartgraphs.RailsDataSource = SC.DataSource.extend(
/** @scope Smartgraphs.RailsDataSource.prototype */ {

  // latency for mock retrieval
  
  latency: 500,
  
  // ..........................................................
  // QUERY SUPPORT
  // 

  fetch: function (store, query) {

    var activity, listUrl;

    this.log('RailsDataSourcetaSource.fetch()');
    
    if (query.get('isPagesQuery')) {
      activity = query.get('parameters').activity;
      listUrl = activity.get('pageListUrl');
      
      this.log('  Query: pagesQuery for Activity %s', activity.get('id'));
      this.log('  URL endpoint for query: %s', listUrl);
      
      this.requestListFromServer(store, query, listUrl);   
      this.log('  returning YES from fetch');
      return YES;
    }
    else if (query === Smartgraphs.ALL_COMMANDS_QUERY) {
      this.log('  Query: ALL_COMMANDS_QUERY');
      listUrl = Smartgraphs.activityController.get('commandListUrl');
      this.log('  URL endpoint for query: %s', listUrl);
      this.requestListFromServer(store, query, listUrl);  
    }
    else if (query === Smartgraphs.ALL_TRIGGERS_QUERY) {
      this.log('  Query: ALL_TRIGGERS_QUERY');
      listUrl = Smartgraphs.activityController.get('triggerListUrl');
      this.log('  URL endpoint for query: %s', listUrl);
      this.requestListFromServer(store, query, listUrl);
    }
    else if (query.get('isStepsQuery')) {
      this.log('  Query: stepsQuery for ActivityPage %s', query.get('parameters').page.get('id'));
    }
    else if (query.get('isTriggerResponsesQuery')) {
      this.log('  Query: triggerResponsesQuery for ActivityStep %s', query.get('parameters').step.get('id'));
    }
    else if (query.get('isCommandInvocationsQuery')) {
      this.log('  Query: commandInvocationsQuery for ActivityStep %s', query.get('activityStep').get('id'));
    }
    
    return NO ; // return YES if you handled the query
  },

  // ..........................................................
  // BULK RECORD SUPPORT
  //
  
  retrieveRecords: function(store, storeKeys, ids) {
    this.log('RailsDataSource.retrieveRecords(storeKeys=%s)', storeKeys.toString());
    sc_super();
  },
  
  // ..........................................................
  // RECORD SUPPORT
  // 
  
  retrieveRecord: function (store, storeKey) {
    
    // TODO: Add handlers to retrieve an individual record's contents
    // call store.dataSourceDidComplete(storeKey) when done.

    var recordType = Smartgraphs.store.recordTypeFor(storeKey);
    
    this.log('RailsDataSource.retrieveRecord()');
    this.log('  Record type requested = %s', recordType.toString());
    this.log('  id requested = %s', Smartgraphs.store.idFor(storeKey));
    
    if ((recordType === Smartgraphs.Activity) || recordType === Smartgraphs.ActivityPage) {
      this.requestRecordFromServer(store, storeKey);
      this.log('  returning YES from retrieveRecord');
      return YES;
    }

    return NO ; // return YES if you handled the storeKey
  },
  
  createRecord: function (store, storeKey) {
    
    // TODO: Add handlers to submit new records to the data source.
    // call store.dataSourceDidComplete(storeKey) when done.

    this.log('RailsDataSource.createRecord()');  
    return NO ; // return YES if you handled the storeKey
  },
  
  updateRecord: function (store, storeKey) {
    
    // TODO: Add handlers to submit modified record to the data source
    // call store.dataSourceDidComplete(storeKey) when done.

    this.log('RailsDataSource.updateRecord()');  
    return NO ; // return YES if you handled the storeKey
  },
  
  destroyRecord: function (store, storeKey) {
    
    // TODO: Add handlers to destroy records on the data source.
    // call store.dataSourceDidDestroy(storeKey) when done

    this.log('RailsDataSource.destroyRecord()');  
    return NO ; // return YES if you handled the storeKey
  },
  
  
  // ..........................................................
  // REQUEST AND RESPONSE - SINGLE RECORDS
  //
  
  requestRecordFromServer: function (store, storeKey) {
    // The url IS the id. As it should be.
    var url = store.idFor(storeKey);
    
    if (Smartgraphs.get('useMockResponses')) {
      this.invokeLater(this._mockRequestRecordFromServer, this.get('latency'), store, storeKey);
    }
    else {
    SC.Request.getUrl(url)
       .notify(this, this.didRetrieveRecordFromServer, { store: store, storeKey: storeKey })
       .header('Accept', 'application/json')
       .json()
       .send();
    }
  },
  
  _mockRequestRecordFromServer: function (store, storeKey) {
    var url = store.idFor(storeKey);
    var response = 
      Smartgraphs.mockResponses.hasOwnProperty(url) ? 
        SC.Object.create({ body: Smartgraphs.mockResponses[url] }) : 
        SC.Error.create();

    this.didRetrieveRecordFromServer(response, { store: store, storeKey: storeKey });
  },
  
  didRetrieveRecordFromServer: function (response, params) {
    var store = params.store;
    var storeKey = params.storeKey;
    
    var recordType = Smartgraphs.store.recordTypeFor(storeKey);
    
    this.log('RailsDataSource.didRetrieveRecordFromServer()');
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
  
  requestListFromServer: function (store, query, listUrl) {
    if (Smartgraphs.get('useMockResponses')) {
      this.invokeLater(this._mockRequestListFromServer, this.get('latency'), store, query, listUrl);
    }
    else { 
      SC.Request.getUrl(listUrl)
       .notify(this, this.didRetrieveListFromServer, { store: store, query: query })
       .header('Accept', 'application/json')
       .json()
       .send();
    }
  },
  
  _mockRequestListFromServer: function (store, query, listUrl) {
    var response = 
      Smartgraphs.mockResponses.hasOwnProperty(listUrl) ? 
        SC.Object.create({ body: Smartgraphs.mockResponses[listUrl] }) : 
        SC.Error.create();
    this.didRetrieveListFromServer(response, { store: store, query: query });
  },
  
  didRetrieveListFromServer: function (response, params) {
    var store = params.store;
    var query = params.query;
    
    var recordType = query.get('recordType');
    this.log('RailsDataSource.didRetrieveListFromServer()');
    this.log('  Record type requested = %s', recordType.toString());
    
    if (SC.ok(response)) {
      this.log('  ...SUCCESS');
      var dataHashes = response.get('body').map(function (hash) { return this.camelizeKeys(hash); }, this);
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
  camelizeKeys: function (hash) {
    var ret = {};
    for (var key in hash) {
      if (hash.hasOwnProperty(key)) {
        ret[key.camelize()] = hash[key];
      }
    }
    return ret;
  },
  
  log: function () {
    if (Smartgraphs.get('logDataSource')) {
      console.log.apply(console, arguments);
    }
  }
  
});
