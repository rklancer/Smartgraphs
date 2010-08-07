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

    // TODO: Add handlers to fetch data for specific queries.  
    // call store.dataSourceDidFetchQuery(query) when done.

    console.log('RailsDataSource.fetch()');
    
    if (query.get('isPagesQuery')) {
      var activity = query.get('parameters').activity;
      var indexUrl = activity.get('pagesIndexUrl');
      
      console.log('  Query: pagesQuery for Activity %s', activity.get('id'));
      console.log('  URL endpoint for query: %s', indexUrl);
      
      this.requestIndexFromServer(store, query, indexUrl);   
      console.log('  returning YES from fetch');
      return YES;
    }
    else if (query.get('isStepsQuery')) {
      console.log('  Query: stepsQuery for ActivityPage %s', query.get('parameters').page.get('id'));
    }
    else if (query.get('isTriggerResponsesQuery')) {
      console.log('  Query: triggerResponsesQuery for ActivityStep %s', query.get('parameters').step.get('id'));
    }
    else if (query.get('isCommandInvocationsQuery')) {
      console.log('  Query: commandInvocationsQuery for ActivityStep %s', query.get('activityStep').get('id'));
    }
    else if (query === Smartgraphs.ALL_COMMANDS_QUERY) {
      console.log('  Query: ALL_COMMANDS_QUERY');
    }
    else if (query === Smartgraphs.ALL_TRIGGERS_QUERY) {
      console.log('  Query: ALL_TRIGGERS_QUERY');
    }
    
    return NO ; // return YES if you handled the query
  },

  // ..........................................................
  // BULK RECORD SUPPORT
  //
  
  retrieveRecords: function(store, storeKeys, ids) {
    console.log('RailsDataSource.retrieveRecords(storeKeys=%s)', storeKeys.toString());
    sc_super();
  },
  
  // ..........................................................
  // RECORD SUPPORT
  // 
  
  retrieveRecord: function (store, storeKey) {
    
    // TODO: Add handlers to retrieve an individual record's contents
    // call store.dataSourceDidComplete(storeKey) when done.

    var recordType = Smartgraphs.store.recordTypeFor(storeKey);
    
    console.log('RailsDataSource.retrieveRecord()');
    console.log('  Record type requested = %s', recordType.toString());
    console.log('  id requested = %s', Smartgraphs.store.idFor(storeKey));
    
    if ((recordType === Smartgraphs.Activity) || recordType === Smartgraphs.ActivityPage) {
      this.requestRecordFromServer(store, storeKey);
      console.log('  returning YES from retrieveRecord');
      return YES;
    }

    return NO ; // return YES if you handled the storeKey
  },
  
  createRecord: function (store, storeKey) {
    
    // TODO: Add handlers to submit new records to the data source.
    // call store.dataSourceDidComplete(storeKey) when done.

    console.log('RailsDataSource.createRecord()');  
    return NO ; // return YES if you handled the storeKey
  },
  
  updateRecord: function (store, storeKey) {
    
    // TODO: Add handlers to submit modified record to the data source
    // call store.dataSourceDidComplete(storeKey) when done.

    console.log('RailsDataSource.updateRecord()');  
    return NO ; // return YES if you handled the storeKey
  },
  
  destroyRecord: function (store, storeKey) {
    
    // TODO: Add handlers to destroy records on the data source.
    // call store.dataSourceDidDestroy(storeKey) when done

    console.log('RailsDataSource.destroyRecord()');  
    return NO ; // return YES if you handled the storeKey
  },
  
  
  // ..........................................................
  // REQUEST AND RESPONSE - SINGLE RECORDS
  //
  
  requestRecordFromServer: function (store, storeKey) {
    // The url IS the id. As it should be
    var url = store.idFor(storeKey);
    
    SC.Request.getUrl(url)
       .notify(this, this.didRetrieveRecordFromServer, { store: store, storeKey: storeKey })
       .header('Accept', 'application/json')
       .json()
       .send();

    // i.e., after this.latency millisec, pretend the SC.Request called back.
    // when we're happy with the format of the response, we can replace this with a real SC.Request that 
    // notifies didRetrieveActivityRecord
    //this.invokeLater(this._mockRequestRecordFromServer, this.get('latency'), store, storeKey);
  },
  
  _mockRequestRecordFromServer: function (store, storeKey) {
    var url = store.idFor(storeKey);
    var response = 
      Smartgraphs.mockResponses.hasOwnProperty(url) ? 
        SC.Object.create({ body: Smartgraphs.mockResponses[url] }) : 
        SC.Error.create();
    this.didRetrieveActivityRecord(response, { store: store, storeKey: storeKey });
  },
  
  didRetrieveRecordFromServer: function (response, params) {
    var store = params.store;
    var storeKey = params.storeKey;
    
    // debug
    var recordType = Smartgraphs.store.recordTypeFor(storeKey);
    
    console.log('RailsDataSource.didRetrieveRecordFromServer()');
    console.log('  Record type requested = %s', recordType.toString());
    console.log('  id requested = %s', Smartgraphs.store.idFor(storeKey));
    // end debug
    
    if (SC.ok(response)) {
      console.log('  ...SUCCESS');
      store.dataSourceDidComplete(storeKey, this.camelizeKeys(response.get('body')));
    }
    else {
      console.error('  ...FAILURE');      
      store.dataSourceDidError(storeKey);
    }
  },
  
  // ..........................................................
  // REQUEST AND RESPONSE - MULTIPLE RECORDS
  //
  
  /** request multiple records from indexUrl in order to satisfy query */
  
  requestIndexFromServer: function (store, query, indexUrl) {
    SC.Request.getUrl(indexUrl)
       .notify(this, this.didRetrieveIndexFromServer, { store: store, query: query })
       .header('Accept', 'application/json')
       .json()
       .send();
  },
  
  didRetrieveIndexFromServer: function (response, params) {
    var store = params.store;
    var query = params.query;
    
    var recordType = query.get('recordType');
    console.log('RailsDataSource.didRetrieveIndexFromServer()');
    console.log('  Record type requested = %s', recordType.toString());
    
    if (SC.ok(response)) {
      console.log('  ...SUCCESS');
      var dataHashes = response.get('body').map(function (hash) { return this.camelizeKeys(hash); }, this);
      store.loadRecords(recordType, dataHashes);
      store.dataSourceDidFetchQuery(query);
    }
    else {
      console.error('  ...FAILURE');      
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
  }
  
});
