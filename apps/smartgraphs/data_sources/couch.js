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

  /**
    @private
    
    couchdb _ids for all activity records loaded by this data source, indexed by storeKey
  */
  _ids: {},

  /**
    @private
    
    couchdb _revs for all activity records loaded by this data source, indexed by storeKey
  */
  _revs: {},
  
  // ..........................................................
  // QUERY SUPPORT
  // 

  fetch: function(store, query) {
    // Everything should have been loaded into memory when we loaded the activity. 
    // Skip actually talking to the backend.

    this.log('CouchDataSource.fetch()');
    store.dataSourceDidFetchQuery(query);
    return YES;
  },

  // ..........................................................
  // RECORD SUPPORT
  // 
  
  retrieveRecord: function(store, storeKey) {
    
    // TODO: Add handlers to retrieve an individual record's contents
    // call store.dataSourceDidComplete(storeKey) when done.
    
    var recordType = store.recordTypeFor(storeKey);
    var id = store.idFor(storeKey);

    this.log('CouchDataSource.retrieveRecord()');
    this.log('  Record type requested = %s', recordType.toString());
    this.log('  id requested = %s', id);

    if (recordType === Smartgraphs.Activity) {
      var activityId = id;
      var requestUrl = '/db/smartgraphs/_design/app/_view/activities-by-url-and-version?key=["'+activityId+'",'+Smartgraphs.DATA_FORMAT_VERSION+']';
      
      SC.Request.getUrl(requestUrl)
                .json()
  		          .header('Accept', 'application/json')
  		          .notify(this, 'didRetrieveActivity', store, storeKey)
  		          .send();
  		this.log('  sent request to url %s', requestUrl);
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
        
        // save the _rev and _id for later
        this._ids[storeKey] = doc._id;
        this._revs[storeKey] = doc._rev;
        
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
          self.loadRecordsFromArray(store, Smartgraphs[pair[0]], doc[pair[1]]);
        });

        // Data format 2 doesn't include activity->datasets, activity->axes, or activity->graphs ManyArrays
        doc.activity.datasets = doc.datasets.map( function (dataset) { return dataset.url; } );
        doc.activity.axes = doc.axes.map( function (axes) { return axes.url; } );
        doc.activity.graphs = doc.graphs.map( function (graph) { return graph.url; } );
        
        // and call back to the datastore (which loads the Activity record as well)
        store.dataSourceDidComplete(storeKey, doc.activity);
        return;
      }
    }
    
    // otherwise...
    store.dataSourceDidError(storeKey, response);
  },
  
  loadRecordsFromArray: function (store, recordType, hashes) {
    hashes.forEach(function (hash) {
      store.loadRecord(recordType, hash, hash.url);
    });
  },
  
  createRecord: function(store, storeKey) {
    
    // TODO: Add handlers to submit new records to the data source.
    // call store.dataSourceDidComplete(storeKey) when done.
    
    return NO ; // return YES if you handled the storeKey
  },
  
  markRecordBusy: function (store, record) {
    var K = SC.Record;
    var storeKey = record.get('storeKey');
    
    if (record.get('store') !== store) throw "WHOOPS. Trying to mark a record busy that's from the wrong store";
    
    var status = store.readStatus(record.get('storeKey'));
    
    // copied from SC.Store.commitRecords
    if ((status == K.EMPTY) || (status == K.ERROR)) {
      throw K.NOT_FOUND_ERROR ;
    } 
    else {
      if(status==K.READY_NEW) {
        store.writeStatus(storeKey, K.BUSY_CREATING);
        store.dataHashDidChange(storeKey, null, YES);
      } 
      else if (status==K.READY_DIRTY) {
        store.writeStatus(storeKey, K.BUSY_COMMITTING);
        this.log("marking record '%s' as BUSY_COMMITTING: ", record.toString());
        store.dataHashDidChange(storeKey, null, YES);
      } 
      else if (status==K.DESTROYED_DIRTY) {
        store.writeStatus(storeKey, K.BUSY_DESTROYING);
        store.dataHashDidChange(storeKey, null, YES);
      } 
      else if (status==K.DESTROYED_CLEAN) {
        store.dataHashDidChange(storeKey, null, YES);
      }
      // ignore K.READY_CLEAN, K.BUSY_LOADING, K.BUSY_CREATING, K.BUSY_COMMITTING, 
      // K.BUSY_REFRESH_CLEAN, K_BUSY_REFRESH_DIRTY, KBUSY_DESTROYING
    }
  },
  
  markRecordCommitted: function (store, record) {
    var K = SC.Record;
    var storeKey = record.get('storeKey');
    var status = store.readStatus(storeKey);
    
    if (status === K.BUSY_DESTROYING) {
      store.dataSourceDidDestroy(storeKey);
    }
    else if (status & K.BUSY) {
      store.dataSourceDidComplete(storeKey);
    }
    // ignore everything else!
  },
  
  applyToChildRecords: function (store, record, fn) {
    var self = this;

    fn.call(this, store, record);

    for (var prop in record) {
      if (SC.kindOf(record[prop], SC.SingleAttribute) || SC.kindOf(record[prop], SC.ManyAttribute)) {
        var type = record[prop].type;
        var inverse = record[prop].inverse;
        if (type && inverse && SC.objectForPropertyPath(type).prototype[inverse].aggregate) {
          var relatedRecords = record.get(prop);
          if ( !relatedRecords.get('isSCArray')) relatedRecords = [relatedRecords];
          relatedRecords.forEach(function (relatedRecord) { self.applyToChildRecords(store, relatedRecord, fn); } );
        }
      }
    }
  },
  
  updateRecord: function(store, storeKey) {
    
    // if we downloaded it, we can upload it
    if (this._ids[storeKey]) {
      var record = store.find(store.recordTypeFor(storeKey), store.idFor(storeKey));

      if (record && record.serialize) {
        var doc = record.serialize();
        doc._rev = this._revs[storeKey];
        doc.data_format_version = Smartgraphs.DATA_FORMAT_VERSION;
        
        // this is a bit obscure at the moment, but it locks 'child' records of the activity (set status to BUSY)
        // until the xhr callback completes.

        this.applyToChildRecords(store, record, this.markRecordBusy);
        
        SC.Request.putUrl('/db/smartgraphs/'+this._ids[storeKey])
                  .json()
                  .header('Accept', 'application/json')
                  .notify(this, this.didUpdateActivity, store, storeKey)
                  .send(doc);
        return YES;
      }
    }

    return NO ;
  },

  didUpdateActivity: function (response, store, storeKey) {
    var K = SC.Record;
    
    var record = store.find(store.recordTypeFor(storeKey), store.idFor(storeKey));
    
    if (SC.ok(response)) {
      this.applyToChildRecords(store, record, this.markRecordCommitted);
      this._revs[storeKey] = response.get('body').rev;
    }
    else {
      //FIXME also iterate over child records!
      store.dataSourceDidError(storeKey);
    }
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
