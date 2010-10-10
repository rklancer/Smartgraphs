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
  
  layout: {
    left: 20,
    bottom: 10,
    width: 188
  },

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

      valueBinding: SC.Binding.oneWay('.parentView.parentView*tableController.graphController.axes.xLabelAbbreviated')
    }),

    ysLabel: SC.LabelView.design({
      layout: {
        left: 10,
        width: 80,
        top: 7,
        height: 20
      },
      valueBinding: SC.Binding.oneWay('.parentView.parentView*tableController.graphController.axes.yLabelAbbreviated')
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

      rowHeight: 18,
      contentObjectBinding: '.parentView.parentView.parentView*tableController.content',
      contentBinding: '.parentView.parentView.parentView*tableController.arrangedObjects',
      selectionBinding: '.parentView.parentView.parentView*tableController.selection',
      contentLengthBinding: '.content.length',
      
      _contentLengthDidChange: function () {
        // adjust height when content length increases
        var contentLength = this.get('contentLength');
        this.adjust('height', contentLength * this.get('rowHeight'));

        // then scroll to bottom when content length increases, unless this is the initial loading of content
        if (this._oldContentLength > 0 && contentLength > this._oldContentLength) {
          this.getPath('parentView.parentView').scrollTo(this.get('maximumVerticalScrollOffset'));
        }
        this._oldContentLength = contentLength;
      }.observes('contentLength'),
      
      _contentObjectDidChange: function () {
        this._oldContentLength = 0;
      }.observes('contentObject'),

      xsView: SC.ListView.design({
        layout: {
          left: 100,
          top: 0,
          width: 70
        },
        rowHeightBinding: '.parentView.rowHeight',
        canEditContent: NO,
        contentValueKey: 'x',
        contentBinding: '.parentView.content',
        selectionBinding: '.parentView.selection'
      }),

      ysView: SC.ListView.design({
        layout: {
          left: 10,
          top: 0,
          width: 70
        },
        rowHeightBinding: '.parentView.rowHeight',
        canEditContent: NO,
        contentValueKey: 'y',
        contentBinding: '.parentView.content',
        selectionBinding: '.parentView.selection',
        rowHeight: 18
      })
    })
  })
    
});
