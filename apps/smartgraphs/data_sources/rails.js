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

  // latency for retrieve
  
  latency: 500,
  
  // ..........................................................
  // QUERY SUPPORT
  // 

  fetch: function (store, query) {

    // TODO: Add handlers to fetch data for specific queries.  
    // call store.dataSourceDidFetchQuery(query) when done.

    console.log('RailsDataSource.fetch()');
    return NO ; // return YES if you handled the query
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
    
    if (recordType === Smartgraphs.Activity) {
      this.retrieveActivityRecord(store, storeKey);
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
  // SPECIFIC RECORD TYPE SUPPORT
  //
  
  retrieveActivityRecord: function (store, storeKey) {
    // i.e., after this.latency millisec, pretend the SC.Request called back.
    // when we're happy with the format of the response, we can replace this with a real SC.Request that 
    // notifies didRetrieveActivityRecord
    this.invokeLater(this._mockActivityRequestCompletion, this.get('latency'), store, storeKey);
  },
  
  _mockActivityRequestCompletion: function (store, storeKey) {
    var url = store.idFor(storeKey);
    var response = 
      Smartgraphs.mockResponses.hasOwnProperty(url) ? Smartgraphs.mockResponses[url] : SC.Error.create();
    this.didRetrieveActivityRecord(response, store, storeKey);
  },
  
  didRetrieveActivityRecord: function (response, store, storeKey) {
    if (SC.ok(response)) {
      console.log('didRetrieveActivityRecord successful');
      store.dataSourceDidComplete(storeKey, response);
    }
    else {
      store.dataSourceDidError(storeKey);
    }
  }
  
});
