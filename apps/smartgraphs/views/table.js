// ==========================================================================
// Project:   Smartgraphs.TableView
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  A view for displaying table data.

  @extends SC.View
*/

sc_require('views/table_item');

Smartgraphs.TableView = SC.View.extend(
/** @scope Smartgraphs.TableView.prototype */ {
  
  showTableBinding: '*tableController.showTable',
  showLabelsBinding: '*tableController.showLabels',
  datasetBinding: '*tableController.dataset',
  xLabelBinding: '*tableController.axes.xLabelAbbreviated',
  yLabelBinding: '*tableController.axes.yLabelAbbreviated',
  latestXBinding: '*tableController.latestX',
  latestYBinding: '*tableController.latestY',
  
  fix: function (val, n) {
    return (val === undefined || val === null) ? null : val.toFixed(n);
  },
  
  numericX: function () {
    return this.fix(this.get('latestX'), 1);
  }.property('latestX').cacheable(),
  
  numericY: function () {
    return this.fix(this.get('latestY'), 2);    
  }.property('latestY').cacheable(), 
  
  layout: { top: 10, bottom: 10 },

  childViews: ['numericView', 'tableColumnView'],
  
  numericView: SC.View.design({
    layout: { width: 300, centerX: -10, height: 90, centerY: -10 },
    
    childViews: ['xs', 'ys'],
    
    xs: SC.View.design({
      layout: { left: 0, width: 100 },
      childViews: ['xLabel', 'xValue'],
      
      xLabel: SC.LabelView.design({
        classNames: ['smartgraph-numeric-view-label'],
        layout: { top: 0, height: 25 },
        textAlign: SC.ALIGN_RIGHT,
        valueBinding: '.parentView.parentView.parentView.xLabel'
      }),
      
      xValue: SC.LabelView.design({
        classNames: ['smartgraph-numeric-view-value'],        
        layout: { top: 40 },
        // make the decimals (approximately) line up
        textAlign: SC.ALIGN_RIGHT,
        valueBinding: '.parentView.parentView.parentView.numericX'
      })
    }),
    
    ys: SC.View.design({
      layout: { right: 0, width: 120 },
      
      childViews: ['yLabel', 'yValue'],
      
      yLabel: SC.LabelView.design({
        classNames: ['smartgraph-numeric-view-label'],        
        layout: { top: 0, height: 25 },
        textAlign: SC.ALIGN_RIGHT,
        valueBinding: '.parentView.parentView.parentView.yLabel'
      }),
      
      yValue: SC.LabelView.design({
        classNames: ['smartgraph-numeric-view-value'],          
        layout: { top: 40 },
        textAlign: SC.ALIGN_RIGHT,
        valueBinding: '.parentView.parentView.parentView.numericY'
      })
    })
  }),
  
  tableColumnView: SC.View.design({
    layout: { width: 250, centerX: 0 },
    
    childViews: ['labelsView', 'scrollView'],
    
    labelsView: SC.View.design({
      isVisibleBinding: '.parentView.parentView.showLabels',
      
      layout: { left: 0, top: 0, width: 250, height: 30 },
      classNames: ['smartgraph-table'],
      childViews: ['xsLabel', 'ysLabel'],

      xsLabel: SC.LabelView.design({    
        layout: { left: 0, top: 0, width: 120, height: 25 },
        valueBinding: '.parentView.parentView.parentView.xLabel'
      }),

      ysLabel: SC.LabelView.design({
        layout: { right: 0, top: 0, width: 120, height: 25 },
        valueBinding: '.parentView.parentView.parentView.yLabel'
      })
    }),
  
    scrollView: SC.ScrollView.design({
      layout: { left: 0, top: 35, width: 250 },
      borderStyle: SC.BORDER_NONE,
    
      contentView: SC.View.design({
        classNames: ['smartgraph-table'],

        rowHeight: 20,
        contentBinding: '.parentView.parentView.parentView.parentView*tableController.arrangedObjects',
        selectionBinding: '.parentView.parentView.parentView.parentView*tableController.selection',
        contentLengthBinding: '.content.length',
        annotationsListBinding: '.parentView.parentView.parentView.parentView*tableController.annotationsList',
        // TODO: So the parent now knows about the list of annotations...
        
        contentLengthDidChange: function () {
          this.adjust('height', this.get('contentLength') * this.get('rowHeight'));
        }.observes('contentLength'),
      
        childViews: ['xsView', 'ysView'],

        xsView: SC.ListView.design({
          layout: { left: 0, top: 0, width: 120 },

          rowHeightBinding: '.parentView.rowHeight',
          canEditContent: NO,
          contentValueKey: 'xRounded',
          contentBinding: '.parentView.content',
          selectionBinding: '.parentView.selection',
          exampleView: Smartgraphs.TableItemView
        }),

        ysView: SC.ListView.design({
          // using left: rather than right: keeps the ysView from being pushed to the left when the scroll bar appears
          layout: { left: 130, top: 0, width: 120 }, 
      
          rowHeightBinding: '.parentView.rowHeight',
          canEditContent: NO,
          contentValueKey: 'yRounded',
          contentBinding: '.parentView.content',
          selectionBinding: '.parentView.selection',
          exampleView: Smartgraphs.TableItemView          
        })
      })
    })
  }),
  
  datasetDidChange: function () {
    this.invokeOnce('adjustViews');
  }.observes('dataset'),
  
  showTableDidChange: function () {
    this.invokeOnce('adjustViews');    
  }.observes('showTable'),
  
  adjustViews: function () {
    var tableColumnView = this.get('tableColumnView');
    var scrollView = tableColumnView.get('scrollView');
    var innerView = scrollView.get('contentView');
    var numericView = this.get('numericView');
    
    if (this.get('showTable')) {
      numericView.set('isVisible', NO);
      innerView.bindings.forEach( function (b) { b.connect(); } );
      tableColumnView.set('isVisible', YES);
      
      // innerView's content depends on parentView, which isn't set until the end of the runloop. Without the 
      // line below, the scroll view believes it's contentView's height is 0
      this.invokeLast(function () {
        innerView.adjust('height', innerView.getPath('content.length') * innerView.get('rowHeight'));
      });
    }
    else {
      numericView.set('isVisible', YES);
      innerView.bindings.forEach( function (b) { b.disconnect(); } );
      tableColumnView.set('isVisible', NO);       
    }
  }
  
});
