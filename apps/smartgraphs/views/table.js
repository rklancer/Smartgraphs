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

  childViews: ['labelsView'],

  labelsView: SC.View.design({
    layout: {
      left: 0,
      top: 0,
      width: 190,
      height: 50
    },
    childViews: ['latestX', 'latestY'],

    xsLabel: SC.LabelView.design({    
      layout: {
        left: 10,
        width: 80,
        top: 7,
        height: 20
      },

      valueBinding: SC.Binding.oneWay('.parentView.parentView*tableController.axes.xLabelAbbreviated')
    }),

    ysLabel: SC.LabelView.design({
      layout: {
        right: 10,
        width: 80,
        top: 7,
        height: 20
      },
      valueBinding: SC.Binding.oneWay('.parentView.parentView*tableController.axes.yLabelAbbreviated')
    }),
    
    latestX: SC.LabelView.design({    
      layout: {
        left: 10,
        width: 80,
        top: 30,
        height: 20
      },

      valueBinding: SC.Binding.oneWay('.parentView.parentView*tableController.latestX')
    }),

    latestY: SC.LabelView.design({
      layout: {
        right: 10,
        width: 80,
        top: 30,
        height: 20
      },
      valueBinding: SC.Binding.oneWay('.parentView.parentView*tableController.latestY')
    })
  }),
  
  scrollerView: SC.ScrollView.design({
    layout: {
      left: 0,
      top: 50,
      width: 190,
      bottom: 15
    },

    borderStyle: SC.BORDER_NONE,

    contentView: SC.View.design({
      childViews: ['xsView', 'ysView'],

      rowHeight: 18,
      contentBinding: '.parentView.parentView.parentView*tableController.arrangedObjects',
      contentLengthBinding: '.content.length',
      selectionBinding: '.parentView.parentView.parentView*tableController.selection',
      seriesBinding: '.parentView.parentView.parentView*tableController.series',

      // this creates a binding loop, for unclear reasons:
      // expectedLengthBinding: '.parentView.parentView.parentView*tableController.series.expectedLength',
      
      _contentLengthDidChange: function () {
        // adjust height when content length increases; 
        //  * if expectedLength is set, use that so we don't keep adjusting height.
        //  * if content length is 0, set height to 0 so that the excess height is not distracting when list is empty
        
        var expectedLength = this.getPath('series.expectedLength');
        var contentLength = this.get('contentLength');
        var rowHeight = this.get('rowHeight');
        var newHeight = (contentLength === 0) ? 0 : (expectedLength || contentLength) * rowHeight;
        
        if (this.get('frame').height !== newHeight) {
          this.adjust('height', newHeight);
        }

        // attempt to scroll the current item (whose top is at length-1*height) to the bottom of the frame
        var y = (contentLength - 1) * rowHeight - (this.getPath('parentView.frame').height - rowHeight);
        this.getPath('parentView.parentView').scrollTo(0, y);
      }.observes('contentLength'),

      xsView: SC.ListView.design({
        layout: {
          left: 10,
          top: 0,
          width: 70
        },
        rowHeightBinding: '.parentView.rowHeight',
        canEditContent: NO,
        contentValueKey: 'xRounded',
        contentBinding: '.parentView.content',
        selectionBinding: '.parentView.selection'
      }),

      ysView: SC.ListView.design({
        layout: {
          left: 100,
          top: 0,
          width: 70
        },
        rowHeightBinding: '.parentView.rowHeight',
        canEditContent: NO,
        contentValueKey: 'yRounded',
        contentBinding: '.parentView.content',
        selectionBinding: '.parentView.selection',
        rowHeight: 18
      })
    })
  })
    
});
