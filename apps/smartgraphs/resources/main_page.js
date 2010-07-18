// ==========================================================================
// Project:   Smartgraphs - mainPage
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

// This page describes the main user interface  
Smartgraphs.mainPage = SC.Page.design({

  mainPane: SC.MainPane.design({
    // this minimum width & height should not overflow on a 1024x768 screen even in a browsing setup with lots of 
    // extraneous on-screen chrome (say, in FF or IE running in Windows XP)
    layout: { minWidth: 960, minHeight: 600 },

    childViews: 'container'.w(),
    
    defaultResponder: 'Smartgraphs',
    
    container: SC.ContainerView.design({
      layout: { top: 15, right: 20, bottom: 15, left: 20 },
      nowShowingBinding: 'Smartgraphs.appWindowController.nowShowing'
    })
  })

});
