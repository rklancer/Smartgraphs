// ==========================================================================
// Project:   Smartgraphs.CouchDataSource
// Copyright: ©2010 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
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
    // Everything related to the activity should already be in memory. Return NO so the fixtures data source has a
    // chance to handle the request.
    this.log('CouchDataSource.fetch()');
    return NO;
  },

  // ..........................................................
  // RECORD SUPPORT
  //

  retrieveRecord: function(store, storeKey) {

    var recordType = store.recordTypeFor(storeKey);
    var id = store.idFor(storeKey);

    this.log('CouchDataSource.retrieveRecord()');
    this.log('  Record type requested = %s', recordType.toString());
    this.log('  id requested = %s', id);

    if (recordType === Smartgraphs.Activity) {
      var activityId = id;
      var requestUrl = '/db/smartgraphs/_design/app/_view/activities-by-url-and-version?key=["'+activityId+'",'+Smartgraphs.DATA_FORMAT_VERSION+']';

      var response = Smartgraphs.activityDocs[id] ? SC.Object.create({ body: { rows: [ { value: Smartgraphs.activityDocs[id] } ] } }) : SC.Error.create();
      this.didRetrieveActivity(response, store, storeKey);
      return YES;
    }

    this.log(  'returning NO from retrieveRecord');
    return NO;
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
          ['Unit',                'units'],
          ['Axis',                'axes'],
          ['Variable',            'variables'],
          ['ResponseTemplate',    'responseTemplates'],
          ['Tag',                 'tags']
        ].forEach(function (pair) {
          self.loadRecordsFromArray(store, Smartgraphs[pair[0]], doc[pair[1]]);
        });

        doc.datadefs.forEach(function (datadefRecs) {
          self.loadRecordsFromArray(store, Smartgraphs[datadefRecs.type], datadefRecs.records);
        });
        if (doc.datarefs) {
          doc.datarefs.forEach(function (datarefRecs) {
            self.loadRecordsFromArray(store, Smartgraphs[datarefRecs.type], datarefRecs.records);
          });
        }
        doc.annotations.forEach(function (annotationRecs) {
          self.loadRecordsFromArray(store, Smartgraphs[annotationRecs.type], annotationRecs.records);
        });

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

  /**
    Applied to 'child' records of an activity record being saved to CouchDB. Marks DIRTY, READY_NEW, and READY_CLEAN
    records with the appropriate BUSY states so that they are not edited until CouchDB confirms the write. (It is
    important to mark READY_CLEAN records busy so that they are not edited while the activity they are part of is
    inflight, a.k.a. BUSY)
  */
  markRecordBusy: function (store, record) {
    if (record.get('store') !== store) throw "WHOOPS. Trying to mark a record busy that's from the wrong store";

    // adapted from SC.Store.commitRecords

    var storeKey = record.get('storeKey');
    var status = store.readStatus(record.get('storeKey'));
    var newStatus;
    var K = SC.Record;

    switch (status) {
      case K.EMPTY:
      case K.ERROR:
        throw K.NOT_FOUND_ERROR;
      case K.READY_NEW:
        newStatus = K.BUSY_CREATING;
        break;
      case K.READY_DIRTY:
      case K.READY_CLEAN:
        newStatus = K.BUSY_COMMITTING;
        break;
      case K.DESTROYED_DIRTY:
        newStatus = K.BUSY_DESTROYING;
        break;
      // ignore K.DESTROYED_CLEAN, K.BUSY_LOADING, K.BUSY_CREATING, K.BUSY_COMMITTING,
      // K.BUSY_REFRESH_CLEAN, K.BUSY_REFRESH_DIRTY, K.BUSY_DESTROYING
    }

    if (newStatus) {
      store.writeStatus(storeKey, newStatus);
      store.dataHashDidChange(storeKey, null, YES);
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

    // now find all the annotation records not directly linked to by the activity record
    if (SC.kindOf(record, Smartgraphs.Activity)) {
      record.get('annotations').forEach( function (annotation) { self.applyToChildRecords(store, annotation, fn); } );
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
                  .notify(this, 'didUpdateActivity', store, storeKey)
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
      // console.log.apply won't work because, when IE dev tools are open, the 'console' is a host object whose
      // 'log' method does not have an 'apply' method. Thus console.log.apply throws an error.
      // The solution below is from
      // http://stackoverflow.com/questions/1433697/javascript-problem-with-a-activex-object-and-the-apply-function/1435562#1435562
      Function.prototype.apply.call(console.log, console, arguments);
    }
  }

}) ;
