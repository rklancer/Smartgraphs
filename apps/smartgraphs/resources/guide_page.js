// ==========================================================================
// Project:   Smartgraphs.guidePage
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

// This is a place to hold the guideView until it's appended to the document (which happens automatically when we
// enter the GUIDE_START state.

Smartgraphs.guidePage = SC.Page.design({

  guideView: SC.View.design({
    childViews: 'instructionsWrapper dataWrapper'.w(),
    
    // ..........................................................
    // LEFT PANE
    //
    // the left pane shows the guide page intro and the instructions for the currently selected guide step
    
    instructionsWrapper: SC.View.design({
      layout: { left: 0, width: 0.5 },       // need to specify 0.5 rather than '50%'
      childViews: 'instructionsView'.w(),
      
      instructionsView: SC.View.design({
        layout: { right: 5, top: 0, bottom: 0 },
        classNames: 'smartgraph-pane',
        childViews: 'textWrapper nextButton backButton'.w(),

        // provide padding and style rules for the intro text and dialog
        textWrapper: SC.View.design({
          layout: {
            top: 20,
            right: 20,
            bottom: 80,
            left: 20
          },

          classNames: 'text-wrapper'.w(),

          childViews: 'introText guideStepDialog'.w(),

          introText: SC.StaticContentView.design({
            contentBinding: SC.Binding.oneWay('Smartgraphs.guidePageController.introText'),
            isVisibleBinding: SC.Binding.bool('Smartgraphs.guidePageController.introText')
          }),

          guideStepDialog: SC.View.design({          
            useStaticLayout: YES,            
            hasStaticLayout: YES,   // also needed, due to some kind of bug in quilmes                   
            childViews: 'beforeText afterText'.w(),
            classNames: 'dialog-text'.w(),

            beforeText: SC.StaticContentView.design({
              contentBinding: SC.Binding.oneWay('Smartgraphs.guideStepController.beforeText'),
              isVisibleBinding: SC.Binding.bool('Smartgraphs.guideStepController.beforeText')
            }),
            
            afterText: SC.StaticContentView.design({
              contentBinding: SC.Binding.oneWay('Smartgraphs.guideStepController.afterText'),
              isVisibleBinding: SC.Binding.bool('Smartgraphs.guideStepController.afterText')
            })
          })
        }),

        nextButton: SC.ButtonView.design({
          layout: {
            right: 30,            
            bottom: 36,
            height: 24,
            width: 80
          },
          title: "Next >>",
          action: 'openNextGuidePage',
          isEnabledBinding: SC.Binding.oneWay('Smartgraphs.guidePagesController.canSelectNextPage'),
          isVisibleBinding: SC.Binding.not('Smartgraphs.guidePagesController.isLastPage').oneWay()
        }),

        backButton: SC.ButtonView.design({
          layout: {
            bottom: 36,
            left: 30,
            height: 24,
            width: 80
          },
          title: "<< Back",
          action: 'openPreviousGuidePage',
          isEnabledBinding: SC.Binding.oneWay('Smartgraphs.guidePagesController.canSelectPreviousPage'),
          isVisibleBinding: SC.Binding.not('Smartgraphs.guidePagesController.isFirstPage').oneWay()
        })
      })
    }),
    
    
    // ..........................................................
    // RIGHT PANE
    //
    // the right pane shows the data the user is manipulating
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
