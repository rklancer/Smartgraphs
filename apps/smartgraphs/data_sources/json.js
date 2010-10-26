// ==========================================================================
// Project:   Smartgraphs
// Copyright: 2010 Concord Consortium
// @author    Dr. Baba Kofi Weusijana <kofi@edutek.net>
// Parts cribbed from CouchTodos SproutCore Todos sample application [https://sproutcore.pbworks.com/w/page/Todos+06+-+Building+with+CouchDB] 
// ==========================================================================
/*globals Smartgraphs */

/** @class

  Smartgraphs.Json

 @extends SC.DataSource
 */
Smartgraphs.ACTIVITIES_QUERY = SC.Query.local(Smartgraphs.Activity, {
  orderBy: 'id'
});

/** @class

  Smartgraphs.Json

 @extends SC.DataSource
 */
Smartgraphs.Json = SC.DataSource.extend(
/** @scope Smartgraphs.Json.prototype */
{

  _dbpath: 'backend',

  getServerPath: function(resourceName) {
    return '/' + this._dbpath + "//" + resourceName;
  },

  getServerView: function(viewName) {
    return '/' + this._dbpath + "/_design/app/_view/" + viewName;
  },

  // ..........................................................
  // QUERY SUPPORT
  // 
  fetch: function(store, query) {

    if (query === Smartgraphs.ACTIVITIES_QUERY) {
      SC.Request.getUrl(this.getServerView('Activities')).json().header('Accept', 'application/json').notify(this, 'didFetchActivities', store, query).send();

      return YES;
    }

    return NO; // return YES if you handled the query
  },

  didFetchActivities: function(response, store, query) {
    if (SC.ok(response)) {
      var body = response.get('encodedBody');
      var couchResponse = SC.json.decode(body);
      var records = couchResponse.rows.getEach('value');

      store.loadRecords(Smartgraphs.Activity, records);
      store.dataSourceDidFetchQuery(query);
    } else {
      store.dataSourceDidErrorQuery(query, response);
    }
  },

  // ..........................................................
  // RECORD SUPPORT
  // 
  retrieveRecord: function(store, storeKey) {

    // TODO: Add handlers to retrieve an individual record's contents
    // call store.dataSourceDidComplete(storeKey) when done.
    //var recordType = Smartgraphs.store.recordTypeFor(storeKey);
    var recordType = store.recordTypeFor(storeKey);

    console.log('RestDataSource.retrieveRecord()');
    console.log('  recordType requested:', recordType);

    if (recordType === Smartgraphs.Activity) {
      // The url IS the id. As it should be.
      var url = store.idFor(storeKey);
      console.log('  id/url requested:', url);
      SC.Request.getUrl(url).header('Accept', 'application/json').json().notify(this, 'didRetrieveActivity', store, storeKey).send();

      return YES;
    }

    console.log("  returning NO because no compatible type found");
    return NO; // return YES if you handled the storeKey
  },

  didRetrieveActivity: function(response, store, storeKey) {
    console.log("didRetrieveActivity: storeKey:", storeKey);
    if (SC.ok(response)) {
      var dataHash = response.get('body'); // TODO: why did CouchTodos have this?:.content;
      console.log("didRetrieveActivity: dataHash:", dataHash);
      store.dataSourceDidComplete(storeKey, dataHash);
      // push pages into the store
      // TODO: Is this needed since the activity has the pages array?
      var activityPages = dataHash.pages;
      console.log("activityPages:", activityPages);
      if (activityPages) {
        activityPages.forEach(function (activityPage) {
          console.log("loading into the store activityPage:", activityPage);
          var activityPageStoreKey = store.loadRecord(Smartgraphs.ActivityPage, activityPage);
          console.log("didRetrieveActivity: activityPageStoreKey:", activityPageStoreKey);
        });
      }

    } else store.dataSourceDidError(storeKey, response);
  },

  /**
   Process response from CouchDB of create, update, delete operations.

   @returns id,rev for success, null for failure.
   */
  processResponse: function(response) {
    if (SC.ok(response)) {
      var body = response.get('encodedBody');
      var couchResponse = SC.json.decode(body);
      var ok = couchResponse.ok;
      if (ok != YES) return {
        "error": true,
        "response": couchResponse
      };

      var id = couchResponse.id;
      var rev = couchResponse.rev;
      return {
        "ok": true,
        "id": id,
        "rev": rev
      };
    } else {
      return {
        "error": true,
        "response": response
      };
    }
  },

  /**
   Get the latest revision of the document.
   For docs which were fetch from the server we use _rev field,
   and for docs that were modified we use the local _docsRev dictionary.
   */
  getDocRev: function(doc) {
    return doc._rev;
  },

  createRecord: function(store, storeKey) {

    if (SC.kindOf(store.recordTypeFor(storeKey), Smartgraphs.Activity)) {
      SC.Request.postUrl(this.getServerPath('/')).json().header('Accept', 'application/json').notify(this, this.didCreateActivity, store, storeKey).send(store.readDataHash(storeKey));

      return YES;
    }

    return NO; // return YES if you handled the storeKey
  },

  didCreateActivity: function(response, store, storeKey) {
    var couchRes = this.processResponse(response);
    if (couchRes.ok) {
      // Add _id and _rev to the local document for further server interaction.
      var localDoc = store.readDataHash(storeKey);
      localDoc._id = couchRes.id;
      localDoc._rev = couchRes.rev;
      store.dataSourceDidComplete(storeKey, localDoc, couchRes.id);
    } else {
      store.dataSourceDidError(storeKey, response);
    }
  },

  updateRecord: function(store, storeKey) {

    if (SC.kindOf(store.recordTypeFor(storeKey), Smartgraphs.Activity)) {
      var id = store.idFor(storeKey);
      var dataHash = store.readDataHash(storeKey);
      SC.Request.putUrl(this.getServerPath(id)).json().header('Accept', 'application/json').notify(this, this.didUpdateActivity, store, storeKey).send(dataHash);
      return YES;
    }
    return NO;
  },

  didUpdateActivity: function(response, store, storeKey) {
    var couchRes = this.processResponse(response);
    if (couchRes.ok) {
      // Update the local _rev of this document.
      var localDoc = store.readDataHash(storeKey);
      localDoc._rev = couchRes.rev;
      store.dataSourceDidComplete(storeKey, localDoc);
    } else {
      store.dataSourceDidError(storeKey);
    }
  },

  destroyRecord: function(store, storeKey) {

    if (SC.kindOf(store.recordTypeFor(storeKey), Smartgraphs.Activity)) {
      var id = store.idFor(storeKey);
      //var rev = this._docsRev[id];
      var dataHash = store.readDataHash(storeKey);
      var rev = this.getDocRev(dataHash);
      SC.Request.deleteUrl(this.getServerPath(id + "?rev=" + rev)).json().header('Accept', 'application/json').notify(this, this.didDeleteActivity, store, storeKey).send();
      return YES;
    }

    return NO; // return YES if you handled the storeKey
  },

  didDeleteActivity: function(response, store, storeKey) {
    var couchRes = this.processResponse(response);
    if (couchRes.ok) {
      store.dataSourceDidDestroy(storeKey);
    } else {
      store.dataSourceDidError(response);
    }
  }

});
