// ==========================================================================
// Project:   Smartgraphs.guidePage
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

// This is a place to hold the guidePane until it's appended to the document when the mainPage's containerView
// is set to `Smartgraphs.guidePage.get('guidePane')`

Smartgraphs.guidePage = SC.Page.design({

  guideView: SC.View.design({
    childViews: 'instructionsWrapper dataWrapper'.w(),
    
    instructionsWrapper: SC.View.design({
      layout: { left: 0, width: 0.5 },       // need to specify 0.5 rather than '50%'
      childViews: 'instructionsView'.w(),
      
      instructionsView: SC.View.design({
        layout: { right: 5, top: 0, bottom: 0 },
        classNames: 'smartgraph-pane'
      })
    }),
    
    dataWrapper: SC.View.design({
      layout: { right: 0, width: 0.5 },
      
      childViews: 'dataView'.w(),
      
      dataView: SC.ContainerView.design({
        layout: { left: 5 },
        classNames: 'smartgraph-pane'        
        // set 'nowShowing' to singleFrameDataView or splitFrameDataView
      })
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
