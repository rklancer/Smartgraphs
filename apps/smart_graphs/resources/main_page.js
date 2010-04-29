// ==========================================================================
// Project:   SmartGraphs - mainPage
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals SmartGraphs */

// This page describes the main user interface for your application.

//SmartGraphs.generateLayout = function (corner,   
SmartGraphs.mainPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page 
  // load.
  mainPane: SC.MainPane.design({
    layout: { width: 960, height: 720 },
    
    childViews: 'textView graphView tableView'.w(),
    
    textView: SmartGraphs.HTMLView.design({
      layout: { left: 20, top: 20, width: 455, height: 680 },
      classNames: ['smartgraph-pane'],
      
      // html: "<h2>Hi There!</h2> Try <a href='http://sproutcore.com'>Sproutcore</a> for all your: " +
      //   "<ul> <li> Software Needs <li> Graphing needs <li> Macrobiotic diets </ul>"
      
      html: "Maria ran practice laps around the track. Her coach wrote the distance she ran after each minute. These data are shown in the scatterplot and the table at right." + 
           "<br><br>Click on a point in the scatterplot where Maria stopped to talk with her coach."
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
