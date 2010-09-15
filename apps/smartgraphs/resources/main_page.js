// ==========================================================================
// Project:   Smartgraphs - mainPage
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

// This page describes the main user interface  
Smartgraphs.mainPage = SC.Page.design({

  mainPane: SC.MainPane.design({
    // this minimum width & height should not overflow on a 1024x768 screen even in a browsing setup with lots of 
    // extraneous on-screen chrome (say, in FF or IE running in Windows XP)
    layout: { width: 960, height: 600 },

    childViews: 'container'.w(),
    
    defaultResponder: 'Smartgraphs',
    
    container: SC.ContainerView.design({
      layout: { top: 15, right: 20, bottom: 15, left: 20 },
      nowShowingBinding: 'Smartgraphs.appWindowController.nowShowing'
    })
  }),
  
  // a generic loading view for whatever is loading into mainPane.container
  loadingView: SC.View.design({
    classNames: 'smartgraph-pane'.w(),
    childViews: 'loadingIconView loadingMessageView'.w(),
    
    loadingIconView: SC.ImageView.design({
      layout: { width: 48, height: 48, centerX: 0, centerY: -39 },
      value: sc_static('resources/pane_loading.gif')
    }),
    
    loadingMessageView: SC.LabelView.design({
      classNames: 'loading'.w(),
      layout: { width: 200, height: 24, centerX: 0, centerY: 15 },
      textAlign: SC.ALIGN_CENTER,
      valueBinding: 'Smartgraphs.appWindowController.loadingMessage'
    })
  })

});
