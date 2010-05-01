// ==========================================================================
// Project:   SmartGraphs - mainPage
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals SmartGraphs */

// This page describes the main user interface for your application.

//SmartGraphs.generateLayout = function (corner,   
SmartGraphs.mainPage = SC.Page.design({

  // random change.
  // obviously, these non-mainPane views could be controlled by a controller.
  introView: SC.StaticContentView.design({
        classNames: ['sg-question'],
        content: "Maria ran practice laps around the track. Her coach wrote the distance she ran after each minute. " +
              "These data are shown in the scatterplot and the table at right." + 
              "<br><br>Click on a point in the scatterplot where Maria stopped to talk with her coach."
      // ,
      // 
      // SC.ButtonView.design({
      //   layout: { width: 80 },
      //   title: "Next"
      // })]
  }),
  
  followupView: SC.StaticContentView.design({
    classNames: ['sg-question'],
    content: "For how long did Maria talk with her coach?"
  }),
  
  topperView: SC.StaticContentView.design({
    classNames: ['sg-question'],
    content: "Did you notice that Maria's coach must have written down her position three times while they were talking?"+
          "<br><br>About how long did it take Maria to start running again after the third time?"
  }),
  
  mainPane: SC.MainPane.design({
    layout: { width: 960, height: 720 },
    
    childViews: 'promptView graphView tableView'.w(),
    
    promptView: SC.View.design({
      layout: { left: 20, top: 20, width: 455, height: 680 },
      classNames: ['smartgraph-pane'],
      
      childViews: 'tabView'.w(),

      tabView: SC.TabView.design({ 
        layout: {top: 30, bottom: 5, left: 5, right: 5 }, 
        items: [ 
          { title: "Maria's Run", value: 'SmartGraphs.mainPage.introView' },
          { title: 'A Pep Talk', value: 'SmartGraphs.mainPage.followupView' },
          { title: 'Back to Running', value: 'SmartGraphs.mainPage.topperView' }
        ], 
        itemTitleKey: 'title', 
        itemValueKey: 'value', 
        nowShowing: 'SmartGraphs.mainPage.introView',
        userDefaultKey: 'mainPaneTab'
      })
    }),

    // bottomLeftView: SC.LabelView.design({
    //   layout: { left: 20, top: 365, width: 455, height: 335 },
    //   classNames: ['smartgraph-pane']
    // }),
    
    graphView: SmartGraphs.RaphaelView.design({
      layout: { left: 485, top: 20, width: 455, height: 335 },      
      childViews: 'axesView series1View'.w(),
      classNames: ['smartgraph-pane'],

      axesView: SmartGraphs.AxesView.design({    
        xMinBinding: 'SmartGraphs.axesController.xMin',
        xMaxBinding: 'SmartGraphs.axesController.xMax',
        yMinBinding: 'SmartGraphs.axesController.yMin',
        yMaxBinding: 'SmartGraphs.axesController.yMax',
        xStepsBinding: 'SmartGraphs.axesController.xSteps',
        yStepsBinding: 'SmartGraphs.axesController.ySteps',
        paddingBinding: 'SmartGraphs.axesController.padding'
      }),
      
      series1View: SmartGraphs.SeriesView.design({
        xMinBinding: 'SmartGraphs.axesController.xMin',
        xMaxBinding: 'SmartGraphs.axesController.xMax',
        yMinBinding: 'SmartGraphs.axesController.yMin',
        yMaxBinding: 'SmartGraphs.axesController.yMax',
        xScaleBinding: 'SmartGraphs.axesController.xScale',
        yScaleBinding: 'SmartGraphs.axesController.yScale',
        paddingBinding: 'SmartGraphs.axesController.padding',
        controllerBinding: 'SmartGraphs.dataSeriesController',
        contentBinding: 'SmartGraphs.dataSeriesController.arrangedObjects',
        selectionBinding: 'SmartGraphs.dataSeriesController.selection'
      })
      
    }),

    tableView: SC.View.design({
      layout: { left: 485, top: 365, width: 455, height: 335 },
      classNames: ['smartgraph-pane'],  
  
      childViews: ['labelsView', 'scrollerView'],
      
      labelsView: SC.View.design({
        layout: { left: 0, top: 0, width: 455, height: 30 },
        childViews: ['xsLabel', 'ysLabel'],
        
        xsLabel: SC.LabelView.design({
          layout: { left: 10, width: 40, top: 7, height: 20 },
          displayValue: 'time'
        }),
        
        ysLabel: SC.LabelView.design({
          layout: { left: 70, width: 50, top: 7, height: 20 },
          displayValue: 'distance'
        })
      }),
      
      scrollerView: SC.ScrollView.design({
        layout: { left: 0, top: 30, width: 455, height: 305 },

        borderStyle: SC.BORDER_NONE,
        
        contentView: SC.View.design({
          childViews: ['xsView', 'ysView'],          

          xHeightBinding: SC.Binding.from('.xsView.height').oneWay(),
          yHeightBinding: SC.Binding.from('.ysView.height').oneWay(),
          
          height: function () {
            return Math.max(this.get('xHeight'), this.get('yHeight'));
          }.property('xHeight', 'yHeight').cacheable(),
          
          _heightDidChange: function () {
            this.adjust('height', this.get('height'));
          }.observes('height'),

          xsView: SC.ListView.design({
            height: function () {
              var layout = this.get('layout');
              return this.get('calculatedHeight') + (layout.top || 0) + (layout.bottom || 0);
            }.property('calculatedHeight', 'layout').cacheable(),
            
            layout: { left: 10, top: 0, bottom: 15, width: 50 },
            canEditContent: NO,
            contentValueKey: 'x',
            contentBinding: 'SmartGraphs.dataSeriesController.arrangedObjects',
            selectionBinding: 'SmartGraphs.dataSeriesController.selection',
            rowHeight: 18
          }),
        
          ysView: SC.ListView.design({
            height: function () {
              var layout = this.get('layout');
              return this.get('calculatedHeight') + (layout.top || 0) + (layout.bottom || 0);
            }.property('calculatedHeight', 'layout').cacheable(),
              
            layout: { left: 70, top: 0, bottom: 15, width: 50 },
            isEditable: YES,
            canEditContent: YES,
            contentValueKey: 'y',
            contentBinding: 'SmartGraphs.dataSeriesController.arrangedObjects',
            selectionBinding: 'SmartGraphs.dataSeriesController.selection',
            rowHeight: 18
          })
        })
      })
    })
  })
});
