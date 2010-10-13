// ==========================================================================
// Project:   Smartgraphs.TableView
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Smartgraphs.TableView = SC.View.extend(
/** @scope Smartgraphs.TableView.prototype */ {
  
  showTableBinding: '*tableController.showTable',
  seriesBinding: '.parentView.parentView.parentView*tableController.series',
  xLabelBinding: '*tableController.axes.xLabelAbbreviated',
  yLabelBinding: '*tableController.axes.yLabelAbbreviated',
  latestXBinding: '*tableController.latestX',
  latestYBinding: '*tableController.latestY',
  
  displayedSeries: null,
  tableView: null,
  numericView: null,
  
  layout: { width: 250, centerX: 0, top: 10, bottom: 10 },

  childViews: ['labelsView', 'numericView', 'scrollerView'],

  labelsView: SC.View.design({
    layout: { left: 0, top: 0, width: 250, height: 30 },
    classNames: ['smartgraph-table'],
    childViews: ['xsLabel', 'ysLabel'],

    xsLabel: SC.LabelView.design({    
      layout: { left: 0, top: 0, width: 120, height: 25 },
      valueBinding: '.parentView.parentView.xLabel'
    }),

    ysLabel: SC.LabelView.design({
      layout: { right: 0, top: 0, width: 120, height: 25 },
      valueBinding: '.parentView.parentView.yLabel'
    })
  }),
  
  numericView: SC.View.design({
    layout: { left: 0, top: 70, width: 250, height: 200 },
    classNames: ['smartgraph-numeric-view'],
    
    childViews: ['xView', 'yView'],
    
    xView: SC.LabelView.design({
      layout: { left: 0, height: 100, width: 120 },
      valueBinding: '.parentView.parentView.latestX'
    }),
    
    yView: SC.LabelView.design({
      layout: { left: 130, height: 100, width: 120 },
      valueBinding: '.parentView.parentView.latestY'
    })
  }),
  
  scrollerView: SC.ScrollView.design({
    layout: { left: 0, top: 30, width: 250 },
    borderStyle: SC.BORDER_NONE,
    contentView: null
  }),
  
  seriesDidChange: function () {
    this.invokeOnce('adjustViews');
  }.observes('series'),
  
  showTableDidChange: function () {
    this.invokeOnce('adjustViews');    
  }.observes('showTable'),
  
  adjustViews: function () {
    var tableView = this.get('tableView');
    var numericView = this.get('numericView');
    var showTable = this.get('showTable');
    var series = this.get('series');
    var displayedSeries = this.get('displayedSeries');
    
    if (showTable) {
      numericView.set('isVisible', NO);
      
      if (tableView && (series !== displayedSeries)) {
        this.removeTableView();
        this.addTableView();
      }
      else if (!tableView) {
        this.addTableView();
      }
    }
    else {
      numericView.set('isVisible', YES);
      if (tableView) this.removeTableView();
    }
  },
  
  removeTableView: function () {
    var scrollerView = this.get('scrollerView');
    var tableView = this.get('tableView');
    
    scrollerView.set('contentView', null);
    scrollerView.set('isVisible', NO);        
    tableView.bindings.forEach(function (b) { b.disconnect(); });        
    this.set('tableView', null);
  },
  
  addTableView: function () {
    var scrollerView = this.get('scrollerView');
    var tableView = this.get('tableView');
    
    tableView = this.makeTableView();
    scrollerView.set('isVisible', YES);
    scrollerView.set('contentView', tableView);
    this.set('tableView', tableView);
            
    // tableView's content depends on parentView, which isn't set until the end of the runloop. Without the 
    // line below, the scroll view believes it's contentView's height is 0
    this.invokeLast(function () {
      tableView.adjust('height', tableView.getPath('content.length') * tableView.get('rowHeight'));
    });
  },
  
  makeTableView: function () {
    return SC.View.design({
      childViews: ['xsView', 'ysView'],

      classNames: ['smartgraph-table'],
    
      rowHeight: 18,
      contentBinding: '.parentView.parentView.parentView*tableController.arrangedObjects',
      selectionBinding: '.parentView.parentView.parentView*tableController.selection',

      xsView: SC.ListView.design({
        layout: { left: 0, top: 0, width: 120 },

        rowHeightBinding: '.parentView.rowHeight',
        canEditContent: NO,
        contentValueKey: 'xRounded',
        contentBinding: '.parentView.content',
        selectionBinding: '.parentView.selection'
      }),

      ysView: SC.ListView.design({
        // using left: rather than right: keeps the ysView from being pushed to the left when the scroll bar appears
        layout: { left: 130, top: 0, width: 120 }, 
      
        rowHeightBinding: '.parentView.rowHeight',
        canEditContent: NO,
        contentValueKey: 'yRounded',
        contentBinding: '.parentView.content',
        selectionBinding: '.parentView.selection',
        rowHeight: 18
      })
    }).create();
  }
  
});
