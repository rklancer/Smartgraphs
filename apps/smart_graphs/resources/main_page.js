// ==========================================================================
// Project:   SmartGraphs - mainPage
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals SmartGraphs */

// This page describes the main user interface for your application.  
SmartGraphs.mainPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page 
  // load.
  mainPane: SC.MainPane.design({
    childViews: 'listView graphView'.w(),

    listView: SC.ListView.design({
      layout: { left: 10, top: 10, width: 600, height: 200},
      rowHeight: 18 
    }),
    
    graphView: SmartGraphs.GraphView.design({
      layout: { left: 10, top: 220, width: 600, height: 400 }
    })
    
  })

});
