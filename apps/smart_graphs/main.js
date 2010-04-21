// ==========================================================================
// Project:   SmartGraphs
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals SmartGraphs */

// This is the function that will start your app running.  The default
// implementation will load any fixtures you have created then instantiate
// your controllers and awake the elements on your page.
//
// As you develop your application you will probably want to override this.
// See comments for some pointers on what to do next.
//
SmartGraphs.main = function main() {

  // Step 1: Instantiate Your Views
  // The default code here will make the mainPane for your application visible
  // on screen.  If you app gets any level of complexity, you will probably 
  // create multiple pages and panes.  
  SmartGraphs.getPath('mainPage.mainPane').append() ;

  // Step 2. Set the content property on your primary controller.
  // This will make your app come alive!

  // TODO: Set the content property on your primary controller
  // ex: SmartGraphs.contactsController.set('content',SmartGraphs.contacts);
  
  var data = SmartGraphs.store.find(SmartGraphs.DataSeries, '1');
  // use a controller...
  SmartGraphs.setPath('mainPage.mainPane.listView.content', data.get('series'));

};

function main() { SmartGraphs.main(); }
