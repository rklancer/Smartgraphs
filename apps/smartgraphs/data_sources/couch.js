// ==========================================================================
// Project:   Smartgraphs.CouchDataSource
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your Data Source Here)

  @extends SC.DataSource
*/
Smartgraphs.CouchDataSource = SC.DataSource.extend(
/** @scope Smartgraphs.CouchDataSource.prototype */ {

  // ..........................................................
  // QUERY SUPPORT
  // 

  fetch: function(store, query) {
    // Everything should have been loaded into memory when we loaded the activity. 
    // Skip actually talking to the backend.

    this.log('CouchDataSource.fetch()');
    this.invokeLast(function () {
      store.dataSourceDidFetchQuery(query);
    });
    return YES;
  },

  // ..........................................................
  // RECORD SUPPORT
  // 
  
  retrieveRecord: function(store, storeKey) {
    
    // TODO: Add handlers to retrieve an individual record's contents
    // call store.dataSourceDidComplete(storeKey) when done.
    
    var recordType = Smartgraphs.store.recordTypeFor(storeKey);
    var id = Smartgraphs.store.idFor(storeKey);

    this.log('CouchDataSource.retrieveRecord()');
    this.log('  Record type requested = %s', recordType.toString());
    this.log('  id requested = %s', id);

    if (recordType === Smartgraphs.Activity) {
      var activityId = id;
      var activityJson = Smartgraphs.activityJson[activityId];
      var response = activityJson ? SC.Response.create({ body: { rows: [{ value: activityJson }]}}) : SC.Error.create();
      this.didRetrieveActivity(response, store, storeKey);
      // var requestUrl = '/db/smartgraphs/_design/app/_view/activities-by-url-and-version?key=["'+activityId+'",'+Smartgraphs.DATA_FORMAT_VERSION+']';
      // 
      // SC.Request.getUrl(requestUrl)
      //           .json()
      //              .header('Accept', 'application/json')
      //              .notify(this, 'didRetrieveActivity', store, storeKey)
      //              .send();
      //    this.log('  sent request to url %s', requestUrl);
      this.log('  returning YES from retrieveRecord');
      return YES;
    }
    
    if (recordType === Smartgraphs.User) {
      // The default user record is just this simple
      this.log('  recognized request for User record');
      if (id === 'default') {
        store.dataSourceDidComplete(storeKey, {
          userId: 'default',
          name: 'Default Smartgraphs User',
          sessions: []
        });
        this.log("  handled request for User record of 'default' user");
      }
      return YES;
   }
   
    return NO ; // return YES if you handled the storeKey
  },
  
  
  didRetrieveActivity: function (response, store, storeKey) {

    if (SC.ok(response)) {
      var body = response.get('body');
      this.log('retrieved response.body = ', body);
      
      if (body && body.rows && body.rows.length === 1 && body.rows[0].value) {
        var doc = body.rows[0].value;
        
        this.log('doc = ', doc);
        this.log('doc.activity = ', doc.activity);
        
        // push all the associated records into the store
        var self = this;
        [
          ['ActivityPage',        'pages'],
          ['ActivityStep',        'steps'],
          ['Axes',                'axes'],
          ['DataPoint',           'datapoints'],
          ['Dataset',             'datasets'],
          ['FreehandSketch',      'freehandSketches'],
          ['Graph',               'graphs'],
          ['HighlightedPoint',    'highlightedPoints'],
          ['HighlightedSegment',  'highlightedSegments'],
          ['LineToAxis',          'linesToAxis'],
          ['ResponseTemplate',    'responseTemplates']
                    
        ].forEach(function (pair) {
          self.loadRecordsFromArray(Smartgraphs[pair[0]], doc[pair[1]]);
        });

        // and call back to the datastore (which loads the Activity record as well)
        store.dataSourceDidComplete(storeKey, doc.activity);
        return;
      }
    }
    
    // otherwise...
    store.dataSourceDidError(storeKey, response);
  },
  
  loadRecordsFromArray: function (recordType, hashes) {
    hashes.forEach(function (hash) {
      Smartgraphs.store.loadRecord(recordType, hash, hash.url);
    });
  },
  
  createRecord: function(store, storeKey) {
    
    // TODO: Add handlers to submit new records to the data source.
    // call store.dataSourceDidComplete(storeKey) when done.
    
    return NO ; // return YES if you handled the storeKey
  },
  
  updateRecord: function(store, storeKey) {
    
    // TODO: Add handlers to submit modified record to the data source
    // call store.dataSourceDidComplete(storeKey) when done.

    return NO ; // return YES if you handled the storeKey
  },
  
  destroyRecord: function(store, storeKey) {
    
    // TODO: Add handlers to destroy records on the data source.
    // call store.dataSourceDidDestroy(storeKey) when done
    
    return NO ; // return YES if you handled the storeKey
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
      if (console.log.apply) {
        console.log.apply(console, arguments);
      }
      else {
        // IE Dev tools debug mode provides a console.log which throws an error when you try to call the 'apply'
        // method. In that case, just replace ourself outright with console.log (after this happens, this.log() will
        // of course no longer check the 'logDataSource' property. This should only be a problem on the off chance
        // someone attempts to turn off datasource logging mid-session.
        this.log = console.log;
      }
    }
  }
  
}) ;
