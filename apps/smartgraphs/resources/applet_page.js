// ==========================================================================
// Project:   Smartgraphs.appletPage
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

// This page holds the applet view definition off-DOM until we need to start it up.
// (Executing Smartgraphs.appletPage.get('invisibleAppletPane').append() from anywhere in the code 
// will instantiate the applet element and insert it into the DOM)

Smartgraphs.appletPage = SC.Page.design({

  invisibleAppletPane: SC.Pane.design({
    layout: {top: -10, left: -10, width: 1, height: 1 }        // assuming this doesn't make applets choke
    
    // borrow the CC applet rendering code here.
  })

});
