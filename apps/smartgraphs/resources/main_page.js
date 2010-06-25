// ==========================================================================
// Project:   Smartgraphs - mainPage
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs CC*/

sc_require('main');

// This page describes the main user interface for your application.
Smartgraphs.mainPage = SC.Page.design({

  mainPane: SC.MainPane.design({
    layout: {
      width: 1260,
      height: 1250
    },

    childViews: 'dialogView replaceParentLayerButton replaceChildLayerButton graphView tableView'.w(), 
    
    dialogView: SC.View.design({
      layout: {
        left: 20,
        top: 10,
        width: 453,
        height: 578
      },
      
      classNames: 'smartgraph-pane'.w(),

      childViews: 'textView navButtons nextButton backButton'.w(),

      // provide padding and style rules for the intro text and dialog
      textView: SC.View.design({
        layout: {
          top: 20,
          left: 20,
          right: 20,
          bottom: 80
        },
        
        classNames: 'text-view'.w(),
        
        childViews: 'introTextView dialogTurnView'.w(),
        
        introTextView: SC.StaticContentView.design({
          contentBinding: SC.Binding.oneWay('Smartgraphs.guidePageController.introText'),
          isVisibleBinding: SC.Binding.bool('Smartgraphs.guidePageController.introText')
        }),
        
        dialogTurnView: Smartgraphs.DialogTurnView.design({})
      }),

      navButtons: SC.SegmentedView.design({
        layout: {
          bottom: 36,
          height: 24
        },

        // in order to enable the button for the next question when it becomes selectable:
        displayProperties: 'nextPageIsSelectable'.w(),

        itemsBinding: SC.Binding.oneWay('Smartgraphs.guidePageSequenceController'),
        itemTitleKey: 'title',
        itemIsEnabledKey: 'isSelectable',
        valueBinding: 'Smartgraphs.guidePageSequenceController.selectedPage',
        nextPageIsSelectableBinding: SC.Binding.oneWay('Smartgraphs.guidePageSequenceController*nextPage.isSelectable')
      }),
      
      nextButton: SC.ButtonView.design({
        displayProperties: ['isEnabled'],
        layout: {
          bottom: 36,
          height: 24,
          right: 30,
          width: 80
        },
        title: "Next >>",
        target: 'Smartgraphs.guidePageSequenceController',
        action: 'selectNextPage',
        isEnabledBinding: SC.Binding.oneWay('Smartgraphs.guidePageSequenceController.canSelectNextPage'),
        isVisibleBinding: SC.Binding.not('Smartgraphs.guidePageSequenceController.isLastPage').oneWay()
      }),
      
      backButton: SC.ButtonView.design({
        displayProperties: ['isEnabled'],
        layout: {
          bottom: 36,
          height: 24,
          left: 30,
          width: 80
        },
        title: "<< Back",
        target: 'Smartgraphs.guidePageSequenceController',
        action: 'selectPreviousPage',
        isEnabledBinding: SC.Binding.oneWay('Smartgraphs.guidePageSequenceController.canSelectPreviousPage'),
        isVisibleBinding: SC.Binding.not('Smartgraphs.guidePageSequenceController.isFirstPage').oneWay()
      })
    }),
    
    replaceParentLayerButton: SC.ButtonView.design({
      layout: {
        left: 700,
        top: 400,
        height: 24,
        width: 180
      },
      title: 'Replace Parent Layer',
      target: 'Smartgraphs.mainPage.mainPane.graphView.rectView',
      action: 'replaceLayer'
    }),
    
    replaceChildLayerButton: SC.ButtonView.design({
      layout: {
        left: 700,
        top: 450,
        height: 24,
        width: 180
      },
      title: 'Replace Child Layer',
      target: 'Smartgraphs.mainPage.mainPane.graphView.rectView.textView',
      action: 'replaceLayer'
    }),
    
    graphView: Smartgraphs.RaphaelCanvasView.design({
      layout: {
        left: 485,
        top: 10,
        width: 453,
        height: 283
      },
      childViews: 'rectView'.w(),
      classNames: ['smartgraph-pane'],
      
      rectView: Smartgraphs.ExampleRaphaelView.design({
        selectionBinding: 'Smartgraphs.dataSeriesController.selection',
        childViews: ['textView'],

        rectWidth: function () {
          var sel = this.get('selection');
          var len = (sel && sel.get('length') > 0) ? sel.toArray().objectAt(0).get('y')+'' : 0;
          len = parseInt(len, 10);
          return (len/2000) * (this.getPath('parentView.frame').width - 100);
        }.property('selection'),
        
        textView: Smartgraphs.RaphaelTextView.design({
          rectWidthBinding: '.parentView.rectWidth',
          text: function () {
            return Math.round(this.get('rectWidth'));
          }.property('rectWidth'),

          x: 75,
          y: 50          // obviously we'll need to deal with layout and frames and the like
        })
      })
    }),
    
    tableView: SC.View.design({
      //isVisibleBinding: SC.Binding.not('Smartgraphs.guidePageController.shouldShowImage').oneWay(),      
      layout: {
        left: 485,
        top: 305,
        width: 188,
        height: 283
      },
      classNames: ['smartgraph-pane'],
      
      childViews: ['labelsView', 'scrollerView'],
      
      labelsView: SC.View.design({
        layout: {
          left: 0,
          top: 0,
          width: 190,
          height: 30
        },
        childViews: ['xsLabel', 'ysLabel'],
        
        xsLabel: SC.LabelView.design({
          layout: {
            right: 10,
            width: 80,
            top: 7,
            height: 20
          },

          valueBinding: SC.Binding.oneWay('Smartgraphs.axesController.xLabelAbbreviated')
        }),
        
        ysLabel: SC.LabelView.design({
          layout: {
            left: 10,
            width: 80,
            top: 7,
            height: 20
          },
          valueBinding: SC.Binding.oneWay('Smartgraphs.axesController.yLabelAbbreviated')
        })
      }),
      
      scrollerView: SC.ScrollView.design({
        layout: {
          left: 0,
          top: 30,
          width: 190,
          bottom: 15
        },
        
        borderStyle: SC.BORDER_NONE,
        
        contentView: SC.View.design({
          childViews: ['xsView', 'ysView'],
          
          // look at SC.ContentDisplay for this too
          xHeightBinding: SC.Binding.from('.xsView.calculatedHeight').oneWay(),
          yHeightBinding: SC.Binding.from('.ysView.calculatedHeight').oneWay(),
          
          height: function(){
            return Math.max(this.get('xHeight'), this.get('yHeight'));
          }.property('xHeight', 'yHeight').cacheable(),
          
          _heightDidChange: function(){
            this.invokeOnce(this._adjustHeight);
          }.observes('height'),
          
          _adjustHeight: function () {
            this.adjust('height', this.get('height'));
          },
          
          xsView: Smartgraphs.HeightAdjustingListView.design({
            layout: {
              left: 100,
              top: 0,
              width: 70
            },

            canEditContent: NO,
            contentValueKey: 'x',
            contentBinding: 'Smartgraphs.dataSeriesController.arrangedObjects',
            selectionBinding: 'Smartgraphs.dataSeriesController.selection',
            rowHeight: 18
          }),
          
          ysView: Smartgraphs.HeightAdjustingListView.design({
            layout: {
              left: 10,
              top: 0,
              width: 70
            },

            canEditContent: NO,
            contentValueKey: 'y',
            contentBinding: 'Smartgraphs.dataSeriesController.arrangedObjects',
            selectionBinding: 'Smartgraphs.dataSeriesController.selection',
            rowHeight: 18
          })
        })
      })
    }),
		
    authoringModeButton: SC.ButtonView.design({
      layout: {
        left: 20,
        top: 600
      },
      useStaticLayout: YES,
      title: 'Toggle Authoring Mode',
      targetBinding: 'Smartgraphs.authoringController',
      action: 'toggleAuthoring'
    }),
    
    authorScrollView: SC.ScrollView.design({
      layout: {
        left: 965,
        top: 5,
        width: 300
      },
      
      borderStyle: SC.BORDER_NONE,
      
      contentView: Smartgraphs.AuthorView.design({
        contentBinding: "Smartgraphs.guidePageSequenceController.selectedPage",
        canEditContent: YES //TODO: Make authoring actually work (persistent)
      }),
      isVisibleBinding : "Smartgraphs.authoringController.isAuthoring"
    })
  })
});
