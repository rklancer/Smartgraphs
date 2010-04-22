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
    
    graphView: SmartGraphs.GraphView.design({
      seriesBinding: 'SmartGraphs.dataSeriesController.arrangedObjects',
      selectionBinding: 'SmartGraphs.dataSeriesController.selection',
      
      layout: { left: 485, top: 20, width: 455, height: 335 },
      classNames: ['smartgraph-pane']
    }),


    tableView: SC.ScrollView.design({
      layout: { left: 485, top: 365, width: 455, height: 335 },
      classNames: ['smartgraph-pane'],  

      _contentHeightDidChange: function () {
        var xh = this.getPath('contentView.xsView.calculatedHeight'),
            yh = this.getPath('contentView.ysView.calculatedHeight'),
            h  = Math.max(xh, yh);
      
        var layout = SC.copy(this.getPath('contentView.layout'));
        layout.height = h;
        this.setPath('contentView.layout', layout);
        
        console.log('_contentHeightDidChange');
      }.observes('.contentView.xsView.calculatedHeight', '.contentView.ysView.calculatedHeight'),
      
      
      contentView:  SC.StackedView.design({
        childViews: ['xsView', 'ysView'],

        xsView: SC.ListView.design({
          layout: { left: 5, width: 50 },
          contentBinding: 'SmartGraphs.dataSeriesController.xs',
          selectionBinding: 'SmartGraphs.dataSeriesController.selection',
          rowHeight: 18
        }),
        
        ysView: SC.ListView.design({
          layout: { left: 60, width: 50 },
          contentBinding: 'SmartGraphs.dataSeriesController.ys',
          selectionBinding: 'SmartGraphs.dataSeriesController.selection',
          rowHeight: 18
        })
      })
    })
  })
});
