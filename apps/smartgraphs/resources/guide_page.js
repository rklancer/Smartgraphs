// ==========================================================================
// Project:   Smartgraphs.guidePage
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

// This is a place to hold the guideView until it's appended to the document (which happens automatically in the 
// GUIDE_READY rising-edge state transition, when the the mainPage's containerView 

Smartgraphs.guidePage = SC.Page.design({

  guideView: SC.View.design({
    childViews: 'instructionsWrapper dataWrapper'.w(),
    
    // the left pane, which shows the guide page intro and the instructions for the currently selected guide step
    instructionsWrapper: SC.View.design({
      layout: { left: 0, width: 0.5 },       // need to specify 0.5 rather than '50%'
      childViews: 'instructionsView'.w(),
      
      instructionsView: SC.View.design({
        layout: { right: 5, top: 0, bottom: 0 },
        classNames: 'smartgraph-pane'
      })
    }),
    
    // the right pane, which shows the data the student is manipulating
    dataWrapper: SC.View.design({
      layout: { right: 0, width: 0.5 },
      
      childViews: 'dataView'.w(),
      
      dataView: SC.ContainerView.design({
        layout: { left: 5 },
        nowShowing: 'Smartgraphs.guideViewController.dataViewNowShowing'
      })
    })
  }),
  
  singlePaneDataView: SC.ContainerView.design({
    nowShowingBinding: 'Smartgraphs.guideViewController.firstPaneNowShowing'
  }),
  
  splitPaneDataView: SC.View.design({
    childViews: 'topPane bottomPane'.w(),
    
    topPane: SC.ContainerView.design({
      nowShowingBinding: 'Smartgraphs.guideViewController.firstPaneNowShowing'
    }),
    
    bottomPane: SC.ContainerView.design({
      nowShowingBinding: 'Smartgraphs.guideViewController.secondPaneNowShowing'
    })
  }),
  
  firstImageView: SC.ImageView.design({
    valueBinding: 'Smartgraphs.guideViewController.firstImageValue'
  }),
  
  secondImageView: SC.ImageView.design({
    valueBinding: 'Smartgraphs.guideViewController.secondImageValue'
  }),
  
  firstGraphView: Smartgraphs.GraphView.design({}),
  
  secondGraphView: Smartgraphs.GraphView.design({}),
  
  firstTableView: Smartgraphs.TableView.design({}),
  
  secondTableView: Smartgraphs.TableView.design({}) 

});
