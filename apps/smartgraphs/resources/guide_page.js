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
        childViews: 'textWrapper nextButton'.w(),

        // provide padding and style rules for the intro text and dialog
        textWrapper: SC.View.design({
          layout: {
            top: 20,
            right: 20,
            bottom: 80,
            left: 20
          },

          classNames: 'text-wrapper'.w(),

          childViews: 'introText guideStepWrapper'.w(),

          introText: SC.StaticContentView.design({
            contentBinding: SC.Binding.oneWay('Smartgraphs.guidePageController.introText'),
            isVisibleBinding: SC.Binding.bool('Smartgraphs.guidePageController.introText')
          }),
          
          guideStepWrapper: SC.View.design({
            useStaticLayout: YES,
            hasStaticLayout: YES,
            
            childViews: 'guideStepDialog buttonsView'.w(),
            
            guideStepDialog: SC.View.design({          
              useStaticLayout: YES,
              hasStaticLayout: YES,    
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
            }),
          
            buttonsView: SC.View.design({
              useStaticLayout: YES,
              hasStaticLayout: YES,
            
              layout: {
                height: 24
              },

              childViews: 'submitButton'.w(),

              submitButton: SC.ButtonView.design({
                layout: {
                  width: 160,
                  right: 0
                },
                titleBinding: 'Smartgraphs.guideStepController.submitButtonTitle',
                isVisibleBinding: 'Smartgraphs.guideStepController.submitButtonShouldBeVisible',
                isEnabledBinding: 'Smartgraphs.guideStepController.submitButtonShouldBeEnabled',
                action: 'finishGuideStep'
              })
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
          isEnabledBinding: 'Smartgraphs.pageNavController.nextShouldBeEnabled',
          isVisibleBinding: 'Smartgraphs.pageNavController.nextShouldBeVisible'
        })//,
        
        // TODO disabled for now, until we have page *visitation* working.

        // backButton: SC.ButtonView.design({
        //   layout: {
        //     bottom: 36,
        //     left: 30,
        //     height: 24,
        //     width: 80
        //   },
        //   title: "<< Back",
        //   action: 'openPreviousGuidePage',
        //   isEnabledBinding: SC.Binding.oneWay('Smartgraphs.guidePagesController.canSelectPreviousPage'),
        //   isVisibleBinding: SC.Binding.not('Smartgraphs.guidePagesController.isFirstPage').oneWay()
        // })
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
        nowShowingBinding: 'Smartgraphs.guideViewController.dataViewNowShowing'
      })
    })
  }),
  
  singlePaneDataView: SC.ContainerView.design({
    classNames: 'smartgraph-pane',
    nowShowingBinding: 'Smartgraphs.guideViewController.firstPaneNowShowing'
  }),
  
  splitPaneDataView: SC.View.design({
    childViews: 'topPaneWrapper bottomPaneWrapper'.w(),
    
    topPaneWrapper: SC.View.design({
      layout: { top: 0, height: 0.5 },
      childViews: 'topPane'.w(),
      
      topPane: SC.ContainerView.design({
        layout: { bottom: 5 },
        classNames: 'smartgraph-pane',
        nowShowingBinding: 'Smartgraphs.guideViewController.firstPaneNowShowing'
      })
    }),

    bottomPaneWrapper: SC.View.design({
      layout: { bottom: 0, height: 0.5 },
      childViews: 'bottomPane'.w(),
    
      bottomPane: SC.ContainerView.design({
        layout: { top: 5 },
        classNames: 'smartgraph-pane',//TEMP
        nowShowingBinding: 'Smartgraphs.guideViewController.secondPaneNowShowing'
      })
    })
  }),
  
  firstImageView: SC.ImageView.design({
    useStaticLayout: YES,
    hasStaticLayout: YES,
    valueBinding: 'Smartgraphs.guideViewController.firstImageValue',
    
    // This is a hack.  At the moment SC.View.layoutStyle doesn't know how to set width or height to '100%',
    // which is required for an image to resize automatically (left:0, right:0 does not do the trick.)
    // Therefore, override the width and height styles (viewDidResize gets called, I believe, whenever the layer's 
    // layout style is updated)
    viewDidResize: function () {
      this.$().width('100%');
      this.$().height('100%');
    }
  }),
  
  secondImageView: SC.ImageView.design({
    useStaticLayout: YES,
    hasStaticLayout: YES,    
    valueBinding: 'Smartgraphs.guideViewController.secondImageValue',

    // same hack described in firstImageView:
    viewDidResize: function () {
      this.$().width('100%');
      this.$().height('100%');
    }
  }),
  
  firstGraphView: Smartgraphs.GraphView.design({
    graphBinding: 'Smartgraphs.firstGraphController',
    viewName: 'firstGraphView'
  }),
  
  secondGraphView: Smartgraphs.GraphView.design({
    graphBinding: 'Smartgraphs.secondGraphController',
    viewName: 'secondGraphView'  
  }),
  
  firstTableView: Smartgraphs.TableView.design({}),
  
  secondTableView: Smartgraphs.TableView.design({})
  
});
