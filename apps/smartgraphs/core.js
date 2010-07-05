// ==========================================================================
// Project:   Smartgraphs
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

/** @namespace

  My cool new app.  Describe your application.
  
  @extends SC.Object
*/
console.log("Loading Smartgraphs = SC.Application.create(...");
Smartgraphs = SC.Application.create(
/** @scope Smartgraphs.prototype */
{

    NAMESPACE: 'Smartgraphs',
    VERSION: '0.2.0',

    // This is your application store.  You will use this store to access all
    // of your model data.  You can also set a data source on this store to
    // connect to a backend server.  The default setup below connects the store
    // to any fixtures you define.
    //store: SC.Store.create().from(SC.Record.fixtures)
    store: SC.Store.create().from('SmartGraphs.RailsDataSource')

    // TODO: Add global constants or singleton objects needed by your app here.
});
console.log("Smartgraphs:");
console.log(Smartgraphs);
console.log("Smartgraphs.store:");
console.log(Smartgraphs.store);
