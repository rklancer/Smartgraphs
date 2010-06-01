// ==========================================================================
// Project:   Smartgraphs
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

// This is the function that will start your app running.  The default
// implementation will load any fixtures you have created then instantiate
// your controllers and awake the elements on your page.
//
// As you develop your application you will probably want to override this.
// See comments for some pointers on what to do next.
//


Smartgraphs.main = function main() {

  // Step 1: Instantiate Your Views
  // The default code here will make the mainPane for your application visible
  // on screen.  If you app gets any level of complexity, you will probably 
  // create multiple pages and panes.  
  Smartgraphs.getPath('mainPage.mainPane').append() ;

  // Step 2. Set the content property on your primary controller.
  // This will make your app come alive!

  // TODO: Set the content property on your primary controller
  // ex: Smartgraphs.contactsController.set('content',Smartgraphs.contacts);
  
  var data = Smartgraphs.store.find(Smartgraphs.DataSeries, 'series-1');
  var axes = Smartgraphs.store.find(Smartgraphs.Axes, '1');

	var query = SC.Query.local(Smartgraphs.DataPoint, {conditions: 'series = {series}', series: data, orderBy: 'x'} );
	var dataPoints = Smartgraphs.store.find(query);
	
	Smartgraphs.dataSeriesController.set('content', dataPoints);
	// Smartgraphs.dataSeriesController.set('content', data.get('points'));
  Smartgraphs.axesController.set('content', axes);
  
  var theSequence = Smartgraphs.store.find(Smartgraphs.GuidePageSequence, 'sequence-1');
  Smartgraphs.guidePageSequenceController.set('sequence', theSequence);
};

function main() { Smartgraphs.main(); }
