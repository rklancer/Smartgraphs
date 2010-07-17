// ==========================================================================
// Project:   Smartgraphs - mainPage
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

// This page describes the main user interface  
Smartgraphs.mainPage = SC.Page.design({

  mainPane: SC.MainPane.design({
    // use this constricted layout while developing, to make sure content doesn't overflow 1024x768 screen in IE
    // layout: { width: 960, height: 600 },
    
    childViews: 'container'.w(),
    
    container: SC.ContainerView.design({
      layout: { top: 10, right: 20, bottom: 10, left: 20 }
    })
  })

});
