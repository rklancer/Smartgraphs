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
  yUnitsAbbreviatedBinding: '*tableController.yUnits.abbreviation',

  xPaneLabelBinding: '*tableController.xLabel',
  yPaneLabelBinding: '*tableController.yLabel',
  recentTagIndexStackBinding: '*tableController.recentTagIndexStack',

  scrollView:   SC.outlet('tableColumnView.scrollView'),
  columnsView:  SC.outlet('tableColumnView.scrollView.contentView'),
  xsView:       SC.outlet('columnsView.xsView'),
  ysView:       SC.outlet('columnsView.ysView'),
  backdropView: SC.outlet('columnsView.backdropView'),

  xLabel: function () {
    var xUnitsAbbreviated = this.get('xUnitsAbbreviated');
    return xUnitsAbbreviated ? "%@ (%@)".fmt(this.get('xPaneLabel'), xUnitsAbbreviated) : this.get('xPaneLabel');
  }.property('xUnitsAbbreviated', 'xPaneLabel').cacheable(),

  yLabel: function () {
    var yUnitsAbbreviated = this.get('yUnitsAbbreviated');
    return yUnitsAbbreviated ? "%@ (%@)".fmt(this.get('yPaneLabel'), yUnitsAbbreviated) : this.get('yPaneLabel');
  }.property('yUnitsAbbreviated', 'yPaneLabel').cacheable(),

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
        layout: { top: 0, height: 50 },
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
        layout: { top: 0, height: 50 },
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

      layout: { left: 40, top: 0, width: 250, height: 50 },
      childViews: ['xsLabel', 'ysLabel'],

      xsLabel: SC.LabelView.design({
        layout: { left: 15, top: 7, width: 90, height: 50 },
        valueBinding: '.parentView.parentView.parentView.xLabel'
      }),

      ysLabel: SC.LabelView.design({
        layout: { left: 105, top: 7, width: 90, height: 50 },
        valueBinding: '.parentView.parentView.parentView.yLabel'
      })
    }),

    scrollView: SC.ScrollView.design({
      layout: { left: 0, top: 50, width: 290 },
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
          tableControllerBinding: '.parentView*tableController',
          contentValueKeyBinding: '*tableController.xRoundingFunc',
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
          tableControllerBinding: '.parentView*tableController',
          contentValueKeyBinding: '*tableController.yRoundingFunc',
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

  /**
    @private

    Score a possible scroll to [lowIndex..highIndex] using a powers-of-two scheme so that:
      * showing the topmost (most recently added) row on the stack beats showing any combination of the other rows,
      * if the most recently added row is showing, then also showing the next-most-recently added row beats showing
        any combination of earlier rows,
      * etc.

    Higher scores are better.

    Example: if the window is [3..8] and the stack is [1,5,3] then:
       * only rows 5 and 3 can be shown
       * the score is 4 + 2 = 6 (the most recent row, 3, shows and is "worth" 2^2 = 4; the second-most recent row shows
         and is "worth" 2^1 = 2; the third-most recent row does not show, so it counts for 0
  */
  _scoreScrollPositions: function (stack, lowIndex, highIndex) {
    var score = 0,
        i;

    for (i = stack.length - 1; i >= 0; i--) {
      score = (score * 2) + ((lowIndex <= stack[i] && stack[i] <= highIndex) ? 1 : 0);
    }
    return score;
  },

  scrollToRecentTags: function (indices) {
    var stack       = this.get('recentTagIndexStack'),
        stackLength = stack.get('length'),
        tableLength = this.getPath('tableController.length'),
        scrollView,
        rowHeight,
        tableHeight,
        paddingTop,
        scrollPos,
        nRows,
        firstVisibleRow,
        lastVisibleRow,
        score,
        currentScore,
        windowScores,
        maxScore,
        rowsToDisplay,
        windowStart,
        windowEnd,
        topRowToDisplay,
        bottomRowToDisplay,
        newTopRow;

    // don't do anything if nothing is showing or there is nothing newly tagged
    if (!tableLength || !stackLength) return;

    // only do something if a tagged point was added or changed (which is to say, skip the following if the stack *shrunk*)
    if (stackLength >= this._previousTagIndexStackLength || !this._previousTagIndexStackLength) {

      scrollView      = this.get('scrollView');
      rowHeight       = this.getPath('columnsView.rowHeight');
      tableHeight     = scrollView.$().height();
      paddingTop      = this.getPath('xsView.layout').top;
      scrollPos       = scrollView.get('verticalScrollOffset');
      nRows           = Math.floor(tableHeight / rowHeight);
      firstVisibleRow = Math.ceil((scrollPos - paddingTop) / rowHeight);                    // index of first *fully* visible row
      lastVisibleRow  = Math.floor((tableHeight + scrollPos - paddingTop) / rowHeight) - 1; // index of last  *fully* visible row

      // The idea below is to enumerate all possible "windows" of rows that could be visible at the same time, scored
      // such that windows that show recently-tagged points score higher. Showing the just-tagged point scores higher
      // than showing any other combination of points, and so on.

      // The obvious optimization used is that it's not necessary to score *all* windows, i.e., those starting at
      // row 0, row 1, row 2, ...; it's only necessary to score the windows starting at some tagged row. (If rows m and
      // n are tagged rows, with no rows between m and n being tagged, then the score of a window starting at any row
      // between m and n must be less than either the score of the window starting at m or the score of the window
      // starting at n)

      score           = this._scoreScrollPositions;
      currentScore    = score(stack, firstVisibleRow, lastVisibleRow);
      windowScores    = stack.map( function (row) { return score(stack, row, row + nRows - 1); } );
      maxScore        = windowScores.max();

      // now that we have the best-scoring window, we know *what* rows should be scrolled into view. To maintain
      // context for the user, we find the minimum distance to scroll so that all those rows become visible on the\\
      // table.

      if (maxScore > currentScore) {    // don't scroll at all if the currently-showing rows are the rows to show!
        windowStart   = stack[ windowScores.indexOf(maxScore) ];
        windowEnd     = Math.min(tableLength - 1, windowStart + nRows - 1);
        rowsToDisplay = stack.filter( function (n) { return windowStart <= n && n <= windowEnd; });
        topRowToDisplay    = rowsToDisplay.min();
        bottomRowToDisplay = rowsToDisplay.max();

        // the following should scroll the minimum possible amount to show all the rows that are in the best-possible
        // window.
        if ( Math.abs(topRowToDisplay - firstVisibleRow) < Math.abs(bottomRowToDisplay - lastVisibleRow) ) {
          newTopRow = topRowToDisplay;
        }
        else {
          newTopRow = Math.max(0, bottomRowToDisplay - nRows + 1);
        }

        this.get('scrollView').scrollTo(0, newTopRow * rowHeight + paddingTop);
      }
    }

    this._previousTagIndexStackLength = stackLength;
  }

});
