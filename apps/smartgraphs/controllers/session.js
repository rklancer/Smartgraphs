// ==========================================================================
// Project:   Smartgraphs.sessionController
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs property */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Smartgraphs.sessionController = SC.ObjectController.create(
/** @scope Smartgraphs.sessionController.prototype */ {

  beginSession: function () {
    if ( this.get('content') ) throw "beginSession was called when a session is already open!";
    
    Smartgraphs.set('store', Smartgraphs.store.chain());
    Smartgraphs.activityObjectsController.loadPredefinedObjects();
    
    // make sure the session is loaded into the nested store -- optionally it can be saved back to the parent store
    var session = Smartgraphs.store.createRecord(Smartgraphs.Session, {
      user: Smartgraphs.userController.get('id')
    });
    // FIXME this works for now --- but we'll eventually need some way to create a globally unique id for a session
    session.set('id', Smartgraphs.getNextGuid());

    this.set('content', session);
  },
  
  endSession: function () {
    if ( !this.get('content') ) throw "endSession was called when no session is open!";
    
    var parentStore = Smartgraphs.store.get('parentStore');

    if (!parentStore) {
      throw "Tried to end session, but there is no parent store to restore";
    }
    
    // TODO save these modified objects up to the server. Until we need that capability, we'll just throw them away.
    var changelog = Smartgraphs.store.get('changelog') || [];
    changelog.forEach( function (storeKey) {
      console.log("    about to call beginPropertyChanges for storeKey %d", storeKey);
      var rec = Smartgraphs.store.find(Smartgraphs.store.recordTypeFor(storeKey), Smartgraphs.store.idFor(storeKey));

      // hack hack hack ... 
      rec._notifyPropertyObservers = function () {};
      
      console.log("    permanently turned off observing for about-to-be-destroyed record: %s", rec.toString());
    });

    Smartgraphs.store.discardChanges().destroy();
    Smartgraphs.set('store', parentStore);
    
    this.set('content', null);
  }
  
}) ;
