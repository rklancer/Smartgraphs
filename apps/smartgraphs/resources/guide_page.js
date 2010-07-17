// ==========================================================================
// Project:   Smartgraphs.guidePage
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

// This is a place to hold the guidePane until it's appended to the document when the mainPage's containerView
// is set to `Smartgraphs.guidePage.get('guidePane')`

Smartgraphs.guidePage = SC.Page.design({

  guidePane: SC.Pane.design({
    childViews: 'instructionsView dataView'.w(),
    
    instructionsView: SC.StaticContentView.design({}),
    
    dataView: SC.ContainerView.design({
      // set 'nowShowing' to singleFrameDataView or splitFrameDataView
    })
  }),
  
  singleFrameDataView: SC.ContainerView.design({
    // set 'nowShowing' to show a graph, table, or image
  }),
  
  splitFrameDataView: SC.View.design({
    childViews: 'topFrame bottomFrame'.w(),
    
    topFrame: SC.ContainerView.design({
      // nowShowing will be one of { null, firstImage, firstGraph, firstTable }
    }),
    
    bottomFrame: SC.ContainerView.design({
      // nowShowing will be one of { null, secondImage, secondGraph, secondTable }
    })
  }),
  
  firstImage: Smartgraphs.ImageView.design({
    // the one image shown if dataView is set to singleFrameDataView; otherwise, the top image
    // (note don't set layout here; this should fill the parent container view)
  }),
  
  secondImage: Smartgraphs.ImageView.design({}),
  
  firstGraph: Smartgraphs.GraphView.design({}),
  
  secondGraph: Smartgraphs.GraphView.design({}),
  
  firstTable: Smartgraphs.TableView.design({}),
  
  secondTable: Smartgraphs.TableView.design({}) 

});
