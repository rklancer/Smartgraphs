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
    var session = Smartgraphs.store.createRecord(Smartgraphs.Session, {
      user: Smartgraphs.userController.get('id')
    });
    // FIXME this works for now --- but we'll eventually need some way to create a globally unique id for a session
    session.set('id', Smartgraphs.getNextGuid());
    this.set('content', session);
    
    Smartgraphs.set('store', Smartgraphs.store.chain());
    Smartgraphs.activityObjectsController.loadPredefinedObjects();
  },
  
  endSession: function () {
    var parentStore = Smartgraphs.store.get('parentStore');

    if (!parentStore) {
      throw "Tried to end session, but there is no parent store to restore";
    }
    
    // TODO save these modified objects up to the server. Until we need that capability, we'll just throw them away.
    var changelog = Smartgraphs.store.get('changelog');
    if (changelog) console.log("discarding these changes: ", changelog.toString());
    
    Smartgraphs.store.discardChanges().destroy();
    Smartgraphs.set('store', parentStore);
  }
  
}) ;
