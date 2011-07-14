// ==========================================================================
// Project:   Smartgraphs.TableView
// Copyright: ©2010-2011 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// Author:    Parker Morse <pmorse@cantinaconsulting.com>
// ==========================================================================
/*globals Smartgraphs RaphaelViews */

/** @class

  A view for displaying table data.

  @extends SC.View
*/

sc_require('views/table_item');

Smartgraphs.TableView = SC.View.extend(
/** @scope Smartgraphs.TableView.prototype */ {
  
  showTableBinding:         '*tableController.showTable',
  annotationListBinding:    '*tableController.annotationList',  
  datadefBinding:           '*tableController.datadef',  
  latestXBinding:           '*tableController.latestX',
  latestYBinding:           '*tableController.latestY',
  
  xUnitsAbbreviatedBinding: '*tableController.xUnits.abbreviation',
  xShortLabelBinding:       '*tableController.xShortLabel',
  yUnitsAbbreviatedBinding: '*tableController.yUnits.abbreviation',
  yShortLabelBinding:       '*tableController.yShortLabel',
  
  recentTagIndexStackBinding: '*tableController.recentTagIndexStack',

  scrollView:   SC.outlet('tableColumnView.scrollView'),
  columnsView:  SC.outlet('tableColumnView.scrollView.contentView'),
  xsView:       SC.outlet('columnsView.xsView'),
  ysView:       SC.outlet('columnsView.ysView'),
  backdropView: SC.outlet('columnsView.backdropView'),
  
  xLabel: function () {
    var xUnitsAbbreviated = this.get('xUnitsAbbreviated');
    return xUnitsAbbreviated ? "%@ (%@)".fmt(this.get('xShortLabel'), xUnitsAbbreviated) : this.get('xShortLabel');
  }.property('xUnitsAbbreviated', 'xShortLabel').cacheable(),
  
  yLabel: function () {
    var yUnitsAbbreviated = this.get('yUnitsAbbreviated');
    return yUnitsAbbreviated ? "%@ (%@)".fmt(this.get('yShortLabel'), yUnitsAbbreviated) : this.get('yShortLabel');
  }.property('yUnitsAbbreviated', 'yShortLabel').cacheable(),
  
  init: function () {
    this._viewsByClassAndId = {};
    sc_super();
  },
  
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
    layout: { width: 350, left: 45 },
    classNames: ['smartgraph-table'],
    childViews: ['labelsView', 'scrollView'],
    
    labelsView: SC.View.design({
      classNames: ['table-background', 'table-background-top'],
      
      layout: { left: 40, top: 0, width: 250, height: 25 },
      childViews: ['xsLabel', 'ysLabel'],

      xsLabel: SC.LabelView.design({    
        layout: { left: 15, top: 7, width: 90, height: 18 },
        valueBinding: '.parentView.parentView.parentView.xLabel'
      }),

      ysLabel: SC.LabelView.design({
        layout: { left: 105, top: 7, width: 90, height: 18 },   
        valueBinding: '.parentView.parentView.parentView.yLabel'
      })
    }),
  
    scrollView: SC.ScrollView.design({
      layout: { left: 0, top: 25, width: 290 },
      classNames: ['table-background'], 
      
      borderStyle: SC.BORDER_NONE,
    
      contentView: SC.View.design({
        rowHeight: 15,
        
        tableControllerBinding: '.parentView.parentView.parentView.parentView*tableController',
        contentBinding:         '*tableController.arrangedObjects',
        selectionBinding:       '*tableController.selection',
        isSelectableBinding:    '*tableController.isSelectable',
        annotationsListBinding: '*tableController.annotationsList',
        contentLengthBinding:   '*content.length',        

        contentLengthDidChange: function () {
          this.adjustHeightForContentLength();
        }.observes('contentLength'),
        
        adjustHeightForContentLength: function () {
          var length = this.getPath('content.length');
          this.adjust('height', length === 0 ? 0 : length * this.get('rowHeight') + 15);
        },
        
        childViews: ['backdropView', 'xsView', 'ysView'],

        backdropView: RaphaelViews.RaphaelCanvasView.design({
          // This is the canvas behind the table, used for adding notes
          layout: { zIndex: 0, width: 290 },
        
          childViews: 'annotationsHolder'.w(),
        
          // Holds the annotation views.
          annotationsHolder: RaphaelViews.RaphaelView.design({
          })
        }),

        xsView: SC.ListView.design({
          // 'bottom: 3' is required or else scrolling all the way cuts off the bottom border.
          layout: { left: 50, top: 10, bottom: 3, width: 80 },
          classNames: 'table-column',

          rowHeightBinding: '.parentView.rowHeight',
          canEditContent: NO,
          contentValueKey: 'xRounded',
          contentBinding: '.parentView.content',
          isSelectableBinding: '.parentView.isSelectable',
          selectionBinding: '.parentView.selection',
          exampleView: Smartgraphs.TableItemView
        }),

        ysView: SC.ListView.design({
          // using left: rather than right: keeps the ysView from being pushed to the left when the scroll bar appears
          layout: { left: 140, top: 10, bottom: 3, width: 80 }, 
          classNames: 'table-column',

          rowHeightBinding: '.parentView.rowHeight',
          canEditContent: NO,
          contentValueKey: 'yRounded',
          contentBinding: '.parentView.content',
          isSelectableBinding: '.parentView.isSelectable',          
          selectionBinding: '.parentView.selection',
          exampleView: Smartgraphs.TableItemView          
        })
      })
    })
  }),
  
  datadefDidChange: function () {
    this.invokeOnce('adjustViews');
  }.observes('datadef'),
  
  showTableDidChange: function () {
    this.invokeOnce('adjustViews'); 
  }.observes('showTable'),
  
  annotationListDidChange: function () {
    // Added an annotation; now we need to adjust the canvas
    var list = this.get('annotationList');
    var item, classKey, id;
    var desiredViewsByClassAndId = {};

    // add views for items (datadefss or annotations) not currently in the list of child views
    for (var i = 0, ii = list.get('length'); i < ii; i++) {
      item = list.objectAt(i);

      // don't try to add or remove modifier annotations
      if (item.get('isModifierAnnotation')) continue;
      
      // I believe this is the most cross-browser-compatible way to get a unique key representing the class of the item
      classKey = SC.guidFor(item.constructor);
      id = item.get('id');

      // Add to the list of views we want to have
      if (desiredViewsByClassAndId[classKey] === undefined) {
        desiredViewsByClassAndId[classKey] = {};
      }

      desiredViewsByClassAndId[classKey][id] = item;     // for our reference when we remove views

      if (!this._viewsByClassAndId[classKey] || !this._viewsByClassAndId[classKey][id]) { 
        // If this view isn't already in the list, add it 
        this._addViewForItemToBackdrop(item, 'annotation');
      }
    }

    // remove views for no-longer-to-be-displayed items
    var oldView;

    for (classKey in this._viewsByClassAndId) {
      if (this._viewsByClassAndId.hasOwnProperty(classKey)) {
        for (id in this._viewsByClassAndId[classKey]) {
          if (this._viewsByClassAndId[classKey].hasOwnProperty(id)) {
            oldView = this._viewsByClassAndId[classKey][id]; // Get the existing view

            if (!desiredViewsByClassAndId[classKey] || !desiredViewsByClassAndId[classKey][id]) {
              // if the old view isn't in our list of desired views, remove it
              this._removeViewFromBackdrop(oldView);
            }
          }
        }
      }
    }
  }.observes('*annotationList.[]'),
  
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
      // line below, the scroll view believes its contentView's height is 0
      this.invokeLast(function () {
        innerView.adjustHeightForContentLength();
        
        // without the line below, the table columns render blank cells in the following scenario:
        // * pages A and B both display the same table
        // * the table is scrolled down (i.e its scroll offset is nonzero)
        // * and you move from page A to B
        scrollView.displayDidChange();   
      });
    }
    else {
      numericView.set('isVisible', YES);
      innerView.bindings.forEach( function (b) { b.disconnect(); });
      tableColumnView.set('isVisible', NO);       
    }
  },
  
  /**
    Adds an annotation view to the backdrop SVG
  */
  _addViewForItemToBackdrop: function (item, itemType) {
    var classKey = SC.guidFor(item.constructor);

    // create the view for the item we're adding
    var view = item.constructor.viewClass.design({
        tableView: this,
        item: item, 
        itemType: itemType
    }).create();
    
    // append view to the canvas
    if (view.get('canShowInTable')) {
      this.getPath('tableColumnView.scrollView.contentView.backdropView.annotationsHolder').appendChild(view);
      // Accounting
      if (this._viewsByClassAndId[classKey] === undefined) {
        this._viewsByClassAndId[classKey] = {};
      }    
      this._viewsByClassAndId[classKey][item.get('id')] = view;
    }

  },
  
  /**
    Removes an annotation view from the backdrop SVG
  */
  _removeViewFromBackdrop: function (view) {
    var item = view.get('item'),
        classKey = SC.guidFor(item.constructor),
        id = item.get('id');
    
    delete this._viewsByClassAndId[classKey][id];
    
    view.removeFromParent();
  },
  
  /**
    Returns the four outside corners of the table cell at itemIndex, relative to the backdropView SVG element.
    
    left is considered to be flush with the left side of the left (xs) column; right is considered to be flush with 
    the right of the right (ys) column.
    
    @param itemIndex the zero-based index of the element we're considering
    @returns {Object} Hash containing 'top', 'left', 'bottom', and 'right' coordinates of the table cell at itemIndex
  */
  coordinatesForIndex: function (itemIndex) {
    if (SC.none(itemIndex)) {     // remember itemIndex could be 0 which would be falsy
      return { top: -9999, left: -9999, bottom: -9999, right: -9999 };
    }
    
    var rowHeight = this.getPath('columnsView.rowHeight'), 
        $backdrop = this.get('backdropView').$(),
        backdropWidth = $backdrop.width(),
        backdropOffset = $backdrop.offset(),
        xsOffset = this.get('xsView').$().offset(),
        $ys = this.get('ysView').$(),
        ysOffset = $ys.offset(),
        ysWidth = $ys.width(),
        top = xsOffset.top - backdropOffset.top + itemIndex * rowHeight,
        left = xsOffset.left - backdropOffset.left,
        right = ysOffset.left + ysWidth - backdropOffset.left;
    
    return {
      top: top,
      left: left,
      bottom: top + rowHeight,
      right: right
    };
  },
  
  recentTagIndexStackDidChange: function () {
    this.invokeOnce(this.scrollToRecentTags);
  }.observes('.recentTagIndexStack.[]'),
  
  _scoreScrollPositions: function (stack, lowIndex, highIndex) {
    var score = 0,
        i,
        tagIndex;
        
    for (i = stack.length - 1; i >= 0; i--) {
      tagIndex = stack[i];
      if (lowIndex <= tagIndex && tagIndex <= highIndex) score += Math.pow(2, i);
    }
    return score;
  },  
    
  scrollToRecentTags: function (indices) {
    var stack       = this.get('recentTagIndexStack'),
        stackLength = stack.get('length'),
        tableLength = this.getPath('tableController.length'),
        rowHeight,
        tableHeight,
        xsViewTop,
        scrollPos,
        nRows,
        firstVisibleRow,
        lastVisibleRow,
        scrollDownScore,
        scrollUpScore,
        currentScore,
        latestTagIndex,
        lowIndex,
        highIndex,
        scrollToShow;
        
    // don't do anything if nothing is showing (tableLength is 0 or undefined)
    if (!tableLength) return;
    
    // don't scroll for removals from the stack
    if (stackLength >= this._previousTagIndexStackLength || !this._previousTagIndexStackLength) {
      rowHeight   = this.getPath('columnsView.rowHeight');
      tableHeight = this.get('scrollView').$().height();
      xsViewTop   = this.getPath('xsView.layout').top;
      scrollPos   = this.getPath('scrollView.verticalScrollOffset');
      nRows       = Math.floor(tableHeight / rowHeight);
      firstVisibleRow = Math.ceil((scrollPos - xsViewTop) / rowHeight);                   // index of first *fully* visible row
      lastVisibleRow  = Math.floor((tableHeight + scrollPos - xsViewTop) / rowHeight) - 1;
      latestTagIndex = stack[stack.length - 1];

      lowIndex = Math.max(0, latestTagIndex - nRows + 1);
      highIndex = Math.min(tableLength - 1, latestTagIndex + nRows - 1);

      currentScore = this._scoreScrollPositions(stack, firstVisibleRow, lastVisibleRow);
      scrollUpScore = this._scoreScrollPositions(stack, lowIndex, latestTagIndex);
      scrollDownScore = this._scoreScrollPositions(stack, latestTagIndex, highIndex);
      
      if (scrollDownScore > currentScore) {
        if (scrollUpScore > scrollDownScore) {
          // scroll up, but not more than necessary. Find the first index that fits in the window between lowIndex & latestTagIndex.
          scrollToShow = Math.min.apply(null, stack.filter( function (n) { return lowIndex <= n && n <= latestTagIndex; }));
        }
        else {
          // scroll down, but not more than necessary. Find the last idnex that fits in the window between latestTagIndex & highIndex
          scrollToShow = Math.min.apply(null, stack.filter( function (n) { return latestTagIndex <= n && n <= highIndex; }));
        }
        this.get('scrollView').scrollTo(0, scrollToShow * rowHeight + xsViewTop);        
      }
      // if currentScore wins, do nothing!
    }
    
    this._previousTagIndexStackLength = stackLength;
  }
  
});
