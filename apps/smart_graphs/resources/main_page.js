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
          
          xsView: SC.ListView.design({
            layout: { left: 10, top: 0, bottom: 15, width: 50 },
            isEditable: YES,
            canEditContent: NO,
            contentValueKey: 'x',
            contentBinding: 'SmartGraphs.dataSeriesController.arrangedObjects',
            selectionBinding: 'SmartGraphs.dataSeriesController.selection',
            rowHeight: 18
          }),
        
          ysView: SC.ListView.design({
            layout: { left: 70, top: 0, bottom: 15, width: 50 },
            isEditable: YES,
            canEditContent: NO,
            contentValueKey: 'y',
            contentBinding: 'SmartGraphs.dataSeriesController.arrangedObjects',
            selectionBinding: 'SmartGraphs.dataSeriesController.selection',
            rowHeight: 18
          }),

          init: function () {
            sc_super();
            
            this._contentHeightDidChange = function () {
              console.log('_contentHeightDidChange');

              var xsView = this.get('xsView');
              var ysView = this.get('ysView');

              var xLayout = xsView.get('layout');
              var yLayout = ysView.get('layout');
              
              var xh = xsView.get('calculatedHeight') + (xLayout.top || 0) + (xLayout.bottom || 0);
              var yh = ysView.get('calculatedHeight') + (yLayout.top || 0) + (yLayout.bottom || 0);
              
              var newLayout = SC.copy(this.get('layout'));
              newLayout.height = Math.max(xh, yh);
              this.set('layout', newLayout);
            };
            
            var xsView = this.get('xsView');
            var ysView = this.get('ysView');
            
            xsView.addObserver('calculatedHeight', this, this._contentHeightDidChange);
            ysView.addObserver('calculatedHeight', this, this._contentHeightDidChange);
          }
        })
      })
    })
  })
});
