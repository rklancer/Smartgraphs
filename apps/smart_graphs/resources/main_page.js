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
    
    childViews: 'textView bottomLeftView graphView tableView'.w(),
    
    textView: SmartGraphs.HTMLView.design({
      layout: { left: 20, top: 20, width: 455, height: 335 },
      classNames: ['smartgraph-pane'],
      
      html: "<h2>Hi There!</h2> Try <a href='http://sproutcore.com'>Sproutcore</a> for all your: " +
        "<ul> <li> Software Needs <li> Graphing needs <li> Macrobiotic diets </ul>"
    }),
    
    bottomLeftView: SC.LabelView.design({
      layout: { left: 20, top: 365, width: 455, height: 335 },
      classNames: ['smartgraph-pane']
    }),
    
    graphView: SmartGraphs.RaphaelCollectionView.design({
      layout: { left: 485, top: 20, width: 455, height: 335 },      
      childViews: 'axesView'.w(),
      classNames: ['smartgraph-pane'],
      
      axesView: SmartGraphs.AxesView.design({
        layoutBinding: '.parentView.layout',
        xMinBinding: 'SmartGraphs.axesController.xMin',
        xMaxBinding: 'SmartGraphs.axesController.xMax',
        yMinBinding: 'SmartGraphs.axesController.yMin',
        yMaxBinding: 'SmartGraphs.axesController.yMax',
        xScaleBinding: 'SmartGraphs.axesController.xScale',
        yScaleBinding: 'SmartGraphs.axesController.yScale'
      })
    //   
    //   series1View: SmartGraphs.SeriesView.design({
    //     axesBinding: 'SmartGraphs.axesController',
    //     contentBinding: 'SmartGraphs.dataSeriesController.arrangedObjects',
    //     selectionBinding: 'SmartGraphs.dataSeriesController.selection'
    //   })
    }),

    tableView: SC.CollectionView.design({
      layout: { left: 485, top: 365, width: 455, height: 335 },
      classNames: ['smartgraph-pane'],  
  
      childViews: ['labelsView', 'scrollerView'],
      
      labelsView: SC.CollectionView.design({
        layout: { left: 0, top: 0, width: 455, height: 30 },
        childViews: ['xsLabel', 'ysLabel'],
        
        xsLabel: SC.LabelView.design({
          layout: { left: 30, width: 20, top: 7, height: 20 },
          displayValue: 'x'
        }),
        
        ysLabel: SC.LabelView.design({
          layout: { left: 90, width: 20, top: 7, height: 20 },
          displayValue: 'y'
        })
      }),
      
      scrollerView: SC.ScrollView.design({
        layout: { left: 0, top: 30, width: 455, height: 305 },

        borderStyle: SC.BORDER_NONE,
        
        contentView: SC.CollectionView.design({
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
            isEditable: YES,
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
            canEditContent: NO,
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
